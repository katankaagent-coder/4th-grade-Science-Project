import * as THREE from 'three';

export const EASE = {
  linear: (t) => t,
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  bounce: (t) => {
    const n = 7.5625, d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  },
  back: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
};

function resolvePath(obj, path) {
  const parts = path.split('.');
  const key = parts.pop();
  let o = obj;
  for (const p of parts) o = o[p];
  return [o, key];
}

export function createKit({ stage, audio, tray, vespa, emit }) {
  const tweens = new Set();
  // Tweens run on the wall clock so slow devices finish on time (just with fewer frames).
  const unsub = stage.onUpdate(() => {
    const now = performance.now();
    for (const tw of [...tweens]) {
      tw.t0 ??= now;
      const k = Math.min(1, (now - tw.t0) / tw.ms);
      tw.step(tw.ease(k));
      if (k >= 1) {
        tweens.delete(tw);
        tw.resolve();
      }
    }
  });

  function tween(obj, props, ms = 600, ease = 'inOut') {
    const fields = Object.entries(props).map(([path, to]) => {
      const [o, key] = resolvePath(obj, path);
      return { o, key, from: o[key], to };
    });
    return new Promise((resolve) => {
      tweens.add({
        e: 0,
        ms,
        ease: typeof ease === 'function' ? ease : EASE[ease] || EASE.inOut,
        resolve,
        step: (k) => fields.forEach((f) => (f.o[f.key] = f.from + (f.to - f.from) * k)),
      });
    });
  }

  function animate(ms, fn, ease = 'linear') {
    return new Promise((resolve) => {
      tweens.add({ e: 0, ms, ease: EASE[ease] || EASE.linear, resolve, step: fn });
    });
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const kit = {
    THREE,
    stage,
    emit,
    vespa,
    sfx: (name) => audio.sfx(name),
    tween,
    animate,
    wait,
    label: (text, opts) => makeLabel(text, opts),
    arrow: (color) => makeArrow(color),
    mat: materials,
    tex: textures,
    particles: (count, opts) => makeParticles(count, opts),
    onTap: (obj, fn) => stage.tapTargets.set(obj, fn),
    offTap: (obj) => stage.tapTargets.delete(obj),
    onDrag: (obj, opts) => stage.dragTargets.set(obj, { opts }),
    offDrag: (obj) => stage.dragTargets.delete(obj),
    ui: makeTray(tray, audio),
    dispose() {
      unsub();
      tweens.clear();
      kit.ui.clear();
    },
  };
  return kit;
}

// ---------------- labels ----------------
export function makeLabel(text, { color = '#ffffff', size = 0.5, bg = 'rgba(8,12,20,0.82)', border = '#00f0ff' } = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, fog: false }));
  sprite.renderOrder = 999;
  const draw = (t) => {
    const fs = 72;
    ctx.font = `700 ${fs}px "Atkinson Hyperlegible", system-ui, sans-serif`;
    const w = Math.ceil(ctx.measureText(t).width) + 80;
    const h = fs + 56;
    canvas.width = w;
    canvas.height = h;
    ctx.font = `700 ${fs}px "Atkinson Hyperlegible", system-ui, sans-serif`;
    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 6;
    const r = 28;
    ctx.beginPath();
    ctx.moveTo(r, 3);
    ctx.arcTo(w - 3, 3, w - 3, h - 3, r);
    ctx.arcTo(w - 3, h - 3, 3, h - 3, r);
    ctx.arcTo(3, h - 3, 3, 3, r);
    ctx.arcTo(3, 3, w - 3, 3, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(t, 40, h / 2 + 4);
    tex.dispose();
    tex.image = canvas;
    tex.needsUpdate = true;
    sprite.scale.set((size * w) / h, size, 1);
  };
  draw(text);
  sprite.setText = draw;
  return sprite;
}

// ---------------- force arrows ----------------
export function makeArrow(color = 0xf43f5e) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7, roughness: 0.35 });
  const shaftGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 16);
  shaftGeo.translate(0, 0.5, 0);
  const shaft = new THREE.Mesh(shaftGeo, m);
  const headGeo = new THREE.ConeGeometry(0.16, 0.34, 20);
  headGeo.translate(0, 0.17, 0);
  const head = new THREE.Mesh(headGeo, m);
  g.add(shaft, head);
  const up = new THREE.Vector3(0, 1, 0);
  g.set = (len, dir = up) => {
    const L = Math.max(0.001, len);
    shaft.scale.y = Math.max(0.001, L - 0.3);
    head.position.y = Math.max(0, L - 0.3);
    g.quaternion.setFromUnitVectors(up, dir.clone().normalize());
    g.visible = len > 0.05;
  };
  g.set(1);
  return g;
}

// ---------------- particles ----------------
export function makeParticles(count, { size = 0.08, color = 0x00f0ff, spread = 1, additive = true } = {}) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(
    g,
    new THREE.PointsMaterial({
      size,
      color,
      map: textures.dot(),
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
  );
  pts.positions = pos;
  pts.commit = () => (g.attributes.position.needsUpdate = true);
  return pts;
}

// ---------------- textures ----------------
function canvasTex(w, h, paint, repeat) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  paint(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
  }
  t.anisotropy = 4;
  return t;
}

export const textures = {
  dot: () =>
    canvasTex(64, 64, (c) => {
      const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.35, 'rgba(255,255,255,0.8)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = g;
      c.fillRect(0, 0, 64, 64);
    }),
  wood: (base = '#8a5a2b') =>
    canvasTex(512, 512, (c, w, h) => {
      c.fillStyle = base;
      c.fillRect(0, 0, w, h);
      for (let i = 0; i < 90; i++) {
        c.strokeStyle = `rgba(${40 + Math.random() * 30},${20 + Math.random() * 20},5,${0.15 + Math.random() * 0.25})`;
        c.lineWidth = 1 + Math.random() * 3;
        c.beginPath();
        const y = Math.random() * h;
        c.moveTo(0, y);
        for (let x = 0; x <= w; x += 32) c.lineTo(x, y + Math.sin(x * 0.02 + i) * 6);
        c.stroke();
      }
    }),
  rock: (base = '#7c7a76') =>
    canvasTex(256, 256, (c, w, h) => {
      c.fillStyle = base;
      c.fillRect(0, 0, w, h);
      for (let i = 0; i < 1800; i++) {
        const v = Math.random() * 80 - 40;
        c.fillStyle = `rgba(${128 + v},${126 + v},${122 + v},0.35)`;
        c.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 4, 2 + Math.random() * 4);
      }
    }),
  grid: (line = 'rgba(0,240,255,0.25)', bg = '#0d1420') =>
    canvasTex(
      256,
      256,
      (c, w, h) => {
        c.fillStyle = bg;
        c.fillRect(0, 0, w, h);
        c.strokeStyle = line;
        c.lineWidth = 2;
        for (let i = 0; i <= 8; i++) {
          c.beginPath();
          c.moveTo((i * w) / 8, 0);
          c.lineTo((i * w) / 8, h);
          c.moveTo(0, (i * h) / 8);
          c.lineTo(w, (i * h) / 8);
          c.stroke();
        }
      },
      4
    ),
  stripes: (a = '#f59e0b', b = '#111111', n = 6) =>
    canvasTex(256, 256, (c, w, h) => {
      for (let i = 0; i < n; i++) {
        c.fillStyle = i % 2 ? b : a;
        c.fillRect(0, (i * h) / n, w, h / n);
      }
    }),
  canvas: canvasTex,
};

// ---------------- materials ----------------
export const materials = {
  glass: (tint = 0xd8f3ff) =>
    new THREE.MeshPhysicalMaterial({
      color: tint,
      metalness: 0,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.2,
      ior: 1.45,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  water: (color = 0x1e88e5) =>
    new THREE.MeshPhysicalMaterial({ color, roughness: 0.15, metalness: 0, transparent: true, opacity: 0.55, depthWrite: false, clearcoat: 1 }),
  metal: (color = 0xb8c2cc) => new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.28 }),
  plastic: (color = 0xf43f5e) => new THREE.MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.4 }),
  glow: (color = 0x00f0ff, intensity = 1.5) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity }),
  wood: (base) => new THREE.MeshStandardMaterial({ map: textures.wood(base), roughness: 0.75 }),
  rock: (base) => new THREE.MeshStandardMaterial({ map: textures.rock(base), roughness: 0.95 }),
  ground: (color = 0x1b2a1b) => new THREE.MeshStandardMaterial({ color, roughness: 0.95 }),
};

// ---------------- tool tray (HTML controls for scenes) ----------------
function makeTray(tray, audio) {
  const add = (el) => {
    tray.appendChild(el);
    tray.classList.add('has-tools');
    return el;
  };
  return {
    slider({ label, min = 0, max = 1, step = 0.01, value = 0, onChange }) {
      const wrap = document.createElement('label');
      wrap.className = 'tool-slider';
      wrap.innerHTML = `<span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;
      const input = wrap.querySelector('input');
      input.addEventListener('input', () => onChange?.(parseFloat(input.value)));
      add(wrap);
      wrap.setValue = (v) => (input.value = v);
      return wrap;
    },
    buttons(list) {
      const row = document.createElement('div');
      row.className = 'tool-buttons';
      for (const b of list) {
        const btn = document.createElement('button');
        btn.className = 'tool-btn';
        btn.innerHTML = `${b.emoji ? `<span class="e">${b.emoji}</span>` : ''}<span>${b.label}</span>`;
        btn.addEventListener('click', () => {
          audio.sfx('click');
          b.onClick?.(btn);
        });
        row.appendChild(btn);
      }
      add(row);
      return row;
    },
    readout(label) {
      const el = document.createElement('div');
      el.className = 'tool-readout';
      el.innerHTML = `<span class="l">${label}</span><span class="v">-</span>`;
      add(el);
      const v = el.querySelector('.v');
      return { el, set: (t) => (v.textContent = t) };
    },
    clear() {
      tray.innerHTML = '';
      tray.classList.remove('has-tools');
    },
  };
}
