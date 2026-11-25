import { MS_PER_DAY, getLocalDateKey } from '../engine/srs';
import type { AppSettings, SrsLevel, StudyState, StudyStats, WordProgress } from '../types/vocab';

export const STORAGE_KEY = 'eee5_vocab_studio_v1';

const ENV_AI_API_KEY =
  typeof import.meta !== 'undefined' &&
  typeof import.meta.env?.VITE_TOKENHARBOR_API_KEY === 'string'
    ? import.meta.env.VITE_TOKENHARBOR_API_KEY.trim()
    : '';

export const DEFAULT_AI_API_KEY = ENV_AI_API_KEY;
export const DEFAULT_AI_MODEL = 'deepseek-v4.1-flash:free';
export const DEFAULT_AI_BASE_URL = 'https://tokenharbor.ai/v1';

export const DEFAULT_SETTINGS: AppSettings = {
  chunkSize: 6,
  speechRate: 1.0,
  preferredAccent: 'en-US',
  autoPlayAudio: true,
  soundEffectsEnabled: true,
  aiApiKey: DEFAULT_AI_API_KEY,
  aiModel: DEFAULT_AI_MODEL,
  aiBaseUrl: DEFAULT_AI_BASE_URL
};

export const DEFAULT_STATS: StudyStats = {
  totalSessionsCompleted: 0,
  totalReviewsCompleted: 0,
  streakDays: 0
};

export function createInitialStudyState(): StudyState {
  return {
    version: 1,
    progress: {},
    settings: { ...DEFAULT_SETTINGS },
    stats: { ...DEFAULT_STATS }
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidSrsLevel(value: unknown): value is SrsLevel {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 5;
}

function validateWordProgressEntry(raw: unknown): WordProgress | null {
  if (!isPlainObject(raw)) return null;
  if (!isValidSrsLevel(raw.level)) return null;
  if (typeof raw.nextReview !== 'number' || !Number.isFinite(raw.nextReview) || raw.nextReview < 0) {
    return null;
  }
  if (
    typeof raw.wrongCount !== 'number' ||
    !Number.isInteger(raw.wrongCount) ||
    raw.wrongCount < 0
  ) {
    return null;
  }
  if (
    raw.lastReviewed !== undefined &&
    (typeof raw.lastReviewed !== 'number' || !Number.isFinite(raw.lastReviewed) || raw.lastReviewed < 0)
  ) {
    return null;
  }

  return {
    level: raw.level,
    nextReview: raw.nextReview,
    wrongCount: raw.wrongCount,
    ...(raw.lastReviewed !== undefined ? { lastReviewed: raw.lastReviewed } : {})
  };
}

function validateSettings(raw: unknown): AppSettings | null {
  if (!isPlainObject(raw)) return null;
  if (raw.chunkSize !== 5 && raw.chunkSize !== 6 && raw.chunkSize !== 7) return null;
  if (raw.speechRate !== 0.8 && raw.speechRate !== 1.0) return null;
  if (raw.preferredAccent !== 'en-US' && raw.preferredAccent !== 'en-GB') return null;
  if (typeof raw.autoPlayAudio !== 'boolean') return null;
  if (raw.soundEffectsEnabled !== undefined && typeof raw.soundEffectsEnabled !== 'boolean') {
    return null;
  }
  if (raw.selectedVoiceURI !== undefined && typeof raw.selectedVoiceURI !== 'string') return null;
  if (raw.aiApiKey !== undefined && typeof raw.aiApiKey !== 'string') return null;
  if (raw.aiModel !== undefined && typeof raw.aiModel !== 'string') return null;
  if (raw.aiBaseUrl !== undefined && typeof raw.aiBaseUrl !== 'string') return null;

  const soundEffectsEnabled =
    typeof raw.soundEffectsEnabled === 'boolean'
      ? raw.soundEffectsEnabled
      : DEFAULT_SETTINGS.soundEffectsEnabled;
  const aiApiKey =
    typeof raw.aiApiKey === 'string' ? raw.aiApiKey : DEFAULT_SETTINGS.aiApiKey;
  const aiModel =
    typeof raw.aiModel === 'string' && raw.aiModel.trim().length > 0
      ? raw.aiModel.trim()
      : DEFAULT_SETTINGS.aiModel;
  const aiBaseUrl =
    typeof raw.aiBaseUrl === 'string' && raw.aiBaseUrl.trim().length > 0
      ? raw.aiBaseUrl.trim()
      : DEFAULT_SETTINGS.aiBaseUrl;

  return {
    chunkSize: raw.chunkSize,
    speechRate: raw.speechRate,
    preferredAccent: raw.preferredAccent,
    autoPlayAudio: raw.autoPlayAudio,
    soundEffectsEnabled,
    ...(raw.selectedVoiceURI ? { selectedVoiceURI: raw.selectedVoiceURI } : {}),
    aiApiKey,
    aiModel,
    aiBaseUrl
  };
}

function validateStats(raw: unknown): StudyStats | null {
  if (!isPlainObject(raw)) return null;
  if (
    typeof raw.totalSessionsCompleted !== 'number' ||
    !Number.isInteger(raw.totalSessionsCompleted) ||
    raw.totalSessionsCompleted < 0
  ) {
    return null;
  }
  if (
    typeof raw.totalReviewsCompleted !== 'number' ||
    !Number.isInteger(raw.totalReviewsCompleted) ||
    raw.totalReviewsCompleted < 0
  ) {
    return null;
  }
  if (
    typeof raw.streakDays !== 'number' ||
    !Number.isInteger(raw.streakDays) ||
    raw.streakDays < 0
  ) {
    return null;
  }
  if (raw.lastStudyDate !== undefined && typeof raw.lastStudyDate !== 'string') {
    return null;
  }

  return {
    totalSessionsCompleted: raw.totalSessionsCompleted,
    totalReviewsCompleted: raw.totalReviewsCompleted,
    streakDays: raw.streakDays,
    ...(raw.lastStudyDate ? { lastStudyDate: raw.lastStudyDate } : {})
  };
}

export type BackupValidationResult =
  | {
      ok: true;
      state: StudyState;
      summary: {
        wordCount: number;
        masteredCount: number;
        ignoredUnknownIds: number;
      };
    }
  | {
      ok: false;
      error: string;
    };

export function parseAndValidateBackupJson(
  rawText: string,
  validWordIds?: Set<string>
): BackupValidationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return { ok: false, error: 'Tệp không phải định dạng JSON hợp lệ.' };
  }

  if (!isPlainObject(parsed)) {
    return { ok: false, error: 'Cấu trúc tệp sao lưu không hợp lệ.' };
  }

  if (parsed.version !== 1) {
    return {
      ok: false,
      error: `Phiên bản sao lưu không được hỗ trợ (nhận được version: ${String(parsed.version)}).`
    };
  }

  if (!isPlainObject(parsed.progress)) {
    return { ok: false, error: 'Trường "progress" bị thiếu hoặc sai định dạng.' };
  }

  const settings = validateSettings(parsed.settings);
  if (!settings) {
    return { ok: false, error: 'Trường "settings" không hợp lệ hoặc thiếu thông số bắt buộc.' };
  }

  const stats = validateStats(parsed.stats);
  if (!stats) {
    return { ok: false, error: 'Trường "stats" không hợp lệ.' };
  }

  const cleanProgress: Record<string, WordProgress> = {};
  let ignoredUnknownIds = 0;

  for (const [wordId, rawEntry] of Object.entries(parsed.progress)) {
    const validated = validateWordProgressEntry(rawEntry);
    if (!validated) {
      return {
        ok: false,
        error: `Dữ liệu tiến độ của từ "${wordId}" không hợp lệ.`
      };
    }
    if (validWordIds && !validWordIds.has(wordId)) {
      ignoredUnknownIds += 1;
      continue;
    }
    cleanProgress[wordId] = validated;
  }

  const entries = Object.values(cleanProgress);
  const masteredCount = entries.filter((e) => e.level === 5).length;

  return {
    ok: true,
    state: {
      version: 1,
      progress: cleanProgress,
      settings,
      stats
    },
    summary: {
      wordCount: entries.filter((e) => e.level >= 1).length,
      masteredCount,
      ignoredUnknownIds
    }
  };
}

export function loadStudyState(validWordIds?: Set<string>): StudyState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createInitialStudyState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialStudyState();
    const res = parseAndValidateBackupJson(raw, validWordIds);
    return res.ok ? res.state : createInitialStudyState();
  } catch {
    return createInitialStudyState();
  }
}

export function saveStudyState(state: StudyState): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export function downloadBackupJson(state: StudyState): void {
  const payload = JSON.stringify(state, null, 2);
  const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `eee5-vocab-backup-${getLocalDateKey()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function fastForwardDueDates(state: StudyState, days: number = 1): StudyState {
  const shiftMs = Math.max(0, days) * MS_PER_DAY;
  if (shiftMs === 0) return state;

  const nextProgress: Record<string, WordProgress> = {};
  for (const [wordId, wp] of Object.entries(state.progress)) {
    if (wp.level >= 1 && wp.nextReview > 0) {
      nextProgress[wordId] = {
        ...wp,
        nextReview: Math.max(1, wp.nextReview - shiftMs),
        ...(wp.lastReviewed !== undefined
          ? { lastReviewed: Math.max(1, wp.lastReviewed - shiftMs) }
          : {})
      };
    } else {
      nextProgress[wordId] = wp;
    }
  }

  return {
    ...state,
    progress: nextProgress
  };
}

export function clearUnitVocabProgress(
  state: StudyState,
  wordIds: Iterable<string>
): StudyState {
  const idSet = wordIds instanceof Set ? wordIds : new Set(wordIds);
  if (idSet.size === 0) return state;

  let changed = false;
  const nextProgress: Record<string, WordProgress> = {};
  for (const [wordId, wp] of Object.entries(state.progress)) {
    if (idSet.has(wordId)) {
      changed = true;
      continue;
    }
    nextProgress[wordId] = wp;
  }

  if (!changed) return state;
  return {
    ...state,
    progress: nextProgress
  };
}
