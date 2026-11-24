import { useEffect, useRef } from 'react';
import { Lightbulb, SendHorizonal } from 'lucide-react';
import { getHintMaskTokens, getMaxHintRevealCount } from '../../engine/drillingQueue';

interface LetterHintInputProps {
  targetWord: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  revealedCount: number;
  onRevealMore: () => void;
  placeholder?: string;
  feedbackState?: 'correct' | 'incorrect' | null;
}

export function LetterHintInput({
  targetWord,
  value,
  onChange,
  onSubmit,
  disabled,
  revealedCount,
  onRevealMore,
  placeholder = 'Nhập từ hoặc cụm từ tiếng Anh...',
  feedbackState = null
}: LetterHintInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxReveal = getMaxHintRevealCount(targetWord);
  const tokens = revealedCount > 0 ? getHintMaskTokens(targetWord, revealedCount) : [];

  useEffect(() => {
    if (!disabled) {
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => window.clearTimeout(id);
    }
  }, [disabled, targetWord]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !value.trim()) return;
    onSubmit();
  };

  const borderStyle =
    feedbackState === 'correct'
      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900'
      : feedbackState === 'incorrect'
        ? 'border-rose-500 bg-rose-50/40 text-rose-900'
        : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20';

  return (
    <div className="space-y-3">
      {revealedCount > 0 && (
        <div
          className="rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5"
          aria-live="polite"
        >
          <div className="text-xs font-medium text-amber-800 mb-1.5 flex items-center justify-between">
            <span>Gợi ý từng chữ cái ({revealedCount}/{maxReveal} ký tự)</span>
            <span className="font-mono text-[11px] text-amber-700">
              {targetWord.includes(' ') ? `${targetWord.split(' ').length} từ` : `${maxReveal} chữ cái`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1 font-mono text-sm sm:text-base font-semibold">
            {tokens.map((token, idx) => {
              if (token.isSeparator && token.char === ' ') {
                return <span key={idx} className="w-3 inline-block" aria-hidden="true" />;
              }
              if (token.isSeparator && token.char === '-') {
                return (
                  <span key={idx} className="text-amber-700 px-0.5">
                    -
                  </span>
                );
              }
              return (
                <span
                  key={idx}
                  className={`inline-flex items-center justify-center w-6 h-7 sm:w-7 sm:h-8 rounded border text-center ${
                    token.revealed
                      ? 'bg-white border-amber-300 text-slate-900 shadow-2xs'
                      : 'bg-amber-100/60 border-amber-200/80 text-amber-500'
                  }`}
                >
                  {token.char}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="Nhập câu trả lời tiếng Anh"
          className={`flex-1 rounded-xl border px-4 py-3 font-mono text-base transition-all outline-none ${borderStyle} disabled:opacity-80`}
        />
        <div className="flex gap-2">
          <button
            type="button"
            data-sound="custom"
            onClick={onRevealMore}
            disabled={disabled || revealedCount >= maxReveal}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors focus-ring disabled:opacity-45"
            title="Mở thêm 1 chữ cái gợi ý"
          >
            <Lightbulb className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Gợi ý từng chữ cái</span>
          </button>
          <button
            type="submit"
            data-sound="custom"
            disabled={disabled || !value.trim()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors focus-ring disabled:opacity-45 shadow-xs"
          >
            <span>Kiểm tra</span>
            <SendHorizonal className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
