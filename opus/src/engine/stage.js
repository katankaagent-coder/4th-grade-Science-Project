import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const BG = 0x060709;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export class Stage {
  constructor(container) {
    this.container = container;
    this.updaters = new Set();
    this.tapTargets = new Map();
    this.dragTargets = new Map();
    this.camTween = null;

    const r = (this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }));
    this.maxDpr = Math.min(window.devicePixelRatio || 1, 2);
    r.setPixelRatio(this.maxDpr);
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.05;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(r.domElement);
    r.domElement.className = 'stage-canvas';

    const scene = (this.scene = new THREE.Scene());
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.FogExp2(BG, 0.028);
    const pmrem = new THREE.PMREMGenerator(r);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.35;

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.05, 400);
    this.camera.position.set(0, 4, 10);

    const c = (this.controls = new OrbitControls(this.camera, r.domElement));
    c.enableDamping = true;
    c.dampingFactor = 0.08;
    c.enablePan = false;
    c.minDistance = 2;
    c.maxDistance = 40;
    c.maxPolarAngle = Math.PI * 0.49;
    c.target.set(0, 1, 0);

    this._buildStudio();
    this.content = new THREE.Group();
    scene.add(this.content);

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this._bindInput();
    this._resize();
    new ResizeObserver(() => this._resize()).observe(container);
    this._fps = { frames: 0, time: 0, low: 0 };
    r.setAnimationLoop(() => this._tick());
  }

  _buildStudio() {
    const s = this.scene;
    s.add(new THREE.AmbientLight(0x8899bb, 0.35));
    s.add(new THREE.HemisphereLight(0x9fd8ff, 0x1a1030, 0.45));

    const key = new THREE.SpotLight(0xffd27a, 60, 60, Math.PI / 5, 0.5, 1.4);
    key.position.set(6, 12, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0004;
    key.shadow.radius = 4;
    s.add(key, key.target);
    this.keyLight = key;

    const rim = new THREE.DirectionalLight(0x00f0ff, 1.6);
    rim.position.set(-8, 6, -10);
    s.add(rim);
    const under = new THREE.PointLight(0x7928ca, 18, 30, 1.6);
    under.position.set(0, -1.5, 4);
    s.add(under);
    const front = new THREE.DirectionalLight(0xffffff, 0.8);
    front.position.set(0, 5, 12);
    s.add(front);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(30, 96),
      new THREE.MeshStandardMaterial({ color: 0x0b0e14, roughness: 0.85, metalness: 0.2 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    s.add(floor);
    this.floor = floor;

    this.rings = new THREE.Group();
    [
      [7.2, 7.32, 0xf59e0b, 0.55],
      [8.6, 8.66, 0x00f0ff, 0.45],
      [11, 11.04, 0xf59e0b, 0.25],
    ].forEach(([a, b, col, op]) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(a, b, 160),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: THREE.DoubleSide, fog: false })
      );
      m.rotation.x = -Math.PI / 2;
      this.rings.add(m);
    });
    this.rings.position.y = 0.0;
    s.add(this.rings);

    const n = 420;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const gold = new THREE.Color(0xffb703), cyan = new THREE.Color(0x00f0ff);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const cc = Math.random() < 0.6 ? gold : cyan;
      col.set([cc.r, cc.g, cc.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    this.dust = new THREE.Points(
      g,
      new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    s.add(this.dust);
  }

  setStudioVisible(v) {
    this.floor.visible = v;
    this.rings.visible = v;
  }

  _resize() {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 0.8 ? 58 : 45;
    this.camera.updateProjectionMatrix();
  }

  onUpdate(fn) {
    this.updaters.add(fn);
    return () => this.updaters.delete(fn);
  }

  _tick() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    this.rings.rotation.y += dt * 0.05;
    this.dust.rotation.y += dt * 0.01;
    if (this.camTween) this._stepCam(dt);
    for (const fn of this.updaters) fn(dt, t);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this._adapt(dt);
  }

  _adapt(dt) {
    const f = this._fps;
    f.frames++;
    f.time += dt;
    if (f.time >= 2) {
      const fps = f.frames / f.time;
      this.fps = fps;
      f.frames = 0;
      f.time = 0;
      const pr = this.renderer.getPixelRatio();
      if (fps < 40 && pr > 1) this.renderer.setPixelRatio(Math.max(1, pr - 0.5));
      else if (fps > 57 && pr < this.maxDpr) this.renderer.setPixelRatio(Math.min(this.maxDpr, pr + 0.25));
    }
  }

  flyTo(pos, look, ms = 1400) {
    if (!pos) return Promise.resolve();
    return new Promise((resolve) => {
      if (this.camTween) this.camTween.resolve();
      this.camTween = {
        p0: this.camera.position.clone(),
        t0: this.controls.target.clone(),
        p1: new THREE.Vector3(...pos),
        t1: new THREE.Vector3(...(look || [0, 1, 0])),
        dur: ms / 1000,
        e: 0,
        resolve,
      };
    });
  }

  _stepCam(dt) {
    const c = this.camTween;
    c.e += dt;
    const k = ease(Math.min(1, c.e / c.dur));
    this.camera.position.lerpVectors(c.p0, c.p1, k);
    this.controls.target.lerpVectors(c.t0, c.t1, k);
    if (k >= 1) {
      this.camTween = null;
      c.resolve();
    }
  }

  setContent(group) {
    this.clearContent();
    this.content.add(group);
  }

  clearContent() {
    for (const child of [...this.content.children]) {
      this.content.remove(child);
      disposeTree(child);
    }
    this.tapTargets.clear();
    this.dragTargets.clear();
  }

  // ---------- input: taps and drags ----------
  _ndc(e) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }

  _hit(e, map) {
    if (!map.size) return null;
    this.raycaster.setFromCamera(this._ndc(e), this.camera);
    const objs = [...map.keys()].filter((o) => isShown(o));
    const hits = this.raycaster.intersectObjects(objs, true);
    for (const h of hits) {
      let o = h.object;
      while (o && !map.has(o)) o = o.parent;
      if (o) return { obj: o, point: h.point, handler: map.get(o) };
    }
    return null;
  }

  _bindInput() {
    const el = this.renderer.domElement;
    let down = null, drag = null;
    const plane = new THREE.Plane();
    const pt = new THREE.Vector3();
    el.addEventListener('pointerdown', (e) => {
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
      const h = this._hit(e, this.dragTargets);
      if (h) {
        drag = h;
        this.controls.enabled = false;
        const o = h.handler.opts;
        const normal = o.plane === 'xy' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
        plane.setFromNormalAndCoplanarPoint(normal, h.point);
        drag.offset = h.obj.getWorldPosition(new THREE.Vector3()).sub(h.point);
        el.setPointerCapture(e.pointerId);
        o.onStart?.();
      }
    });
    el.addEventListener('pointermove', (e) => {
      if (!drag) return;
      this.raycaster.setFromCamera(this._ndc(e), this.camera);
      if (this.raycaster.ray.intersectPlane(plane, pt)) drag.handler.opts.onMove?.(pt.clone().add(drag.offset));
    });
    const up = (e) => {
      if (drag) {
        this.controls.enabled = true;
        drag.handler.opts.onEnd?.();
        drag = null;
      }
      if (down) {
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        if (moved < 10 && performance.now() - down.t < 500) {
          const h = this._hit(e, this.tapTargets);
          if (h) h.handler(h.point);
        }
      }
      down = null;
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', () => {
      if (drag) this.controls.enabled = true;
      drag = null;
      down = null;
    });
  }
}

function isShown(o) {
  while (o) {
    if (!o.visible) return false;
    o = o.parent;
  }
  return true;
}

export function disposeTree(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      for (const k in m) if (m[k] && m[k].isTexture) m[k].dispose();
      m.dispose();
    }
  });
}
