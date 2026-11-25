import { Smile } from 'lucide-react';
import type { AppSettings } from '../../types/vocab';
import { SpeakButton } from './SpeakButton';

interface VocabMnemonicBoxProps {
  mnemonicVi?: string;
  word: string;
  settings: Pick<AppSettings, 'speechRate' | 'preferredAccent' | 'selectedVoiceURI'>;
  compact?: boolean;
}

export function VocabMnemonicBox({
  mnemonicVi,
  word,
  settings,
  compact = false
}: VocabMnemonicBoxProps) {
  if (!mnemonicVi?.trim()) return null;

  if (compact) {
    return (
      <div className="flex items-start gap-2 rounded-xl bg-amber-50/75 border border-amber-200/80 px-3 py-2 text-xs sm:text-sm text-amber-950">
        <SpeakButton
          text={mnemonicVi}
          settings={settings}
          lang="vi"
          size="sm"
          variant="ghost"
          title={`Nghe mẹo nhớ hài từ "${word}"`}
          className="shrink-0 -ml-1 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
        />
        <div className="leading-relaxed pt-0.5">
          <span className="font-bold text-amber-800 mr-1.5">Mẹo nhớ:</span>
          <span>{mnemonicVi}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 space-y-2 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
          <Smile className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <span>Câu chuyện hài dễ nhớ (vi-VN)</span>
        </span>
        <SpeakButton
          text={mnemonicVi}
          settings={settings}
          lang="vi"
          label="Nghe kể chuyện"
          size="sm"
          variant="outline"
          title={`Nghe câu chuyện hài tiếng Việt cho từ "${word}"`}
          className="border-amber-300 bg-white text-amber-800 hover:bg-amber-100 hover:text-amber-950 hover:border-amber-400"
        />
      </div>
      <p className="text-sm sm:text-base text-amber-950 leading-relaxed font-medium">
        {mnemonicVi}
      </p>
    </div>
  );
}
