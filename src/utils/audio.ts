// Synthesized audio using Web Audio API (zero external assets needed, ultra reliable)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private birthdayLoopTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
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
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Poké Ball Wobble / Shake
  public playWobble(pitch: number = 1) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const baseFreq = 260 * pitch;
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(baseFreq + 60, this.ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(baseFreq - 30, this.ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(baseFreq + 40, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Poké Ball Open Light Burst
  public playPokeballOpen() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Chime notes: C5, E5, G5, B5, C6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.65);
    });
  }

  // Typewriter soft tap
  public playTypewriterTap() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const freqs = [1200, 1350, 1500, 1650];
    const chosen = freqs[Math.floor(Math.random() * freqs.length)];
    osc.frequency.setValueAtTime(chosen, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // Mega Evolution Powerup & Climax
  public playMegaEvolution() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Ascending cosmic sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 1.8);

    // Lowpass filter for warm magic aura
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 1.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);

    // Climax chime chord
    const chord = [587.33, 739.99, 880, 1174.66, 1479.98];
    chord.forEach((freq) => {
      if (!this.ctx) return;
      const chOsc = this.ctx.createOscillator();
      const chGain = this.ctx.createGain();
      chOsc.type = 'sine';
      chOsc.frequency.setValueAtTime(freq, now + 1.8);

      chGain.gain.setValueAtTime(0.001, now + 1.8);
      chGain.gain.linearRampToValueAtTime(0.18, now + 1.85);
      chGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      chOsc.connect(chGain);
      chGain.connect(this.ctx.destination);

      chOsc.start(now + 1.8);
      chOsc.stop(now + 3.2);
    });
  }

  // Joyful Music Box / 8-bit Happy Birthday melody
  public playCelebrationMusic() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const melody: [number, number][] = [
      // [freq, duration in sec]
      [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5], [349.23, 0.5], [329.63, 0.9],
      [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5], [392.00, 0.5], [349.23, 0.9],
      [261.63, 0.25], [261.63, 0.25], [523.25, 0.5], [440.00, 0.5], [349.23, 0.5], [329.63, 0.5], [293.66, 0.8],
      [466.16, 0.25], [466.16, 0.25], [440.00, 0.5], [349.23, 0.5], [392.00, 0.5], [349.23, 1.2]
    ];

    let cursor = this.ctx.currentTime + 0.1;
    melody.forEach(([freq, dur]) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 2, cursor); // Music box octave

      gain.gain.setValueAtTime(0.001, cursor);
      gain.gain.linearRampToValueAtTime(0.12, cursor + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, cursor + dur * 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(cursor);
      osc.stop(cursor + dur);
      cursor += dur;
    });
  }

  // Sparkle chime
  public playSparkle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const freqs = [1046.5, 1318.51, 1567.98, 2093.0];
    const now = this.ctx.currentTime;
    freqs.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.06);

      gain.gain.setValueAtTime(0.08, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }
}

export const sound = new SoundEngine();
