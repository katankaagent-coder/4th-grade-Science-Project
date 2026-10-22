import * as THREE from 'three';
import { textures } from './kit.js';

// Vespa: a friendly robot honeybee guide (inspired by the Vespa-X09 mechanical honeybee).
// Parts are kept as separate pieces so the "look inside" slider can pull them apart.
export class Vespa {
  constructor(stage) {
    this.stage = stage;
    this.root = new THREE.Group();
    this.body = new THREE.Group();
    this.root.add(this.body);
    this.parts = [];
    this.mood = 'neutral';
    this.home = new THREE.Vector3(2.2, 2.2, 1.5);
    this.root.position.copy(this.home);
    this.target = this.home.clone();
    this.flight = null;
    this.explode = 0;
    this.spin = 0;
    this._build();
    stage.scene.add(this.root);
    this.ping = this._makePing();
    stage.scene.add(this.ping);
    stage.onUpdate((dt, t) => this._update(dt, t));
  }

  _part(mesh, explodeDir) {
    mesh.userData.base = mesh.position.clone();
    mesh.userData.dir = new THREE.Vector3(...explodeDir);
    mesh.castShadow = true;
    this.body.add(mesh);
    this.parts.push(mesh);
    return mesh;
  }

  _build() {
    const gold = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.3 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1a1d24, metalness: 0.8, roughness: 0.35 });
    const copper = new THREE.MeshStandardMaterial({ color: 0xc8742a, metalness: 0.95, roughness: 0.25, emissive: 0x3a1500, emissiveIntensity: 0.5 });
    const glowC = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 2 });

    // Thorax (middle) and its glowing coil core.
    const thorax = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 24), dark), [0, 0.6, 0]);
    thorax.scale.set(1, 0.95, 1.05);
    const coil = this._part(new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.025, 12, 48), copper), [0, 0.9, 0]);
    coil.rotation.y = Math.PI / 2;
    const core = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), glowC), [0, 1.1, 0]);
    core.position.set(0, 0, 0);
    this.core = core;

    // Abdomen (striped back part).
    const stripeMat = new THREE.MeshStandardMaterial({ map: textures.stripes('#f59e0b', '#14161c', 7), metalness: 0.55, roughness: 0.35 });
    stripeMat.map.rotation = Math.PI / 2;
    stripeMat.map.center.set(0.5, 0.5);
    const abdomen = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 24), stripeMat), [0, 0, -1]);
    abdomen.scale.set(0.95, 0.9, 1.35);
    abdomen.position.set(0, -0.05, -0.38);
    abdomen.rotation.x = 0.25;
    const tip = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 10), glowC.clone()), [0, -0.3, -1.4]);
    tip.material.color.set(0xf59e0b);
    tip.material.emissive.set(0xf59e0b);
    tip.position.set(0, -0.14, -0.72);

    // Gear on the side of the abdomen.
    const gear = new THREE.Group();
    const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24), copper);
    disk.rotation.z = Math.PI / 2;
    gear.add(disk);
    for (let i = 0; i < 10; i++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.035, 0.035), copper);
      const a = (i / 10) * Math.PI * 2;
      tooth.position.set(0, Math.cos(a) * 0.1, Math.sin(a) * 0.1);
      gear.add(tooth);
    }
    gear.position.set(0.24, 0.02, -0.33);
    this._part(gear, [1.2, 0, -0.4]);
    this.gear = gear;

    // Head with a screen face.
    const head = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 24), gold), [0, 0.2, 1]);
    head.position.set(0, 0.06, 0.3);
    this.faceCanvas = document.createElement('canvas');
    this.faceCanvas.width = 512;
    this.faceCanvas.height = 256;
    this.faceTex = new THREE.CanvasTexture(this.faceCanvas);
    this.faceTex.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(
      new THREE.SphereGeometry(0.205, 32, 16, Math.PI * 0.18, Math.PI * 0.64, Math.PI * 0.3, Math.PI * 0.4),
      new THREE.MeshStandardMaterial({ map: this.faceTex, emissive: 0xffffff, emissiveMap: this.faceTex, emissiveIntensity: 1.2, roughness: 0.2 })
    );
    face.position.set(0, 0.06, 0.3);
    face.scale.setScalar(1.08);
    this._part(face, [0, 0.2, 1.6]);
    this.face = face;
    this._drawFace('neutral');

    // Antennae with glowing tips.
    [-1, 1].forEach((s) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.07 * s, 0.24, 0.36),
        new THREE.Vector3(0.12 * s, 0.42, 0.42),
        new THREE.Vector3(0.2 * s, 0.52, 0.55),
      ]);
      const ant = this._part(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.012, 8), dark), [0.3 * s, 1.2, 1]);
      ant.position.set(0, 0, 0);
      const bulb = this._part(new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), glowC), [0.4 * s, 1.4, 1.1]);
      bulb.position.set(0.2 * s, 0.52, 0.55);
    });

    // Wings: see-through and shimmering.
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.bezierCurveTo(0.15, 0.1, 0.55, 0.12, 0.62, 0.02);
    wingShape.bezierCurveTo(0.6, -0.08, 0.2, -0.12, 0, 0);
    const wingMat = new THREE.MeshPhysicalMaterial({
      color: 0xbfefff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      iridescence: 1,
      iridescenceIOR: 1.6,
      side: THREE.DoubleSide,
      depthWrite: false,
      emissive: 0x0a3040,
    });
    const veinMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 });
    this.wings = [];
    [
      [1, 0.04, 1],
      [-1, 0.04, 1],
      [1, -0.02, 0.7],
      [-1, -0.02, 0.7],
    ].forEach(([s, z, size]) => {
      const pivot = new THREE.Group();
      const m = new THREE.Mesh(new THREE.ShapeGeometry(wingShape, 24), wingMat);
      m.scale.set(size * s, size, size);
      const edge = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(wingShape.getPoints(24)), veinMat);
      edge.scale.copy(m.scale);
      pivot.add(m, edge);
      pivot.rotation.x = -Math.PI / 2;
      pivot.position.set(0.08 * s, 0.17, z - 0.02);
      pivot.userData.side = s;
      this._part(pivot, [1.4 * s, 0.6, 0]);
      this.wings.push(pivot);
    });

    // Six legs.
    for (let i = 0; i < 6; i++) {
      const s = i % 2 ? 1 : -1;
      const row = Math.floor(i / 2);
      const leg = new THREE.Group();
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.012, 0.18, 8), dark);
      upper.position.set(0.06 * s, -0.08, 0);
      upper.rotation.z = 0.8 * s;
      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.008, 0.16, 8), copper);
      lower.position.set(0.13 * s, -0.19, 0);
      lower.rotation.z = -0.2 * s;
      leg.add(upper, lower);
      leg.position.set(0.1 * s, -0.08, 0.1 - row * 0.12);
      this._part(leg, [0.9 * s, -0.9, 0.2 - row * 0.3]);
    }
    this.body.scale.setScalar(1.15);
  }

  _drawFace(mood) {
    const c = this.faceCanvas.getContext('2d');
    const W = 512, H = 256;
    c.fillStyle = '#05080d';
    c.fillRect(0, 0, W, H);
    const col = { neutral: '#00f0ff', happy: '#34d399', sad: '#fb7185', think: '#fbbf24', wow: '#c084fc' }[mood] || '#00f0ff';
    c.strokeStyle = col;
    c.fillStyle = col;
    c.lineWidth = 22;
    c.lineCap = 'round';
    c.shadowColor = col;
    c.shadowBlur = 30;
    const eyes = [W / 2 - 92, W / 2 + 92];
    const y = H / 2 - 6;
    for (const x of eyes) {
      c.beginPath();
      if (mood === 'happy') c.arc(x, y + 22, 42, Math.PI * 1.1, Math.PI * 1.9);
      else if (mood === 'sad') {
        c.moveTo(x - 38, y - 4 + (x < W / 2 ? 0 : 0));
        c.arc(x, y + 30, 40, Math.PI * 1.25, Math.PI * 1.75);
      } else if (mood === 'think') c.ellipse(x, y, 26, x < W / 2 ? 30 : 14, 0, 0, Math.PI * 2);
      else if (mood === 'wow') c.ellipse(x, y, 44, 52, 0, 0, Math.PI * 2);
      else c.ellipse(x, y, 32, 40, 0, 0, Math.PI * 2);
      if (mood === 'happy' || mood === 'sad') c.stroke();
      else c.fill();
    }
    if (mood === 'happy') {
      c.beginPath();
      c.arc(W / 2, y + 40, 34, 0.15 * Math.PI, 0.85 * Math.PI);
      c.stroke();
    }
    this.faceTex.needsUpdate = true;
  }

  _makePing() {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.45, 48),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0, side: THREE.DoubleSide, depthTest: false, fog: false })
    );
    m.renderOrder = 998;
    m.visible = false;
    m.userData.life = 0;
    return m;
  }

  setVisible(v) {
    this.root.visible = v;
  }

  setExplode(k) {
    this.explode = k;
    for (const p of this.parts) p.position.copy(p.userData.base).addScaledVector(p.userData.dir, k * 0.45);
  }

  // Fly next to a spot and point at it with a glowing ring.
  flyTo(point, { hover = true } = {}) {
    const p = new THREE.Vector3(...point);
    const cam = this.stage.camera.position;
    const toCam = cam.clone().sub(p).setY(0).normalize();
    const side = new THREE.Vector3().crossVectors(toCam, new THREE.Vector3(0, 1, 0)).normalize();
    const dest = p.clone().add(new THREE.Vector3(0, 0.75, 0)).addScaledVector(toCam, 0.5).addScaledVector(side, 0.55);
    this.flight = { from: this.root.position.clone(), to: dest, e: 0, dur: 1.1, look: p };
    if (hover) {
      this.ping.position.copy(p);
      this.ping.userData.life = 2.4;
      this.ping.visible = true;
    }
    return new Promise((r) => setTimeout(r, 1100));
  }

  goHome(pos) {
    if (pos) this.home.set(...pos);
    this.flight = { from: this.root.position.clone(), to: this.home.clone(), e: 0, dur: 1.2 };
  }

  react(mood) {
    this.mood = mood;
    this._drawFace(mood);
    this.reactT = 0;
    clearTimeout(this._moodTimer);
    this._moodTimer = setTimeout(() => {
      this.mood = 'neutral';
      this._drawFace('neutral');
    }, 1800);
  }

  _update(dt, t) {
    if (!this.root.visible) return;
    // Flight along a gentle arc.
    if (this.flight) {
      const f = this.flight;
      f.e += dt;
      const k = Math.min(1, f.e / f.dur);
      const s = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      this.root.position.lerpVectors(f.from, f.to, s);
      this.root.position.y += Math.sin(k * Math.PI) * 0.5;
      if (k >= 1) this.flight = null;
    }
    // Hover bob.
    this.body.position.y = Math.sin(t * 2.4) * 0.05;
    // Wings flap fast.
    const flap = Math.sin(t * 60) * 0.5;
    for (const w of this.wings) w.rotation.z = flap * w.userData.side * 0.6;
    this.gear.rotation.x += dt * 3;
    this.core.material.emissiveIntensity = 1.6 + Math.sin(t * 4) * 0.6;

    // Face the camera, with mood motion on top.
    const cam = this.stage.camera.position;
    const yaw = Math.atan2(cam.x - this.root.position.x, cam.z - this.root.position.z);
    let dy = yaw - this.root.rotation.y;
    dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    this.root.rotation.y += dy * Math.min(1, dt * 4);
    this.reactT = (this.reactT ?? 9) + dt;
    const r = this.reactT;
    this.body.rotation.set(0, 0, 0);
    if (this.mood === 'happy' && r < 0.8) {
      this.body.rotation.y = (r / 0.8) * Math.PI * 2;
      this.body.position.y += Math.sin((r / 0.8) * Math.PI) * 0.3;
    } else if (this.mood === 'sad') {
      this.body.rotation.x = 0.35;
      this.body.rotation.z = r < 0.6 ? Math.sin(r * 30) * 0.12 : 0;
    } else if (this.mood === 'think') {
      this.body.rotation.z = 0.25;
    } else if (this.mood === 'wow' && r < 0.5) {
      this.body.position.y += Math.sin((r / 0.5) * Math.PI) * 0.25;
    }

    const ping = this.ping;
    if (ping.userData.life > 0) {
      ping.userData.life -= dt;
      ping.lookAt(this.stage.camera.position);
      const k = (2.4 - ping.userData.life) % 0.8;
      ping.scale.setScalar(0.6 + k * 1.2);
      ping.material.opacity = Math.max(0, 0.9 - k * 1.1) * Math.min(1, ping.userData.life);
      if (ping.userData.life <= 0) ping.visible = false;
    }
  }
}
