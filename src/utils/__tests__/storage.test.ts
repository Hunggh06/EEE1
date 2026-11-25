import { describe, expect, it } from 'vitest';
import { ALL_VOCAB, ALL_WORD_IDS, VOCAB_MNEMONICS_VI, getUnitVocab } from '../../data/vocab';
import { MS_PER_DAY, getDueWords } from '../../engine/srs';
import {
  CARD_SHEET_DRAFT_STORAGE_KEY,
  GRAMMAR_PROGRESS_STORAGE_KEY,
  LISTENING_PROGRESS_STORAGE_KEY,
  MONOTALK_PROGRESS_STORAGE_KEY,
  READING_PROGRESS_STORAGE_KEY,
  WRITING_PROGRESS_STORAGE_KEY,
  clearAllUnitSkillProgress
} from '../curriculumHelpers';
import { selectBestVietnameseVoice } from '../speech';
import {
  clearUnitVocabProgress,
  createInitialStudyState,
  fastForwardDueDates,
  parseAndValidateBackupJson
} from '../storage';

describe('Dataset Integrity & Storage Utilities', () => {
  it('loads all 252 curated VocabItem records across Units 1-8 with unique IDs and Vietnamese mnemonics', () => {
    expect(ALL_VOCAB).toHaveLength(252);
    expect(ALL_WORD_IDS.size).toBe(252);
    expect(Object.keys(VOCAB_MNEMONICS_VI)).toHaveLength(252);
    for (const item of ALL_VOCAB) {
      expect(item.unit).toBeGreaterThanOrEqual(1);
      expect(item.unit).toBeLessThanOrEqual(8);
      expect(item.word.trim().length).toBeGreaterThan(0);
      expect(item.meaning.trim().length).toBeGreaterThan(0);
      expect(item.clozeSentence).toContain('_');
      expect(item.mnemonicVi?.trim().length).toBeGreaterThan(15);
    }
  });

  it('prefers Natural / Online Vietnamese voices when selecting vi-VN TTS voice', () => {
    const mockVoices = [
      { name: 'Microsoft An - Vietnamese (Vietnam)', lang: 'vi-VN', localService: true },
      { name: 'Google Tiếng Việt', lang: 'vi-VN', localService: false },
      {
        name: 'Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)',
        lang: 'vi-VN',
        localService: false
      }
    ] as SpeechSynthesisVoice[];

    expect(selectBestVietnameseVoice(mockVoices)?.name).toContain('HoaiMy');
    expect(selectBestVietnameseVoice([])).toBeNull();
  });

  it('validates and parses backup JSON strictly', () => {
    const base = createInitialStudyState();
    base.progress['u1_01'] = { level: 5, nextReview: 1_700_000_000_000, wrongCount: 0 };
    base.progress['u1_02'] = { level: 2, nextReview: 1_700_000_000_000, wrongCount: 1 };
    base.progress['unknown_id'] = { level: 1, nextReview: 1_700_000_000_000, wrongCount: 0 };

    const validResult = parseAndValidateBackupJson(JSON.stringify(base), ALL_WORD_IDS);
    expect(validResult.ok).toBe(true);
    if (validResult.ok) {
      expect(validResult.summary.wordCount).toBe(2);
      expect(validResult.summary.masteredCount).toBe(1);
      expect(validResult.summary.ignoredUnknownIds).toBe(1);
      expect(validResult.state.progress['unknown_id']).toBeUndefined();
    }

    const badJson = parseAndValidateBackupJson('{not valid json');
    expect(badJson.ok).toBe(false);

    const wrongVersion = parseAndValidateBackupJson(JSON.stringify({ ...base, version: 99 }));
    expect(wrongVersion.ok).toBe(false);

    const badLevel = parseAndValidateBackupJson(
      JSON.stringify({
        ...base,
        progress: { u1_01: { level: 9, nextReview: 100, wrongCount: 0 } }
      })
    );
    expect(badLevel.ok).toBe(false);
  });

  it('fast-forwards due dates cleanly for SRS testing', () => {
    const now = 1_700_000_000_000;
    const state = createInitialStudyState();
    state.progress['u1_01'] = {
      level: 1,
      nextReview: now + 1 * MS_PER_DAY,
      wrongCount: 0,
      lastReviewed: now
    };
    state.progress['u1_02'] = {
      level: 2,
      nextReview: now + 3 * MS_PER_DAY,
      wrongCount: 0,
      lastReviewed: now
    };

    expect(getDueWords(ALL_VOCAB, state.progress, now)).toHaveLength(0);

    const plusOne = fastForwardDueDates(state, 1);
    const dueAfter1Day = getDueWords(ALL_VOCAB, plusOne.progress, now);
    expect(dueAfter1Day.map((w) => w.id)).toEqual(['u1_01']);

    const plusThree = fastForwardDueDates(state, 3);
    const dueAfter3Days = getDueWords(ALL_VOCAB, plusThree.progress, now);
    expect(dueAfter3Days.map((w) => w.id)).toEqual(['u1_01', 'u1_02']);
  });

  it('resets only the selected unit vocab progress while preserving other units', () => {
    const state = createInitialStudyState();
    state.progress['u1_01'] = { level: 3, nextReview: 1000, wrongCount: 1 };
    state.progress['u1_02'] = { level: 5, nextReview: 2000, wrongCount: 0 };
    state.progress['u2_01'] = { level: 4, nextReview: 3000, wrongCount: 0 };

    const unit1Ids = getUnitVocab(1).map((w) => w.id);
    const afterReset = clearUnitVocabProgress(state, unit1Ids);

    expect(afterReset.progress['u1_01']).toBeUndefined();
    expect(afterReset.progress['u1_02']).toBeUndefined();
    expect(afterReset.progress['u2_01']).toEqual({ level: 4, nextReview: 3000, wrongCount: 0 });
    expect(clearUnitVocabProgress(afterReset, unit1Ids)).toBe(afterReset);
  });

  it('clears all skill progress stores for a single unit without touching other units', () => {
    const store: Record<string, string> = {
      [GRAMMAR_PROGRESS_STORAGE_KEY]: JSON.stringify({
        1: { bestScore: 8, lastScore: 8, totalQuestions: 8, answers: {}, checkedIds: [], updatedAt: 1 },
        2: { bestScore: 7, lastScore: 7, totalQuestions: 8, answers: {}, checkedIds: [], updatedAt: 1 }
      }),
      [WRITING_PROGRESS_STORAGE_KEY]: JSON.stringify({
        1: { sentences: {}, updatedAt: 1 },
        2: { sentences: {}, updatedAt: 1 }
      }),
      [MONOTALK_PROGRESS_STORAGE_KEY]: JSON.stringify({
        1: { sentences: {}, updatedAt: 1 },
        2: { sentences: {}, updatedAt: 1 }
      }),
      [LISTENING_PROGRESS_STORAGE_KEY]: JSON.stringify({
        1: { bestScore: 5, lastScore: 5, totalQuestions: 5, answers: {}, checkedIds: [], updatedAt: 1 },
        2: { bestScore: 4, lastScore: 4, totalQuestions: 5, answers: {}, checkedIds: [], updatedAt: 1 }
      }),
      [READING_PROGRESS_STORAGE_KEY]: JSON.stringify({
        1: { bestScore: 6, lastScore: 6, totalQuestions: 8, answers: {}, checkedIds: [], updatedAt: 1 },
        2: { bestScore: 5, lastScore: 5, totalQuestions: 8, answers: {}, checkedIds: [], updatedAt: 1 }
      }),
      [CARD_SHEET_DRAFT_STORAGE_KEY]: JSON.stringify({
        card_u1_foxconn__A: { role: 'A', inputs: { t1: 'hi' }, evaluations: {}, updatedAt: 1 },
        card_u2_watch__B: { role: 'B', inputs: { t1: 'ok' }, evaluations: {}, updatedAt: 1 }
      })
    };

    const g = globalThis as unknown as { window?: unknown };
    const prevWindow = g.window;
    g.window = {
      localStorage: {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => {
          store[k] = v;
        }
      }
    };

    try {
      clearAllUnitSkillProgress(1, ['card_u1_foxconn']);

      expect(JSON.parse(store[GRAMMAR_PROGRESS_STORAGE_KEY])['1']).toBeUndefined();
      expect(JSON.parse(store[GRAMMAR_PROGRESS_STORAGE_KEY])['2']).toBeDefined();
      expect(JSON.parse(store[WRITING_PROGRESS_STORAGE_KEY])['1']).toBeUndefined();
      expect(JSON.parse(store[WRITING_PROGRESS_STORAGE_KEY])['2']).toBeDefined();
      expect(JSON.parse(store[MONOTALK_PROGRESS_STORAGE_KEY])['1']).toBeUndefined();
      expect(JSON.parse(store[MONOTALK_PROGRESS_STORAGE_KEY])['2']).toBeDefined();
      expect(JSON.parse(store[LISTENING_PROGRESS_STORAGE_KEY])['1']).toBeUndefined();
      expect(JSON.parse(store[LISTENING_PROGRESS_STORAGE_KEY])['2']).toBeDefined();
      expect(JSON.parse(store[READING_PROGRESS_STORAGE_KEY])['1']).toBeUndefined();
      expect(JSON.parse(store[READING_PROGRESS_STORAGE_KEY])['2']).toBeDefined();
      expect(JSON.parse(store[CARD_SHEET_DRAFT_STORAGE_KEY])['card_u1_foxconn__A']).toBeUndefined();
      expect(JSON.parse(store[CARD_SHEET_DRAFT_STORAGE_KEY])['card_u2_watch__B']).toBeDefined();
    } finally {
      if (prevWindow === undefined) {
        delete g.window;
      } else {
        g.window = prevWindow;
      }
    }
  });
});
