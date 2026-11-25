import { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { AppSettings } from '../../types/vocab';
import { isSpeechSupported, speakText, speakVietnameseText } from '../../utils/speech';

interface SpeakButtonProps {
  text: string;
  settings: Pick<AppSettings, 'speechRate' | 'preferredAccent' | 'selectedVoiceURI'>;
  lang?: 'en' | 'vi';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  title?: string;
  className?: string;
}

export function SpeakButton({
  text,
  settings,
  lang = 'en',
  label,
  size = 'md',
  variant = 'outline',
  title = 'Nghe phát âm',
  className = ''
}: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mountedRef = useRef(true);
  const supported = isSpeechSupported();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!supported) return;
    const callbacks = {
      onStart: () => {
        if (mountedRef.current) setIsSpeaking(true);
      },
      onEnd: () => {
        if (mountedRef.current) setIsSpeaking(false);
      },
      onError: () => {
        if (mountedRef.current) setIsSpeaking(false);
      }
    };

    if (lang === 'vi') {
      const viRate = settings.speechRate === 0.8 ? 0.9 : 1.0;
      speakVietnameseText(text, viRate, callbacks);
      return;
    }

    speakText(text, settings, callbacks);
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2.5 text-sm font-semibold gap-2'
  }[size];

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-xs',
    outline:
      'bg-white text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/60 border border-slate-200',
    ghost:
      'bg-transparent text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-transparent'
  }[variant];

  return (
    <button
      type="button"
      data-sound="none"
      onClick={handleClick}
      disabled={!supported}
      title={supported ? title : 'Trình duyệt không hỗ trợ Web Speech API'}
      aria-label={label ? `${title}: ${label}` : `${title}: ${text}`}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-ring ${sizeClasses} ${variantClasses} ${
        isSpeaking ? 'ring-2 ring-blue-500/40 bg-blue-50 text-blue-700' : ''
      } ${!supported ? 'opacity-45' : ''} ${className}`}
    >
      <Volume2 className={`${iconSize} ${isSpeaking ? 'animate-pulse' : ''}`} aria-hidden="true" />
      {label && <span>{label}</span>}
    </button>
  );
}
