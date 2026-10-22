// ============================================================================
// Unit 3: Earth & Space Systems (TEKS 4.9A, 4.9B, 4.10A, 4.10B, 4.10C, 4.11A, 4.11B, 4.11C)
// Grade 4 Science Interactive 3D Simulations tailored for Kelenna (Dickinson, TX Context)
// ============================================================================

// ----------------------------------------------------------------------------
// Utility & Math Helpers
// ----------------------------------------------------------------------------
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const degToRad = (deg) => (deg * Math.PI) / 180;
const radToDeg = (rad) => (rad * 180) / Math.PI;

// ============================================================================
// MODULE 3.1: Seasons, Daylight & Temperature Patterns + Shadow Stick (TEKS 4.9A)
// ============================================================================
export function m3_1(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // Root container for this simulation
  const root = new THREE.Group();
  group.add(root);

  // Simulation State
  const state = {
    month: 6,              // 1 = Jan ... 6 = Jun ... 12 = Dec
    timeOfDay: 12.0,       // 6.0 (6 AM) to 18.0 (6 PM)
    orbitSpeed: 0,         // 0 = manual scrubber, >0 = auto revolution
    showSunRays: true,
    autoSpin: false,
    currentStage: 'explore'
  };

  const interactables = [];

  // --------------------------------------------------------------------------
  // (A) HELIOCENTRIC ORBITAL RIG
  // --------------------------------------------------------------------------
  const orbitRadius = 9.5;

  // Center Sun with multi-layer corona
  const sunGroup = new THREE.Group();
  root.add(sunGroup);

  const sunCoreGeo = new THREE.SphereGeometry(1.6, 32, 32);
  const sunCoreMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
  const sunCore = new THREE.Mesh(sunCoreGeo, sunCoreMat);
  sunCore.name = 'Sun Core';
  sunGroup.add(sunCore);
  interactables.push(sunCore);

  const sunGlowGeo = new THREE.SphereGeometry(2.1, 32, 32);
  const sunGlowMat = new THREE.MeshBasicMaterial({
    color: 0xfb8500,
    transparent: true,
    opacity: 0.28,
    side: THREE.BackSide
  });
  const sunGlow = new THREE.Mesh(sunGlowGeo, sunGlowMat);
  sunGroup.add(sunGlow);

  const sunLight = new THREE.PointLight(0xffedd5, 3.2, 50, 1.2);
  sunGroup.add(sunLight);

  const ambientLight = new THREE.AmbientLight(0x334155, 1.4);
  root.add(ambientLight);

  // Orbital Path Line
  const orbitPts = [];
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;
    orbitPts.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
  }
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
  const orbitMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
  const orbitLine = new THREE.Line(orbitGeo, orbitMat);
  root.add(orbitLine);

  // 4 Key Seasonal Nodes on Orbit
  const seasonsData = [
    { name: 'Summer Solstice (June 21)', month: 6, angle: 0, text: 'June Solstice', sub: 'North tilts toward Sun' },
    { name: 'Autumnal Equinox (Sept 22)', month: 9, angle: Math.PI / 2, text: 'Sept Equinox', sub: 'Equal Day & Night (12h)' },
    { name: 'Winter Solstice (Dec 21)', month: 12, angle: Math.PI, text: 'Dec Solstice', sub: 'North tilts away from Sun' },
    { name: 'Vernal Equinox (March 21)', month: 3, angle: (3 * Math.PI) / 2, text: 'March Equinox', sub: 'Equal Day & Night (12h)' }
  ];

  seasonsData.forEach((s) => {
    const markerGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16);
    const markerMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(Math.cos(s.angle) * orbitRadius, 0.05, Math.sin(s.angle) * orbitRadius);
    marker.name = s.name;
    root.add(marker);
    interactables.push(marker);

    const lbl = textures.labelSprite(s.text, { subtext: s.sub, scale: 0.9, border: '#f59e0b' });
    lbl.position.set(Math.cos(s.angle) * (orbitRadius + 1.8), 0.8, Math.sin(s.angle) * (orbitRadius + 1.8));
    root.add(lbl);
  });

  // Earth Orbit Rig:
  // earthOrbitAnchor moves along the circular orbit
  const earthOrbitAnchor = new THREE.Group();
  root.add(earthOrbitAnchor);

  // Fixed celestial tilt group: Earth's axis always tilts 23.44° in space (toward -X direction)
  const earthTiltGroup = new THREE.Group();
  earthTiltGroup.rotation.z = degToRad(23.44); // 23.5° axial tilt
  earthOrbitAnchor.add(earthTiltGroup);

  // Earth Globe
  const earthGeo = new THREE.SphereGeometry(1.0, 36, 36);
  const earthMat = new THREE.MeshStandardMaterial({
    map: textures.earthDay(),
    roughness: 0.65,
    metalness: 0.05
  });
  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.name = 'Earth Globe';
  earthTiltGroup.add(earthMesh);
  interactables.push(earthMesh);

  // North-South Polar Axis Rod
  const axisGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.0, 16);
  const axisMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
  const axisRod = new THREE.Mesh(axisGeo, axisMat);
  earthTiltGroup.add(axisRod);

  // North Pole indicator (Red) and South Pole (Blue)
  const poleGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const northCap = new THREE.Mesh(poleGeo, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  northCap.position.y = 1.5;
  earthTiltGroup.add(northCap);

  const southCap = new THREE.Mesh(poleGeo, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
  southCap.position.y = -1.5;
  earthTiltGroup.add(southCap);

  // Equator Guide Ring
  const equatorGeo = new THREE.TorusGeometry(1.04, 0.015, 12, 48);
  const equatorMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.6 });
  const equatorRing = new THREE.Mesh(equatorGeo, equatorMat);
  equatorRing.rotation.x = Math.PI / 2;
  earthTiltGroup.add(equatorRing);

  // Dickinson, TX Marker Pin on Earth (Latitude 29.46° N)
  const dickinsonPinGroup = new THREE.Group();
  const pinGeo = new THREE.ConeGeometry(0.08, 0.3, 12);
  pinGeo.translate(0, 0.15, 0);
  pinGeo.rotateX(Math.PI / 2);
  const pinMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const pinMesh = new THREE.Mesh(pinGeo, pinMat);
  pinMesh.name = 'Dickinson, TX (29.46° N)';
  dickinsonPinGroup.add(pinMesh);
  interactables.push(pinMesh);

  // Latitude 29.46° N placement on unit sphere
  const dLatRad = degToRad(29.46);
  dickinsonPinGroup.position.set(0, Math.sin(dLatRad) * 1.02, Math.cos(dLatRad) * 1.02);
  dickinsonPinGroup.lookAt(0, Math.sin(dLatRad) * 2.0, Math.cos(dLatRad) * 2.0);
  earthMesh.add(dickinsonPinGroup);

  // Solar Ray Line from Sun to Earth
  const sunRayGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0)
  ]);
  const sunRayMat = new THREE.LineDashedMaterial({
    color: 0xfef08a,
    dashSize: 0.4,
    gapSize: 0.2,
    linewidth: 2,
    transparent: true,
    opacity: 0.75
  });
  const sunRayLine = new THREE.Line(sunRayGeo, sunRayMat);
  sunRayLine.computeLineDistances();
  root.add(sunRayLine);

  // --------------------------------------------------------------------------
  // (B) DICKINSON, TX GROUND SHADOW STICK OBSERVATION PAD
  // --------------------------------------------------------------------------
  const padGroup = new THREE.Group();
  padGroup.position.set(13.5, 0, 4.5);
  root.add(padGroup);

  // Circular Dial Pad
  const padBaseGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.3, 40);
  const padBaseMat = new THREE.MeshStandardMaterial({
    map: textures.labGrid(),
    roughness: 0.8,
    metalness: 0.1
  });
  const padBase = new THREE.Mesh(padBaseGeo, padBaseMat);
  padBase.position.y = -0.15;
  padBase.name = 'Dickinson Shadow Dial Pad';
  padGroup.add(padBase);
  interactables.push(padBase);

  // Compass Rose Markings
  const compassRingGeo = new THREE.RingGeometry(3.1, 3.4, 40);
  compassRingGeo.rotateX(-Math.PI / 2);
  const compassRingMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide });
  const compassRing = new THREE.Mesh(compassRingGeo, compassRingMat);
  compassRing.position.y = 0.01;
  padGroup.add(compassRing);

  // Cardinal Direction Labels
  const northMarker = textures.labelSprite('N', { subtext: 'True North', scale: 0.7, border: '#ef4444' });
  northMarker.position.set(0, 0.4, -3.5);
  padGroup.add(northMarker);

  const southMarker = textures.labelSprite('S', { scale: 0.5, border: '#38bdf8' });
  southMarker.position.set(0, 0.4, 3.5);
  padGroup.add(southMarker);

  const eastMarker = textures.labelSprite('E', { scale: 0.5, border: '#f59e0b' });
  eastMarker.position.set(3.5, 0.4, 0);
  padGroup.add(eastMarker);

  const westMarker = textures.labelSprite('W', { scale: 0.5, border: '#f59e0b' });
  westMarker.position.set(-3.5, 0.4, 0);
  padGroup.add(westMarker);

  // Gnomon Post (Shadow Stick)
  const gnomonHeight = 1.8;
  const gnomonGeo = new THREE.CylinderGeometry(0.06, 0.07, gnomonHeight, 16);
  gnomonGeo.translate(0, gnomonHeight / 2, 0);
  const gnomonMat = new THREE.MeshStandardMaterial({
    map: textures.brushedMetal('#d97706'),
    metalness: 0.7,
    roughness: 0.3
  });
  const gnomonMesh = new THREE.Mesh(gnomonGeo, gnomonMat);
  gnomonMesh.name = 'Dickinson Gnomon Stick';
  padGroup.add(gnomonMesh);
  interactables.push(gnomonMesh);

  // Dynamic 3D Ground Shadow Plane
  const shadowGeo = new THREE.BufferGeometry();
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x0f172a,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = 0.02;
  padGroup.add(shadowMesh);

  // Mini Local Sun & Sunbeam indicator for the pad
  const localSunGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const localSunMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const localSunMesh = new THREE.Mesh(localSunGeo, localSunMat);
  padGroup.add(localSunMesh);

  const beamGeo = new THREE.BufferGeometry();
  const beamMat = new THREE.LineBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6 });
  const beamLine = new THREE.Line(beamGeo, beamMat);
  padGroup.add(beamLine);

  // Floating Status Sprite on Pad
  const padStatusSprite = textures.labelSprite('Dickinson, TX Solar Noon', {
    subtext: 'High Solar Angle: 84° | Short Shadow',
    scale: 0.85,
    border: '#10b981'
  });
  padStatusSprite.position.set(0, 3.4, 0);
  padGroup.add(padStatusSprite);

  // --------------------------------------------------------------------------
  // SOLAR & SHADOW PHYSICS CALCULATIONS (Dickinson, TX: 29.46° N)
  // --------------------------------------------------------------------------
  function calculateSolarData() {
    const lat = 29.46; // Dickinson Latitude
    const latRad = degToRad(lat);

    // Solar Declination delta (degrees): +23.45 in June, -23.45 in Dec
    const declination = 23.45 * Math.cos(((state.month - 6) / 12) * Math.PI * 2);
    const decRad = degToRad(declination);

    // Solar Hour Angle h (degrees): 12 = 0°, 6 AM = -90°, 6 PM = +90°
    const hourAngle = (state.timeOfDay - 12.0) * 15.0;
    const hRad = degToRad(hourAngle);

    // Solar Altitude Angle alpha (elevation above horizon)
    const sinAlpha = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(hRad);
    const alphaRad = Math.asin(clamp(sinAlpha, -1, 1));
    const alphaDeg = radToDeg(alphaRad);

    // Daylight duration (hours) for current declination:
    // cos(h0) = -tan(lat) * tan(dec)
    const cosH0 = -Math.tan(latRad) * Math.tan(decRad);
    const clampedCosH0 = clamp(cosH0, -1, 1);
    const h0Hours = (radToDeg(Math.acos(clampedCosH0)) * 2) / 15.0;

    // Dickinson Seasonal Temperature Model (°C)
    // Dickinson normal: August ~33°C (91°F), January ~12°C (54°F)
    const avgTempC = 22.5 + 10.5 * Math.cos(((state.month - 7.5) / 12) * Math.PI * 2);
    const avgTempF = avgTempC * 1.8 + 32;

    // Solar Azimuth (radians, 0 = North, pi/2 = East, pi = South, 3pi/2 = West)
    let azimuthRad;
    if (alphaDeg > 0.5) {
      const cosAz = (Math.sin(decRad) - Math.sin(latRad) * Math.sin(alphaRad)) /
                    (Math.cos(latRad) * Math.cos(alphaRad));
      const clampedCosAz = clamp(cosAz, -1, 1);
      const azBase = Math.acos(clampedCosAz);
      azimuthRad = hourAngle >= 0 ? Math.PI * 2 - azBase : azBase;
    } else {
      azimuthRad = hourAngle >= 0 ? degToRad(270) : degToRad(90);
    }

    // Shadow calculation
    let shadowLengthCm = 0;
    let shadowX = 0;
    let shadowZ = 0;
    const isDay = alphaDeg > 1.0;

    if (isDay) {
      const actualLengthM = gnomonHeight / Math.tan(alphaRad);
      shadowLengthCm = actualLengthM * 100;

      // Visual length clamped so it stays gracefully on the dial pad
      const visualLength = Math.min(3.3, actualLengthM * 0.85);

      // Shadow points exactly opposite to the Sun's azimuth!
      const shadowDir = azimuthRad + Math.PI;
      shadowX = Math.sin(shadowDir) * visualLength;
      shadowZ = -Math.cos(shadowDir) * visualLength;
    }

    return {
      lat,
      declination,
      alphaDeg: Math.max(0, alphaDeg),
      alphaRad: Math.max(0, alphaRad),
      azimuthRad,
      daylightHours: h0Hours,
      avgTempC,
      avgTempF,
      shadowLengthCm,
      shadowX,
      shadowZ,
      isDay
    };
  }

  // Update Geometry & Telemetry
  function syncVisuals() {
    const data = calculateSolarData();

    // 1. Position Earth in Orbit
    // June Solstice is at angle = 0 (+X), Sept at pi/2 (+Z), Dec at pi (-X), March at 3pi/2 (-Z)
    const orbitAngle = ((state.month - 6) / 12) * Math.PI * 2;
    earthOrbitAnchor.position.set(
      Math.cos(orbitAngle) * orbitRadius,
      0,
      Math.sin(orbitAngle) * orbitRadius
    );

    // 2. Earth Axial Spin (24-hour cycle)
    const dayFraction = state.timeOfDay / 24.0;
    earthMesh.rotation.y = dayFraction * Math.PI * 2;

    // 3. Sun Ray Line
    sunRayLine.visible = state.showSunRays;
    if (state.showSunRays) {
      const pts = [
        new THREE.Vector3(0, 0, 0),
        earthOrbitAnchor.position.clone()
      ];
      sunRayLine.geometry.setFromPoints(pts);
      sunRayLine.computeLineDistances();
    }

    // 4. Update Gnomon Shadow Geometry
    if (data.isDay && data.shadowLengthCm > 0) {
      shadowMesh.visible = true;
      const hw = 0.06; // stick base half-width
      const vertices = new Float32Array([
        -hw, 0, 0,
        hw, 0, 0,
        data.shadowX, 0, data.shadowZ
      ]);
      shadowGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      shadowGeo.computeVertexNormals();

      // Position local sun sphere in pad sky
      const sunSkyDist = 5.0;
      const sunSkyY = Math.max(0.5, Math.sin(data.alphaRad) * sunSkyDist);
      const sunSkyH = Math.cos(data.alphaRad) * sunSkyDist;
      const sunSkyX = Math.sin(data.azimuthRad) * sunSkyH;
      const sunSkyZ = -Math.cos(data.azimuthRad) * sunSkyH;
      localSunMesh.position.set(sunSkyX, sunSkyY, sunSkyZ);
      localSunMesh.visible = true;

      // Sunbeam line
      const beamPts = [
        localSunMesh.position.clone(),
        new THREE.Vector3(0, gnomonHeight, 0)
      ];
      beamLine.geometry.setFromPoints(beamPts);
      beamLine.visible = true;
    } else {
      shadowMesh.visible = false;
      localSunMesh.visible = false;
      beamLine.visible = false;
    }

    // 5. Season Name
    let seasonName = 'Summer';
    if (state.month >= 3 && state.month < 6) seasonName = 'Spring';
    else if (state.month >= 6 && state.month < 9) seasonName = 'Summer';
    else if (state.month >= 9 && state.month < 12) seasonName = 'Fall / Autumn';
    else seasonName = 'Winter';

    // Update Floating Pad Sprite
    const timeFormatted = `${Math.floor(state.timeOfDay)}:${state.timeOfDay % 1 >= 0.5 ? '30' : '00'}`;
    padStatusSprite.updateText(
      `Dickinson, TX (${timeFormatted})`,
      `${seasonName} | Elev: ${data.alphaDeg.toFixed(1)}° | Shadow: ${data.isDay ? data.shadowLengthCm.toFixed(0) + ' cm' : 'Night'}`,
      data.alphaDeg > 60 ? '#10b981' : data.alphaDeg > 30 ? '#f59e0b' : '#38bdf8'
    );

    // 6. Push Live Telemetry to Dashboard
    updateTelemetry([
      { label: 'Current Season', value: seasonName, unit: '', color: '#38bdf8' },
      { label: 'Dickinson Daylight', value: data.daylightHours.toFixed(1), unit: 'hrs', color: '#f59e0b' },
      { label: 'Avg Dickinson Temp', value: `${data.avgTempC.toFixed(1)}°C / ${data.avgTempF.toFixed(0)}°F`, unit: '', color: '#ef4444' },
      { label: 'Solar Elevation Angle', value: data.alphaDeg.toFixed(1), unit: '°', color: '#10b981' },
      { label: 'Gnomon Shadow Length', value: data.isDay ? data.shadowLengthCm.toFixed(1) : 'None (Night)', unit: 'cm', color: '#a855f7' }
    ]);
  }

  // Initial sync
  syncVisuals();

  return {
    interactables,
    controls: [
      { id: 'month', type: 'slider', label: 'Month of Year (1=Jan ... 12=Dec)', min: 1, max: 12, step: 1, value: state.month },
      { id: 'timeOfDay', type: 'slider', label: 'Time of Day (6:00 to 18:00)', min: 6.0, max: 18.0, step: 0.5, value: state.timeOfDay },
      {
        id: 'seasonSelect',
        type: 'select',
        label: 'Jump to Seasonal Node',
        options: ['Summer Solstice (June)', 'Autumnal Equinox (Sept)', 'Winter Solstice (Dec)', 'Vernal Equinox (March)'],
        value: 'Summer Solstice (June)'
      },
      { id: 'orbitSpeed', type: 'slider', label: 'Orbit Revolution Speed', min: 0, max: 4, step: 0.5, value: state.orbitSpeed },
      { id: 'showSunRays', type: 'toggle', label: 'Show Solar Rays', value: state.showSunRays },
      { id: 'btnNoon', type: 'button', label: 'Jump to Solar Noon (12:00)' }
    ],

    onControlChange(id, value) {
      if (id === 'month') {
        state.month = Number(value);
      } else if (id === 'timeOfDay') {
        state.timeOfDay = Number(value);
      } else if (id === 'seasonSelect') {
        if (value.includes('June')) state.month = 6;
        else if (value.includes('Sept')) state.month = 9;
        else if (value.includes('Dec')) state.month = 12;
        else if (value.includes('March')) state.month = 3;
        audio.playSfx('whoosh');
      } else if (id === 'orbitSpeed') {
        state.orbitSpeed = Number(value);
      } else if (id === 'showSunRays') {
        state.showSunRays = Boolean(value);
      } else if (id === 'btnNoon') {
        state.timeOfDay = 12.0;
        audio.playSfx('click');
      }
      syncVisuals();
    },

    onObjectClick(mesh) {
      audio.playSfx('click');
      if (mesh.name && mesh.name.includes('Solstice')) {
        state.month = mesh.name.includes('June') ? 6 : 12;
        syncVisuals();
      } else if (mesh.name && mesh.name.includes('Equinox')) {
        state.month = mesh.name.includes('Sept') ? 9 : 3;
        syncVisuals();
      } else if (mesh.name && mesh.name.includes('Gnomon')) {
        audio.playSfx('spark');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.currentStage = stage;
      if (stage === 'elaborate') {
        // Prepare state for challenge
        state.orbitSpeed = 0;
        syncVisuals();
      }
    },

    runElaborateChallenge() {
      // Challenge: Set Earth to Winter Solstice (December, Month 12) at Solar Noon (11.5 - 12.5 hrs)
      const data = calculateSolarData();
      const isDecember = state.month === 12;
      const isSolarNoon = state.timeOfDay >= 11.5 && state.timeOfDay <= 12.5;

      if (isDecember && isSolarNoon) {
        audio.playSfx('success');
        return {
          passed: true,
          score: 100,
          feedback: `Mastery achieved! At Dickinson's Winter Solstice, the Northern Hemisphere tilts directly away from the Sun. The midday solar elevation drops to only ${data.alphaDeg.toFixed(1)}°, producing Dickinson's longest noon shadow of the year (${data.shadowLengthCm.toFixed(0)} cm) and shortest daylight (~${data.daylightHours.toFixed(1)} hrs)!`
        };
      }

      return {
        passed: false,
        score: Math.round((isDecember ? 50 : 10) + (isSolarNoon ? 40 : 0)),
        feedback: `Not quite aligned! For the Winter Solstice challenge in Dickinson, TX, set Month to 12 (December) and Time of Day to Solar Noon (12:00 PM). Currently: Month ${state.month}, Time ${state.timeOfDay}:00.`
      };
    },

    update(dt, elapsed) {
      // Sun slow corona pulsation
      const glowScale = 1.0 + Math.sin(elapsed * 2.5) * 0.04;
      sunGlow.scale.set(glowScale, glowScale, glowScale);

      // Auto orbit progression if enabled
      if (state.orbitSpeed > 0) {
        state.month += dt * state.orbitSpeed * 0.4;
        if (state.month > 12) state.month = 1;
        syncVisuals();
      }
    }
  };
}

// ============================================================================
// MODULE 3.2: Lunar Phases & Orbital Mechanics (TEKS 4.9B)
// ============================================================================
export function m3_2(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  const root = new THREE.Group();
  group.add(root);

  const state = {
    lunarDay: 0.0,       // 0 to 29.53 days
    autoOrbit: false,
    orbitSpeed: 1.0,
    showTelescopeRay: true,
    currentStage: 'explore'
  };

  const interactables = [];

  // --------------------------------------------------------------------------
  // (A) SUN-EARTH-MOON SPACE SYSTEM
  // --------------------------------------------------------------------------
  const moonOrbitRadius = 7.5;

  // Directional Sun incoming from +X direction
  const sunGroup = new THREE.Group();
  sunGroup.position.set(16, 0, 0);
  root.add(sunGroup);

  const sunDiscGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.2, 32);
  sunDiscGeo.rotateZ(Math.PI / 2);
  const sunDiscMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const sunDisc = new THREE.Mesh(sunDiscGeo, sunDiscMat);
  sunDisc.name = 'Directional Sun';
  sunGroup.add(sunDisc);
  interactables.push(sunDisc);

  const sunLabel = textures.labelSprite('Sunlight (Rays from East)', { subtext: 'Illuminates 50% of Moon always', border: '#f59e0b', scale: 0.85 });
  sunLabel.position.set(16, 3.2, 0);
  root.add(sunLabel);

  // Parallel Sunlight Beams
  const raysGroup = new THREE.Group();
  root.add(raysGroup);
  for (let y = -3; y <= 3; y += 2) {
    for (let z = -4; z <= 4; z += 2.5) {
      const rayGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(14, y, z),
        new THREE.Vector3(-10, y, z)
      ]);
      const rayMat = new THREE.LineDashedMaterial({
        color: 0xfef08a,
        dashSize: 0.6,
        gapSize: 0.3,
        transparent: true,
        opacity: 0.35
      });
      const ray = new THREE.Line(rayGeo, rayMat);
      ray.computeLineDistances();
      raysGroup.add(ray);
    }
  }

  // Directional Light from +X
  const sunDirLight = new THREE.DirectionalLight(0xfffbeb, 2.8);
  sunDirLight.position.set(25, 0, 0);
  sunDirLight.target.position.set(0, 0, 0);
  root.add(sunDirLight);
  root.add(sunDirLight.target);

  // Ambient Fill Light (Space is dark, but earthlight provides subtle bounce)
  const spaceAmbient = new THREE.AmbientLight(0x1e293b, 0.45);
  root.add(spaceAmbient);

  // Central Earth
  const earthGeo = new THREE.SphereGeometry(1.4, 36, 36);
  const earthMat = new THREE.MeshStandardMaterial({
    map: textures.earthDay(),
    roughness: 0.6,
    metalness: 0.1
  });
  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.name = 'Earth';
  root.add(earthMesh);
  interactables.push(earthMesh);

  // Dickinson Observer Marker on Earth
  const obsGeo = new THREE.CylinderGeometry(0.04, 0.08, 0.35, 12);
  obsGeo.translate(0, 0.175, 0);
  obsGeo.rotateX(Math.PI / 2);
  const obsMesh = new THREE.Mesh(obsGeo, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  obsMesh.position.set(0, Math.sin(degToRad(29.46)) * 1.42, Math.cos(degToRad(29.46)) * 1.42);
  earthMesh.add(obsMesh);

  // Moon Orbit Ring
  const moonOrbitPts = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    moonOrbitPts.push(new THREE.Vector3(Math.cos(a) * moonOrbitRadius, 0, Math.sin(a) * moonOrbitRadius));
  }
  const moonOrbitLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(moonOrbitPts),
    new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 })
  );
  root.add(moonOrbitLine);

  // Orbiting Moon Mesh
  const moonGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const moonMat = new THREE.MeshStandardMaterial({
    map: textures.moonRegolith(),
    roughness: 0.9,
    metalness: 0.0
  });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonMesh.name = 'Moon in Orbit';
  root.add(moonMesh);
  interactables.push(moonMesh);

  // 8 Phase Markers around Orbit
  const phaseDefinitions = [
    { name: 'New Moon', day: 0.0, angle: 0, fraction: 0.0 },
    { name: 'Waxing Crescent', day: 3.7, angle: Math.PI / 4, fraction: 0.25 },
    { name: 'First Quarter', day: 7.4, angle: Math.PI / 2, fraction: 0.5 },
    { name: 'Waxing Gibbous', day: 11.1, angle: (3 * Math.PI) / 4, fraction: 0.75 },
    { name: 'Full Moon', day: 14.8, angle: Math.PI, fraction: 1.0 },
    { name: 'Waning Gibbous', day: 18.4, angle: (5 * Math.PI) / 4, fraction: 0.75 },
    { name: 'Third Quarter', day: 22.1, angle: (3 * Math.PI) / 2, fraction: 0.5 },
    { name: 'Waning Crescent', day: 25.8, angle: (7 * Math.PI) / 4, fraction: 0.25 }
  ];

  phaseDefinitions.forEach((p) => {
    const discGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16);
    const discMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.set(Math.cos(p.angle) * moonOrbitRadius, -0.05, Math.sin(p.angle) * moonOrbitRadius);
    disc.name = p.name;
    root.add(disc);
    interactables.push(disc);
  });

  // Sight Line from Earth Observer to Moon
  const sightLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0)
  ]);
  const sightLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
  const sightLine = new THREE.Line(sightLineGeo, sightLineMat);
  root.add(sightLine);

  // --------------------------------------------------------------------------
  // (B) 3D VIEW FROM EARTH TELESCOPE DIORAMA (Elevated above system)
  // --------------------------------------------------------------------------
  const telescopeGroup = new THREE.Group();
  telescopeGroup.position.set(-8.5, 4.8, 0);
  root.add(telescopeGroup);

  // Telescope Outer Casing Ring
  const scopeBezelGeo = new THREE.TorusGeometry(2.2, 0.14, 16, 64);
  const scopeBezelMat = new THREE.MeshStandardMaterial({
    map: textures.brushedMetal('#b45309'),
    metalness: 0.8,
    roughness: 0.2
  });
  const scopeBezel = new THREE.Mesh(scopeBezelGeo, scopeBezelMat);
  scopeBezel.name = 'Dickinson Telescope Viewport';
  telescopeGroup.add(scopeBezel);
  interactables.push(scopeBezel);

  // Dark Space Backdrop Inside Eyepiece
  const scopeBackdropGeo = new THREE.CircleGeometry(2.15, 48);
  const scopeBackdropMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
  const scopeBackdrop = new THREE.Mesh(scopeBackdropGeo, scopeBackdropMat);
  scopeBackdrop.position.z = -0.05;
  telescopeGroup.add(scopeBackdrop);

  // Crosshair reticle lines
  const reticleMat = new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.35 });
  const reticlePts = [
    new THREE.Vector3(-2.1, 0, 0.01), new THREE.Vector3(2.1, 0, 0.01),
    new THREE.Vector3(0, -2.1, 0.01), new THREE.Vector3(0, 2.1, 0.01)
  ];
  const reticleGeo = new THREE.BufferGeometry().setFromPoints(reticlePts);
  const reticleLines = new THREE.LineSegments(reticleGeo, reticleMat);
  telescopeGroup.add(reticleLines);

  // Dynamic Telescope Moon (CanvasTexture-driven for physically accurate phase mask)
  const moonCanvas = document.createElement('canvas');
  moonCanvas.width = 512;
  moonCanvas.height = 512;
  const moonCtx = moonCanvas.getContext('2d');
  const telescopeMoonTex = new THREE.CanvasTexture(moonCanvas);

  const telescopeMoonGeo = new THREE.PlaneGeometry(3.2, 3.2);
  const telescopeMoonMat = new THREE.MeshBasicMaterial({
    map: telescopeMoonTex,
    transparent: true,
    side: THREE.DoubleSide
  });
  const telescopeMoonMesh = new THREE.Mesh(telescopeMoonGeo, telescopeMoonMat);
  telescopeMoonMesh.position.z = 0.02;
  telescopeGroup.add(telescopeMoonMesh);

  // Header Sprite above telescope
  const scopeHeaderSprite = textures.labelSprite('Dickinson, TX Telescope View', {
    subtext: 'Phase: Waxing Crescent (25% Lit)',
    scale: 0.85,
    border: '#38bdf8'
  });
  scopeHeaderSprite.position.set(0, 2.8, 0);
  telescopeGroup.add(scopeHeaderSprite);

  // --------------------------------------------------------------------------
  // LUNAR PHASE RENDERING LOGIC
  // --------------------------------------------------------------------------
  function drawTelescopeMoon(phaseAngleRad) {
    moonCtx.clearRect(0, 0, 512, 512);

    const cx = 256;
    const cy = 256;
    const r = 230;

    // Phase fraction f: 0 = New, 0.5 = Quarter, 1.0 = Full
    // phaseAngleRad: 0 at New Moon (+X), pi/2 at First Quarter (+Z), pi at Full Moon (-X), 3pi/2 at Third Quarter (-Z)
    const normalizedAngle = ((phaseAngleRad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const illumination = (1 - Math.cos(normalizedAngle)) / 2;
    const isWaxing = normalizedAngle < Math.PI;

    // 1. Draw Dark Base Disc (Earthshine)
    moonCtx.save();
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
    moonCtx.fillStyle = '#1e293b';
    moonCtx.fill();

    // Subtle craters on dark side
    moonCtx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    [
      [200, 180, 24], [310, 290, 36], [240, 340, 20], [280, 160, 28]
    ].forEach(([x, y, rad]) => {
      moonCtx.beginPath();
      moonCtx.arc(x, y, rad, 0, Math.PI * 2);
      moonCtx.fill();
    });

    // 2. Draw Illuminated Moon Face
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
    moonCtx.clip();

    // Lit side fill (soft regolith silver)
    moonCtx.fillStyle = '#f8fafc';

    // The terminator ellipse width: cos(angle) * r
    const termW = Math.cos(normalizedAngle) * r;

    moonCtx.beginPath();
    if (isWaxing) {
      // Lit limb is on the RIGHT side
      moonCtx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
      if (termW >= 0) {
        // Crescent: curve inward to right
        moonCtx.ellipse(cx, cy, termW, r, 0, Math.PI / 2, -Math.PI / 2, true);
      } else {
        // Gibbous: curve outward to left
        moonCtx.ellipse(cx, cy, Math.abs(termW), r, 0, Math.PI / 2, -Math.PI / 2, false);
      }
    } else {
      // Waning: Lit limb is on the LEFT side
      moonCtx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false);
      if (termW <= 0) {
        // Crescent: curve inward to left
        moonCtx.ellipse(cx, cy, Math.abs(termW), r, 0, -Math.PI / 2, Math.PI / 2, true);
      } else {
        // Gibbous: curve outward to right
        moonCtx.ellipse(cx, cy, termW, r, 0, -Math.PI / 2, Math.PI / 2, false);
      }
    }
    moonCtx.closePath();
    moonCtx.fill();

    // Add crater texture details to lit area
    moonCtx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    [
      [220, 210, 28], [270, 230, 42], [320, 180, 25], [190, 300, 32],
      [260, 320, 38], [210, 150, 18], [290, 350, 22]
    ].forEach(([x, y, rad]) => {
      moonCtx.beginPath();
      moonCtx.arc(x, y, rad, 0, Math.PI * 2);
      moonCtx.fill();
    });

    moonCtx.restore();

    // Outer subtle atmospheric glow rim
    moonCtx.strokeStyle = 'rgba(248, 250, 252, 0.4)';
    moonCtx.lineWidth = 3;
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
    moonCtx.stroke();

    telescopeMoonTex.needsUpdate = true;
    return illumination;
  }

  function syncSimulation() {
    // Current orbital angle theta (0 at New Moon, pi at Full Moon)
    const theta = (state.lunarDay / 29.53) * Math.PI * 2;

    // Position Moon in space orbit
    moonMesh.position.set(
      Math.cos(theta) * moonOrbitRadius,
      0,
      Math.sin(theta) * moonOrbitRadius
    );

    // Update Sight Line
    sightLine.visible = state.showTelescopeRay;
    if (state.showTelescopeRay) {
      sightLine.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        moonMesh.position.clone()
      ]);
    }

    // Draw 3D Telescope View
    const illumination = drawTelescopeMoon(theta);
    const illPercent = Math.round(illumination * 100);

    // Determine Phase Name
    let phaseName = 'New Moon';
    const day = state.lunarDay;
    if (day < 1.8 || day >= 27.7) phaseName = 'New Moon';
    else if (day < 5.5) phaseName = 'Waxing Crescent';
    else if (day < 9.2) phaseName = 'First Quarter';
    else if (day < 13.0) phaseName = 'Waxing Gibbous';
    else if (day < 16.6) phaseName = 'Full Moon';
    else if (day < 20.3) phaseName = 'Waning Gibbous';
    else if (day < 24.0) phaseName = 'Third Quarter';
    else phaseName = 'Waning Crescent';

    // Update Scope Label
    scopeHeaderSprite.updateText(
      `Dickinson View: ${phaseName}`,
      `${illPercent}% Illuminated | Day ${state.lunarDay.toFixed(1)} of 29.5`,
      illPercent > 75 ? '#f59e0b' : illPercent > 25 ? '#38bdf8' : '#94a3b8'
    );

    // Calculate Moonrise Time approximation
    // New Moon rises ~6 AM, 1st Qtr ~12 PM, Full ~6 PM, 3rd Qtr ~12 AM
    const moonriseHour = Math.floor(((state.lunarDay / 29.53) * 24 + 6) % 24);
    const moonriseFormatted = `${moonriseHour}:00`;

    // Tidal State (Spring vs Neap)
    const isSpringTide = phaseName === 'New Moon' || phaseName === 'Full Moon';
    const tidalState = isSpringTide ? 'Spring Tides (Higher Highs / Lower Lows)' : 'Neap Tides (Moderate / Weak)';

    // Update Telemetry
    updateTelemetry([
      { label: 'Current Lunar Phase', value: phaseName, unit: '', color: '#38bdf8' },
      { label: 'Dickinson Visible Illum.', value: `${illPercent}`, unit: '%', color: '#f59e0b' },
      { label: 'Lunar Cycle Day', value: state.lunarDay.toFixed(1), unit: 'days', color: '#10b981' },
      { label: 'Approx Moonrise Time', value: moonriseFormatted, unit: '', color: '#a855f7' },
      { label: 'Galveston Bay Tidal Effect', value: isSpringTide ? 'Spring Tide' : 'Neap Tide', unit: '', color: '#06b6d4' }
    ]);
  }

  // Initial sync
  syncSimulation();

  return {
    interactables,
    controls: [
      { id: 'lunarDay', type: 'slider', label: 'Lunar Day (0 to 29.5)', min: 0.0, max: 29.5, step: 0.1, value: state.lunarDay },
      {
        id: 'phaseJump',
        type: 'select',
        label: 'Jump to Key Lunar Phase',
        options: [
          'New Moon (Day 0)',
          'Waxing Crescent (Day 3.7)',
          'First Quarter (Day 7.4)',
          'Waxing Gibbous (Day 11.1)',
          'Full Moon (Day 14.8)',
          'Waning Gibbous (Day 18.4)',
          'Third Quarter (Day 22.1)',
          'Waning Crescent (Day 25.8)'
        ],
        value: 'New Moon (Day 0)'
      },
      { id: 'autoOrbit', type: 'toggle', label: 'Auto Orbit Revolution', value: state.autoOrbit },
      { id: 'orbitSpeed', type: 'slider', label: 'Simulation Speed', min: 0.5, max: 4.0, step: 0.5, value: state.orbitSpeed },
      { id: 'showTelescopeRay', type: 'toggle', label: 'Show Observer Sight Line', value: state.showTelescopeRay }
    ],

    onControlChange(id, value) {
      if (id === 'lunarDay') {
        state.lunarDay = Number(value);
      } else if (id === 'phaseJump') {
        if (value.includes('New Moon')) state.lunarDay = 0.0;
        else if (value.includes('Waxing Crescent')) state.lunarDay = 3.7;
        else if (value.includes('First Quarter')) state.lunarDay = 7.4;
        else if (value.includes('Waxing Gibbous')) state.lunarDay = 11.1;
        else if (value.includes('Full Moon')) state.lunarDay = 14.8;
        else if (value.includes('Waning Gibbous')) state.lunarDay = 18.4;
        else if (value.includes('Third Quarter')) state.lunarDay = 22.1;
        else if (value.includes('Waning Crescent')) state.lunarDay = 25.8;
        audio.playSfx('whoosh');
      } else if (id === 'autoOrbit') {
        state.autoOrbit = Boolean(value);
      } else if (id === 'orbitSpeed') {
        state.orbitSpeed = Number(value);
      } else if (id === 'showTelescopeRay') {
        state.showTelescopeRay = Boolean(value);
      }
      syncSimulation();
    },

    onObjectClick(mesh) {
      audio.playSfx('click');
      phaseDefinitions.forEach((p) => {
        if (mesh.name === p.name) {
          state.lunarDay = p.day;
          syncSimulation();
        }
      });
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.currentStage = stage;
      if (stage === 'elaborate') {
        state.autoOrbit = false;
        syncSimulation();
      }
    },

    runElaborateChallenge() {
      // Challenge: Set lunar phase to First Quarter (Day 7.4 +- 1.2 days)
      const diff = Math.abs(state.lunarDay - 7.38);
      if (diff <= 1.2) {
        audio.playSfx('success');
        return {
          passed: true,
          score: 100,
          feedback: `Outstanding! At First Quarter (Day ${state.lunarDay.toFixed(1)}), the Moon has completed 1/4 of its orbit around Earth. Exactly half of the visible lunar disc is illuminated on the right side from Dickinson, TX!`
        };
      }

      return {
        passed: false,
        score: Math.max(10, Math.round(100 - diff * 15)),
        feedback: `First Quarter target not yet reached. Adjust Lunar Day to approx 7.4 days (or use the phase selector). Currently on Day ${state.lunarDay.toFixed(1)}.`
      };
    },

    update(dt) {
      // Earth axial spin
      earthMesh.rotation.y += dt * 0.4;

      if (state.autoOrbit) {
        state.lunarDay += dt * state.orbitSpeed * 1.5;
        if (state.lunarDay >= 29.53) state.lunarDay = 0;
        syncSimulation();
      }
    }
  };
}

// ============================================================================
// MODULE 3.3: Water Cycle & Weather vs. Climate (TEKS 4.10A, 4.10C)
// ============================================================================
export function m3_3(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  const root = new THREE.Group();
  group.add(root);

  const state = {
    solarIntensity: 75,   // 0 to 100%
    humidity: 65,         // 20 to 100%
    windSpeed: 15,        // 0 to 50 mph
    mode: 'weather',      // 'weather' | 'climate'
    currentStage: 'explore'
  };

  const interactables = [];

  // --------------------------------------------------------------------------
  // (A) COASTAL CROSS-SECTION DIORAMA
  // Stretching from Galveston Bay (Right) to Dickinson Bayou & Plains (Left)
  // --------------------------------------------------------------------------
  const dioramaWidth = 18;
  const dioramaDepth = 8;

  // Base Pedestal
  const baseGeo = new THREE.BoxGeometry(dioramaWidth, 2.8, dioramaDepth);
  const baseMat = new THREE.MeshStandardMaterial({
    map: textures.rockStrata(),
    roughness: 0.8
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = -1.4;
  root.add(baseMesh);

  // 1. Galveston Bay / Gulf of Mexico (Right side: x = 1.5 to 9)
  const waterGeo = new THREE.PlaneGeometry(7.5, dioramaDepth, 32, 16);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.3,
    transparent: true,
    opacity: 0.82
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(5.25, 0.05, 0);
  waterMesh.name = 'Galveston Bay Water Surface';
  root.add(waterMesh);
  interactables.push(waterMesh);

  // Sandy Shoreline & Seabed under bay
  const shoreGeo = new THREE.BoxGeometry(7.5, 0.4, dioramaDepth);
  const shoreMat = new THREE.MeshStandardMaterial({ map: textures.sandpaper(), roughness: 0.9 });
  const shoreMesh = new THREE.Mesh(shoreGeo, shoreMat);
  shoreMesh.position.set(5.25, -0.2, 0);
  root.add(shoreMesh);

  // 2. Dickinson Coastal Plain (Left side: x = -9 to -1.5)
  const plainGeo = new THREE.BoxGeometry(7.5, 0.8, dioramaDepth);
  const plainMat = new THREE.MeshStandardMaterial({ map: textures.turf(), roughness: 0.7 });
  const plainMesh = new THREE.Mesh(plainGeo, plainMat);
  plainMesh.position.set(-5.25, 0.4, 0);
  plainMesh.name = 'Dickinson Coastal Plains';
  root.add(plainMesh);
  interactables.push(plainMesh);

  // 3. Dickinson Bayou Channel (Sloped transition: x = -1.5 to 1.5)
  const bayouGeo = new THREE.BoxGeometry(3.0, 0.4, dioramaDepth);
  const bayouMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.2 });
  const bayouMesh = new THREE.Mesh(bayouGeo, bayouMat);
  bayouMesh.position.set(0, 0.1, 0);
  bayouMesh.name = 'Dickinson Bayou Estuary';
  root.add(bayouMesh);
  interactables.push(bayouMesh);

  // Subsurface Aquifer Cutaway Layer on Front Edge (z = 4)
  const aquiferGeo = new THREE.BoxGeometry(dioramaWidth, 0.8, 0.1);
  const aquiferMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.6,
    roughness: 0.3
  });
  const aquiferMesh = new THREE.Mesh(aquiferGeo, aquiferMat);
  aquiferMesh.position.set(0, -0.9, dioramaDepth / 2 + 0.06);
  root.add(aquiferMesh);

  const aquiferLabel = textures.labelSprite('Groundwater Infiltration & Aquifer', { scale: 0.65, border: '#0284c7' });
  aquiferLabel.position.set(-4, -0.9, dioramaDepth / 2 + 0.2);
  root.add(aquiferLabel);

  // --------------------------------------------------------------------------
  // (B) 3D WEATHER STATION INSTRUMENTS (On the Coastal Plain)
  // --------------------------------------------------------------------------
  const weatherStationGroup = new THREE.Group();
  weatherStationGroup.position.set(-6.5, 0.8, -1.5);
  root.add(weatherStationGroup);

  // Station Mast
  const mastGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.2, 12);
  mastGeo.translate(0, 1.1, 0);
  const mastMat = new THREE.MeshStandardMaterial({ map: textures.brushedMetal(), metalness: 0.8 });
  const mast = new THREE.Mesh(mastGeo, mastMat);
  weatherStationGroup.add(mast);

  // Spinning 3-Cup Anemometer
  const anemometerGroup = new THREE.Group();
  anemometerGroup.position.set(0, 2.2, 0);
  weatherStationGroup.add(anemometerGroup);

  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    armGeo.rotateZ(Math.PI / 2);
    armGeo.translate(0.22, 0, 0);
    const arm = new THREE.Mesh(armGeo, mastMat);
    arm.rotation.y = angle;
    anemometerGroup.add(arm);

    const cupGeo = new THREE.SphereGeometry(0.08, 12, 12, 0, Math.PI);
    cupGeo.rotateY(Math.PI / 2);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    cup.position.set(Math.cos(angle) * 0.45, 0, Math.sin(angle) * 0.45);
    cup.rotation.y = angle;
    anemometerGroup.add(cup);
  }

  // Rain Gauge Tube
  const gaugeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16);
  gaugeGeo.translate(0, 0.4, 0);
  const gaugeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1
  });
  const rainGauge = new THREE.Mesh(gaugeGeo, gaugeMat);
  rainGauge.position.set(0.6, 0.8, 0);
  weatherStationGroup.add(rainGauge);

  // Rain Water Level Inside Gauge
  const rainWaterGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
  rainWaterGeo.translate(0, 0.25, 0);
  const rainWaterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
  const rainWaterMesh = new THREE.Mesh(rainWaterGeo, rainWaterMat);
  rainGauge.add(rainWaterMesh);

  // Weather Station Label
  const stationLabel = textures.labelSprite('Dickinson Weather Station', {
    subtext: 'Anemometer, Rain Gauge & Barometer',
    scale: 0.7,
    border: '#10b981'
  });
  stationLabel.position.set(-6.5, 3.4, -1.5);
  root.add(stationLabel);

  // --------------------------------------------------------------------------
  // (C) ATMOSPHERIC WATER CYCLE PARTICLES & CLOUDS
  // --------------------------------------------------------------------------
  // Glowing Sun
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  sunMesh.position.set(5.5, 6.5, -2.5);
  sunMesh.name = 'Solar Engine (Driving Evaporation)';
  root.add(sunMesh);
  interactables.push(sunMesh);

  const sunLight = new THREE.PointLight(0xfef08a, 2.5, 30);
  sunLight.position.copy(sunMesh.position);
  root.add(sunLight);

  // 1. Evaporation Vapor Particles (Rising from Galveston Bay)
  const evapCount = 120;
  const evapGeo = new THREE.BufferGeometry();
  const evapPos = new Float32Array(evapCount * 3);
  const evapSpeeds = new Float32Array(evapCount);

  for (let i = 0; i < evapCount; i++) {
    evapPos[i * 3 + 0] = 2.0 + Math.random() * 6.5; // X over bay
    evapPos[i * 3 + 1] = 0.2 + Math.random() * 4.5; // Y height
    evapPos[i * 3 + 2] = (Math.random() - 0.5) * dioramaDepth; // Z
    evapSpeeds[i] = 0.8 + Math.random() * 1.2;
  }
  evapGeo.setAttribute('position', new THREE.BufferAttribute(evapPos, 3));

  const evapMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.22,
    transparent: true,
    opacity: 0.75
  });
  const evapPoints = new THREE.Points(evapGeo, evapMat);
  root.add(evapPoints);

  // 2. Condensation Clouds (Morphing Puffy Cumulus / Cumulonimbus)
  const cloudGroup = new THREE.Group();
  cloudGroup.position.set(-1.5, 5.2, 0);
  root.add(cloudGroup);

  const cloudPuffs = [];
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.95,
    metalness: 0.0,
    transparent: true,
    opacity: 0.92
  });

  const puffOffsets = [
    [0, 0, 0, 1.4],
    [-1.2, -0.2, 0.4, 1.1],
    [1.1, -0.1, -0.3, 1.2],
    [-0.5, 0.4, -0.2, 1.0],
    [0.7, 0.3, 0.3, 0.9],
    [-1.8, -0.4, -0.2, 0.8],
    [1.9, -0.3, 0.2, 0.85]
  ];

  puffOffsets.forEach(([ox, oy, oz, r]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), cloudMat);
    puff.position.set(ox, oy, oz);
    cloudGroup.add(puff);
    cloudPuffs.push(puff);
  });

  // 3. Precipitation Rain Particles (Falling under clouds)
  const rainCount = 280;
  const rainGeo = new THREE.BufferGeometry();
  const rainPos = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) {
    rainPos[i * 3 + 0] = -4.5 + Math.random() * 6.0; // X
    rainPos[i * 3 + 1] = Math.random() * 4.8;        // Y
    rainPos[i * 3 + 2] = (Math.random() - 0.5) * (dioramaDepth - 1); // Z
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  const rainMat = new THREE.PointsMaterial({
    color: 0x0284c7,
    size: 0.16,
    transparent: true,
    opacity: 0.85
  });
  const rainPoints = new THREE.Points(rainGeo, rainMat);
  root.add(rainPoints);

  // --------------------------------------------------------------------------
  // (D) 30-YEAR TEXAS GULF COAST CLIMATE INFOGRAPHIC DISPLAY
  // --------------------------------------------------------------------------
  const climateCardSprite = textures.labelSprite('Dickinson, TX 30-Year Climate Normals', {
    subtext: 'Avg Annual Rain: 53.8 in | Aug High: 92.4°F | Jan Low: 43.8°F (Humid Subtropical Cfa)',
    scale: 1.1,
    border: '#f59e0b'
  });
  climateCardSprite.position.set(0, 4.0, 3.8);
  climateCardSprite.visible = false;
  root.add(climateCardSprite);

  // --------------------------------------------------------------------------
  // UPDATE / RE-SYNC CYCLE
  // --------------------------------------------------------------------------
  function syncAtmosphere() {
    // 1. Sun brightness scales with solar intensity
    const sFactor = state.solarIntensity / 100;
    sunLight.intensity = 1.0 + sFactor * 2.8;
    sunMesh.scale.set(0.9 + sFactor * 0.4, 0.9 + sFactor * 0.4, 0.9 + sFactor * 0.4);

    // 2. Cloud appearance and darkness scale with humidity
    const hFactor = state.humidity / 100;
    const cloudScale = 0.6 + hFactor * 0.75;
    cloudGroup.scale.set(cloudScale, cloudScale, cloudScale);

    // Color morphing: fluffy white to slate storm gray
    if (hFactor > 0.7) {
      cloudMat.color.setHex(0x334155); // Cumulonimbus dark gray
    } else if (hFactor > 0.5) {
      cloudMat.color.setHex(0x94a3b8); // Overcast gray
    } else {
      cloudMat.color.setHex(0xf8fafc); // Sunny white
    }

    // 3. Precipitation active only if humidity >= 60%
    const isRaining = state.humidity >= 60;
    rainPoints.visible = isRaining;

    // 4. Rain gauge accumulation visual
    const rainLevel = isRaining ? ((state.humidity - 50) / 50) * 0.7 : 0.1;
    rainWaterMesh.scale.set(1, rainLevel, 1);

    // 5. Mode Switch (Weather vs Climate)
    climateCardSprite.visible = state.mode === 'climate';

    // 6. Telemetry Values
    const calculatedTempC = 18 + sFactor * 16 - (isRaining ? 5 : 0);
    const calculatedTempF = calculatedTempC * 1.8 + 32;
    const baroPressure = 1018 - (hFactor * 22); // hPa drops during storms

    let cycleStage = 'Evaporation Dominant';
    if (isRaining) cycleStage = 'Precipitation & Bayou Runoff';
    else if (hFactor > 0.6) cycleStage = 'Condensation & Cloud Growth';

    updateTelemetry([
      { label: 'Water Cycle Stage', value: cycleStage, unit: '', color: '#38bdf8' },
      { label: 'Surface Air Temp', value: `${calculatedTempC.toFixed(1)}°C / ${calculatedTempF.toFixed(0)}°F`, unit: '', color: '#ef4444' },
      { label: 'Relative Humidity', value: `${state.humidity}`, unit: '%', color: '#06b6d4' },
      { label: 'Barometric Pressure', value: `${baroPressure.toFixed(0)}`, unit: 'hPa', color: '#a855f7' },
      { label: 'Texas Gulf Wind Speed', value: `${state.windSpeed}`, unit: 'mph', color: '#10b981' }
    ]);
  }

  syncAtmosphere();

  return {
    interactables,
    controls: [
      { id: 'solarIntensity', type: 'slider', label: 'Solar Energy (Drives Evaporation)', min: 10, max: 100, step: 5, value: state.solarIntensity },
      { id: 'humidity', type: 'slider', label: 'Atmospheric Humidity %', min: 20, max: 100, step: 5, value: state.humidity },
      { id: 'windSpeed', type: 'slider', label: 'Gulf Coast Wind Speed (mph)', min: 0, max: 50, step: 5, value: state.windSpeed },
      {
        id: 'mode',
        type: 'select',
        label: 'Mode: Daily Weather vs 30-Year Climate',
        options: ['Daily Weather Station', '30-Year Texas Gulf Coast Climate'],
        value: 'Daily Weather Station'
      },
      { id: 'btnStorm', type: 'button', label: 'Trigger Afternoon Gulf Thunderstorm' }
    ],

    onControlChange(id, value) {
      if (id === 'solarIntensity') {
        state.solarIntensity = Number(value);
      } else if (id === 'humidity') {
        state.humidity = Number(value);
      } else if (id === 'windSpeed') {
        state.windSpeed = Number(value);
      } else if (id === 'mode') {
        state.mode = value.includes('Climate') ? 'climate' : 'weather';
        audio.playSfx('click');
      } else if (id === 'btnStorm') {
        state.solarIntensity = 90;
        state.humidity = 95;
        state.windSpeed = 35;
        audio.playSfx('whoosh');
      }
      syncAtmosphere();
    },

    onObjectClick(mesh) {
      audio.playSfx('splash');
      if (mesh.name && mesh.name.includes('Galveston')) {
        audio.playSfx('bubble');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.currentStage = stage;
      if (stage === 'elaborate') {
        state.mode = 'weather';
        syncAtmosphere();
      }
    },

    runElaborateChallenge() {
      // Challenge: Create a convective thunderstorm! Solar intensity > 75% AND Humidity >= 85%
      const passed = state.solarIntensity >= 75 && state.humidity >= 85;
      if (passed) {
        audio.playSfx('success');
        return {
          passed: true,
          score: 100,
          feedback: `Outstanding convective storm created! Strong Texas Gulf solar radiation heated Galveston Bay waters, accelerating evaporation. High humidity triggered rapid condensation into cumulonimbus clouds, producing torrential rain and surface runoff back down Dickinson Bayou!`
        };
      }

      return {
        passed: false,
        score: Math.round((state.solarIntensity / 100) * 40 + (state.humidity / 100) * 40),
        feedback: `To trigger a true coastal thunderstorm, increase Solar Energy to at least 75% (to maximize evaporation) and raise Humidity to at least 85% (to trigger condensation & downpour). Currently: Solar ${state.solarIntensity}%, Humidity ${state.humidity}%.`
      };
    },

    update(dt) {
      // 1. Spin Anemometer cups
      anemometerGroup.rotation.y += dt * (state.windSpeed * 0.18 + 0.1);

      // 2. Animate Evaporating Vapor Particles
      const evapPositions = evapGeo.attributes.position.array;
      const evapRate = (state.solarIntensity / 100) * dt * 2.2;
      for (let i = 0; i < evapCount; i++) {
        evapPositions[i * 3 + 1] += evapSpeeds[i] * evapRate;
        // Drift with wind
        evapPositions[i * 3 + 0] -= (state.windSpeed / 50) * dt * 0.8;
        if (evapPositions[i * 3 + 1] > 5.0) {
          evapPositions[i * 3 + 1] = 0.15;
          evapPositions[i * 3 + 0] = 2.0 + Math.random() * 6.5;
        }
      }
      evapGeo.attributes.position.needsUpdate = true;

      // 3. Animate Falling Rain Particles
      if (state.humidity >= 60) {
        const rainPositions = rainGeo.attributes.position.array;
        const rainSpeed = dt * 9.5;
        const windDrift = (state.windSpeed / 50) * dt * 3.5;
        for (let i = 0; i < rainCount; i++) {
          rainPositions[i * 3 + 1] -= rainSpeed;
          rainPositions[i * 3 + 0] -= windDrift;
          if (rainPositions[i * 3 + 1] < 0.1) {
            rainPositions[i * 3 + 1] = 5.0;
            rainPositions[i * 3 + 0] = -4.5 + Math.random() * 6.0;
          }
        }
        rainGeo.attributes.position.needsUpdate = true;
      }

      // 4. Subtle wave ripple in Galveston Bay
      waterMesh.position.y = 0.05 + Math.sin(Date.now() * 0.003) * 0.015;
    }
  };
}

// ============================================================================
// MODULE 3.4: Slow Changes to Earth's Surface (TEKS 4.10B)
// Weathering, Erosion & Deposition with 48x48 Vertex-Displaced Terrain
// ============================================================================
export function m3_4(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  const root = new THREE.Group();
  group.add(root);

  const state = {
    timeMillions: 0.0,    // 0.0 to 10.0 Ma (Million Years)
    waterFlow: 60,        // 0 to 100%
    windSpeed: 25,        // 0 to 100 km/h
    glacierActive: false, // River canyon (V-shape) vs Glacial valley (U-shape)
    currentStage: 'explore'
  };

  const interactables = [];

  // Lighting
  const dirLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
  dirLight.position.set(10, 15, 8);
  root.add(dirLight);
  root.add(new THREE.AmbientLight(0x475569, 1.2));

  // --------------------------------------------------------------------------
  // DYNAMIC 48x48 VERTEX-DISPLACED TERRAIN
  // --------------------------------------------------------------------------
  const gridW = 48;
  const gridD = 48;
  const terrainWidth = 16;
  const terrainDepth = 15;

  const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridW, gridD);
  terrainGeo.rotateX(-Math.PI / 2); // Horizontal XZ plane

  // Store pristine initial elevation profile
  const vertexCount = (gridW + 1) * (gridD + 1);
  const initialY = new Float32Array(vertexCount);
  const posAttr = terrainGeo.attributes.position;

  for (let i = 0; i < vertexCount; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);

    // Highland plateau on left (x < -2), sloping down to sea level at x > 3
    let y = 0.1;
    if (x < 2.5) {
      const slope = (2.5 - x) / 10.0;
      y = 0.2 + Math.pow(slope, 1.2) * 2.4;
      // Natural rolling topography
      y += Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.25;
    }
    posAttr.setY(i, y);
    initialY[i] = y;
  }
  terrainGeo.computeVertexNormals();

  // Create Vertex Color Attribute for Rock Strata Reveal
  const colors = new Float32Array(vertexCount * 3);
  terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const terrainMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.85,
    metalness: 0.05
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.name = 'Sedimentary Rock Strata Terrain';
  root.add(terrainMesh);
  interactables.push(terrainMesh);

  // Coastal Ocean Water Plane (Receives delta deposition)
  const oceanGeo = new THREE.PlaneGeometry(7.0, terrainDepth);
  oceanGeo.rotateX(-Math.PI / 2);
  const oceanMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    transparent: true,
    opacity: 0.78
  });
  const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
  oceanMesh.position.set(4.5, 0.15, 0);
  root.add(oceanMesh);

  // Glacial Ice Tongue Mesh (Visible only when glacier is active)
  const glacierGeo = new THREE.BoxGeometry(7.5, 0.7, 3.2);
  const glacierMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85
  });
  const glacierMesh = new THREE.Mesh(glacierGeo, glacierMat);
  glacierMesh.position.set(-4.5, 1.2, 0);
  glacierMesh.name = 'Alpine Glacial Ice Sheet';
  glacierMesh.visible = false;
  root.add(glacierMesh);
  interactables.push(glacierMesh);

  // --------------------------------------------------------------------------
  // SEDIMENT TRANSPORT PARTICLE SYSTEM (200 particles)
  // --------------------------------------------------------------------------
  const sedCount = 200;
  const sedGeo = new THREE.BufferGeometry();
  const sedPositions = new Float32Array(sedCount * 3);
  const sedProgress = new Float32Array(sedCount);
  const sedSpeeds = new Float32Array(sedCount);

  for (let i = 0; i < sedCount; i++) {
    sedProgress[i] = Math.random();
    sedSpeeds[i] = 0.6 + Math.random() * 0.8;
    sedPositions[i * 3 + 0] = -7.0;
    sedPositions[i * 3 + 1] = 1.0;
    sedPositions[i * 3 + 2] = 0.0;
  }
  sedGeo.setAttribute('position', new THREE.BufferAttribute(sedPositions, 3));
  const sedMat = new THREE.PointsMaterial({
    color: 0xd97706,
    size: 0.2,
    transparent: true,
    opacity: 0.85
  });
  const sedPoints = new THREE.Points(sedGeo, sedMat);
  root.add(sedPoints);

  // Floating Geological Annotation Sprites
  const canyonLabel = textures.labelSprite('Weathering & Erosion', {
    subtext: 'Carving Canyon & Transporting Sediments',
    scale: 0.8,
    border: '#ef4444'
  });
  canyonLabel.position.set(-3.5, 3.2, 0);
  root.add(canyonLabel);

  const deltaLabel = textures.labelSprite('Sediment Deposition', {
    subtext: 'Building Coastal Delta Landform',
    scale: 0.8,
    border: '#10b981'
  });
  deltaLabel.position.set(4.0, 2.0, 0);
  root.add(deltaLabel);

  // --------------------------------------------------------------------------
  // GEOLOGICAL RE-DISPLACEMENT CALCULATION
  // --------------------------------------------------------------------------
  function applyGeologicalTime() {
    const t = state.timeMillions; // 0 to 10 Ma
    const w = state.waterFlow / 100;
    const wind = state.windSpeed / 100;
    const isGlacier = state.glacierActive;

    glacierMesh.visible = isGlacier;
    glacierMesh.scale.set(Math.min(1.0, 0.4 + t * 0.1), 1, 1);

    const pos = terrainGeo.attributes.position;
    const col = terrainGeo.attributes.color;

    // Strata palette
    const topsoilCol = new THREE.Color(0x166534);  // Green vegetation
    const sandstoneCol = new THREE.Color(0xb45309); // Red/tan sandstone
    const limestoneCol = new THREE.Color(0x475569); // Gray bedrock
    const deltaSandCol = new THREE.Color(0xd97706);  // Golden delta alluvium

    let maxDepthCarvedM = 0;
    let deltaVolumeBuilt = 0;

    for (let i = 0; i < vertexCount; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const baseY = initialY[i];

      // Sinuous River / Valley Centerline path
      const riverCenterZ = Math.sin(x * 0.45) * 1.5;
      const distFromChannel = Math.abs(z - riverCenterZ);

      let carvedErosion = 0;
      let depositedDelta = 0;
      let windDuneHeight = 0;

      // 1. Weathering & Erosion in the Highlands (x < 2.5)
      if (x < 2.5) {
        if (!isGlacier) {
          // V-shaped river canyon: sharp exponential dropoff from river center
          const channelWidth = 1.8;
          if (distFromChannel < channelWidth) {
            const vProfile = 1.0 - (distFromChannel / channelWidth);
            carvedErosion = w * (t / 10.0) * 1.6 * Math.pow(vProfile, 1.3);
          }
        } else {
          // U-shaped glacial valley: broad flat floor with steep sidewalls
          const troughWidth = 3.2;
          if (distFromChannel < troughWidth) {
            const uProfile = 1.0 - Math.pow(distFromChannel / troughWidth, 4.0);
            carvedErosion = (t / 10.0) * 1.8 * Math.max(0, uProfile);
          }
        }
      }

      // 2. Deposition at the River Mouth / Coastal Delta (x >= 2.0)
      if (x >= 2.0) {
        // Delta fans out into coastal waters
        const dx = x - 2.5;
        const deltaRadius = Math.sqrt(dx * dx + z * z);
        if (deltaRadius < 4.8) {
          const deltaProfile = Math.max(0, 1.0 - deltaRadius / 4.8);
          depositedDelta = w * (t / 10.0) * 0.85 * Math.pow(deltaProfile, 1.5);
          deltaVolumeBuilt += depositedDelta;
        }
      }

      // 3. Shifting Wind Sand Dunes on coastal flats (z > 2.5 or z < -2.5)
      if (x > 0 && Math.abs(z) > 2.5) {
        windDuneHeight = wind * 0.35 * Math.sin(x * 1.8 - t * 1.4) * Math.cos(z * 1.2);
      }

      const finalY = Math.max(0.02, baseY - carvedErosion + depositedDelta + windDuneHeight);
      pos.setY(i, finalY);

      if (carvedErosion > maxDepthCarvedM) maxDepthCarvedM = carvedErosion;

      // Dynamic Strata Color Mapping based on carved depth
      const depthRatio = carvedErosion / 1.6;
      let vertexCol;

      if (depositedDelta > 0.1) {
        vertexCol = deltaSandCol; // Deposited alluvial fan
      } else if (depthRatio > 0.6) {
        vertexCol = limestoneCol; // Exposed deep bedrock
      } else if (depthRatio > 0.15) {
        vertexCol = sandstoneCol; // Exposed red sandstone
      } else {
        vertexCol = topsoilCol;   // Surface topsoil / piney turf
      }

      col.setXYZ(i, vertexCol.r, vertexCol.g, vertexCol.b);
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;
    terrainGeo.computeVertexNormals();

    // Scale real-world metrics for grade 4 learners
    const realDepthM = Math.round(maxDepthCarvedM * 280); // meters carved
    const sedimentRate = Math.round(w * 18500);           // tons/year
    const deltaAreaKm2 = (deltaVolumeBuilt * 4.2).toFixed(1);

    let epochName = 'Recent Holocene (0 Ma)';
    if (t > 7.5) epochName = 'Late Miocene Epoch (~8 Ma)';
    else if (t > 4.5) epochName = 'Pliocene Epoch (~5 Ma)';
    else if (t > 1.5) epochName = 'Pleistocene Ice Age (~2 Ma)';

    // Update Telemetry
    updateTelemetry([
      { label: 'Geological Time Elapsed', value: `${state.timeMillions.toFixed(1)}`, unit: 'Million Years', color: '#f59e0b' },
      { label: 'Canyon Depth Carved', value: `${realDepthM}`, unit: 'meters', color: '#ef4444' },
      { label: 'Sediment Transport Rate', value: `${sedimentRate}`, unit: 'tons/yr', color: '#38bdf8' },
      { label: 'Coastal Delta Land Area', value: `${deltaAreaKm2}`, unit: 'sq km', color: '#10b981' },
      { label: 'Valley Profile Geometry', value: isGlacier ? 'U-Shaped Glacial Valley' : 'V-Shaped River Canyon', unit: '', color: '#a855f7' }
    ]);
  }

  applyGeologicalTime();

  return {
    interactables,
    controls: [
      { id: 'timeMillions', type: 'slider', label: 'Geological Time Scrubber (0 to 10 Ma)', min: 0.0, max: 10.0, step: 0.2, value: state.timeMillions },
      { id: 'waterFlow', type: 'slider', label: 'River Water Velocity & Flow %', min: 0, max: 100, step: 5, value: state.waterFlow },
      { id: 'windSpeed', type: 'slider', label: 'Coastal Wind Speed (km/h)', min: 0, max: 100, step: 5, value: state.windSpeed },
      { id: 'glacierActive', type: 'toggle', label: 'Glacier Mode (U-Valley vs V-Canyon)', value: state.glacierActive },
      { id: 'btnReset', type: 'button', label: 'Reset Landscape to Initial Plateau' }
    ],

    onControlChange(id, value) {
      if (id === 'timeMillions') {
        state.timeMillions = Number(value);
      } else if (id === 'waterFlow') {
        state.waterFlow = Number(value);
      } else if (id === 'windSpeed') {
        state.windSpeed = Number(value);
      } else if (id === 'glacierActive') {
        state.glacierActive = Boolean(value);
        audio.playSfx('whoosh');
      } else if (id === 'btnReset') {
        state.timeMillions = 0.0;
        audio.playSfx('click');
      }
      applyGeologicalTime();
    },

    onObjectClick(mesh) {
      audio.playSfx('thud');
      if (mesh.name && mesh.name.includes('Glacial')) {
        audio.playSfx('wind');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.currentStage = stage;
      if (stage === 'elaborate') {
        state.timeMillions = 0.0;
        applyGeologicalTime();
      }
    },

    runElaborateChallenge() {
      // Challenge: Demonstrate Coastal Delta Formation! River Flow >= 70% AND Geological Time >= 6.0 Ma
      const passed = state.waterFlow >= 70 && state.timeMillions >= 6.0 && !state.glacierActive;
      if (passed) {
        audio.playSfx('success');
        return {
          passed: true,
          score: 100,
          feedback: `Mastery confirmed! Over millions of years, fast-flowing river water weathered and eroded sediments upstream, transported them through the canyon, and deposited them at the mouth where water slowed upon entering the bay, forming an expansive delta landform!`
        };
      }

      return {
        passed: false,
        score: Math.round((state.waterFlow / 100) * 40 + (state.timeMillions / 10) * 40),
        feedback: `To build a visible coastal delta: Set River Water Flow to at least 70% and advance Geological Time to at least 6.0 Million Years (in River mode). Currently: Flow ${state.waterFlow}%, Time ${state.timeMillions} Ma.`
      };
    },

    update(dt) {
      // Animate Suspended Sediment Particles down river channel
      const sedPos = sedGeo.attributes.position.array;
      const speedFactor = (state.waterFlow / 100) * dt * 3.5;

      for (let i = 0; i < sedCount; i++) {
        sedProgress[i] += sedSpeeds[i] * speedFactor;
        if (sedProgress[i] > 1.0) sedProgress[i] = 0;

        // Path from highland x = -7 to delta mouth x = 4.5
        const p = sedProgress[i];
        const x = -7.0 + p * 11.5;
        const z = Math.sin(x * 0.45) * 1.5 + (Math.random() - 0.5) * (0.4 + p * 1.8);
        const y = Math.max(0.2, (1.0 - p) * 1.4 + 0.15);

        sedPos[i * 3 + 0] = x;
        sedPos[i * 3 + 1] = y;
        sedPos[i * 3 + 2] = z;
      }
      sedGeo.attributes.position.needsUpdate = true;
    }
  };
}

// ============================================================================
// MODULE 3.5: Natural Resources, Conservation & Subsurface Geology (TEKS 4.11A, 4.11B, 4.11C)
// ============================================================================
export function m3_5(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  const root = new THREE.Group();
  group.add(root);

  const state = {
    solarMW: 25,       // 0 to 40 MW (Renewable)
    windMW: 35,        // 0 to 40 MW (Renewable)
    hydroMW: 15,       // 0 to 20 MW (Renewable)
    fossilMW: 25,      // 0 to 60 MW (Nonrenewable: Oil & Coal)
    rockTest: 'none',  // 'none' | 'sandstone' | 'shale' | 'limestone'
    replantedSaplings: 1000,
    currentStage: 'explore'
  };

  const interactables = [];

  // Lighting
  const dirLight = new THREE.DirectionalLight(0xffedd5, 2.4);
  dirLight.position.set(8, 14, 10);
  root.add(dirLight);
  root.add(new THREE.AmbientLight(0x334155, 1.4));

  // --------------------------------------------------------------------------
  // (A) SURFACE ENERGY INFRASTRUCTURE (y >= 0)
  // --------------------------------------------------------------------------
  const blockW = 18;
  const blockD = 7.5;

  // Surface Ground Plane
  const surfaceGeo = new THREE.BoxGeometry(blockW, 0.4, blockD);
  const surfaceMat = new THREE.MeshStandardMaterial({ map: textures.turf(), roughness: 0.8 });
  const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
  surfaceMesh.position.y = 0.2;
  root.add(surfaceMesh);

  // 1. Two Spinning Wind Turbines (Renewable)
  const turbineBlades = [];
  [-6.0, -3.8].forEach((tx, idx) => {
    const tGroup = new THREE.Group();
    tGroup.position.set(tx, 0.4, -2.0);
    root.add(tGroup);

    // Tower
    const towerGeo = new THREE.CylinderGeometry(0.08, 0.16, 3.8, 16);
    towerGeo.translate(0, 1.9, 0);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
    tGroup.add(new THREE.Mesh(towerGeo, towerMat));

    // Nacelle & Hub
    const nacelleGeo = new THREE.BoxGeometry(0.3, 0.25, 0.6);
    const nacelle = new THREE.Mesh(nacelleGeo, towerMat);
    nacelle.position.set(0, 3.8, 0);
    tGroup.add(nacelle);

    // Rotor Hub with 3 Blades
    const rotorHub = new THREE.Group();
    rotorHub.position.set(0, 3.8, 0.32);
    tGroup.add(rotorHub);
    turbineBlades.push(rotorHub);

    for (let b = 0; b < 3; b++) {
      const angle = (b / 3) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.1, 1.5, 0.02);
      bladeGeo.translate(0, 0.75, 0);
      const blade = new THREE.Mesh(bladeGeo, towerMat);
      blade.rotation.z = angle;
      rotorHub.add(blade);
    }

    nacelle.name = `Wind Turbine #${idx + 1} (Renewable Wind)`;
    interactables.push(nacelle);
  });

  // 2. Solar Tracking Photovoltaic Panels (Renewable)
  const solarPanels = [];
  [-1.6, 0.4].forEach((px, idx) => {
    const sGroup = new THREE.Group();
    sGroup.position.set(px, 0.4, -2.0);
    root.add(sGroup);

    const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12);
    postGeo.translate(0, 0.6, 0);
    sGroup.add(new THREE.Mesh(postGeo, new THREE.MeshStandardMaterial({ map: textures.brushedMetal() })));

    const panelGeo = new THREE.BoxGeometry(1.4, 0.06, 1.0);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.8,
      roughness: 0.15
    });
    const panelMesh = new THREE.Mesh(panelGeo, panelMat);
    panelMesh.position.set(0, 1.2, 0);
    panelMesh.rotation.x = degToRad(30);
    panelMesh.name = `Solar PV Array #${idx + 1} (Renewable Solar)`;
    sGroup.add(panelMesh);
    solarPanels.push(panelMesh);
    interactables.push(panelMesh);
  });

  // 3. Hydroelectric Dam (Renewable)
  const damGroup = new THREE.Group();
  damGroup.position.set(2.8, 0.4, -2.0);
  root.add(damGroup);

  const damWallGeo = new THREE.BoxGeometry(1.8, 1.6, 1.2);
  const damMat = new THREE.MeshStandardMaterial({ map: textures.brushedMetal('#64748b'), roughness: 0.7 });
  const damMesh = new THREE.Mesh(damWallGeo, damMat);
  damMesh.position.y = 0.8;
  damMesh.name = 'Dickinson Hydroelectric Dam (Renewable Water)';
  damGroup.add(damMesh);
  interactables.push(damMesh);

  // Water spillway
  const spillwayGeo = new THREE.PlaneGeometry(1.2, 1.4);
  spillwayGeo.rotateX(-Math.PI / 4);
  const spillwayMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1 });
  const spillway = new THREE.Mesh(spillwayGeo, spillwayMat);
  spillway.position.set(0, 0.8, 0.7);
  damGroup.add(spillway);

  // 4. Pumpjack Oil Derrick (Nonrenewable Petroleum)
  const pumpjackGroup = new THREE.Group();
  pumpjackGroup.position.set(5.5, 0.4, -1.8);
  root.add(pumpjackGroup);

  const derrickPostGeo = new THREE.CylinderGeometry(0.08, 0.22, 2.2, 4);
  derrickPostGeo.translate(0, 1.1, 0);
  const derrickMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
  const samsonPost = new THREE.Mesh(derrickPostGeo, derrickMat);
  pumpjackGroup.add(samsonPost);

  // Walking Beam & Horsehead
  const walkingBeamGroup = new THREE.Group();
  walkingBeamGroup.position.set(0, 2.2, 0);
  pumpjackGroup.add(walkingBeamGroup);

  const beamBarGeo = new THREE.BoxGeometry(2.4, 0.2, 0.15);
  const beamBar = new THREE.Mesh(beamBarGeo, derrickMat);
  walkingBeamGroup.add(beamBar);

  const horseheadGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 12, 1, false, 0, Math.PI);
  horseheadGeo.rotateZ(Math.PI / 2);
  horseheadGeo.translate(1.2, 0, 0);
  const horsehead = new THREE.Mesh(horseheadGeo, derrickMat);
  horsehead.name = 'Oil Pumpjack Walking Beam (Nonrenewable Petroleum)';
  walkingBeamGroup.add(horsehead);
  interactables.push(horsehead);

  // Polished rod casing descending underground
  const rodGeo = new THREE.CylinderGeometry(0.025, 0.025, 4.2, 8);
  rodGeo.translate(0, -2.1, 0);
  const rodMesh = new THREE.Mesh(rodGeo, new THREE.MeshBasicMaterial({ color: 0x0f172a }));
  rodMesh.position.set(1.2, 0, 0);
  walkingBeamGroup.add(rodMesh);

  // 5. Coal Power Plant & Smokestack (Nonrenewable Coal)
  const coalGroup = new THREE.Group();
  coalGroup.position.set(7.5, 0.4, -1.8);
  root.add(coalGroup);

  const plantBuilding = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.2), derrickMat);
  plantBuilding.position.y = 0.6;
  coalGroup.add(plantBuilding);

  const stackGeo = new THREE.CylinderGeometry(0.18, 0.26, 2.8, 16);
  stackGeo.translate(0, 1.4, 0);
  const stackMesh = new THREE.Mesh(stackGeo, new THREE.MeshStandardMaterial({ color: 0x475569 }));
  stackMesh.position.set(0.4, 0.6, 0);
  stackMesh.name = 'Coal Power Plant Smokestack (Nonrenewable Coal)';
  coalGroup.add(stackMesh);
  interactables.push(stackMesh);

  // 6. Managed Pine Timber Forest (Renewable)
  const forestGroup = new THREE.Group();
  forestGroup.position.set(-6.5, 0.4, 1.5);
  root.add(forestGroup);

  for (let fx = -1.2; fx <= 1.2; fx += 0.8) {
    for (let fz = -0.8; fz <= 0.8; fz += 0.8) {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.06, 0.6, 8),
        new THREE.MeshStandardMaterial({ map: textures.wood('#78350f') })
      );
      trunk.position.set(fx, 0.3, fz);
      forestGroup.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 1.0, 8),
        new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
      );
      foliage.position.set(fx, 0.9, fz);
      forestGroup.add(foliage);
    }
  }

  // 7. Dickinson City Center Mini Skyline & Substation
  const cityGroup = new THREE.Group();
  cityGroup.position.set(0, 0.4, 1.8);
  root.add(cityGroup);

  [-1.0, -0.3, 0.4, 1.1].forEach((cx, i) => {
    const bHeight = 0.8 + (i % 3) * 0.5;
    const bGeo = new THREE.BoxGeometry(0.5, bHeight, 0.5);
    const bMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.3 });
    const bldg = new THREE.Mesh(bGeo, bMat);
    bldg.position.set(cx, bHeight / 2, 0);
    cityGroup.add(bldg);
  });

  const cityLabel = textures.labelSprite('Dickinson City Grid: 100 MW Demand', {
    scale: 0.75,
    border: '#f59e0b'
  });
  cityLabel.position.set(0, 2.2, 1.8);
  cityGroup.add(cityLabel);

  // --------------------------------------------------------------------------
  // (B) UNDERGROUND GEOLOGICAL CUTAWAY BLOCK (y < 0)
  // --------------------------------------------------------------------------
  const cutawayGroup = new THREE.Group();
  cutawayGroup.position.set(0, 0, blockD / 2);
  root.add(cutawayGroup);

  // Strata Slices (Front Face at z = blockD/2):
  // 1. Topsoil & Alluvial Clay (y = 0 to -1.4)
  const topsoilGeo = new THREE.BoxGeometry(blockW, 1.4, 0.2);
  const topsoilMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
  const topsoilMesh = new THREE.Mesh(topsoilGeo, topsoilMat);
  topsoilMesh.position.y = -0.7;
  cutawayGroup.add(topsoilMesh);

  // 2. Sandstone Freshwater Aquifer (y = -1.4 to -3.2) - High Porosity & Permeability
  const aquiferGeo = new THREE.BoxGeometry(blockW, 1.8, 0.2);
  const aquiferMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
  const aquiferMesh = new THREE.Mesh(aquiferGeo, aquiferMat);
  aquiferMesh.position.y = -2.3;
  aquiferMesh.name = 'Porous Sandstone Aquifer Layer';
  cutawayGroup.add(aquiferMesh);
  interactables.push(aquiferMesh);

  // Embedded groundwater droplets in sandstone
  const waterDropsGroup = new THREE.Group();
  aquiferMesh.add(waterDropsGroup);
  for (let w = -7; w <= 7; w += 1.4) {
    const drop = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    drop.position.set(w, (Math.random() - 0.5) * 1.4, 0.12);
    waterDropsGroup.add(drop);
  }

  // 3. Impermeable Shale Caprock (y = -3.2 to -4.8) - ZERO Permeability Trap Seal!
  const shaleGeo = new THREE.BoxGeometry(blockW, 1.6, 0.2);
  const shaleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.95 });
  const shaleMesh = new THREE.Mesh(shaleGeo, shaleMat);
  shaleMesh.position.y = -4.0;
  shaleMesh.name = 'Impermeable Shale Caprock (Trap Seal)';
  cutawayGroup.add(shaleMesh);
  interactables.push(shaleMesh);

  // 4. Permeable Limestone Petroleum & Gas Reservoir (y = -4.8 to -7.2)
  const reservoirGeo = new THREE.BoxGeometry(blockW, 2.4, 0.2);
  const reservoirMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.75 });
  const reservoirMesh = new THREE.Mesh(reservoirGeo, reservoirMat);
  reservoirMesh.position.y = -6.0;
  reservoirMesh.name = 'Permeable Limestone Petroleum Reservoir';
  cutawayGroup.add(reservoirMesh);
  interactables.push(reservoirMesh);

  // Crude Oil layer under shale seal
  const oilPoolGeo = new THREE.BoxGeometry(7.0, 1.0, 0.22);
  const oilPoolMat = new THREE.MeshBasicMaterial({ color: 0x09090b }); // Jet black crude oil
  const oilPoolMesh = new THREE.Mesh(oilPoolGeo, oilPoolMat);
  oilPoolMesh.position.set(5.0, 0.5, 0.02);
  reservoirMesh.add(oilPoolMesh);

  // Underground Layer Labels
  const aquiferLbl = textures.labelSprite('Porous Sandstone Aquifer', { subtext: 'Porosity: 28% | High Permeability', scale: 0.65, border: '#38bdf8' });
  aquiferLbl.position.set(-4.5, -2.3, 0.3);
  cutawayGroup.add(aquiferLbl);

  const shaleLbl = textures.labelSprite('Impermeable Shale Caprock', { subtext: 'Porosity: 6% | ZERO Permeability (Traps Oil)', scale: 0.65, border: '#ef4444' });
  shaleLbl.position.set(-4.5, -4.0, 0.3);
  cutawayGroup.add(shaleLbl);

  const oilLbl = textures.labelSprite('Limestone Oil Reservoir', { subtext: 'Trapped Petroleum & Natural Gas', scale: 0.65, border: '#f59e0b' });
  oilLbl.position.set(4.5, -6.0, 0.3);
  cutawayGroup.add(oilLbl);

  // --------------------------------------------------------------------------
  // (C) INTERACTIVE ROCK POROSITY & PERMEABILITY TEST
  // --------------------------------------------------------------------------
  const labTestGroup = new THREE.Group();
  labTestGroup.position.set(-6.5, -6.5, 0.4);
  cutawayGroup.add(labTestGroup);

  const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 20);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xb45309 });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.name = 'Rock Porosity Test Core';
  labTestGroup.add(coreMesh);
  interactables.push(coreMesh);

  const testDroplet = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  testDroplet.position.set(0, 0.8, 0);
  labTestGroup.add(testDroplet);

  const testLabel = textures.labelSprite('Rock Porosity Tester', {
    subtext: 'Select rock to test fluid flow',
    scale: 0.65,
    border: '#10b981'
  });
  testLabel.position.set(0, 1.6, 0);
  labTestGroup.add(testLabel);

  // --------------------------------------------------------------------------
  // GRID BALANCING & TELEMETRY
  // --------------------------------------------------------------------------
  function syncEnergyGrid() {
    const totalGen = state.solarMW + state.windMW + state.hydroMW + state.fossilMW;
    const demand = 100; // MW
    const diff = totalGen - demand;

    const renewableMW = state.solarMW + state.windMW + state.hydroMW;
    const renewablePercent = Math.round((renewableMW / totalGen) * 100);

    // Carbon emissions (kg CO2 per MWh generated)
    // Coal/Oil emit ~840 kg CO2 / MWh; Renewables ~0
    const carbonIndex = Math.round((state.fossilMW * 840) / totalGen);

    let gridStatus = 'Grid Perfectly Balanced (100 MW)';
    let statusColor = '#10b981';
    if (diff > 2) {
      gridStatus = `Grid Overload Surge (+${diff} MW)`;
      statusColor = '#ef4444';
    } else if (diff < -2) {
      gridStatus = `Brownout Warning! Deficit (${diff} MW)`;
      statusColor = '#f59e0b';
    }

    // Update Core Lab Test Visuals
    let permDesc = 'Untested';
    if (state.rockTest === 'sandstone') {
      coreMat.color.setHex(0xb45309);
      permDesc = 'Sandstone: Porosity 28% | 850 mD (Fast Infiltration)';
      testDroplet.position.y = 0.2; // Droplet absorbed inside!
    } else if (state.rockTest === 'shale') {
      coreMat.color.setHex(0x1e293b);
      permDesc = 'Shale: Porosity 6% | 0.001 mD (IMPERMEABLE Seal)';
      testDroplet.position.y = 0.55; // Droplet beads on surface, cannot enter!
    } else if (state.rockTest === 'limestone') {
      coreMat.color.setHex(0x57534e);
      permDesc = 'Limestone: Porosity 14% | 220 mD (Permeable Fissures)';
      testDroplet.position.y = 0.35;
    }

    testLabel.updateText(
      `Rock Test: ${state.rockTest.toUpperCase()}`,
      permDesc,
      state.rockTest === 'shale' ? '#ef4444' : '#10b981'
    );

    // Update Telemetry
    updateTelemetry([
      { label: 'City Power Supply / Demand', value: `${totalGen} / ${demand}`, unit: 'MW', color: statusColor },
      { label: 'Renewable Clean Energy', value: `${renewablePercent}`, unit: '%', color: '#10b981' },
      { label: 'CO2 Emission Intensity', value: `${carbonIndex}`, unit: 'kg/MWh', color: '#ef4444' },
      { label: 'Grid Balance State', value: gridStatus, unit: '', color: statusColor },
      { label: 'Subsurface Tested Permeability', value: permDesc.split('|')[1] || 'Untested', unit: '', color: '#38bdf8' }
    ]);
  }

  syncEnergyGrid();

  return {
    interactables,
    controls: [
      { id: 'solarMW', type: 'slider', label: 'Solar PV Farm (Renewable MW)', min: 0, max: 40, step: 5, value: state.solarMW },
      { id: 'windMW', type: 'slider', label: 'Wind Turbine Farm (Renewable MW)', min: 0, max: 40, step: 5, value: state.windMW },
      { id: 'hydroMW', type: 'slider', label: 'Hydroelectric Dam (Renewable MW)', min: 0, max: 20, step: 5, value: state.hydroMW },
      { id: 'fossilMW', type: 'slider', label: 'Petroleum & Coal (Nonrenewable MW)', min: 0, max: 60, step: 5, value: state.fossilMW },
      {
        id: 'rockTest',
        type: 'select',
        label: 'Test Rock Porosity & Permeability',
        options: ['None', 'Sandstone (Aquifer)', 'Shale (Caprock Seal)', 'Limestone (Oil Trap)'],
        value: 'None'
      },
      { id: 'btnPlant', type: 'button', label: 'Replant 500 Pine Saplings (Conservation)' }
    ],

    onControlChange(id, value) {
      if (id === 'solarMW') {
        state.solarMW = Number(value);
      } else if (id === 'windMW') {
        state.windMW = Number(value);
      } else if (id === 'hydroMW') {
        state.hydroMW = Number(value);
      } else if (id === 'fossilMW') {
        state.fossilMW = Number(value);
      } else if (id === 'rockTest') {
        if (value.includes('Sandstone')) state.rockTest = 'sandstone';
        else if (value.includes('Shale')) state.rockTest = 'shale';
        else if (value.includes('Limestone')) state.rockTest = 'limestone';
        else state.rockTest = 'none';
        audio.playSfx('click');
      } else if (id === 'btnPlant') {
        state.replantedSaplings += 500;
        audio.playSfx('spark');
      }
      syncEnergyGrid();
    },

    onObjectClick(mesh) {
      audio.playSfx('click');
      if (mesh.name && mesh.name.includes('Shale')) {
        state.rockTest = 'shale';
        syncEnergyGrid();
      } else if (mesh.name && mesh.name.includes('Aquifer')) {
        state.rockTest = 'sandstone';
        syncEnergyGrid();
      } else if (mesh.name && mesh.name.includes('Reservoir')) {
        state.rockTest = 'limestone';
        syncEnergyGrid();
      } else if (mesh.name && mesh.name.includes('Pumpjack')) {
        audio.playSfx('thud');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.currentStage = stage;
      if (stage === 'elaborate') {
        syncEnergyGrid();
      }
    },

    runElaborateChallenge() {
      // Challenge:
      // 1. Balance the grid: Total generation == 100 MW (+-2 MW)
      // 2. High conservation: Renewable share >= 75%
      // 3. Test the impermeable Shale Caprock
      const total = state.solarMW + state.windMW + state.hydroMW + state.fossilMW;
      const isBalanced = Math.abs(total - 100) <= 2;
      const renewableShare = ((state.solarMW + state.windMW + state.hydroMW) / total) * 100;
      const isGreen = renewableShare >= 75;
      const testedShale = state.rockTest === 'shale';

      if (isBalanced && isGreen && testedShale) {
        audio.playSfx('success');
        return {
          passed: true,
          score: 100,
          feedback: `Conservation champion! You balanced Dickinson's 100 MW grid with ${Math.round(renewableShare)}% renewable clean energy (solar, wind, and hydro), drastically slashing carbon emissions and preserving petroleum reserves. You also verified that impermeable shale has zero permeability, locking petroleum securely into the subsurface reservoir!`
        };
      }

      let hints = [];
      if (!isBalanced) hints.push(`Adjust energy mix so Total Generation equals exactly 100 MW (currently ${total} MW).`);
      if (!isGreen) hints.push(`Raise renewable sources (Solar, Wind, Hydro) so Renewable Share is at least 75% (currently ${Math.round(renewableShare)}%).`);
      if (!testedShale) hints.push(`Select and test the 'Shale (Caprock Seal)' to verify its impermeable barrier.`);

      return {
        passed: false,
        score: Math.round((isBalanced ? 40 : 15) + (isGreen ? 40 : 10) + (testedShale ? 20 : 0)),
        feedback: hints.join(' ')
      };
    },

    update(dt, elapsed) {
      // 1. Spin Wind Turbines based on wind MW
      const spinSpeed = (state.windMW / 40) * dt * 9.0;
      turbineBlades.forEach((hub) => {
        hub.rotation.z += spinSpeed;
      });

      // 2. Rock Pumpjack walking beam based on fossil MW
      if (state.fossilMW > 0) {
        walkingBeamGroup.rotation.z = Math.sin(elapsed * 2.8) * 0.18;
      }

      // 3. Solar tracking panels gently tilt to track sun
      const tilt = degToRad(20 + Math.sin(elapsed * 0.5) * 15);
      solarPanels.forEach((panel) => {
        panel.rotation.x = tilt;
      });
    }
  };
}

// Export module bundle for Unit 3
export const MODULES_U3 = {
  m3_1,
  m3_2,
  m3_3,
  m3_4,
  m3_5
};
