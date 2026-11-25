import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  MessagesSquare,
  Mic,
  RotateCcw,
  Sparkles,
  UserCheck,
  XCircle
} from 'lucide-react';
import { CARDS_BY_UNIT, MONO_TALKS_BY_UNIT } from '../../data/cards/speakingCards';
import type { SpeakingCard } from '../../types/curriculum';
import type { AppSettings } from '../../types/vocab';
import {
  AiClientError,
  type CardTurnEvaluation,
  evaluateCardSheetItem,
  reviewFullCardSheet
} from '../../utils/aiClient';
import {
  clearCardSheetDraft,
  getCardDraftKey,
  loadCardSheetDrafts,
  saveCardSheetDraft
} from '../../utils/curriculumHelpers';
import {
  playCompleteSound,
  playCorrectSound,
  playHintSound,
  playWrongSound
} from '../../utils/soundEffects';
import { stopSpeaking } from '../../utils/speech';
import { DEFAULT_AI_MODEL } from '../../utils/storage';
import { SpeakButton } from '../common/SpeakButton';
import { MiniChartSvg } from './MiniChartSvg';

interface SpeakingCardsWorkspaceProps {
  unitNumber: number;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

function getSourceBadge(source: SpeakingCard['source']) {
  if (source === 'card_docx') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
        ÔN TẬP THI KTHP
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
      Bổ sung Card.md
    </span>
  );
}

export function SpeakingCardsWorkspace({
  unitNumber,
  settings,
  onUpdateSettings,
  onNavigate
}: SpeakingCardsWorkspaceProps) {
  const unitCards = useMemo(() => CARDS_BY_UNIT[unitNumber] ?? [], [unitNumber]);
  const unitMonoTalk = useMemo(() => MONO_TALKS_BY_UNIT[unitNumber], [unitNumber]);

  const [selectedCardId, setSelectedCardId] = useState<string>(() => unitCards[0]?.id ?? '');
  const [userRole, setUserRole] = useState<'A' | 'B'>('A');

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, CardTurnEvaluation>>({});
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(() => new Set());
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  // Bottom drawers & full sheet AI grading (collapsed/hidden by default)
  const [fullReview, setFullReview] = useState<string>('');
  const [isReviewingSheet, setIsReviewingSheet] = useState(false);
  const [fullReviewError, setFullReviewError] = useState<string | null>(null);
  const [showKeyExpressions, setShowKeyExpressions] = useState(false);
  const [showSampleDialogue, setShowSampleDialogue] = useState(false);
  const [showMonoTalk, setShowMonoTalk] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // Sync first card when Unit changes
  useEffect(() => {
    setSelectedCardId(unitCards[0]?.id ?? '');
  }, [unitNumber, unitCards]);

  const activeCard: SpeakingCard | undefined = useMemo(
    () => unitCards.find((c) => c.id === selectedCardId) ?? unitCards[0],
    [unitCards, selectedCardId]
  );

  // Hydrate saved draft whenever card or selected role changes (always hide spoilers on switch)
  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    stopSpeaking();

    setRevealedKeys(new Set());
    setRowErrors({});
    setFullReviewError(null);
    setLoadingKey(null);
    setIsReviewingSheet(false);
    setShowKeyExpressions(false);
    setShowSampleDialogue(false);
    setShowMonoTalk(false);

    if (!activeCard) {
      setInputs({});
      setEvaluations({});
      setFullReview('');
      return;
    }

    const drafts = loadCardSheetDrafts();
    const saved = drafts[getCardDraftKey(activeCard.id, userRole)];
    if (saved) {
      setInputs(saved.inputs);
      setEvaluations(saved.evaluations);
      setFullReview(saved.fullReview ?? '');
    } else {
      setInputs({});
      setEvaluations({});
      setFullReview('');
    }
  }, [activeCard?.id, userRole]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      stopSpeaking();
    };
  }, []);

  if (!activeCard) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có Speaking Card nào cho Unit {unitNumber}.
      </div>
    );
  }

  const persistDraft = (
    nextInputs: Record<string, string>,
    nextEvaluations: Record<string, CardTurnEvaluation>,
    nextFullReview?: string
  ) => {
    saveCardSheetDraft(activeCard.id, userRole, {
      role: userRole,
      inputs: nextInputs,
      evaluations: nextEvaluations,
      fullReview: nextFullReview ?? fullReview,
      updatedAt: Date.now()
    });
  };

  const handleInputChange = (slotKey: string, val: string) => {
    const nextInputs = { ...inputs, [slotKey]: val };
    setInputs(nextInputs);

    if (rowErrors[slotKey]) {
      setRowErrors((prev) => {
        const copy = { ...prev };
        delete copy[slotKey];
        return copy;
      });
    }
    persistDraft(nextInputs, evaluations);
  };

  const toggleRevealAnswer = (slotKey: string) => {
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(slotKey)) {
        next.delete(slotKey);
      } else {
        playHintSound();
        next.add(slotKey);
      }
      return next;
    });
  };

  const handleCheckSlotAi = async (params: {
    slotKey: string;
    fieldLabel: string;
    taskKind: 'question' | 'answer' | 'step';
    cueInfo?: string;
    referenceLine?: string;
  }) => {
    const cleanText = (inputs[params.slotKey] ?? '').trim();
    if (!cleanText) {
      setRowErrors((prev) => ({
        ...prev,
        [params.slotKey]: 'Vui lòng điền câu hỏi hoặc câu trả lời của bạn vào ô trước khi chấm.'
      }));
      return;
    }

    if (!settings.aiApiKey.trim()) {
      setRowErrors((prev) => ({
        ...prev,
        [params.slotKey]: 'Chưa có API Key TokenHarbor trong Cài đặt để AI chấm câu này.'
      }));
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoadingKey(params.slotKey);
    setRowErrors((prev) => {
      const copy = { ...prev };
      delete copy[params.slotKey];
      return copy;
    });

    try {
      const result = await evaluateCardSheetItem({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        userRole,
        card: activeCard,
        fieldLabel: params.fieldLabel,
        taskKind: params.taskKind,
        cueInfo: params.cueInfo,
        referenceLine: params.referenceLine,
        userInput: cleanText
      });

      const nextEvaluations = { ...evaluations, [params.slotKey]: result };
      setEvaluations(nextEvaluations);
      persistDraft(inputs, nextEvaluations);

      if (result.isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    } catch (err) {
      if (err instanceof AiClientError && err.code === 'ABORTED') return;
      const msg =
        err instanceof AiClientError
          ? err.message
          : 'Không thể kết nối AI để chấm mục này. Vui lòng thử lại.';
      setRowErrors((prev) => ({ ...prev, [params.slotKey]: msg }));
    } finally {
      setLoadingKey(null);
    }
  };

  // Build ordered list of fillable slots belonging to the current role for full-sheet AI check
  const activeRoleEntries = useMemo(() => {
    const entries: Array<{ label: string; userText: string; expectedText?: string }> = [];

    if (activeCard.rows) {
      activeCard.rows.forEach((r, idx) => {
        const key = `row_${idx}`;
        const isQuestionSlot =
          userRole === 'A' ? Boolean(r.aIsQuestionPrompt) : Boolean(r.bIsQuestionPrompt);
        const expectedText = isQuestionSlot
          ? r.suggestedQuestion
          : r.suggestedAnswer ?? (userRole === 'A' ? r.studentA : r.studentB);
        entries.push({
          label: `${r.field} (${isQuestionSlot ? 'Đặt câu hỏi' : 'Trả lời/Trình bày'})`,
          userText: inputs[key] ?? '',
          expectedText
        });
      });
    }

    if (activeCard.flowSteps) {
      activeCard.flowSteps.forEach((step, idx) => {
        if (step.speaker === userRole || step.speaker === 'Both') {
          const key = `step_${idx}`;
          entries.push({
            label: `Bước ${idx + 1} (${step.action})`,
            userText: inputs[key] ?? '',
            expectedText: step.sampleLine
          });
        }
      });
    }

    return entries;
  }, [activeCard, userRole, inputs]);

  const filledSlotCount = activeRoleEntries.filter((e) => e.userText.trim().length > 0).length;

  const handleReviewFullSheet = async () => {
    if (!settings.aiApiKey.trim()) {
      setFullReviewError('Vui lòng nhập API Key TokenHarbor trong Cài đặt trước khi chấm toàn phiếu.');
      return;
    }

    if (filledSlotCount === 0) {
      setFullReviewError('Hãy điền ít nhất 1 mục trên phiếu Cue Card trước khi nhờ AI chấm tổng thể.');
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsReviewingSheet(true);
    setFullReviewError(null);
    setFullReview('');

    try {
      const res = await reviewFullCardSheet({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        userRole,
        card: activeCard,
        entries: activeRoleEntries,
        onDelta: (_delta, accumulated) => {
          setFullReview(accumulated);
        }
      });

      setFullReview(res.content);
      persistDraft(inputs, evaluations, res.content);
      playCompleteSound();
    } catch (err) {
      if (err instanceof AiClientError && err.code === 'ABORTED') return;
      setFullReviewError(
        err instanceof AiClientError
          ? err.message
          : 'Lỗi khi chấm tổng hợp phiếu Cue Card. Vui lòng thử lại.'
      );
    } finally {
      setIsReviewingSheet(false);
    }
  };

  const handleResetSheet = () => {
    abortRef.current?.abort();
    setInputs({});
    setEvaluations({});
    setRevealedKeys(new Set());
    setRowErrors({});
    setFullReview('');
    setFullReviewError(null);
    clearCardSheetDraft(activeCard.id, userRole);
  };

  const activeRoleDisplayName =
    userRole === 'A' ? activeCard.roleAName : activeCard.roleBName;

  const currentModel = settings.aiModel || DEFAULT_AI_MODEL;

  return (
    <div className="space-y-6">
      {/* Card Selector & Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {activeCard.cardCode}: {activeCard.title}
                </h2>
                {getSourceBadge(activeCard.source)}
              </div>
              <p className="text-sm text-slate-600 mt-0.5">{activeCard.subtitleVi}</p>
            </div>
          </div>

          {unitCards.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {unitCards.map((c) => {
                const isSelected = c.id === activeCard.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCardId(c.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c.cardCode}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Scenario Banner */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Tình huống:</strong> {activeCard.scenarioVi}
        </div>

        {/* Single-Role Switcher: Show ONLY ONE Cue Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
              Chọn phiếu của bạn:
            </span>
            <button
              type="button"
              onClick={() => setUserRole('A')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
                userRole === 'A'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4" aria-hidden="true" />
              <span>Phiếu {activeCard.roleAName}</span>
            </button>

            <button
              type="button"
              onClick={() => setUserRole('B')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
                userRole === 'B'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4" aria-hidden="true" />
              <span>Phiếu {activeCard.roleBName}</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Đã điền: <strong className="text-slate-800">{filledSlotCount}/{activeRoleEntries.length}</strong> mục • Đáp án ẩn mặc định
          </span>
        </div>
      </section>

      {/* THE SINGLE CUE CARD SHEET */}
      <section
        className={`rounded-2xl border-2 bg-white shadow-sm overflow-hidden ${
          userRole === 'A' ? 'border-blue-200' : 'border-emerald-200'
        }`}
      >
        {/* Cue Card Header Strip */}
        <div
          className={`px-5 py-4 border-b flex flex-wrap items-center justify-between gap-2 ${
            userRole === 'A'
              ? 'bg-blue-50/80 border-blue-200 text-blue-950'
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          }`}
        >
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-75">
              Personal Cue Card • {activeCard.cardCode}
            </p>
            <h3 className="text-base sm:text-lg font-extrabold">{activeRoleDisplayName}</h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-700">
            Chỉ hiển thị phiếu của bạn — Tự điền câu hỏi / câu trả lời
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Unit 6 Visual Charts (No spoken-answer spoilers, visual aid only) */}
          {activeCard.charts && activeCard.charts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Biểu đồ minh họa trên phiếu
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeCard.charts.map((chart, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-3"
                  >
                    <MiniChartSvg chart={chart} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table Cue Card Rows (100% single-role, ZERO leaked question/answer strings) */}
          {activeCard.rows && activeCard.rows.length > 0 && (
            <div className="space-y-4">
              {activeCard.rows.map((row, idx) => {
                const slotKey = `row_${idx}`;
                const isQuestionSlot =
                  userRole === 'A'
                    ? Boolean(row.aIsQuestionPrompt)
                    : Boolean(row.bIsQuestionPrompt);

                const partnerDisplayName =
                  userRole === 'A' ? activeCard.roleBName : activeCard.roleAName;

                // Strictly only fetch current role's factual cue; NEVER leak partner's answer data
                const myCueFact = userRole === 'A' ? row.studentA : row.studentB;
                const partnerCueFact = userRole === 'A' ? row.studentB : row.studentA;

                // Partner's visible question/prompt that the learner must see BEFORE writing an answer
                const isStaffRespondingToComplaint =
                  activeCard.id === 'card_u5_vaeco' && userRole === 'B';
                const incomingPartnerPrompt = isStaffRespondingToComplaint
                  ? row.suggestedAnswer ?? partnerCueFact
                  : (
                      row.suggestedQuestion ?? partnerCueFact.replace(/^\(\d+\)\s*/, '')
                    ).trim();

                const referenceLine = isQuestionSlot
                  ? row.suggestedQuestion
                  : isStaffRespondingToComplaint
                    ? myCueFact
                    : row.suggestedAnswer ?? myCueFact;

                const userVal = inputs[slotKey] ?? '';
                const evaluation = evaluations[slotKey];
                const isRevealed = revealedKeys.has(slotKey);
                const isChecking = loadingKey === slotKey;
                const rowError = rowErrors[slotKey];

                return (
                  <div
                    key={slotKey}
                    className={`rounded-2xl border p-4 sm:p-5 transition-colors space-y-3 ${
                      evaluation
                        ? evaluation.isCorrect
                          ? 'border-emerald-200 bg-emerald-50/35'
                          : 'border-amber-200 bg-amber-50/35'
                        : 'border-slate-200 bg-slate-50/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {row.field}
                        </h4>
                      </div>

                      {isQuestionSlot ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                          <HelpCircle className="w-3 h-3" aria-hidden="true" />
                          Bạn hỏi đối tác — Tự đặt câu hỏi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                          <MessagesSquare className="w-3 h-3" aria-hidden="true" />
                          {partnerDisplayName} hỏi bạn — Bạn trả lời
                        </span>
                      )}
                    </div>

                    {/* Direction 1: You ask partner vs Direction 2: You see Partner's question FIRST then answer */}
                    {isQuestionSlot ? (
                      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-amber-900">
                        Phiếu của bạn đang để trống mục <strong>{row.field}</strong>. Hãy tự đặt câu hỏi tiếng Anh để hỏi <strong>{partnerDisplayName}</strong>.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {incomingPartnerPrompt && (
                          <div className="rounded-xl border border-blue-200 bg-blue-50/75 px-3.5 py-2.5 flex items-start justify-between gap-3">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">
                                {isStaffRespondingToComplaint
                                  ? `Thông tin / yêu cầu từ ${partnerDisplayName}:`
                                  : `Câu hỏi từ ${partnerDisplayName}:`}
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-slate-900">
                                “{incomingPartnerPrompt}”
                              </p>
                            </div>
                            <SpeakButton
                              text={incomingPartnerPrompt}
                              settings={settings}
                              size="sm"
                            />
                          </div>
                        )}

                        <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                            Dữ kiện gợi ý trên phiếu của bạn:
                          </span>
                          <span className="font-semibold text-slate-900">{myCueFact}</span>
                        </div>
                      </div>
                    )}

                    {/* Direct User Input Inside Cue Card */}
                    <textarea
                      rows={2}
                      value={userVal}
                      onChange={(e) => handleInputChange(slotKey, e.target.value)}
                      placeholder={
                        isQuestionSlot
                          ? `Nhập câu hỏi tiếng Anh để hỏi về "${row.field}"...`
                          : `Dựa vào câu hỏi trên & dữ kiện phiếu, viết câu trả lời tiếng Anh của bạn...`
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-y"
                    />

                    {/* Row Buttons: AI Check + Explicit Reveal Answer */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        data-sound="custom"
                        disabled={isChecking || !userVal.trim()}
                        onClick={() =>
                          handleCheckSlotAi({
                            slotKey,
                            fieldLabel: row.field,
                            taskKind: isQuestionSlot ? 'question' : 'answer',
                            cueInfo: isQuestionSlot
                              ? `Cần hỏi về ${row.field}`
                              : `${incomingPartnerPrompt ? `Câu hỏi đối tác: "${incomingPartnerPrompt}" | ` : ''}Dữ kiện phiếu: ${myCueFact}`,
                            referenceLine
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-45 text-white text-xs font-semibold transition-colors focus-ring"
                      >
                        {isChecking ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{isChecking ? 'Đang chấm...' : 'Kiểm tra AI'}</span>
                      </button>

                      <button
                        type="button"
                        data-sound="custom"
                        onClick={() => toggleRevealAnswer(slotKey)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Ẩn đáp án</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Hiện đáp án</span>
                          </>
                        )}
                      </button>
                    </div>

                    {rowError && (
                      <p className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                        {rowError}
                      </p>
                    )}

                    {/* AI Check Feedback */}
                    {evaluation && (
                      <div
                        className={`rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm space-y-1.5 ${
                          evaluation.isCorrect
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                            : 'border-amber-200 bg-amber-50 text-amber-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-bold">
                          <span className="inline-flex items-center gap-1.5">
                            {evaluation.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                            ) : (
                              <XCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
                            )}
                            <span>{evaluation.isCorrect ? 'Đạt yêu cầu' : 'Cần chỉnh sửa'}</span>
                          </span>
                          <span className="font-mono">{evaluation.score}/10</span>
                        </div>
                        <p>{evaluation.feedbackVi}</p>
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/5">
                          <span>
                            <strong>Gợi ý chuẩn hơn:</strong> {evaluation.improvedLine}
                          </span>
                          <SpeakButton text={evaluation.improvedLine} settings={settings} size="sm" />
                        </div>
                      </div>
                    )}

                    {/* Explicit Revealed Answer ONLY when user clicked "Hiện đáp án" */}
                    {isRevealed && (
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-3.5 py-2.5 text-xs sm:text-sm text-indigo-950 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-indigo-800 block text-[11px] uppercase">
                              {isQuestionSlot ? 'Câu hỏi chuẩn (bạn hỏi):' : 'Câu trả lời tham khảo:'}
                            </span>
                            <span className="font-semibold">{referenceLine}</span>
                          </div>
                          {referenceLine && (
                            <SpeakButton text={referenceLine} settings={settings} size="sm" />
                          )}
                        </div>
                        {isQuestionSlot && (row.suggestedAnswer || partnerCueFact) && (
                          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-200/70 pt-2">
                            <div>
                              <span className="font-bold text-indigo-700 block text-[11px] uppercase">
                                Phản hồi của {partnerDisplayName}:
                              </span>
                              <span className="text-xs sm:text-sm text-indigo-900">
                                {row.suggestedAnswer ?? partnerCueFact}
                              </span>
                            </div>
                            <SpeakButton
                              text={row.suggestedAnswer ?? partnerCueFact}
                              settings={settings}
                              size="sm"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Flowchart Steps Section (Cards 5A & 8A) */}
          {activeCard.flowSteps && activeCard.flowSteps.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lưu đồ lượt nói của {activeRoleDisplayName}
              </h4>
              <div className="space-y-3">
                {activeCard.flowSteps.map((step, idx) => {
                  const isMine = step.speaker === userRole || step.speaker === 'Both';
                  if (!isMine) {
                    const partnerName =
                      step.speaker === 'A' ? activeCard.roleAName : activeCard.roleBName;
                    return (
                      <div
                        key={`step_${idx}`}
                        className="rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-3 text-xs sm:text-sm space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-blue-800">
                            Bước {idx + 1} • {partnerName} nói / hỏi:
                          </span>
                          {step.sampleLine && (
                            <SpeakButton text={step.sampleLine} settings={settings} size="sm" />
                          )}
                        </div>
                        {step.sampleLine ? (
                          <p className="font-semibold text-slate-900">“{step.sampleLine}”</p>
                        ) : (
                          <p className="text-slate-700">{step.action}</p>
                        )}
                        <p className="text-[11px] text-slate-500">Yêu cầu bước: {step.action}</p>
                      </div>
                    );
                  }

                  const slotKey = `step_${idx}`;
                  const userVal = inputs[slotKey] ?? '';
                  const evaluation = evaluations[slotKey];
                  const isRevealed = revealedKeys.has(slotKey);
                  const isChecking = loadingKey === slotKey;
                  const rowError = rowErrors[slotKey];

                  return (
                    <div
                      key={slotKey}
                      className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
                        evaluation
                          ? evaluation.isCorrect
                            ? 'border-emerald-200 bg-emerald-50/35'
                            : 'border-amber-200 bg-amber-50/35'
                          : 'border-blue-200 bg-blue-50/20'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                          Bước {idx + 1} • Lượt của bạn ({step.speaker === 'Both' ? 'Cả hai' : `Student ${userRole}`})
                        </span>
                      </div>

                      <p className="text-sm font-bold text-slate-900">{step.action}</p>

                      <textarea
                        rows={2}
                        value={userVal}
                        onChange={(e) => handleInputChange(slotKey, e.target.value)}
                        placeholder={`Viết câu tiếng Anh cho bước "${step.action}"...`}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-y"
                      />

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          data-sound="custom"
                          disabled={isChecking || !userVal.trim()}
                          onClick={() =>
                            handleCheckSlotAi({
                              slotKey,
                              fieldLabel: `Bước ${idx + 1}: ${step.action}`,
                              taskKind: 'step',
                              cueInfo: step.action,
                              referenceLine: step.sampleLine
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-45 text-white text-xs font-semibold transition-colors focus-ring"
                        >
                          {isChecking ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                          ) : (
                            <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>{isChecking ? 'Đang chấm...' : 'Kiểm tra AI'}</span>
                        </button>

                        {step.sampleLine && (
                          <button
                            type="button"
                            data-sound="custom"
                            onClick={() => toggleRevealAnswer(slotKey)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Ẩn đáp án</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Hiện đáp án</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {rowError && (
                        <p className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                          {rowError}
                        </p>
                      )}

                      {evaluation && (
                        <div
                          className={`rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm space-y-1.5 ${
                            evaluation.isCorrect
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                              : 'border-amber-200 bg-amber-50 text-amber-950'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 font-bold">
                            <span>{evaluation.isCorrect ? 'Đạt yêu cầu' : 'Cần chỉnh sửa'}</span>
                            <span className="font-mono">{evaluation.score}/10</span>
                          </div>
                          <p>{evaluation.feedbackVi}</p>
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/5">
                            <span>
                              <strong>Gợi ý chuẩn hơn:</strong> {evaluation.improvedLine}
                            </span>
                            <SpeakButton
                              text={evaluation.improvedLine}
                              settings={settings}
                              size="sm"
                            />
                          </div>
                        </div>
                      )}

                      {isRevealed && step.sampleLine && (
                        <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-3.5 py-2.5 text-xs sm:text-sm text-indigo-950 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-indigo-800 block text-[11px] uppercase">
                              Câu mẫu tham khảo:
                            </span>
                            <span className="font-semibold">{step.sampleLine}</span>
                          </div>
                          <SpeakButton text={step.sampleLine} settings={settings} size="sm" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Full Sheet Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                data-sound="custom"
                disabled={isReviewingSheet}
                onClick={handleReviewFullSheet}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus-ring"
              >
                {isReviewingSheet ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                )}
                <span>
                  {isReviewingSheet
                    ? 'AI đang chấm phiếu...'
                    : `AI Chấm toàn bộ phiếu (${filledSlotCount}/${activeRoleEntries.length})`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleResetSheet}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors focus-ring"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm lại phiếu</span>
              </button>
            </div>

            {!settings.aiApiKey.trim() && (
              <button
                type="button"
                onClick={() => onNavigate('#/settings')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl"
              >
                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Nhập API Key để dùng chấm AI ({currentModel})</span>
              </button>
            )}
          </div>

          {fullReviewError && (
            <p className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              {fullReviewError}
            </p>
          )}

          {fullReview && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Đánh giá tổng hợp từ Gia sư AI
                </span>
                {settings.aiModel !== currentModel && (
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ aiModel: currentModel })}
                    className="text-xs text-blue-700 underline"
                  >
                    Dùng {currentModel}
                  </button>
                )}
              </div>
              <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {fullReview}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Collapsed-by-Default Reference Drawers (Zero Spoilers until clicked!) */}
      {activeCard.keyExpressions && activeCard.keyExpressions.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <button
            type="button"
            data-sound="custom"
            onClick={() => {
              if (!showKeyExpressions) playHintSound();
              setShowKeyExpressions((v) => !v);
            }}
            className="w-full flex items-center justify-between gap-2 text-left focus-ring rounded-xl"
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
              <HelpCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
              <span>Gợi ý mẫu câu (Key Expressions)</span>
              <span className="text-[11px] font-medium text-slate-500">(Ẩn mặc định)</span>
            </span>
            {showKeyExpressions ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showKeyExpressions && (
            <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
              {activeCard.keyExpressions.map((expr, i) => (
                <li key={i} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="font-mono">{expr}</span>
                  <SpeakButton text={expr.replace(/\.\.\./g, '')} settings={settings} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <button
          type="button"
          data-sound="custom"
          onClick={() => {
            if (!showSampleDialogue) playHintSound();
            setShowSampleDialogue((v) => !v);
          }}
          className="w-full flex items-center justify-between gap-2 text-left focus-ring rounded-xl"
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
            <MessagesSquare className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <span>Xem toàn bộ đáp án &amp; Hội thoại mẫu</span>
            <span className="text-[11px] font-medium text-slate-500">
              (Ẩn hoàn toàn cho đến khi bạn bấm xem)
            </span>
          </span>
          {showSampleDialogue ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showSampleDialogue && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            {activeCard.sampleDialogue.map((turn, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-3.5 space-y-1 ${
                  turn.speaker === 'A'
                    ? 'border-blue-100 bg-blue-50/40'
                    : 'border-emerald-100 bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Student {turn.speaker} {turn.roleLabel ? `(${turn.roleLabel})` : ''}
                  </span>
                  <SpeakButton text={turn.line} settings={settings} size="sm" />
                </div>
                <p className="text-sm font-medium text-slate-900">{turn.line}</p>
                {turn.translationVi && (
                  <p className="text-xs text-slate-600 italic">{turn.translationVi}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {unitMonoTalk && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <button
            type="button"
            data-sound="custom"
            onClick={() => {
              if (!showMonoTalk) playHintSound();
              setShowMonoTalk((v) => !v);
            }}
            className="w-full flex items-center justify-between gap-2 text-left focus-ring rounded-xl"
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
              <Mic className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Bài nói độc thoại mẫu (III. MONO TALK — Ôn tập KTHP)</span>
              <span className="text-[11px] font-medium text-slate-500">
                (Ẩn mặc định)
              </span>
            </span>
            {showMonoTalk ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showMonoTalk && (
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{unitMonoTalk.title}</h4>
                  <p className="text-xs text-slate-600">{unitMonoTalk.topicVi}</p>
                </div>
                <SpeakButton text={unitMonoTalk.script} settings={settings} size="sm" />
              </div>
              <p className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-slate-800 leading-relaxed">
                {unitMonoTalk.script}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
