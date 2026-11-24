import type { SrsLevel, VocabItem, WordProgress } from '../types/vocab';
import { applyReviewResult, isAnswerCorrect, normalizeAnswer } from './srs';

export type DrillingRound = 1 | 2 | 3;

export interface DrillingFeedback {
  wordId: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  willRequeue: boolean;
}

export interface DrillingQueueState {
  round: DrillingRound;
  wordIds: string[];
  queue: string[];
  requeuedInRound: Record<string, boolean>;
  mistakesById: Record<string, number>;
  totalAttempts: number;
  correctAttempts: number;
  feedback: DrillingFeedback | null;
  isCompleted: boolean;
}

export function createDrillingQueue(wordIds: string[]): DrillingQueueState {
  if (wordIds.length === 0) {
    return {
      round: 1,
      wordIds: [],
      queue: [],
      requeuedInRound: {},
      mistakesById: {},
      totalAttempts: 0,
      correctAttempts: 0,
      feedback: null,
      isCompleted: true
    };
  }

  return {
    round: 1,
    wordIds: [...wordIds],
    queue: [...wordIds],
    requeuedInRound: {},
    mistakesById: {},
    totalAttempts: 0,
    correctAttempts: 0,
    feedback: null,
    isCompleted: false
  };
}

export function submitDrillingAnswer(
  state: DrillingQueueState,
  userAnswer: string,
  vocabById: Record<string, VocabItem>
): DrillingQueueState {
  if (state.isCompleted || state.feedback !== null || state.queue.length === 0) {
    return state;
  }

  const currentId = state.queue[0];
  const item = vocabById[currentId];
  if (!item) {
    return state;
  }

  const expected = state.round === 1 ? item.meaning : item.word;
  const isCorrect = isAnswerCorrect(userAnswer, expected);

  const nextMistakes = isCorrect
    ? state.mistakesById
    : {
        ...state.mistakesById,
        [currentId]: (state.mistakesById[currentId] ?? 0) + 1
      };

  return {
    ...state,
    mistakesById: nextMistakes,
    totalAttempts: state.totalAttempts + 1,
    correctAttempts: state.correctAttempts + (isCorrect ? 1 : 0),
    feedback: {
      wordId: currentId,
      isCorrect,
      userAnswer,
      correctAnswer: expected,
      willRequeue: !isCorrect
    }
  };
}

export function advanceDrillingQueue(state: DrillingQueueState): DrillingQueueState {
  if (!state.feedback || state.queue.length === 0) {
    return state;
  }

  const [head, ...rest] = state.queue;

  if (!state.feedback.isCorrect) {
    return {
      ...state,
      queue: [...rest, head],
      requeuedInRound: {
        ...state.requeuedInRound,
        [head]: true
      },
      feedback: null
    };
  }

  if (rest.length > 0) {
    return {
      ...state,
      queue: rest,
      feedback: null
    };
  }

  if (state.round < 3) {
    return {
      ...state,
      round: (state.round + 1) as DrillingRound,
      queue: [...state.wordIds],
      requeuedInRound: {},
      feedback: null
    };
  }

  return {
    ...state,
    queue: [],
    requeuedInRound: {},
    feedback: null,
    isCompleted: true
  };
}

export interface DrillingProgressMetrics {
  totalSteps: number;
  completedSteps: number;
  percent: number;
  remainingInRound: number;
}

export function getDrillingProgressMetrics(state: DrillingQueueState): DrillingProgressMetrics {
  const count = state.wordIds.length;
  if (count === 0) {
    return { totalSteps: 0, completedSteps: 0, percent: 100, remainingInRound: 0 };
  }
  const totalSteps = count * 3;
  if (state.isCompleted) {
    return { totalSteps, completedSteps: totalSteps, percent: 100, remainingInRound: 0 };
  }
  const completedInPrevRounds = (state.round - 1) * count;
  const completedInCurrentRound = Math.max(0, count - state.queue.length);
  const completedSteps = completedInPrevRounds + completedInCurrentRound;
  const percent = Math.round((completedSteps / totalSteps) * 100);

  return {
    totalSteps,
    completedSteps,
    percent,
    remainingInRound: state.queue.length
  };
}

function shuffleWithRng<T>(items: T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const clamped = Math.max(0, Math.min(i, j));
    [copy[i], copy[clamped]] = [copy[clamped], copy[i]];
  }
  return copy;
}

export function generateRound1Choices(
  targetItem: VocabItem,
  unitVocab: VocabItem[],
  allVocab: VocabItem[],
  rng: () => number = Math.random
): string[] {
  const targetMeaningNorm = normalizeAnswer(targetItem.meaning);
  const usedMeanings = new Set<string>([targetMeaningNorm]);
  const distractors: string[] = [];

  const unitCandidates = shuffleWithRng(
    unitVocab.filter((v) => v.id !== targetItem.id),
    rng
  );
  for (const candidate of unitCandidates) {
    const norm = normalizeAnswer(candidate.meaning);
    if (!usedMeanings.has(norm)) {
      usedMeanings.add(norm);
      distractors.push(candidate.meaning);
      if (distractors.length === 3) break;
    }
  }

  if (distractors.length < 3) {
    const globalCandidates = shuffleWithRng(
      allVocab.filter((v) => v.id !== targetItem.id && v.unit !== targetItem.unit),
      rng
    );
    for (const candidate of globalCandidates) {
      const norm = normalizeAnswer(candidate.meaning);
      if (!usedMeanings.has(norm)) {
        usedMeanings.add(norm);
        distractors.push(candidate.meaning);
        if (distractors.length === 3) break;
      }
    }
  }

  return shuffleWithRng([targetItem.meaning, ...distractors], rng);
}

/* ============================================================================
 * Letter-by-letter Hint Utilities
 * ========================================================================== */

export interface HintMaskToken {
  char: string;
  revealed: boolean;
  isSeparator: boolean;
}

function isSeparatorChar(ch: string): boolean {
  return ch === ' ' || ch === '-';
}

export function getMaxHintRevealCount(word: string): number {
  let count = 0;
  for (const ch of word) {
    if (!isSeparatorChar(ch)) {
      count += 1;
    }
  }
  return count;
}

export function getHintMaskTokens(word: string, revealedCount: number): HintMaskToken[] {
  const tokens: HintMaskToken[] = [];
  let letterIdx = 0;

  for (const ch of word) {
    if (isSeparatorChar(ch)) {
      tokens.push({ char: ch, revealed: true, isSeparator: true });
    } else {
      const revealed = letterIdx < revealedCount;
      tokens.push({
        char: revealed ? ch : '_',
        revealed,
        isSeparator: false
      });
      letterIdx += 1;
    }
  }

  return tokens;
}

export function formatHintPattern(word: string, revealedCount: number): string {
  return getHintMaskTokens(word, revealedCount)
    .map((token) => (token.isSeparator && token.char === ' ' ? '  ' : token.char))
    .join(' ')
    .replace(/ {3,}/g, '   ');
}

/* ============================================================================
 * Due Review Queue State Machine
 * ========================================================================== */

export type ReviewMode = 'listen_type' | 'cloze' | 'meaning_type';

export const REVIEW_MODES: readonly ReviewMode[] = ['listen_type', 'cloze', 'meaning_type'];

export interface ReviewQueueItem {
  wordId: string;
  mode: ReviewMode;
}

export interface ReviewSrsOutcome {
  wordId: string;
  previousLevel: SrsLevel;
  newLevel: SrsLevel;
  nextReview: number;
  isCorrectOnFirstAttempt: boolean;
}

export interface ReviewFeedback {
  wordId: string;
  mode: ReviewMode;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  willRequeue: boolean;
  srsOutcome?: ReviewSrsOutcome;
}

export interface ReviewQueueState {
  initialWordIds: string[];
  queue: ReviewQueueItem[];
  firstAttemptEvaluated: Record<string, boolean>;
  requeuedIds: Record<string, boolean>;
  srsOutcomesById: Record<string, ReviewSrsOutcome>;
  totalAttempts: number;
  correctFirstAttempts: number;
  feedback: ReviewFeedback | null;
  isCompleted: boolean;
}

export function pickRandomReviewMode(rng: () => number = Math.random): ReviewMode {
  const raw = Math.floor(rng() * REVIEW_MODES.length);
  const idx = Math.max(0, Math.min(REVIEW_MODES.length - 1, raw));
  return REVIEW_MODES[idx];
}

export function createReviewQueue(
  wordIds: string[],
  rng: () => number = Math.random
): ReviewQueueState {
  if (wordIds.length === 0) {
    return {
      initialWordIds: [],
      queue: [],
      firstAttemptEvaluated: {},
      requeuedIds: {},
      srsOutcomesById: {},
      totalAttempts: 0,
      correctFirstAttempts: 0,
      feedback: null,
      isCompleted: true
    };
  }

  return {
    initialWordIds: [...wordIds],
    queue: wordIds.map((wordId) => ({
      wordId,
      mode: pickRandomReviewMode(rng)
    })),
    firstAttemptEvaluated: {},
    requeuedIds: {},
    srsOutcomesById: {},
    totalAttempts: 0,
    correctFirstAttempts: 0,
    feedback: null,
    isCompleted: false
  };
}

export interface SubmitReviewResult {
  state: ReviewQueueState;
  updatedWordProgress: { wordId: string; progress: WordProgress } | null;
}

export function submitReviewAnswer(
  state: ReviewQueueState,
  userAnswer: string,
  vocabById: Record<string, VocabItem>,
  currentProgress: Record<string, WordProgress>,
  now: number = Date.now()
): SubmitReviewResult {
  if (state.isCompleted || state.feedback !== null || state.queue.length === 0) {
    return { state, updatedWordProgress: null };
  }

  const current = state.queue[0];
  const item = vocabById[current.wordId];
  if (!item) {
    return { state, updatedWordProgress: null };
  }

  const isCorrect = isAnswerCorrect(userAnswer, item.word);
  const isFirstAttempt = !state.firstAttemptEvaluated[current.wordId];

  let updatedWordProgress: { wordId: string; progress: WordProgress } | null = null;
  let nextSrsOutcomes = state.srsOutcomesById;
  let nextFirstAttemptEvaluated = state.firstAttemptEvaluated;
  let nextCorrectFirstAttempts = state.correctFirstAttempts;
  let srsOutcome: ReviewSrsOutcome | undefined;

  if (isFirstAttempt) {
    const prevProg = currentProgress[current.wordId] ?? {
      level: 0 as SrsLevel,
      nextReview: 0,
      wrongCount: 0
    };
    const nextProg = applyReviewResult(prevProg, isCorrect, now);

    srsOutcome = {
      wordId: current.wordId,
      previousLevel: prevProg.level,
      newLevel: nextProg.level,
      nextReview: nextProg.nextReview,
      isCorrectOnFirstAttempt: isCorrect
    };

    updatedWordProgress = { wordId: current.wordId, progress: nextProg };
    nextFirstAttemptEvaluated = { ...state.firstAttemptEvaluated, [current.wordId]: true };
    nextSrsOutcomes = { ...state.srsOutcomesById, [current.wordId]: srsOutcome };
    if (isCorrect) {
      nextCorrectFirstAttempts += 1;
    }
  }

  const nextState: ReviewQueueState = {
    ...state,
    firstAttemptEvaluated: nextFirstAttemptEvaluated,
    srsOutcomesById: nextSrsOutcomes,
    totalAttempts: state.totalAttempts + 1,
    correctFirstAttempts: nextCorrectFirstAttempts,
    feedback: {
      wordId: current.wordId,
      mode: current.mode,
      isCorrect,
      userAnswer,
      correctAnswer: item.word,
      willRequeue: !isCorrect,
      srsOutcome
    }
  };

  return { state: nextState, updatedWordProgress };
}

export function advanceReviewQueue(state: ReviewQueueState): ReviewQueueState {
  if (!state.feedback || state.queue.length === 0) {
    return state;
  }

  const [head, ...rest] = state.queue;

  if (!state.feedback.isCorrect) {
    return {
      ...state,
      queue: [...rest, head],
      requeuedIds: {
        ...state.requeuedIds,
        [head.wordId]: true
      },
      feedback: null
    };
  }

  if (rest.length > 0) {
    return {
      ...state,
      queue: rest,
      feedback: null
    };
  }

  return {
    ...state,
    queue: [],
    feedback: null,
    isCompleted: true
  };
}
