interface ClozeSentenceTextProps {
  clozeSentence: string;
  className?: string;
}

export function ClozeSentenceText({
  clozeSentence,
  className = ''
}: ClozeSentenceTextProps) {
  const parts = clozeSentence.split(/([A-Za-z0-9-]*_[A-Za-z0-9_-]*)/g);

  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.includes('_') ? (
          <span
            key={idx}
            className="inline-block font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded mx-0.5 tracking-wide"
          >
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </span>
  );
}
