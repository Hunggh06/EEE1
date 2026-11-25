export interface GrammarFormula {
  label: string;
  pattern: string;
  example: string;
  translationVi: string;
}

export interface GrammarSection {
  id: string;
  title: string;
  explanationVi: string;
  formulas: GrammarFormula[];
  notes?: string[];
}

export type GrammarQuestionType = 'mcq' | 'fill' | 'rewrite';

export interface GrammarQuestion {
  id: string;
  unit: number;
  type: GrammarQuestionType;
  prompt: string;
  promptVi?: string;
  options?: string[]; // required for 'mcq'
  acceptedAnswers: string[]; // normalized case-insensitive accepted strings
  displayAnswer: string;
  explanationVi: string;
}

export interface UnitGrammarModule {
  unit: number;
  title: string;
  subtitleVi: string;
  sections: GrammarSection[];
  questions: GrammarQuestion[];
}

/* ============================================================================
 * Speaking / Role-play Cards (from Card.docx + Unit 6 Chart Cards)
 * ========================================================================== */

export interface CardTableRow {
  field: string;
  studentA: string;
  studentB: string;
  aIsQuestionPrompt?: boolean;
  bIsQuestionPrompt?: boolean;
  suggestedQuestion?: string;
  suggestedAnswer?: string;
}

export interface CardFlowStep {
  speaker: 'A' | 'B' | 'Both';
  action: string;
  sampleLine?: string;
}

export interface CardDialogueTurn {
  speaker: 'A' | 'B';
  roleLabel?: string;
  line: string;
  translationVi?: string;
}

export interface CardChartPoint {
  label: string;
  value: number;
  series?: string;
}

export interface CardMiniChart {
  title: string;
  chartType: 'line' | 'bar';
  unitLabel: string;
  points: CardChartPoint[];
  multiSeries?: Array<{ name: string; color: string; points: Array<{ label: string; value: number }> }>;
}

export interface CardLeadIn {
  starterSpeaker: 'A' | 'B';
  contextHintA: string;
  contextHintB: string;
  sampleLineA: string;
  sampleLineB: string;
  closingStarter?: 'A' | 'B';
  closingHintA?: string;
  closingHintB?: string;
  sampleClosingA?: string;
  sampleClosingB?: string;
}

export interface SpeakingCard {
  id: string;
  unit: number;
  cardCode: string; // e.g., "Card 1 • Unit 1"
  title: string;
  subtitleVi: string;
  source: 'card_docx' | 'textbook_supplement';
  scenarioVi: string;
  roleAName: string;
  roleBName: string;
  leadIn?: CardLeadIn;
  rows?: CardTableRow[];
  flowSteps?: CardFlowStep[];
  charts?: CardMiniChart[];
  keyExpressions?: string[];
  sampleDialogue: CardDialogueTurn[];
}

export interface MonoTalkSample {
  unit: number;
  title: string;
  topicVi: string;
  script: string;
}

/* ============================================================================
 * Guided Sentence-by-Sentence Writing & Memorization (Units 1-8)
 * ========================================================================== */

export interface WritingSentenceStep {
  id: string;
  order: number;
  sectionLabel: string; // e.g., "Mở đoạn", "Thân bài 1", "Lời chào", "Kết luận"
  vietnamesePrompt: string; // Full Vietnamese meaning to translate & memorize
  grammarTargets: string[]; // Key grammar/vocab tags expected
  keywordSkeleton: string; // Progressive hint without giving away full grammar
  modelSentence: string; // Textbook-standard English model sentence
  tipVi: string; // Short explanation of why the structure works
}

export interface UnitWritingTask {
  unit: number;
  title: string;
  taskTypeVi: string; // e.g., "Đoạn văn", "Email kỹ thuật", "Biên bản cuộc họp"
  objectiveVi: string;
  targetChecklist: string[];
  sentences: WritingSentenceStep[];
}

/* ============================================================================
 * Guided Mono Talk Speaking & Memorization (Units 1-8)
 * ========================================================================== */

export interface MonoTalkCueRow {
  label: string;
  value: string;
  solution?: string;
}

export interface UnitMonoTalkTask {
  unit: number;
  title: string;
  taskTypeVi: string; // e.g., "Thuyết trình ngắn (Mono Talk)", "Thuyết trình biểu đồ"
  promptEn: string;
  promptBulletsEn: string[];
  objectiveVi: string;
  targetChecklist: string[];
  cueTable?: {
    caption: string;
    rows: MonoTalkCueRow[];
    precautions?: string[];
  };
  chart?: CardMiniChart;
  flowSteps?: CardFlowStep[];
  sentences: WritingSentenceStep[];
}

/* ============================================================================
 * Listening Comprehension & Interactive Tasks (Units 1-8)
 * ========================================================================== */

export type ListeningSourceType = 'mp3' | 'tts';

export type ListeningQuestionType = 'fill' | 'qa' | 'mcq';

export interface ListeningQuestion {
  id: string;
  orderLabel: string; // e.g., "(1)", "1", "4a", "4b"
  type: ListeningQuestionType;
  prompt: string;
  options?: string[];
  acceptedAnswers: string[];
  displayAnswer: string;
  wordLimitNote?: string;
  hintVi?: string;
}

export interface ListeningTask {
  id: string;
  unit: number;
  taskCode: string;
  title: string;
  subtitleVi: string;
  instructionEn: string;
  instructionVi: string;
  audioType: ListeningSourceType;
  audioSrc?: string;
  speechScript?: string;
  transcript: Array<{ speaker?: string; line: string }>;
  questions: ListeningQuestion[];
}

export interface UnitListeningModule {
  unit: number;
  title: string;
  subtitleVi: string;
  tasks: ListeningTask[];
}

/* ============================================================================
 * Reading Comprehension Passages & Exercises (Units 1-8)
 * ========================================================================== */

export type ReadingQuestionType = 'mcq' | 'tf' | 'fill' | 'qa';

export interface ReadingQuestion {
  id: string;
  orderLabel: string;
  type: ReadingQuestionType;
  prompt: string;
  options?: string[];
  acceptedAnswers: string[];
  displayAnswer: string;
  wordLimitNote?: string;
  explanationVi: string;
}

export interface ReadingPassageTask {
  id: string;
  unit: number;
  taskCode: string;
  title: string;
  subtitleVi: string;
  instructionEn: string;
  instructionVi: string;
  passageTitle: string;
  paragraphs: Array<{ heading?: string; text: string }>;
  questions: ReadingQuestion[];
}

export interface UnitReadingModule {
  unit: number;
  title: string;
  subtitleVi: string;
  tasks: ReadingPassageTask[];
}
