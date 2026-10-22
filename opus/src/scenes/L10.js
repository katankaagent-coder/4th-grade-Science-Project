// Lesson 10 scene: Earth's Treasure Chest.
// A Gulf Coast cutaway (pump jack, refinery, crops, town, wind turbine, solar panels) with layered rock below.
// A camera-facing "look inside" panel shows sand grains with oil and water in the spaces.
// Stations: cutaway + town, pour test (sandstone vs granite), resource sorting bins, family save-it plan + lake gauge.

const T = 0.8; // pedestal top height
const SY = 1.5; // top of the cutaway ground
const BLK = { x: -1.7, z: -2.4, w: 7.4, d: 2.2 };
const FACE_Z = BLK.z + BLK.d / 2;
const PANEL = { x: -1.9, y: 3.4, z: -1.2 };
const POUR = { x: 4.4, z: -2.2 };
const BIN_Z = 0.4;
const BINS = [
  { x: 3.7, z: BIN_Z, name: 'Renewable' },
  { x: 5.1, z: BIN_Z, name: 'Nonrenewable' },
];
const PLAN = { x: -3.2, z: 1.7 };
const LAKE = { x: -5.1, z: 1.4 };
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const rand = (a, b) => a + Math.random() * (b - a);

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const dummy = new THREE.Object3D();
  let mode = 'idle'; // idle | pour | power | sort | plan

  // Each new motion claims the object; an older motion still running stops where it is.
  const claim = (o) => (o.seq = (o.seq || 0) + 1);
  const glide = (o, s, ms, fn, ease) => kit.animate(ms, (k) => o.seq === s && fn(k), ease).then(() => o.seq === s);

  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.28, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }
  function pedestal(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, T, d), kit.mat.metal(0x2a3140));
    m.position.set(x, T / 2, z);
    m.castShadow = m.receiveShadow = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.05, d + 0.1), kit.mat.metal(0x475569));
    top.position.set(x, T - 0.02, z);
    root.add(m, top);
  }
  const speckle = (base, dots, n = 1500, size = 3) =>
    kit.tex.canvas(256, 256, (c, w) => {
      c.fillStyle = base;
      c.fillRect(0, 0, w, w);
      for (let i = 0; i < n; i++) {
        c.fillStyle = dots[Math.floor(Math.random() * dots.length)];
        c.fillRect(Math.random() * w, Math.random() * w, 1 + Math.random() * size, 1 + Math.random() * size);
      }
    });

  // =====================================================================
  // CUTAWAY: layers of ground
  // =====================================================================
  const layers = [
    { name: 'soil', y0: 1.3, y1: SY, map: speckle('#5b3d22', ['#3d2814', '#7a5532', '#2a1a0c']) },
    { name: 'clay', y0: 1.05, y1: 1.3, map: speckle('#9a6b45', ['#b98558', '#7b5233', '#c9a070']) },
    { name: 'shale', y0: 0.85, y1: 1.05, map: speckle('#3f434b', ['#2c2f36', '#555a63', '#23252b'], 1800, 2) },
    { name: 'sand', y0: 0.3, y1: 0.85, map: speckle('#d6b377', ['#e8cd96', '#b8935a', '#f0dcae', '#c49f64'], 2600, 3) },
    { name: 'granite', y0: 0, y1: 0.3, map: speckle('#8c8a8f', ['#c9a4a4', '#2b2b30', '#b9b9c0', '#6a6870'], 2200, 4) },
  ];
  const layerMesh = {};
  for (const L of layers) {
    const mat = new THREE.MeshStandardMaterial({ map: L.map, roughness: 0.95, emissive: 0xffaa33, emissiveIntensity: 0 });
    const m = new THREE.Mesh(new THREE.BoxGeometry(BLK.w, L.y1 - L.y0, BLK.d), mat);
    m.position.set(BLK.x, (L.y0 + L.y1) / 2, BLK.z);
    m.castShadow = m.receiveShadow = true;
    root.add(m);
    layerMesh[L.name] = m;
  }
  // a thin grass top
  const grass = new THREE.Mesh(new THREE.BoxGeometry(BLK.w, 0.05, BLK.d), new THREE.MeshStandardMaterial({ color: 0x3c8c3a, roughness: 1 }));
  grass.position.set(BLK.x, SY + 0.02, BLK.z);
  root.add(grass);
  // a few oil glints on the sandstone face
  const glints = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.6 }), 26);
  for (let i = 0; i < 26; i++) {
    dummy.position.set(BLK.x - 3.5 + Math.random() * 7, rand(0.38, 0.8), FACE_Z + 0.005);
    dummy.scale.set(1, 0.7, 0.3);
    dummy.updateMatrix();
    glints.setMatrixAt(i, dummy.matrix);
  }
  root.add(glints);
  // layer labels on the face
  const LX = -0.2;
  sign('Soil', LX, 1.4, FACE_Z + 0.02, { size: 0.15, border: '#a16207' });
  sign('Clay', LX, 1.17, FACE_Z + 0.02, { size: 0.15, border: '#c2410c' });
  sign('Shale: tight rock lid', LX, 0.95, FACE_Z + 0.02, { size: 0.15, border: '#94a3b8' });
  sign('Sandstone: oil hides here', LX, 0.58, FACE_Z + 0.02, { size: 0.17, border: '#f59e0b' });
  sign('Granite', LX, 0.15, FACE_Z + 0.02, { size: 0.15, border: '#e5e7eb' });
  const cutSign = sign('Gulf Coast ground, cut open', BLK.x + 0.4, 4.35, BLK.z + 1, { size: 0.3 });
  void cutSign;

  // oil well pipe on the front face
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, SY - 0.55, 10), kit.mat.metal(0x111827));
  pipe.position.set(-4.6, (SY + 0.55) / 2, FACE_Z + 0.03);
  root.add(pipe);

  // ---- pump jack ----
  const pump = new THREE.Group();
  pump.position.set(-4.6, SY, -1.7);
  root.add(pump);
  const pumpBeam = new THREE.Group();
  {
    const dark = kit.mat.metal(0x374151);
    const red = kit.mat.plastic(0xdc2626);
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.4), dark);
    base.position.y = 0.06;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.1), dark);
    post.position.y = 0.5;
    const post2 = post.clone();
    post2.rotation.z = 0.25;
    post2.position.set(-0.1, 0.46, 0);
    pump.add(base, post, post2);
    pumpBeam.position.y = 0.9;
    const beam = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 0.12), red);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.34, 0.12), red);
    head.position.set(0.62, -0.1, 0);
    const weight = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 16), dark);
    weight.rotation.x = Math.PI / 2;
    weight.position.set(-0.6, -0.06, 0);
    pumpBeam.add(beam, head, weight);
    pump.add(pumpBeam);
    pump.traverse((o) => (o.castShadow = true));
  }
  let pumping = false;
  updaters.push((dt, t) => {
    pumpBeam.rotation.z = pumping ? Math.sin(t * 3) * 0.18 : pumpBeam.rotation.z * 0.9;
  });

  // ---- oil tank gauge + sapling (the "years" demo) ----
  const GX = -3.75;
  const tankGroup = new THREE.Group();
  tankGroup.position.set(GX, SY, -2.15);
  root.add(tankGroup);
  const tankGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.9, 24, 1, true), kit.mat.glass());
  tankGlass.position.y = 0.45;
  const oilGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.84, 24);
  oilGeo.translate(0, 0.42, 0);
  const oilFill = new THREE.Mesh(oilGeo, new THREE.MeshPhysicalMaterial({ color: 0x92400e, roughness: 0.2, clearcoat: 1 }));
  oilFill.position.y = 0.03;
  tankGroup.add(oilFill, tankGlass);
  const tankTag = kit.label('Oil', { size: 0.2, border: '#f59e0b' });
  tankTag.position.set(GX, SY + 1.15, -2.15);
  root.add(tankTag);

  const SAP_X = -3.0;
  const tree = new THREE.Group();
  tree.position.set(SAP_X, SY, -2.15);
  root.add(tree);
  {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.7, 10), kit.mat.wood('#6b4423'));
    trunk.position.y = 0.35;
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), new THREE.MeshStandardMaterial({ color: 0x2f9e44, roughness: 0.85 }));
    crown.position.y = 0.95;
    const crown2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), new THREE.MeshStandardMaterial({ color: 0x38b24d, roughness: 0.85 }));
    crown2.position.set(0.2, 0.75, 0.1);
    tree.add(trunk, crown, crown2);
    tree.traverse((o) => (o.castShadow = true));
  }
  const treeTag = kit.label('Tree', { size: 0.2, border: '#22c55e' });
  treeTag.position.set(SAP_X, SY + 1.15, -2.15);
  root.add(treeTag);
  const yearTag = kit.label('Year 0', { size: 0.3, border: '#fbbf24' });
  yearTag.position.set((GX + SAP_X) / 2, SY + 1.7, -2.15);
  root.add(yearTag);
  const yearState = { seq: 0 };
  function resetYears() {
    claim(yearState);
    pumping = false;
    oilFill.scale.y = 1;
    tree.scale.setScalar(0.25);
    yearTag.setText('Year 0');
  }
  async function pumpYears() {
    resetYears();
    const s = claim(yearState);
    pumping = true;
    kit.sfx('wind');
    let shown = 0;
    const ok = await glide(
      yearState,
      s,
      6000,
      (k) => {
        oilFill.scale.y = Math.max(0.12, 1 - k * 0.88);
        tree.scale.setScalar(0.25 + smooth(k) * 0.75);
        const y = Math.round(k * 10) * 5;
        if (y !== shown) {
          shown = y;
          yearTag.setText(`Year ${y}`);
          kit.sfx('tick');
        }
      },
      'linear'
    );
    if (!ok) return;
    pumping = false;
    yearTag.setText('Tree grew back. Oil is low!');
    kit.sfx('chime');
  }

  // ---- refinery (Gulf Coast skyline) ----
  const refinery = new THREE.Group();
  refinery.position.set(-4.5, SY, -3.05);
  root.add(refinery);
  {
    const tankMat = kit.mat.metal(0xcbd5e1);
    [-0.5, 0.15].forEach((x, i) => {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5 + i * 0.2, 20), tankMat);
      c.position.set(x, (0.5 + i * 0.2) / 2, 0);
      refinery.add(c);
    });
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.1, 10), kit.mat.metal(0x6b7280));
    stack.position.set(0.7, 0.55, 0);
    refinery.add(stack);
    refinery.traverse((o) => (o.castShadow = true));
  }
  const flare = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), kit.mat.glow(0xff7a1a, 2));
  flare.position.set(0.7, 1.2, 0);
  refinery.add(flare);
  updaters.push((dt, t) => flare.scale.setScalar(0.9 + Math.sin(t * 14) * 0.25));

  // ---- crop field ----
  {
    const tex = kit.tex.canvas(256, 256, (c, w) => {
      c.fillStyle = '#5a3a20';
      c.fillRect(0, 0, w, w);
      for (let i = 0; i < 8; i++) {
        c.fillStyle = i % 2 ? '#3f9b3a' : '#2f7d2f';
        c.fillRect(i * 32 + 6, 0, 20, w);
      }
    });
    const field = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 1.4), new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }));
    field.position.set(-1.9, SY + 0.05, -2.2);
    root.add(field);
  }

  // ---- town ----
  const houses = [];
  const TOWN_X = [-0.8, -0.15, 0.5];
  TOWN_X.forEach((x, i) => {
    const g = new THREE.Group();
    g.position.set(x, SY, -2.0);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.45), new THREE.MeshStandardMaterial({ color: [0xe2c8a0, 0xb7c9e2, 0xe8b4b4][i], roughness: 0.8 }));
    body.position.y = 0.23;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.28, 4), new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.8 }));
    roof.position.y = 0.6;
    roof.rotation.y = Math.PI / 4;
    const winMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, emissive: 0xffd46a, emissiveIntensity: 0 });
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), winMat);
    win.position.set(0, 0.25, 0.23);
    g.add(body, roof, win);
    g.traverse((o) => (o.castShadow = true));
    root.add(g);
    houses.push({ mat: winMat, lit: 0, target: 0 });
  });
  const powerTag = kit.label('Town power: 0%', { size: 0.26, border: '#fbbf24' });
  powerTag.position.set(-0.15, SY + 1.15, -2.0);
  root.add(powerTag);

  // ---- wind turbine ----
  const turbine = new THREE.Group();
  turbine.position.set(1.75, SY, -2.4);
  root.add(turbine);
  const rotor = new THREE.Group();
  {
    const white = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 1.9, 12), white);
    tower.position.y = 0.95;
    const nacelle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.14), white);
    nacelle.position.set(0, 1.9, 0);
    rotor.position.set(0, 1.9, 0.1);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), white);
    rotor.add(hub);
    for (let i = 0; i < 3; i++) {
      const arm = new THREE.Group();
      arm.rotation.z = (i * Math.PI * 2) / 3;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.78, 0.02), white);
      blade.position.y = 0.42;
      arm.add(blade);
      rotor.add(arm);
    }
    turbine.add(tower, nacelle, rotor);
    turbine.traverse((o) => (o.castShadow = true));
  }
  const turbineTag = kit.label('Wind', { size: 0.2, border: '#7dd3fc' });
  turbineTag.position.set(1.75, SY + 2.85, -2.4);
  root.add(turbineTag);
  let windOn = false;
  let rotorSpeed = 0;
  updaters.push((dt) => {
    rotorSpeed += ((windOn ? 3.2 : 0) - rotorSpeed) * Math.min(1, dt * 1.8);
    rotor.rotation.z -= rotorSpeed * dt;
  });

  // ---- solar panels + sun ----
  const solar = new THREE.Group();
  solar.position.set(1.0, SY, -2.05);
  root.add(solar);
  const panelMats = [];
  [-0.35, 0.35].forEach((dz) => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.5, roughness: 0.25, emissive: 0x38bdf8, emissiveIntensity: 0 });
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.55), mat);
    p.position.set(0, 0.3, dz);
    p.rotation.x = -0.6;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.05), kit.mat.metal(0x9ca3af));
    leg.position.set(0, 0.14, dz);
    solar.add(p, leg);
    panelMats.push(mat);
  });
  solar.traverse((o) => (o.castShadow = true));
  const solarTag = kit.label('Solar', { size: 0.2, border: '#fbbf24' });
  solarTag.position.set(1.0, SY + 0.95, -2.05);
  root.add(solarTag);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 16), kit.mat.glow(0xfbbf24, 1.6));
  sun.position.set(3.2, 3.8, -3.4);
  sun.scale.setScalar(0.001);
  root.add(sun);
  let sunOn = false;
  const sunState = { seq: 0 };
  function setSun(on) {
    sunOn = on;
    const s = claim(sunState);
    const from = sun.scale.x;
    const to = on ? 1 : 0.001;
    glide(sunState, s, 500, (k) => sun.scale.setScalar(from + (to - from) * k), 'out');
    panelMats.forEach((m) => (m.emissiveIntensity = on ? 0.9 : 0));
    refreshPower();
    if (on) kit.sfx('chime');
  }
  function setWind(on) {
    windOn = on;
    if (on) kit.sfx('wind');
    refreshPower();
  }
  let powerArmed = false;
  function refreshPower() {
    const p = (windOn ? 0.5 : 0) + (sunOn ? 0.5 : 0);
    powerTag.setText(`Town power: ${Math.round(p * 100)}%`);
    const lv = p >= 1 ? [1, 1, 1] : p > 0 ? [0.8, 0.15, 0] : [0, 0, 0];
    houses.forEach((h, i) => (h.target = lv[i]));
    if (p >= 1 && powerArmed) {
      powerArmed = false;
      kit.vespa?.react('happy');
      kit.emit('townPowered');
    }
  }
  updaters.push((dt) => {
    for (const h of houses) {
      h.lit += (h.target - h.lit) * Math.min(1, dt * 3);
      h.mat.emissiveIntensity = h.lit * 1.6;
    }
  });
  kit.onTap(turbine, () => {
    if (mode === 'power') setWind(!windOn);
  });
  kit.onTap(solar, () => {
    if (mode === 'power') setSun(!sunOn);
  });

  // =====================================================================
  // LOOK-INSIDE PANEL: sand grains with oil and water
  // =====================================================================
  const panel = new THREE.Group();
  panel.position.set(PANEL.x, PANEL.y, PANEL.z);
  panel.visible = false;
  root.add(panel);
  panel.add(
    new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), new THREE.MeshBasicMaterial({ color: 0x05080d, transparent: true, opacity: 0.94 })),
    new THREE.Mesh(new THREE.RingGeometry(0.95, 1.01, 48), new THREE.MeshBasicMaterial({ color: 0xf59e0b }))
  );
  const panelTag = kit.label('Sandstone up close', { size: 0.24, border: '#f59e0b' });
  panelTag.position.y = -1.33;
  panel.add(panelTag);
  const S = 0.2;
  const grainPts = [];
  const gmap = new Map();
  const lat = (i, j) => [S * (i + j / 2), S * j * 0.866];
  for (let j = -6; j <= 6; j++)
    for (let i = -8; i <= 8; i++) {
      const [x, y] = lat(i, j);
      if (Math.hypot(x, y) < 0.86) {
        gmap.set(`${i},${j}`, grainPts.length);
        grainPts.push({ x: x + rand(-0.012, 0.012), y: y + rand(-0.012, 0.012), r: rand(0.9, 1.1) });
      }
    }
  const fillPts = [];
  const hasG = (i, j) => gmap.has(`${i},${j}`);
  for (let j = -6; j <= 6; j++)
    for (let i = -8; i <= 8; i++) {
      if (hasG(i, j) && hasG(i + 1, j) && hasG(i, j + 1)) {
        const [x1, y1] = lat(i, j), [x2, y2] = lat(i + 1, j), [x3, y3] = lat(i, j + 1);
        fillPts.push({ x: (x1 + x2 + x3) / 3, y: (y1 + y2 + y3) / 3 });
      }
      if (hasG(i + 1, j) && hasG(i, j + 1) && hasG(i + 1, j + 1)) {
        const [x1, y1] = lat(i + 1, j), [x2, y2] = lat(i, j + 1), [x3, y3] = lat(i + 1, j + 1);
        fillPts.push({ x: (x1 + x2 + x3) / 3, y: (y1 + y2 + y3) / 3 });
      }
    }
  fillPts.forEach((f) => {
    f.oil = f.y > 0.05 ? Math.random() < 0.85 : Math.random() < 0.1;
    f.delay = clamp01((0.9 - f.y) / 1.8 + rand(0, 0.15)); // top spaces fill first when water soaks in
  });
  const grainMesh = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }), grainPts.length);
  const fillMesh = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }), fillPts.length);
  grainMesh.frustumCulled = fillMesh.frustumCulled = false;
  panel.add(grainMesh, fillMesh);
  const tmpC = new THREE.Color();
  fillPts.forEach((f, i) => fillMesh.setColorAt(i, tmpC.set(f.oil ? 0xd97706 : 0x38bdf8)));
  const panelState = { rock: 'sand', fillK: 1, showOil: true };
  function paintGrains(kind) {
    panelState.rock = kind;
    grainPts.forEach((g, i) => {
      const r = kind === 'sand' ? S * 0.4 * g.r : S * 0.62;
      dummy.position.set(g.x, g.y, 0.01);
      dummy.scale.setScalar(r);
      dummy.updateMatrix();
      grainMesh.setMatrixAt(i, dummy.matrix);
      const c = kind === 'sand' ? [0xe3c58c, 0xc9a56a, 0xf0dcae, 0xb8935a][i % 4] : [0xb98f8f, 0x8c8a8f, 0x3a3a40, 0xc9c9d0][i % 4];
      grainMesh.setColorAt(i, tmpC.set(c));
    });
    grainMesh.instanceMatrix.needsUpdate = true;
    grainMesh.instanceColor.needsUpdate = true;
    fillMesh.visible = kind === 'sand';
    panelTag.setText(kind === 'sand' ? 'Sandstone: spaces between grains' : 'Granite: grains locked tight, no spaces');
  }
  function paintFills() {
    fillPts.forEach((f, i) => {
      const k = smooth(clamp01((panelState.fillK - f.delay * 0.7) / 0.3));
      const vis = f.oil && !panelState.showOil ? 0 : k;
      dummy.position.set(f.x, f.y, 0.02);
      dummy.scale.setScalar(Math.max(0.0001, S * 0.15 * vis));
      dummy.updateMatrix();
      fillMesh.setMatrixAt(i, dummy.matrix);
    });
    fillMesh.instanceMatrix.needsUpdate = true;
  }
  paintGrains('sand');
  paintFills();
  updaters.push(() => {
    if (panel.visible) panel.quaternion.copy(kit.stage.camera.quaternion);
  });
  const panelAnim = { seq: 0 };
  function showPanel(kind, fillK, showOil, scale = 1) {
    claim(panelAnim);
    panel.visible = true;
    panel.scale.setScalar(scale);
    paintGrains(kind);
    panelState.fillK = fillK;
    panelState.showOil = showOil;
    paintFills();
  }
  function hidePanel() {
    claim(panelAnim);
    panel.visible = false;
  }
  kit.onTap(layerMesh.sand, () => {
    if (mode === 'idle' && !panel.visible) {
      showPanel('sand', 1, true);
      kit.sfx('pop');
    }
  });

  // =====================================================================
  // POUR TEST: sandstone vs granite
  // =====================================================================
  pedestal(POUR.x, POUR.z, 2.9, 2.0);
  sign('Pour test', POUR.x, 3.4, POUR.z, { size: 0.3 });
  const DRY = new THREE.Color(0xffffff);
  const WET = new THREE.Color(0x8f7f68);
  const rocks = [];
  function makeRock(name, x, kind) {
    const map = kind === 'sand' ? speckle('#d6b377', ['#e8cd96', '#b8935a', '#f0dcae', '#c49f64'], 2600, 3) : speckle('#8c8a8f', ['#c9a4a4', '#2b2b30', '#b9b9c0', '#6a6870'], 2400, 4);
    const mat = new THREE.MeshStandardMaterial({ map, roughness: 0.95 });
    const g = new THREE.Group();
    g.position.set(x, T, POUR.z);
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.6, 0.85), mat);
    body.position.y = 0.3;
    body.castShadow = true;
    const puddle = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.035, 28), kit.mat.water(0x38bdf8));
    puddle.position.y = 0.62;
    puddle.visible = false;
    const jug = new THREE.Group();
    jug.position.set(-0.3, 1.5, 0);
    const jb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 18), kit.mat.plastic(0x3b82f6));
    const jn = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.12, 0.15, 12), kit.mat.plastic(0x1d4ed8));
    jn.position.y = 0.32;
    jug.add(jb, jn);
    jug.visible = false;
    const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1, 8), kit.mat.water(0x7dd3fc));
    stream.geometry.translate(0, -0.5, 0);
    stream.position.set(-0.1, 1.5, 0);
    stream.scale.y = 0.85;
    stream.visible = false;
    const tag = kit.label(name, { size: 0.24, border: kind === 'sand' ? '#f59e0b' : '#e5e7eb' });
    tag.position.set(0, 1.1, 0.55);
    g.add(body, puddle, jug, stream, tag);
    root.add(g);
    const rk = { name, kind, g, mat, puddle, jug, stream, tag, busy: false, done: false, seq: 0 };
    kit.onTap(g, () => {
      if (mode === 'pour') pourRock(rk);
    });
    rocks.push(rk);
    return rk;
  }
  const sandRock = makeRock('Sandstone', POUR.x - 0.8, 'sand');
  const graniteRock = makeRock('Granite', POUR.x + 0.8, 'granite');
  let pourArmed = false;

  async function pourRock(rk) {
    if (rk.busy || rk.done) return;
    const s = claim(rk);
    rk.busy = true;
    rk.jug.visible = true;
    rk.jug.rotation.z = 0;
    rk.puddle.visible = false;
    kit.sfx('whoosh');
    if (!(await glide(rk, s, 500, (k) => (rk.jug.rotation.z = -0.8 * k), 'out'))) return;
    rk.stream.visible = true;
    rk.puddle.visible = true;
    rk.puddle.scale.set(0.01, 1, 0.01);
    kit.sfx('splash');
    if (!(await glide(rk, s, 1100, (k) => rk.puddle.scale.set(0.2 + 0.8 * k, 1, 0.2 + 0.8 * k), 'out'))) return;
    rk.stream.visible = false;
    if (!(await glide(rk, s, 400, (k) => (rk.jug.rotation.z = -0.8 * (1 - k)), 'in'))) return;
    rk.jug.visible = false;
    if (rk.kind === 'sand') {
      kit.sfx('bubble');
      rk.tag.setText('Sandstone: soaks it up!');
      if (
        !(await glide(rk, s, 2000, (k) => {
          const sc = 1 - smooth(k);
          rk.puddle.scale.set(Math.max(0.001, sc), 1, Math.max(0.001, sc));
          rk.mat.color.copy(DRY).lerp(WET, smooth(k));
        }))
      )
        return;
      rk.puddle.visible = false;
    } else {
      await kit.wait(500);
      if (rk.seq !== s) return;
      kit.sfx('thud');
      rk.tag.setText('Granite: water stays on top');
    }
    rk.done = true;
    rk.busy = false;
    if (pourArmed && sandRock.done && graniteRock.done) {
      pourArmed = false;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('pourTested');
    }
  }
  function resetRock(rk) {
    claim(rk);
    rk.busy = false;
    rk.done = false;
    rk.jug.visible = false;
    rk.stream.visible = false;
    rk.puddle.visible = false;
    rk.mat.color.copy(DRY);
    rk.tag.setText(rk.name);
  }
  function resetPour() {
    rocks.forEach(resetRock);
    pourArmed = false;
  }

  // =====================================================================
  // SORT STATION: renewable or nonrenewable
  // =====================================================================
  BINS.forEach((b, i) => {
    const col = i === 0 ? 0x16a34a : 0x78716c;
    const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.0), mat);
    floor.position.set(b.x, 0.05, b.z);
    const mk = (w, h, d, x, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(b.x + x, 0.2, b.z + z);
      m.castShadow = true;
      return m;
    };
    root.add(floor, mk(1.3, 0.3, 0.07, 0, -0.5), mk(1.3, 0.3, 0.07, 0, 0.5), mk(0.07, 0.3, 1.0, -0.65, 0), mk(0.07, 0.3, 1.0, 0.65, 0));
    sign(b.name, b.x, 1.05, b.z - 0.1, { size: 0.26, border: i === 0 ? '#22c55e' : '#d6d3d1' });
    sign(i === 0 ? 'comes back fast' : 'takes millions of years', b.x, 0.75, b.z - 0.1, { size: 0.17, border: i === 0 ? '#22c55e' : '#d6d3d1' });
  });
  const sortMsg = kit.label('Drag each card into a bin', { size: 0.24, border: '#a3e635' });
  sortMsg.position.set(4.4, 1.55, 1.2);
  root.add(sortMsg);

  const TOKENS = [
    { name: '☀️ Sunlight', g: 0, hx: 3.2, hz: 1.7, why: 'Sunlight comes back every morning.' },
    { name: '💨 Wind', g: 0, hx: 4.4, hz: 1.7, why: 'Wind blows again tomorrow.' },
    { name: '🌳 Trees', g: 0, hx: 5.6, hz: 1.7, why: 'Trees can be planted and grow back.' },
    { name: '🪨 Coal', g: 1, hx: 3.2, hz: 2.5, why: 'Coal took millions of years to form.' },
    { name: '🛢️ Oil', g: 1, hx: 4.4, hz: 2.5, why: 'Oil took millions of years to form.' },
    { name: '🔥 Natural gas', g: 1, hx: 5.6, hz: 2.5, why: 'Natural gas took millions of years to form.' },
  ];
  const tokens = [];
  let sortArmed = false;
  let sortedCount = 0;
  TOKENS.forEach((d) => {
    const mesh = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.6), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 }));
    box.castShadow = true;
    mesh.add(box);
    const rim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.95, 0.3, 0.7)), new THREE.LineBasicMaterial({ color: d.g === 0 ? 0x22c55e : 0xf59e0b }));
    rim.visible = false;
    mesh.add(rim);
    const tag = kit.label(d.name, { size: 0.2, border: '#e2e8f0' });
    tag.position.y = 0.42;
    mesh.add(tag);
    mesh.position.set(d.hx, 0.11, d.hz);
    root.add(mesh);
    const tk = { ...d, mesh, rim, tag, placed: false, dragging: false, seq: 0, last: new THREE.Vector3() };
    kit.onDrag(box, {
      plane: 'xz',
      onMove: (p) => {
        if (mode !== 'sort' || tk.placed) return;
        if (!tk.dragging) {
          tk.dragging = true;
          claim(tk);
        }
        tk.mesh.position.set(THREE.MathUtils.clamp(p.x, -6, 6), 0.55, THREE.MathUtils.clamp(p.z, -3, 3));
        tk.last.copy(tk.mesh.position);
      },
      onEnd: () => {
        if (!tk.dragging) return;
        tk.dragging = false;
        dropToken(tk);
      },
    });
    tokens.push(tk);
  });
  function goHome(tk) {
    const s = claim(tk);
    const from = tk.mesh.position.clone();
    const to = new THREE.Vector3(tk.hx, 0.11, tk.hz);
    return glide(tk, s, 450, (k) => {
      tk.mesh.position.lerpVectors(from, to, k);
      tk.mesh.position.y += Math.sin(k * Math.PI) * 0.4;
    }, 'inOut');
  }
  async function dropToken(tk) {
    let best = -1;
    let bd = 1.0;
    BINS.forEach((b, i) => {
      const d = Math.hypot(tk.mesh.position.x - b.x, tk.mesh.position.z - b.z);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    if (best < 0) {
      goHome(tk);
      return;
    }
    if (best !== tk.g) {
      kit.sfx('thud');
      kit.vespa?.react('think');
      sortMsg.setText(`Not there! ${tk.why}`);
      goHome(tk);
      return;
    }
    const s = claim(tk);
    const slot = tokens.filter((t) => t.placed && t.g === tk.g).length;
    tk.placed = true;
    const b = BINS[best];
    const to = new THREE.Vector3(b.x + (slot - 1) * 0.42, 0.22, b.z);
    const from = tk.mesh.position.clone();
    kit.sfx('pop');
    tk.mesh.scale.setScalar(0.5);
    const ok = await glide(tk, s, 350, (k) => tk.mesh.position.lerpVectors(from, to, k), 'out');
    if (!ok) return;
    sortedCount++;
    sortMsg.setText(`Yes! ${tk.why}`);
    if (sortedCount >= tokens.length && sortArmed) {
      sortArmed = false;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('resourcesSorted');
    }
  }
  function resetSort() {
    sortArmed = false;
    sortedCount = 0;
    sortMsg.setText('Drag each card into a bin');
    for (const tk of tokens) {
      claim(tk);
      tk.placed = false;
      tk.dragging = false;
      tk.rim.visible = false;
      tk.mesh.scale.setScalar(1);
      tk.mesh.position.set(tk.hx, 0.11, tk.hz);
    }
  }
  let hintsOn = false;
  updaters.push((dt, t) => {
    if (!hintsOn) return;
    const s = 1 + Math.sin(t * 6) * 0.04;
    for (const tk of tokens) tk.rim.scale.setScalar(s);
  });

  // =====================================================================
  // FAMILY SAVE-IT PLAN + lake gauge
  // =====================================================================
  sign('Family save-it plan', PLAN.x, 2.25, PLAN.z, { size: 0.3 });
  const pads = [];
  let planArmed = false;
  const PADS = [
    { name: '💡 Lights off', note: 'Saves electricity, so less coal and gas burns.', x: PLAN.x - 1.1 },
    { name: '🚿 Short shower', note: 'Saves clean water and the energy to heat it.', x: PLAN.x },
    { name: '♻️ Recycle', note: 'Saves trees, oil, and metal for new things.', x: PLAN.x + 1.1 },
  ];
  PADS.forEach((d) => {
    const g = new THREE.Group();
    g.position.set(d.x, 0, PLAN.z);
    const matOff = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, emissive: 0x22c55e, emissiveIntensity: 0 });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.18, 28), matOff);
    disc.position.y = 0.09;
    disc.castShadow = true;
    const tag = kit.label(d.name, { size: 0.2, border: '#94a3b8' });
    tag.position.y = 0.75;
    g.add(disc, tag);
    root.add(g);
    const pd = { ...d, g, matOff, tag, on: false, seq: 0 };
    kit.onTap(g, () => {
      if (mode === 'plan') togglePad(pd);
    });
    pads.push(pd);
  });
  const planMsg = kit.label('Tap each pad to switch it on', { size: 0.22, border: '#22c55e' });
  planMsg.position.set(PLAN.x, 1.55, PLAN.z);
  root.add(planMsg);
  function togglePad(pd) {
    if (pd.on) return;
    pd.on = true;
    const s = claim(pd);
    kit.sfx('chime');
    pd.matOff.emissiveIntensity = 0.9;
    pd.tag.setText(`✔ ${pd.name.slice(3)}`);
    planMsg.setText(pd.note);
    glide(pd, s, 300, (k) => (pd.g.position.y = Math.sin(k * Math.PI) * 0.25), 'out');
    if (pads.every((p) => p.on) && planArmed) {
      planArmed = false;
      kit.vespa?.react('happy');
      kit.emit('planMade');
    }
  }
  function resetPlan() {
    planArmed = false;
    pads.forEach((pd, i) => {
      claim(pd);
      pd.on = false;
      pd.matOff.emissiveIntensity = 0;
      pd.g.position.y = 0;
      pd.tag.setText(PADS[i].name);
    });
    planMsg.setText('Tap each pad to switch it on');
  }

  // lake gauge
  const lake = new THREE.Group();
  lake.position.set(LAKE.x, 0, LAKE.z);
  root.add(lake);
  const lakeGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.7, 24, 1, true), kit.mat.glass());
  lakeGlass.position.y = 0.85;
  const lgeo = new THREE.CylinderGeometry(0.36, 0.36, 1.6, 24);
  lgeo.translate(0, 0.8, 0);
  const lakeWater = new THREE.Mesh(lgeo, kit.mat.water(0x38bdf8));
  lakeWater.position.y = 0.05;
  const lakeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.1, 24), kit.mat.metal(0x334155));
  lake.add(lakeBase, lakeWater, lakeGlass);
  const lakeTag = kit.label('Lake water', { size: 0.22, border: '#38bdf8' });
  lakeTag.position.set(LAKE.x, 2.15, LAKE.z);
  root.add(lakeTag);
  const lakeNote = kit.label('Full', { size: 0.2, border: '#38bdf8' });
  lakeNote.position.set(LAKE.x, 1.85, LAKE.z);
  root.add(lakeNote);
  const lakeState = { seq: 0 };
  function lakeTo(level, ms, text, note) {
    const s = claim(lakeState);
    const from = lakeWater.scale.y;
    lakeNote.setText(note);
    return glide(lakeState, s, ms, (k) => (lakeWater.scale.y = Math.max(0.05, from + (level - from) * k)), 'inOut').then((ok) => {
      if (ok) lakeNote.setText(text);
    });
  }
  function resetLake() {
    claim(lakeState);
    lakeWater.scale.y = 1;
    lakeNote.setText('Full');
  }

  // =====================================================================
  // helpers for resetting
  // =====================================================================
  function resetAll() {
    mode = 'idle';
    kit.ui.clear();
    hidePanel();
    resetYears();
    resetPour();
    resetSort();
    resetPlan();
    resetLake();
    hintsOn = false;
    windOn = false;
    sunOn = false;
    powerArmed = false;
    sun.scale.setScalar(0.001);
    claim(sunState);
    panelMats.forEach((m) => (m.emissiveIntensity = 0));
    refreshPower();
    layerMesh.shale.material.emissiveIntensity = 0;
  }

  const capState = { seq: 0 };

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const cues = {
    idle() {
      mode = 'idle';
      kit.ui.clear();
    },
    resetAll() {
      resetAll();
    },
    // --- pump demo ---
    pumpYears: () => pumpYears(),
    // --- sort ---
    resetSort() {
      mode = 'idle';
      kit.ui.clear();
      resetSort();
      hintsOn = false;
    },
    showHints() {
      hintsOn = true;
      tokens.forEach((tk) => (tk.rim.visible = true));
      kit.sfx('chime');
    },
    hideHints() {
      hintsOn = false;
      tokens.forEach((tk) => (tk.rim.visible = false));
    },
    sortMode() {
      resetSort();
      hintsOn = false;
      mode = 'sort';
      sortArmed = true;
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Start over', emoji: '↩️', onClick: () => { resetSort(); sortArmed = true; } }]);
    },
    // --- cutaway ---
    resetCut() {
      mode = 'idle';
      kit.ui.clear();
      hidePanel();
      claim(capState);
      layerMesh.shale.material.emissiveIntensity = 0;
    },
    async capGlow() {
      const s = claim(capState);
      const m = layerMesh.shale.material;
      kit.sfx('pop');
      await glide(capState, s, 1800, (k) => (m.emissiveIntensity = Math.sin(k * Math.PI * 3) * 0.5 + 0.5));
      if (capState.seq === s) m.emissiveIntensity = 0;
    },
    lookSlider() {
      kit.ui.clear();
      showPanel('sand', 1, true, 0.05);
      let done = false;
      kit.ui.slider({
        label: '🔍 Zoom into the sandstone',
        min: 0.05,
        max: 1,
        step: 0.01,
        value: 0.05,
        onChange: (v) => {
          panel.scale.setScalar(v);
          if (v > 0.9 && !done) {
            done = true;
            kit.sfx('chime');
            kit.emit('oilFound');
          }
        },
      });
    },
    panelHide() {
      hidePanel();
      kit.ui.clear();
    },
    panelSand() {
      showPanel('sand', 1, true);
    },
    panelGranite() {
      showPanel('granite', 0, false);
    },
    async panelSoak() {
      showPanel('sand', 0, false);
      const s = claim(panelAnim);
      kit.sfx('bubble');
      await glide(panelAnim, s, 3000, (k) => {
        panelState.fillK = k;
        paintFills();
      }, 'inOut');
      if (panelAnim.seq === s) panelTag.setText('Water fills the spaces between grains');
    },
    // --- pour test ---
    resetPour() {
      mode = 'idle';
      kit.ui.clear();
      resetPour();
    },
    pourSand: () => pourRock(sandRock),
    pourGranite: () => pourRock(graniteRock),
    pourMode() {
      resetPour();
      mode = 'pour';
      pourArmed = true;
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Pour on sandstone', emoji: '🟫', onClick: () => pourRock(sandRock) },
        { label: 'Pour on granite', emoji: '⬜', onClick: () => pourRock(graniteRock) },
        { label: 'Dry off', emoji: '↩️', onClick: () => { resetPour(); pourArmed = true; } },
      ]);
    },
    // --- town power ---
    powerReset() {
      mode = 'idle';
      kit.ui.clear();
      windOn = false;
      sunOn = false;
      powerArmed = false;
      sun.scale.setScalar(0.001);
      claim(sunState);
      panelMats.forEach((m) => (m.emissiveIntensity = 0));
      refreshPower();
    },
    windOn() {
      setWind(true);
    },
    sunOn() {
      setSun(true);
    },
    async calmNight() {
      setWind(false);
      await kit.wait(500);
      setSun(false);
      kit.sfx('thud');
      await kit.wait(900);
    },
    powerMode() {
      mode = 'power';
      windOn = false;
      sunOn = false;
      sun.scale.setScalar(0.001);
      claim(sunState);
      panelMats.forEach((m) => (m.emissiveIntensity = 0));
      refreshPower();
      powerArmed = true;
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Wind', emoji: '💨', onClick: () => setWind(!windOn) },
        { label: 'Sun', emoji: '☀️', onClick: () => setSun(!sunOn) },
      ]);
    },
    // --- water and saving ---
    lakeDrop: () => lakeTo(0.25, 3500, 'Using water faster than rain refills it', 'Dropping...'),
    lakeSave: () => lakeTo(0.85, 2800, 'Using less keeps the lake healthy', 'Refilling...'),
    resetPlan() {
      mode = 'idle';
      kit.ui.clear();
      resetPlan();
    },
    planMode() {
      resetPlan();
      mode = 'plan';
      planArmed = true;
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Lights', emoji: '💡', onClick: () => togglePad(pads[0]) },
        { label: 'Shower', emoji: '🚿', onClick: () => togglePad(pads[1]) },
        { label: 'Recycle', emoji: '♻️', onClick: () => togglePad(pads[2]) },
      ]);
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.2, 12.5], look: [0.4, 1.2, -0.5] },
      pump: { pos: [-3.7, 3.0, 2.0], look: [-3.9, 1.8, -2.4] },
      sort: { pos: [4.4, 3.1, 5.4], look: [4.4, 0.6, 1.2] },
      cut: { pos: [-1.7, 2.7, 4.2], look: [-1.7, 1.0, -2.4] },
      inside: { pos: [-1.9, 3.4, 3.4], look: [-1.9, 3.3, -1.2] },
      pour: { pos: [4.4, 2.8, 1.8], look: [4.4, 1.5, -2.2] },
      power: { pos: [0.3, 3.2, 3.0], look: [0.3, 2.2, -2.4] },
      plan: { pos: [-3.7, 2.8, 5.0], look: [-3.7, 0.9, 1.5] },
    },
    points: {
      town: [-0.15, SY + 1.0, -2.0],
      refinery: [-4.5, SY + 1.5, -3.05],
      pump: [-4.6, SY + 1.4, -1.7],
      tank: [GX, SY + 1.2, -2.15],
      tree: [SAP_X, SY + 1.2, -2.15],
      layers: [-1.7, 1.6, FACE_Z],
      shale: [-1.7, 1.2, FACE_Z],
      sand: [-1.7, 0.9, FACE_Z],
      panel: [PANEL.x, PANEL.y + 0.5, PANEL.z],
      sandrock: [POUR.x - 0.8, 2.0, POUR.z],
      granite: [POUR.x + 0.8, 2.0, POUR.z],
      turbine: [1.75, SY + 2.5, -2.4],
      solar: [1.0, SY + 0.9, -2.05],
      houses: [-0.15, SY + 0.9, -2.0],
      bins: [4.4, 1.3, BIN_Z],
      tokens: [4.4, 1.2, 2.1],
      lake: [LAKE.x, 2.3, LAKE.z],
      pads: [PLAN.x, 1.4, PLAN.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
