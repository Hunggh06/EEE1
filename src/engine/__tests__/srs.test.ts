import { describe, expect, it } from 'vitest';
import type { VocabItem, WordProgress } from '../../types/vocab';
import {
  MS_PER_DAY,
  SRS_INTERVAL_DAYS,
  applyReviewResult,
  getDueWords,
  getLevelDistribution,
  getNewWordsChunk,
  isAnswerCorrect,
  normalizeAnswer,
  promoteLearnedChunk,
  updateStudyStreak
} from '../srs';

const makeVocab = (id: string, unit = 1): VocabItem => ({
  id,
  unit,
  topic: 'Topic',
  word: `word_${id}`,
  pos: 'n',
  ipa: '/wɜːd/',
  meaning: `nghĩa_${id}`,
  example: `Example using word_${id}.`,
  clozeSentence: `Example using w_______.`
});

describe('SRS Engine (5-Level Leitner)', () => {
  it('defines exact Leitner intervals in days', () => {
    expect(MS_PER_DAY).toBe(86_400_000);
    expect(SRS_INTERVAL_DAYS).toEqual({
      1: 1,
      2: 3,
      3: 7,
      4: 14,
      5: 30
    });
  });

  it('promotes level up to 5 on correct reviews and sets exact nextReview intervals', () => {
    const now = 1_700_000_000_000;

    const lv1 = applyReviewResult(undefined, true, now);
    expect(lv1).toEqual({
      level: 1,
      nextReview: now + 1 * MS_PER_DAY,
      wrongCount: 0,
      lastReviewed: now
    });

    const lv2 = applyReviewResult(lv1, true, now);
    expect(lv2.level).toBe(2);
    expect(lv2.nextReview).toBe(now + 3 * MS_PER_DAY);

    const lv3 = applyReviewResult(lv2, true, now);
    expect(lv3.level).toBe(3);
    expect(lv3.nextReview).toBe(now + 7 * MS_PER_DAY);

    const lv4 = applyReviewResult(lv3, true, now);
    expect(lv4.level).toBe(4);
    expect(lv4.nextReview).toBe(now + 14 * MS_PER_DAY);

    const lv5 = applyReviewResult(lv4, true, now);
    expect(lv5.level).toBe(5);
    expect(lv5.nextReview).toBe(now + 30 * MS_PER_DAY);

    // Mastered stays capped at level 5
    const stillLv5 = applyReviewResult(lv5, true, now + 1000);
    expect(stillLv5.level).toBe(5);
    expect(stillLv5.nextReview).toBe(now + 1000 + 30 * MS_PER_DAY);
    expect(stillLv5.wrongCount).toBe(0);
  });

  it('drops back to level 1 (+1 day) and increments wrongCount on incorrect review', () => {
    const now = 1_700_000_000_000;
    const prev: WordProgress = {
      level: 4,
      nextReview: now - 5000,
      wrongCount: 2,
      lastReviewed: now - 14 * MS_PER_DAY
    };

    const next = applyReviewResult(prev, false, now);
    expect(next).toEqual({
      level: 1,
      nextReview: now + 1 * MS_PER_DAY,
      wrongCount: 3,
      lastReviewed: now
    });
  });

  it('returns only learned words due on or before now, sorted oldest overdue first', () => {
    const now = 1_700_000_000_000;
    const items = [makeVocab('a'), makeVocab('b'), makeVocab('c'), makeVocab('d'), makeVocab('e')];
    const progress: Record<string, WordProgress> = {
      // 'a' unlearned (missing)
      b: { level: 0, nextReview: 0, wrongCount: 0 }, // unlearned explicit
      c: { level: 2, nextReview: now + 5000, wrongCount: 0 }, // future
      d: { level: 3, nextReview: now, wrongCount: 1 }, // due right now
      e: { level: 1, nextReview: now - 10_000, wrongCount: 0 } // oldest overdue
    };

    const due = getDueWords(items, progress, now);
    expect(due.map((x) => x.id)).toEqual(['e', 'd']);
  });

  it('selects first chunkSize unlearned words from unit vocabulary', () => {
    const unitVocab = Array.from({ length: 10 }, (_, idx) => makeVocab(`u1_${idx + 1}`));
    const progress: Record<string, WordProgress> = {
      u1_1: { level: 1, nextReview: 9999999999999, wrongCount: 0 },
      u1_3: { level: 3, nextReview: 9999999999999, wrongCount: 0 }
    };

    const chunk5 = getNewWordsChunk(unitVocab, progress, 5);
    expect(chunk5.map((w) => w.id)).toEqual(['u1_2', 'u1_4', 'u1_5', 'u1_6', 'u1_7']);

    const chunk7 = getNewWordsChunk(unitVocab, progress, 7);
    expect(chunk7.map((w) => w.id)).toEqual([
      'u1_2',
      'u1_4',
      'u1_5',
      'u1_6',
      'u1_7',
      'u1_8',
      'u1_9'
    ]);
  });

  it('promotes learned chunk to level 1 (+1 day) and accumulates Stage 2 mistakes', () => {
    const now = 1_700_000_000_000;
    const initial: Record<string, WordProgress> = {
      u1_99: { level: 4, nextReview: now + 5 * MS_PER_DAY, wrongCount: 1 }
    };

    const updated = promoteLearnedChunk(
      initial,
      ['u1_1', 'u1_2'],
      { u1_1: 0, u1_2: 3 },
      now
    );

    expect(updated.u1_1).toEqual({
      level: 1,
      nextReview: now + MS_PER_DAY,
      wrongCount: 0,
      lastReviewed: now
    });
    expect(updated.u1_2).toEqual({
      level: 1,
      nextReview: now + MS_PER_DAY,
      wrongCount: 3,
      lastReviewed: now
    });
    // Does not clobber unrelated words or mutate original object
    expect(updated.u1_99).toEqual(initial.u1_99);
    expect(initial.u1_1).toBeUndefined();
  });

  it('normalizes answers by trimming, collapsing spaces, and lowercasing', () => {
    expect(normalizeAnswer('  Consumer   Electronics \n ')).toBe('consumer electronics');
    expect(normalizeAnswer('Global Positioning System')).toBe('global positioning system');
    expect(isAnswerCorrect('  THREE-PHASE   Transformer ', 'three-phase transformer')).toBe(true);
    expect(isAnswerCorrect('competitors', 'competitor')).toBe(false);
  });

  it('computes level distribution and study streak correctly', () => {
    const now = new Date(2026, 4, 10, 12, 0, 0).getTime();
    const yesterday = new Date(2026, 4, 9, 10, 0, 0).getTime();
    const vocab = [makeVocab('w1'), makeVocab('w2'), makeVocab('w3'), makeVocab('w4')];
    const progress: Record<string, WordProgress> = {
      w1: { level: 1, nextReview: now - 1000, wrongCount: 1 },
      w2: { level: 4, nextReview: now + 100_000, wrongCount: 0 },
      w3: { level: 5, nextReview: now + 500_000, wrongCount: 2 }
    };

    const dist = getLevelDistribution(vocab, progress, now);
    expect(dist.total).toBe(4);
    expect(dist.unlearnedCount).toBe(1);
    expect(dist.newlyLearnedCount).toBe(1);
    expect(dist.consolidatingCount).toBe(1);
    expect(dist.masteredCount).toBe(1);
    expect(dist.learnedCount).toBe(3);
    expect(dist.dueCount).toBe(1);
    expect(dist.attentionCount).toBe(2);

    const streak1 = updateStudyStreak(
      { totalSessionsCompleted: 0, totalReviewsCompleted: 0, streakDays: 0 },
      { sessionsDelta: 1 },
      yesterday
    );
    expect(streak1.streakDays).toBe(1);

    const streak2 = updateStudyStreak(streak1, { reviewsDelta: 4 }, now);
    expect(streak2.streakDays).toBe(2);
    expect(streak2.totalSessionsCompleted).toBe(1);
    expect(streak2.totalReviewsCompleted).toBe(4);
  });
});
