import { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { UnitResetScope } from '../../types/vocab';

interface ResetUnitControlProps {
  unitNumber: number;
  learnedCount: number;
  onResetUnit: (unitNumber: number, scope: UnitResetScope) => void;
  variant?: 'header' | 'compact';
}

export function ResetUnitControl({
  unitNumber,
  learnedCount,
  onResetUnit,
  variant = 'header'
}: ResetUnitControlProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const handleConfirm = (scope: UnitResetScope) => {
    onResetUnit(unitNumber, scope);
    setConfirmOpen(false);
    setDoneMessage(
      scope === 'vocab'
        ? `Đã reset từ vựng Unit ${unitNumber} về Lv 0.`
        : `Đã reset toàn bộ tiến trình Unit ${unitNumber}.`
    );
  };

  if (variant === 'compact') {
    if (confirmOpen) {
      return (
        <div className="w-full rounded-xl border border-rose-200 bg-rose-50/90 p-2.5 space-y-2">
          <div className="text-[11px] font-bold text-rose-900">
            Reset tiến trình Unit {unitNumber}? (Chỉ xóa Unit này)
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={learnedCount === 0}
              onClick={() => handleConfirm('vocab')}
              className="rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-800 px-2.5 py-1 text-[11px] font-semibold focus-ring disabled:opacity-45"
            >
              Chỉ Từ vựng ({learnedCount})
            </button>
            <button
              type="button"
              onClick={() => handleConfirm('all')}
              className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-[11px] font-bold focus-ring"
            >
              Toàn bộ Unit
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="ml-auto rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-2.5 py-1 text-[11px] font-semibold focus-ring"
            >
              Huỷ
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            setDoneMessage(null);
            setConfirmOpen(true);
          }}
          title={`Reset tiến trình Unit ${unitNumber}`}
          aria-label={`Reset tiến trình Unit ${unitNumber}`}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 px-2.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only sm:text-xs">Reset</span>
        </button>
        {doneMessage && (
          <span className="text-[11px] font-semibold text-emerald-700" role="status">
            ✓ Đã reset
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch md:items-end gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {!confirmOpen ? (
          <button
            type="button"
            onClick={() => {
              setDoneMessage(null);
              setConfirmOpen(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Unit {unitNumber}</span>
          </button>
        ) : (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 space-y-2 text-left max-w-md">
            <div className="text-xs font-bold text-rose-900">
              Đặt lại tiến trình Unit {unitNumber}? (Các Unit khác vẫn giữ nguyên)
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={learnedCount === 0}
                onClick={() => handleConfirm('vocab')}
                className="rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-800 px-3 py-1.5 text-xs font-semibold focus-ring disabled:opacity-45"
              >
                Chỉ Từ vựng ({learnedCount} từ)
              </button>
              <button
                type="button"
                onClick={() => handleConfirm('all')}
                className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-bold focus-ring"
              >
                Toàn bộ Unit {unitNumber}
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 text-xs font-semibold focus-ring"
              >
                Huỷ
              </button>
            </div>
          </div>
        )}
      </div>

      {doneMessage && (
        <div
          role="status"
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>{doneMessage}</span>
        </div>
      )}
    </div>
  );
}
