import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
  XCircle
} from 'lucide-react';
import {
  type DrillingQueueState,
  advanceDrillingQueue,
  createDrillingQueue,
  generateRound1Choices,
  getDrillingProgressMetrics,
  getMaxHintRevealCount,
  submitDrillingAnswer
} from '../../engine/drillingQueue';
import type { AppSettings, VocabItem } from '../../types/vocab';
import { playCorrectSound, playHintSound, playWrongSound } from '../../utils/soundEffects';
import { speakText } from '../../utils/speech';
import { ClozeSentenceText } from '../common/ClozeSentenceText';
import { HighlightedExample } from '../common/HighlightedExample';
import { LetterHintInput } from '../common/LetterHintInput';
import { SpeakButton } from '../common/SpeakButton';

interface DrillingStageProps {
  chunk: VocabItem[];
  unitVocab: VocabItem[];
  allVocab: VocabItem[];
  vocabById: Record<string, VocabItem>;
  settings: AppSettings;
  onComplete: (mistakesById: Record<string, number>, totalAttempts: number, correctAttempts: number) => void;
}

const ROUND_INFO: Record<1 | 2 | 3, { title: string; subtitle: string }> = {
  1: {
    title: 'Vòng 1/3: Nhận diện nghĩa',
    subtitle: 'Nghe phát âm và chọn nghĩa tiếng Việt chính xác (phím tắt 1–4).'
  },
  2: {
    title: 'Vòng 2/3: Chính tả (Spelling)',
    subtitle: 'Nghe phát âm, đọc nghĩa tiếng Việt và gõ chính xác từ tiếng Anh.'
  },
  3: {
    title: 'Vòng 3/3: Ngữ cảnh (Cloze Test)',
    subtitle: 'Điền từ hoàn chỉnh vào chỗ trống dựa theo ngữ cảnh câu chuyên ngành.'
  }
};

export function DrillingStage({
  chunk,
  unitVocab,
  allVocab,
  vocabById,
  settings,
  onComplete
}: DrillingStageProps) {
  const [queueState, setQueueState] = useState<DrillingQueueState>(() =>
    createDrillingQueue(chunk.map((c) => c.id))
  );
  const [typedAnswer, setTypedAnswer] = useState('');
  const [revealedCount, setRevealedCount] = useState(0);
  const [peekMeaning, setPeekMeaning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  const currentId = queueState.queue[0];
  const currentItem = currentId ? vocabById[currentId] : undefined;
  const feedback = queueState.feedback;
  const metrics = getDrillingProgressMetrics(queueState);

  // Trigger completion callback once queueState transitions to isCompleted
  useEffect(() => {
    if (queueState.isCompleted) {
      onComplete(
        queueState.mistakesById,
        queueState.totalAttempts,
        queueState.correctAttempts
      );
    }
  }, [queueState.isCompleted, queueState.mistakesById, queueState.totalAttempts, queueState.correctAttempts, onComplete]);

  // Generate 4 choices once per active Round 1 turn
  const round1Choices = useMemo(() => {
    if (!currentItem || queueState.round !== 1) return [];
    return generateRound1Choices(currentItem, unitVocab, allVocab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueState.round, currentId, turnCount]);

  // Reset per-question UI state when advancing to the next turn
  useEffect(() => {
    setTypedAnswer('');
    setRevealedCount(0);
    setPeekMeaning(false);
  }, [queueState.round, currentId, turnCount]);

  // Auto-play audio in Round 1 and Round 2 (never spoil Round 3 Cloze before submission!)
  useEffect(() => {
    if (!currentItem || feedback !== null || !settings.autoPlayAudio) return;
    if (queueState.round === 1 || queueState.round === 2) {
      const t = window.setTimeout(() => {
        speakText(currentItem.word, settings);
      }, 100);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueState.round, currentId, turnCount]);

  const handleRound1Select = (choice: string) => {
    if (feedback !== null || !currentItem) return;
    const next = submitDrillingAnswer(queueState, choice, vocabById);
    setQueueState(next);
    if (next.feedback) {
      if (next.feedback.isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
        const delay = settings.soundEffectsEnabled ? 180 : 0;
        window.setTimeout(() => speakText(currentItem.word, settings), delay);
      }
    }
  };

  const handleTypedSubmit = () => {
    if (feedback !== null || !currentItem || !typedAnswer.trim()) return;
    const next = submitDrillingAnswer(queueState, typedAnswer, vocabById);
    setQueueState(next);
    if (next.feedback) {
      if (next.feedback.isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
      // In Round 3 Cloze or on wrong answer in Round 2, play pronunciation slightly after chime
      if (queueState.round === 3 || !next.feedback.isCorrect) {
        const delay = settings.soundEffectsEnabled ? 180 : 0;
        window.setTimeout(() => speakText(currentItem.word, settings), delay);
      }
    }
  };

  const handleAdvance = () => {
    if (!feedback) return;
    setQueueState((prev) => advanceDrillingQueue(prev));
    setTurnCount((t) => t + 1);
  };

  // Keyboard shortcuts: 1-4 in Round 1, Enter to advance when feedback is shown
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (feedback !== null) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAdvance();
        }
        return;
      }

      if (queueState.round === 1 && ['1', '2', '3', '4'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        if (round1Choices[idx]) {
          e.preventDefault();
          handleRound1Select(round1Choices[idx]);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, queueState.round, round1Choices, currentItem]);

  if (!currentItem || queueState.isCompleted) {
    return null;
  }

  const isRequeued = Boolean(queueState.requeuedInRound[currentItem.id]);
  const roundMeta = ROUND_INFO[queueState.round];

  return (
    <div className="space-y-5">
      {/* Round Header & Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                {roundMeta.title}
              </span>
              {isRequeued && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  <span>Lặp lại từ sai</span>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{roundMeta.subtitle}</p>
          </div>

          <div className="text-right font-mono text-xs text-slate-600 tabular-nums">
            <div>
              Còn lại trong vòng: <strong className="text-slate-900">{metrics.remainingInRound}</strong>
            </div>
            <div>Tiến độ chung: {metrics.percent}%</div>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            style={{ width: `${metrics.percent}%` }}
            className="h-full bg-blue-600 transition-all duration-300"
          />
        </div>
      </div>

      {/* Main Prompt Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Question Area by Round */}
        {queueState.round === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  {currentItem.pos}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                  {currentItem.topic}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {currentItem.word}
              </h2>
              <div className="font-mono text-sm sm:text-base text-slate-500">{currentItem.ipa}</div>
              <div className="flex justify-center pt-1">
                <SpeakButton
                  text={currentItem.word}
                  settings={settings}
                  label="Nghe lại từ"
                  size="md"
                />
              </div>
            </div>

            {/* 4 Vietnamese Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {round1Choices.map((choice, idx) => {
                const isSelected = feedback?.userAnswer === choice;
                const isRightOption = feedback?.correctAnswer === choice;

                let btnStyle =
                  'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 text-slate-800';
                if (feedback) {
                  if (isRightOption) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500';
                  } else if (isSelected && !feedback.isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50/60 text-slate-400';
                  }
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    data-sound="custom"
                    disabled={feedback !== null}
                    onClick={() => handleRound1Select(choice)}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all focus-ring ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-lg border border-current/20 bg-slate-100/80 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-snug">
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {queueState.round === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  {currentItem.pos}
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
              <div className="flex justify-center pt-1">
                <SpeakButton
                  text={currentItem.word}
                  settings={settings}
                  label="Nghe phát âm để viết"
                  size="lg"
                  variant="outline"
                />
              </div>
            </div>

            <LetterHintInput
              targetWord={currentItem.word}
              value={typedAnswer}
              onChange={setTypedAnswer}
              onSubmit={handleTypedSubmit}
              disabled={feedback !== null}
              revealedCount={revealedCount}
              onRevealMore={() => {
                playHintSound();
                setRevealedCount((c) => Math.min(getMaxHintRevealCount(currentItem.word), c + 1));
              }}
              feedbackState={
                feedback ? (feedback.isCorrect ? 'correct' : 'incorrect') : null
              }
            />
          </div>
        )}

        {queueState.round === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                    {currentItem.pos}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                    {currentItem.topic}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setPeekMeaning((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors focus-ring"
                >
                  {peekMeaning ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Ẩn nghĩa tiếng Việt</span>
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
                {peekMeaning && (
                  <p className="mt-3 pt-3 border-t border-slate-200/80 text-sm font-semibold text-blue-700">
                    Nghĩa: {currentItem.meaning}
                  </p>
                )}
              </div>
            </div>

            <LetterHintInput
              targetWord={currentItem.word}
              value={typedAnswer}
              onChange={setTypedAnswer}
              onSubmit={handleTypedSubmit}
              disabled={feedback !== null}
              revealedCount={revealedCount}
              onRevealMore={() => {
                playHintSound();
                setRevealedCount((c) => Math.min(getMaxHintRevealCount(currentItem.word), c + 1));
              }}
              placeholder="Gõ đầy đủ từ còn thiếu vào chỗ trống..."
              feedbackState={
                feedback ? (feedback.isCorrect ? 'correct' : 'incorrect') : null
              }
            />
          </div>
        )}

        {/* Instant Feedback Banner */}
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
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-base">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>Chính xác!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                    <span>Chưa chính xác — từ này sẽ được xếp vào cuối vòng để luyện lại</span>
                  </>
                )}
              </div>

              <div className="text-sm space-y-1">
                <div>
                  Đáp án đúng:{' '}
                  <strong className="font-mono text-base underline decoration-2 underline-offset-2">
                    {feedback.correctAnswer}
                  </strong>{' '}
                  {queueState.round > 1 && (
                    <span className="font-mono text-xs opacity-75">({currentItem.ipa})</span>
                  )}
                </div>
                {queueState.round === 3 && (
                  <p className="text-xs sm:text-sm opacity-90">
                    <HighlightedExample
                      sentence={currentItem.example}
                      targetWord={currentItem.word}
                    />
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SpeakButton
                text={currentItem.word}
                settings={settings}
                size="sm"
                variant="outline"
                title="Nghe phát âm đáp án"
              />
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
