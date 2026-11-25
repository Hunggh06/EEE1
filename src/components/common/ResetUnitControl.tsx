import { useEffect, useState } from 'react';
import { CheckCircle2, RotateCcw, Trash2 } from 'lucide-react';
import type { SkillKey, UnitResetScope } from '../../types/vocab';

const SKILL_RESET_ORDER: SkillKey[] = [
  'vocabulary',
  'grammar',
  'cards',
  'writing',
  'monotalk',
  'listening',
  'reading'
];

const SKILL_RESET_LABELS: Record<SkillKey, string> = {
  vocabulary: 'Vocabulary (Từ vựng SRS)',
  grammar: 'Grammar (Ngữ pháp)',
  cards: 'Cards (Hội thoại Cue Card)',
  writing: 'Writing (Luyện viết)',
  monotalk: 'Mono Talk (Thuyết trình)',
  listening: 'Listening (Nghe hiểu)',
  reading: 'Reading (Đọc hiểu)'
};

function formatScopeDoneMessage(unitNumber: number, scope: UnitResetScope): string {
  if (scope === 'all') {
    return `Đã reset toàn bộ tiến trình Unit ${unitNumber} (7/7 phần).`;
  }
  return `Đã reset phần ${SKILL_RESET_LABELS[scope]} của Unit ${unitNumber}.`;
}

interface ResetUnitControlProps {
  unitNumber: number;
  learnedCount: number;
  activeSkill?: SkillKey;
  onResetUnit: (unitNumber: number, scope: UnitResetScope) => void;
  variant?: 'header' | 'compact';
}

export function ResetUnitControl({
  unitNumber,
  learnedCount,
  activeSkill,
  onResetUnit,
  variant = 'header'
}: ResetUnitControlProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<UnitResetScope>(activeSkill ?? 'all');
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeSkill) {
      setSelectedScope(activeSkill);
    }
  }, [activeSkill, unitNumber]);

  const handleConfirm = (scope: UnitResetScope) => {
    onResetUnit(unitNumber, scope);
    setConfirmOpen(false);
    setDoneMessage(formatScopeDoneMessage(unitNumber, scope));
  };

  if (variant === 'compact') {
    if (confirmOpen) {
      return (
        <div className="w-full rounded-xl border border-rose-200 bg-rose-50/90 p-3 space-y-2">
          <div className="text-[11px] font-bold text-rose-900">
            Reset Unit {unitNumber} — Chọn phần cần xóa (các Unit khác giữ nguyên):
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <select
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value as UnitResetScope)}
              aria-label={`Chọn phần cần reset của Unit ${unitNumber}`}
              className="flex-1 min-w-[170px] rounded-lg border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 outline-none focus:border-rose-500"
            >
              <option value="all">Toàn bộ Unit {unitNumber} (Tất cả 7 phần)</option>
              {SKILL_RESET_ORDER.map((skill) => (
                <option key={skill} value={skill}>
                  Riêng {SKILL_RESET_LABELS[skill]}
                  {skill === 'vocabulary' ? ` (${learnedCount} từ)` : ''}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleConfirm(selectedScope)}
              className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-[11px] font-bold focus-ring"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-2.5 py-1 text-[11px] font-semibold focus-ring"
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
          title={`Reset toàn bộ hoặc từng phần của Unit ${unitNumber}`}
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
              setSelectedScope(activeSkill ?? 'all');
              setConfirmOpen(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Unit / Từng phần</span>
          </button>
        ) : (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-3.5 space-y-2.5 text-left max-w-lg">
            <div className="text-xs font-bold text-rose-900">
              Chọn phạm vi reset cho Unit {unitNumber} (các Unit khác giữ nguyên):
            </div>

            {activeSkill && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConfirm(activeSkill)}
                  className="rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-800 px-3 py-1.5 text-xs font-bold focus-ring"
                >
                  Reset nhanh phần đang mở: {SKILL_RESET_LABELS[activeSkill]}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value as UnitResetScope)}
                aria-label={`Chọn phần cần reset của Unit ${unitNumber}`}
                className="flex-1 min-w-[210px] rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-rose-500"
              >
                <option value="all">Toàn bộ Unit {unitNumber} (Tất cả 7 phần)</option>
                {SKILL_RESET_ORDER.map((skill) => (
                  <option key={skill} value={skill}>
                    Chỉ {SKILL_RESET_LABELS[skill]}
                    {skill === 'vocabulary' ? ` (${learnedCount} từ đã nạp)` : ''}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => handleConfirm(selectedScope)}
                className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-bold focus-ring"
              >
                {selectedScope === 'all' ? `Reset toàn bộ Unit ${unitNumber}` : 'Reset phần này'}
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

interface ResetAllControlProps {
  onResetAll: (options?: { preserveSettings?: boolean }) => void;
  variant?: 'dashboard' | 'settings';
}

export function ResetAllControl({ onResetAll, variant = 'dashboard' }: ResetAllControlProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const handleTrigger = (preserveSettings: boolean) => {
    onResetAll({ preserveSettings });
    setConfirmOpen(false);
    setDoneMessage(
      preserveSettings
        ? 'Đã reset toàn bộ tiến trình 8 Units (Từ vựng SRS & 6 kỹ năng); giữ nguyên Cài đặt AI/giọng đọc.'
        : 'Đã reset sạch toàn bộ tiến trình học tập và khôi phục Cài đặt về mặc định.'
    );
  };

  return (
    <div className="space-y-2">
      {!confirmOpen ? (
        <button
          type="button"
          onClick={() => {
            setDoneMessage(null);
            setConfirmOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          <span>Reset tất cả (8 Units)</span>
        </button>
      ) : (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-3.5 space-y-2.5">
          <div className="text-xs sm:text-sm font-bold text-rose-900">
            Bạn chắc chắn muốn reset toàn bộ tiến trình cả 8 Units?
          </div>
          <p className="text-xs text-rose-800">
            Thao tác sẽ xóa sạch toàn bộ tiến độ Vocabulary SRS và cả 6 kỹ năng (Grammar, Cards, Writing, Mono Talk, Listening, Reading).
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleTrigger(true)}
              className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-bold focus-ring"
            >
              Reset toàn bộ tiến trình (Giữ Cài đặt)
            </button>
            {variant === 'settings' && (
              <button
                type="button"
                onClick={() => handleTrigger(false)}
                className="rounded-lg border border-rose-400 bg-white hover:bg-rose-100 text-rose-900 px-3.5 py-1.5 text-xs font-bold focus-ring"
              >
                Xóa cả tiến trình &amp; Cài đặt
              </button>
            )}
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
