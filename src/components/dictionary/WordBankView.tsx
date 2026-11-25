import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, BookOpen, Bot, Search } from 'lucide-react';
import { UNITS_META } from '../../data/unitsMeta';
import { ALL_VOCAB } from '../../data/vocab';
import { formatCountdownVi, getWordProgress, normalizeAnswer } from '../../engine/srs';
import type { SrsLevel, StudyState } from '../../types/vocab';
import { HighlightedExample } from '../common/HighlightedExample';
import { SpeakButton } from '../common/SpeakButton';
import { SrsBadge } from '../common/SrsBadge';
import { VocabMnemonicBox } from '../common/VocabMnemonicBox';

interface WordBankViewProps {
  state: StudyState;
  initialFilterWrong?: boolean;
  onNavigate: (hash: string) => void;
}

type LevelFilter = 'all' | 'wrong' | SrsLevel;

export function WordBankView({
  state,
  initialFilterWrong = false,
  onNavigate
}: WordBankViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState<number | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>(
    initialFilterWrong ? 'wrong' : 'all'
  );

  useEffect(() => {
    if (initialFilterWrong) {
      setLevelFilter('wrong');
    }
  }, [initialFilterWrong]);

  const now = Date.now();

  const filtered = useMemo(() => {
    const q = normalizeAnswer(searchQuery);
    return ALL_VOCAB.filter((item) => {
      if (unitFilter !== 'all' && item.unit !== unitFilter) return false;

      const wp = getWordProgress(state.progress, item.id);
      if (levelFilter === 'wrong' && wp.wrongCount === 0) return false;
      if (typeof levelFilter === 'number' && wp.level !== levelFilter) return false;

      if (!q) return true;
      return (
        item.word.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.ipa.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, unitFilter, levelFilter, state.progress]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Từ điển tổng hợp Units 1–8
            </h1>
            <p className="text-sm text-slate-500">
              Tra cứu nhanh toàn bộ {ALL_VOCAB.length} thuật ngữ chuyên ngành Điện – Điện tử, phát âm và trạng thái SRS.
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold text-slate-600 tabular-nums shrink-0">
          Kết quả: <strong className="text-slate-900 font-mono">{filtered.length}</strong> /{' '}
          {ALL_VOCAB.length} từ
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-6 relative">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo từ tiếng Anh, nghĩa tiếng Việt, IPA hoặc chủ đề..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={String(unitFilter)}
            onChange={(e) =>
              setUnitFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            aria-label="Lọc theo Unit"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="all">Tất cả 8 Units</option>
            {UNITS_META.map((u) => (
              <option key={u.unit} value={u.unit}>
                Unit {u.unit}: {u.vietnameseTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={String(levelFilter)}
            onChange={(e) => {
              const v = e.target.value;
              if (v === 'all' || v === 'wrong') {
                setLevelFilter(v);
              } else {
                setLevelFilter(Number(v) as SrsLevel);
              }
            }}
            aria-label="Lọc theo cấp độ SRS"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="all">Mọi cấp độ SRS</option>
            <option value="wrong">Từ hay sai (wrongCount &gt; 0)</option>
            <option value="0">Lv 0 • Chưa học</option>
            <option value="1">Lv 1 • Mới nạp</option>
            <option value="2">Lv 2 • Ghi nhớ</option>
            <option value="3">Lv 3 • Củng cố</option>
            <option value="4">Lv 4 • Vững vàng</option>
            <option value="5">Lv 5 • Mastered</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-2">
          <p className="text-slate-700 font-semibold">Không tìm thấy từ vựng phù hợp.</p>
          <p className="text-sm text-slate-500">Hãy thử xoá từ khoá tìm kiếm hoặc đổi bộ lọc.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const wp = getWordProgress(state.progress, item.id);
            const countdown = formatCountdownVi(wp, now);
            const isDue = wp.level >= 1 && wp.nextReview <= now;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <SpeakButton
                        text={item.word}
                        settings={state.settings}
                        size="sm"
                        variant="outline"
                      />
                      <h2 className="text-lg font-bold text-slate-900">{item.word}</h2>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                        {item.pos}
                      </span>
                      <span className="font-mono text-sm text-slate-500">{item.ipa}</span>
                      <button
                        type="button"
                        onClick={() => onNavigate(`#/unit/${item.unit}`)}
                        className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-100 transition-colors focus-ring"
                      >
                        Unit {item.unit} • {item.topic}
                      </button>
                    </div>

                    <div className="text-base font-semibold text-slate-800">{item.meaning}</div>

                    {(item.synonyms?.length || item.wordFamily?.length) && (
                      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                        {item.synonyms?.length ? (
                          <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                            <strong>Đồng nghĩa:</strong> {item.synonyms.join(', ')}
                          </span>
                        ) : null}
                        {item.wordFamily?.length ? (
                          <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                            <strong>Word family:</strong> {item.wordFamily.join(', ')}
                          </span>
                        ) : null}
                      </div>
                    )}

                    <div className="flex items-start gap-2 rounded-xl bg-slate-50/80 border border-slate-200/70 px-3 py-2 text-sm text-slate-700">
                      <SpeakButton
                        text={item.example}
                        settings={state.settings}
                        size="sm"
                        variant="ghost"
                        title="Nghe câu ví dụ"
                        className="shrink-0 -ml-1"
                      />
                      <HighlightedExample
                        sentence={item.example}
                        targetWord={item.word}
                        className="leading-relaxed pt-0.5"
                      />
                    </div>

                    <VocabMnemonicBox
                      mnemonicVi={item.mnemonicVi}
                      word={item.word}
                      settings={state.settings}
                      compact
                    />
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigate(`#/tutor?unit=${item.unit}&word=${item.id}`)}
                        title={`Hỏi Gia sư AI về từ "${item.word}"`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors focus-ring"
                      >
                        <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hỏi AI</span>
                      </button>
                      <SrsBadge level={wp.level} />
                    </div>
                    <div className="flex items-center gap-2 text-xs tabular-nums">
                      <span
                        className={`px-2 py-0.5 rounded-md font-medium ${
                          isDue
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'text-slate-500'
                        }`}
                      >
                        {countdown}
                      </span>
                      {wp.wrongCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
                          <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                          <span>Sai {wp.wrongCount}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
