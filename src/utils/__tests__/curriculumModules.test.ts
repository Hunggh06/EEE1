import { describe, expect, it } from 'vitest';
import {
  CARDS_BY_UNIT,
  MONO_TALKS_BY_UNIT,
  SPEAKING_CARDS
} from '../../data/cards/speakingCards';
import { ALL_GRAMMAR_MODULES, GRAMMAR_BY_UNIT, getUnitGrammar } from '../../data/grammar';
import {
  ALL_LISTENING_MODULES,
  LISTENING_BY_UNIT,
  getUnitListening
} from '../../data/listening';
import {
  ALL_READING_MODULES,
  READING_BY_UNIT,
  getUnitReading
} from '../../data/reading';
import {
  ALL_MONOTALK_TASKS,
  MONOTALK_BY_UNIT,
  getUnitMonoTalk
} from '../../data/monotalk';
import { ALL_WRITING_TASKS, WRITING_BY_UNIT, getUnitWriting } from '../../data/writing';
import { parseAiJsonObject } from '../aiClient';
import {
  MONOTALK_PROGRESS_STORAGE_KEY,
  WRITING_PROGRESS_STORAGE_KEY,
  findNextUserTurnIndex,
  getCardDraftKey,
  isGrammarAnswerCorrect,
  isListeningAnswerCorrect,
  isReadingAnswerCorrect,
  loadMonoTalkProgress,
  normalizeGrammarAnswer,
  normalizeListeningAnswer
} from '../curriculumHelpers';

describe('Phase 2 Curriculum Data Integrity (Units 1–8)', () => {
  it('provides Grammar modules with sections and 8 validated questions for all 8 Units', () => {
    expect(ALL_GRAMMAR_MODULES).toHaveLength(8);

    for (let u = 1; u <= 8; u += 1) {
      const mod = getUnitGrammar(u);
      expect(mod).toBeDefined();
      expect(GRAMMAR_BY_UNIT[u]).toBe(mod);
      expect(mod!.unit).toBe(u);
      expect(mod!.sections.length).toBeGreaterThanOrEqual(2);
      expect(mod!.questions).toHaveLength(8);

      for (const q of mod!.questions) {
        expect(q.unit).toBe(u);
        expect(q.acceptedAnswers.length).toBeGreaterThanOrEqual(1);
        expect(isGrammarAnswerCorrect(q, q.displayAnswer)).toBe(true);

        if (q.type === 'mcq') {
          expect(q.options).toBeDefined();
          expect(q.options).toHaveLength(4);
          expect(q.options!.some((opt) => isGrammarAnswerCorrect(q, opt))).toBe(true);
        }
      }
    }
  });

  it('provides Guided Writing tasks with 7 sequenced sentences for all 8 Units', () => {
    expect(ALL_WRITING_TASKS).toHaveLength(8);

    for (let u = 1; u <= 8; u += 1) {
      const task = getUnitWriting(u);
      expect(task).toBeDefined();
      expect(WRITING_BY_UNIT[u]).toBe(task);
      expect(task!.unit).toBe(u);
      expect(task!.targetChecklist.length).toBeGreaterThanOrEqual(3);
      expect(task!.sentences).toHaveLength(7);

      task!.sentences.forEach((step, idx) => {
        expect(step.order).toBe(idx + 1);
        expect(step.vietnamesePrompt.trim().length).toBeGreaterThan(0);
        expect(step.keywordSkeleton.trim().length).toBeGreaterThan(0);
        expect(step.modelSentence.trim().length).toBeGreaterThan(0);
        expect(step.grammarTargets.length).toBeGreaterThanOrEqual(1);
      });
    }
  });

  it('provides all 9 Speaking Cards matching ÔN TẬP THI KTHP SPEAKING across all 8 Units plus 7 Mono Talks', () => {
    expect(SPEAKING_CARDS).toHaveLength(9);

    for (let u = 1; u <= 8; u += 1) {
      const cards = CARDS_BY_UNIT[u];
      expect(cards).toBeDefined();
      expect(cards.length).toBeGreaterThanOrEqual(1);

      for (const card of cards) {
        expect(card.unit).toBe(u);
        expect(card.sampleDialogue.length).toBeGreaterThanOrEqual(4);
        for (const turn of card.sampleDialogue) {
          expect(['A', 'B']).toContain(turn.speaker);
          expect(turn.line.trim().length).toBeGreaterThan(0);
        }
      }
    }

    for (let u = 1; u <= 7; u += 1) {
      expect(MONO_TALKS_BY_UNIT[u]).toBeDefined();
      expect(MONO_TALKS_BY_UNIT[u].script.trim().length).toBeGreaterThan(40);
    }

    // Unit 6 card should carry chart definitions for MiniChartSvg
    expect(CARDS_BY_UNIT[6].every((c) => (c.charts?.length ?? 0) > 0)).toBe(true);
  });
});

describe('Grammar Answer Normalization & Validation', () => {
  it('normalizes whitespace, case, curly apostrophes, and trailing punctuation', () => {
    expect(normalizeGrammarAnswer('  HP   Company   was founded.  ')).toBe(
      'hp company was founded'
    );
    expect(normalizeGrammarAnswer('doesn’t seem to work!')).toBe("doesn't seem to work");

    const sampleQuestion = {
      acceptedAnswers: ["The activation key doesn't seem to work."]
    };

    expect(
      isGrammarAnswerCorrect(sampleQuestion, "  the activation   key doesn’t seem to work  ")
    ).toBe(true);
    expect(
      isGrammarAnswerCorrect(sampleQuestion, "The activation key doesn't seem to work.")
    ).toBe(true);
    expect(isGrammarAnswerCorrect(sampleQuestion, 'The key is broken')).toBe(false);
    expect(isGrammarAnswerCorrect(sampleQuestion, '   ')).toBe(false);
  });
});

describe('Speaking Card Role-play Turn Progression', () => {
  it('advances cleanly past partner turns to the next user turn', () => {
    const dialogue = [
      { speaker: 'B' as const, line: 'Hello, VAECO speaking.' },
      { speaker: 'A' as const, line: 'Hi, I have an issue.' },
      { speaker: 'B' as const, line: 'What is the order number?' },
      { speaker: 'B' as const, line: 'Please check your invoice.' },
      { speaker: 'A' as const, line: 'It is T6758.' }
    ];

    expect(findNextUserTurnIndex(dialogue, 0, 'A')).toBe(1);
    expect(findNextUserTurnIndex(dialogue, 2, 'A')).toBe(4);
    expect(findNextUserTurnIndex(dialogue, 5, 'A')).toBe(5);
    expect(findNextUserTurnIndex(dialogue, 0, 'B')).toBe(0);
    expect(findNextUserTurnIndex(dialogue, 1, 'B')).toBe(2);
  });
});

describe('parseAiJsonObject', () => {
  it('parses clean JSON objects and fenced ```json blocks', () => {
    const clean = parseAiJsonObject<{ isCorrect: boolean; score: number }>(
      '{"isCorrect": true, "score": 9}'
    );
    expect(clean).toEqual({ isCorrect: true, score: 9 });

    const fenced = parseAiJsonObject<{ feedbackVi: string; mistakesVi: string[] }>(
      '```json\n{\n  "feedbackVi": "Rất tốt {đạt chuẩn}",\n  "mistakesVi": []\n}\n```'
    );
    expect(fenced).toEqual({ feedbackVi: 'Rất tốt {đạt chuẩn}', mistakesVi: [] });

    const wrapped = parseAiJsonObject<{ score: number }>(
      'Dưới đây là kết quả:\n```json\n{"score": 8.5}\n```\nChúc bạn học tốt!'
    );
    expect(wrapped).toEqual({ score: 8.5 });
  });

  it('returns null for invalid text, arrays, and non-object JSON', () => {
    expect(parseAiJsonObject('')).toBeNull();
    expect(parseAiJsonObject('not valid json at all')).toBeNull();
    expect(parseAiJsonObject('["an", "array"]')).toBeNull();
    expect(parseAiJsonObject('42')).toBeNull();
    expect(parseAiJsonObject('null')).toBeNull();
  });
});

describe('Listening Module Integrity & Audio Assets (Units 1–8)', () => {
  it('provides Listening tasks for all 8 Units with valid answer keys and real MP3 files on disk', () => {
    expect(ALL_LISTENING_MODULES).toHaveLength(8);

    const mp3Paths: string[] = [];
    for (let u = 1; u <= 8; u += 1) {
      const mod = getUnitListening(u);
      expect(mod).toBeDefined();
      expect(LISTENING_BY_UNIT[u]).toBe(mod);
      expect(mod!.unit).toBe(u);
      expect(mod!.tasks.length).toBeGreaterThanOrEqual(1);

      for (const task of mod!.tasks) {
        expect(task.unit).toBe(u);
        expect(task.transcript.length).toBeGreaterThanOrEqual(2);
        expect(task.questions.length).toBeGreaterThanOrEqual(5);

        if (task.audioType === 'mp3') {
          expect(task.audioSrc).toBeDefined();
          expect(task.audioSrc).toMatch(/^\/audio\/[a-z0-9_]+\.mp3$/);
          mp3Paths.push(task.audioSrc!);
        } else {
          expect(task.speechScript?.trim().length).toBeGreaterThan(20);
        }

        for (const q of task.questions) {
          expect(q.acceptedAnswers.length).toBeGreaterThanOrEqual(1);
          expect(isListeningAnswerCorrect(q, q.displayAnswer)).toBe(true);
        }
      }
    }

    // All 9 MP3 files from Revision 3_Audio are wired into Units 1, 2, 4, 5, 7
    expect(mp3Paths).toHaveLength(9);
  });

  it('normalizes listening answers (hyphens, whitespace, casing, punctuation) and builds Card draft keys', () => {
    expect(normalizeListeningAnswer('  X6-792-44! ')).toBe('x6 792 44');
    expect(normalizeListeningAnswer('Type-A   screws.')).toBe('type a screws');
    expect(
      isListeningAnswerCorrect({ acceptedAnswers: ['X6-792-44'] }, 'x6 792 44')
    ).toBe(true);
    expect(
      isListeningAnswerCorrect({ acceptedAnswers: ['sensor technology'] }, 'Sensor technology.')
    ).toBe(true);
    expect(getCardDraftKey('card_u1_foxconn', 'A')).toBe('card_u1_foxconn__A');
  });
});

describe('Reading Comprehension Module Integrity (Units 1–8)', () => {
  it('provides textbook Reading passages with validated questions and answer keys for all 8 Units', () => {
    expect(ALL_READING_MODULES).toHaveLength(8);

    let totalTasks = 0;
    let totalQuestions = 0;

    for (let u = 1; u <= 8; u += 1) {
      const mod = getUnitReading(u);
      expect(mod).toBeDefined();
      expect(READING_BY_UNIT[u]).toBe(mod);
      expect(mod!.unit).toBe(u);
      expect(mod!.tasks.length).toBeGreaterThanOrEqual(2);

      for (const task of mod!.tasks) {
        totalTasks += 1;
        expect(task.unit).toBe(u);
        expect(task.paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(task.questions.length).toBeGreaterThanOrEqual(4);

        for (const q of task.questions) {
          totalQuestions += 1;
          expect(q.acceptedAnswers.length).toBeGreaterThanOrEqual(1);
          expect(q.explanationVi.trim().length).toBeGreaterThan(0);
          expect(isReadingAnswerCorrect(q, q.displayAnswer)).toBe(true);

          if (q.type === 'mcq' || q.type === 'tf') {
            expect(q.options).toBeDefined();
            expect(q.options!.some((opt) => isReadingAnswerCorrect(q, opt))).toBe(true);
          }
        }
      }
    }

    expect(totalTasks).toBeGreaterThanOrEqual(16);
    expect(totalQuestions).toBeGreaterThanOrEqual(80);
  });
});

describe('Dedicated Mono Talk Module Integrity (Units 1–8)', () => {
  it('provides 7-sentence Mono Talk tasks, official prompts, and visual cues across all 8 Units', () => {
    expect(ALL_MONOTALK_TASKS).toHaveLength(8);
    expect(MONOTALK_PROGRESS_STORAGE_KEY).not.toBe(WRITING_PROGRESS_STORAGE_KEY);
    expect(loadMonoTalkProgress()).toEqual({});

    for (let u = 1; u <= 8; u += 1) {
      const task = getUnitMonoTalk(u);
      expect(task).toBeDefined();
      expect(MONOTALK_BY_UNIT[u]).toBe(task);
      expect(task!.unit).toBe(u);
      expect(task!.promptEn.trim().length).toBeGreaterThan(20);
      expect(task!.promptBulletsEn.length).toBeGreaterThanOrEqual(3);
      expect(task!.targetChecklist.length).toBeGreaterThanOrEqual(3);
      expect(task!.sentences).toHaveLength(7);

      task!.sentences.forEach((step, idx) => {
        expect(step.order).toBe(idx + 1);
        expect(step.vietnamesePrompt.trim().length).toBeGreaterThan(0);
        expect(step.keywordSkeleton.trim().length).toBeGreaterThan(0);
        expect(step.modelSentence.trim().length).toBeGreaterThan(0);
        expect(step.grammarTargets.length).toBeGreaterThanOrEqual(1);
      });
    }

    // Unit 4 cueTable (Daikin U0), Unit 6 multiSeries chart, Unit 8 flowchart
    expect(getUnitMonoTalk(4)?.cueTable?.rows.length).toBeGreaterThanOrEqual(6);
    expect(getUnitMonoTalk(4)?.cueTable?.precautions).toHaveLength(3);
    expect(getUnitMonoTalk(6)?.chart?.multiSeries).toHaveLength(3);
    expect(getUnitMonoTalk(8)?.flowSteps?.length).toBeGreaterThanOrEqual(8);
  });
});
