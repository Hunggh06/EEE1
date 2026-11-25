import type { AppSettings } from '../types/vocab';

export function isSpeechSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );
}

export function getAvailableEnglishVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  try {
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((voice) => voice.lang.toLowerCase().startsWith('en'))
      .sort((a, b) => {
        if (a.localService !== b.localService) {
          return a.localService ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  } catch {
    return [];
  }
}

function matchesAccent(voice: SpeechSynthesisVoice, accent: 'en-US' | 'en-GB'): boolean {
  const normalizedLang = voice.lang.replace('_', '-').toLowerCase();
  const target = accent.toLowerCase();
  return normalizedLang === target || normalizedLang.startsWith(`${target}-`);
}

export function selectBestVoice(
  voices: SpeechSynthesisVoice[],
  preferredAccent: 'en-US' | 'en-GB',
  selectedVoiceURI?: string
): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  if (selectedVoiceURI) {
    const explicit = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (explicit) return explicit;
  }

  const preferredMatches = voices.filter((v) => matchesAccent(v, preferredAccent));
  if (preferredMatches.length > 0) {
    return preferredMatches.find((v) => v.default) ?? preferredMatches[0];
  }

  const fallbackAccent: 'en-US' | 'en-GB' = preferredAccent === 'en-US' ? 'en-GB' : 'en-US';
  const fallbackMatches = voices.filter((v) => matchesAccent(v, fallbackAccent));
  if (fallbackMatches.length > 0) {
    return fallbackMatches.find((v) => v.default) ?? fallbackMatches[0];
  }

  return voices.find((v) => v.lang.toLowerCase().startsWith('en')) ?? voices[0];
}

function scoreVietnameseVoice(voice: SpeechSynthesisVoice): number {
  const lower = voice.name.toLowerCase();
  if (
    lower.includes('natural') ||
    lower.includes('online') ||
    lower.includes('hoaimy') ||
    lower.includes('namminh')
  ) {
    return 0;
  }
  if (lower.includes('google')) return 1;
  if (voice.localService) return 2;
  return 3;
}

export function getAvailableVietnameseVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  try {
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((voice) => voice.lang.replace('_', '-').toLowerCase().startsWith('vi'))
      .sort((a, b) => {
        const diff = scoreVietnameseVoice(a) - scoreVietnameseVoice(b);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
  } catch {
    return [];
  }
}

export function selectBestVietnameseVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  const sorted = [...voices].sort((a, b) => {
    const diff = scoreVietnameseVoice(a) - scoreVietnameseVoice(b);
    return diff !== 0 ? diff : a.name.localeCompare(b.name);
  });
  return sorted[0] ?? null;
}

export interface SpeakCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

function dispatchUtterance(
  cleanText: string,
  options: {
    voice: SpeechSynthesisVoice | null;
    fallbackLang: string;
    rate: number;
    pitch?: number;
  },
  callbacks?: SpeakCallbacks
): boolean {
  try {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (options.voice) {
      utterance.voice = options.voice;
      utterance.lang = options.voice.lang;
    } else {
      utterance.lang = options.fallbackLang;
    }

    utterance.rate = options.rate;
    utterance.pitch = options.pitch ?? 1.0;

    if (callbacks?.onStart) {
      utterance.onstart = () => callbacks.onStart?.();
    }
    if (callbacks?.onEnd) {
      utterance.onend = () => callbacks.onEnd?.();
    }
    utterance.onerror = () => {
      callbacks?.onError?.();
      callbacks?.onEnd?.();
    };

    synth.speak(utterance);
    return true;
  } catch {
    callbacks?.onError?.();
    callbacks?.onEnd?.();
    return false;
  }
}

export function speakText(
  text: string,
  settings: Pick<AppSettings, 'speechRate' | 'preferredAccent' | 'selectedVoiceURI'>,
  callbacks?: SpeakCallbacks
): boolean {
  const cleanText = text.trim();
  if (!cleanText || !isSpeechSupported()) {
    callbacks?.onEnd?.();
    return false;
  }

  const voices = getAvailableEnglishVoices();
  const voice = selectBestVoice(voices, settings.preferredAccent, settings.selectedVoiceURI);
  return dispatchUtterance(
    cleanText,
    {
      voice,
      fallbackLang: settings.preferredAccent,
      rate: settings.speechRate,
      pitch: 1.0
    },
    callbacks
  );
}

export function speakVietnameseText(
  text: string,
  rate = 1.0,
  callbacks?: SpeakCallbacks
): boolean {
  const cleanText = text.trim();
  if (!cleanText || !isSpeechSupported()) {
    callbacks?.onEnd?.();
    return false;
  }

  const voices = getAvailableVietnameseVoices();
  const voice = selectBestVietnameseVoice(voices);
  return dispatchUtterance(
    cleanText,
    {
      voice,
      fallbackLang: 'vi-VN',
      rate: Math.max(0.85, Math.min(1.15, rate)),
      pitch: 1.04
    },
    callbacks
  );
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore errors when speech synthesis cannot be cancelled
  }
}

export function subscribeVoicesChanged(listener: () => void): () => void {
  if (!isSpeechSupported()) return () => {};
  const synth = window.speechSynthesis;
  const handler = () => listener();
  if (typeof synth.addEventListener === 'function') {
    synth.addEventListener('voiceschanged', handler);
    return () => synth.removeEventListener('voiceschanged', handler);
  }
  const prev = synth.onvoiceschanged;
  synth.onvoiceschanged = handler;
  return () => {
    if (synth.onvoiceschanged === handler) {
      synth.onvoiceschanged = prev ?? null;
    }
  };
}
