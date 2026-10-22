// Lesson 2 scene: Galveston picnic lab. Trail-mix screen, magnet dish,
// salt beaker on a scale, look-inside particles, sun dish, snack cups, flood bucket.
// Every cue, shot, and point used by the lesson is defined here.

const LAB = { x: 0.15, z: 0.32 };
const MIX = { x: -4.35, z: 0.35 };
const BOWL = { x: -4.35, z: 1.55 };
const SIEVE_HOME = { x: -2.55, y: 0.98, z: 0.5 };
const DISH = { x: 4.25, z: 0.05 };
const EVAP = { x: 2.6, z: 1.82 };
const CUP_Z = -2.72;
const CUP_X = [-1.25, 0.2, 1.65];
const FLOOD = { x: -4.35, z: -2.55 };

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  let mode = 'idle';

  const wood = kit.mat.wood('#7a4a22');
  const woodDark = kit.mat.wood('#5a3416');

  // ---------------- picnic towel + shrimp ----------------
  const towel = new THREE.Mesh(
    new THREE.CylinderGeometry(1.65, 1.65, 0.03, 32),
    new THREE.MeshStandardMaterial({ map: kit.tex.stripes('#38bdf8', '#f8fafc', 8), roughness: 0.9 })
  );
  towel.position.set(LAB.x, 0.02, 0.85);
  towel.receiveShadow = true;
  root.add(towel);

  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.04, 24), kit.mat.plastic(0xf8fafc));
  plate.position.set(-1.55, 0.06, 1.95);
  root.add(plate);
  const shrimpMat = kit.mat.plastic(0xfb7185);
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.028, 8, 14, Math.PI * 1.15), shrimpMat);
    s.position.set(-1.68 + i * 0.14, 0.1, 1.95);
    s.rotation.x = Math.PI / 2;
    s.rotation.z = -0.4 + i * 0.35;
    root.add(s);
  }
  const picnicTag = kit.label('Galveston picnic', { size: 0.22, border: '#38bdf8' });
  picnicTag.position.set(-1.55, 0.55, 1.95);
  root.add(picnicTag);

  // ---------------- beaker on a digital scale ----------------
  const lab = new THREE.Group();
  lab.position.set(LAB.x, 0, LAB.z);
  root.add(lab);

  const sBase = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.62, 1.05), kit.mat.metal(0x334155));
  sBase.position.y = 0.31;
  sBase.castShadow = sBase.receiveShadow = true;
  lab.add(sBase);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.22), kit.mat.glow(0x052e26, 0.5));
  screen.position.set(0, 0.36, 0.53);
  lab.add(screen);
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.06, 32), kit.mat.metal(0xd1d5db));
  plate.position.y = 0.66;
  plate.castShadow = plate.receiveShadow = true;
  lab.add(plate);

  const beaker = new THREE.Group();
  beaker.position.y = 0.7;
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.34, 1.12, 28, 1, true), kit.mat.glass());
  wall.position.y = 0.56;
  const btm = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 24), kit.mat.glass());
  btm.position.y = 0.03;
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.27, 0.7, 24), kit.mat.water(0x38bdf8));
  water.position.y = 0.42;
  water.material.opacity = 0.4;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.025, 8, 28), kit.mat.glow(0x7dd3fc, 0.35));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.12;
  beaker.add(wall, btm, water, rim);
  lab.add(beaker);

  const saltMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45, emissive: 0xe2e8f0, emissiveIntensity: 0.35 });
  const grains = new THREE.Group();
  grains.position.y = 0.42;
  grains.visible = false;
  const grainList = [];
  for (let i = 0; i < 18; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 6), saltMat);
    const a = (i / 18) * Math.PI * 2;
    const rad = 0.05 + (i % 3) * 0.045;
    m.position.set(Math.cos(a) * rad, -0.18 + (i % 6) * 0.07, Math.sin(a) * rad);
    m.userData.home = m.position.clone();
    grains.add(m);
    grainList.push(m);
  }
  beaker.add(grains);

  const stirPivot = new THREE.Group();
  stirPivot.position.set(0, 1.25, 0);
  const spoonHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 8), kit.mat.wood('#c4a574'));
  spoonHandle.position.set(0.42, 0.18, 0);
  spoonHandle.rotation.z = 0.9;
  const spoonBowl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.mat.metal(0xe5e7eb));
  spoonBowl.scale.y = 0.45;
  spoonBowl.position.set(0.22, -0.02, 0);
  stirPivot.add(spoonHandle, spoonBowl);
  lab.add(stirPivot);

  const shaker = new THREE.Group();
  shaker.position.set(1.38, 0.7, 0.12);
  const shakerHome = shaker.position.clone();
  const shBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.55, 16), kit.mat.plastic(0xf8fafc));
  shBody.position.y = 0.28;
  shBody.castShadow = true;
  const shCap = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 16), kit.mat.metal(0x94a3b8));
  shCap.position.y = 0.58;
  shaker.add(shBody, shCap);
  for (let i = 0; i < 5; i++) {
    const hole = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), kit.mat.metal(0x334155));
    const a = (i / 5) * Math.PI * 2;
    hole.position.set(Math.cos(a) * 0.05, 0.64, Math.sin(a) * 0.05);
    shaker.add(hole);
  }
  const shakerTag = kit.label('Salt', { size: 0.2, border: '#e2e8f0' });
  shakerTag.position.y = 0.9;
  shaker.add(shakerTag);
  lab.add(shaker);

  const readout = kit.label(' ', { size: 0.4, color: '#34d399', border: '#34d399' });
  readout.position.set(0, 2.15, 0.15);
  readout.visible = false;
  lab.add(readout);
  const scaleSign = kit.label('Scale', { size: 0.24 });
  scaleSign.position.set(0, 2.55, 0.15);
  lab.add(scaleSign);
  const glassTag = kit.label('Beach glass', { size: 0.22, border: '#38bdf8' });
  glassTag.position.set(-0.72, 1.45, 0);
  lab.add(glassTag);

  let massShown = 0;
  let massToken = 0;
  let trayRead = null;
  let dissolveArmed = false;
  let poured = false;
  let pourBusy = false;
  let stirBusy = false;

  function setMassText(n) {
    const t = `${n} g`;
    readout.setText(t);
    trayRead?.set(t);
  }

  function animateMass(to, ms = 650) {
    const token = ++massToken;
    const from = massShown;
    plate.position.y = 0.62;
    kit.tween(plate, { 'position.y': 0.66 }, 380, 'back');
    return kit.animate(ms, (k) => {
      if (token !== massToken) return;
      massShown = Math.round(from + (to - from) * k);
      setMassText(massShown);
    }).then(() => {
      if (token !== massToken) return;
      massShown = to;
      setMassText(to);
      kit.sfx('tick');
    });
  }

  function resetGrainPos() {
    grains.scale.setScalar(1);
    for (const m of grainList) m.position.copy(m.userData.home);
  }

  function dropSaltIn() {
    resetGrainPos();
    const jobs = grainList.map((m, i) => {
      const home = m.userData.home;
      m.position.set(home.x, home.y + 1.15, home.z);
      return kit.tween(m, { 'position.y': home.y }, 380 + i * 18, 'in');
    });
    grains.visible = true;
    kit.sfx('pop');
    return Promise.all(jobs).then(() => kit.sfx('splash'));
  }

  function spinSpoon(turns = 1) {
    const to = stirPivot.rotation.y + Math.PI * 2 * turns;
    return kit.tween(stirPivot, { 'rotation.y': to }, 850, 'inOut');
  }

  function dissolveLook() {
    const spin = spinSpoon(1);
    return kit.tween(grains, { 'scale.x': 0.02, 'scale.y': 0.02, 'scale.z': 0.02 }, 750, 'in').then(async () => {
      await spin;
      grains.visible = false;
      resetGrainPos();
      kit.sfx('bubble');
    });
  }

  async function pourSalt() {
    if (!dissolveArmed || pourBusy || poured) return;
    pourBusy = true;
    await kit.tween(shaker, { 'position.x': 0.42, 'position.y': 1.65, 'rotation.z': 1.05 }, 480, 'inOut');
    await dropSaltIn();
    await animateMass(220);
    await kit.tween(shaker, { 'position.x': shakerHome.x, 'position.y': shakerHome.y, 'rotation.z': 0 }, 420, 'inOut');
    poured = true;
    pourBusy = false;
    shakerTag.setText('Now tap Stir');
    kit.vespa?.react('think');
  }

  async function stirSalt() {
    if (!dissolveArmed || stirBusy) return;
    if (!poured) {
      kit.sfx('click');
      kit.vespa?.react('think');
      shakerTag.setText('Pour salt first');
      return;
    }
    stirBusy = true;
    dissolveArmed = false;
    await dissolveLook();
    setMassText(220);
    massShown = 220;
    kit.sfx('chime');
    kit.vespa?.react('happy');
    glassTag.setText('Still 220 g');
    kit.emit('dissolved');
    stirBusy = false;
  }

  kit.onTap(shaker, () => pourSalt());

  updaters.push((dt, t) => {
    water.position.y = 0.42 + Math.sin(t * 1.6) * 0.008;
  });

  // ---------------- trail mix + screen ----------------
  const mixTable = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 2.45), wood);
  mixTable.position.set(MIX.x, 0.46, 0.9);
  mixTable.castShadow = mixTable.receiveShadow = true;
  root.add(mixTable);
  [[-1.0, -1.05], [1.0, -1.05], [-1.0, 1.05], [1.0, 1.05]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.1), woodDark);
    leg.position.set(MIX.x + x, 0.2, 0.9 + z);
    leg.castShadow = true;
    root.add(leg);
  });

  const jar = new THREE.Group();
  jar.position.set(MIX.x, 0.52, MIX.z);
  const jarGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.3, 1.02, 24, 1, true), kit.mat.glass());
  jarGlass.position.y = 0.51;
  const jarBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 24), kit.mat.glass());
  jarBottom.position.y = 0.03;
  const jarRim = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 8, 24), kit.mat.glow(0xfbbf24, 0.4));
  jarRim.rotation.x = Math.PI / 2;
  jarRim.position.y = 1.02;
  jar.add(jarGlass, jarBottom, jarRim);
  root.add(jar);

  const raisinMat = kit.mat.plastic(0x6b2148);
  const nutMat = kit.mat.plastic(0xd4a056);
  const seedMat = kit.mat.plastic(0xf5e6a8);
  const bigs = [];
  const smalls = [];

  function makePiece(mesh, i, n, y, list) {
    const a = (i / n) * Math.PI * 2 + 0.4;
    mesh.position.set(MIX.x + Math.cos(a) * 0.1, y, MIX.z + Math.sin(a) * 0.1);
    mesh.userData.home = mesh.position.clone();
    mesh.castShadow = true;
    root.add(mesh);
    list.push(mesh);
  }
  for (let i = 0; i < 2; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), raisinMat);
    m.scale.set(1.25, 0.72, 0.95);
    makePiece(m, i, 4, 1.15 + i * 0.08, bigs);
  }
  for (let i = 0; i < 2; i++) {
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.11, 0), nutMat);
    makePiece(m, i + 2, 4, 1.0 + i * 0.1, bigs);
  }
  for (let i = 0; i < 8; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), seedMat);
    makePiece(m, i, 8, 0.78 + (i % 4) * 0.08, smalls);
  }

  const bowl = new THREE.Group();
  bowl.position.set(BOWL.x, 0.58, BOWL.z);
  const bowlCup = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.24, 0.22, 24), kit.mat.wood('#92400e'));
  const bowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.035, 8, 24), kit.mat.wood('#b45309'));
  bowlRim.rotation.x = Math.PI / 2;
  bowlRim.position.y = 0.11;
  bowl.add(bowlCup, bowlRim);
  root.add(bowl);
  const bowlTag = kit.label('Bowl', { size: 0.2, border: '#fbbf24' });
  bowlTag.position.set(BOWL.x, 0.95, BOWL.z);
  root.add(bowlTag);

  const targetHoop = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.035, 8, 32), kit.mat.glow(0x22c55e, 0.9));
  targetHoop.rotation.x = Math.PI / 2;
  targetHoop.position.set(BOWL.x, 0.9, BOWL.z);
  root.add(targetHoop);
  updaters.push((dt, t) => {
    targetHoop.material.emissiveIntensity = 0.55 + Math.sin(t * 4) * 0.4;
  });

  const sieve = new THREE.Group();
  sieve.position.set(SIEVE_HOME.x, SIEVE_HOME.y, SIEVE_HOME.z);
  const frameMat = kit.mat.wood('#8a5a2b');
  const wireMat = kit.mat.metal(0xe2e8f0);
  function sieveBar(w, h, d, x, y, z, mat) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    sieve.add(m);
  }
  sieveBar(1.45, 0.07, 0.07, 0, 0, -0.46, frameMat);
  sieveBar(1.45, 0.07, 0.07, 0, 0, 0.46, frameMat);
  sieveBar(0.07, 0.07, 0.92, -0.69, 0, 0, frameMat);
  sieveBar(0.07, 0.07, 0.92, 0.69, 0, 0, frameMat);
  for (let i = -3; i <= 3; i++) sieveBar(1.3, 0.02, 0.02, 0, 0.03, i * 0.12, wireMat);
  const film = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.05, 0.82),
    new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.14, depthWrite: false })
  );
  film.position.y = 0.02;
  sieve.add(film);
  const sieveTag = kit.label('Screen', { size: 0.22, border: '#22c55e' });
  sieveTag.position.y = 0.38;
  sieve.add(sieveTag);
  root.add(sieve);

  const mixSign = kit.label('Trail mix', { size: 0.28, border: '#fbbf24' });
  mixSign.position.set(MIX.x, 2.15, MIX.z);
  root.add(mixSign);

  let sieveBusy = false;
  let sievedOnce = false;
  let moveBusy = false;

  function sieveClose() {
    return Math.hypot(sieve.position.x - BOWL.x, sieve.position.z - BOWL.z) < 0.72;
  }

  function enableSieveDrag() {
    kit.onDrag(sieve, {
      plane: 'xz',
      onMove(p) {
        if (mode !== 'sieve' || moveBusy || sieveBusy) return;
        sieve.position.x = THREE.MathUtils.clamp(p.x, -5.15, -1.9);
        sieve.position.z = THREE.MathUtils.clamp(p.z, -0.3, 2.25);
        sieve.position.y = SIEVE_HOME.y;
        sieveTag.setText(sieveClose() ? 'Now tap Shake!' : 'Drag onto the bowl');
      },
    });
  }

  async function moveSieveHome(ms = 500) {
    await kit.tween(sieve, { 'position.x': SIEVE_HOME.x, 'position.y': SIEVE_HOME.y, 'position.z': SIEVE_HOME.z }, ms, 'inOut');
  }

  async function parkSieveOnBowl() {
    moveBusy = true;
    await kit.tween(sieve, { 'position.x': BOWL.x, 'position.y': SIEVE_HOME.y, 'position.z': BOWL.z }, 550, 'inOut');
    moveBusy = false;
    sieveTag.setText('Now tap Shake!');
  }

  function piecesHome() {
    for (const m of [...bigs, ...smalls]) m.position.copy(m.userData.home);
  }

  async function shakeMix() {
    if (mode !== 'sieve' || sieveBusy || moveBusy) return;
    if (!sieveClose()) {
      kit.sfx('click');
      kit.vespa?.react('think');
      sieveTag.setText('Drag onto the bowl');
      return;
    }
    sieveBusy = true;
    kit.sfx('whoosh');
    await kit.tween(jar, { 'rotation.x': 0.7 }, 380, 'out');
    const jobs = [];
    bigs.forEach((m, i) => {
      const a = (i / bigs.length) * Math.PI * 2;
      jobs.push(kit.tween(m, {
        'position.x': sieve.position.x + Math.cos(a) * 0.28,
        'position.y': sieve.position.y + 0.14,
        'position.z': sieve.position.z + Math.sin(a) * 0.2,
      }, 520, 'in'));
    });
    smalls.forEach((m, i) => {
      const a = (i / smalls.length) * Math.PI * 2;
      jobs.push(kit.tween(m, {
        'position.x': BOWL.x + Math.cos(a) * 0.16,
        'position.y': 0.72,
        'position.z': BOWL.z + Math.sin(a) * 0.16,
      }, 720, 'in'));
    });
    await Promise.all(jobs);
    kit.sfx('tick');
    await kit.tween(jar, { 'rotation.x': 0 }, 360, 'out');
    sieveTag.setText('Big bits stayed!');
    bowlTag.setText('Tiny seeds');
    if (!sievedOnce) {
      sievedOnce = true;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('sieved');
    }
    sieveBusy = false;
  }

  kit.onTap(jar, () => shakeMix());

  // ---------------- magnet + sand ----------------
  const magPad = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.92, 0.12, 24), wood);
  magPad.position.set(DISH.x, 0.06, DISH.z);
  magPad.receiveShadow = true;
  root.add(magPad);
  const dishPan = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.54, 0.14, 28), kit.mat.metal(0x78716c));
  dishPan.position.set(DISH.x, 0.18, DISH.z);
  dishPan.castShadow = true;
  root.add(dishPan);
  const sandBed = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.06, 24), kit.mat.rock('#e7c98a'));
  sandBed.position.set(DISH.x, 0.26, DISH.z);
  root.add(sandBed);
  const sandSign = kit.label('Sand + iron', { size: 0.26, border: '#f59e0b' });
  sandSign.position.set(DISH.x, 1.7, DISH.z);
  root.add(sandSign);

  const ironMat = kit.mat.metal(0xd1d5db);
  const irons = [];
  for (let i = 0; i < 12; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.048, 10, 8), ironMat);
    const a = (i / 12) * Math.PI * 2;
    const rad = 0.1 + (i % 3) * 0.12;
    m.position.set(DISH.x + Math.cos(a) * rad, 0.34, DISH.z + Math.sin(a) * rad);
    m.userData.home = m.position.clone();
    m.castShadow = true;
    root.add(m);
    irons.push({ mesh: m, caught: false, offset: new THREE.Vector3() });
  }

  const magnet = new THREE.Group();
  {
    const red = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.25, roughness: 0.4 });
    const silver = kit.mat.metal(0xf8fafc);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.95), red);
    bar.castShadow = true;
    const tipA = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.18), silver);
    tipA.position.z = 0.5;
    const tipB = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.18), silver);
    tipB.position.z = -0.5;
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 10), wood);
    handle.rotation.x = Math.PI / 2;
    handle.position.z = -0.78;
    const field = kit.particles(40, { size: 0.05, color: 0xff6b8b, spread: 0.45 });
    field.position.z = 0.55;
    magnet.add(bar, tipA, tipB, handle, field);
    magnet.field = field;
    const tag = kit.label('Magnet', { size: 0.2, border: '#f43f5e' });
    tag.position.y = 0.45;
    magnet.add(tag);
    magnet.tag = tag;
  }
  magnet.position.set(DISH.x, 1.35, DISH.z + 1.35);
  root.add(magnet);

  let magnetArmed = false;
  let magnetDone = false;
  let sweepBusy = false;
  let magnetSfx = false;

  function resetIron() {
    magnetDone = false;
    magnetArmed = false;
    magnetSfx = false;
    sweepBusy = false;
    for (const bit of irons) {
      bit.caught = false;
      bit.mesh.position.copy(bit.mesh.userData.home);
    }
    magnet.position.set(DISH.x, 1.35, DISH.z + 1.35);
    magnet.tag.setText('Magnet');
  }

  async function sweepMagnet() {
    if (mode !== 'magnet' || sweepBusy || magnetDone) return;
    sweepBusy = true;
    magnetArmed = true;
    await kit.tween(magnet, { 'position.x': DISH.x - 0.75, 'position.z': DISH.z, 'position.y': 1.12 }, 320);
    await kit.tween(magnet, { 'position.x': DISH.x + 0.75 }, 850, 'linear');
    sweepBusy = false;
  }

  updaters.push((dt, t) => {
    if (magnet.visible) {
      magnet.field.rotation.y += dt * 2;
      magnet.field.material.opacity = 0.45 + Math.sin(t * 6) * 0.25;
    }
    for (const bit of irons) {
      if (bit.caught) bit.mesh.position.copy(magnet.position).add(bit.offset);
    }
    if (mode !== 'magnet' || !magnetArmed || magnetDone) return;
    let n = 0;
    for (const bit of irons) if (bit.caught) n++;
    for (const bit of irons) {
      if (bit.caught) continue;
      const dx = magnet.position.x - bit.mesh.position.x;
      const dz = magnet.position.z - bit.mesh.position.z;
      if (dx * dx + dz * dz < 1.05 * 1.05) {
        bit.caught = true;
        bit.offset.set((Math.random() - 0.5) * 0.2, -0.26 - Math.random() * 0.12, (Math.random() - 0.5) * 0.2);
        n++;
        if (!magnetSfx) {
          magnetSfx = true;
          kit.sfx('magnet');
        }
      }
    }
    if (n >= irons.length) {
      magnetDone = true;
      magnetArmed = false;
      magnet.tag.setText('Iron stuck!');
      sandSign.setText('Sand stayed');
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('magnetSorted');
    }
  });

  // ---------------- sun dish for evaporation ----------------
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), kit.mat.glow(0xfbbf24, 0.7));
  sun.position.set(EVAP.x + 0.15, 3.35, EVAP.z - 0.4);
  root.add(sun);
  let sunHot = false;
  updaters.push((dt, t) => {
    const pulse = sunHot ? 1.8 : 0.55;
    sun.material.emissiveIntensity = pulse + Math.sin(t * 3) * 0.25;
    const s = sunHot ? 1.2 : 0.85;
    sun.scale.setScalar(s + Math.sin(t * 2) * 0.04);
  });

  const evap = new THREE.Group();
  evap.position.set(EVAP.x, 0.02, EVAP.z);
  const evapBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 28), kit.mat.glass());
  evapBase.position.y = 0.03;
  const evapWall = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.04, 8, 28), kit.mat.metal(0xcbd5e1));
  evapWall.rotation.x = Math.PI / 2;
  evapWall.position.y = 0.08;
  const evapWater = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.07, 24), kit.mat.water(0x7dd3fc));
  evapWater.position.y = 0.08;
  evapWater.visible = false;
  const crystalMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, emissive: 0xe2e8f0, emissiveIntensity: 0.3 });
  const crystals = new THREE.Group();
  crystals.position.y = 0.06;
  for (let i = 0; i < 8; i++) {
    const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.055 + (i % 3) * 0.02, 0), crystalMat);
    const a = (i / 8) * Math.PI * 2;
    c.position.set(Math.cos(a) * (0.08 + (i % 2) * 0.1), 0.05, Math.sin(a) * (0.08 + (i % 2) * 0.1));
    c.rotation.set(i, i * 0.7, i * 0.3);
    crystals.add(c);
  }
  crystals.scale.setScalar(0.01);
  evap.add(evapBase, evapWall, evapWater, crystals);
  root.add(evap);
  const evapTag = kit.label('Sun dish', { size: 0.24, border: '#fbbf24' });
  evapTag.position.set(EVAP.x, 0.85, EVAP.z);
  root.add(evapTag);

  // ---------------- three snack cups ----------------
  const counter = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.16, 0.9), kit.mat.wood('#9a3412'));
  counter.position.set(0.2, 0.28, CUP_Z);
  counter.castShadow = counter.receiveShadow = true;
  root.add(counter);
  const counterLegL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.7), woodDark);
  counterLegL.position.set(-1.5, 0.11, CUP_Z);
  const counterLegR = counterLegL.clone();
  counterLegR.position.x = 1.9;
  root.add(counterLegL, counterLegR);
  const standSign = kit.label('Snack stand', { size: 0.26, border: '#fb7185' });
  standSign.position.set(0.2, 1.7, CUP_Z);
  root.add(standSign);

  function makeCup(x, title) {
    const g = new THREE.Group();
    g.position.set(x, 0.36, CUP_Z);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.62, 20, 1, true), kit.mat.glass());
    glass.position.y = 0.32;
    const bottom = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 20), kit.mat.glass());
    bottom.position.y = 0.03;
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.36, 20), kit.mat.water(0x38bdf8));
    w.position.y = 0.24;
    w.material.opacity = 0.5;
    const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.02, 6, 20), kit.mat.glow(0xbae6fd, 0.3));
    cupRim.rotation.x = Math.PI / 2;
    cupRim.position.y = 0.63;
    g.add(glass, bottom, w, cupRim);
    root.add(g);
    const tag = kit.label(title, { size: 0.2 });
    tag.position.set(x, 1.25, CUP_Z);
    root.add(tag);
    return { g, water: w, tag };
  }
  const cupOil = makeCup(CUP_X[0], 'Oil test');
  const cupColor = makeCup(CUP_X[1], 'Color test');
  const cupSand = makeCup(CUP_X[2], 'Sand test');

  const oil = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.14, 18), kit.mat.water(0xfbbf24));
  oil.material.opacity = 0.82;
  oil.material.color.set(0xfbbf24);
  oil.visible = false;
  oil.position.y = 0.5;
  cupOil.g.add(oil);

  const sandPile = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.12, 12), kit.mat.rock('#d6b07a'));
  sandPile.position.y = 0.12;
  sandPile.visible = false;
  cupSand.g.add(sandPile);

  // ---------------- look inside: water bits and salt bits ----------------
  const zoom = new THREE.Group();
  zoom.position.set(LAB.x, 1.82, LAB.z);
  zoom.visible = false;
  const zoomBack = new THREE.Mesh(
    new THREE.CircleGeometry(1.05, 40),
    new THREE.MeshBasicMaterial({ color: 0x07111f, transparent: true, opacity: 0.92 })
  );
  zoom.add(zoomBack);
  const zoomRim = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.12, 40), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  zoom.add(zoomRim);
  const wMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0369a1, emissiveIntensity: 0.45, roughness: 0.35 });
  const sMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, emissiveIntensity: 0.35, roughness: 0.4 });
  const waterDots = [];
  const saltDots = [];
  for (let ix = -1; ix <= 1; ix++) {
    for (let iy = -1; iy <= 1; iy++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), wMat);
      d.position.set(ix * 0.4, iy * 0.4, 0.06);
      d.userData.home = d.position.clone();
      zoom.add(d);
      waterDots.push(d);
    }
  }
  const gaps = [[-0.2, 0], [0.2, 0], [0, 0.2], [0, -0.2], [-0.2, 0.2], [0.2, -0.2], [0.2, 0.2], [-0.2, -0.2]];
  for (const [x, y] of gaps) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), sMat);
    d.position.set(x, y, 0.1);
    d.userData.home = d.position.clone();
    zoom.add(d);
    saltDots.push(d);
  }
  const waterLab = kit.label('Water', { size: 0.24, color: '#7dd3fc', border: '#38bdf8' });
  waterLab.position.set(-0.55, -1.28, 0);
  const saltLab = kit.label('Salt', { size: 0.24, color: '#ffffff', border: '#e2e8f0' });
  saltLab.position.set(0.55, -1.28, 0);
  zoom.add(waterLab, saltLab);
  zoom.scale.setScalar(0.08);
  root.add(zoom);

  let lookArmed = false;
  let lookDone = false;
  let lookSliderEl = null;

  function applyZoom(v) {
    zoom.scale.setScalar(0.08 + v * 1.12);
    if (lookArmed && v >= 0.92 && !lookDone) {
      lookDone = true;
      lookArmed = false;
      kit.sfx('sparkle');
      kit.vespa?.react('wow');
      kit.emit('lookedIn');
    }
  }

  updaters.push((dt, t) => {
    if (!zoom.visible) return;
    zoom.quaternion.copy(kit.stage.camera.quaternion);
    for (let i = 0; i < waterDots.length; i++) {
      const d = waterDots[i];
      const h = d.userData.home;
      d.position.set(h.x + Math.sin(t * 2 + i) * 0.012, h.y + Math.cos(t * 2.1 + i) * 0.012, h.z);
    }
    for (let i = 0; i < saltDots.length; i++) {
      const d = saltDots[i];
      const h = d.userData.home;
      d.position.set(h.x + Math.sin(t * 2.5 + i) * 0.016, h.y + Math.cos(t * 1.8 + i) * 0.016, h.z);
    }
  });

  // ---------------- flood bucket (hidden until the last step) ----------------
  const flood = new THREE.Group();
  flood.position.set(FLOOD.x, 0, FLOOD.z);
  flood.visible = false;
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.46, 0.7, 24, 1, true), kit.mat.plastic(0x1e3a5f));
  bucket.position.y = 0.4;
  const bucketBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.06, 24), kit.mat.plastic(0x172554));
  bucketBottom.position.y = 0.06;
  const mud = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.4, 0.34, 24), kit.mat.water(0x8a5a2b));
  mud.position.y = 0.32;
  mud.material.opacity = 0.55;
  const floodSand = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.1, 20), kit.mat.rock('#e7c98a'));
  floodSand.position.y = 0.16;
  const leaves = [];
  for (let i = 0; i < 4; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), kit.mat.plastic(i % 2 ? 0x65a30d : 0xa16207));
    leaf.scale.set(1.7, 0.28, 0.95);
    leaf.position.set(Math.cos(i * 1.5) * 0.18, 0.52, Math.sin(i * 1.5) * 0.16);
    leaf.userData.base = leaf.position.clone();
    flood.add(leaf);
    leaves.push(leaf);
  }
  const floodTag = kit.label('Flood water', { size: 0.26, border: '#a16207' });
  floodTag.position.y = 1.15;
  flood.add(bucket, bucketBottom, mud, floodSand, floodTag);
  root.add(flood);
  updaters.push((dt, t) => {
    if (!flood.visible) return;
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      const b = leaf.userData.base;
      leaf.position.y = b.y + Math.sin(t * 2 + i) * 0.02;
      leaf.rotation.z = Math.sin(t * 1.3 + i) * 0.2;
    }
  });

  // ---------------- cues ----------------
  const cues = {
    dropSalt() {
      glassTag.setText('Salt in water');
      return dropSaltIn();
    },
    stirFade() {
      return dissolveLook().then(() => glassTag.setText('Looks clear'));
    },
    async resetMix() {
      mode = 'idle';
      kit.offDrag(sieve);
      sieveBusy = false;
      sievedOnce = false;
      jar.rotation.x = 0;
      piecesHome();
      sieveTag.setText('Screen');
      bowlTag.setText('Bowl');
      await moveSieveHome(420);
    },
    async showMix() {
      kit.sfx('pop');
      const y = jar.position.y;
      await kit.tween(jar, { 'position.y': y + 0.12 }, 180, 'out');
      await kit.tween(jar, { 'position.y': y }, 280, 'back');
    },
    sieveMode() {
      mode = 'sieve';
      enableSieveDrag();
      kit.ui.clear();
      kit.ui.buttons([
        { label: 'Move screen', emoji: '🪟', onClick: () => parkSieveOnBowl() },
        { label: 'Shake', emoji: '🥤', onClick: () => shakeMix() },
      ]);
      sieveTag.setText(sieveClose() ? 'Now tap Shake!' : 'Drag onto the bowl');
    },
    idle() {
      mode = 'idle';
      kit.offDrag(sieve);
      kit.offDrag(magnet);
      kit.ui.clear();
    },
    async showSand() {
      resetIron();
      magnet.visible = true;
      sandSign.setText('Sand + iron');
      kit.sfx('pop');
      await kit.wait(200);
    },
    magnetMode() {
      mode = 'magnet';
      magnet.visible = true;
      magnetArmed = true;
      magnetDone = false;
      kit.onDrag(magnet, {
        plane: 'xz',
        onMove(p) {
          if (mode !== 'magnet' || sweepBusy) return;
          magnet.position.x = THREE.MathUtils.clamp(p.x, 3.1, 5.35);
          magnet.position.z = THREE.MathUtils.clamp(p.z, -1.2, 1.55);
          magnet.position.y = 1.12;
        },
      });
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Sweep', emoji: '🧲', onClick: () => sweepMagnet() }]);
      magnet.tag.setText('Drag me!');
    },
    parkMagnet() {
      mode = 'idle';
      magnetArmed = false;
      kit.offDrag(magnet);
      kit.ui.clear();
      magnet.position.y = 1.5;
    },
    showSaltWater() {
      grains.visible = false;
      resetGrainPos();
      glassTag.setText('Salt water');
      kit.sfx('bubble');
    },
    lookSlider() {
      zoom.visible = true;
      lookDone = false;
      lookArmed = false;
      kit.ui.clear();
      lookSliderEl = kit.ui.slider({
        label: '🔍 Look inside',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        onChange: applyZoom,
      });
      applyZoom(0);
    },
    armLook() {
      lookArmed = false;
      lookDone = false;
      lookSliderEl?.setValue(0);
      applyZoom(0);
      lookArmed = true;
    },
    hideLook() {
      lookArmed = false;
      zoom.visible = false;
      kit.ui.clear();
    },
    scaleReady() {
      mode = 'scale';
      dissolveArmed = false;
      poured = false;
      pourBusy = false;
      stirBusy = false;
      grains.visible = false;
      resetGrainPos();
      readout.visible = true;
      massToken++;
      massShown = 0;
      readout.setText('0 g');
      kit.ui.clear();
      trayRead = kit.ui.readout('Scale');
      trayRead.set('0 g');
      glassTag.setText('Glass of water');
      shakerTag.setText('Salt');
      kit.sfx('click');
    },
    showWaterMass() {
      return animateMass(200);
    },
    async addSaltGrains() {
      await dropSaltIn();
      await animateMass(220);
      glassTag.setText('Salt still shows');
    },
    async dissolveDemo() {
      await dissolveLook();
      massShown = 220;
      setMassText(220);
      glassTag.setText('Still 220 g');
      kit.sfx('tick');
    },
    async armDissolve() {
      dissolveArmed = false;
      poured = false;
      pourBusy = false;
      stirBusy = false;
      grains.visible = false;
      resetGrainPos();
      shaker.position.copy(shakerHome);
      shaker.rotation.z = 0;
      shakerTag.setText('Salt');
      glassTag.setText('Your turn');
      await animateMass(200);
      kit.ui.clear();
      trayRead = kit.ui.readout('Scale');
      trayRead.set('200 g');
      kit.ui.buttons([
        { label: 'Pour salt', emoji: '🧂', onClick: () => pourSalt() },
        { label: 'Stir', emoji: '🥄', onClick: () => stirSalt() },
      ]);
      dissolveArmed = true;
    },
    pourDish() {
      evapWater.visible = true;
      evapWater.scale.y = 1;
      evapWater.position.y = 0.08;
      crystals.scale.setScalar(0.01);
      sunHot = false;
      evapTag.setText('Salt water');
      kit.sfx('splash');
    },
    async evaporate() {
      sunHot = true;
      kit.sfx('wind');
      const steam = kit.particles(36, { size: 0.08, color: 0xdbeafe, spread: 0.2 });
      steam.position.set(EVAP.x, 0.35, EVAP.z);
      root.add(steam);
      const drift = [];
      for (let i = 0; i < 36; i++) drift.push({ x: (Math.random() - 0.5) * 0.35, z: (Math.random() - 0.5) * 0.35 });
      const steamJob = kit.animate(1500, (k) => {
        for (let i = 0; i < 36; i++) {
          steam.positions[i * 3] = drift[i].x * k;
          steam.positions[i * 3 + 1] = k * 1.55;
          steam.positions[i * 3 + 2] = drift[i].z * k;
        }
        steam.commit();
        steam.material.opacity = 0.85 * (1 - k);
      });
      const waterJob = kit.animate(1500, (k) => {
        const s = 1 - k * 0.96;
        evapWater.scale.y = Math.max(0.02, s);
        evapWater.position.y = 0.05 + 0.03 * s;
      }, 'in');
      const crystalJob = kit.tween(crystals, { 'scale.x': 1, 'scale.y': 1, 'scale.z': 1 }, 1400, 'out');
      await Promise.all([steamJob, waterJob, crystalJob]);
      root.remove(steam);
      steam.geometry.dispose();
      steam.material.dispose();
      evapTag.setText('Salt crystals!');
      kit.sfx('chime');
    },
    showCups() {
      oil.visible = false;
      oil.scale.y = 0.05;
      oil.position.y = 0.48;
      sandPile.visible = false;
      sandPile.scale.setScalar(0.01);
      cupColor.water.material.color.set(0x38bdf8);
      cupOil.tag.setText('Oil test');
      cupColor.tag.setText('Color test');
      cupSand.tag.setText('Sand test');
      kit.sfx('pop');
    },
    async pourOil() {
      oil.visible = true;
      oil.scale.y = 0.05;
      oil.position.y = 0.48;
      kit.sfx('splash');
      await kit.animate(700, (k) => {
        oil.scale.y = 0.05 + k * 0.95;
        oil.position.y = 0.46 + 0.08 * oil.scale.y;
      }, 'out');
      cupOil.tag.setText('Oil on top');
    },
    async dropColor() {
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), kit.mat.plastic(0xef4444));
      drop.position.set(CUP_X[1], 1.55, CUP_Z);
      root.add(drop);
      await kit.tween(drop, { 'position.y': 1.05 }, 380, 'in');
      kit.sfx('splash');
      root.remove(drop);
      drop.geometry.dispose();
      drop.material.dispose();
      const start = cupColor.water.material.color.clone();
      const end = new THREE.Color(0xef4444);
      await kit.animate(700, (k) => {
        cupColor.water.material.color.copy(start).lerp(end, k);
      });
      cupColor.tag.setText('Color mixed in');
    },
    async dropSand() {
      sandPile.visible = true;
      sandPile.scale.setScalar(0.04);
      kit.sfx('thud');
      await kit.tween(sandPile, { 'scale.x': 1, 'scale.y': 1, 'scale.z': 1 }, 480, 'back');
      cupSand.tag.setText('Sand stayed');
    },
    showFlood() {
      flood.visible = true;
      kit.sfx('rain');
      kit.vespa?.react('think');
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0.1, 5.3, 10.5], look: [0.0, 0.95, 0.15] },
      picnic: { pos: [-0.7, 2.65, 4.55], look: [0.15, 1.2, 0.35] },
      beaker: { pos: [0.15, 2.05, 3.4], look: [0.15, 1.3, 0.32] },
      mix: { pos: [-2.55, 2.75, 4.25], look: [-4.2, 1.1, 0.85] },
      magnet: { pos: [2.85, 2.65, 3.85], look: [4.25, 0.75, 0.1] },
      scale: { pos: [1.45, 2.35, 3.75], look: [0.15, 1.15, 0.32] },
      zoom: { pos: [0.15, 2.15, 3.55], look: [0.15, 1.85, 0.32] },
      dish: { pos: [2.35, 2.25, 4.35], look: [2.6, 0.5, 1.82] },
      bottles: { pos: [0.2, 3.35, 1.35], look: [0.2, 0.85, -2.72] },
      flood: { pos: [-2.15, 2.75, 0.15], look: [-4.35, 0.7, -2.55] },
    },
    points: {
      shaker: [1.55, 1.4, 0.95],
      glass: [0.15, 1.55, 1.05],
      trail: [-4.35, 1.45, 1.25],
      sand: [4.25, 1.1, 0.95],
      zoom: [0.15, 2.05, 1.15],
      scale: [0.15, 1.3, 1.15],
      evap: [2.6, 0.95, 2.4],
      cups: [0.2, 1.3, -1.85],
      flood: [-4.35, 1.15, -1.65],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
