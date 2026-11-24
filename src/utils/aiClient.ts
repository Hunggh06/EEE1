import { TUTOR_KNOWLEDGE_BY_UNIT, UNIT_TUTOR_KNOWLEDGE } from '../data/tutorKnowledge';
import { ALL_VOCAB, VOCAB_BY_ID, VOCAB_BY_UNIT } from '../data/vocab';
import type {
  CardDialogueTurn,
  SpeakingCard,
  UnitWritingTask,
  WritingSentenceStep
} from '../types/curriculum';
import type { TutorMode, VocabItem, WordProgress } from '../types/vocab';
import { DEFAULT_AI_BASE_URL, DEFAULT_AI_MODEL } from './storage';

export type UnitScope = 'all' | number;

export interface BuildTutorPromptOptions {
  unitScope: UnitScope;
  mode: TutorMode;
  progress: Record<string, WordProgress>;
  focusWord?: VocabItem;
}

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ParsedSseResult {
  textDelta: string;
  done: boolean;
  remainder: string;
  error?: string;
}

export type AiErrorCode =
  | 'PAYMENT_REQUIRED'
  | 'UNAUTHORIZED'
  | 'RATE_LIMIT'
  | 'INVALID_CONFIG'
  | 'ABORTED'
  | 'NETWORK'
  | 'STREAM_ERROR'
  | 'HTTP_ERROR';

export class AiClientError extends Error {
  readonly code: AiErrorCode;
  readonly status?: number;
  readonly model?: string;

  constructor(
    message: string,
    options: { code: AiErrorCode; status?: number; model?: string }
  ) {
    super(message);
    this.name = 'AiClientError';
    this.code = options.code;
    this.status = options.status;
    this.model = options.model;
  }
}

export interface StreamTutorCompletionParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  messages: ChatCompletionMessage[];
  signal?: AbortSignal;
  temperature?: number;
  maxTokens?: number;
  onDelta?: (deltaText: string, accumulatedText: string) => void;
}

export interface TestAiConnectionParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
}

export type TestAiConnectionResult =
  | {
      ok: true;
      latencyMs: number;
      model: string;
      replyPreview: string;
    }
  | {
      ok: false;
      code: AiErrorCode;
      status?: number;
      message: string;
    };

export function buildChatCompletionsUrl(baseUrl?: string): string {
  const trimmed = (baseUrl ?? '').trim().replace(/\/+$/, '');
  const base = trimmed || DEFAULT_AI_BASE_URL;
  if (base.endsWith('/chat/completions')) {
    return base;
  }
  return `${base}/chat/completions`;
}

export function getWeakWordsFromProgress(
  progress: Record<string, WordProgress>,
  unitScope: UnitScope = 'all'
): Array<{ item: VocabItem; progress: WordProgress }> {
  const results: Array<{ item: VocabItem; progress: WordProgress }> = [];

  for (const [wordId, wp] of Object.entries(progress)) {
    if (!wp || wp.wrongCount <= 0) continue;
    const item = VOCAB_BY_ID[wordId];
    if (!item) continue;
    if (typeof unitScope === 'number' && item.unit !== unitScope) continue;
    results.push({ item, progress: wp });
  }

  results.sort((a, b) => {
    if (b.progress.wrongCount !== a.progress.wrongCount) {
      return b.progress.wrongCount - a.progress.wrongCount;
    }
    return a.progress.level - b.progress.level;
  });

  return results;
}

function formatModeInstructions(mode: TutorMode, unitScope: UnitScope): string {
  const unitLabel = typeof unitScope === 'number' ? `Unit ${unitScope}` : 'cả 8 Units (EEE5)';

  switch (mode) {
    case 'qa':
      return [
        `Chế độ hiện tại: HỎI ĐÁP BÀI HỌC (Q&A) cho ${unitLabel}.`,
        '- Trả lời rõ ràng, có cấu trúc: (1) Giải thích ngắn gọn dễ hiểu bằng tiếng Việt -> (2) Công thức / Phiên âm IPA nếu là từ vựng -> (3) Ví dụ tiếng Anh sát chuyên ngành Điện – Điện tử (đặt mỗi câu ví dụ tiếng Anh trong ngoặc kép hoặc dòng riêng để người học bấm nghe phát âm được) -> (4) Lưu ý tránh lỗi sai phổ biến.',
        '- Bám sát kiến thức trong giáo trình English for Electrical and Electronics Engineering 5 (HaUI).'
      ].join('\n');

    case 'quiz':
      return [
        `Chế độ hiện tại: RA ĐỀ KIỂM TRA TƯƠNG TÁC (Quiz) cho ${unitLabel}.`,
        '- Mỗi lượt CHỈ đưa 1 đến 2 câu hỏi (trắc nghiệm A/B/C/D, điền từ cloze, chia dạng từ/thì, hoặc viết lại câu theo Language Focus của Unit), CHỜ sinh viên trả lời trước khi chấm điểm, giải thích đáp án và ra câu tiếp theo (trừ khi sinh viên yêu cầu tạo cả đề nhiều câu cùng lúc).',
        '- Ưu tiên lồng ghép các từ vựng sinh viên hay sai (wrongCount > 0) nếu có.'
      ].join('\n');

    case 'roleplay':
      return [
        `Chế độ hiện tại: NHẬP VAI HỘI THOẠI (Role-play) theo Speaking Task của ${unitLabel}.`,
        '- Đóng vai đối tác thực tế (HR Manager, kỹ thuật viên hướng dẫn, khách hàng gọi hotline, khách hàng doanh nghiệp, hoặc đồng nghiệp họp kỹ thuật).',
        '- Phản hồi từng lượt ngắn gọn, tự nhiên bằng tiếng Anh (độ dài 2–4 câu) đúng ngữ cảnh kỹ thuật, sau đó thêm mục nhỏ "Gợi ý phản hồi" bằng tiếng Việt (kèm 2–3 mẫu câu/từ vựng của Unit) để sinh viên dễ trả lời tiếp.',
        '- Nếu sinh viên vừa trả lời bằng tiếng Anh, hãy nhẹ nhàng sửa lỗi ngữ pháp/từ vựng (nếu có) trước khi tiếp tục mạch hội thoại.'
      ].join('\n');

    case 'writing':
      return [
        `Chế độ hiện tại: HƯỚNG DẪN & CHỮA BÀI VIẾT (Writing Coach) cho ${unitLabel}.`,
        '- Nếu sinh viên mới bắt đầu: đưa dàn ý chuẩn theo Writing Task của Unit (độ dài gợi ý, cấu trúc câu bắt buộc, từ vựng chuyên ngành nên dùng) và một đề bài mẫu.',
        '- Nếu sinh viên gửi bài viết tiếng Anh: chấm chữa chi tiết theo 4 phần: (1) Nhận xét tổng quan & độ bám sát yêu cầu/văn phong -> (2) Sửa lỗi ngữ pháp & từ vựng theo từng câu -> (3) Điểm cộng & gợi ý nâng cấp cấu trúc đúng Language Focus của Unit -> (4) Phiên bản bài viết hoàn chỉnh mẫu.'
      ].join('\n');
  }
}

export function buildTutorSystemPrompt({
  unitScope,
  mode,
  progress,
  focusWord
}: BuildTutorPromptOptions): string {
  const sections: string[] = [];

  sections.push(
    [
      'Bạn là **Gia sư AI Tiếng Anh chuyên ngành Điện – Điện tử (HaUI EEE5)**, đồng hành cùng sinh viên Đại học Công nghiệp Hà Nội học giáo trình *English for Electrical and Electronics Engineering 5*.',
      'Nguyên tắc sư phạm:',
      '- Giao tiếp nhiệt tình, súc tích, chuẩn xác; giải thích chính bằng **tiếng Việt rõ ràng**, kèm **ví dụ tiếng Anh chuyên ngành Điện – Điện tử** và phiên âm **IPA** khi dạy từ mới.',
      '- Đặt câu ví dụ tiếng Anh rõ ràng (trong dấu ngoặc kép "..." hoặc gạch đầu dòng tiếng Anh riêng) để sinh viên dễ đọc và luyện phát âm.',
      '- Tuyệt đối bám sát nội dung 8 Units của giáo trình HaUI EEE5 dưới đây; nếu câu hỏi vượt ngoài giáo trình vẫn trả lời chuẩn kỹ thuật nhưng ưu tiên liên hệ lại ngữ pháp/từ vựng của Unit tương ứng.'
    ].join('\n')
  );

  // 8-Unit concise curriculum roadmap
  const roadmapLines = UNIT_TUTOR_KNOWLEDGE.map((u) => {
    const grammarShort = u.languageFocus.map((g) => g.title).join('; ');
    return `- Unit ${u.unit}: ${u.title} (${u.vietnameseTitle}) — Ngữ pháp: ${grammarShort}`;
  });
  sections.push(`## LỘ TRÌNH 8 UNITS GIÁO TRÌNH HAUI EEE5\n${roadmapLines.join('\n')}`);

  // Detailed unit or global knowledge base
  if (typeof unitScope === 'number' && TUTOR_KNOWLEDGE_BY_UNIT[unitScope]) {
    const uk = TUTOR_KNOWLEDGE_BY_UNIT[unitScope];
    const unitVocab = VOCAB_BY_UNIT[unitScope] ?? [];

    const grammarBlock = uk.languageFocus
      .map((g) => {
        const lines = [
          `### ${g.title}`,
          `Giải thích: ${g.explanationVi}`,
          `Công thức:\n${g.formulas.map((f) => `  • ${f}`).join('\n')}`,
          `Ví dụ giáo trình:\n${g.examples.map((ex) => `  • "${ex}"`).join('\n')}`
        ];
        if (g.notes?.length) {
          lines.push(`Lưu ý:\n${g.notes.map((n) => `  • ${n}`).join('\n')}`);
        }
        return lines.join('\n');
      })
      .join('\n\n');

    const expressionsBlock = uk.keyExpressions
      .map((eg) => {
        const lines = [
          `- ${eg.category}:`,
          ...eg.phrases.map((p) => `  • ${p}`)
        ];
        if (eg.examples?.length) {
          lines.push(...eg.examples.map((ex) => `  • E.g.: "${ex}"`));
        }
        return lines.join('\n');
      })
      .join('\n');

    const vocabBlock = unitVocab
      .map(
        (v) =>
          `- ${v.word} (${v.pos}) ${v.ipa}: ${v.meaning}${
            v.synonyms?.length ? ` [đồng nghĩa: ${v.synonyms.join(', ')}]` : ''
          } | Ex: "${v.example}"`
      )
      .join('\n');

    sections.push(
      [
        `## TRỌNG TÂM HIỆN TẠI: UNIT ${uk.unit} — ${uk.title} (${uk.vietnameseTitle})`,
        `Tổng quan: ${uk.topicSummary}`,
        `Mục tiêu:\n${uk.goals.map((g) => `- ${g}`).join('\n')}`,
        `### LANGUAGE FOCUS & GRAMMAR RULES\n${grammarBlock}`,
        `### KEY EXPRESSIONS\n${expressionsBlock}`,
        `### SPEAKING & WRITING TASKS\nSpeaking:\n${uk.speakingTasks
          .map((t) => `- ${t}`)
          .join('\n')}\nWriting:\n${uk.writingTasks.map((t) => `- ${t}`).join('\n')}`,
        `### BẢNG TỪ VỰNG ĐẦY ĐỦ UNIT ${uk.unit} (${unitVocab.length} từ)\n${vocabBlock}`
      ].join('\n\n')
    );
  } else {
    // 'all' scope: detailed grammar highlights + compact vocab index across all 8 units
    const allGrammarSummary = UNIT_TUTOR_KNOWLEDGE.map((uk) => {
      const formulas = uk.languageFocus
        .map((g) => `${g.title}: ${g.formulas.slice(0, 2).join(' | ')}`)
        .join('\n  ');
      const exprs = uk.keyExpressions
        .map((e) => `${e.category}: ${e.phrases.slice(0, 3).join('; ')}`)
        .join('\n  ');
      return `### Unit ${uk.unit}: ${uk.title}\n  Ngữ pháp: ${formulas}\n  Mẫu câu: ${exprs}`;
    }).join('\n\n');

    const compactVocabByUnit = UNIT_TUTOR_KNOWLEDGE.map((uk) => {
      const words = (VOCAB_BY_UNIT[uk.unit] ?? [])
        .map((v) => `${v.word} (${v.pos}: ${v.meaning})`)
        .join('; ');
      return `- Unit ${uk.unit} (${(VOCAB_BY_UNIT[uk.unit] ?? []).length} từ): ${words}`;
    }).join('\n');

    sections.push(
      [
        `## PHẠM VI TOÀN HỌC PHẦN (8 UNITS • ${ALL_VOCAB.length} TỪ)`,
        allGrammarSummary,
        `### CHỈ MỤC TỪ VỰNG 8 UNITS\n${compactVocabByUnit}`
      ].join('\n\n')
    );
  }

  // Personalization: weak words from SRS progress
  const scopedWeakWords = getWeakWordsFromProgress(progress, unitScope);
  const allWeakWords =
    unitScope === 'all' ? scopedWeakWords : getWeakWordsFromProgress(progress, 'all');

  if (scopedWeakWords.length > 0 || allWeakWords.length > 0) {
    const lines: string[] = [];
    if (typeof unitScope === 'number' && scopedWeakWords.length > 0) {
      lines.push(
        `Từ hay sai trong Unit ${unitScope} (ưu tiên giải thích kỹ và lồng vào câu hỏi):`,
        ...scopedWeakWords
          .slice(0, 15)
          .map(
            ({ item, progress: wp }) =>
              `- ${item.word} (${item.pos}) ${item.ipa}: ${item.meaning} — đã sai ${wp.wrongCount} lần, Lv ${wp.level}`
          )
      );
    }

    const secondaryList =
      unitScope === 'all'
        ? allWeakWords.slice(0, 20)
        : allWeakWords.filter((w) => w.item.unit !== unitScope).slice(0, 8);

    if (secondaryList.length > 0) {
      lines.push(
        unitScope === 'all'
          ? 'Các từ người học hay làm sai (wrongCount > 0):'
          : 'Một số từ hay sai khác ở các Unit khác:',
        ...secondaryList.map(
          ({ item, progress: wp }) =>
            `- ${item.word} (Unit ${item.unit}, ${item.pos}): ${item.meaning} — sai ${wp.wrongCount} lần, Lv ${wp.level}`
        )
      );
    }

    sections.push(`## CÁ NHÂN HOÁ THEO TIẾN ĐỘ SRS\n${lines.join('\n')}`);
  }

  // Focus word context
  if (focusWord) {
    const wp = progress[focusWord.id];
    const srsNote = wp
      ? `Lv ${wp.level}, sai ${wp.wrongCount} lần`
      : 'Lv 0 (chưa học)';
    sections.push(
      [
        '## TỪ VỰNG ĐANG ĐƯỢC CHỌN TẬP TRUNG',
        `- Từ: **${focusWord.word}** (${focusWord.pos}) ${focusWord.ipa}`,
        `- Nghĩa: ${focusWord.meaning}`,
        `- Unit ${focusWord.unit} • Chủ đề: ${focusWord.topic}`,
        `- Trạng thái SRS hiện tại: ${srsNote}`,
        focusWord.synonyms?.length ? `- Đồng nghĩa: ${focusWord.synonyms.join(', ')}` : '',
        focusWord.wordFamily?.length ? `- Word family: ${focusWord.wordFamily.join(', ')}` : '',
        `- Ví dụ giáo trình: "${focusWord.example}"`
      ]
        .filter(Boolean)
        .join('\n')
    );
  }

  // Mode instructions
  sections.push(`## HƯỚNG DẪN CHẾ ĐỘ HOẠT ĐỘNG\n${formatModeInstructions(mode, unitScope)}`);

  return sections.join('\n\n');
}

export function parseSseChunk(
  rawChunk: string,
  previousRemainder = '',
  flush = false
): ParsedSseResult {
  const combined = previousRemainder + rawChunk;
  const parts = combined.split('\n');
  const completeLines = flush ? parts : parts.slice(0, -1);
  const remainder = flush ? '' : parts[parts.length - 1] ?? '';

  let textDelta = '';
  let done = false;
  let error: string | undefined;

  for (const rawLine of completeLines) {
    const line = rawLine.replace(/\r$/, '').trim();
    if (!line || line.startsWith(':')) continue;
    if (!line.startsWith('data:')) continue;

    const payload = line.slice(5).trim();
    if (!payload) continue;

    if (payload === '[DONE]') {
      done = true;
      continue;
    }

    try {
      const parsed = JSON.parse(payload) as {
        error?: { message?: string };
        choices?: Array<{
          delta?: { content?: string | null };
          message?: { content?: string | null };
        }>;
      };

      if (parsed.error?.message) {
        error = parsed.error.message;
        continue;
      }

      const choice = parsed.choices?.[0];
      const deltaContent = choice?.delta?.content ?? choice?.message?.content;
      if (typeof deltaContent === 'string' && deltaContent.length > 0) {
        textDelta += deltaContent;
      }
    } catch {
      // Ignore malformed non-JSON SSE control frames
    }
  }

  return {
    textDelta,
    done,
    remainder,
    ...(error ? { error } : {})
  };
}

async function mapHttpErrorToAiClientError(
  response: Response,
  model: string
): Promise<AiClientError> {
  let rawMessage = '';
  try {
    const text = await response.text();
    if (text) {
      try {
        const json = JSON.parse(text) as { error?: { message?: string }; message?: string };
        rawMessage = json.error?.message ?? json.message ?? text;
      } catch {
        rawMessage = text;
      }
    }
  } catch {
    // Ignore body read error
  }

  if (response.status === 402) {
    return new AiClientError(
      `Model "${model}" yêu cầu thanh toán trên TokenHarbor (HTTP 402 Payment Required). Hãy chuyển sang model miễn phí "deepseek-v4.1-flash:free" để tiếp tục học ngay.`,
      { code: 'PAYMENT_REQUIRED', status: 402, model }
    );
  }

  if (response.status === 401 || response.status === 403) {
    return new AiClientError(
      `API Key không hợp lệ hoặc không có quyền truy cập (${response.status}). Vui lòng kiểm tra lại API Key trong Cài đặt.`,
      { code: 'UNAUTHORIZED', status: response.status, model }
    );
  }

  if (response.status === 429) {
    return new AiClientError(
      'Hệ thống AI đang quá tải hoặc vượt giới hạn lượt gọi (HTTP 429). Vui lòng đợi vài giây rồi thử lại.',
      { code: 'RATE_LIMIT', status: 429, model }
    );
  }

  const detail = rawMessage ? ` — ${rawMessage.slice(0, 180)}` : '';
  return new AiClientError(
    `Yêu cầu tới TokenHarbor thất bại (HTTP ${response.status})${detail}.`,
    { code: 'HTTP_ERROR', status: response.status, model }
  );
}

export async function streamTutorCompletion({
  apiKey,
  baseUrl,
  model,
  messages,
  signal,
  temperature = 0.5,
  maxTokens,
  onDelta
}: StreamTutorCompletionParams): Promise<{ content: string; model: string }> {
  const cleanKey = apiKey.trim();
  const activeModel = (model ?? '').trim() || DEFAULT_AI_MODEL;

  if (!cleanKey) {
    throw new AiClientError(
      'Chưa có API Key TokenHarbor. Vui lòng nhập API Key trong mục Cài đặt.',
      { code: 'INVALID_CONFIG', model: activeModel }
    );
  }

  const url = buildChatCompletionsUrl(baseUrl);
  const requestBody: Record<string, unknown> = {
    model: activeModel,
    messages,
    stream: true,
    temperature
  };
  if (typeof maxTokens === 'number' && maxTokens > 0) {
    requestBody.max_tokens = maxTokens;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new AiClientError('Đã dừng tạo phản hồi.', { code: 'ABORTED', model: activeModel });
    }
    throw new AiClientError(
      'Không thể kết nối tới máy chủ TokenHarbor. Vui lòng kiểm tra mạng Internet hoặc Base URL.',
      { code: 'NETWORK', model: activeModel }
    );
  }

  if (!response.ok) {
    throw await mapHttpErrorToAiClientError(response, activeModel);
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json') && !contentType.includes('text/event-stream')) {
    const json = (await response.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string }; delta?: { content?: string } }>;
      error?: { message?: string };
    };
    if (json.error?.message) {
      throw new AiClientError(json.error.message, {
        code: 'STREAM_ERROR',
        model: activeModel
      });
    }
    const text = json.choices?.[0]?.message?.content ?? json.choices?.[0]?.delta?.content ?? '';
    if (text && onDelta) {
      onDelta(text, text);
    }
    return { content: text, model: json.model ?? activeModel };
  }

  if (!response.body) {
    const fallbackText = await response.text();
    const parsed = parseSseChunk(fallbackText, '', true);
    if (parsed.error) {
      throw new AiClientError(parsed.error, { code: 'STREAM_ERROR', model: activeModel });
    }
    if (parsed.textDelta && onDelta) {
      onDelta(parsed.textDelta, parsed.textDelta);
    }
    return { content: parsed.textDelta, model: activeModel };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let remainder = '';
  let accumulated = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunkText = decoder.decode(value, { stream: true });
      const parsed = parseSseChunk(chunkText, remainder, false);
      remainder = parsed.remainder;

      if (parsed.error) {
        throw new AiClientError(parsed.error, { code: 'STREAM_ERROR', model: activeModel });
      }

      if (parsed.textDelta) {
        accumulated += parsed.textDelta;
        onDelta?.(parsed.textDelta, accumulated);
      }

      if (parsed.done) {
        break;
      }
    }

    const trailingText = decoder.decode();
    if (trailingText || remainder) {
      const flushed = parseSseChunk(trailingText, remainder, true);
      if (flushed.error) {
        throw new AiClientError(flushed.error, { code: 'STREAM_ERROR', model: activeModel });
      }
      if (flushed.textDelta) {
        accumulated += flushed.textDelta;
        onDelta?.(flushed.textDelta, accumulated);
      }
    }
  } catch (err) {
    if (err instanceof AiClientError) {
      throw err;
    }
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new AiClientError('Đã dừng tạo phản hồi.', { code: 'ABORTED', model: activeModel });
    }
    throw new AiClientError('Kết nối luồng dữ liệu AI bị gián đoạn.', {
      code: 'STREAM_ERROR',
      model: activeModel
    });
  } finally {
    reader.releaseLock();
  }

  return { content: accumulated, model: activeModel };
}

export async function testAiConnection({
  apiKey,
  baseUrl,
  model,
  signal
}: TestAiConnectionParams): Promise<TestAiConnectionResult> {
  const cleanKey = apiKey.trim();
  const activeModel = (model ?? '').trim() || DEFAULT_AI_MODEL;

  if (!cleanKey) {
    return {
      ok: false,
      code: 'INVALID_CONFIG',
      message: 'Vui lòng nhập API Key trước khi kiểm tra kết nối.'
    };
  }

  const url = buildChatCompletionsUrl(baseUrl);
  const startedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: activeModel,
        messages: [{ role: 'user', content: 'Reply with OK.' }],
        stream: false,
        max_tokens: 16,
        temperature: 0
      }),
      signal
    });

    if (!response.ok) {
      const mapped = await mapHttpErrorToAiClientError(response, activeModel);
      return {
        ok: false,
        code: mapped.code,
        status: mapped.status,
        message: mapped.message
      };
    }

    const json = (await response.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (json.error?.message) {
      return {
        ok: false,
        code: 'STREAM_ERROR',
        message: json.error.message
      };
    }

    const finishedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const reply = (json.choices?.[0]?.message?.content ?? 'OK').trim();

    return {
      ok: true,
      latencyMs: Math.max(1, Math.round(finishedAt - startedAt)),
      model: json.model ?? activeModel,
      replyPreview: reply.slice(0, 80)
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        ok: false,
        code: 'ABORTED',
        message: 'Đã huỷ kiểm tra kết nối.'
      };
    }
    return {
      ok: false,
      code: 'NETWORK',
      message: 'Không thể kết nối tới TokenHarbor. Vui lòng kiểm tra Internet hoặc Base URL.'
    };
  }
}

/* ============================================================================
 * Phase 2 AI Helpers: JSON Parsing, Guided Writing Coach & Card Role-play Grader
 * ========================================================================== */

function isPlainJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractBalancedJsonObject(text: string): string | null {
  const start = text.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
    } else if (ch === '{') {
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return null;
}

export function parseAiJsonObject<T = Record<string, unknown>>(raw: string): T | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const candidates: string[] = [];

  // 1. Prefer fenced ```json ... ``` or ``` ... ``` block if present
  const fenceMatches = trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi);
  for (const match of fenceMatches) {
    const inner = match[1]?.trim();
    if (inner) candidates.push(inner);
  }

  // 2. Also try raw trimmed string (stripping outer fence markers if unclosed)
  const unfenced = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  if (unfenced) {
    candidates.push(unfenced);
  }

  // 3. Try balanced {...} extraction from raw or unfenced text
  const balancedFromUnfenced = extractBalancedJsonObject(unfenced);
  if (balancedFromUnfenced) candidates.push(balancedFromUnfenced);

  const balancedFromRaw = extractBalancedJsonObject(trimmed);
  if (balancedFromRaw) candidates.push(balancedFromRaw);

  for (const candidate of candidates) {
    try {
      const parsed: unknown = JSON.parse(candidate);
      if (isPlainJsonObject(parsed)) {
        return parsed as T;
      }
    } catch {
      // Try next candidate
    }
  }

  return null;
}

interface RequestChatCompletionParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  messages: ChatCompletionMessage[];
  signal?: AbortSignal;
  temperature?: number;
  maxTokens?: number;
}

async function requestChatCompletion({
  apiKey,
  baseUrl,
  model,
  messages,
  signal,
  temperature = 0.3,
  maxTokens = 700
}: RequestChatCompletionParams): Promise<{ content: string; model: string }> {
  const cleanKey = apiKey.trim();
  const activeModel = (model ?? '').trim() || DEFAULT_AI_MODEL;

  if (!cleanKey) {
    throw new AiClientError(
      'Chưa có API Key TokenHarbor. Vui lòng nhập API Key trong mục Cài đặt.',
      { code: 'INVALID_CONFIG', model: activeModel }
    );
  }

  const url = buildChatCompletionsUrl(baseUrl);
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: activeModel,
        messages,
        stream: false,
        temperature,
        max_tokens: maxTokens
      }),
      signal
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new AiClientError('Đã huỷ yêu cầu AI.', { code: 'ABORTED', model: activeModel });
    }
    throw new AiClientError(
      'Không thể kết nối tới máy chủ TokenHarbor. Vui lòng kiểm tra mạng Internet hoặc Base URL.',
      { code: 'NETWORK', model: activeModel }
    );
  }

  if (!response.ok) {
    throw await mapHttpErrorToAiClientError(response, activeModel);
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('text/event-stream')) {
    const rawSse = await response.text();
    const parsedSse = parseSseChunk(rawSse, '', true);
    if (parsedSse.error) {
      throw new AiClientError(parsedSse.error, { code: 'STREAM_ERROR', model: activeModel });
    }
    return { content: parsedSse.textDelta.trim(), model: activeModel };
  }

  const json = (await response.json()) as {
    model?: string;
    choices?: Array<{ message?: { content?: string }; delta?: { content?: string } }>;
    error?: { message?: string };
  };

  if (json.error?.message) {
    throw new AiClientError(json.error.message, {
      code: 'STREAM_ERROR',
      model: activeModel
    });
  }

  const content = (
    json.choices?.[0]?.message?.content ??
    json.choices?.[0]?.delta?.content ??
    ''
  ).trim();

  if (!content) {
    throw new AiClientError('AI không trả về nội dung phản hồi. Vui lòng thử lại.', {
      code: 'STREAM_ERROR',
      model: activeModel
    });
  }

  return { content, model: json.model ?? activeModel };
}

function clampScore(value: unknown, fallback: number): number {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(0, Math.min(10, Math.round(num * 10) / 10));
}

export interface WritingSentenceEvaluation {
  isCorrect: boolean;
  score: number;
  verdictVi: string;
  mistakesVi: string[];
  correctedSentence: string;
  tipVi: string;
}

export interface EvaluateWritingSentenceParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  unitNumber: number;
  step: WritingSentenceStep;
  userSentence: string;
}

export async function evaluateWritingSentence({
  apiKey,
  baseUrl,
  model,
  signal,
  unitNumber,
  step,
  userSentence
}: EvaluateWritingSentenceParams): Promise<WritingSentenceEvaluation> {
  const cleanSentence = userSentence.trim();
  if (!cleanSentence) {
    throw new AiClientError('Vui lòng nhập câu tiếng Anh trước khi chấm.', {
      code: 'INVALID_CONFIG',
      model: (model ?? '').trim() || DEFAULT_AI_MODEL
    });
  }

  const systemPrompt = [
    'Bạn là Gia sư AI Tiếng Anh chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Chấm điểm 1 câu tiếng Anh của sinh viên dựa trên yêu cầu tiếng Việt, trọng tâm ngữ pháp và câu mẫu chuẩn giáo trình.',
    'Chấp nhận các cách diễn đạt tự nhiên khác câu mẫu nếu đúng nghĩa, đúng văn phong kỹ thuật/trang trọng và đạt trọng tâm ngữ pháp.',
    'CHỈ trả về một JSON Object hợp lệ (không thêm markdown thừa), đúng schema sau:',
    '{',
    '  "isCorrect": boolean, // true nếu đạt >= 7.5/10 và đúng nghĩa + cấu trúc cốt lõi',
    '  "score": number, // thang 0 đến 10',
    '  "verdictVi": string, // nhận xét tổng quan ngắn gọn bằng tiếng Việt (1-2 câu)',
    '  "mistakesVi": string[], // danh sách lỗi ngữ pháp/từ vựng/chính tả cụ thể bằng tiếng Việt ([] nếu không có lỗi)',
    '  "correctedSentence": string, // phiên bản tiếng Anh đã sửa chuẩn xác (nếu đã chuẩn thì giữ hoặc tinh chỉnh tự nhiên nhất)',
    '  "tipVi": string // mẹo ghi nhớ cấu trúc/từ vựng ngắn bằng tiếng Việt',
    '}'
  ].join('\n');

  const userPrompt = [
    `Unit ${unitNumber} • Phần: ${step.sectionLabel}`,
    `Nghĩa tiếng Việt cần viết: "${step.vietnamesePrompt}"`,
    `Trọng tâm ngữ pháp/từ vựng: ${step.grammarTargets.join(', ')}`,
    `Câu mẫu tham khảo: "${step.modelSentence}"`,
    `Câu sinh viên viết: "${cleanSentence}"`
  ].join('\n');

  const res = await requestChatCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.2,
    maxTokens: 650,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  const parsed = parseAiJsonObject<Partial<WritingSentenceEvaluation>>(res.content);
  if (!parsed) {
    throw new AiClientError(
      'Phản hồi chấm bài không đúng định dạng JSON. Vui lòng thử bấm chấm lại.',
      { code: 'STREAM_ERROR', model: res.model }
    );
  }

  const score = clampScore(parsed.score, parsed.isCorrect ? 8.5 : 5);
  const isCorrect =
    typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 7.5;
  const mistakesVi = Array.isArray(parsed.mistakesVi)
    ? parsed.mistakesVi.filter((m): m is string => typeof m === 'string' && m.trim().length > 0)
    : [];

  return {
    isCorrect,
    score,
    verdictVi:
      typeof parsed.verdictVi === 'string' && parsed.verdictVi.trim()
        ? parsed.verdictVi.trim()
        : isCorrect
          ? 'Câu viết đạt yêu cầu về nghĩa và cấu trúc ngữ pháp của Unit.'
          : 'Câu viết cần điều chỉnh lại ngữ pháp hoặc từ vựng cho chính xác hơn.',
    mistakesVi,
    correctedSentence:
      typeof parsed.correctedSentence === 'string' && parsed.correctedSentence.trim()
        ? parsed.correctedSentence.trim()
        : step.modelSentence,
    tipVi:
      typeof parsed.tipVi === 'string' && parsed.tipVi.trim()
        ? parsed.tipVi.trim()
        : step.tipVi
  };
}

export interface RequestWritingHintParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  unitNumber: number;
  step: WritingSentenceStep;
  userDraft?: string;
}

export async function requestWritingHint({
  apiKey,
  baseUrl,
  model,
  signal,
  unitNumber,
  step,
  userDraft
}: RequestWritingHintParams): Promise<string> {
  const cleanDraft = (userDraft ?? '').trim();

  const systemPrompt = [
    'Bạn là Gia sư AI Tiếng Anh chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Gợi ý ngắn gọn bằng tiếng Việt kèm 2–4 từ khóa/cụm cấu trúc tiếng Anh để giúp sinh viên tự viết được câu mục tiêu.',
    'QUY TẮC BẮT BUỘC: TUYỆT ĐỐI KHÔNG tiết lộ nguyên văn cả câu mẫu hoàn chỉnh.',
    'Nếu sinh viên đã có bản nháp, hãy chỉ ra nhanh phần nào ổn và chỗ nào cần sửa hoặc bổ sung (tối đa 3 gạch đầu dòng ngắn gọn).'
  ].join('\n');

  const userPrompt = [
    `Unit ${unitNumber} • Phần: ${step.sectionLabel}`,
    `Nghĩa tiếng Việt cần viết: "${step.vietnamesePrompt}"`,
    `Mục tiêu ngữ pháp: ${step.grammarTargets.join(', ')}`,
    `Gợi ý khung từ: ${step.keywordSkeleton}`,
    `Câu mẫu (CHỈ để bạn đối chiếu, KHÔNG chép nguyên văn cho người học): "${step.modelSentence}"`,
    cleanDraft
      ? `Bản nháp hiện tại của sinh viên: "${cleanDraft}"`
      : 'Sinh viên chưa viết nháp, hãy gợi ý cách mở đầu và các cụm từ khóa chính.'
  ].join('\n');

  const res = await requestChatCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.4,
    maxTokens: 320,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  return res.content;
}

export interface ReviewFullWritingEssayParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  task: UnitWritingTask;
  assembledEssay: string;
  onDelta?: (deltaText: string, accumulatedText: string) => void;
}

export async function reviewFullWritingEssay({
  apiKey,
  baseUrl,
  model,
  signal,
  task,
  assembledEssay,
  onDelta
}: ReviewFullWritingEssayParams): Promise<{ content: string; model: string }> {
  const cleanEssay = assembledEssay.trim();
  if (!cleanEssay) {
    throw new AiClientError('Bài viết đang trống. Hãy viết ít nhất một vài câu trước khi chấm tổng thể.', {
      code: 'INVALID_CONFIG',
      model: (model ?? '').trim() || DEFAULT_AI_MODEL
    });
  }

  const systemPrompt = [
    'Bạn là Gia sư AI Tiếng Anh chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Chấm tổng thể toàn bộ bài viết (đoạn văn / email / biên bản họp) của sinh viên đối chiếu với Checklist của Unit.',
    'Trình bày rõ ràng bằng tiếng Việt theo 4 mục ngắn gọn:',
    '1. **Đánh giá tổng quan & Điểm ước lượng (/10)** (mức độ hoàn thành checklist và mạch lạc liên kết câu)',
    '2. **Điểm mạnh đã đạt được**',
    '3. **Lỗi cần sửa & Gợi ý nâng cấp từ vựng/ngữ pháp**',
    '4. **Phiên bản hoàn chỉnh mượt mà hơn** (đặt các câu tiếng Anh rõ ràng để sinh viên đối chiếu)'
  ].join('\n');

  const checklistBlock = task.targetChecklist.map((c, idx) => `${idx + 1}. ${c}`).join('\n');
  const expectedOutline = task.sentences
    .map((s) => `- Câu ${s.order} (${s.sectionLabel}): ${s.vietnamesePrompt}`)
    .join('\n');

  const userPrompt = [
    `Unit ${task.unit} — ${task.title} (${task.taskTypeVi})`,
    `Mục tiêu: ${task.objectiveVi}`,
    `Checklist yêu cầu:\n${checklistBlock}`,
    `Dàn ý 7 câu chuẩn:\n${expectedOutline}`,
    `Bài viết ghép hoàn chỉnh của sinh viên:\n"""\n${cleanEssay}\n"""`
  ].join('\n\n');

  return streamTutorCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.4,
    maxTokens: 1200,
    onDelta,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });
}

function summarizeCardContext(card: SpeakingCard): string {
  const parts: string[] = [
    `Card: ${card.cardCode} — ${card.title}`,
    `Ngữ cảnh: ${card.scenarioVi}`,
    `Vai A: ${card.roleAName} | Vai B: ${card.roleBName}`
  ];

  if (card.rows && card.rows.length > 0) {
    parts.push(
      'Bảng thông tin Cue Card:',
      ...card.rows.map(
        (r) => `- ${r.field}: [A] ${r.studentA} | [B] ${r.studentB}`
      )
    );
  }

  if (card.flowSteps && card.flowSteps.length > 0) {
    parts.push(
      'Lưu đồ hội thoại:',
      ...card.flowSteps.map((s, idx) => `${idx + 1}. [${s.speaker}] ${s.action}`)
    );
  }

  if (card.charts && card.charts.length > 0) {
    parts.push(
      'Dữ liệu biểu đồ:',
      ...card.charts.map((c) => {
        if (c.multiSeries && c.multiSeries.length > 0) {
          const seriesText = c.multiSeries
            .map(
              (ms) =>
                `${ms.name}: ${ms.points.map((p) => `${p.label}=${p.value}`).join(', ')}`
            )
            .join(' | ');
          return `- ${c.title} (${c.unitLabel}): ${seriesText}`;
        }
        return `- ${c.title} (${c.unitLabel}): ${c.points
          .map((p) => `${p.label}=${p.value}`)
          .join(', ')}`;
      })
    );
  }

  return parts.join('\n');
}

export interface CardTurnEvaluation {
  isCorrect: boolean;
  score: number;
  feedbackVi: string;
  improvedLine: string;
  nextHintVi?: string;
}

export interface EvaluateCardTurnParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  userRole: 'A' | 'B';
  card: SpeakingCard;
  partnerLine?: CardDialogueTurn;
  targetTurn: CardDialogueTurn;
  userResponse: string;
  historyTurns: CardDialogueTurn[];
}

export async function evaluateCardTurn({
  apiKey,
  baseUrl,
  model,
  signal,
  userRole,
  card,
  partnerLine,
  targetTurn,
  userResponse,
  historyTurns
}: EvaluateCardTurnParams): Promise<CardTurnEvaluation> {
  const cleanResponse = userResponse.trim();
  if (!cleanResponse) {
    throw new AiClientError('Vui lòng nhập câu thoại tiếng Anh của bạn trước khi kiểm tra.', {
      code: 'INVALID_CONFIG',
      model: (model ?? '').trim() || DEFAULT_AI_MODEL
    });
  }

  const systemPrompt = [
    'Bạn là Giám khảo & Gia sư AI môn Tiếng Anh Chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Chấm 1 lượt nói/viết của sinh viên trong bài Speaking Role-play Card.',
    'Kiểm tra xem sinh viên có truyền đạt ĐÚNG thông tin từ Cue Card/nhiệm vụ lượt nói và dùng ngữ pháp/từ vựng phù hợp không.',
    'Chấp nhận linh hoạt các cách diễn đạt tự nhiên khác câu mẫu miễn là truyền tải đúng dữ kiện cần nói của lượt đó và câu tiếng Anh rõ nghĩa, đúng ngữ pháp cơ bản.',
    'CHỈ trả về một JSON Object hợp lệ theo schema:',
    '{',
    '  "isCorrect": boolean, // true nếu truyền đạt đúng ý/dữ kiện lượt này và ngữ pháp chấp nhận được (>= 7/10)',
    '  "score": number, // thang 0 đến 10',
    '  "feedbackVi": string, // nhận xét cụ thể bằng tiếng Việt (khen điểm đúng hoặc chỉ rõ thiếu dữ kiện/lỗi ngữ pháp nào)',
    '  "improvedLine": string, // 1 câu tiếng Anh tự nhiên, chuẩn xác nhất cho lượt nói này',
    '  "nextHintVi": string // (tùy chọn) gợi ý ngắn bằng tiếng Việt nếu cần sửa lại hoặc lưu ý cho lượt kế tiếp',
    '}'
  ].join('\n');

  const recentHistory = historyTurns
    .slice(-4)
    .map((h) => `${h.roleLabel ?? `Student ${h.speaker}`}: "${h.line}"`)
    .join('\n');

  const userPrompt = [
    summarizeCardContext(card),
    `Sinh viên đang đóng vai: Student ${userRole} (${userRole === 'A' ? card.roleAName : card.roleBName})`,
    recentHistory ? `Hội thoại gần nhất:\n${recentHistory}` : 'Đây là lượt mở đầu hội thoại.',
    partnerLine
      ? `Câu đối tác vừa nói: "${partnerLine.line}" (${partnerLine.translationVi ?? ''})`
      : '',
    `Mục tiêu lượt này của sinh viên: "${targetTurn.translationVi ?? targetTurn.line}"`,
    `Câu mẫu tham khảo: "${targetTurn.line}"`,
    `Câu trả lời của sinh viên: "${cleanResponse}"`
  ]
    .filter(Boolean)
    .join('\n\n');

  const res = await requestChatCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.25,
    maxTokens: 550,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  const parsed = parseAiJsonObject<Partial<CardTurnEvaluation>>(res.content);
  if (!parsed) {
    throw new AiClientError(
      'Phản hồi chấm lượt hội thoại không đúng định dạng JSON. Vui lòng thử lại.',
      { code: 'STREAM_ERROR', model: res.model }
    );
  }

  const score = clampScore(parsed.score, parsed.isCorrect ? 8 : 5);
  const isCorrect =
    typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 7;

  return {
    isCorrect,
    score,
    feedbackVi:
      typeof parsed.feedbackVi === 'string' && parsed.feedbackVi.trim()
        ? parsed.feedbackVi.trim()
        : isCorrect
          ? 'Lượt phản hồi đạt yêu cầu và truyền đạt đúng thông tin trên Card.'
          : 'Bạn cần bổ sung đầy đủ thông tin trên Card hoặc chỉnh lại cấu trúc câu.',
    improvedLine:
      typeof parsed.improvedLine === 'string' && parsed.improvedLine.trim()
        ? parsed.improvedLine.trim()
        : targetTurn.line,
    ...(typeof parsed.nextHintVi === 'string' && parsed.nextHintVi.trim()
      ? { nextHintVi: parsed.nextHintVi.trim() }
      : {})
  };
}

export interface RequestCardTurnHintParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  userRole: 'A' | 'B';
  card: SpeakingCard;
  partnerLine?: CardDialogueTurn;
  targetTurn: CardDialogueTurn;
  userDraft?: string;
}

export async function requestCardTurnHint({
  apiKey,
  baseUrl,
  model,
  signal,
  userRole,
  card,
  partnerLine,
  targetTurn,
  userDraft
}: RequestCardTurnHintParams): Promise<string> {
  const cleanDraft = (userDraft ?? '').trim();

  const systemPrompt = [
    'Bạn là Gia sư AI Tiếng Anh chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Gợi ý nhanh cho lượt nói hiện tại của sinh viên trong Speaking Role-play Card.',
    'Đưa ra: (1) Một cụm mở đầu câu ngắn bằng tiếng Anh (3–6 từ) + (2) Từ vựng/dữ kiện cốt lõi cần nhắc tới.',
    'KHÔNG viết ra nguyên văn cả câu mẫu hoàn chỉnh. Trả lời cực kỳ súc tích (2–3 dòng).'
  ].join('\n');

  const userPrompt = [
    summarizeCardContext(card),
    `Vai sinh viên: Student ${userRole} (${userRole === 'A' ? card.roleAName : card.roleBName})`,
    partnerLine ? `Câu đối tác vừa nói: "${partnerLine.line}"` : '',
    `Ý cần nói ở lượt này: "${targetTurn.translationVi ?? ''}"`,
    `Câu mẫu (CHỈ để bạn nắm ý, KHÔNG chép nguyên văn): "${targetTurn.line}"`,
    cleanDraft ? `Sinh viên đang gõ dở: "${cleanDraft}"` : ''
  ]
    .filter(Boolean)
    .join('\n');

  const res = await requestChatCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.4,
    maxTokens: 250,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  return res.content;
}

/* ============================================================================
 * Single-Sheet Cue Card Sheet Evaluation (Questions & Answers inside Cue Card)
 * ========================================================================== */

export interface EvaluateCardSheetItemParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  userRole: 'A' | 'B';
  card: SpeakingCard;
  fieldLabel: string;
  taskKind: 'question' | 'answer' | 'step';
  cueInfo?: string;
  referenceLine?: string;
  userInput: string;
}

export async function evaluateCardSheetItem({
  apiKey,
  baseUrl,
  model,
  signal,
  userRole,
  card,
  fieldLabel,
  taskKind,
  cueInfo,
  referenceLine,
  userInput
}: EvaluateCardSheetItemParams): Promise<CardTurnEvaluation> {
  const cleanInput = userInput.trim();
  if (!cleanInput) {
    throw new AiClientError('Vui lòng nhập câu hỏi hoặc câu trả lời của bạn vào ô trước khi chấm.', {
      code: 'INVALID_CONFIG',
      model: (model ?? '').trim() || DEFAULT_AI_MODEL
    });
  }

  const systemPrompt = [
    'Bạn là Giám khảo & Gia sư AI môn Tiếng Anh Chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Chấm 1 mục do sinh viên tự điền trên Phiếu Cue Card cá nhân (có thể là Câu hỏi để hỏi bạn cùng cặp, Câu trả lời cung cấp thông tin, hoặc Lượt thoại theo lưu đồ).',
    'Chấm linh hoạt theo ngữ nghĩa & ngữ pháp chuẩn. Không yêu cầu giống y hệt từng chữ với câu mẫu miễn là hỏi/trả lời đúng thông tin mục đó.',
    'CHỈ trả về đúng 1 JSON Object hợp lệ:',
    '{',
    '  "isCorrect": boolean,',
    '  "score": number,',
    '  "feedbackVi": string,',
    '  "improvedLine": string',
    '}'
  ].join('\n');

  const taskLabel =
    taskKind === 'question'
      ? 'Sinh viên phải tự đặt CÂU HỎI tiếng Anh để hỏi đối tác lấy thông tin cho mục này.'
      : taskKind === 'step'
        ? 'Sinh viên phải viết CÂU THOẠI tiếng Anh thực hiện đúng bước trong lưu đồ.'
        : 'Sinh viên phải viết CÂU TRẢ LỜI / MÔ TẢ tiếng Anh đúng thông tin gợi ý trên phiếu.';

  const userPrompt = [
    summarizeCardContext(card),
    `Vai đang luyện: Student ${userRole} (${userRole === 'A' ? card.roleAName : card.roleBName})`,
    `Mục trên phiếu: ${fieldLabel}`,
    `Yêu cầu của mục: ${taskLabel}`,
    cueInfo ? `Dữ kiện liên quan: ${cueInfo}` : '',
    referenceLine ? `Đáp án tham khảo: "${referenceLine}"` : '',
    `Bài làm của sinh viên: "${cleanInput}"`
  ]
    .filter(Boolean)
    .join('\n\n');

  const res = await requestChatCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.2,
    maxTokens: 450,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  const parsed = parseAiJsonObject<Partial<CardTurnEvaluation>>(res.content);
  if (!parsed) {
    throw new AiClientError('Phản hồi chấm Cue Card không đúng định dạng JSON. Vui lòng thử lại.', {
      code: 'STREAM_ERROR',
      model: res.model
    });
  }

  const score = clampScore(parsed.score, parsed.isCorrect ? 8 : 5);
  const isCorrect =
    typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 7;

  return {
    isCorrect,
    score,
    feedbackVi:
      typeof parsed.feedbackVi === 'string' && parsed.feedbackVi.trim()
        ? parsed.feedbackVi.trim()
        : isCorrect
          ? 'Câu của bạn đúng ý và phù hợp ngữ cảnh chuyên ngành.'
          : 'Bạn cần chỉnh lại cấu trúc ngữ pháp hoặc từ khóa cho đúng mục trên phiếu.',
    improvedLine:
      typeof parsed.improvedLine === 'string' && parsed.improvedLine.trim()
        ? parsed.improvedLine.trim()
        : referenceLine ?? cleanInput
  };
}

export interface ReviewFullCardSheetParams {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  signal?: AbortSignal;
  userRole: 'A' | 'B';
  card: SpeakingCard;
  entries: Array<{ label: string; userText: string; expectedText?: string }>;
  onDelta?: (delta: string, fullText: string) => void;
}

export async function reviewFullCardSheet({
  apiKey,
  baseUrl,
  model,
  signal,
  userRole,
  card,
  entries,
  onDelta
}: ReviewFullCardSheetParams): Promise<{ content: string; model: string }> {
  const systemPrompt = [
    'Bạn là Gia sư AI môn Tiếng Anh Chuyên ngành Điện – Điện tử (HaUI EEE5).',
    'Nhiệm vụ: Chấm tổng hợp toàn bộ phiếu Cue Card mà sinh viên vừa tự điền.',
    'Trả lời bằng tiếng Việt rõ ràng, có cấu trúc Markdown:',
    '1. Đánh giá tổng quan & Điểm ước lượng (/10)',
    '2. Nhận xét từng mục sinh viên đã viết (chỉ rõ mục nào đạt, mục nào sai/thiếu ý)',
    '3. Gợi ý cách diễn đạt tự nhiên hơn cho bài thi nói.'
  ].join('\n');

  const formattedEntries = entries
    .map(
      (item, idx) =>
        `${idx + 1}. [${item.label}]\n   - Sinh viên viết: "${item.userText.trim() || '(Chưa điền)'}"${
          item.expectedText ? `\n   - Tham khảo chuẩn: "${item.expectedText}"` : ''
        }`
    )
    .join('\n');

  const userPrompt = [
    summarizeCardContext(card),
    `Vai sinh viên đang đóng: Student ${userRole} (${userRole === 'A' ? card.roleAName : card.roleBName})`,
    `Phiếu bài làm của sinh viên:\n${formattedEntries}`
  ].join('\n\n');

  return streamTutorCompletion({
    apiKey,
    baseUrl,
    model,
    signal,
    temperature: 0.35,
    maxTokens: 1200,
    onDelta,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });
}
