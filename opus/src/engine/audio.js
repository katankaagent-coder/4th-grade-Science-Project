// Synthesized sound effects (no files) using the Web Audio API.
export class Audio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.sfxVolume = 0.5;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.sfxVolume;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _osc(type, freq, t0, dur, vol = 0.3, { to, attack = 0.01, out = this.master } = {}) {
    const c = this.ctx;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(out);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  _noise(t0, dur, vol = 0.3, { freq = 1200, q = 1, type = 'bandpass', sweepTo } = {}) {
    const c = this.ctx;
    const len = Math.ceil(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t0);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t0 + dur);
    f.Q.value = q;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t0);
  }

  sfx(name) {
    if (this.muted) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime + 0.01;
    const fn = SFX[name];
    if (fn) fn.call(this, t);
  }
}

const N = { C5: 523.25, E5: 659.25, G5: 783.99, C6: 1046.5, Eb4: 311.13, D4: 293.66, Db4: 277.18, Bb3: 233.08, A4: 440, E6: 1318.5, G4: 392 };

const SFX = {
  // Triumphant brass-like fanfare: C5 E5 G5 then a held C6 chord.
  win(t) {
    const notes = [N.C5, N.E5, N.G5];
    notes.forEach((f, i) => {
      this._osc('sawtooth', f, t + i * 0.11, 0.18, 0.12);
      this._osc('square', f / 2, t + i * 0.11, 0.18, 0.05);
    });
    const end = t + 0.33;
    [N.C6, N.G5, N.E5, N.C5].forEach((f) => {
      this._osc('sawtooth', f, end, 0.75, 0.09, { attack: 0.02 });
      this._osc('triangle', f * 1.003, end, 0.8, 0.08, { attack: 0.02 });
    });
    this._osc('sine', N.E6, end + 0.1, 0.5, 0.05);
  },
  // Classic sad trombone "wah wah wah waaah".
  wrong(t) {
    [N.Eb4, N.D4, N.Db4].forEach((f, i) => this._osc('sawtooth', f, t + i * 0.28, 0.26, 0.1, { attack: 0.03 }));
    this._osc('sawtooth', N.Bb3, t + 0.84, 0.7, 0.1, { to: N.Bb3 * 0.94, attack: 0.03 });
    this._osc('triangle', N.Bb3 / 2, t + 0.84, 0.7, 0.08, { attack: 0.03 });
  },
  pop(t) { this._osc('sine', 600, t, 0.12, 0.3, { to: 1200 }); },
  click(t) { this._osc('triangle', 1400, t, 0.05, 0.15); },
  tick(t) { this._osc('square', 2000, t, 0.03, 0.06); },
  chime(t) {
    [N.E5, N.G5, N.C6].forEach((f, i) => this._osc('sine', f, t + i * 0.08, 0.6, 0.12));
  },
  sparkle(t) {
    for (let i = 0; i < 6; i++) this._osc('sine', 1500 + Math.random() * 1500, t + i * 0.05, 0.25, 0.06);
  },
  splash(t) {
    this._noise(t, 0.5, 0.5, { freq: 900, q: 0.6, sweepTo: 300 });
    this._osc('sine', 300, t, 0.2, 0.15, { to: 90 });
  },
  bubble(t) {
    for (let i = 0; i < 4; i++) this._osc('sine', 400 + Math.random() * 300, t + i * 0.07, 0.08, 0.1, { to: 900 });
  },
  clank(t) {
    [820, 1230, 1890].forEach((f) => this._osc('square', f, t, 0.25, 0.06));
    this._noise(t, 0.08, 0.3, { freq: 3000, q: 2 });
  },
  thud(t) {
    this._osc('sine', 120, t, 0.3, 0.5, { to: 45 });
    this._noise(t, 0.12, 0.25, { freq: 200, type: 'lowpass' });
  },
  whoosh(t) { this._noise(t, 0.6, 0.35, { freq: 400, q: 1.5, sweepTo: 2400 }); },
  magnet(t) {
    this._osc('sawtooth', 110, t, 0.4, 0.08, { to: 220 });
    this._osc('sine', 880, t + 0.3, 0.15, 0.15);
  },
  zap(t) {
    this._noise(t, 0.25, 0.3, { freq: 3500, q: 4 });
    this._osc('sawtooth', 1800, t, 0.2, 0.06, { to: 200 });
  },
  wind(t) { this._noise(t, 1.6, 0.25, { freq: 500, q: 0.8, sweepTo: 900 }); },
  rain(t) { this._noise(t, 1.6, 0.25, { freq: 5000, q: 0.5, type: 'highpass' }); },
  level(t) {
    [N.C5, N.E5, N.G5, N.C6, N.E6].forEach((f, i) => this._osc('triangle', f, t + i * 0.09, 0.35, 0.12));
  },
};
