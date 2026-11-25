import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BookCheck,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Lightbulb,
  Loader2,
  PenLine,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  XCircle
} from 'lucide-react';
import { getUnitWriting } from '../../data/writing';
import type { AppSettings } from '../../types/vocab';
import {
  AiClientError,
  type WritingSentenceEvaluation,
  evaluateWritingSentence,
  requestWritingHint,
  reviewFullWritingEssay
} from '../../utils/aiClient';
import {
  clearWritingUnitProgress,
  loadWritingProgress,
  saveWritingUnitProgress,
  type WritingPracticeMode,
  type WritingSentenceState,
  type WritingUnitProgress
} from '../../utils/curriculumHelpers';
import {
  playCompleteSound,
  playCorrectSound,
  playHintSound,
  playWrongSound
} from '../../utils/soundEffects';
import { isSpeechSupported, speakText, stopSpeaking } from '../../utils/speech';
import { DEFAULT_AI_MODEL } from '../../utils/storage';
import { SpeakButton } from '../common/SpeakButton';
import { MarkdownMessage } from '../tutor/MarkdownMessage';

interface WritingTabProps {
  unitNumber: number;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

function createEmptySentenceState(): WritingSentenceState {
  return {
    draft: '',
    memorized: false
  };
}

export function WritingTab({
  unitNumber,
  settings,
  onUpdateSettings,
  onNavigate
}: WritingTabProps) {
  const writingTask = useMemo(() => getUnitWriting(unitNumber), [unitNumber]);

  const [unitProgress, setUnitProgress] = useState<WritingUnitProgress>(() => {
    return (
      loadWritingProgress()[unitNumber] ?? {
        sentences: {},
        updatedAt: Date.now()
      }
    );
  });

  const [writingMode, setWritingMode] = useState<WritingPracticeMode>(() => {
    return loadWritingProgress()[unitNumber]?.mode ?? 'guided';
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [recallMode, setRecallMode] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(true);
  const [streamingFreeReview, setStreamingFreeReview] = useState('');
  const [confirmResetFreeOpen, setConfirmResetFreeOpen] = useState(false);

  const [isGradingSentence, setIsGradingSentence] = useState(false);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [sentenceAiError, setSentenceAiError] = useState<{
    message: string;
    isPaymentRequired?: boolean;
  } | null>(null);

  const [isReviewingEssay, setIsReviewingEssay] = useState(false);
  const [streamingEssayReview, setStreamingEssayReview] = useState('');
  const [essayAiError, setEssayAiError] = useState<{
    message: string;
    isPaymentRequired?: boolean;
  } | null>(null);

  const [isReadingEssay, setIsReadingEssay] = useState(false);
  const [copiedEssay, setCopiedEssay] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const sentenceAbortRef = useRef<AbortController | null>(null);
  const essayAbortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      sentenceAbortRef.current?.abort();
      essayAbortRef.current?.abort();
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    sentenceAbortRef.current?.abort();
    essayAbortRef.current?.abort();
    stopSpeaking();
    setIsReadingEssay(false);
    setIsGradingSentence(false);
    setIsLoadingHint(false);
    setIsReviewingEssay(false);
    setSentenceAiError(null);
    setEssayAiError(null);
    setConfirmResetOpen(false);
    setActiveIndex(0);
    setShowSkeleton(false);
    setShowModel(false);
    setConfirmResetFreeOpen(false);

    const stored = loadWritingProgress()[unitNumber];
    setWritingMode(stored?.mode ?? 'guided');
    setUnitProgress(
      stored ?? {
        sentences: {},
        updatedAt: Date.now()
      }
    );
    setStreamingEssayReview(stored?.fullReview ?? '');
    setStreamingFreeReview(stored?.freeReview ?? '');
  }, [unitNumber]);

  if (!writingTask) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có dữ liệu bài viết cho Unit {unitNumber}.
      </div>
    );
  }

  const sentences = writingTask.sentences;
  const activeStep = sentences[activeIndex] ?? sentences[0];
  const activeState: WritingSentenceState =
    unitProgress.sentences[activeStep.id] ?? createEmptySentenceState();

  const updateAndPersistProgress = (
    updater: (prev: WritingUnitProgress) => WritingUnitProgress
  ) => {
    setUnitProgress((prev) => {
      const next = updater(prev);
      saveWritingUnitProgress(unitNumber, next);
      return next;
    });
  };

  const updateSentenceState = (
    sentenceId: string,
    patch: Partial<WritingSentenceState>
  ) => {
    updateAndPersistProgress((prev) => {
      const existing = prev.sentences[sentenceId] ?? createEmptySentenceState();
      return {
        ...prev,
        updatedAt: Date.now(),
        sentences: {
          ...prev.sentences,
          [sentenceId]: {
            ...existing,
            ...patch
          }
        }
      };
    });
  };

  const isSentencePassed = (sentenceId: string): boolean => {
    const s = unitProgress.sentences[sentenceId];
    if (!s) return false;
    return Boolean(s.memorized || s.evaluation?.isCorrect || (s.evaluation?.score ?? 0) >= 8);
  };

  const masteredCount = sentences.filter((s) => isSentencePassed(s.id)).length;
  const draftedCount = sentences.filter(
    (s) => (unitProgress.sentences[s.id]?.draft ?? '').trim().length > 0
  ).length;

  const assembledSentences = sentences.map((s) => ({
    step: s,
    draft: (unitProgress.sentences[s.id]?.draft ?? '').trim()
  }));
  const nonEmptyDrafts = assembledSentences.filter((x) => x.draft.length > 0);
  const assembledEssayText = nonEmptyDrafts.map((x) => x.draft).join(' ');

  const freeDraft = unitProgress.freeDraft ?? '';
  const freeWordCount = freeDraft.trim() ? freeDraft.trim().split(/\s+/).length : 0;

  const handleChangeWritingMode = (nextMode: WritingPracticeMode) => {
    if (nextMode === writingMode) return;
    stopSpeaking();
    setIsReadingEssay(false);
    setEssayAiError(null);
    setWritingMode(nextMode);
    updateAndPersistProgress((prev) => ({
      ...prev,
      mode: nextMode,
      updatedAt: Date.now()
    }));
  };

  const handleFreeDraftChange = (val: string) => {
    updateAndPersistProgress((prev) => ({
      ...prev,
      mode: 'free',
      freeDraft: val,
      updatedAt: Date.now()
    }));
  };

  const handleReviewFreeEssay = async () => {
    if (!freeDraft.trim() || isReviewingEssay) return;

    essayAbortRef.current?.abort();
    const controller = new AbortController();
    essayAbortRef.current = controller;

    setIsReviewingEssay(true);
    setEssayAiError(null);
    setStreamingFreeReview('');

    try {
      const res = await reviewFullWritingEssay({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        task: writingTask,
        assembledEssay: freeDraft,
        onDelta: (_delta, accumulated) => {
          if (mountedRef.current && !controller.signal.aborted) {
            setStreamingFreeReview(accumulated);
          }
        }
      });

      if (!mountedRef.current || controller.signal.aborted) return;
      setStreamingFreeReview(res.content);
      updateAndPersistProgress((prev) => ({
        ...prev,
        mode: 'free',
        freeReview: res.content,
        updatedAt: Date.now()
      }));
      playCompleteSound();
    } catch (err) {
      if (!mountedRef.current || controller.signal.aborted) return;
      if (err instanceof AiClientError) {
        if (err.code === 'ABORTED') return;
        setEssayAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setEssayAiError({
          message: 'Không thể chấm bài viết lúc này. Vui lòng thử lại.'
        });
      }
    } finally {
      if (mountedRef.current) {
        setIsReviewingEssay(false);
      }
    }
  };

  const handleResetFreeEssay = () => {
    essayAbortRef.current?.abort();
    stopSpeaking();
    setIsReadingEssay(false);
    setStreamingFreeReview('');
    setEssayAiError(null);
    setConfirmResetFreeOpen(false);
    updateAndPersistProgress((prev) => ({
      ...prev,
      freeDraft: '',
      freeReview: '',
      updatedAt: Date.now()
    }));
  };

  const handleToggleRecallMode = () => {
    setRecallMode((prev) => {
      const next = !prev;
      if (next) {
        setShowSkeleton(false);
        setShowModel(false);
      }
      return next;
    });
  };

  const handleSelectStep = (idx: number) => {
    setActiveIndex(idx);
    setSentenceAiError(null);
    if (recallMode) {
      setShowSkeleton(false);
      setShowModel(false);
    }
  };

  const handleGradeSentence = async () => {
    const draft = activeState.draft.trim();
    if (!draft || isGradingSentence) return;

    sentenceAbortRef.current?.abort();
    const controller = new AbortController();
    sentenceAbortRef.current = controller;

    setIsGradingSentence(true);
    setSentenceAiError(null);

    try {
      const evalResult: WritingSentenceEvaluation = await evaluateWritingSentence({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        unitNumber,
        step: activeStep,
        userSentence: draft
      });

      if (!mountedRef.current || controller.signal.aborted) return;

      const passed = evalResult.isCorrect || evalResult.score >= 8;
      if (passed) {
        playCorrectSound();
      } else {
        playWrongSound();
      }

      const willCompleteAll =
        passed &&
        sentences.every((s) => s.id === activeStep.id || isSentencePassed(s.id));

      updateSentenceState(activeStep.id, {
        evaluation: evalResult
      });

      if (willCompleteAll) {
        setTimeout(() => playCompleteSound(), 220);
      }
    } catch (err) {
      if (!mountedRef.current || controller.signal.aborted) return;
      if (err instanceof AiClientError) {
        if (err.code === 'ABORTED') return;
        setSentenceAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setSentenceAiError({
          message: 'Đã xảy ra lỗi khi chấm câu với AI. Vui lòng thử lại.'
        });
      }
    } finally {
      if (mountedRef.current) {
        setIsGradingSentence(false);
      }
    }
  };

  const handleRequestSentenceHint = async () => {
    if (isLoadingHint) return;

    sentenceAbortRef.current?.abort();
    const controller = new AbortController();
    sentenceAbortRef.current = controller;

    setIsLoadingHint(true);
    setSentenceAiError(null);
    playHintSound();

    try {
      const hintText = await requestWritingHint({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        unitNumber,
        step: activeStep,
        userDraft: activeState.draft
      });

      if (!mountedRef.current || controller.signal.aborted) return;
      updateSentenceState(activeStep.id, { hint: hintText });
    } catch (err) {
      if (!mountedRef.current || controller.signal.aborted) return;
      if (err instanceof AiClientError) {
        if (err.code === 'ABORTED') return;
        setSentenceAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setSentenceAiError({ message: 'Không thể tạo gợi ý AI lúc này.' });
      }
    } finally {
      if (mountedRef.current) {
        setIsLoadingHint(false);
      }
    }
  };

  const handleReviewFullEssay = async () => {
    if (!assembledEssayText.trim() || isReviewingEssay) return;

    essayAbortRef.current?.abort();
    const controller = new AbortController();
    essayAbortRef.current = controller;

    setIsReviewingEssay(true);
    setEssayAiError(null);
    setStreamingEssayReview('');

    try {
      const res = await reviewFullWritingEssay({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        task: writingTask,
        assembledEssay: assembledEssayText,
        onDelta: (_delta, accumulated) => {
          if (mountedRef.current && !controller.signal.aborted) {
            setStreamingEssayReview(accumulated);
          }
        }
      });

      if (!mountedRef.current || controller.signal.aborted) return;
      setStreamingEssayReview(res.content);
      updateAndPersistProgress((prev) => ({
        ...prev,
        fullReview: res.content,
        updatedAt: Date.now()
      }));
      playCompleteSound();
    } catch (err) {
      if (!mountedRef.current || controller.signal.aborted) return;
      if (err instanceof AiClientError) {
        if (err.code === 'ABORTED') return;
        setEssayAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setEssayAiError({
          message: 'Không thể nhận xét tổng thể bài viết lúc này. Vui lòng thử lại.'
        });
      }
    } finally {
      if (mountedRef.current) {
        setIsReviewingEssay(false);
      }
    }
  };

  const activeEssayToRead = writingMode === 'free' ? freeDraft : assembledEssayText;

  const handleToggleReadEssay = () => {
    if (!isSpeechSupported() || !activeEssayToRead.trim()) return;
    if (isReadingEssay) {
      stopSpeaking();
      setIsReadingEssay(false);
      return;
    }

    setIsReadingEssay(true);
    speakText(activeEssayToRead, settings, {
      onEnd: () => {
        if (mountedRef.current) setIsReadingEssay(false);
      },
      onError: () => {
        if (mountedRef.current) setIsReadingEssay(false);
      }
    });
  };

  const handleCopyEssay = async () => {
    if (!activeEssayToRead.trim()) return;
    try {
      await navigator.clipboard.writeText(activeEssayToRead);
      setCopiedEssay(true);
      setTimeout(() => {
        if (mountedRef.current) setCopiedEssay(false);
      }, 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleResetAllSentences = () => {
    sentenceAbortRef.current?.abort();
    essayAbortRef.current?.abort();
    stopSpeaking();
    clearWritingUnitProgress(unitNumber);
    setUnitProgress({ mode: writingMode, sentences: {}, freeDraft: '', updatedAt: Date.now() });
    setStreamingEssayReview('');
    setStreamingFreeReview('');
    setSentenceAiError(null);
    setEssayAiError(null);
    setConfirmResetOpen(false);
    setActiveIndex(0);
    setShowSkeleton(false);
    setShowModel(false);
  };

  const askAiAboutWriting = () => {
    const prompt = `Hãy hướng dẫn mình cách viết bài "${writingTask.title}" (Unit ${unitNumber}) và phân tích các cấu trúc cần lưu ý ở Câu ${activeStep.order}: "${activeStep.vietnamesePrompt}".`;
    onNavigate(`#/tutor?unit=${unitNumber}&mode=writing&prompt=${encodeURIComponent(prompt)}`);
  };

  const evalData = activeState.evaluation;
  const evalPassed = evalData ? evalData.isCorrect || evalData.score >= 8 : false;

  return (
    <div className="space-y-5">
      {/* Task Header + 2-Mode Switcher */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                Unit {unitNumber} • {writingMode === 'free' ? 'Tự viết cả bài' : 'Gợi ý từng câu'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {writingTask.taskTypeVi}
              </span>
              {writingMode === 'guided' && (
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tabular-nums">
                  Đạt / Thuộc: {masteredCount}/{sentences.length} câu
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {writingTask.title}
            </h2>
            {writingMode === 'guided' ? (
              <p className="text-sm text-slate-600 leading-relaxed">{writingTask.objectiveVi}</p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500">
                Chế độ tự kiểm tra năng lực: ẩn toàn bộ gợi ý câu mẫu, dàn ý, từ khoá và checklist.
              </p>
            )}
          </div>

          {writingMode === 'guided' && (
            <button
              type="button"
              onClick={askAiAboutWriting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 text-xs sm:text-sm font-bold transition-colors focus-ring shrink-0"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              <span>Hỏi Gia sư AI về bài viết</span>
            </button>
          )}
        </div>

        {/* 2 Writing Modes Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
            Chế độ luyện viết:
          </span>
          <button
            type="button"
            onClick={() => handleChangeWritingMode('guided')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
              writingMode === 'guided'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
            <span>1. Gợi ý từng câu</span>
          </button>
          <button
            type="button"
            onClick={() => handleChangeWritingMode('free')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
              writingMode === 'free'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <PenLine className="w-4 h-4" aria-hidden="true" />
            <span>2. Viết cả bài (Không gợi ý)</span>
          </button>
        </div>

        {/* Collapsible Target Checklist (ONLY visible in Guided mode) */}
        {writingMode === 'guided' && (
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 space-y-2">
            <button
              type="button"
              onClick={() => setChecklistOpen((o) => !o)}
              className="flex items-center justify-between w-full text-left text-xs font-bold uppercase tracking-wider text-slate-600 focus-ring rounded"
            >
              <span>Checklist tiêu chí đạt điểm tối đa ({writingTask.targetChecklist.length} ý)</span>
              <span>{checklistOpen ? 'Thu gọn ▲' : 'Mở xem ▼'}</span>
            </button>
            {checklistOpen && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                {writingTask.targetChecklist.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg bg-white border border-slate-200/80 px-3 py-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {writingMode === 'free' ? (
        /* MODE 2: FREE FULL-ESSAY WRITING (ZERO HINTS) */
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Tự viết hoàn chỉnh cả bài (Không có gợi ý)
              </h3>
              <p className="text-xs text-slate-500">
                Dạng bài: <strong>{writingTask.taskTypeVi}</strong> • Chủ đề: {writingTask.title}
              </p>
            </div>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 tabular-nums">
              {freeWordCount} từ • {freeDraft.length} ký tự
            </span>
          </div>

          <textarea
            rows={13}
            value={freeDraft}
            onChange={(e) => handleFreeDraftChange(e.target.value)}
            placeholder="Tự viết toàn bộ bài tiếng Anh của bạn tại đây (từ mở đầu, nội dung chính đến kết bài), hoàn toàn không có gợi ý..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 focus:bg-white px-4 py-3.5 text-sm sm:text-base text-slate-900 leading-relaxed focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none resize-y"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {isReviewingEssay ? (
                <button
                  type="button"
                  onClick={() => essayAbortRef.current?.abort()}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors focus-ring"
                >
                  <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Dừng AI chấm bài</span>
                </button>
              ) : (
                <button
                  type="button"
                  data-sound="custom"
                  disabled={!freeDraft.trim()}
                  onClick={() => void handleReviewFreeEssay()}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-45 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-colors focus-ring"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>AI Chấm &amp; Sửa bài viết</span>
                </button>
              )}

              <button
                type="button"
                data-sound="none"
                disabled={!isSpeechSupported() || !freeDraft.trim()}
                onClick={handleToggleReadEssay}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45 ${
                  isReadingEssay
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isReadingEssay ? (
                  <>
                    <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Dừng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-blue-600" aria-hidden="true" />
                    <span>Nghe bài tôi viết</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={!freeDraft.trim()}
                onClick={() => void handleCopyEssay()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45"
              >
                {copiedEssay ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span className="text-emerald-700">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {!confirmResetFreeOpen ? (
              <button
                type="button"
                disabled={!freeDraft.trim() && !streamingFreeReview}
                onClick={() => setConfirmResetFreeOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Xóa viết lại</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetFreeEssay}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-bold focus-ring"
                >
                  Xác nhận xóa
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetFreeOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 text-xs font-semibold focus-ring"
                >
                  Huỷ
                </button>
              </div>
            )}
          </div>

          {essayAiError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{essayAiError.message}</span>
              </div>
              {essayAiError.isPaymentRequired && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                    setEssayAiError(null);
                  }}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 text-xs font-bold focus-ring"
                >
                  Chuyển sang {DEFAULT_AI_MODEL}
                </button>
              )}
            </div>
          )}

          {(streamingFreeReview || isReviewingEssay) && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-blue-800">
                <span className="inline-flex items-center gap-1.5">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                  <span>Đánh giá &amp; Sửa bài viết từ Gia sư AI</span>
                </span>
                {isReviewingEssay && (
                  <span className="inline-flex items-center gap-1 text-blue-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    <span>Đang chấm...</span>
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-800">
                <MarkdownMessage content={streamingFreeReview} settings={settings} />
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Main Split Workspace: Active Sentence Coach + Live Assembled Essay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT / TOP: Active Sentence Card */}
        <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          {/* Card Header + Recall Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-white tabular-nums">
                  Câu {activeStep.order} / {sentences.length}
                </span>
                <span className="text-sm font-bold text-blue-700">{activeStep.sectionLabel}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleRecallMode}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors focus-ring ${
                recallMode
                  ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Ẩn khung từ khóa, mục tiêu ngữ pháp và câu mẫu để luyện nhớ thuần từ tiếng Việt"
            >
              <Brain className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{recallMode ? 'Đang bật: Chế độ Thuộc lòng' : 'Chế độ Thuộc lòng'}</span>
            </button>
          </div>

          {/* Vietnamese Prompt */}
          <div className="rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Nghĩa tiếng Việt cần viết &amp; ghi nhớ:
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {activeStep.vietnamesePrompt}
            </p>

            {recallMode ? (
              <div className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg px-3 py-1.5">
                Chế độ Thuộc lòng đang bật: Đã ẩn thẻ ngữ pháp, khung từ khóa và câu mẫu để bạn tự nhớ lại.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">
                  Trọng tâm:
                </span>
                {activeStep.grammarTargets.map((target) => (
                  <span
                    key={target}
                    className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800"
                  >
                    {target}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 3 Progressive Support Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (recallMode) setRecallMode(false);
                setShowSkeleton((s) => !s);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-ring ${
                showSkeleton && !recallMode
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showSkeleton && !recallMode ? 'Ẩn khung từ khóa' : '1. Khung từ khóa'}</span>
            </button>

            <button
              type="button"
              data-sound="custom"
              disabled={isLoadingHint}
              onClick={() => void handleRequestSentenceHint()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-50"
            >
              {isLoadingHint ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>2. AI gợi ý</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (recallMode) setRecallMode(false);
                setShowModel((m) => !m);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-ring ${
                showModel && !recallMode
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {showModel && !recallMode ? (
                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{showModel && !recallMode ? 'Ẩn câu mẫu' : '3. Câu mẫu'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateSentenceState(activeStep.id, { memorized: !activeState.memorized })
              }
              className={`ml-auto inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors focus-ring ${
                activeState.memorized
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700'
              }`}
            >
              <BookCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{activeState.memorized ? 'Đã thuộc câu này ✓' : 'Đánh dấu đã thuộc câu này'}</span>
            </button>
          </div>

          {/* Progressive Tool Panels */}
          {showSkeleton && !recallMode && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Khung từ khóa gợi ý (Keyword Skeleton):
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeStep.keywordSkeleton}
              </p>
            </div>
          )}

          {activeState.hint && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 space-y-1 text-xs sm:text-sm text-amber-950">
              <div className="font-bold text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Gợi ý từ AI cho bản nháp của bạn:</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{activeState.hint}</p>
            </div>
          )}

          {showModel && !recallMode && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Câu mẫu chuẩn giáo trình:
                </span>
                <div className="flex items-center gap-2">
                  <SpeakButton
                    text={activeStep.modelSentence}
                    settings={settings}
                    size="sm"
                    variant="outline"
                    label="Nghe mẫu"
                  />
                  <button
                    type="button"
                    onClick={() => updateSentenceState(activeStep.id, { draft: activeStep.modelSentence })}
                    className="rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 px-2.5 py-1 text-xs font-semibold focus-ring"
                  >
                    Chép vào ô viết
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {activeStep.modelSentence}
              </p>
              <div className="flex items-start gap-1.5 text-xs text-emerald-900/90 pt-1 border-t border-emerald-200/70">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Mẹo ghi nhớ:</strong> {activeStep.tipVi}
                </span>
              </div>
            </div>
          )}

          {/* Writing Box */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label htmlFor={`writing-input-${activeStep.id}`} className="font-bold text-slate-700 flex items-center gap-1.5">
                <PenLine className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>Câu tiếng Anh của bạn:</span>
              </label>
              <span>Ctrl+Enter để AI chấm ngay</span>
            </div>

            <textarea
              id={`writing-input-${activeStep.id}`}
              rows={3}
              value={activeState.draft}
              disabled={isGradingSentence}
              onChange={(e) =>
                updateSentenceState(activeStep.id, { draft: e.target.value })
              }
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  void handleGradeSentence();
                }
              }}
              placeholder="Viết câu tiếng Anh hoàn chỉnh cho ý này..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-50"
            />

            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                data-sound="custom"
                disabled={isGradingSentence || !activeState.draft.trim()}
                onClick={() => void handleGradeSentence()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring disabled:opacity-45"
              >
                {isGradingSentence ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="w-4 h-4" aria-hidden="true" />
                )}
                <span>{isGradingSentence ? 'AI đang chấm & sửa...' : 'AI Chấm & Sửa câu này'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleSelectStep(Math.max(0, activeIndex - 1))}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Câu trước</span>
                </button>

                <button
                  type="button"
                  disabled={activeIndex >= sentences.length - 1}
                  onClick={() => handleSelectStep(Math.min(sentences.length - 1, activeIndex + 1))}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-40"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Sentence AI Error */}
          {sentenceAiError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs sm:text-sm text-rose-800 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{sentenceAiError.message}</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {sentenceAiError.isPaymentRequired && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                      setSentenceAiError(null);
                    }}
                    className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 text-xs font-bold focus-ring"
                  >
                    Chuyển ngay sang {DEFAULT_AI_MODEL}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate('#/settings')}
                  className="rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-800 px-3 py-1 text-xs font-semibold focus-ring"
                >
                  Kiểm tra Cài đặt AI
                </button>
              </div>
            </div>
          )}

          {/* Sentence AI Grading Result */}
          {evalData && (
            <div
              className={`rounded-2xl border p-4 space-y-3 ${
                evalPassed
                  ? 'border-emerald-300 bg-emerald-50/70'
                  : 'border-amber-300 bg-amber-50/70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {evalPassed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  )}
                  <span className="text-sm font-extrabold text-slate-900">
                    {evalPassed ? 'Câu đạt chuẩn!' : 'Cần chỉnh sửa thêm'}
                  </span>
                </div>

                <span
                  className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-full tabular-nums ${
                    evalPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  Điểm AI: {evalData.score}/10
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {evalData.verdictVi}
              </p>

              {evalData.mistakesVi.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-bold text-rose-800">Điểm cần sửa:</div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-rose-900">
                    {evalData.mistakesVi.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl bg-white border border-slate-200 p-3 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800">
                    Câu gợi ý hoàn chỉnh:
                  </span>
                  <div className="flex items-center gap-2">
                    <SpeakButton
                      text={evalData.correctedSentence}
                      settings={settings}
                      size="sm"
                      variant="outline"
                      label="Nghe"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateSentenceState(activeStep.id, { draft: evalData.correctedSentence })
                      }
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-bold focus-ring"
                    >
                      Chép vào bài
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-900">{evalData.correctedSentence}</p>
              </div>

              <div className="flex items-start gap-1.5 text-xs text-slate-700">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Mẹo:</strong> {evalData.tipVi}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT / BOTTOM: Live Assembled Essay Panel */}
        <aside className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <h3 className="text-base font-extrabold text-slate-900">Bài viết hoàn chỉnh</h3>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
              Đã ghép {draftedCount}/{sentences.length} câu
            </span>
          </div>

          {/* Assembled Prose Preview */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 text-sm leading-relaxed space-x-1">
            {assembledSentences.map(({ step, draft }, idx) => {
              const isCurrent = idx === activeIndex;
              if (!draft) {
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className={`inline-block rounded-md px-2 py-0.5 my-0.5 text-xs font-mono border border-dashed transition-colors focus-ring ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold'
                        : 'border-slate-300 bg-white text-slate-400 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    [Câu {step.order}: {step.sectionLabel}]
                  </button>
                );
              }

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  title={`Bấm để sửa Câu ${step.order}`}
                  className={`inline text-left rounded px-1 py-0.5 transition-colors focus-ring ${
                    isCurrent
                      ? 'bg-blue-100 text-blue-950 font-semibold ring-1 ring-blue-300'
                      : 'text-slate-800 hover:bg-slate-200/60'
                  }`}
                >
                  {draft}
                </button>
              );
            })}
          </div>

          {/* Essay Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              data-sound="none"
              disabled={!isSpeechSupported() || !assembledEssayText.trim()}
              onClick={handleToggleReadEssay}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45 ${
                isReadingEssay
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isReadingEssay ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Dừng đọc</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                  <span>Nghe đọc cả bài</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={!assembledEssayText.trim()}
              onClick={() => void handleCopyEssay()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45"
            >
              {copiedEssay ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sao chép toàn bài</span>
                </>
              )}
            </button>

            {!confirmResetOpen ? (
              <button
                type="button"
                disabled={draftedCount === 0 && masteredCount === 0 && !streamingEssayReview}
                onClick={() => setConfirmResetOpen(true)}
                className="ml-auto inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Viết lại từ đầu</span>
              </button>
            ) : (
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetAllSentences}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 text-xs font-bold focus-ring"
                >
                  Xóa hết nháp
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-2.5 py-1.5 text-xs font-semibold focus-ring"
                >
                  Huỷ
                </button>
              </div>
            )}
          </div>

          {/* Full Essay AI Review CTA */}
          <div className="pt-1">
            {isReviewingEssay ? (
              <button
                type="button"
                onClick={() => essayAbortRef.current?.abort()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-sm font-bold transition-colors focus-ring"
              >
                <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Dừng AI chấm tổng thể</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={!assembledEssayText.trim()}
                onClick={() => void handleReviewFullEssay()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring disabled:opacity-45"
              >
                <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>AI chấm tổng thể cả bài (đối chiếu Checklist)</span>
              </button>
            )}
          </div>

          {/* Essay AI Error */}
          {essayAiError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{essayAiError.message}</span>
              </div>
              {essayAiError.isPaymentRequired && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                    setEssayAiError(null);
                  }}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 text-xs font-bold focus-ring"
                >
                  Chuyển sang {DEFAULT_AI_MODEL}
                </button>
              )}
            </div>
          )}

          {/* Streaming Full Essay Review Output */}
          {(streamingEssayReview || isReviewingEssay) && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-blue-800">
                <span className="inline-flex items-center gap-1.5">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                  <span>Nhận xét tổng thể từ Gia sư AI</span>
                </span>
                {isReviewingEssay && (
                  <span className="inline-flex items-center gap-1 text-blue-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    <span>Đang phân tích...</span>
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-800">
                <MarkdownMessage content={streamingEssayReview} settings={settings} />
              </div>
            </div>
          )}
        </aside>
      </div>
        </>
      )}
    </div>
  );
}
