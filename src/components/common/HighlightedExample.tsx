interface HighlightedExampleProps {
  sentence: string;
  targetWord: string;
  className?: string;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function HighlightedExample({
  sentence,
  targetWord,
  className = ''
}: HighlightedExampleProps) {
  const cleanWord = targetWord.trim();
  if (!cleanWord) {
    return <span className={className}>{sentence}</span>;
  }

  const regex = new RegExp(`(${escapeRegExp(cleanWord)})`, 'gi');
  const parts = sentence.split(regex);

  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.toLowerCase() === cleanWord.toLowerCase() ? (
          <mark
            key={idx}
            className="bg-blue-100/90 text-blue-900 font-semibold px-1 py-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </span>
  );
}
