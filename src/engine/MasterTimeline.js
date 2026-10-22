// MasterTimeline: Deterministic 60 FPS 3D Video Director for Engage (45s) & Explain (60s) Stages
// Synchronized with studio-grade Neural HD Voiceovers so human sentences never get cut off mid-word.

export class MasterTimeline {
  constructor({ THREE, camera, controls, audio, onUiUpdate, onComplete }) {
    this.THREE = THREE;
    this.camera = camera;
    this.controls = controls;
    this.audio = audio;
    this.onUiUpdate = onUiUpdate;
    this.onComplete = onComplete;

    this.segments = [];
    this.keyPrefix = '';
    this.duration = 45;
    this.currentTime = 0;
    this.playing = false;
    this.activeSegmentIndex = -1;

    this.fromPos = new THREE.Vector3();
    this.toPos = new THREE.Vector3();
    this.fromLook = new THREE.Vector3();
    this.toLook = new THREE.Vector3();
    this.currentLook = new THREE.Vector3();
  }

  loadTimeline(segments = [], totalDuration = 45, keyPrefix = '') {
    this.pause(true);
    this.segments = segments;
    this.keyPrefix = keyPrefix;
    this.duration = totalDuration || (segments.length ? segments[segments.length - 1].end : 45);
    this.currentTime = 0;
    this.activeSegmentIndex = -1;
    this._emitUi();
  }

  play() {
    if (!this.segments.length) return;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
      this.activeSegmentIndex = -1;
    }
    const wasPausedMidSegment = this.activeSegmentIndex >= 0 && this.currentTime > 0;
    this.playing = true;
    if (this.controls) this.controls.enabled = false;

    if (wasPausedMidSegment && this.audio && this.audio.resumeSpeech()) {
      this._emitUi();
      return;
    }
    this._checkSegmentTransition(true);
    this._emitUi();
  }

  pause(stopCompletely = false) {
    this.playing = false;
    if (this.controls) this.controls.enabled = true;
    if (this.audio) {
      if (stopCompletely) this.audio.stopSpeech();
      else this.audio.pauseSpeech();
    }
    this._emitUi();
  }

  toggle() {
    if (this.playing) this.pause(false);
    else this.play();
  }

  seek(timeSeconds) {
    this.currentTime = Math.max(0, Math.min(this.duration, Number(timeSeconds) || 0));
    const targetIdx = this._findSegmentIndex(this.currentTime);
    const changedSegment = targetIdx !== this.activeSegmentIndex;
    this.activeSegmentIndex = -1;
    this._checkSegmentTransition(this.playing && changedSegment);
    this._interpolateCamera();
    this._emitUi();
  }

  _findSegmentIndex(t) {
    for (let i = 0; i < this.segments.length; i++) {
      const s = this.segments[i];
      if (t >= s.start && t <= s.end) return i;
    }
    return this.segments.length - 1;
  }

  _checkSegmentTransition(triggerAudio = false) {
    if (!this.segments.length) return;
    const idx = this._findSegmentIndex(this.currentTime);
    if (idx !== this.activeSegmentIndex && idx >= 0) {
      this.activeSegmentIndex = idx;
      const seg = this.segments[idx];
      if (triggerAudio && this.audio) {
        if (seg.sfx) this.audio.playSfx(seg.sfx);
        if (seg.narration) {
          const audioKey = this.keyPrefix ? `${this.keyPrefix}_${idx}` : null;
          this.audio.speak(seg.narration, null, audioKey);
        }
      }
    }
  }

  _interpolateCamera() {
    if (!this.segments.length) return;
    const idx = Math.max(0, this._findSegmentIndex(this.currentTime));
    const seg = this.segments[idx];
    const nextSeg = this.segments[Math.min(this.segments.length - 1, idx + 1)];

    const span = Math.max(0.001, seg.end - seg.start);
    const localT = Math.max(0, Math.min(1, (this.currentTime - seg.start) / span));
    const ease = localT * localT * (3 - 2 * localT);

    const p0 = seg.cameraPos || [0, 5, 13];
    const p1 =
      nextSeg && nextSeg !== seg
        ? nextSeg.cameraPos || p0
        : [p0[0] + Math.sin(localT * Math.PI) * 1.6, p0[1] + 0.4, p0[2] - 1.2];
    const l0 = seg.lookAt || [0, 1, 0];
    const l1 = nextSeg && nextSeg !== seg ? nextSeg.lookAt || l0 : l0;

    this.fromPos.set(p0[0], p0[1], p0[2]);
    this.toPos.set(p1[0], p1[1], p1[2]);
    this.camera.position.lerpVectors(this.fromPos, this.toPos, ease * 0.65);

    this.fromLook.set(l0[0], l0[1], l0[2]);
    this.toLook.set(l1[0], l1[1], l1[2]);
    this.currentLook.lerpVectors(this.fromLook, this.toLook, ease * 0.65);
    this.camera.lookAt(this.currentLook);
    if (this.controls) {
      this.controls.target.copy(this.currentLook);
    }
  }

  update(dt) {
    if (!this.playing) return;

    // Hold smoothly at segment end if the human Neural HD voiceover is still finishing its sentence
    const curSeg = this.segments[this.activeSegmentIndex];
    if (curSeg && this.audio && this.audio.isNeuralPlaying && this.currentTime + dt >= curSeg.end - 0.08) {
      this.currentTime = curSeg.end - 0.08;
      this._interpolateCamera();
      this._emitUi();
      return;
    }

    this.currentTime += dt;
    if (this.currentTime >= this.duration) {
      this.currentTime = this.duration;
      this.pause(true);
      if (this.onComplete) this.onComplete();
      return;
    }
    this._checkSegmentTransition(true);
    this._interpolateCamera();
    this._emitUi();
  }

  _emitUi() {
    if (!this.onUiUpdate) return;
    const seg = this.segments[Math.max(0, this.activeSegmentIndex)] || this.segments[0] || null;
    this.onUiUpdate({
      playing: this.playing,
      currentTime: this.currentTime,
      duration: this.duration,
      progress: this.duration > 0 ? this.currentTime / this.duration : 0,
      segmentIndex: this.activeSegmentIndex,
      segment: seg
    });
  }
}
