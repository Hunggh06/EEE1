import { afterEach, describe, expect, it, vi } from 'vitest';
import { CARDS_BY_UNIT } from '../../data/cards/speakingCards';
import { TUTOR_KNOWLEDGE_BY_UNIT, UNIT_TUTOR_KNOWLEDGE } from '../../data/tutorKnowledge';
import { ALL_WORD_IDS, VOCAB_BY_ID, VOCAB_BY_UNIT } from '../../data/vocab';
import { getUnitWriting } from '../../data/writing';
import type { WordProgress } from '../../types/vocab';
import {
  AiClientError,
  buildChatCompletionsUrl,
  buildTutorSystemPrompt,
  evaluateCardTurn,
  evaluateWritingSentence,
  parseAiJsonObject,
  parseSseChunk,
  requestCardTurnHint,
  requestWritingHint,
  reviewFullWritingEssay,
  streamTutorCompletion
} from '../aiClient';
import {
  DEFAULT_AI_API_KEY,
  DEFAULT_AI_BASE_URL,
  DEFAULT_AI_MODEL,
  parseAndValidateBackupJson
} from '../storage';

describe('AI Tutor Knowledge Base & Prompt Builder', () => {
  it('defines complete grounded knowledge for all 8 units', () => {
    expect(UNIT_TUTOR_KNOWLEDGE).toHaveLength(8);
    for (let u = 1; u <= 8; u += 1) {
      const uk = TUTOR_KNOWLEDGE_BY_UNIT[u];
      expect(uk).toBeDefined();
      expect(uk.languageFocus.length).toBeGreaterThanOrEqual(1);
      expect(uk.keyExpressions.length).toBeGreaterThanOrEqual(1);
      expect(uk.speakingTasks.length).toBeGreaterThanOrEqual(1);
      expect(uk.writingTasks.length).toBeGreaterThanOrEqual(1);
      expect(uk.starterPrompts).toHaveLength(4);
    }
  });

  it('builds a grounded system prompt covering all 8 units and unit-specific grammar + vocab', () => {
    const allScopePrompt = buildTutorSystemPrompt({
      unitScope: 'all',
      mode: 'qa',
      progress: {}
    });

    for (let u = 1; u <= 8; u += 1) {
      expect(allScopePrompt).toContain(`Unit ${u}:`);
    }
    expect(allScopePrompt).toContain('competitor');
    expect(allScopePrompt).toContain('refrigerant');

    const unitGrammarMarkers: Record<number, string> = {
      1: 'Passive voice in Present Simple & Past Simple',
      2: 'Reduced relative clauses',
      3: 'Imperatives',
      4: 'Have you tried + V-ing',
      5: 'Polite problem explanations',
      6: 'Subject + Verb + Adverb',
      7: 'Word formation with Suffixes',
      8: 'Noun Clauses'
    };

    for (let u = 1; u <= 8; u += 1) {
      const unitPrompt = buildTutorSystemPrompt({
        unitScope: u,
        mode: 'qa',
        progress: {}
      });
      expect(unitPrompt).toContain(`TRỌNG TÂM HIỆN TẠI: UNIT ${u}`);
      expect(unitPrompt).toContain(unitGrammarMarkers[u]);
      const sampleWord = VOCAB_BY_UNIT[u][0];
      expect(unitPrompt).toContain(sampleWord.word);
      expect(unitPrompt).toContain(sampleWord.meaning);
    }
  });

  it('injects weak words (wrongCount > 0), focusWord, and adapts to all 4 TutorModes', () => {
    const progress: Record<string, WordProgress> = {
      u1_01: { level: 1, nextReview: 1_700_000_000_000, wrongCount: 3 },
      u4_02: { level: 2, nextReview: 1_700_000_000_000, wrongCount: 2 },
      u1_02: { level: 4, nextReview: 1_700_000_000_000, wrongCount: 0 }
    };

    const focusWord = VOCAB_BY_ID['u4_02'];
    const quizPrompt = buildTutorSystemPrompt({
      unitScope: 4,
      mode: 'quiz',
      progress,
      focusWord
    });

    expect(quizPrompt).toContain('breaker');
    expect(quizPrompt).toContain('sai 2 lần');
    expect(quizPrompt).toContain('competitor');
    expect(quizPrompt).toContain('sai 3 lần');
    expect(quizPrompt).toContain('TỪ VỰNG ĐANG ĐƯỢC CHỌN TẬP TRUNG');
    expect(quizPrompt).toContain('RA ĐỀ KIỂM TRA TƯƠNG TÁC');

    // Words with wrongCount === 0 should not be flagged as weak words
    expect(quizPrompt).not.toContain('consumer electronics (Unit 1, n.p): đồ điện tử gia dụng — sai 0');

    const roleplayPrompt = buildTutorSystemPrompt({
      unitScope: 5,
      mode: 'roleplay',
      progress: {}
    });
    expect(roleplayPrompt).toContain('NHẬP VAI HỘI THOẠI');

    const writingPrompt = buildTutorSystemPrompt({
      unitScope: 6,
      mode: 'writing',
      progress: {}
    });
    expect(writingPrompt).toContain('CHỮA BÀI VIẾT');
  });
});

describe('SSE Stream Parser & AI Client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('parses SSE chunks across partial frames, multiple deltas, CRLF, and [DONE]', () => {
    const frame1 =
      ': keepalive\r\n' +
      'data: {"choices":[{"delta":{"content":"Xin "}}]}\r\n\r\n' +
      'data: {"choices":[{"del';

    const res1 = parseSseChunk(frame1, '', false);
    expect(res1.textDelta).toBe('Xin ');
    expect(res1.done).toBe(false);
    expect(res1.remainder).toBe('data: {"choices":[{"del');

    const frame2 =
      'ta":{"content":"chào "}}]}\n' +
      'data: {"choices":[{"delta":{"content":"bạn!"}}]}\n' +
      'data: [DONE]\n';

    const res2 = parseSseChunk(frame2, res1.remainder, false);
    expect(res2.textDelta).toBe('chào bạn!');
    expect(res2.done).toBe(true);
    expect(res2.remainder).toBe('');
  });

  it('flushes trailing SSE line without newline and captures stream errors', () => {
    const trailing = 'data: {"choices":[{"delta":{"content":"OK"}}]}';
    const buffered = parseSseChunk(trailing, '', false);
    expect(buffered.textDelta).toBe('');
    expect(buffered.remainder).toBe(trailing);

    const flushed = parseSseChunk('', buffered.remainder, true);
    expect(flushed.textDelta).toBe('OK');
    expect(flushed.remainder).toBe('');

    const errorRes = parseSseChunk(
      'data: {"error":{"message":"Upstream error occurred"}}\n',
      '',
      false
    );
    expect(errorRes.error).toBe('Upstream error occurred');
  });

  it('normalizes TokenHarbor base URLs cleanly', () => {
    expect(buildChatCompletionsUrl('https://tokenharbor.ai/v1')).toBe(
      'https://tokenharbor.ai/v1/chat/completions'
    );
    expect(buildChatCompletionsUrl('https://tokenharbor.ai/v1/')).toBe(
      'https://tokenharbor.ai/v1/chat/completions'
    );
    expect(buildChatCompletionsUrl('https://tokenharbor.ai/v1/chat/completions')).toBe(
      'https://tokenharbor.ai/v1/chat/completions'
    );
  });

  it('streams SSE response frames via streamTutorCompletion and surfaces HTTP 402 cleanly', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hello "}}]}\n\ndata: {"choi')
        );
        controller.enqueue(
          encoder.encode('ces":[{"delta":{"content":"EEE5!"}}]}\n\ndata: [DONE]\n')
        );
        controller.close();
      }
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(stream, {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' }
        })
      )
    );

    const deltas: string[] = [];
    const result = await streamTutorCompletion({
      apiKey: 'thk_test_key',
      baseUrl: DEFAULT_AI_BASE_URL,
      model: DEFAULT_AI_MODEL,
      messages: [{ role: 'user', content: 'Hi' }],
      onDelta: (delta) => deltas.push(delta)
    });

    expect(deltas).toEqual(['Hello ', 'EEE5!']);
    expect(result.content).toBe('Hello EEE5!');

    // Test HTTP 402 error mapping
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: 'Insufficient credits' } }), {
          status: 402,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );

    await expect(
      streamTutorCompletion({
        apiKey: 'thk_test_key',
        baseUrl: DEFAULT_AI_BASE_URL,
        model: 'deepseek-v4.1-flash',
        messages: [{ role: 'user', content: 'Hi' }]
      })
    ).rejects.toMatchObject({
      name: 'AiClientError',
      code: 'PAYMENT_REQUIRED',
      status: 402
    } satisfies Partial<AiClientError>);
  });

  it('falls back cleanly when server returns non-streaming JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model: 'deepseek-v4.1-flash:free',
            choices: [{ message: { content: 'Non-stream reply' } }]
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      )
    );

    const deltas: string[] = [];
    const res = await streamTutorCompletion({
      apiKey: 'thk_test_key',
      messages: [{ role: 'user', content: 'Test' }],
      onDelta: (d) => deltas.push(d)
    });

    expect(res.content).toBe('Non-stream reply');
    expect(deltas).toEqual(['Non-stream reply']);
  });
});

describe('Storage Backwards Compatibility with v1 Backups', () => {
  it('defaults missing ai* settings cleanly when importing legacy v1 backup JSON', () => {
    const legacyBackup = {
      version: 1,
      progress: {
        u1_01: { level: 3, nextReview: 1_700_000_000_000, wrongCount: 1 }
      },
      settings: {
        chunkSize: 5,
        speechRate: 0.8,
        preferredAccent: 'en-GB',
        autoPlayAudio: false
      },
      stats: {
        totalSessionsCompleted: 4,
        totalReviewsCompleted: 12,
        streakDays: 2
      }
    };

    const result = parseAndValidateBackupJson(JSON.stringify(legacyBackup), ALL_WORD_IDS);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.settings.chunkSize).toBe(5);
      expect(result.state.settings.preferredAccent).toBe('en-GB');
      expect(result.state.settings.aiApiKey).toBe(DEFAULT_AI_API_KEY);
      expect(result.state.settings.aiModel).toBe(DEFAULT_AI_MODEL);
      expect(result.state.settings.aiBaseUrl).toBe(DEFAULT_AI_BASE_URL);
      expect(result.summary.wordCount).toBe(1);
    }
  });

  it('rejects malformed non-string ai* settings fields', () => {
    const invalidBackup = {
      version: 1,
      progress: {},
      settings: {
        chunkSize: 6,
        speechRate: 1.0,
        preferredAccent: 'en-US',
        autoPlayAudio: true,
        aiModel: 12345
      },
      stats: {
        totalSessionsCompleted: 0,
        totalReviewsCompleted: 0,
        streakDays: 0
      }
    };

    const result = parseAndValidateBackupJson(JSON.stringify(invalidBackup), ALL_WORD_IDS);
    expect(result.ok).toBe(false);
  });
});

describe('Phase 2 AI Graders & Hint Helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('parseAiJsonObject extracts clean and fenced JSON cleanly', () => {
    expect(parseAiJsonObject('```json\n{"isCorrect":true,"score":9}\n```')).toEqual({
      isCorrect: true,
      score: 9
    });
    expect(parseAiJsonObject('invalid text')).toBeNull();
  });

  it('evaluateWritingSentence parses fenced JSON feedback and maps HTTP 402 to PAYMENT_REQUIRED', async () => {
    const task = getUnitWriting(1)!;
    const step = task.sentences[1];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model: 'deepseek-v4.1-flash:free',
            choices: [
              {
                message: {
                  content:
                    '```json\n{"isCorrect": true, "score": 9.5, "verdictVi": "Rất chính xác!", "mistakesVi": [], "correctedSentence": "The company was founded in 1969 and is currently headquartered in Suwon, South Korea.", "tipVi": "Dùng tốt bị động."}\n```'
                }
              }
            ]
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const evalRes = await evaluateWritingSentence({
      apiKey: 'thk_test_key',
      unitNumber: 1,
      step,
      userSentence:
        'The company was founded in 1969 and is currently headquartered in Suwon, South Korea.'
    });

    expect(evalRes.isCorrect).toBe(true);
    expect(evalRes.score).toBe(9.5);
    expect(evalRes.mistakesVi).toEqual([]);

    // HTTP 402 handling
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: 'Payment required' } }), {
          status: 402,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );

    await expect(
      evaluateWritingSentence({
        apiKey: 'thk_test_key',
        model: 'deepseek-v4.1-flash',
        unitNumber: 1,
        step,
        userSentence: 'The company founded in 1969.'
      })
    ).rejects.toMatchObject({
      name: 'AiClientError',
      code: 'PAYMENT_REQUIRED',
      status: 402
    } satisfies Partial<AiClientError>);
  });

  it('evaluateCardTurn, requestCardTurnHint, requestWritingHint, and reviewFullWritingEssay work with mocked AI responses', async () => {
    const card = CARDS_BY_UNIT[5][0];
    const partnerLine = card.sampleDialogue[0];
    const targetTurn = card.sampleDialogue[1];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    isCorrect: true,
                    score: 9,
                    feedbackVi: 'Phản hồi lịch sự, đúng ý mở đầu khiếu nại.',
                    improvedLine: "Good morning. I'm having some problems with my last order."
                  })
                }
              }
            ]
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const cardEval = await evaluateCardTurn({
      apiKey: 'thk_test_key',
      userRole: 'A',
      card,
      partnerLine,
      targetTurn,
      userResponse: 'Good morning, I have some problems with my last order.',
      historyTurns: [partnerLine]
    });
    expect(cardEval.isCorrect).toBe(true);
    expect(cardEval.score).toBe(9);

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async () =>
        new Response(
          JSON.stringify({
            choices: [{ message: { content: 'Mở đầu: "Good morning, I\'m having..." + từ khóa: last order.' } }]
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const cardHint = await requestCardTurnHint({
      apiKey: 'thk_test_key',
      userRole: 'A',
      card,
      partnerLine,
      targetTurn
    });
    expect(cardHint).toContain('last order');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async () =>
        new Response(
          JSON.stringify({
            choices: [{ message: { content: 'Mở đầu với "After graduating from..." và cụm apply for.' } }]
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const task = getUnitWriting(1)!;
    const writingHint = await requestWritingHint({
      apiKey: 'thk_test_key',
      unitNumber: 1,
      step: task.sentences[0],
      userDraft: 'After graduate HaUI'
    });
    expect(writingHint).toContain('apply for');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            choices: [{ message: { content: 'Bài viết đạt 9/10 theo Checklist Unit 1.' } }]
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const deltas: string[] = [];
    const essayReview = await reviewFullWritingEssay({
      apiKey: 'thk_test_key',
      task,
      assembledEssay: task.sentences.map((s) => s.modelSentence).join(' '),
      onDelta: (d) => deltas.push(d)
    });
    expect(essayReview.content).toContain('9/10');
    expect(deltas).toHaveLength(1);
  });
});
