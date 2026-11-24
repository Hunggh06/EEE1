import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import type { AppSettings, VocabItem } from '../../types/vocab';
import { playFlipSound } from '../../utils/soundEffects';
import { speakText } from '../../utils/speech';
import { HighlightedExample } from '../common/HighlightedExample';
import { SpeakButton } from '../common/SpeakButton';

interface Flashcard3DProps {
  cards: VocabItem[];
  settings: AppSettings;
  onFinishStage1: () => void;
}

export function Flashcard3D({ cards, settings, onFinishStage1 }: Flashcard3DProps) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[index];
  const isLast = index === cards.length - 1;

  // Auto-pronounce when a new flashcard appears
  useEffect(() => {
    if (!currentCard || !settings.autoPlayAudio) return;
    const timer = window.setTimeout(() => {
      speakText(currentCard.word, settings);
    }, 120);
    return () => window.clearTimeout(timer);
    // Only auto-trigger when card index changes or card id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard?.id, index]);

  const goPrev = () => {
    if (index > 0) {
      setIsFlipped(false);
      setIndex((i) => i - 1);
    }
  };

  const goNext = () => {
    if (!isLast) {
      setIsFlipped(false);
      setIndex((i) => i + 1);
    } else {
      onFinishStage1();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        playFlipSound();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key.toLowerCase() === 'r' && currentCard) {
        e.preventDefault();
        speakText(currentCard.word, settings);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isLast, currentCard, settings]);

  if (!currentCard) return null;

  return (
    <div className="space-y-5">
      {/* Card Counter Dots */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
        <span className="font-semibold tabular-nums">
          Thẻ {index + 1} / {cards.length}
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setIsFlipped(false);
                setIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === index
                  ? 'w-7 bg-blue-600'
                  : idx < index
                    ? 'w-2.5 bg-blue-300'
                    : 'w-2.5 bg-slate-200'
              }`}
              aria-label={`Chuyển đến thẻ ${idx + 1}`}
            />
          ))}
        </div>
        <span className="hidden sm:inline text-xs text-slate-400 font-mono">
          Space: Lật • R: Nghe • ←/→: Chuyển
        </span>
      </div>

      {/* 3D Flip Container */}
      <div className="perspective-1000">
        <div
          role="button"
          tabIndex={0}
          data-sound="custom"
          aria-pressed={isFlipped}
          aria-label={`Thẻ từ vựng ${currentCard.word}. Nhấn Space hoặc click để lật thẻ.`}
          onClick={() => {
            playFlipSound();
            setIsFlipped((f) => !f);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              playFlipSound();
              setIsFlipped((f) => !f);
            }
          }}
          className={`relative w-full preserve-3d transition-transform duration-500 ease-out grid grid-cols-1 focus-ring rounded-3xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE */}
          <div className="col-start-1 row-start-1 backface-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10 min-h-[340px] flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                  {currentCard.topic}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  {currentCard.pos}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Mặt trước • Front
              </span>
            </div>

            <div className="py-8 text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
                {currentCard.word}
              </h2>
              <div className="font-mono text-base sm:text-lg text-slate-500">
                {currentCard.ipa}
              </div>
              <div className="pt-2 flex justify-center">
                <SpeakButton
                  text={currentCard.word}
                  settings={settings}
                  label="Nghe phát âm"
                  size="lg"
                  variant="outline"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-400">
              <RotateCw className="w-4 h-4" aria-hidden="true" />
              <span>Nhấn để lật (Space)</span>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="col-start-1 row-start-1 backface-hidden rotate-y-180 rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-white to-blue-50/40 shadow-sm p-6 sm:p-10 min-h-[340px] flex flex-col justify-between gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{currentCard.word}</span>
                <span className="font-mono text-xs text-slate-500">{currentCard.ipa}</span>
              </div>
              <div className="flex items-center gap-2">
                <SpeakButton
                  text={currentCard.word}
                  settings={settings}
                  size="sm"
                  variant="ghost"
                  title="Nghe lại từ"
                />
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider">
                  Mặt sau • Meaning
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Nghĩa tiếng Việt
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 leading-snug">
                  {currentCard.meaning}
                </div>
              </div>

              {(currentCard.synonyms?.length || currentCard.wordFamily?.length) && (
                <div className="flex flex-wrap gap-2">
                  {currentCard.synonyms && currentCard.synonyms.length > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Đồng nghĩa:</span>
                      <span>{currentCard.synonyms.join(', ')}</span>
                    </div>
                  )}
                  {currentCard.wordFamily && currentCard.wordFamily.length > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Word family:</span>
                      <span>{currentCard.wordFamily.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ví dụ chuyên ngành
                  </span>
                  <SpeakButton
                    text={currentCard.example}
                    settings={settings}
                    label="Nghe câu ví dụ"
                    size="sm"
                    variant="outline"
                  />
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  <HighlightedExample sentence={currentCard.example} targetWord={currentCard.word} />
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Nhấn để lật lại mặt trước (Space)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 text-sm font-semibold transition-colors focus-ring disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Thẻ trước</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFlipped((f) => !f)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 text-sm font-semibold transition-colors focus-ring"
        >
          <RotateCw className="w-4 h-4" aria-hidden="true" />
          <span>{isFlipped ? 'Xem mặt trước' : 'Lật thẻ (Space)'}</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-bold shadow-xs transition-colors focus-ring"
        >
          <span>{isLast ? 'Bắt đầu luyện tập (Stage 2)' : 'Tiếp tục'}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
