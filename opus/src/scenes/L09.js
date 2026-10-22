// Lesson 9 scene: the Land-Changers Sandbox.
// Stations: freeze/thaw rock (weathering), water-speed flume (erosion), layered canyon block with a years slider,
// river-mouth delta (deposition), and a wind dune. Everything that moves is driven by simple state
// numbers in update(), or by claim/glide tweens, so a quick reset can never leave something stuck.

const T = 0.6; // pedestal top height
const RK = { x: -4.4, z: 1.5 }; // rock
const FL = { x: -1.2, z: 1.5 }; // flume
const DN = { x: 3.1, z: 1.5 }; // dune
const CX = -2.0; // canyon block center x
const CZ = -2.3; // canyon block center z
const L = 5.0; // canyon length (x)
const W = 3.0; // canyon width (z)
const H = 1.6; // canyon block height
const NX = 60;
const NZ = 30;
const DL = { x0: 2.0, xm: 3.7, x1: 5.6, z: -2.3 }; // delta diorama
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const rand = (a, b) => a + Math.random() * (b - a);
const meander = (x) => 0.2 * Math.sin(x * 1.3);
function depthAt(x, z, tau) {
  const dmax = 1.15 * Math.pow(tau, 0.75);
  const w = 0.1 + 0.95 * tau;
  const along = 0.88 + 0.12 * ((x + L / 2) / L);
  const d = Math.abs(z - meander(x));
  if (d >= w) return 0;
  const s = dmax * along * Math.pow(1 - d / w, 0.8);
  return 0.65 * s + 0.35 * (Math.round(s * 6) / 6); // gentle terraces
}
const topY = (x, z, tau) => H - depthAt(x, z, tau);

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
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
    const s = kit.label(text, { size: 0.26, ...opts });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }
  function pointsFor(n, opts, parent = root) {
    const p = kit.particles(n, opts);
    p.frustumCulled = false;
    p.geometry.setDrawRange(0, 0);
    parent.add(p);
    return p;
  }
  const rockMat = () => kit.mat.rock('#8a8178');

  // =====================================================================
  // STATION A: rock with a crack (freeze / thaw)
  // =====================================================================
  pedestal(RK.x, RK.z, 2.7, 2.0);
  const rock = new THREE.Group();
  rock.position.set(RK.x, T, RK.z);
  root.add(rock);
  const rockBody = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75, 1), rockMat());
  rockBody.scale.set(1.2, 0.95, 0.95);
  rockBody.position.y = 0.68;
  const chunk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.36, 0), rockMat());
  const CHUNK_HOME = new THREE.Vector3(0.78, 1.0, 0.0);
  chunk.position.copy(CHUNK_HOME);
  rock.add(rockBody, chunk);
  rock.traverse((o) => (o.castShadow = true));
  const crack = new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 0.12), new THREE.MeshBasicMaterial({ color: 0x0b0b0e }));
  crack.position.set(0.5, 0.78, 0.66);
  crack.rotation.z = -0.12;
  rock.add(crack);
  const iceMat = new THREE.MeshStandardMaterial({ color: 0x38a1f3, emissive: 0x1d4ed8, emissiveIntensity: 0.3, roughness: 0.2, transparent: true, opacity: 0.9 });
  const iceBar = new THREE.Mesh(new THREE.BoxGeometry(1, 0.74, 0.1), iceMat);
  iceBar.position.set(0.5, 0.78, 0.69);
  iceBar.rotation.z = -0.12;
  rock.add(iceBar);
  const pebbles = [];
  for (let i = 0; i < 8; i++) {
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(0.05, 0.1), 0), rockMat());
    m.position.set(rand(0.8, 1.35), 0.07, rand(-0.5, 0.7));
    m.scale.setScalar(0.001);
    m.castShadow = true;
    rock.add(m);
    pebbles.push(m);
  }
  const tempTag = sign('Day: 60 F. Water in the crack.', RK.x, T + 2.0, RK.z, { size: 0.24, border: '#38bdf8' });
  sign('Rock with a crack', RK.x, T + 2.55, RK.z, { size: 0.26 });
  const CRACK0 = 0.05;
  const rk = { cw: CRACK0, cwT: CRACK0, iw: CRACK0 * 0.8, step: 0, frozen: false, broken: false, armed: false, shift: 0, shiftT: 0, pebbles: 0 };
  const chunkTok = {};
  const rkTok = {};
  updaters.push(() => {
    crack.scale.x = Math.max(0.01, rk.cw);
    iceBar.scale.x = Math.max(0.01, rk.iw);
    iceBar.visible = !rk.broken;
    iceMat.color.setHex(rk.frozen ? 0xe8f6ff : 0x38a1f3);
    iceMat.emissive.setHex(rk.frozen ? 0x7dd3fc : 0x1d4ed8);
    if (!rk.broken) {
      chunk.position.x = CHUNK_HOME.x + rk.shift;
      chunk.rotation.z = -rk.shift * 2.2;
    }
    pebbles.forEach((p, i) => p.scale.setScalar(Math.max(0.001, clamp01(rk.pebbles * 1.5 - i * 0.12))));
  });
  function rockReset() {
    claim(rkTok);
    claim(chunkTok);
    Object.assign(rk, { cw: CRACK0, cwT: CRACK0, iw: CRACK0 * 0.8, step: 0, frozen: false, broken: false, armed: false, shift: 0, shiftT: 0, pebbles: 0 });
    chunk.position.copy(CHUNK_HOME);
    chunk.rotation.set(0, 0, 0);
    tempTag.setText('Day: 60 F. Water in the crack.');
  }
  async function breakChunk() {
    if (rk.broken) return;
    rk.broken = true;
    const s = claim(chunkTok);
    kit.sfx('thud');
    const from = chunk.position.clone();
    const to = new THREE.Vector3(1.15, 0.2, 0.5);
    const r0 = chunk.rotation.z;
    const ok = await glide(chunkTok, s, 900, (k) => {
      chunk.position.lerpVectors(from, to, k);
      chunk.position.y = lerp(from.y, to.y, k * k) + Math.sin(k * Math.PI) * 0.12;
      chunk.rotation.z = r0 - k * 1.3;
    }, 'in');
    if (!ok) return;
    kit.sfx('clank');
    tempTag.setText('CRACK! A piece broke off!');
    rk.pebbles = 0;
    await glide(chunkTok, s, 700, (k) => (rk.pebbles = k), 'out');
    kit.vespa?.react('wow');
    if (rk.armed) {
      rk.armed = false;
      kit.emit('rockBroke');
    }
  }
  async function freeze() {
    if (rk.broken) return;
    if (rk.frozen) {
      kit.sfx('click');
      kit.vespa?.react('think');
      return;
    }
    const s = claim(rkTok);
    rk.frozen = true;
    rk.step++;
    rk.cwT = CRACK0 + 0.06 * rk.step;
    rk.shiftT = 0.05 * rk.step;
    tempTag.setText('Night: 25 F. Freezing!');
    kit.sfx('wind');
    const c0 = rk.cw;
    const i0 = rk.iw;
    const sh0 = rk.shift;
    const ok = await glide(rkTok, s, 1300, (k) => {
      rk.cw = lerp(c0, rk.cwT, k);
      rk.iw = lerp(i0, rk.cwT + 0.07, k);
      rk.shift = lerp(sh0, rk.shiftT, k);
    }, 'out');
    if (!ok) return;
    tempTag.setText(`Ice pushed the crack wider! (${rk.step})`);
    kit.sfx('click');
    if (rk.step >= 3) breakChunk();
  }
  async function thaw() {
    if (rk.broken) return;
    if (!rk.frozen) {
      kit.sfx('click');
      kit.vespa?.react('think');
      return;
    }
    const s = claim(rkTok);
    rk.frozen = false;
    tempTag.setText('Day: 60 F. The ice melts.');
    kit.sfx('bubble');
    const c0 = rk.cw;
    const i0 = rk.iw;
    const sh0 = rk.shift;
    const ok = await glide(rkTok, s, 1100, (k) => {
      rk.cw = lerp(c0, rk.cwT, k);
      rk.iw = lerp(i0, rk.cwT * 0.8, k);
      rk.shift = lerp(sh0, rk.shiftT, k);
    }, 'out');
    if (!ok) return;
    if (rk.step >= 3) breakChunk();
  }

  // =====================================================================
  // STATION B: water-speed flume
  // =====================================================================
  pedestal(FL.x, FL.z, 3.0, 1.8);
  const fl = { speed: 0, armed: false, flume: 0 };
  const trough = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.08, 0.9), kit.mat.metal(0x64748b));
  trough.position.set(FL.x, T + 0.04, FL.z);
  root.add(trough);
  for (const sz of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.26, 0.05), kit.mat.glass());
    wall.position.set(FL.x, T + 0.2, FL.z + sz * 0.45);
    root.add(wall);
  }
  const flWater = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 0.82), kit.mat.water(0x38a1f3));
  flWater.position.set(FL.x, T + 0.15, FL.z);
  root.add(flWater);
  const flecks = pointsFor(36, { size: 0.09, color: 0xe0f2fe, spread: 0.1 });
  const fleckSeed = [];
  for (let i = 0; i < 36; i++) fleckSeed.push({ z: rand(-0.32, 0.32), ph: Math.random() });
  const stones = [];
  const XA = FL.x - 1.0;
  const XB = FL.x + 1.0;
  function addStone(mesh, th, z, r, label) {
    mesh.position.set(XA, T + 0.1 + r, FL.z + z);
    mesh.castShadow = true;
    root.add(mesh);
    const st = { mesh, th, z, r, p: 0, label };
    stones.push(st);
    return st;
  }
  const sandGroup = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshStandardMaterial({ color: 0xe5cf98, roughness: 1 }));
    g.position.set(rand(-0.07, 0.07), rand(0, 0.04), rand(-0.07, 0.07));
    sandGroup.add(g);
  }
  addStone(sandGroup, 0.2, -0.24, 0.03, 'sand');
  addStone(new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), new THREE.MeshStandardMaterial({ color: 0x9a8f84, roughness: 0.95 })), 0.5, 0, 0.1, 'pebble');
  const bigRock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), rockMat());
  const bigStone = addStone(bigRock, 0.82, 0.24, 0.2, 'rock');
  sign('Water speed lab', FL.x, T + 1.25, FL.z, { size: 0.26 });
  const speedTag = sign('Slide the water speed up', FL.x, T + 1.7, FL.z, { size: 0.24, border: '#38bdf8' });
  const speedWords = (v) => (v < 0.2 ? 'Too slow to move anything' : v < 0.5 ? 'Slow: only sand moves' : v < 0.82 ? 'Medium: sand and pebble move' : 'Fast: even the big rock moves!');
  let lastWords = '';
  updaters.push((dt, t) => {
    const v = fl.speed;
    for (const s of stones) {
      const vel = Math.max(0, v - s.th) * 1.3;
      if (vel > 0 && s.p < 1) {
        const dp = Math.min(vel * dt, 1 - s.p);
        s.p += dp;
        if (s.label !== 'sand') s.mesh.rotation.z -= (dp * 2.0) / s.r;
        else s.mesh.rotation.y += dp * 4;
      }
      s.mesh.position.x = XA + s.p * (XB - XA);
      s.mesh.position.y = T + 0.1 + s.r + (vel > 0 && s.p < 1 ? Math.abs(Math.sin(t * 9 + s.th * 5)) * 0.015 : 0);
    }
    const n = Math.round(10 + 26 * v);
    flecks.geometry.setDrawRange(0, fl.flume ? n : 0);
    if (fl.flume) {
      for (let i = 0; i < 36; i++) {
        const f = fleckSeed[i];
        const k = (f.ph + t * (0.15 + v * 0.9)) % 1;
        flecks.positions[i * 3] = XA - 0.2 + k * (XB - XA + 0.4);
        flecks.positions[i * 3 + 1] = T + 0.24;
        flecks.positions[i * 3 + 2] = FL.z + f.z;
      }
      flecks.commit();
    }
    if (fl.flume) {
      const w = speedWords(v);
      if (w !== lastWords) {
        lastWords = w;
        speedTag.setText(w);
      }
      if (fl.armed && v >= 0.85 && bigStone.p > 0.25) {
        fl.armed = false;
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('speedTested');
      }
    }
  });
  function flumeReset() {
    fl.speed = 0;
    fl.armed = false;
    fl.flume = 0;
    stones.forEach((s) => {
      s.p = 0;
      s.mesh.rotation.set(0, 0, 0);
    });
    lastWords = '';
    speedTag.setText('Slide the water speed up');
  }

  // =====================================================================
  // STATION C: layered canyon block with a "years" slider
  // =====================================================================
  const canyon = new THREE.Group();
  canyon.position.set(CX, 0, CZ);
  root.add(canyon);
  const strata = kit.tex.canvas(16, 256, (c, w, h) => {
    const bands = [[0.04, '#6a8f3e'], [0.1, '#c9a46a'], [0.1, '#b4532f'], [0.08, '#e6d5b0'], [0.1, '#a2492a'], [0.08, '#d3a27f'], [0.1, '#85606e'], [0.12, '#b07a4a'], [0.1, '#d9c08a'], [0.18, '#6a4435']];
    let y = 0;
    for (const [f, col] of bands) {
      const bh = f * h;
      c.fillStyle = col;
      c.fillRect(0, y, w, bh + 1);
      c.fillStyle = 'rgba(0,0,0,0.18)';
      c.fillRect(0, y, w, 2);
      y += bh;
    }
  });
  const strataMat = new THREE.MeshStandardMaterial({ map: strata, roughness: 0.95, side: THREE.DoubleSide });
  // top surface (heightfield)
  const tN = (NX + 1) * (NZ + 1);
  const tPos = new Float32Array(tN * 3);
  const tUv = new Float32Array(tN * 2);
  const tIdx = [];
  for (let iz = 0; iz <= NZ; iz++) {
    for (let ix = 0; ix <= NX; ix++) {
      const i = iz * (NX + 1) + ix;
      tPos[i * 3] = -L / 2 + (L * ix) / NX;
      tPos[i * 3 + 2] = -W / 2 + (W * iz) / NZ;
      tUv[i * 2] = ix / NX;
      if (ix < NX && iz < NZ) {
        const a = i;
        const b = i + 1;
        const c = i + NX + 1;
        const d = c + 1;
        tIdx.push(a, c, b, b, c, d);
      }
    }
  }
  const topGeo = new THREE.BufferGeometry();
  topGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
  topGeo.setAttribute('uv', new THREE.BufferAttribute(tUv, 2));
  topGeo.setIndex(tIdx);
  const topMesh = new THREE.Mesh(topGeo, strataMat);
  topMesh.receiveShadow = true;
  canyon.add(topMesh);
  // end skirts (show the canyon cross-section)
  const mkEnd = (sx) => {
    const n = (NZ + 1) * 2;
    const pos = new Float32Array(n * 3);
    const uv = new Float32Array(n * 2);
    const nor = new Float32Array(n * 3);
    const idx = [];
    for (let iz = 0; iz <= NZ; iz++) {
      const a = iz * 2;
      pos[a * 3] = pos[(a + 1) * 3] = sx * (L / 2);
      pos[a * 3 + 2] = pos[(a + 1) * 3 + 2] = -W / 2 + (W * iz) / NZ;
      pos[(a + 1) * 3 + 1] = 0;
      uv[(a + 1) * 2 + 1] = 0;
      nor[a * 3] = nor[(a + 1) * 3] = sx;
      if (iz < NZ) idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setIndex(idx);
    const m = new THREE.Mesh(g, strataMat);
    canyon.add(m);
    return { g, pos, uv, sx };
  };
  const ends = [mkEnd(-1), mkEnd(1)];
  for (const sz of [-1, 1]) {
    const g = new THREE.PlaneGeometry(L, H);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * 0.5);
    const m = new THREE.Mesh(g, strataMat);
    m.position.set(0, H / 2, sz * (W / 2));
    if (sz < 0) m.rotation.y = Math.PI;
    canyon.add(m);
  }
  // river strip along the middle
  const RIV_N = NX + 1;
  const rPos = new Float32Array(RIV_N * 2 * 3);
  const rIdx = [];
  for (let i = 0; i < RIV_N; i++) if (i < NX) rIdx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  const rGeo = new THREE.BufferGeometry();
  rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
  rGeo.setIndex(rIdx);
  rGeo.computeVertexNormals();
  const river = new THREE.Mesh(rGeo, new THREE.MeshStandardMaterial({ color: 0x2f8fe0, emissive: 0x0b3c7a, emissiveIntensity: 0.4, roughness: 0.15, side: THREE.DoubleSide }));
  river.frustumCulled = false;
  canyon.add(river);
  const rflow = pointsFor(50, { size: 0.09, color: 0xd7f1ff, spread: 0.1 }, canyon);
  rflow.geometry.setDrawRange(0, 50);
  const rfSeed = [];
  for (let i = 0; i < 50; i++) rfSeed.push({ ph: Math.random(), dz: rand(-0.07, 0.07) });
  const yearsTag = sign('Today: 0 years', CX, 2.75, CZ, { size: 0.3, border: '#fbbf24' });
  sign('Layers of rock', CX, 3.2, CZ, { size: 0.24 });
  const cy = { tau: 0, armed: false, lastLabel: '' };
  const cyTok = {};
  function setYears(tau) {
    cy.tau = tau;
    const tp = topGeo.attributes.position;
    const tu = topGeo.attributes.uv;
    for (let iz = 0; iz <= NZ; iz++) {
      for (let ix = 0; ix <= NX; ix++) {
        const i = iz * (NX + 1) + ix;
        const y = topY(tPos[i * 3], tPos[i * 3 + 2], tau);
        tp.setY(i, y);
        tu.setY(i, y / H);
      }
    }
    tp.needsUpdate = true;
    tu.needsUpdate = true;
    topGeo.computeVertexNormals();
    for (const e of ends) {
      const p = e.g.attributes.position;
      const u = e.g.attributes.uv;
      for (let iz = 0; iz <= NZ; iz++) {
        const z = -W / 2 + (W * iz) / NZ;
        const y = topY(e.sx * (L / 2), z, tau);
        p.setY(iz * 2, y);
        u.setY(iz * 2, y / H);
      }
      p.needsUpdate = true;
      u.needsUpdate = true;
    }
    const rp = rGeo.attributes.position;
    for (let i = 0; i < RIV_N; i++) {
      const x = -L / 2 + (L * i) / NX;
      const zc = meander(x);
      const y = topY(x, zc, tau) + 0.04;
      rp.setXYZ(i * 2, x, y, zc - 0.11);
      rp.setXYZ(i * 2 + 1, x, y, zc + 0.11);
    }
    rp.needsUpdate = true;
    rGeo.computeVertexNormals();
    const yrs = Math.round(tau * 100) * 10000;
    const txt = yrs === 0 ? 'Today: 0 years' : `After ${yrs.toLocaleString('en-US')} years`;
    if (txt !== cy.lastLabel) {
      cy.lastLabel = txt;
      yearsTag.setText(txt);
    }
    if (cy.armed && tau >= 0.95) {
      cy.armed = false;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('canyonCarved');
    }
  }
  setYears(0);
  updaters.push((dt, t) => {
    for (let i = 0; i < 50; i++) {
      const f = rfSeed[i];
      const k = (f.ph + t * 0.18) % 1;
      const x = -L / 2 + k * L;
      const zc = meander(x);
      rflow.positions[i * 3] = x;
      rflow.positions[i * 3 + 1] = topY(x, zc, cy.tau) + 0.09;
      rflow.positions[i * 3 + 2] = zc + f.dz;
    }
    rflow.commit();
  });

  // =====================================================================
  // STATION D: river mouth and delta (deposition)
  // =====================================================================
  const dslab = new THREE.Mesh(new THREE.BoxGeometry(DL.x1 - DL.x0, 0.1, W), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 }));
  dslab.position.set((DL.x0 + DL.x1) / 2, -0.05, DL.z);
  root.add(dslab);
  const dland = new THREE.Mesh(new THREE.BoxGeometry(DL.xm - DL.x0, 0.5, W), kit.mat.ground(0x6e8f46));
  dland.position.set((DL.x0 + DL.xm) / 2, 0.25, DL.z);
  dland.receiveShadow = true;
  root.add(dland);
  const dfloor = new THREE.Mesh(new THREE.BoxGeometry(DL.x1 - DL.xm, 0.08, W), new THREE.MeshStandardMaterial({ color: 0xc9a96a, roughness: 1 }));
  dfloor.position.set((DL.xm + DL.x1) / 2, 0.04, DL.z);
  root.add(dfloor);
  const gulf = new THREE.Mesh(new THREE.BoxGeometry(DL.x1 - DL.xm, 0.34, W), kit.mat.water(0x2f8fe0));
  gulf.position.set((DL.xm + DL.x1) / 2, 0.25, DL.z);
  root.add(gulf);
  const dRiver = new THREE.Mesh(new THREE.BoxGeometry(DL.xm - DL.x0, 0.02, 0.34), new THREE.MeshStandardMaterial({ color: 0x2f8fe0, emissive: 0x0b3c7a, emissiveIntensity: 0.4, roughness: 0.2 }));
  dRiver.position.set((DL.x0 + DL.xm) / 2, 0.51, DL.z);
  root.add(dRiver);
  const lobes = [];
  for (const [a, rmax, start] of [[0, 1.5, 0], [-0.7, 1.15, 0.25], [0.7, 1.15, 0.5]]) {
    const len = 1.1;
    const geo = new THREE.CylinderGeometry(1, 1, 0.44, 20, 1, false, Math.PI / 2 - a - len / 2, len);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xcbb07a, roughness: 1 }));
    m.position.set(DL.xm, 0.25, DL.z);
    m.scale.set(0.001, 1, 0.001);
    m.castShadow = true;
    root.add(m);
    lobes.push({ m, rmax, start });
  }
  const DNN = 70;
  const sed = pointsFor(DNN, { size: 0.1, color: 0xd9b97a, spread: 0.1, additive: false });
  const sedSeed = [];
  for (let i = 0; i < DNN; i++) sedSeed.push({ ph: i / DNN, a: rand(-0.85, 0.85), r: rand(0.25, 1.0), z: rand(-0.1, 0.1) });
  sign('Delta lab', (DL.x0 + DL.x1) / 2, 2.55, DL.z, { size: 0.26 });
  sign('River: fast', (DL.x0 + DL.xm) / 2, 1.2, DL.z, { size: 0.22, border: '#38bdf8' });
  const gulfTag = sign('Gulf of Mexico: water slows', 4.7, 1.2, DL.z, { size: 0.22, border: '#38bdf8' });
  const deltaTag = sign('Delta: new land!', 4.4, 1.7, DL.z, { size: 0.28, border: '#fbbf24' });
  deltaTag.visible = false;
  const dl = { k: 0, run: 0, runT: 0, phase: 0, armed: false };
  updaters.push((dt) => {
    dl.run += (dl.runT - dl.run) * Math.min(1, dt * 3);
    if (dl.run > 0.05 && dl.k < 1) dl.k = Math.min(1, dl.k + dt * 0.075 * dl.run);
    dl.phase += dt * 0.22 * dl.run;
    for (const l of lobes) {
      const r = Math.max(0.001, l.rmax * smooth(clamp01((dl.k - l.start) / 0.5)));
      l.m.scale.set(r, 1, r);
    }
    const n = Math.round(DNN * clamp01(dl.run * 1.2));
    sed.geometry.setDrawRange(0, n);
    if (n) {
      for (let i = 0; i < DNN; i++) {
        const s = sedSeed[i];
        const p = (s.ph + dl.phase) % 1;
        let x;
        let y;
        let z = DL.z + s.z;
        if (p < 0.4) {
          x = lerp(DL.x0, DL.xm, p / 0.4);
          y = 0.58;
        } else {
          const q = smooth((p - 0.4) / 0.6);
          const rr = s.r * (0.5 + 0.9 * dl.k);
          x = DL.xm + Math.cos(s.a) * rr * q;
          z = DL.z + Math.sin(s.a) * rr * q + s.z;
          y = lerp(0.58, 0.46, q);
        }
        sed.positions[i * 3] = x;
        sed.positions[i * 3 + 1] = y;
        sed.positions[i * 3 + 2] = z;
      }
      sed.commit();
    }
    deltaTag.visible = dl.k >= 1;
    if (dl.k >= 1 && dl.armed) {
      dl.armed = false;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('deltaBuilt');
    }
  });
  function deltaReset() {
    dl.k = 0;
    dl.run = 0;
    dl.runT = 0;
    dl.armed = false;
  }

  // =====================================================================
  // STATION E: wind and dune
  // =====================================================================
  pedestal(DN.x, DN.z, 2.9, 1.9);
  const sandTex = kit.tex.canvas(128, 128, (c, w) => {
    c.fillStyle = '#e0c488';
    c.fillRect(0, 0, w, w);
    for (let i = 0; i < 900; i++) {
      c.fillStyle = `rgba(${190 + Math.random() * 50},${150 + Math.random() * 50},${90 + Math.random() * 40},0.6)`;
      c.fillRect(Math.random() * w, Math.random() * w, 2, 2);
    }
  });
  const duneGeo = new THREE.PlaneGeometry(2.5, 1.5, 50, 20);
  duneGeo.rotateX(-Math.PI / 2);
  const dunePos = duneGeo.attributes.position;
  const duneBase = Float32Array.from(dunePos.array);
  const dune = new THREE.Mesh(duneGeo, new THREE.MeshStandardMaterial({ map: sandTex, roughness: 1 }));
  dune.position.set(DN.x, T + 0.04, DN.z);
  dune.receiveShadow = dune.castShadow = true;
  root.add(dune);
  const dn = { k: 0, wind: 0, windT: 0, armed: false };
  function shapeDune() {
    const cx = -0.45 + 0.6 * dn.k;
    const A = 0.03 + 0.55 * dn.k;
    for (let i = 0; i < dunePos.count; i++) {
      const x = duneBase[i * 3];
      const z = duneBase[i * 3 + 2];
      const dx = x - cx;
      const prof = dx < 0 ? Math.exp(-Math.pow(dx / 0.75, 2)) : Math.exp(-Math.pow(dx / 0.26, 2));
      dunePos.setY(i, A * prof * Math.exp(-Math.pow(z / 0.6, 2)));
    }
    dunePos.needsUpdate = true;
    duneGeo.computeVertexNormals();
  }
  shapeDune();
  const windArrows = [];
  for (const z of [-0.45, 0, 0.45]) {
    const a = kit.arrow(0xa5f3fc);
    a.rotation.z = -Math.PI / 2;
    a.position.set(DN.x - 1.35, T + 0.75, DN.z + z);
    a.visible = false;
    root.add(a);
    windArrows.push(a);
  }
  const grains = pointsFor(70, { size: 0.07, color: 0xe5c98c, spread: 0.1, additive: false });
  const grSeed = [];
  for (let i = 0; i < 70; i++) grSeed.push({ ph: Math.random(), z: rand(-0.55, 0.55), hop: rand(5, 8) });
  sign('Beach and wind', DN.x, T + 2.0, DN.z, { size: 0.26 });
  const duneTag = sign('Wind moves sand', DN.x, T + 1.6, DN.z, { size: 0.24, border: '#a5f3fc' });
  let lastK = -1;
  updaters.push((dt, t) => {
    dn.wind += (dn.windT - dn.wind) * Math.min(1, dt * 4);
    if (dn.wind > 0.05 && dn.k < 1) dn.k = Math.min(1, dn.k + dt * 0.17 * dn.wind);
    if (Math.abs(dn.k - lastK) > 0.004) {
      lastK = dn.k;
      shapeDune();
    }
    windArrows.forEach((a, i) => {
      a.visible = dn.wind > 0.1;
      a.set(0.5 + 0.9 * dn.wind + Math.sin(t * 6 + i) * 0.1, new THREE.Vector3(1, 0, 0));
    });
    const n = Math.round(70 * dn.wind);
    grains.geometry.setDrawRange(0, n);
    if (n) {
      const cx = -0.45 + 0.6 * dn.k;
      for (let i = 0; i < 70; i++) {
        const g = grSeed[i];
        const u = (g.ph + t * 0.45) % 1;
        const x0 = -1.15;
        const x1 = cx + 0.3;
        const x = x0 + u * (x1 - x0);
        const hop = Math.abs(Math.sin(u * Math.PI * g.hop)) * 0.14 * (1 - u * 0.5);
        grains.positions[i * 3] = DN.x + x;
        grains.positions[i * 3 + 1] = T + 0.12 + hop + (0.55 * dn.k + 0.03) * Math.exp(-Math.pow((x - cx) / 0.5, 2)) * u;
        grains.positions[i * 3 + 2] = DN.z + g.z * 0.8;
      }
      grains.commit();
    }
    if (dn.k >= 1) {
      dn.windT = 0;
      if (!dn.done) {
        dn.done = true;
        duneTag.setText('A dune! Wind dropped the sand.');
      }
      if (dn.armed) {
        dn.armed = false;
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('duneBuilt');
      }
    }
  });
  function duneReset() {
    dn.k = 0;
    dn.wind = 0;
    dn.windT = 0;
    dn.armed = false;
    dn.done = false;
    duneTag.setText('Wind moves sand');
  }

  // =====================================================================
  // W / E / D tags
  // =====================================================================
  const wedInfo = [
    { text: 'Weathering: BREAKS rock', x: RK.x, y: 3.55, z: RK.z, color: '#f59e0b' },
    { text: 'Erosion: MOVES pieces', x: -1.2, y: 2.55, z: FL.z, color: '#38bdf8' },
    { text: 'Deposition: DROPS pieces', x: 4.4, y: 2.2, z: DL.z, color: '#34d399' },
  ];
  const wedTags = wedInfo.map((w) => {
    const s = kit.label(w.text, { size: 0.3, border: w.color });
    s.position.set(w.x, w.y, w.z);
    s.visible = false;
    s.userData.base = s.scale.clone();
    root.add(s);
    return s;
  });

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const cues = {
    idle() {
      kit.ui.clear();
    },
    // --- rock ---
    rockReset() {
      kit.ui.clear();
      rockReset();
    },
    rockMode() {
      kit.ui.clear();
      rockReset();
      rk.armed = true;
      kit.ui.buttons([
        { label: 'Freeze', emoji: '❄️', onClick: () => freeze() },
        { label: 'Thaw', emoji: '☀️', onClick: () => thaw() },
        { label: 'Start over', emoji: '↩️', onClick: () => { rockReset(); rk.armed = true; } },
      ]);
    },
    // --- flume ---
    flumeReset() {
      kit.ui.clear();
      flumeReset();
    },
    flumeMode() {
      kit.ui.clear();
      flumeReset();
      fl.flume = 1;
      fl.armed = true;
      kit.ui.slider({
        label: 'Water speed',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        onChange: (v) => (fl.speed = v),
      });
      kit.ui.buttons([
        {
          label: 'Reset stones',
          emoji: '↩️',
          onClick: () => stones.forEach((s) => {
            s.p = 0;
            s.mesh.rotation.set(0, 0, 0);
          }),
        },
      ]);
    },
    flumeShow() {
      // look-only: water flowing slowly, stones waiting
      kit.ui.clear();
      flumeReset();
      fl.flume = 1;
    },
    // --- canyon ---
    canyonReset() {
      kit.ui.clear();
      claim(cyTok);
      cy.armed = false;
      setYears(0);
    },
    canyonTime(args = {}) {
      const s = claim(cyTok);
      cy.armed = false;
      const from = cy.tau;
      const to = args.to ?? 1;
      return glide(cyTok, s, args.ms ?? 6000, (k) => setYears(lerp(from, to, k)), 'inOut');
    },
    canyonMode() {
      kit.ui.clear();
      claim(cyTok);
      setYears(0);
      cy.armed = true;
      const el = kit.ui.slider({
        label: 'Years go by',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        onChange: (v) => {
          claim(cyTok);
          setYears(v);
        },
      });
      kit.ui.buttons([
        {
          label: 'Fast forward',
          emoji: '⏩',
          onClick: async () => {
            const s = claim(cyTok);
            const from = cy.tau;
            const ok = await glide(cyTok, s, 4000 * (1 - from) + 300, (k) => {
              const v = lerp(from, 1, k);
              setYears(v);
              el.setValue(v);
            }, 'linear');
            if (ok) el.setValue(1);
          },
        },
      ]);
    },
    // --- delta ---
    deltaReset() {
      kit.ui.clear();
      deltaReset();
    },
    deltaMode() {
      kit.ui.clear();
      deltaReset();
      dl.armed = true;
      kit.ui.buttons([
        { label: 'Let the river flow', emoji: '🌊', onClick: () => (dl.runT = 1) },
        { label: 'Pause', emoji: '⏸️', onClick: () => (dl.runT = 0) },
        { label: 'Start over', emoji: '↩️', onClick: () => { deltaReset(); dl.armed = true; } },
      ]);
    },
    deltaShow() {
      kit.ui.clear();
      dl.armed = false;
      dl.runT = 1;
    },
    deltaStop() {
      dl.runT = 0;
    },
    // --- dune ---
    duneReset() {
      kit.ui.clear();
      duneReset();
    },
    duneMode() {
      kit.ui.clear();
      duneReset();
      dn.armed = true;
      kit.ui.buttons([
        { label: 'Blow wind', emoji: '💨', onClick: () => (dn.windT = 1) },
        { label: 'Stop wind', emoji: '✋', onClick: () => (dn.windT = 0) },
        { label: 'Start over', emoji: '↩️', onClick: () => { duneReset(); dn.armed = true; } },
      ]);
    },
    // --- tags ---
    async wedShow(args = {}) {
      const i = (args.n ?? 1) - 1;
      const s = wedTags[i];
      if (!s) return;
      const my = claim(s);
      const base = s.userData.base;
      s.visible = true;
      kit.sfx('pop');
      await glide(s, my, 400, (k) => s.scale.set(base.x * Math.max(0.001, smooth(k)), base.y * Math.max(0.001, smooth(k)), 1), 'out');
    },
    wedHide() {
      wedTags.forEach((s) => {
        claim(s);
        s.visible = false;
        s.scale.copy(s.userData.base);
      });
    },
    clearAll() {
      kit.ui.clear();
      rockReset();
      flumeReset();
      deltaReset();
      duneReset();
      claim(cyTok);
      setYears(0);
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0.4, 6.0, 12.6], look: [0.4, 0.8, -0.5] },
      rock: { pos: [-4.4, 2.7, 5.2], look: [-4.4, 1.3, 1.5] },
      flume: { pos: [-1.2, 2.6, 5.0], look: [-1.2, 1.0, 1.5] },
      canyon: { pos: [-2.0, 3.7, 3.0], look: [-2.0, 0.9, -2.3] },
      delta: { pos: [3.8, 3.7, 2.6], look: [3.8, 0.4, -2.3] },
      dune: { pos: [3.1, 2.7, 5.0], look: [3.1, 1.0, 1.5] },
    },
    points: {
      rock: [RK.x, 2.2, RK.z],
      crack: [RK.x + 0.5, 1.9, RK.z + 0.7],
      chunk: [RK.x + 0.8, 2.1, RK.z],
      flume: [FL.x, 1.9, FL.z],
      bigRock: [FL.x - 0.6, 1.3, FL.z + 0.3],
      canyon: [CX, 2.4, CZ],
      river: [CX + 1.0, 1.6, CZ],
      mouth: [DL.xm, 1.3, DL.z],
      delta: [4.4, 1.2, DL.z],
      gulf: [4.9, 1.1, DL.z],
      dune: [DN.x, 1.9, DN.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
