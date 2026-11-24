import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  Play,
  Sparkles
} from 'lucide-react';
import { UNITS_META } from '../../data/unitsMeta';
import { ALL_VOCAB, getUnitVocab } from '../../data/vocab';
import { getDueWords, getLevelDistribution, getNewWordsChunk } from '../../engine/srs';
import type { SrsLevel, StudyState } from '../../types/vocab';
import { UnitIcon } from '../common/UnitIcon';

interface DashboardViewProps {
  state: StudyState;
  onNavigate: (hash: string) => void;
}

export function DashboardView({ state, onNavigate }: DashboardViewProps) {
  const now = Date.now();
  const dist = getLevelDistribution(ALL_VOCAB, state.progress, now);
  const dueWords = getDueWords(ALL_VOCAB, state.progress, now);

  const dueByLevel: Record<Exclude<SrsLevel, 0>, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const word of dueWords) {
    const lv = state.progress[word.id]?.level;
    if (lv && lv >= 1) {
      dueByLevel[lv as Exclude<SrsLevel, 0>] += 1;
    }
  }

  // Find first unit with unlearned words for smart CTA when due === 0
  const nextUnlearnedUnit = UNITS_META.find((u) => {
    const unitVocab = getUnitVocab(u.unit);
    return getNewWordsChunk(unitVocab, state.progress, state.settings.chunkSize).length > 0;
  });

  const pct = (count: number) => (dist.total > 0 ? (count / dist.total) * 100 : 0);

  return (
    <div className="space-y-6">
      {/* Priority #1 Hero Block: Due Review */}
      <section
        aria-labelledby="due-hero-heading"
        className={`rounded-2xl border p-6 sm:p-7 shadow-xs transition-colors ${
          dueWords.length > 0
            ? 'bg-gradient-to-br from-white via-white to-amber-50/60 border-amber-200'
            : 'bg-gradient-to-br from-white via-white to-blue-50/50 border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-white shadow-2xs">
              {dueWords.length > 0 ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                  <span className="text-amber-800">Ưu tiên số 1 • Hệ thống lặp lại ngắt quãng 5 cấp</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">Trạng thái SRS sạch • Không có từ quá hạn</span>
                </>
              )}
            </div>

            <h1
              id="due-hero-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums"
            >
              Cần ôn tập hôm nay ({dueWords.length} từ)
            </h1>

            {dueWords.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Bạn có <strong className="text-slate-900">{dueWords.length} từ</strong> đã đến lịch
                  ôn tập theo chu kỳ Leitner. Hoàn thành lượt ôn tập tổng hợp (Nghe – Cloze – Nghĩa)
                  để nâng cấp độ nhớ dài hạn.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {([1, 2, 3, 4, 5] as const).map((lv) =>
                    dueByLevel[lv] > 0 ? (
                      <span
                        key={lv}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 tabular-nums"
                      >
                        <span className="font-semibold">Lv {lv}:</span> {dueByLevel[lv]} từ
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {dist.learnedCount === 0
                  ? 'Chào mừng bạn đến với EEE5 Vocab Studio! Hãy bắt đầu nạp cụm từ đầu tiên ở Unit 1 để kích hoạt lịch trình SRS 5 cấp.'
                  : 'Tuyệt vời! Hôm nay bạn đã hoàn thành toàn bộ các từ đến hạn. Hãy tiếp tục nạp thêm cụm từ mới để mở rộng vốn từ chuyên ngành.'}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            {dueWords.length > 0 ? (
              <button
                type="button"
                onClick={() => onNavigate('#/review')}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-base font-bold shadow-sm transition-all focus-ring"
              >
                <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                <span>Bắt đầu ôn tập ngay</span>
              </button>
            ) : nextUnlearnedUnit ? (
              <button
                type="button"
                onClick={() => onNavigate(`#/learn/${nextUnlearnedUnit.unit}`)}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-base font-bold shadow-sm transition-all focus-ring"
              >
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span>Học từ mới Unit {nextUnlearnedUnit.unit}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('#/dictionary')}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-base font-bold shadow-sm transition-all focus-ring"
              >
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
                <span>Xem toàn bộ 252 từ</span>
              </button>
            )}

            {dueWords.length > 0 && nextUnlearnedUnit && (
              <button
                type="button"
                onClick={() => onNavigate(`#/learn/${nextUnlearnedUnit.unit}`)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 text-sm font-semibold transition-colors focus-ring"
              >
                <span>Hoặc học từ mới Unit {nextUnlearnedUnit.unit}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Leitner 5-Level Mastery Strip */}
      <section
        aria-labelledby="mastery-strip-heading"
        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 id="mastery-strip-heading" className="text-base font-bold text-slate-900">
              Tiến độ ghi nhớ Leitner 5 cấp độ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tổng hợp {dist.total} từ vựng cốt lõi toàn học phần (Units 1–8)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 tabular-nums">
              <Flame className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Chuỗi học: {state.stats.streakDays} ngày</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 tabular-nums">
              <span>Đã nạp: {dist.learnedCount}/{dist.total} từ</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('#/dictionary?filter=wrong')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors focus-ring tabular-nums ${
                dist.attentionCount > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Hay sai: {dist.attentionCount} từ</span>
            </button>
          </div>
        </div>

        {/* Stacked Progress Bar */}
        <div
          className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden flex border border-slate-200/70"
          role="img"
          aria-label={`Phân bố cấp độ: ${dist.masteredCount} Mastered, ${dist.consolidatingCount} Đang củng cố, ${dist.newlyLearnedCount} Mới nạp, ${dist.unlearnedCount} Chưa học`}
        >
          <div
            style={{ width: `${pct(dist.masteredCount)}%` }}
            className="bg-emerald-600 transition-all duration-500"
            title={`Lv 5 Mastered: ${dist.masteredCount}`}
          />
          <div
            style={{ width: `${pct(dist.consolidatingCount)}%` }}
            className="bg-blue-600 transition-all duration-500"
            title={`Lv 3-4 Đang củng cố: ${dist.consolidatingCount}`}
          />
          <div
            style={{ width: `${pct(dist.newlyLearnedCount)}%` }}
            className="bg-amber-500 transition-all duration-500"
            title={`Lv 1-2 Mới nạp: ${dist.newlyLearnedCount}`}
          />
          <div
            style={{ width: `${pct(dist.unlearnedCount)}%` }}
            className="bg-slate-200 transition-all duration-500"
            title={`Lv 0 Chưa học: ${dist.unlearnedCount}`}
          />
        </div>

        {/* 4 Mastery Buckets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" aria-hidden="true" />
              <span>Lv 0 (Chưa học)</span>
            </div>
            <div className="mt-1.5 text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {dist.unlearnedCount}
            </div>
          </div>

          <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true" />
              <span>Lv 1–2 (Mới nạp)</span>
            </div>
            <div className="mt-1.5 text-2xl font-bold text-amber-900 font-mono tabular-nums">
              {dist.newlyLearnedCount}
            </div>
          </div>

          <div className="rounded-xl border border-blue-200/80 bg-blue-50/40 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" aria-hidden="true" />
              <span>Lv 3–4 (Đang củng cố)</span>
            </div>
            <div className="mt-1.5 text-2xl font-bold text-blue-900 font-mono tabular-nums">
              {dist.consolidatingCount}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
              <span>Lv 5 (Đã thuộc sâu)</span>
            </div>
            <div className="mt-1.5 text-2xl font-bold text-emerald-900 font-mono tabular-nums">
              {dist.masteredCount}
            </div>
          </div>
        </div>
      </section>

      {/* 8-Unit Grid */}
      <section aria-labelledby="units-grid-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="units-grid-heading" className="text-lg font-bold text-slate-900">
              8 Chủ đề học phần (Units 1–8)
            </h2>
            <p className="text-sm text-slate-500">
              Chọn một Unit để học cụm {state.settings.chunkSize} từ mới hoặc xem toàn bộ từ vựng & kỹ năng mở rộng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNITS_META.map((unitMeta) => {
            const unitVocab = getUnitVocab(unitMeta.unit);
            const uDist = getLevelDistribution(unitVocab, state.progress, now);
            const nextChunk = getNewWordsChunk(
              unitVocab,
              state.progress,
              state.settings.chunkSize
            );
            const progressPct = uDist.total > 0 ? Math.round((uDist.learnedCount / uDist.total) * 100) : 0;

            return (
              <article
                key={unitMeta.unit}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <UnitIcon iconKey={unitMeta.iconKey} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                            Unit {unitMeta.unit}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs font-medium text-slate-500 tabular-nums">
                            {uDist.total} từ
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                          {unitMeta.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                          {unitMeta.vietnameseTitle}
                        </p>
                      </div>
                    </div>

                    {uDist.dueCount > 0 && (
                      <button
                        type="button"
                        onClick={() => onNavigate(`#/review/${unitMeta.unit}`)}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors focus-ring tabular-nums"
                        title={`Ôn tập ${uDist.dueCount} từ đến hạn của Unit ${unitMeta.unit}`}
                      >
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{uDist.dueCount} đến hạn</span>
                      </button>
                    )}
                  </div>

                  {/* Unit Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-600 tabular-nums">
                      <span>
                        Đã nạp <strong className="text-slate-900">{uDist.learnedCount}/{uDist.total}</strong> ({progressPct}%)
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        Mastered: {uDist.masteredCount}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        style={{
                          width: `${uDist.total > 0 ? (uDist.masteredCount / uDist.total) * 100 : 0}%`
                        }}
                        className="bg-emerald-600 transition-all"
                      />
                      <div
                        style={{
                          width: `${
                            uDist.total > 0
                              ? ((uDist.learnedCount - uDist.masteredCount) / uDist.total) * 100
                              : 0
                          }%`
                        }}
                        className="bg-blue-600 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Unit Quick Actions */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                  {nextChunk.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(`#/learn/${unitMeta.unit}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-sm font-semibold transition-colors focus-ring"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>Học từ mới ({nextChunk.length})</span>
                    </button>
                  ) : uDist.dueCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(`#/review/${unitMeta.unit}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 text-sm font-semibold transition-colors focus-ring"
                    >
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>Ôn tập Unit ({uDist.dueCount})</span>
                    </button>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Đã nạp hết từ</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onNavigate(`#/unit/${unitMeta.unit}`)}
                    className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2 text-sm font-semibold transition-colors focus-ring"
                  >
                    <span>Chi tiết Unit</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
