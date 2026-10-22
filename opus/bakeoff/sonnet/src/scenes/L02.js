// Lesson 2 scene: the Picnic Lab. Six stations: sieve, scale + salt water, magnet + sand, oil jar, sun dish, mud jar.
// A camera-facing "look inside" panel shows the tiny pieces (salt crystal, water, evaporation).

const T = 0.8; // table top height
const ST = {
  sieve: { x: -4.4, z: 0.3 },
  scale: { x: 0, z: 0.5 },
  mag: { x: 4.4, z: 0.3 },
  oil: { x: -3.6, z: -3.0 },
  mud: { x: 0, z: -3.3 },
  dish: { x: 3.6, z: -3.0 },
};
const PLATE = 0.86; // top of scale plate
const PANEL = { x: 2.4, y: 2.5, z: 0.5 };
const BEAKER_X = ST.scale.x - 0.5;
const SALT_HOME = { x: ST.scale.x + 0.65, y: PLATE, z: ST.scale.z };
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.max(0, Math.min(1, t));

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const dummy = new THREE.Object3D();
  let mode = 'idle'; // idle | sieve | magnet | dissolve

  const steel = () => kit.mat.metal(0x2a3140);
  function pedestal(x, z, w = 2.6, d = 2.0) {
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
  // STATION A: sieve + trail mix
  // =====================================================================
  const SV = ST.sieve;
  pedestal(SV.x, SV.z, 2.6, 2.2);
  const bowl = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6, roughness: 0.35, side: THREE.DoubleSide })
  );
  bowl.scale.y = 0.45;
  bowl.position.set(SV.x, T + 0.42, SV.z);
  root.add(bowl);
  sign('Trail mix + sieve', SV.x, 2.95, SV.z);

  const sieve = new THREE.Group();
  const SIEVE_Y = T + 1.15;
  sieve.position.set(SV.x, SIEVE_Y, SV.z);
  root.add(sieve);
  {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 12, 40), kit.mat.metal(0xe5e7eb));
    rim.rotation.x = Math.PI / 2;
    const meshTex = kit.tex.grid('rgba(255,255,255,0.9)', '#1e293b');
    const net = new THREE.Mesh(
      new THREE.CircleGeometry(0.8, 40),
      new THREE.MeshBasicMaterial({ map: meshTex, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    );
    net.rotation.x = -Math.PI / 2;
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12), kit.mat.metal(0xe5e7eb));
    handle.rotation.z = Math.PI / 2;
    handle.position.set(1.15, 0, 0);
    sieve.add(rim, net, handle);
    sieve.traverse((o) => (o.castShadow = true));
  }
  const sieveTag = kit.label('Sieve: drag me side to side', { size: 0.22, border: '#f59e0b' });
  sieveTag.position.set(0, 0.95, 0);
  sieve.add(sieveTag);

  // trail mix pieces
  const bigPieces = [];
  const seeds = [];
  const rand = (a, b) => a + Math.random() * (b - a);
  const inDisc = (r) => {
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * r;
    return [Math.cos(a) * d, Math.sin(a) * d];
  };
  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), new THREE.MeshStandardMaterial({ color: 0x4b2145, roughness: 0.6 }));
    m.scale.set(1.2, 0.8, 0.9);
    const [x, z] = inDisc(0.55);
    m.position.set(x, 0.1, z);
    m.castShadow = true;
    sieve.add(m);
    bigPieces.push(m);
  }
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), new THREE.MeshStandardMaterial({ color: 0xc08a4a, roughness: 0.7 }));
    m.scale.set(1.3, 0.8, 0.9);
    const [x, z] = inDisc(0.55);
    m.position.set(x, 0.12, z);
    m.rotation.y = Math.random() * 3;
    m.castShadow = true;
    sieve.add(m);
    bigPieces.push(m);
  }
  for (let i = 0; i < 20; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshStandardMaterial({ color: 0xf5e6a8, roughness: 0.5 }));
    const [x, z] = inDisc(0.62);
    m.position.set(x, 0.07, z);
    m.userData.orig = m.position.clone();
    m.userData.fallen = false;
    sieve.add(m);
    seeds.push(m);
  }
  let sieveProgress = 0;
  let sieveDone = false;
  let sieveArmed = false;
  let sieveBusy = false;
  const SHAKE_GOAL = 5;

  function dropSeed(s) {
    s.userData.fallen = true;
    root.attach(s);
    kit.sfx('tick');
    const tx = SV.x + rand(-0.6, 0.6);
    const tz = SV.z + rand(-0.45, 0.45);
    kit.tween(s, { 'position.x': tx, 'position.y': T + 0.15 + Math.random() * 0.06, 'position.z': tz }, 420, 'in');
  }
  function addShake(dist) {
    if (sieveDone) return;
    sieveProgress += dist;
    const target = Math.floor(clamp01(sieveProgress / SHAKE_GOAL) * seeds.length);
    let fallen = seeds.filter((s) => s.userData.fallen).length;
    for (const s of seeds) {
      if (fallen >= target) break;
      if (!s.userData.fallen) {
        dropSeed(s);
        fallen++;
      }
    }
    if (fallen >= seeds.length) {
      sieveDone = true;
      sieveTag.setText('Big pieces stay. Seeds fell through!');
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.tween(sieve.position, { x: SV.x, z: SV.z }, 400, 'out');
      if (sieveArmed) kit.emit('sieved');
    }
  }
  kit.onDrag(sieve, {
    plane: 'xz',
    onMove: (p) => {
      if (mode !== 'sieve' || sieveBusy) return;
      const nx = THREE.MathUtils.clamp(p.x, SV.x - 0.8, SV.x + 0.8);
      const nz = THREE.MathUtils.clamp(p.z, SV.z - 0.3, SV.z + 0.3);
      addShake(Math.abs(nx - sieve.position.x) + Math.abs(nz - sieve.position.z) * 0.5);
      sieve.position.x = nx;
      sieve.position.z = nz;
    },
  });
  // raisins and nuts jiggle a bit while the sieve moves
  let lastSx = SV.x;
  updaters.push((dt, t) => {
    const v = Math.abs(sieve.position.x - lastSx) / Math.max(dt, 0.001);
    lastSx = sieve.position.x;
    const j = Math.min(0.03, v * 0.004);
    bigPieces.forEach((m, i) => (m.position.y = 0.11 + Math.sin(t * 40 + i) * j));
    sieve.rotation.z = Math.sin(t * 30) * Math.min(0.06, v * 0.01);
  });
  function resetSieve() {
    sieveProgress = 0;
    sieveDone = false;
    sieveArmed = false;
    sieveTag.setText('Sieve: drag me side to side');
    sieve.position.set(SV.x, SIEVE_Y, SV.z);
    for (const s of seeds) {
      sieve.attach(s);
      s.position.copy(s.userData.orig);
      s.userData.fallen = false;
    }
  }
  async function autoShake() {
    if (mode !== 'sieve' || sieveBusy || sieveDone) return;
    sieveBusy = true;
    let cur = sieve.position.x;
    await kit.animate(2600, (k) => {
      const nx = SV.x + Math.sin(k * Math.PI * 2 * 6) * 0.6;
      addShake(Math.abs(nx - cur));
      cur = nx;
      sieve.position.x = nx;
    });
    sieveBusy = false;
  }

  // =====================================================================
  // STATION B: scale, beaker of water, dish of salt
  // =====================================================================
  const SC = ST.scale;
  const scaleBase = new THREE.Mesh(new THREE.BoxGeometry(2.7, T - 0.1, 1.6), kit.mat.metal(0x334155));
  scaleBase.position.set(SC.x, (T - 0.1) / 2, SC.z);
  scaleBase.castShadow = scaleBase.receiveShadow = true;
  root.add(scaleBase);
  const plateMesh = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 1.4), kit.mat.metal(0xd1d5db));
  plateMesh.position.set(SC.x, PLATE - 0.05, SC.z);
  plateMesh.castShadow = plateMesh.receiveShadow = true;
  root.add(plateMesh);
  const scrn = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.3), kit.mat.glow(0x0c2a22, 0.6));
  scrn.position.set(SC.x, 0.4, SC.z + 0.81);
  root.add(scrn);
  const massLabel = kit.label('Total: 270 g', { size: 0.4, color: '#34d399', border: '#34d399' });
  massLabel.position.set(SC.x, 2.75, SC.z);
  root.add(massLabel);
  sign('Salt + water + scale', SC.x, 3.25, SC.z);

  const beaker = new THREE.Group();
  beaker.position.set(BEAKER_X, PLATE, SC.z);
  root.add(beaker);
  const glassCup = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.54, 1.3, 36, 1, true), kit.mat.glass());
  glassCup.position.y = 0.65;
  beaker.add(glassCup);
  const cupEdge = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.02, 8, 36), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
  cupEdge.rotation.x = Math.PI / 2;
  cupEdge.position.y = 1.3;
  beaker.add(cupEdge);
  const cupWater = new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.5, 1.0, 36), kit.mat.water(0x38bdf8));
  cupWater.position.y = 0.53;
  beaker.add(cupWater);
  const grains = [];
  for (let i = 0; i < 16; i++) {
    const g = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
    const [x, z] = inDisc(0.38);
    g.userData.rest = new THREE.Vector3(x, 0.1 + Math.random() * 0.05, z);
    g.userData.delay = Math.random() * 0.5;
    g.visible = false;
    beaker.add(g);
    grains.push(g);
  }
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.7, 10), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.3 }));
  rod.visible = false;
  beaker.add(rod);

  const saltDish = new THREE.Group();
  saltDish.position.set(SALT_HOME.x, SALT_HOME.y, SALT_HOME.z);
  root.add(saltDish);
  const saltPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.3, 0.1, 28), kit.mat.plastic(0xf1f5f9));
  saltPlate.position.y = 0.05;
  const saltPile = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.28, 14), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }));
  saltPile.position.y = 0.24;
  saltDish.add(saltPlate, saltPile);
  saltDish.traverse((o) => (o.castShadow = true));
  const saltTag = kit.label('Salt: 20 g', { size: 0.22, border: '#ffffff' });
  saltTag.position.set(0, 0.7, 0);
  saltDish.add(saltTag);

  let poured = false;
  let stirred = false;
  let beakerBusy = false;
  let dissolveArmed = false;

  function setMass(text) {
    massLabel.setText(text);
  }
  async function pourSalt() {
    if (beakerBusy || poured) return;
    beakerBusy = true;
    kit.sfx('whoosh');
    const from = saltDish.position.clone();
    const over = new THREE.Vector3(BEAKER_X + 0.3, 2.55, SC.z);
    await kit.animate(700, (k) => {
      saltDish.position.lerpVectors(from, over, k);
    }, 'inOut');
    kit.tween(saltDish.rotation, { z: 1.0 }, 350, 'out');
    kit.sfx('bubble');
    grains.forEach((g) => {
      g.visible = true;
      g.scale.setScalar(1);
      g.position.set(rand(-0.15, 0.15), 1.6, rand(-0.15, 0.15));
    });
    await kit.animate(1500, (k) => {
      saltPile.scale.setScalar(Math.max(0.001, 1 - smooth(k)));
      grains.forEach((g) => {
        const lk = smooth(clamp01((k - g.userData.delay * 0.6) / 0.45));
        g.position.x = THREE.MathUtils.lerp(g.position.x, g.userData.rest.x, lk * 0.2);
        g.position.z = THREE.MathUtils.lerp(g.position.z, g.userData.rest.z, lk * 0.2);
        g.position.y = THREE.MathUtils.lerp(1.6, g.userData.rest.y, lk);
      });
    });
    kit.sfx('splash');
    saltPile.visible = false;
    kit.tween(saltDish.rotation, { z: 0 }, 350, 'inOut');
    await kit.animate(600, (k) => saltDish.position.lerpVectors(over, from, smooth(k)));
    poured = true;
    beakerBusy = false;
  }
  async function stir() {
    if (beakerBusy || !poured || stirred) return;
    beakerBusy = true;
    rod.visible = true;
    kit.sfx('bubble');
    animatePanelD(1, 2400);
    await kit.animate(2800, (k) => {
      const a = k * Math.PI * 2 * 4;
      rod.position.set(Math.cos(a) * 0.22, 0.85, Math.sin(a) * 0.22);
      rod.rotation.set(Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12);
      const fade = 1 - smooth(clamp01((k - 0.3) / 0.55));
      grains.forEach((g) => {
        g.scale.setScalar(Math.max(0.001, fade));
        g.rotation.y += 0.3;
      });
    });
    grains.forEach((g) => (g.visible = false));
    rod.visible = false;
    stirred = true;
    beakerBusy = false;
    setMass('Still 270 g!');
    kit.sfx('chime');
    kit.vespa?.react('wow');
    if (dissolveArmed) kit.emit('dissolved');
  }
  function resetBeaker() {
    poured = stirred = beakerBusy = false;
    dissolveArmed = false;
    saltPile.visible = true;
    saltPile.scale.setScalar(1);
    saltDish.position.set(SALT_HOME.x, SALT_HOME.y, SALT_HOME.z);
    saltDish.rotation.set(0, 0, 0);
    grains.forEach((g) => (g.visible = false));
    rod.visible = false;
    setPanelD(0);
    setMass('Total: 270 g');
  }
  kit.onTap(saltDish, () => {
    if (mode === 'dissolve') pourSalt();
  });
  kit.onTap(glassCup, () => {
    if (mode !== 'dissolve') return;
    if (!poured) {
      kit.sfx('click');
      kit.vespa?.react('think');
    } else stir();
  });

  // =====================================================================
  // LOOK-INSIDE PANEL: tiny pieces
  // =====================================================================
  const panel = new THREE.Group();
  panel.position.set(PANEL.x, PANEL.y, PANEL.z);
  panel.visible = false;
  root.add(panel);
  panel.add(
    new THREE.Mesh(new THREE.CircleGeometry(0.92, 48), new THREE.MeshBasicMaterial({ color: 0x05080d, transparent: true, opacity: 0.93 })),
    new THREE.Mesh(new THREE.RingGeometry(0.92, 0.98, 48), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }))
  );
  const panelTag = kit.label('Salt crystal in water', { size: 0.24, border: '#38bdf8' });
  panelTag.position.y = -1.3;
  panel.add(panelTag);
  const WN = 46;
  const SN = 16;
  const waterMesh = new THREE.InstancedMesh(new THREE.CircleGeometry(0.055, 12), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), WN);
  const saltMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.115, 0.115), new THREE.MeshBasicMaterial({ color: 0xffffff }), SN);
  waterMesh.frustumCulled = saltMesh.frustumCulled = false;
  panel.add(waterMesh, saltMesh);
  const H = 0.62;
  const wParts = [];
  const sParts = [];
  function initWater(p) {
    p.pos.set(rand(-H, H), rand(-H, H), 0.01);
    p.vel.set(rand(-1, 1), rand(-1, 1), 0).multiplyScalar(0.2);
    p.leaving = false;
  }
  for (let i = 0; i < WN; i++) {
    const p = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), leaving: false };
    initWater(p);
    wParts.push(p);
  }
  for (let i = 0; i < SN; i++) {
    const gx = i % 4;
    const gy = Math.floor(i / 4);
    sParts.push({
      home: new THREE.Vector3((gx - 1.5) * 0.12, -0.34 + (gy - 1.5) * 0.12, 0.03),
      pos: new THREE.Vector3(rand(-H, H), rand(-H, H), 0.03),
      vel: new THREE.Vector3(rand(-1, 1), rand(-1, 1), 0).multiplyScalar(0.2),
    });
  }
  let panelD = 0; // 0 = crystal, 1 = spread out
  let evapK = 0;
  function setPanelD(d) {
    panelD = d;
    panelTag.setText(d > 0.6 ? 'Salt spread out (white) in water (blue)' : 'Salt crystal (white) in water (blue)');
  }
  function animatePanelD(to, ms) {
    const from = panelD;
    return kit.animate(ms, (k) => {
      panelD = from + (to - from) * smooth(k);
    }).then(() => setPanelD(to));
  }
  updaters.push((dt, t) => {
    if (!panel.visible) return;
    panel.quaternion.copy(kit.stage.camera.quaternion);
    for (let i = 0; i < WN; i++) {
      const p = wParts[i];
      let s = 1;
      if (!p.leaving && i / WN < evapK) p.leaving = true;
      if (p.leaving) {
        p.pos.y += dt * 0.5;
        p.pos.x += Math.sin(t * 3 + i) * dt * 0.12;
        if (p.pos.y > 0.88) s = 0;
      } else {
        p.vel.x += (Math.random() - 0.5) * dt * 4;
        p.vel.y += (Math.random() - 0.5) * dt * 4;
        p.vel.clampLength(0, 0.3);
        p.pos.addScaledVector(p.vel, dt);
        if (Math.abs(p.pos.x) > H) (p.vel.x *= -1), (p.pos.x = Math.sign(p.pos.x) * H);
        if (Math.abs(p.pos.y) > H) (p.vel.y *= -1), (p.pos.y = Math.sign(p.pos.y) * H);
      }
      dummy.position.copy(p.pos);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      waterMesh.setMatrixAt(i, dummy.matrix);
    }
    waterMesh.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < SN; i++) {
      const p = sParts[i];
      p.vel.x += (Math.random() - 0.5) * dt * 3;
      p.vel.y += (Math.random() - 0.5) * dt * 3;
      p.vel.clampLength(0, 0.22);
      p.pos.addScaledVector(p.vel, dt);
      if (Math.abs(p.pos.x) > H) (p.vel.x *= -1), (p.pos.x = Math.sign(p.pos.x) * H);
      if (Math.abs(p.pos.y) > H) (p.vel.y *= -1), (p.pos.y = Math.sign(p.pos.y) * H);
      const jit = (1 - panelD) * 0.005;
      dummy.position.set(
        p.home.x + (p.pos.x - p.home.x) * panelD + Math.sin(t * 30 + i) * jit,
        p.home.y + (p.pos.y - p.home.y) * panelD + Math.cos(t * 27 + i) * jit,
        0.03
      );
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      saltMesh.setMatrixAt(i, dummy.matrix);
    }
    saltMesh.instanceMatrix.needsUpdate = true;
  });

  // =====================================================================
  // STATION C: magnet + sand with iron bits
  // =====================================================================
  const MG = ST.mag;
  pedestal(MG.x, MG.z, 2.6, 2.4);
  const sandTex = kit.tex.canvas(256, 256, (c, w) => {
    c.fillStyle = '#d9b97a';
    c.fillRect(0, 0, w, w);
    for (let i = 0; i < 2200; i++) {
      c.fillStyle = `rgba(${150 + Math.random() * 80},${120 + Math.random() * 70},${70 + Math.random() * 50},0.6)`;
      c.fillRect(Math.random() * w, Math.random() * w, 2, 2);
    }
  });
  const dishBase = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.0, 0.14, 40), kit.mat.metal(0x94a3b8));
  dishBase.position.set(MG.x, T + 0.07, MG.z);
  const sandTop = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.08, 40), new THREE.MeshStandardMaterial({ map: sandTex, roughness: 1 }));
  sandTop.position.set(MG.x, T + 0.14, MG.z);
  root.add(dishBase, sandTop);
  sign('Sand + iron bits', MG.x, 2.95, MG.z);
  const ironCount = sign('Iron bits grabbed: 0 / 16', MG.x, 2.5, MG.z, { size: 0.24, border: '#f43f5e' });

  const filings = [];
  const FY = T + 0.2;
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.045, 0.06), new THREE.MeshStandardMaterial({ color: 0x22272e, metalness: 0.8, roughness: 0.35 }));
    m.castShadow = true;
    m.userData = { state: 'sand', home: new THREE.Vector3(), off: new THREE.Vector3(), t: 0, start: new THREE.Vector3() };
    root.add(m);
    filings.push(m);
  }
  function scatterFilings() {
    filings.forEach((m, i) => {
      const a = (i / filings.length) * Math.PI * 2 + rand(-0.3, 0.3);
      const d = 0.2 + Math.sqrt((i % 4) / 3 + Math.random() * 0.3) * 0.55;
      m.userData.home.set(MG.x + Math.cos(a) * d, FY, MG.z + Math.sin(a) * d);
      m.position.copy(m.userData.home);
      m.rotation.set(0, Math.random() * 3, 0);
      m.userData.state = 'sand';
    });
  }
  scatterFilings();

  const magnet = new THREE.Group();
  {
    const red = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.3, roughness: 0.35 });
    const silver = kit.mat.metal(0xe5e7eb);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), silver);
    lower.position.y = 0.2;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), red);
    upper.position.y = 0.6;
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5, 10), kit.mat.metal(0x6b7280));
    grip.position.y = 1.05;
    magnet.add(lower, upper, grip);
    magnet.traverse((o) => (o.castShadow = true));
    const field = kit.particles(40, { size: 0.07, color: 0xff6b8b, spread: 0.7 });
    field.position.y = -0.1;
    magnet.add(field);
    magnet.userData.field = field;
    const tag = kit.label('Magnet: drag me!', { size: 0.22, border: '#f43f5e' });
    tag.position.y = 1.55;
    magnet.add(tag);
  }
  const MAG_Y = T + 0.55;
  magnet.position.set(MG.x + 1.6, MAG_Y, MG.z + 1.1);
  root.add(magnet);
  let magArmed = false;
  let grabbed = 0;
  let magDone = false;
  let magBusy = false;
  const tipPos = () => new THREE.Vector3(magnet.position.x, magnet.position.y, magnet.position.z);
  updaters.push((dt, t) => {
    const field = magnet.userData.field;
    field.rotation.y += dt * 2;
    field.material.opacity = 0.5 + Math.sin(t * 6) * 0.3;
    const tip = tipPos();
    for (const m of filings) {
      const u = m.userData;
      if (u.state === 'sand') {
        if (mode !== 'magnet') continue;
        const d = Math.hypot(m.position.x - tip.x, m.position.z - tip.z);
        if (d < 0.8) {
          u.state = 'fly';
          u.t = 0;
          u.start.copy(m.position);
          u.off.set(rand(-0.13, 0.13), rand(-0.02, -0.0) - Math.random() * 0.05, rand(-0.1, 0.1));
          kit.sfx('magnet');
        }
      } else if (u.state === 'fly') {
        u.t += dt / 0.35;
        const k = smooth(clamp01(u.t));
        m.position.lerpVectors(u.start, tip.clone().add(u.off), k);
        m.position.y += Math.sin(k * Math.PI) * 0.25;
        m.rotation.y += dt * 10;
        if (u.t >= 1) {
          u.state = 'stuck';
          grabbed++;
          ironCount.setText(`Iron bits grabbed: ${grabbed} / ${filings.length}`);
          if (grabbed >= filings.length && !magDone) {
            magDone = true;
            kit.sfx('chime');
            kit.vespa?.react('happy');
            ironCount.setText('All 16 iron bits grabbed! Sand stays.');
            if (magArmed) kit.emit('magnetSorted');
          }
        }
      } else if (u.state === 'stuck') {
        m.position.copy(tip).add(u.off);
      }
    }
  });
  kit.onDrag(magnet, {
    plane: 'xz',
    onMove: (p) => {
      if (magBusy) return;
      magnet.position.x = THREE.MathUtils.clamp(p.x, MG.x - 1.6, MG.x + 1.6);
      magnet.position.z = THREE.MathUtils.clamp(p.z, MG.z - 1.3, MG.z + 1.5);
    },
  });
  function resetMagnet() {
    magDone = false;
    grabbed = 0;
    magArmed = false;
    magBusy = false;
    magnet.position.set(MG.x + 1.6, MAG_Y, MG.z + 1.1);
    scatterFilings();
    ironCount.setText('Iron bits grabbed: 0 / 16');
  }
  async function magnetSweep() {
    if (mode !== 'magnet' || magBusy || magDone) return;
    magBusy = true;
    await kit.tween(magnet.position, { x: MG.x - 1.0, z: MG.z - 0.45 }, 600);
    await kit.tween(magnet.position, { x: MG.x + 1.0 }, 1500, 'linear');
    await kit.tween(magnet.position, { z: MG.z + 0.45 }, 300);
    await kit.tween(magnet.position, { x: MG.x - 1.0 }, 1500, 'linear');
    magBusy = false;
  }

  // =====================================================================
  // STATION D: oil and water jar
  // =====================================================================
  const OL = ST.oil;
  pedestal(OL.x, OL.z, 2.0, 2.0);
  sign('Oil and water', OL.x, 3.0, OL.z);
  const oilJar = new THREE.Group();
  oilJar.position.set(OL.x, T, OL.z);
  root.add(oilJar);
  const jarGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.75, 32, 1, true), kit.mat.glass());
  jarGlass.position.y = 0.9;
  const jarWater = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.0, 32), kit.mat.water(0x2f8fe0));
  jarWater.position.y = 0.53;
  const OIL_BOTTOM = 1.03;
  const oilGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 32);
  oilGeo.translate(0, 0.2, 0);
  const oilLayer = new THREE.Mesh(oilGeo, new THREE.MeshPhysicalMaterial({ color: 0xfacc15, transparent: true, opacity: 0.8, roughness: 0.15, clearcoat: 1, depthWrite: false }));
  oilLayer.position.y = OIL_BOTTOM;
  oilLayer.scale.y = 0.001;
  oilLayer.visible = false;
  oilJar.add(jarGlass, jarWater, oilLayer);
  const DN = 48;
  const dropMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 10, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 }), DN);
  dropMesh.frustumCulled = false;
  dropMesh.visible = false;
  oilJar.add(dropMesh);
  const drops = [];
  for (let i = 0; i < DN; i++) {
    const [x, z] = inDisc(0.42);
    drops.push({ x, z, y0: rand(0.1, 0.98), delay: Math.random() * 0.55 });
  }
  const oilBottle = new THREE.Group();
  {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 }));
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.2, 12), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 }));
    neck.position.y = 0.35;
    oilBottle.add(body, neck);
    oilBottle.position.set(OL.x + 0.29, T + 2.5, OL.z);
    oilBottle.rotation.z = 2.0;
    oilBottle.visible = false;
    root.add(oilBottle);
  }
  const streamGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 8);
  streamGeo.translate(0, -0.5, 0);
  const oilStream = new THREE.Mesh(streamGeo, new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
  oilStream.position.set(OL.x, T + 2.35, OL.z);
  oilStream.visible = false;
  root.add(oilStream);
  const oilTag = kit.label('Water only', { size: 0.22, border: '#facc15' });
  oilTag.position.set(OL.x, T + 2.1, OL.z);
  root.add(oilTag);

  function layoutDrops(k) {
    // k in 0..1: 0 = spread everywhere, 1 = all risen to the top
    for (let i = 0; i < DN; i++) {
      const d = drops[i];
      const lk = smooth(clamp01((k - d.delay * 0.7) / 0.4));
      dummy.position.set(d.x, THREE.MathUtils.lerp(d.y0, 1.05, lk), d.z);
      dummy.scale.setScalar(lk >= 1 ? 0.001 : 1);
      dummy.updateMatrix();
      dropMesh.setMatrixAt(i, dummy.matrix);
    }
    dropMesh.instanceMatrix.needsUpdate = true;
  }
  function resetOil() {
    oilLayer.visible = false;
    oilLayer.scale.y = 0.001;
    dropMesh.visible = false;
    oilBottle.visible = false;
    oilStream.visible = false;
    oilJar.position.set(OL.x, T, OL.z);
    oilTag.setText('Water only');
  }
  async function pourOil() {
    resetOil();
    oilBottle.visible = true;
    kit.sfx('whoosh');
    await kit.wait(500);
    oilStream.visible = true;
    kit.sfx('bubble');
    oilLayer.visible = true;
    await kit.animate(2200, (k) => {
      oilStream.scale.y = 1.2 * Math.min(1, k * 6) * (k > 0.85 ? 1 - (k - 0.85) / 0.15 : 1) + 0.001;
      oilLayer.scale.y = 0.001 + 0.999 * smooth(k);
    });
    oilStream.visible = false;
    oilBottle.visible = false;
    oilTag.setText('Oil floats on top!');
    kit.sfx('chime');
  }
  async function shakeOil() {
    oilLayer.visible = false;
    dropMesh.visible = true;
    layoutDrops(0);
    oilTag.setText('Shaking...');
    kit.sfx('whoosh');
    await kit.animate(900, (k) => {
      oilJar.position.x = OL.x + Math.sin(k * Math.PI * 14) * 0.12 * (1 - k * 0.3);
      oilJar.rotation.z = Math.sin(k * Math.PI * 14) * 0.06;
    });
    oilJar.position.x = OL.x;
    oilJar.rotation.z = 0;
    oilTag.setText('Tiny oil drops everywhere');
    await kit.wait(900);
    oilTag.setText('Oil rises back up...');
    await kit.animate(3000, (k) => {
      layoutDrops(k);
      if (k > 0.7) {
        oilLayer.visible = true;
        oilLayer.scale.y = 0.001 + 0.999 * smooth((k - 0.7) / 0.3);
      }
    });
    dropMesh.visible = false;
    oilLayer.scale.y = 1;
    oilTag.setText('Two layers again!');
  }

  // =====================================================================
  // STATION E: salty water in the sun
  // =====================================================================
  const DS = ST.dish;
  pedestal(DS.x, DS.z, 2.4, 2.2);
  sign('Salty water in the sun', DS.x, 3.0, DS.z);
  const dishGroup = new THREE.Group();
  dishGroup.position.set(DS.x, T, DS.z);
  root.add(dishGroup);
  const dishPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 0.95, 0.12, 40), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.5 }));
  dishPlate.position.y = 0.06;
  const dishRim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.06, 10, 40), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.5 }));
  dishRim.rotation.x = Math.PI / 2;
  dishRim.position.y = 0.28;
  const dishWall = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.95, 0.24, 40, 1, true), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.5, side: THREE.DoubleSide }));
  dishWall.position.y = 0.17;
  const dishWater = new THREE.Mesh(new THREE.CylinderGeometry(0.93, 0.9, 0.2, 40), kit.mat.water(0x38bdf8));
  const WATER_BASE = 0.12;
  dishWater.position.y = WATER_BASE + 0.1;
  dishGroup.add(dishPlate, dishRim, dishWall, dishWater);
  const crust = new THREE.Group();
  crust.position.y = WATER_BASE + 0.015;
  dishGroup.add(crust);
  for (let i = 0; i < 40; i++) {
    const s = rand(0.08, 0.17);
    const c = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.7, s), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 }));
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * 0.82;
    c.position.set(Math.cos(a) * d, s * 0.3, Math.sin(a) * d);
    c.rotation.set(Math.random(), Math.random() * 3, Math.random());
    crust.add(c);
  }
  crust.scale.setScalar(0.001);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 16), kit.mat.glow(0xfbbf24, 1.6));
  sun.position.set(DS.x + 1.3, 3.5, DS.z - 0.3);
  sun.visible = false;
  root.add(sun);
  const dayTag = kit.label('Day 0', { size: 0.3, border: '#fbbf24' });
  dayTag.position.set(DS.x, T + 1.8, DS.z);
  root.add(dayTag);
  const vapor = kit.particles(26, { size: 0.16, color: 0xd7f1ff, spread: 0.1 });
  vapor.position.set(DS.x, T + 0.4, DS.z);
  vapor.visible = false;
  root.add(vapor);
  const vaporSeed = [];
  for (let i = 0; i < 26; i++) {
    const [x, z] = inDisc(0.75);
    vaporSeed.push({ x, z, ph: Math.random() });
  }
  let vaporOn = false;
  updaters.push((dt, t) => {
    sun.rotation.y += dt;
    if (!vapor.visible) return;
    vaporSeed.forEach((v, i) => {
      const k = (v.ph + t * 0.25) % 1;
      vapor.positions[i * 3] = v.x + Math.sin(t * 2 + i) * 0.08;
      vapor.positions[i * 3 + 1] = k * 1.4;
      vapor.positions[i * 3 + 2] = v.z;
    });
    vapor.commit();
    vapor.material.opacity = vaporOn ? 0.9 : 0;
  });
  function resetDish() {
    dishWater.scale.y = 1;
    dishWater.position.y = WATER_BASE + 0.1;
    dishWater.visible = true;
    crust.scale.setScalar(0.001);
    sun.visible = false;
    vapor.visible = false;
    vaporOn = false;
    dayTag.setText('Day 0');
  }
  async function sunDays() {
    resetDish();
    sun.visible = true;
    vapor.visible = true;
    vaporOn = true;
    kit.sfx('wind');
    let day = 0;
    await kit.animate(5600, (k) => {
      const s = Math.max(0.03, 1 - k * 0.98);
      dishWater.scale.y = s;
      dishWater.position.y = WATER_BASE + 0.1 * s;
      const c = smooth(clamp01((k - 0.4) / 0.6));
      crust.scale.setScalar(Math.max(0.001, c));
      const d = k < 0.33 ? 1 : k < 0.66 ? 2 : 3;
      if (d !== day) {
        day = d;
        dayTag.setText(`Day ${d}`);
        kit.sfx('tick');
      }
    });
    dishWater.visible = false;
    vaporOn = false;
    dayTag.setText('Salt crystals left behind!');
    kit.sfx('chime');
    await kit.wait(400);
    vapor.visible = false;
  }

  // =====================================================================
  // STATION F: muddy floodwater jar
  // =====================================================================
  const MD = ST.mud;
  pedestal(MD.x, MD.z, 2.0, 2.0);
  sign('Floodwater jar', MD.x, 3.1, MD.z);
  const mudJar = new THREE.Group();
  mudJar.position.set(MD.x, T, MD.z);
  root.add(mudJar);
  const mudGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 1.8, 32, 1, true), kit.mat.glass());
  mudGlass.position.y = 0.92;
  const mudWaterMat = kit.mat.water(0x8b6b4a);
  mudWaterMat.opacity = 0.88;
  const mudWater = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.54, 1.5, 32), mudWaterMat);
  mudWater.position.y = 0.8;
  mudJar.add(mudGlass, mudWater);
  const MN = 110;
  const mudMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.04, 8, 6), new THREE.MeshStandardMaterial({ color: 0xa47f52, roughness: 0.9 }), MN);
  mudMesh.frustumCulled = false;
  mudJar.add(mudMesh);
  const mud = [];
  for (let i = 0; i < MN; i++) {
    const [x, z] = inDisc(0.46);
    mud.push({ x, z, y0: rand(0.08, 1.5), ys: 0.06 + Math.random() * 0.16, delay: Math.random() * 0.5, ph: Math.random() * 6 });
  }
  const BROWN = new THREE.Color(0x8b6b4a);
  const CLEAR = new THREE.Color(0x9fd3e8);
  let mudK = 0;
  let mudMoving = false;
  function layoutMud(k, t) {
    for (let i = 0; i < MN; i++) {
      const m = mud[i];
      const lk = smooth(clamp01((k - m.delay * 0.8) / 0.5));
      let y = THREE.MathUtils.lerp(m.y0, m.ys, lk);
      let x = m.x;
      if (lk < 1) {
        y += Math.sin(t * 2 + m.ph) * 0.03 * (1 - lk);
        x += Math.cos(t * 1.7 + m.ph) * 0.03 * (1 - lk);
      }
      dummy.position.set(x, y, m.z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mudMesh.setMatrixAt(i, dummy.matrix);
    }
    mudMesh.instanceMatrix.needsUpdate = true;
    mudWater.material.color.copy(BROWN).lerp(CLEAR, clamp01(k * 1.1));
    mudWater.material.opacity = 0.88 - 0.35 * clamp01(k);
  }
  updaters.push((dt, t) => {
    if (!mudMoving && mudK < 1) layoutMud(mudK, t);
  });
  layoutMud(0, 0);
  async function shakeMud() {
    mudK = 0;
    mudMoving = false;
    kit.sfx('whoosh');
    await kit.animate(800, (k) => {
      mudJar.position.x = MD.x + Math.sin(k * Math.PI * 12) * 0.1;
      mudJar.rotation.z = Math.sin(k * Math.PI * 12) * 0.05;
    });
    mudJar.position.x = MD.x;
    mudJar.rotation.z = 0;
  }
  async function settleMud() {
    mudMoving = true;
    await kit.animate(5200, (k) => {
      mudK = k;
      layoutMud(k, k * 5);
    });
    mudK = 1;
    layoutMud(1, 0);
    mudMoving = false;
    kit.sfx('thud');
  }

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const cues = {
    idle() {
      mode = 'idle';
      kit.ui.clear();
    },
    // --- sieve ---
    resetSieve() {
      mode = 'idle';
      kit.ui.clear();
      resetSieve();
    },
    sieveMode() {
      mode = 'sieve';
      sieveArmed = true;
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Shake it for me', emoji: '🥣', onClick: () => autoShake() }]);
    },
    // --- magnet ---
    resetMagnet() {
      mode = 'idle';
      kit.ui.clear();
      resetMagnet();
    },
    magnetMode() {
      mode = 'magnet';
      magArmed = true;
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Sweep for me', emoji: '🧲', onClick: () => magnetSweep() },
        { label: 'Start over', emoji: '↩️', onClick: () => { resetMagnet(); magArmed = true; } },
      ]);
    },
    // --- beaker and salt ---
    resetBeaker() {
      mode = 'idle';
      kit.ui.clear();
      resetBeaker();
    },
    async demoDissolve() {
      mode = 'idle';
      dissolveArmed = false;
      await pourSalt();
      await stir();
      setMass('Total: 270 g');
    },
    dissolveMode() {
      resetBeaker();
      mode = 'dissolve';
      dissolveArmed = true;
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Pour salt', emoji: '🧂', onClick: () => pourSalt() },
        { label: 'Stir', emoji: '🥄', onClick: () => (poured ? stir() : kit.vespa?.react('think')) },
      ]);
    },
    // --- look inside panel ---
    lookSlider() {
      kit.ui.clear();
      setPanelD(0);
      evapK = 0;
      wParts.forEach(initWater);
      panel.visible = true;
      panel.scale.setScalar(0.05);
      let done = false;
      kit.ui.slider({
        label: '🔍 Zoom in',
        min: 0.05,
        max: 1,
        step: 0.01,
        value: 0.05,
        onChange: (v) => {
          panel.scale.setScalar(v);
          if (v > 0.9 && !done) {
            done = true;
            kit.sfx('chime');
            kit.emit('lookedInside');
          }
        },
      });
    },
    panelSpread() {
      panel.visible = true;
      return animatePanelD(1, 3200);
    },
    async panelEvap() {
      panel.visible = true;
      panel.scale.setScalar(1);
      evapK = 0;
      wParts.forEach(initWater);
      setPanelD(1);
      panelTag.setText('Water leaves as gas. Salt stays!');
      await kit.wait(600);
      kit.animate(3600, (k) => (evapK = k));
      await animatePanelD(0, 3600);
      panelTag.setText('Water left. The salt is still here!');
      await kit.wait(600);
    },
    panelHide() {
      panel.visible = false;
      kit.ui.clear();
      evapK = 0;
    },
    // --- dish in the sun ---
    resetDish() {
      mode = 'idle';
      kit.ui.clear();
      resetDish();
    },
    sunDays: () => sunDays(),
    // --- oil and water ---
    resetOil() {
      kit.ui.clear();
      resetOil();
    },
    pourOil: () => pourOil(),
    shakeOil: () => shakeOil(),
    // --- floodwater ---
    shakeMud: () => shakeMud(),
    settleMud: () => settleMud(),
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.4, 12.0], look: [0, 1.0, -0.6] },
      sieve: { pos: [-3.6, 3.2, 4.8], look: [-4.4, 1.3, 0.3] },
      magnet: { pos: [3.7, 3.2, 4.8], look: [4.3, 1.1, 0.3] },
      beaker: { pos: [0.4, 2.9, 5.6], look: [0, 1.5, 0.5] },
      inside: { pos: [1.4, 2.8, 5.0], look: [2.1, 2.4, 0.5] },
      oil: { pos: [-2.4, 3.0, 1.2], look: [-3.6, 1.6, -3.0] },
      dish: { pos: [2.4, 3.0, 1.2], look: [3.6, 1.2, -3.0] },
      mud: { pos: [1.8, 3.0, 1.0], look: [0, 1.5, -3.3] },
    },
    points: {
      beaker: [BEAKER_X, 2.0, SC.z],
      salt: [SALT_HOME.x, 1.5, SALT_HOME.z],
      scale: [SC.x, 2.2, SC.z],
      panel: [PANEL.x, PANEL.y + 0.3, PANEL.z],
      mix: [SV.x, 2.2, SV.z],
      sieve: [SV.x + 1.0, 2.0, SV.z],
      sand: [MG.x, 1.7, MG.z],
      oil: [OL.x, 2.7, OL.z],
      dish: [DS.x, 1.9, DS.z],
      mud: [MD.x, 2.6, MD.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
