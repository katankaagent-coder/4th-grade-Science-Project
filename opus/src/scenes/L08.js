// Lesson 8 scene: the Texas Coast Water Lab.
// Stations: two playground puddles, a cold soda can, the Galveston Bay water-cycle diorama
// (Sun slider -> vapor -> cloud -> rain -> runoff), a weather station (today), and a 30-year climate chart.

const T = 0.6; // pedestal top height
const PU = { x: -4.2, z: 1.4 }; // puddles
const CN = { x: -0.9, z: 1.5 }; // soda can
const WT = { x: 2.6, z: 1.5 }; // weather station
const BD = { x: 4.9, y: 2.1, z: -1.2 }; // climate board
const CLOUD = { x: -1.7, y: 2.7, z: -2.0 };
const BAY_X = -4.0;
const DZ = -2.0; // diorama center z
const LAND = [[-2.6, 0.34], [-1.9, 0.42], [-1.0, 0.55], [0, 0.8], [1.0, 1.2], [1.7, 1.8]];
function landY(x) {
  if (x <= LAND[0][0]) return LAND[0][1];
  for (let i = 1; i < LAND.length; i++) {
    if (x <= LAND[i][0]) {
      const [x0, y0] = LAND[i - 1];
      const [x1, y1] = LAND[i];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return LAND[LAND.length - 1][1];
}
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const rand = (a, b) => a + Math.random() * (b - a);
const fract = (v) => {
  const x = Math.sin(v) * 43758.5453;
  return x - Math.floor(x);
};

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const dummy = new THREE.Object3D();
  const lerp = THREE.MathUtils.lerp;

  // Each new motion claims the item; an older motion still running stops where it is.
  const claim = (o) => (o.seq = (o.seq || 0) + 1);
  const glide = (o, s, ms, fn, ease) => kit.animate(ms, (k) => o.seq === s && fn(k), ease).then(() => o.seq === s);

  function pedestal(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, T, d), kit.mat.metal(0x2a3140));
    m.position.set(x, T / 2, z);
    m.castShadow = m.receiveShadow = true;
    root.add(m);
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.05, d + 0.1), kit.mat.metal(0x475569));
    top.position.set(x, T - 0.02, z);
    root.add(top);
    return m;
  }
  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.28, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }
  function pointsFor(n, opts) {
    const p = kit.particles(n, opts);
    p.frustumCulled = false;
    p.geometry.setDrawRange(0, 0);
    root.add(p);
    return p;
  }

  // =====================================================================
  // STATION A: two playground puddles (sun and shade)
  // =====================================================================
  const sunX = PU.x - 0.8;
  const shadeX = PU.x + 0.8;
  pedestal(PU.x, PU.z, 3.2, 1.9);
  const blacktop = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.03, 1.7), new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 1 }));
  blacktop.position.set(PU.x, T + 0.01, PU.z);
  root.add(blacktop);
  const makePuddle = (x) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.04, 36), kit.mat.water(0x3b82f6));
    m.position.set(x, T + 0.045, PU.z);
    root.add(m);
    return m;
  };
  const pudSun = makePuddle(sunX);
  const pudShade = makePuddle(shadeX);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), kit.mat.glow(0xfbbf24, 1.6));
  lamp.position.set(sunX, 2.6, PU.z);
  root.add(lamp);
  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1.95, 28, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.15, depthWrite: false, side: THREE.DoubleSide })
  );
  beam.position.set(sunX, 1.62, PU.z);
  root.add(beam);
  const card = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.07, 1.2), kit.mat.plastic(0x475569));
  card.position.set(shadeX, 1.9, PU.z);
  card.castShadow = true;
  root.add(card);
  for (const [dx, dz] of [[-0.65, -0.5], [0.65, -0.5], [-0.65, 0.5], [0.65, 0.5]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.3, 8), kit.mat.metal(0x94a3b8));
    post.position.set(shadeX + dx, T + 0.65, PU.z + dz);
    root.add(post);
  }
  const sunTag = sign('Sunny puddle', sunX, 3.1, PU.z, { size: 0.24, border: '#fbbf24' });
  const shadeTag = sign('Shady puddle', shadeX, 2.4, PU.z, { size: 0.24, border: '#94a3b8' });
  const clock = sign('8 AM', PU.x, 3.55, PU.z, { size: 0.3, border: '#fbbf24' });
  const pud = { k: 0, vis: 0 };
  const vapSun = pointsFor(18, { size: 0.15, color: 0xd7f1ff, spread: 0.1 });
  const vapShade = pointsFor(6, { size: 0.15, color: 0xd7f1ff, spread: 0.1 });
  const vapSeed = [];
  for (let i = 0; i < 24; i++) vapSeed.push({ a: rand(-0.4, 0.4), b: rand(-0.35, 0.35), ph: Math.random() });
  updaters.push((dt, t) => {
    lamp.rotation.y += dt;
    const sl = Math.max(0.03, 1 - 0.95 * pud.k);
    const hl = 1 - 0.3 * pud.k;
    pudSun.scale.set(Math.sqrt(sl), 1, Math.sqrt(sl));
    pudShade.scale.set(Math.sqrt(hl), 1, Math.sqrt(hl));
    const fill = (pts, base, n, off, x0) => {
      for (let i = 0; i < n; i++) {
        const v = vapSeed[off + i];
        const k = (v.ph + t * 0.28) % 1;
        pts.positions[i * 3] = x0 + v.a + Math.sin(t * 2 + i) * 0.1;
        pts.positions[i * 3 + 1] = T + 0.12 + k * 1.3;
        pts.positions[i * 3 + 2] = PU.z + v.b;
      }
      pts.commit();
    };
    const nA = Math.round(18 * pud.vis * (1 - 0.6 * pud.k));
    const nB = Math.round(6 * pud.vis);
    vapSun.geometry.setDrawRange(0, nA);
    vapShade.geometry.setDrawRange(0, nB);
    if (nA) fill(vapSun, 0, 18, 0, sunX);
    if (nB) fill(vapShade, 0, 6, 18, shadeX);
  });
  function puddleReset() {
    claim(pud);
    pud.k = 0;
    pud.vis = 0;
    clock.setText('8 AM');
    sunTag.setText('Sunny puddle');
    shadeTag.setText('Shady puddle');
  }
  async function puddleDry() {
    const s = claim(pud);
    pud.k = 0;
    pud.vis = 1;
    let hr = -1;
    kit.sfx('wind');
    const ok = await glide(pud, s, 6500, (k) => {
      pud.k = k;
      const h = Math.floor(8 + k * 8);
      if (h !== hr) {
        hr = h;
        clock.setText(h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`);
      }
    });
    if (!ok) return;
    sunTag.setText('Almost dry!');
    shadeTag.setText('Still wet');
    kit.sfx('chime');
    await kit.wait(400);
    if (pud.seq === s) pud.vis = 0;
  }

  // =====================================================================
  // STATION B: cold soda can
  // =====================================================================
  pedestal(CN.x, CN.z, 1.9, 1.7);
  const can = new THREE.Group();
  can.position.set(CN.x, T, CN.z);
  root.add(can);
  const canMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.35 });
  const canBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.85, 28), canMat);
  canBody.position.y = 0.43;
  const canTop = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.3, 0.04, 28), kit.mat.metal(0xe5e7eb));
  canTop.position.y = 0.87;
  can.add(canBody, canTop);
  can.traverse((o) => (o.castShadow = true));
  const RED = new THREE.Color(0xdc2626);
  const COLD = new THREE.Color(0x6aa6e0);
  const beads = [];
  for (let i = 0; i < 36; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 6), kit.mat.water(0xcdeaff));
    const a = Math.random() * Math.PI * 2;
    m.position.set(Math.cos(a) * 0.33, rand(0.1, 0.78), Math.sin(a) * 0.33);
    m.userData.th = rand(0.12, 0.9);
    m.scale.setScalar(0.001);
    can.add(m);
    beads.push(m);
  }
  const warm = kit.particles(26, { size: 0.1, color: 0xffe6b0, spread: 0.1 });
  warm.frustumCulled = false;
  warm.geometry.setDrawRange(0, 0);
  can.add(warm);
  const warmSeed = [];
  for (let i = 0; i < 26; i++) warmSeed.push({ a: Math.random() * 6.28, y: rand(0.1, 0.95), ph: Math.random() });
  const canTag = sign('Soda can on a hot day', CN.x, T + 1.7, CN.z, { size: 0.24, border: '#f87171' });
  const cn = { k: 0, vis: 0 };
  updaters.push((dt, t) => {
    canMat.color.copy(RED).lerp(COLD, cn.k * 0.8);
    for (const b of beads) b.scale.setScalar(Math.max(0.001, clamp01((cn.k - b.userData.th) / 0.12)));
    const n = Math.round(26 * cn.vis);
    warm.geometry.setDrawRange(0, n);
    if (n) {
      for (let i = 0; i < 26; i++) {
        const v = warmSeed[i];
        const k = (v.ph + t * 0.3) % 1;
        const r = 1.1 - k * 0.78;
        const a = v.a + t * 0.4;
        warm.positions[i * 3] = Math.cos(a) * r;
        warm.positions[i * 3 + 1] = v.y + Math.sin(t * 2 + i) * 0.04;
        warm.positions[i * 3 + 2] = Math.sin(a) * r;
      }
      warm.commit();
    }
  });
  function canReset() {
    claim(cn);
    cn.k = 0;
    cn.vis = 0;
    canTag.setText('Soda can on a hot day');
  }
  async function canChill() {
    const s = claim(cn);
    cn.vis = 1;
    canTag.setText('Can: 40 degrees F. Air: 95 degrees F');
    kit.sfx('bubble');
    const ok = await glide(cn, s, 4800, (k) => (cn.k = k));
    if (!ok) return;
    cn.vis = 0.35;
    canTag.setText('Drops from the air!');
    kit.sfx('chime');
  }

  // =====================================================================
  // STATION C: Galveston Bay water-cycle diorama
  // =====================================================================
  const slab = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.12, 3.6), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 }));
  slab.position.set(-1.85, -0.06, DZ);
  root.add(slab);
  const bayFloor = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 3.2), new THREE.MeshStandardMaterial({ color: 0xc9a96a, roughness: 1 }));
  bayFloor.position.set(BAY_X, 0.07, DZ);
  root.add(bayFloor);
  const bayWater = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.3, 3.2), kit.mat.water(0x2f8fe0));
  bayWater.position.set(BAY_X, 0.27, DZ);
  root.add(bayWater);
  const shape = new THREE.Shape();
  shape.moveTo(-2.6, 0);
  for (const [x, y] of LAND) shape.lineTo(x, y);
  shape.lineTo(1.7, 0);
  shape.closePath();
  const landGeo = new THREE.ExtrudeGeometry(shape, { depth: 3.2, bevelEnabled: false });
  const land = new THREE.Mesh(landGeo, kit.mat.ground(0x3f8f45));
  land.position.z = DZ - 1.6;
  land.receiveShadow = true;
  root.add(land);
  const beach = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.05, 3.2), new THREE.MeshStandardMaterial({ color: 0xe5cf98, roughness: 1 }));
  beach.position.set(-2.22, 0.405, DZ);
  beach.rotation.z = 0.11;
  root.add(beach);
  const addHouse = (x, z, col) => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.3), kit.mat.plastic(col));
    body.position.y = 0.12;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.2, 4), new THREE.MeshStandardMaterial({ color: 0x7c3f2a, roughness: 0.8 }));
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 0.34;
    g.add(body, roof);
    g.position.set(x, landY(x), z);
    g.traverse((o) => (o.castShadow = true));
    root.add(g);
  };
  addHouse(-1.4, -3.0, 0xf1f5f9);
  addHouse(-1.15, -0.9, 0xfde68a);
  addHouse(-0.1, -3.1, 0xbfdbfe);
  addHouse(0.15, -0.9, 0xfecaca);
  const addTree = (x, z) => {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0x6b4423 }));
    trunk.position.y = 0.1;
    const top = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0x1f6b35, roughness: 0.9 }));
    top.position.y = 0.42;
    g.add(trunk, top);
    g.position.set(x, landY(x), z);
    g.traverse((o) => (o.castShadow = true));
    root.add(g);
  };
  addTree(1.15, -3.2);
  addTree(1.35, -0.8);
  addTree(0.95, -1.0);
  addTree(0.6, -3.3);
  const boat = new THREE.Group();
  {
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.26), kit.mat.plastic(0xf8fafc));
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.2), kit.mat.plastic(0xef4444));
    cabin.position.set(-0.1, 0.17, 0);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), kit.mat.metal(0x94a3b8));
    mast.position.set(0.18, 0.3, 0);
    boat.add(hull, cabin, mast);
    boat.position.set(-4.3, 0.46, -1.3);
    root.add(boat);
  }
  sign('Galveston Bay', BAY_X, 0.95, DZ + 1.5, { size: 0.24, border: '#38bdf8' });
  sign('Dickinson', -0.5, 1.45, DZ + 1.5, { size: 0.24, border: '#4ade80' });

  const sunBig = new THREE.Group();
  sunBig.position.set(-4.3, 3.65, -3.0);
  root.add(sunBig);
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(0.42, 28, 18), kit.mat.glow(0xfbbf24, 1.6));
  sunBig.add(sunBall);
  const rays = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const r = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.34, 6), kit.mat.glow(0xfde047, 1.4));
    const a = (i / 10) * Math.PI * 2;
    r.position.set(Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0);
    r.rotation.z = a - Math.PI / 2;
    rays.add(r);
  }
  sunBig.add(rays);
  const sunLabel = sign('Sun power', -4.3, 4.0, -3.0, { size: 0.22, border: '#fbbf24' });
  sunLabel.visible = false;

  // cloud
  const cloud = new THREE.Group();
  cloud.position.set(CLOUD.x, CLOUD.y, CLOUD.z);
  root.add(cloud);
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.96 });
  for (const [x, y, z, r] of [[0, 0, 0, 0.55], [0.6, -0.05, 0.1, 0.45], [-0.6, -0.05, -0.1, 0.45], [0.25, 0.25, 0, 0.4], [-0.3, 0.2, 0.2, 0.4], [1.0, -0.12, 0, 0.3], [-1.0, -0.12, 0.05, 0.3]]) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), cloudMat);
    p.position.set(x, y, z);
    cloud.add(p);
  }
  const cloudDrops = kit.particles(40, { size: 0.08, color: 0xbfe3ff, spread: 1 });
  cloudDrops.frustumCulled = false;
  const dropBase = [];
  for (let i = 0; i < 40; i++) dropBase.push([rand(-0.9, 0.9), rand(-0.1, 0.35), rand(-0.45, 0.45)]);
  cloud.add(cloudDrops);
  cloud.visible = false;
  const cloudTag = sign('Cloud = tiny drops of water', CLOUD.x, 3.75, CLOUD.z, { size: 0.24, border: '#bfdbfe' });
  cloudTag.visible = false;
  const WHITE = new THREE.Color(0xffffff);
  const STORM = new THREE.Color(0x5b6472);

  // vapor and rain and runoff particles
  const VN = 70;
  const vapor = pointsFor(VN, { size: 0.15, color: 0xd7f1ff, spread: 0.1 });
  const vSeed = [];
  for (let i = 0; i < VN; i++) vSeed.push({ x: rand(-5.1, -3.0), z: rand(-3.3, -0.9), ph: i / VN });
  const RN = 140;
  const rain = pointsFor(RN, { size: 0.1, color: 0x9ccbff, spread: 0.1 });
  const rSeed = [];
  for (let i = 0; i < RN; i++) rSeed.push({ x: rand(-2.7, -0.6), z: rand(-3.3, -0.8), ph: Math.random(), sp: rand(0.8, 1.3) });
  const streamPts = [];
  for (let x = 1.45; x >= -2.58; x -= 0.45) streamPts.push(new THREE.Vector3(x, landY(x) + 0.04, -2.0 + Math.sin(x * 2) * 0.5));
  streamPts.push(new THREE.Vector3(-2.58, 0.36, -2.0 + Math.sin(-2.58 * 2) * 0.5));
  const streamCurve = new THREE.CatmullRomCurve3(streamPts);
  const streamMat = new THREE.MeshStandardMaterial({ color: 0x38a1f3, roughness: 0.2, transparent: true, opacity: 0 });
  const stream = new THREE.Mesh(new THREE.TubeGeometry(streamCurve, 60, 0.06, 6), streamMat);
  stream.visible = false;
  root.add(stream);
  const SN = 28;
  const flow = pointsFor(SN, { size: 0.12, color: 0xbde4ff, spread: 0.1 });
  const sampled = streamCurve.getPoints(80);

  const sim = { power: 0, cloudK: 0, raining: false, rainTime: 0, rainAmt: 0, runAmt: 0, vphase: 0, rphase: 0, fphase: 0, armCloud: false, armRain: false, tagOn: false };
  const pw = {}; // claim token for demo sun glides
  function simReset() {
    claim(pw);
    sim.power = 0;
    sim.cloudK = 0;
    sim.raining = false;
    sim.rainTime = 0;
    sim.rainAmt = 0;
    sim.runAmt = 0;
    sim.armCloud = false;
    sim.armRain = false;
    sim.tagOn = false;
    sunLabel.visible = false;
  }
  simReset();

  updaters.push((dt, t) => {
    // sun look
    const pwr = sim.power;
    sunBall.material.emissiveIntensity = 0.7 + 1.6 * pwr;
    sunBig.scale.setScalar(0.85 + 0.4 * pwr);
    rays.rotation.z += dt * (0.2 + pwr);
    rays.scale.setScalar(0.8 + 0.4 * pwr);
    bayWater.position.y = 0.27 + Math.sin(t * 1.4) * 0.008;
    boat.position.y = 0.46 + Math.sin(t * 1.6) * 0.025 + Math.sin(t * 0.7) * 0.01;
    boat.rotation.z = Math.sin(t * 1.3) * 0.05;

    // the sim
    sim.vphase += dt * pwr * 0.32;
    if (!sim.raining) {
      sim.cloudK = Math.min(1, sim.cloudK + dt * pwr * 0.12);
      if (sim.cloudK >= 1) {
        sim.raining = true;
        sim.rainTime = 0;
      }
    } else {
      sim.cloudK = Math.max(0, sim.cloudK - dt * 0.1);
      sim.rainTime += dt;
      if (sim.cloudK <= 0.3) sim.raining = false;
    }
    sim.rainAmt = clamp01(sim.rainAmt + (sim.raining ? dt * 1.5 : -dt * 1.5));
    sim.runAmt = clamp01(sim.runAmt + (sim.rainAmt > 0.5 ? dt * 0.8 : -dt * 0.4));
    if (sim.armCloud && sim.cloudK >= 0.55) {
      sim.armCloud = false;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('cloudMade');
    }
    if (sim.armRain && sim.raining && sim.rainTime >= 2) {
      sim.armRain = false;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('rained');
    }

    // vapor: rises from the bay, drifts toward the cloud
    const nv = Math.ceil(VN * Math.min(1, pwr * 1.05));
    vapor.geometry.setDrawRange(0, pwr > 0.02 ? nv : 0);
    if (pwr > 0.02) {
      for (let i = 0; i < VN; i++) {
        const v = vSeed[i];
        const k = (v.ph + sim.vphase) % 1;
        vapor.positions[i * 3] = v.x + k * (CLOUD.x - v.x) * 0.8 + Math.sin(t * 2 + i) * 0.06;
        vapor.positions[i * 3 + 1] = 0.55 + k * 1.95;
        vapor.positions[i * 3 + 2] = v.z + (DZ - v.z) * k * 0.4;
      }
      vapor.commit();
    }

    // cloud
    cloud.visible = sim.cloudK > 0.03;
    if (cloud.visible) {
      cloud.scale.setScalar(0.2 + 0.8 * clamp01(sim.cloudK / 0.7));
      cloudMat.color.copy(WHITE).lerp(STORM, clamp01((sim.cloudK - 0.55) / 0.45));
      cloudDrops.material.opacity = 0.9;
      for (let i = 0; i < 40; i++) {
        const b = dropBase[i];
        cloudDrops.positions[i * 3] = b[0] + Math.sin(t * 1.5 + i) * 0.05;
        cloudDrops.positions[i * 3 + 1] = b[1] + Math.sin(t * 2.3 + i * 1.7) * 0.06;
        cloudDrops.positions[i * 3 + 2] = b[2];
      }
      cloudDrops.commit();
    }
    cloudTag.visible = sim.tagOn && sim.cloudK > 0.45;

    // rain
    sim.rphase += dt * 0.9;
    const nr = Math.round(RN * sim.rainAmt);
    rain.geometry.setDrawRange(0, nr);
    if (nr) {
      for (let i = 0; i < RN; i++) {
        const r = rSeed[i];
        const k = (r.ph + sim.rphase * r.sp) % 1;
        const top = CLOUD.y - 0.35;
        const floor = landY(r.x) + 0.02;
        rain.positions[i * 3] = r.x;
        rain.positions[i * 3 + 1] = top - k * (top - floor);
        rain.positions[i * 3 + 2] = r.z;
      }
      rain.commit();
    }

    // runoff
    stream.visible = sim.runAmt > 0.02;
    streamMat.opacity = 0.85 * sim.runAmt;
    sim.fphase += dt * 0.28;
    const nf = Math.round(SN * sim.runAmt);
    flow.geometry.setDrawRange(0, nf);
    if (nf) {
      for (let i = 0; i < SN; i++) {
        const u = (i / SN + sim.fphase) % 1;
        const p = sampled[Math.min(80, Math.floor(u * 80))];
        flow.positions[i * 3] = p.x;
        flow.positions[i * 3 + 1] = p.y + 0.09;
        flow.positions[i * 3 + 2] = p.z;
      }
      flow.commit();
    }
  });

  // --- numbered orbs for "tap the trip in order"
  const ORBS = [
    { name: '1. Evaporation', pos: [-4.1, 1.35, -1.0], color: 0xfbbf24 },
    { name: '2. Condensation', pos: [-1.7, 3.35, -0.9], color: 0xfbbf24 },
    { name: '3. Precipitation', pos: [-0.1, 1.95, -0.9], color: 0xfbbf24 },
    { name: '4. Runoff', pos: [-0.5, 1.2, -2.0], color: 0xfbbf24 },
  ];
  const cyc = { on: false, next: 0, armed: false, demo: 0 };
  const orbs = ORBS.map((o, i) => {
    const g = new THREE.Group();
    g.position.set(...o.pos);
    const mat = kit.mat.glow(o.color, 1.2);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), mat);
    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.62, 10, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
    const num = kit.label(String(i + 1), { size: 0.3, border: '#fbbf24' });
    g.add(ball, hit, num);
    g.visible = false;
    root.add(g);
    const tag = kit.label(o.name, { size: 0.26, border: '#60a5fa' });
    tag.position.set(o.pos[0], o.pos[1] + 0.62, o.pos[2]);
    tag.visible = false;
    root.add(tag);
    const orb = { g, mat, tag, done: false, glow: 0 };
    kit.onTap(g, () => tapOrb(i));
    return orb;
  });
  const GREEN = new THREE.Color(0x34d399);
  const GOLD = new THREE.Color(0xfbbf24);
  updaters.push((dt, t) => {
    orbs.forEach((o, i) => {
      if (!o.g.visible) return;
      const isNext = cyc.on && i === cyc.next;
      const demo = o.glow > 0;
      if (demo) o.glow = Math.max(0, o.glow - dt);
      const pulse = isNext || demo ? 1 + Math.sin(t * 7) * 0.18 : 1;
      o.g.scale.setScalar(pulse);
      o.mat.color.copy(o.done ? GREEN : GOLD);
      o.mat.emissive.copy(o.done ? GREEN : GOLD);
      o.mat.emissiveIntensity = o.done ? 0.9 : isNext || demo ? 1.8 : 0.5;
    });
  });
  function hideOrbs() {
    cyc.on = false;
    cyc.demo++;
    orbs.forEach((o) => {
      o.g.visible = false;
      o.tag.visible = false;
      o.done = false;
      o.glow = 0;
    });
  }
  function tapOrb(i) {
    if (!cyc.on) return;
    const o = orbs[i];
    if (o.done) return;
    if (i !== cyc.next) {
      kit.sfx('click');
      kit.vespa?.react('think');
      orbs[cyc.next].glow = 1.2;
      return;
    }
    o.done = true;
    o.tag.visible = true;
    cyc.next++;
    kit.sfx('pop');
    if (cyc.next >= ORBS.length) {
      kit.sfx('chime');
      kit.vespa?.react('happy');
      if (cyc.armed) {
        cyc.armed = false;
        kit.emit('cycleTapped');
      }
    }
  }

  // =====================================================================
  // STATION D: weather station (today)
  // =====================================================================
  pedestal(WT.x, WT.z, 2.4, 1.9);
  const THX = WT.x - 0.55;
  const RGX = WT.x + 0.55;
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.55, 16), kit.mat.glass());
  tube.position.set(THX, T + 0.2 + 0.78, WT.z);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), kit.mat.glow(0xef4444, 0.5));
  bulb.position.set(THX, T + 0.2, WT.z);
  const liqGeo = new THREE.CylinderGeometry(0.045, 0.045, 1, 12);
  liqGeo.translate(0, 0.5, 0);
  const liquid = new THREE.Mesh(liqGeo, kit.mat.glow(0xef4444, 0.6));
  liquid.position.set(THX, T + 0.2, WT.z);
  root.add(tube, bulb, liquid);
  for (let f = 40; f <= 110; f += 10) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.014, 0.014), new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }));
    m.position.set(THX + 0.14, T + 0.2 + ((f - 40) / 70) * 1.3, WT.z);
    root.add(m);
  }
  const thermLabel = sign('? degrees F', THX, T + 2.05, WT.z, { size: 0.26, border: '#ef4444' });
  const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.2, 24, 1, true), kit.mat.glass());
  gauge.position.set(RGX, T + 0.7, WT.z);
  const gaugeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 24), kit.mat.metal(0x94a3b8));
  gaugeBase.position.set(RGX, T + 0.12, WT.z);
  const gaugeGeo = new THREE.CylinderGeometry(0.22, 0.22, 1, 20);
  gaugeGeo.translate(0, 0.5, 0);
  const gaugeWater = new THREE.Mesh(gaugeGeo, kit.mat.water(0x38bdf8));
  gaugeWater.position.set(RGX, T + 0.14, WT.z);
  gaugeWater.scale.y = 0.001;
  root.add(gauge, gaugeBase, gaugeWater);
  const rainLabel = sign('Rain: ? in', RGX, T + 1.55, WT.z, { size: 0.26, border: '#38bdf8' });
  const dayLabel = sign('Weather today', WT.x, 3.3, WT.z, { size: 0.28, border: '#a78bfa' });
  const sky = new THREE.Group();
  sky.position.set(WT.x, 2.65, WT.z);
  root.add(sky);
  const miniSun = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 12), kit.mat.glow(0xfbbf24, 1.5));
  const miniCloudMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 1 });
  const miniCloud = new THREE.Group();
  for (const [x, y, r] of [[0, 0, 0.22], [0.25, -0.03, 0.17], [-0.25, -0.03, 0.17]]) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), miniCloudMat);
    p.position.set(x, y, 0);
    miniCloud.add(p);
  }
  sky.add(miniSun, miniCloud);
  miniSun.visible = miniCloud.visible = false;
  const stormRain = pointsFor(14, { size: 0.07, color: 0x9ccbff, spread: 0.1 });
  const DAYS = [
    { n: 'Monday', sky: 'sun', f: 94, r: 0, txt: 'Hot and sunny' },
    { n: 'Tuesday', sky: 'storm', f: 86, r: 1.5, txt: 'Thunderstorm' },
    { n: 'Wednesday', sky: 'cloud', f: 90, r: 0.2, txt: 'Cloudy' },
    { n: 'Thursday', sky: 'sun', f: 96, r: 0, txt: 'Hot and sunny' },
    { n: 'Friday', sky: 'storm', f: 84, r: 2.2, txt: 'Stormy' },
  ];
  const wx = { f: 70, r: 0, i: -1, count: 0, armed: false, storm: 0 };
  const tempH = (f) => clamp01((f - 40) / 70) * 1.3;
  const rainH = (r) => clamp01(r / 3) * 1.0;
  updaters.push((dt, t) => {
    liquid.scale.y = Math.max(0.01, tempH(wx.f));
    gaugeWater.scale.y = Math.max(0.001, rainH(wx.r));
    sky.position.y = 2.65 + Math.sin(t * 1.5) * 0.04;
    miniSun.rotation.y += dt;
    const n = Math.round(14 * wx.storm);
    stormRain.geometry.setDrawRange(0, n);
    if (n) {
      for (let i = 0; i < 14; i++) {
        const k = (i / 14 + t * 1.1) % 1;
        stormRain.positions[i * 3] = WT.x + ((i % 5) - 2) * 0.12;
        stormRain.positions[i * 3 + 1] = 2.45 - k * 0.8;
        stormRain.positions[i * 3 + 2] = WT.z + (((i * 3) % 4) - 1.5) * 0.06;
      }
      stormRain.commit();
    }
  });
  function weatherReset() {
    claim(wx);
    wx.i = -1;
    wx.count = 0;
    wx.armed = false;
    wx.f = 70;
    wx.r = 0;
    wx.storm = 0;
    miniSun.visible = miniCloud.visible = false;
    thermLabel.setText('? degrees F');
    rainLabel.setText('Rain: ? in');
    dayLabel.setText('Weather today');
  }
  async function showDay(i) {
    const d = DAYS[i % DAYS.length];
    const s = claim(wx);
    wx.i = i;
    dayLabel.setText(`${d.n}: ${d.txt}`);
    thermLabel.setText(`${d.f} degrees F`);
    rainLabel.setText(d.r ? `Rain: ${d.r} in` : 'Rain: none');
    miniSun.visible = d.sky === 'sun';
    miniCloud.visible = d.sky !== 'sun';
    miniCloudMat.color.setHex(d.sky === 'storm' ? 0x4b5563 : 0xe5e7eb);
    wx.storm = d.sky === 'storm' ? 1 : 0;
    kit.sfx(d.sky === 'storm' ? 'rain' : 'pop');
    const f0 = wx.f;
    const r0 = wx.r;
    await glide(wx, s, 900, (k) => {
      wx.f = lerp(f0, d.f, k);
      wx.r = lerp(r0, d.r, k);
    }, 'out');
  }
  function nextDay() {
    showDay(wx.i + 1);
    wx.count++;
    if (wx.armed && wx.count >= 3) {
      wx.armed = false;
      kit.vespa?.react('happy');
      kit.emit('weatherChecked');
    }
  }

  // =====================================================================
  // STATION E: 30-year climate chart
  // =====================================================================
  const TEMP = [52, 56, 63, 70, 78, 83, 85, 85, 80, 72, 62, 54];
  const RAINM = [3.7, 3.0, 3.2, 3.3, 5.0, 6.0, 4.5, 4.3, 5.2, 5.3, 4.0, 3.7];
  const TB = 0.1; // temp baseline (board-local y)
  const RB = -1.0; // rain baseline
  const TS = 1.0 / 100; // height per degree
  const RS = 0.85 / 8; // height per inch
  const bx = (i) => -1.0 + i * 0.18;
  const board = new THREE.Group();
  board.position.set(BD.x, BD.y, BD.z);
  board.rotation.y = -0.2;
  root.add(board);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.72, 2.82, 0.06), kit.mat.metal(0x334155));
  frame.position.z = -0.04;
  board.add(frame);
  const boardTex = kit.tex.canvas(520, 540, (c, w, h) => {
    const px = (x) => (x + 1.3) * 200;
    const py = (y) => (1.35 - y) * 200;
    c.fillStyle = '#0b1220';
    c.fillRect(0, 0, w, h);
    c.textAlign = 'center';
    c.fillStyle = '#fbbf24';
    c.font = 'bold 21px sans-serif';
    c.fillText('Dickinson: usual temperature (F)', px(0), py(1.2));
    c.fillStyle = '#7dd3fc';
    c.fillText('Dickinson: usual rain each month (in)', px(0), py(-0.2));
    c.font = 'bold 18px sans-serif';
    c.fillStyle = '#cbd5e1';
    const months = 'JFMAMJJASOND';
    for (let i = 0; i < 12; i++) {
      c.fillText(months[i], px(bx(i)), py(TB - 0.1));
      c.fillText(months[i], px(bx(i)), py(RB - 0.12));
    }
    c.strokeStyle = 'rgba(148,163,184,0.45)';
    c.lineWidth = 1;
    c.textAlign = 'right';
    c.font = '15px sans-serif';
    for (const v of [50, 100]) {
      c.beginPath();
      c.moveTo(px(-1.1), py(TB + v * TS));
      c.lineTo(px(1.1), py(TB + v * TS));
      c.stroke();
      c.fillText(String(v), px(-1.12), py(TB + v * TS) + 5);
    }
    for (const v of [4, 8]) {
      c.beginPath();
      c.moveTo(px(-1.1), py(RB + v * RS));
      c.lineTo(px(1.1), py(RB + v * RS));
      c.stroke();
      c.fillText(String(v), px(-1.12), py(RB + v * RS) + 5);
    }
    c.beginPath();
    c.moveTo(px(-1.1), py(TB));
    c.lineTo(px(1.1), py(TB));
    c.moveTo(px(-1.1), py(RB));
    c.lineTo(px(1.1), py(RB));
    c.stroke();
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.7), new THREE.MeshBasicMaterial({ map: boardTex }));
  board.add(panel);
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.75, 0.1), kit.mat.metal(0x334155));
    leg.position.set(sx * 1.0, -1.35 - 0.37, -0.04);
    board.add(leg);
  }
  const barGeo = new THREE.BoxGeometry(0.12, 1, 0.06);
  barGeo.translate(0, 0.5, 0);
  const bars = [];
  for (let i = 0; i < 24; i++) {
    const isT = i < 12;
    const m = new THREE.Mesh(barGeo, new THREE.MeshStandardMaterial({ color: isT ? 0xf97316 : 0x38bdf8, emissive: isT ? 0xf97316 : 0x38bdf8, emissiveIntensity: 0.35, roughness: 0.4 }));
    m.position.set(bx(i % 12), isT ? TB : RB, 0.04);
    m.scale.y = 0.001;
    board.add(m);
    bars.push(m);
  }
  const yearsLabel = kit.label('Years counted: 0', { size: 0.3, border: '#34d399' });
  yearsLabel.position.set(0, 1.62, 0.1);
  board.add(yearsLabel);
  const NOISE = [0.18, 0.08, 0];
  const cl = { d: 0, h: new Array(24).fill(0), armed: false };
  function targetHeights(d) {
    const hs = [];
    for (let i = 0; i < 24; i++) {
      if (d === 0) {
        hs.push(0.001);
        continue;
      }
      const base = i < 12 ? TEMP[i] * TS : RAINM[i - 12] * RS;
      const nz = (fract((i + 1) * 12.9898 + d * 78.233) * 2 - 1) * NOISE[d - 1];
      hs.push(Math.max(0.001, base * (1 + nz)));
    }
    return hs;
  }
  function paintBars() {
    for (let i = 0; i < 24; i++) bars[i].scale.y = Math.max(0.001, cl.h[i]);
  }
  function climateReset() {
    claim(cl);
    cl.d = 0;
    cl.armed = false;
    cl.h = targetHeights(0);
    paintBars();
    yearsLabel.setText('Years counted: 0');
  }
  async function addDecade() {
    if (cl.d >= 3) return;
    const s = claim(cl);
    cl.d++;
    const d = cl.d;
    const from = cl.h.slice();
    const to = targetHeights(d);
    kit.sfx('pop');
    yearsLabel.setText(d === 3 ? '30 years: this is the climate!' : `Years counted: ${d * 10}`);
    const ok = await glide(cl, s, 900, (k) => {
      for (let i = 0; i < 24; i++) cl.h[i] = lerp(from[i], to[i], k);
      paintBars();
    }, 'out');
    if (!ok) return;
    if (d === 3) {
      kit.sfx('chime');
      kit.vespa?.react('wow');
      if (cl.armed) {
        cl.armed = false;
        kit.emit('climateBuilt');
      }
    }
  }
  climateReset();

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const stopDemos = () => {
    cyc.demo++;
  };
  const cues = {
    idle() {
      kit.ui.clear();
    },
    // --- puddles ---
    puddleReset() {
      kit.ui.clear();
      puddleReset();
    },
    puddleDry: () => puddleDry(),
    // --- soda can ---
    canReset() {
      kit.ui.clear();
      canReset();
    },
    canChill: () => canChill(),
    // --- diorama ---
    dioramaReset() {
      kit.ui.clear();
      hideOrbs();
      simReset();
    },
    sunTo(args = {}) {
      const s = claim(pw);
      const from = sim.power;
      const to = args.to ?? 1;
      sunLabel.visible = true;
      return glide(pw, s, args.ms ?? 1800, (k) => (sim.power = lerp(from, to, k)), 'inOut');
    },
    sunMode() {
      kit.ui.clear();
      hideOrbs();
      simReset();
      sim.armCloud = true;
      sunLabel.visible = true;
      const el = kit.ui.slider({
        label: 'Sun power',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        onChange: (v) => {
          claim(pw);
          sim.power = v;
        },
      });
      kit.ui.buttons([
        {
          label: 'Full sun',
          emoji: '🌞',
          onClick: () => {
            claim(pw);
            sim.power = 1;
            el.setValue(1);
          },
        },
      ]);
    },
    rainReset() {
      kit.ui.clear();
      hideOrbs();
      simReset();
      sim.cloudK = 0.62;
      sim.tagOn = true;
      sunLabel.visible = true;
    },
    rainMode() {
      kit.ui.clear();
      claim(pw);
      sim.power = 0.8;
      sim.armRain = true;
      sunLabel.visible = true;
      const el = kit.ui.slider({
        label: 'Sun power',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0.8,
        onChange: (v) => {
          claim(pw);
          sim.power = v;
        },
      });
      kit.ui.buttons([
        {
          label: 'Full sun',
          emoji: '🌞',
          onClick: () => {
            claim(pw);
            sim.power = 1;
            el.setValue(1);
          },
        },
      ]);
    },
    cloudNote() {
      sim.tagOn = true;
    },
    tag(args = {}) {
      const o = orbs[(args.n ?? 1) - 1];
      if (!o) return;
      o.g.visible = true;
      o.tag.visible = true;
      o.glow = 2;
    },
    tagsHide() {
      hideOrbs();
    },
    cycleDemo: async () => {
      kit.ui.clear();
      hideOrbs();
      const s = cyc.demo;
      const from = sim.power;
      const ps = claim(pw);
      glide(pw, ps, 800, (k) => (sim.power = lerp(from, 0.8, k)));
      if (sim.cloudK < 0.5) sim.cloudK = 0.5;
      for (let i = 0; i < ORBS.length; i++) {
        if (cyc.demo !== s) return;
        const o = orbs[i];
        o.g.visible = true;
        o.tag.visible = true;
        o.glow = 1.8;
        kit.sfx('pop');
        await kit.wait(1500);
      }
    },
    cycleMode() {
      kit.ui.clear();
      hideOrbs();
      claim(pw);
      sim.power = 0.7;
      if (sim.cloudK < 0.4) sim.cloudK = 0.4;
      cyc.on = true;
      cyc.next = 0;
      cyc.armed = true;
      orbs.forEach((o) => {
        o.g.visible = true;
        o.tag.visible = false;
        o.done = false;
      });
      kit.ui.buttons([
        {
          label: 'Start over',
          emoji: '↩️',
          onClick: () => {
            cyc.next = 0;
            orbs.forEach((o) => {
              o.done = false;
              o.tag.visible = false;
            });
          },
        },
      ]);
    },
    // --- weather station ---
    weatherReset() {
      kit.ui.clear();
      weatherReset();
    },
    weatherMode() {
      kit.ui.clear();
      weatherReset();
      wx.armed = true;
      kit.ui.buttons([{ label: 'Next day', emoji: '📅', onClick: () => nextDay() }]);
    },
    // --- climate chart ---
    climateReset() {
      kit.ui.clear();
      climateReset();
    },
    climateMode() {
      kit.ui.clear();
      climateReset();
      cl.armed = true;
      kit.ui.buttons([
        { label: 'Add 10 years', emoji: '📆', onClick: () => addDecade() },
        { label: 'Start over', emoji: '↩️', onClick: () => { climateReset(); cl.armed = true; } },
      ]);
    },
    climateFull() {
      kit.ui.clear();
      claim(cl);
      cl.d = 3;
      cl.h = targetHeights(3);
      paintBars();
      yearsLabel.setText('30 years: this is the climate!');
    },
  };
  void stopDemos;

  return {
    root,
    shots: {
      wide: { pos: [0.4, 5.6, 12.4], look: [0.4, 1.0, -0.4] },
      puddle: { pos: [-4.2, 2.7, 5.4], look: [-4.2, 1.1, 1.4] },
      can: { pos: [-0.9, 2.2, 4.8], look: [-0.9, 1.1, 1.5] },
      bay: { pos: [-1.9, 4.0, 6.2], look: [-1.9, 1.3, -2.0] },
      sky: { pos: [-2.0, 3.3, 4.8], look: [-2.0, 2.2, -2.0] },
      weather: { pos: [2.6, 2.5, 5.4], look: [2.6, 1.5, 1.5] },
      climate: { pos: [3.7, 2.9, 5.0], look: [4.9, 2.1, -1.2] },
    },
    points: {
      puddle: [PU.x, 1.8, PU.z],
      sunPuddle: [sunX, 1.3, PU.z],
      shadePuddle: [shadeX, 1.3, PU.z],
      can: [CN.x, 1.9, CN.z],
      bay: [BAY_X, 1.5, DZ],
      sunSource: [-4.3, 4.0, -3.0],
      cloud: [CLOUD.x, 3.3, CLOUD.z],
      land: [-0.4, 1.7, DZ],
      stream: [-0.9, 1.0, -2.2],
      therm: [THX, 2.4, WT.z],
      gauge: [RGX, 2.0, WT.z],
      board: [BD.x, 3.5, BD.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
