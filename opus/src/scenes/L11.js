// Lesson 11 scene: Galveston Bay prairie. Leaf kitchen, food-chain arrows, population story, log, Texas fossils.
// Energy arrows always point from the food to the eater. Anything that moves two ways uses claim / glide.

const POS = {
  sun: [0.1, 3.28, -1.55],
  grass: [0.05, 0.46, 0.08],
  hopper: [0.78, 0.52, 0.42],
  frog: [-0.82, 0.36, 0.92],
  snake: [0.18, 0.22, 1.28],
  hawk: [1.08, 1.72, 0.02],
  rabbit: [1.58, 0.42, -0.52],
  coyote: [2.18, 0.55, 0.38],
};
const ORDER = ['sun', 'grass', 'hopper', 'frog', 'snake', 'hawk'];
const NAME = { sun: 'Sun', grass: 'Grass', hopper: 'Hopper', frog: 'Frog', snake: 'Snake', hawk: 'Hawk' };
const EMOJI = { sun: '☀️', grass: '🌿', hopper: '🦗', frog: '🐸', snake: '🐍', hawk: '🦅' };
const BASE = { hopper: 40, snake: 8, frogs: 20 };
const NO_FROG = { hopper: 75, snake: 3, frogs: 0 };
// Drought: the pond shrinks AND the grass dries, so hoppers lose food too.
const DRY = { hopper: 22, snake: 3, frogs: 5 };

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const actors = {};
  let mode = 'idle';
  let chainStep = 0;
  let chainArmed = false;
  let chainDone = false;
  let frogsArmed = false;
  let frogsGone = false;
  let frogCount = BASE.frogs;
  let logArmed = false;
  let decayed = false;
  let leafDone = false;
  let cattailLean = 0;
  let readout = null;

  const claim = (it) => {
    it.seq = (it.seq || 0) + 1;
    it.busy = true;
    return it.seq;
  };
  const release = (it, s) => {
    if (it.seq === s) it.busy = false;
  };
  const glide = (it, s, ms, fn, ease) => kit.animate(ms, (k) => {
    if (it.seq !== s) return;
    fn(k);
  }, ease).then(() => it.seq === s);

  function shade(mesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
  function sign(text, x, y, z, opts = {}) {
    const s = kit.label(text, { size: 0.26, ...opts });
    s.position.set(x, y, z);
    s.raycast = () => {};
    root.add(s);
    return s;
  }
  function pad(x, z, w, d, color) {
    const m = shade(new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), kit.mat.ground(color)));
    m.position.set(x, 0.06, z);
    root.add(m);
    return m;
  }
  function hitBall(r, color) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(r, 10, 8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false })
    );
    return m;
  }
  const eyeGeo = new THREE.SphereGeometry(1, 8, 6);
  const white = kit.mat.plastic(0xf8fafc);
  const pupil = kit.mat.plastic(0x111827);
  function eye(parent, x, y, z, s) {
    const e = new THREE.Mesh(eyeGeo, white);
    e.scale.setScalar(s);
    e.position.set(x, y, z);
    const p = new THREE.Mesh(eyeGeo, pupil);
    p.scale.setScalar(s * 0.45);
    p.position.set(x, y, z + s * 0.72);
    parent.add(e, p);
  }

  // ---------------- pads (stations stay apart from the wide shot) ----------------
  pad(0.15, 0.2, 5.0, 3.2, 0x3f6212);
  pad(-4.65, -2.5, 2.3, 1.55, 0x44403c);
  pad(4.25, -2.35, 2.15, 1.6, 0x365314);
  pad(-4.6, 1.15, 2.2, 1.45, 0x57534e);
  pad(4.3, 1.28, 2.2, 1.55, 0x57534e);
  sign('Galveston Bay prairie', 0.15, 2.85, 1.55, { size: 0.3, border: '#22c55e' });
  sign('Closet or window', -4.65, 2.15, -2.5, { size: 0.24 });
  sign('Inside a leaf', 4.25, 2.35, -2.35, { size: 0.24, border: '#86efac' });
  sign('Fallen log', -4.6, 1.85, 1.15, { size: 0.24, border: '#d6b48a' });
  sign('Texas fossils', 4.3, 1.95, 1.28, { size: 0.24, border: '#fbbf24' });

  // ---------------- lunch ----------------
  const lunch = new THREE.Group();
  lunch.position.set(0.12, 0.12, 2.4);
  {
    const plate = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.05, 20), kit.mat.plastic(0xf8fafc)));
    const breadMat = kit.mat.plastic(0xf6d7a7);
    const b1 = shade(new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.34), breadMat));
    b1.position.y = 0.1;
    const letu = shade(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.045, 0.28), kit.mat.plastic(0x4ade80)));
    letu.position.y = 0.16;
    const chick = shade(new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.24), kit.mat.plastic(0xe7c8a0)));
    chick.position.y = 0.21;
    const b2 = shade(new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.34), breadMat));
    b2.position.y = 0.28;
    lunch.add(plate, b1, letu, chick, b2);
    const tag = kit.label('Chicken sandwich', { size: 0.2 });
    tag.position.set(0, 0.7, 0);
    tag.raycast = () => {};
    lunch.add(tag);
  }
  root.add(lunch);

  // ---------------- sun ----------------
  const sun = new THREE.Group();
  sun.position.set(...POS.sun);
  const sunCore = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 16), kit.mat.glow(0xfbbf24, 1.4));
  const sunRays = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const ray = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.55), kit.mat.glow(0xfde68a, 0.9));
    ray.position.z = 0.72;
    const arm = new THREE.Group();
    arm.rotation.y = (i / 8) * Math.PI * 2;
    arm.add(ray);
    sunRays.add(arm);
  }
  sun.add(sunCore, sunRays);
  root.add(sun);
  updaters.push((dt) => {
    sunRays.rotation.y += dt * 0.35;
    sunCore.material.emissiveIntensity = 1.15 + Math.sin(performance.now() * 0.003) * 0.25;
  });

  // ---------------- grass ----------------
  const grassMat = kit.mat.plastic(0x4d7c0f);
  const flowerMat = kit.mat.plastic(0xf97316);
  const grass = new THREE.Group();
  grass.position.set(...POS.grass);
  const blades = [];
  for (let i = 0; i < 7; i++) {
    const h = 0.45 + (i % 3) * 0.12;
    const b = shade(new THREE.Mesh(new THREE.ConeGeometry(0.07, h, 6), grassMat));
    b.position.set((i - 3) * 0.1, h / 2, (i % 2) * 0.08);
    b.userData.base = (i - 3) * 0.04;
    grass.add(b);
    blades.push(b);
  }
  const bloom = shade(new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), flowerMat));
  bloom.position.set(0.28, 0.62, 0.05);
  const stem = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6), grassMat));
  stem.position.set(0.28, 0.28, 0.05);
  grass.add(bloom, stem);
  root.add(grass);
  updaters.push((dt, t) => {
    for (const b of blades) b.rotation.z = b.userData.base + Math.sin(t * 1.5 + b.position.x * 6) * 0.07;
  });

  // ---------------- pond and cattails ----------------
  const pond = new THREE.Group();
  const pondMat = kit.mat.water(0x0e7490);
  const pondMesh = new THREE.Mesh(new THREE.CircleGeometry(0.72, 28), pondMat);
  pondMesh.rotation.x = -Math.PI / 2;
  pondMesh.position.y = 0.14;
  pond.add(pondMesh);
  pond.position.set(-1.32, 0, 0.78);
  root.add(pond);
  pond.level = 1;
  const cattails = [];
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Group();
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 6), kit.mat.plastic(0x3f6212));
    st.position.y = 0.35;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.18, 8), kit.mat.plastic(0x92400e));
    head.position.y = 0.74;
    c.add(st, head);
    c.position.set(-1.55 + i * 0.22, 0.12, 1.15);
    root.add(c);
    cattails.push(c);
  }
  updaters.push((dt, t) => {
    cattails.forEach((c, i) => {
      c.rotation.z = cattailLean + Math.sin(t * 1.2 + i) * 0.04;
    });
  });

  // ---------------- animals ----------------
  function makeActor(id, mesh, radius) {
    mesh.position.set(...POS[id]);
    const hit = hitBall(radius, 0xfbbf24);
    mesh.add(hit);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.95, 0.035, 8, 18), kit.mat.glow(0xfbbf24, 0.9));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = id === 'sun' ? 0 : -0.2;
    ring.visible = false;
    mesh.add(ring);
    const tag = kit.label(NAME[id], { size: 0.2, border: '#22c55e' });
    tag.position.set(0, radius + 0.28, 0);
    mesh.add(tag);
    root.add(mesh);
    const actor = { id, mesh, hit, ring, tag, home: { x: POS[id][0], y: POS[id][1], z: POS[id][2] }, bob: id === 'sun' ? 0.03 : 0.045, phase: POS[id][0], gone: false, seq: 0, busy: false };
    actors[id] = actor;
    kit.onTap(mesh, () => onActorTap(id));
    return actor;
  }

  makeActor('sun', sun, 0.62);
  actors.sun.tag.position.y = 0.52;

  const hopper = new THREE.Group();
  {
    const body = shade(new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.28, 4, 8), kit.mat.plastic(0x84cc16)));
    body.rotation.z = Math.PI / 2;
    const head = shade(new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), kit.mat.plastic(0x65a30d)));
    head.position.set(0.22, 0.06, 0);
    eye(hopper, 0.28, 0.1, 0.06, 0.045);
    const leg = shade(new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 6, 10, Math.PI), kit.mat.plastic(0x3f6212)));
    leg.rotation.y = Math.PI / 2;
    leg.position.set(-0.05, -0.02, 0.1);
    const leg2 = leg.clone();
    leg2.position.z = -0.1;
    hopper.add(body, head, leg, leg2);
  }
  makeActor('hopper', hopper, 0.4);

  const frog = new THREE.Group();
  {
    const body = shade(new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 12), kit.mat.plastic(0x22c55e)));
    body.scale.set(1.15, 0.72, 1);
    eye(frog, 0.08, 0.16, 0.16, 0.045);
    eye(frog, -0.08, 0.16, 0.16, 0.045);
    frog.add(body);
  }
  makeActor('frog', frog, 0.42);

  const snake = new THREE.Group();
  {
    const segMat = kit.mat.plastic(0x4d7c0f);
    for (let i = 0; i < 8; i++) {
      const s = shade(new THREE.Mesh(new THREE.SphereGeometry(0.09 - i * 0.006, 10, 8), segMat));
      s.position.set(Math.sin(i * 0.7) * 0.12, 0.08, -i * 0.13);
      snake.add(s);
    }
    eye(snake, 0.06, 0.12, 0.08, 0.03);
  }
  makeActor('snake', snake, 0.48);

  const hawk = new THREE.Group();
  {
    const body = shade(new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), kit.mat.plastic(0x92400e)));
    body.scale.set(0.85, 1.1, 0.7);
    const wingMat = kit.mat.plastic(0xb45309);
    const wingL = shade(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.28), wingMat));
    wingL.position.set(0, 0.05, 0.32);
    wingL.rotation.x = 0.25;
    const wingR = wingL.clone();
    wingR.position.z = -0.32;
    wingR.rotation.x = -0.25;
    const tail = shade(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.16), kit.mat.plastic(0xf59e0b)));
    tail.position.y = -0.2;
    const beak = shade(new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 8), kit.mat.plastic(0xfacc15)));
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.02, 0.16);
    const perch = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 1.45, 8), kit.mat.wood('#6b4423')));
    perch.position.y = -0.85;
    eye(hawk, 0.06, 0.08, 0.12, 0.035);
    hawk.add(body, wingL, wingR, tail, beak, perch);
  }
  makeActor('hawk', hawk, 0.5);

  const rabbit = new THREE.Group();
  {
    const body = shade(new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), kit.mat.plastic(0xd6d3d1)));
    body.scale.set(1.2, 0.85, 0.8);
    const head = shade(new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), kit.mat.plastic(0xe7e5e4)));
    head.position.set(0, 0.12, 0.14);
    const earMat = kit.mat.plastic(0xfca5a5);
    const earL = shade(new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.22, 3, 6), earMat));
    earL.position.set(0.05, 0.36, 0.12);
    const earR = earL.clone();
    earR.position.x = -0.05;
    const tail = shade(new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), white));
    tail.position.set(0, 0.02, -0.16);
    eye(rabbit, 0.05, 0.16, 0.22, 0.03);
    eye(rabbit, -0.05, 0.16, 0.22, 0.03);
    rabbit.add(body, head, earL, earR, tail);
  }
  makeActor('rabbit', rabbit, 0.4);

  const coyote = new THREE.Group();
  {
    const body = shade(new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.34, 4, 8), kit.mat.plastic(0xd6a15a)));
    body.rotation.z = Math.PI / 2;
    const head = shade(new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), kit.mat.plastic(0xe7c08a)));
    head.position.set(0.28, 0.08, 0);
    const snout = shade(new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 8), kit.mat.plastic(0xf5deb3)));
    snout.rotation.x = Math.PI / 2;
    snout.position.set(0.28, 0.04, 0.14);
    const ear = shade(new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 6), kit.mat.plastic(0xb45309)));
    ear.position.set(0.3, 0.22, 0.06);
    const ear2 = ear.clone();
    ear2.position.z = -0.06;
    const tail = shade(new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.22, 3, 6), kit.mat.plastic(0xd6a15a)));
    tail.rotation.z = Math.PI / 2.4;
    tail.position.set(-0.28, 0.08, 0);
    eye(coyote, 0.34, 0.12, 0.08, 0.03);
    coyote.add(body, head, snout, ear, ear2, tail);
  }
  makeActor('coyote', coyote, 0.48);

  makeActor('grass', grass, 0.46);

  const nextLabel = sign('Next: Sun', 0.2, 2.35, 1.62, { size: 0.28, border: '#fbbf24' });
  nextLabel.visible = false;

  // ---------------- story bars ----------------
  const bars = new THREE.Group();
  bars.position.set(-1.95, 0.16, -0.85);
  bars.visible = false;
  function makeBar(color, x, caption) {
    const g = new THREE.Group();
    const track = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.05, 0.1), kit.mat.metal(0x1f2937));
    track.position.y = 0.52;
    const geo = new THREE.BoxGeometry(0.18, 1, 0.12);
    geo.translate(0, 0.5, 0);
    const fill = new THREE.Mesh(geo, kit.mat.glow(color, 0.7));
    fill.scale.y = 0.4;
    g.add(track, fill);
    g.position.x = x;
    const t = kit.label(caption, { size: 0.16 });
    t.position.set(0, -0.16, 0);
    t.raycast = () => {};
    g.add(t);
    g.fill = fill;
    bars.add(g);
    return g;
  }
  const hopperBar = makeBar(0x84cc16, -0.28, 'Hoppers');
  const snakeBar = makeBar(0xf59e0b, 0.28, 'Snakes');
  root.add(bars);
  sign('Story counts', -1.95, 1.55, -0.85, { size: 0.18 }).visible = true;
  const barSign = root.children[root.children.length - 1];

  function popText(h, s, f) {
    return `Hoppers ${h}   Snakes ${s}   Frogs ${f}`;
  }
  function paintBars(h, s) {
    hopperBar.fill.scale.y = Math.max(0.04, h / 100);
    snakeBar.fill.scale.y = Math.max(0.04, s / 12);
  }
  paintBars(BASE.hopper, BASE.snake);

  // ---------------- arrows (food -> eater) ----------------
  function ends(a, b, gap = 0.32) {
    const A = new THREE.Vector3(a[0], a[1] + 0.12, a[2]);
    const B = new THREE.Vector3(b[0], b[1] + 0.12, b[2]);
    const d = B.clone().sub(A);
    const len = d.length() || 0.001;
    d.multiplyScalar(1 / len);
    const g = Math.min(gap, len * 0.2);
    return [A.clone().addScaledVector(d, g), B.clone().addScaledVector(d, -g)];
  }
  function placeArrow(arrow, from, to) {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = Math.max(0.2, dir.length());
    arrow.position.copy(from);
    arrow.set(len, dir);
    arrow.visible = true;
  }
  function growArrow(arrow, s, from, to, ms) {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = Math.max(0.25, dir.length());
    arrow.position.copy(from);
    arrow.visible = true;
    return glide(arrow, s, ms, (k) => {
      arrow.position.copy(from);
      arrow.set(Math.max(0.2, len * Math.max(k, 0.08)), dir);
      arrow.visible = true;
    }, 'out');
  }
  const demoRed = kit.arrow(0xef4444);
  const demoGold = kit.arrow(0xfbbf24);
  demoRed.visible = false;
  demoGold.visible = false;
  root.add(demoRed, demoGold);
  const links = ORDER.slice(0, -1).map(() => {
    const a = kit.arrow(0xfbbf24);
    a.visible = false;
    root.add(a);
    return a;
  });
  function hideDemo() {
    claim(demoRed);
    claim(demoGold);
    demoRed.visible = false;
    demoGold.visible = false;
  }
  function showLink(i) {
    const arrow = links[i];
    const s = claim(arrow);
    const [from, to] = ends(POS[ORDER[i]], POS[ORDER[i + 1]], 0.3);
    growArrow(arrow, s, from, to, 480).then((ok) => {
      if (ok) release(arrow, s);
    });
  }

  const motes = [];
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), kit.mat.glow(0xfde68a, 1.2));
    m.visible = false;
    root.add(m);
    motes.push(m);
  }

  // ---------------- plants: closet vs window ----------------
  const closetMat = kit.mat.plastic(0x4ade80);
  const sunnyMat = kit.mat.plastic(0x22c55e);
  const pale = new THREE.Color(0xd6d3a8);
  function corn(mat) {
    const g = new THREE.Group();
    const stem = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.72, 8), mat));
    stem.position.y = 0.36;
    const leaf = shade(new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 0.12), mat));
    leaf.position.set(0.16, 0.4, 0);
    leaf.rotation.z = -0.45;
    const leaf2 = shade(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.12), mat));
    leaf2.position.set(-0.14, 0.55, 0);
    leaf2.rotation.z = 0.5;
    const tassel = shade(new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 6), kit.mat.plastic(0xfacc15)));
    tassel.position.y = 0.8;
    g.add(stem, leaf, leaf2, tassel);
    return g;
  }
  function potAt(x, z) {
    const p = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.22, 12), kit.mat.plastic(0xb45309)));
    p.position.set(x, 0.18, z);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12), kit.mat.ground(0x78350f));
    soil.position.set(x, 0.28, z);
    root.add(p, soil);
  }
  potAt(-5.15, -2.5);
  potAt(-4.15, -2.5);
  const closetBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.15, 0.35), kit.mat.metal(0x1f2937));
  closetBox.position.set(-5.15, 0.7, -2.85);
  root.add(closetBox);
  const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.15, 0.08), kit.mat.glow(0xfde68a, 0.35));
  winFrame.position.set(-4.15, 0.75, -2.9);
  root.add(winFrame);
  const closet = corn(closetMat);
  closet.position.set(-5.15, 0.28, -2.5);
  closet.scale.setScalar(0.4);
  const sunny = corn(sunnyMat);
  sunny.position.set(-4.15, 0.28, -2.5);
  sunny.scale.setScalar(0.34);
  root.add(closet, sunny);
  const closetTag = kit.label('Dark closet', { size: 0.18 });
  closetTag.position.set(-5.15, 1.45, -2.5);
  closetTag.raycast = () => {};
  const windowTag = kit.label('Sunny window', { size: 0.18, border: '#fbbf24' });
  windowTag.position.set(-4.15, 1.55, -2.5);
  windowTag.raycast = () => {};
  root.add(closetTag, windowTag);
  const dayTag = sign('Day 0', -4.65, 0.55, -1.85, { size: 0.22, border: '#fbbf24' });

  // ---------------- leaf kitchen ----------------
  const leafGroup = new THREE.Group();
  leafGroup.position.set(4.25, 0, -2.35);
  const blade = shade(new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 12), kit.mat.plastic(0x16a34a)));
  blade.scale.set(1.15, 1.45, 0.16);
  blade.position.y = 1.25;
  const vein = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.15, 0.04), kit.mat.plastic(0x166534));
  vein.position.set(0, 1.25, 0.1);
  const miniSun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), kit.mat.glow(0xfbbf24, 1.2));
  miniSun.position.set(-0.95, 2.05, 0.2);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, 0.8, 8), kit.mat.glow(0xfde68a, 0.8));
  beam.position.set(-0.45, 1.7, 0.15);
  beam.rotation.z = 0.9;
  const holeMat = kit.mat.plastic(0x14532d);
  for (const hx of [-0.28, 0.05, 0.32]) {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), holeMat);
    h.position.set(hx, 1.35, 0.12);
    leafGroup.add(h);
  }
  const airPuff = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), kit.mat.glow(0xbae6fd, 0.5));
  airPuff.position.set(0.9, 1.4, 0.2);
  const airTag = kit.label('carbon dioxide', { size: 0.16, border: '#7dd3fc' });
  airTag.position.set(0.15, 0.22, 0);
  airTag.raycast = () => {};
  airPuff.add(airTag);
  const waterDrop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), kit.mat.plastic(0x38bdf8));
  waterDrop.position.set(0, 0.35, 0.15);
  const waterTag = kit.label('water', { size: 0.16, border: '#38bdf8' });
  waterTag.position.set(0.35, 0, 0);
  waterTag.raycast = () => {};
  waterDrop.add(waterTag);
  const sugar = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.1), kit.mat.glow(0xfacc15, 0.8));
  sugar.position.set(0.05, 1.2, 0.16);
  sugar.scale.setScalar(0.01);
  const sugarTag = kit.label('sugar food', { size: 0.16, border: '#facc15' });
  sugarTag.position.set(0, 0.28, 0);
  sugarTag.raycast = () => {};
  sugar.add(sugarTag);
  const o2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), kit.mat.glow(0xe0f2fe, 0.7));
  o2.position.set(0.15, 1.55, 0.25);
  o2.visible = false;
  const o2Tag = kit.label('oxygen', { size: 0.16, border: '#e0f2fe' });
  o2Tag.position.set(0, 0.22, 0);
  o2Tag.raycast = () => {};
  o2.add(o2Tag);
  const soilCup = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.22, 12), kit.mat.ground(0x78350f)));
  soilCup.position.y = 0.16;
  const rootStem = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.7, 8), kit.mat.plastic(0x166534)));
  rootStem.position.y = 0.55;
  leafGroup.add(blade, vein, miniSun, beam, airPuff, waterDrop, sugar, o2, soilCup, rootStem);
  root.add(leafGroup);
  const soilNo = kit.label('Soil is not the food', { size: 0.18, border: '#f87171' });
  soilNo.position.set(4.25, 0.55, -1.85);
  soilNo.visible = false;
  soilNo.raycast = () => {};
  const soilYes = kit.label('Nutrients are helpers', { size: 0.18, border: '#86efac' });
  soilYes.position.set(4.25, 0.28, -1.85);
  soilYes.visible = false;
  soilYes.raycast = () => {};
  root.add(soilNo, soilYes);
  const sunWord = kit.label('sunlight', { size: 0.16, border: '#fde68a' });
  sunWord.position.set(-0.95, 2.32, 0.2);
  sunWord.raycast = () => {};
  leafGroup.add(sunWord);

  const leafAnim = { seq: 0, busy: false };
  const o2anim = { seq: 0, busy: false };
  function layoutLeaf(k) {
    const ak = Math.min(1, k / 0.45);
    airPuff.visible = k > 0.04;
    airPuff.position.x = 0.95 - ak * 0.7;
    airPuff.position.y = 1.42;
    const wk = Math.min(1, Math.max(0, (k - 0.08) / 0.45));
    waterDrop.visible = k > 0.1;
    waterDrop.position.y = 0.35 + wk * 0.85;
    const sk = Math.min(1, Math.max(0, (k - 0.4) / 0.45));
    sugar.visible = k > 0.42;
    sugar.scale.setScalar(0.04 + sk * 0.96);
    beam.visible = k > 0.04;
    beam.scale.y = 0.35 + Math.min(1, k / 0.5) * 0.85;
    sunWord.visible = k > 0.04;
  }
  airPuff.visible = false;
  waterDrop.visible = false;
  sugar.visible = false;
  beam.visible = false;
  sunWord.visible = false;

  // ---------------- fallen log ----------------
  const logGroup = new THREE.Group();
  logGroup.position.set(-4.6, 0, 1.15);
  const logWood = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.55, 12), kit.mat.wood('#6b3a1e')));
  logWood.rotation.z = Math.PI / 2;
  logWood.position.y = 0.28;
  const shrooms = new THREE.Group();
  function mushroom(x, z, sc) {
    const g = new THREE.Group();
    const st = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.035 * sc, 0.045 * sc, 0.14 * sc, 8), kit.mat.plastic(0xf3e6d0)));
    st.position.y = 0.1 * sc;
    const cap = shade(new THREE.Mesh(new THREE.SphereGeometry(0.1 * sc, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), kit.mat.plastic(0xd6b48a)));
    cap.position.y = 0.16 * sc;
    g.add(st, cap);
    g.position.set(x, 0.36, z);
    return g;
  }
  shrooms.add(mushroom(-0.35, 0.08, 1), mushroom(0.05, -0.02, 1.25), mushroom(0.38, 0.1, 0.9));
  const worms = new THREE.Group();
  const wormMat = kit.mat.plastic(0xf9a8d4);
  for (let i = 0; i < 6; i++) {
    const w = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), wormMat);
    w.position.set(-0.2 + i * 0.08, 0.08, 0.28);
    worms.add(w);
  }
  const soilMound = shade(new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), kit.mat.ground(0x78350f)));
  soilMound.scale.set(1, 0.35, 1);
  soilMound.position.set(0.15, 0.1, 0.42);
  soilMound.scale.y = 0.02;
  const sprout = new THREE.Group();
  const sp = shade(new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 6), kit.mat.plastic(0x22c55e)));
  sp.position.y = 0.14;
  sprout.add(sp);
  sprout.position.set(0.72, 0.12, 0.15);
  sprout.scale.setScalar(0.05);
  const nutLabel = kit.label('nutrients', { size: 0.18, border: '#86efac' });
  nutLabel.position.set(0.35, 0.85, 0.3);
  nutLabel.visible = false;
  nutLabel.raycast = () => {};
  const logHit = hitBall(0.85, 0xfbbf24);
  logHit.scale.set(1.5, 0.7, 0.8);
  logHit.position.y = 0.35;
  logGroup.add(logWood, shrooms, worms, soilMound, sprout, nutLabel, logHit);
  root.add(logGroup);
  kit.onTap(logGroup, () => requestDecay());
  updaters.push((dt, t) => {
    worms.children.forEach((w, i) => {
      w.position.y = 0.08 + Math.sin(t * 3 + i) * 0.02;
    });
  });
  const decay = { seq: 0, busy: false };
  const shroomAnim = { seq: 0, busy: false };
  const crumbs = kit.particles(30, { size: 0.07, color: 0xd6b48a, spread: 0.8 });
  crumbs.position.set(-4.6, 0.45, 1.15);
  crumbs.material.opacity = 0;
  root.add(crumbs);
  function applyDecay(k) {
    logWood.scale.set(1 - 0.15 * k, 1 - 0.28 * k, 1 - 0.15 * k);
    shrooms.scale.setScalar(0.85 + 0.55 * k);
    soilMound.scale.set(1, 0.05 + 0.55 * k, 1);
    sprout.scale.setScalar(0.05 + 0.95 * k);
    nutLabel.visible = k > 0.55;
    crumbs.material.opacity = Math.sin(Math.min(1, k) * Math.PI) * 0.85;
  }

  // ---------------- fossils ----------------
  const fossil = new THREE.Group();
  fossil.position.set(4.3, 0, 1.28);
  const slab = shade(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.28, 1.15), kit.mat.rock('#a8a29e')));
  slab.position.y = 0.2;
  const shell = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 8, 16), kit.mat.plastic(0xf5f5f4));
  shell.position.set(-0.42, 0.4, 0.12);
  const tooth = shade(new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.28, 8), kit.mat.plastic(0xfafafa)));
  tooth.position.set(0.05, 0.5, 0.18);
  const palm = shade(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.42, 10), kit.mat.wood('#8d6e63')));
  palm.rotation.z = Math.PI / 2;
  palm.position.set(0.48, 0.42, -0.02);
  const track = new THREE.Group();
  for (const [x, z] of [[0, 0.08], [-0.08, -0.06], [0.08, -0.06], [0, -0.02]]) {
    const toe = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), kit.mat.plastic(0x57534e));
    toe.scale.y = 0.4;
    toe.position.set(x, 0.36, z);
    track.add(toe);
  }
  track.position.set(-0.05, 0, -0.28);
  fossil.add(slab, shell, tooth, palm, track);
  root.add(fossil);
  const shellTag = kit.label('shell', { size: 0.16 });
  shellTag.position.set(3.88, 0.75, 1.4);
  shellTag.raycast = () => {};
  const toothTag = kit.label('shark tooth', { size: 0.16 });
  toothTag.position.set(4.35, 0.9, 1.5);
  toothTag.raycast = () => {};
  const palmTag = kit.label('palm wood', { size: 0.16 });
  palmTag.position.set(4.78, 0.78, 1.26);
  palmTag.raycast = () => {};
  const trackTag = kit.label('track', { size: 0.16 });
  trackTag.position.set(4.25, 0.62, 0.95);
  trackTag.raycast = () => {};
  root.add(shellTag, toothTag, palmTag, trackTag);

  // ---------------- motion ----------------
  function pulse(a) {
    const s = claim(a);
    const y0 = a.mesh.position.y;
    glide(a, s, 420, (k) => {
      a.mesh.position.y = y0 + Math.sin(k * Math.PI) * 0.2;
    }, 'out').then((ok) => {
      if (!ok) return;
      a.mesh.position.y = a.home.y;
      release(a, s);
    });
  }

  const habitat = { seq: 0, busy: false };
  async function setHabitat(kind) {
    const s = claim(habitat);
    const frogS = claim(actors.frog);
    const pondS = claim(pond);
    const target = kind === 'full' ? BASE : kind === 'nofrog' ? NO_FROG : DRY;
    const startH = hopperBar.fill.scale.y * 100;
    const startS = snakeBar.fill.scale.y * 12;
    const startLevel = pond.level ?? 1;
    const endLevel = kind === 'dry' ? 0.08 : 1;
    const frogA = actors.frog;
    const startY = frogA.mesh.position.y;
    const endY = kind === 'full' ? frogA.home.y : frogA.home.y - 0.42;
    const startSc = frogA.mesh.scale.x || 1;
    const endSc = kind === 'full' ? 1 : 0.12;
    const fromColor = grassMat.color.clone();
    const toColor = new THREE.Color(kind === 'dry' ? 0xb7b48a : 0x4d7c0f);
    const fromFlower = flowerMat.color.clone();
    const toFlower = new THREE.Color(kind === 'dry' ? 0xd6d3d1 : 0xf97316);
    const fromLean = cattailLean;
    const toLean = kind === 'dry' ? 0.55 : 0;
    const startFrogs = frogCount;
    frogA.mesh.visible = true;
    const ok = await glide(habitat, s, 1100, (k) => {
      const h = Math.round(startH + (target.hopper - startH) * k);
      const sn = Math.round(startS + (target.snake - startS) * k);
      const fr = Math.round(startFrogs + (target.frogs - startFrogs) * k);
      paintBars(h, sn);
      readout?.set(popText(h, sn, Math.max(0, fr)));
      pond.level = startLevel + (endLevel - startLevel) * k;
      const wide = 0.62 + 0.38 * pond.level;
      pondMesh.scale.set(wide, wide, 1);
      pondMat.opacity = 0.2 + 0.45 * pond.level;
      frogA.mesh.position.y = startY + (endY - startY) * k;
      const sc = startSc + (endSc - startSc) * k;
      frogA.mesh.scale.setScalar(Math.max(0.05, sc));
      grassMat.color.copy(fromColor).lerp(toColor, k);
      flowerMat.color.copy(fromFlower).lerp(toFlower, k);
      cattailLean = fromLean + (toLean - fromLean) * k;
    }, 'inOut');
    if (habitat.seq !== s) return false;
    paintBars(target.hopper, target.snake);
    pond.level = endLevel;
    frogsGone = kind !== 'full';
    frogCount = target.frogs;
    frogA.gone = frogsGone;
    frogA.mesh.visible = !frogsGone;
    if (!frogsGone) {
      frogA.mesh.position.set(frogA.home.x, frogA.home.y, frogA.home.z);
      frogA.mesh.scale.setScalar(1);
    }
    readout?.set(popText(target.hopper, target.snake, target.frogs));
    release(habitat, s);
    if (actors.frog.seq === frogS) release(actors.frog, frogS);
    if (pond.seq === pondS) release(pond, pondS);
    return ok;
  }

  function tapChain(id) {
    if (mode !== 'chain' || !chainArmed) return;
    const need = ORDER[chainStep];
    if (id !== need) {
      kit.sfx('click');
      kit.vespa?.react('think');
      nextLabel.setText(`Not yet. Next: ${NAME[need]}`);
      return;
    }
    kit.sfx('chime');
    pulse(actors[id]);
    if (chainStep > 0) showLink(chainStep - 1);
    chainStep += 1;
    if (chainStep >= ORDER.length) {
      chainArmed = false;
      chainDone = true;
      for (const m of motes) m.visible = true;
      nextLabel.setText('Chain complete!');
      kit.vespa?.react('happy');
      kit.emit('chainBuilt');
    } else {
      nextLabel.setText(`Next: ${NAME[ORDER[chainStep]]}`);
    }
  }

  function onActorTap(id) {
    if (mode === 'chain') tapChain(id);
    else if (mode === 'frogs' && id === 'frog') removeFrogs();
    else kit.sfx('click');
  }

  async function removeFrogs() {
    if (mode !== 'frogs' || !frogsArmed) return;
    frogsArmed = false;
    bars.visible = true;
    kit.sfx('whoosh');
    const ok = await setHabitat('nofrog');
    if (!ok) {
      if (mode === 'frogs') frogsArmed = true;
      return;
    }
    kit.vespa?.react('wow');
    kit.emit('frogsRemoved');
  }

  async function runDecay() {
    if (decayed) return true;
    const s = claim(decay);
    claim(shroomAnim);
    const ok = await glide(decay, s, 2200, (k) => applyDecay(k), 'inOut');
    if (!ok) return false;
    decayed = true;
    applyDecay(1);
    crumbs.material.opacity = 0;
    release(decay, s);
    kit.sfx('chime');
    kit.vespa?.react('happy');
    return true;
  }
  async function requestDecay() {
    if (mode !== 'log' || !logArmed) return;
    logArmed = false;
    const ok = await runDecay();
    if (ok) kit.emit('decomposed');
    else if (mode === 'log') logArmed = true;
  }

  updaters.push((dt, t) => {
    const need = mode === 'chain' && chainArmed ? ORDER[chainStep] : null;
    for (const a of Object.values(actors)) {
      a.ring.visible = a.id === need;
      const showHit = mode === 'chain' || (mode === 'frogs' && a.id === 'frog');
      a.hit.material.opacity = showHit ? 0.13 : 0;
      if (a.busy || a.gone) continue;
      a.mesh.position.y = a.home.y + Math.sin(t * 2.1 + a.phase) * a.bob;
    }
    logHit.material.opacity = mode === 'log' ? 0.14 : 0;
    if (!chainDone) return;
    motes.forEach((m, i) => {
      const u = (t * 0.12 + i / motes.length) % 1;
      const seg = Math.min(ORDER.length - 2, Math.floor(u * (ORDER.length - 1)));
      const f = (u * (ORDER.length - 1)) % 1;
      const a = POS[ORDER[seg]];
      const b = POS[ORDER[seg + 1]];
      m.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f + 0.18, a[2] + (b[2] - a[2]) * f);
    });
  });

  // sun was parented twice if makeActor re-adds. grass too. Fix: makeActor adds mesh.
  // The early root.add(sun) was removed. grass was added before makeActor, so remove duplicate.
  // makeActor calls root.add(mesh). grass was already added. Remove one.
  // (handled below if double)

  const cues = {
    showLunch() {
      const s = claim(lunch);
      const y0 = 0.12;
      glide(lunch, s, 500, (k) => {
        lunch.position.y = y0 + Math.sin(k * Math.PI) * 0.18;
      }, 'out').then((ok) => {
        if (!ok) return;
        lunch.position.y = y0;
        release(lunch, s);
      });
      kit.sfx('pop');
    },
    showPlants() {
      claim(sunny);
      sunny.scale.setScalar(0.34);
      release(sunny, sunny.seq);
      closet.scale.setScalar(0.4);
      closetMat.color.set(0x4ade80);
      dayTag.setText('Day 0');
      kit.sfx('click');
    },
    async growSunny() {
      const s = claim(sunny);
      const from = sunny.scale.y;
      const ok = await glide(sunny, s, 1600, (k) => {
        sunny.scale.setScalar(from + (1 - from) * k);
        closetMat.color.set(0x4ade80).lerp(pale, k);
        const day = Math.min(14, Math.max(1, Math.ceil(k * 14)));
        dayTag.setText(day < 14 ? `Day ${day}` : '2 weeks');
        winFrame.material.emissiveIntensity = 0.35 + k * 1.3;
      }, 'inOut');
      if (sunny.seq === s) {
        sunny.scale.setScalar(1);
        dayTag.setText('2 weeks');
        release(sunny, s);
      }
      if (ok) kit.sfx('chime');
    },
    leafOpen() {
      if (!leafDone) layoutLeaf(0);
      const s = claim(leafGroup);
      glide(leafGroup, s, 520, (k) => {
        leafGroup.scale.setScalar(1 + Math.sin(k * Math.PI) * 0.05);
      }).then((ok) => {
        if (!ok) return;
        leafGroup.scale.setScalar(1);
        release(leafGroup, s);
      });
      kit.sfx('pop');
    },
    async leafCook() {
      const s = claim(leafAnim);
      const ok = await glide(leafAnim, s, 2400, (k) => layoutLeaf(k), 'inOut');
      if (!ok) return;
      layoutLeaf(1);
      leafDone = true;
      release(leafAnim, s);
      kit.sfx('chime');
    },
    async leafO2() {
      const s = claim(o2anim);
      o2.visible = true;
      const ok = await glide(o2anim, s, 900, (k) => {
        o2.position.x = 0.2 + k * 0.85;
        o2.position.y = 1.5 + k * 0.28;
      }, 'out');
      if (ok) release(o2anim, s);
      kit.sfx('whoosh');
    },
    soilNope() {
      soilNo.visible = true;
      soilYes.visible = true;
      kit.sfx('tick');
    },
    showPrairie() {
      kit.sfx('whoosh');
      kit.vespa?.react('wow');
    },
    async wrongArrow() {
      const s = claim(demoRed);
      const [from, to] = ends(POS.hopper, POS.grass, 0.26);
      const ok = await growArrow(demoRed, s, from, to, 650);
      if (ok) release(demoRed, s);
    },
    async flipArrow() {
      const sRed = claim(demoRed);
      const s = claim(demoGold);
      const [wrongFrom, wrongTo] = ends(POS.hopper, POS.grass, 0.26);
      const [rightFrom, rightTo] = ends(POS.grass, POS.hopper, 0.26);
      demoGold.visible = true;
      const ok = await glide(demoGold, s, 800, (k) => {
        placeArrow(demoGold, wrongFrom.clone().lerp(rightFrom, k), wrongTo.clone().lerp(rightTo, k));
        demoRed.visible = k < 0.45;
      }, 'inOut');
      if (!ok) return;
      placeArrow(demoGold, rightFrom, rightTo);
      demoRed.visible = false;
      release(demoRed, sRed);
      release(demoGold, s);
      kit.sfx('chime');
    },
    chainMode() {
      hideDemo();
      for (const a of links) {
        claim(a);
        a.visible = false;
      }
      chainStep = 0;
      chainArmed = true;
      chainDone = false;
      for (const m of motes) m.visible = false;
      mode = 'chain';
      nextLabel.visible = true;
      nextLabel.setText('Next: Sun');
      kit.ui.clear();
      kit.ui.buttons(ORDER.map((id) => ({ emoji: EMOJI[id], label: NAME[id], onClick: () => tapChain(id) })));
      kit.sfx('click');
    },
    idle() {
      mode = 'idle';
      chainArmed = false;
      frogsArmed = false;
      logArmed = false;
      nextLabel.visible = false;
      kit.ui.clear();
    },
    showRabbit() {
      pulse(actors.rabbit);
      kit.sfx('pop');
    },
    showCoyote() {
      pulse(actors.coyote);
      kit.sfx('pop');
    },
    showLog() {
      kit.sfx('tick');
    },
    async showHelpers() {
      const s = claim(shroomAnim);
      const ok = await glide(shroomAnim, s, 600, (k) => {
        shrooms.scale.setScalar(1 + Math.sin(k * Math.PI) * 0.12);
      });
      if (!ok) return;
      if (!decayed) shrooms.scale.setScalar(1);
      release(shroomAnim, s);
    },
    logMode() {
      mode = 'log';
      if (decayed) {
        // Revisit: put the log back so the child can speed up time again (the task must re-arm).
        claim(decay);
        claim(shroomAnim);
        decayed = false;
        applyDecay(0);
        crumbs.material.opacity = 0;
        release(decay, decay.seq);
        release(shroomAnim, shroomAnim.seq);
      }
      logArmed = true;
      kit.ui.clear();
      kit.ui.buttons([{ emoji: '⏳', label: 'Speed up time', onClick: () => requestDecay() }]);
      kit.sfx('tick');
    },
    playDecay() {
      return runDecay();
    },
    frogMode() {
      mode = 'frogs';
      frogsArmed = true;
      bars.visible = true;
      barSign.visible = true;
      kit.ui.clear();
      readout = kit.ui.readout('Story count');
      readout.set(popText(Math.round(hopperBar.fill.scale.y * 100), Math.round(snakeBar.fill.scale.y * 12), frogsGone ? 0 : BASE.frogs));
      // Revisit (frogs already gone or pond dry): bring the web back so the frog is visible and tappable.
      if (frogsGone || frogCount !== BASE.frogs) setHabitat('full');
      kit.ui.buttons([{ emoji: '🐸', label: 'Remove frogs', onClick: () => removeFrogs() }]);
    },
    showFossils() {
      const s = claim(fossil);
      glide(fossil, s, 500, (k) => {
        const sc = 1 + Math.sin(k * Math.PI) * 0.04;
        fossil.scale.setScalar(sc);
      }).then((ok) => {
        if (!ok) return;
        fossil.scale.setScalar(1);
        release(fossil, s);
      });
      kit.sfx('tick');
    },
    refill() {
      bars.visible = true;
      return setHabitat('full');
    },
    drought() {
      bars.visible = true;
      kit.ui.clear();
      readout = kit.ui.readout('After the drought');
      kit.sfx('wind');
      return setHabitat('dry');
    },
  };

  // grass and sun are added inside makeActor. Drop the pre-add if it stuck.
  // sun was removed before makeActor. grass was added, then makeActor adds it again.
  // Three.js add() moves the object, so a second add does not duplicate. Safe.

  updaters.push(() => {
    if (bars.visible) barSign.visible = true;
  });

  return {
    root,
    shots: {
      wide: { pos: [0.2, 5.8, 8.8], look: [0.1, 0.85, 0] },
      plants: { pos: [-4.45, 2.15, -0.15], look: [-4.65, 0.75, -2.5] },
      leaf: { pos: [4.15, 2.15, 0.2], look: [4.25, 1.25, -2.35] },
      prairie: { pos: [0.25, 2.65, 4.55], look: [0.15, 0.7, 0.25] },
      web: { pos: [1.35, 2.7, 4.35], look: [1.05, 0.65, 0.15] },
      log: { pos: [-4.35, 2.05, 3.4], look: [-4.6, 0.55, 1.15] },
      fossils: { pos: [4.15, 2.15, 3.55], look: [4.3, 0.6, 1.28] },
      pond: { pos: [-2.15, 2.05, 3.2], look: [-1.15, 0.4, 0.78] },
    },
    points: {
      lunch: [0.12, 0.9, 2.4],
      sun: [0.1, 2.65, -1.15],
      window: [-4.15, 1.15, -2.5],
      leaf: [4.25, 1.55, -2.35],
      hopper: [0.78, 0.95, 0.42],
      hawk: [1.08, 2.05, 0.02],
      rabbit: [1.58, 0.95, -0.52],
      coyote: [2.18, 1.05, 0.38],
      log: [-4.6, 0.9, 1.15],
      frog: [-0.82, 0.85, 0.92],
      shell: [3.88, 0.85, 1.4],
      tooth: [4.35, 0.95, 1.46],
      palm: [4.78, 0.85, 1.26],
      track: [4.25, 0.7, 1.0],
      pond: [-1.32, 0.75, 0.78],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
