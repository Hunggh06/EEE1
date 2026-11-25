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
  Mic,
  MicOff,
  PenLine,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  XCircle
} from 'lucide-react';
import { getUnitMonoTalk } from '../../data/monotalk';
import type { UnitMonoTalkTask } from '../../types/curriculum';
import type { AppSettings } from '../../types/vocab';
import {
  AiClientError,
  type WritingSentenceEvaluation,
  evaluateWritingSentence,
  requestWritingHint,
  reviewFullWritingEssay
} from '../../utils/aiClient';
import {
  clearMonoTalkUnitProgress,
  loadMonoTalkProgress,
  saveMonoTalkUnitProgress,
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
import { MiniChartSvg } from '../cards/MiniChartSvg';
import { SpeakButton } from '../common/SpeakButton';
import { MarkdownMessage } from '../tutor/MarkdownMessage';

interface MonoTalkTabProps {
  unitNumber: number;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

interface BrowserSpeechRecognitionAlternative {
  transcript?: string;
}

interface BrowserSpeechRecognitionResult {
  isFinal?: boolean;
  length: number;
  [index: number]: BrowserSpeechRecognitionAlternative | undefined;
}

interface BrowserSpeechRecognitionEvent {
  resultIndex?: number;
  results?: {
    length: number;
    [index: number]: BrowserSpeechRecognitionResult | undefined;
  };
}

interface BrowserSpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognitionInstance;

function getSpeechRecognitionCtor(): BrowserSpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as Record<string, unknown>;
  const ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
  return typeof ctor === 'function' ? (ctor as BrowserSpeechRecognitionCtor) : null;
}

function createEmptySentenceState(): WritingSentenceState {
  return {
    draft: '',
    memorized: false
  };
}

function appendDictatedText(existing: string, spoken: string): string {
  const cleanSpoken = spoken.trim();
  if (!cleanSpoken) return existing;
  if (!existing.trim()) return cleanSpoken;
  const needsSpace = !/[\s\n]$/.test(existing);
  return `${existing}${needsSpace ? ' ' : ''}${cleanSpoken}`;
}

function MonoTalkVisualAid({ monoTask }: { monoTask: UnitMonoTalkTask }) {
  const cueRows = monoTask.cueTable?.rows ?? [];
  const metaRows = cueRows.filter((row) => !row.solution);
  const diagnosisRows = cueRows.filter((row) => Boolean(row.solution));
  const precautions = monoTask.cueTable?.precautions ?? [];

  return (
    <div className="space-y-3 pt-1">
      {/* Official SPEAKING TASK prompt card (Always visible in both Guided and Free modes) */}
      <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/45 p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-600 text-white">
            Speaking Task Unit {monoTask.unit}
          </span>
          <span className="text-[11px] font-semibold text-indigo-700">
            Đề bài chính thức (Mono Talk)
          </span>
        </div>

        <p className="text-sm font-bold text-slate-900 leading-relaxed">{monoTask.promptEn}</p>

        {monoTask.promptBulletsEn.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-800">
            {monoTask.promptBulletsEn.map((bullet, idx) => (
              <li key={idx} className="leading-snug">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Unit 4 Cue Table (Daikin U0 Error Code Diagnosis) */}
      {monoTask.cueTable && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-extrabold text-slate-800">
            {monoTask.cueTable.caption}
          </div>

          {metaRows.length > 0 && (
            <div className="divide-y divide-slate-200">
              {metaRows.map((row) => (
                <div key={row.label} className="grid grid-cols-1 sm:grid-cols-12 text-xs sm:text-sm">
                  <div className="sm:col-span-4 px-4 py-2 bg-emerald-50/60 font-bold text-slate-800 border-b sm:border-b-0 sm:border-r border-slate-200">
                    {row.label}
                  </div>
                  <div className="sm:col-span-8 px-4 py-2 text-slate-800 font-medium">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {diagnosisRows.length > 0 && (
            <div className="border-t border-slate-200">
              <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-700">
                <div className="px-4 py-2 border-r border-slate-200">Causes (Nguyên nhân)</div>
                <div className="px-4 py-2">Solutions (Cách khắc phục)</div>
              </div>
              <div className="divide-y divide-slate-200">
                {diagnosisRows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-2 text-xs sm:text-sm">
                    <div className="px-4 py-2 border-r border-slate-200 text-slate-800">
                      {row.value}
                    </div>
                    <div className="px-4 py-2 text-slate-800 font-medium">{row.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {precautions.length > 0 && (
            <div className="border-t border-slate-200 grid grid-cols-1 sm:grid-cols-12 text-xs sm:text-sm">
              <div className="sm:col-span-4 px-4 py-2.5 bg-emerald-50/60 font-bold text-slate-800 border-b sm:border-b-0 sm:border-r border-slate-200">
                Precautions
              </div>
              <ul className="sm:col-span-8 px-4 py-2.5 pl-8 list-disc space-y-1 text-slate-800">
                {precautions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Unit 6 Line Chart (Home appliance ownership in Vietnam) */}
      {monoTask.chart && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <MiniChartSvg chart={monoTask.chart} />
        </div>
      )}

      {/* Unit 8 Flowchart (Washing machine maintenance discussion) */}
      {monoTask.flowSteps && monoTask.flowSteps.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="grid grid-cols-2 bg-amber-100/70 border-b border-slate-200 text-xs font-extrabold text-slate-900">
            <div className="px-4 py-2 border-r border-slate-200">Student A</div>
            <div className="px-4 py-2">Student B</div>
          </div>
          <div className="divide-y divide-slate-200 text-xs sm:text-sm">
            {monoTask.flowSteps.map((flow, idx) => {
              if (flow.speaker === 'Both') {
                return (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-rose-50/70 text-center font-bold text-slate-900"
                  >
                    {flow.action}
                  </div>
                );
              }
              return (
                <div key={idx} className="grid grid-cols-2">
                  <div
                    className={`px-3.5 py-2 border-r border-slate-200 ${
                      flow.speaker === 'A' ? 'bg-rose-50/55 text-slate-900 font-medium' : 'bg-white'
                    }`}
                  >
                    {flow.speaker === 'A' ? flow.action : ''}
                  </div>
                  <div
                    className={`px-3.5 py-2 ${
                      flow.speaker === 'B' ? 'bg-rose-50/55 text-slate-900 font-medium' : 'bg-white'
                    }`}
                  >
                    {flow.speaker === 'B' ? flow.action : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function MonoTalkTab({
  unitNumber,
  settings,
  onUpdateSettings,
  onNavigate
}: MonoTalkTabProps) {
  const monoTask = useMemo(() => getUnitMonoTalk(unitNumber), [unitNumber]);
  const speechRecognitionSupported = useMemo(() => Boolean(getSpeechRecognitionCtor()), []);

  const [unitProgress, setUnitProgress] = useState<WritingUnitProgress>(() => {
    return (
      loadMonoTalkProgress()[unitNumber] ?? {
        sentences: {},
        updatedAt: Date.now()
      }
    );
  });

  const [practiceMode, setPracticeMode] = useState<WritingPracticeMode>(() => {
    return loadMonoTalkProgress()[unitNumber]?.mode ?? 'guided';
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

  const [isReviewingSpeech, setIsReviewingSpeech] = useState(false);
  const [streamingSpeechReview, setStreamingSpeechReview] = useState('');
  const [speechAiError, setSpeechAiError] = useState<{
    message: string;
    isPaymentRequired?: boolean;
  } | null>(null);

  const [isReadingSpeech, setIsReadingSpeech] = useState(false);
  const [copiedSpeech, setCopiedSpeech] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const [micTarget, setMicTarget] = useState<'sentence' | 'free' | null>(null);
  const [micInterim, setMicInterim] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  const sentenceAbortRef = useRef<AbortController | null>(null);
  const speechAbortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognitionInstance | null>(null);
  const mountedRef = useRef(true);

  const stopMicCapture = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors if recognition already ended
      }
      recognitionRef.current = null;
    }
    setMicTarget(null);
    setMicInterim('');
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      sentenceAbortRef.current?.abort();
      speechAbortRef.current?.abort();
      stopMicCapture();
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    sentenceAbortRef.current?.abort();
    speechAbortRef.current?.abort();
    stopMicCapture();
    stopSpeaking();
    setIsReadingSpeech(false);
    setIsGradingSentence(false);
    setIsLoadingHint(false);
    setIsReviewingSpeech(false);
    setSentenceAiError(null);
    setSpeechAiError(null);
    setMicError(null);
    setConfirmResetOpen(false);
    setConfirmResetFreeOpen(false);
    setActiveIndex(0);
    setShowSkeleton(false);
    setShowModel(false);

    const stored = loadMonoTalkProgress()[unitNumber];
    setPracticeMode(stored?.mode ?? 'guided');
    setUnitProgress(
      stored ?? {
        sentences: {},
        updatedAt: Date.now()
      }
    );
    setStreamingSpeechReview(stored?.fullReview ?? '');
    setStreamingFreeReview(stored?.freeReview ?? '');
  }, [unitNumber]);

  if (!monoTask) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có dữ liệu bài nói Mono Talk cho Unit {unitNumber}.
      </div>
    );
  }

  const sentences = monoTask.sentences;
  const activeStep = sentences[activeIndex] ?? sentences[0];
  const activeState: WritingSentenceState =
    unitProgress.sentences[activeStep.id] ?? createEmptySentenceState();

  const updateAndPersistProgress = (
    updater: (prev: WritingUnitProgress) => WritingUnitProgress
  ) => {
    setUnitProgress((prev) => {
      const next = updater(prev);
      saveMonoTalkUnitProgress(unitNumber, next);
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
  const assembledSpeechText = nonEmptyDrafts.map((x) => x.draft).join(' ');

  const freeDraft = unitProgress.freeDraft ?? '';
  const freeWordCount = freeDraft.trim() ? freeDraft.trim().split(/\s+/).length : 0;

  const handleToggleMic = (target: 'sentence' | 'free') => {
    if (micTarget === target) {
      stopMicCapture();
      return;
    }

    stopMicCapture();
    stopSpeaking();
    setIsReadingSpeech(false);
    setMicError(null);

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setMicError('Trình duyệt hiện tại không hỗ trợ nhập giọng nói (Speech Recognition).');
      return;
    }

    try {
      const rec = new Ctor();
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = true;

      const sentenceIdAtStart = activeStep.id;

      rec.onresult = (ev) => {
        if (!mountedRef.current || !ev.results) return;
        let finalChunk = '';
        let interimChunk = '';
        const startIdx = ev.resultIndex ?? 0;

        for (let i = startIdx; i < ev.results.length; i += 1) {
          const res = ev.results[i];
          const txt = res?.[0]?.transcript ?? '';
          if (!txt) continue;
          if (res?.isFinal) {
            finalChunk += `${txt} `;
          } else {
            interimChunk += `${txt} `;
          }
        }

        setMicInterim(interimChunk.trim());

        if (finalChunk.trim()) {
          updateAndPersistProgress((prev) => {
            if (target === 'sentence') {
              const existing = prev.sentences[sentenceIdAtStart] ?? createEmptySentenceState();
              return {
                ...prev,
                updatedAt: Date.now(),
                sentences: {
                  ...prev.sentences,
                  [sentenceIdAtStart]: {
                    ...existing,
                    draft: appendDictatedText(existing.draft, finalChunk)
                  }
                }
              };
            }
            return {
              ...prev,
              mode: 'free',
              freeDraft: appendDictatedText(prev.freeDraft ?? '', finalChunk),
              updatedAt: Date.now()
            };
          });
        }
      };

      rec.onerror = (ev) => {
        if (!mountedRef.current) return;
        if (ev.error === 'not-allowed') {
          setMicError('Bạn chưa cấp quyền Micro cho trình duyệt. Hãy bật quyền Micro để đọc bài.');
        } else if (ev.error && ev.error !== 'aborted' && ev.error !== 'no-speech') {
          setMicError(`Lỗi nhận dạng giọng nói (${ev.error}). Bạn vẫn có thể gõ trực tiếp.`);
        }
        stopMicCapture();
      };

      rec.onend = () => {
        if (!mountedRef.current) return;
        recognitionRef.current = null;
        setMicTarget(null);
        setMicInterim('');
      };

      recognitionRef.current = rec;
      setMicTarget(target);
      rec.start();
    } catch {
      setMicError('Không khởi động được Micro trên thiết bị này. Vui lòng gõ trực tiếp.');
      stopMicCapture();
    }
  };

  const handleChangePracticeMode = (nextMode: WritingPracticeMode) => {
    if (nextMode === practiceMode) return;
    stopMicCapture();
    stopSpeaking();
    setIsReadingSpeech(false);
    setSpeechAiError(null);
    setMicError(null);
    setPracticeMode(nextMode);
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

  const handleReviewFreeSpeech = async () => {
    if (!freeDraft.trim() || isReviewingSpeech) return;

    speechAbortRef.current?.abort();
    const controller = new AbortController();
    speechAbortRef.current = controller;

    setIsReviewingSpeech(true);
    setSpeechAiError(null);
    setStreamingFreeReview('');

    try {
      const res = await reviewFullWritingEssay({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        task: monoTask,
        assembledEssay: freeDraft,
        skillContext: 'monotalk',
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
        setSpeechAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setSpeechAiError({
          message: 'Không thể chấm bài nói lúc này. Vui lòng thử lại.'
        });
      }
    } finally {
      if (mountedRef.current) {
        setIsReviewingSpeech(false);
      }
    }
  };

  const handleResetFreeSpeech = () => {
    speechAbortRef.current?.abort();
    stopMicCapture();
    stopSpeaking();
    setIsReadingSpeech(false);
    setStreamingFreeReview('');
    setSpeechAiError(null);
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
    if (micTarget === 'sentence') {
      stopMicCapture();
    }
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
        userSentence: draft,
        skillContext: 'monotalk'
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
        userDraft: activeState.draft,
        skillContext: 'monotalk'
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

  const handleReviewFullSpeech = async () => {
    if (!assembledSpeechText.trim() || isReviewingSpeech) return;

    speechAbortRef.current?.abort();
    const controller = new AbortController();
    speechAbortRef.current = controller;

    setIsReviewingSpeech(true);
    setSpeechAiError(null);
    setStreamingSpeechReview('');

    try {
      const res = await reviewFullWritingEssay({
        apiKey: settings.aiApiKey,
        baseUrl: settings.aiBaseUrl,
        model: settings.aiModel,
        signal: controller.signal,
        task: monoTask,
        assembledEssay: assembledSpeechText,
        skillContext: 'monotalk',
        onDelta: (_delta, accumulated) => {
          if (mountedRef.current && !controller.signal.aborted) {
            setStreamingSpeechReview(accumulated);
          }
        }
      });

      if (!mountedRef.current || controller.signal.aborted) return;
      setStreamingSpeechReview(res.content);
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
        setSpeechAiError({
          message: err.message,
          isPaymentRequired: err.code === 'PAYMENT_REQUIRED'
        });
      } else {
        setSpeechAiError({
          message: 'Không thể nhận xét tổng thể bài nói lúc này. Vui lòng thử lại.'
        });
      }
    } finally {
      if (mountedRef.current) {
        setIsReviewingSpeech(false);
      }
    }
  };

  const activeSpeechToRead = practiceMode === 'free' ? freeDraft : assembledSpeechText;

  const handleToggleReadSpeech = () => {
    if (!isSpeechSupported() || !activeSpeechToRead.trim()) return;
    if (isReadingSpeech) {
      stopSpeaking();
      setIsReadingSpeech(false);
      return;
    }

    setIsReadingSpeech(true);
    speakText(activeSpeechToRead, settings, {
      onEnd: () => {
        if (mountedRef.current) setIsReadingSpeech(false);
      },
      onError: () => {
        if (mountedRef.current) setIsReadingSpeech(false);
      }
    });
  };

  const handleCopySpeech = async () => {
    if (!activeSpeechToRead.trim()) return;
    try {
      await navigator.clipboard.writeText(activeSpeechToRead);
      setCopiedSpeech(true);
      setTimeout(() => {
        if (mountedRef.current) setCopiedSpeech(false);
      }, 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleResetAllSentences = () => {
    sentenceAbortRef.current?.abort();
    speechAbortRef.current?.abort();
    stopMicCapture();
    stopSpeaking();
    clearMonoTalkUnitProgress(unitNumber);
    setUnitProgress({ mode: practiceMode, sentences: {}, freeDraft: '', updatedAt: Date.now() });
    setStreamingSpeechReview('');
    setStreamingFreeReview('');
    setSentenceAiError(null);
    setSpeechAiError(null);
    setConfirmResetOpen(false);
    setActiveIndex(0);
    setShowSkeleton(false);
    setShowModel(false);
  };

  const askAiAboutMonoTalk = () => {
    const prompt = `Hãy hướng dẫn mình cách trình bày bài Mono Talk "${monoTask.title}" (Unit ${unitNumber}), cách nối ý tự nhiên khi nói và cách diễn đạt Câu ${activeStep.order}: "${activeStep.vietnamesePrompt}".`;
    onNavigate(`#/tutor?unit=${unitNumber}&mode=qa&prompt=${encodeURIComponent(prompt)}`);
  };

  const evalData = activeState.evaluation;
  const evalPassed = evalData ? evalData.isCorrect || evalData.score >= 8 : false;

  return (
    <div className="space-y-5">
      {/* Task Header + 2-Mode Switcher + Official Speaking Task Prompt */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                Unit {unitNumber} • {practiceMode === 'free' ? 'Tự nói cả bài' : 'Gợi ý từng câu'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {monoTask.taskTypeVi}
              </span>
              {practiceMode === 'guided' && (
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tabular-nums">
                  Đạt / Thuộc: {masteredCount}/{sentences.length} câu
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {monoTask.title}
            </h2>
            {practiceMode === 'guided' ? (
              <p className="text-sm text-slate-600 leading-relaxed">{monoTask.objectiveVi}</p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500">
                Chế độ tự nói / tự viết không gợi ý: chỉ hiển thị đề bài &amp; bảng/biểu đồ/lưu đồ gốc; ẩn toàn bộ câu mẫu, từ khóa và checklist.
              </p>
            )}
          </div>

          {practiceMode === 'guided' && (
            <button
              type="button"
              onClick={askAiAboutMonoTalk}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 text-xs sm:text-sm font-bold transition-colors focus-ring shrink-0"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              <span>Hỏi Gia sư AI về bài nói</span>
            </button>
          )}
        </div>

        {/* 2 Mono Talk Modes Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
            Chế độ luyện Mono Talk:
          </span>
          <button
            type="button"
            onClick={() => handleChangePracticeMode('guided')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
              practiceMode === 'guided'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
            <span>1. Gợi ý từng câu</span>
          </button>
          <button
            type="button"
            onClick={() => handleChangePracticeMode('free')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
              practiceMode === 'free'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-4 h-4" aria-hidden="true" />
            <span>2. Tự nói / Tự viết cả bài (Không gợi ý)</span>
          </button>
        </div>

        {/* Official Speaking Task Prompt + Tables / Chart / Flowchart (Always visible) */}
        <MonoTalkVisualAid monoTask={monoTask} />

        {/* Collapsible Target Checklist (ONLY visible in Guided mode) */}
        {practiceMode === 'guided' && (
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 space-y-2">
            <button
              type="button"
              onClick={() => setChecklistOpen((o) => !o)}
              className="flex items-center justify-between w-full text-left text-xs font-bold uppercase tracking-wider text-slate-600 focus-ring rounded"
            >
              <span>Checklist tiêu chí đạt điểm tối đa ({monoTask.targetChecklist.length} ý)</span>
              <span>{checklistOpen ? 'Thu gọn ▲' : 'Mở xem ▼'}</span>
            </button>
            {checklistOpen && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                {monoTask.targetChecklist.map((item, idx) => (
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

      {micError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm text-rose-800 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{micError}</span>
        </div>
      )}

      {practiceMode === 'free' ? (
        /* MODE 2: FREE FULL MONO TALK (ZERO HINTS) */
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Tự nói hoặc gõ toàn bộ bài Mono Talk (Không gợi ý)
              </h3>
              <p className="text-xs text-slate-500">
                Bấm <strong>Nói bằng Mic</strong> để đọc trực tiếp thành văn bản hoặc gõ kịch bản của bạn, sau đó để AI chấm chi tiết.
              </p>
            </div>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 tabular-nums">
              {freeWordCount} từ • {freeDraft.length} ký tự
            </span>
          </div>

          <div className="space-y-2">
            <textarea
              rows={12}
              value={freeDraft}
              onChange={(e) => handleFreeDraftChange(e.target.value)}
              placeholder="Bấm 'Nói bằng Mic' để nói hoặc tự gõ bài thuyết trình Mono Talk tiếng Anh của bạn tại đây (từ lời chào mở đầu, các ý chính đến câu kết)..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 focus:bg-white px-4 py-3.5 text-sm sm:text-base text-slate-900 leading-relaxed focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none resize-y"
            />
            {micTarget === 'free' && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-3.5 py-2 text-xs text-rose-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
                <span>
                  Đang thu âm tiếng Anh (en-US)...{' '}
                  {micInterim ? <strong className="text-slate-900">"{micInterim}"</strong> : 'Hãy bắt đầu nói.'}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {isReviewingSpeech ? (
                <button
                  type="button"
                  onClick={() => speechAbortRef.current?.abort()}
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
                  onClick={() => void handleReviewFreeSpeech()}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-45 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-colors focus-ring"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>AI Chấm &amp; Sửa bài nói</span>
                </button>
              )}

              {speechRecognitionSupported && (
                <button
                  type="button"
                  data-sound="none"
                  onClick={() => handleToggleMic('free')}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring ${
                    micTarget === 'free'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {micTarget === 'free' ? (
                    <>
                      <MicOff className="w-4 h-4" aria-hidden="true" />
                      <span>Dừng Mic</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-rose-600" aria-hidden="true" />
                      <span>Nói bằng Mic</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                data-sound="none"
                disabled={!isSpeechSupported() || !freeDraft.trim()}
                onClick={handleToggleReadSpeech}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45 ${
                  isReadingSpeech
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isReadingSpeech ? (
                  <>
                    <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Dừng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-blue-600" aria-hidden="true" />
                    <span>Nghe bài tôi nói/viết</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={!freeDraft.trim()}
                onClick={() => void handleCopySpeech()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring disabled:opacity-45"
              >
                {copiedSpeech ? (
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
                <span>Xóa làm lại</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetFreeSpeech}
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

          {speechAiError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{speechAiError.message}</span>
              </div>
              {speechAiError.isPaymentRequired && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                    setSpeechAiError(null);
                  }}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 text-xs font-bold focus-ring"
                >
                  Chuyển sang {DEFAULT_AI_MODEL}
                </button>
              )}
            </div>
          )}

          {(streamingFreeReview || isReviewingSpeech) && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-blue-800">
                <span className="inline-flex items-center gap-1.5">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                  <span>Đánh giá &amp; Sửa bài Mono Talk từ Gia sư AI</span>
                </span>
                {isReviewingSpeech && (
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
        /* MODE 1: GUIDED SENTENCE-BY-SENTENCE MONO TALK COACH */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT / TOP: Active Sentence Card */}
          <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
            {/* Card Header + Recall Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-white tabular-nums">
                  Câu {activeStep.order} / {sentences.length}
                </span>
                <span className="text-sm font-bold text-blue-700">{activeStep.sectionLabel}</span>
              </div>

              <button
                type="button"
                onClick={handleToggleRecallMode}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors focus-ring ${
                  recallMode
                    ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Ẩn khung từ khóa, mục tiêu nói và câu mẫu để luyện nhớ thuần từ tiếng Việt"
              >
                <Brain className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{recallMode ? 'Đang bật: Chế độ Thuộc lòng' : 'Chế độ Thuộc lòng'}</span>
              </button>
            </div>

            {/* Vietnamese Prompt */}
            <div className="rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Ý tiếng Việt cần nói &amp; ghi nhớ:
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
                    Câu nói mẫu chuẩn:
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
                      Chép vào ô nói
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

            {/* Speaking / Writing Box */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <label
                  htmlFor={`monotalk-input-${activeStep.id}`}
                  className="font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <PenLine className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                  <span>Câu tiếng Anh bạn nói / viết:</span>
                </label>
                <div className="flex items-center gap-2">
                  {speechRecognitionSupported && (
                    <button
                      type="button"
                      data-sound="none"
                      onClick={() => handleToggleMic('sentence')}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors focus-ring ${
                        micTarget === 'sentence'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {micTarget === 'sentence' ? (
                        <>
                          <MicOff className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Dừng Mic</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                          <span>Nói bằng Mic</span>
                        </>
                      )}
                    </button>
                  )}
                  <span className="hidden sm:inline">Ctrl+Enter để AI chấm ngay</span>
                </div>
              </div>

              <textarea
                id={`monotalk-input-${activeStep.id}`}
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
                placeholder="Bấm 'Nói bằng Mic' hoặc gõ câu tiếng Anh bạn sẽ nói cho ý này..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-50"
              />

              {micTarget === 'sentence' && (
                <div className="rounded-lg border border-rose-200 bg-rose-50/80 px-3 py-1.5 text-xs text-rose-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shrink-0" />
                  <span>
                    Đang nghe...{' '}
                    {micInterim ? <strong className="text-slate-900">"{micInterim}"</strong> : 'Hãy đọc câu tiếng Anh.'}
                  </span>
                </div>
              )}

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
                      Câu nói gợi ý tự nhiên &amp; chuẩn xác:
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

          {/* RIGHT / BOTTOM: Live Assembled Mono Talk Script Panel */}
          <aside className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-base font-extrabold text-slate-900">Bài nói hoàn chỉnh</h3>
              </div>
              <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                Đã ghép {draftedCount}/{sentences.length} câu
              </span>
            </div>

            {/* Assembled Prose Preview (Click any sentence or placeholder to jump directly) */}
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

            {/* Speech Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-sound="none"
                disabled={!isSpeechSupported() || !assembledSpeechText.trim()}
                onClick={handleToggleReadSpeech}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45 ${
                  isReadingSpeech
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isReadingSpeech ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span>Dừng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>Nghe đọc cả bài nói</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={!assembledSpeechText.trim()}
                onClick={() => void handleCopySpeech()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45"
              >
                {copiedSpeech ? (
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
                  disabled={draftedCount === 0 && masteredCount === 0 && !streamingSpeechReview}
                  onClick={() => setConfirmResetOpen(true)}
                  className="ml-auto inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 px-3 py-2 text-xs font-semibold transition-colors focus-ring disabled:opacity-45"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Làm lại từ đầu</span>
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

            {/* Full Speech AI Review CTA */}
            <div className="pt-1">
              {isReviewingSpeech ? (
                <button
                  type="button"
                  onClick={() => speechAbortRef.current?.abort()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-sm font-bold transition-colors focus-ring"
                >
                  <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Dừng AI chấm tổng thể</span>
                </button>
              ) : (
                <button
                  type="button"
                  data-sound="custom"
                  disabled={!assembledSpeechText.trim()}
                  onClick={() => void handleReviewFullSpeech()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring disabled:opacity-45"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>AI chấm tổng thể bài nói (đối chiếu Checklist)</span>
                </button>
              )}
            </div>

            {/* Speech AI Error */}
            {speechAiError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{speechAiError.message}</span>
                </div>
                {speechAiError.isPaymentRequired && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ aiModel: DEFAULT_AI_MODEL });
                      setSpeechAiError(null);
                    }}
                    className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 text-xs font-bold focus-ring"
                  >
                    Chuyển sang {DEFAULT_AI_MODEL}
                  </button>
                )}
              </div>
            )}

            {/* Streaming Full Speech Review Output */}
            {(streamingSpeechReview || isReviewingSpeech) && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-blue-800">
                  <span className="inline-flex items-center gap-1.5">
                    <Bot className="w-4 h-4" aria-hidden="true" />
                    <span>Nhận xét tổng thể từ Gia sư AI</span>
                  </span>
                  {isReviewingSpeech && (
                    <span className="inline-flex items-center gap-1 text-blue-600">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      <span>Đang phân tích...</span>
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-slate-800">
                  <MarkdownMessage content={streamingSpeechReview} settings={settings} />
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
