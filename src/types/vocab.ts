export type PartOfSpeech = 'n' | 'n.p' | 'v' | 'v.p' | 'adj' | 'adv' | 'n, v' | 'idiom' | string;

export interface VocabItem {
  id: string;
  unit: number;
  topic: string;
  word: string;
  pos: PartOfSpeech;
  ipa: string;
  meaning: string;
  synonyms?: string[];
  wordFamily?: string[];
  example: string;
  clozeSentence: string;
  mnemonicVi?: string;
}

export type SrsLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface WordProgress {
  level: SrsLevel;
  nextReview: number;
  wrongCount: number;
  lastReviewed?: number;
}

export type AiModelId =
  | 'deepseek-v4.1-flash:free'
  | 'deepseek-v4.1-flash'
  | 'deepseek-v4-flash:free'
  | string;

export type TutorMode = 'qa' | 'quiz' | 'roleplay' | 'writing';

export interface AppSettings {
  chunkSize: 5 | 6 | 7;
  speechRate: 0.8 | 1.0;
  preferredAccent: 'en-US' | 'en-GB';
  selectedVoiceURI?: string;
  autoPlayAudio: boolean;
  soundEffectsEnabled: boolean;
  aiApiKey: string;
  aiModel: AiModelId;
  aiBaseUrl: string;
}

export interface StudyStats {
  totalSessionsCompleted: number;
  totalReviewsCompleted: number;
  lastStudyDate?: string;
  streakDays: number;
}

export interface StudyState {
  version: 1;
  progress: Record<string, WordProgress>;
  settings: AppSettings;
  stats: StudyStats;
}

export type SkillKey =
  | 'vocabulary'
  | 'grammar'
  | 'cards'
  | 'writing'
  | 'monotalk'
  | 'listening'
  | 'reading';

export type UnitResetScope = 'vocab' | 'all';

export type UnitSkillKey = Exclude<SkillKey, 'vocabulary' | 'cards' | 'monotalk'>;

export type UnitIconKey =
  | 'building'
  | 'cpu'
  | 'wrench'
  | 'shield-check'
  | 'headphones'
  | 'bar-chart'
  | 'briefcase'
  | 'users';

export interface UnitSkillDescriptor {
  skill: UnitSkillKey;
  title: string;
  summary: string;
  keyTopics: string[];
}

export interface UnitMeta {
  unit: number;
  title: string;
  vietnameseTitle: string;
  description: string;
  iconKey: UnitIconKey;
  objectives: string[];
  skills: Record<UnitSkillKey, UnitSkillDescriptor>;
}
