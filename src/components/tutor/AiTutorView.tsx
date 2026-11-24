import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Copy,
  Cpu,
  HelpCircle,
  MessagesSquare,
  PenTool,
  PlusCircle,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Square,
  Volume2,
  X
} from 'lucide-react';
import {
  AI_MODEL_OPTIONS,
  GLOBAL_STARTER_PROMPTS,
  TUTOR_KNOWLEDGE_BY_UNIT,
  TUTOR_MODE_META,
  UNIT_TUTOR_KNOWLEDGE
} from '../../data/tutorKnowledge';
import { ALL_VOCAB, VOCAB_BY_ID, VOCAB_BY_UNIT } from '../../data/vocab';
import type { AppSettings, StudyState, TutorMode, VocabItem } from '../../types/vocab';
import {
  AiClientError,
  type ChatCompletionMessage,
  type UnitScope,
  buildTutorSystemPrompt,
  getWeakWordsFromProgress,
  streamTutorCompletion
} from '../../utils/aiClient';
import { isSpeechSupported, speakText } from '../../utils/speech';
import { DEFAULT_AI_MODEL } from '../../utils/storage';
import { MarkdownMessage, extractAllEnglishPhrases } from './MarkdownMessage';

export const TUTOR_MESSAGES_STORAGE_KEY = 'eee5_ai_tutor_messages_v1';
const MAX_STORED_MESSAGES = 60;

export interface TutorRouteParams {
  unitScope: UnitScope;
  mode?: TutorMode;
  wordId?: string;
  initialPrompt?: string;
  routeKey: string;
}

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  unitScope: UnitScope;
  mode: TutorMode;
  model?: string;
  focusWordLabel?: string;
}

interface AiTutorViewProps {
  state: StudyState;
  routeParams: TutorRouteParams;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

interface TutorErrorState {
  code: string;
  status?: number;
  model?: string;
  message: string;
  retryText?: string;
}

function loadStoredMessages(): TutorChatMessage[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(TUTOR_MESSAGES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is TutorChatMessage =>
          typeof m === 'object' &&
          m !== null &&
          typeof m.id === 'string' &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          typeof m.createdAt === 'number'
      )
      .slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

function saveStoredMessages(messages: TutorChatMessage[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(
      TUTOR_MESSAGES_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES))
    );
  } catch {
    // Ignore quota or privacy mode errors
  }
}

function createMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const MODE_ICON: Record<TutorMode, React.ReactNode> = {
  qa: <HelpCircle className="w-4 h-4" aria-hidden="true" />,
  quiz: <ClipboardCheck className="w-4 h-4" aria-hidden="true" />,
  roleplay: <MessagesSquare className="w-4 h-4" aria-hidden="true" />,
  writing: <PenTool className="w-4 h-4" aria-hidden="true" />
};

export function AiTutorView({
  state,
  routeParams,
  onUpdateSettings,
  onNavigate
}: AiTutorViewProps) {
  const [unitScope, setUnitScope] = useState<UnitScope>(routeParams.unitScope);
  const [mode, setMode] = useState<TutorMode>(routeParams.mode ?? 'qa');
  const [focusWordId, setFocusWordId] = useState<string | undefined>(routeParams.wordId);
  const [draftInput, setDraftInput] = useState<string>(() => {
    if (routeParams.initialPrompt) return routeParams.initialPrompt;
    if (routeParams.wordId && VOCAB_BY_ID[routeParams.wordId]) {
      const w = VOCAB_BY_ID[routeParams.wordId];
      return `Giải thích chi tiết từ "${w.word}" (${w.ipa} — ${w.meaning}), cách dùng trong ngành Điện – Điện tử và đặt 2 câu ví dụ theo ngữ pháp Unit ${w.unit}.`;
    }
    return '';
  });

  const [messages, setMessages] = useState<TutorChatMessage[]>(() => loadStoredMessages());
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingAssistantId, setStreamingAssistantId] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<TutorErrorState | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(true);
  const [showAllVocabChips, setShowAllVocabChips] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollEnabledRef = useRef(true);
  const streamRafRef = useRef<number | null>(null);
  const pendingStreamTextRef = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lastRouteKeyRef = useRef<string>(routeParams.routeKey);

  // Sync incoming route query parameter changes (e.g. clicking "Hỏi AI" from Unit or WordBank)
  useEffect(() => {
    if (lastRouteKeyRef.current === routeParams.routeKey) return;
    lastRouteKeyRef.current = routeParams.routeKey;

    setUnitScope(routeParams.unitScope);
    if (routeParams.mode) {
      setMode(routeParams.mode);
    }
    setFocusWordId(routeParams.wordId);

    if (routeParams.initialPrompt) {
      setDraftInput(routeParams.initialPrompt);
      setTimeout(() => textareaRef.current?.focus(), 50);
    } else if (routeParams.wordId && VOCAB_BY_ID[routeParams.wordId]) {
      const w = VOCAB_BY_ID[routeParams.wordId];
      setDraftInput(
        `Giải thích chi tiết từ "${w.word}" (${w.ipa} — ${w.meaning}), cách dùng trong ngành Điện – Điện tử và đặt 2 câu ví dụ theo ngữ pháp Unit ${w.unit}.`
      );
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [routeParams]);

  // Persist messages cleanly when not actively mid-stream
  useEffect(() => {
    if (!isStreaming) {
      saveStoredMessages(messages);
    }
  }, [messages, isStreaming]);

  // Abort active request and pending animation frame if component unmounts
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (streamRafRef.current !== null) {
        window.cancelAnimationFrame(streamRafRef.current);
      }
    };
  }, []);

  const scrollThreadToBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  const handleThreadScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distanceFromBottom < 72;
    isAutoScrollEnabledRef.current = nearBottom;
    const shouldShowButton = !nearBottom && el.scrollHeight > el.clientHeight + 120;
    setShowScrollToBottom((prev) => (prev === shouldShowButton ? prev : shouldShowButton));
  }, []);

  // Scroll ONLY the internal chat thread container when user is anchored at the bottom (never outer window!)
  useEffect(() => {
    if (!isAutoScrollEnabledRef.current) return;
    scrollThreadToBottom();
  }, [messages, scrollThreadToBottom]);

  const focusWord: VocabItem | undefined = focusWordId ? VOCAB_BY_ID[focusWordId] : undefined;
  const activeUnitKnowledge =
    typeof unitScope === 'number' ? TUTOR_KNOWLEDGE_BY_UNIT[unitScope] : undefined;

  const scopedWeakWords = useMemo(
    () => getWeakWordsFromProgress(state.progress, unitScope),
    [state.progress, unitScope]
  );

  const allWeakWords = useMemo(
    () => getWeakWordsFromProgress(state.progress, 'all'),
    [state.progress]
  );

  const unitVocabList = useMemo(() => {
    if (typeof unitScope === 'number') {
      return VOCAB_BY_UNIT[unitScope] ?? [];
    }
    // In "all" scope, prioritize weak words + a sample of core words across units
    if (allWeakWords.length > 0) {
      return allWeakWords.map((w) => w.item);
    }
    return ALL_VOCAB.slice(0, 16);
  }, [unitScope, allWeakWords]);

  const weakWordIdSet = useMemo(
    () => new Set(allWeakWords.map((w) => w.item.id)),
    [allWeakWords]
  );

  const starterPrompts = activeUnitKnowledge
    ? activeUnitKnowledge.starterPrompts
    : GLOBAL_STARTER_PROMPTS;

  const activeModel = state.settings.aiModel || DEFAULT_AI_MODEL;
  const knownModelIds = useMemo(() => new Set(AI_MODEL_OPTIONS.map((m) => m.id)), []);

  const handleStopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    if (streamRafRef.current !== null) {
      window.cancelAnimationFrame(streamRafRef.current);
      streamRafRef.current = null;
    }
    pendingStreamTextRef.current = null;
    setIsStreaming(false);
    setStreamingAssistantId(null);
  }, []);

  const handleNewConversation = () => {
    handleStopStreaming();
    isAutoScrollEnabledRef.current = true;
    setShowScrollToBottom(false);
    setMessages([]);
    setErrorState(null);
    saveStoredMessages([]);
  };

  const sendMessage = useCallback(
    async (
      rawText: string,
      overrideOptions?: {
        model?: string;
        mode?: TutorMode;
        unitScope?: UnitScope;
        skipUserBubble?: boolean;
      }
    ) => {
      const trimmed = rawText.trim();
      if (!trimmed || isStreaming) return;

      const effectiveUnitScope = overrideOptions?.unitScope ?? unitScope;
      const effectiveMode = overrideOptions?.mode ?? mode;
      const effectiveModel = overrideOptions?.model ?? activeModel;

      setErrorState(null);

      const userMessage: TutorChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
        unitScope: effectiveUnitScope,
        mode: effectiveMode,
        focusWordLabel: focusWord ? `${focusWord.word} (${focusWord.ipa})` : undefined
      };

      const assistantId = createMessageId();
      const placeholderAssistant: TutorChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
        unitScope: effectiveUnitScope,
        mode: effectiveMode,
        model: effectiveModel
      };

      // Build conversation history window (last 12 messages + new user message)
      const priorMessages = overrideOptions?.skipUserBubble
        ? messages
        : [...messages, userMessage];

      const historyWindow: ChatCompletionMessage[] = priorMessages
        .filter((m) => m.content.trim().length > 0)
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      if (overrideOptions?.skipUserBubble) {
        // Ensure last message is the user prompt
        const lastMsg = historyWindow[historyWindow.length - 1];
        if (!lastMsg || lastMsg.role !== 'user') {
          historyWindow.push({ role: 'user', content: trimmed });
        }
      }

      const systemPrompt = buildTutorSystemPrompt({
        unitScope: effectiveUnitScope,
        mode: effectiveMode,
        progress: state.progress,
        focusWord
      });

      const apiMessages: ChatCompletionMessage[] = [
        { role: 'system', content: systemPrompt },
        ...historyWindow
      ];

      if (!overrideOptions?.skipUserBubble) {
        setDraftInput('');
      }

      isAutoScrollEnabledRef.current = true;
      setShowScrollToBottom(false);

      setMessages((prev) =>
        overrideOptions?.skipUserBubble
          ? [...prev, placeholderAssistant]
          : [...prev, userMessage, placeholderAssistant]
      );

      setIsStreaming(true);
      setStreamingAssistantId(assistantId);

      const controller = new AbortController();
      abortControllerRef.current = controller;
      pendingStreamTextRef.current = null;

      try {
        const result = await streamTutorCompletion({
          apiKey: state.settings.aiApiKey,
          baseUrl: state.settings.aiBaseUrl,
          model: effectiveModel,
          messages: apiMessages,
          signal: controller.signal,
          onDelta: (_delta, accumulated) => {
            pendingStreamTextRef.current = accumulated;
            if (streamRafRef.current === null) {
              streamRafRef.current = window.requestAnimationFrame(() => {
                streamRafRef.current = null;
                const latest = pendingStreamTextRef.current;
                if (latest === null) return;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: latest } : m))
                );
              });
            }
          }
        });

        if (streamRafRef.current !== null) {
          window.cancelAnimationFrame(streamRafRef.current);
          streamRafRef.current = null;
        }
        pendingStreamTextRef.current = null;

        setMessages((prev) => {
          const finalText = result.content.trim();
          if (!finalText) {
            return prev.filter((m) => m.id !== assistantId);
          }
          return prev.map((m) =>
            m.id === assistantId ? { ...m, content: result.content, model: result.model } : m
          );
        });
      } catch (err) {
        if (streamRafRef.current !== null) {
          window.cancelAnimationFrame(streamRafRef.current);
          streamRafRef.current = null;
        }
        pendingStreamTextRef.current = null;
        if (err instanceof AiClientError && err.code === 'ABORTED') {
          // Keep whatever partial tokens arrived, or drop empty placeholder
          setMessages((prev) =>
            prev.filter((m) => !(m.id === assistantId && m.content.trim().length === 0))
          );
        } else {
          // Remove empty placeholder
          setMessages((prev) =>
            prev.filter((m) => !(m.id === assistantId && m.content.trim().length === 0))
          );

          if (err instanceof AiClientError) {
            setErrorState({
              code: err.code,
              status: err.status,
              model: err.model,
              message: err.message,
              retryText: trimmed
            });
          } else {
            setErrorState({
              code: 'HTTP_ERROR',
              message: 'Đã xảy ra lỗi không xác định khi gọi Gia sư AI.',
              retryText: trimmed
            });
          }
        }
      } finally {
        abortControllerRef.current = null;
        setIsStreaming(false);
        setStreamingAssistantId(null);
      }
    },
    [
      activeModel,
      focusWord,
      isStreaming,
      messages,
      mode,
      state.progress,
      state.settings.aiApiKey,
      state.settings.aiBaseUrl,
      unitScope
    ]
  );

  const handleSwitchToFreeAndRetry = (andRetry: boolean) => {
    const freeModel = 'deepseek-v4.1-flash:free';
    onUpdateSettings({ aiModel: freeModel });
    const retryPrompt = errorState?.retryText;
    setErrorState(null);
    if (andRetry && retryPrompt) {
      void sendMessage(retryPrompt, { model: freeModel, skipUserBubble: true });
    }
  };

  const handleCopyMessage = async (msg: TutorChatMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleChangeUnitScope = (nextScope: UnitScope) => {
    setUnitScope(nextScope);
    setShowAllVocabChips(false);
    if (typeof nextScope === 'number' && focusWord && focusWord.unit !== nextScope) {
      setFocusWordId(undefined);
    }
  };

  const handleSelectVocabChip = (word: VocabItem) => {
    if (focusWordId === word.id) {
      setFocusWordId(undefined);
    } else {
      setFocusWordId(word.id);
      if (unitScope === 'all' || unitScope !== word.unit) {
        setUnitScope(word.unit);
      }
    }
  };

  const handleComposerKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(draftInput);
    }
  };

  const displayedVocabChips = showAllVocabChips ? unitVocabList : unitVocabList.slice(0, 12);
  const currentModeObj = TUTOR_MODE_META.find((m) => m.id === mode) ?? TUTOR_MODE_META[0];
  const speechSupported = isSpeechSupported();

  return (
    <div className="space-y-4">
      {/* Mobile Sidebar Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 truncate">
          <Bot className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {typeof unitScope === 'number' ? `Unit ${unitScope}` : 'Tất cả 8 Units'} •{' '}
            {currentModeObj.shortLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-ring shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>{mobileSidebarOpen ? 'Ẩn bảng chọn' : 'Chọn Unit & Ngữ pháp'}</span>
        </button>
      </div>

      {/* Main 2-Column EdTech Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Left Sidebar */}
        <aside
          className={`${
            mobileSidebarOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-[330px] xl:w-[360px] shrink-0 space-y-4`}
        >
          {/* Unit Scope & Mode Panel */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-4">
            {/* Unit Scope Selector */}
            <div className="space-y-2">
              <label
                htmlFor="tutor-unit-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Phạm vi bài học (HaUI EEE5)
              </label>
              <select
                id="tutor-unit-select"
                value={String(unitScope)}
                onChange={(e) => {
                  const val = e.target.value;
                  handleChangeUnitScope(val === 'all' ? 'all' : Number(val));
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="all">Tất cả 8 Units (252 từ • Tổng hợp)</option>
                {UNIT_TUTOR_KNOWLEDGE.map((u) => (
                  <option key={u.unit} value={u.unit}>
                    Unit {u.unit}: {u.vietnameseTitle}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleChangeUnitScope('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors focus-ring ${
                    unitScope === 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Tất cả
                </button>
                {UNIT_TUTOR_KNOWLEDGE.map((u) => (
                  <button
                    key={u.unit}
                    type="button"
                    onClick={() => handleChangeUnitScope(u.unit)}
                    title={`Unit ${u.unit}: ${u.title}`}
                    className={`px-2 py-1 rounded-lg font-mono text-xs font-bold border transition-colors focus-ring ${
                      unitScope === u.unit
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    U{u.unit}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Tutor Mode Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Chế độ Gia sư AI
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TUTOR_MODE_META.map((m) => {
                  const active = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      title={m.description}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all focus-ring ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className={active ? 'text-blue-600' : 'text-slate-500'}>
                        {MODE_ICON[m.id]}
                      </span>
                      <span className="leading-tight">{m.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{currentModeObj.description}</p>
            </div>
          </section>

          {/* Unit Grammar & Expressions Cheat Sheet */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <button
              type="button"
              onClick={() => setCheatSheetOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 text-left focus-ring rounded-lg"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {activeUnitKnowledge
                    ? `Language Focus • Unit ${activeUnitKnowledge.unit}`
                    : 'Ngữ pháp trọng tâm 8 Units'}
                </span>
              </div>
              {cheatSheetOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
              )}
            </button>

            {cheatSheetOpen && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
                {activeUnitKnowledge ? (
                  <>
                    {activeUnitKnowledge.languageFocus.map((gp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5 space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-slate-900 leading-snug">{gp.title}</div>
                          <button
                            type="button"
                            disabled={isStreaming}
                            onClick={() => {
                              setMode('qa');
                              void sendMessage(
                                `Giải thích kỹ phần "${gp.title}" của Unit ${activeUnitKnowledge.unit} kèm ví dụ và bài tập ngắn.`,
                                { mode: 'qa' }
                              );
                            }}
                            className="shrink-0 px-2 py-0.5 rounded-md bg-blue-100/80 hover:bg-blue-200 text-blue-800 text-[10px] font-bold transition-colors disabled:opacity-50"
                          >
                            Hỏi AI
                          </button>
                        </div>
                        <ul className="space-y-1 text-slate-700 font-mono text-[11px]">
                          {gp.formulas.map((f, fIdx) => (
                            <li key={fIdx} className="leading-snug">
                              • {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {activeUnitKnowledge.keyExpressions.map((eg, idx) => (
                      <div
                        key={`expr-${idx}`}
                        className="rounded-xl border border-blue-100 bg-blue-50/40 p-2.5 space-y-1"
                      >
                        <div className="font-bold text-blue-950">{eg.category}</div>
                        <ul className="space-y-0.5 text-slate-700 text-[11px]">
                          {eg.phrases.map((p, pIdx) => (
                            <li key={pIdx}>• {p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="space-y-1.5">
                    {UNIT_TUTOR_KNOWLEDGE.map((u) => (
                      <button
                        key={u.unit}
                        type="button"
                        onClick={() => handleChangeUnitScope(u.unit)}
                        className="w-full text-left rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-200 p-2.5 transition-colors focus-ring"
                      >
                        <div className="font-bold text-slate-900">
                          Unit {u.unit}: {u.vietnameseTitle}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {u.languageFocus.map((g) => g.title).join(' • ')}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Clickable Vocab & Weak Words Chips */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {typeof unitScope === 'number'
                  ? `Từ vựng Unit ${unitScope} (${unitVocabList.length})`
                  : allWeakWords.length > 0
                    ? `Từ hay sai (${allWeakWords.length})`
                    : 'Từ vựng gợi ý'}
              </div>
              {scopedWeakWords.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold">
                  <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                  <span>{scopedWeakWords.length} từ hay sai</span>
                </span>
              )}
            </div>

            {scopedWeakWords.length > 0 && (
              <div className="rounded-xl border border-rose-200/80 bg-rose-50/40 p-2.5 space-y-1.5">
                <div className="text-[11px] font-bold text-rose-800">
                  Ưu tiên ôn lại (wrongCount &gt; 0):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {scopedWeakWords.slice(0, 8).map(({ item, progress: wp }) => {
                    const selected = focusWordId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectVocabChip(item)}
                        title={`${item.meaning} • Sai ${wp.wrongCount} lần`}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border transition-colors focus-ring ${
                          selected
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        <span>{item.word}</span>
                        <span className="font-mono text-[10px] opacity-80">×{wp.wrongCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {displayedVocabChips.map((word) => {
                const selected = focusWordId === word.id;
                const isWeak = weakWordIdSet.has(word.id);
                return (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => handleSelectVocabChip(word)}
                    title={`${word.word} (${word.pos}) ${word.ipa} — ${word.meaning}`}
                    className={`px-2 py-1 rounded-lg text-xs font-medium border transition-colors focus-ring ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                        : isWeak
                          ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-200'
                    }`}
                  >
                    {word.word}
                  </button>
                );
              })}
            </div>

            {unitVocabList.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllVocabChips((v) => !v)}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 focus-ring rounded"
              >
                {showAllVocabChips
                  ? 'Thu gọn danh sách từ'
                  : `Xem tất cả ${unitVocabList.length} từ`}
              </button>
            )}
          </section>

          {/* Unit-specific Quick Prompt Starters */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>Gợi ý bắt đầu nhanh</span>
            </div>
            <div className="space-y-1.5">
              {starterPrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isStreaming}
                  onClick={() => {
                    setMode(sp.mode);
                    setMobileSidebarOpen(false);
                    void sendMessage(sp.prompt, { mode: sp.mode });
                  }}
                  className={`w-full text-left rounded-xl border px-3 py-2 text-xs transition-colors focus-ring disabled:opacity-50 ${
                    sp.mode === mode
                      ? 'border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-blue-950 font-semibold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  <span className="inline-block font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 mr-1.5">
                    {sp.mode}
                  </span>
                  <span>{sp.label}</span>
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Right Chat Area */}
        <section className="w-full lg:flex-1 min-w-0 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xs h-[calc(100dvh-13.5rem)] min-h-[460px] lg:h-[calc(100vh-10rem)] lg:min-h-[520px] lg:sticky lg:top-[5.25rem] overflow-hidden">
          {/* Chat Header */}
          <header className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    Gia sư AI EEE5
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold">
                    <Cpu className="w-3 h-3" aria-hidden="true" />
                    <span>DeepSeek v4.1 Flash</span>
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {typeof unitScope === 'number'
                    ? `Unit ${unitScope}: ${activeUnitKnowledge?.vietnameseTitle ?? ''}`
                    : 'Toàn bộ 8 Units (HaUI EEE5)'}{' '}
                  • {currentModeObj.label}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Model Switcher */}
              <select
                aria-label="Chọn model AI"
                value={activeModel}
                onChange={(e) => onUpdateSettings({ aiModel: e.target.value })}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 max-w-[205px]"
              >
                {AI_MODEL_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.id}
                  </option>
                ))}
                {!knownModelIds.has(activeModel) && (
                  <option value={activeModel}>{activeModel}</option>
                )}
              </select>

              {/* Speech Rate Toggle */}
              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({ speechRate: state.settings.speechRate === 1.0 ? 0.8 : 1.0 })
                }
                title="Đổi tốc độ phát âm ví dụ tiếng Anh (0.8x / 1.0x)"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 transition-colors focus-ring tabular-nums"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>{state.settings.speechRate.toFixed(1)}x</span>
              </button>

              {/* New Conversation */}
              <button
                type="button"
                onClick={handleNewConversation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors focus-ring"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>Cuộc trò chuyện mới</span>
              </button>
            </div>
          </header>

          {/* Scrollable Message Thread Wrapper */}
          <div className="relative flex-1 min-h-0 flex flex-col bg-slate-50/35">
            <div
              ref={scrollContainerRef}
              onScroll={handleThreadScroll}
              className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 space-y-4"
            >
            {messages.length === 0 ? (
              <div className="max-w-2xl mx-auto py-4 space-y-5">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 space-y-3 shadow-2xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Bám sát 100% giáo trình HaUI EEE5 • 252 từ chuyên ngành</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Xin chào! Mình là Gia sư AI Tiếng Anh Điện – Điện tử.
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Mình đã nạp sẵn toàn bộ từ vựng (kèm IPA), cấu trúc ngữ pháp <em>Language Focus</em>, mẫu câu giao tiếp và nhiệm vụ Speaking/Writing của cả 8 Units.
                    {allWeakWords.length > 0
                      ? ` Hệ thống đang theo dõi ${allWeakWords.length} từ bạn hay làm sai để lồng ghép ôn tập cho bạn.`
                      : ' Hãy chọn một gợi ý bên dưới hoặc đặt câu hỏi bất kỳ để bắt đầu!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starterPrompts.map((sp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isStreaming}
                      onClick={() => {
                        setMode(sp.mode);
                        void sendMessage(sp.prompt, { mode: sp.mode });
                      }}
                      className="text-left rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 p-4 shadow-2xs transition-all space-y-1.5 focus-ring"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                        {MODE_ICON[sp.mode]}
                        <span>{sp.label}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {sp.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isUser = msg.role === 'user';
                const isActiveStreamBubble = isStreaming && msg.id === streamingAssistantId;
                const englishSpeechText =
                  !isUser && !isActiveStreamBubble && msg.content
                    ? extractAllEnglishPhrases(msg.content)
                    : '';

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {isUser ? (
                      <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-md bg-blue-600 text-white px-4 py-3 shadow-xs space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-blue-100">
                          <span>
                            {typeof msg.unitScope === 'number' ? `Unit ${msg.unitScope}` : '8 Units'}
                          </span>
                          <span>•</span>
                          <span className="uppercase">{msg.mode}</span>
                          {msg.focusWordLabel && (
                            <>
                              <span>•</span>
                              <span className="bg-white/15 px-1.5 py-0.5 rounded">
                                {msg.focusWordLabel}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <article className="max-w-[95%] sm:max-w-[86%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 sm:px-5 py-3.5 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                            <Bot className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <span>Gia sư AI</span>
                            {msg.model && (
                              <span className="font-mono text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                {msg.model}
                              </span>
                            )}
                          </div>
                          {isActiveStreamBubble && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 animate-pulse">
                              Đang trả lời...
                            </span>
                          )}
                        </div>

                        {msg.content ? (
                          <MarkdownMessage
                            content={msg.content}
                            settings={state.settings}
                            enableSpeechButtons={!isActiveStreamBubble}
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 py-2 text-xs text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:120ms]" />
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:240ms]" />
                            <span className="ml-1">Đang soạn câu trả lời...</span>
                          </div>
                        )}

                        {msg.content && !isActiveStreamBubble && (
                          <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => handleCopyMessage(msg)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-ring"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                                  <span className="text-emerald-700">Đã sao chép</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Sao chép</span>
                                </>
                              )}
                            </button>

                            {speechSupported && englishSpeechText && (
                              <button
                                type="button"
                                onClick={() => speakText(englishSpeechText, state.settings)}
                                title="Đọc các câu ví dụ tiếng Anh trong phản hồi này"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100 transition-colors focus-ring"
                              >
                                <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Đọc tiếng Anh</span>
                              </button>
                            )}
                          </div>
                        )}
                      </article>
                    )}
                  </div>
                );
              })
            )}

            {/* Error Banner (including special HTTP 402 1-click switch) */}
            {errorState && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <div className="font-bold">
                      {errorState.status === 402
                        ? 'Model hiện tại yêu cầu trả phí (HTTP 402 Payment Required)'
                        : 'Không thể nhận phản hồi từ AI'}
                    </div>
                    <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
                      {errorState.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pl-7">
                  {errorState.status === 402 && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSwitchToFreeAndRetry(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-colors focus-ring"
                      >
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Chuyển về deepseek-v4.1-flash:free &amp; Gửi lại</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSwitchToFreeAndRetry(false)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-semibold transition-colors focus-ring"
                      >
                        <span>Chỉ chuyển về :free</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigate('#/settings')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-100/60 text-rose-800 px-3 py-2 text-xs font-semibold transition-colors focus-ring"
                  >
                    <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Mở Cài đặt AI</span>
                  </button>
                </div>
              </div>
            )}

            </div>

            {showScrollToBottom && (
              <button
                type="button"
                onClick={() => {
                  isAutoScrollEnabledRef.current = true;
                  setShowScrollToBottom(false);
                  scrollThreadToBottom();
                }}
                className="absolute bottom-3 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 backdrop-blur-xs px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-md hover:bg-slate-50 hover:text-blue-700 transition-colors focus-ring"
              >
                <ArrowDown className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>Xuống cuối</span>
              </button>
            )}
          </div>

          {/* Bottom Composer */}
          <div className="border-t border-slate-200 bg-white p-3 sm:p-4 space-y-2.5">
            {focusWord && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-blue-950">
                  <span className="font-bold">Từ đang tập trung:</span>
                  <span className="font-bold text-blue-700">{focusWord.word}</span>
                  <span className="font-mono text-slate-600">{focusWord.ipa}</span>
                  <span className="text-slate-600">— {focusWord.meaning}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={isStreaming}
                    onClick={() =>
                      void sendMessage(
                        `Giải thích chi tiết từ "${focusWord.word}" (${focusWord.ipa} — ${focusWord.meaning}), đồng nghĩa/word family và đặt 2 câu ví dụ theo ngữ pháp Unit ${focusWord.unit}.`
                      )
                    }
                    className="px-2 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50"
                  >
                    Hỏi ngay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFocusWordId(undefined)}
                    aria-label="Bỏ chọn từ tập trung"
                    className="p-0.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-blue-100"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage(draftInput);
              }}
              className="flex items-end gap-2.5"
            >
              <textarea
                ref={textareaRef}
                rows={2}
                value={draftInput}
                onChange={(e) => setDraftInput(e.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={
                  mode === 'writing'
                    ? 'Dán đoạn văn / email / CV / mô tả biểu đồ tiếng Anh của bạn vào đây để Gia sư AI chấm chữa...'
                    : mode === 'roleplay'
                      ? 'Nhập câu trả lời hội thoại bằng tiếng Anh (hoặc nhấn Enter để bắt đầu)...'
                      : mode === 'quiz'
                        ? 'Nhập đáp án của bạn hoặc yêu cầu chủ đề kiểm tra (Enter để gửi, Shift+Enter xuống dòng)...'
                        : 'Hỏi từ vựng, IPA, ngữ pháp hoặc bài tập Unit... (Enter để gửi, Shift+Enter xuống dòng)'
                }
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 max-h-36"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 text-sm font-bold shadow-xs transition-colors focus-ring shrink-0"
                >
                  <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Dừng</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!draftInput.trim()}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-bold shadow-xs transition-colors focus-ring shrink-0 disabled:opacity-45"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Gửi</span>
                </button>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
