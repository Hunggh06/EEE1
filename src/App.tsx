import { useCallback, useEffect, useState } from 'react';
import { CardsPageView } from './components/cards/CardsPageView';
import { DashboardView } from './components/dashboard/DashboardView';
import { WordBankView } from './components/dictionary/WordBankView';
import { type ActiveRouteKey, TopBar } from './components/layout/TopBar';
import { DueReviewSession } from './components/session/DueReviewSession';
import { NewWordSession } from './components/session/NewWordSession';
import { SettingsView } from './components/settings/SettingsView';
import { AiTutorView, type TutorRouteParams } from './components/tutor/AiTutorView';
import { UnitDetailView } from './components/unit/UnitDetailView';
import { CARDS_BY_UNIT } from './data/cards/speakingCards';
import { ALL_VOCAB, ALL_WORD_IDS, VOCAB_BY_ID, getUnitVocab } from './data/vocab';
import { getDueWords, promoteLearnedChunk, updateStudyStreak } from './engine/srs';
import type {
  AppSettings,
  SkillKey,
  StudyState,
  TutorMode,
  UnitResetScope,
  WordProgress
} from './types/vocab';
import { clearAllUnitSkillProgress } from './utils/curriculumHelpers';
import { playClickSound, setSoundEffectsEnabled } from './utils/soundEffects';
import { stopSpeaking } from './utils/speech';
import {
  clearUnitVocabProgress,
  createInitialStudyState,
  loadStudyState,
  saveStudyState
} from './utils/storage';

type ParsedRoute =
  | { view: 'dashboard' }
  | { view: 'unit'; unit: number; skill?: SkillKey }
  | { view: 'cards'; unit?: number }
  | { view: 'learn'; unit: number }
  | { view: 'review'; unit?: number }
  | { view: 'dictionary'; filterWrong: boolean }
  | ({ view: 'tutor' } & TutorRouteParams)
  | { view: 'settings' };

const VALID_TUTOR_MODES = new Set<TutorMode>(['qa', 'quiz', 'roleplay', 'writing']);
const VALID_UNIT_SKILLS = new Set<SkillKey>([
  'vocabulary',
  'grammar',
  'cards',
  'writing',
  'monotalk',
  'listening',
  'reading'
]);

function parseHashRoute(hash: string): ParsedRoute {
  const cleaned = hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = cleaned.split('?');
  const segments = pathPart.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { view: 'dashboard' };
  }

  if (segments[0] === 'unit' && segments[1]) {
    const unitNum = Number(segments[1]);
    if (Number.isInteger(unitNum) && unitNum >= 1 && unitNum <= 8) {
      const rawSkill = segments[2]?.toLowerCase() as SkillKey | undefined;
      const skill = rawSkill && VALID_UNIT_SKILLS.has(rawSkill) ? rawSkill : undefined;
      return { view: 'unit', unit: unitNum, skill };
    }
    return { view: 'dashboard' };
  }

  if (segments[0] === 'cards') {
    const params = new URLSearchParams(queryPart ?? '');
    const rawUnit = params.get('unit') ?? segments[1];
    const unitNum = rawUnit ? Number(rawUnit) : NaN;
    if (Number.isInteger(unitNum) && unitNum >= 1 && unitNum <= 8) {
      return { view: 'cards', unit: unitNum };
    }
    return { view: 'cards' };
  }

  if (segments[0] === 'learn' && segments[1]) {
    const unitNum = Number(segments[1]);
    if (Number.isInteger(unitNum) && unitNum >= 1 && unitNum <= 8) {
      return { view: 'learn', unit: unitNum };
    }
    return { view: 'dashboard' };
  }

  if (segments[0] === 'review') {
    if (segments[1]) {
      const unitNum = Number(segments[1]);
      if (Number.isInteger(unitNum) && unitNum >= 1 && unitNum <= 8) {
        return { view: 'review', unit: unitNum };
      }
    }
    return { view: 'review' };
  }

  if (segments[0] === 'dictionary') {
    const params = new URLSearchParams(queryPart ?? '');
    return { view: 'dictionary', filterWrong: params.get('filter') === 'wrong' };
  }

  if (segments[0] === 'tutor') {
    const params = new URLSearchParams(queryPart ?? '');
    const wordId = params.get('word')?.trim() || undefined;
    const rawUnit = params.get('unit');
    const unitNum = rawUnit ? Number(rawUnit) : NaN;
    const inferredWordUnit = wordId ? VOCAB_BY_ID[wordId]?.unit : undefined;
    const unitScope: 'all' | number =
      Number.isInteger(unitNum) && unitNum >= 1 && unitNum <= 8
        ? unitNum
        : inferredWordUnit ?? 'all';

    const rawMode = params.get('mode') as TutorMode | null;
    const mode = rawMode && VALID_TUTOR_MODES.has(rawMode) ? rawMode : undefined;

    const initialPrompt = params.get('prompt')?.trim() || undefined;

    return {
      view: 'tutor',
      unitScope,
      mode,
      wordId,
      initialPrompt,
      routeKey: hash
    };
  }

  if (segments[0] === 'settings') {
    return { view: 'settings' };
  }

  return { view: 'dashboard' };
}

export function App() {
  const [state, setState] = useState<StudyState>(() => loadStudyState(ALL_WORD_IDS));
  const [routeHash, setRouteHash] = useState<string>(() => window.location.hash || '#/');
  const [unitResetVersions, setUnitResetVersions] = useState<Record<number, number>>({});

  useEffect(() => {
    saveStudyState(state);
  }, [state]);

  useEffect(() => {
    setSoundEffectsEnabled(state.settings.soundEffectsEnabled);
  }, [state.settings.soundEffectsEnabled]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!state.settings.soundEffectsEnabled) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a[href], [role="button"]') as HTMLElement | null;
      if (!interactive) return;
      if ((interactive as HTMLButtonElement).disabled || interactive.getAttribute('aria-disabled') === 'true') {
        return;
      }
      const soundAttr = interactive.getAttribute('data-sound');
      if (soundAttr === 'none' || soundAttr === 'custom') return;
      playClickSound();
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [state.settings.soundEffectsEnabled]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [routeHash]);

  useEffect(() => {
    const onHashChange = () => {
      stopSpeaking();
      setRouteHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((nextHash: string) => {
    stopSpeaking();
    if (window.location.hash === nextHash) {
      setRouteHash(nextHash);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.location.hash = nextHash;
    }
  }, []);

  const handleUpdateSettings = useCallback((patch: Partial<AppSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...patch
      }
    }));
  }, []);

  const handleCompleteChunk = useCallback(
    (wordIds: string[], mistakesById: Record<string, number>) => {
      const now = Date.now();
      setState((prev) => ({
        ...prev,
        progress: promoteLearnedChunk(prev.progress, wordIds, mistakesById, now),
        stats: updateStudyStreak(prev.stats, { sessionsDelta: 1 }, now)
      }));
    },
    []
  );

  const handleApplyReviewWord = useCallback((wordId: string, progress: WordProgress) => {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [wordId]: progress
      }
    }));
  }, []);

  const handleFinishReviewSession = useCallback((reviewedCount: number) => {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      stats: updateStudyStreak(prev.stats, { reviewsDelta: reviewedCount }, now)
    }));
  }, []);

  const handleReplaceState = useCallback((nextState: StudyState) => {
    setState(nextState);
  }, []);

  const handleResetAll = useCallback(() => {
    setState(createInitialStudyState());
  }, []);

  const handleResetUnit = useCallback((unitNumber: number, scope: UnitResetScope = 'all') => {
    stopSpeaking();
    const unitWordIds = getUnitVocab(unitNumber).map((w) => w.id);
    setState((prev) => clearUnitVocabProgress(prev, unitWordIds));

    if (scope === 'all') {
      const unitCardIds = (CARDS_BY_UNIT[unitNumber] ?? []).map((c) => c.id);
      clearAllUnitSkillProgress(unitNumber, unitCardIds);
    }

    setUnitResetVersions((prev) => ({
      ...prev,
      [unitNumber]: (prev[unitNumber] ?? 0) + 1
    }));
  }, []);

  const parsedRoute = parseHashRoute(routeHash);
  const dueCount = getDueWords(ALL_VOCAB, state.progress, Date.now()).length;
  const activeRouteKey: ActiveRouteKey = parsedRoute.view;

  return (
    <div className="min-h-screen flex flex-col bg-eng-grid text-slate-900">
      <TopBar
        activeRoute={activeRouteKey}
        dueCount={dueCount}
        settings={state.settings}
        onUpdateSettings={handleUpdateSettings}
        onNavigate={navigate}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {parsedRoute.view === 'dashboard' && (
          <DashboardView state={state} onResetUnit={handleResetUnit} onNavigate={navigate} />
        )}

        {parsedRoute.view === 'unit' && (
          <UnitDetailView
            key={`unit-${parsedRoute.unit}`}
            unitNumber={parsedRoute.unit}
            initialSkill={parsedRoute.skill}
            resetVersion={unitResetVersions[parsedRoute.unit] ?? 0}
            state={state}
            onUpdateSettings={handleUpdateSettings}
            onResetUnit={handleResetUnit}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'cards' && (
          <CardsPageView
            initialUnit={parsedRoute.unit}
            settings={state.settings}
            onUpdateSettings={handleUpdateSettings}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'learn' && (
          <NewWordSession
            key={`learn-${parsedRoute.unit}-${unitResetVersions[parsedRoute.unit] ?? 0}`}
            unitNumber={parsedRoute.unit}
            state={state}
            onUpdateSettings={handleUpdateSettings}
            onCompleteChunk={handleCompleteChunk}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'review' && (
          <DueReviewSession
            key={`review-${parsedRoute.unit ?? 'all'}`}
            unitFilter={parsedRoute.unit}
            state={state}
            onUpdateSettings={handleUpdateSettings}
            onApplyReviewWord={handleApplyReviewWord}
            onFinishReviewSession={handleFinishReviewSession}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'dictionary' && (
          <WordBankView
            state={state}
            initialFilterWrong={parsedRoute.filterWrong}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'tutor' && (
          <AiTutorView
            state={state}
            routeParams={parsedRoute}
            onUpdateSettings={handleUpdateSettings}
            onNavigate={navigate}
          />
        )}

        {parsedRoute.view === 'settings' && (
          <SettingsView
            state={state}
            onUpdateSettings={handleUpdateSettings}
            onReplaceState={handleReplaceState}
            onResetUnit={handleResetUnit}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <strong>EEE5 Vocab Studio</strong> • English for Electrical &amp; Electronics Engineering 5
          </div>
          <div className="font-mono tabular-nums">
            252 từ chuyên ngành • Leitner 5-Level SRS • DeepSeek v4.1 Flash AI Tutor
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
