import { CheckCircle2 } from 'lucide-react';
import type { SrsLevel } from '../../types/vocab';

interface SrsBadgeProps {
  level: SrsLevel;
  size?: 'sm' | 'md';
  showText?: boolean;
}

const LEVEL_META: Record<
  SrsLevel,
  { short: string; label: string; badgeClass: string }
> = {
  0: {
    short: 'Lv 0',
    label: 'Chưa học',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200'
  },
  1: {
    short: 'Lv 1',
    label: 'Mới nạp (1d)',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  2: {
    short: 'Lv 2',
    label: 'Ghi nhớ (3d)',
    badgeClass: 'bg-amber-100/80 text-amber-900 border-amber-300'
  },
  3: {
    short: 'Lv 3',
    label: 'Củng cố (7d)',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  4: {
    short: 'Lv 4',
    label: 'Vững vàng (14d)',
    badgeClass: 'bg-blue-100/80 text-blue-800 border-blue-300'
  },
  5: {
    short: 'Lv 5',
    label: 'Đã thuộc sâu',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
};

export function SrsBadge({ level, size = 'sm', showText = true }: SrsBadgeProps) {
  const meta = LEVEL_META[level];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-mono font-medium tabular-nums ${sizeClass} ${meta.badgeClass}`}
    >
      {level === 5 && <CheckCircle2 className="w-3 h-3 shrink-0" aria-hidden="true" />}
      <span>{meta.short}</span>
      {showText && <span className="font-sans font-medium opacity-90">• {meta.label}</span>}
    </span>
  );
}
