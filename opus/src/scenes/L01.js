// Lesson 1 scene: the Bayou Lab. Sink or float tank, scale, magnet, and a particle box for states of matter.
// Gold-standard example for all other scenes: stations, shots, points, cues, tasks via kit.emit.

const TANK = { w: 3.2, d: 1.5, floor: 0.32, top: 1.72 };
const SHELF = { x: -3.6, y: 1.05, z: 0.4 };
const SCALE = { x: 3.5, z: 0.5, top: 0.98 };
const STATES = { x: 0, z: -3.6 };

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  let mode = 'idle'; // idle | drop | weigh | magnet

  // ---------------- tank of bayou water ----------------
  const tank = new THREE.Group();
  root.add(tank);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(TANK.w + 0.5, 0.3, TANK.d + 0.5), kit.mat.metal(0x2a3140));
  stand.position.y = 0.15;
  stand.receiveShadow = stand.castShadow = true;
  tank.add(stand);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(TANK.w + 0.12, 1.9, TANK.d + 0.12), kit.mat.glass());
  glass.position.y = 0.3 + 0.95;
  tank.add(glass);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 }));
  edges.position.copy(glass.position);
  tank.add(edges);
  const waterH = TANK.top - TANK.floor;
  const water = new THREE.Mesh(new THREE.BoxGeometry(TANK.w, waterH, TANK.d), kit.mat.water(0x2f7f6f));
  water.position.y = TANK.floor + waterH / 2;
  tank.add(water);
  const surface = new THREE.Mesh(new THREE.PlaneGeometry(TANK.w, TANK.d, 32, 16), new THREE.MeshPhysicalMaterial({ color: 0x5fd4c0, transparent: true, opacity: 0.55, roughness: 0.05, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }));
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = TANK.top;
  tank.add(surface);
  const gravel = new THREE.Mesh(new THREE.BoxGeometry(TANK.w, 0.06, TANK.d), kit.mat.rock('#5b5146'));
  gravel.position.y = TANK.floor - 0.01;
  tank.add(gravel);
  const tankSign = kit.label('Bayou Water Tank', { size: 0.32 });
  tankSign.position.set(0, 2.55, 0);
  root.add(tankSign);
  // gentle waves on the water surface
  const sp = surface.geometry.attributes.position;
  updaters.push((dt, t) => {
    for (let i = 0; i < sp.count; i++) sp.setZ(i, Math.sin(sp.getX(i) * 3 + t * 2) * 0.012 + Math.cos(sp.getY(i) * 4 + t * 1.6) * 0.01);
    sp.needsUpdate = true;
  });

  // ---------------- shelf with four things ----------------
  const shelf = new THREE.Group();
  shelf.position.set(SHELF.x, 0, SHELF.z);
  root.add(shelf);
  const plank = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 1.1), kit.mat.wood('#7a4a22'));
  plank.position.y = SHELF.y - 0.06;
  plank.castShadow = plank.receiveShadow = true;
  shelf.add(plank);
  [-1.35, 1.35].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, SHELF.y - 0.12, 0.9), kit.mat.wood('#5a3416'));
    leg.position.set(x, (SHELF.y - 0.12) / 2, 0);
    leg.castShadow = true;
    shelf.add(leg);
  });
  const shelfSign = kit.label('Things from the bayou', { size: 0.28 });
  shelfSign.position.set(SHELF.x, 2.25, SHELF.z);
  root.add(shelfSign);

  const items = {
    log: { name: 'Big log', grams: 900, floats: true, magnetic: false, floatDepth: 0.16, half: 0.28, slot: -1.05, shelfX: -0.95, tagY: 0.62 },
    pebble: { name: 'Tiny pebble', grams: 30, floats: false, magnetic: false, half: 0.11, slot: -0.25, shelfX: -0.05, tagY: 0.32 },
    nail: { name: 'Iron nail', grams: 10, floats: false, magnetic: true, half: 0.04, slot: 0.45, shelfX: 0.5, tagY: 0.62 },
    noodle: { name: 'Pool noodle', grams: 40, floats: true, magnetic: false, floatDepth: 0.05, half: 0.16, slot: 1.1, shelfX: 1.15, tagY: 0.36 },
  };

  // Big log: bark sides, light rings on the ends.
  {
    const rings = kit.tex.canvas(256, 256, (c, w) => {
      c.fillStyle = '#d9b27c';
      c.fillRect(0, 0, w, w);
      for (let r = 120; r > 4; r -= 9) {
        c.strokeStyle = `rgba(120,70,30,${0.25 + Math.random() * 0.3})`;
        c.lineWidth = 3;
        c.beginPath();
        c.arc(128 + Math.random() * 3, 128, r, 0, Math.PI * 2);
        c.stroke();
      }
    });
    const bark = kit.mat.wood('#5b3a1e');
    const end = new THREE.MeshStandardMaterial({ map: rings, roughness: 0.8 });
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 1.2, 28, 1), [bark, end, end]);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    g.add(body);
    const stub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.28, 10), bark);
    stub.position.set(0.2, 0.28, 0);
    stub.rotation.z = -0.5;
    g.add(stub);
    items.log.mesh = g;
  }
  // Tiny pebble: lumpy rock.
  {
    const geo = new THREE.IcosahedronGeometry(0.12, 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const k = 0.85 + Math.random() * 0.25;
      p.setXYZ(i, p.getX(i) * k * 1.2, p.getY(i) * k * 0.8, p.getZ(i) * k);
    }
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, kit.mat.rock('#8d8a84'));
    m.castShadow = true;
    items.pebble.mesh = m;
  }
  // Iron nail.
  {
    const g = new THREE.Group();
    const iron = kit.mat.metal(0x6b7280);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.46, 12), iron);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.025, 20), iron);
    head.position.y = 0.23;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.08, 12), iron);
    tip.position.y = -0.27;
    tip.rotation.x = Math.PI;
    g.add(shaft, head, tip);
    g.rotation.z = Math.PI / 2;
    g.traverse((o) => (o.castShadow = true));
    const wrap = new THREE.Group();
    wrap.add(g);
    items.nail.mesh = wrap;
  }
  // Pool noodle: hollow foam tube.
  {
    const pts = [new THREE.Vector2(0.06, -0.35), new THREE.Vector2(0.16, -0.35), new THREE.Vector2(0.16, 0.35), new THREE.Vector2(0.06, 0.35), new THREE.Vector2(0.06, -0.35)];
    const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), new THREE.MeshStandardMaterial({ color: 0x22e07a, roughness: 0.9, side: THREE.DoubleSide }));
    m.rotation.z = Math.PI / 2;
    m.castShadow = true;
    const wrap = new THREE.Group();
    wrap.add(m);
    items.noodle.mesh = wrap;
  }

  const shelfPos = (it) => new THREE.Vector3(SHELF.x + it.shelfX, SHELF.y + it.half, SHELF.z);
  for (const [key, it] of Object.entries(items)) {
    it.key = key;
    it.where = 'shelf';
    it.mesh.position.copy(shelfPos(it));
    root.add(it.mesh);
    it.tag = kit.label(it.name, { size: 0.2 });
    it.tag.position.set(0, it.tagY, 0);
    it.mesh.add(it.tag);
    kit.onTap(it.mesh, () => onItemTap(it));
  }

  // ---------------- splash + ripple effects ----------------
  function splash(x) {
    kit.sfx('splash');
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.16, 40), new THREE.MeshBasicMaterial({ color: 0xbff9ff, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, TANK.top + 0.01, 0);
    root.add(ring);
    kit.animate(900, (k) => {
      ring.scale.setScalar(1 + k * 5);
      ring.material.opacity = 0.9 * (1 - k);
    }).then(() => {
      root.remove(ring);
      ring.geometry.dispose();
      ring.material.dispose();
    });
    const drops = kit.particles(40, { size: 0.07, color: 0xbff9ff, spread: 0.2 });
    drops.position.set(x, TANK.top, 0);
    root.add(drops);
    const vel = [];
    for (let i = 0; i < 40; i++) vel.push(new THREE.Vector3((Math.random() - 0.5) * 2, 1.5 + Math.random() * 2, (Math.random() - 0.5) * 1.2));
    kit.animate(800, (k) => {
      for (let i = 0; i < 40; i++) {
        const t = k * 0.8;
        drops.positions[i * 3] = vel[i].x * t;
        drops.positions[i * 3 + 1] = vel[i].y * t - 4.9 * t * t;
        drops.positions[i * 3 + 2] = vel[i].z * t;
      }
      drops.commit();
      drops.material.opacity = 1 - k;
    }).then(() => {
      root.remove(drops);
      drops.geometry.dispose();
      drops.material.dispose();
    });
  }

  // ---------------- drop into the tank ----------------
  const bobbing = new Set();
  updaters.push((dt, t) => {
    for (const it of bobbing) {
      it.mesh.position.y = TANK.top - it.floatDepth + Math.sin(t * 2 + it.slot * 3) * 0.025;
      it.mesh.rotation.z = Math.sin(t * 1.3 + it.slot) * 0.04;
    }
  });

  // Each new motion claims the item; an older motion still running stops where it is.
  // Without this, a fast reset during a drop leaves the item stuck and untappable.
  const claim = (it) => (it.seq = (it.seq || 0) + 1);
  const glide = (it, s, ms, fn, ease) => kit.animate(ms, (k) => it.seq === s && fn(k), ease).then(() => it.seq === s);
  const glideY = (it, s, y, ms, ease) => {
    const y0 = it.mesh.position.y;
    return glide(it, s, ms, (k) => (it.mesh.position.y = y0 + (y - y0) * k), ease);
  };

  async function drop(it) {
    if (it.where === 'tank' || it.busy) return;
    const s = claim(it);
    it.busy = true;
    bobbing.delete(it);
    const from = it.mesh.position.clone();
    const to = new THREE.Vector3(it.slot, TANK.top + 0.9, 0);
    kit.sfx('whoosh');
    const arc = (k) => {
      it.mesh.position.lerpVectors(from, to, k);
      it.mesh.position.y += Math.sin(k * Math.PI) * 0.9;
    };
    if (!(await glide(it, s, 700, arc, 'inOut'))) return;
    // fall to the water
    if (!(await glideY(it, s, TANK.top + it.half * 0.3, 260, 'in'))) return;
    splash(it.slot);
    if (it.floats) {
      if (!(await glideY(it, s, TANK.top - it.floatDepth - 0.18, 260, 'out'))) return;
      if (!(await glideY(it, s, TANK.top - it.floatDepth, 600, 'back'))) return;
      bobbing.add(it);
      kit.sfx('bubble');
    } else {
      if (!(await glideY(it, s, TANK.floor + it.half + 0.02, 1300, 'out'))) return;
      kit.sfx('thud');
    }
    it.where = 'tank';
    it.busy = false;
    it.tag.setText(`${it.name}: ${it.floats ? 'FLOATS' : 'SINKS'}`);
    if (Object.values(items).every((x) => x.where === 'tank')) kit.emit('allDropped');
    if (it.key === 'log') kit.emit('logDropped');
  }

  async function backToShelf(it) {
    const s = claim(it);
    bobbing.delete(it);
    it.busy = true;
    const from = it.mesh.position.clone();
    const to = shelfPos(it);
    const arc = (k) => {
      it.mesh.position.lerpVectors(from, to, k);
      it.mesh.position.y += Math.sin(k * Math.PI) * 0.8;
    };
    if (!(await glide(it, s, 700, arc, 'inOut'))) return;
    it.mesh.rotation.set(0, 0, 0);
    it.where = 'shelf';
    it.busy = false;
    it.tag.setText(it.name);
  }

  // ---------------- digital scale ----------------
  const scale = new THREE.Group();
  scale.position.set(SCALE.x, 0, SCALE.z);
  root.add(scale);
  const sBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.8, 1.2), kit.mat.metal(0x334155));
  sBase.position.y = 0.4;
  sBase.castShadow = sBase.receiveShadow = true;
  scale.add(sBase);
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.06, 40), kit.mat.metal(0xd1d5db));
  plate.position.y = 0.86;
  plate.castShadow = plate.receiveShadow = true;
  scale.add(plate);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.3), kit.mat.glow(0x0c2a22, 0.6));
  screen.position.set(0, 0.45, 0.61);
  scale.add(screen);
  const readout = kit.label('0 g', { size: 0.36, color: '#34d399', border: '#34d399' });
  readout.position.set(SCALE.x, 2.0, SCALE.z);
  root.add(readout);
  const scaleSign = kit.label('Scale (grams)', { size: 0.24 });
  scaleSign.position.set(SCALE.x, 2.45, SCALE.z);
  root.add(scaleSign);
  let onScale = null;
  const weighed = new Set();

  async function weigh(it) {
    if (it.busy) return;
    if (onScale && onScale !== it) backToShelf(onScale);
    const s = claim(it);
    bobbing.delete(it);
    it.busy = true;
    const from = it.mesh.position.clone();
    const to = new THREE.Vector3(SCALE.x, SCALE.top + it.half, SCALE.z);
    const arc = (k) => {
      it.mesh.position.lerpVectors(from, to, k);
      it.mesh.position.y += Math.sin(k * Math.PI) * 1.0;
    };
    if (!(await glide(it, s, 800, arc, 'inOut'))) return;
    it.mesh.rotation.set(0, 0, 0);
    it.where = 'scale';
    it.busy = false;
    onScale = it;
    kit.sfx('clank');
    plate.position.y = 0.84;
    kit.tween(plate, { 'position.y': 0.86 }, 400, 'back');
    let shown = 0;
    await kit.animate(600, (k) => {
      const v = Math.round(it.grams * k);
      if (v !== shown) readout.setText(`${(shown = v)} g`);
    });
    readout.setText(`${it.name}: ${it.grams} g`);
    kit.sfx('tick');
    weighed.add(it.key);
    if (weighed.size === 4) kit.emit('allWeighed');
    if (weighed.has('log') && weighed.has('pebble')) kit.emit('logPebbleWeighed');
  }

  // ---------------- horseshoe magnet ----------------
  const magnet = new THREE.Group();
  {
    const red = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.3, roughness: 0.35 });
    const silver = kit.mat.metal(0xe5e7eb);
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.09, 16, 32, Math.PI), red);
    arc.position.y = 0.35;
    magnet.add(arc);
    [-0.28, 0.28].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.18), red);
      leg.position.set(x, 0.175, 0);
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.12, 0.19), silver);
      tip.position.set(x, -0.04, 0);
      magnet.add(leg, tip);
    });
    magnet.traverse((o) => (o.castShadow = true));
    const field = kit.particles(60, { size: 0.06, color: 0xff6b8b, spread: 0.6 });
    field.position.y = -0.2;
    magnet.add(field);
    magnet.field = field;
    const tag = kit.label('Magnet: drag me!', { size: 0.2, border: '#f43f5e' });
    tag.position.y = 0.85;
    magnet.add(tag);
    magnet.tag = tag;
  }
  magnet.position.set(SHELF.x - 0.2, 2.1, SHELF.z + 1.2);
  magnet.visible = false;
  root.add(magnet);
  let stuck = null;
  updaters.push((dt, t) => {
    if (!magnet.visible) return;
    magnet.field.rotation.y += dt * 2;
    magnet.field.material.opacity = 0.5 + Math.sin(t * 6) * 0.3;
    if (stuck || mode !== 'magnet') return;
    const nail = items.nail;
    if (nail.where !== 'shelf' || nail.busy) return;
    const d = new THREE.Vector2(magnet.position.x - nail.mesh.position.x, magnet.position.z - nail.mesh.position.z).length();
    if (d < 0.75) grabNail();
  });

  async function grabNail() {
    const nail = items.nail;
    const s = claim(nail);
    nail.busy = true;
    kit.sfx('magnet');
    const from = nail.mesh.position.clone();
    const snap = (k) => {
      const to = magnet.position.clone().add(new THREE.Vector3(0, -0.15, 0));
      nail.mesh.position.lerpVectors(from, to, k * k);
    };
    if (!(await glide(nail, s, 250, snap))) return;
    stuck = nail;
    kit.sfx('clank');
    nail.where = 'magnet';
    nail.tag.setText('Iron nail: STUCK!');
    kit.vespa?.react('wow');
    kit.emit('nailGrabbed');
  }
  updaters.push(() => {
    if (stuck) stuck.mesh.position.copy(magnet.position).add(new THREE.Vector3(0, -0.15, 0));
  });

  kit.onDrag(magnet, {
    plane: 'xz',
    onMove: (p) => {
      magnet.position.x = THREE.MathUtils.clamp(p.x, -6, 6);
      magnet.position.z = THREE.MathUtils.clamp(p.z, -2, 3);
    },
  });

  function releaseNail() {
    if (!stuck) return;
    const it = stuck;
    stuck = null;
    it.busy = false;
    it.where = 'magnet-off';
    return backToShelf(it);
  }

  // ---------------- particle box: solid, liquid, gas ----------------
  // The states station stays hidden until its step, so it never clutters the tank shots.
  const box = new THREE.Group();
  box.position.set(STATES.x, 0, STATES.z);
  box.visible = false;
  root.add(box);
  const BOX = 1.4;
  const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 0.3, 40), kit.mat.metal(0x1f2937));
  burner.position.y = 0.15;
  box.add(burner);
  const heatRing = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 12, 48), kit.mat.glow(0xff5a1f, 0.2));
  heatRing.rotation.x = Math.PI / 2;
  heatRing.position.y = 0.31;
  box.add(heatRing);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(BOX, BOX, BOX), kit.mat.glass(0xe0f7ff));
  cube.position.y = 0.32 + BOX / 2;
  box.add(cube);
  const cubeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry), new THREE.LineBasicMaterial({ color: 0xf59e0b }));
  cubeEdges.position.copy(cube.position);
  box.add(cubeEdges);
  const N = 64;
  const pMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 14, 10), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0b4a6f, roughness: 0.3 }), N);
  box.add(pMesh);
  const P = [];
  for (let i = 0; i < N; i++) {
    const gx = i % 4, gy = Math.floor(i / 16), gz = Math.floor(i / 4) % 4;
    const home = new THREE.Vector3((gx - 1.5) * 0.19, 0.32 + 0.12 + gy * 0.19, (gz - 1.5) * 0.19);
    P.push({ home, pos: home.clone(), vel: new THREE.Vector3().randomDirection().multiplyScalar(0.3) });
  }
  // thermometer next to the box
  const thermo = new THREE.Group();
  thermo.position.set(1.25, 0, 0.2);
  box.add(thermo);
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 16), kit.mat.glass());
  tube.position.y = 1.1;
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), kit.mat.glow(0xef4444, 0.8));
  bulb.position.y = 0.3;
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1, 12), kit.mat.glow(0xef4444, 0.8));
  liquid.geometry.translate(0, 0.5, 0);
  liquid.position.y = 0.35;
  thermo.add(tube, bulb, liquid);
  const stateTag = kit.label('Ice (solid)', { size: 0.3, border: '#f59e0b' });
  stateTag.position.set(0, 2.55, 0);
  box.add(stateTag);

  let temp = 10; // degrees Fahrenheit
  const visited = new Set();
  const stateOf = (T) => (T < 32 ? 'solid' : T < 212 ? 'liquid' : 'gas');
  const STATE_TEXT = { solid: 'Ice (solid)', liquid: 'Water (liquid)', gas: 'Steam (gas)' };
  let lastState = 'solid';
  const dummy = new THREE.Object3D();
  updaters.push((dt, t) => {
    const s = stateOf(temp);
    const speed = 0.25 + (temp / 250) * 2.4;
    const lo = 0.32 + 0.09, hi = 0.32 + BOX - 0.09, half = BOX / 2 - 0.09;
    const ceiling = s === 'liquid' ? lo + 0.55 : hi;
    for (let i = 0; i < N; i++) {
      const p = P[i];
      if (s === 'solid') {
        p.pos.lerp(p.home, Math.min(1, dt * 4));
        const j = 0.006 + temp / 2500;
        dummy.position.set(p.pos.x + Math.sin(t * 40 + i) * j, p.pos.y + Math.cos(t * 37 + i * 2) * j, p.pos.z + Math.sin(t * 43 + i * 3) * j);
      } else {
        if (s === 'liquid') p.vel.y -= dt * 1.2;
        p.vel.add(new THREE.Vector3().randomDirection().multiplyScalar(dt * speed * 2));
        p.vel.clampLength(0, speed);
        p.pos.addScaledVector(p.vel, dt);
        if (p.pos.x < -half || p.pos.x > half) (p.vel.x *= -1), (p.pos.x = THREE.MathUtils.clamp(p.pos.x, -half, half));
        if (p.pos.z < -half || p.pos.z > half) (p.vel.z *= -1), (p.pos.z = THREE.MathUtils.clamp(p.pos.z, -half, half));
        if (p.pos.y < lo) (p.vel.y = Math.abs(p.vel.y)), (p.pos.y = lo);
        if (p.pos.y > ceiling) (p.vel.y = -Math.abs(p.vel.y)), (p.pos.y = THREE.MathUtils.lerp(p.pos.y, ceiling, 0.5));
        dummy.position.copy(p.pos);
      }
      dummy.updateMatrix();
      pMesh.setMatrixAt(i, dummy.matrix);
    }
    pMesh.instanceMatrix.needsUpdate = true;
    heatRing.material.emissiveIntensity = 0.1 + (temp / 250) * 2.5;
    liquid.scale.y = 0.05 + (temp / 250) * 1.25;
    if (s !== lastState) {
      lastState = s;
      stateTag.setText(STATE_TEXT[s]);
      kit.sfx(s === 'gas' ? 'whoosh' : 'bubble');
    }
  });

  let tempReadout = null;
  let tempSlider = null;
  let statesArmed = false;
  function setTemp(T) {
    temp = T;
    const c = Math.round(((T - 32) * 5) / 9);
    tempReadout?.set(`${Math.round(T)}°F  (${c}°C)  ·  ${STATE_TEXT[stateOf(T)]}`);
    tempSlider?.setValue(T);
    visited.add(stateOf(T));
    if (statesArmed && visited.size === 3) {
      statesArmed = false;
      kit.emit('allStates');
    }
  }

  // ---------------- zoom bubbles: how tightly packed? ----------------
  const zoom = new THREE.Group();
  zoom.position.set(0, 3.25, 0.4);
  zoom.visible = false;
  root.add(zoom);
  const packs = [
    { name: 'Wood', x: -1.55, gap: 0.135, holes: 0.38, color: 0xd9a066 },
    { name: 'Water', x: 0, gap: 0.115, holes: 0.12, color: 0x38bdf8 },
    { name: 'Rock', x: 1.55, gap: 0.088, holes: 0, color: 0xa8a29e },
  ];
  for (const pk of packs) {
    const g = new THREE.Group();
    g.position.x = pk.x;
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.62, 48), new THREE.MeshBasicMaterial({ color: 0x05080d, transparent: true, opacity: 0.92 }));
    const rim = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.68, 48), new THREE.MeshBasicMaterial({ color: pk.color }));
    g.add(disc, rim);
    const dotGeo = new THREE.CircleGeometry(pk.gap * 0.4, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: pk.color });
    for (let x = -0.6; x <= 0.6; x += pk.gap) {
      for (let y = -0.6; y <= 0.6; y += pk.gap) {
        if (x * x + y * y > 0.5 * 0.5 + 0.04) continue;
        if (Math.random() < pk.holes) continue;
        const d = new THREE.Mesh(dotGeo, dotMat);
        d.position.set(x + (Math.random() - 0.5) * 0.02, y + (Math.random() - 0.5) * 0.02, 0.01);
        g.add(d);
      }
    }
    const tag = kit.label(pk.name, { size: 0.26, border: '#' + pk.color.toString(16).padStart(6, '0') });
    tag.position.y = -0.92;
    g.add(tag);
    zoom.add(g);
  }
  updaters.push(() => {
    if (zoom.visible) zoom.quaternion.copy(kit.stage.camera.quaternion);
  });

  // ---------------- small log piece (cut) ----------------
  const chip = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 24), [kit.mat.wood('#5b3a1e'), new THREE.MeshStandardMaterial({ color: 0xd9b27c }), new THREE.MeshStandardMaterial({ color: 0xd9b27c })]);
  chip.rotation.z = Math.PI / 2;
  chip.visible = false;
  root.add(chip);

  // ---------------- taps on items depend on the mode ----------------
  function onItemTap(it) {
    if (mode === 'drop') drop(it);
    else if (mode === 'weigh') weigh(it);
    else if (mode === 'magnet' && it.key !== 'nail') {
      kit.sfx('click');
      kit.vespa?.react('think');
    }
  }

  async function resetAll() {
    releaseNail();
    onScale = null;
    readout.setText('0 g');
    await Promise.all(Object.values(items).filter((it) => it.where !== 'shelf' || it.busy).map((it) => backToShelf(it)));
  }

  // ---------------- cues used by the lesson script ----------------
  const cues = {
    reset: () => resetAll(),
    dropLog: () => drop(items.log),
    dropPebble: () => drop(items.pebble),
    dropNail: () => drop(items.nail),
    dropNoodle: () => drop(items.noodle),
    dropMode() {
      mode = 'drop';
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Put back', emoji: '↩️', onClick: () => resetAll() }]);
    },
    weighMode() {
      mode = 'weigh';
      kit.ui.clear();
      const rd = kit.ui.readout('Scale');
      rd.set('Tap a thing to weigh it');
      readout.setText('0 g');
    },
    weighLog: () => weigh(items.log),
    weighPebble: () => weigh(items.pebble),
    weighNail: () => weigh(items.nail),
    showMagnet() {
      magnet.visible = true;
      magnet.position.set(SHELF.x - 0.2, 2.1, SHELF.z + 1.2);
      kit.sfx('magnet');
    },
    magnetMode() {
      mode = 'magnet';
      magnet.visible = true;
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Drop the nail', emoji: '🧲', onClick: () => releaseNail() }]);
    },
    async magnetSweep() {
      magnet.visible = true;
      mode = 'magnet';
      await kit.tween(magnet, { 'position.x': SHELF.x - 1.0, 'position.z': SHELF.z, 'position.y': 1.75 }, 700);
      await kit.tween(magnet, { 'position.x': SHELF.x + 1.2 }, 2200, 'linear');
    },
    hideMagnet() {
      releaseNail();
      magnet.visible = false;
      mode = 'idle';
    },
    showPacking() {
      zoom.visible = true;
      zoom.scale.setScalar(0.01);
      kit.sfx('sparkle');
      return kit.tween(zoom, { 'scale.x': 1, 'scale.y': 1, 'scale.z': 1 }, 700, 'back');
    },
    packingSlider() {
      zoom.visible = true;
      zoom.scale.setScalar(0.05);
      kit.ui.clear();
      let done = false;
      kit.ui.slider({
        label: '🔍 Zoom in',
        min: 0.05,
        max: 1,
        step: 0.01,
        value: 0.05,
        onChange: (v) => {
          zoom.scale.setScalar(v);
          if (v > 0.9 && !done) {
            done = true;
            kit.sfx('sparkle');
            kit.emit('zoomed');
          }
        },
      });
    },
    hidePacking() {
      zoom.visible = false;
      kit.ui.clear();
    },
    async cutLog() {
      const log = items.log;
      chip.visible = true;
      chip.position.set(SHELF.x + 0.6, SHELF.y + 0.28, SHELF.z);
      kit.sfx('clank');
      await kit.tween(chip, { 'position.x': SHELF.x + 0.95 }, 300, 'out');
      const from = chip.position.clone();
      const to = new THREE.Vector3(0, TANK.top + 0.8, -0.3);
      await kit.animate(700, (k) => {
        chip.position.lerpVectors(from, to, k);
        chip.position.y += Math.sin(k * Math.PI) * 0.8;
      });
      await kit.tween(chip, { 'position.y': TANK.top - 0.12 }, 400, 'in');
      splash(0);
      await kit.tween(chip, { 'position.y': TANK.top - 0.08 }, 600, 'back');
      void log;
    },
    hideChip() {
      chip.visible = false;
    },
    statesMode() {
      if (!box.visible) {
        box.visible = true;
        box.scale.setScalar(0.01);
        kit.sfx('whoosh');
        kit.tween(box, { 'scale.x': 1, 'scale.y': 1, 'scale.z': 1 }, 700, 'back');
      }
      kit.ui.clear();
      tempReadout = kit.ui.readout('Temperature');
      tempSlider = kit.ui.slider({ label: '🔥 Heat', min: 0, max: 250, step: 1, value: temp, onChange: setTemp });
      setTemp(temp);
    },
    async statesTask() {
      const from = temp;
      await kit.animate(900, (k) => setTemp(from + (10 - from) * k), 'inOut');
      visited.clear();
      visited.add('solid');
      statesArmed = true;
    },
    setTemp: ({ t }) => {
      const from = temp;
      return kit.animate(1500, (k) => setTemp(from + (t - from) * k), 'inOut');
    },
    idle() {
      mode = 'idle';
      kit.ui.clear();
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 4.4, 9.6], look: [0, 1.2, 0] },
      tank: { pos: [0, 2.5, 5.4], look: [0, 1.15, 0] },
      shelf: { pos: [-3.0, 2.5, 4.6], look: [-3.4, 1.1, 0.2] },
      scale: { pos: [2.6, 2.6, 4.6], look: [3.3, 1.1, 0.4] },
      magnet: { pos: [-3.2, 3.0, 4.8], look: [-3.5, 1.4, 0.4] },
      states: { pos: [1.6, 3.3, -0.4], look: [0.2, 1.2, -3.6] },
      zoom: { pos: [0, 3.4, 5.6], look: [0, 3.0, 0] },
      bayou: { pos: [-1.5, 4.8, 8.5], look: [-1, 1.2, 0] },
    },
    points: {
      tank: [0, 1.8, 0.6],
      shelf: [SHELF.x, 1.4, SHELF.z],
      log: [SHELF.x - 0.95, 1.4, SHELF.z],
      pebble: [SHELF.x - 0.05, 1.3, SHELF.z],
      nail: [SHELF.x + 0.5, 1.2, SHELF.z],
      noodle: [SHELF.x + 1.15, 1.3, SHELF.z],
      scale: [SCALE.x, 1.2, SCALE.z],
      states: [STATES.x, 1.6, STATES.z],
      zoom: [0, 3.2, 0.6],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
