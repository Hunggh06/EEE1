import { normalizeAnswer } from '../engine/srs';
import type {
  CardDialogueTurn,
  GrammarQuestion,
  ListeningQuestion,
  ReadingQuestion
} from '../types/curriculum';
import type { CardTurnEvaluation, WritingSentenceEvaluation } from './aiClient';

export const GRAMMAR_PROGRESS_STORAGE_KEY = 'eee5_grammar_progress_v1';
export const WRITING_PROGRESS_STORAGE_KEY = 'eee5_writing_progress_v1';
export const MONOTALK_PROGRESS_STORAGE_KEY = 'eee5_monotalk_progress_v1';
export const LISTENING_PROGRESS_STORAGE_KEY = 'eee5_listening_progress_v1';
export const READING_PROGRESS_STORAGE_KEY = 'eee5_reading_progress_v1';
export const CARD_SHEET_DRAFT_STORAGE_KEY = 'eee5_card_sheet_drafts_v1';

/**
 * Normalizes grammar answers cleanly across MCQ, Fill-in-the-blank, and Rewrite tasks:
 * - Converts curly quotes/apostrophes to straight ASCII
 * - Collapses extra whitespace & lowercases via normalizeAnswer
 * - Strips trailing sentence punctuation (., !, ?)
 */
export function normalizeGrammarAnswer(input: string): string {
  const asciiQuotes = input
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
  return normalizeAnswer(asciiQuotes).replace(/[.!?]+$/g, '').trim();
}

export function isGrammarAnswerCorrect(
  question: Pick<GrammarQuestion, 'acceptedAnswers'>,
  userAnswer: string
): boolean {
  const normalizedInput = normalizeGrammarAnswer(userAnswer);
  if (!normalizedInput) return false;

  return question.acceptedAnswers.some(
    (accepted) => normalizeGrammarAnswer(accepted) === normalizedInput
  );
}

/* ============================================================================
 * Grammar Progress Persistence (localStorage: eee5_grammar_progress_v1)
 * ========================================================================== */

export interface GrammarUnitProgress {
  bestScore: number;
  lastScore: number;
  totalQuestions: number;
  answers: Record<string, string>;
  checkedIds: string[];
  updatedAt: number;
}

export type GrammarProgressMap = Record<number, GrammarUnitProgress>;

export function loadGrammarProgress(): GrammarProgressMap {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(GRAMMAR_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const clean: GrammarProgressMap = {};
    for (const [key, val] of Object.entries(parsed)) {
      const unitNum = Number(key);
      if (!Number.isInteger(unitNum) || unitNum < 1 || unitNum > 8) continue;
      if (typeof val !== 'object' || val === null || Array.isArray(val)) continue;
      const entry = val as Partial<GrammarUnitProgress>;
      if (
        typeof entry.bestScore !== 'number' ||
        typeof entry.lastScore !== 'number' ||
        typeof entry.totalQuestions !== 'number'
      ) {
        continue;
      }
      clean[unitNum] = {
        bestScore: entry.bestScore,
        lastScore: entry.lastScore,
        totalQuestions: entry.totalQuestions,
        answers:
          typeof entry.answers === 'object' && entry.answers !== null && !Array.isArray(entry.answers)
            ? (entry.answers as Record<string, string>)
            : {},
        checkedIds: Array.isArray(entry.checkedIds)
          ? entry.checkedIds.filter((id): id is string => typeof id === 'string')
          : [],
        updatedAt: typeof entry.updatedAt === 'number' ? entry.updatedAt : Date.now()
      };
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveGrammarUnitProgress(
  unitNumber: number,
  unitProgress: GrammarUnitProgress
): GrammarProgressMap {
  const current = loadGrammarProgress();
  const prevBest = current[unitNumber]?.bestScore ?? 0;
  const nextMap: GrammarProgressMap = {
    ...current,
    [unitNumber]: {
      ...unitProgress,
      bestScore: Math.max(prevBest, unitProgress.bestScore, unitProgress.lastScore)
    }
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(GRAMMAR_PROGRESS_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

/* ============================================================================
 * Guided Writing Progress Persistence (localStorage: eee5_writing_progress_v1)
 * ========================================================================== */

export interface WritingSentenceState {
  draft: string;
  memorized: boolean;
  evaluation?: WritingSentenceEvaluation;
  hint?: string;
}

export type WritingPracticeMode = 'guided' | 'free';

export interface WritingUnitProgress {
  mode?: WritingPracticeMode;
  sentences: Record<string, WritingSentenceState>;
  fullReview?: string;
  freeDraft?: string;
  freeReview?: string;
  updatedAt: number;
}

export type WritingProgressMap = Record<number, WritingUnitProgress>;

function loadEssayProgressMap(storageKey: string): WritingProgressMap {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const clean: WritingProgressMap = {};
    for (const [key, val] of Object.entries(parsed)) {
      const unitNum = Number(key);
      if (!Number.isInteger(unitNum) || unitNum < 1 || unitNum > 8) continue;
      if (typeof val !== 'object' || val === null || Array.isArray(val)) continue;
      const entry = val as Partial<WritingUnitProgress>;
      clean[unitNum] = {
        ...(entry.mode === 'guided' || entry.mode === 'free' ? { mode: entry.mode } : {}),
        sentences:
          typeof entry.sentences === 'object' &&
          entry.sentences !== null &&
          !Array.isArray(entry.sentences)
            ? (entry.sentences as Record<string, WritingSentenceState>)
            : {},
        ...(typeof entry.fullReview === 'string' ? { fullReview: entry.fullReview } : {}),
        ...(typeof entry.freeDraft === 'string' ? { freeDraft: entry.freeDraft } : {}),
        ...(typeof entry.freeReview === 'string' ? { freeReview: entry.freeReview } : {}),
        updatedAt: typeof entry.updatedAt === 'number' ? entry.updatedAt : Date.now()
      };
    }
    return clean;
  } catch {
    return {};
  }
}

function saveEssayUnitProgressMap(
  storageKey: string,
  unitNumber: number,
  unitProgress: WritingUnitProgress
): WritingProgressMap {
  const current = loadEssayProgressMap(storageKey);
  const nextMap: WritingProgressMap = {
    ...current,
    [unitNumber]: unitProgress
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

function clearEssayUnitProgressMap(storageKey: string, unitNumber: number): WritingProgressMap {
  const current = loadEssayProgressMap(storageKey);
  const nextMap: WritingProgressMap = { ...current };
  delete nextMap[unitNumber];
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

export function loadWritingProgress(): WritingProgressMap {
  return loadEssayProgressMap(WRITING_PROGRESS_STORAGE_KEY);
}

export function saveWritingUnitProgress(
  unitNumber: number,
  unitProgress: WritingUnitProgress
): WritingProgressMap {
  return saveEssayUnitProgressMap(WRITING_PROGRESS_STORAGE_KEY, unitNumber, unitProgress);
}

export function clearWritingUnitProgress(unitNumber: number): WritingProgressMap {
  return clearEssayUnitProgressMap(WRITING_PROGRESS_STORAGE_KEY, unitNumber);
}

export function loadMonoTalkProgress(): WritingProgressMap {
  return loadEssayProgressMap(MONOTALK_PROGRESS_STORAGE_KEY);
}

export function saveMonoTalkUnitProgress(
  unitNumber: number,
  unitProgress: WritingUnitProgress
): WritingProgressMap {
  return saveEssayUnitProgressMap(MONOTALK_PROGRESS_STORAGE_KEY, unitNumber, unitProgress);
}

export function clearMonoTalkUnitProgress(unitNumber: number): WritingProgressMap {
  return clearEssayUnitProgressMap(MONOTALK_PROGRESS_STORAGE_KEY, unitNumber);
}

/* ============================================================================
 * Speaking Card Role-play Helpers
 * ========================================================================== */

export function findNextUserTurnIndex(
  dialogue: CardDialogueTurn[],
  startIndex: number,
  userRole: 'A' | 'B'
): number {
  for (let i = Math.max(0, startIndex); i < dialogue.length; i += 1) {
    if (dialogue[i].speaker === userRole) {
      return i;
    }
  }
  return dialogue.length;
}

/* ============================================================================
 * Listening Validation & Progress Persistence
 * ========================================================================== */

export function normalizeListeningAnswer(input: string): string {
  const asciiQuotes = input
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/-/g, ' ')
    .replace(/\s*,\s*/g, ', ');
  return normalizeAnswer(asciiQuotes).replace(/[.!?]+$/g, '').trim();
}

export function isListeningAnswerCorrect(
  question: Pick<ListeningQuestion, 'acceptedAnswers'>,
  userAnswer: string
): boolean {
  const normalizedInput = normalizeListeningAnswer(userAnswer);
  if (!normalizedInput) return false;

  return question.acceptedAnswers.some(
    (accepted) => normalizeListeningAnswer(accepted) === normalizedInput
  );
}

export interface ListeningUnitProgress {
  bestScore: number;
  lastScore: number;
  totalQuestions: number;
  answers: Record<string, string>;
  checkedIds: string[];
  updatedAt: number;
}

export type ListeningProgressMap = Record<number, ListeningUnitProgress>;
export type ReadingUnitProgress = ListeningUnitProgress;
export type ReadingProgressMap = Record<number, ReadingUnitProgress>;

function loadUnitScoreProgressMap(storageKey: string): Record<number, ListeningUnitProgress> {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const clean: Record<number, ListeningUnitProgress> = {};
    for (const [key, val] of Object.entries(parsed)) {
      const unitNum = Number(key);
      if (!Number.isInteger(unitNum) || unitNum < 1 || unitNum > 8) continue;
      if (typeof val !== 'object' || val === null || Array.isArray(val)) continue;
      const entry = val as Partial<ListeningUnitProgress>;
      if (
        typeof entry.bestScore !== 'number' ||
        typeof entry.lastScore !== 'number' ||
        typeof entry.totalQuestions !== 'number'
      ) {
        continue;
      }
      clean[unitNum] = {
        bestScore: entry.bestScore,
        lastScore: entry.lastScore,
        totalQuestions: entry.totalQuestions,
        answers:
          typeof entry.answers === 'object' && entry.answers !== null && !Array.isArray(entry.answers)
            ? (entry.answers as Record<string, string>)
            : {},
        checkedIds: Array.isArray(entry.checkedIds)
          ? entry.checkedIds.filter((id): id is string => typeof id === 'string')
          : [],
        updatedAt: typeof entry.updatedAt === 'number' ? entry.updatedAt : Date.now()
      };
    }
    return clean;
  } catch {
    return {};
  }
}

function saveUnitScoreProgressMap(
  storageKey: string,
  unitNumber: number,
  unitProgress: ListeningUnitProgress
): Record<number, ListeningUnitProgress> {
  const current = loadUnitScoreProgressMap(storageKey);
  const prevBest = current[unitNumber]?.bestScore ?? 0;
  const nextMap: Record<number, ListeningUnitProgress> = {
    ...current,
    [unitNumber]: {
      ...unitProgress,
      bestScore: Math.max(prevBest, unitProgress.bestScore, unitProgress.lastScore)
    }
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

export function loadListeningProgress(): ListeningProgressMap {
  return loadUnitScoreProgressMap(LISTENING_PROGRESS_STORAGE_KEY);
}

export function saveListeningUnitProgress(
  unitNumber: number,
  unitProgress: ListeningUnitProgress
): ListeningProgressMap {
  return saveUnitScoreProgressMap(LISTENING_PROGRESS_STORAGE_KEY, unitNumber, unitProgress);
}

/* ============================================================================
 * Reading Comprehension Validation & Progress Persistence
 * ========================================================================== */

export function isReadingAnswerCorrect(
  question: Pick<ReadingQuestion, 'acceptedAnswers'>,
  userAnswer: string
): boolean {
  const normalizedInput = normalizeListeningAnswer(userAnswer);
  if (!normalizedInput) return false;

  return question.acceptedAnswers.some(
    (accepted) => normalizeListeningAnswer(accepted) === normalizedInput
  );
}

export function loadReadingProgress(): ReadingProgressMap {
  return loadUnitScoreProgressMap(READING_PROGRESS_STORAGE_KEY);
}

export function saveReadingUnitProgress(
  unitNumber: number,
  unitProgress: ReadingUnitProgress
): ReadingProgressMap {
  return saveUnitScoreProgressMap(READING_PROGRESS_STORAGE_KEY, unitNumber, unitProgress);
}

/* ============================================================================
 * Single-Sheet Cue Card Draft Persistence
 * ========================================================================== */

export interface CardSheetDraft {
  role: 'A' | 'B';
  inputs: Record<string, string>;
  evaluations: Record<string, CardTurnEvaluation>;
  fullReview?: string;
  updatedAt: number;
}

export type CardSheetDraftsMap = Record<string, CardSheetDraft>;

export function getCardDraftKey(cardId: string, role: 'A' | 'B'): string {
  return `${cardId}__${role}`;
}

export function loadCardSheetDrafts(): CardSheetDraftsMap {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(CARD_SHEET_DRAFT_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const clean: CardSheetDraftsMap = {};
    for (const [key, val] of Object.entries(parsed)) {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) continue;
      const entry = val as Partial<CardSheetDraft>;
      if (entry.role !== 'A' && entry.role !== 'B') continue;
      clean[key] = {
        role: entry.role,
        inputs:
          typeof entry.inputs === 'object' && entry.inputs !== null && !Array.isArray(entry.inputs)
            ? (entry.inputs as Record<string, string>)
            : {},
        evaluations:
          typeof entry.evaluations === 'object' &&
          entry.evaluations !== null &&
          !Array.isArray(entry.evaluations)
            ? (entry.evaluations as Record<string, CardTurnEvaluation>)
            : {},
        ...(typeof entry.fullReview === 'string' ? { fullReview: entry.fullReview } : {}),
        updatedAt: typeof entry.updatedAt === 'number' ? entry.updatedAt : Date.now()
      };
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveCardSheetDraft(
  cardId: string,
  role: 'A' | 'B',
  draft: CardSheetDraft
): CardSheetDraftsMap {
  const current = loadCardSheetDrafts();
  const key = getCardDraftKey(cardId, role);
  const nextMap: CardSheetDraftsMap = {
    ...current,
    [key]: draft
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(CARD_SHEET_DRAFT_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

export function clearCardSheetDraft(cardId: string, role: 'A' | 'B'): CardSheetDraftsMap {
  const current = loadCardSheetDrafts();
  const key = getCardDraftKey(cardId, role);
  const nextMap: CardSheetDraftsMap = { ...current };
  delete nextMap[key];
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(CARD_SHEET_DRAFT_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

function clearUnitEntryFromStorageMap(storageKey: string, unitNumber: number): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return;
    const nextMap = { ...(parsed as Record<string, unknown>) };
    const unitKey = String(unitNumber);
    if (!(unitKey in nextMap)) return;
    delete nextMap[unitKey];
    window.localStorage.setItem(storageKey, JSON.stringify(nextMap));
  } catch {
    // Ignore quota / privacy mode errors
  }
}

export function clearGrammarUnitProgress(unitNumber: number): void {
  clearUnitEntryFromStorageMap(GRAMMAR_PROGRESS_STORAGE_KEY, unitNumber);
}

export function clearListeningUnitProgress(unitNumber: number): void {
  clearUnitEntryFromStorageMap(LISTENING_PROGRESS_STORAGE_KEY, unitNumber);
}

export function clearReadingUnitProgress(unitNumber: number): void {
  clearUnitEntryFromStorageMap(READING_PROGRESS_STORAGE_KEY, unitNumber);
}

export function clearUnitCardSheetDrafts(cardIds: Iterable<string>): CardSheetDraftsMap {
  const idList = [...cardIds];
  const current = loadCardSheetDrafts();
  if (idList.length === 0) return current;

  const nextMap: CardSheetDraftsMap = { ...current };
  let changed = false;
  for (const key of Object.keys(nextMap)) {
    if (idList.some((cardId) => key.startsWith(`${cardId}__`))) {
      delete nextMap[key];
      changed = true;
    }
  }

  if (changed && typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(CARD_SHEET_DRAFT_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  return nextMap;
}

export function clearAllUnitSkillProgress(
  unitNumber: number,
  cardIds: Iterable<string>
): void {
  clearGrammarUnitProgress(unitNumber);
  clearWritingUnitProgress(unitNumber);
  clearMonoTalkUnitProgress(unitNumber);
  clearListeningUnitProgress(unitNumber);
  clearReadingUnitProgress(unitNumber);
  clearUnitCardSheetDrafts(cardIds);
}
