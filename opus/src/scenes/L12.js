// Lesson 12 scene: West Texas desert, Dickinson pond, and a dog family.
// Desert: ribbed cactus (opens to show stored water), thin leaf, mesquite dig window.
// Pond: lily pads with air pockets, cattails, marsh grass.
// Dogs: drag or tap trait cards onto Inherited and Acquired mats.

const SAND = { x: -3.85, z: 0.4 };
const POND = { x: 3.75, z: 0.4 };
const WIN = { x: -2.95, z: -0.75 };
const DOG_Y = 0.32;
const MOM_HOME = { x: -0.55, z: -2.4 };
const PUP_HOME = { x: 0.72, z: -2.28 };

const claim = (it) => (it.seq = (it.seq || 0) + 1);
const glide = (it, s, ms, fn, ease) => kitAnimate(it, s, ms, fn, ease);

let kitAnimate = () => Promise.resolve(false);

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  let mode = 'idle';

  kitAnimate = (it, s, ms, fn, ease) => kit.animate(ms, (k) => it.seq === s && fn(k), ease).then(() => it.seq === s);

  const sandMat = new THREE.MeshStandardMaterial({ color: 0xe3c48a, roughness: 0.96 });
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.92 });
  const rootMat = new THREE.MeshStandardMaterial({ color: 0x8a5a32, roughness: 0.8 });
  const cactusMat = new THREE.MeshStandardMaterial({ color: 0x3d8c3a, roughness: 0.42, emissive: 0x14330f, emissiveIntensity: 0.15 });
  const waxMat = new THREE.MeshStandardMaterial({ color: 0xb6e07a, roughness: 0.22, emissive: 0x365314, emissiveIntensity: 0.2 });
  const waterStoreMat = new THREE.MeshPhysicalMaterial({ color: 0x5eead4, roughness: 0.18, transmission: 0.55, thickness: 0.35, transparent: true, opacity: 0.85 });
  const spineMat = new THREE.MeshStandardMaterial({ color: 0xf6f1e4, roughness: 0.45 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.45, emissive: 0x65a30d, emissiveIntensity: 0.12 });
  const woodMat = kit.mat.wood('#7c4a24');
  const furMat = new THREE.MeshStandardMaterial({ color: 0x8d5a2b, roughness: 0.72 });
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0xd4b483, roughness: 0.7 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.4 });
  const scarMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.45, emissive: 0x7f1d1d, emissiveIntensity: 0.3 });
  const padMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.55, emissive: 0x14532d, emissiveIntensity: 0.08 });
  const cardMatA = new THREE.MeshStandardMaterial({ color: 0xfff7ed, roughness: 0.4, emissive: 0xf59e0b, emissiveIntensity: 0 });
  const cardColors = [0xfff7ed, 0xf0f9ff, 0xfdf2f8, 0xf7fee7];

  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.28, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }

  // =====================================================================
  // DESERT
  // =====================================================================
  const sand = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.7, 0.16, 28), sandMat);
  sand.position.set(SAND.x, 0.08, SAND.z);
  sand.receiveShadow = true;
  root.add(sand);
  sign('West Texas', SAND.x, 3.15, SAND.z, { color: '#fde68a', border: '#f59e0b' });

  const CACTUS = { x: SAND.x - 0.35, z: SAND.z + 0.15 };
  const cactusG = new THREE.Group();
  cactusG.position.set(CACTUS.x, 0.16, CACTUS.z);
  root.add(cactusG);

  const greenCore = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 1.18, 12), cactusMat);
  greenCore.position.y = 0.72;
  greenCore.castShadow = true;
  cactusG.add(greenCore);

  const waterCore = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.95, 12), waterStoreMat);
  waterCore.position.y = 0.7;
  waterCore.visible = false;
  cactusG.add(waterCore);

  const leftGrp = new THREE.Group();
  const rightGrp = new THREE.Group();
  cactusG.add(leftGrp, rightGrp);
  for (let i = 0; i < 8; i++) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.16, 0.22), i % 2 ? waxMat : cactusMat);
    const a = (i / 8) * Math.PI * 2;
    rib.position.set(Math.cos(a) * 0.32, 0.72, Math.sin(a) * 0.32);
    rib.rotation.y = -a;
    rib.castShadow = true;
    const spine = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.16, 5), spineMat);
    spine.position.set(0.12, 0.28, 0);
    spine.rotation.z = -Math.PI / 2;
    const spine2 = spine.clone();
    spine2.position.y = -0.22;
    rib.add(spine, spine2);
    (Math.cos(a) < 0 ? leftGrp : rightGrp).add(rib);
  }
  const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4, emissive: 0xbe185d, emissiveIntensity: 0.25 }));
  bloom.position.y = 1.38;
  cactusG.add(bloom);

  const cut = { seq: 0 };
  let cutAmt = 0;
  let cutSlider = null;
  const waxTag = kit.label('Waxy coat', { size: 0.22, color: '#d9f99d', border: '#84cc16' });
  waxTag.position.set(CACTUS.x - 0.55, 1.7, CACTUS.z);
  waxTag.visible = false;
  root.add(waxTag);
  const waterTag = kit.label('Stored water', { size: 0.22, color: '#99f6e4', border: '#2dd4bf' });
  waterTag.position.set(CACTUS.x + 0.15, 1.15, CACTUS.z + 0.2);
  waterTag.visible = false;
  root.add(waterTag);
  const cactusTag = sign('Waxy cactus', CACTUS.x, 2.15, CACTUS.z);

  function layoutCut(k) {
    cutAmt = Math.max(0, Math.min(1, k));
    leftGrp.position.x = -0.34 * cutAmt;
    rightGrp.position.x = 0.34 * cutAmt;
    greenCore.visible = cutAmt < 0.45;
    waterCore.visible = cutAmt > 0.28;
    const sc = 0.35 + 0.65 * Math.min(1, Math.max(0, (cutAmt - 0.28) / 0.72));
    waterCore.scale.setScalar(sc);
    waxTag.visible = cutAmt > 0.55;
    waterTag.visible = cutAmt > 0.55;
    if (cutSlider) cutSlider.setValue(String(cutAmt));
  }
  async function setCut(target, ms) {
    const s = claim(cut);
    const from = cutAmt;
    return glide(cut, s, ms, (t) => layoutCut(from + (target - from) * t), 'inOut');
  }
  layoutCut(0);

  // thin leaf
  const LEAF = { x: SAND.x + 0.85, z: SAND.z + 0.72 };
  const leafG = new THREE.Group();
  leafG.position.set(LEAF.x, 0.16, LEAF.z);
  root.add(leafG);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.7, 8), woodMat);
  stem.position.y = 0.35;
  leafG.add(stem);
  const leafMeshes = [];
  for (let i = 0; i < 4; i++) {
    const lf = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), leafMat);
    lf.scale.set(1.5, 0.28, 0.9);
    const a = (i / 4) * Math.PI * 2;
    lf.position.set(Math.cos(a) * 0.16, 0.55 + (i % 2) * 0.16, Math.sin(a) * 0.12);
    lf.rotation.z = Math.cos(a) * 0.4;
    leafG.add(lf);
    leafMeshes.push(lf);
  }
  const leafTag = sign('Thin leaf', LEAF.x, 1.55, LEAF.z, { color: '#bbf7d0', border: '#4ade80' });

  // sun + water drops
  const sunM = { seq: 0, mesh: new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 14), kit.mat.glow(0xfbbf24, 0.8)) };
  sunM.mesh.position.set(SAND.x, 3.25, SAND.z - 1.35);
  root.add(sunM.mesh);
  kit.onTap(sunM.mesh, () => { if (mode === 'sun') onHotSun(); });

  const leafN = 22;
  const cacN = 8;
  const leafSeed = [];
  const cacSeed = [];
  for (let i = 0; i < leafN; i++) leafSeed.push({ a: Math.random() * Math.PI * 2, sp: 0.35 + Math.random() * 0.85 });
  for (let i = 0; i < cacN; i++) cacSeed.push({ a: Math.random() * Math.PI * 2, sp: 0.15 + Math.random() * 0.25 });
  const leafPts = kit.particles(leafN, { size: 0.13, color: 0x7dd3fc, spread: 0.05 });
  leafPts.position.set(LEAF.x, 0.85, LEAF.z);
  root.add(leafPts);
  const cacPts = kit.particles(cacN, { size: 0.1, color: 0x99f6e4, spread: 0.05 });
  cacPts.position.set(CACTUS.x, 1.15, CACTUS.z);
  root.add(cacPts);

  const spray = { seq: 0 };
  let sunHot = false;
  let sunArmed = false;
  let sunDone = false;
  let sunRun = 0;
  let waterRead = null;

  function layoutSpray(k) {
    for (let i = 0; i < leafN; i++) {
      const s = leafSeed[i];
      leafPts.positions[i * 3] = Math.cos(s.a) * k * (0.2 + s.sp * 0.45);
      leafPts.positions[i * 3 + 1] = k * (0.35 + s.sp);
      leafPts.positions[i * 3 + 2] = Math.sin(s.a) * k * (0.15 + s.sp * 0.3);
    }
    leafPts.commit();
    leafPts.material.opacity = k < 0.04 ? 0 : Math.max(0, 1 - Math.max(0, k - 0.62) * 2.2);
    for (let i = 0; i < cacN; i++) {
      const s = cacSeed[i];
      const d = k * 0.18;
      cacPts.positions[i * 3] = Math.cos(s.a) * d;
      cacPts.positions[i * 3 + 1] = d * s.sp;
      cacPts.positions[i * 3 + 2] = Math.sin(s.a) * d;
    }
    cacPts.commit();
    cacPts.material.opacity = k < 0.04 ? 0 : 0.45 * (1 - k * 0.3);
    if (k > 0.45) {
      leafTag.setText('Water flying off!');
      cactusTag.setText('Water stays in');
    } else if (k < 0.05) {
      leafTag.setText('Thin leaf');
      cactusTag.setText('Waxy cactus');
    }
    if (waterRead) waterRead.set(k > 0.72 ? 'Thin leaf lost more' : k > 0.05 ? 'Watch the drops' : 'Press Hot Sun');
  }
  function resetSpray() {
    claim(spray);
    sunHot = false;
    layoutSpray(0);
    claim(sunM);
    sunM.mesh.scale.setScalar(1);
    sunM.mesh.material.emissiveIntensity = 0.8;
  }
  function kickSun() {
    const s = claim(sunM);
    glide(sunM, s, 500, (k) => sunM.mesh.scale.setScalar(1 + 0.35 * k), 'out');
  }
  async function playSun() {
    const s = claim(spray);
    sunHot = true;
    kickSun();
    kit.sfx('wind');
    const ok = await glide(spray, s, 2000, (k) => layoutSpray(k));
    if (!ok) return false;
    if (spray.seq === s) sunHot = false;
    return true;
  }
  async function onHotSun() {
    const my = ++sunRun;
    const armedAtStart = sunArmed && mode === 'sun';
    const ok = await playSun();
    if (!ok || my !== sunRun) return;
    if (armedAtStart && !sunDone) {
      sunDone = true;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('sunTest');
    }
  }
  layoutSpray(0);

  const leafPulse = { seq: 0 };
  function leafFood() {
    const s = claim(leafPulse);
    return glide(leafPulse, s, 1400, (k) => {
      leafMat.emissiveIntensity = 0.12 + Math.sin(k * Math.PI * 3) * 0.7;
    });
  }

  // mesquite + dig window
  const tree = new THREE.Group();
  tree.position.set(SAND.x - 0.45, 0.16, SAND.z - 1.05);
  root.add(tree);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 1.05, 8), woodMat);
  trunk.position.y = 0.52;
  trunk.castShadow = true;
  tree.add(trunk);
  const branchSpecs = [[0.35, 0.95, 0.1, 0.5], [-0.32, 0.88, -0.08, -0.6], [0.08, 1.05, -0.28, 0.2]];
  for (const [x, y, z, rot] of branchSpecs) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.55, 6), woodMat);
    b.position.set(x * 0.45, y, z);
    b.rotation.z = rot;
    tree.add(b);
    const clump = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), cactusMat);
    clump.position.set(x * 0.85, y + 0.12, z * 1.4);
    clump.scale.set(1.2, 0.7, 1);
    tree.add(clump);
  }
  sign('Mesquite', tree.position.x, 2.35, tree.position.z);

  const board = new THREE.Group();
  board.position.set(WIN.x, 0, WIN.z);
  root.add(board);
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.9, 0.12), soilMat);
  back.position.set(0, 1.2, 0);
  back.castShadow = true;
  board.add(back);
  const surface = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.08, 0.16), sandMat);
  surface.position.set(0, 1.95, 0.04);
  board.add(surface);
  sign('Cactus', WIN.x - 0.38, 2.35, WIN.z, { size: 0.22 });
  sign('Mesquite', WIN.x + 0.38, 2.35, WIN.z, { size: 0.22 });

  const wideGrp = new THREE.Group();
  board.add(wideGrp);
  for (let i = 0; i < 5; i++) {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.018, 0.5, 6), rootMat);
    r.rotation.z = Math.PI / 2;
    r.rotation.y = (i - 2) * 0.32;
    r.position.set(-0.34, 1.7, 0.08);
    wideGrp.add(r);
  }
  const tapGeo = new THREE.CylinderGeometry(0.03, 0.045, 1, 8);
  tapGeo.translate(0, -0.5, 0);
  const taproot = new THREE.Mesh(tapGeo, rootMat);
  taproot.position.set(0.38, 1.78, 0.08);
  board.add(taproot);
  const sideRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.36, 6), rootMat);
  sideRoot.rotation.z = Math.PI / 2.4;
  sideRoot.position.set(0.5, 1.55, 0.08);
  board.add(sideRoot);

  const cover = new THREE.Mesh(new THREE.BoxGeometry(1.38, 1.55, 0.14), sandMat);
  cover.position.set(0, 1.15, 0.12);
  board.add(cover);
  const depthTag = sign('Sand', WIN.x, 0.42, WIN.z + 0.15, { size: 0.24, color: '#fde68a', border: '#d97706' });

  const dig = { seq: 0 };
  let digAmt = 0;
  let digSlider = null;
  let rootsArmed = false;
  let rootsDone = false;

  function layoutDig(open) {
    digAmt = Math.max(0, Math.min(1, open));
    const shallow = Math.min(1, digAmt / 0.38);
    wideGrp.visible = digAmt > 0.06;
    wideGrp.scale.setScalar(0.35 + 0.65 * shallow);
    taproot.scale.y = 0.08 + digAmt * 1.45;
    sideRoot.visible = digAmt > 0.22;
    cover.position.y = 1.15 - digAmt * 1.45;
    cover.visible = digAmt < 0.98;
    if (digAmt > 0.9) depthTag.setText('Deepest: mesquite!');
    else if (digAmt > 0.32) depthTag.setText('Keep digging');
    else depthTag.setText('Shallow roots');
    if (digSlider) digSlider.setValue(String(digAmt));
    if (rootsArmed && !rootsDone && digAmt >= 0.97) {
      rootsDone = true;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('rootsFound');
    }
  }
  async function setDig(target, ms) {
    const s = claim(dig);
    const from = digAmt;
    return glide(dig, s, ms, (t) => layoutDig(from + (target - from) * t), 'inOut');
  }
  layoutDig(0);

  // =====================================================================
  // POND
  // =====================================================================
  const pond = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.32, 0.12, 28), kit.mat.water(0x0e7490));
  pond.position.set(POND.x, 0.1, POND.z);
  root.add(pond);
  const mud = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.6, 0.08, 24), new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.95 }));
  mud.position.set(POND.x, 0.04, POND.z);
  root.add(mud);
  sign('Dickinson pond', POND.x, 2.7, POND.z, { color: '#a5f3fc', border: '#22d3ee' });

  const pads = [];
  const padSpecs = [[0.05, 0.12, 0.32], [-0.42, -0.18, 0.24], [0.38, -0.28, 0.2]];
  for (let i = 0; i < padSpecs.length; i++) {
    const [x, z, rad] = padSpecs[i];
    const pad = new THREE.Mesh(new THREE.CircleGeometry(rad, 18), padMat);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(POND.x + x, 0.2, POND.z + z);
    pad.userData.base = 0.2;
    pad.userData.ph = i * 1.3;
    root.add(pad);
    pads.push(pad);
  }
  const flower = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.4, emissive: 0xdb2777, emissiveIntensity: 0.2 }));
  flower.position.set(0, 0.08, 0);
  pads[0].add(flower);
  const bubbles = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.035 + (i % 2) * 0.015, 8, 6), kit.mat.glass(0xe0f2fe));
    const a = (i / 5) * Math.PI * 2;
    b.position.set(Math.cos(a) * 0.12, -0.08, Math.sin(a) * 0.12);
    bubbles.add(b);
  }
  bubbles.visible = false;
  pads[0].add(bubbles);
  sign('Water lily', POND.x + 0.05, 1.15, POND.z + 0.15, { size: 0.24, color: '#bbf7d0', border: '#4ade80' });

  const cattails = [];
  const catSpots = [[1.05, 0.15], [1.2, -0.25], [0.85, -0.45]];
  for (let i = 0; i < catSpots.length; i++) {
    const g = new THREE.Group();
    g.position.set(POND.x + catSpots[i][0], 0.12, POND.z + catSpots[i][1]);
    g.userData.ph = i;
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.95, 6), new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.6 }));
    st.position.y = 0.48;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.26, 8), new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 }));
    head.position.y = 0.95;
    g.add(st, head);
    root.add(g);
    cattails.push(g);
  }
  sign('Cattails', POND.x + 1.05, 1.7, POND.z, { size: 0.22 });
  for (let i = 0; i < 7; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55 + (i % 3) * 0.12, 0.02), new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.7 }));
    const a = -0.8 + i * 0.28;
    blade.position.set(POND.x + Math.cos(a) * 1.4, 0.32, POND.z + Math.sin(a) * 1.15);
    blade.rotation.z = (i % 2 ? 0.15 : -0.12);
    root.add(blade);
  }

  const lilyAnim = { seq: 0, lift: 0 };
  async function lilyFloat() {
    bubbles.visible = true;
    const s = claim(lilyAnim);
    kit.sfx('bubble');
    const ok = await glide(lilyAnim, s, 900, (k) => {
      lilyAnim.lift = Math.sin(k * Math.PI) * 0.14;
    });
    if (!ok) return;
    lilyAnim.lift = 0.05;
  }

  // =====================================================================
  // DOGS + TRAIT CARDS
  // =====================================================================
  const rug = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 1.3), new THREE.MeshStandardMaterial({ color: 0x44403c, roughness: 0.8 }));
  rug.position.set(0.05, 0.06, -2.35);
  rug.receiveShadow = true;
  root.add(rug);
  sign('Dog family', 0.05, 2.15, -2.35, { color: '#fed7aa', border: '#f97316' });

  function makeDog(withScar) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), furMat);
    body.scale.set(1.25, 0.82, 0.78);
    body.position.set(0, 0.42, 0);
    body.castShadow = true;
    g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 12), furMat);
    head.position.set(0, 0.64, 0.28);
    g.add(head);
    const snout = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), bellyMat);
    snout.scale.set(1, 0.75, 1.25);
    snout.position.set(0, 0.56, 0.44);
    g.add(snout);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), darkMat);
    nose.position.set(0, 0.58, 0.52);
    g.add(nose);
    for (const sx of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 6), darkMat);
      eye.position.set(sx * 0.08, 0.7, 0.42);
      g.add(eye);
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), furMat);
      ear.scale.set(0.55, 1.35, 0.35);
      ear.position.set(sx * 0.16, 0.72, 0.22);
      ear.rotation.z = sx * 0.9;
      g.add(ear);
      if (withScar && sx < 0) {
        const scar = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), scarMat);
        scar.scale.set(1, 0.7, 0.4);
        scar.position.set(-0.2, 0.62, 0.28);
        g.add(scar);
      }
    }
    for (const [x, z] of [[-0.16, 0.12], [0.16, 0.12], [-0.16, -0.12], [0.16, -0.12]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.28, 8), furMat);
      leg.position.set(x, 0.14, z);
      g.add(leg);
    }
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.28, 6), furMat);
    tail.position.set(0, 0.48, -0.32);
    tail.rotation.x = 1.05;
    g.add(tail);
    g.userData.tail = tail;
    return g;
  }

  const mom = makeDog(true);
  mom.position.set(MOM_HOME.x, DOG_Y, MOM_HOME.z);
  root.add(mom);
  const pup = makeDog(false);
  pup.scale.setScalar(0.62);
  pup.position.set(PUP_HOME.x, DOG_Y, PUP_HOME.z);
  root.add(pup);
  sign('Mom', MOM_HOME.x, 1.35, MOM_HOME.z, { size: 0.22 });
  sign('Puppy', PUP_HOME.x, 1.05, PUP_HOME.z, { size: 0.22 });
  const scarTag = sign('Scar', MOM_HOME.x - 0.35, 1.05, MOM_HOME.z + 0.15, { size: 0.2, color: '#fecaca', border: '#ef4444' });
  scarTag.visible = false;
  const sitTag = sign('Learned sit', MOM_HOME.x + 0.15, 1.65, MOM_HOME.z, { size: 0.2, color: '#fde68a', border: '#f59e0b' });
  sitTag.visible = false;

  const momHop = { seq: 0 };
  async function showDogs() {
    mode = 'dogs';
    const s = claim(momHop);
    kit.sfx('pop');
    await glide(momHop, s, 520, (k) => {
      mom.position.y = DOG_Y + Math.sin(k * Math.PI) * 0.16;
    }, 'out');
  }
  function showTrick() {
    scarTag.visible = true;
    sitTag.visible = true;
    kit.sfx('click');
  }

  const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.12, 0.55), woodMat);
  shelf.position.set(0.05, 0.2, -0.12);
  shelf.receiveShadow = true;
  root.add(shelf);

  const IN = { x: -0.95, z: -1.28 };
  const AC = { x: 0.95, z: -1.28 };
  function makeBin(pos, title, sub, color) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.55, emissive: color, emissiveIntensity: 0.15 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 0.95), mat);
    mesh.position.set(pos.x, 0.16, pos.z);
    mesh.userData.kind = title === 'Inherited' ? 'in' : 'ac';
    root.add(mesh);
    sign(title, pos.x, 0.85, pos.z, { size: 0.26, color: '#ffffff', border: '#ffffff' });
    sign(sub, pos.x, 0.55, pos.z, { size: 0.2 });
    kit.onTap(mesh, () => {
      if (mode !== 'traits' || !selected || selected.locked) return;
      placeCard(selected, mesh.userData.kind);
    });
    return mesh;
  }
  makeBin(IN, 'Inherited', 'From parents', 0x166534);
  makeBin(AC, 'Acquired', 'From life', 0xc2410c);

  const cardDefs = [
    { text: 'Brown fur', kind: 'in', home: [-1.2, 0.55, -0.12] },
    { text: 'Floppy ears', kind: 'in', home: [-0.4, 0.55, -0.12] },
    { text: 'A scar', kind: 'ac', home: [0.4, 0.55, -0.12] },
    { text: 'Sit trick', kind: 'ac', home: [1.2, 0.55, -0.12] },
  ];
  const cards = [];
  let selected = null;
  let traitsArmed = false;
  let traitsDone = false;

  function binAt(x, z) {
    if (Math.abs(x - IN.x) < 0.72 && Math.abs(z - IN.z) < 0.55) return 'in';
    if (Math.abs(x - AC.x) < 0.72 && Math.abs(z - AC.z) < 0.55) return 'ac';
    return null;
  }
  function slotPos(kind, i) {
    const b = kind === 'in' ? IN : AC;
    const col = i % 2;
    const row = Math.floor(i / 2);
    return new THREE.Vector3(b.x + (col - 0.5) * 0.48, 0.48, b.z + (row - 0.5) * 0.32);
  }
  function highlight(card) {
    for (const c of cards) c.mat.emissiveIntensity = c === card ? 0.45 : 0;
  }
  async function glideCard(card, to, ms = 360) {
    const s = claim(card);
    card.busy = true;
    const from = card.mesh.position.clone();
    const ok = await glide(card, s, ms, (k) => card.mesh.position.lerpVectors(from, to, k), 'out');
    if (!ok) return false;
    card.mesh.position.copy(to);
    card.busy = false;
    return true;
  }
  async function placeCard(card, kind) {
    if (card.locked || mode !== 'traits') return;
    selected = null;
    highlight(null);
    card.placed = kind;
    const taken = cards.filter((c) => c.placed === kind).length - 1;
    const spot = slotPos(kind, taken);
    const ok = await glideCard(card, spot);
    if (!ok) {
      if (!card.locked) card.placed = null;
      return;
    }
    if (kind !== card.kind) {
      card.placed = null;
      kit.sfx('thud');
      kit.vespa?.react('think');
      card.label.setText('Try again');
      const home = new THREE.Vector3(...card.home);
      const back = await glideCard(card, home);
      if (!back) return;
      card.label.setText(card.text);
      return;
    }
    card.locked = true;
    card.placed = kind;
    kit.sfx('chime');
    if (traitsArmed && !traitsDone && cards.every((c) => c.locked)) {
      traitsDone = true;
      kit.vespa?.react('happy');
      kit.emit('traitsSorted');
    }
  }

  for (let i = 0; i < cardDefs.length; i++) {
    const def = cardDefs[i];
    const mat = new THREE.MeshStandardMaterial({ color: cardColors[i], roughness: 0.4, emissive: 0xf59e0b, emissiveIntensity: 0 });
    const mesh = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.08), mat);
    box.castShadow = true;
    mesh.add(box);
    const label = kit.label(def.text, { size: 0.24, color: '#1c1917', bg: 'rgba(255,255,255,0.92)', border: '#78716c' });
    label.position.set(0, 0.34, 0.02);
    mesh.add(label);
    mesh.position.set(...def.home);
    root.add(mesh);
    const card = { ...def, mesh, mat, label, seq: 0, busy: false, locked: false, placed: null };
    cards.push(card);
    kit.onTap(mesh, () => {
      if (mode !== 'traits' || card.locked) return;
      selected = card;
      highlight(card);
      card.mesh.position.y = 0.72;
      kit.sfx('pop');
    });
    kit.onDrag(mesh, {
      plane: 'xz',
      onStart: () => {
        if (mode !== 'traits' || card.locked) return;
        claim(card);
        card.busy = false;
        card.placed = null;
        card.label.setText(card.text);
        card.dragX = card.mesh.position.x;
        card.dragZ = card.mesh.position.z;
        selected = card;
        highlight(card);
      },
      onMove: (p) => {
        if (mode !== 'traits' || card.locked) return;
        claim(card);
        card.mesh.position.x = THREE.MathUtils.clamp(p.x, -2.1, 2.2);
        card.mesh.position.z = THREE.MathUtils.clamp(p.z, -2.15, 0.45);
        card.mesh.position.y = 0.78;
      },
      onEnd: () => {
        if (mode !== 'traits' || card.locked) return;
        const moved = Math.hypot(card.mesh.position.x - card.dragX, card.mesh.position.z - card.dragZ) > 0.18;
        const kind = binAt(card.mesh.position.x, card.mesh.position.z);
        if (kind && moved) placeCard(card, kind);
        else if (moved) glideCard(card, new THREE.Vector3(...card.home));
      },
    });
  }

  function resetTraits() {
    traitsDone = false;
    traitsArmed = false;
    selected = null;
    for (const card of cards) {
      claim(card);
      card.busy = false;
      card.locked = false;
      card.placed = null;
      card.mesh.position.set(...card.home);
      card.label.setText(card.text);
      card.mat.emissiveIntensity = 0;
    }
  }

  updaters.push((dt, t) => {
    void dt;
    for (let i = 0; i < pads.length; i++) {
      const p = pads[i];
      p.position.y = p.userData.base + Math.sin(t * 1.25 + p.userData.ph) * 0.02 + (i === 0 ? lilyAnim.lift : 0);
    }
    for (const c of cattails) c.rotation.z = Math.sin(t * 0.9 + c.userData.ph) * 0.05;
    if (mom.userData.tail) mom.userData.tail.rotation.z = Math.sin(t * 6) * 0.35;
    if (pup.userData.tail) pup.userData.tail.rotation.y = Math.sin(t * 7) * 0.4;
    if (sunHot) sunM.mesh.material.emissiveIntensity = 1.3 + Math.sin(t * 5) * 0.35;
  });

  const cues = {
    idle() {
      mode = 'idle';
      kit.ui.clear();
      waterRead = null;
    },
    async hotSunDemo() {
      mode = 'demo';
      sunArmed = false;
      kit.ui.clear();
      waterRead = null;
      claim(cut);
      layoutCut(0);
      resetSpray();
      await onHotSun();
    },
    sunMode() {
      mode = 'sun';
      sunArmed = true;
      sunDone = false;
      claim(cut);
      layoutCut(0);
      resetSpray();
      kit.ui.clear();
      waterRead = kit.ui.readout('Water test');
      waterRead.set('Press Hot Sun');
      kit.ui.buttons([{ label: 'Hot Sun', emoji: '☀️', onClick: () => onHotSun() }]);
    },
    lookInside() {
      mode = 'look';
      kit.ui.clear();
      waterRead = null;
      cutSlider = kit.ui.slider({
        label: '🔍 Look inside',
        min: 0,
        max: 1,
        step: 0.01,
        value: cutAmt,
        onChange: (v) => {
          claim(cut);
          layoutCut(v);
        },
      });
      return setCut(1, 900);
    },
    leafFood() {
      return leafFood();
    },
    rootsMode() {
      mode = 'roots';
      rootsArmed = true;
      rootsDone = false;
      kit.ui.clear();
      waterRead = null;
      claim(dig);
      layoutDig(0);
      digSlider = kit.ui.slider({
        label: '⛏️ Dig down',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        onChange: (v) => {
          claim(dig);
          layoutDig(v);
        },
      });
    },
    digOpen() {
      rootsArmed = false;
      return setDig(1, 900);
    },
    lilyFloat() {
      return lilyFloat();
    },
    showDogs() {
      return showDogs();
    },
    showTrick() {
      showTrick();
    },
    traitsMode() {
      resetTraits();
      mode = 'traits';
      traitsArmed = true;
      kit.ui.clear();
      const read = kit.ui.readout('Sort traits');
      read.set('Inherited or acquired');
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.1, 10.8], look: [0, 0.95, -0.35] },
      desert: { pos: [-3.15, 2.7, 4.5], look: [-3.7, 1.15, 0.35] },
      inside: { pos: [-3.55, 1.9, 2.9], look: [CACTUS.x, 1.05, CACTUS.z] },
      roots: { pos: [-1.15, 2.5, 3.3], look: [-3.3, 1.15, -0.7] },
      pond: { pos: [3.2, 2.7, 4.3], look: [POND.x, 0.85, POND.z] },
      dogs: { pos: [0.1, 2.55, 2.7], look: [0.1, 0.85, -1.45] },
    },
    points: {
      cactus: [CACTUS.x, 1.4, CACTUS.z],
      leaf: [LEAF.x, 1.1, LEAF.z],
      mesquite: [tree.position.x, 1.5, tree.position.z],
      roots: [WIN.x, 1.2, WIN.z],
      lily: [POND.x + 0.05, 0.7, POND.z + 0.12],
      cattail: [POND.x + 1.05, 1.15, POND.z],
      dogs: [0.05, 0.9, -2.35],
      mom: [MOM_HOME.x, 1.0, MOM_HOME.z],
      pup: [PUP_HOME.x, 0.75, PUP_HOME.z],
      inside: [CACTUS.x, 1.2, CACTUS.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
