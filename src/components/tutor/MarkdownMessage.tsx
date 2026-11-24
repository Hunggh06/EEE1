import { Fragment, memo, useMemo, useState } from 'react';
import { Check, Copy, Volume2 } from 'lucide-react';
import type { AppSettings } from '../../types/vocab';
import { isSpeechSupported, speakText } from '../../utils/speech';

const VIETNAMESE_CHAR_RE =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

const FORMULA_PATTERN_RE = /\b(S|V|O|P2|Adj|Adv|N|Wh-)\s*\+/;

function stripMarkdownSyntax(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/^>\s*/, '')
    .replace(/^#{1,6}\s*/, '')
    .replace(/^[-*•]\s+/, '')
    .replace(/^\d+[.)]\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isPureEnglishSpeakable(text: string): boolean {
  const cleaned = text
    .replace(/^(e\.g\.?|example|ví dụ|vd)\s*:?\s*/i, '')
    .replace(/\/[^/]+\//g, '') // strip IPA slashes
    .trim();

  if (cleaned.length < 4) return false;
  if (VIETNAMESE_CHAR_RE.test(cleaned)) return false;
  if (FORMULA_PATTERN_RE.test(cleaned)) return false;

  const words = cleaned.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];
  if (words.length < 2) return false;
  if (/^(Unit\s+\d+|Mode\s+\w+|HTTP\s+\d+)$/i.test(cleaned)) return false;

  return true;
}

export function extractLineSpeakableEnglish(rawLine: string): string | null {
  const plain = stripMarkdownSyntax(rawLine);
  if (!plain) return null;

  const withoutPrefix = plain
    .replace(/^(e\.g\.?|example|ví dụ|vd)\s*:?\s*/i, '')
    .replace(/^["“']|["”']$/g, '')
    .trim();

  if (isPureEnglishSpeakable(withoutPrefix)) {
    return withoutPrefix.replace(/\/[^/]+\//g, '').replace(/\s+/g, ' ').trim();
  }

  // Fallback: look for quoted English phrases inside mixed Vietnamese/English line
  const quotedMatches = [...plain.matchAll(/["“]([^"”]{6,180})["”]/g)];
  const validQuotes = quotedMatches
    .map((m) => m[1].trim())
    .filter((q) => isPureEnglishSpeakable(q));

  if (validQuotes.length > 0) {
    return validQuotes.join('. ');
  }

  return null;
}

export function extractAllEnglishPhrases(markdown: string): string {
  const lines = markdown.split('\n');
  const snippets: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const candidate = extractLineSpeakableEnglish(line);
    if (candidate) {
      snippets.push(candidate);
    }
  }

  return snippets.slice(0, 6).join('. ');
}

interface InlineSpeakButtonProps {
  text: string;
  settings: Pick<AppSettings, 'speechRate' | 'preferredAccent' | 'selectedVoiceURI'>;
}

function InlineSpeakButton({ text, settings }: InlineSpeakButtonProps) {
  if (!isSpeechSupported()) return null;

  return (
    <button
      type="button"
      data-sound="none"
      onClick={(e) => {
        e.stopPropagation();
        speakText(text, settings);
      }}
      title={`Nghe phát âm: "${text}"`}
      aria-label={`Nghe phát âm câu: ${text}`}
      className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded-md border border-blue-200/80 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-[11px] font-medium align-middle transition-colors focus-ring"
    >
      <Volume2 className="w-3 h-3" aria-hidden="true" />
      <span className="sr-only sm:not-sr-only">Nghe</span>
    </button>
  );
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Matches: [label](url), `code`, **bold**, __bold__, *italic*
  const tokenRe =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*)/g;

  let lastIndex = 0;
  let matchIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${matchIndex++}`;
    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={key}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline underline-offset-2 hover:text-blue-800 break-all"
        >
          {match[2]}
        </a>
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <code
          key={key}
          className="font-mono text-[0.84em] bg-slate-100 text-blue-800 px-1.5 py-0.5 rounded border border-slate-200/80"
        >
          {match[4]}
        </code>
      );
    } else if (match[5] !== undefined || match[6] !== undefined) {
      const boldInner = match[5] ?? match[6] ?? '';
      nodes.push(
        <strong key={key} className="font-bold text-slate-900">
          {renderInline(boldInner, `${key}-b`)}
        </strong>
      );
    } else if (match[7] !== undefined) {
      nodes.push(
        <em key={key} className="italic text-slate-800">
          {match[7]}
        </em>
      );
    }

    lastIndex = tokenRe.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard permission failure
    }
  };

  return (
    <div className="my-2.5 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/90 border-b border-slate-700 text-[11px] font-mono text-slate-300">
        <span>{language || 'text'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>Đã sao chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" aria-hidden="true" />
              <span>Sao chép</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 text-xs font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

type Block =
  | { type: 'code'; language: string; code: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'hr' }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'paragraph'; lines: string[] };

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  return /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?$/.test(trimmed);
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1; // skip closing ```
      blocks.push({ type: 'code', language, code: codeLines.join('\n') });
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2]
      });
      i += 1;
      continue;
    }

    // Table
    if (trimmed.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(trimmed);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim() !== '') {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ type: 'blockquote', lines: quoteLines });
      continue;
    }

    // Unordered list
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph (stop before block starts)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (
        !cur ||
        cur.startsWith('```') ||
        /^#{1,4}\s+/.test(cur) ||
        /^(-{3,}|\*{3,})$/.test(cur) ||
        cur.startsWith('>') ||
        /^[-*•]\s+/.test(cur) ||
        /^\d+[.)]\s+/.test(cur) ||
        (cur.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
      ) {
        break;
      }
      paraLines.push(lines[i]);
      i += 1;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', lines: paraLines });
    }
  }

  return blocks;
}

interface MarkdownMessageProps {
  content: string;
  settings: Pick<AppSettings, 'speechRate' | 'preferredAccent' | 'selectedVoiceURI'>;
  enableSpeechButtons?: boolean;
}

export const MarkdownMessage = memo(function MarkdownMessage({
  content,
  settings,
  enableSpeechButtons = true
}: MarkdownMessageProps) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  return (
    <div className="space-y-2.5 text-sm leading-relaxed text-slate-800 break-words">
      {blocks.map((block, bIdx) => {
        const key = `b-${bIdx}`;

        switch (block.type) {
          case 'code':
            return <CodeBlock key={key} language={block.language} code={block.code} />;

          case 'hr':
            return <hr key={key} className="border-slate-200 my-3" />;

          case 'heading': {
            const cls =
              block.level <= 2
                ? 'text-base font-extrabold text-slate-900 pt-1'
                : 'text-sm font-bold text-slate-900 pt-0.5';
            return (
              <div key={key} className={cls}>
                {renderInline(block.text, key)}
              </div>
            );
          }

          case 'blockquote':
            return (
              <blockquote
                key={key}
                className="border-l-3 border-blue-500 bg-blue-50/50 rounded-r-xl px-3.5 py-2 space-y-1 text-slate-700"
              >
                {block.lines.map((qLine, qIdx) => {
                  const speakCandidate = enableSpeechButtons
                    ? extractLineSpeakableEnglish(qLine)
                    : null;
                  return (
                    <div key={`${key}-q-${qIdx}`}>
                      <span>{renderInline(qLine, `${key}-q-${qIdx}`)}</span>
                      {speakCandidate && (
                        <InlineSpeakButton text={speakCandidate} settings={settings} />
                      )}
                    </div>
                  );
                })}
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={key} className="list-disc pl-5 space-y-1.5">
                {block.items.map((item, itemIdx) => {
                  const speakCandidate = enableSpeechButtons
                    ? extractLineSpeakableEnglish(item)
                    : null;
                  return (
                    <li key={`${key}-li-${itemIdx}`} className="leading-relaxed">
                      <span>{renderInline(item, `${key}-li-${itemIdx}`)}</span>
                      {speakCandidate && (
                        <InlineSpeakButton text={speakCandidate} settings={settings} />
                      )}
                    </li>
                  );
                })}
              </ul>
            );

          case 'ol':
            return (
              <ol key={key} className="list-decimal pl-5 space-y-1.5">
                {block.items.map((item, itemIdx) => {
                  const speakCandidate = enableSpeechButtons
                    ? extractLineSpeakableEnglish(item)
                    : null;
                  return (
                    <li key={`${key}-oli-${itemIdx}`} className="leading-relaxed">
                      <span>{renderInline(item, `${key}-oli-${itemIdx}`)}</span>
                      {speakCandidate && (
                        <InlineSpeakButton text={speakCandidate} settings={settings} />
                      )}
                    </li>
                  );
                })}
              </ol>
            );

          case 'table':
            return (
              <div
                key={key}
                className="overflow-x-auto rounded-xl border border-slate-200 bg-white my-2"
              >
                <table className="min-w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th key={`${key}-h-${hIdx}`} className="px-3 py-2 whitespace-nowrap">
                          {renderInline(h, `${key}-h-${hIdx}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {block.rows.map((row, rIdx) => (
                      <tr key={`${key}-r-${rIdx}`} className="hover:bg-slate-50/60">
                        {block.headers.map((_, cIdx) => (
                          <td key={`${key}-r-${rIdx}-c-${cIdx}`} className="px-3 py-2 align-top">
                            {renderInline(row[cIdx] ?? '', `${key}-r-${rIdx}-c-${cIdx}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'paragraph':
            return (
              <p key={key} className="leading-relaxed">
                {block.lines.map((pLine, pIdx) => {
                  const speakCandidate = enableSpeechButtons
                    ? extractLineSpeakableEnglish(pLine)
                    : null;
                  return (
                    <Fragment key={`${key}-p-${pIdx}`}>
                      {pIdx > 0 && <br />}
                      <span>{renderInline(pLine, `${key}-p-${pIdx}`)}</span>
                      {speakCandidate && (
                        <InlineSpeakButton text={speakCandidate} settings={settings} />
                      )}
                    </Fragment>
                  );
                })}
              </p>
            );
        }
      })}
    </div>
  );
});
