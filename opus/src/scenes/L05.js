// Lesson 5 scene: flashlight, circuit bench, wire cutaway, hot pan.
// Wires, the switch, the gap bridge, test objects, the flashlight, the wire lid,
// and the spoon heat each use claim/glide so a new motion cancels the old one.

const TABLE = 0.82;
const Y = 1.12;
const BOARD = { x: -0.15, z: 0.25, w: 4.5, d: 2.7 };
const SHELF = { x: 3.4, z: 0.75 };
const STOVE_P = { x: 4.55, z: -2.5 };
const LAB_P = { x: -3.65, z: -2.55 };
const FLASH_P = { x: -5.05, z: 1.4 };

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const UP = new THREE.Vector3(0, 1, 0);
  const DIR = new THREE.Vector3();
  const v = (x, y, z) => new THREE.Vector3(x, y, z);

  // Each new motion claims the item. An older glide stops where it is.
  const claim = (it) => (it.seq = (it.seq || 0) + 1);
  const glide = (it, s, ms, fn, ease) => kit.animate(ms, (k) => it.seq === s && fn(k), ease).then(() => it.seq === s);

  const P = {
    batPlus: v(-0.85, Y, -0.05),
    batMinus: v(-2.05, Y, -0.05),
    bulbIn: v(-0.35, Y, -0.75),
    bulbOut: v(0.45, Y, -0.75),
    switchIn: v(1.45, Y, -0.28),
    switchOut: v(1.45, Y, 0.42),
    gapLeft: v(0.32, Y, 0.95),
    gapRight: v(-0.32, Y, 0.95),
  };
  const gapSpot = v(0, 1.08, 0.95);

  const ghost = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

  function poseCyl(mesh, a, b) {
    DIR.subVectors(b, a);
    const len = Math.max(0.02, DIR.length());
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.scale.set(1, len, 1);
    DIR.multiplyScalar(1 / len);
    if (DIR.y < -0.999) mesh.quaternion.set(1, 0, 0, 0);
    else mesh.quaternion.setFromUnitVectors(UP, DIR);
  }

  function pedestal(x, z, w, d, color) {
    const base = new THREE.Mesh(new THREE.BoxGeometry(w, TABLE, d), kit.mat.metal(0x1e293b));
    base.position.set(x, TABLE / 2, z);
    base.castShadow = base.receiveShadow = true;
    root.add(base);
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.06, d + 0.06), kit.mat.plastic(color));
    top.position.set(x, TABLE, z);
    top.receiveShadow = true;
    root.add(top);
  }

  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.28, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }

  function addPost(pos, color) {
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, 0.26, 12), kit.mat.metal(0x94a3b8));
    peg.position.set(pos.x, TABLE + 0.16, pos.z);
    peg.castShadow = true;
    root.add(peg);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 12), kit.mat.metal(color));
    cap.position.set(pos.x, Y, pos.z);
    root.add(cap);
  }

  function trace(a, b, color) {
    const A = a.clone();
    const B = b.clone();
    A.y = B.y = 1.0;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1, 8), kit.mat.metal(color));
    poseCyl(m, A, B);
    root.add(m);
  }

  pedestal(BOARD.x, BOARD.z, BOARD.w, BOARD.d, 0x0f766e);
  pedestal(SHELF.x, SHELF.z, 2.3, 1.45, 0x334155);
  pedestal(LAB_P.x, LAB_P.z, 2.05, 1.25, 0x1e293b);
  pedestal(FLASH_P.x, FLASH_P.z, 1.7, 1.15, 0x44403c);

  sign('Battery and bulb', BOARD.x, 2.72, BOARD.z, { size: 0.32, border: '#fde047' });
  sign('Batteries only!', BOARD.x, 2.28, 1.45, { size: 0.24, color: '#fecaca', border: '#f43f5e' });
  const status = sign('Bulb OFF', BOARD.x + 1.55, 2.15, -0.55, { size: 0.26, color: '#fde047', border: '#fde047' });

  Object.entries(P).forEach(([name, pos]) => {
    const color = name === 'batPlus' ? 0xdc2626 : name === 'batMinus' ? 0x111827 : 0xe5e7eb;
    addPost(pos, color);
  });
  trace(P.batPlus, P.bulbIn, 0x3f3f46);
  trace(P.bulbOut, P.switchIn, 0x3f3f46);
  trace(P.gapRight, P.batMinus, 0x3f3f46);
  trace(P.switchOut, P.gapLeft, 0xb87333);

  // ---------- battery, bulb ----------
  {
    const bat = new THREE.Group();
    bat.position.set(-1.45, 1.05, -0.05);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.15, 24), kit.mat.metal(0x1f2937));
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.18, 24), kit.mat.plastic(0xf59e0b));
    stripe.rotation.z = Math.PI / 2;
    const plus = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), kit.mat.metal(0xdc2626));
    plus.rotation.z = Math.PI / 2;
    plus.position.x = 0.6;
    const minus = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16), kit.mat.metal(0x0f172a));
    minus.rotation.z = Math.PI / 2;
    minus.position.x = -0.58;
    bat.add(body, stripe, plus, minus);
    root.add(bat);
    sign('Battery', -1.45, 1.7, -0.05, { size: 0.22 });
  }

  const glassMat = kit.mat.glass(0xfff7e8);
  glassMat.emissive = new THREE.Color(0xffb347);
  glassMat.emissiveIntensity = 0;
  const glowMat = kit.mat.glow(0xfff1a8, 0.04);
  const bulbLight = new THREE.PointLight(0xffe7a3, 0, 6, 2);
  {
    const g = new THREE.Group();
    g.position.set(0.05, TABLE, -0.75);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 16), kit.mat.metal(0x94a3b8));
    base.position.y = 0.2;
    base.castShadow = true;
    const glass = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 18), glassMat);
    glass.position.y = 0.52;
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), glowMat);
    glow.position.y = 0.52;
    bulbLight.position.set(0, 0.55, 0);
    g.add(base, glass, glow, bulbLight);
    root.add(g);
    sign('Bulb', 0.05, 1.85, -0.75, { size: 0.22 });
  }

  // ---------- switch ----------
  const sw = { seq: 0, closed: true, pivot: null, contact: null };
  {
    const pivot = new THREE.Group();
    pivot.position.set(P.switchIn.x, Y, P.switchIn.z);
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.78), kit.mat.plastic(0xf97316));
    lever.position.z = 0.36;
    lever.castShadow = true;
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.95), ghost);
    hit.position.set(0, 0.1, 0.32);
    pivot.add(lever, hit);
    root.add(pivot);
    const contact = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.7), kit.mat.metal(0xe5e7eb));
    contact.position.set(P.switchIn.x, Y - 0.08, (P.switchIn.z + P.switchOut.z) / 2);
    root.add(contact);
    sw.pivot = pivot;
    sw.contact = contact;
    const tag = sign('Switch', P.switchIn.x, 1.75, 0.05, { size: 0.22, border: '#fb923c' });
    sw.tag = tag;
    kit.onTap(pivot, () => onSwitchTap());
  }

  // ---------- gap bridge ----------
  const bridge = { seq: 0, on: true };
  const bridgeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.06, 0.1), kit.mat.metal(0xe2e8f0));
  bridgeMesh.position.set(0, Y, 0.95);
  bridgeMesh.castShadow = true;
  root.add(bridgeMesh);
  const gapTag = sign('Gap', 0, 1.72, 0.95, { size: 0.22, border: '#38bdf8' });

  // ---------- three wires ----------
  const wireDefs = [
    { name: 'red', color: 0xef4444, a: 'batPlus', b: 'bulbIn', home: v(-1.55, 1.02, 1.34) },
    { name: 'blue', color: 0x2563eb, a: 'bulbOut', b: 'switchIn', home: v(0.05, 1.02, 1.34) },
    { name: 'black', color: 0x0f172a, a: 'gapRight', b: 'batMinus', home: v(1.4, 1.02, 1.34) },
  ];

  function snapMid(wire) {
    return P[wire.a].clone().add(P[wire.b]).multiplyScalar(0.5);
  }

  function applyShape(wire) {
    const A = P[wire.a];
    const B = P[wire.b];
    const gpos = wire.group.position;
    const t = wire.t;
    const n = wire.segs.length;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const loose = new THREE.Vector3(gpos.x + (-0.34 + u * 0.68), gpos.y + Math.sin(u * Math.PI) * 0.05, gpos.z);
      const snapped = A.clone().lerp(B, u);
      snapped.y += Math.sin(u * Math.PI) * 0.14;
      const p = loose.lerp(snapped, t);
      pts.push(p.sub(gpos));
    }
    for (let i = 0; i < n; i++) poseCyl(wire.segs[i], pts[i], pts[i + 1]);
    wire.clipA.position.copy(pts[0]);
    wire.clipB.position.copy(pts[n]);
    wire.grip.position.copy(pts[Math.floor(n / 2)]);
    wire.grip.position.y += 0.02;
  }

  function syncWireChrome(wire) {
    const show = mode === 'wires' && !wire.connected;
    wire.pad.visible = show;
    wire.tag.visible = show;
  }

  const wires = wireDefs.map((def) => {
    const group = new THREE.Group();
    group.position.copy(def.home);
    const mat = kit.mat.plastic(def.color);
    const segs = [];
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1, 8), mat);
      m.castShadow = true;
      group.add(m);
      segs.push(m);
    }
    const clipMat = kit.mat.metal(0xe5e7eb);
    const clipA = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), clipMat);
    const clipB = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), clipMat);
    const grip = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), kit.mat.plastic(def.color));
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.48, 0.72), ghost);
    group.add(clipA, clipB, grip, hit);
    root.add(group);
    const mid = P[def.a].clone().add(P[def.b]).multiplyScalar(0.5);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 20), kit.mat.glow(def.color, 0.35));
    pad.position.set(mid.x, TABLE + 0.08, mid.z);
    pad.visible = false;
    root.add(pad);
    const tag = kit.label('Drag me', { size: 0.18, color: '#ffffff', border: '#fde047' });
    tag.position.set(0, 0.42, 0);
    tag.visible = false;
    group.add(tag);
    const wire = { ...def, group, segs, clipA, clipB, grip, pad, tag, t: 0, connected: false, seq: 0 };
    applyShape(wire);
    kit.onDrag(group, {
      plane: 'xz',
      onStart() {
        if (mode !== 'wires') return;
        claim(wire);
        wire.connected = false;
        wire.t = 0;
        applyShape(wire);
        refreshCircuit();
      },
      onMove(p) {
        if (mode !== 'wires') return;
        wire.group.position.x = THREE.MathUtils.clamp(p.x, -5.6, 5.2);
        wire.group.position.y = 1.02;
        wire.group.position.z = THREE.MathUtils.clamp(p.z, -3.4, 2.4);
        wire.t = 0;
        applyShape(wire);
      },
      onEnd() {
        if (mode !== 'wires') return;
        glideWire(wire, nearSnap(wire));
      },
    });
    return wire;
  });
  sign('Wires', 0.05, 1.7, 1.34, { size: 0.2 });

  function xzDist(a, b) {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }

  function nearSnap(wire) {
    const p = wire.group.position;
    if (xzDist(p, snapMid(wire)) < 1.15) return true;
    if (xzDist(p, P[wire.a]) < 0.75) return true;
    if (xzDist(p, P[wire.b]) < 0.75) return true;
    return false;
  }

  function glideWire(wire, toSnap) {
    const s = claim(wire);
    const fromPos = wire.group.position.clone();
    const toPos = toSnap ? snapMid(wire) : wire.home.clone();
    const t0 = wire.t;
    const t1 = toSnap ? 1 : 0;
    return glide(wire, s, 520, (k) => {
      wire.group.position.lerpVectors(fromPos, toPos, k);
      wire.t = t0 + (t1 - t0) * k;
      applyShape(wire);
    }, 'inOut').then((ok) => {
      if (!ok) return false;
      wire.group.position.copy(toPos);
      wire.t = t1;
      wire.connected = !!toSnap;
      applyShape(wire);
      syncWireChrome(wire);
      refreshCircuit();
      return true;
    });
  }

  function snapAll() {
    if (mode !== 'wires') return;
    wires.forEach((w) => glideWire(w, true));
  }

  // ---------- test objects ----------
  function addSpoon(group, mat) {
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.1), mat);
    handle.position.x = -0.02;
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), mat);
    bowl.scale.set(1.1, 0.45, 0.8);
    bowl.position.x = 0.28;
    group.add(handle, bowl);
  }

  const thingSpecs = [
    { key: 'spoon', name: 'Metal spoon', short: 'Metal', emoji: '🥄', conducts: true, dx: -0.72, dz: 0.38, build: (g) => addSpoon(g, kit.mat.metal(0xd6d3d1)) },
    { key: 'coin', name: 'Coin', short: 'Coin', emoji: '🪙', conducts: true, dx: 0, dz: 0.38, build: (g) => {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.06, 24), kit.mat.metal(0xd4a017));
      g.add(c);
    } },
    { key: 'clip', name: 'Paper clip', short: 'Clip', emoji: '📎', conducts: true, dx: 0.72, dz: 0.38, build: (g) => {
      const c = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 10, 20), kit.mat.metal(0xe5e7eb));
      c.rotation.x = Math.PI / 2;
      g.add(c);
    } },
    { key: 'eraser', name: 'Eraser', short: 'Eraser', emoji: '🧽', conducts: false, dx: -0.72, dz: -0.34, build: (g) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.22), kit.mat.plastic(0xf472b6));
      g.add(b);
    } },
    { key: 'pencil', name: 'Wood pencil', short: 'Wood', emoji: '✏️', conducts: false, dx: 0, dz: -0.34, build: (g) => {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.48, 6), kit.mat.plastic(0xfacc15));
      body.rotation.z = Math.PI / 2;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 6), kit.mat.wood());
      tip.rotation.z = -Math.PI / 2;
      tip.position.x = 0.3;
      g.add(body, tip);
    } },
    { key: 'pspoon', name: 'Plastic spoon', short: 'Plastic', emoji: '🟣', conducts: false, dx: 0.72, dz: -0.34, build: (g) => addSpoon(g, kit.mat.plastic(0xfb7185)) },
  ];

  const gapToken = { seq: 0 };
  let occupant = null;
  const things = thingSpecs.map((spec) => {
    const group = new THREE.Group();
    spec.build(group);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.42, 0.48), ghost);
    group.add(hit);
    const tag = kit.label(spec.short, { size: 0.18, border: spec.conducts ? '#fde047' : '#38bdf8' });
    tag.position.y = 0.42;
    group.add(tag);
    const home = v(SHELF.x + spec.dx, 0.98, SHELF.z + spec.dz);
    group.position.copy(home);
    root.add(group);
    const it = { ...spec, mesh: group, tag, home, seq: 0, where: 'shelf' };
    kit.onTap(group, () => onThingTap(it));
    return it;
  });
  sign('Test stuff', SHELF.x, 2.15, SHELF.z, { size: 0.24 });

  function goHome(it) {
    const s = claim(it);
    if (occupant === it) {
      occupant = null;
      claim(gapToken);
    }
    it.where = 'moving';
    const from = it.mesh.position.clone();
    const to = it.home.clone();
    refreshCircuit();
    return glide(it, s, 420, (k) => {
      it.mesh.position.lerpVectors(from, to, k);
      it.mesh.position.y += Math.sin(k * Math.PI) * 0.35;
    }, 'inOut').then((ok) => {
      if (!ok) return false;
      it.mesh.position.copy(to);
      it.mesh.rotation.set(0, 0, 0);
      it.where = 'shelf';
      it.tag.setText(it.short);
      refreshCircuit();
      return true;
    });
  }

  function putInGap(it) {
    if (occupant === it && it.where === 'gap') return;
    const gSeq = claim(gapToken);
    const prev = occupant;
    occupant = it;
    it.where = 'moving';
    if (prev && prev !== it) goHome(prev);
    const s = claim(it);
    const from = it.mesh.position.clone();
    const to = gapSpot.clone();
    return glide(it, s, 520, (k) => {
      it.mesh.position.lerpVectors(from, to, k);
      it.mesh.position.y += Math.sin(k * Math.PI) * 0.5;
    }, 'inOut').then((ok) => {
      if (!ok || gapToken.seq !== gSeq) return false;
      it.mesh.position.copy(to);
      it.where = 'gap';
      occupant = it;
      it.tag.setText(it.conducts ? `${it.short}: LETS FLOW` : `${it.short}: BLOCKS`);
      kit.sfx(it.conducts ? 'zap' : 'thud');
      refreshCircuit();
      if (testArmed && !testSent) {
        tested.add(it.key);
        if (testRead) testRead.set(`${tested.size} of 6`);
        gapTag.setText(`Tested ${tested.size}/6`);
        if (tested.size >= 6) {
          testSent = true;
          kit.emit('allTested');
          kit.sfx('chime');
          kit.vespa?.react('happy');
        }
      }
      return true;
    });
  }

  function onThingTap(it) {
    if (mode !== 'test') {
      kit.sfx('click');
      kit.vespa?.react('think');
      return;
    }
    putInGap(it);
  }

  // ---------- flashlight ----------
  const flash = { seq: 0, on: false, btn: null, btnHome: 0.42, lensMat: null, beam: null, group: null };
  {
    const g = new THREE.Group();
    g.position.set(FLASH_P.x, TABLE, FLASH_P.z);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.95, 20), kit.mat.plastic(0xf59e0b));
    body.rotation.z = Math.PI / 2;
    body.position.y = 0.28;
    body.castShadow = true;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.2, 0.32, 20), kit.mat.metal(0x334155));
    head.rotation.z = Math.PI / 2;
    head.position.set(0.58, 0.28, 0);
    const lensMat = kit.mat.glow(0xfff6d0, 0.04);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.2, 20), lensMat);
    lens.rotation.y = Math.PI / 2;
    lens.position.set(0.75, 0.28, 0);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.05, 16, 1, true), beamMat);
    beam.rotation.z = -Math.PI / 2;
    beam.position.set(1.35, 0.28, 0);
    beam.visible = false;
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12), kit.mat.plastic(0x111827));
    btn.position.set(-0.05, 0.42, 0);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.6, 0.6), ghost);
    hit.position.set(0.2, 0.28, 0);
    g.add(body, head, lens, beam, btn, hit);
    root.add(g);
    flash.group = g;
    flash.btn = btn;
    flash.lensMat = lensMat;
    flash.beam = beam;
    flash.beamMat = beamMat;
    kit.onTap(g, () => setFlash(!flash.on));
    sign('Flashlight', FLASH_P.x, 2.15, FLASH_P.z, { size: 0.26 });
  }

  function setFlash(on) {
    const s = claim(flash);
    const y0 = flash.btn.position.y;
    return glide(flash, s, 180, (k) => {
      flash.btn.position.y = y0 - Math.sin(k * Math.PI) * 0.04;
    }).then((ok) => {
      if (!ok) return false;
      flash.on = on;
      flash.btn.position.y = flash.btnHome;
      flash.lensMat.emissiveIntensity = on ? 2.5 : 0.04;
      flash.beam.visible = on;
      kit.sfx('click');
      return true;
    });
  }

  function turnOffFlash() {
    claim(flash);
    flash.on = false;
    if (flash.btn) flash.btn.position.y = flash.btnHome;
    if (flash.lensMat) flash.lensMat.emissiveIntensity = 0.04;
    if (flash.beam) flash.beam.visible = false;
  }

  // ---------- look inside a wire ----------
  const lid = { seq: 0, mesh: null };
  const copperMat = kit.mat.metal(0xb87333);
  {
    const g = new THREE.Group();
    g.position.set(LAB_P.x, TABLE + 0.08, LAB_P.z);
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.16, 0.42), kit.mat.plastic(0xb91c1c));
    bottom.position.y = 0.1;
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.16, 0.42), kit.mat.plastic(0xef4444));
    top.position.y = 0.26;
    const copper = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.25, 16), copperMat);
    copper.rotation.z = Math.PI / 2;
    copper.position.y = 0.18;
    g.add(bottom, top, copper);
    root.add(g);
    lid.mesh = top;
    sign('A wire', LAB_P.x, 2.05, LAB_P.z, { size: 0.26 });
  }
  const wireSign = sign('Closed coat', LAB_P.x, 1.55, LAB_P.z + 0.55, { size: 0.2, border: '#f87171' });

  function lookInside() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    wires.forEach(syncWireChrome);
    const s = claim(lid);
    const y0 = lid.mesh.position.y;
    const y1 = 0.78;
    return glide(lid, s, 700, (k) => {
      lid.mesh.position.y = y0 + (y1 - y0) * k;
    }, 'out').then((ok) => {
      if (!ok) return false;
      lid.mesh.position.y = y1;
      copperMat.emissive = new THREE.Color(0xffb347);
      copperMat.emissiveIntensity = 0.7;
      wireSign.setText('Copper inside. Plastic coat.');
      return true;
    });
  }

  function closeLid() {
    claim(lid);
    if (lid.mesh) lid.mesh.position.y = 0.26;
    copperMat.emissive.setHex(0x000000);
    copperMat.emissiveIntensity = 0;
    if (wireSign) wireSign.setText('Closed coat');
  }

  // ---------- hot pan ----------
  const heat = { seq: 0, level: 0 };
  const metalSegs = [];
  let soupMat = null;
  let metalTag = null;
  let woodTag = null;
  {
    const stove = new THREE.Group();
    stove.position.set(STOVE_P.x, 0, STOVE_P.z);
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 1.15), kit.mat.metal(0x334155));
    box.position.y = 0.35;
    box.castShadow = box.receiveShadow = true;
    const burner = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 10, 24), kit.mat.glow(0xff5a1f, 0.45));
    burner.rotation.x = Math.PI / 2;
    burner.position.y = 0.72;
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.34, 0.42, 24), kit.mat.metal(0x1f2937));
    pot.position.y = 1.0;
    pot.castShadow = true;
    soupMat = kit.mat.glow(0xf97316, 0.25);
    const soup = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 24), soupMat);
    soup.position.y = 1.18;
    stove.add(box, burner, pot, soup);
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), kit.mat.metal(0xd6d3d1));
    bowl.scale.y = 0.45;
    bowl.position.set(-0.16, 1.05, 0.08);
    stove.add(bowl);
    metalSegs.push(bowl);
    for (let i = 0; i < 5; i++) {
      const mat = kit.mat.metal(0xd6d3d1);
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.05), mat);
      seg.position.set(-0.16, 1.22 + i * 0.15, 0.02);
      stove.add(seg);
      metalSegs.push(seg);
    }
    const woodMat = kit.mat.wood();
    const wHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.78, 0.06), woodMat);
    wHandle.position.set(0.2, 1.5, 0.02);
    const wBowl = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), woodMat);
    wBowl.scale.y = 0.45;
    wBowl.position.set(0.2, 1.05, 0.08);
    stove.add(wHandle, wBowl);
    root.add(stove);
    metalTag = kit.label('Metal spoon', { size: 0.18, border: '#f59e0b' });
    metalTag.position.set(STOVE_P.x - 0.16, 2.15, STOVE_P.z);
    woodTag = kit.label('Wood spoon', { size: 0.18, border: '#d6d3d1' });
    woodTag.position.set(STOVE_P.x + 0.22, 2.15, STOVE_P.z);
    root.add(metalTag, woodTag);
    sign('Hot pan', STOVE_P.x, 2.55, STOVE_P.z, { size: 0.26, border: '#fb923c' });
    updaters.push((dt, t) => {
      burner.material.emissiveIntensity = 0.35 + Math.sin(t * 4) * 0.15 + heat.level * 0.4;
    });
  }

  function paintSpoons() {
    const n = metalSegs.length;
    metalSegs.forEach((seg, i) => {
      const start = i / n;
      const h = Math.max(0, Math.min(1, (heat.level - start) / 0.34));
      seg.material.color.setHex(h > 0.2 ? 0xff8a3d : 0xd6d3d1);
      seg.material.emissive.setHex(0xff5a1f);
      seg.material.emissiveIntensity = h * 1.15;
    });
    if (soupMat) soupMat.emissiveIntensity = 0.25 + heat.level * 0.7;
  }

  function heatSpoons() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    wires.forEach(syncWireChrome);
    const s = claim(heat);
    const from = heat.level;
    return glide(heat, s, 2200, (k) => {
      heat.level = from + (1 - from) * k;
      paintSpoons();
    }, 'inOut').then((ok) => {
      if (!ok) return false;
      heat.level = 1;
      paintSpoons();
      metalTag.setText('Metal: hot');
      woodTag.setText('Wood: cooler');
      kit.sfx('whoosh');
      return true;
    });
  }

  function resetHeat() {
    claim(heat);
    heat.level = 0;
    paintSpoons();
    if (metalTag) metalTag.setText('Metal spoon');
    if (woodTag) woodTag.setText('Wood spoon');
  }

  // ---------- flow dots and heat shimmer ----------
  const loopKeys = ['batPlus', 'bulbIn', 'bulbOut', 'switchIn', 'switchOut', 'gapLeft', 'gapRight', 'batMinus', 'batPlus'];
  const loopPts = loopKeys.map((k) => P[k]);
  const loopSeg = [];
  let loopTotal = 0;
  for (let i = 0; i < loopPts.length - 1; i++) {
    const len = loopPts[i].distanceTo(loopPts[i + 1]);
    loopSeg.push(len);
    loopTotal += len;
  }
  const dots = [];
  for (let i = 0; i < 8; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), kit.mat.glow(0xfde047, 1.5));
    m.visible = false;
    root.add(m);
    dots.push(m);
  }
  const wisps = [];
  for (let i = 0; i < 8; i++) {
    const mat = kit.mat.glow(0xffb347, 0.55);
    mat.transparent = true;
    mat.depthWrite = false;
    mat.opacity = 0.7;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), mat);
    m.visible = false;
    root.add(m);
    wisps.push({ mesh: m, seed: i });
  }
  let flowU = 0;

  function pointOnLoop(u) {
    let d = (u % 1) * loopTotal;
    for (let i = 0; i < loopSeg.length; i++) {
      if (d <= loopSeg[i] || i === loopSeg.length - 1) {
        const t = loopSeg[i] ? Math.min(1, d / loopSeg[i]) : 0;
        return loopPts[i].clone().lerp(loopPts[i + 1], t);
      }
      d -= loopSeg[i];
    }
    return loopPts[0].clone();
  }

  // ---------- circuit state ----------
  let mode = 'idle';
  let bulbLit = false;
  let wasLit = false;
  let showHeat = false;
  let warmth = 0;
  let litArmed = false;
  let litSent = false;
  let switchArmed = false;
  let switchSent = false;
  let sawOff = false;
  let sawOn = false;
  let testArmed = false;
  let testSent = false;
  const tested = new Set();
  let bulbRead = null;
  let testRead = null;
  let swRead = null;

  function disarm() {
    litArmed = false;
    switchArmed = false;
    testArmed = false;
  }

  function syncBridge() {
    bridgeMesh.visible = !occupant;
  }

  function refreshCircuit() {
    const wiresOn = wires.every((w) => w.connected);
    const gapOn = !!bridge.on || !!(occupant && occupant.where === 'gap' && occupant.conducts);
    const closed = wiresOn && sw.closed && gapOn;
    if (closed !== wasLit) {
      wasLit = closed;
      kit.sfx(closed ? 'zap' : 'click');
    }
    bulbLit = closed;
    if (bulbRead) bulbRead.set(closed ? 'ON' : 'OFF');
    status.setText(closed ? 'Bulb ON' : 'Bulb OFF');
    wires.forEach(syncWireChrome);
    syncBridge();
    sw.contact.visible = sw.closed;
    if (closed && litArmed && !litSent) {
      litSent = true;
      kit.emit('lit');
      kit.sfx('chime');
      kit.vespa?.react('wow');
    }
  }

  function noteSwitch(closed) {
    if (!switchArmed || switchSent) return;
    const ready = wires.every((w) => w.connected) && bridge.on && !occupant;
    if (!ready) return;
    if (closed) sawOn = true;
    else sawOff = true;
    if (swRead) swRead.set(closed ? 'Closed' : 'Open');
    if (sawOff && sawOn) {
      switchSent = true;
      kit.emit('switched');
      kit.sfx('chime');
      kit.vespa?.react('wow');
    }
  }

  function setSwitch(closed, fromUser) {
    const s = claim(sw);
    sw.closed = closed;
    sw.contact.visible = closed;
    if (fromUser) noteSwitch(closed);
    refreshCircuit();
    const a0 = sw.pivot.rotation.x;
    const a1 = closed ? 0 : -1.15;
    return glide(sw, s, 280, (k) => {
      sw.pivot.rotation.x = a0 + (a1 - a0) * k;
    }).then((ok) => {
      if (!ok) return false;
      sw.pivot.rotation.x = a1;
      sw.contact.visible = closed;
      if (fromUser) kit.sfx('click');
      return true;
    });
  }

  function onSwitchTap() {
    if (mode !== 'switch') {
      kit.sfx('click');
      kit.vespa?.react('think');
      return;
    }
    setSwitch(!sw.closed, true);
  }

  function setBridge(on) {
    const s = claim(bridge);
    bridge.on = on;
    refreshCircuit();
    const y0 = bridgeMesh.position.y;
    const y1 = on ? Y : Y + 0.48;
    return glide(bridge, s, 420, (k) => {
      bridgeMesh.position.y = y0 + (y1 - y0) * k;
    }, 'inOut').then((ok) => {
      if (!ok) return false;
      bridgeMesh.position.y = y1;
      refreshCircuit();
      return true;
    });
  }

  function ensureLoop(bridgeOn) {
    litArmed = false;
    const jobs = wires.map((w) => glideWire(w, true));
    jobs.push(setSwitch(true, false));
    jobs.push(setBridge(bridgeOn));
    if (occupant) jobs.push(goHome(occupant));
    return Promise.all(jobs).then(() => refreshCircuit());
  }

  async function openGap() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    await ensureLoop(true);
    await setBridge(false);
    gapTag.setText('Gap');
  }

  function closeGap() {
    const job = occupant ? goHome(occupant) : Promise.resolve();
    return job.then(() => setBridge(true));
  }

  function oneWire() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    const jobs = [
      setSwitch(true, false),
      setBridge(true),
      glideWire(wires[0], true),
      glideWire(wires[1], false),
      glideWire(wires[2], false),
    ];
    if (occupant) jobs.push(goHome(occupant));
    return Promise.all(jobs);
  }

  function reset() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    showHeat = false;
    resetHeat();
    closeLid();
    turnOffFlash();
    const jobs = wires.map((w) => glideWire(w, false));
    jobs.push(setSwitch(true, false));
    jobs.push(setBridge(true));
    const toHome = new Set();
    if (occupant) toHome.add(occupant);
    things.forEach((it) => {
      if (it.where !== 'shelf') toHome.add(it);
    });
    toHome.forEach((it) => jobs.push(goHome(it)));
    return Promise.all(jobs).then(() => {
      gapTag.setText('Gap');
      refreshCircuit();
    });
  }

  function wireMode() {
    mode = 'wires';
    disarm();
    litSent = false;
    litArmed = true;
    kit.ui.clear();
    bulbRead = kit.ui.readout('Bulb');
    kit.ui.buttons([{ label: 'Snap all wires', emoji: '🔌', onClick: () => snapAll() }]);
    wires.forEach(syncWireChrome);
    refreshCircuit();
  }

  async function switchMode() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    await ensureLoop(true);
    sawOff = false;
    sawOn = false;
    switchSent = false;
    mode = 'switch';
    switchArmed = true;
    sw.tag.setText('Switch');
    kit.ui.clear();
    swRead = kit.ui.readout('Switch');
    swRead.set(sw.closed ? 'Closed' : 'Open');
    kit.ui.buttons([{ label: 'Flip switch', emoji: '🎚️', onClick: () => onSwitchTap() }]);
  }

  async function testMode() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    await ensureLoop(false);
    tested.clear();
    testSent = false;
    mode = 'test';
    testArmed = true;
    gapTag.setText('Test gap');
    testRead = kit.ui.readout('Tested');
    testRead.set('0 of 6');
    kit.ui.buttons(things.map((it) => ({
      label: it.short,
      emoji: it.emoji,
      onClick: () => putInGap(it),
    })));
  }

  async function warmBulb() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    wires.forEach(syncWireChrome);
    const ready = wires.every((w) => w.connected) && sw.closed && bridge.on && !occupant;
    if (!ready) await ensureLoop(true);
    showHeat = true;
  }

  function idle() {
    mode = 'idle';
    disarm();
    kit.ui.clear();
    wires.forEach(syncWireChrome);
    showHeat = false;
    claim(sw);
    claim(bridge);
    claim(gapToken);
    things.forEach((it) => {
      claim(it);
      if (it.where === 'moving') {
        it.mesh.position.copy(it.home);
        it.mesh.rotation.set(0, 0, 0);
        it.where = 'shelf';
        it.tag.setText(it.short);
      }
    });
    if (occupant && occupant.where !== 'gap') occupant = null;
    resetHeat();
    closeLid();
    turnOffFlash();
    refreshCircuit();
  }

  updaters.push((dt, t) => {
    const goal = bulbLit && showHeat ? 1 : 0;
    warmth += (goal - warmth) * Math.min(1, dt * 1.8);
    glowMat.emissiveIntensity = bulbLit ? 1.6 + warmth * 1.4 : 0.03;
    glassMat.emissiveIntensity = bulbLit ? 0.25 + warmth * 0.9 : 0;
    bulbLight.intensity = bulbLit ? 1.3 + warmth * 1.4 : 0;
    dots.forEach((d, i) => {
      d.visible = bulbLit;
      if (!bulbLit) return;
      const p = pointOnLoop(flowU + i / dots.length);
      d.position.copy(p);
      d.position.y += 0.08;
    });
    if (bulbLit) flowU += dt * 0.16;
    wisps.forEach((w) => {
      w.mesh.visible = warmth > 0.08;
      if (!w.mesh.visible) return;
      const u = (t * 0.35 + w.seed * 0.13) % 1;
      w.mesh.position.set(0.05 + Math.sin(w.seed * 2) * 0.08, 1.45 + u * 0.55, -0.75);
      w.mesh.material.opacity = (1 - u) * warmth;
    });
    if (flash.on && flash.beamMat) {
      flash.beamMat.opacity = 0.12 + Math.sin(t * 6) * 0.04;
    }
  });

  refreshCircuit();

  const cues = {
    flashOn: () => setFlash(true),
    flashOff: () => setFlash(false),
    oneWire,
    reset,
    wireMode,
    openGap,
    closeGap,
    switchMode,
    warmBulb,
    testMode,
    lookInside,
    heatSpoons,
    idle,
  };

  return {
    root,
    shots: {
      wide: { pos: [0.15, 5.5, 12.0], look: [0.0, 1.05, -0.35] },
      flash: { pos: [FLASH_P.x, 2.15, FLASH_P.z + 2.5], look: [FLASH_P.x, 1.15, FLASH_P.z] },
      board: { pos: [-0.1, 3.9, 5.15], look: [-0.15, 1.15, 0.15] },
      gap: { pos: [0.1, 2.55, 3.35], look: [0, 1.1, 0.9] },
      switch: { pos: [2.55, 2.35, 1.85], look: [1.45, 1.15, 0.05] },
      bulb: { pos: [0.15, 2.25, 1.55], look: [0.05, 1.4, -0.75] },
      inside: { pos: [LAB_P.x, 2.35, LAB_P.z + 2.5], look: [LAB_P.x, 1.15, LAB_P.z] },
      stove: { pos: [STOVE_P.x - 0.2, 2.55, STOVE_P.z + 2.7], look: [STOVE_P.x, 1.25, STOVE_P.z] },
    },
    points: {
      flashlight: [FLASH_P.x, 1.4, FLASH_P.z],
      battery: [-1.45, 1.5, -0.05],
      bulb: [0.05, 1.6, -0.75],
      wires: [0.05, 1.45, 1.34],
      gap: [0, 1.45, 0.95],
      switch: [1.45, 1.5, 0.05],
      inside: [LAB_P.x, 1.45, LAB_P.z],
      stove: [STOVE_P.x, 1.5, STOVE_P.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
