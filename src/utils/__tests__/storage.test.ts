import { describe, expect, it } from 'vitest';
import { ALL_VOCAB, ALL_WORD_IDS } from '../../data/vocab';
import { MS_PER_DAY, getDueWords } from '../../engine/srs';
import {
  createInitialStudyState,
  fastForwardDueDates,
  parseAndValidateBackupJson
} from '../storage';

describe('Dataset Integrity & Storage Utilities', () => {
  it('loads all 252 curated VocabItem records across Units 1-8 with unique IDs', () => {
    expect(ALL_VOCAB).toHaveLength(252);
    expect(ALL_WORD_IDS.size).toBe(252);
    for (const item of ALL_VOCAB) {
      expect(item.unit).toBeGreaterThanOrEqual(1);
      expect(item.unit).toBeLessThanOrEqual(8);
      expect(item.word.trim().length).toBeGreaterThan(0);
      expect(item.meaning.trim().length).toBeGreaterThan(0);
      expect(item.clozeSentence).toContain('_');
    }
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
});
