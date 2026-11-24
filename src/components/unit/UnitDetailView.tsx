import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  BookOpenText,
  Bot,
  CheckCircle2,
  Clock,
  CreditCard,
  Headphones,
  Layers,
  PenLine,
  Search,
  Sparkles,
  Target
} from 'lucide-react';
import { CARDS_BY_UNIT } from '../../data/cards/speakingCards';
import { getUnitGrammar } from '../../data/grammar';
import { getUnitListening } from '../../data/listening';
import { getUnitReading } from '../../data/reading';
import { UNITS_META_BY_NUMBER } from '../../data/unitsMeta';
import { getTopicsForUnit, getUnitVocab } from '../../data/vocab';
import { getUnitWriting } from '../../data/writing';
import {
  formatCountdownVi,
  getDueWords,
  getLevelDistribution,
  getNewWordsChunk,
  getWordProgress,
  normalizeAnswer
} from '../../engine/srs';
import type { AppSettings, SkillKey, SrsLevel, StudyState } from '../../types/vocab';
import { SpeakingCardsWorkspace } from '../cards/SpeakingCardsWorkspace';
import { HighlightedExample } from '../common/HighlightedExample';
import { SpeakButton } from '../common/SpeakButton';
import { SrsBadge } from '../common/SrsBadge';
import { UnitIcon } from '../common/UnitIcon';
import { GrammarTab } from './GrammarTab';
import { ListeningTab } from './ListeningTab';
import { ReadingTab } from './ReadingTab';
import { WritingTab } from './WritingTab';

interface UnitDetailViewProps {
  unitNumber: number;
  initialSkill?: SkillKey;
  state: StudyState;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onNavigate: (hash: string) => void;
}

type LevelFilter = 'all' | 'wrong' | SrsLevel;

export function UnitDetailView({
  unitNumber,
  initialSkill,
  state,
  onUpdateSettings,
  onNavigate
}: UnitDetailViewProps) {
  const unitMeta = UNITS_META_BY_NUMBER[unitNumber];
  const unitVocab = useMemo(() => getUnitVocab(unitNumber), [unitNumber]);
  const topics = useMemo(() => getTopicsForUnit(unitNumber), [unitNumber]);
  const unitGrammar = useMemo(() => getUnitGrammar(unitNumber), [unitNumber]);
  const unitCards = useMemo(() => CARDS_BY_UNIT[unitNumber] ?? [], [unitNumber]);
  const unitWriting = useMemo(() => getUnitWriting(unitNumber), [unitNumber]);
  const unitListening = useMemo(() => getUnitListening(unitNumber), [unitNumber]);
  const unitListeningCount = useMemo(
    () =>
      (unitListening?.tasks ?? []).reduce((sum, task) => sum + task.questions.length, 0),
    [unitListening]
  );
  const unitReading = useMemo(() => getUnitReading(unitNumber), [unitNumber]);
  const unitReadingCount = useMemo(
    () =>
      (unitReading?.tasks ?? []).reduce((sum, task) => sum + task.questions.length, 0),
    [unitReading]
  );

  const [activeSkill, setActiveSkill] = useState<SkillKey>(() => initialSkill ?? 'vocabulary');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  useEffect(() => {
    setActiveSkill(initialSkill ?? 'vocabulary');
  }, [initialSkill, unitNumber]);

  const filteredVocab = useMemo(() => {
    const q = normalizeAnswer(searchQuery);
    return unitVocab.filter((item) => {
      if (topicFilter !== 'all' && item.topic !== topicFilter) return false;

      const wp = getWordProgress(state.progress, item.id);
      if (levelFilter === 'wrong' && wp.wrongCount === 0) return false;
      if (typeof levelFilter === 'number' && wp.level !== levelFilter) return false;

      if (!q) return true;
      return (
        item.word.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.ipa.toLowerCase().includes(q) ||
        (item.topic ?? '').toLowerCase().includes(q)
      );
    });
  }, [unitVocab, searchQuery, topicFilter, levelFilter, state.progress]);

  if (!unitMeta) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-4">
        <p className="text-slate-700 font-medium">Không tìm thấy Unit {unitNumber}.</p>
        <button
          type="button"
          onClick={() => onNavigate('#/')}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-semibold focus-ring"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Về Dashboard</span>
        </button>
      </div>
    );
  }

  const now = Date.now();
  const dist = getLevelDistribution(unitVocab, state.progress, now);
  const dueInUnit = getDueWords(unitVocab, state.progress, now);
  const nextChunk = getNewWordsChunk(unitVocab, state.progress, state.settings.chunkSize);

  const skillTabs: Array<{ key: SkillKey; label: string; badge?: string; icon?: React.ReactNode }> = [
    {
      key: 'vocabulary',
      label: 'Vocabulary',
      badge: `${unitVocab.length} từ`,
      icon: <BookOpen className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'grammar',
      label: 'Grammar',
      badge: `${unitGrammar?.questions.length ?? 8} câu`,
      icon: <Layers className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'cards',
      label: 'Cards',
      badge: `${unitCards.length} card`,
      icon: <CreditCard className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'writing',
      label: 'Writing',
      badge: `${unitWriting?.sentences.length ?? 7} câu`,
      icon: <PenLine className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'listening',
      label: 'Listening',
      badge: `${unitListeningCount} câu`,
      icon: <Headphones className="w-4 h-4" aria-hidden="true" />
    },
    {
      key: 'reading',
      label: 'Reading',
      badge: `${unitReadingCount} câu`,
      icon: <BookOpenText className="w-4 h-4" aria-hidden="true" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('#/')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors focus-ring rounded-lg px-1 py-0.5"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Quay lại Dashboard</span>
        </button>
      </div>

      {/* Unit Header Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <UnitIcon iconKey={unitMeta.iconKey} className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                  Unit {unitMeta.unit}
                </span>
                <span className="text-xs font-medium text-slate-500 tabular-nums">
                  {dist.learnedCount}/{dist.total} từ đã nạp • {dist.masteredCount} Mastered
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {unitMeta.title}
              </h1>
              <p className="text-sm font-semibold text-blue-700">{unitMeta.vietnameseTitle}</p>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed pt-1">
                {unitMeta.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(`#/tutor?unit=${unitMeta.unit}`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 text-sm font-bold shadow-2xs transition-colors focus-ring shrink-0"
          >
            <Bot className="w-4 h-4" aria-hidden="true" />
            <span>Hỏi Gia sư AI</span>
          </button>
        </div>

        {/* Textbook Overall Objectives */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
            <Target className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>Mục tiêu học phần (Overall Objectives)</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs sm:text-sm text-slate-700">
            {unitMeta.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white rounded-lg border border-slate-200/70 p-2.5">
                <span className="font-mono text-xs font-bold text-blue-600 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="leading-snug">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modular Skill Tab Bar */}
      <div
        role="tablist"
        aria-label="Kỹ năng trong Unit"
        className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3"
      >
        {skillTabs.map((tab) => {
          const isActive = activeSkill === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSkill(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all focus-ring ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeSkill === 'grammar' ? (
        <GrammarTab
          unitNumber={unitMeta.unit}
          settings={state.settings}
          onNavigate={onNavigate}
        />
      ) : activeSkill === 'cards' ? (
        <SpeakingCardsWorkspace
          unitNumber={unitMeta.unit}
          settings={state.settings}
          onUpdateSettings={onUpdateSettings}
          onNavigate={onNavigate}
        />
      ) : activeSkill === 'writing' ? (
        <WritingTab
          unitNumber={unitMeta.unit}
          settings={state.settings}
          onUpdateSettings={onUpdateSettings}
          onNavigate={onNavigate}
        />
      ) : activeSkill === 'listening' ? (
        <ListeningTab unitNumber={unitMeta.unit} settings={state.settings} />
      ) : activeSkill === 'reading' ? (
        <ReadingTab unitNumber={unitMeta.unit} settings={state.settings} />
      ) : (
        <div className="space-y-4">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={nextChunk.length === 0}
                onClick={() => onNavigate(`#/learn/${unitMeta.unit}`)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring disabled:opacity-45"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>
                  {nextChunk.length > 0
                    ? `Học từ mới (${nextChunk.length} từ)`
                    : 'Đã nạp hết từ mới Unit này'}
                </span>
              </button>

              {dueInUnit.length > 0 && (
                <button
                  type="button"
                  onClick={() => onNavigate(`#/review/${unitMeta.unit}`)}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring"
                >
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Ôn tập Unit này ({dueInUnit.length} từ đến hạn)</span>
                </button>
              )}

              {nextChunk.length === 0 && dueInUnit.length === 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Tất cả từ Unit {unitMeta.unit} đang nằm trong lịch SRS</span>
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm font-medium text-slate-500 tabular-nums">
              Hiển thị <strong className="text-slate-900">{filteredVocab.length}</strong> /{' '}
              {unitVocab.length} từ
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ tiếng Anh, nghĩa tiếng Việt, IPA..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                aria-label="Lọc theo chủ đề"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="all">Tất cả chủ đề ({topics.length})</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    Topic: {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={String(levelFilter)}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'all' || val === 'wrong') {
                    setLevelFilter(val);
                  } else {
                    setLevelFilter(Number(val) as SrsLevel);
                  }
                }}
                aria-label="Lọc theo cấp độ SRS"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="all">Mọi cấp độ SRS</option>
                <option value="0">Lv 0 • Chưa học</option>
                <option value="1">Lv 1 • Mới nạp</option>
                <option value="2">Lv 2 • Ghi nhớ</option>
                <option value="3">Lv 3 • Củng cố</option>
                <option value="4">Lv 4 • Vững vàng</option>
                <option value="5">Lv 5 • Mastered</option>
                <option value="wrong">Hay sai (wrongCount &gt; 0)</option>
              </select>
            </div>
          </div>

          {/* Vocabulary Cards List */}
          {filteredVocab.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Không có từ vựng nào khớp với bộ lọc hiện tại.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredVocab.map((item) => {
                const wp = getWordProgress(state.progress, item.id);
                const countdown = formatCountdownVi(wp, now);
                const isDue = wp.level >= 1 && wp.nextReview <= now;

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Left: Word, IPA, Meaning, Meta */}
                      <div className="space-y-2.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <SpeakButton
                            text={item.word}
                            settings={state.settings}
                            size="sm"
                            variant="outline"
                            title={`Nghe từ ${item.word}`}
                          />
                          <h3 className="text-lg font-bold text-slate-900">{item.word}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                            {item.pos}
                          </span>
                          <span className="font-mono text-sm text-slate-500">{item.ipa}</span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-50/80 text-blue-700 text-xs font-medium border border-blue-100">
                            {item.topic}
                          </span>
                        </div>

                        <div className="text-base font-semibold text-slate-800">{item.meaning}</div>

                        {(item.synonyms?.length || item.wordFamily?.length) && (
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {item.synonyms && item.synonyms.length > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                                <strong className="text-slate-700">Đồng nghĩa:</strong>{' '}
                                {item.synonyms.join(', ')}
                              </span>
                            )}
                            {item.wordFamily && item.wordFamily.length > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                                <strong className="text-slate-700">Word family:</strong>{' '}
                                {item.wordFamily.join(', ')}
                              </span>
                            )}
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
                      </div>

                      {/* Right: SRS Status, Wrong Count & AI Tutor button */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onNavigate(`#/tutor?unit=${unitMeta.unit}&word=${item.id}`)
                            }
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
                              <span>Sai {wp.wrongCount} lần</span>
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
      )}
    </div>
  );
}
