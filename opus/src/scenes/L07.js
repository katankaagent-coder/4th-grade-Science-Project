// Lesson 7 scene: the Moon Watch.
// Left: space view from above (Sun, Earth, Moon on a tilted orbit; the Moon's sunlit half always faces the Sun).
// Right: the backyard view of the Moon (live phase disk) and a 30-night calendar. A lamp-and-ball demo swaps in for step 2.

const T2 = Math.PI * 2;
const E = { x: -2.6, y: 1.4, z: -0.8 }; // Earth
const SUN = { x: -5.5, y: 1.4, z: -0.8 };
const MOON_ORBIT = 1.7;
const EARTH_R = 0.5;
const MOON_RAD = 0.28;
const ORBIT_TILT = 0.35; // exaggerated so the Moon misses Earth's shadow (in real life it tilts about 5 degrees)
const CYCLE_DAYS = 29.5;
const SLOTS = 30;
const PANEL = { x: 3.4, y: 2.85, z: -0.4, r: 1.0 };
const BOARD = { x: 3.4, z: -0.4 };
const LAMP = { x: 1.7, y: 2.0, z: -0.8 };
const BALL_ORBIT = 1.4;
const BALL_R = 0.4;

const norm = (t) => ((t % T2) + T2) % T2;
const dayToTheta = (d) => (d / CYCLE_DAYS) * T2;
const thetaToDay = (t) => (norm(t) / T2) * CYCLE_DAYS;
const wrapPi = (d) => {
  let x = norm(d);
  if (x > Math.PI) x -= T2;
  return x;
};

// Draw the Moon as seen from the northern half of Earth. theta 0 = new Moon, PI = full Moon.
function paintMoon(c, size, theta) {
  const m = size / 2;
  const R = size * 0.46;
  c.clearRect(0, 0, size, size);
  c.fillStyle = '#1c2438';
  c.beginPath();
  c.arc(m, m, R, 0, T2);
  c.fill();
  const k = Math.cos(theta);
  const waxing = Math.sin(theta) > 0;
  c.save();
  if (!waxing) {
    c.translate(size, 0);
    c.scale(-1, 1);
  }
  c.beginPath();
  c.arc(m, m, R, -Math.PI / 2, Math.PI / 2, false);
  c.ellipse(m, m, Math.max(0.001, Math.abs(k) * R), R, 0, Math.PI / 2, -Math.PI / 2, k > 0);
  c.closePath();
  c.fillStyle = '#f3efd2';
  c.fill();
  c.restore();
  // craters (fixed, so they do not flip between waxing and waning)
  c.save();
  c.beginPath();
  c.arc(m, m, R, 0, T2);
  c.clip();
  c.fillStyle = 'rgba(110,110,125,0.38)';
  [[-0.35, -0.3, 0.2], [0.3, -0.45, 0.13], [0.1, 0.1, 0.17], [-0.45, 0.35, 0.12], [0.45, 0.3, 0.2], [-0.05, 0.6, 0.1], [-0.1, -0.65, 0.09]].forEach(([x, y, r]) => {
    c.beginPath();
    c.arc(m + x * R, m + y * R, r * R, 0, T2);
    c.fill();
  });
  c.restore();
}

function phaseName(th) {
  const t = norm(th);
  const near = (a) => Math.abs(wrapPi(t - a)) < 0.2;
  if (near(0)) return 'New Moon';
  if (near(Math.PI / 2)) return 'First quarter';
  if (near(Math.PI)) return 'Full Moon';
  if (near((3 * Math.PI) / 2)) return 'Third quarter';
  if (t < Math.PI / 2) return 'Waxing crescent';
  if (t < Math.PI) return 'Waxing gibbous';
  if (t < (3 * Math.PI) / 2) return 'Waning gibbous';
  return 'Waning crescent';
}

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const UP = new THREE.Vector3(0, 1, 0);
  const RIGHT = new THREE.Vector3(1, 0, 0);

  const steel = (c = 0x2a3140) => kit.mat.metal(c);
  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.28, ...opts });
    s.position.set(x, y, z);
    s.userData.last = text;
    root.add(s);
    return s;
  }
  function setTxt(s, text) {
    if (s.userData.last === text) return;
    s.userData.last = text;
    s.setText(text);
  }

  // shared state
  let theta = dayToTheta(5);
  let moonSeq = 0; // claim counter: a new Moon motion cancels any older one still running
  let ballSeq = 0;
  let pulseSeq = 0;
  let task = null; // 'full' | 'new' | 'cycle' | null
  let dragOn = false;
  let namesOn = false;
  let moonSlider = null;
  let moonReadout = null;
  const visited = new Array(SLOTS).fill(false);
  let lastPainted = -10;

  // =====================================================================
  // SPACE STATION: Sun, Earth, Moon on a tilted orbit
  // =====================================================================
  const plate = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.25, 4.2), steel(0x1b2231));
  plate.position.set(-3.0, 0.125, E.z);
  plate.receiveShadow = true;
  root.add(plate);
  sign('Space view from above', -3.0, 0.55, E.z + 2.5, { size: 0.26 });

  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 20), kit.mat.glow(0xfbbf24, 1.9));
  sun.position.set(SUN.x, SUN.y, SUN.z);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.78, 24, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.16, depthWrite: false }));
  halo.position.copy(sun.position);
  root.add(sun, halo);
  sign('Sun', SUN.x, SUN.y + 1.0, SUN.z, { size: 0.24, border: '#fbbf24' });

  // sunlight beams (thin, faint) going from the Sun across the whole station
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending });
  for (let i = -2; i <= 2; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.03, 0.07), beamMat);
    b.position.set(SUN.x + 0.6 + 2.5, E.y, E.z + i * 0.7);
    root.add(b);
  }
  [-1.35, 1.35].forEach((dz) => {
    const a = kit.arrow(0xfbbf24);
    a.position.set(SUN.x + 0.7, E.y, E.z + dz);
    a.set(1.0, RIGHT);
    root.add(a);
  });
  const lightTag = sign('Sunlight', SUN.x + 1.3, E.y + 0.3, E.z - 1.9, { size: 0.2, border: '#fbbf24' });

  // Earth
  const earthTex = kit.tex.canvas(256, 128, (c, w, h) => {
    c.fillStyle = '#1d5fa8';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#3f9a4a';
    [[0.25, 0.3, 24, 14], [0.32, 0.65, 10, 20], [0.52, 0.3, 18, 12], [0.55, 0.55, 14, 16], [0.75, 0.3, 28, 12], [0.9, 0.7, 12, 9]].forEach(([u, v, rx, ry]) => {
      c.beginPath();
      c.ellipse(u * w, v * h, rx, ry, 0, 0, T2);
      c.fill();
    });
    c.fillStyle = '#f1f5f9';
    c.fillRect(0, 0, w, 8);
    c.fillRect(0, h - 8, w, 8);
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 40, 28), new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.85, emissive: 0x0a1a30, emissiveIntensity: 0.6 }));
  earth.position.set(E.x, E.y, E.z);
  earth.castShadow = true;
  root.add(earth);
  const nightGeo = (r) => new THREE.SphereGeometry(r, 36, 18, 0, T2, 0, Math.PI / 2);
  const nightMat = (op) => new THREE.MeshBasicMaterial({ color: 0x02040a, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide });
  const earthNight = new THREE.Mesh(nightGeo(EARTH_R * 1.015), nightMat(0.6));
  earthNight.position.copy(earth.position);
  earthNight.quaternion.setFromUnitVectors(UP, RIGHT); // dark side faces away from the Sun
  root.add(earthNight);
  sign('Earth', E.x, E.y + 0.85, E.z, { size: 0.24, border: '#38bdf8' });

  // Earth's shadow cone (hidden until the "shadow" step)
  const shadowGroup = new THREE.Group();
  shadowGroup.visible = false;
  root.add(shadowGroup);
  {
    const geo = new THREE.ConeGeometry(EARTH_R * 0.98, 2.6, 28, 1, true);
    geo.rotateZ(-Math.PI / 2);
    geo.translate(1.3, 0, 0);
    const cone = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide }));
    cone.position.set(E.x, E.y, E.z);
    const tag = kit.label("Earth's shadow", { size: 0.22, border: '#94a3b8' });
    tag.position.set(E.x + 1.5, E.y + 0.55, E.z);
    shadowGroup.add(cone, tag);
  }

  // Moon orbit ring (tilted a little)
  const orbitTilt = new THREE.Group();
  orbitTilt.position.set(E.x, E.y, E.z);
  orbitTilt.rotation.z = ORBIT_TILT;
  root.add(orbitTilt);
  const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(MOON_ORBIT, 0.014, 8, 128), new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.7 }));
  orbitRing.rotation.x = Math.PI / 2;
  orbitTilt.add(orbitRing);

  // the Moon
  const moon = new THREE.Group();
  root.add(moon);
  const moonBall = new THREE.Mesh(new THREE.SphereGeometry(MOON_RAD, 32, 22), new THREE.MeshStandardMaterial({ color: 0xd9d6c8, roughness: 0.95, emissive: 0x2a2a30, emissiveIntensity: 0.5 }));
  moonBall.castShadow = true;
  moon.add(moonBall);
  // a few dark patches on the side that always faces Earth
  [[0.0, 0.0], [0.5, 0.4], [-0.5, -0.3]].forEach(([a, b]) => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshStandardMaterial({ color: 0x8a877c, roughness: 1 }));
    p.scale.z = 0.35;
    p.position.set(a * MOON_RAD * 0.7, b * MOON_RAD * 0.7, MOON_RAD * 0.95);
    p.lookAt(0, 0, 0);
    moonBall.add(p);
  });
  const moonNight = new THREE.Mesh(nightGeo(MOON_RAD * 1.02), nightMat(0.78));
  moonNight.quaternion.setFromUnitVectors(UP, RIGHT);
  root.add(moonNight);
  const moonTag = kit.label('Moon: drag me!', { size: 0.2, border: '#c084fc' });
  root.add(moonTag);
  moonTag.visible = false;

  // line of sight from Earth to the Moon
  const sightPos = new Float32Array(6);
  const sightGeo = new THREE.BufferGeometry();
  sightGeo.setAttribute('position', new THREE.BufferAttribute(sightPos, 3));
  const sight = new THREE.Line(sightGeo, new THREE.LineBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.9 }));
  sight.frustumCulled = false;
  sight.visible = false;
  root.add(sight);
  const sightTag = sign('Your view', E.x, E.y - 0.7, E.z, { size: 0.2, border: '#fef08a' });
  sightTag.visible = false;

  // =====================================================================
  // BACKYARD PANEL + CALENDAR
  // =====================================================================
  const panelGroup = new THREE.Group();
  root.add(panelGroup);
  const skyTex = kit.tex.canvas(256, 256, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#050a24');
    g.addColorStop(1, '#16224f');
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#ffffff';
    for (let i = 0; i < 60; i++) {
      const s = Math.random() < 0.15 ? 2.5 : 1.2;
      c.fillRect(Math.random() * w, Math.random() * h * 0.8, s, s);
    }
    // Texas backyard: ground, a small house, a tree
    c.fillStyle = '#0a0f1a';
    c.fillRect(0, h * 0.84, w, h * 0.16);
    c.fillRect(20, h * 0.74, 44, h * 0.11);
    c.beginPath();
    c.moveTo(14, h * 0.74);
    c.lineTo(42, h * 0.66);
    c.lineTo(70, h * 0.74);
    c.fill();
    c.beginPath();
    c.arc(214, h * 0.74, 17, 0, T2);
    c.fill();
    c.fillRect(211, h * 0.76, 6, h * 0.09);
  });
  const sky = new THREE.Mesh(new THREE.CircleGeometry(PANEL.r, 56), new THREE.MeshBasicMaterial({ map: skyTex }));
  sky.position.set(PANEL.x, PANEL.y, PANEL.z);
  const frame = new THREE.Mesh(new THREE.RingGeometry(PANEL.r, PANEL.r + 0.06, 56), new THREE.MeshBasicMaterial({ color: 0xc084fc }));
  frame.position.set(PANEL.x, PANEL.y, PANEL.z + 0.005);
  const panelTex = kit.tex.canvas(256, 256, (c, w) => paintMoon(c, w, theta));
  const panelCtx = panelTex.image.getContext('2d');
  const moonDisk = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshBasicMaterial({ map: panelTex, transparent: true }));
  moonDisk.position.set(PANEL.x, PANEL.y + 0.1, PANEL.z + 0.01);
  panelGroup.add(sky, frame, moonDisk);
  const panelTitle = kit.label('What you see from your backyard', { size: 0.22, border: '#c084fc' });
  panelTitle.position.set(PANEL.x, PANEL.y + PANEL.r + 0.3, PANEL.z);
  const panelTag = kit.label('', { size: 0.24, border: '#f3efd2' });
  panelTag.position.set(PANEL.x, 1.78, PANEL.z + 0.1);
  panelTag.userData.last = '';
  panelGroup.add(panelTitle, panelTag);

  // calendar board: 30 nights in two rows
  const board = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.4, 0.12), steel(0x232b3b));
  board.position.set(BOARD.x, 0.7, BOARD.z);
  board.castShadow = true;
  panelGroup.add(board);
  const slotMesh = [];
  const slotPos = [];
  for (let i = 0; i < SLOTS; i++) {
    const row = Math.floor(i / 15);
    const col = i % 15;
    const x = 1.15 + col * 0.32;
    const y = 1.05 - row * 0.5;
    slotPos.push([x, y]);
    const th = dayToTheta(i);
    const tex = kit.tex.canvas(64, 64, (c, w) => paintMoon(c, w, th));
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.125, 24), new THREE.MeshBasicMaterial({ map: tex, transparent: true, color: 0x1a2030 }));
    m.position.set(x, y, BOARD.z + 0.07);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.125, 0.145, 24), new THREE.MeshBasicMaterial({ color: 0x475569 }));
    ring.position.set(x, y, BOARD.z + 0.065);
    panelGroup.add(m, ring);
    slotMesh.push(m);
  }
  const rowA = kit.label('Nights 1-15', { size: 0.14, border: '#475569' });
  rowA.position.set(0.78, 1.28, BOARD.z + 0.1);
  const rowB = kit.label('Nights 16-30', { size: 0.14, border: '#475569' });
  rowB.position.set(0.78, 0.78, BOARD.z + 0.1);
  panelGroup.add(rowA, rowB);
  const cursor = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.185, 24), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  cursor.position.set(slotPos[0][0], slotPos[0][1], BOARD.z + 0.08);
  panelGroup.add(cursor);
  const calTag = kit.label('', { size: 0.2, border: '#fbbf24' });
  calTag.position.set(BOARD.x, 1.62, BOARD.z + 0.1);
  calTag.userData.last = '';
  panelGroup.add(calTag);

  function markSlotAt(t) {
    const d = Math.round(thetaToDay(t)) % SLOTS;
    if (!visited[d]) {
      visited[d] = true;
      slotMesh[d].material.color.setHex(0xffffff);
    }
    return visited.every(Boolean);
  }
  function clearSlots() {
    visited.fill(false);
    slotMesh.forEach((m) => m.material.color.setHex(0x1a2030));
  }

  // =====================================================================
  // LAMP + BALL demo (step 2)
  // =====================================================================
  const demo = new THREE.Group();
  demo.visible = false;
  root.add(demo);
  {
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 1.6, 12), steel(0x475569));
    stand.position.set(LAMP.x, 0.86, LAMP.z);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.12, 24), steel(0x334155));
    foot.position.set(LAMP.x, 0.06, LAMP.z);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16), kit.mat.glow(0xfff2b0, 2.2));
    bulb.position.set(LAMP.x, LAMP.y, LAMP.z);
    const lampHalo = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 14), new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.18, depthWrite: false }));
    lampHalo.position.copy(bulb.position);
    const lampTag = kit.label('Lamp = Sun', { size: 0.22, border: '#fbbf24' });
    lampTag.position.set(LAMP.x, LAMP.y + 0.7, LAMP.z);
    const path = new THREE.Mesh(new THREE.TorusGeometry(BALL_ORBIT, 0.012, 6, 96), new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.6 }));
    path.rotation.x = Math.PI / 2;
    path.position.set(LAMP.x, 0.3, LAMP.z);
    demo.add(stand, foot, bulb, lampHalo, lampTag, path);
  }
  const ball = new THREE.Group();
  demo.add(ball);
  const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 32, 22), new THREE.MeshStandardMaterial({ color: 0xd9d6c8, roughness: 0.9, emissive: 0x2a2a30, emissiveIntensity: 0.5 }));
  const ballStick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, LAMP.y - 0.3, 8), steel(0x94a3b8));
  ballStick.position.y = -(LAMP.y - 0.3) / 2 - BALL_R * 0.8;
  const ballNight = new THREE.Mesh(nightGeo(BALL_R * 1.02), nightMat(0.8));
  const ballTag = kit.label('Ball = Moon (drag me!)', { size: 0.2, border: '#c084fc' });
  ballTag.position.y = BALL_R + 0.4;
  ball.add(ballMesh, ballStick, ballNight, ballTag);
  let psi = Math.PI; // ball angle around the lamp (PI = far left)
  let ballArmed = false;
  let ballTravel = 0;
  let ballDragOn = false;
  function setBall(a, user) {
    const d = Math.abs(wrapPi(a - psi));
    psi = a;
    ball.position.set(LAMP.x + Math.cos(psi) * BALL_ORBIT, LAMP.y, LAMP.z + Math.sin(psi) * BALL_ORBIT);
    // the dark half faces away from the lamp
    const away = new THREE.Vector3(Math.cos(psi), 0, Math.sin(psi));
    ballNight.quaternion.setFromUnitVectors(UP, away);
    if (user && ballArmed) {
      ballTravel += d;
      if (ballTravel >= 5.2) {
        ballArmed = false;
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('ballAround');
      }
    }
  }
  function glideBall(delta, ms, user) {
    const s = ++ballSeq;
    const from = psi;
    return kit.animate(ms, (k) => {
      if (ballSeq === s) setBall(from + delta * k, user);
    }, 'inOut').then(() => ballSeq === s);
  }
  kit.onDrag(ballMesh, {
    plane: 'xz',
    onMove: (p) => {
      if (!ballDragOn) return;
      ballSeq++; // the child took over: cancel any running glide
      setBall(Math.atan2(p.z - LAMP.z, p.x - LAMP.x), true);
    },
  });
  setBall(Math.PI);

  // =====================================================================
  // Moon update: position, lit half, phase disk, calendar, tasks
  // =====================================================================
  function setMoon(th) {
    theta = norm(th);
    const x = -MOON_ORBIT * Math.cos(theta);
    const z = MOON_ORBIT * Math.sin(theta);
    moon.position.set(E.x + x * Math.cos(ORBIT_TILT), E.y + x * Math.sin(ORBIT_TILT), E.z + z);
    moonNight.position.copy(moon.position);
    moonBall.rotation.y = Math.atan2(E.x - moon.position.x, E.z - moon.position.z); // same face always toward Earth
    moonTag.position.set(moon.position.x, moon.position.y + 0.6, moon.position.z);
    sightPos.set([E.x, E.y, E.z, moon.position.x, moon.position.y, moon.position.z]);
    sightGeo.attributes.position.needsUpdate = true;
    sightTag.position.set(E.x + x * 0.3, E.y - 0.45, E.z + z * 0.3 + 0.35);

    if (Math.abs(theta - lastPainted) > 0.004) {
      lastPainted = theta;
      paintMoon(panelCtx, 256, theta);
      panelTex.needsUpdate = true;
    }
    const day = thetaToDay(theta);
    const lit = Math.round(((1 - Math.cos(theta)) / 2) * 100);
    const night = Math.floor(day) + 1;
    const label = namesOn ? `${phaseName(theta)}  ·  night ${night}` : `Night ${night} of 30`;
    setTxt(panelTag, label);
    moonReadout?.set(`${namesOn ? phaseName(theta) + '  ·  ' : ''}night ${night}  ·  ${lit}% lit`);
    moonSlider?.setValue(clamp(day, 0, CYCLE_DAYS));

    const slot = Math.round(day) % SLOTS;
    cursor.position.set(slotPos[slot][0], slotPos[slot][1], BOARD.z + 0.08);
    const count = visited.filter(Boolean).length;
    setTxt(calTag, `Nights filled: ${count} / 30`);
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function evalTask(t) {
    const th = norm(t);
    if (task === 'full' && Math.abs(th - Math.PI) < 0.3) {
      task = null;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('fullMoon');
    } else if (task === 'new' && (th < 0.3 || th > T2 - 0.3)) {
      task = null;
      kit.sfx('chime');
      kit.vespa?.react('think');
      kit.emit('newMoon');
    }
  }
  // The child moved the Moon (drag or slider): walk through every angle in between so no night is skipped.
  function moveUser(from, to) {
    const steps = Math.max(1, Math.ceil(Math.abs(to - from) / 0.04));
    for (let i = 1; i <= steps; i++) {
      const t = from + ((to - from) * i) / steps;
      const all = markSlotAt(t);
      evalTask(t);
      if (task === 'cycle' && all) {
        task = null;
        setMoon(t);
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('fullCycle');
      }
    }
    setMoon(to);
  }
  // Every new Moon motion claims the counter; an older glide still running stops where it is.
  function glideMoon(delta, ms, ease = 'inOut') {
    const s = ++moonSeq;
    const from = theta;
    return kit.animate(ms, (k) => {
      if (moonSeq !== s) return;
      const t = from + delta * k;
      markSlotAt(t);
      setMoon(t);
    }, ease).then(() => moonSeq === s);
  }

  kit.onDrag(moonBall, {
    plane: 'xz',
    onMove: (p) => {
      if (!dragOn) return;
      moonSeq++; // the child took over: cancel any running glide
      const target = norm(Math.atan2(p.z - E.z, -(p.x - E.x)));
      moveUser(theta, theta + wrapPi(target - theta));
    },
  });

  function moonTools(armed) {
    kit.ui.clear();
    moonReadout = kit.ui.readout('Moon');
    moonSlider = kit.ui.slider({
      label: '🌙 Night of the month',
      min: 0,
      max: CYCLE_DAYS,
      step: 0.1,
      value: clamp(thetaToDay(theta), 0, CYCLE_DAYS),
      onChange: (v) => {
        moonSeq++;
        const cur = thetaToDay(theta);
        moveUser(dayToTheta(cur), dayToTheta(v));
      },
    });
    task = armed;
    dragOn = true;
    moonTag.visible = true;
    if (armed === 'cycle') {
      clearSlots();
      markSlotAt(theta);
    }
    setMoon(theta);
  }

  updaters.push((dt, t) => {
    halo.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    sun.rotation.y += dt * 0.3;
    cursor.scale.setScalar(1 + Math.sin(t * 6) * 0.08);
  });

  setMoon(theta);

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const cues = {
    resetAll({ day = 5 } = {}) {
      moonSeq++;
      ballSeq++;
      pulseSeq++;
      task = null;
      dragOn = false;
      ballDragOn = false;
      ballArmed = false;
      namesOn = false;
      kit.ui.clear();
      moonSlider = moonReadout = null;
      moonTag.visible = false;
      shadowGroup.visible = false;
      sight.visible = false;
      sightTag.visible = false;
      demo.visible = false;
      panelGroup.visible = true;
      beamMat.opacity = 0.1;
      moon.scale.setScalar(1);
      moonNight.scale.setScalar(1);
      clearSlots();
      setMoon(dayToTheta(day));
    },
    moonTo({ day = 7.4, ms = 1800 } = {}) {
      const delta = wrapPi(dayToTheta(day) - theta);
      return glideMoon(delta, ms).then(() => {});
    },
    // go once all the way around (used for "next full Moon" and the calendar story)
    moonLoop({ ms = 7000 } = {}) {
      return glideMoon(T2, ms, 'linear').then(() => {});
    },
    async lightPulse() {
      const s = ++pulseSeq;
      kit.sfx('whoosh');
      await kit.animate(1800, (k) => {
        if (pulseSeq === s) beamMat.opacity = 0.1 + 0.4 * Math.sin(k * Math.PI);
      });
      if (pulseSeq === s) beamMat.opacity = 0.1;
    },
    async pulseMoon() {
      const s = ++pulseSeq;
      kit.sfx('pop');
      await kit.animate(1400, (k) => {
        if (pulseSeq !== s) return;
        const v = 1 + 0.5 * Math.abs(Math.sin(k * Math.PI * 2));
        moon.scale.setScalar(v);
        moonNight.scale.setScalar(v);
      });
      if (pulseSeq === s) {
        moon.scale.setScalar(1);
        moonNight.scale.setScalar(1);
      }
    },
    sightOn() {
      sight.visible = true;
      sightTag.visible = true;
      kit.sfx('pop');
    },
    shadowOn() {
      shadowGroup.visible = true;
      kit.sfx('pop');
    },
    shadowOff() {
      shadowGroup.visible = false;
    },
    namesOn() {
      namesOn = true;
      setMoon(theta);
    },
    // lamp and ball
    demoOn() {
      demo.visible = true;
      panelGroup.visible = false;
      ballDragOn = false;
      setBall(Math.PI);
      kit.sfx('pop');
    },
    demoOff() {
      demo.visible = false;
      panelGroup.visible = true;
      ballDragOn = false;
    },
    ballDemo() {
      return glideBall(T2, 5200).then(() => {});
    },
    ballMode() {
      ballDragOn = true;
      ballArmed = true;
      ballTravel = 0;
      kit.ui.clear();
      kit.ui.buttons([
        {
          label: 'Spin it for me',
          emoji: '🔄',
          onClick: async () => {
            ballDragOn = true;
            const ok = await glideBall(T2 * 1.05, 4500, true);
            void ok;
          },
        },
      ]);
    },
    // moon controls for the tasks
    moonMode() {
      moonTools(null);
    },
    fullTask() {
      moonTools('full');
    },
    newTask() {
      moonTools('new');
    },
    cycleTask() {
      moonTools('cycle');
    },
    idle() {
      kit.ui.clear();
      moonSlider = moonReadout = null;
      task = null;
      dragOn = false;
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.4, 12.4], look: [-0.2, 1.6, -0.8] },
      space: { pos: [-2.6, 6.6, 2.4], look: [-2.6, 1.0, -0.8] },
      backyard: { pos: [3.4, 3.4, 6.0], look: [3.4, 2.4, -0.4] },
      calendar: { pos: [3.4, 2.2, 5.2], look: [3.4, 1.2, -0.4] },
      demo: { pos: [1.7, 4.0, 4.4], look: [1.7, 1.8, -0.8] },
    },
    points: {
      sun: [SUN.x, SUN.y + 1.3, SUN.z],
      earth: [E.x, E.y + 1.2, E.z],
      get moon() {
        return [moon.position.x, moon.position.y + 0.9, moon.position.z];
      },
      lamp: [LAMP.x, LAMP.y + 1.0, LAMP.z],
      get ball() {
        return [ball.position.x, ball.position.y + 0.9, ball.position.z];
      },
      panel: [PANEL.x, PANEL.y + 1.5, PANEL.z],
      calendar: [BOARD.x, 1.9, BOARD.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
