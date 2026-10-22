// Lesson 6 scene: the Seasons Lab.
// Three stations: Earth circling the Sun (tilted axis, month slider), flashlight on grid paper (tilt slider),
// and a shadow stick with a daylight-hours bar for Dickinson, Texas. One shared month controls Earth, shadow and bar.

const DEG = Math.PI / 180;
const TILT = 23.44 * DEG;
const LAT = 29.5 * DEG; // Dickinson, Texas
const T = 0.8; // table top height
const O = { x: -2.8, y: 1.3, z: -1.0 }; // Sun position (orbit centre)
const ORBIT_R = 2.3;
const EARTH_R = 0.62;
const FL = { x: 1.9, z: 1.0 };
const SH = { x: 4.1, z: -2.2 };
const STICK_X = SH.x + 0.4;
const BAR = { x: 4.1, y: 3.7, z: SH.z, w: 3.0 };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Month value v: 0 = January ... 5 = June ... 11 = December. June and December are the solstices.
const alpha = (v) => ((v - 5) / 12) * Math.PI * 2;
const decl = (v) => 23.44 * Math.cos(alpha(v)); // degrees the noon Sun sits north of the equator
const noonElev = (v) => 90 - 29.5 + decl(v); // degrees above the horizon at Dickinson
const shadowLen = (v) => 1 / Math.tan(noonElev(v) * DEG); // 1-meter stick
const dayHours = (v) => {
  const c = -Math.tan(LAT) * Math.tan(decl(v) * DEG);
  return (24 / Math.PI) * Math.acos(clamp(c, -1, 1));
};
const monthName = (v) => MONTHS[(((Math.round(v) % 12) + 12) % 12)];

export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  const updaters = [];
  const UP = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3();

  const steel = () => kit.mat.metal(0x2a3140);
  function pedestal(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, T, d), steel());
    m.position.set(x, T / 2, z);
    m.castShadow = m.receiveShadow = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.05, d + 0.1), kit.mat.metal(0x475569));
    top.position.set(x, T - 0.02, z);
    root.add(m, top);
  }
  function sign(text, x, y, z, opts) {
    const s = kit.label(text, { size: 0.3, ...opts });
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
  let month = 2; // current month value
  let monthSeq = 0; // claim counter for every month animation (a new motion cancels older ones)
  let tiltDeg = 0;
  let tiltSeq = 0;
  let task = null; // 'seasons' | 'shadow' | null (task events fire only for real slider moves)
  let junSeen = false;
  let decSeen = false;
  let lightArmed = false;
  let monthSlider = null;
  let monthReadout = null;
  let tiltSlider = null;
  let flashReadout = null;
  let spinRate = 0;
  let distOn = false;
  let ausOn = false;

  // =====================================================================
  // STATION A: Sun, Earth, tilted axis, orbit ring
  // =====================================================================
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 2.95, 0.3, 64), kit.mat.metal(0x1b2231));
  disc.position.set(O.x, 0.15, O.z);
  disc.receiveShadow = true;
  root.add(disc);
  sign('Earth circles the Sun (red pin = Dickinson)', O.x, 0.5, O.z + 3.1, { size: 0.26 });

  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 20), kit.mat.glow(0xfbbf24, 1.9));
  sun.position.set(O.x, O.y, O.z);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.16, depthWrite: false }));
  halo.position.copy(sun.position);
  root.add(sun, halo);

  const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(ORBIT_R, 0.014, 8, 128), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 }));
  orbitRing.rotation.x = Math.PI / 2;
  orbitRing.position.set(O.x, O.y, O.z);
  root.add(orbitRing);
  for (let i = 0; i < 12; i++) {
    const a = Math.PI + alpha(i);
    const isJun = i === 5;
    const isDec = i === 11;
    const l = kit.label(SHORT[i], { size: 0.17, color: isJun ? '#fbbf24' : isDec ? '#7dd3fc' : '#cbd5e1', border: isJun ? '#fbbf24' : isDec ? '#7dd3fc' : '#475569' });
    l.position.set(O.x + Math.cos(a) * (ORBIT_R + 0.5), O.y, O.z + Math.sin(a) * (ORBIT_R + 0.5));
    root.add(l);
  }

  // Earth
  const earthTex = kit.tex.canvas(512, 256, (c, w, h) => {
    c.fillStyle = '#1d5fa8';
    c.fillRect(0, 0, w, h);
    const blob = (u, lat, rx, ry, col = '#3f9a4a') => {
      c.fillStyle = col;
      c.beginPath();
      c.ellipse(u * w, (0.5 - lat / 180) * h, rx, ry, 0, 0, Math.PI * 2);
      c.fill();
    };
    blob(0.25, 42, 46, 28);
    blob(0.27, 27, 22, 16);
    blob(0.31, -15, 20, 36, '#4aa04a');
    blob(0.5, 50, 36, 20);
    blob(0.53, 5, 26, 34, '#b58a46');
    blob(0.66, 42, 58, 24);
    blob(0.9, -25, 26, 18, '#c9a050');
    c.fillStyle = '#f1f5f9';
    c.fillRect(0, 0, w, 14);
    c.fillRect(0, h - 14, w, 14);
  });
  const earthPivot = new THREE.Group();
  root.add(earthPivot);
  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.z = -TILT; // axis leans toward +x, and stays that way all year
  earthPivot.add(tiltGroup);
  const spinGroup = new THREE.Group();
  tiltGroup.add(spinGroup);
  const globe = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 48, 32), new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.85, emissive: 0x0a1a30, emissiveIntensity: 0.6 }));
  globe.castShadow = true;
  spinGroup.add(globe);
  function makePin(latDeg, u, color) {
    const lat = latDeg * DEG;
    const ph = u * Math.PI * 2;
    const dir = new THREE.Vector3(-Math.cos(ph) * Math.cos(lat), Math.sin(lat), Math.sin(ph) * Math.cos(lat));
    const g = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.2, 8), kit.mat.metal(0xe5e7eb));
    stem.position.y = 0.1;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 10), kit.mat.glow(color, 0.9));
    head.position.y = 0.22;
    g.add(stem, head);
    g.position.copy(dir).multiplyScalar(EARTH_R);
    g.quaternion.setFromUnitVectors(UP, dir);
    spinGroup.add(g);
    return g;
  }
  makePin(29.5, 0.25, 0xef4444);
  const ausPin = makePin(-33, 0.9, 0x3b82f6);
  ausPin.visible = false;

  // axis rod and Texas spin circle (these do not spin with the globe)
  const axis = new THREE.Group();
  axis.visible = false;
  tiltGroup.add(axis);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 2.1, 10), kit.mat.glow(0xf8fafc, 0.8));
  const tipN = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 12), kit.mat.glow(0xf8fafc, 0.8));
  tipN.position.y = 1.14;
  const axisTag = kit.label('Axis', { size: 0.2, border: '#f8fafc' });
  axisTag.position.set(0.28, 1.3, 0);
  axis.add(rod, tipN, axisTag);
  const spinRing = new THREE.Mesh(new THREE.TorusGeometry(Math.cos(LAT) * EARTH_R * 1.006, 0.013, 8, 64), kit.mat.glow(0xfbbf24, 1.3));
  spinRing.rotation.x = Math.PI / 2;
  spinRing.position.y = Math.sin(LAT) * EARTH_R;
  spinRing.visible = false;
  tiltGroup.add(spinRing);

  // night side: a dark half-shell that always faces away from the Sun
  const night = new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_R * 1.016, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x02040a, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide })
  );
  earthPivot.add(night);

  // sunlight beam from the Sun to Earth
  const beamGeo = new THREE.ConeGeometry(1, 1, 28, 1, true);
  beamGeo.rotateX(-Math.PI / 2);
  beamGeo.translate(0, 0, 0.5);
  const sunBeam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  sunBeam.position.copy(sun.position);
  root.add(sunBeam);

  // distance line + label
  const distPos = new Float32Array(6);
  const distGeo = new THREE.BufferGeometry();
  distGeo.setAttribute('position', new THREE.BufferAttribute(distPos, 3));
  const distLine = new THREE.Line(distGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
  distLine.frustumCulled = false;
  distLine.visible = false;
  root.add(distLine);
  const distTag = sign('About 93 million miles, all year', O.x, O.y + 0.4, O.z, { size: 0.22, border: '#ffffff' });
  distTag.visible = false;

  const earthTag = sign('', O.x, O.y + 1, O.z, { size: 0.2, border: '#fbbf24' });

  // =====================================================================
  // STATION B: flashlight and grid paper
  // =====================================================================
  pedestal(FL.x, FL.z, 2.6, 2.0);
  sign('Flashlight on grid paper', FL.x, 0.4, FL.z + 1.45, { size: 0.26 });
  const PAPER_Y = T + 0.015;
  const paperTex = kit.tex.canvas(480, 320, (c, w, h) => {
    c.fillStyle = '#f1f5f9';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = '#64748b';
    c.lineWidth = 2;
    for (let x = 0; x <= w; x += 40) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, h);
      c.stroke();
    }
    for (let y = 0; y <= h; y += 40) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(w, y);
      c.stroke();
    }
  });
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), new THREE.MeshStandardMaterial({ map: paperTex, roughness: 0.9 }));
  paper.rotation.x = -Math.PI / 2;
  paper.position.set(FL.x, PAPER_Y, FL.z);
  paper.receiveShadow = true;
  root.add(paper);
  const SPOT_R = 0.34;
  const spot = new THREE.Mesh(new THREE.CircleGeometry(SPOT_R, 48), new THREE.MeshBasicMaterial({ color: 0xfff08a, transparent: true, opacity: 1, depthWrite: false }));
  spot.rotation.x = -Math.PI / 2;
  spot.position.set(FL.x, PAPER_Y + 0.012, FL.z);
  root.add(spot);

  const SPOT_C = new THREE.Vector3(FL.x, PAPER_Y + 0.012, FL.z);
  const FL_DIST = 1.8;
  const flash = new THREE.Group();
  {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16), kit.mat.plastic(0xe11d48));
    body.rotation.x = Math.PI / 2;
    body.position.z = -0.4;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.13, 0.26, 20), kit.mat.metal(0xd1d5db));
    head.rotation.x = Math.PI / 2;
    head.position.z = 0.02;
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.18, 20), kit.mat.glow(0xfff08a, 2));
    lens.position.z = 0.16;
    const beamG = new THREE.ConeGeometry(SPOT_R, FL_DIST - 0.2, 28, 1, true);
    beamG.rotateX(-Math.PI / 2);
    beamG.translate(0, 0, (FL_DIST - 0.2) / 2 + 0.2);
    const beam = new THREE.Mesh(beamG, new THREE.MeshBasicMaterial({ color: 0xfff08a, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    flash.add(body, head, lens, beam);
    flash.traverse((o) => (o.castShadow = false));
  }
  root.add(flash);
  const flashTag = sign('', FL.x, 3.25, FL.z, { size: 0.24, border: '#fff08a' });

  const cell = 0.2;
  function setTilt(d, user) {
    tiltDeg = d;
    const th = d * DEG;
    const c = Math.cos(th);
    flash.position.set(SPOT_C.x + Math.sin(th) * FL_DIST, SPOT_C.y + Math.cos(th) * FL_DIST, SPOT_C.z);
    flash.lookAt(SPOT_C);
    spot.scale.x = 1 / c;
    spot.material.opacity = 0.22 + 0.78 * c;
    const squares = Math.round((Math.PI * SPOT_R * SPOT_R) / (cell * cell) / c);
    const bright = Math.round(100 * c);
    const how = d < 12 ? 'packed tight and bright' : d < 40 ? 'spreading out' : 'spread out and dim';
    setTxt(flashTag, `${squares} squares lit: ${how}`);
    flashReadout?.set(`Tilt ${Math.round(d)}°  ·  ${squares} squares  ·  ${bright}% bright`);
    tiltSlider?.setValue(d);
    if (user && lightArmed && d >= 45) {
      lightArmed = false;
      kit.sfx('chime');
      kit.vespa?.react('wow');
      kit.emit('lightTilted');
    }
  }
  function glideTilt(to, ms = 1200) {
    const s = ++tiltSeq;
    const from = tiltDeg;
    return kit.animate(ms, (k) => {
      if (tiltSeq === s) setTilt(from + (to - from) * k);
    }, 'inOut').then(() => tiltSeq === s);
  }

  // =====================================================================
  // STATION C: shadow stick on the field + daylight bar
  // =====================================================================
  pedestal(SH.x, SH.z, 2.9, 2.4);
  sign('Shadow stick (1 meter tall)', SH.x, 0.4, SH.z + 1.5, { size: 0.26 });
  const grass = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.03, 2.2), kit.mat.ground(0x2f6b3a));
  grass.position.set(SH.x, T + 0.01, SH.z);
  root.add(grass);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 1, 12), kit.mat.wood('#c08a4a'));
  stick.position.set(STICK_X, T + 0.5, SH.z);
  stick.castShadow = true;
  root.add(stick);
  const shGeo = new THREE.BoxGeometry(1, 0.02, 0.13);
  shGeo.translate(-0.5, 0, 0);
  const shadow = new THREE.Mesh(shGeo, new THREE.MeshBasicMaterial({ color: 0x050805, transparent: true, opacity: 0.85 }));
  shadow.position.set(STICK_X, T + 0.035, SH.z);
  root.add(shadow);
  const skySun = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), kit.mat.glow(0xfbbf24, 2));
  root.add(skySun);
  const rayPos = new Float32Array(6);
  const rayGeo = new THREE.BufferGeometry();
  rayGeo.setAttribute('position', new THREE.BufferAttribute(rayPos, 3));
  const ray = new THREE.Line(rayGeo, new THREE.LineBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.8 }));
  ray.frustumCulled = false;
  root.add(ray);
  const elevTag = sign('', SH.x, T + 2, SH.z, { size: 0.2, border: '#fbbf24' });
  const shadowTag = sign('', SH.x, T + 0.35, SH.z + 0.55, { size: 0.2, border: '#94a3b8' });

  // daylight bar
  const bar = new THREE.Group();
  bar.visible = false;
  root.add(bar);
  const barBg = new THREE.Mesh(new THREE.BoxGeometry(BAR.w, 0.3, 0.2), new THREE.MeshStandardMaterial({ color: 0x1e2a5a, roughness: 0.6 }));
  barBg.position.set(BAR.x, BAR.y, BAR.z);
  const dayGeo = new THREE.BoxGeometry(1, 0.32, 0.22);
  dayGeo.translate(0.5, 0, 0);
  const dayFill = new THREE.Mesh(dayGeo, kit.mat.glow(0xfbbf24, 0.9));
  dayFill.position.set(BAR.x - BAR.w / 2, BAR.y, BAR.z);
  const barTag = kit.label('', { size: 0.24, border: '#fbbf24' });
  barTag.position.set(BAR.x, BAR.y + 0.42, BAR.z);
  const barNote = kit.label('Yellow = daylight. Dark = night.', { size: 0.17, border: '#475569' });
  barNote.position.set(BAR.x, BAR.y - 0.36, BAR.z);
  bar.add(barBg, dayFill, barTag, barNote);

  // =====================================================================
  // month update: Earth, shadow, bar, readout
  // =====================================================================
  function setMonth(v, user) {
    month = v;
    const a = Math.PI + alpha(v);
    earthPivot.position.set(O.x + Math.cos(a) * ORBIT_R, O.y, O.z + Math.sin(a) * ORBIT_R);
    tmp.set(Math.cos(a), 0, Math.sin(a));
    night.quaternion.setFromUnitVectors(UP, tmp);
    // sunlight beam
    const dist = earthPivot.position.distanceTo(sun.position);
    sunBeam.scale.set(EARTH_R * 0.95, EARTH_R * 0.95, dist);
    sunBeam.lookAt(earthPivot.position);
    // distance line
    distPos.set([O.x, O.y, O.z, earthPivot.position.x, earthPivot.position.y, earthPivot.position.z]);
    distGeo.attributes.position.needsUpdate = true;
    distTag.position.set((O.x + earthPivot.position.x) / 2, O.y + 0.35, (O.z + earthPivot.position.z) / 2);
    // tag over Earth
    const lean = Math.cos(alpha(v));
    let text;
    if (ausOn) text = lean > 0.5 ? 'Top half leans TOWARD the Sun. Bottom leans away.' : lean < -0.5 ? 'Top half leans AWAY. Bottom half (Australia) leans TOWARD.' : 'Both halves lean sideways to the Sun';
    else text = lean > 0.5 ? `${monthName(v)}: top half leans TOWARD the Sun` : lean < -0.5 ? `${monthName(v)}: top half leans AWAY from the Sun` : `${monthName(v)}: leaning sideways to the Sun`;
    setTxt(earthTag, text);
    earthTag.position.set(earthPivot.position.x, earthPivot.position.y + 1.05, earthPivot.position.z);

    // shadow stick
    const e = noonElev(v);
    const L = shadowLen(v);
    shadow.scale.x = L;
    const er = e * DEG;
    const tipY = T + 1;
    skySun.position.set(STICK_X + Math.cos(er) * 1.2, tipY + Math.sin(er) * 1.2, SH.z);
    rayPos.set([skySun.position.x, skySun.position.y, skySun.position.z, STICK_X - L, T + 0.03, SH.z]);
    rayGeo.attributes.position.needsUpdate = true;
    elevTag.position.set(skySun.position.x, skySun.position.y + 0.42, SH.z);
    setTxt(elevTag, `Noon Sun: ${Math.round(e)}° high`);
    shadowTag.position.set(STICK_X - L / 2, T + 0.3, SH.z + 0.5);
    setTxt(shadowTag, `Shadow: ${L.toFixed(1)} m`);

    // daylight bar
    const h = dayHours(v);
    dayFill.scale.x = BAR.w * (h / 24);
    setTxt(barTag, `${monthName(v)} daylight in Dickinson: ${Math.round(h)} hours`);

    const txt = `${monthName(v)}  ·  ${Math.round(h)} h daylight  ·  shadow ${L.toFixed(1)} m`;
    monthReadout?.set(txt);
    monthSlider?.setValue(clamp(v, 0, 11.95));

    if (user && task === 'seasons') {
      if (Math.abs(v - 5) <= 0.5) junSeen = true;
      if (Math.abs(v - 11) <= 0.5) decSeen = true;
      if (junSeen && decSeen) {
        task = null;
        kit.sfx('chime');
        kit.vespa?.react('happy');
        kit.emit('seasonsVisited');
      }
    }
    if (user && task === 'shadow' && Math.abs(v - 5) <= 0.5) {
      task = null;
      kit.sfx('chime');
      kit.vespa?.react('happy');
      kit.emit('shortestShadow');
    }
  }
  // Every new month motion claims the counter; an older glide still running stops where it is.
  function glideMonth(to, ms = 1800, ease = 'inOut') {
    const s = ++monthSeq;
    const from = month;
    return kit.animate(ms, (k) => {
      if (monthSeq === s) setMonth(from + (to - from) * k);
    }, ease).then(() => monthSeq === s);
  }

  function monthTools(armed) {
    kit.ui.clear();
    tiltSlider = null;
    flashReadout = null;
    monthReadout = kit.ui.readout('Month');
    monthSlider = kit.ui.slider({
      label: '📅 Month',
      min: 0,
      max: 11.95,
      step: 0.05,
      value: clamp(month, 0, 11.95),
      onChange: (v) => {
        monthSeq++; // the child took over: cancel any running glide
        setMonth(v, true);
      },
    });
    task = armed;
    junSeen = decSeen = false;
    setMonth(month);
  }

  updaters.push((dt, t) => {
    spinGroup.rotation.y += spinRate * dt;
    sun.rotation.y += dt * 0.3;
    halo.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    skySun.rotation.y += dt;
  });

  setMonth(2);
  setTilt(0);

  // =====================================================================
  // cues used by the lesson script
  // =====================================================================
  const cues = {
    resetAll({ v = 2 } = {}) {
      monthSeq++;
      tiltSeq++;
      task = null;
      lightArmed = false;
      kit.ui.clear();
      monthSlider = monthReadout = tiltSlider = flashReadout = null;
      spinRate = 0;
      spinGroup.rotation.y = 0;
      axis.visible = false;
      spinRing.visible = false;
      distOn = false;
      distLine.visible = false;
      distTag.visible = false;
      ausOn = false;
      ausPin.visible = false;
      bar.visible = false;
      setTilt(0);
      setMonth(v);
    },
    monthTo({ v = 5, ms = 1800 } = {}) {
      return glideMonth(v, ms).then(() => {});
    },
    async distanceDemo() {
      distOn = true;
      distLine.visible = true;
      distTag.visible = true;
      kit.sfx('whoosh');
      if (await glideMonth(5, 1500)) {
        await kit.wait(400);
        await glideMonth(11, 3600);
      }
    },
    showDistance() {
      distOn = true;
      distLine.visible = true;
      distTag.visible = true;
    },
    spinOn() {
      spinRate = 1.4;
      kit.sfx('whoosh');
    },
    spinOff() {
      spinRate = 0;
    },
    async yearTrip() {
      const start = month;
      kit.sfx('wind');
      if (await glideMonth(start + 12, 7000, 'linear')) setMonth(start); // same place on the loop
    },
    axisOn() {
      axis.visible = true;
      kit.sfx('pop');
    },
    ringOn() {
      spinRing.visible = true;
      kit.sfx('pop');
    },
    monthMode() {
      monthTools('seasons');
    },
    shadowMode() {
      monthTools('shadow');
    },
    freeMonth() {
      monthTools(null);
    },
    // flashlight
    lightMode() {
      kit.ui.clear();
      monthSlider = monthReadout = null;
      flashReadout = kit.ui.readout('Flashlight');
      tiltSlider = kit.ui.slider({
        label: '🔦 Tilt',
        min: 0,
        max: 70,
        step: 1,
        value: tiltDeg,
        onChange: (d) => {
          tiltSeq++;
          setTilt(d, true);
        },
      });
      lightArmed = true;
      setTilt(tiltDeg);
    },
    lightTo({ deg = 0, ms = 1200 } = {}) {
      return glideTilt(deg, ms).then(() => {});
    },
    // daylight bar
    daylightOn() {
      bar.visible = true;
      kit.sfx('pop');
    },
    daylightOff() {
      bar.visible = false;
    },
    // Australia pin
    ausOn() {
      ausOn = true;
      ausPin.visible = true;
      kit.sfx('pop');
      setMonth(month);
    },
    idle() {
      kit.ui.clear();
      monthSlider = monthReadout = tiltSlider = flashReadout = null;
      task = null;
    },
  };

  return {
    root,
    shots: {
      wide: { pos: [0, 5.8, 12.6], look: [0, 1.3, -0.8] },
      orbit: { pos: [-2.8, 3.7, 5.6], look: [-2.8, 1.1, -1.2] },
      flash: { pos: [1.9, 2.9, 5.0], look: [1.9, 1.3, 1.0] },
      shadow: { pos: [5.6, 3.3, 2.6], look: [3.9, 1.5, -2.2] },
      daylight: { pos: [4.6, 3.6, 3.2], look: [4.0, 2.4, -2.2] },
    },
    points: {
      get sun() {
        return [O.x, O.y + 1.0, O.z];
      },
      get earth() {
        return [earthPivot.position.x, earthPivot.position.y + 1.4, earthPivot.position.z];
      },
      stick: [STICK_X, T + 1.7, SH.z],
      paper: [FL.x, 2.0, FL.z],
      bar: [BAR.x, BAR.y + 0.8, BAR.z],
    },
    cues,
    update(dt, t) {
      for (const u of updaters) u(dt, t);
    },
  };
}
