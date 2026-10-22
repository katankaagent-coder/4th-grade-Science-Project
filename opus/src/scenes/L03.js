// Lesson 3 scene: the Push-Pull Playground. Four stations:
// park lanes (soccer ball on grass vs court), push track (crate + 4 surfaces + force arrows),
// magnet table (paper clips + plastic spoon), and gravity rack (bowling ball + tennis ball).
// A camera-facing "bumps" panel shows why rough surfaces rub more.

const T = 0.8; // table top height
const SURF_TOP = T + 0.06; // top of the push-track surface
const TR = { cx: -2.4, z: 1.3, startX: -4.9, maxX: 0.3 };
const PK = { zA: -0.55, zB: -1.4, startX: -5.0, y: T + 0.27 };
const MG = { x: 4.1, z: 0.5 };
const GR = { x: -2.2, z: -3.7, shelfY: T + 2.2 };
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const smooth = (t) => t * t * (3 - 2 * t);
const rand = (a, b) => a + Math.random() * (b - a);

const SURF = {
  ice: { name: 'Ice', f: 0.5, mu: 0.15, emoji: '🧊' },
  wood: { name: 'Wood', f: 0.28, mu: 0.45, emoji: '🪵' },
  carpet: { name: 'Carpet', f: 0.16, mu: 0.7, emoji: '🟪' },
  sand: { name: 'Sandpaper', f: 0.08, mu: 1.0, emoji: '📜' },
};

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  let mode = 'idle'; // idle | push | surfaces | magnet | drop

  // Each new motion claims the object; an older motion still running stops where it is.
  const claim = (o) => (o.seq = (o.seq || 0) + 1);
  const glide = (o, s, ms, fn, ease) => kit.animate(ms, (k) => o.seq === s && fn(k), ease).then(() => o.seq === s);

  const steel = () => kit.mat.metal(0x2a3140);
  function pedestal(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, T, d), steel());
    m.position.set(x, T / 2, z);
    m.castShadow = m.receiveShadow = true;
    root.add(m);
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.05, d + 0.1), kit.mat.metal(0x475569));
    top.position.set(x, T - 0.02, z);
    root.add(top);
    return m;
  }
  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.3, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }

  // =====================================================================
  // STATION A: park lanes (soccer ball on grass and on a court)
  // =====================================================================
  pedestal(TR.cx, -0.95, 6.2, 2.0);
  const grassTex = kit.tex.canvas(256, 128, (c, w, h) => {
    c.fillStyle = '#2f8f3f';
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) {
      c.strokeStyle = `rgba(${20 + Math.random() * 40},${110 + Math.random() * 80},${30 + Math.random() * 40},0.7)`;
      c.lineWidth = 1;
      const x = Math.random() * w;
      const y = Math.random() * h;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + rand(-2, 2), y - rand(3, 8));
      c.stroke();
    }
  });
  const courtTex = kit.tex.canvas(256, 128, (c, w, h) => {
    c.fillStyle = '#c9803c';
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 20; i++) {
      c.fillStyle = `rgba(110,60,20,${0.05 + Math.random() * 0.08})`;
      c.fillRect(0, i * (h / 20), w, h / 40);
    }
    c.strokeStyle = 'rgba(255,255,255,0.8)';
    c.lineWidth = 4;
    c.strokeRect(6, 6, w - 12, h - 12);
  });
  const laneA = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.05, 0.7), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1 }));
  laneA.position.set(TR.cx, T + 0.025, PK.zA);
  const laneB = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.05, 0.7), new THREE.MeshStandardMaterial({ map: courtTex, roughness: 0.45 }));
  laneB.position.set(TR.cx, T + 0.025, PK.zB);
  laneA.receiveShadow = laneB.receiveShadow = true;
  root.add(laneA, laneB);
  sign('Kelenna\u2019s park', TR.cx, 2.0, -0.95);
  const tagA = sign('Grass', 0.1, T + 0.62, PK.zA, { size: 0.2, border: '#4ade80' });
  const tagB = sign('Basketball court', 0.1, T + 0.62, PK.zB, { size: 0.2, border: '#fb923c' });

  const ballTex = kit.tex.canvas(256, 256, (c, w, h) => {
    c.fillStyle = '#f8fafc';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#111827';
    for (const [x, y] of [[64, 64], [192, 64], [128, 128], [64, 192], [192, 192], [0, 128], [256, 128]]) {
      c.beginPath();
      c.arc(x, y, 26, 0, Math.PI * 2);
      c.fill();
    }
  });
  function makeSoccer(z) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), new THREE.MeshStandardMaterial({ map: ballTex, roughness: 0.5 }));
    b.castShadow = true;
    b.position.set(PK.startX, PK.y, z);
    root.add(b);
    return b;
  }
  const ballA = makeSoccer(PK.zA);
  const ballB = makeSoccer(PK.zB);
  async function rollBall(b, dist, ms) {
    const s = claim(b);
    const x0 = b.position.x;
    let last = x0;
    return glide(b, s, ms, (k) => {
      const x = x0 + dist * k;
      b.rotation.z -= (x - last) / 0.22;
      last = x;
      b.position.x = x;
    }, 'out');
  }
  function resetPark() {
    claim(ballA);
    claim(ballB);
    ballA.position.x = ballB.position.x = PK.startX;
    ballA.rotation.set(0, 0, 0);
    ballB.rotation.set(0, 0, 0);
    tagA.setText('Grass');
    tagB.setText('Basketball court');
  }
  async function kick() {
    resetPark();
    kit.sfx('thud');
    const [a, b] = await Promise.all([rollBall(ballA, 1.9, 2300), rollBall(ballB, 4.7, 4200)]);
    if (a) tagA.setText('Grass: stopped fast');
    if (b) tagB.setText('Court: rolled far');
    if (b) kit.sfx('tick');
  }

  // =====================================================================
  // STATION B: push track (crate, four surfaces, force arrows)
  // =====================================================================
  pedestal(TR.cx, TR.z, 6.2, 1.4);
  sign('Push Track', TR.cx, 2.55, TR.z);
  const surfTex = {
    ice: kit.tex.canvas(256, 128, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#bfe9ff');
      g.addColorStop(1, '#e8f8ff');
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
      c.strokeStyle = 'rgba(255,255,255,0.8)';
      c.lineWidth = 2;
      for (let i = 0; i < 14; i++) {
        c.beginPath();
        c.moveTo(Math.random() * w, Math.random() * h);
        c.lineTo(Math.random() * w, Math.random() * h);
        c.stroke();
      }
    }),
    wood: kit.tex.wood('#b07a3f'),
    carpet: kit.tex.canvas(256, 128, (c, w, h) => {
      c.fillStyle = '#7c3a8c';
      c.fillRect(0, 0, w, h);
      for (let i = 0; i < 2600; i++) {
        c.fillStyle = `rgba(${150 + Math.random() * 60},${80 + Math.random() * 60},${170 + Math.random() * 60},0.55)`;
        c.fillRect(Math.random() * w, Math.random() * h, 2, 3);
      }
    }),
    sand: kit.tex.canvas(256, 128, (c, w, h) => {
      c.fillStyle = '#b8894a';
      c.fillRect(0, 0, w, h);
      for (let i = 0; i < 3200; i++) {
        const v = Math.random() > 0.5 ? 0 : 255;
        c.fillStyle = `rgba(${v},${v},${v},0.25)`;
        c.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      }
    }),
  };
  const surfMats = {};
  for (const k of Object.keys(SURF)) surfMats[k] = new THREE.MeshStandardMaterial({ map: surfTex[k], roughness: k === 'ice' ? 0.12 : 0.95 });
  const surface = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.06, 1.0), surfMats.wood);
  surface.position.set(TR.cx, T + 0.03, TR.z);
  surface.receiveShadow = true;
  root.add(surface);
  const surfTag = sign('Surface: Wood', TR.cx, 2.05, TR.z, { size: 0.24, border: '#f59e0b' });
  const startLine = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.01, 1.0), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  startLine.position.set(TR.startX + 0.55, SURF_TOP + 0.006, TR.z);
  root.add(startLine);

  const crate = new THREE.Group();
  {
    const wood = kit.mat.wood('#a0652d');
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), wood);
    body.castShadow = true;
    const bandMat = new THREE.MeshStandardMaterial({ color: 0x5b3a1e, roughness: 0.8 });
    for (const dx of [-0.2, 0.2]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.62), bandMat);
      band.position.x = dx;
      crate.add(band);
    }
    crate.add(body);
  }
  crate.position.set(TR.startX, SURF_TOP + 0.3, TR.z);
  root.add(crate);
  const crateTag = kit.label('Crate', { size: 0.2 });
  crateTag.position.set(0, 0.85, 0);
  crate.add(crateTag);

  const pushArrow = kit.arrow(0x22c55e);
  const fricArrow = kit.arrow(0xef4444);
  const gravArrow = kit.arrow(0xa855f7);
  const normArrow = kit.arrow(0xe5e7eb);
  pushArrow.position.set(-1.25, 0.28, 0.4);
  pushArrow.set(0.9, new THREE.Vector3(1, 0, 0));
  fricArrow.position.set(0.5, 0.08, 0.4);
  gravArrow.position.set(-0.12, 0.55, 0.4);
  gravArrow.set(0.6, new THREE.Vector3(0, -1, 0));
  normArrow.position.set(0.12, -0.05, 0.4);
  normArrow.set(0.6, new THREE.Vector3(0, 1, 0));
  crate.add(pushArrow, fricArrow, gravArrow, normArrow);
  const arrowTags = [
    ['Push', '#22c55e', -1.25, 0.6],
    ['Friction', '#ef4444', 0.15, 0.32],
    ['Gravity', '#a855f7', -0.4, 0.95],
    ['Floor pushes up', '#e5e7eb', 0.55, 0.05],
  ].map(([t, col, x, y]) => {
    const l = kit.label(t, { size: 0.17, color: col, border: col });
    l.position.set(x, y, 0.55);
    crate.add(l);
    return l;
  });
  let arrowsShown = false;
  let curSurf = 'wood';
  function setArrows(on) {
    arrowsShown = on;
    pushArrow.visible = on && pushK > 0.01;
    gravArrow.visible = normArrow.visible = on;
    fricArrow.visible = on;
    arrowTags.forEach((l) => (l.visible = on));
    if (on) updateFricArrow();
  }
  let pushK = 0; // 0..1 how hard we are pushing right now
  function updateFricArrow() {
    fricArrow.set(0.35 + SURF[curSurf].mu * 0.6, new THREE.Vector3(-1, 0, 0));
    fricArrow.visible = arrowsShown;
  }
  updaters.push(() => {
    pushArrow.visible = arrowsShown && pushK > 0.01;
    if (pushArrow.visible) pushArrow.set(0.3 + pushK * 0.9, new THREE.Vector3(1, 0, 0));
  });
  setArrows(false);

  const flag = new THREE.Group();
  {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), kit.mat.metal(0xe5e7eb));
    pole.position.y = 0.45;
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.26), new THREE.MeshStandardMaterial({ color: 0xf43f5e, side: THREE.DoubleSide }));
    cloth.position.set(0.2, 0.78, 0);
    flag.add(pole, cloth);
  }
  flag.visible = false;
  root.add(flag);
  const distTag = kit.label('Slid 0 m', { size: 0.24, border: '#f43f5e' });
  distTag.visible = false;
  root.add(distTag);

  const results = {};
  const visited = new Set();
  let pushArmed = false;
  let surfArmed = false;
  let power = 6;

  function setSurface(key) {
    curSurf = key;
    surface.material = surfMats[key];
    surfTag.setText(`Surface: ${SURF[key].name}`);
    updateFricArrow();
  }
  function crateHome() {
    claim(crate);
    crate.position.x = TR.startX;
    pushK = 0;
    flag.visible = false;
    distTag.visible = false;
  }
  async function push(pw, byChild) {
    const s = claim(crate);
    pushK = 0;
    flag.visible = false;
    distTag.visible = false;
    const x00 = crate.position.x;
    if (x00 > TR.startX + 0.02) {
      if (!(await glide(crate, s, 350, (k) => (crate.position.x = x00 + (TR.startX - x00) * k), 'inOut'))) return;
    }
    const key = curSurf;
    const dist = Math.min(TR.maxX - TR.startX, pw * SURF[key].f);
    kit.sfx('whoosh');
    // the push: strong at first, then we let go
    if (!(await glide(crate, s, 260, (k) => (pushK = pw / 10 * Math.min(1, k * 3)), 'out'))) return;
    const ms = 700 + dist * 520;
    const ok = await glide(crate, s, ms, (k) => {
      pushK = Math.max(0, (pw / 10) * (1 - k * 6));
      crate.position.x = TR.startX + dist * k;
    }, 'out');
    if (!ok) return;
    pushK = 0;
    kit.sfx(key === 'ice' ? 'whoosh' : 'thud');
    results[key] = Math.round(dist * 10) / 10;
    flag.position.set(crate.position.x + 0.45, SURF_TOP, TR.z + 0.55);
    flag.visible = true;
    distTag.setText(`Slid ${results[key]} m`);
    distTag.position.set(flag.position.x, SURF_TOP + 1.25, TR.z + 0.55);
    distTag.visible = true;
    if (byChild) {
      visited.add(key);
      if (pushArmed) {
        pushArmed = false;
        kit.emit('pushed');
      }
      if (surfArmed && visited.size === 4) {
        surfArmed = false;
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('allSurfaces');
      }
    }
  }
  kit.onTap(crate, () => {
    if (mode === 'push' || mode === 'surfaces') push(mode === 'push' ? 5 : power, true);
  });

  // ---------- look-close panel: bumps on a surface ----------
  const bumps = new THREE.Group();
  bumps.position.set(TR.cx, 3.35, TR.z);
  bumps.visible = false;
  root.add(bumps);
  const bumpBlocks = [];
  [
    { x: -1.25, rough: false, label: 'Ice: smooth, little rubbing', col: '#7dd3fc' },
    { x: 1.25, rough: true, label: 'Sandpaper: bumpy, lots of rubbing', col: '#f59e0b' },
  ].forEach((b) => {
    const tex = kit.tex.canvas(512, 320, (c, w, h) => {
      c.fillStyle = '#0b1220';
      c.fillRect(0, 0, w, h);
      c.fillStyle = b.rough ? '#b8894a' : '#bfe9ff';
      c.beginPath();
      c.moveTo(0, h);
      c.lineTo(0, 215);
      if (b.rough) {
        let x = 0;
        let up = true;
        while (x < w) {
          x += 14 + Math.random() * 10;
          c.lineTo(x, up ? 215 - 22 - Math.random() * 14 : 215 + Math.random() * 6);
          up = !up;
        }
      } else {
        for (let x = 0; x <= w; x += 16) c.lineTo(x, 215 + Math.sin(x * 0.05) * 1.5);
      }
      c.lineTo(w, h);
      c.closePath();
      c.fill();
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.375), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    plane.position.x = b.x;
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.26, 1.435), new THREE.MeshBasicMaterial({ color: new THREE.Color(b.col), transparent: true, opacity: 0.9 }));
    frame.position.set(b.x, 0, -0.01);
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 0.1), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
    block.position.set(b.x, -0.06, 0.02);
    block.userData = { x: b.x, rough: b.rough };
    bumpBlocks.push(block);
    const tag = kit.label(b.label, { size: 0.2, border: b.col });
    tag.position.set(b.x, -0.95, 0.02);
    bumps.add(frame, plane, block, tag);
  });
  updaters.push((dt, t) => {
    if (!bumps.visible) return;
    bumps.quaternion.copy(kit.stage.camera.quaternion);
    for (const bl of bumpBlocks) {
      const u = bl.userData;
      bl.position.x = u.x + Math.sin(t * 2.2) * 0.55;
      bl.position.y = u.rough ? -0.06 + Math.abs(Math.sin(t * 22)) * 0.07 : -0.06 + Math.sin(t * 3) * 0.004;
      bl.rotation.z = u.rough ? Math.sin(t * 25) * 0.05 : 0;
    }
  });

  // =====================================================================
  // STATION C: magnet table (paper clips and a plastic spoon)
  // =====================================================================
  pedestal(MG.x, MG.z, 3.2, 2.2);
  sign('Magnet Table', MG.x, 2.8, MG.z);
  const CLIP_Y = T + 0.04;
  const MAG_Y = T + 0.7;
  const MAG_START = { x: MG.x + 1.3, z: MG.z + 0.85 };
  const clips = [];
  [[-1.15, -0.3], [-0.7, 0.4], [-0.55, -0.45]].forEach(([dx, dz], i) => {
    const g = new THREE.Group();
    const wire = kit.mat.metal(0xcfd6df);
    const outer = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.014, 8, 24), wire);
    outer.scale.x = 2.0;
    const inner = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.014, 8, 20), wire);
    inner.scale.x = 2.0;
    inner.position.x = 0.05;
    g.add(outer, inner);
    g.traverse((o) => (o.castShadow = true));
    g.rotation.x = Math.PI / 2;
    const home = new THREE.Vector3(MG.x + dx, CLIP_Y, MG.z + dz);
    const wrap = new THREE.Group();
    wrap.add(g);
    wrap.position.copy(home);
    wrap.rotation.y = i * 0.9;
    wrap.userData = { state: 'rest', home, rot: wrap.rotation.y, start: new THREE.Vector3(), off: new THREE.Vector3(), t: 0 };
    root.add(wrap);
    clips.push(wrap);
  });
  const clipTag = kit.label('Paper clips (steel)', { size: 0.2 });
  clipTag.position.set(MG.x - 0.5, T + 0.55, MG.z + 0.6);
  root.add(clipTag);
  const spoon = new THREE.Group();
  {
    const mat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 });
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 10), mat);
    bowl.scale.set(1.3, 0.28, 0.9);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.09), mat);
    handle.position.x = 0.45;
    spoon.add(bowl, handle);
    spoon.traverse((o) => (o.castShadow = true));
    spoon.position.set(MG.x + 0.7, T + 0.06, MG.z + 0.1);
    spoon.rotation.y = 0.5;
    root.add(spoon);
  }
  const spoonTag = kit.label('Plastic spoon', { size: 0.2 });
  spoonTag.position.set(MG.x + 0.8, T + 0.5, MG.z - 0.55);
  root.add(spoonTag);

  const magnet = new THREE.Group();
  {
    const red = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.3, roughness: 0.35 });
    const silver = kit.mat.metal(0xe5e7eb);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.4, 0.34), silver);
    lower.position.y = 0.2;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.4, 0.34), red);
    upper.position.y = 0.6;
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 10), kit.mat.metal(0x6b7280));
    grip.position.y = 1.05;
    magnet.add(lower, upper, grip);
    magnet.traverse((o) => (o.castShadow = true));
    const field = kit.particles(40, { size: 0.07, color: 0xff6b8b, spread: 0.8 });
    field.position.y = -0.1;
    magnet.add(field);
    magnet.userData.field = field;
  }
  const magTag = kit.label('Magnet: drag me!', { size: 0.22, border: '#f43f5e' });
  magTag.position.y = 1.6;
  magnet.add(magTag);
  magnet.position.set(MAG_START.x, MAG_Y, MAG_START.z);
  root.add(magnet);
  const gapTag = kit.label('No touching!', { size: 0.22, color: '#fda4af', border: '#f43f5e' });
  gapTag.position.set(0, 0.0, 0);
  gapTag.visible = false;
  root.add(gapTag);
  let magArmed = false;
  let pulled = 0;
  function tipAt() {
    return new THREE.Vector3(magnet.position.x, magnet.position.y - 0.02, magnet.position.z);
  }
  updaters.push((dt, t) => {
    const field = magnet.userData.field;
    field.rotation.y += dt * 2;
    field.material.opacity = 0.5 + Math.sin(t * 6) * 0.3;
    const tip = tipAt();
    let anyAir = false;
    for (const c of clips) {
      const u = c.userData;
      const d = Math.hypot(c.position.x - tip.x, c.position.z - tip.z);
      if (u.state === 'rest' || u.state === 'fall') {
        if (d < 0.85 && tip.y - c.position.y < 1.2) {
          u.state = 'fly';
          u.t = 0;
          u.start.copy(c.position);
          u.off.set(rand(-0.12, 0.12), -0.04 - Math.random() * 0.04, rand(-0.1, 0.1));
          kit.sfx('magnet');
          pulled++;
          if (magArmed && pulled >= 1) {
            magArmed = false;
            kit.emit('magnetPull');
          }
        } else if (u.state === 'fall') {
          u.t += dt / 0.45;
          const k = clamp01(u.t);
          c.position.lerpVectors(u.start, u.home, k * k);
          if (u.t >= 1) u.state = 'rest';
        } else {
          // tiny wiggle when the magnet is near but not yet pulling
          c.rotation.y = u.rot + (d < 1.3 ? Math.sin(t * 30) * 0.08 : 0);
        }
      } else if (u.state === 'fly') {
        u.t += dt / 0.4;
        const k = smooth(clamp01(u.t));
        c.position.lerpVectors(u.start, tip.clone().add(u.off), k);
        c.position.y += Math.sin(k * Math.PI) * 0.12;
        c.rotation.y += dt * 8;
        if (u.t >= 1) {
          u.state = 'stuck';
          kit.sfx('clank');
        }
        anyAir = true;
      } else if (u.state === 'stuck') {
        c.position.copy(tip).add(u.off);
        anyAir = true;
      }
    }
    gapTag.visible = anyAir;
    if (anyAir) {
      gapTag.position.set(magnet.position.x, magnet.position.y + 0.65, magnet.position.z + 0.5);
      magTag.visible = false;
    } else magTag.visible = true;
  });
  kit.onDrag(magnet, {
    plane: 'xz',
    onMove: (p) => {
      claim(magnet);
      magnet.position.x = THREE.MathUtils.clamp(p.x, MG.x - 1.45, MG.x + 1.45);
      magnet.position.z = THREE.MathUtils.clamp(p.z, MG.z - 0.95, MG.z + 1.1);
    },
  });
  function glideMagnet(x, z, ms = 900) {
    const s = claim(magnet);
    const x0 = magnet.position.x;
    const z0 = magnet.position.z;
    return glide(magnet, s, ms, (k) => {
      magnet.position.x = x0 + (x - x0) * k;
      magnet.position.z = z0 + (z - z0) * k;
    }, 'inOut');
  }
  function releaseClips() {
    for (const c of clips) {
      const u = c.userData;
      if (u.state === 'rest') continue;
      u.start.copy(c.position);
      u.t = 0;
      u.state = 'fall';
    }
  }
  function resetMagnet() {
    claim(magnet);
    releaseClips();
    magnet.position.set(MAG_START.x, MAG_Y, MAG_START.z);
    magArmed = false;
    pulled = 0;
  }
  async function magnetAway() {
    // move the magnet out of range first, then the clips fall back
    const ok = await glideMagnet(MAG_START.x, MAG_START.z, 700);
    if (ok) releaseClips();
  }

  // =====================================================================
  // STATION D: gravity rack (bowling ball + tennis ball)
  // =====================================================================
  pedestal(GR.x, GR.z, 3.6, 2.0);
  sign('Gravity Rack', GR.x, 3.75, GR.z);
  const plank = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, 0.8), kit.mat.wood('#7a4a22'));
  plank.position.set(GR.x, GR.shelfY - 0.05, GR.z);
  plank.castShadow = true;
  root.add(plank);
  for (const dx of [-1.4, 1.4]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, GR.shelfY - T, 0.1), kit.mat.wood('#5a3416'));
    post.position.set(GR.x + dx, T + (GR.shelfY - T) / 2, GR.z - 0.2);
    post.castShadow = true;
    root.add(post);
  }
  const balls = [];
  function makeBall(key, name, r, color, x, shiny) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 18), new THREE.MeshStandardMaterial({ color, roughness: shiny ? 0.2 : 0.8, metalness: shiny ? 0.2 : 0 }));
    m.castShadow = true;
    const b = { key, name, r, mesh: m, x, where: 'shelf', bounce: shiny ? 0.05 : 0.38, seq: 0 };
    b.shelfY = GR.shelfY + r;
    b.groundY = T + r;
    m.position.set(x, b.shelfY, GR.z);
    root.add(m);
    if (key === 'bowl') {
      for (const [dx, dy] of [[-0.07, 0.09], [0.07, 0.09], [0, 0.18]]) {
        const hole = new THREE.Mesh(new THREE.CircleGeometry(0.035, 12), new THREE.MeshBasicMaterial({ color: 0x05080d }));
        hole.position.set(dx, dy, r * 0.97);
        hole.rotation.x = -0.1;
        m.add(hole);
      }
    }
    b.tag = kit.label(name, { size: 0.2 });
    b.tag.position.set(0, r + 0.4, 0);
    m.add(b.tag);
    b.grav = kit.arrow(0xa855f7);
    b.grav.position.set(-0.1, r + 0.35, r + 0.35);
    b.grav.set(0.6, new THREE.Vector3(0, -1, 0));
    b.norm = kit.arrow(0xe5e7eb);
    b.norm.position.set(0.15, -r + 0.01, r + 0.35);
    b.norm.set(0.6, new THREE.Vector3(0, 1, 0));
    m.add(b.grav, b.norm);
    kit.onTap(m, () => {
      if (mode === 'drop') dropBall(b);
    });
    balls.push(b);
    return b;
  }
  const bowl = makeBall('bowl', 'Bowling ball', 0.3, 0x1e3a8a, GR.x - 0.6, true);
  const tennis = makeBall('tennis', 'Tennis ball', 0.15, 0xc6e22a, GR.x + 0.6, false);
  const legend = kit.label('Purple: gravity pulls down', { size: 0.2, color: '#d8b4fe', border: '#a855f7' });
  legend.position.set(GR.x, T + 1.5, GR.z + 0.7);
  const legend2 = kit.label('White: floor pushes up', { size: 0.2, color: '#f1f5f9', border: '#e5e7eb' });
  legend2.position.set(GR.x, T + 1.2, GR.z + 0.7);
  root.add(legend, legend2);
  let gravOn = false;
  let normOn = false;
  function setLegend() {
    legend.visible = gravOn;
    legend2.visible = gravOn && normOn;
  }
  setLegend();
  updaters.push(() => {
    for (const b of balls) {
      b.grav.visible = gravOn;
      b.norm.visible = normOn && b.where === 'ground';
    }
  });
  let dropArmed = false;
  async function dropBall(b, byChild = true) {
    if (b.where === 'air' || b.where === 'ground') return;
    const s = claim(b);
    b.where = 'air';
    const y0 = b.mesh.position.y;
    const x0 = b.mesh.position.x;
    const dist = y0 - b.groundY;
    kit.sfx('whoosh');
    // fall with steady speeding up: distance grows with time squared
    const ms = 800 * Math.sqrt(Math.max(0.05, dist / 2));
    if (!(await glide(b, s, ms, (k) => {
      b.mesh.position.y = y0 - dist * k * k;
      b.mesh.position.x = x0;
    }))) return;
    kit.sfx('thud');
    if (b.bounce > 0.04) {
      if (!(await glide(b, s, 300, (k) => (b.mesh.position.y = b.groundY + b.bounce * 4 * k * (1 - k)), 'linear'))) return;
    }
    b.mesh.position.y = b.groundY;
    b.where = 'ground';
    if (byChild && dropArmed && balls.every((x) => x.where === 'ground' || x.where === 'air')) {
      dropArmed = false;
      kit.vespa?.react('wow');
      kit.emit('dropped');
    }
  }
  async function putBack(b) {
    const s = claim(b);
    const from = b.mesh.position.clone();
    const to = new THREE.Vector3(b.x, b.shelfY, GR.z);
    b.where = 'lift';
    const ok = await glide(b, s, 650, (k) => {
      b.mesh.position.lerpVectors(from, to, k);
      b.mesh.position.y += Math.sin(k * Math.PI) * 0.3;
    }, 'inOut');
    if (ok) b.where = 'shelf';
  }
  function resetDrop() {
    balls.forEach((b) => {
      claim(b);
      b.where = 'shelf';
      b.mesh.position.set(b.x, b.shelfY, GR.z);
    });
    dropArmed = false;
    gravOn = false;
    normOn = false;
    setLegend();
  }
  const putAllBack = () => Promise.all(balls.map((b) => (b.where === 'shelf' ? null : putBack(b))));

  // =====================================================================
  // cues
  // =====================================================================
  const cues = {
    idle() {
      mode = 'idle';
      kit.ui.clear();
    },
    // --- park ---
    resetPark() {
      mode = 'idle';
      kit.ui.clear();
      resetPark();
    },
    kick: () => kick(),
    // --- track ---
    resetTrack() {
      mode = 'idle';
      kit.ui.clear();
      pushArmed = surfArmed = false;
      setSurface('wood');
      crateHome();
      setArrows(false);
      bumps.visible = false;
    },
    pushMode() {
      mode = 'push';
      pushArmed = true;
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Push the crate', emoji: '👉', onClick: () => push(5, true) }]);
    },
    surfaceMode() {
      mode = 'surfaces';
      surfArmed = true;
      visited.clear();
      kit.ui.clear();
      kit.ui.buttons(Object.entries(SURF).map(([k, v]) => ({ label: v.name, emoji: v.emoji, onClick: () => setSurface(k) })));
      kit.ui.slider({ label: '💪 Push power', min: 2, max: 10, step: 1, value: power, onChange: (v) => (power = v) });
      kit.ui.buttons([{ label: 'PUSH!', emoji: '👉', onClick: () => push(power, true) }]);
    },
    async pushDemo({ surface: key = 'wood', power: pw = 6 } = {}) {
      mode = 'idle';
      kit.ui.clear();
      pushArmed = surfArmed = false;
      setSurface(key);
      await push(pw, false);
    },
    arrowsOn() {
      setArrows(true);
    },
    arrowsOff() {
      setArrows(false);
    },
    bumpsShow() {
      bumps.visible = true;
      bumps.scale.setScalar(0.05);
      kit.sfx('whoosh');
      return kit.tween(bumps, { 'scale.x': 1, 'scale.y': 1, 'scale.z': 1 }, 600, 'back');
    },
    bumpsHide() {
      bumps.visible = false;
    },
    // --- magnet ---
    resetMagnet() {
      mode = 'idle';
      kit.ui.clear();
      resetMagnet();
    },
    async magnetDemo() {
      mode = 'idle';
      magArmed = false;
      await glideMagnet(MG.x - 0.8, MG.z - 0.1, 1000);
      await kit.wait(1400);
    },
    async spoonDemo() {
      mode = 'idle';
      magArmed = false;
      await magnetAway();
      await kit.wait(500);
      await glideMagnet(MG.x + 0.7, MG.z + 0.1, 1000);
      await kit.wait(1400);
    },
    magnetMode() {
      mode = 'magnet';
      kit.ui.clear();
      resetMagnet();
      magArmed = true;
      kit.ui.buttons([{ label: 'Let go', emoji: '↩️', onClick: () => magnetAway() }]);
    },
    magnetAway: () => magnetAway(),
    // --- gravity ---
    resetDrop() {
      mode = 'idle';
      kit.ui.clear();
      resetDrop();
    },
    async dropDemo() {
      mode = 'idle';
      dropArmed = false;
      await Promise.all(balls.map((b) => dropBall(b, false)));
      await kit.wait(300);
    },
    dropMode() {
      kit.ui.clear();
      resetDrop();
      mode = 'drop';
      dropArmed = true;
      gravOn = true;
      setLegend();
      kit.ui.buttons([
        { label: 'Drop both', emoji: '⬇️', onClick: () => balls.forEach((b) => dropBall(b, true)) },
        { label: 'Put back', emoji: '↩️', onClick: () => putAllBack() },
      ]);
    },
    putBack: () => putAllBack(),
    gravityOn() {
      gravOn = true;
      setLegend();
    },
    gravityOff() {
      gravOn = false;
      normOn = false;
      setLegend();
    },
    normalOn() {
      gravOn = true;
      normOn = true;
      setLegend();
    },
    normalOff() {
      normOn = false;
      setLegend();
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.8, 12.6], look: [0, 1.0, -0.8] },
      park: { pos: [-2.4, 3.0, 4.3], look: [-2.4, 0.9, -0.95] },
      track: { pos: [-2.4, 2.9, 5.6], look: [-2.4, 1.1, 1.2] },
      bumps: { pos: [-2.4, 3.2, 6.0], look: [-2.4, 2.9, 1.3] },
      magnet: { pos: [4.0, 3.1, 4.6], look: [4.0, 1.3, 0.5] },
      gravity: { pos: [-2.2, 3.2, 2.4], look: [-2.2, 1.9, -3.7] },
    },
    points: {
      park: [TR.cx, 1.8, -0.95],
      ballA: [-3.2, 1.7, PK.zA],
      ballB: [-3.2, 1.7, PK.zB],
      crate: [TR.startX, 1.8, TR.z],
      track: [TR.cx, 2.2, TR.z],
      surface: [TR.cx, 1.8, TR.z],
      bumps: [TR.cx, 3.8, TR.z],
      clips: [MG.x - 0.5, 1.9, MG.z],
      spoon: [MG.x + 0.7, 1.5, MG.z],
      magnet: [MG.x + 1.3, 2.3, MG.z + 0.8],
      bowl: [GR.x - 0.6, GR.shelfY + 0.9, GR.z],
      tennis: [GR.x + 0.6, GR.shelfY + 0.9, GR.z],
      rack: [GR.x, 3.4, GR.z],
      floor: [GR.x, 1.5, GR.z + 0.6],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
