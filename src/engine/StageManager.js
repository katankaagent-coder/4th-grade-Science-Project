// StageManager: Vespa-X09 Cyber-Organic Edition
// Deep #060709 Obsidian Stage, 4-Point Golden/Cyan/Purple Rim Lighting, Concentric Cyber Floor Rings,
// Drifting Energy Dust Particles, 2x Retina Crisp Rendering, and Deterministic GPU Memory Disposal.

import { ProceduralTextures } from './ProceduralTextures.js';
import { MasterTimeline } from './MasterTimeline.js';

export const CYBER_THEMES = {
  amber: {
    primary: 0xf59e0b,
    emissive: 0xff7700,
    cssHex: '#f59e0b',
    cssGlow: 'rgba(245, 158, 11, 0.5)',
    cssSoft: 'rgba(245, 158, 11, 0.16)'
  },
  cyan: {
    primary: 0x00f0ff,
    emissive: 0x0077b6,
    cssHex: '#00f0ff',
    cssGlow: 'rgba(0, 240, 255, 0.5)',
    cssSoft: 'rgba(0, 240, 255, 0.16)'
  },
  crimson: {
    primary: 0xf43f5e,
    emissive: 0xd90429,
    cssHex: '#f43f5e',
    cssGlow: 'rgba(244, 63, 94, 0.5)',
    cssSoft: 'rgba(244, 63, 94, 0.16)'
  },
  emerald: {
    primary: 0x10b981,
    emissive: 0x059669,
    cssHex: '#10b981',
    cssGlow: 'rgba(16, 185, 129, 0.5)',
    cssSoft: 'rgba(16, 185, 129, 0.16)'
  }
};

export class StageManager {
  constructor({ canvas, THREE, audio, onTelemetryUpdate, onTimelineUpdate, onTimelineComplete }) {
    this.canvas = canvas;
    this.THREE = THREE;
    this.audio = audio;
    this.onTelemetryUpdate = onTelemetryUpdate;

    // 1. WebGL 2.0 Renderer locked at sharp native Retina Pixel Ratio
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.maxDpr = Math.min(window.devicePixelRatio || 1.5, 2.0);
    this.currentDpr = this.maxDpr;
    this.renderer.setPixelRatio(this.currentDpr);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (THREE.ACESFilmicToneMapping !== undefined) {
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.18;
    }

    // 2. Deep Obsidian Cyber-Studio Scene & Exponential Fog (#060709)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060709);
    this.scene.fog = new THREE.FogExp2(0x060709, 0.014);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);
    this.camera.position.set(0, 6.5, 14.8);

    // 3. Touch/Trackpad Orbit + Drag Arbitrator
    this.orbit = this._createOrbitController();

    // 4. Vespa-X09 4-Point Cyber Studio Lighting Rig
    this._setupLighting();

    // 5. Concentric Cybernetic Floor Rings & Drifting Energy Plasma Dust Field
    this.particlesActive = true;
    this.currentThemeKey = 'amber';
    this._setupCyberAtmosphere();

    // 6. Procedural Texture & 2x Retina Label Factory
    this.textures = new ProceduralTextures(THREE);

    // 7. Active Module Container Group
    this.moduleGroup = new THREE.Group();
    this.scene.add(this.moduleGroup);

    // 8. 3D Callout Highlight Ring & Floating Pin
    this._setupCalloutPin();

    // 9. Master Video Timeline
    this.timeline = new MasterTimeline({
      THREE,
      camera: this.camera,
      controls: this.orbit,
      audio: this.audio,
      onUiUpdate: (state) => {
        this._updateCalloutFromTimeline(state.segment);
        if (onTimelineUpdate) onTimelineUpdate(state);
      },
      onComplete: onTimelineComplete
    });

    // 10. Raycaster for 3D Object Picking & Drag-and-Drop
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.dragTarget = null;
    this.dragIntersection = new THREE.Vector3();

    this.activeController = null;
    this.currentStage = 'engage';
    this.clock = new THREE.Clock();
    this.elapsed = 0;

    this._bindPointerEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  _setupLighting() {
    const THREE = this.THREE;

    this.ambientLight = new THREE.AmbientLight(0x1e293b, 1.45);
    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x0f172a, 0.9);
    this.hemiLight.position.set(0, 28, 0);
    this.scene.add(this.hemiLight);

    // Warm Golden Key Light with crisp 2048x2048 shadows
    this.dirLight = new THREE.DirectionalLight(0xffd166, 1.55);
    this.dirLight.position.set(12, 18, 12);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 1;
    this.dirLight.shadow.camera.far = 65;
    const d = 15;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0005;
    this.scene.add(this.dirLight);

    // Cool Cyan Edge Rim Backlight (from Vespa-X09 Honeybee)
    this.rimLight = new THREE.DirectionalLight(0x00f0ff, 1.25);
    this.rimLight.position.set(-14, 10, -12);
    this.scene.add(this.rimLight);

    // Soft Purple Underfill Light
    this.underLight = new THREE.PointLight(0x7928ca, 1.1, 32);
    this.underLight.position.set(0, -6, 2);
    this.scene.add(this.underLight);
  }

  _setupCyberAtmosphere() {
    const THREE = this.THREE;
    this.atmosphereGroup = new THREE.Group();
    this.scene.add(this.atmosphereGroup);

    // Outer Concentric Cybernetic Telemetry Ring
    const ringGeo1 = new THREE.RingGeometry(11.8, 12.02, 64);
    this.ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.38
    });
    this.cyberRing1 = new THREE.Mesh(ringGeo1, this.ringMat1);
    this.cyberRing1.rotation.x = -Math.PI / 2;
    this.cyberRing1.position.y = -2.15;
    this.atmosphereGroup.add(this.cyberRing1);

    // Inner Cyan Telemetry Ring
    const ringGeo2 = new THREE.RingGeometry(7.2, 7.34, 48);
    this.ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28
    });
    this.cyberRing2 = new THREE.Mesh(ringGeo2, this.ringMat2);
    this.cyberRing2.rotation.x = -Math.PI / 2;
    this.cyberRing2.position.y = -2.14;
    this.atmosphereGroup.add(this.cyberRing2);

    // Golden Energy Plasma Dust Field (from Vespa-X09 Honeybee)
    this.pollenCount = 450;
    this.pollenGeo = new THREE.BufferGeometry();
    const pollenPos = new Float32Array(this.pollenCount * 3);
    for (let i = 0; i < this.pollenCount * 3; i += 3) {
      pollenPos[i] = (Math.random() - 0.5) * 34;
      pollenPos[i + 1] = (Math.random() - 0.5) * 22;
      pollenPos[i + 2] = (Math.random() - 0.5) * 34;
    }
    this.pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPos, 3));

    this.pollenMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.14,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending
    });
    this.pollenParticles = new THREE.Points(this.pollenGeo, this.pollenMat);
    this.atmosphereGroup.add(this.pollenParticles);
  }

  setEnergyTheme(themeKey) {
    const th = CYBER_THEMES[themeKey] || CYBER_THEMES.amber;
    this.currentThemeKey = themeKey;
    if (this.ringMat1) this.ringMat1.color.setHex(th.primary);
    if (this.pollenMat) this.pollenMat.color.setHex(th.primary);
    if (this.calloutRingMat) this.calloutRingMat.color.setHex(th.primary);
    if (this.calloutStemMat) this.calloutStemMat.color.setHex(th.primary);
    document.documentElement.style.setProperty('--theme-color', th.cssHex);
    document.documentElement.style.setProperty('--theme-glow', th.cssGlow);
    document.documentElement.style.setProperty('--theme-color-15', th.cssSoft);
  }

  toggleDustParticles() {
    this.particlesActive = !this.particlesActive;
    if (this.pollenParticles) {
      this.pollenParticles.visible = this.particlesActive;
    }
    return this.particlesActive;
  }

  _setupCalloutPin() {
    const THREE = this.THREE;
    this.calloutGroup = new THREE.Group();
    this.calloutGroup.visible = false;

    const ringGeo = new THREE.RingGeometry(0.55, 0.74, 36);
    ringGeo.rotateX(-Math.PI / 2);
    this.calloutRingMat = new THREE.MeshBasicMaterial({
      color: '#f59e0b',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });
    this.calloutRing = new THREE.Mesh(ringGeo, this.calloutRingMat);
    this.calloutGroup.add(this.calloutRing);

    const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 12);
    stemGeo.translate(0, 0.75, 0);
    this.calloutStemMat = new THREE.MeshBasicMaterial({ color: '#f59e0b' });
    this.calloutStem = new THREE.Mesh(stemGeo, this.calloutStemMat);
    this.calloutGroup.add(this.calloutStem);

    this.calloutSprite = this.textures.labelSprite('Concept Focus', {
      subtext: 'Dunbar 5E Guided Tour',
      border: '#f59e0b',
      scale: 2.15
    });
    this.calloutSprite.position.set(0, 1.95, 0);
    this.calloutGroup.add(this.calloutSprite);

    this.scene.add(this.calloutGroup);
  }

  _updateCalloutFromTimeline(segment) {
    if (!segment || !segment.callout || !this.timeline.playing) {
      this.calloutGroup.visible = false;
      return;
    }
    const th = CYBER_THEMES[this.currentThemeKey] || CYBER_THEMES.amber;
    const { title, text, pos } = segment.callout;
    this.calloutGroup.visible = true;
    const p = pos || [0, 1.5, 0];
    this.calloutGroup.position.set(p[0], p[1], p[2]);
    this.calloutSprite.updateText(title || 'Focus Area', text || '', th.cssHex);
  }

  _createOrbitController() {
    const THREE = this.THREE;
    const target = new THREE.Vector3(0, 1.2, 0);
    const spherical = {
      radius: 15.5,
      phi: Math.PI / 3,
      theta: 0
    };

    const updateCameraFromSpherical = () => {
      spherical.phi = Math.max(0.18, Math.min(Math.PI / 2 - 0.04, spherical.phi));
      spherical.radius = Math.max(4.5, Math.min(34, spherical.radius));
      const sinPhiRadius = Math.sin(spherical.phi) * spherical.radius;
      this.camera.position.x = target.x + sinPhiRadius * Math.sin(spherical.theta);
      this.camera.position.y = target.y + Math.cos(spherical.phi) * spherical.radius;
      this.camera.position.z = target.z + sinPhiRadius * Math.cos(spherical.theta);
      this.camera.lookAt(target);
    };

    const syncSphericalFromCamera = () => {
      const offset = this.camera.position.clone().sub(target);
      spherical.radius = Math.max(4.5, offset.length());
      spherical.theta = Math.atan2(offset.x, offset.z);
      spherical.phi = Math.acos(Math.max(-1, Math.min(1, offset.y / spherical.radius)));
    };

    updateCameraFromSpherical();

    return {
      enabled: true,
      target,
      spherical,
      updateCameraFromSpherical,
      syncSphericalFromCamera,
      resetView: (pos = [0, 6.2, 14.8], look = [0, 1.2, 0]) => {
        target.set(look[0], look[1], look[2]);
        this.camera.position.set(pos[0], pos[1], pos[2]);
        this.camera.lookAt(target);
        syncSphericalFromCamera();
      }
    };
  }

  _bindPointerEvents() {
    let isOrbiting = false;
    let lastX = 0;
    let lastY = 0;
    let pinchStartDist = 0;
    let pinchStartRadius = 15;

    const getNormalizedPointer = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onDown = (clientX, clientY) => {
      this.audio.unlock();
      getNormalizedPointer(clientX, clientY);

      if (
        this.activeController &&
        Array.isArray(this.activeController.interactables) &&
        this.activeController.interactables.length
      ) {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(this.activeController.interactables, true);
        if (hits.length > 0) {
          let hitObj = hits[0].object;
          while (hitObj && !this.activeController.interactables.includes(hitObj) && hitObj.parent) {
            hitObj = hitObj.parent;
          }
          const picked = hitObj || hits[0].object;
          if (this.activeController.onObjectClick) {
            this.activeController.onObjectClick(picked, hits[0].point);
          }
          if (this.activeController.onObjectDrag) {
            this.dragTarget = picked;
            this.dragPlane.setFromNormalAndCoplanarPoint(
              new this.THREE.Vector3(0, 1, 0),
              hits[0].point
            );
            return;
          }
        }
      }

      if (this.orbit.enabled && !this.timeline.playing) {
        this.orbit.syncSphericalFromCamera();
        isOrbiting = true;
        lastX = clientX;
        lastY = clientY;
      }
    };

    const onMove = (clientX, clientY) => {
      if (this.dragTarget && this.activeController && this.activeController.onObjectDrag) {
        getNormalizedPointer(clientX, clientY);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        if (this.raycaster.ray.intersectPlane(this.dragPlane, this.dragIntersection)) {
          this.activeController.onObjectDrag(this.dragTarget, this.dragIntersection);
        }
        return;
      }
      if (isOrbiting && this.orbit.enabled && !this.timeline.playing) {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        lastX = clientX;
        lastY = clientY;
        this.orbit.spherical.theta -= dx * 0.0075;
        this.orbit.spherical.phi -= dy * 0.0075;
        this.orbit.updateCameraFromSpherical();
      }
    };

    const onUp = () => {
      this.dragTarget = null;
      isOrbiting = false;
    };

    this.canvas.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    this.canvas.addEventListener(
      'wheel',
      (e) => {
        if (!this.orbit.enabled || this.timeline.playing) return;
        e.preventDefault();
        this.orbit.syncSphericalFromCamera();
        this.orbit.spherical.radius += e.deltaY * 0.012;
        this.orbit.updateCameraFromSpherical();
      },
      { passive: false }
    );

    this.canvas.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          onDown(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2 && this.orbit.enabled && !this.timeline.playing) {
          isOrbiting = false;
          this.dragTarget = null;
          this.orbit.syncSphericalFromCamera();
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          pinchStartDist = Math.hypot(dx, dy);
          pinchStartRadius = this.orbit.spherical.radius;
        }
      },
      { passive: true }
    );

    this.canvas.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2 && pinchStartDist > 0 && this.orbit.enabled && !this.timeline.playing) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const dist = Math.hypot(dx, dy);
          const scale = pinchStartDist / Math.max(20, dist);
          this.orbit.spherical.radius = pinchStartRadius * scale;
          this.orbit.updateCameraFromSpherical();
        }
      },
      { passive: true }
    );

    this.canvas.addEventListener('touchend', () => {
      pinchStartDist = 0;
      onUp();
    });
  }

  clearCurrentModule() {
    this.timeline.pause(true);
    this.calloutGroup.visible = false;
    if (this.activeController && typeof this.activeController.dispose === 'function') {
      try {
        this.activeController.dispose();
      } catch (_) {}
    }
    this.activeController = null;

    while (this.moduleGroup.children.length > 0) {
      const child = this.moduleGroup.children[0];
      this.moduleGroup.remove(child);
      this._disposeHierarchy(child);
    }
  }

  _disposeHierarchy(node) {
    if (!node) return;
    if (node.children && node.children.length) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        this._disposeHierarchy(node.children[i]);
      }
    }
    if (node.geometry && typeof node.geometry.dispose === 'function') {
      node.geometry.dispose();
    }
    if (node.material) {
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((m) => {
        if (m && typeof m.dispose === 'function') m.dispose();
      });
    }
  }

  loadModule(moduleBuilderFn, moduleData) {
    this.clearCurrentModule();

    // Always use the rich Vespa-X09 deep obsidian #060709 studio background so all 3D models pop vividly!
    this.scene.background.setHex(0x060709);
    this.scene.fog.color.setHex(0x060709);
    this.scene.fog.density = 0.013;

    this.orbit.resetView([0, 6.2, 14.8], [0, 1.2, 0]);

    const ctx = {
      THREE: this.THREE,
      group: this.moduleGroup,
      scene: this.moduleGroup,
      camera: this.camera,
      textures: this.textures,
      audio: this.audio,
      updateTelemetry: (metrics) => {
        if (this.onTelemetryUpdate) this.onTelemetryUpdate(metrics);
      }
    };

    try {
      this.activeController = moduleBuilderFn(ctx) || {};
    } catch (err) {
      console.error('Error building 3D module:', err);
      this.activeController = { controls: [], interactables: [] };
    }
    return this.activeController;
  }

  resize() {
    const parent = this.canvas.parentElement || document.body;
    const w = Math.max(300, parent.clientWidth || window.innerWidth);
    const h = Math.max(240, parent.clientHeight || window.innerHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1.5, 2.0));
    this.renderer.setSize(w, h, false);
  }

  startRenderLoop() {
    const tick = () => {
      requestAnimationFrame(tick);
      const dt = Math.min(0.1, this.clock.getDelta());
      this.elapsed += dt;

      this.timeline.update(dt);

      if (this.calloutGroup.visible) {
        const pulse = 1 + Math.sin(this.elapsed * 5) * 0.14;
        this.calloutRing.scale.set(pulse, pulse, 1);
      }

      // Gently drift the Vespa-X09 Golden/Cyan Energy Dust Particles
      if (this.particlesActive && this.pollenGeo) {
        const positions = this.pollenGeo.attributes.position.array;
        for (let p = 0; p < this.pollenCount * 3; p += 3) {
          positions[p + 1] -= dt * 0.35;
          positions[p] += Math.sin(this.elapsed + p) * 0.008;
          if (positions[p + 1] < -5.5) {
            positions[p + 1] = 13.5;
          }
        }
        this.pollenGeo.attributes.position.needsUpdate = true;
      }

      if (this.activeController && typeof this.activeController.update === 'function') {
        try {
          this.activeController.update(dt, this.elapsed, this.currentStage, this.timeline.currentTime);
        } catch (err) {
          console.warn('Module frame update warning:', err);
        }
      }

      this.renderer.render(this.scene, this.camera);
    };
    requestAnimationFrame(tick);
  }
}
