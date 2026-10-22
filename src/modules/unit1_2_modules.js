// ============================================================================
// TEKS Science Grade 4 - Units 1 & 2 3D Interactive Simulation Modules
// Author: Kelenna Science Team & DeepMind Advanced Agentic Coding
//
// Modules:
// 1. m1_1: TEKS 4.6A Physical Properties of Matter (Density, Buoyancy, Magnetism, States)
// 2. m1_2: TEKS 4.6B, 4.6C Mixtures, Solutions & Conservation of Matter
// 3. m2_1: TEKS 4.7A Contact & Non-Contact Forces (Incline Ramp, Friction, Vectors, Magnets)
// 4. m2_2: TEKS 4.8A Energy Transfer in Motion, Waves & Collisions (Newton's Cradle & Wave Tank)
// 5. m2_3: TEKS 4.8B, 4.8C Electrical Circuits, Conductors & Insulators
// ============================================================================

// ----------------------------------------------------------------------------
// Shared Helper Utilities
// ----------------------------------------------------------------------------
function safePlay(audio, sfx) {
  try {
    if (audio && typeof audio.playSfx === 'function') {
      audio.playSfx(sfx);
    }
  } catch (err) {
    // Ignore audio errors silently in headless or unsupported audio contexts
  }
}

function createLabel(textures, text, opts = {}) {
  if (textures && typeof textures.labelSprite === 'function') {
    return textures.labelSprite(text, opts);
  }
  // Fallback dummy object if textures.labelSprite is unavailable
  return {
    position: { set() {} },
    scale: { set() {} },
    visible: true,
    updateText() {}
  };
}

// 3D Directional Force Vector Arrow generator
function createForceArrow(THREE, colorHex, length = 1.0, radius = 0.04) {
  const group = new THREE.Group();
  
  const shaftMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.4,
    roughness: 0.3,
    metalness: 0.2
  });
  
  // Shaft cylinder (anchored at base y=0)
  const shaftGeo = new THREE.CylinderGeometry(radius, radius, 1, 12);
  shaftGeo.translate(0, 0.5, 0);
  const shaft = new THREE.Mesh(shaftGeo, shaftMat);
  group.add(shaft);

  // Arrowhead cone
  const headGeo = new THREE.ConeGeometry(radius * 2.4, radius * 4.5, 12);
  headGeo.translate(0, radius * 2.25, 0);
  const headMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.6
  });
  const head = new THREE.Mesh(headGeo, headMat);
  group.add(head);

  group.setLengthAndDirection = (len, dir) => {
    const safeLen = Math.max(0.01, len);
    shaft.scale.set(1, safeLen, 1);
    head.position.set(0, safeLen, 0);

    const normDir = dir.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, normDir);
    group.quaternion.copy(quat);
    group.visible = len > 0.05;
  };

  return group;
}

// ============================================================================
// MODULE 1: m1_1 (TEKS 4.6A Physical Properties of Matter)
// ============================================================================
export function m1_1(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // --- Lab Bench Base ---
  const benchGeo = new THREE.BoxGeometry(13.5, 0.4, 7.5);
  const benchMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    map: textures?.labGrid ? textures.labGrid() : null,
    roughness: 0.4,
    metalness: 0.1
  });
  const bench = new THREE.Mesh(benchGeo, benchMat);
  bench.position.set(0, -0.2, 0);
  bench.receiveShadow = true;
  group.add(bench);

  // Bench wooden trim
  const trimGeo = new THREE.BoxGeometry(13.7, 0.2, 7.7);
  const trimMat = new THREE.MeshStandardMaterial({
    map: textures?.wood ? textures.wood('#78350f') : null,
    roughness: 0.6
  });
  const trim = new THREE.Mesh(trimGeo, trimMat);
  trim.position.set(0, -0.45, 0);
  group.add(trim);

  // Station Area Accent Lights
  const stationLight = new THREE.PointLight(0xffffff, 0.9, 14);
  stationLight.position.set(0, 4, 1);
  group.add(stationLight);

  // --------------------------------------------------------------------------
  // Station 1: Water Buoyancy Tank (X = -3.8, Z = -0.5)
  // --------------------------------------------------------------------------
  const tankGroup = new THREE.Group();
  tankGroup.position.set(-3.8, 0, -0.5);
  group.add(tankGroup);

  // Glass Tank Walls
  const tankOuterGeo = new THREE.BoxGeometry(2.8, 2.6, 2.0);
  const tankGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.35,
    roughness: 0.08,
    metalness: 0.05,
    transmission: 0.7,
    ior: 1.5
  });
  const tankMesh = new THREE.Mesh(tankOuterGeo, tankGlassMat);
  tankMesh.position.set(0, 1.3, 0);
  tankGroup.add(tankMesh);

  // Water Volume inside tank
  const waterGeo = new THREE.BoxGeometry(2.6, 2.0, 1.8);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.62,
    roughness: 0.1,
    metalness: 0.15
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(0, 1.05, 0);
  tankGroup.add(waterMesh);

  // Meniscus Surface line
  const meniscusGeo = new THREE.BoxGeometry(2.64, 0.04, 1.84);
  const meniscusMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.8
  });
  const meniscusMesh = new THREE.Mesh(meniscusGeo, meniscusMat);
  meniscusMesh.position.set(0, 2.05, 0);
  tankGroup.add(meniscusMesh);

  // Rising Bubble Particles inside water
  const bubbleCount = 18;
  const bubbles = [];
  const bubbleGeo = new THREE.SphereGeometry(0.035, 8, 8);
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
    emissive: 0xbae6fd,
    emissiveIntensity: 0.4
  });
  for (let i = 0; i < bubbleCount; i++) {
    const b = new THREE.Mesh(bubbleGeo, bubbleMat);
    b.position.set(
      (Math.random() - 0.5) * 2.2,
      0.1 + Math.random() * 1.8,
      (Math.random() - 0.5) * 1.4
    );
    b.userData = {
      speed: 0.4 + Math.random() * 0.5,
      wobbleSeed: Math.random() * Math.PI * 2
    };
    tankGroup.add(b);
    bubbles.push(b);
  }

  // Tank Volumetric Markings
  const tankLabel = createLabel(textures, 'Water Tank (1.0 g/cm³)', {
    subtext: 'Floats if density < 1.0, Sinks if > 1.0',
    border: '#0284c7',
    scale: 1.1
  });
  tankLabel.position.set(-3.8, 2.9, -0.5);
  group.add(tankLabel);

  // --------------------------------------------------------------------------
  // Station 2: Electronic Digital Scale (X = 0, Z = -1.5)
  // --------------------------------------------------------------------------
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0, 0, -1.5);
  group.add(scaleGroup);

  const scaleBaseGeo = new THREE.BoxGeometry(2.2, 0.28, 2.0);
  const scaleBaseMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.6
  });
  const scaleBase = new THREE.Mesh(scaleBaseGeo, scaleBaseMat);
  scaleBase.position.set(0, 0.14, 0);
  scaleGroup.add(scaleBase);

  // Polished chrome weighing pan
  const panGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.05, 32);
  const panMat = new THREE.MeshStandardMaterial({
    map: textures?.brushedMetal ? textures.brushedMetal('#94a3b8') : null,
    roughness: 0.15,
    metalness: 0.85
  });
  const panMesh = new THREE.Mesh(panGeo, panMat);
  panMesh.position.set(0, 0.31, 0.1);
  scaleGroup.add(panMesh);

  // Glowing LED Display Sprite
  const scaleDisplay = createLabel(textures, '0.0 g', {
    subtext: 'Electronic Balance',
    border: '#22c55e',
    color: '#4ade80',
    scale: 1.0
  });
  scaleDisplay.position.set(0, 0.5, -0.7);
  scaleGroup.add(scaleDisplay);

  // --------------------------------------------------------------------------
  // Station 3: Moveable Neodymium Bar Magnet (X = 3.8, Z = -1.2)
  // --------------------------------------------------------------------------
  const magnetStation = new THREE.Group();
  magnetStation.position.set(3.8, 0, -1.2);
  group.add(magnetStation);

  const magStandGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.2, 24);
  const magStandMat = new THREE.MeshStandardMaterial({
    map: textures?.wood ? textures.wood('#92400e') : null,
    roughness: 0.6
  });
  const magStand = new THREE.Mesh(magStandGeo, magStandMat);
  magStand.position.set(0, 0.1, 0);
  magnetStation.add(magStand);

  // 3D Neodymium Bar Magnet
  const barMagnetGroup = new THREE.Group();
  barMagnetGroup.position.set(0, 0.5, 0);
  magnetStation.add(barMagnetGroup);

  // North Pole (Red)
  const northGeo = new THREE.BoxGeometry(0.9, 0.35, 0.45);
  const northMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.3,
    metalness: 0.3
  });
  const northMesh = new THREE.Mesh(northGeo, northMat);
  northMesh.position.set(-0.45, 0, 0);
  barMagnetGroup.add(northMesh);

  // South Pole (Blue)
  const southGeo = new THREE.BoxGeometry(0.9, 0.35, 0.45);
  const southMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.3,
    metalness: 0.3
  });
  const southMesh = new THREE.Mesh(southGeo, southMat);
  southMesh.position.set(0.45, 0, 0);
  barMagnetGroup.add(southMesh);

  // Animated 3D Magnetic Field Rings
  const ringCount = 3;
  const magRings = [];
  const ringGeo = new THREE.TorusGeometry(0.75, 0.025, 8, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.65
  });
  for (let i = 0; i < ringCount; i++) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = (i * Math.PI) / 3;
    barMagnetGroup.add(ring);
    magRings.push(ring);
  }

  const magnetLabel = createLabel(textures, 'Neodymium Magnet', {
    subtext: 'Attracts Magnetic Metals (Iron, Nickel, Cobalt)',
    border: '#ef4444',
    scale: 1.1
  });
  magnetLabel.position.set(3.8, 2.0, -1.2);
  group.add(magnetLabel);

  // --------------------------------------------------------------------------
  // Station 4: Thermal Hot / Cold Plate & 3D Thermometer (X = 0, Z = 1.6)
  // --------------------------------------------------------------------------
  const plateStation = new THREE.Group();
  plateStation.position.set(0, 0, 1.6);
  group.add(plateStation);

  const plateBaseGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.25, 32);
  const plateBaseMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.4,
    metalness: 0.5
  });
  const plateBase = new THREE.Mesh(plateBaseGeo, plateBaseMat);
  plateBase.position.set(0, 0.125, 0);
  plateStation.add(plateBase);

  // Active Thermal Ceramic Plate (Color changes with temperature)
  const plateCeramicGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.08, 32);
  const plateCeramicMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.3,
    metalness: 0.2,
    emissive: 0x000000,
    emissiveIntensity: 0.0
  });
  const plateCeramic = new THREE.Mesh(plateCeramicGeo, plateCeramicMat);
  plateCeramic.position.set(0, 0.29, 0);
  plateStation.add(plateCeramic);

  // 3D Glass Thermometer Column
  const thermoGroup = new THREE.Group();
  thermoGroup.position.set(1.4, 0, 0);
  plateStation.add(thermoGroup);

  const thermoGlassGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 16);
  const thermoGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1
  });
  const thermoGlass = new THREE.Mesh(thermoGlassGeo, thermoGlassMat);
  thermoGlass.position.set(0, 1.0, 0);
  thermoGroup.add(thermoGlass);

  // Fluid column inside thermometer
  const thermoFluidGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
  thermoFluidGeo.translate(0, 0.5, 0);
  const thermoFluidMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xdc2626,
    emissiveIntensity: 0.6
  });
  const thermoFluid = new THREE.Mesh(thermoFluidGeo, thermoFluidMat);
  thermoFluid.position.set(0, 0.05, 0);
  thermoFluid.scale.set(1, 0.5, 1);
  thermoGroup.add(thermoFluid);

  // Thermal Plate Readout Sprite
  const tempLabel = createLabel(textures, '20 °C', {
    subtext: 'Thermal Plate',
    border: '#0ea5e9',
    scale: 1.0
  });
  tempLabel.position.set(0, 2.2, 1.6);
  group.add(tempLabel);

  // Rising Steam Vapor Particles for Hot Plate (> 100°C)
  const steamCount = 16;
  const steamParticles = [];
  const steamGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const steamMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    transparent: true,
    opacity: 0.5,
    roughness: 0.9
  });
  for (let i = 0; i < steamCount; i++) {
    const s = new THREE.Mesh(steamGeo, steamMat);
    s.position.set((Math.random() - 0.5) * 0.8, 0.4 + Math.random() * 1.5, (Math.random() - 0.5) * 0.8);
    s.visible = false;
    s.userData = { speed: 0.8 + Math.random() * 0.6 };
    plateStation.add(s);
    steamParticles.push(s);
  }

  // --------------------------------------------------------------------------
  // Material Samples (6 items with accurate physical properties)
  // --------------------------------------------------------------------------
  const SAMPLES_DATA = {
    iron_bolt: {
      name: 'Iron Bolt',
      mass: 78.0,
      volume: 10.0,
      density: 7.8,
      magnetic: true,
      color: 0x64748b,
      floats: false,
      state: 'Solid',
      matOpts: { roughness: 0.2, metalness: 0.85 }
    },
    oak_wood: {
      name: 'Oak Wood Block',
      mass: 13.0,
      volume: 20.0,
      density: 0.65,
      magnetic: false,
      color: 0xd97706,
      floats: true,
      state: 'Solid',
      matOpts: { roughness: 0.8, metalness: 0.0 }
    },
    copper_cube: {
      name: 'Copper Cube',
      mass: 89.0,
      volume: 10.0,
      density: 8.9,
      magnetic: false,
      color: 0xb45309,
      floats: false,
      state: 'Solid',
      matOpts: { roughness: 0.3, metalness: 0.9 }
    },
    cork_buoy: {
      name: 'Cork / Foam Buoy',
      mass: 4.4,
      volume: 20.0,
      density: 0.22,
      magnetic: false,
      color: 0xfde047,
      floats: true,
      state: 'Solid',
      matOpts: { roughness: 0.9, metalness: 0.0 }
    },
    ice_water: {
      name: 'Water / Phase Beaker',
      mass: 50.0,
      volume: 50.0,
      density: 1.0,
      magnetic: false,
      color: 0x38bdf8,
      floats: true, // Ice density ~0.92 floats
      state: 'Dynamic (T-dependent)',
      matOpts: { roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.8 }
    },
    aluminum_rod: {
      name: 'Aluminum Rod',
      mass: 27.0,
      volume: 10.0,
      density: 2.7,
      magnetic: false,
      color: 0xe2e8f0,
      floats: false,
      state: 'Solid',
      matOpts: { roughness: 0.25, metalness: 0.8 }
    }
  };

  // Sample Storage Rack on Bench (X = -3.8, Z = 2.0)
  const rackGroup = new THREE.Group();
  rackGroup.position.set(-3.8, 0, 2.0);
  group.add(rackGroup);

  const rackBaseGeo = new THREE.BoxGeometry(3.2, 0.15, 1.4);
  const rackBaseMat = new THREE.MeshStandardMaterial({
    map: textures?.wood ? textures.wood('#b45309') : null,
    roughness: 0.7
  });
  const rackBase = new THREE.Mesh(rackBaseGeo, rackBaseMat);
  rackBase.position.set(0, 0.075, 0);
  rackGroup.add(rackBase);

  // Build 3D Mesh representations for the 6 samples
  const sampleMeshes = {};
  const interactables = [];

  // 1. Iron Bolt
  const boltGroup = new THREE.Group();
  const boltHead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.2, 6),
    new THREE.MeshStandardMaterial(SAMPLES_DATA.iron_bolt.matOpts)
  );
  boltHead.position.set(0, 0.5, 0);
  const boltShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.7, 16),
    new THREE.MeshStandardMaterial(SAMPLES_DATA.iron_bolt.matOpts)
  );
  boltShaft.position.set(0, 0.15, 0);
  boltGroup.add(boltHead, boltShaft);
  sampleMeshes.iron_bolt = boltGroup;

  // 2. Oak Wood Block
  const oakMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 0.7),
    new THREE.MeshStandardMaterial({
      map: textures?.wood ? textures.wood('#d97706') : null,
      roughness: 0.85
    })
  );
  sampleMeshes.oak_wood = oakMesh;

  // 3. Copper Cube
  const copperMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.65, 0.65),
    new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.2,
      metalness: 0.95
    })
  );
  sampleMeshes.copper_cube = copperMesh;

  // 4. Cork / Foam Buoy
  const corkMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.7, 16),
    new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.95,
      metalness: 0.0
    })
  );
  sampleMeshes.cork_buoy = corkMesh;

  // 5. Water/State Beaker
  const beakerGroup = new THREE.Group();
  const beakerGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.8, 16, 1, true),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, roughness: 0.1 })
  );
  beakerGlass.position.set(0, 0.4, 0);
  const beakerCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.65, 16),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  );
  beakerCore.position.set(0, 0.35, 0);
  beakerGroup.add(beakerGlass, beakerCore);
  beakerGroup.userData.coreMesh = beakerCore;
  sampleMeshes.ice_water = beakerGroup;

  // 6. Aluminum Rod
  const alumMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.9, 16),
    new THREE.MeshStandardMaterial({
      map: textures?.brushedMetal ? textures.brushedMetal('#e2e8f0') : null,
      roughness: 0.25,
      metalness: 0.85
    })
  );
  sampleMeshes.aluminum_rod = alumMesh;

  // Place all samples onto the rack initially and tag them
  const sampleKeys = Object.keys(SAMPLES_DATA);
  sampleKeys.forEach((key, idx) => {
    const mesh = sampleMeshes[key];
    mesh.userData = {
      sampleKey: key,
      ...SAMPLES_DATA[key],
      currentStation: 'rack',
      rackX: -4.8 + (idx % 3) * 1.0,
      rackZ: 1.6 + Math.floor(idx / 3) * 0.8
    };
    mesh.position.set(mesh.userData.rackX, 0.35, mesh.userData.rackZ);
    group.add(mesh);
    interactables.push(mesh);
  });

  // Current Interactive State
  let activeSampleKey = 'iron_bolt';
  let activeStation = 'rack'; // 'rack', 'tank', 'scale', 'magnet', 'plate'
  let temperature = 20; // -20 to 150 °C
  let magnetActive = true;
  let waterBobTime = 0;

  // Helper to place active sample at specified station
  function placeSampleAtStation(sampleKey, station) {
    const mesh = sampleMeshes[sampleKey];
    if (!mesh) return;

    mesh.userData.currentStation = station;
    activeStation = station;

    if (station === 'rack') {
      mesh.position.set(mesh.userData.rackX, 0.35, mesh.userData.rackZ);
      scaleDisplay.updateText('0.0 g', 'Electronic Balance', '#22c55e');
    } else if (station === 'tank') {
      safePlay(audio, 'splash');
      mesh.position.set(-3.8, 1.8, -0.5);
      scaleDisplay.updateText('0.0 g', 'Electronic Balance', '#22c55e');
    } else if (station === 'scale') {
      safePlay(audio, 'click');
      mesh.position.set(0, 0.55, -1.4);
      scaleDisplay.updateText(`${mesh.userData.mass.toFixed(1)} g`, `Sample: ${mesh.userData.name}`, '#22c55e');
    } else if (station === 'magnet') {
      mesh.position.set(3.8, 0.55, -0.5);
      scaleDisplay.updateText('0.0 g', 'Electronic Balance', '#22c55e');
      if (mesh.userData.magnetic && magnetActive) {
        safePlay(audio, 'magnet');
        mesh.position.set(3.8, 0.55, -1.0); // snaps to magnet!
      }
    } else if (station === 'plate') {
      safePlay(audio, 'click');
      mesh.position.set(0, 0.45, 1.6);
      scaleDisplay.updateText('0.0 g', 'Electronic Balance', '#22c55e');
    }

    pushTelemetry();
  }

  function pushTelemetry() {
    const s = SAMPLES_DATA[activeSampleKey];
    if (!s) return;

    let dynamicState = s.state;
    if (activeSampleKey === 'ice_water') {
      dynamicState = temperature < 0 ? 'Solid Ice (< 0°C)' : temperature > 100 ? 'Gas Steam (> 100°C)' : 'Liquid Water (0-100°C)';
    }

    updateTelemetry([
      { label: 'Sample', value: s.name, color: '#38bdf8' },
      { label: 'Mass', value: s.mass.toFixed(1), unit: 'g', color: '#22c55e' },
      { label: 'Volume', value: s.volume.toFixed(1), unit: 'cm³', color: '#a855f7' },
      { label: 'Density', value: s.density.toFixed(2), unit: 'g/cm³', color: s.density < 1.0 ? '#0284c7' : '#e11d48' },
      { label: 'Buoyancy', value: s.density < 1.0 ? 'Floats in Water' : 'Sinks to Bottom', color: s.density < 1.0 ? '#22c55e' : '#ef4444' },
      { label: 'Magnetic?', value: s.magnetic ? 'YES (Attracted)' : 'NO (Non-magnetic)', color: s.magnetic ? '#ef4444' : '#64748b' },
      { label: 'Plate Temp', value: `${temperature}`, unit: '°C', color: temperature > 50 ? '#ef4444' : '#0ea5e9' },
      { label: 'State', value: dynamicState, color: '#f59e0b' }
    ]);
  }

  // Initial telemetry broadcast
  pushTelemetry();

  return {
    interactables,
    controls: [
      {
        id: 'sample',
        type: 'select',
        label: 'Material Sample',
        value: activeSampleKey,
        options: [
          { value: 'iron_bolt', label: '1. Iron Bolt (7.8 g/cm³)' },
          { value: 'oak_wood', label: '2. Oak Wood Block (0.65 g/cm³)' },
          { value: 'copper_cube', label: '3. Copper Cube (8.9 g/cm³)' },
          { value: 'cork_buoy', label: '4. Cork Buoy (0.22 g/cm³)' },
          { value: 'ice_water', label: '5. Phase Beaker (T-Dependent)' },
          { value: 'aluminum_rod', label: '6. Aluminum Rod (2.7 g/cm³)' }
        ]
      },
      {
        id: 'station',
        type: 'select',
        label: 'Test Station',
        value: 'rack',
        options: [
          { value: 'rack', label: 'Storage Rack (Reset)' },
          { value: 'tank', label: 'Water Buoyancy Tank' },
          { value: 'scale', label: 'Digital Scale (Mass)' },
          { value: 'magnet', label: 'Neodymium Magnet Station' },
          { value: 'plate', label: 'Thermal Hot/Cold Plate' }
        ]
      },
      {
        id: 'temperature',
        type: 'slider',
        label: 'Thermal Plate Temperature',
        min: -20,
        max: 150,
        step: 5,
        value: 20,
        unit: '°C'
      },
      {
        id: 'magnetActive',
        type: 'toggle',
        label: 'Magnet Power Active',
        value: true
      }
    ],

    onControlChange(id, value) {
      if (id === 'sample') {
        activeSampleKey = value;
        placeSampleAtStation(activeSampleKey, activeStation);
      } else if (id === 'station') {
        placeSampleAtStation(activeSampleKey, value);
      } else if (id === 'temperature') {
        temperature = Number(value);
        // Adjust plate color from icy blue to dark slate to glowing red
        const tNorm = Math.min(1, Math.max(0, (temperature + 20) / 170));
        const r = Math.min(1, tNorm * 1.8);
        const b = Math.max(0, 1.0 - tNorm * 1.5);
        plateCeramicMat.color.setRGB(0.3 + r * 0.7, 0.3, 0.3 + b * 0.5);
        plateCeramicMat.emissive.setRGB(r * 0.6, 0.05, 0.0);
        plateCeramicMat.emissiveIntensity = tNorm * 0.9;

        // Thermometer fluid height
        thermoFluid.scale.set(1, Math.max(0.08, tNorm * 1.8), 1);
        tempLabel.updateText(
          `${temperature} °C`,
          temperature > 100 ? 'Boiling (>100°C)' : temperature < 0 ? 'Freezing (<0°C)' : 'Liquid Range',
          temperature > 50 ? '#ef4444' : '#0ea5e9'
        );

        // Update Ice/Water phase beaker appearance if on plate
        const beakerMesh = sampleMeshes.ice_water;
        if (beakerMesh && beakerMesh.userData.coreMesh) {
          const core = beakerMesh.userData.coreMesh;
          if (temperature < 0) {
            core.material.color.setHex(0xe0f2fe);
            core.material.opacity = 0.95;
            core.scale.set(1.05, 1.05, 1.05); // Expansion upon freezing!
          } else if (temperature > 100) {
            core.material.color.setHex(0x38bdf8);
            core.material.opacity = 0.3;
            core.scale.set(0.9, 0.4, 0.9); // Evaporating
          } else {
            core.material.color.setHex(0x0284c7);
            core.material.opacity = 0.85;
            core.scale.set(1, 1, 1);
          }
        }
        pushTelemetry();
      } else if (id === 'magnetActive') {
        magnetActive = Boolean(value);
        ringMat.opacity = magnetActive ? 0.65 : 0.05;
        if (activeStation === 'magnet') {
          placeSampleAtStation(activeSampleKey, 'magnet');
        }
      }
    },

    onObjectClick(mesh) {
      // Find parent or mesh in interactables
      let target = mesh;
      while (target && !target.userData.sampleKey && target.parent) {
        target = target.parent;
      }
      if (target && target.userData.sampleKey) {
        activeSampleKey = target.userData.sampleKey;
        // Cycle station: rack -> scale -> tank -> magnet -> plate -> rack
        const cycle = ['rack', 'scale', 'tank', 'magnet', 'plate'];
        const currentIdx = cycle.indexOf(activeStation);
        const nextStation = cycle[(currentIdx + 1) % cycle.length];
        placeSampleAtStation(activeSampleKey, nextStation);
      }
    },

    onObjectDrag(mesh, worldPoint) {
      if (mesh && mesh.userData.sampleKey) {
        mesh.position.x = worldPoint.x;
        mesh.position.z = worldPoint.z;
      }
    },

    onStageChange(stage) {
      if (stage === 'explore') {
        placeSampleAtStation('iron_bolt', 'tank');
      } else if (stage === 'explain') {
        placeSampleAtStation('oak_wood', 'tank');
      } else if (stage === 'elaborate') {
        placeSampleAtStation('ice_water', 'plate');
      }
    },

    runElaborateChallenge() {
      // TEKS 4.6A STEM Challenge: Classify unknown material samples by density, magnetism, and state
      const s = SAMPLES_DATA[activeSampleKey];
      const testedTank = activeStation === 'tank';
      const testedMagnet = activeStation === 'magnet';
      const testedScale = activeStation === 'scale';

      return {
        passed: true,
        score: 100,
        feedback: `Excellent observation! You tested ${s.name}: Measured Mass = ${s.mass}g, Volume = ${s.volume}cm³ => Density = ${s.density} g/cm³. Buoyancy: ${s.density < 1.0 ? 'Floats (Density < 1.0)' : 'Sinks (Density > 1.0)'}. Magnetic: ${s.magnetic ? 'YES' : 'NO'}.`
      };
    },

    update(dt, elapsed) {
      waterBobTime += dt;

      // Animate tank bubbles
      bubbles.forEach((b) => {
        b.position.y += b.userData.speed * dt;
        b.position.x += Math.sin(elapsed * 2 + b.userData.wobbleSeed) * 0.003;
        if (b.position.y > 2.0) {
          b.position.y = 0.15;
        }
      });

      // Animate magnetic field rings rotation
      if (magnetActive) {
        magRings.forEach((ring, idx) => {
          ring.rotation.z += (idx % 2 === 0 ? 1 : -1) * dt * 0.8;
          ring.rotation.x = Math.PI / 2 + Math.sin(elapsed * 2 + idx) * 0.15;
        });
      }

      // Animate Hot Plate steam when temp > 100°C
      if (temperature > 100) {
        steamParticles.forEach((s) => {
          s.visible = true;
          s.position.y += s.userData.speed * dt;
          s.scale.multiplyScalar(1.0 + dt * 0.4);
          if (s.position.y > 2.2) {
            s.position.y = 0.35;
            s.scale.set(1, 1, 1);
            s.position.x = (Math.random() - 0.5) * 0.6;
            s.position.z = (Math.random() - 0.5) * 0.6;
          }
        });
      } else {
        steamParticles.forEach((s) => (s.visible = false));
      }

      // Live Buoyancy Spring Physics for sample currently in tank
      const activeMesh = sampleMeshes[activeSampleKey];
      if (activeMesh && activeMesh.userData.currentStation === 'tank') {
        const s = SAMPLES_DATA[activeSampleKey];
        if (s.density < 1.0) {
          // Floats: smooth spring bobbing around water surface equilibrium (y ≈ 1.85)
          const equilibriumY = 2.05 - (s.density * 0.4);
          const bob = Math.sin(waterBobTime * 3.2) * 0.05 * Math.exp(-0.1);
          activeMesh.position.y = equilibriumY + bob;
          activeMesh.rotation.z = Math.sin(waterBobTime * 1.5) * 0.04;
        } else {
          // Sinks: rests firmly on tank bottom (y = 0.45)
          activeMesh.position.y = 0.45;
          activeMesh.rotation.z = 0;
        }
      }
    }
  };
}

// ============================================================================
// MODULE 2: m1_2 (TEKS 4.6B, 4.6C Mixtures, Solutions & Conservation of Matter)
// ============================================================================
export function m1_2(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // --- Split Lab Workbench ---
  const benchGeo = new THREE.BoxGeometry(14.0, 0.4, 7.5);
  const benchMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    map: textures?.labGrid ? textures.labGrid() : null,
    roughness: 0.35,
    metalness: 0.2
  });
  const bench = new THREE.Mesh(benchGeo, benchMat);
  bench.position.set(0, -0.2, 0);
  group.add(bench);

  // Bench Divider Line separating Macro World (Left) and 10,000x Molecular View (Right)
  const dividerGeo = new THREE.BoxGeometry(0.08, 0.05, 7.2);
  const dividerMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8
  });
  const divider = new THREE.Mesh(dividerGeo, dividerMat);
  divider.position.set(0, 0.02, 0);
  group.add(divider);

  // --------------------------------------------------------------------------
  // Left Side: Macro Laboratory Beaker with Magnetic Stirrer
  // --------------------------------------------------------------------------
  const macroGroup = new THREE.Group();
  macroGroup.position.set(-3.6, 0, 0.2);
  group.add(macroGroup);

  // Magnetic Stirrer Hotplate Base
  const stirrerBaseGeo = new THREE.BoxGeometry(3.0, 0.35, 3.0);
  const stirrerBaseMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.3,
    metalness: 0.4
  });
  const stirrerBase = new THREE.Mesh(stirrerBaseGeo, stirrerBaseMat);
  stirrerBase.position.set(0, 0.175, 0);
  macroGroup.add(stirrerBase);

  // Ceramic top circle
  const topPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.3, 0.04, 32),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 })
  );
  topPlate.position.set(0, 0.37, 0);
  macroGroup.add(topPlate);

  // 500mL Glass Beaker
  const beakerGeo = new THREE.CylinderGeometry(1.1, 1.1, 2.2, 32, 1, true);
  const beakerGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    transmission: 0.85,
    ior: 1.5
  });
  const macroBeaker = new THREE.Mesh(beakerGeo, beakerGlassMat);
  macroBeaker.position.set(0, 1.5, 0);
  macroGroup.add(macroBeaker);

  // Liquid Volume inside Beaker
  const liquidGeo = new THREE.CylinderGeometry(1.05, 1.05, 1.5, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.72,
    roughness: 0.15
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.set(0, 1.15, 0);
  macroGroup.add(liquidMesh);

  // Spinning Magnetic Stirrer Flea (pill cylinder)
  const fleaGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16);
  fleaGeo.rotateZ(Math.PI / 2);
  const fleaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
  const stirFlea = new THREE.Mesh(fleaGeo, fleaMat);
  stirFlea.position.set(0, 0.45, 0);
  macroGroup.add(stirFlea);

  // Liquid Funnel Vortex Mesh (inverted cone appearing when stirring)
  const vortexGeo = new THREE.ConeGeometry(0.7, 0.8, 24, 1, true);
  vortexGeo.rotateX(Math.PI);
  const vortexMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.5,
    roughness: 0.1
  });
  const vortexMesh = new THREE.Mesh(vortexGeo, vortexMat);
  vortexMesh.position.set(0, 1.7, 0);
  vortexMesh.visible = false;
  macroGroup.add(vortexMesh);

  // 16 Macro Solute Grains (Sand/Iron particles floating or settled)
  const macroGrains = [];
  const grainGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const sandMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 });
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
  for (let i = 0; i < 18; i++) {
    const isIron = i % 2 === 0;
    const g = new THREE.Mesh(grainGeo, isIron ? ironMat : sandMat);
    g.position.set((Math.random() - 0.5) * 1.5, 0.45, (Math.random() - 0.5) * 1.5);
    g.userData = { isIron, angle: Math.random() * Math.PI * 2, radius: 0.2 + Math.random() * 0.7 };
    macroGroup.add(g);
    macroGrains.push(g);
  }

  const macroLabel = createLabel(textures, 'Macro Beaker (1x Scale)', {
    subtext: 'Dissolves Solutes & Mixes Heterogeneous Mixtures',
    border: '#38bdf8',
    scale: 1.1
  });
  macroLabel.position.set(-3.6, 3.1, 0.2);
  group.add(macroLabel);

  // --------------------------------------------------------------------------
  // Right Side: 10,000x Molecular Magnifier Dome
  // --------------------------------------------------------------------------
  const domeGroup = new THREE.Group();
  domeGroup.position.set(3.6, 0, 0.2);
  group.add(domeGroup);

  // Futuristic Circular Magnifier Pedestal with Cyan Ring
  const domeBaseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.35, 48);
  const domeBaseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.25,
    metalness: 0.8
  });
  const domeBase = new THREE.Mesh(domeBaseGeo, domeBaseMat);
  domeBase.position.set(0, 0.175, 0);
  domeGroup.add(domeBase);

  // Glowing Cyan Ring
  const neonRingGeo = new THREE.TorusGeometry(2.35, 0.04, 16, 48);
  neonRingGeo.rotateX(Math.PI / 2);
  const neonRingMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 1.2
  });
  const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
  neonRing.position.set(0, 0.36, 0);
  domeGroup.add(neonRing);

  // Transparent Geodesic Glass Dome
  const domeGeo = new THREE.SphereGeometry(2.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.25,
    roughness: 0.05,
    transmission: 0.9,
    ior: 1.4
  });
  const domeMesh = new THREE.Mesh(domeGeo, domeMat);
  domeMesh.position.set(0, 0.35, 0);
  domeGroup.add(domeMesh);

  // 3D Animated Molecules inside Dome:
  // (A) H2O Molecules (1 Red Oxygen + 2 White Hydrogen)
  const h2oMolecules = [];
  const oGeo = new THREE.SphereGeometry(0.12, 12, 12);
  const hGeo = new THREE.SphereGeometry(0.07, 10, 10);
  const oMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }); // Oxygen
  const hMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }); // Hydrogen

  for (let i = 0; i < 14; i++) {
    const h2o = new THREE.Group();
    const o = new THREE.Mesh(oGeo, oMat);
    const h1 = new THREE.Mesh(hGeo, hMat);
    h1.position.set(0.12, 0.09, 0);
    const h2 = new THREE.Mesh(hGeo, hMat);
    h2.position.set(-0.12, 0.09, 0);
    h2o.add(o, h1, h2);

    h2o.position.set(
      (Math.random() - 0.5) * 3.2,
      0.6 + Math.random() * 1.4,
      (Math.random() - 0.5) * 3.2
    );
    h2o.userData = {
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.4,
      rotSpeed: 0.5 + Math.random() * 1.5
    };
    domeGroup.add(h2o);
    h2oMolecules.push(h2o);
  }

  // (B) Na+ and Cl- Ions (Dissolving in solution vs clustered in solid crystal)
  const ions = [];
  const naGeo = new THREE.SphereGeometry(0.13, 12, 12);
  const clGeo = new THREE.SphereGeometry(0.17, 12, 12);
  const naMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0x9333ea,
    emissiveIntensity: 0.4
  }); // Na+ Purple
  const clMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x16a34a,
    emissiveIntensity: 0.4
  }); // Cl- Green

  for (let i = 0; i < 12; i++) {
    const isNa = i % 2 === 0;
    const ion = new THREE.Mesh(isNa ? naGeo : clGeo, isNa ? naMat : clMat);
    ion.userData = {
      isNa,
      dispersed: false,
      crystalX: -0.4 + (i % 3) * 0.3,
      crystalY: 0.5 + Math.floor(i / 3) * 0.25,
      crystalZ: (i % 2) * 0.3,
      freeX: (Math.random() - 0.5) * 3.0,
      freeY: 0.6 + Math.random() * 1.3,
      freeZ: (Math.random() - 0.5) * 3.0
    };
    ion.position.set(ion.userData.crystalX, ion.userData.crystalY, ion.userData.crystalZ);
    domeGroup.add(ion);
    ions.push(ion);
  }

  // (C) Sand Crystalline Clusters (Settled at bottom of dome)
  const sandClusters = [];
  const sandClusterGeo = new THREE.DodecahedronGeometry(0.22);
  for (let i = 0; i < 6; i++) {
    const cl = new THREE.Mesh(sandClusterGeo, sandMat);
    cl.position.set(-1.0 + (i % 3) * 0.9, 0.55, -0.6 + Math.floor(i / 3) * 1.0);
    domeGroup.add(cl);
    sandClusters.push(cl);
  }

  const domeLabel = createLabel(textures, '10,000x Molecular Magnifier', {
    subtext: 'Na+ (Purple) & Cl- (Green) dissolve evenly; Sand settles',
    border: '#a855f7',
    scale: 1.1
  });
  domeLabel.position.set(3.6, 3.1, 0.2);
  group.add(domeLabel);

  // --------------------------------------------------------------------------
  // Separation Tools: Magnetic Wand, Filter Sieve, Evaporation Heater
  // --------------------------------------------------------------------------
  const toolsGroup = new THREE.Group();
  toolsGroup.position.set(-3.6, 2.5, 0.2);
  group.add(toolsGroup);

  // Tool 1: Magnetic Wand
  const wandGroup = new THREE.Group();
  const wandHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16),
    new THREE.MeshStandardMaterial({ color: 0xef4444 })
  );
  const wandTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.35, 16),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
  );
  wandTip.position.set(0, -0.65, 0);
  wandGroup.add(wandHandle, wandTip);
  wandGroup.visible = false;
  toolsGroup.add(wandGroup);

  // Tool 2: Mesh Filter Sieve
  const sieveGroup = new THREE.Group();
  const sieveRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.06, 16, 32),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
  );
  sieveRim.rotateX(Math.PI / 2);
  const sieveMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.95, 24),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, wireframe: true })
  );
  sieveMesh.rotateX(-Math.PI / 2);
  sieveGroup.add(sieveRim, sieveMesh);
  sieveGroup.visible = false;
  toolsGroup.add(sieveGroup);

  // --------------------------------------------------------------------------
  // Conservation of Matter Digital Bar & Mass Balance (Z = -2.2)
  // --------------------------------------------------------------------------
  const balanceGroup = new THREE.Group();
  balanceGroup.position.set(0, 0, -2.2);
  group.add(balanceGroup);

  const balanceBeam = new THREE.Mesh(
    new THREE.BoxGeometry(7.0, 0.12, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
  );
  balanceBeam.position.set(0, 1.2, 0);
  balanceGroup.add(balanceBeam);

  const fulcrum = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 1.2, 4),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 })
  );
  fulcrum.position.set(0, 0.6, 0);
  balanceGroup.add(fulcrum);

  const massDisplay = createLabel(textures, 'Mass Conserved: 100.0g + 50.0g = 150.0g', {
    subtext: 'Component A + Component B = Total Mixture Mass',
    border: '#22c55e',
    color: '#4ade80',
    scale: 1.2
  });
  massDisplay.position.set(0, 2.1, -2.2);
  group.add(massDisplay);

  // State
  let mixtureType = 'salt_water'; // 'salt_water', 'sand_water', 'iron_sand', 'triple_mix'
  let stirrerSpeed = 40; // 0 to 100%
  let activeTool = 'none'; // 'none', 'magnet', 'filter', 'evaporate'
  let dissolved = false;
  let ironSeparated = false;
  let sandSeparated = false;
  let waterEvaporated = false;

  function evaluateMixture() {
    let compA = 'Water (100.0g)';
    let compB = 'Salt (50.0g)';
    let totalMass = 150.0;
    let typeDesc = 'Solution (Uniform / Dissolved)';

    if (mixtureType === 'sand_water') {
      compA = 'Water (100.0g)';
      compB = 'Sand (50.0g)';
      typeDesc = 'Heterogeneous Mixture (Sand Settles)';
    } else if (mixtureType === 'iron_sand') {
      compA = 'Iron Filings (50.0g)';
      compB = 'Sand (50.0g)';
      totalMass = 100.0;
      typeDesc = 'Solid Mixture (Separable by Magnet)';
    } else if (mixtureType === 'triple_mix') {
      compA = 'Saltwater (120.0g)';
      compB = 'Iron + Sand (60.0g)';
      totalMass = 180.0;
      typeDesc = 'Complex Mixture (Requires 3 Steps)';
    }

    dissolved = mixtureType === 'salt_water' && stirrerSpeed > 15 && !waterEvaporated;

    // Molecular dispersion in dome
    ions.forEach((ion) => {
      ion.userData.dispersed = dissolved;
    });

    // Update mass conservation banner
    massDisplay.updateText(
      `Total Mass: ${totalMass.toFixed(1)} g (Conserved)`,
      `${compA} + ${compB} = ${totalMass.toFixed(1)} g`,
      '#22c55e'
    );

    updateTelemetry([
      { label: 'Mixture', value: mixtureType.replace('_', ' ').toUpperCase(), color: '#38bdf8' },
      { label: 'Classification', value: typeDesc, color: '#a855f7' },
      { label: 'Stirrer', value: `${stirrerSpeed}`, unit: '%', color: '#22c55e' },
      { label: 'Dissolved Status', value: dissolved ? 'Fully Dissolved (Solution)' : 'Undissolved / Separated', color: dissolved ? '#22c55e' : '#f59e0b' },
      { label: 'Total Mass', value: `${totalMass.toFixed(1)}`, unit: 'g', color: '#4ade80' },
      { label: 'Tool Active', value: activeTool.toUpperCase(), color: '#0ea5e9' }
    ]);
  }

  evaluateMixture();

  return {
    interactables: [macroBeaker, domeMesh],
    controls: [
      {
        id: 'mixture',
        type: 'select',
        label: 'Mixture / Solution Type',
        value: mixtureType,
        options: [
          { value: 'salt_water', label: '1. Salt + Water (Solution)' },
          { value: 'sand_water', label: '2. Sand + Water (Suspension Mixture)' },
          { value: 'iron_sand', label: '3. Iron Filings + Sand (Solid Mixture)' },
          { value: 'triple_mix', label: '4. Triple Mixture (Water+Salt+Sand+Iron)' }
        ]
      },
      {
        id: 'stirrerSpeed',
        type: 'slider',
        label: 'Magnetic Stirrer Speed',
        min: 0,
        max: 100,
        step: 5,
        value: stirrerSpeed,
        unit: '%'
      },
      {
        id: 'tool',
        type: 'select',
        label: 'Physical Separation Tool',
        value: activeTool,
        options: [
          { value: 'none', label: 'None (Observation Mode)' },
          { value: 'magnet', label: '🧲 Magnetic Wand (Pull Iron Filings)' },
          { value: 'filter', label: '🕸️ Mesh Filter Sieve (Separate Sand)' },
          { value: 'evaporate', label: '🔥 Evaporation Heater (Boil Water to Salt)' }
        ]
      }
    ],

    onControlChange(id, value) {
      if (id === 'mixture') {
        mixtureType = value;
        ironSeparated = false;
        sandSeparated = false;
        waterEvaporated = false;
        safePlay(audio, 'bubble');
        evaluateMixture();
      } else if (id === 'stirrerSpeed') {
        stirrerSpeed = Number(value);
        vortexMesh.visible = stirrerSpeed > 25;
        evaluateMixture();
      } else if (id === 'tool') {
        activeTool = value;
        wandGroup.visible = activeTool === 'magnet';
        sieveGroup.visible = activeTool === 'filter';

        if (activeTool === 'magnet') {
          safePlay(audio, 'magnet');
          ironSeparated = true;
          // Pull iron grains to wand tip
          macroGrains.forEach((g) => {
            if (g.userData.isIron) g.position.set(0, 1.8, 0);
          });
        } else if (activeTool === 'filter') {
          safePlay(audio, 'whoosh');
          sandSeparated = true;
          // Sand caught on sieve
          macroGrains.forEach((g) => {
            if (!g.userData.isIron) g.position.set(0, 2.5, 0);
          });
        } else if (activeTool === 'evaporate') {
          safePlay(audio, 'splash');
          waterEvaporated = true;
          liquidMesh.scale.set(1, 0.05, 1);
        } else {
          liquidMesh.scale.set(1, 1, 1);
        }
        evaluateMixture();
      }
    },

    onObjectClick() {
      // Toggle stirrer speed on click
      stirrerSpeed = stirrerSpeed > 0 ? 0 : 60;
      vortexMesh.visible = stirrerSpeed > 25;
      evaluateMixture();
    },

    onObjectDrag() {},

    onStageChange(stage) {
      if (stage === 'explore') {
        mixtureType = 'sand_water';
      } else if (stage === 'explain') {
        mixtureType = 'salt_water';
      } else if (stage === 'elaborate') {
        mixtureType = 'triple_mix';
      }
      evaluateMixture();
    },

    runElaborateChallenge() {
      // TEKS 4.6B & 4.6C STEM Challenge
      const passed = activeTool !== 'none' || dissolved;
      return {
        passed,
        score: passed ? 100 : 75,
        feedback: passed
          ? 'Brilliant! You verified that mass is conserved across dissolving and separation, and accurately separated components by their physical properties!'
          : 'Keep going: Try using the Magnetic Wand, Filter Sieve, or Evaporation Heater to isolate individual components!'
      };
    },

    update(dt, elapsed) {
      // Rotate stirrer flea
      if (stirrerSpeed > 0) {
        stirFlea.rotation.y += dt * stirrerSpeed * 0.4;
        vortexMesh.rotation.y += dt * stirrerSpeed * 0.3;
      }

      // Swirl macro grains in beaker
      macroGrains.forEach((g) => {
        if (!ironSeparated && !sandSeparated) {
          if (stirrerSpeed > 20) {
            g.userData.angle += dt * (stirrerSpeed * 0.05);
            g.position.x = Math.cos(g.userData.angle) * g.userData.radius;
            g.position.z = Math.sin(g.userData.angle) * g.userData.radius;
            g.position.y = 0.5 + Math.sin(elapsed * 4 + g.userData.angle) * 0.3;
          } else {
            // Settle to bottom
            g.position.y = THREE.MathUtils.lerp(g.position.y, 0.45, dt * 2);
          }
        }
      });

      // Animate H2O molecules thermal vibration in dome
      h2oMolecules.forEach((h2o) => {
        h2o.rotation.x += dt * h2o.userData.rotSpeed;
        h2o.rotation.y += dt * h2o.userData.rotSpeed * 0.8;
        h2o.position.x += h2o.userData.vx * dt;
        h2o.position.y += h2o.userData.vy * dt;
        h2o.position.z += h2o.userData.vz * dt;

        // Bounce inside dome bounds
        if (Math.abs(h2o.position.x) > 1.6) h2o.userData.vx *= -1;
        if (h2o.position.y < 0.6 || h2o.position.y > 2.0) h2o.userData.vy *= -1;
        if (Math.abs(h2o.position.z) > 1.6) h2o.userData.vz *= -1;
      });

      // Animate Na+ / Cl- ions (clustered vs dispersed)
      ions.forEach((ion) => {
        if (ion.userData.dispersed) {
          ion.position.x = THREE.MathUtils.lerp(ion.position.x, ion.userData.freeX + Math.sin(elapsed + ion.userData.freeY) * 0.2, dt * 2);
          ion.position.y = THREE.MathUtils.lerp(ion.position.y, ion.userData.freeY + Math.cos(elapsed + ion.userData.freeX) * 0.2, dt * 2);
          ion.position.z = THREE.MathUtils.lerp(ion.position.z, ion.userData.freeZ, dt * 2);
        } else {
          ion.position.x = THREE.MathUtils.lerp(ion.position.x, ion.userData.crystalX, dt * 3);
          ion.position.y = THREE.MathUtils.lerp(ion.position.y, ion.userData.crystalY, dt * 3);
          ion.position.z = THREE.MathUtils.lerp(ion.position.z, ion.userData.crystalZ, dt * 3);
        }
      });
    }
  };
}

// ============================================================================
// MODULE 3: m2_1 (TEKS 4.7A Contact & Non-Contact Forces)
// ============================================================================
export function m2_1(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // --- Laboratory Base Table ---
  const benchGeo = new THREE.BoxGeometry(14.5, 0.4, 7.5);
  const benchMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    map: textures?.labGrid ? textures.labGrid() : null,
    roughness: 0.4
  });
  const bench = new THREE.Mesh(benchGeo, benchMat);
  bench.position.set(0, -0.2, 0);
  group.add(bench);

  // --------------------------------------------------------------------------
  // Multi-Surface Inclined Ramp & Protractor Frame
  // --------------------------------------------------------------------------
  const rampPivotGroup = new THREE.Group();
  rampPivotGroup.position.set(-4.5, 0.1, 0);
  group.add(rampPivotGroup);

  // Ramp Board (7m long, rotates around pivot)
  const rampLength = 6.5;
  const rampWidth = 1.6;
  const rampGeo = new THREE.BoxGeometry(rampLength, 0.12, rampWidth);
  rampGeo.translate(rampLength / 2, 0.06, 0);

  // Surface Textures & Friction Coefficients
  const SURFACES = {
    ice: {
      name: 'Polished Ice',
      mu_k: 0.05,
      color: 0xe0f2fe,
      matOpts: { roughness: 0.05, metalness: 0.1 }
    },
    wood: {
      name: 'Oak Wood',
      mu_k: 0.35,
      map: textures?.wood ? textures.wood('#b45309') : null,
      matOpts: { roughness: 0.6 }
    },
    turf: {
      name: 'Stadium Turf',
      mu_k: 0.55,
      map: textures?.turf ? textures.turf() : null,
      matOpts: { roughness: 0.9 }
    },
    sandpaper: {
      name: 'Coarse Sandpaper',
      mu_k: 0.75,
      map: textures?.sandpaper ? textures.sandpaper() : null,
      matOpts: { roughness: 0.95 }
    }
  };

  const rampMat = new THREE.MeshStandardMaterial({
    color: SURFACES.wood.color || 0xffffff,
    map: SURFACES.wood.map,
    roughness: SURFACES.wood.matOpts.roughness
  });
  const rampMesh = new THREE.Mesh(rampGeo, rampMat);
  rampPivotGroup.add(rampMesh);

  // Protractor Angle Arc (at pivot)
  const arcGeo = new THREE.RingGeometry(0.8, 1.1, 32, 1, 0, Math.PI / 4);
  const arcMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
  const protractor = new THREE.Mesh(arcGeo, arcMat);
  protractor.position.set(0, 0.05, rampWidth / 2 + 0.05);
  rampPivotGroup.add(protractor);

  // Angle Readout Label
  const angleLabel = createLabel(textures, 'Incline: 25°', {
    subtext: 'Adjust slope to increase Down-Ramp Force',
    border: '#0ea5e9',
    scale: 1.0
  });
  angleLabel.position.set(-4.5, 2.2, rampWidth / 2 + 0.8);
  group.add(angleLabel);

  // Runout Horizontal Track on bench after ramp
  const runoutGeo = new THREE.BoxGeometry(5.5, 0.06, rampWidth);
  const runoutMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.5
  });
  const runoutTrack = new THREE.Mesh(runoutGeo, runoutMat);
  runoutTrack.position.set(2.0, 0.03, 0);
  group.add(runoutTrack);

  // Distance Marker Ticks on Runout Track
  for (let i = 0; i <= 5; i++) {
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.08, rampWidth * 0.9),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8 })
    );
    tick.position.set(-0.5 + i * 1.0, 0.07, 0);
    group.add(tick);
  }

  // --------------------------------------------------------------------------
  // Weighted Test Sled & 3D Force Vector Arrows
  // --------------------------------------------------------------------------
  const sledGroup = new THREE.Group();
  group.add(sledGroup);

  // Sled Body
  const sledBodyGeo = new THREE.BoxGeometry(0.9, 0.15, 0.65);
  const sledBodyMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.3,
    metalness: 0.4
  });
  const sledBody = new THREE.Mesh(sledBodyGeo, sledBodyMat);
  sledBody.position.set(0, 0.1, 0);
  sledGroup.add(sledBody);

  // Stackable Brass Weights (1 to 10 disks = 50g to 500g)
  const weightDisks = [];
  const diskGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 16);
  const diskMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.85,
    roughness: 0.2
  });
  for (let i = 0; i < 6; i++) {
    const d = new THREE.Mesh(diskGeo, diskMat);
    d.position.set(0, 0.21 + i * 0.065, 0);
    sledGroup.add(d);
    weightDisks.push(d);
  }

  // Sled Front Magnetic Nose Bumper
  const sledBumper = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.12, 0.4),
    new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8 })
  );
  sledBumper.position.set(0.46, 0.1, 0);
  sledGroup.add(sledBumper);

  // 4 Live Glowing Force Vector Arrows:
  // 1. Gravity (Down Blue)
  const arrowGravity = createForceArrow(THREE, 0x3b82f6, 1.2, 0.035);
  sledGroup.add(arrowGravity);

  // 2. Normal Force (Perpendicular Green)
  const arrowNormal = createForceArrow(THREE, 0x22c55e, 1.0, 0.035);
  sledGroup.add(arrowNormal);

  // 3. Down-ramp Force (Along Incline Cyan)
  const arrowParallel = createForceArrow(THREE, 0x06b6d4, 0.8, 0.035);
  sledGroup.add(arrowParallel);

  // 4. Friction (Opposing Red)
  const arrowFriction = createForceArrow(THREE, 0xef4444, 0.6, 0.035);
  sledGroup.add(arrowFriction);

  // Floating live force readout sprite directly above sled
  const sledLabel = createLabel(textures, 'Fnet: 0.0 N', {
    subtext: 'Static Balance',
    border: '#22c55e',
    scale: 1.0
  });
  sledGroup.add(sledLabel);
  sledLabel.position.set(0, 1.3, 0);

  // --------------------------------------------------------------------------
  // Non-Contact Magnetic Repulsion / Attraction Brake at Track End
  // --------------------------------------------------------------------------
  const brakeGroup = new THREE.Group();
  brakeGroup.position.set(4.8, 0, 0);
  group.add(brakeGroup);

  const brakeCoilGeo = new THREE.BoxGeometry(0.6, 0.8, rampWidth * 0.8);
  const brakeCoilMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.7
  });
  const brakeCoil = new THREE.Mesh(brakeCoilGeo, brakeCoilMat);
  brakeCoil.position.set(0, 0.4, 0);
  brakeGroup.add(brakeCoil);

  // Glowing magnetic field rings at brake
  const brakeRings = [];
  const bRingGeo = new THREE.TorusGeometry(0.5, 0.025, 8, 24);
  const bRingMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.7
  });
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(bRingGeo, bRingMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(-0.35 - i * 0.25, 0.4, 0);
    brakeGroup.add(ring);
    brakeRings.push(ring);
  }

  const brakeLabel = createLabel(textures, 'Magnetic Brake', {
    subtext: 'Non-contact deceleration buffer',
    border: '#06b6d4',
    scale: 0.95
  });
  brakeLabel.position.set(4.8, 1.4, 0);
  group.add(brakeLabel);

  // Simulation Physics State
  let inclineAngle = 25; // degrees
  let surfaceKey = 'wood';
  let sledMass = 200; // grams (0.2 kg)
  let brakeMode = 'repel'; // 'repel', 'attract', 'off'
  let isMoving = false;
  let sledDistAlongRamp = 0.5; // distance from top of ramp down towards pivot
  let sledRunoutDist = 0; // distance along horizontal track
  let velocity = 0; // m/s
  const g = 9.81;

  function resetSled() {
    isMoving = false;
    velocity = 0;
    sledDistAlongRamp = 0.5;
    sledRunoutDist = 0;
    updateSledTransform();
    evaluateForces();
  }

  function updateSledTransform() {
    const rad = (inclineAngle * Math.PI) / 180;
    rampPivotGroup.rotation.z = -rad;

    if (sledDistAlongRamp < rampLength) {
      // Sled on ramp: positioned along the rotated board
      // Top of board is at distance (rampLength - sledDistAlongRamp) from pivot
      const distFromPivot = rampLength - sledDistAlongRamp;
      const localX = distFromPivot;
      const localY = 0.15;

      const worldX = -4.5 + Math.cos(-rad) * localX - Math.sin(-rad) * localY;
      const worldY = 0.1 + Math.sin(-rad) * localX + Math.cos(-rad) * localY;

      sledGroup.position.set(worldX, worldY, 0);
      sledGroup.rotation.z = -rad;
    } else {
      // Sled on horizontal runout track
      const runoutX = -4.5 + Math.cos(-rad) * 0 + sledRunoutDist;
      sledGroup.position.set(runoutX, 0.15, 0);
      sledGroup.rotation.z = 0;
    }
  }

  function evaluateForces() {
    const rad = (inclineAngle * Math.PI) / 180;
    const m = sledMass / 1000; // kg
    const mu = SURFACES[surfaceKey].mu_k;

    const Fg = m * g;
    const Fn = Fg * Math.cos(rad);
    const Fparallel = Fg * Math.sin(rad);
    const Ffriction = mu * Fn;
    const Fnet = Math.max(0, Fparallel - Ffriction);
    const accel = Fnet / m;

    // Update 3D force vector arrows
    arrowGravity.setLengthAndDirection(Math.min(1.8, Fg * 0.6), new THREE.Vector3(0, -1, 0));
    arrowNormal.setLengthAndDirection(Math.min(1.8, Fn * 0.6), new THREE.Vector3(0, 1, 0));
    arrowParallel.setLengthAndDirection(Math.min(1.8, Fparallel * 0.8), new THREE.Vector3(1, 0, 0));
    arrowFriction.setLengthAndDirection(Math.min(1.8, Ffriction * 0.8), new THREE.Vector3(-1, 0, 0));

    sledLabel.updateText(
      `Fnet: ${Fnet.toFixed(2)} N  (a = ${accel.toFixed(1)} m/s²)`,
      Fnet > 0 ? 'Net Accelerating Force' : 'Friction Balances Gravity',
      Fnet > 0 ? '#38bdf8' : '#22c55e'
    );

    updateTelemetry([
      { label: 'Surface', value: SURFACES[surfaceKey].name, color: '#38bdf8' },
      { label: 'Friction (μ)', value: mu.toFixed(2), color: '#f59e0b' },
      { label: 'Incline Angle', value: `${inclineAngle}`, unit: '°', color: '#0ea5e9' },
      { label: 'Sled Mass', value: `${sledMass}`, unit: 'g', color: '#a855f7' },
      { label: 'Gravity Force', value: Fg.toFixed(2), unit: 'N', color: '#3b82f6' },
      { label: 'Normal Force', value: Fn.toFixed(2), unit: 'N', color: '#22c55e' },
      { label: 'Down-Ramp Force', value: Fparallel.toFixed(2), unit: 'N', color: '#06b6d4' },
      { label: 'Friction Force', value: Ffriction.toFixed(2), unit: 'N', color: '#ef4444' },
      { label: 'Net Force', value: Fnet.toFixed(2), unit: 'N', color: '#4ade80' },
      { label: 'Sled Speed', value: velocity.toFixed(2), unit: 'm/s', color: '#38bdf8' }
    ]);
  }

  resetSled();

  return {
    interactables: [sledBody, runoutTrack],
    controls: [
      {
        id: 'angle',
        type: 'slider',
        label: 'Ramp Incline Angle',
        min: 0,
        max: 45,
        step: 1,
        value: inclineAngle,
        unit: '°'
      },
      {
        id: 'surface',
        type: 'select',
        label: 'Ramp Surface Texture',
        value: surfaceKey,
        options: [
          { value: 'ice', label: '1. Polished Ice (Low Friction μ=0.05)' },
          { value: 'wood', label: '2. Oak Wood (Medium Friction μ=0.35)' },
          { value: 'turf', label: '3. Stadium Turf (High Friction μ=0.55)' },
          { value: 'sandpaper', label: '4. Coarse Sandpaper (Very High μ=0.75)' }
        ]
      },
      {
        id: 'mass',
        type: 'slider',
        label: 'Sled Mass (Weights)',
        min: 50,
        max: 500,
        step: 50,
        value: sledMass,
        unit: 'g'
      },
      {
        id: 'brake',
        type: 'select',
        label: 'Magnetic Brake Mode',
        value: brakeMode,
        options: [
          { value: 'repel', label: '🧲 Repulsion Cushion (Non-Contact)' },
          { value: 'attract', label: '🧲 Magnetic Attract Lock' },
          { value: 'off', label: '❌ Brake Off (Natural Friction Stop)' }
        ]
      },
      {
        id: 'release',
        type: 'button',
        label: 'Release Sled Down Ramp',
        icon: '🚀'
      },
      {
        id: 'reset',
        type: 'button',
        label: 'Reset Sled to Top',
        icon: '🔄'
      }
    ],

    onControlChange(id, value) {
      if (id === 'angle') {
        inclineAngle = Number(value);
        angleLabel.updateText(`Incline: ${inclineAngle}°`, 'Adjust slope to increase Down-Ramp Force', '#0ea5e9');
        updateSledTransform();
        evaluateForces();
      } else if (id === 'surface') {
        surfaceKey = value;
        const s = SURFACES[surfaceKey];
        rampMat.color.setHex(s.color || 0xffffff);
        rampMat.map = s.map || null;
        rampMat.needsUpdate = true;
        safePlay(audio, 'click');
        evaluateForces();
      } else if (id === 'mass') {
        sledMass = Number(value);
        const count = Math.min(6, Math.max(1, Math.round(sledMass / 80)));
        weightDisks.forEach((d, i) => (d.visible = i < count));
        evaluateForces();
      } else if (id === 'brake') {
        brakeMode = value;
        bRingMat.opacity = brakeMode !== 'off' ? 0.7 : 0.05;
      } else if (id === 'release') {
        isMoving = true;
        safePlay(audio, 'whoosh');
      } else if (id === 'reset') {
        resetSled();
        safePlay(audio, 'click');
      }
    },

    onObjectClick() {
      // Toggle release/reset
      if (isMoving) resetSled();
      else {
        isMoving = true;
        safePlay(audio, 'whoosh');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      if (stage === 'explore') {
        surfaceKey = 'ice';
        inclineAngle = 20;
      } else if (stage === 'explain') {
        surfaceKey = 'wood';
        inclineAngle = 30;
      } else if (stage === 'elaborate') {
        surfaceKey = 'sandpaper';
        inclineAngle = 40;
      }
      resetSled();
    },

    runElaborateChallenge() {
      // TEKS 4.7A Challenge: Predict whether sled will overcome static friction and slide
      const rad = (inclineAngle * Math.PI) / 180;
      const mu = SURFACES[surfaceKey].mu_k;
      const slides = Math.tan(rad) > mu;

      return {
        passed: slides,
        score: slides ? 100 : 60,
        feedback: slides
          ? `Success! At ${inclineAngle}°, tan(θ) = ${Math.tan(rad).toFixed(2)} > μ (${mu}). Gravity component overcomes friction and sled accelerates!`
          : `Static balance: At ${inclineAngle}°, tan(θ) = ${Math.tan(rad).toFixed(2)} <= μ (${mu}). Friction holds the sled stationary. Increase the ramp angle to overcome friction!`
      };
    },

    update(dt) {
      if (isMoving) {
        const rad = (inclineAngle * Math.PI) / 180;
        const mu = SURFACES[surfaceKey].mu_k;

        if (sledDistAlongRamp < rampLength) {
          // Accelerating down ramp
          const a = g * (Math.sin(rad) - mu * Math.cos(rad));
          if (a > 0 || velocity > 0) {
            velocity += Math.max(0, a) * dt;
            sledDistAlongRamp += velocity * dt;
          } else {
            isMoving = false;
          }
        } else {
          // Moving along horizontal runout track (friction decelerates)
          let aDecel = -mu * g;

          // Magnetic brake interaction
          const distToBrake = 4.8 - (sledGroup.position.x);
          if (distToBrake < 2.0 && brakeMode === 'repel') {
            const FmagDecel = 15.0 / Math.max(0.2, distToBrake * distToBrake);
            aDecel -= FmagDecel;
          } else if (distToBrake < 0.6 && brakeMode === 'attract') {
            velocity = 0;
            isMoving = false;
            safePlay(audio, 'magnet');
          }

          velocity += aDecel * dt;
          if (velocity <= 0) {
            velocity = 0;
            isMoving = false;
            safePlay(audio, 'thud');
          } else {
            sledRunoutDist += velocity * dt;
          }
        }

        updateSledTransform();
        evaluateForces();
      }
    }
  };
}

// ============================================================================
// MODULE 4: m2_2 (TEKS 4.8A Energy Transfer in Motion, Waves & Collisions)
// ============================================================================
export function m2_2(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // --- Main Dual Arena Bench ---
  const benchGeo = new THREE.BoxGeometry(14.5, 0.4, 7.5);
  const benchMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    map: textures?.labGrid ? textures.labGrid() : null,
    roughness: 0.35
  });
  const bench = new THREE.Mesh(benchGeo, benchMat);
  bench.position.set(0, -0.2, 0);
  group.add(bench);

  // --------------------------------------------------------------------------
  // Arena A: 5-Sphere Chrome Newton's Cradle (Left Arena: X = -3.6)
  // --------------------------------------------------------------------------
  const cradleGroup = new THREE.Group();
  cradleGroup.position.set(-3.6, 0, 0);
  group.add(cradleGroup);

  // Chrome Frame (Uprights & Crossbars)
  const frameMat = new THREE.MeshStandardMaterial({
    map: textures?.brushedMetal ? textures.brushedMetal('#94a3b8') : null,
    metalness: 0.9,
    roughness: 0.15
  });

  const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
  const post1 = new THREE.Mesh(postGeo, frameMat);
  post1.position.set(-1.8, 1.6, 0.9);
  const post2 = new THREE.Mesh(postGeo, frameMat);
  post2.position.set(1.8, 1.6, 0.9);
  const post3 = new THREE.Mesh(postGeo, frameMat);
  post3.position.set(-1.8, 1.6, -0.9);
  const post4 = new THREE.Mesh(postGeo, frameMat);
  post4.position.set(1.8, 1.6, -0.9);
  cradleGroup.add(post1, post2, post3, post4);

  const barGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.8, 16);
  barGeo.rotateZ(Math.PI / 2);
  const topBarFront = new THREE.Mesh(barGeo, frameMat);
  topBarFront.position.set(0, 3.2, 0.9);
  const topBarBack = new THREE.Mesh(barGeo, frameMat);
  topBarBack.position.set(0, 3.2, -0.9);
  cradleGroup.add(topBarFront, topBarBack);

  // 5 Chrome Spheres suspended by dual thin wires
  const ballCount = 5;
  const ballRadius = 0.32;
  const stringLength = 2.0;
  const balls = [];
  const ballGeo = new THREE.SphereGeometry(ballRadius, 24, 24);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: 0.05
  });

  for (let i = 0; i < ballCount; i++) {
    const ballAnchor = new THREE.Group();
    // Neutral X position centered along frame
    const neutralX = (i - 2) * (ballRadius * 2.02);
    ballAnchor.position.set(neutralX, 3.2, 0);
    cradleGroup.add(ballAnchor);

    // Suspension wires (V-shape from front and back top bars)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
    const wireGeoFront = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.9),
      new THREE.Vector3(0, -stringLength, 0)
    ]);
    const wireFront = new THREE.Line(wireGeoFront, lineMat);
    const wireGeoBack = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -0.9),
      new THREE.Vector3(0, -stringLength, 0)
    ]);
    const wireBack = new THREE.Line(wireGeoBack, lineMat);
    ballAnchor.add(wireFront, wireBack);

    // Chrome Sphere
    const sphere = new THREE.Mesh(ballGeo, ballMat);
    sphere.position.set(0, -stringLength, 0);
    ballAnchor.add(sphere);

    // Kinetic Energy indicator ring above sphere
    const keRing = new THREE.Mesh(
      new THREE.RingGeometry(0.25, 0.35, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.0 })
    );
    keRing.position.set(0, -stringLength + 0.45, 0);
    ballAnchor.add(keRing);

    ballAnchor.userData = {
      index: i,
      neutralX,
      angle: 0,
      sphereMesh: sphere,
      keRing
    };

    balls.push(ballAnchor);
  }

  const cradleLabel = createLabel(textures, "Newton's Cradle (Conservation of Momentum)", {
    subtext: 'Input KE = Output KE (Energy transferred via elastic collision)',
    border: '#38bdf8',
    scale: 1.1
  });
  cradleLabel.position.set(-3.6, 3.8, 0);
  group.add(cradleLabel);

  // --------------------------------------------------------------------------
  // Arena B: 3D Ripple Wave Tank & Floating Yellow Duck Buoy (Right Arena: X = 3.6)
  // --------------------------------------------------------------------------
  const tankGroup = new THREE.Group();
  tankGroup.position.set(3.6, 0, 0);
  group.add(tankGroup);

  // Acrylic Glass Tank
  const tankGeo = new THREE.BoxGeometry(5.2, 1.2, 4.0);
  const tankMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.35,
    roughness: 0.08,
    metalness: 0.1
  });
  const tankMesh = new THREE.Mesh(tankGeo, tankMat);
  tankMesh.position.set(0, 0.6, 0);
  tankGroup.add(tankMesh);

  // 15x15 = 225 Grid of Animated Water Wave Nodes
  const gridDim = 15;
  const waveNodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.3,
    roughness: 0.15
  });

  const nodeGroup = new THREE.Group();
  tankGroup.add(nodeGroup);

  for (let r = 0; r < gridDim; r++) {
    for (let c = 0; c < gridDim; c++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const x = -2.2 + (c / (gridDim - 1)) * 4.4;
      const z = -1.6 + (r / (gridDim - 1)) * 3.2;
      node.position.set(x, 0.7, z);
      node.userData = { baseX: x, baseZ: z, distFromGen: x + 2.2 };
      nodeGroup.add(node);
      waveNodes.push(node);
    }
  }

  // Floating Yellow Rubber Duck Buoy (demonstrating Energy Transfer WITHOUT matter transfer)
  const duckGroup = new THREE.Group();
  duckGroup.position.set(0, 0.7, 0);
  tankGroup.add(duckGroup);

  // Duck Body
  const duckBody = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
  );
  duckBody.scale.set(1.1, 0.8, 1.0);

  // Duck Head & Beak
  const duckHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
  );
  duckHead.position.set(0.18, 0.22, 0);

  const duckBeak = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.18, 12),
    new THREE.MeshStandardMaterial({ color: 0xf97316 })
  );
  duckBeak.rotateZ(-Math.PI / 2);
  duckBeak.position.set(0.35, 0.2, 0);

  duckGroup.add(duckBody, duckHead, duckBeak);

  // Vertical Calibration Pole anchoring the duck to prove X,Z stay 0.0
  const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.0, 12);
  const poleMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const duckPole = new THREE.Line(poleGeo, poleMat);
  duckPole.position.set(0, 1.0, 0);
  tankGroup.add(duckPole);

  const waveLabel = createLabel(textures, 'Waves Transfer ENERGY, Not Matter!', {
    subtext: 'Duck Buoy bobs vertically in place (X = 0cm, Y = ±3cm)',
    border: '#facc15',
    scale: 1.1
  });
  waveLabel.position.set(3.6, 3.8, 0);
  group.add(waveLabel);

  // State
  let ballsPulled = 1; // 1, 2, or 3
  let pullAngle = 40; // degrees
  let cradleState = 'idle'; // 'idle', 'swinging'
  let swingPhase = 0;
  let waveFreq = 1.5; // Hz
  let waveAmp = 4; // cm (amplitude)

  function triggerCradle() {
    cradleState = 'swinging';
    swingPhase = 0;
    safePlay(audio, 'click');
  }

  function pushTelemetry() {
    updateTelemetry([
      { label: 'Cradle Balls Pulled', value: `${ballsPulled}`, color: '#38bdf8' },
      { label: 'Pull Angle', value: `${pullAngle}`, unit: '°', color: '#0ea5e9' },
      { label: 'Momentum Conserved', value: '100', unit: '%', color: '#22c55e' },
      { label: 'Wave Frequency', value: waveFreq.toFixed(1), unit: 'Hz', color: '#a855f7' },
      { label: 'Wave Amplitude', value: waveAmp.toFixed(1), unit: 'cm', color: '#f59e0b' },
      { label: 'Duck Net Horizontal Transport', value: '0.0', unit: 'cm (Anchored)', color: '#22c55e' },
      { label: 'Duck Vertical Oscillation', value: `±${(waveAmp * 0.8).toFixed(1)}`, unit: 'cm', color: '#38bdf8' }
    ]);
  }

  pushTelemetry();

  return {
    interactables: [tankMesh, post1],
    controls: [
      {
        id: 'ballsPulled',
        type: 'select',
        label: "Newton's Cradle: Balls Pulled",
        value: String(ballsPulled),
        options: [
          { value: '1', label: '1 Ball Pulled (Ejects 1 Ball)' },
          { value: '2', label: '2 Balls Pulled (Ejects 2 Balls)' },
          { value: '3', label: '3 Balls Pulled (Ejects 3 Balls)' }
        ]
      },
      {
        id: 'pullAngle',
        type: 'slider',
        label: 'Striker Pull Angle',
        min: 15,
        max: 60,
        step: 5,
        value: pullAngle,
        unit: '°'
      },
      {
        id: 'releaseCradle',
        type: 'button',
        label: "Release Newton's Cradle",
        icon: '⚡'
      },
      {
        id: 'waveFreq',
        type: 'slider',
        label: 'Wave Generator Frequency',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        value: waveFreq,
        unit: 'Hz'
      },
      {
        id: 'waveAmp',
        type: 'slider',
        label: 'Wave Amplitude (Energy)',
        min: 1,
        max: 8,
        step: 0.5,
        value: waveAmp,
        unit: 'cm'
      }
    ],

    onControlChange(id, value) {
      if (id === 'ballsPulled') {
        ballsPulled = Number(value);
        pushTelemetry();
      } else if (id === 'pullAngle') {
        pullAngle = Number(value);
        pushTelemetry();
      } else if (id === 'releaseCradle') {
        triggerCradle();
      } else if (id === 'waveFreq') {
        waveFreq = Number(value);
        pushTelemetry();
      } else if (id === 'waveAmp') {
        waveAmp = Number(value);
        pushTelemetry();
      }
    },

    onObjectClick() {
      triggerCradle();
    },

    onObjectDrag() {},

    onStageChange(stage) {
      if (stage === 'explore') {
        ballsPulled = 1;
        waveFreq = 1.0;
      } else if (stage === 'explain') {
        ballsPulled = 2;
        waveFreq = 2.0;
      } else if (stage === 'elaborate') {
        ballsPulled = 3;
        waveFreq = 2.8;
      }
      triggerCradle();
      pushTelemetry();
    },

    runElaborateChallenge() {
      // TEKS 4.8A STEM Challenge: Energy transfer in waves and collisions
      return {
        passed: true,
        score: 100,
        feedback: `Phenomenal demonstration! You proved that pulling ${ballsPulled} balls transmits momentum through the chain to pop out exactly ${ballsPulled} balls on the other side, and the wave tank visually confirmed that waves transfer ENERGY across water without moving the duck laterally!`
      };
    },

    update(dt, elapsed) {
      // --- Animate Newton's Cradle ---
      if (cradleState === 'swinging') {
        swingPhase += dt * 5.0;
        const maxRad = (pullAngle * Math.PI) / 180;
        const currentAngle = Math.sin(swingPhase) * maxRad;

        // Sound trigger upon collision at center
        if (Math.abs(currentAngle) < 0.08 && Math.cos(swingPhase) > 0) {
          safePlay(audio, 'click');
        }

        // Apply motion: Left balls swing if angle < 0, Right balls swing if angle > 0
        balls.forEach((b, idx) => {
          if (idx < ballsPulled && currentAngle < 0) {
            b.rotation.z = currentAngle;
            b.userData.keRing.material.opacity = Math.abs(currentAngle) / maxRad;
          } else if (idx >= ballCount - ballsPulled && currentAngle > 0) {
            b.rotation.z = currentAngle;
            b.userData.keRing.material.opacity = Math.abs(currentAngle) / maxRad;
          } else {
            b.rotation.z = 0;
            b.userData.keRing.material.opacity = 0;
          }
        });
      }

      // --- Animate 3D Ripple Wave Tank ---
      const omega = waveFreq * Math.PI * 2;
      const k = 2.5; // spatial frequency

      waveNodes.forEach((node) => {
        // Wave travels from left (x = -2.2) to right (x = 2.2)
        const phase = node.userData.distFromGen * k - elapsed * omega;
        const ampMeters = (waveAmp / 100) * 0.8;
        const waveY = 0.7 + Math.sin(phase) * ampMeters;
        node.position.y = waveY;
      });

      // Yellow Duck Buoy only bobs up and down vertically at X=0, Z=0!
      const duckWaveY = 0.7 + Math.sin(2.2 * k - elapsed * omega) * ((waveAmp / 100) * 0.8);
      duckGroup.position.y = duckWaveY;
      duckGroup.rotation.z = Math.cos(2.2 * k - elapsed * omega) * 0.1; // Gentle rocking
    }
  };
}

// ============================================================================
// MODULE 5: m2_3 (TEKS 4.8B, 4.8C Circuits, Conductors & Insulators)
// ============================================================================
export function m2_3(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // --- Breadboard Wooden Base ---
  const boardGeo = new THREE.BoxGeometry(13.5, 0.4, 7.5);
  const boardMat = new THREE.MeshStandardMaterial({
    map: textures?.wood ? textures.wood('#451a03') : null,
    roughness: 0.75
  });
  const breadboard = new THREE.Mesh(boardGeo, boardMat);
  breadboard.position.set(0, -0.2, 0);
  group.add(breadboard);

  // --------------------------------------------------------------------------
  // Circuit Components Mounted on Breadboard:
  // 1. D-Cell Battery (1.5V / 9V)
  // 2. Hinged Knife Switch
  // 3. Incandescent Glass Light Bulb (PointLight + Halo)
  // 4. Nichrome Thermal Coil Heater
  // 5. Material Test Gap
  // 6. 40 Animated Flowing Electron Spheres
  // --------------------------------------------------------------------------

  // 1. D-Cell Cylindrical Battery (X = -4.2, Z = 0)
  const batteryGroup = new THREE.Group();
  batteryGroup.position.set(-4.2, 0.1, 0);
  group.add(batteryGroup);

  const battCasing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 1.8, 24),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.7 })
  );
  battCasing.rotateZ(Math.PI / 2);
  const battNipple = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 })
  );
  battNipple.rotateZ(Math.PI / 2);
  battNipple.position.set(1.0, 0, 0);
  batteryGroup.add(battCasing, battNipple);

  const batteryLabel = createLabel(textures, 'Battery (1.5V)', {
    subtext: 'Direct Current (DC) Power Source',
    border: '#f59e0b',
    scale: 1.0
  });
  batteryLabel.position.set(-4.2, 1.8, 0);
  group.add(batteryLabel);

  // 2. Hinged Knife Switch (X = -1.5, Z = -2.0)
  const switchGroup = new THREE.Group();
  switchGroup.position.set(-1.5, 0.1, -2.0);
  group.add(switchGroup);

  const switchBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.15, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
  );
  switchGroup.add(switchBase);

  // Switch Pivot Arm with insulated red handle
  const armGroup = new THREE.Group();
  armGroup.position.set(-0.6, 0.12, 0);
  switchGroup.add(armGroup);

  const armBlade = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.08, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 })
  );
  armBlade.position.set(0.6, 0, 0);
  const armHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xef4444 })
  );
  armHandle.position.set(1.15, 0.15, 0);
  armGroup.add(armBlade, armHandle);

  // 3. Incandescent Glass Light Bulb (X = 2.0, Z = -2.0)
  const bulbGroup = new THREE.Group();
  bulbGroup.position.set(2.0, 0.1, -2.0);
  group.add(bulbGroup);

  const bulbBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.4, 0.4, 24),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85 })
  );
  bulbGroup.add(bulbBase);

  // Clear Glass Globe
  const bulbGlass = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 24, 24),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      transmission: 0.85
    })
  );
  bulbGlass.position.set(0, 0.8, 0);
  bulbGroup.add(bulbGlass);

  // Internal Tungsten Filament
  const filament = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8),
    new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x000000,
      emissiveIntensity: 0.0
    })
  );
  filament.position.set(0, 0.75, 0);
  bulbGroup.add(filament);

  // Radiating PointLight inside bulb
  const bulbLight = new THREE.PointLight(0xfef08a, 0, 9);
  bulbLight.position.set(2.0, 0.85, -2.0);
  group.add(bulbLight);

  // Halo Sprite around bulb
  const haloMat = new THREE.SpriteMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending
  });
  const haloSprite = new THREE.Sprite(haloMat);
  haloSprite.scale.set(2.2, 2.2, 1);
  haloSprite.position.set(0, 0.85, 0);
  bulbGroup.add(haloSprite);

  // 4. Nichrome Thermal Coil Heater (X = 4.2, Z = 0)
  const heaterGroup = new THREE.Group();
  heaterGroup.position.set(4.2, 0.1, 0);
  group.add(heaterGroup);

  const heaterBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.15, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x475569 })
  );
  heaterGroup.add(heaterBase);

  // Helical Coil Mesh (Torus or coiled rings)
  const coilMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    emissive: 0x000000,
    emissiveIntensity: 0.0,
    metalness: 0.8,
    roughness: 0.3
  });
  const coilRingGeo = new THREE.TorusGeometry(0.25, 0.05, 12, 24);
  const coilRings = [];
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(coilRingGeo, coilMat);
    ring.position.set(0, 0.45, -0.4 + i * 0.2);
    heaterGroup.add(ring);
    coilRings.push(ring);
  }

  // 5. Material Test Gap (X = 0, Z = 2.0)
  const gapGroup = new THREE.Group();
  gapGroup.position.set(0, 0.1, 2.0);
  group.add(gapGroup);

  // Alligator Clips at gap terminals
  const clipMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85 });
  const clipLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), clipMat);
  clipLeft.position.set(-0.9, 0.1, 0);
  const clipRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), clipMat);
  clipRight.position.set(0.9, 0.1, 0);
  gapGroup.add(clipLeft, clipRight);

  // Test Rod currently resting in gap
  const testRodGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.7, 16);
  testRodGeo.rotateZ(Math.PI / 2);
  const testRodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9, roughness: 0.2 });
  const testRod = new THREE.Mesh(testRodGeo, testRodMat);
  testRod.position.set(0, 0.18, 0);
  gapGroup.add(testRod);

  const gapLabel = createLabel(textures, 'Material Test Gap', {
    subtext: 'Insert rod to test Electrical Conductivity',
    border: '#38bdf8',
    scale: 1.0
  });
  gapLabel.position.set(0, 1.8, 2.0);
  group.add(gapLabel);

  // 6. Circuit Wires & 40 Flowing Electron Spheres
  // Closed loop spline connecting battery -> switch -> bulb -> heater -> gap -> battery
  const wirePoints = [
    new THREE.Vector3(-4.2, 0.15, 0),
    new THREE.Vector3(-4.2, 0.15, -2.0),
    new THREE.Vector3(-1.5, 0.15, -2.0),
    new THREE.Vector3(2.0, 0.15, -2.0),
    new THREE.Vector3(4.2, 0.15, -2.0),
    new THREE.Vector3(4.2, 0.15, 0),
    new THREE.Vector3(4.2, 0.15, 2.0),
    new THREE.Vector3(0.9, 0.15, 2.0),
    new THREE.Vector3(-0.9, 0.15, 2.0),
    new THREE.Vector3(-4.2, 0.15, 2.0),
    new THREE.Vector3(-4.2, 0.15, 0)
  ];
  const wireCurve = new THREE.CatmullRomCurve3(wirePoints, true);
  const wireTube = new THREE.Mesh(
    new THREE.TubeGeometry(wireCurve, 64, 0.04, 8, true),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7 })
  );
  group.add(wireTube);

  const electronCount = 40;
  const electrons = [];
  const electronGeo = new THREE.SphereGeometry(0.065, 8, 8);
  const electronMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xfde047,
    emissiveIntensity: 0.9
  });
  for (let i = 0; i < electronCount; i++) {
    const el = new THREE.Mesh(electronGeo, electronMat);
    group.add(el);
    electrons.push({ mesh: el, offset: i / electronCount });
  }

  // 7 Material Samples to test
  const MATERIALS = {
    copper: { name: 'Copper Rod', conducts: true, color: 0xc2410c, metalness: 0.95, roughness: 0.2 },
    aluminum: { name: 'Aluminum Strip', conducts: true, color: 0xe2e8f0, metalness: 0.85, roughness: 0.25 },
    silver: { name: 'Silver Wire', conducts: true, color: 0xf8fafc, metalness: 0.98, roughness: 0.1 },
    rubber: { name: 'Rubber Eraser', conducts: false, color: 0xf43f5e, metalness: 0.0, roughness: 0.9 },
    glass: { name: 'Glass Rod', conducts: false, color: 0xbae6fd, metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.5 },
    plastic: { name: 'Plastic Ruler', conducts: false, color: 0x0ea5e9, metalness: 0.0, roughness: 0.4 },
    wood: { name: 'Dry Oak Block', conducts: false, color: 0xb45309, metalness: 0.0, roughness: 0.85 }
  };

  // State
  let switchClosed = true;
  let selectedMaterial = 'copper';
  let voltage = 1.5; // 1.5V or 9V
  let electronSpeed = 0.2;

  function evaluateCircuit() {
    const mat = MATERIALS[selectedMaterial];
    const isConducting = switchClosed && mat.conducts;

    // Switch arm rotation: closed = 0 rad, open = 35 deg up
    armGroup.rotation.z = switchClosed ? 0 : -0.6;

    // Update test rod visual in gap
    testRodMat.color.setHex(mat.color);
    testRodMat.metalness = mat.metalness;
    testRodMat.roughness = mat.roughness;
    testRodMat.transparent = Boolean(mat.transparent);
    testRodMat.opacity = mat.opacity !== undefined ? mat.opacity : 1.0;

    if (isConducting) {
      const vScale = voltage === 9.0 ? 2.5 : 1.0;
      electronSpeed = 0.3 * vScale;

      // Light bulb turns ON
      filament.material.emissive.setHex(0xfef08a);
      filament.material.emissiveIntensity = 0.8 * vScale;
      bulbLight.intensity = 1.5 * vScale;
      haloMat.opacity = 0.65;

      // Heater coil heats up
      const glowHex = voltage === 9.0 ? 0xff4500 : 0xea580c;
      coilMat.emissive.setHex(glowHex);
      coilMat.emissiveIntensity = 0.8 * vScale;

      safePlay(audio, 'spark');
    } else {
      // Circuit OPEN
      electronSpeed = 0;
      filament.material.emissiveIntensity = 0;
      bulbLight.intensity = 0;
      haloMat.opacity = 0;
      coilMat.emissiveIntensity = 0;
    }

    const currentAmps = isConducting ? (voltage / 2.0).toFixed(2) : '0.00';
    updateTelemetry([
      { label: 'Switch State', value: switchClosed ? 'CLOSED (Loop Intact)' : 'OPEN (Circuit Broken)', color: switchClosed ? '#22c55e' : '#ef4444' },
      { label: 'Test Material', value: mat.name, color: '#38bdf8' },
      { label: 'Classification', value: mat.conducts ? 'Electrical Conductor' : 'Electrical Insulator', color: mat.conducts ? '#22c55e' : '#ef4444' },
      { label: 'Voltage', value: `${voltage}`, unit: 'V', color: '#f59e0b' },
      { label: 'Current Flow', value: currentAmps, unit: 'A', color: isConducting ? '#4ade80' : '#64748b' },
      { label: 'Bulb Status', value: isConducting ? 'LIT (Glowing)' : 'DARK (No Current)', color: isConducting ? '#facc15' : '#64748b' },
      { label: 'Heater Coil', value: isConducting ? 'HEATING (Thermal Glow)' : 'COLD (Ambient)', color: isConducting ? '#ef4444' : '#64748b' }
    ]);
  }

  evaluateCircuit();

  return {
    interactables: [switchBase, bulbGlass, testRod],
    controls: [
      {
        id: 'material',
        type: 'select',
        label: 'Material Placed in Test Gap',
        value: selectedMaterial,
        options: [
          { value: 'copper', label: '1. Copper Rod (Conductor)' },
          { value: 'aluminum', label: '2. Aluminum Strip (Conductor)' },
          { value: 'silver', label: '3. Silver Wire (Conductor)' },
          { value: 'rubber', label: '4. Rubber Eraser (Insulator)' },
          { value: 'glass', label: '5. Glass Rod (Insulator)' },
          { value: 'plastic', label: '6. Plastic Ruler (Insulator)' },
          { value: 'wood', label: '7. Dry Oak Wood (Insulator)' }
        ]
      },
      {
        id: 'switch',
        type: 'toggle',
        label: 'Knife Switch Closed',
        value: switchClosed
      },
      {
        id: 'voltage',
        type: 'select',
        label: 'Battery Power Voltage',
        value: String(voltage),
        options: [
          { value: '1.5', label: '1.5V D-Cell (Standard Brightness)' },
          { value: '9', label: '9.0V High Voltage (Brilliant Glow)' }
        ]
      }
    ],

    onControlChange(id, value) {
      if (id === 'material') {
        selectedMaterial = value;
        safePlay(audio, 'click');
        evaluateCircuit();
      } else if (id === 'switch') {
        switchClosed = Boolean(value);
        safePlay(audio, switchClosed ? 'click' : 'whoosh');
        evaluateCircuit();
      } else if (id === 'voltage') {
        voltage = Number(value);
        batteryLabel.updateText(`Battery (${voltage}V)`, 'Direct Current (DC) Power Source', '#f59e0b');
        evaluateCircuit();
      }
    },

    onObjectClick(mesh) {
      // Toggle switch if clicked near switch
      if (mesh === switchBase) {
        switchClosed = !switchClosed;
        evaluateCircuit();
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      if (stage === 'explore') {
        selectedMaterial = 'copper';
        switchClosed = true;
      } else if (stage === 'explain') {
        selectedMaterial = 'rubber';
        switchClosed = true;
      } else if (stage === 'elaborate') {
        selectedMaterial = 'aluminum';
        voltage = 9.0;
        switchClosed = true;
      }
      evaluateCircuit();
    },

    runElaborateChallenge() {
      // TEKS 4.8B & 4.8C STEM Challenge
      const mat = MATERIALS[selectedMaterial];
      const circuitComplete = switchClosed && mat.conducts;
      return {
        passed: circuitComplete,
        score: circuitComplete ? 100 : 60,
        feedback: circuitComplete
          ? `Outstanding! ${mat.name} is an electrical conductor that completes the closed loop path, enabling electrons to flow and light the bulb!`
          : `Circuit is broken! ${mat.name} is an electrical insulator (or switch is open). Electrons cannot cross the gap without a conductive pathway!`
      };
    },

    update(dt) {
      // Animate flowing electron spheres along wire curve
      if (electronSpeed > 0) {
        electrons.forEach((el) => {
          el.offset = (el.offset + dt * electronSpeed * 0.3) % 1.0;
          const pos = wireCurve.getPointAt(el.offset);
          el.mesh.position.copy(pos);
          el.mesh.visible = true;
        });
      } else {
        electrons.forEach((el) => (el.mesh.visible = false));
      }
    }
  };
}

// ============================================================================
// Exported Modules Registry
// ============================================================================
export const MODULES_U1_U2 = {
  m1_1,
  m1_2,
  m2_1,
  m2_2,
  m2_3
};
