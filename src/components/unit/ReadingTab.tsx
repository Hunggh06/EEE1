import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpenText,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  RotateCcw,
  Square,
  Volume2,
  XCircle
} from 'lucide-react';
import { getUnitReading } from '../../data/reading';
import type { ReadingPassageTask } from '../../types/curriculum';
import type { AppSettings } from '../../types/vocab';
import {
  isReadingAnswerCorrect,
  loadReadingProgress,
  saveReadingUnitProgress
} from '../../utils/curriculumHelpers';
import {
  playCompleteSound,
  playCorrectSound,
  playHintSound,
  playWrongSound
} from '../../utils/soundEffects';
import { isSpeechSupported, speakText, stopSpeaking } from '../../utils/speech';

interface ReadingTabProps {
  unitNumber: number;
  settings: AppSettings;
}

export function ReadingTab({ unitNumber, settings }: ReadingTabProps) {
  const unitReading = useMemo(() => getUnitReading(unitNumber), [unitNumber]);
  const tasks = unitReading?.tasks ?? [];

  const [activeTaskId, setActiveTaskId] = useState<string>(() => tasks[0]?.id ?? '');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<Set<string>>(() => new Set());
  const [bestUnitScore, setBestUnitScore] = useState(0);
  const [speakingPassage, setSpeakingPassage] = useState(false);

  const totalUnitQuestions = useMemo(
    () => tasks.reduce((sum, t) => sum + t.questions.length, 0),
    [tasks]
  );

  // Hydrate persisted unit progress when switching Unit
  useEffect(() => {
    setActiveTaskId(tasks[0]?.id ?? '');
    setRevealedAnswerIds(new Set());
    stopSpeaking();
    setSpeakingPassage(false);

    const stored = loadReadingProgress()[unitNumber];
    if (stored) {
      setAnswers(stored.answers);
      setCheckedIds(new Set(stored.checkedIds));
      setBestUnitScore(stored.bestScore);
    } else {
      setAnswers({});
      setCheckedIds(new Set());
      setBestUnitScore(0);
    }
  }, [unitNumber, tasks]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const activeTask: ReadingPassageTask | undefined = useMemo(
    () => tasks.find((t) => t.id === activeTaskId) ?? tasks[0],
    [tasks, activeTaskId]
  );

  const persistProgress = useCallback(
    (nextAnswers: Record<string, string>, nextChecked: Set<string>) => {
      let score = 0;
      for (const task of tasks) {
        for (const q of task.questions) {
          if (nextChecked.has(q.id) && isReadingAnswerCorrect(q, nextAnswers[q.id] ?? '')) {
            score += 1;
          }
        }
      }
      const nextMap = saveReadingUnitProgress(unitNumber, {
        bestScore: Math.max(bestUnitScore, score),
        lastScore: score,
        totalQuestions: totalUnitQuestions,
        answers: nextAnswers,
        checkedIds: Array.from(nextChecked),
        updatedAt: Date.now()
      });
      setBestUnitScore(nextMap[unitNumber]?.bestScore ?? score);
      return score;
    },
    [bestUnitScore, tasks, totalUnitQuestions, unitNumber]
  );

  const handleAnswerChange = (questionId: string, val: string) => {
    const nextAnswers = { ...answers, [questionId]: val };
    setAnswers(nextAnswers);

    let nextChecked = checkedIds;
    if (checkedIds.has(questionId)) {
      nextChecked = new Set(checkedIds);
      nextChecked.delete(questionId);
      setCheckedIds(nextChecked);
    }
    persistProgress(nextAnswers, nextChecked);
  };

  const handleCheckSingle = (questionId: string) => {
    if (!activeTask) return;
    const q = activeTask.questions.find((item) => item.id === questionId);
    if (!q) return;

    const nextChecked = new Set(checkedIds);
    nextChecked.add(questionId);
    setCheckedIds(nextChecked);

    if (isReadingAnswerCorrect(q, answers[questionId] ?? '')) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
    persistProgress(answers, nextChecked);
  };

  const handleCheckActiveTask = () => {
    if (!activeTask) return;
    const nextChecked = new Set(checkedIds);
    let taskCorrect = 0;

    for (const q of activeTask.questions) {
      nextChecked.add(q.id);
      if (isReadingAnswerCorrect(q, answers[q.id] ?? '')) {
        taskCorrect += 1;
      }
    }

    setCheckedIds(nextChecked);
    persistProgress(answers, nextChecked);

    if (taskCorrect === activeTask.questions.length && activeTask.questions.length > 0) {
      playCompleteSound();
    } else if (taskCorrect > 0) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleResetActiveTask = () => {
    if (!activeTask) return;
    const nextAnswers = { ...answers };
    const nextChecked = new Set(checkedIds);
    const nextRevealed = new Set(revealedAnswerIds);

    for (const q of activeTask.questions) {
      delete nextAnswers[q.id];
      nextChecked.delete(q.id);
      nextRevealed.delete(q.id);
    }

    setAnswers(nextAnswers);
    setCheckedIds(nextChecked);
    setRevealedAnswerIds(nextRevealed);
    persistProgress(nextAnswers, nextChecked);
  };

  const toggleRevealAnswer = (questionId: string) => {
    setRevealedAnswerIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        playHintSound();
        next.add(questionId);
      }
      return next;
    });
  };

  const toggleReadPassage = () => {
    if (!activeTask) return;
    if (speakingPassage) {
      stopSpeaking();
      setSpeakingPassage(false);
      return;
    }
    if (!isSpeechSupported()) return;

    const fullText = [
      activeTask.passageTitle,
      ...activeTask.paragraphs.map((p) => (p.heading ? `${p.heading}. ${p.text}` : p.text))
    ].join('. ');

    const started = speakText(
      fullText,
      {
        speechRate: settings.speechRate,
        preferredAccent: settings.preferredAccent,
        selectedVoiceURI: settings.selectedVoiceURI
      },
      {
        onStart: () => setSpeakingPassage(true),
        onEnd: () => setSpeakingPassage(false),
        onError: () => setSpeakingPassage(false)
      }
    );
    if (started) {
      setSpeakingPassage(true);
    }
  };

  if (!unitReading || !activeTask) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có dữ liệu bài đọc cho Unit {unitNumber}.
      </div>
    );
  }

  const activeAnsweredCount = activeTask.questions.filter(
    (q) => (answers[q.id] ?? '').trim().length > 0
  ).length;
  const activeCheckedCount = activeTask.questions.filter((q) => checkedIds.has(q.id)).length;
  const activeCorrectCount = activeTask.questions.filter(
    (q) => checkedIds.has(q.id) && isReadingAnswerCorrect(q, answers[q.id] ?? '')
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Passage Switcher */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center shrink-0">
              <BookOpenText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{unitReading.title}</h2>
              <p className="text-sm text-slate-600">{unitReading.subtitleVi}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold">
              Tổng số câu Unit {unitNumber}: {totalUnitQuestions}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
              Điểm cao nhất: {bestUnitScore}/{totalUnitQuestions}
            </span>
          </div>
        </div>

        {/* Passage Switcher Pills */}
        {tasks.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {tasks.map((task, idx) => {
              const isSelected = task.id === activeTask.id;
              const correct = task.questions.filter(
                (q) => checkedIds.has(q.id) && isReadingAnswerCorrect(q, answers[q.id] ?? '')
              ).length;
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setSpeakingPassage(false);
                    setActiveTaskId(task.id);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    Bài đọc {idx + 1}: {task.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {correct}/{task.questions.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Split Reading + Questions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Passage */}
        <article className="lg:col-span-6 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="space-y-1">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                {activeTask.taskCode}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                {activeTask.passageTitle}
              </h3>
              <p className="text-xs text-slate-500">{activeTask.subtitleVi}</p>
            </div>

            {isSpeechSupported() && (
              <button
                type="button"
                data-sound="none"
                onClick={toggleReadPassage}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors focus-ring shrink-0 ${
                  speakingPassage
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {speakingPassage ? (
                  <>
                    <Square className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Dừng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Nghe bài đọc</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-4 text-sm sm:text-[15px] text-slate-800 leading-7">
            {activeTask.paragraphs.map((para, idx) => (
              <div key={idx} className="space-y-1.5">
                {para.heading && (
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-teal-800 pt-1">
                    {para.heading}
                  </h4>
                )}
                <p className="whitespace-pre-line">{para.text}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Right Pane: Questions */}
        <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-1">
            <p className="text-sm font-bold text-slate-900">{activeTask.instructionEn}</p>
            <p className="text-xs text-slate-600">{activeTask.instructionVi}</p>
          </div>

          <div className="space-y-4">
            {activeTask.questions.map((q) => {
              const val = answers[q.id] ?? '';
              const isChecked = checkedIds.has(q.id);
              const isCorrect = isChecked && isReadingAnswerCorrect(q, val);
              const isRevealed = revealedAnswerIds.has(q.id);
              const showExplanation = (isChecked && isCorrect) || isRevealed;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-4 transition-colors space-y-3 ${
                    isChecked
                      ? isCorrect
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-rose-200 bg-rose-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center min-w-[2.25rem] px-2 py-0.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold shrink-0">
                        {q.orderLabel}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                        {q.prompt.split('_____').map((part, idx, arr) => (
                          <span key={idx}>
                            {part}
                            {idx < arr.length - 1 && (
                              <span className="inline-block min-w-[60px] border-b-2 border-teal-500 text-center px-1.5 mx-1 text-teal-700 font-bold">
                                {val.trim() || '...'}
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>

                    {q.wordLimitNote && (
                      <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        {q.wordLimitNote}
                      </span>
                    )}
                  </div>

                  {/* Input Control: MCQ / True-False Options vs Short Answer / Fill */}
                  {(q.type === 'mcq' || q.type === 'tf') && q.options ? (
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((option, optIdx) => {
                        const isSelected = val === option;
                        const isOptionCorrect = isReadingAnswerCorrect(q, option);
                        let optionStyle =
                          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';

                        if (isChecked || isRevealed) {
                          if (isOptionCorrect && (isRevealed || isSelected)) {
                            optionStyle =
                              'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isSelected && !isOptionCorrect) {
                            optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                          } else if (isSelected) {
                            optionStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-semibold';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'border-teal-500 bg-teal-50/70 text-teal-900 font-semibold ring-2 ring-teal-100';
                        }

                        const prefix =
                          q.type === 'mcq' ? `${String.fromCharCode(65 + optIdx)}. ` : '';

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleAnswerChange(q.id, option)}
                            className={`text-left rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm transition-all focus-ring ${optionStyle}`}
                          >
                            <span className="font-bold mr-1">{prefix}</span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && val.trim()) {
                          e.preventDefault();
                          handleCheckSingle(q.id);
                        }
                      }}
                      placeholder="Nhập câu trả lời tìm được trong bài đọc..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none"
                    />
                  )}

                  {/* Per-question Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      data-sound="custom"
                      disabled={!val.trim()}
                      onClick={() => handleCheckSingle(q.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-45 text-white text-xs font-semibold transition-colors focus-ring"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Kiểm tra</span>
                    </button>

                    <button
                      type="button"
                      data-sound="custom"
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors focus-ring"
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

                  {/* Check Status */}
                  {isChecked && (
                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs font-semibold ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Chính xác! ({q.displayAnswer})</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Chưa đúng — hãy đối chiếu lại bài đọc hoặc bấm Hiện đáp án.</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Answer + Explanation (ONLY when revealed or already checked) */}
                  {showExplanation && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50/50 px-3.5 py-2.5 text-xs text-teal-950 space-y-1">
                      {isRevealed && (
                        <p>
                          <strong>Đáp án chuẩn:</strong>{' '}
                          <span className="font-bold">{q.displayAnswer}</span>
                        </p>
                      )}
                      <p>
                        <strong>Giải thích:</strong> {q.explanationVi}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-sound="custom"
                disabled={activeAnsweredCount === 0}
                onClick={handleCheckActiveTask}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-45 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus-ring"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>
                  Kiểm tra toàn bài ({activeAnsweredCount}/{activeTask.questions.length})
                </span>
              </button>

              <button
                type="button"
                onClick={handleResetActiveTask}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors focus-ring"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm lại</span>
              </button>
            </div>

            {activeCheckedCount > 0 && (
              <div className="text-sm font-bold text-slate-800">
                Kết quả:{' '}
                <span className="text-emerald-700">
                  {activeCorrectCount}/{activeTask.questions.length}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
