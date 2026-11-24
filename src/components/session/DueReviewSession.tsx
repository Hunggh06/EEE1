import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  RotateCcw,
  Trophy,
  Volume2,
  XCircle
} from 'lucide-react';
import { ALL_VOCAB, VOCAB_BY_ID, getUnitVocab } from '../../data/vocab';
import {
  type ReviewMode,
  type ReviewQueueState,
  advanceReviewQueue,
  createReviewQueue,
  getMaxHintRevealCount,
  submitReviewAnswer
} from '../../engine/drillingQueue';
import { SRS_INTERVAL_DAYS, getDueWords } from '../../engine/srs';
import type { AppSettings, SrsLevel, StudyState, WordProgress } from '../../types/vocab';
import {
  playCompleteSound,
  playCorrectSound,
  playHintSound,
  playWrongSound
} from '../../utils/soundEffects';
import { speakText, stopSpeaking } from '../../utils/speech';
import { ClozeSentenceText } from '../common/ClozeSentenceText';
import { HighlightedExample } from '../common/HighlightedExample';
import { LetterHintInput } from '../common/LetterHintInput';
import { SpeakButton } from '../common/SpeakButton';
import { SrsBadge } from '../common/SrsBadge';

interface DueReviewSessionProps {
  unitFilter?: number;
  state: StudyState;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onApplyReviewWord: (wordId: string, progress: WordProgress) => void;
  onFinishReviewSession: (reviewedCount: number) => void;
  onNavigate: (hash: string) => void;
}

const MODE_META: Record<ReviewMode, { badge: string; instruction: string }> = {
  listen_type: {
    badge: 'Nghe - gõ',
    instruction: 'Nghe phát âm tiếng Anh và gõ lại chính xác từ vựng.'
  },
  cloze: {
    badge: 'Điền khuyết ngữ cảnh',
    instruction: 'Đọc câu kỹ thuật và điền từ tiếng Anh còn thiếu vào chỗ trống.'
  },
  meaning_type: {
    badge: 'Nghĩa → gõ từ',
    instruction: 'Nhìn nghĩa tiếng Việt và nhớ lại cách viết tiếng Anh tương ứng.'
  }
};

export function DueReviewSession({
  unitFilter,
  state,
  onUpdateSettings,
  onApplyReviewWord,
  onFinishReviewSession,
  onNavigate
}: DueReviewSessionProps) {
  // Capture snapshot of due words when review session mounts / unitFilter changes
  const initialDueWords = useMemo(() => {
    const source = unitFilter ? getUnitVocab(unitFilter) : ALL_VOCAB;
    return getDueWords(source, state.progress, Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitFilter]);

  const [reviewState, setReviewState] = useState<ReviewQueueState>(() =>
    createReviewQueue(initialDueWords.map((w) => w.id))
  );
  const [typedAnswer, setTypedAnswer] = useState('');
  const [revealedCount, setRevealedCount] = useState(0);
  const [showHintMeaning, setShowHintMeaning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  const completedReportedRef = useRef(false);

  const currentQueueItem = reviewState.queue[0];
  const currentItem = currentQueueItem ? VOCAB_BY_ID[currentQueueItem.wordId] : undefined;
  const feedback = reviewState.feedback;

  // Report completion once when queue finishes
  useEffect(() => {
    if (
      reviewState.isCompleted &&
      reviewState.initialWordIds.length > 0 &&
      !completedReportedRef.current
    ) {
      completedReportedRef.current = true;
      playCompleteSound();
      onFinishReviewSession(reviewState.initialWordIds.length);
    }
  }, [reviewState.isCompleted, reviewState.initialWordIds.length, onFinishReviewSession]);

  // Reset input controls when moving to next turn
  useEffect(() => {
    setTypedAnswer('');
    setRevealedCount(0);
    setShowHintMeaning(false);
  }, [currentQueueItem?.wordId, turnCount]);

  // Auto-play audio ONLY for 'listen_type' mode before answering
  useEffect(() => {
    if (!currentItem || !currentQueueItem || feedback !== null || !state.settings.autoPlayAudio) {
      return;
    }
    if (currentQueueItem.mode === 'listen_type') {
      const timer = window.setTimeout(() => {
        speakText(currentItem.word, state.settings);
      }, 120);
      return () => window.clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQueueItem?.wordId, currentQueueItem?.mode, turnCount]);

  const handleSubmit = () => {
    if (!currentItem || feedback !== null || !typedAnswer.trim()) return;
    const { state: nextState, updatedWordProgress } = submitReviewAnswer(
      reviewState,
      typedAnswer,
      VOCAB_BY_ID,
      state.progress,
      Date.now()
    );

    if (updatedWordProgress) {
      onApplyReviewWord(updatedWordProgress.wordId, updatedWordProgress.progress);
    }
    setReviewState(nextState);
    if (nextState.feedback?.isCorrect) {
      playCorrectSound();
    } else if (nextState.feedback) {
      playWrongSound();
    }
    const speechDelay = state.settings.soundEffectsEnabled ? 180 : 0;
    window.setTimeout(() => speakText(currentItem.word, state.settings), speechDelay);
  };

  const handleAdvance = () => {
    if (!feedback) return;
    setReviewState((prev) => advanceReviewQueue(prev));
    setTurnCount((t) => t + 1);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (feedback !== null && e.key === 'Enter') {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback]);

  if (initialDueWords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          {unitFilter
            ? `Unit ${unitFilter} không có từ nào đến hạn ôn tập!`
            : 'Không có từ nào đến hạn ôn tập lúc này!'}
        </h1>
        <p className="text-sm text-slate-600">
          Các từ đã học đang nằm trong khoảng thời gian ghi nhớ an toàn. Bạn có thể học thêm từ mới
          hoặc kiểm tra lại ở mục Từ điển Units.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {unitFilter && (
            <button
              type="button"
              onClick={() => onNavigate(`#/unit/${unitFilter}`)}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold focus-ring"
            >
              Về Unit {unitFilter}
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('#/')}
            className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 text-sm font-semibold focus-ring"
          >
            Về Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Review Summary View
  if (reviewState.isCompleted) {
    const total = reviewState.initialWordIds.length;
    const firstAcc =
      total > 0 ? Math.round((reviewState.correctFirstAttempts / total) * 100) : 100;

    return (
      <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <Trophy className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hoàn thành phiên ôn tập SRS!
          </h1>
          <p className="text-sm text-slate-600">
            Đã ôn tập xong <strong>{total} từ đến hạn</strong>
            {unitFilter ? ` thuộc Unit ${unitFilter}` : ''}. Lịch nhắc ôn tiếp theo đã được cập nhật.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center">
            <div className="text-xs font-semibold text-slate-500">Tổng từ đã ôn</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {total}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
            <div className="text-xs font-semibold text-emerald-800">Đúng ngay lần đầu</div>
            <div className="mt-1 text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {reviewState.correctFirstAttempts}/{total} ({firstAcc}%)
            </div>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center">
            <div className="text-xs font-semibold text-blue-800">Tổng lượt trả lời</div>
            <div className="mt-1 text-2xl font-extrabold text-blue-800 font-mono tabular-nums">
              {reviewState.totalAttempts}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kết quả cập nhật cấp độ Leitner
          </div>
          <div className="divide-y divide-slate-200/70">
            {reviewState.initialWordIds.map((wordId) => {
              const item = VOCAB_BY_ID[wordId];
              const outcome = reviewState.srsOutcomesById[wordId];
              if (!item || !outcome) return null;

              const days = SRS_INTERVAL_DAYS[outcome.newLevel as Exclude<SrsLevel, 0>];

              return (
                <div
                  key={wordId}
                  className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <SpeakButton text={item.word} settings={state.settings} size="sm" variant="ghost" />
                    <span className="font-bold text-slate-900">{item.word}</span>
                    <span className="text-slate-500">— {item.meaning}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
                    <span
                      className={`px-2.5 py-1 rounded-lg border font-semibold ${
                        outcome.isCorrectOnFirstAttempt
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}
                    >
                      {outcome.isCorrectOnFirstAttempt
                        ? `Lv ${outcome.previousLevel} → Lv ${outcome.newLevel} (+${days} ngày)`
                        : `Sai → Lv 1 (+1 ngày)`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {unitFilter && (
            <button
              type="button"
              onClick={() => onNavigate(`#/unit/${unitFilter}`)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 text-sm font-semibold focus-ring"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Quay về Unit {unitFilter}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('#/')}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-bold shadow-xs focus-ring"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Về Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem || !currentQueueItem) return null;

  const evaluatedCount = Object.keys(reviewState.firstAttemptEvaluated).length;
  const totalUnique = reviewState.initialWordIds.length;
  const progressPct =
    totalUnique > 0
      ? Math.round(((totalUnique - reviewState.queue.length) / totalUnique) * 100)
      : 0;
  const modeMeta = MODE_META[currentQueueItem.mode];
  const isRetry = Boolean(reviewState.requeuedIds[currentItem.id]);
  const currentWp = state.progress[currentItem.id];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            onNavigate(unitFilter ? `#/unit/${unitFilter}` : '#/');
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus-ring rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{unitFilter ? `Thoát về Unit ${unitFilter}` : 'Thoát về Dashboard'}</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateSettings({ speechRate: state.settings.speechRate === 1.0 ? 0.8 : 1.0 })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-semibold text-slate-700 transition-colors focus-ring tabular-nums"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Tốc độ: {state.settings.speechRate.toFixed(1)}x</span>
        </button>
      </div>

      {/* Review Progress Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
              Chế độ: {modeMeta.badge}
            </span>
            {isRetry && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Luyện lại từ sai</span>
              </span>
            )}
            {currentWp && <SrsBadge level={currentWp.level} showText={false} />}
          </div>

          <div className="font-mono text-xs text-slate-600 tabular-nums">
            Còn lại: <strong className="text-slate-900">{reviewState.queue.length}</strong> /{' '}
            {totalUnique} từ (Đã chấm: {evaluatedCount})
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500">{modeMeta.instruction}</p>

        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            style={{ width: `${Math.max(4, progressPct)}%` }}
            className="h-full bg-amber-500 transition-all duration-300"
          />
        </div>
      </div>

      {/* Prompt Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {currentQueueItem.mode === 'listen_type' && (
          <div className="space-y-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                Unit {currentItem.unit} • {currentItem.pos}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                {currentItem.topic}
              </span>
            </div>

            <div className="py-2 flex flex-col items-center gap-3">
              <SpeakButton
                text={currentItem.word}
                settings={state.settings}
                label="Nghe phát âm để gõ lại từ"
                size="lg"
                variant="primary"
              />
              <button
                type="button"
                onClick={() => setShowHintMeaning((s) => !s)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors focus-ring rounded px-2 py-1"
              >
                {showHintMeaning ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ẩn gợi ý nghĩa</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Xem gợi ý nghĩa tiếng Việt</span>
                  </>
                )}
              </button>
              {showHintMeaning && (
                <p className="text-base font-bold text-blue-700">{currentItem.meaning}</p>
              )}
            </div>
          </div>
        )}

        {currentQueueItem.mode === 'cloze' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  Unit {currentItem.unit} • {currentItem.pos}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                  {currentItem.topic}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowHintMeaning((s) => !s)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 focus-ring"
              >
                {showHintMeaning ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ẩn nghĩa</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Xem nghĩa tiếng Việt</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
              <p className="text-lg sm:text-xl text-slate-900 leading-relaxed font-medium">
                <ClozeSentenceText clozeSentence={currentItem.clozeSentence} />
              </p>
              {showHintMeaning && (
                <p className="mt-3 pt-3 border-t border-slate-200/80 text-sm font-semibold text-blue-700">
                  Nghĩa: {currentItem.meaning}
                </p>
              )}
            </div>
          </div>
        )}

        {currentQueueItem.mode === 'meaning_type' && (
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                Unit {currentItem.unit} • {currentItem.pos}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                {currentItem.topic}
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nghĩa tiếng Việt
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentItem.meaning}
            </h2>
          </div>
        )}

        <LetterHintInput
          targetWord={currentItem.word}
          value={typedAnswer}
          onChange={setTypedAnswer}
          onSubmit={handleSubmit}
          disabled={feedback !== null}
          revealedCount={revealedCount}
          onRevealMore={() => {
            playHintSound();
            setRevealedCount((c) => Math.min(getMaxHintRevealCount(currentItem.word), c + 1));
          }}
          feedbackState={feedback ? (feedback.isCorrect ? 'correct' : 'incorrect') : null}
        />

        {/* Feedback Banner */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 font-bold text-base">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>Chính xác!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                    <span>Chưa đúng — sẽ lặp lại ở cuối phiên ôn tập</span>
                  </>
                )}

                {feedback.srsOutcome ? (
                  <span
                    className={`font-mono text-xs px-2.5 py-0.5 rounded-md border ${
                      feedback.srsOutcome.isCorrectOnFirstAttempt
                        ? 'bg-white border-emerald-300 text-emerald-800'
                        : 'bg-white border-rose-300 text-rose-800'
                    }`}
                  >
                    {feedback.srsOutcome.isCorrectOnFirstAttempt
                      ? `Lv ${feedback.srsOutcome.previousLevel} → Lv ${feedback.srsOutcome.newLevel} (+${
                          SRS_INTERVAL_DAYS[
                            feedback.srsOutcome.newLevel as Exclude<SrsLevel, 0>
                          ]
                        } ngày)`
                      : 'Sai → Tụt về Lv 1 (+1 ngày)'}
                  </span>
                ) : (
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md border bg-white/80 border-slate-300 text-slate-700">
                    Lượt luyện lại (không đổi SRS)
                  </span>
                )}
              </div>

              <div className="text-sm space-y-1">
                <div>
                  Đáp án:{' '}
                  <strong className="font-mono text-base underline decoration-2 underline-offset-2">
                    {feedback.correctAnswer}
                  </strong>{' '}
                  <span className="font-mono text-xs opacity-75">({currentItem.ipa})</span> —{' '}
                  <span>{currentItem.meaning}</span>
                </div>
                <p className="text-xs sm:text-sm opacity-90">
                  <HighlightedExample
                    sentence={currentItem.example}
                    targetWord={currentItem.word}
                  />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SpeakButton text={currentItem.word} settings={state.settings} size="sm" variant="outline" />
              <button
                type="button"
                onClick={handleAdvance}
                className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-colors focus-ring ${
                  feedback.isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                <span>{feedback.willRequeue ? 'Đã hiểu, tiếp tục' : 'Tiếp tục'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
