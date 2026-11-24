// Web Audio API subtle tactile & feedback sound synthesizer (zero external audio files needed)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function setSoundEffectsEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

export function isSoundEffectsEnabled(): boolean {
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (!soundEnabled || typeof window === 'undefined') return null;

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!audioCtx) {
    try {
      audioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }

  if (audioCtx.state === 'suspended') {
    void audioCtx.resume().catch(() => {
      // Ignore autoplay resume rejection when called outside gesture
    });
  }

  return audioCtx;
}

function scheduleTone(
  ctx: AudioContext,
  options: {
    type?: OscillatorType;
    startFreq: number;
    endFreq?: number;
    startTime: number;
    duration: number;
    peakGain: number;
    lowpassHz?: number;
  }
): void {
  const {
    type = 'sine',
    startFreq,
    endFreq,
    startTime,
    duration,
    peakGain,
    lowpassHz
  } = options;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, startTime);
  if (endFreq !== undefined && endFreq !== startFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);
  }

  // Smooth attack & exponential release to avoid clicks/pops
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + Math.min(0.008, duration * 0.25));
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  if (lowpassHz) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(lowpassHz, startTime);
    osc.connect(filter);
    filter.connect(gain);
  } else {
    osc.connect(gain);
  }

  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

/** Tactile soft glass/wood micro-tap for standard UI buttons */
export function playClickSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  scheduleTone(ctx, {
    type: 'sine',
    startFreq: 640,
    endFreq: 360,
    startTime: now,
    duration: 0.032,
    peakGain: 0.042,
    lowpassHz: 1800
  });
}

/** Soft airy two-tone tick when flipping a 3D flashcard */
export function playFlipSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  scheduleTone(ctx, {
    type: 'triangle',
    startFreq: 360,
    endFreq: 540,
    startTime: now,
    duration: 0.055,
    peakGain: 0.042,
    lowpassHz: 1600
  });
}

/** Light sparkle ping when revealing a letter hint */
export function playHintSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  scheduleTone(ctx, {
    type: 'sine',
    startFreq: 880,
    endFreq: 1046.5,
    startTime: now,
    duration: 0.095,
    peakGain: 0.045
  });
}

/** Warm ascending crystal chime for correct answers (C5 -> E5 + soft G5 shimmer) */
export function playCorrectSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  scheduleTone(ctx, {
    type: 'sine',
    startFreq: 523.25, // C5
    startTime: now,
    duration: 0.14,
    peakGain: 0.075
  });
  scheduleTone(ctx, {
    type: 'sine',
    startFreq: 659.25, // E5
    startTime: now + 0.065,
    duration: 0.22,
    peakGain: 0.08
  });
  scheduleTone(ctx, {
    type: 'triangle',
    startFreq: 783.99, // G5 gentle harmonic
    startTime: now + 0.11,
    duration: 0.22,
    peakGain: 0.03,
    lowpassHz: 2400
  });
}

/** Gentle low soft muted double-tone for incorrect answers (never harsh) */
export function playWrongSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  scheduleTone(ctx, {
    type: 'triangle',
    startFreq: 246.94, // B3
    endFreq: 220,
    startTime: now,
    duration: 0.11,
    peakGain: 0.065,
    lowpassHz: 680
  });
  scheduleTone(ctx, {
    type: 'triangle',
    startFreq: 196.0, // G3
    endFreq: 174.61,
    startTime: now + 0.095,
    duration: 0.16,
    peakGain: 0.06,
    lowpassHz: 560
  });
}

/** Celebratory soft 4-note arpeggio on completing a learning or review session */
export function playCompleteSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, idx) => {
    scheduleTone(ctx, {
      type: 'sine',
      startFreq: freq,
      startTime: now + idx * 0.075,
      duration: idx === notes.length - 1 ? 0.34 : 0.18,
      peakGain: idx === notes.length - 1 ? 0.075 : 0.055
    });
  });
}
