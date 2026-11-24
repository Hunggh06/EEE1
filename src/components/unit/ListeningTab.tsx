import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileAudio,
  FileText,
  Headphones,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Square,
  Volume2,
  XCircle
} from 'lucide-react';
import { getUnitListening } from '../../data/listening';
import type { ListeningTask } from '../../types/curriculum';
import type { AppSettings } from '../../types/vocab';
import {
  isListeningAnswerCorrect,
  loadListeningProgress,
  saveListeningUnitProgress
} from '../../utils/curriculumHelpers';
import {
  playCompleteSound,
  playCorrectSound,
  playHintSound,
  playWrongSound
} from '../../utils/soundEffects';
import { isSpeechSupported, speakText, stopSpeaking } from '../../utils/speech';

interface ListeningTabProps {
  unitNumber: number;
  settings: AppSettings;
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function ListeningTab({ unitNumber, settings }: ListeningTabProps) {
  const unitListening = useMemo(() => getUnitListening(unitNumber), [unitNumber]);
  const tasks = unitListening?.tasks ?? [];

  const [activeTaskId, setActiveTaskId] = useState<string>(() => tasks[0]?.id ?? '');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<Set<string>>(() => new Set());
  const [revealedHintIds, setRevealedHintIds] = useState<Set<string>>(() => new Set());
  const [showTranscript, setShowTranscript] = useState(false);
  const [bestUnitScore, setBestUnitScore] = useState(0);

  // Audio player state (MP3 + Web Speech fallback)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMp3, setIsPlayingMp3] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<0.75 | 1.0 | 1.25>(1.0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);

  const totalUnitQuestions = useMemo(
    () => tasks.reduce((acc, task) => acc + task.questions.length, 0),
    [tasks]
  );

  // Hydrate persisted unit listening state when switching Unit
  useEffect(() => {
    const firstId = tasks[0]?.id ?? '';
    setActiveTaskId(firstId);
    setShowTranscript(false);
    setRevealedAnswerIds(new Set());
    setRevealedHintIds(new Set());

    const stored = loadListeningProgress()[unitNumber];
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

  const activeTask: ListeningTask | undefined = useMemo(
    () => tasks.find((t) => t.id === activeTaskId) ?? tasks[0],
    [tasks, activeTaskId]
  );

  const stopAllAudio = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setIsPlayingMp3(false);
    setCurrentTime(0);
    stopSpeaking();
    setIsSpeakingTts(false);
  }, []);

  // Stop playback on unmount or when switching active task / unit
  useEffect(() => {
    setAudioError(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlayingMp3(false);
    stopSpeaking();
    setIsSpeakingTts(false);

    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.playbackRate = playbackRate;
    }

    return () => {
      stopSpeaking();
    };
  }, [activeTask?.id, unitNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync MP3 playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const persistProgress = useCallback(
    (nextAnswers: Record<string, string>, nextChecked: Set<string>) => {
      let score = 0;
      for (const task of tasks) {
        for (const q of task.questions) {
          if (nextChecked.has(q.id) && isListeningAnswerCorrect(q, nextAnswers[q.id] ?? '')) {
            score += 1;
          }
        }
      }
      const nextMap = saveListeningUnitProgress(unitNumber, {
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

    // Un-check edited question so the user can re-verify cleanly
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
    const question = activeTask.questions.find((q) => q.id === questionId);
    if (!question) return;

    const nextChecked = new Set(checkedIds);
    nextChecked.add(questionId);
    setCheckedIds(nextChecked);

    const ok = isListeningAnswerCorrect(question, answers[questionId] ?? '');
    if (ok) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
    persistProgress(answers, nextChecked);
  };

  const handleCheckActiveTask = () => {
    if (!activeTask) return;
    const nextChecked = new Set(checkedIds);
    let taskCorrectCount = 0;

    for (const q of activeTask.questions) {
      nextChecked.add(q.id);
      if (isListeningAnswerCorrect(q, answers[q.id] ?? '')) {
        taskCorrectCount += 1;
      }
    }

    setCheckedIds(nextChecked);
    persistProgress(answers, nextChecked);

    if (taskCorrectCount === activeTask.questions.length && activeTask.questions.length > 0) {
      playCompleteSound();
    } else if (taskCorrectCount > 0) {
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
    const nextHints = new Set(revealedHintIds);

    for (const q of activeTask.questions) {
      delete nextAnswers[q.id];
      nextChecked.delete(q.id);
      nextRevealed.delete(q.id);
      nextHints.delete(q.id);
    }

    setAnswers(nextAnswers);
    setCheckedIds(nextChecked);
    setRevealedAnswerIds(nextRevealed);
    setRevealedHintIds(nextHints);
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

  const toggleRevealHint = (questionId: string) => {
    setRevealedHintIds((prev) => {
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

  const toggleMp3Play = async () => {
    const el = audioRef.current;
    if (!el) return;
    setAudioError(null);
    if (isPlayingMp3) {
      el.pause();
      setIsPlayingMp3(false);
    } else {
      try {
        el.playbackRate = playbackRate;
        await el.play();
        setIsPlayingMp3(true);
      } catch {
        setAudioError(
          'Trình duyệt không phát được file âm thanh này. Hãy thử tải lại trang hoặc kiểm tra định dạng MP3.'
        );
        setIsPlayingMp3(false);
      }
    }
  };

  const seekMp3By = (deltaSec: number) => {
    const el = audioRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(el.duration || duration || 0, el.currentTime + deltaSec));
    el.currentTime = target;
    setCurrentTime(target);
  };

  const toggleTtsPlay = () => {
    if (!activeTask?.speechScript) return;
    if (isSpeakingTts) {
      stopSpeaking();
      setIsSpeakingTts(false);
      return;
    }

    if (!isSpeechSupported()) {
      setAudioError('Trình duyệt hiện tại không hỗ trợ Web Speech API để đọc Audio tổng hợp.');
      return;
    }

    setAudioError(null);
    const ttsRate: 0.8 | 1.0 = playbackRate <= 0.75 ? 0.8 : 1.0;
    const started = speakText(
      activeTask.speechScript,
      {
        speechRate: ttsRate,
        preferredAccent: settings.preferredAccent,
        selectedVoiceURI: settings.selectedVoiceURI
      },
      {
        onStart: () => setIsSpeakingTts(true),
        onEnd: () => setIsSpeakingTts(false),
        onError: () => setIsSpeakingTts(false)
      }
    );
    if (started) {
      setIsSpeakingTts(true);
    }
  };

  if (!unitListening || !activeTask) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có dữ liệu bài nghe cho Unit {unitNumber}.
      </div>
    );
  }

  const activeTaskCheckedCount = activeTask.questions.filter((q) => checkedIds.has(q.id)).length;
  const activeTaskCorrectCount = activeTask.questions.filter(
    (q) => checkedIds.has(q.id) && isListeningAnswerCorrect(q, answers[q.id] ?? '')
  ).length;
  const activeTaskAnsweredCount = activeTask.questions.filter(
    (q) => (answers[q.id] ?? '').trim().length > 0
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Task Selector */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{unitListening.title}</h2>
              <p className="text-sm text-slate-600">{unitListening.subtitleVi}</p>
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

        {/* Task Switcher Tabs */}
        {tasks.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {tasks.map((task) => {
              const isSelected = task.id === activeTask.id;
              const taskCorrect = task.questions.filter(
                (q) => checkedIds.has(q.id) && isListeningAnswerCorrect(q, answers[q.id] ?? '')
              ).length;
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    stopAllAudio();
                    setActiveTaskId(task.id);
                    setShowTranscript(false);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-ring ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileAudio className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{task.taskCode}: {task.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {taskCorrect}/{task.questions.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Audio Player Card */}
      <section className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200">
                {activeTask.taskCode}
              </span>
              {activeTask.audioType === 'mp3' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Audio gốc (.mp3)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Audio tổng hợp (Web Speech)
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeTask.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600">{activeTask.subtitleVi}</p>
          </div>

          {/* Playback Speed Buttons */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 self-start">
            <span className="text-[11px] font-semibold text-slate-500 px-2">Tốc độ:</span>
            {([0.75, 1.0, 1.25] as const).map((rate) => {
              const disabledRate = activeTask.audioType === 'tts' && rate === 1.25;
              const activeRate = playbackRate === rate;
              return (
                <button
                  key={rate}
                  type="button"
                  disabled={disabledRate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors focus-ring disabled:opacity-40 ${
                    activeRate
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {rate}x
                </button>
              );
            })}
          </div>
        </div>

        {/* Hidden HTMLAudioElement for MP3 tracks */}
        {activeTask.audioType === 'mp3' && activeTask.audioSrc && (
          <audio
            ref={audioRef}
            src={activeTask.audioSrc}
            preload="metadata"
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration || 0);
              e.currentTarget.playbackRate = playbackRate;
            }}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onEnded={() => setIsPlayingMp3(false)}
            onError={() => {
              setAudioError('Không tải được file audio. Vui lòng kiểm tra thư mục public/audio/.');
              setIsPlayingMp3(false);
            }}
          />
        )}

        {/* Controls Bar */}
        {activeTask.audioType === 'mp3' ? (
          <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                data-sound="none"
                onClick={toggleMp3Play}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-colors focus-ring"
              >
                {isPlayingMp3 ? (
                  <>
                    <Pause className="w-4 h-4" aria-hidden="true" />
                    <span>Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>Phát Audio</span>
                  </>
                )}
              </button>

              <button
                type="button"
                data-sound="none"
                onClick={() => seekMp3By(-5)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                title="Tua lùi 5 giây"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>-5s</span>
              </button>

              <button
                type="button"
                data-sound="none"
                onClick={() => seekMp3By(5)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                title="Tua tới 5 giây"
              >
                <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>+5s</span>
              </button>

              <span className="ml-auto text-xs font-mono font-semibold text-slate-600">
                {formatDuration(currentTime)} / {formatDuration(duration)}
              </span>
            </div>

            <input
              type="range"
              aria-label="Thanh tua tiến trình audio"
              min={0}
              max={duration > 0 ? duration : 100}
              step={0.5}
              value={Math.min(currentTime, duration > 0 ? duration : 100)}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = val;
                }
                setCurrentTime(val);
              }}
              className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg"
            />
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-sound="none"
                onClick={toggleTtsPlay}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors focus-ring ${
                  isSpeakingTts
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isSpeakingTts ? (
                  <>
                    <Square className="w-4 h-4" aria-hidden="true" />
                    <span>Dừng đọc</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                    <span>Nghe bài đọc ({settings.preferredAccent})</span>
                  </>
                )}
              </button>
              <p className="text-xs text-slate-600 max-w-md">
                Audio tổng hợp theo đúng nội dung giáo trình Unit {unitNumber} qua Web Speech API.
              </p>
            </div>
          </div>
        )}

        {audioError && (
          <p className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
            {audioError}
          </p>
        )}
      </section>

      {/* Instruction + Interactive Questions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-1">
          <p className="text-sm font-bold text-slate-900">{activeTask.instructionEn}</p>
          <p className="text-xs text-slate-600">{activeTask.instructionVi}</p>
        </div>

        <div className="space-y-4">
          {activeTask.questions.map((q) => {
            const val = answers[q.id] ?? '';
            const isChecked = checkedIds.has(q.id);
            const isCorrect = isChecked && isListeningAnswerCorrect(q, val);
            const isAnswerRevealed = revealedAnswerIds.has(q.id);
            const isHintShown = revealedHintIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-colors space-y-3 ${
                  isChecked
                    ? isCorrect
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-rose-200 bg-rose-50/40'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center min-w-[2.25rem] px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shrink-0">
                      {q.orderLabel}
                    </span>
                    <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                      {q.prompt.split('_____').map((part, idx, arr) => (
                        <span key={idx}>
                          {part}
                          {idx < arr.length - 1 && (
                            <span className="inline-block min-w-[64px] border-b-2 border-indigo-400 text-center px-2 mx-1 text-indigo-700 font-semibold">
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

                {/* Input + Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
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
                    placeholder="Gõ từ hoặc đáp án ngắn bạn nghe được..."
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      data-sound="custom"
                      disabled={!val.trim()}
                      onClick={() => handleCheckSingle(q.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold transition-colors focus-ring"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Kiểm tra</span>
                    </button>

                    {q.hintVi && (
                      <button
                        type="button"
                        data-sound="custom"
                        onClick={() => toggleRevealHint(q.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                      >
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isHintShown ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      data-sound="custom"
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors focus-ring"
                    >
                      {isAnswerRevealed ? (
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
                </div>

                {/* Status Feedback */}
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
                        <span>Chưa khớp đáp án chuẩn — hãy nghe lại hoặc bấm &quot;Hiện đáp án&quot;.</span>
                      </>
                    )}
                  </div>
                )}

                {isHintShown && q.hintVi && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-900">
                    <strong>Gợi ý:</strong> {q.hintVi}
                  </div>
                )}

                {isAnswerRevealed && (
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-xs text-indigo-900">
                    <strong>Đáp án chuẩn:</strong>{' '}
                    <span className="font-bold">{q.displayAnswer}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Footer for Active Task */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              data-sound="custom"
              disabled={activeTaskAnsweredCount === 0}
              onClick={handleCheckActiveTask}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-45 text-white text-sm font-semibold shadow-xs transition-colors focus-ring"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Kiểm tra toàn bài ({activeTaskAnsweredCount}/{activeTask.questions.length})</span>
            </button>

            <button
              type="button"
              onClick={handleResetActiveTask}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors focus-ring"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Làm lại</span>
            </button>
          </div>

          {activeTaskCheckedCount > 0 && (
            <div className="text-sm font-bold text-slate-800">
              Kết quả bài này:{' '}
              <span className="text-emerald-700">
                {activeTaskCorrectCount}/{activeTask.questions.length}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible Transcript (Hidden by default to prevent spoilers) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <button
          type="button"
          onClick={() => setShowTranscript((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 text-left focus-ring rounded-xl"
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
            <FileText className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <span>Transcript &amp; Lời thoại chi tiết</span>
            <span className="text-[11px] font-medium text-slate-500">(Ẩn mặc định — bấm để đối chiếu sau khi nghe)</span>
          </span>
          <span className="text-xs font-semibold text-indigo-600">
            {showTranscript ? 'Thu gọn' : 'Hiện Transcript'}
          </span>
        </button>

        {showTranscript && (
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            {activeTask.transcript.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5"
              >
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {item.speaker && (
                    <strong className="text-indigo-700 mr-1.5">{item.speaker}:</strong>
                  )}
                  {item.line}
                </p>
                <button
                  type="button"
                  data-sound="none"
                  onClick={() =>
                    speakText(item.line, {
                      speechRate: settings.speechRate,
                      preferredAccent: settings.preferredAccent,
                      selectedVoiceURI: settings.selectedVoiceURI
                    })
                  }
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-colors shrink-0 focus-ring"
                  title="Nghe lại câu này"
                >
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
