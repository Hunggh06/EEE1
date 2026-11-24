import { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpenText,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  RotateCcw,
  Send,
  XCircle
} from 'lucide-react';
import { getUnitGrammar } from '../../data/grammar';
import type { GrammarQuestion } from '../../types/curriculum';
import type { AppSettings } from '../../types/vocab';
import {
  isGrammarAnswerCorrect,
  loadGrammarProgress,
  saveGrammarUnitProgress,
  type GrammarUnitProgress
} from '../../utils/curriculumHelpers';
import {
  playCompleteSound,
  playCorrectSound,
  playWrongSound
} from '../../utils/soundEffects';
import { SpeakButton } from '../common/SpeakButton';

interface GrammarTabProps {
  unitNumber: number;
  settings: AppSettings;
  onNavigate: (hash: string) => void;
}

type GrammarSubTab = 'theory' | 'practice';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function buildQuestionTypeBadge(type: GrammarQuestion['type']): { label: string; className: string } {
  switch (type) {
    case 'mcq':
      return {
        label: 'Trắc nghiệm',
        className: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    case 'fill':
      return {
        label: 'Điền từ / Chia động từ',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    case 'rewrite':
      return {
        label: 'Viết lại câu',
        className: 'bg-violet-50 text-violet-700 border-violet-200'
      };
  }
}

export function GrammarTab({ unitNumber, settings, onNavigate }: GrammarTabProps) {
  const grammarModule = useMemo(() => getUnitGrammar(unitNumber), [unitNumber]);

  const [subTab, setSubTab] = useState<GrammarSubTab>('theory');
  const [savedProgress, setSavedProgress] = useState<GrammarUnitProgress | undefined>(() => {
    return loadGrammarProgress()[unitNumber];
  });

  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>(() => {
    return loadGrammarProgress()[unitNumber]?.answers ?? {};
  });

  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    return new Set(loadGrammarProgress()[unitNumber]?.checkedIds ?? []);
  });

  useEffect(() => {
    const unitData = loadGrammarProgress()[unitNumber];
    setSavedProgress(unitData);
    setDraftAnswers(unitData?.answers ?? {});
    setCheckedIds(new Set(unitData?.checkedIds ?? []));
  }, [unitNumber]);

  if (!grammarModule) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        Chưa có dữ liệu ngữ pháp cho Unit {unitNumber}.
      </div>
    );
  }

  const questions = grammarModule.questions;
  const totalQuestions = questions.length;

  const evaluatedResults = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const q of questions) {
      if (checkedIds.has(q.id)) {
        map[q.id] = isGrammarAnswerCorrect(q, draftAnswers[q.id] ?? '');
      }
    }
    return map;
  }, [questions, checkedIds, draftAnswers]);

  const checkedCount = checkedIds.size;
  const correctCount = Object.values(evaluatedResults).filter(Boolean).length;
  const bestScore = savedProgress?.bestScore ?? 0;

  const persistProgress = (
    nextAnswers: Record<string, string>,
    nextChecked: Set<string>
  ) => {
    const score = questions.reduce((acc, q) => {
      if (!nextChecked.has(q.id)) return acc;
      return acc + (isGrammarAnswerCorrect(q, nextAnswers[q.id] ?? '') ? 1 : 0);
    }, 0);

    const prevBest = savedProgress?.bestScore ?? 0;
    const payload: GrammarUnitProgress = {
      bestScore: Math.max(prevBest, score),
      lastScore: score,
      totalQuestions,
      answers: nextAnswers,
      checkedIds: Array.from(nextChecked),
      updatedAt: Date.now()
    };

    const updatedMap = saveGrammarUnitProgress(unitNumber, payload);
    setSavedProgress(updatedMap[unitNumber]);
  };

  const handleCheckQuestion = (q: GrammarQuestion, overrideAnswer?: string) => {
    const chosen = (overrideAnswer ?? draftAnswers[q.id] ?? '').trim();
    if (!chosen) return;

    const nextAnswers = { ...draftAnswers, [q.id]: chosen };
    const wasAlreadyChecked = checkedIds.has(q.id);
    const nextChecked = new Set(checkedIds);
    nextChecked.add(q.id);

    setDraftAnswers(nextAnswers);
    setCheckedIds(nextChecked);

    const isCorrect = isGrammarAnswerCorrect(q, chosen);
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    if (!wasAlreadyChecked && nextChecked.size === totalQuestions) {
      setTimeout(() => playCompleteSound(), 220);
    }

    persistProgress(nextAnswers, nextChecked);
  };

  const handleResetPractice = () => {
    const emptyChecked = new Set<string>();
    setDraftAnswers({});
    setCheckedIds(emptyChecked);

    const payload: GrammarUnitProgress = {
      bestScore: savedProgress?.bestScore ?? 0,
      lastScore: 0,
      totalQuestions,
      answers: {},
      checkedIds: [],
      updatedAt: Date.now()
    };
    const updatedMap = saveGrammarUnitProgress(unitNumber, payload);
    setSavedProgress(updatedMap[unitNumber]);
  };

  const askAiAboutTopic = () => {
    const prompt = `Hãy giải thích chuyên đề ngữ pháp Unit ${unitNumber} (${grammarModule.title}) kèm ví dụ sát chuyên ngành Điện – Điện tử và lưu ý lỗi hay gặp khi làm bài tập.`;
    onNavigate(`#/tutor?unit=${unitNumber}&mode=qa&prompt=${encodeURIComponent(prompt)}`);
  };

  const askAiAboutQuestion = (q: GrammarQuestion, idx: number) => {
    const userAns = draftAnswers[q.id]?.trim();
    const prompt = `Giải thích giúp mình câu ngữ pháp số ${idx + 1} (Unit ${unitNumber}): "${q.prompt}"${
      userAns ? ` — Mình trả lời "${userAns}"` : ''
    }, đáp án chuẩn là "${q.displayAnswer}". Vì sao dùng cấu trúc đó?`;
    onNavigate(`#/tutor?unit=${unitNumber}&mode=qa&prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="space-y-5">
      {/* Module Header + Sub-tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
              Unit {unitNumber} • Language Focus
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {grammarModule.title}
            </h2>
            <p className="text-sm text-slate-600">{grammarModule.subtitleVi}</p>
          </div>

          <button
            type="button"
            onClick={askAiAboutTopic}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 text-sm font-bold transition-colors focus-ring shrink-0"
          >
            <Bot className="w-4 h-4" aria-hidden="true" />
            <span>Hỏi Gia sư AI về chuyên đề này</span>
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Chế độ học Grammar"
          className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100"
        >
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'theory'}
            onClick={() => setSubTab('theory')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors focus-ring ${
              subTab === 'theory'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpenText className="w-4 h-4" aria-hidden="true" />
            <span>Lý thuyết &amp; Công thức</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                subTab === 'theory' ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {grammarModule.sections.length} phần
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'practice'}
            onClick={() => setSubTab('practice')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors focus-ring ${
              subTab === 'practice'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
            <span>Bài tập thực hành</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-mono tabular-nums ${
                subTab === 'practice'
                  ? 'bg-white/20 text-white'
                  : bestScore > 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {bestScore > 0 ? `Cao nhất ${bestScore}/${totalQuestions}` : `${totalQuestions} câu`}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: THEORY & FORMULAS */}
      {subTab === 'theory' && (
        <div className="space-y-4">
          {grammarModule.sections.map((section) => (
            <section
              key={section.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4"
            >
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{section.explanationVi}</p>
              </div>

              {/* Formulas Grid */}
              <div className="space-y-3">
                {section.formulas.map((formula, fIdx) => (
                  <div
                    key={fIdx}
                    className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        {formula.label}
                      </span>
                    </div>

                    <div className="rounded-lg bg-white border border-blue-200/80 px-3.5 py-2.5 font-mono text-xs sm:text-sm font-semibold text-blue-800 break-words">
                      {formula.pattern}
                    </div>

                    <div className="flex items-start gap-2.5 pt-0.5">
                      <SpeakButton
                        text={formula.example}
                        settings={settings}
                        size="sm"
                        variant="outline"
                        title="Nghe câu ví dụ"
                        className="shrink-0 mt-0.5"
                      />
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-slate-900 leading-relaxed">
                          {formula.example}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 italic">
                          → {formula.translationVi}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes Box */}
              {section.notes && section.notes.length > 0 && (
                <div className="rounded-xl border border-amber-200/90 bg-amber-50/60 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                    <Lightbulb className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    <span>Lưu ý tránh lỗi sai phổ biến</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950/90 list-disc pl-5">
                    {section.notes.map((note, nIdx) => (
                      <li key={nIdx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setSubTab('practice')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring"
            >
              <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
              <span>Chuyển sang làm {totalQuestions} bài tập thực hành →</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE PRACTICE */}
      {subTab === 'practice' && (
        <div className="space-y-4">
          {/* Score & Stepper Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 text-sm tabular-nums">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold">
                  Đã kiểm tra: {checkedCount}/{totalQuestions}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  Đúng hiện tại: {correctCount}/{totalQuestions}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                  <Award className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  Điểm cao nhất: {bestScore}/{totalQuestions}
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetPractice}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors focus-ring"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm lại bài tập</span>
              </button>
            </div>

            {/* Quick question status pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {questions.map((q, idx) => {
                const isChecked = checkedIds.has(q.id);
                const isRight = evaluatedResults[q.id];
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      document.getElementById(`grammar-q-${q.id}`)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold border transition-colors focus-ring tabular-nums ${
                      !isChecked
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : isRight
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-rose-600 border-rose-600 text-white'
                    }`}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8 Interactive Question Cards */}
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isChecked = checkedIds.has(q.id);
              const isCorrect = evaluatedResults[q.id] ?? false;
              const userValue = draftAnswers[q.id] ?? '';
              const badge = buildQuestionTypeBadge(q.type);

              return (
                <article
                  key={q.id}
                  id={`grammar-q-${q.id}`}
                  className={`rounded-2xl border bg-white p-5 shadow-2xs space-y-4 transition-colors ${
                    !isChecked
                      ? 'border-slate-200'
                      : isCorrect
                        ? 'border-emerald-300 bg-emerald-50/15'
                        : 'border-rose-300 bg-rose-50/15'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white tabular-nums">
                        Câu {idx + 1}/{totalQuestions}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {isChecked && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Chính xác</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Chưa đúng</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Prompt */}
                  <div className="space-y-1.5">
                    <p className="text-base font-semibold text-slate-900 leading-relaxed">
                      {q.prompt}
                    </p>
                    {q.promptVi && (
                      <p className="text-xs sm:text-sm text-slate-500">{q.promptVi}</p>
                    )}
                  </div>

                  {/* Interactive Input Area */}
                  {q.type === 'mcq' && q.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userValue === opt;
                        const isOptionCorrect = isGrammarAnswerCorrect(q, opt);

                        let styleClass =
                          'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';
                        if (isChecked) {
                          if (isOptionCorrect) {
                            styleClass =
                              'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isSelected && !isOptionCorrect) {
                            styleClass = 'border-rose-400 bg-rose-50 text-rose-900';
                          } else {
                            styleClass = 'border-slate-200 bg-slate-50/60 text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            data-sound="custom"
                            disabled={isChecked}
                            onClick={() => handleCheckQuestion(q, opt)}
                            className={`flex items-start gap-2.5 text-left rounded-xl border px-3.5 py-3 text-sm transition-all focus-ring disabled:cursor-default ${styleClass}`}
                          >
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                              {OPTION_LETTERS[optIdx] ?? optIdx + 1}
                            </span>
                            <span className="leading-snug flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!isChecked) {
                          handleCheckQuestion(q);
                        }
                      }}
                      className="flex flex-col sm:flex-row gap-2.5"
                    >
                      {q.type === 'rewrite' ? (
                        <textarea
                          rows={2}
                          value={userValue}
                          disabled={isChecked}
                          onChange={(e) =>
                            setDraftAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              if (!isChecked && userValue.trim()) {
                                handleCheckQuestion(q);
                              }
                            }
                          }}
                          placeholder="Nhập câu viết lại bằng tiếng Anh rồi nhấn Enter hoặc bấm Kiểm tra..."
                          className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-50"
                        />
                      ) : (
                        <input
                          type="text"
                          value={userValue}
                          disabled={isChecked}
                          onChange={(e) =>
                            setDraftAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Nhập từ / cụm từ cần điền..."
                          className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-50"
                        />
                      )}

                      <button
                        type="submit"
                        data-sound="custom"
                        disabled={isChecked || !userValue.trim()}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-bold transition-colors focus-ring disabled:opacity-45 shrink-0 self-start sm:self-stretch"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Kiểm tra</span>
                      </button>
                    </form>
                  )}

                  {/* Feedback & Explanation */}
                  {isChecked && (
                    <div
                      className={`rounded-xl border p-4 space-y-2.5 ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/70'
                          : 'border-rose-200 bg-rose-50/70'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-bold text-slate-800">Đáp án chuẩn:</span>
                          <span className="font-mono font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-md">
                            {q.displayAnswer}
                          </span>
                          <SpeakButton
                            text={q.displayAnswer}
                            settings={settings}
                            size="sm"
                            variant="outline"
                            title="Nghe đáp án"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => askAiAboutQuestion(q, idx)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 text-blue-700 px-3 py-1.5 text-xs font-semibold transition-colors focus-ring"
                        >
                          <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Hỏi Gia sư AI câu này</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <strong>Giải thích:</strong> {q.explanationVi}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
