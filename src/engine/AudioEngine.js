// Neural HD Audio + Speech Narration Engine (iOS Safari, Chromebook Chrome & Desktop)
// Plays studio-grade pre-generated Neural HD MP3 voiceovers (en-US-AvaMultilingualNeural)
// plus Triumphant Victory Fanfare ('triumph') and Wrong-Answer Game Buzzer ('wrong') sound effects!

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.voiceMuted = false;
    this.unlocked = false;
    this.preferredVoice = null;
    this.currentUtterance = null;

    this.neuralPlayer = typeof Audio !== 'undefined' ? new Audio() : null;
    if (this.neuralPlayer) {
      this.neuralPlayer.preload = 'auto';
      this.neuralPlayer.playsInline = true;
    }
    this.isNeuralPlaying = false;
    this.currentAudioKey = null;

    this.audioBasePath =
      typeof window !== 'undefined' && window.location.pathname.includes('/dist/')
        ? '../audio/voiceovers'
        : './audio/voiceovers';

    this._initVoices();
  }

  _initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) return;
      const priorities = [
        'Microsoft AvaMultilingual Online (Natural)',
        'Microsoft AndrewMultilingual Online (Natural)',
        'Microsoft Aria Online (Natural)',
        'Samantha (Enhanced)',
        'Ava (Enhanced)',
        'Google US English',
        'Samantha'
      ];
      for (const name of priorities) {
        const found = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'));
        if (found) {
          this.preferredVoice = found;
          return;
        }
      }
      this.preferredVoice =
        voices.find((v) => v.lang.startsWith('en-US')) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];
    };
    pickVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.unlocked) {
      if (this.neuralPlayer) {
        this.neuralPlayer.muted = false;
        this.neuralPlayer.volume = 1.0;
      }
      if ('speechSynthesis' in window) {
        try {
          const prime = new SpeechSynthesisUtterance('');
          prime.volume = 0;
          window.speechSynthesis.speak(prime);
        } catch (_) {}
      }
    }
    this.unlocked = true;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.neuralPlayer) {
      this.neuralPlayer.muted = muted;
    }
    if (muted) {
      this.stopSpeech();
    }
  }

  speak(text, onEnd, audioKey = null) {
    if (this.muted || this.voiceMuted || !text) {
      if (onEnd) setTimeout(onEnd, 100);
      return;
    }
    this.unlock();
    this.stopSpeech();

    if (audioKey && this.neuralPlayer) {
      const mp3Url = `${this.audioBasePath}/${audioKey}.mp3`;
      this.currentAudioKey = audioKey;
      this.isNeuralPlaying = true;
      this.neuralPlayer.src = mp3Url;
      this.neuralPlayer.currentTime = 0;
      this.neuralPlayer.playbackRate = 1.0;

      this.neuralPlayer.onended = () => {
        this.isNeuralPlaying = false;
        if (onEnd) onEnd();
      };

      this.neuralPlayer.onerror = () => {
        this.isNeuralPlaying = false;
        this._speakFallbackTts(text, onEnd);
      };

      const playPromise = this.neuralPlayer.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          this.isNeuralPlaying = false;
          this._speakFallbackTts(text, onEnd);
        });
      }
      return;
    }

    this._speakFallbackTts(text, onEnd);
  }

  _speakFallbackTts(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 100);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (this.preferredVoice) u.voice = this.preferredVoice;
      u.rate = 0.98;
      u.pitch = 1.02;
      u.volume = 1.0;
      u.onend = () => {
        if (onEnd) onEnd();
      };
      u.onerror = () => {
        if (onEnd) onEnd();
      };
      this.currentUtterance = u;
      window.speechSynthesis.speak(u);
    } catch (_) {
      if (onEnd) onEnd();
    }
  }

  pauseSpeech() {
    if (this.neuralPlayer && !this.neuralPlayer.paused) {
      try {
        this.neuralPlayer.pause();
      } catch (_) {}
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    this.isNeuralPlaying = false;
  }

  resumeSpeech() {
    if (
      this.neuralPlayer &&
      this.neuralPlayer.src &&
      this.neuralPlayer.paused &&
      this.neuralPlayer.currentTime > 0 &&
      !this.neuralPlayer.ended
    ) {
      this.isNeuralPlaying = true;
      this.neuralPlayer.play().catch(() => {
        this.isNeuralPlaying = false;
      });
      return true;
    }
    return false;
  }

  stopSpeech() {
    if (this.neuralPlayer) {
      try {
        this.neuralPlayer.pause();
        this.neuralPlayer.currentTime = 0;
      } catch (_) {}
    }
    this.isNeuralPlaying = false;
    this.currentAudioKey = null;
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    this.currentUtterance = null;
  }

  playSfx(type = 'click') {
    if (this.muted) return;
    this.unlock();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    try {
      switch (type) {
        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
          gain.gain.setValueAtTime(0.11, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.07);
          break;
        }
        case 'chime': {
          [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            gain.gain.setValueAtTime(0.12, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
            osc.connect(gain).connect(this.ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.36);
          });
          break;
        }
        // TRIUMPHANT VICTORY FANFARE (Right Answer!)
        case 'triumph':
        case 'success': {
          // Brass/Synth Fanfare Rhythm: C5 (short) - G5 (short) - E5 (short) - C6 + E6 + G6 (sustained victory chord!)
          const notes = [
            { freq: 523.25, start: 0.0, dur: 0.11, vol: 0.18 },
            { freq: 659.25, start: 0.1, dur: 0.11, vol: 0.18 },
            { freq: 783.99, start: 0.2, dur: 0.12, vol: 0.2 },
            { freq: 1046.5, start: 0.32, dur: 0.65, vol: 0.22 },
            { freq: 1318.51, start: 0.32, dur: 0.65, vol: 0.15 },
            { freq: 1567.98, start: 0.32, dur: 0.68, vol: 0.14 }
          ];
          notes.forEach((n) => {
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const gain = this.ctx.createGain();

            osc1.type = 'triangle';
            osc2.type = 'sawtooth';
            osc1.frequency.setValueAtTime(n.freq, now + n.start);
            osc2.frequency.setValueAtTime(n.freq * 1.003, now + n.start); // rich chorus detune

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2800, now + n.start);

            gain.gain.setValueAtTime(0.001, now + n.start);
            gain.gain.linearRampToValueAtTime(n.vol, now + n.start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain).connect(this.ctx.destination);

            osc1.start(now + n.start);
            osc2.start(now + n.start);
            osc1.stop(now + n.start + n.dur + 0.02);
            osc2.stop(now + n.start + n.dur + 0.02);
          });
          break;
        }
        // OPPOSITE SOUND: DESCENDING "WAH-WAH" GAME BUZZER (Wrong Answer!)
        case 'wrong': {
          const wahNotes = [
            { fStart: 311.13, fEnd: 293.66, start: 0.0, dur: 0.18 },   // Eb4 -> D4
            { fStart: 277.18, fEnd: 233.08, start: 0.19, dur: 0.38 }   // Db4 -> Bb3 slide down
          ];
          wahNotes.forEach((w) => {
            const osc = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(w.fStart, now + w.start);
            osc.frequency.linearRampToValueAtTime(w.fEnd, now + w.start + w.dur);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(950, now + w.start);
            filter.frequency.exponentialRampToValueAtTime(280, now + w.start + w.dur);

            gain.gain.setValueAtTime(0.18, now + w.start);
            gain.gain.exponentialRampToValueAtTime(0.001, now + w.start + w.dur);

            osc.connect(filter).connect(gain).connect(this.ctx.destination);
            osc.start(now + w.start);
            osc.stop(now + w.start + w.dur + 0.02);
          });
          break;
        }
        case 'splash':
        case 'bubble': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.18);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.23);
          break;
        }
        case 'magnet':
        case 'spark': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(420, now + 0.14);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.17);
          break;
        }
        case 'thud': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(48, now + 0.15);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.17);
          break;
        }
        case 'whoosh':
        case 'wind': {
          const bufferSize = this.ctx.sampleRate * 0.28;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(450, now);
          filter.frequency.exponentialRampToValueAtTime(900, now + 0.25);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.11, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
          noise.connect(filter).connect(gain).connect(this.ctx.destination);
          noise.start(now);
          break;
        }
      }
    } catch (_) {}
  }
}
