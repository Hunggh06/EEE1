import { describe, expect, it } from 'vitest';
import type { VocabItem, WordProgress } from '../../types/vocab';
import { MS_PER_DAY } from '../srs';
import {
  advanceDrillingQueue,
  advanceReviewQueue,
  createDrillingQueue,
  createReviewQueue,
  formatHintPattern,
  generateRound1Choices,
  getDrillingProgressMetrics,
  getHintMaskTokens,
  getMaxHintRevealCount,
  submitDrillingAnswer,
  submitReviewAnswer
} from '../drillingQueue';

const sampleVocab: Record<string, VocabItem> = {
  w1: {
    id: 'w1',
    unit: 1,
    topic: 'Company',
    word: 'competitor',
    pos: 'n',
    ipa: '/kəmˈpetɪtə(r)/',
    meaning: 'đối thủ cạnh tranh',
    example: 'Samsung is a major competitor.',
    clozeSentence: 'Samsung is a major c_________.'
  },
  w2: {
    id: 'w2',
    unit: 1,
    topic: 'Company',
    word: 'headquarters',
    pos: 'n',
    ipa: '/ˌhedˈkwɔːtəz/',
    meaning: 'trụ sở chính',
    example: 'The headquarters are in Tokyo.',
    clozeSentence: 'The h___________ are in Tokyo.'
  },
  w3: {
    id: 'w3',
    unit: 1,
    topic: 'Company',
    word: 'long-term',
    pos: 'adj',
    ipa: '/ˌlɒŋ ˈtɜːm/',
    meaning: 'dài hạn',
    example: 'A long-term strategy is vital.',
    clozeSentence: 'A l___-t___ strategy is vital.'
  },
  w4: {
    id: 'w4',
    unit: 1,
    topic: 'Company',
    word: 'consumer electronics',
    pos: 'n.p',
    ipa: '/kənˈsjuːmər ɪlekˈtrɒnɪks/',
    meaning: 'điện tử tiêu dùng',
    example: 'Sony builds consumer electronics.',
    clozeSentence: 'Sony builds c_______ e__________.'
  }
};

describe('Drilling Queue Engine (Stage 2)', () => {
  it('progresses cleanly across Rounds 1 -> 2 -> 3 and completes when all answered right', () => {
    let state = createDrillingQueue(['w1', 'w2']);
    expect(state.round).toBe(1);
    expect(state.queue).toEqual(['w1', 'w2']);

    // Round 1 (Vietnamese meaning)
    state = submitDrillingAnswer(state, 'đối thủ cạnh tranh', sampleVocab);
    expect(state.feedback?.isCorrect).toBe(true);
    state = advanceDrillingQueue(state);
    expect(state.queue).toEqual(['w2']);

    state = submitDrillingAnswer(state, 'trụ sở chính', sampleVocab);
    expect(state.feedback?.isCorrect).toBe(true);
    state = advanceDrillingQueue(state);
    expect(state.round).toBe(2);
    expect(state.queue).toEqual(['w1', 'w2']);

    // Round 2 (Spelling)
    state = submitDrillingAnswer(state, '  COMPETITOR ', sampleVocab);
    state = advanceDrillingQueue(state);
    state = submitDrillingAnswer(state, 'headquarters', sampleVocab);
    state = advanceDrillingQueue(state);
    expect(state.round).toBe(3);
    expect(state.queue).toEqual(['w1', 'w2']);

    // Round 3 (Cloze)
    state = submitDrillingAnswer(state, 'competitor', sampleVocab);
    state = advanceDrillingQueue(state);
    state = submitDrillingAnswer(state, 'headquarters', sampleVocab);
    state = advanceDrillingQueue(state);

    expect(state.isCompleted).toBe(true);
    expect(state.queue).toEqual([]);
    expect(state.totalAttempts).toBe(6);
    expect(state.correctAttempts).toBe(6);
    expect(state.mistakesById).toEqual({});
    expect(getDrillingProgressMetrics(state).percent).toBe(100);
  });

  it('does not advance on wrong answer, reveals feedback, records mistake, and re-enqueues to end of round', () => {
    let state = createDrillingQueue(['w1', 'w2']);

    // Wrong answer on w1 in Round 1
    state = submitDrillingAnswer(state, 'sai hoàn toàn', sampleVocab);
    expect(state.queue).toEqual(['w1', 'w2']); // did NOT advance past w1 yet
    expect(state.feedback).toEqual({
      wordId: 'w1',
      isCorrect: false,
      userAnswer: 'sai hoàn toàn',
      correctAnswer: 'đối thủ cạnh tranh',
      willRequeue: true
    });
    expect(state.mistakesById).toEqual({ w1: 1 });

    // Duplicate submit while feedback active is ignored
    const duplicate = submitDrillingAnswer(state, 'đối thủ cạnh tranh', sampleVocab);
    expect(duplicate).toBe(state);

    // Advance from feedback moves w1 to back of Round 1 queue
    state = advanceDrillingQueue(state);
    expect(state.feedback).toBeNull();
    expect(state.queue).toEqual(['w2', 'w1']);
    expect(state.requeuedInRound).toEqual({ w1: true });
    expect(state.round).toBe(1);

    // Answer w2 right -> pops w2, leaving w1
    state = submitDrillingAnswer(state, 'trụ sở chính', sampleVocab);
    state = advanceDrillingQueue(state);
    expect(state.queue).toEqual(['w1']);
    expect(state.round).toBe(1);

    // Answer w1 wrong again even as last item -> still stays in Round 1!
    state = submitDrillingAnswer(state, 'wrong again', sampleVocab);
    expect(state.mistakesById.w1).toBe(2);
    state = advanceDrillingQueue(state);
    expect(state.queue).toEqual(['w1']);
    expect(state.round).toBe(1);

    // Finally answer w1 right -> advances to Round 2
    state = submitDrillingAnswer(state, 'đối thủ cạnh tranh', sampleVocab);
    state = advanceDrillingQueue(state);
    expect(state.round).toBe(2);
    expect(state.queue).toEqual(['w1', 'w2']);
    expect(state.requeuedInRound).toEqual({});
  });

  it('generates 4 unique choices including target meaning for Round 1', () => {
    const unitList = Object.values(sampleVocab);
    const choices = generateRound1Choices(sampleVocab.w1, unitList, unitList, () => 0.42);
    expect(choices).toHaveLength(4);
    expect(choices).toContain(sampleVocab.w1.meaning);
    expect(new Set(choices).size).toBe(4);
  });

  it('builds progressive letter-by-letter hints preserving spaces and hyphens', () => {
    expect(getMaxHintRevealCount('long-term')).toBe(8);
    expect(formatHintPattern('long-term', 0)).toBe('_ _ _ _ - _ _ _ _');
    expect(formatHintPattern('long-term', 2)).toBe('l o _ _ - _ _ _ _');
    expect(formatHintPattern('long-term', 6)).toBe('l o n g - t e _ _');
    expect(formatHintPattern('long-term', 8)).toBe('l o n g - t e r m');

    const tokens = getHintMaskTokens('consumer electronics', 3);
    expect(tokens.filter((t) => t.revealed && !t.isSeparator).map((t) => t.char).join('')).toBe('con');
    expect(tokens.some((t) => t.isSeparator && t.char === ' ')).toBe(true);
  });
});

describe('Due Review Queue Engine', () => {
  it('mixes review modes, evaluates SRS once on first attempt, and re-queues wrong items until correct', () => {
    const now = 1_700_000_000_000;
    const progress: Record<string, WordProgress> = {
      w1: { level: 3, nextReview: now - 1000, wrongCount: 0 },
      w2: { level: 2, nextReview: now - 500, wrongCount: 1 }
    };

    let seq = 0;
    const deterministicRng = () => {
      const vals = [0.1, 0.85]; // index 0 -> 'listen_type', index 2 -> 'meaning_type'
      return vals[seq++ % vals.length];
    };

    let reviewState = createReviewQueue(['w1', 'w2'], deterministicRng);
    expect(reviewState.queue).toEqual([
      { wordId: 'w1', mode: 'listen_type' },
      { wordId: 'w2', mode: 'meaning_type' }
    ]);

    // 1st attempt on w1 is WRONG -> SRS drops Lv 3 -> Lv 1, wrongCount 0 -> 1
    let res = submitReviewAnswer(reviewState, 'competiter', sampleVocab, progress, now);
    reviewState = res.state;
    expect(res.updatedWordProgress).not.toBeNull();
    expect(res.updatedWordProgress?.wordId).toBe('w1');
    expect(res.updatedWordProgress?.progress).toEqual({
      level: 1,
      nextReview: now + 1 * MS_PER_DAY,
      wrongCount: 1,
      lastReviewed: now
    });
    expect(reviewState.feedback?.srsOutcome?.previousLevel).toBe(3);
    expect(reviewState.feedback?.srsOutcome?.newLevel).toBe(1);

    // Apply updated progress to simulated persisted map
    const updatedProgressMap: Record<string, WordProgress> = {
      ...progress,
      ...(res.updatedWordProgress ? { [res.updatedWordProgress.wordId]: res.updatedWordProgress.progress } : {})
    };

    // Advance re-queues w1 to end of queue
    reviewState = advanceReviewQueue(reviewState);
    expect(reviewState.queue.map((q) => q.wordId)).toEqual(['w2', 'w1']);

    // 1st attempt on w2 is RIGHT -> SRS promotes Lv 2 -> Lv 3 (+7 days)
    res = submitReviewAnswer(reviewState, 'headquarters', sampleVocab, updatedProgressMap, now);
    reviewState = res.state;
    expect(res.updatedWordProgress?.wordId).toBe('w2');
    expect(res.updatedWordProgress?.progress).toEqual({
      level: 3,
      nextReview: now + 7 * MS_PER_DAY,
      wrongCount: 1,
      lastReviewed: now
    });
    reviewState = advanceReviewQueue(reviewState);
    expect(reviewState.queue.map((q) => q.wordId)).toEqual(['w1']);

    // 2nd attempt on re-queued w1 is RIGHT -> updatedWordProgress MUST be null (no duplicate SRS change!)
    res = submitReviewAnswer(reviewState, 'competitor', sampleVocab, updatedProgressMap, now + 5000);
    reviewState = res.state;
    expect(res.updatedWordProgress).toBeNull();
    expect(reviewState.feedback?.isCorrect).toBe(true);
    expect(reviewState.feedback?.srsOutcome).toBeUndefined();

    reviewState = advanceReviewQueue(reviewState);
    expect(reviewState.isCompleted).toBe(true);
    expect(reviewState.correctFirstAttempts).toBe(1);
    expect(reviewState.totalAttempts).toBe(3);
  });
});
