// Main Application Orchestrator — Vespa-X09 Cyber-Organic Vivid Dark Edition
// Features: First-Principles 9-Year-Old Friendly Narration, Dedicated Narrated Vocabulary Lab (60 terms),
// Rotating Section & STAAR Quiz Pools, and Triumphant Fanfare vs. Wrong Buzzer Audio Feedback!

import { AudioEngine } from './engine/AudioEngine.js';
import { StageManager } from './engine/StageManager.js';
import { CURRICULUM_U1_U2 } from './data/curriculum_u1_u2.js';
import { CURRICULUM_U3_U4 } from './data/curriculum_u3_u4.js';
import { MODULES_U1_U2 } from './modules/unit1_2_modules.js';
import { MODULES_U3 } from './modules/unit3_modules.js';
import { MODULES_U4 } from './modules/unit4_modules.js';

export const ALL_CURRICULUM = [...CURRICULUM_U1_U2, ...CURRICULUM_U3_U4];
export const ALL_MODULE_BUILDERS = {
  ...MODULES_U1_U2,
  ...MODULES_U3,
  ...MODULES_U4
};

const STORAGE_KEY = 'kelenna_dunbar_science_mastery_v1';

class DunbarScienceApp {
  constructor() {
    this.THREE = window.THREE;
    this.audio = new AudioEngine();
    this.progress = this._loadProgress();

    this.currentModuleId = 'm1_1';
    this.currentStage = 'engage';
    this.activeModuleData = null;
    this.activeController = null;
    this.controlValues = {};

    // Rotating Quiz State
    this.seenEvalIds = {};       // Tracks seen question IDs per module so quizzes always rotate fresh questions!
    this.activeEvalSet = [];     // Current 5-question rotated draw
    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.sectionQuizIndex = { engage: 0, explore: 0, explain: 0, vocab: 0 };
    this.vocabShowAll = false;
    this.vocabSearchQuery = '';

    this._cacheDom();
    this._initStageManager();
    this._bindGlobalEvents();

    this.selectModule(this.currentModuleId, false);
    this.stageManager.startRenderLoop();
  }

  _loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return {
      stars: {},
      engineered: {},
      notes: {}
    };
  }

  _saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (_) {}
  }

  _cacheDom() {
    this.canvas = document.getElementById('three-canvas');
    this.teksBadge = document.getElementById('teks-badge');
    this.moduleTitleEl = document.getElementById('module-header-title');
    this.icanTextEl = document.getElementById('ican-text');
    this.localAnchorEl = document.getElementById('local-anchor-pill');
    this.telemetryStrip = document.getElementById('telemetry-strip');

    this.videoHud = document.getElementById('video-hud');
    this.subtitleSpeaker = document.getElementById('subtitle-speaker');
    this.subtitleText = document.getElementById('subtitle-text');
    this.playBtn = document.getElementById('play-btn');
    this.timelineSlider = document.getElementById('timeline-slider');
    this.timeReadout = document.getElementById('time-readout');

    this.labPanel = document.getElementById('lab-panel');
    this.panelTitle = document.getElementById('panel-title');
    this.panelBody = document.getElementById('panel-body');
    this.sheetToggleBtn = document.getElementById('sheet-toggle-btn');

    this.hubModal = document.getElementById('hub-modal');
    this.hubContent = document.getElementById('hub-content');
    this.notebookModal = document.getElementById('notebook-modal');
    this.notebookContent = document.getElementById('notebook-content');

    this.stageTabBtns = Array.from(document.querySelectorAll('.stage-tab'));
    this.muteBtn = document.getElementById('mute-btn');
    this.dustBtn = document.getElementById('dust-btn');
  }

  _initStageManager() {
    this.stageManager = new StageManager({
      canvas: this.canvas,
      THREE: this.THREE,
      audio: this.audio,
      onTelemetryUpdate: (metrics) => this._renderTelemetry(metrics),
      onTimelineUpdate: (state) => this._updateVideoHud(state),
      onComplete: () => {
        this.playBtn.textContent = '↻ REPLAY 3D VIDEO';
      }
    });
  }

  _bindGlobalEvents() {
    document.getElementById('open-hub-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.openHubModal();
    });
    document.getElementById('close-hub-btn')?.addEventListener('click', () => {
      this.hubModal.classList.add('hidden');
    });

    document.getElementById('open-notebook-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.openNotebookModal();
    });
    document.getElementById('close-notebook-btn')?.addEventListener('click', () => {
      this.notebookModal.classList.add('hidden');
    });

    this.muteBtn?.addEventListener('click', () => {
      this.audio.unlock();
      this.audio.setMuted(!this.audio.muted);
      this.muteBtn.innerHTML = this.audio.muted
        ? '🔇 <span class="font-cyber">AUDIO OFF</span>'
        : '🔊 <span class="font-cyber">AUDIO ON</span>';
      this.muteBtn.classList.toggle('active', !this.audio.muted);
    });

    this.dustBtn?.addEventListener('click', () => {
      this.audio.playSfx('click');
      const active = this.stageManager.toggleDustParticles();
      this.dustBtn.classList.toggle('active', active);
    });

    document.querySelectorAll('.theme-dot-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playSfx('chime');
        document.querySelectorAll('.theme-dot-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.stageManager.setEnergyTheme(btn.dataset.theme);
      });
    });

    document.getElementById('reset-cam-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.stageManager.timeline.pause(true);
      this.stageManager.orbit.resetView([0, 6.2, 14.8], [0, 1.2, 0]);
    });

    document.getElementById('panel-header')?.addEventListener('click', (e) => {
      if (window.innerWidth <= 960 || e.target === this.sheetToggleBtn) {
        const collapsed = this.labPanel.classList.toggle('collapsed');
        this.sheetToggleBtn.textContent = collapsed ? '▲ Expand' : '▼ Minimize';
        setTimeout(() => this.stageManager.resize(), 260);
      }
    });

    this.stageTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.unlock();
        this.audio.playSfx('click');
        this.setStage(btn.dataset.stage, true);
      });
    });

    this.playBtn?.addEventListener('click', () => {
      this.audio.unlock();
      this.stageManager.timeline.toggle();
    });
    this.timelineSlider?.addEventListener('input', (e) => {
      this.stageManager.timeline.seek(parseFloat(e.target.value));
    });

    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.code === 'Space' && (this.currentStage === 'engage' || this.currentStage === 'explain')) {
        e.preventDefault();
        this.audio.unlock();
        this.stageManager.timeline.toggle();
      } else if (e.key >= '1' && e.key <= '6') {
        const stages = ['engage', 'explore', 'explain', 'vocab', 'elaborate', 'evaluate'];
        this.setStage(stages[parseInt(e.key, 10) - 1], true);
      } else if (e.code === 'ArrowRight' && (this.currentStage === 'engage' || this.currentStage === 'explain')) {
        this.stageManager.timeline.seek(this.stageManager.timeline.currentTime + 5);
      } else if (e.code === 'ArrowLeft' && (this.currentStage === 'engage' || this.currentStage === 'explain')) {
        this.stageManager.timeline.seek(this.stageManager.timeline.currentTime - 5);
      }
    });
  }

  selectModule(moduleId, autoPlayVideo = true) {
    const modData = ALL_CURRICULUM.find((m) => m.id === moduleId) || ALL_CURRICULUM[0];
    if (!modData) return;

    this.currentModuleId = modData.id;
    this.activeModuleData = modData;
    this.quizAnswers = {};
    this.quizSubmitted = false;

    this.teksBadge.textContent = modData.code;
    this.moduleTitleEl.textContent = `${modData.icon} ${modData.title}`;
    this.icanTextEl.innerHTML = `<strong>I CAN</strong> ${modData.iCanStatement}`;
    this.localAnchorEl.textContent = `📍 ${modData.localAnchor || 'Dickinson ISD Lab'}`;

    const builder = ALL_MODULE_BUILDERS[modData.id];
    this.telemetryStrip.innerHTML = '';
    if (builder) {
      this.activeController = this.stageManager.loadModule(builder, modData);
    } else {
      this.activeController = { controls: [], interactables: [] };
    }

    this.controlValues = {};
    (this.activeController.controls || []).forEach((c) => {
      this.controlValues[c.id] = c.value;
    });

    this. _rotateNewEvalQuestionSet();
    this.hubModal.classList.add('hidden');
    this.setStage('engage', autoPlayVideo);
  }

  // Draws a fresh rotated 5-question set from the module's question pool and shuffles options
  _rotateNewEvalQuestionSet() {
    const pool = this.activeModuleData?.evaluate || [];
    if (!pool.length) {
      this.activeEvalSet = [];
      return;
    }
    const modId = this.currentModuleId;
    if (!this.seenEvalIds[modId]) this.seenEvalIds[modId] = new Set();

    let unseen = pool.filter((q) => !this.seenEvalIds[modId].has(q.id));
    if (unseen.length < 5) {
      this.seenEvalIds[modId].clear();
      unseen = [...pool];
    }

    // Fisher-Yates shuffle
    const shuffled = [...unseen];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const picked = shuffled.slice(0, Math.min(5, shuffled.length)).map((q) => {
      this.seenEvalIds[modId].add(q.id);
      const clone = JSON.parse(JSON.stringify(q));
      // Shuffle option order for single & multiselect so button positions are never memorized
      if ((clone.type === 'single' || clone.type === 'multiselect') && Array.isArray(clone.options)) {
        for (let i = clone.options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [clone.options[i], clone.options[j]] = [clone.options[j], clone.options[i]];
        }
      }
      return clone;
    });

    this.activeEvalSet = picked;
    this.quizAnswers = {};
    this.quizSubmitted = false;
  }

  setStage(stage, autoPlayVideo = false) {
    this.currentStage = stage;
    this.stageManager.currentStage = stage;

    this.stageTabBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.stage === stage);
    });

    if (this.activeController && typeof this.activeController.onStageChange === 'function') {
      try {
        this.activeController.onStageChange(stage);
      } catch (_) {}
    }

    if (stage === 'engage') {
      const tl = this.activeModuleData?.engage?.timeline || [];
      const dur = tl.length ? tl[tl.length - 1].end : 45;
      this.timelineSlider.max = dur;
      this.stageManager.timeline.loadTimeline(tl, dur, `${this.currentModuleId}_engage`);
      this.videoHud.style.display = 'block';
      if (autoPlayVideo) this.stageManager.timeline.play();
    } else if (stage === 'explain') {
      const tl = this.activeModuleData?.explain?.timeline || [];
      const dur = tl.length ? tl[tl.length - 1].end : 60;
      this.timelineSlider.max = dur;
      this.stageManager.timeline.loadTimeline(tl, dur, `${this.currentModuleId}_explain`);
      this.videoHud.style.display = 'block';
      if (autoPlayVideo) this.stageManager.timeline.play();
    } else if (stage === 'vocab') {
      this.stageManager.timeline.pause(true);
      this.videoHud.style.display = 'block';
      this.subtitleSpeaker.textContent = '🗣️ FIRST-PRINCIPLES VOCABULARY NARRATOR';
      this.subtitleText.textContent =
        'Tap "🔊 Hear It Explained" on any science word on the right to hear what it really means in simple language!';
    } else {
      this.stageManager.timeline.pause(true);
      this.videoHud.style.display = 'none';
    }

    this._renderStagePanel();
  }

  _updateVideoHud(state) {
    this.playBtn.textContent = state.playing ? '⏸ PAUSE' : '▶ PLAY 3D VIDEO';
    this.timelineSlider.value = state.currentTime.toFixed(1);
    const fmt = (s) => {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60).toString().padStart(2, '0');
      return `${m}:${sec}`;
    };
    this.timeReadout.textContent = `${fmt(state.currentTime)} / ${fmt(state.duration)}`;

    if (state.segment) {
      const title =
        state.segment.callout?.title ||
        (this.currentStage === 'engage' ? 'ENGAGE PHENOMENON' : 'EXPLAIN CONCEPT TOUR');
      this.subtitleSpeaker.textContent = `🎙️ ${title}`;
      this.subtitleText.textContent = state.segment.narration || '';
    }
  }

  _renderTelemetry(metrics = []) {
    if (!Array.isArray(metrics)) return;
    this.telemetryStrip.innerHTML = metrics
      .map(
        (m) => `
        <div class="metric-card" style="border-left-color: ${m.color || 'var(--theme-color)'}">
          <div class="metric-label">${m.label}</div>
          <div class="metric-value" style="color: ${m.color || 'var(--theme-color)'}">${m.value}<span class="metric-unit">${m.unit || ''}</span></div>
        </div>`
      )
      .join('');
  }

  // ==================== ROTATING SECTION MINI-QUIZ WIDGET ====================
  _mountSectionQuiz(container, sectionKey) {
    if (!container || !this.activeModuleData) return;
    const pool = this.activeModuleData.sectionQuizzes?.[sectionKey] || [];
    if (!pool.length) return;

    const idx = (this.sectionQuizIndex[sectionKey] || 0) % pool.length;
    const item = pool[idx];

    // Create shuffled option indices so right answer moves around
    const optIndices = item.options.map((_, i) => i);
    for (let i = optIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optIndices[i], optIndices[j]] = [optIndices[j], optIndices[i]];
    }

    const optsHtml = optIndices
      .map(
        (origIdx) => `
        <button class="anchor-option-btn sec-quiz-opt" data-correct="${origIdx === item.answer}">
          ${item.options[origIdx]}
        </button>`
      )
      .join('');

    container.innerHTML = `
      <div class="control-card" style="border-color:rgba(0,240,255,0.4);background:rgba(8,15,28,0.88);">
        <div class="control-header">
          <span class="font-cyber" style="color:#00f0ff;font-size:0.74rem;">⚡ QUICK BRAIN CHECK (${idx + 1} / ${pool.length})</span>
          <button class="cyber-btn" id="rotate-sec-quiz-btn" style="padding:3px 9px;font-size:0.68rem;">🔄 Rotate Question</button>
        </div>
        <div style="font-size:0.84rem;font-weight:700;color:#f8fafc;line-height:1.4;margin-bottom:6px;">${item.q}</div>
        <div>${optsHtml}</div>
        <div id="sec-quiz-feedback" style="display:none;margin-top:8px;padding:8px 10px;border-radius:8px;font-size:0.8rem;font-weight:600;"></div>
      </div>
    `;

    container.querySelector('#rotate-sec-quiz-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.sectionQuizIndex[sectionKey] = ((this.sectionQuizIndex[sectionKey] || 0) + 1) % pool.length;
      this._mountSectionQuiz(container, sectionKey);
    });

    container.querySelectorAll('.sec-quiz-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        container.querySelectorAll('.sec-quiz-opt').forEach((b) => b.classList.remove('correct', 'wrong'));
        btn.classList.add(isCorrect ? 'correct' : 'wrong');

        // Triumphant Fanfare for Right Answer, Descending Wah-Wah Buzzer for Wrong Answer!
        this.audio.playSfx(isCorrect ? 'triumph' : 'wrong');

        const fb = container.querySelector('#sec-quiz-feedback');
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = isCorrect ? 'rgba(16,185,129,0.22)' : 'rgba(244,63,94,0.22)';
          fb.style.border = `1px solid ${isCorrect ? '#10b981' : '#f43f5e'}`;
          fb.style.color = isCorrect ? '#6ee7b7' : '#fda4af';
          fb.innerHTML = isCorrect
            ? `🏆 <strong>AWESOME JOB, KELENNA!</strong> ${item.hint || 'You nailed the first principles!'}`
            : `💡 <strong>TRY AGAIN! First-Principles Tip:</strong> ${item.hint || 'Think about how the 3D model behaves!'}`;
        }
      });
    });
  }

  _renderStagePanel() {
    const mod = this.activeModuleData;
    if (!mod) return;

    this.labPanel.classList.remove('collapsed');
    this.sheetToggleBtn.textContent = '▼ Minimize';

    if (this.currentStage === 'engage') {
      this.panelTitle.innerHTML = '🎬 1. ENGAGE — PHENOMENON HOOK';
      const optionsHtml = (mod.engage?.anchorOptions || [])
        .map(
          (opt) => `
          <button class="anchor-option-btn" data-opt-id="${opt.id}">
            ${opt.text}
          </button>`
        )
        .join('');

      this.panelBody.innerHTML = `
        <div class="info-box">
          <h4>📍 LOCAL PHENOMENON: ${mod.localAnchor}</h4>
          <p>${mod.engage?.hookQuestion || ''}</p>
        </div>
        <div class="control-card">
          <div class="control-header"><span>🤔 MAKE YOUR PREDICTION</span></div>
          <div id="anchor-options-list">${optionsHtml}</div>
          <div id="anchor-feedback" style="margin-top:10px;font-size:0.82rem;font-weight:700;display:none;"></div>
        </div>
        <div id="engage-sec-quiz"></div>
        <button class="lab-btn" id="engage-play-movie-btn">▶ WATCH 45s 3D PHENOMENON VIDEO</button>
        <button class="lab-btn emerald" id="go-explore-btn">🔬 CONTINUE TO 2. EXPLORE LAB →</button>
      `;

      this._mountSectionQuiz(document.getElementById('engage-sec-quiz'), 'engage');

      this.panelBody.querySelectorAll('#anchor-options-list .anchor-option-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const opt = (mod.engage?.anchorOptions || []).find((o) => o.id === btn.dataset.optId);
          if (!opt) return;
          this.panelBody
            .querySelectorAll('#anchor-options-list .anchor-option-btn')
            .forEach((b) => b.classList.remove('correct', 'wrong'));
          btn.classList.add(opt.correct ? 'correct' : 'wrong');
          this.audio.playSfx(opt.correct ? 'triumph' : 'wrong');
          const fb = document.getElementById('anchor-feedback');
          fb.style.display = 'block';
          fb.style.color = opt.correct ? '#34d399' : '#fda4af';
          fb.textContent = opt.feedback;
        });
      });

      document.getElementById('engage-play-movie-btn')?.addEventListener('click', () => {
        this.audio.unlock();
        this.stageManager.timeline.seek(0);
        this.stageManager.timeline.play();
      });

      document.getElementById('go-explore-btn')?.addEventListener('click', () => {
        this.audio.playSfx('click');
        this.setStage('explore', false);
      });
    } else if (this.currentStage === 'explore') {
      this.panelTitle.innerHTML = '🔬 2. EXPLORE — 3D SYSTEM CONTROLS';
      const promptsHtml = (mod.explore?.labPrompts || [])
        .map((p) => `<li style="margin-left:16px;margin-top:6px;">${p}</li>`)
        .join('');

      this.panelBody.innerHTML = `
        <div class="info-box">
          <h4>🖐️ HANDS-ON 3D INVESTIGATION</h4>
          <p>${mod.explore?.instructions || 'Use the 3D controls below or drag objects directly inside the 3D lab!'}</p>
        </div>
        <div id="dynamic-lab-controls" style="display:flex;flex-direction:column;gap:10px;"></div>
        <div id="explore-sec-quiz"></div>
        <div class="control-card">
          <div class="control-header"><span>🔍 DUNBAR INQUIRY CHECKLIST</span></div>
          <ul style="font-size:0.8rem;color:#cbd5e1;line-height:1.45;">${promptsHtml}</ul>
        </div>
        <button class="lab-btn emerald" id="go-explain-btn">🎙️ CONTINUE TO 3. EXPLAIN TOUR →</button>
      `;

      this._mountLabControls(document.getElementById('dynamic-lab-controls'));
      this._mountSectionQuiz(document.getElementById('explore-sec-quiz'), 'explore');

      document.getElementById('go-explain-btn')?.addEventListener('click', () => {
        this.audio.playSfx('click');
        this.setStage('explain', true);
      });
    } else if (this.currentStage === 'explain') {
      this.panelTitle.innerHTML = '🎙️ 3. EXPLAIN — FIRST-PRINCIPLES TOUR';
      const chaptersHtml = (mod.explain?.timeline || [])
        .map(
          (seg, i) => `
          <button class="anchor-option-btn explain-chapter-btn" data-time="${seg.start}">
            <strong style="color:var(--theme-color);" class="font-cyber">${i + 1}. ${seg.callout?.title || 'Concept Focus'}</strong> <span style="color:#94a3b8;font-size:0.74rem;">(${seg.start}s–${seg.end}s)</span><br/>
            <span style="font-size:0.79rem;color:#e2e8f0;font-weight:400;">${seg.narration}</span>
          </button>`
        )
        .join('');

      this.panelBody.innerHTML = `
        <button class="lab-btn" id="explain-play-btn">▶ PLAY FULL 60s FIRST-PRINCIPLES 3D TOUR</button>
        <div class="control-card">
          <div class="control-header"><span>🎥 JUMP TO 3D CAMERA CHAPTER</span></div>
          ${chaptersHtml}
        </div>
        <div id="explain-sec-quiz"></div>
        <button class="lab-btn emerald" id="go-vocab-btn">🗣️ GO TO NARRATED VOCABULARY LAB →</button>
      `;

      this._mountSectionQuiz(document.getElementById('explain-sec-quiz'), 'explain');

      document.getElementById('explain-play-btn')?.addEventListener('click', () => {
        this.audio.unlock();
        this.stageManager.timeline.seek(0);
        this.stageManager.timeline.play();
      });

      this.panelBody.querySelectorAll('.explain-chapter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.audio.unlock();
          const t = parseFloat(btn.dataset.time) || 0;
          this.stageManager.timeline.seek(t + 0.1);
          this.stageManager.timeline.play();
        });
      });

      document.getElementById('go-vocab-btn')?.addEventListener('click', () => {
        this.audio.playSfx('click');
        this.setStage('vocab', false);
      });
    } else if (this.currentStage === 'vocab') {
      this._renderVocabLabPanel();
    } else if (this.currentStage === 'elaborate') {
      this.panelTitle.innerHTML = '🛠️ 4. ELABORATE — STEM CHALLENGE';
      const elab = mod.elaborate || {};
      const criteriaHtml = (elab.criteria || [])
        .map((c) => `<li style="margin-left:16px;margin-top:4px;">${c}</li>`)
        .join('');

      this.panelBody.innerHTML = `
        <div class="info-box" style="border-left-color:var(--theme-color);">
          <h4 style="color:var(--theme-color);">🏆 ${elab.title || 'Dickinson TX STEM Challenge'}</h4>
          <p>${elab.scenario || ''}</p>
          <p style="margin-top:6px;font-weight:700;color:#f8fafc;">Mission Goal: ${elab.goalDescription || ''}</p>
          ${criteriaHtml ? `<ul style="margin-top:6px;font-size:0.79rem;color:#cbd5e1;">${criteriaHtml}</ul>` : ''}
        </div>
        <div id="elaborate-lab-controls" style="display:flex;flex-direction:column;gap:10px;"></div>
        <button class="lab-btn emerald" id="run-challenge-btn">🚀 TEST ENGINEERING SOLUTION IN 3D</button>
        <div id="challenge-result-box" style="display:none;padding:12px;border-radius:10px;font-size:0.84rem;font-weight:700;"></div>
        <button class="lab-btn secondary" id="go-evaluate-btn">📝 CONTINUE TO 5. EVALUATE (STAAR 2.0) →</button>
      `;

      this._mountLabControls(document.getElementById('elaborate-lab-controls'));

      document.getElementById('run-challenge-btn')?.addEventListener('click', () => {
        this.audio.unlock();
        let res = { passed: true, feedback: elab.successFeedback || 'Engineering criteria verified!' };
        if (this.activeController && typeof this.activeController.runElaborateChallenge === 'function') {
          try {
            res = this.activeController.runElaborateChallenge() || res;
          } catch (_) {}
        }
        const box = document.getElementById('challenge-result-box');
        box.style.display = 'block';
        if (res.passed) {
          this.audio.playSfx('triumph');
          this.progress.engineered[this.currentModuleId] = true;
          this._saveProgress();
          box.style.background = 'rgba(16, 185, 129, 0.2)';
          box.style.border = '1px solid #10b981';
          box.style.color = '#6ee7b7';
          box.innerHTML = `✅ <strong>STEM CHALLENGE PASSED!</strong><br/>${res.feedback || elab.successFeedback}`;
        } else {
          this.audio.playSfx('wrong');
          box.style.background = 'rgba(244, 63, 94, 0.2)';
          box.style.border = '1px solid #f43f5e';
          box.style.color = '#fda4af';
          box.innerHTML = `🔧 <strong>ADJUSTMENT NEEDED:</strong><br/>${res.feedback}`;
        }
      });

      document.getElementById('go-evaluate-btn')?.addEventListener('click', () => {
        this.audio.playSfx('click');
        this.setStage('evaluate', false);
      });
    } else if (this.currentStage === 'evaluate') {
      this.panelTitle.innerHTML = '📝 5. EVALUATE — ROTATING STAAR QUIZ';
      this._renderStaarQuiz();
    }
  }

  // ==================== DEDICATED NARRATED FIRST-PRINCIPLES VOCABULARY LAB ====================
  _renderVocabLabPanel() {
    this.panelTitle.innerHTML = '🗣️ NARRATED FIRST-PRINCIPLES VOCAB LAB';
    const mod = this.activeModuleData;

    // Collect either this module's 5 terms or all 60 terms across all 12 modules
    let vocabList = [];
    if (this.vocabShowAll) {
      ALL_CURRICULUM.forEach((m) => {
        (m.explain?.vocabulary || []).forEach((v, idx) => {
          vocabList.push({
            ...v,
            audioKey: `vocab_${v.id || `${m.id}_v${idx}`}`,
            modCode: m.code,
            modTitle: m.title
          });
        });
      });
    } else {
      vocabList = (mod.explain?.vocabulary || []).map((v, idx) => ({
        ...v,
        audioKey: `vocab_${v.id || `${mod.id}_v${idx}`}`,
        modCode: mod.code,
        modTitle: mod.title
      }));
    }

    if (this.vocabSearchQuery.trim()) {
      const q = this.vocabSearchQuery.toLowerCase();
      vocabList = vocabList.filter(
        (v) =>
          v.term.toLowerCase().includes(q) ||
          (v.simpleMeaning || '').toLowerCase().includes(q) ||
          (v.definition || '').toLowerCase().includes(q)
      );
    }

    const cardsHtml = vocabList
      .map(
        (v, idx) => `
        <div class="vocab-card" style="padding:12px 14px;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <span class="vocab-term" style="font-size:0.9rem;margin:0;">📘 ${v.term}</span>
            <button class="cyber-btn active speak-vocab-btn" data-idx="${idx}" style="padding:5px 10px;font-size:0.72rem;">
              🔊 HEAR IT
            </button>
          </div>
          ${
            v.simpleMeaning
              ? `<div style="background:rgba(245,158,11,0.12);border-left:3px solid #f59e0b;padding:7px 9px;border-radius:6px;font-size:0.81rem;color:#fef3c7;line-height:1.42;">
                  <strong style="color:#f59e0b;">💡 First Principles (Simple Meaning):</strong> ${v.simpleMeaning}
                </div>`
              : ''
          }
          <div class="vocab-def"><strong>📝 School Test Definition:</strong> ${v.definition}</div>
          ${v.example ? `<div class="vocab-ex">🏠 Real-Life Example: ${v.example}</div>` : ''}
        </div>`
      )
      .join('');

    this.panelBody.innerHTML = `
      <div class="info-box">
        <h4>🗣️ FIRST-PRINCIPLES SCIENCE DICTIONARY</h4>
        <p>Every big science word is actually a simple everyday idea! Tap <strong>"🔊 HEAR IT"</strong> on any word to hear it explained out loud.</p>
        <div style="display:flex;gap:6px;margin-top:8px;">
          <button class="cyber-btn ${!this.vocabShowAll ? 'active' : ''}" id="vocab-mod-only-btn" style="flex:1;">📍 This Lesson (${(mod.explain?.vocabulary || []).length})</button>
          <button class="cyber-btn ${this.vocabShowAll ? 'active' : ''}" id="vocab-all-btn" style="flex:1;">🌐 All 60 Words (A–Z)</button>
        </div>
        <input type="text" id="vocab-search-input" placeholder="🔍 Search any science word (Gravity, Matter, Force...)" value="${this.vocabSearchQuery}" style="width:100%;margin-top:8px;padding:8px 11px;border-radius:8px;border:1px solid rgba(148,163,184,0.35);background:rgba(6,7,9,0.9);color:#f8fafc;font-size:0.82rem;" />
      </div>
      <div id="vocab-sec-quiz"></div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${cardsHtml || '<div class="control-card">No matching words found.</div>'}
      </div>
      <button class="lab-btn emerald" id="go-elaborate-from-vocab-btn">🛠️ CONTINUE TO 4. ELABORATE CHALLENGE →</button>
    `;

    this._mountSectionQuiz(document.getElementById('vocab-sec-quiz'), 'vocab');

    document.getElementById('vocab-mod-only-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.vocabShowAll = false;
      this._renderVocabLabPanel();
    });

    document.getElementById('vocab-all-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.vocabShowAll = true;
      this._renderVocabLabPanel();
    });

    const searchInput = document.getElementById('vocab-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.vocabSearchQuery = e.target.value;
      this._renderVocabLabPanel();
      const el = document.getElementById('vocab-search-input');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });

    this.panelBody.querySelectorAll('.speak-vocab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = vocabList[parseInt(btn.dataset.idx, 10)];
        if (!v) return;
        this.audio.unlock();
        const spokenText =
          v.narration ||
          `${v.term}. What it really means: ${v.simpleMeaning || v.definition} For example: ${v.example || ''}`;
        this.subtitleSpeaker.textContent = `🗣️ VOCABULARY: ${v.term.toUpperCase()}`;
        this.subtitleText.textContent = spokenText;

        // Also pop up the 3D Callout Pin in the 3D viewport with this vocabulary word!
        if (this.stageManager.calloutGroup && this.stageManager.calloutSprite) {
          this.stageManager.calloutGroup.visible = true;
          this.stageManager.calloutGroup.position.set(0, 1.8, 0);
          this.stageManager.calloutSprite.updateText(
            v.term,
            v.simpleMeaning || v.definition,
            '#00f0ff'
          );
        }

        this.audio.speak(spokenText, null, v.audioKey);
      });
    });

    document.getElementById('go-elaborate-from-vocab-btn')?.addEventListener('click', () => {
      this.audio.playSfx('click');
      this.setStage('elaborate', false);
    });
  }

  _mountLabControls(container) {
    if (!container || !this.activeController) return;
    const controls = this.activeController.controls || [];
    if (!controls.length) {
      container.innerHTML = `<div class="control-card">Interact directly with objects in the 3D scene!</div>`;
      return;
    }

    container.innerHTML = controls
      .map((c) => {
        const currentVal = this.controlValues[c.id] !== undefined ? this.controlValues[c.id] : c.value;
        if (c.type === 'slider') {
          return `
            <div class="control-card">
              <div class="control-header">
                <span>${c.label}</span>
                <span class="control-val-badge" id="val_${c.id}">${currentVal}${c.unit ? ' ' + c.unit : ''}</span>
              </div>
              <input type="range" class="lab-slider" data-cid="${c.id}" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${currentVal}" />
            </div>`;
        } else if (c.type === 'select') {
          const opts = (c.options || [])
            .map((o) => {
              const val = typeof o === 'object' ? o.value : o;
              const lbl = typeof o === 'object' ? o.label : o;
              return `<option value="${val}" ${String(val) === String(currentVal) ? 'selected' : ''}>${lbl}</option>`;
            })
            .join('');
          return `
            <div class="control-card">
              <div class="control-header"><span>${c.label}</span></div>
              <select class="lab-select" data-cid="${c.id}">${opts}</select>
            </div>`;
        } else if (c.type === 'toggle') {
          const isOn = Boolean(currentVal);
          return `
            <div class="control-card">
              <div class="toggle-row">
                <span style="font-size:0.8rem;font-weight:700;color:#e2e8f0;">${c.label}</span>
                <button class="toggle-switch ${isOn ? 'on' : ''}" data-cid="${c.id}">
                  <span class="toggle-knob"></span>
                </button>
              </div>
            </div>`;
        } else if (c.type === 'button') {
          return `
            <button class="lab-btn" data-cid="${c.id}" data-btn="true">
              <span>${c.icon || '⚡'}</span> <span>${c.label}</span>
            </button>`;
        }
        return '';
      })
      .join('');

    container.querySelectorAll('.lab-slider').forEach((slider) => {
      slider.addEventListener('input', (e) => {
        const id = slider.dataset.cid;
        const ctrl = controls.find((x) => x.id === id);
        const val = parseFloat(e.target.value);
        this.controlValues[id] = val;
        const badge = document.getElementById(`val_${id}`);
        if (badge) badge.textContent = `${val}${ctrl?.unit ? ' ' + ctrl.unit : ''}`;
        if (this.activeController.onControlChange) {
          this.activeController.onControlChange(id, val);
        }
      });
    });

    container.querySelectorAll('.lab-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const id = sel.dataset.cid;
        const val = e.target.value;
        this.controlValues[id] = val;
        this.audio.playSfx('click');
        if (this.activeController.onControlChange) {
          this.activeController.onControlChange(id, val);
        }
      });
    });

    container.querySelectorAll('.toggle-switch').forEach((tog) => {
      tog.addEventListener('click', () => {
        const id = tog.dataset.cid;
        const nextVal = !tog.classList.contains('on');
        tog.classList.toggle('on', nextVal);
        this.controlValues[id] = nextVal;
        this.audio.playSfx('click');
        if (this.activeController.onControlChange) {
          this.activeController.onControlChange(id, nextVal);
        }
      });
    });

    container.querySelectorAll('button[data-btn="true"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.cid;
        this.audio.playSfx('click');
        if (this.activeController.onControlChange) {
          this.activeController.onControlChange(id, true);
        }
      });
    });
  }

  // ==================== ROTATING STAAR 2.0 ASSESSMENT ENGINE ====================
  _renderStaarQuiz() {
    if (!this.activeEvalSet || !this.activeEvalSet.length) {
      this._rotateNewEvalQuestionSet();
    }
    const questions = this.activeEvalSet;
    const totalPoolCount = (this.activeModuleData?.evaluate || []).length;
    const savedStars = this.progress.stars[this.currentModuleId] || 0;

    const qCardsHtml = questions
      .map((q, idx) => {
        const typeLabels = {
          single: 'STAAR Multiple Choice',
          multiselect: 'STAAR Multi-Select (Choose TWO)',
          multipart: 'STAAR Two-Part (Part A & Part B)',
          inlinechoice: 'STAAR Inline Drop-Down',
          dragsort: 'STAAR Category Sort'
        };
        let bodyHtml = '';

        if (q.type === 'single') {
          const cur = this.quizAnswers[q.id];
          bodyHtml = (q.options || [])
            .map(
              (o) => `
              <button class="anchor-option-btn staar-opt ${cur === o.id ? 'correct' : ''}" data-qid="${q.id}" data-oid="${o.id}">
                <strong>${o.id.toUpperCase()}.</strong> ${o.text}
              </button>`
            )
            .join('');
        } else if (q.type === 'multiselect') {
          const curArr = this.quizAnswers[q.id] || [];
          bodyHtml = (q.options || [])
            .map(
              (o) => `
              <button class="anchor-option-btn staar-multi ${curArr.includes(o.id) ? 'correct' : ''}" data-qid="${q.id}" data-oid="${o.id}">
                <strong>[${curArr.includes(o.id) ? '✓' : ' '}] ${o.id.toUpperCase()}.</strong> ${o.text}
              </button>`
            )
            .join('');
        } else if (q.type === 'multipart') {
          const cur = this.quizAnswers[q.id] || { a: null, b: null };
          const partA = (q.optionsA || [])
            .map(
              (o) => `
              <button class="anchor-option-btn staar-parta ${cur.a === o.id ? 'correct' : ''}" data-qid="${q.id}" data-oid="${o.id}">
                <strong>${o.id.toUpperCase()}.</strong> ${o.text}
              </button>`
            )
            .join('');
          const partB = (q.optionsB || [])
            .map(
              (o) => `
              <button class="anchor-option-btn staar-partb ${cur.b === o.id ? 'correct' : ''}" data-qid="${q.id}" data-oid="${o.id}">
                <strong>${o.id.toUpperCase()}.</strong> ${o.text}
              </button>`
            )
            .join('');
          bodyHtml = `
            <div style="font-size:0.83rem;font-weight:700;color:#38bdf8;margin-bottom:4px;">${q.promptA || 'Part A:'}</div>
            ${partA}
            <div style="font-size:0.83rem;font-weight:700;color:#38bdf8;margin-top:10px;margin-bottom:4px;">${q.promptB || 'Part B:'}</div>
            ${partB}
          `;
        } else if (q.type === 'inlinechoice') {
          const cur = this.quizAnswers[q.id] || {};
          const segHtml = (q.segments || [])
            .map((seg) => {
              if (seg.text) return `<span>${seg.text}</span>`;
              const opts = [`<option value="">-- Select --</option>`]
                .concat(
                  (seg.options || []).map(
                    (opt) => `<option value="${opt}" ${cur[seg.blankId] === opt ? 'selected' : ''}>${opt}</option>`
                  )
                )
                .join('');
              return `<select class="lab-select staar-inline" data-qid="${q.id}" data-bid="${seg.blankId}" style="display:inline-block;width:auto;min-height:34px;padding:4px 8px;margin:2px 4px;">${opts}</select>`;
            })
            .join('');
          bodyHtml = `<div style="font-size:0.84rem;line-height:1.8;background:rgba(8,12,21,0.85);color:#f1f5f9;padding:10px;border-radius:8px;border:1px solid rgba(148,163,184,0.28);">${segHtml}</div>`;
        } else if (q.type === 'dragsort') {
          const cur = this.quizAnswers[q.id] || {};
          const cats = q.categories || [];
          bodyHtml = (q.items || [])
            .map((item) => {
              const catBtns = cats
                .map(
                  (c) => `
                  <button class="cyber-btn staar-sort-btn ${cur[item.id] === c.id ? 'active' : ''}" data-qid="${q.id}" data-iid="${item.id}" data-cid="${c.id}" style="flex:1;font-size:0.72rem;">
                    ${c.label}
                  </button>`
                )
                .join('');
              return `
                <div style="background:rgba(8,12,21,0.85);padding:8px 10px;border-radius:8px;border:1px solid rgba(148,163,184,0.26);margin-bottom:6px;">
                  <div style="font-size:0.81rem;font-weight:700;color:#f8fafc;margin-bottom:6px;">• ${item.label}</div>
                  <div style="display:flex;gap:6px;">${catBtns}</div>
                </div>`;
            })
            .join('');
        }

        let feedbackHtml = '';
        if (this.quizSubmitted) {
          const isCorrect = this._gradeQuestion(q);
          feedbackHtml = `
            <div style="margin-top:10px;padding:9px 11px;border-radius:8px;font-size:0.8rem;font-weight:600;background:${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'};color:${isCorrect ? '#6ee7b7' : '#fda4af'};border:1px solid ${isCorrect ? '#10b981' : '#f43f5e'};">
              ${isCorrect ? '🏆 CORRECT! Triumphant Answer:' : '💡 FIRST-PRINCIPLES REVIEW:'} ${q.explanation || ''}
            </div>`;
        }

        return `
          <div class="staar-question-card">
            <div class="staar-q-header">
              <span class="font-cyber" style="font-weight:800;font-size:0.75rem;color:var(--theme-color);">QUESTION ${idx + 1} OF ${questions.length}</span>
              <span class="staar-type-tag">${typeLabels[q.type] || 'STAAR 2.0'}</span>
            </div>
            ${q.prompt ? `<div class="staar-prompt">${q.prompt}</div>` : ''}
            ${bodyHtml}
            ${feedbackHtml}
          </div>`;
      })
      .join('');

    this.panelBody.innerHTML = `
      <div class="info-box" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <div>
          <h4>⭐ ROTATING STAAR 2.0 BANK (${totalPoolCount} QUESTIONS)</h4>
          <p>Best Record: <strong style="color:var(--theme-color);">${savedStars} / 5 Stars</strong></p>
        </div>
        <button class="cyber-btn active" id="rotate-staar-set-btn" title="Draw a brand new rotated set of 5 questions!">
          🔄 NEW QUIZ SET
        </button>
      </div>
      ${qCardsHtml}
      <button class="lab-btn emerald" id="submit-staar-btn">✅ CHECK MY ANSWERS</button>
      <button class="lab-btn secondary" id="rotate-bottom-btn">🔄 ROTATE 5 NEW QUESTIONS</button>
    `;

    const rotateHandler = () => {
      this.audio.playSfx('chime');
      this._rotateNewEvalQuestionSet();
      this._renderStaarQuiz();
      this.panelBody.scrollTop = 0;
    };
    document.getElementById('rotate-staar-set-btn')?.addEventListener('click', rotateHandler);
    document.getElementById('rotate-bottom-btn')?.addEventListener('click', rotateHandler);

    // Instant auditory feedback when selecting single-choice options or checking answers!
    this.panelBody.querySelectorAll('.staar-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const oid = btn.dataset.oid;
        this.quizAnswers[qid] = oid;
        const qObj = questions.find((x) => x.id === qid);
        if (qObj) {
          this.audio.playSfx(oid === qObj.answer ? 'triumph' : 'wrong');
        } else {
          this.audio.playSfx('click');
        }
        this._renderStaarQuiz();
      });
    });

    this.panelBody.querySelectorAll('.staar-multi').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playSfx('click');
        const qid = btn.dataset.qid;
        const oid = btn.dataset.oid;
        const arr = Array.isArray(this.quizAnswers[qid]) ? [...this.quizAnswers[qid]] : [];
        const idx = arr.indexOf(oid);
        if (idx >= 0) arr.splice(idx, 1);
        else if (arr.length < 2) arr.push(oid);
        else {
          arr.shift();
          arr.push(oid);
        }
        this.quizAnswers[qid] = arr;
        this._renderStaarQuiz();
      });
    });

    this.panelBody.querySelectorAll('.staar-parta').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playSfx('click');
        const qid = btn.dataset.qid;
        this.quizAnswers[qid] = { ...(this.quizAnswers[qid] || {}), a: btn.dataset.oid };
        this._renderStaarQuiz();
      });
    });

    this.panelBody.querySelectorAll('.staar-partb').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playSfx('click');
        const qid = btn.dataset.qid;
        this.quizAnswers[qid] = { ...(this.quizAnswers[qid] || {}), b: btn.dataset.oid };
        this._renderStaarQuiz();
      });
    });

    this.panelBody.querySelectorAll('.staar-inline').forEach((sel) => {
      sel.addEventListener('change', () => {
        const qid = sel.dataset.qid;
        const bid = sel.dataset.bid;
        this.quizAnswers[qid] = { ...(this.quizAnswers[qid] || {}), [bid]: sel.value };
      });
    });

    this.panelBody.querySelectorAll('.staar-sort-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playSfx('click');
        const qid = btn.dataset.qid;
        const iid = btn.dataset.iid;
        const cid = btn.dataset.cid;
        this.quizAnswers[qid] = { ...(this.quizAnswers[qid] || {}), [iid]: cid };
        this._renderStaarQuiz();
      });
    });

    document.getElementById('submit-staar-btn')?.addEventListener('click', () => {
      this.quizSubmitted = true;
      let score = 0;
      questions.forEach((q) => {
        if (this._gradeQuestion(q)) score++;
      });
      const prev = this.progress.stars[this.currentModuleId] || 0;
      this.progress.stars[this.currentModuleId] = Math.max(prev, score);
      this._saveProgress();
      // Triumphant Fanfare if score >= 3, else Wrong Buzzer to motivate a retry!
      this.audio.playSfx(score >= 3 ? 'triumph' : 'wrong');
      this._renderStaarQuiz();
    });
  }

  _gradeQuestion(q) {
    const ans = this.quizAnswers[q.id];
    if (!ans) return false;
    if (q.type === 'single') {
      return ans === q.answer;
    } else if (q.type === 'multiselect') {
      if (!Array.isArray(ans) || !Array.isArray(q.answers)) return false;
      return ans.length === q.answers.length && q.answers.every((a) => ans.includes(a));
    } else if (q.type === 'multipart') {
      return ans.a === q.answerA && ans.b === q.answerB;
    } else if (q.type === 'inlinechoice') {
      const blanks = (q.segments || []).filter((s) => s.blankId);
      return blanks.every((b) => ans[b.blankId] === b.answer);
    } else if (q.type === 'dragsort') {
      return (q.items || []).every((item) => ans[item.id] === item.category);
    }
    return false;
  }

  openHubModal() {
    const totalStars = Object.values(this.progress.stars).reduce((a, b) => a + b, 0);
    const totalBadges = Object.values(this.progress.engineered).filter(Boolean).length;

    const units = [1, 2, 3, 4].map((uId) => {
      const mods = ALL_CURRICULUM.filter((m) => m.unitId === uId);
      const first = mods[0] || {};
      const cardsHtml = mods
        .map((m) => {
          const stars = this.progress.stars[m.id] || 0;
          const eng = this.progress.engineered[m.id];
          return `
            <div class="module-card ${m.id === this.currentModuleId ? 'active-module' : ''}" data-mid="${m.id}">
              <div>
                <div class="module-card-top">
                  <span class="teks-badge">${m.code}</span>
                  <span class="mastery-pill ${stars >= 4 ? 'mastered' : ''}">${'⭐'.repeat(stars)}${stars === 0 ? '0/5 ⭐' : ''} ${eng ? '🛠️' : ''}</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
                  <span class="module-icon">${m.icon}</span>
                  <div>
                    <div class="font-cyber" style="font-weight:800;font-size:0.86rem;color:#f8fafc;">${m.title}</div>
                    <div style="font-size:0.76rem;color:#94a3b8;margin-top:3px;">${m.subtitle || ''}</div>
                  </div>
                </div>
              </div>
              <div style="font-size:0.74rem;color:#00f0ff;font-weight:700;">📍 ${m.localAnchor || 'Dickinson ISD 5E Lab'} →</div>
            </div>`;
        })
        .join('');

      return `
        <div class="unit-section">
          <div class="unit-banner">
            <h3>${first.unitTitle || `Unit ${uId}`}</h3>
            <span class="unit-period">${first.gradingPeriod || 'Dickinson ISD YAG'}</span>
          </div>
          <div class="module-grid">${cardsHtml}</div>
        </div>`;
    });

    this.hubContent.innerHTML = `
      <div class="info-box" style="margin-bottom:18px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;">
        <div>
          <h4 style="font-size:0.92rem;">🐊 KELENNA'S DUNBAR 4TH GRADE SCIENCE PASSPORT</h4>
          <p>First-Principles 3D Learning • Rotating STAAR Question Pools • Narrated Vocabulary</p>
        </div>
        <div style="display:flex;gap:10px;">
          <span class="teks-badge" style="font-size:0.8rem;padding:6px 12px;">⭐ ${totalStars} / 60 MASTERY STARS</span>
          <span class="teks-badge" style="font-size:0.8rem;padding:6px 12px;border-color:#10b981;color:#34d399;background:rgba(16,185,129,0.16);">🛠️ ${totalBadges} / 12 STEM BADGES</span>
        </div>
      </div>
      ${units.join('')}
    `;

    this.hubContent.querySelectorAll('.module-card').forEach((card) => {
      card.addEventListener('click', () => {
        this.audio.unlock();
        this.audio.playSfx('chime');
        this.selectModule(card.dataset.mid, true);
      });
    });

    this.hubModal.classList.remove('hidden');
  }

  openNotebookModal() {
    const mod = this.activeModuleData;
    if (!mod) return;
    const savedNote = this.progress.notes[this.currentModuleId] || '';
    const vocabHtml = (mod.explain?.vocabulary || [])
      .map(
        (v, idx) => `
        <div class="vocab-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="vocab-term">📘 ${v.term}</div>
            <button class="cyber-btn active nb-speak-btn" data-idx="${idx}" style="padding:3px 8px;font-size:0.7rem;">🔊 Hear</button>
          </div>
          ${v.simpleMeaning ? `<div style="color:#fef3c7;font-size:0.79rem;margin-bottom:4px;"><strong>💡 Simple Meaning:</strong> ${v.simpleMeaning}</div>` : ''}
          <div class="vocab-def">${v.definition}</div>
          ${v.example ? `<div class="vocab-ex">Example: ${v.example}</div>` : ''}
        </div>`
      )
      .join('');

    this.notebookContent.innerHTML = `
      <div class="info-box" style="margin-bottom:14px;">
        <h4>📓 KELENNA'S INTERACTIVE SCIENCE NOTEBOOK — ${mod.code}: ${mod.title}</h4>
        <p><strong>"I CAN" TARGET:</strong> ${mod.iCanStatement}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
        <div>
          <h4 class="font-cyber" style="font-size:0.82rem;color:var(--theme-color);margin-bottom:8px;">✍️ CLAIM-EVIDENCE-REASONING (CER) LAB NOTES</h4>
          <textarea id="student-note-area" rows="9" placeholder="Record your lab observations, measurements (grams, °C, Newtons, cm), and scientific explanation here..." style="width:100%;padding:12px;border-radius:10px;border:1px solid rgba(245,158,11,0.35);background:rgba(8,12,21,0.9);color:#f8fafc;font-family:inherit;font-size:0.88rem;line-height:1.45;">${savedNote}</textarea>
          <button class="lab-btn emerald" id="save-note-btn" style="margin-top:8px;">💾 SAVE TO MY SCIENCE NOTEBOOK</button>
          <div id="note-saved-msg" style="display:none;color:#34d399;font-size:0.8rem;font-weight:700;margin-top:6px;">✓ Saved to Kelenna's Notebook!</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <h4 class="font-cyber" style="font-size:0.82rem;color:#00f0ff;margin-bottom:4px;">📇 NARRATED VOCABULARY REFERENCE</h4>
          ${vocabHtml}
        </div>
      </div>
    `;

    this.notebookContent.querySelectorAll('.nb-speak-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const v = (mod.explain?.vocabulary || [])[idx];
        if (!v) return;
        this.audio.unlock();
        const audioKey = `vocab_${v.id || `${mod.id}_v${idx}`}`;
        const text = v.narration || `${v.term}. ${v.simpleMeaning || v.definition} Example: ${v.example || ''}`;
        this.audio.speak(text, null, audioKey);
      });
    });

    document.getElementById('save-note-btn')?.addEventListener('click', () => {
      const val = document.getElementById('student-note-area')?.value || '';
      this.progress.notes[this.currentModuleId] = val;
      this._saveProgress();
      this.audio.playSfx('triumph');
      const msg = document.getElementById('note-saved-msg');
      if (msg) msg.style.display = 'block';
    });

    this.notebookModal.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.dunbarApp = new DunbarScienceApp();
});
