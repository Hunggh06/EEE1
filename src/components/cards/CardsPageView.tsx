import { useEffect, useState } from 'react';
import { ArrowUpRight, CreditCard, MessagesSquare } from 'lucide-react';
import { CARDS_BY_UNIT, SPEAKING_CARDS } from '../../data/cards/speakingCards';
import { UNITS_META, UNITS_META_BY_NUMBER } from '../../data/unitsMeta';
import type { AppSettings } from '../../types/vocab';
import { UnitIcon } from '../common/UnitIcon';
import { SpeakingCardsWorkspace } from './SpeakingCardsWorkspace';

interface CardsPageViewProps {
  initialUnit?: number;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

export function CardsPageView({
  initialUnit,
  settings,
  onUpdateSettings,
  onNavigate
}: CardsPageViewProps) {
  const [selectedUnit, setSelectedUnit] = useState<number>(() =>
    initialUnit && initialUnit >= 1 && initialUnit <= 8 ? initialUnit : 1
  );

  useEffect(() => {
    if (initialUnit && initialUnit >= 1 && initialUnit <= 8) {
      setSelectedUnit(initialUnit);
    }
  }, [initialUnit]);

  const activeMeta = UNITS_META_BY_NUMBER[selectedUnit];

  return (
    <div className="space-y-6">
      {/* Page Hero Banner */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <MessagesSquare className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                Speaking Cards Studio • {SPEAKING_CARDS.length} Cards (8 Units)
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Luyện Nói Theo Bộ Ôn Tập Thi KTHP Speaking (8 Units)
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl">
                Chọn 1 vai (Student A hoặc Student B) để xem đúng 1 phiếu Cue Card cá nhân. Tự điền câu hỏi hoặc câu trả lời vào từng mục — đáp án luôn ẩn cho đến khi bạn nhờ AI chấm hoặc chủ động bấm xem.
              </p>
            </div>
          </div>

          {activeMeta && (
            <button
              type="button"
              onClick={() => onNavigate(`#/unit/${selectedUnit}`)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus-ring shrink-0"
            >
              <span>Vào Unit {selectedUnit}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Unit 1-8 Selector Strip */}
        <div
          role="tablist"
          aria-label="Chọn Unit cho Speaking Cards"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-slate-100"
        >
          {UNITS_META.map((u) => {
            const cards = CARDS_BY_UNIT[u.unit] ?? [];
            const isSelected = u.unit === selectedUnit;
            const hasDocx = cards.some((c) => c.source === 'card_docx');
            const hasSupplement = cards.some((c) => c.source === 'textbook_supplement');

            return (
              <button
                key={u.unit}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedUnit(u.unit)}
                className={`text-left rounded-xl border p-2.5 transition-all focus-ring space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50/70 text-slate-800 border-slate-200 hover:bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-blue-700'
                    }`}
                  >
                    Unit {u.unit}
                  </span>
                  <UnitIcon
                    iconKey={u.iconKey}
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}
                  />
                </div>

                <div
                  className={`text-[11px] font-semibold line-clamp-1 ${
                    isSelected ? 'text-blue-50' : 'text-slate-700'
                  }`}
                >
                  {u.title}
                </div>

                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-2.5 h-2.5" aria-hidden="true" />
                    {cards.length}
                  </span>

                  {hasDocx && (
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-emerald-400/25 text-white'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      Card.docx
                    </span>
                  )}

                  {!hasDocx && hasSupplement && (
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-indigo-400/25 text-white'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      Bổ sung
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Unit Workspace */}
      <SpeakingCardsWorkspace
        key={`cards-page-u${selectedUnit}`}
        unitNumber={selectedUnit}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        onNavigate={onNavigate}
      />
    </div>
  );
}
