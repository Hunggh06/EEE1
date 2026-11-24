import type { SrsLevel, StudyStats, VocabItem, WordProgress } from '../types/vocab';

export const MS_PER_DAY = 86_400_000;

export const SRS_INTERVAL_DAYS: Record<Exclude<SrsLevel, 0>, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30
};

export function getIntervalMsForLevel(level: Exclude<SrsLevel, 0>): number {
  return SRS_INTERVAL_DAYS[level] * MS_PER_DAY;
}

export function createEmptyWordProgress(): WordProgress {
  return {
    level: 0,
    nextReview: 0,
    wrongCount: 0
  };
}

export function getWordProgress(
  progress: Record<string, WordProgress>,
  wordId: string
): WordProgress {
  return progress[wordId] ?? createEmptyWordProgress();
}

export function applyReviewResult(
  prev: WordProgress | undefined,
  isCorrect: boolean,
  now: number = Date.now()
): WordProgress {
  const current = prev ?? createEmptyWordProgress();

  if (isCorrect) {
    const nextLevel = Math.min(5, current.level + 1) as Exclude<SrsLevel, 0>;
    return {
      level: nextLevel,
      nextReview: now + getIntervalMsForLevel(nextLevel),
      wrongCount: current.wrongCount,
      lastReviewed: now
    };
  }

  return {
    level: 1,
    nextReview: now + getIntervalMsForLevel(1),
    wrongCount: current.wrongCount + 1,
    lastReviewed: now
  };
}

export function getDueWords(
  vocabList: VocabItem[],
  progress: Record<string, WordProgress>,
  now: number = Date.now()
): VocabItem[] {
  return vocabList
    .filter((item) => {
      const wp = progress[item.id];
      return wp !== undefined && wp.level >= 1 && wp.nextReview <= now;
    })
    .sort((a, b) => {
      const nextA = progress[a.id]?.nextReview ?? 0;
      const nextB = progress[b.id]?.nextReview ?? 0;
      if (nextA !== nextB) return nextA - nextB;
      if (a.unit !== b.unit) return a.unit - b.unit;
      return a.id.localeCompare(b.id);
    });
}

export function getNewWordsChunk(
  unitVocab: VocabItem[],
  progress: Record<string, WordProgress>,
  chunkSize: 5 | 6 | 7
): VocabItem[] {
  return unitVocab
    .filter((item) => (progress[item.id]?.level ?? 0) === 0)
    .slice(0, chunkSize);
}

export function promoteLearnedChunk(
  progress: Record<string, WordProgress>,
  wordIds: string[],
  sessionWrongById: Record<string, number>,
  now: number = Date.now()
): Record<string, WordProgress> {
  const nextProgress: Record<string, WordProgress> = { ...progress };
  const nextReview = now + getIntervalMsForLevel(1);

  for (const wordId of wordIds) {
    const prev = nextProgress[wordId] ?? createEmptyWordProgress();
    const mistakes = Math.max(0, sessionWrongById[wordId] ?? 0);
    nextProgress[wordId] = {
      level: 1,
      nextReview,
      wrongCount: prev.wrongCount + mistakes,
      lastReviewed: now
    };
  }

  return nextProgress;
}

export function normalizeAnswer(input: string): string {
  return input.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function isAnswerCorrect(input: string, expected: string): boolean {
  return normalizeAnswer(input) === normalizeAnswer(expected);
}

export interface LevelDistribution {
  total: number;
  byLevel: Record<SrsLevel, number>;
  unlearnedCount: number;
  newlyLearnedCount: number; // Lv 1-2
  consolidatingCount: number; // Lv 3-4
  masteredCount: number; // Lv 5
  learnedCount: number; // Lv 1-5
  dueCount: number;
  attentionCount: number; // wrongCount > 0
}

export function getLevelDistribution(
  vocabList: VocabItem[],
  progress: Record<string, WordProgress>,
  now: number = Date.now()
): LevelDistribution {
  const byLevel: Record<SrsLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let dueCount = 0;
  let attentionCount = 0;

  for (const item of vocabList) {
    const wp = progress[item.id];
    const level: SrsLevel = wp ? wp.level : 0;
    byLevel[level] += 1;
    if (wp && wp.level >= 1 && wp.nextReview <= now) {
      dueCount += 1;
    }
    if (wp && wp.wrongCount > 0) {
      attentionCount += 1;
    }
  }

  const unlearnedCount = byLevel[0];
  const newlyLearnedCount = byLevel[1] + byLevel[2];
  const consolidatingCount = byLevel[3] + byLevel[4];
  const masteredCount = byLevel[5];
  const learnedCount = vocabList.length - unlearnedCount;

  return {
    total: vocabList.length,
    byLevel,
    unlearnedCount,
    newlyLearnedCount,
    consolidatingCount,
    masteredCount,
    learnedCount,
    dueCount,
    attentionCount
  };
}

export function getLocalDateKey(now: number = Date.now()): string {
  const date = new Date(now);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function updateStudyStreak(
  stats: StudyStats,
  options: { sessionsDelta?: number; reviewsDelta?: number },
  now: number = Date.now()
): StudyStats {
  const today = getLocalDateKey(now);
  const yesterday = getLocalDateKey(now - MS_PER_DAY);

  let nextStreak = stats.streakDays;
  if (stats.lastStudyDate === today) {
    nextStreak = Math.max(1, stats.streakDays);
  } else if (stats.lastStudyDate === yesterday) {
    nextStreak = stats.streakDays + 1;
  } else {
    nextStreak = 1;
  }

  return {
    totalSessionsCompleted: stats.totalSessionsCompleted + (options.sessionsDelta ?? 0),
    totalReviewsCompleted: stats.totalReviewsCompleted + (options.reviewsDelta ?? 0),
    lastStudyDate: today,
    streakDays: nextStreak
  };
}

export function formatCountdownVi(wp: WordProgress | undefined, now: number = Date.now()): string {
  if (!wp || wp.level === 0) {
    return 'Chưa học';
  }
  const diff = wp.nextReview - now;
  if (diff <= 0) {
    return 'Đến hạn ngay';
  }
  const hours = Math.ceil(diff / (60 * 60 * 1000));
  if (hours < 24) {
    return `Còn ${hours} giờ`;
  }
  const days = Math.ceil(diff / MS_PER_DAY);
  return `Còn ${days} ngày`;
}
