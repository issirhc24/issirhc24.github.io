// Synthesized audio using Web Audio API (zero external assets needed, ultra reliable)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private birthdayLoopTimer: number | null = null;

  private getAudioContextClass(): typeof AudioContext | null {
    if (typeof window === 'undefined') return null;
    return (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext ||
      null
    );
  }

  private async ensureRunning(): Promise<AudioContext | null> {
    try {
      if (typeof window === 'undefined') return null;

      if (!this.ctx) {
        const AudioCtx = this.getAudioContextClass();
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }

      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      return this.ctx && this.ctx.state === 'running' ? this.ctx : this.ctx;
    } catch (e) {
      console.warn('Web Audio ensureRunning error:', e);
      return null;
    }
  }

  public async unlock(): Promise<void> {
    try {
      const ctx = await this.ensureRunning();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Play a 1-sample silent buffer to unlock iOS Safari Web Audio
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);

      // Short silent oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(ctx.currentTime + 0.001);
    } catch (e) {
      console.warn('Web Audio unlock warning:', e);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.birthdayLoopTimer) {
      clearInterval(this.birthdayLoopTimer);
      this.birthdayLoopTimer = null;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Poké Ball Click
  public async playClick(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio playClick error:', e);
    }
  }

  // Poké Ball Wobble / Shake
  public async playWobble(pitch: number = 1): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const baseFreq = 260 * pitch;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(baseFreq + 60, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(baseFreq - 30, ctx.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(baseFreq + 40, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio playWobble error:', e);
    }
  }

  // Poké Ball Open Light Burst
  public async playPokeballOpen(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const now = ctx.currentTime;
      // Chime notes: C5, E5, G5, B5, C6
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } catch (e) {
      console.warn('Audio playPokeballOpen error:', e);
    }
  }

  // Typewriter soft tap
  public async playTypewriterTap(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const freqs = [1200, 1350, 1500, 1650];
      const chosen = freqs[Math.floor(Math.random() * freqs.length)];
      osc.frequency.setValueAtTime(chosen, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.warn('Audio playTypewriterTap error:', e);
    }
  }

  // Mega Evolution Powerup & Climax
  public async playMegaEvolution(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const now = ctx.currentTime;
      
      // Ascending cosmic sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 1.8);

      // Lowpass filter for warm magic aura
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(4000, now + 1.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.4);

      // Climax chime chord
      const chord = [587.33, 739.99, 880, 1174.66, 1479.98];
      chord.forEach((freq) => {
        const chOsc = ctx.createOscillator();
        const chGain = ctx.createGain();
        chOsc.type = 'sine';
        chOsc.frequency.setValueAtTime(freq, now + 1.8);

        chGain.gain.setValueAtTime(0.001, now + 1.8);
        chGain.gain.linearRampToValueAtTime(0.18, now + 1.85);
        chGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        chOsc.connect(chGain);
        chGain.connect(ctx.destination);

        chOsc.start(now + 1.8);
        chOsc.stop(now + 3.2);
      });
    } catch (e) {
      console.warn('Audio playMegaEvolution error:', e);
    }
  }

  // Joyful Music Box / 8-bit Happy Birthday melody
  public async playCelebrationMusic(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const melody: [number, number][] = [
        // [freq, duration in sec]
        [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5], [349.23, 0.5], [329.63, 0.9],
        [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5], [392.00, 0.5], [349.23, 0.9],
        [261.63, 0.25], [261.63, 0.25], [523.25, 0.5], [440.00, 0.5], [349.23, 0.5], [329.63, 0.5], [293.66, 0.8],
        [466.16, 0.25], [466.16, 0.25], [440.00, 0.5], [349.23, 0.5], [392.00, 0.5], [349.23, 1.2]
      ];

      let cursor = ctx.currentTime + 0.1;
      melody.forEach(([freq, dur]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 2, cursor); // Music box octave

        gain.gain.setValueAtTime(0.001, cursor);
        gain.gain.linearRampToValueAtTime(0.12, cursor + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + dur * 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(cursor);
        osc.stop(cursor + dur);
        cursor += dur;
      });
    } catch (e) {
      console.warn('Audio playCelebrationMusic error:', e);
    }
  }

  // Sparkle chime
  public async playSparkle(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const freqs = [1046.5, 1318.51, 1567.98, 2093.0];
      const now = ctx.currentTime;
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.06);

        gain.gain.setValueAtTime(0.08, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.25);
      });
    } catch (e) {
      console.warn('Audio playSparkle error:', e);
    }
  }

  // Pokéball Throw whoosh
  public async playThrow(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      console.warn('Audio playThrow error:', e);
    }
  }

  // Classic Pokémon Catch Click / Lock Sound (Mechanical snap)
  public async playCatchClick(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const now = ctx.currentTime;

      // High mechanical click
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(700, now + 0.04);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.045);

      // Low solid latch
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(320, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(120, now + 0.07);
      gain2.gain.setValueAtTime(0.3, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio playCatchClick error:', e);
    }
  }

  // Classic Pokémon Catch Victory Jingle (Ta-da-da-da-da-daaa!)
  public async playCatchFanfare(): Promise<void> {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureRunning();
      if (!ctx || this.isMuted) return;

      const now = ctx.currentTime;
      // G5, G5, G5, C6 (classic victory chime: Da-da-da-DAAA!)
      const notes: [number, number, number][] = [
        [783.99, 0, 0.11],
        [783.99, 0.13, 0.11],
        [783.99, 0.26, 0.11],
        [1046.50, 0.42, 0.65],
      ];

      notes.forEach(([freq, offset, dur]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + offset);

        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.22, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + dur);
      });
    } catch (e) {
      console.warn('Audio playCatchFanfare error:', e);
    }
  }
}

export const sound = new SoundEngine();
