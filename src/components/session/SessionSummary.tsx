import { useEffect } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2, Home, Sparkles, Trophy } from 'lucide-react';
import type { AppSettings, VocabItem } from '../../types/vocab';
import { playCompleteSound } from '../../utils/soundEffects';
import { SpeakButton } from '../common/SpeakButton';

interface SessionSummaryProps {
  unitNumber: number;
  unitTitle: string;
  learnedWords: VocabItem[];
  mistakesById: Record<string, number>;
  totalAttempts: number;
  correctAttempts: number;
  hasMoreNewWordsInUnit: boolean;
  settings: AppSettings;
  onContinueNextChunk: () => void;
  onBackToUnit: () => void;
  onBackToDashboard: () => void;
}

export function SessionSummary({
  unitNumber,
  unitTitle,
  learnedWords,
  mistakesById,
  totalAttempts,
  correctAttempts,
  hasMoreNewWordsInUnit,
  settings,
  onContinueNextChunk,
  onBackToUnit,
  onBackToDashboard
}: SessionSummaryProps) {
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;
  const missedWords = learnedWords.filter((w) => (mistakesById[w.id] ?? 0) > 0);

  useEffect(() => {
    playCompleteSound();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <Trophy className="w-7 h-7" aria-hidden="true" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Hoàn thành phiên nạp từ • Unit {unitNumber}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Đã nạp thành công {learnedWords.length} từ mới!
        </h2>
        <p className="text-sm text-slate-600">
          {unitTitle} — Tất cả {learnedWords.length} từ vừa học đã được nâng lên{' '}
          <strong className="text-amber-700">Level 1 (ôn lại sau 1 ngày)</strong>.
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center">
          <div className="text-xs font-semibold text-slate-500">Số từ vừa học</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {learnedWords.length}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
          <div className="text-xs font-semibold text-emerald-800">Độ chính xác tổng hợp</div>
          <div className="mt-1 text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {accuracy}%
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-center">
          <div className="text-xs font-semibold text-amber-800">Lịch ôn kế tiếp</div>
          <div className="mt-1 text-xl font-extrabold text-amber-900 font-mono tabular-nums">
            Level 1 (+1 ngày)
          </div>
        </div>
      </div>

      {/* Missed Words Section */}
      {missedWords.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span>Từ cần lưu ý (đã sai trong Stage 2: {missedWords.length} từ)</span>
          </div>
          <div className="divide-y divide-rose-200/60">
            {missedWords.map((word) => (
              <div
                key={word.id}
                className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <SpeakButton text={word.word} settings={settings} size="sm" variant="outline" />
                  <span className="font-bold text-slate-900">{word.word}</span>
                  <span className="font-mono text-xs text-slate-500">{word.ipa}</span>
                  <span className="text-slate-600">— {word.meaning}</span>
                </div>
                <span className="text-xs font-semibold text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded-md tabular-nums">
                  Sai {mistakesById[word.id]} lần
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Learned Chunk List */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 space-y-2.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Danh sách từ đã nâng lên Level 1
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {learnedWords.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">{w.word}</div>
                <div className="text-xs text-slate-500 truncate">{w.meaning}</div>
              </div>
              <SpeakButton text={w.word} settings={settings} size="sm" variant="ghost" />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {hasMoreNewWordsInUnit && (
          <button
            type="button"
            onClick={onContinueNextChunk}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm font-bold shadow-xs transition-colors focus-ring"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Học tiếp cụm từ mới</span>
          </button>
        )}

        <button
          type="button"
          onClick={onBackToUnit}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 text-sm font-semibold transition-colors focus-ring"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Quay về Unit {unitNumber}</span>
        </button>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 text-sm font-semibold transition-colors focus-ring"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Về Dashboard</span>
        </button>
      </div>
    </div>
  );
}
