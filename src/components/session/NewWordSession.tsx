import { useCallback, useMemo, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, Volume2 } from 'lucide-react';
import { UNITS_META_BY_NUMBER } from '../../data/unitsMeta';
import { ALL_VOCAB, VOCAB_BY_ID, getUnitVocab } from '../../data/vocab';
import { getNewWordsChunk } from '../../engine/srs';
import type { AppSettings, StudyState } from '../../types/vocab';
import { stopSpeaking } from '../../utils/speech';
import { DrillingStage } from './DrillingStage';
import { Flashcard3D } from './Flashcard3D';
import { SessionSummary } from './SessionSummary';

interface NewWordSessionProps {
  unitNumber: number;
  state: StudyState;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onCompleteChunk: (wordIds: string[], mistakesById: Record<string, number>) => void;
  onNavigate: (hash: string) => void;
}

type SessionStage = 1 | 2 | 3;

export function NewWordSession({
  unitNumber,
  state,
  onUpdateSettings,
  onCompleteChunk,
  onNavigate
}: NewWordSessionProps) {
  const unitMeta = UNITS_META_BY_NUMBER[unitNumber];
  const unitVocab = useMemo(() => getUnitVocab(unitNumber), [unitNumber]);

  // Incrementing sessionSeed starts a fresh chunk cleanly when clicking "Học tiếp cụm từ mới"
  const [sessionSeed, setSessionSeed] = useState(0);

  // Snapshot the chunk when session starts (or restarts via sessionSeed) so promoting words doesn't mutate current chunk mid-summary
  const chunk = useMemo(
    () => getNewWordsChunk(unitVocab, state.progress, state.settings.chunkSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unitNumber, sessionSeed]
  );

  const [stage, setStage] = useState<SessionStage>(1);
  const [summaryStats, setSummaryStats] = useState<{
    mistakesById: Record<string, number>;
    totalAttempts: number;
    correctAttempts: number;
  }>({ mistakesById: {}, totalAttempts: 0, correctAttempts: 0 });

  const promotedRef = useRef(false);

  const handleDrillingComplete = useCallback(
    (mistakesById: Record<string, number>, totalAttempts: number, correctAttempts: number) => {
      if (!promotedRef.current) {
        promotedRef.current = true;
        onCompleteChunk(
          chunk.map((w) => w.id),
          mistakesById
        );
      }
      setSummaryStats({ mistakesById, totalAttempts, correctAttempts });
      setStage(3);
    },
    [chunk, onCompleteChunk]
  );

  const handleRestartNextChunk = () => {
    stopSpeaking();
    promotedRef.current = false;
    setSummaryStats({ mistakesById: {}, totalAttempts: 0, correctAttempts: 0 });
    setStage(1);
    setSessionSeed((s) => s + 1);
  };

  if (!unitMeta) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-4">
        <p className="font-semibold text-slate-800">Unit {unitNumber} không tồn tại.</p>
        <button
          type="button"
          onClick={() => onNavigate('#/')}
          className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-semibold focus-ring"
        >
          Về Dashboard
        </button>
      </div>
    );
  }

  if (chunk.length === 0 && stage === 1) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          Unit {unitNumber} đã nạp hết toàn bộ từ mới!
        </h1>
        <p className="text-sm text-slate-600">
          Tất cả {unitVocab.length} từ trong Unit này đã được đưa vào chu kỳ ôn tập SRS. Bạn có thể
          xem lại chi tiết Unit hoặc ôn tập các từ đến hạn.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate(`#/unit/${unitNumber}`)}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold focus-ring"
          >
            Xem chi tiết Unit {unitNumber}
          </button>
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

  const remainingAfterCurrent = getNewWordsChunk(
    unitVocab,
    state.progress,
    state.settings.chunkSize
  ).length;

  const stages: Array<{ id: SessionStage; label: string }> = [
    { id: 1, label: '1. Nạp từ (Flashcard)' },
    { id: 2, label: '2. Luyện tập (3 vòng)' },
    { id: 3, label: '3. Tổng kết' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Distraction-Free Session Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            onNavigate(`#/unit/${unitNumber}`);
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus-ring rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Thoát về Unit {unitNumber}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onUpdateSettings({ speechRate: state.settings.speechRate === 1.0 ? 0.8 : 1.0 })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-semibold text-slate-700 transition-colors focus-ring tabular-nums"
            title="Chuyển tốc độ phát âm"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>Tốc độ: {state.settings.speechRate.toFixed(1)}x</span>
          </button>
        </div>
      </div>

      {/* Stage Stepper */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xs">
        <div className="grid grid-cols-3 gap-2">
          {stages.map((s) => {
            const isCurrent = stage === s.id;
            const isDone = stage > s.id;
            return (
              <div
                key={s.id}
                className={`rounded-xl px-3 py-2 text-center text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border border-slate-200/70'
                }`}
              >
                {s.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Content */}
      {stage === 1 && (
        <Flashcard3D
          key={`stage1-${sessionSeed}`}
          cards={chunk}
          settings={state.settings}
          onFinishStage1={() => {
            stopSpeaking();
            setStage(2);
          }}
        />
      )}

      {stage === 2 && (
        <DrillingStage
          key={`stage2-${sessionSeed}`}
          chunk={chunk}
          unitVocab={unitVocab}
          allVocab={ALL_VOCAB}
          vocabById={VOCAB_BY_ID}
          settings={state.settings}
          onComplete={handleDrillingComplete}
        />
      )}

      {stage === 3 && (
        <SessionSummary
          unitNumber={unitNumber}
          unitTitle={unitMeta.title}
          learnedWords={chunk}
          mistakesById={summaryStats.mistakesById}
          totalAttempts={summaryStats.totalAttempts}
          correctAttempts={summaryStats.correctAttempts}
          hasMoreNewWordsInUnit={remainingAfterCurrent > 0}
          settings={state.settings}
          onContinueNextChunk={handleRestartNextChunk}
          onBackToUnit={() => onNavigate(`#/unit/${unitNumber}`)}
          onBackToDashboard={() => onNavigate('#/')}
        />
      )}
    </div>
  );
}
