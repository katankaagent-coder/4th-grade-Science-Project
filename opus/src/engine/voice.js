// Narration: plays the embedded neural voice clip for an exact text, with word timings.
// Falls back to the browser voice when a clip is missing.

let bank = null;
const urls = new Map();

function loadBank() {
  if (bank) return bank;
  const el = document.getElementById('kvoice');
  try {
    bank = el ? JSON.parse(el.textContent) : {};
  } catch {
    bank = {};
  }
  return bank;
}

function clipUrl(text) {
  if (urls.has(text)) return urls.get(text);
  const entry = loadBank()[text];
  if (!entry) return null;
  const bin = atob(entry.a);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }));
  urls.set(text, url);
  return url;
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Map each timing word to a token index in the displayed text.
function alignTimings(tokens, timings) {
  const nt = tokens.map(norm);
  const out = [];
  let j = 0;
  for (const [start, dur, word] of timings) {
    const w = norm(String(word));
    let k = j;
    while (k < nt.length && w && !nt[k].includes(w) && !w.includes(nt[k] || '#')) k++;
    if (k >= nt.length) k = Math.min(j, nt.length - 1);
    out.push({ start, end: start + dur, idx: k });
    j = k + 1;
  }
  return out;
}

export class Voice {
  constructor() {
    this.el = new window.Audio();
    this.el.preload = 'auto';
    this.el.playsInline = true;
    this.rate = 1;
    this.enabled = true;
    this._raf = 0;
    this._done = null;
  }

  // Must be called inside a user gesture once (iOS).
  unlock() {
    if (this._unlocked) return;
    this._unlocked = true;
    const first = Object.keys(loadBank())[0];
    if (!first) return;
    this.el.src = clipUrl(first);
    this.el.muted = true;
    this.el
      .play()
      .then(() => {
        this.el.pause();
        this.el.muted = false;
      })
      .catch(() => (this.el.muted = false));
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }

  has(text) {
    return !!loadBank()[text];
  }

  stop() {
    cancelAnimationFrame(this._raf);
    this.el.pause();
    this.el.onended = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const d = this._done;
    this._done = null;
    d?.();
  }

  // onWord(tokenIndex) is called as each word is spoken. Resolves when finished or stopped.
  say(text, onWord) {
    this.stop();
    if (!this.enabled || !text) return Promise.resolve();
    const tokens = text.split(/\s+/);
    return new Promise((resolve) => {
      this._done = resolve;
      const url = clipUrl(text);
      if (url) {
        const timings = alignTimings(tokens, loadBank()[text].w || []);
        this.el.src = url;
        this.el.playbackRate = this.rate;
        const finish = () => {
          cancelAnimationFrame(this._raf);
          onWord?.(tokens.length);
          if (this._done === resolve) this._done = null;
          resolve();
        };
        this.el.onended = finish;
        this.el.onerror = finish;
        let last = -1;
        const loop = () => {
          const ms = this.el.currentTime * 1000;
          let idx = -1;
          for (const t of timings) if (t.start <= ms + 40) idx = t.idx;
          if (idx !== last) {
            last = idx;
            onWord?.(idx);
          }
          this._raf = requestAnimationFrame(loop);
        };
        this.el.play().then(loop).catch(() => this._fallback(text, tokens, onWord, resolve));
      } else {
        this._fallback(text, tokens, onWord, resolve);
      }
    });
  }

  _fallback(text, tokens, onWord, resolve) {
    if (!('speechSynthesis' in window)) {
      // No voice at all: give reading time based on length.
      setTimeout(resolve, 600 + tokens.length * 320);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95 * this.rate;
    const v = pickVoice();
    if (v) u.voice = v;
    const starts = [];
    let p = 0;
    for (const tk of tokens) {
      p = text.indexOf(tk, p);
      starts.push(p);
      p += tk.length;
    }
    u.onboundary = (e) => {
      let idx = 0;
      for (let i = 0; i < starts.length; i++) if (starts[i] <= e.charIndex) idx = i;
      onWord?.(idx);
    };
    const end = () => {
      onWord?.(tokens.length);
      if (this._done === resolve) this._done = null;
      resolve();
    };
    u.onend = end;
    u.onerror = end;
    window.speechSynthesis.speak(u);
  }
}

let chosen = null;
function pickVoice() {
  if (chosen) return chosen;
  const vs = window.speechSynthesis.getVoices();
  chosen =
    vs.find((v) => /natural|neural|online/i.test(v.name) && /^en-US/i.test(v.lang)) ||
    vs.find((v) => /samantha|ava|allison|google us english/i.test(v.name)) ||
    vs.find((v) => /^en-US/i.test(v.lang)) ||
    null;
  return chosen;
}
