// Lesson 4 scene: Kemah pier wave tank, marble ramp, and a rice drum.
// Anything that moves in more than one way uses claim/glide so a skip cannot leave it stuck.

const LAB = { x: -4.4, z: 0 };
const BAY = { x: 0.25, z: 0.1 };
const DRM = { x: 4.05, z: 0.05 };

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];

  // Each new motion claims the token. An older glide stops writing, so nothing stays busy.
  const claim = (it) => (it.seq = (it.seq || 0) + 1);
  const glide = (it, s, ms, fn, ease) => kit.animate(ms, (k) => it.seq === s && fn(k), ease).then(() => it.seq === s);
  const hitTok = { seq: 0 };
  const rampTok = { seq: 0 };
  const boatTok = { seq: 0 };
  const waveTok = { seq: 0 };
  const drumTok = { seq: 0 };

  let rampLevel = 0.15;
  let rampAngle = 0.2;
  let shooterHome = true;
  let marbleLive = false;
  let marbleArmed = false;
  let waveLive = false;
  let waveArmed = false;
  let waveLevel = 0.75;
  let waveAmp = 0.012;
  let wavePhase = 0;
  let drumLive = false;
  let drumArmed = false;
  let boatHeld = false;
  let rollRead = null;

  function pad(x, z, w, d, color) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), kit.mat.metal(color));
    m.position.set(x, 0.04, z);
    m.receiveShadow = true;
    root.add(m);
  }
  pad(LAB.x + 0.25, LAB.z, 3.7, 1.35, 0x1e293b);
  pad(BAY.x, BAY.z - 0.2, 3.5, 2.5, 0x134e4a);
  pad(DRM.x + 0.55, DRM.z, 2.7, 1.55, 0x3f1d12);

  function stationSign(text, x, y, z) {
    const s = kit.label(text, { size: 0.28 });
    s.position.set(x, y, z);
    root.add(s);
    return s;
  }
  stationSign('Marble Ramp', LAB.x + 0.2, 1.95, LAB.z);
  stationSign('Kemah Wave Tank', BAY.x, 2.15, BAY.z);
  stationSign('Sound Drum', DRM.x + 0.15, 1.85, DRM.z);

  // ---------------- marble ramp ----------------
  const lab = new THREE.Group();
  lab.position.set(LAB.x, 0, LAB.z);
  root.add(lab);

  const plank = new THREE.Mesh(new THREE.BoxGeometry(3.55, 0.12, 0.78), kit.mat.wood('#6b3e1e'));
  plank.position.set(0.35, 0.1, 0);
  plank.castShadow = plank.receiveShadow = true;
  lab.add(plank);
  const lane = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.025, 0.3), kit.mat.plastic(0x111827));
  lane.position.set(0.85, 0.17, 0);
  lab.add(lane);
  [-0.22, 0.22].forEach((z) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.06, 0.04), kit.mat.metal(0x94a3b8));
    rail.position.set(0.85, 0.22, z);
    lab.add(rail);
  });

  const pivot = new THREE.Group();
  pivot.position.set(-0.62, 0.17, 0);
  lab.add(pivot);
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.36), kit.mat.wood('#8a5a2b'));
  board.position.x = -0.6;
  board.castShadow = true;
  pivot.add(board);
  const lip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.38), kit.mat.wood('#5c3310'));
  lip.position.set(-1.16, 0.04, 0);
  pivot.add(lip);

  const blueSteel = kit.mat.metal(0x38bdf8);
  const silver = kit.mat.metal(0xe5e7eb);
  const homes = [
    null,
    new THREE.Vector3(-0.08, 0.29, 0),
    new THREE.Vector3(0.16, 0.29, 0),
    new THREE.Vector3(0.4, 0.29, 0),
  ];
  const balls = [];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 22, 16), i === 0 ? blueSteel : silver);
    m.castShadow = true;
    lab.add(m);
    balls.push(m);
  }
  const shooter = balls[0];
  const shooterTag = kit.label('Blue marble', { size: 0.16, border: '#38bdf8' });
  shooterTag.position.y = 0.28;
  shooter.add(shooterTag);

  const glow = new THREE.Group();
  const glowBall = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), kit.mat.glow(0x00f0ff, 2.2));
  const glowTag = kit.label('Energy', { size: 0.18, border: '#00f0ff', color: '#a5f3fc' });
  glowTag.position.y = 0.26;
  glow.add(glowBall, glowTag);
  glow.visible = false;
  lab.add(glow);

  function markX(feet) {
    return homes[3].x + 0.22 + (feet - 1) * 0.4;
  }
  for (let f = 1; f <= 4; f++) {
    const x = markX(f);
    const peg = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.14, 0.32), kit.mat.plastic(f === 4 ? 0xfbbf24 : 0xfef3c7));
    peg.position.set(x, 0.24, 0);
    lab.add(peg);
    const tag = kit.label(`${f} ft`, { size: 0.15, color: '#fde68a', border: '#fbbf24' });
    tag.position.set(x, 0.48, 0.28);
    lab.add(tag);
  }
  const rollTag = kit.label('Roll distance', { size: 0.2, color: '#fde68a', border: '#fbbf24' });
  rollTag.position.set(1.15, 0.85, 0.42);
  lab.add(rollTag);

  function feetFor(level) {
    if (level < 0.4) return 1;
    if (level < 0.65) return 2;
    if (level < 0.85) return 3;
    return 4;
  }
  function applyRamp(level) {
    claim(rampTok);
    rampLevel = THREE.MathUtils.clamp(level, 0, 1);
    rampAngle = 0.1 + rampLevel * 0.7;
    pivot.rotation.z = -rampAngle;
  }
  function shooterHomePos() {
    const L = 0.96;
    const lift = 0.15;
    const a = rampAngle;
    return new THREE.Vector3(
      pivot.position.x - Math.cos(a) * L + Math.sin(a) * lift,
      pivot.position.y + Math.sin(a) * L + Math.cos(a) * lift,
      0,
    );
  }
  function parkTargets() {
    for (let i = 1; i < 4; i++) balls[i].position.copy(homes[i]);
    glow.visible = false;
  }
  function spark(at) {
    const n = 22;
    const drops = kit.particles(n, { size: 0.055, color: 0x67e8f9, spread: 0.08 });
    drops.position.copy(at);
    lab.add(drops);
    const vel = [];
    for (let i = 0; i < n; i++) vel.push(new THREE.Vector3((Math.random() - 0.5) * 1.6, 0.5 + Math.random() * 1.1, (Math.random() - 0.5) * 1.2));
    kit.animate(460, (k) => {
      for (let i = 0; i < n; i++) {
        const u = k * 0.46;
        drops.positions[i * 3] = vel[i].x * u;
        drops.positions[i * 3 + 1] = vel[i].y * u - 3 * u * u;
        drops.positions[i * 3 + 2] = vel[i].z * u;
      }
      drops.commit();
      drops.material.opacity = 1 - k;
    }).then(() => {
      lab.remove(drops);
      drops.geometry.dispose();
      drops.material.dispose();
    });
  }

  async function glideRamp(level, ms) {
    const s = claim(rampTok);
    const a0 = rampAngle;
    rampLevel = THREE.MathUtils.clamp(level, 0, 1);
    const a1 = 0.1 + rampLevel * 0.7;
    const ok = await glide(rampTok, s, ms, (k) => {
      rampAngle = a0 + (a1 - a0) * k;
      pivot.rotation.z = -rampAngle;
      if (shooterHome) shooter.position.copy(shooterHomePos());
    });
    return ok;
  }

  async function runHit(level) {
    const s = claim(hitTok);
    shooterHome = false;
    parkTargets();
    const start = shooterHomePos();
    shooter.position.copy(start);
    const lipPos = new THREE.Vector3(pivot.position.x + 0.02, 0.29, 0);
    const contact = new THREE.Vector3(homes[1].x - 0.24, 0.29, 0);
    kit.sfx('whoosh');
    let ok = await glide(hitTok, s, 480 + (1 - level) * 220, (k) => {
      shooter.position.lerpVectors(start, lipPos, k);
    }, 'in');
    if (!ok) return;
    ok = await glide(hitTok, s, 240, (k) => {
      shooter.position.lerpVectors(lipPos, contact, k);
    });
    if (!ok) return;
    shooter.position.copy(contact);
    kit.sfx('clank');
    spark(contact);
    glow.visible = true;
    ok = await glide(hitTok, s, 520, (k) => {
      glow.position.lerpVectors(homes[1], homes[3], k);
      glow.position.y = 0.52;
      const n = Math.sin(k * Math.PI * 2) * 0.03;
      balls[1].position.x = homes[1].x + n;
      balls[2].position.x = homes[2].x + n;
    });
    if (!ok) return;
    balls[1].position.copy(homes[1]);
    balls[2].position.copy(homes[2]);
    const feet = feetFor(level);
    const from = homes[3].clone();
    const to = from.clone();
    to.x = markX(feet);
    ok = await glide(hitTok, s, 700, (k) => {
      balls[3].position.lerpVectors(from, to, k);
      balls[3].position.y = 0.29 + Math.sin(k * Math.PI) * 0.035;
      glow.position.lerpVectors(homes[3], to, Math.min(1, k * 1.15));
      glow.position.y = 0.55;
    }, 'out');
    if (!ok) return;
    balls[3].position.copy(to);
    glow.position.set(to.x, 0.55, 0);
    glow.visible = true;
    rollTag.setText(`${feet} ft`);
    rollRead?.set(marbleArmed && level < 0.4 ? `${feet} ft. Raise it higher.` : `${feet} ft`);
    if (marbleArmed && level >= 0.4 && hitTok.seq === s) {
      marbleArmed = false;
      kit.emit('marbleHit');
      kit.vespa?.react('wow');
      kit.sfx('chime');
    } else if (marbleArmed && hitTok.seq === s) {
      kit.vespa?.react('think');
      kit.sfx('tick');
    }
  }

  function releaseMarble() {
    if (!marbleLive) return;
    shooterHome = false;
    runHit(rampLevel);
  }
  kit.onTap(shooter, releaseMarble);
  kit.onTap(plank, releaseMarble);
  kit.onTap(board, releaseMarble);

  function resetMarbles() {
    claim(hitTok);
    marbleArmed = false;
    shooterHome = true;
    applyRamp(0.15);
    parkTargets();
    shooter.position.copy(shooterHomePos());
    rollTag.setText('Roll distance');
    return kit.wait(40);
  }

  // ---------------- Kemah wave tank ----------------
  const bay = new THREE.Group();
  bay.position.set(BAY.x, 0, BAY.z);
  root.add(bay);

  const sea = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 2.2), kit.mat.water(0x0f766e));
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(0, 0.07, -0.35);
  bay.add(sea);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 0.62), kit.mat.wood('#6b4423'));
  deck.position.set(0.05, 0.22, -1.18);
  deck.castShadow = deck.receiveShadow = true;
  bay.add(deck);
  [-0.9, 0.9].forEach((x) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.7, 10), kit.mat.wood('#4a2c12'));
    post.position.set(x, 0.28, -1.18);
    post.castShadow = true;
    bay.add(post);
  });
  const pierTag = kit.label('Kemah Pier', { size: 0.2, border: '#f59e0b' });
  pierTag.position.set(0.05, 0.7, -1.18);
  bay.add(pierTag);

  const lights = new THREE.Group();
  lights.position.set(0.05, 1.28, -1.18);
  bay.add(lights);
  const wire = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.015, 0.015), kit.mat.metal(0x334155));
  lights.add(wire);
  const bulbs = [];
  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xfbbf24, emissiveIntensity: 1, roughness: 0.35 });
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), mat);
    b.position.set(-0.85 + i * 0.42, -0.08, 0);
    lights.add(b);
    bulbs.push(b);
  }
  updaters.push((dt, t) => {
    bulbs.forEach((b, i) => {
      b.material.emissiveIntensity = 0.7 + Math.sin(t * 3 + i) * 0.45;
    });
  });

  const frameMat = kit.mat.wood('#5c3a1e');
  const basin = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.16, 1.2), kit.mat.plastic(0x0c4a6e));
  basin.position.set(0.05, 0.16, 0.02);
  basin.receiveShadow = true;
  bay.add(basin);
  [
    [2.9, 0.12, 0.08, 0.05, 0.28, -0.52],
    [2.9, 0.12, 0.08, 0.05, 0.28, 0.56],
    [0.08, 0.16, 1.2, -1.38, 0.26, 0.02],
    [0.08, 0.16, 1.2, 1.48, 0.26, 0.02],
  ].forEach(([w, h, d, x, y, z]) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), frameMat);
    rail.position.set(x, y, z);
    rail.castShadow = true;
    bay.add(rail);
  });

  const waterGeo = new THREE.PlaneGeometry(2.7, 1.02, 42, 14);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x5eead4,
    map: kit.tex.grid('rgba(186,250,255,0.45)', '#0f766e'),
    roughness: 0.28,
    metalness: 0.04,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide,
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.set(0.05, 0.34, 0.02);
  bay.add(water);
  const waterPos = waterGeo.attributes.position;

  function waveHeight(x, z, t) {
    const idle = Math.sin(x * 2.2 + t * 1.35) * 0.012 + Math.cos(z * 3.1 + t * 1.05) * 0.005;
    const travel = Math.sin(x * 3.1 - wavePhase) * waveAmp;
    return idle + travel;
  }

  const shore = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 1.15), kit.mat.rock('#f6d7a2'));
  shore.position.set(1.55, 0.18, 0.02);
  shore.castShadow = true;
  bay.add(shore);
  const shoreTag = kit.label('Shore', { size: 0.18, color: '#fde68a', border: '#fbbf24' });
  shoreTag.position.set(1.55, 0.55, 0.02);
  bay.add(shoreTag);

  const duck = new THREE.Group();
  const duckBody = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), kit.mat.plastic(0xf5d000));
  duckBody.scale.set(1.2, 0.82, 0.95);
  const duckHead = new THREE.Mesh(new THREE.SphereGeometry(0.095, 14, 12), kit.mat.plastic(0xf5d000));
  duckHead.position.set(0, 0.16, 0.08);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 10), kit.mat.plastic(0xf97316));
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.15, 0.18);
  const eyeMat = kit.mat.plastic(0x111827);
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), eyeMat);
  eyeL.position.set(0.04, 0.2, 0.14);
  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), eyeMat);
  eyeR.position.set(-0.04, 0.2, 0.14);
  const duckTag = kit.label('Duck', { size: 0.18, border: '#f5d000', color: '#fef08a' });
  duckTag.position.y = 0.42;
  duck.add(duckBody, duckHead, beak, eyeL, eyeR, duckTag);
  duck.position.set(0.02, 0.5, 0.02);
  bay.add(duck);

  updaters.push((dt, t) => {
    for (let i = 0; i < waterPos.count; i++) {
      waterPos.setY(i, waveHeight(waterPos.getX(i), waterPos.getZ(i), t));
    }
    waterPos.needsUpdate = true;
    waterGeo.computeVertexNormals();
    const h = waveHeight(duck.position.x - 0.05, duck.position.z - 0.02, t);
    duck.position.y = 0.34 + h + 0.12;
    duck.rotation.z = h * 0.35;
  });

  const paddle = new THREE.Group();
  paddle.position.set(-1.28, 0.42, 0.02);
  const paddleBoard = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.58, 0.72), kit.mat.wood('#a16207'));
  paddleBoard.castShadow = true;
  const paddleHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 10), kit.mat.wood('#78350f'));
  paddleHandle.position.y = 0.5;
  paddle.add(paddleBoard, paddleHandle);
  const paddleTag = kit.label('Wave maker', { size: 0.16 });
  paddleTag.position.y = 0.95;
  paddle.add(paddleTag);
  bay.add(paddle);

  const pulse = new THREE.Group();
  const pulseBall = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), kit.mat.glow(0x22d3ee, 2.4));
  const pulseTag = kit.label('Energy', { size: 0.2, color: '#a5f3fc', border: '#00f0ff' });
  pulseTag.position.y = 0.28;
  pulse.add(pulseBall, pulseTag);
  pulse.visible = false;
  pulse.position.set(-1.1, 0.72, 0.02);
  bay.add(pulse);

  const boat = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.14, 0.28), kit.mat.plastic(0xf8fafc));
  hull.position.y = 0.08;
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.04, 0.3), kit.mat.plastic(0xe11d48));
  stripe.position.y = 0.12;
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.2), kit.mat.plastic(0x0284c7));
  cabin.position.set(-0.12, 0.2, 0);
  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.55, 8), kit.mat.metal(0xcbd5e1));
  boom.rotation.z = 0.9;
  boom.position.set(0.18, 0.28, 0);
  const boatTag = kit.label('Shrimp boat', { size: 0.16 });
  boatTag.position.y = 0.48;
  boat.add(hull, stripe, cabin, boom, boatTag);
  boat.position.set(-1.35, 0.28, -0.88);
  bay.add(boat);
  updaters.push((dt, t) => {
    if (!boatHeld) boat.position.y = 0.28 + Math.sin(t * 1.5) * 0.015;
  });

  async function playWave(strength, fromUser, ms = 2400, withPulse = true) {
    const s = claim(waveTok);
    const amp = 0.025 + strength * 0.14;
    pulse.visible = !!withPulse;
    kit.sfx('splash');
    const ok = await glide(waveTok, s, ms, (k) => {
      const env = Math.sin(k * Math.PI);
      waveAmp = 0.012 + amp * env;
      wavePhase = k * Math.PI * 4;
      paddle.rotation.y = Math.sin(k * Math.PI * 2) * (0.18 + strength * 0.55);
      if (withPulse) {
        pulseBall.scale.setScalar(0.8 + env * 0.55);
        pulse.position.x = -1.15 + k * 2.5;
        pulse.position.y = 0.72;
        pulse.position.z = 0.02;
      }
    });
    if (waveTok.seq !== s) return false;
    waveAmp = 0.012;
    paddle.rotation.y = 0;
    if (withPulse) {
      pulse.visible = true;
      pulse.position.set(1.32, 0.72, 0.02);
      pulseBall.scale.setScalar(1);
    } else {
      pulse.visible = false;
    }
    if (ok && fromUser && waveArmed) {
      waveArmed = false;
      kit.emit('waveMade');
      kit.vespa?.react('wow');
      kit.sfx('chime');
    }
    return true;
  }

  function onPaddle() {
    if (!waveLive) return;
    playWave(Math.max(waveLevel, 0.35), true);
  }
  kit.onTap(paddle, onPaddle);
  kit.onTap(paddleBoard, onPaddle);

  async function runPassWave() {
    const s = claim(boatTok);
    boatHeld = true;
    boat.visible = true;
    const x0 = -1.55;
    const x1 = 1.4;
    const z = -0.88;
    boat.position.set(x0, 0.28, z);
    kit.sfx('wind');
    const movedP = glide(boatTok, s, 2200, (k) => {
      boat.position.x = x0 + (x1 - x0) * k;
      boat.position.z = z;
      boat.position.y = 0.28 + Math.sin(k * Math.PI * 3) * 0.04;
    });
    await kit.wait(480);
    if (boatTok.seq !== s) {
      boatHeld = false;
      return;
    }
    const waveP = playWave(0.72, false, 2300, false);
    await movedP;
    if (boatTok.seq === s) boatHeld = false;
    await waveP;
  }

  // ---------------- drum, rice, ear ----------------
  const drum = new THREE.Group();
  drum.position.set(DRM.x, 0, DRM.z);
  root.add(drum);
  const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.5, 28), kit.mat.wood('#7a3b1e'));
  shell.position.y = 0.34;
  shell.castShadow = true;
  drum.add(shell);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.035, 8, 28), kit.mat.metal(0xd6d3d1));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.58;
  drum.add(rim);
  const skin = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.035, 28), kit.mat.plastic(0xf3e6c8));
  skin.position.y = 0.58;
  skin.castShadow = true;
  drum.add(skin);
  [[-0.32, -0.28], [0.32, -0.28], [0, 0.32]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.22, 8), kit.mat.metal(0x44403c));
    leg.position.set(x, 0.08, z);
    drum.add(leg);
  });

  const riceMat = kit.mat.plastic(0xf5f0dc);
  const rice = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const rad = 0.08 + (i % 3) * 0.12;
    const g = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), riceMat);
    g.scale.set(1, 0.7, 1.5);
    g.home = new THREE.Vector3(Math.cos(a) * rad, 0.62, Math.sin(a) * rad * 0.85);
    g.position.copy(g.home);
    drum.add(g);
    rice.push(g);
  }
  const riceTag = kit.label('Rice', { size: 0.16, color: '#fef3c7' });
  riceTag.position.set(0, 0.95, 0);
  drum.add(riceTag);

  const mallet = new THREE.Group();
  mallet.position.set(-0.15, 0.95, 0.42);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.028, 0.48, 8), kit.mat.wood('#5c3317'));
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.2, 0, 0);
  const malletHead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), kit.mat.wood('#3f2a1d'));
  mallet.add(handle, malletHead);
  mallet.rotation.x = -0.45;
  drum.add(mallet);

  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.018, 8, 28),
      new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
    );
    ring.position.set(0.15, 0.7, 0);
    drum.add(ring);
    rings.push(ring);
  }

  const dots = [];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xa5f3fc, emissive: 0x22d3ee, emissiveIntensity: 0.25, roughness: 0.4 });
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat);
    d.position.set(0.72 + i * 0.1, 0.72 + Math.sin(i) * 0.04, 0);
    drum.add(d);
    dots.push(d);
  }

  const ear = new THREE.Group();
  ear.position.set(1.42, 0.78, 0);
  const earOuter = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 14), kit.mat.plastic(0xf3b6a0));
  earOuter.scale.set(0.62, 1, 0.38);
  const earInner = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), kit.mat.plastic(0xfda4af));
  earInner.position.set(0, -0.02, 0.06);
  earInner.scale.set(0.7, 1.1, 0.5);
  const earStand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.55, 10), kit.mat.metal(0x334155));
  earStand.position.y = -0.4;
  ear.add(earOuter, earInner, earStand);
  drum.add(ear);
  const earTag = kit.label('Your ear', { size: 0.18, border: '#fb7185' });
  earTag.position.set(1.42, 1.25, 0);
  drum.add(earTag);

  const SKIN_Y = 0.58;
  function restDrumVisuals() {
    skin.position.y = SKIN_Y;
    mallet.rotation.x = -0.45;
    rice.forEach((r) => r.position.copy(r.home));
    rings.forEach((ring) => {
      ring.position.x = 0.2;
      ring.scale.setScalar(0.2);
      ring.material.opacity = 0;
    });
    dots.forEach((d) => {
      d.material.emissiveIntensity = 0.25;
      d.scale.setScalar(1);
    });
    ear.scale.setScalar(1);
  }

  async function shakeDrum() {
    const s = claim(drumTok);
    restDrumVisuals();
    kit.sfx('thud');
    const ok = await glide(drumTok, s, 620, (k) => {
      const hit = Math.sin(Math.min(1, k * 2.1) * Math.PI);
      skin.position.y = SKIN_Y - hit * 0.04;
      mallet.rotation.x = -0.45 + hit * 0.9;
      rice.forEach((r, i) => {
        const u = Math.max(0, Math.min(1, (k - (i % 4) * 0.035) / 0.82));
        const hop = Math.sin(u * Math.PI) * (0.16 + (i % 3) * 0.05);
        r.position.set(r.home.x + Math.sin(u * 14 + i) * 0.012, r.home.y + hop, r.home.z);
      });
    });
    if (drumTok.seq === s) restDrumVisuals();
    return !!(ok && drumTok.seq === s);
  }

  async function spreadRings() {
    const s = claim(drumTok);
    kit.sfx('whoosh');
    const ok = await glide(drumTok, s, 1100, (k) => {
      rings.forEach((ring, i) => {
        const u = Math.max(0, Math.min(1, (k - i * 0.16) / 0.72));
        ring.position.x = 0.2 + u * 1.05;
        ring.scale.setScalar(0.35 + u * 1.8);
        ring.material.opacity = (1 - u) * 0.8;
      });
      dots.forEach((d, i) => {
        const u = k * (dots.length + 0.5);
        const near = Math.max(0, 1 - Math.abs(u - i) / 1.25);
        d.material.emissiveIntensity = 0.2 + near * 2.6;
        d.scale.setScalar(1 + near * 0.65);
      });
      const e = Math.max(0, (k - 0.7) / 0.3);
      ear.scale.setScalar(1 + Math.sin(Math.min(1, e) * Math.PI) * 0.08);
    });
    if (drumTok.seq === s) {
      rings.forEach((ring) => {
        ring.material.opacity = 0;
      });
      dots.forEach((d) => {
        d.material.emissiveIntensity = 0.25;
        d.scale.setScalar(1);
      });
      ear.scale.setScalar(1);
    }
    return !!(ok && drumTok.seq === s);
  }

  async function playDrum() {
    if (!drumLive && !drumArmed) return;
    const ok = await shakeDrum();
    if (!ok) return;
    if (drumArmed && drumTok.seq) {
      drumArmed = false;
      kit.emit('drumTapped');
      kit.vespa?.react('wow');
      kit.sfx('chime');
    }
  }
  kit.onTap(shell, () => playDrum());
  kit.onTap(skin, () => playDrum());

  function parkBoat() {
    boatHeld = false;
    boat.visible = true;
    boat.position.set(-1.35, 0.28, -0.88);
  }

  function idle() {
    claim(boatTok);
    claim(waveTok);
    claim(hitTok);
    claim(drumTok);
    claim(rampTok);
    marbleLive = false;
    waveLive = false;
    drumLive = false;
    marbleArmed = false;
    waveArmed = false;
    drumArmed = false;
    waveAmp = 0.012;
    pulse.visible = false;
    paddle.rotation.y = 0;
    parkBoat();
    shooterHome = true;
    applyRamp(rampLevel);
    parkTargets();
    shooter.position.copy(shooterHomePos());
    restDrumVisuals();
    rollRead = null;
    kit.ui.clear();
  }

  applyRamp(0.15);
  shooterHome = true;
  shooter.position.copy(shooterHomePos());
  parkTargets();
  restDrumVisuals();

  const cues = {
    idle,
    resetMarbles,
    passWave() {
      return runPassWave();
    },
    marbleMode() {
      marbleLive = true;
      marbleArmed = true;
      shooterHome = true;
      parkTargets();
      applyRamp(rampLevel);
      shooter.position.copy(shooterHomePos());
      rollTag.setText('Roll distance');
      kit.ui.clear();
      rollRead = kit.ui.readout('Last marble');
      rollRead.set(rampLevel >= 0.4 ? 'High enough. Tap Release.' : 'Too low. Slide it up.');
      kit.ui.slider({
        label: 'Ramp height',
        min: 0,
        max: 1,
        step: 0.01,
        value: rampLevel,
        onChange(v) {
          applyRamp(v);
          if (shooterHome) shooter.position.copy(shooterHomePos());
          rollRead?.set(v >= 0.4 ? 'High enough. Tap Release.' : 'Too low. Slide it up.');
        },
      });
      kit.ui.buttons([{ label: 'Release', emoji: '🎳', onClick: () => releaseMarble() }]);
    },
    async replayHit() {
      marbleArmed = false;
      marbleLive = false;
      kit.ui.clear();
      rollRead = null;
      shooterHome = true;
      const ok = await glideRamp(0.88, 380);
      if (!ok) return;
      shooterHome = false;
      return runHit(0.88);
    },
    waveMode() {
      waveLive = true;
      waveArmed = true;
      waveLevel = 0.75;
      kit.ui.clear();
      kit.ui.slider({
        label: 'Wave strength',
        min: 0.2,
        max: 1,
        step: 0.01,
        value: waveLevel,
        onChange(v) {
          waveLevel = v;
        },
      });
      kit.ui.buttons([{ label: 'Make a wave', emoji: '🌊', onClick: () => playWave(waveLevel, true) }]);
    },
    showPulse() {
      return playWave(Math.max(waveLevel, 0.65), false, 2000, true);
    },
    gulfSwell() {
      kit.sfx('wind');
      return playWave(1, false, 3200, true);
    },
    drumMode() {
      drumLive = true;
      drumArmed = true;
      restDrumVisuals();
      kit.ui.clear();
      kit.ui.buttons([{ label: 'Tap drum', emoji: '🥁', onClick: () => playDrum() }]);
    },
    showShake() {
      return shakeDrum();
    },
    showRings() {
      return spreadRings();
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0.15, 5.05, 9.5], look: [0.1, 0.75, 0] },
      pier: { pos: [-0.15, 2.55, 5.5], look: [0.3, 0.55, -0.15] },
      duck: { pos: [0.85, 1.65, 2.9], look: [0.28, 0.5, 0.12] },
      marbles: { pos: [-3.55, 2.45, 4.55], look: [-4.25, 0.5, 0] },
      wave: { pos: [0.45, 2.45, 4.85], look: [0.3, 0.5, 0.08] },
      drum: { pos: [3.45, 2.25, 4.15], look: [4.15, 0.65, 0.05] },
      ear: { pos: [4.55, 1.85, 3.35], look: [5.15, 0.8, 0.05] },
    },
    points: {
      ramp: [LAB.x - 0.7, 0.9, 0.7],
      marble: [LAB.x - 1.2, 1.0, 0.65],
      row: [LAB.x + 0.16, 0.6, 0.7],
      marks: [LAB.x + 1.55, 0.55, 0.75],
      boat: [BAY.x - 1.2, 0.75, BAY.z - 0.2],
      wave: [BAY.x, 0.7, BAY.z + 0.9],
      duck: [BAY.x + 0.05, 0.85, BAY.z + 0.85],
      paddle: [BAY.x - 1.25, 0.85, BAY.z + 0.75],
      pulse: [BAY.x + 0.5, 0.95, BAY.z + 0.8],
      lights: [BAY.x + 0.05, 1.55, BAY.z - 0.95],
      drum: [DRM.x, 0.95, DRM.z + 0.85],
      rice: [DRM.x, 0.95, DRM.z + 0.7],
      ear: [DRM.x + 1.4, 1.05, DRM.z + 0.65],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
