// Unit 4: Organisms & Environments (Texas 4th Grade Science TEKS 4.12 & 4.13)
// Master 3D Life Science Simulators for Dunbar Middle School / Dickinson ISD
// Aligned with revised 2024-2026 Texas TEKS & 5E Instructional Model

export const MODULES_U4 = {
  m4_1,
  m4_2
};

/**
 * MODULE 4.1: Plant Matter Cycling, Food Webs & Environmental Changes
 * TEKS 4.12A: Energy flow from Sun -> Producers -> Consumers -> Decomposers
 * TEKS 4.12B: Trophic cycling & 10% energy transfer in Texas Coastal Prairie
 * TEKS 4.12C: Ecosystem response to Drought, Flood, Invasive Species, & Prairie Fire
 * Includes 1,000x Cellular Stomata & Vascular Cross-Section Zoom
 */
function m4_1(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  // Root Sub-Groups for Dual-Mode architecture
  const prairieGroup = new THREE.Group();
  const stomataGroup = new THREE.Group();
  stomataGroup.visible = false;
  group.add(prairieGroup);
  group.add(stomataGroup);

  const interactables = [];

  // Module State
  const state = {
    viewMode: 'prairie', // 'prairie' | 'stomata'
    event: 'normal',     // 'normal' | 'drought' | 'flood' | 'invasive_species' | 'prairie_fire'
    rainfall: 100,       // 0% to 200%
    trophicFilter: 'all',// 'all' | 'producers' | 'herbivores' | 'carnivores' | 'decomposers'
    stomataOpen: true,
    lightIntensity: 100, // 0 to 100%
    activeStage: 'explore'
  };

  // =========================================================================
  // MODE A: TEXAS COASTAL PRAIRIE & GALVESTON BAY FOOD WEB DIORAMA
  // =========================================================================

  // 1. Terrain & Galveston Bay Water Basin
  const dioramaBaseGeo = new THREE.CylinderGeometry(8.5, 9.2, 1.6, 36);
  const dioramaBaseMat = new THREE.MeshStandardMaterial({
    map: textures.rockStrata(),
    roughness: 0.85,
    metalness: 0.1
  });
  const dioramaBase = new THREE.Mesh(dioramaBaseGeo, dioramaBaseMat);
  dioramaBase.position.y = -0.8;
  dioramaBase.receiveShadow = true;
  prairieGroup.add(dioramaBase);

  // Top Turf Layer
  const turfGeo = new THREE.CylinderGeometry(8.48, 8.48, 0.12, 36);
  const turfMat = new THREE.MeshStandardMaterial({
    map: textures.turf(),
    roughness: 0.9,
    metalness: 0.05
  });
  const turfMesh = new THREE.Mesh(turfGeo, turfMat);
  turfMesh.position.y = 0.06;
  turfMesh.receiveShadow = true;
  prairieGroup.add(turfMesh);

  // Dickinson Bayou / Galveston Bay Estuary Cut
  const bayouGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.16, 24, 1, false, 0, Math.PI * 0.95);
  const bayouMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.08,
    metalness: 0.35,
    transparent: true,
    opacity: 0.78
  });
  const bayouWater = new THREE.Mesh(bayouGeo, bayouMat);
  bayouWater.rotation.y = -Math.PI * 0.45;
  bayouWater.position.set(3.8, 0.1, 2.5);
  prairieGroup.add(bayouWater);

  // Diorama Title & TEKS Label
  const habitatBadge = textures.labelSprite('Galveston Bay Prairie', {
    subtext: 'TEKS 4.12 Trophic Energy Web',
    border: '#22c55e',
    scale: 1.5
  });
  habitatBadge.position.set(0, 5.8, -7.5);
  prairieGroup.add(habitatBadge);

  // 2. Radiant Sun & Solar Radiation Beams
  const sunGroup = new THREE.Group();
  sunGroup.position.set(7.2, 8.2, -4.5);
  prairieGroup.add(sunGroup);

  const sunCoreGeo = new THREE.SphereGeometry(1.35, 24, 24);
  const sunCoreMat = new THREE.MeshBasicMaterial({ color: 0xffea00 });
  const sunCore = new THREE.Mesh(sunCoreGeo, sunCoreMat);
  sunGroup.add(sunCore);

  const sunCoronaGeo = new THREE.SphereGeometry(1.85, 20, 20);
  const sunCoronaMat = new THREE.MeshBasicMaterial({
    color: 0xffa500,
    transparent: true,
    opacity: 0.32,
    wireframe: true
  });
  const sunCorona = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
  sunGroup.add(sunCorona);

  const sunLight = new THREE.PointLight(0xfffaed, 2.2, 38);
  sunGroup.add(sunLight);

  // 3. PRODUCERS (Gulf Cordgrass & Texas Live Oak)
  const producersGroup = new THREE.Group();
  prairieGroup.add(producersGroup);

  // Texas Live Oak (Quercus virginiana)
  const oakGroup = new THREE.Group();
  oakGroup.position.set(-3.6, 0.1, -1.8);
  producersGroup.add(oakGroup);

  const trunkGeo = new THREE.CylinderGeometry(0.52, 0.78, 3.6, 12);
  const trunkMat = new THREE.MeshStandardMaterial({
    map: textures.wood('#451a03'),
    roughness: 0.95
  });
  const oakTrunk = new THREE.Mesh(trunkGeo, trunkMat);
  oakTrunk.position.y = 1.8;
  oakTrunk.castShadow = true;
  oakGroup.add(oakTrunk);

  // Spreading Canopy Clustered Spheres
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.82,
    metalness: 0.05
  });
  const canopyOffsets = [
    [0, 3.6, 0, 1.6],
    [-1.2, 3.2, 0.5, 1.2],
    [1.1, 3.3, -0.4, 1.3],
    [0.3, 4.4, 0.2, 1.4],
    [-0.8, 3.8, -0.7, 1.1]
  ];
  const canopyMeshes = [];
  canopyOffsets.forEach(([x, y, z, r]) => {
    const folGeo = new THREE.SphereGeometry(r, 14, 14);
    const folMesh = new THREE.Mesh(folGeo, leafMat);
    folMesh.position.set(x, y, z);
    folMesh.castShadow = true;
    oakGroup.add(folMesh);
    canopyMeshes.push(folMesh);
  });

  // Spanish Moss Clustered Strands
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x84cc16,
    transparent: true,
    opacity: 0.75,
    roughness: 0.9
  });
  const mossStrands = [];
  for (let m = 0; m < 5; m++) {
    const mossGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.1 + (m % 3) * 0.3, 6);
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.position.set(-1 + m * 0.5, 2.5, -0.4 + (m % 2) * 0.8);
    oakGroup.add(moss);
    mossStrands.push(moss);
  }

  // Gulf Cordgrass (Spartina spartinae)
  const cordgrassGroup = new THREE.Group();
  cordgrassGroup.position.set(-0.8, 0.1, 1.2);
  producersGroup.add(cordgrassGroup);

  const grassBlades = [];
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    roughness: 0.75
  });
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const dist = 0.2 + (i % 5) * 0.32;
    const bladeGeo = new THREE.ConeGeometry(0.06, 1.4 + (i % 3) * 0.35, 5);
    const blade = new THREE.Mesh(bladeGeo, grassMat);
    blade.position.set(Math.cos(angle) * dist, 0.7, Math.sin(angle) * dist);
    blade.rotation.z = (Math.random() - 0.5) * 0.35;
    blade.rotation.x = (Math.random() - 0.5) * 0.35;
    cordgrassGroup.add(blade);
    grassBlades.push(blade);
  }

  // Invasive Chinese Tallow (Sapium sebiferum) - initially hidden/scaled down
  const tallowGroup = new THREE.Group();
  tallowGroup.position.set(1.5, 0.1, -2.6);
  tallowGroup.scale.set(0.001, 0.001, 0.001);
  prairieGroup.add(tallowGroup);

  const tallowTrunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.35, 2.8, 8),
    new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.9 })
  );
  tallowTrunk.position.y = 1.4;
  tallowGroup.add(tallowTrunk);

  const tallowCanopyMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
  const tallowFol = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.4, 10), tallowCanopyMat);
  tallowFol.position.y = 2.8;
  tallowGroup.add(tallowFol);

  // 4. PRIMARY CONSUMERS (Marsh Grasshopper & Cottontail Rabbit)
  const primaryConsumersGroup = new THREE.Group();
  prairieGroup.add(primaryConsumersGroup);

  // Marsh Grasshopper (Melanoplus) perched on cordgrass
  const grasshopperGroup = new THREE.Group();
  grasshopperGroup.position.set(-0.6, 1.3, 1.4);
  grasshopperGroup.scale.set(0.45, 0.45, 0.45);
  primaryConsumersGroup.add(grasshopperGroup);

  const ghBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.12, 1.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.6 })
  );
  ghBody.rotation.z = Math.PI / 2.8;
  grasshopperGroup.add(ghBody);

  const ghHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x4d7c0f })
  );
  ghHead.position.set(0.65, 0.3, 0);
  grasshopperGroup.add(ghHead);

  // Jumping Hind Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x3f6212 });
  [-0.15, 0.15].forEach((zSide) => {
    const femur = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.8, 6), legMat);
    femur.position.set(-0.25, 0.35, zSide * 1.8);
    femur.rotation.z = -Math.PI / 3.2;
    grasshopperGroup.add(femur);
  });

  // Eastern Cottontail Rabbit (Sylvilagus floridanus)
  const rabbitGroup = new THREE.Group();
  rabbitGroup.position.set(-2.2, 0.1, 2.2);
  rabbitGroup.scale.set(0.7, 0.7, 0.7);
  primaryConsumersGroup.add(rabbitGroup);

  const rabbitFurMat = new THREE.MeshStandardMaterial({ color: 0xa8a29e, roughness: 0.95 });
  const rabbitBody = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), rabbitFurMat);
  rabbitBody.scale.set(1.1, 0.8, 1.4);
  rabbitBody.position.y = 0.48;
  rabbitGroup.add(rabbitBody);

  const rabbitHead = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 10), rabbitFurMat);
  rabbitHead.position.set(0, 0.8, 0.62);
  rabbitGroup.add(rabbitHead);

  // Ears
  const earMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8 });
  [-0.14, 0.14].forEach((xSide) => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, 0.65, 6), rabbitFurMat);
    ear.position.set(xSide, 1.25, 0.55);
    ear.rotation.x = -0.25;
    rabbitGroup.add(ear);
  });

  // Fluffy Tail
  const rabbitTail = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc })
  );
  rabbitTail.position.set(0, 0.55, -0.75);
  rabbitGroup.add(rabbitTail);

  // 5. SECONDARY & TERTIARY CONSUMERS
  const predatorsGroup = new THREE.Group();
  prairieGroup.add(predatorsGroup);

  // Gulf Coast Toad (Incilius valliceps) at water edge
  const toadGroup = new THREE.Group();
  toadGroup.position.set(1.8, 0.18, 1.5);
  toadGroup.scale.set(0.65, 0.65, 0.65);
  predatorsGroup.add(toadGroup);

  const toadMat = new THREE.MeshStandardMaterial({ color: 0x4d5b24, roughness: 0.92 });
  const toadBody = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), toadMat);
  toadBody.scale.set(1.3, 0.65, 1.1);
  toadBody.position.y = 0.28;
  toadGroup.add(toadBody);

  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2 });
  [-0.24, 0.24].forEach((xOff) => {
    const toadEye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), eyeMat);
    toadEye.position.set(xOff, 0.52, 0.35);
    toadGroup.add(toadEye);
  });

  // Roseate Spoonbill (Platalea ajaja) wading in bayou
  const spoonbillGroup = new THREE.Group();
  spoonbillGroup.position.set(4.2, 0.12, 2.2);
  spoonbillGroup.scale.set(0.72, 0.72, 0.72);
  predatorsGroup.add(spoonbillGroup);

  const spoonbillMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.65 });
  const spoonbillBody = new THREE.Mesh(new THREE.SphereGeometry(0.52, 10, 10), spoonbillMat);
  spoonbillBody.scale.set(0.8, 0.9, 1.4);
  spoonbillBody.position.y = 2.1;
  spoonbillGroup.add(spoonbillBody);

  // S-Curve Neck & Head
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.14, 1.1, 8),
    spoonbillMat
  );
  neck.position.set(0, 2.7, 0.65);
  neck.rotation.x = -0.35;
  spoonbillGroup.add(neck);

  const birdHead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), spoonbillMat);
  birdHead.position.set(0, 3.2, 0.9);
  spoonbillGroup.add(birdHead);

  // Specialized Flat Spoonbill Spatulate Beak
  const spoonBeak = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.08, 1.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 })
  );
  spoonBeak.scale.set(1.4, 0.25, 1.0);
  spoonBeak.position.set(0, 3.05, 1.45);
  spoonBeak.rotation.x = Math.PI / 2.3;
  spoonbillGroup.add(spoonBeak);

  // Long Wading Legs
  const waderLegMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  [-0.2, 0.2].forEach((xSide) => {
    const waderLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.1, 6), waderLegMat);
    waderLeg.position.set(xSide, 1.05, 0);
    spoonbillGroup.add(waderLeg);
  });

  // Red-Tailed Hawk (Buteo jamaicensis) - Apex Predator perched high on oak branch
  const hawkGroup = new THREE.Group();
  hawkGroup.position.set(-3.6, 3.8, -0.6);
  hawkGroup.scale.set(0.68, 0.68, 0.68);
  predatorsGroup.add(hawkGroup);

  const hawkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
  const hawkChestMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.85 });
  const hawkTailMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 }); // Red tail

  const hawkBody = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 10), hawkMat);
  hawkBody.scale.set(0.9, 1.3, 0.85);
  hawkGroup.add(hawkBody);

  const hawkChest = new THREE.Mesh(new THREE.SphereGeometry(0.38, 8, 8), hawkChestMat);
  hawkChest.position.set(0, 0.1, 0.28);
  hawkGroup.add(hawkChest);

  const hawkHead = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), hawkMat);
  hawkHead.position.set(0, 0.72, 0.15);
  hawkGroup.add(hawkHead);

  // Hooked Raptor Beak
  const hawkBeak = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.35, 6),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
  );
  hawkBeak.position.set(0, 0.68, 0.42);
  hawkBeak.rotation.x = Math.PI / 1.7;
  hawkGroup.add(hawkBeak);

  // Red Fan Tail Feathers
  const hawkTail = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.12, 0.75, 6), hawkTailMat);
  hawkTail.scale.set(1.4, 0.2, 1.0);
  hawkTail.position.set(0, -0.72, -0.42);
  hawkTail.rotation.x = -0.55;
  hawkGroup.add(hawkTail);

  // 6. DECOMPOSERS (Shelf Fungi, Mushrooms & Soil Microbes)
  const decomposersGroup = new THREE.Group();
  prairieGroup.add(decomposersGroup);

  // Fallen Nurse Log
  const fallenLog = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.4, 3.2, 10),
    new THREE.MeshStandardMaterial({ map: textures.wood('#3e1f0e'), roughness: 0.95 })
  );
  fallenLog.rotation.z = Math.PI / 2.2;
  fallenLog.rotation.y = 0.65;
  fallenLog.position.set(-1.8, 0.32, -4.2);
  decomposersGroup.add(fallenLog);

  // Shelf Fungi on Nurse Log
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.8 });
  for (let s = 0; s < 4; s++) {
    const shelf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35 - s * 0.05, 0.38 - s * 0.05, 0.06, 12, 1, false, 0, Math.PI),
      shelfMat
    );
    shelf.position.set(-2.2 + s * 0.45, 0.38 + (s % 2) * 0.2, -4.2 + s * 0.2);
    shelf.rotation.x = Math.PI * 0.5;
    decomposersGroup.add(shelf);
  }

  // Clustered Soil Mushrooms
  const mushroomCapMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
  const mushroomStemMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9 });
  for (let sh = 0; sh < 6; sh++) {
    const mStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.45, 6), mushroomStemMat);
    const mCap = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.16, 8), mushroomCapMat);
    mCap.position.y = 0.24;
    const mGroup = new THREE.Group();
    mGroup.position.set(-2.8 + (sh % 3) * 0.32, 0.15, -3.6 + Math.floor(sh / 3) * 0.4);
    mGroup.add(mStalk);
    mGroup.add(mCap);
    decomposersGroup.add(mGroup);
  }

  // 7. ANIMATED 3D ENERGY FLOW PATHWAYS & PARTICLES
  // Energy Transfer Splines (Sun -> Producers -> Consumers -> Decomposers)
  const energyFlowCurves = [
    // Sun -> Live Oak
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(7.2, 8.2, -4.5),
      new THREE.Vector3(2.5, 6.5, -3.2),
      new THREE.Vector3(-3.6, 4.2, -1.8)
    ]),
    // Sun -> Cordgrass
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(7.2, 8.2, -4.5),
      new THREE.Vector3(3.2, 4.5, -1.5),
      new THREE.Vector3(-0.8, 1.2, 1.2)
    ]),
    // Cordgrass -> Grasshopper
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0.8, 1.2),
      new THREE.Vector3(-0.7, 1.1, 1.3),
      new THREE.Vector3(-0.6, 1.3, 1.4)
    ]),
    // Grasshopper -> Gulf Coast Toad
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 1.3, 1.4),
      new THREE.Vector3(0.5, 1.1, 1.6),
      new THREE.Vector3(1.8, 0.35, 1.5)
    ]),
    // Cordgrass -> Rabbit
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0.5, 1.2),
      new THREE.Vector3(-1.4, 0.6, 1.8),
      new THREE.Vector3(-2.2, 0.45, 2.2)
    ]),
    // Rabbit -> Red-Tailed Hawk
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, 0.5, 2.2),
      new THREE.Vector3(-2.8, 2.2, 0.8),
      new THREE.Vector3(-3.6, 3.8, -0.6)
    ]),
    // Toad -> Roseate Spoonbill
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.8, 0.35, 1.5),
      new THREE.Vector3(3.0, 1.4, 1.8),
      new THREE.Vector3(4.2, 2.2, 2.2)
    ]),
    // Organic Waste (All levels) -> Decomposers
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.6, 2.0, -1.8),
      new THREE.Vector3(-2.8, 1.1, -3.2),
      new THREE.Vector3(-1.8, 0.35, -4.2)
    ]),
    // Decomposer Nutrients -> Oak & Cordgrass Roots
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.2, -4.2),
      new THREE.Vector3(-1.2, 0.1, -1.8),
      new THREE.Vector3(-0.8, 0.2, 1.2)
    ])
  ];

  // Visual Tube Geometry for Trophic Flow Lines
  const flowTubesGroup = new THREE.Group();
  prairieGroup.add(flowTubesGroup);

  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.28,
    wireframe: true
  });
  energyFlowCurves.forEach((curve) => {
    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 6, false);
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    flowTubesGroup.add(tube);
  });

  // Glowing Energy Particle Spheres
  const particleGroup = new THREE.Group();
  prairieGroup.add(particleGroup);

  const energyColors = [0xfacc15, 0xfacc15, 0x22c55e, 0xf97316, 0x84cc16, 0xdc2626, 0xec4899, 0xa855f7, 0x06b6d4];
  const energyParticles = [];

  for (let p = 0; p < 45; p++) {
    const pathIdx = p % energyFlowCurves.length;
    const pGeo = new THREE.SphereGeometry(0.11, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({
      color: energyColors[pathIdx],
      transparent: true,
      opacity: 0.95
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    particleGroup.add(pMesh);
    energyParticles.push({
      mesh: pMesh,
      curve: energyFlowCurves[pathIdx],
      progress: (p / 45) + Math.random() * 0.1,
      speed: 0.18 + (p % 3) * 0.05
    });
  }

  // =========================================================================
  // MODE B: 1,000x LEAF STOMATA & VASCULAR CROSS-SECTION ZOOM
  // =========================================================================

  // Microscopic Bench Base
  const microBaseGeo = new THREE.BoxGeometry(11, 0.6, 8.5);
  const microBaseMat = new THREE.MeshStandardMaterial({
    map: textures.labGrid(),
    roughness: 0.4
  });
  const microBase = new THREE.Mesh(microBaseGeo, microBaseMat);
  microBase.position.y = -2.6;
  stomataGroup.add(microBase);

  const stomataBadge = textures.labelSprite('1,000x Leaf Stomata & Vein', {
    subtext: 'TEKS 4.12A: H2O + CO2 -> Glucose + O2',
    border: '#38bdf8',
    scale: 1.5
  });
  stomataBadge.position.set(0, 5.2, -4.5);
  stomataGroup.add(stomataBadge);

  // Upper Cuticle (Waxy Translucent Barrier)
  const cuticleMat = new THREE.MeshStandardMaterial({
    color: 0xa7f3d0,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1
  });
  const upperCuticle = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.18, 6.8), cuticleMat);
  upperCuticle.position.set(0, 3.4, 0);
  stomataGroup.add(upperCuticle);

  // Upper Epidermis Pavement Cells
  const pavementMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.7 });
  for (let c = 0; c < 8; c++) {
    const pave = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.4, 6.6), pavementMat);
    pave.position.set(-4.1 + c * 1.18, 3.1, 0);
    stomataGroup.add(pave);
  }

  // Palisade Mesophyll Layer (Columnar Cells packed with Chloroplasts)
  const palisadeMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.85 });
  const chloroplastMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const palisadeCells = [];

  for (let px = 0; px < 7; px++) {
    for (let pz = 0; pz < 4; pz++) {
      const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 2.2, 10), palisadeMat);
      cell.position.set(-3.6 + px * 1.2, 1.7, -2.1 + pz * 1.4);
      stomataGroup.add(cell);
      palisadeCells.push(cell);

      // Embedded Chloroplast Organelles inside cell
      for (let ch = 0; ch < 3; ch++) {
        const chloro = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), chloroplastMat);
        chloro.position.set(
          cell.position.x + (ch === 0 ? 0.22 : ch === 1 ? -0.2 : 0),
          cell.position.y - 0.7 + ch * 0.7,
          cell.position.z + (ch === 2 ? 0.22 : -0.15)
        );
        stomataGroup.add(chloro);
      }
    }
  }

  // Vascular Bundle (Leaf Vein Cutaway: Xylem & Phloem)
  const veinGroup = new THREE.Group();
  veinGroup.position.set(-0.2, 0.5, 0);
  stomataGroup.add(veinGroup);

  // Xylem Vessel (Carries Blue H2O up from roots)
  const xylemMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.7,
    roughness: 0.2
  });
  const xylemVessel = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 6.4, 16), xylemMat);
  xylemVessel.rotation.x = Math.PI / 2;
  xylemVessel.position.set(-0.75, 0, 0);
  veinGroup.add(xylemVessel);

  // Phloem Vessel (Carries Golden Glucose sugars to roots/fruits)
  const phloemMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    transparent: true,
    opacity: 0.7,
    roughness: 0.2
  });
  const phloemVessel = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 6.4, 16), phloemMat);
  phloemVessel.rotation.x = Math.PI / 2;
  phloemVessel.position.set(0.75, 0, 0);
  veinGroup.add(phloemVessel);

  // Lower Epidermis & Articulated Guard Cells forming the Stoma
  const guardCellMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.6 });
  const leftGuard = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.28, 12, 18, Math.PI * 0.95), guardCellMat);
  leftGuard.rotation.z = Math.PI / 2;
  leftGuard.position.set(-0.35, -1.8, 1.8);
  stomataGroup.add(leftGuard);

  const rightGuard = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.28, 12, 18, Math.PI * 0.95), guardCellMat);
  rightGuard.rotation.z = -Math.PI / 2;
  rightGuard.position.set(0.35, -1.8, 1.8);
  stomataGroup.add(rightGuard);

  // Microscopic Molecules (Water, CO2, O2, Glucose)
  const microParticles = [];

  // Blue H2O spheres (Xylem -> Cells)
  for (let w = 0; w < 16; w++) {
    const h2o = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    stomataGroup.add(h2o);
    microParticles.push({
      mesh: h2o,
      type: 'h2o',
      origin: new THREE.Vector3(-0.95, -2.5, -3 + (w / 16) * 6),
      speed: 0.8 + Math.random() * 0.4
    });
  }

  // Purple CO2 spheres (Air -> Stomata -> Chloroplasts)
  for (let c = 0; c < 14; c++) {
    const co2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xc084fc })
    );
    stomataGroup.add(co2);
    microParticles.push({
      mesh: co2,
      type: 'co2',
      origin: new THREE.Vector3((Math.random() - 0.5) * 1.5, -3.2, 1.8 + (Math.random() - 0.5) * 0.6),
      speed: 0.6 + Math.random() * 0.3
    });
  }

  // Bright Green O2 spheres (Chloroplasts -> Exit Stomata)
  for (let o = 0; o < 14; o++) {
    const o2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    stomataGroup.add(o2);
    microParticles.push({
      mesh: o2,
      type: 'o2',
      origin: new THREE.Vector3(-2.8 + Math.random() * 5.6, 1.8, -1.5 + Math.random() * 3),
      speed: 0.7 + Math.random() * 0.4
    });
  }

  // Golden Glucose spheres (Mesophyll -> Phloem)
  for (let g = 0; g < 12; g++) {
    const glu = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    stomataGroup.add(glu);
    microParticles.push({
      mesh: glu,
      type: 'glucose',
      origin: new THREE.Vector3(0.55, 1.6, -2.5 + (g / 12) * 5),
      speed: 0.5 + Math.random() * 0.3
    });
  }

  // Interactables
  interactables.push(sunCore, oakTrunk, cordgrassGroup, toadBody, spoonbillBody, hawkBody, leftGuard, rightGuard);

  // =========================================================================
  // DYNAMIC ECOSYSTEM & TELEMETRY UPDATES
  // =========================================================================

  function applyEnvironmentalChanges() {
    // 1. Tallow Tree Scale (Invasive Species)
    if (state.event === 'invasive_species') {
      tallowGroup.scale.set(1.1, 1.1, 1.1);
      // Invasive tallow chokes out native cordgrass
      cordgrassGroup.scale.set(0.4, 0.4, 0.4);
      grasshopperGroup.scale.set(0.2, 0.2, 0.2);
    } else {
      tallowGroup.scale.set(0.001, 0.001, 0.001);
      cordgrassGroup.scale.set(1, 1, 1);
      grasshopperGroup.scale.set(0.45, 0.45, 0.45);
    }

    // 2. Rainfall & Event Colors on Foliage & Water
    if (state.event === 'drought' || state.rainfall < 40) {
      turfMat.color.setHex(0xa16207); // Parched brown
      grassMat.color.setHex(0xb45309);
      leafMat.color.setHex(0x78716c);
      bayouWater.scale.set(0.85, 0.4, 0.85); // Receded water
      sunLight.intensity = 3.2; // Blazing hot sun
      state.stomataOpen = false; // Plants close stomata to conserve water!
    } else if (state.event === 'flood' || state.rainfall > 160) {
      turfMat.color.setHex(0x15803d);
      grassMat.color.setHex(0x16a34a);
      leafMat.color.setHex(0x14532d);
      bayouWater.scale.set(1.4, 2.2, 1.4); // Bayou water swells onto prairie
      sunLight.intensity = 1.4;
      rabbitGroup.position.y = 0.5; // Rabbit seeks higher ground
    } else if (state.event === 'prairie_fire') {
      turfMat.color.setHex(0x27272a); // Charred ash
      grassMat.color.setHex(0x18181b);
      leafMat.color.setHex(0x713f12);
      sunLight.intensity = 2.0;
    } else {
      // Normal balanced state
      turfMat.color.setHex(0x15803d);
      grassMat.color.setHex(0x22c55e);
      leafMat.color.setHex(0x15803d);
      bayouWater.scale.set(1, 1, 1);
      sunLight.intensity = 2.2;
      rabbitGroup.position.y = 0.1;
      state.stomataOpen = true;
    }

    // Guard Cells Opening/Closing Animation
    if (state.stomataOpen) {
      leftGuard.position.x = -0.55;
      rightGuard.position.x = 0.55;
    } else {
      leftGuard.position.x = -0.22;
      rightGuard.position.x = 0.22;
    }
  }

  function pushTelemetry() {
    if (state.viewMode === 'prairie') {
      // Calculate ecological metrics based on state
      const rainVal = state.rainfall;
      const healthIndex = state.event === 'normal' && rainVal >= 80 && rainVal <= 120 ? 98 :
                          state.event === 'drought' ? 38 :
                          state.event === 'flood' ? 52 :
                          state.event === 'prairie_fire' ? 24 : 45;

      const producerBiomass = Math.round(850 * (rainVal / 100) * (state.event === 'invasive_species' ? 0.35 : 1.0));
      const primaryEnergy = Math.round(producerBiomass * 0.1);
      const secondaryEnergy = Math.round(primaryEnergy * 0.1);
      const apexEnergy = Math.round(secondaryEnergy * 0.1);

      updateTelemetry([
        { label: 'Ecosystem Condition', value: state.event.toUpperCase().replace('_', ' '), unit: '' },
        { label: 'Annual Rainfall', value: `${rainVal}%`, unit: 'of avg' },
        { label: 'Producer Biomass', value: producerBiomass, unit: 'g/m²' },
        { label: '1° Consumer Energy', value: primaryEnergy, unit: 'kcal (10%)' },
        { label: 'Apex Raptor Energy', value: apexEnergy, unit: 'kcal (0.1%)' },
        { label: 'Trophic Health Score', value: `${healthIndex}%`, unit: 'stable' }
      ]);
    } else {
      // Microscopic Stomata Telemetry
      const isOpen = state.stomataOpen;
      const co2Rate = isOpen ? (18.4 * (state.lightIntensity / 100)).toFixed(1) : '0.0';
      const h2oRate = isOpen ? (4.6 * (state.lightIntensity / 100)).toFixed(1) : '0.2';
      const glucoseYield = isOpen ? Math.round(92 * (state.lightIntensity / 100)) : 0;

      updateTelemetry([
        { label: 'Stomatal Aperture', value: isOpen ? 'OPEN' : 'CLOSED', unit: 'guard cells' },
        { label: 'Transpiration (H2O)', value: h2oRate, unit: 'mmol/m²·s' },
        { label: 'CO2 Intake', value: co2Rate, unit: 'µmol/m²·s' },
        { label: 'Sunlight Intensity', value: `${state.lightIntensity}%`, unit: 'PAR' },
        { label: 'Photosynthetic Sugar', value: `${glucoseYield}%`, unit: 'optimal' }
      ]);
    }
  }

  // Initial trigger
  applyEnvironmentalChanges();
  pushTelemetry();

  return {
    interactables,
    controls: [
      {
        id: 'viewMode',
        type: 'select',
        label: 'Observation Mode',
        value: state.viewMode,
        options: [
          { value: 'prairie', label: 'Texas Coastal Prairie (Macro Ecosystem)' },
          { value: 'stomata', label: '1,000x Leaf Stomata & Vein (Microscopic Zoom)' }
        ]
      },
      {
        id: 'event',
        type: 'select',
        label: 'Environmental Event (TEKS 4.12C)',
        value: state.event,
        options: [
          { value: 'normal', label: 'Normal Balanced Prairie & Bayou' },
          { value: 'drought', label: 'Severe Drought (Water Stress)' },
          { value: 'flood', label: 'Galveston Bay Estuary Flood' },
          { value: 'invasive_species', label: 'Invasive Chinese Tallow Tree Spread' },
          { value: 'prairie_fire', label: 'Coastal Prairie Wildfire' }
        ]
      },
      {
        id: 'rainfall',
        type: 'slider',
        label: 'Annual Rainfall (% of normal)',
        min: 10,
        max: 200,
        step: 5,
        value: state.rainfall,
        unit: '%'
      },
      {
        id: 'stomataOpen',
        type: 'toggle',
        label: 'Stomata Guard Cells (Open/Closed)',
        value: state.stomataOpen
      },
      {
        id: 'lightIntensity',
        type: 'slider',
        label: 'Solar Radiance (Photosynthesis)',
        min: 0,
        max: 100,
        step: 5,
        value: state.lightIntensity,
        unit: '%'
      }
    ],

    onControlChange(id, value) {
      if (id === 'viewMode') {
        state.viewMode = value;
        prairieGroup.visible = (value === 'prairie');
        stomataGroup.visible = (value === 'stomata');
        audio.playSfx('whoosh');
      } else if (id === 'event') {
        state.event = value;
        if (value === 'drought') state.rainfall = 25;
        if (value === 'flood') state.rainfall = 180;
        if (value === 'normal') state.rainfall = 100;
        audio.playSfx(value === 'flood' ? 'splash' : value === 'prairie_fire' ? 'spark' : 'click');
      } else if (id === 'rainfall') {
        state.rainfall = Number(value);
        audio.playSfx('bubble');
      } else if (id === 'stomataOpen') {
        state.stomataOpen = Boolean(value);
        audio.playSfx('click');
      } else if (id === 'lightIntensity') {
        state.lightIntensity = Number(value);
      }
      applyEnvironmentalChanges();
      pushTelemetry();
    },

    onObjectClick(mesh) {
      audio.playSfx('click');
      if (mesh === sunCore) {
        habitatBadge.updateText('Radiant Solar Energy', 'Source of 100% of Earth ecosystem energy', '#facc15');
      } else if (mesh === oakTrunk || mesh === cordgrassGroup) {
        habitatBadge.updateText('Primary Producers (Autotrophs)', 'Make glucose using sunlight, H2O, and CO2', '#22c55e');
      } else if (mesh === toadBody || mesh === spoonbillBody) {
        habitatBadge.updateText('Secondary Consumers', 'Depend on other animals for energy and matter', '#ec4899');
      } else if (mesh === hawkBody) {
        habitatBadge.updateText('Apex Predator: Red-Tailed Hawk', 'Top of Galveston Bay prairie food web', '#ef4444');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.activeStage = stage;
      if (stage === 'elaborate') {
        // Prepare elaborate challenge state
        state.viewMode = 'prairie';
        prairieGroup.visible = true;
        stomataGroup.visible = false;
        state.event = 'drought';
        state.rainfall = 30;
        applyEnvironmentalChanges();
        pushTelemetry();
        audio.playSfx('whoosh');
      }
    },

    runElaborateChallenge() {
      // Dickinson Bayou Restoration Mission
      // Student must eliminate disturbance (set event to 'normal') and balance rainfall (80-120%)
      const isBalanced = (state.event === 'normal' && state.rainfall >= 80 && state.rainfall <= 120);
      if (isBalanced) {
        audio.playSfx('success');
        return {
          passed: true,
          feedback: 'Outstanding Galveston Bay stewardship! By restoring normal rainfall and removing invasive species, Gulf Cordgrass biomass rebounded to 850 g/m², stabilizing the 10% trophic energy transfer to grasshoppers, toads, spoonbills, and the red-tailed hawk!',
          score: 100
        };
      } else {
        audio.playSfx('thud');
        return {
          passed: false,
          feedback: `Ecosystem remains stressed under [${state.event.toUpperCase()}] with ${state.rainfall}% rainfall! Set the Environmental Event to 'Normal Balanced' and adjust Rainfall between 80% and 120% to stabilize the prairie food web.`,
          score: 40
        };
      }
    },

    update(dt, elapsed) {
      // 1. Sun Corona Pulsation
      sunCorona.rotation.y += dt * 0.35;
      sunCorona.rotation.z += dt * 0.2;
      const pulse = 1.0 + Math.sin(elapsed * 2.5) * 0.05;
      sunCorona.scale.set(pulse, pulse, pulse);

      // 2. Breeze animation on cordgrass and moss
      const breeze = Math.sin(elapsed * 2.2) * 0.08;
      cordgrassGroup.children.forEach((blade, idx) => {
        blade.rotation.z = Math.sin(elapsed * 2.0 + idx) * 0.08;
      });
      mossStrands.forEach((moss, idx) => {
        moss.rotation.z = Math.sin(elapsed * 1.5 + idx) * 0.06;
      });

      // 3. Mode A Energy Particles Animation
      if (prairieGroup.visible) {
        const flowRateMultiplier = state.event === 'drought' ? 0.3 :
                                   state.event === 'prairie_fire' ? 0.1 : 1.0;
        energyParticles.forEach((p) => {
          p.progress = (p.progress + dt * p.speed * flowRateMultiplier) % 1.0;
          const pos = p.curve.getPointAt(p.progress);
          p.mesh.position.copy(pos);
        });
      }

      // 4. Mode B Microscopic Molecules Flow
      if (stomataGroup.visible) {
        microParticles.forEach((mp) => {
          if (mp.type === 'h2o') {
            // Rises upward through xylem
            mp.mesh.position.y += dt * mp.speed;
            if (mp.mesh.position.y > 2.8) mp.mesh.position.y = -2.5;
            mp.mesh.position.x = mp.origin.x + Math.sin(elapsed * 3 + mp.mesh.position.y) * 0.1;
            mp.mesh.position.z = mp.origin.z;
          } else if (mp.type === 'co2') {
            // Purple enters stomata if open
            if (state.stomataOpen) {
              mp.mesh.position.y += dt * mp.speed;
              if (mp.mesh.position.y > 2.2) mp.mesh.position.y = -3.2;
            }
          } else if (mp.type === 'o2') {
            // Green O2 drifts downward and exits through stoma
            if (state.stomataOpen) {
              mp.mesh.position.y -= dt * mp.speed;
              if (mp.mesh.position.y < -2.8) mp.mesh.position.y = 2.4;
            }
          } else if (mp.type === 'glucose') {
            // Golden glucose travels down phloem
            mp.mesh.position.y -= dt * mp.speed;
            if (mp.mesh.position.y < -2.4) mp.mesh.position.y = 1.8;
            mp.mesh.position.x = mp.origin.x;
            mp.mesh.position.z = mp.origin.z;
          }
        });
      }
    }
  };
}

/**
 * MODULE 4.2: Plant/Animal Structures & Inherited vs. Acquired Traits
 * TEKS 4.13A: Internal & external structures that allow organisms to survive (Bird Beaks, Feet, Roots, Leaves)
 * TEKS 4.13B: Differentiate between inherited physical traits vs. acquired traits and learned behaviors
 * Interactive 3-Station Bio-Mechanics & Adaptation Observatory
 */
function m4_2(ctx) {
  const { THREE, group, textures, audio, updateTelemetry } = ctx;

  const station1Group = new THREE.Group(); // Bird Beak & Foot Mechanics
  const station2Group = new THREE.Group(); // Plant Root & Leaf Adaptations
  const station3Group = new THREE.Group(); // Inherited vs Acquired Trait Customizer

  group.add(station1Group);
  group.add(station2Group);
  group.add(station3Group);

  station2Group.visible = false;
  station3Group.visible = false;

  const interactables = [];

  const state = {
    station: 'station1',    // 'station1' | 'station2' | 'station3'
    // Station 1: Bird Bio-Mechanics
    birdSpecimen: 'heron',  // 'heron' | 'cardinal' | 'hawk'
    beakClamp: 0,           // 0 to 1
    foodType: 'fish',       // 'fish' | 'hard_seed' | 'small_mammal'
    testActive: false,
    // Station 2: Plant Survival Structures
    plantSpecimen: 'cactus',// 'cactus' | 'cypress'
    soilMoisture: 20,       // 0% to 100%
    xrayCutaway: true,
    // Station 3: Trait Customizer
    inheritedColor: 'gray_white', // 'gray_white' | 'albino' | 'melanistic'
    inheritedBeak: 'slender_curve',// 'slender_curve' | 'stout'
    inheritedEyes: 'amber',       // 'amber' | 'dark_brown' | 'ruby'
    acquiredScar: false,
    acquiredWindBend: false,
    learnedSong: 'natural_chirp', // 'natural_chirp' | 'car_alarm' | 'hawk_mimic'
    learnedForaging: false,
    activeStage: 'explore'
  };

  // =========================================================================
  // STATION 1: BIRD BEAK & FOOT BIO-MECHANICS OBSERVATORY
  // =========================================================================

  // Observation Table Plinth
  const tableGeo = new THREE.BoxGeometry(10.5, 0.75, 7.5);
  const tableMat = new THREE.MeshStandardMaterial({
    map: textures.wood('#1e293b'),
    roughness: 0.35,
    metalness: 0.25
  });
  const tableMesh = new THREE.Mesh(tableGeo, tableMat);
  tableMesh.position.y = -1.2;
  station1Group.add(tableMesh);

  const station1Badge = textures.labelSprite('Station 1: Bird Beak & Foot Mechanics', {
    subtext: 'TEKS 4.13A: Physical structures for survival',
    border: '#0284c7',
    scale: 1.5
  });
  station1Badge.position.set(0, 5.2, -4.2);
  station1Group.add(station1Badge);

  // 1. SPECIMEN A: Great Blue Heron (Spear Beak & Wading Feet)
  const heronGroup = new THREE.Group();
  heronGroup.position.set(-3.2, 0, 0);
  station1Group.add(heronGroup);

  const heronSkullMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
  const heronBeakMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.25 });

  const heronSkull = new THREE.Mesh(new THREE.SphereGeometry(0.75, 12, 12), heronSkullMat);
  heronSkull.scale.set(0.85, 0.9, 1.3);
  heronSkull.position.y = 1.8;
  heronGroup.add(heronSkull);

  // Articulated Spear Beak Jaws
  const heronUpperJaw = new THREE.Mesh(new THREE.ConeGeometry(0.16, 3.2, 8), heronBeakMat);
  heronUpperJaw.rotation.x = Math.PI / 2;
  heronUpperJaw.position.set(0, 1.85, 2.2);
  heronGroup.add(heronUpperJaw);

  const heronLowerJaw = new THREE.Mesh(new THREE.ConeGeometry(0.15, 3.2, 8), heronBeakMat);
  heronLowerJaw.rotation.x = Math.PI / 2;
  heronLowerJaw.position.set(0, 1.65, 2.2);
  heronGroup.add(heronLowerJaw);

  // Splayed Wading Foot (Spreads weight on mud so bird does not sink)
  const heronLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8),
    new THREE.MeshStandardMaterial({ color: 0x334155 })
  );
  heronLeg.position.set(0, 0, -0.6);
  heronGroup.add(heronLeg);

  const heronToes = [];
  [-0.6, 0, 0.6].forEach((angle, idx) => {
    const toe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.02, 1.3, 6),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    toe.rotation.x = Math.PI / 2;
    toe.rotation.y = angle;
    toe.position.set(Math.sin(angle) * 0.6, -1.18, Math.cos(angle) * 0.6);
    heronGroup.add(toe);
    heronToes.push(toe);
  });

  const heronLabel = textures.labelSprite('Great Blue Heron', {
    subtext: 'Spear Beak & Splayed Wading Foot',
    border: '#0284c7'
  });
  heronLabel.position.set(-3.2, 3.8, 0);
  station1Group.add(heronLabel);

  // 2. SPECIMEN B: Northern Cardinal (Nutcracker Seed-Cracker Beak & Perching Feet)
  const cardinalGroup = new THREE.Group();
  cardinalGroup.position.set(0, 0, 0);
  station1Group.add(cardinalGroup);

  const cardinalSkull = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 })
  );
  cardinalSkull.position.y = 1.8;
  cardinalGroup.add(cardinalSkull);

  // Heavy Conical Jaw Jaws
  const cardinalBeakMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3 });
  const cardinalUpperJaw = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.25, 6), cardinalBeakMat);
  cardinalUpperJaw.rotation.x = Math.PI / 2;
  cardinalUpperJaw.position.set(0, 1.95, 1.15);
  cardinalGroup.add(cardinalUpperJaw);

  const cardinalLowerJaw = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.25, 6), cardinalBeakMat);
  cardinalLowerJaw.rotation.x = Math.PI / 2;
  cardinalLowerJaw.position.set(0, 1.62, 1.15);
  cardinalGroup.add(cardinalLowerJaw);

  // Perching Anisodactyl Clamping Foot on Branch
  const perchBranch = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 3.4, 10),
    new THREE.MeshStandardMaterial({ map: textures.wood('#78350f') })
  );
  perchBranch.rotation.z = Math.PI / 2;
  perchBranch.position.set(0, -0.95, 0);
  cardinalGroup.add(perchBranch);

  const cardinalLabel = textures.labelSprite('Northern Cardinal', {
    subtext: 'Conical Nutcracker & Perching Grip',
    border: '#dc2626'
  });
  cardinalLabel.position.set(0, 3.8, 0);
  station1Group.add(cardinalLabel);

  // 3. SPECIMEN C: Red-Tailed Hawk (Hooked Tearing Beak & Raptor Talons)
  const hawkSpecGroup = new THREE.Group();
  hawkSpecGroup.position.set(3.2, 0, 0);
  station1Group.add(hawkSpecGroup);

  const hawkSkull = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.65 })
  );
  hawkSkull.position.y = 1.8;
  hawkSpecGroup.add(hawkSkull);

  // Sharp Hooked Downward Raptor Beak
  const hawkUpperHook = new THREE.Mesh(
    new THREE.TorusGeometry(0.45, 0.16, 8, 16, Math.PI * 0.65),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 })
  );
  hawkUpperHook.rotation.y = Math.PI / 2;
  hawkUpperHook.rotation.x = Math.PI * 0.15;
  hawkUpperHook.position.set(0, 1.8, 1.1);
  hawkSpecGroup.add(hawkUpperHook);

  const hawkLowerHook = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.6, 6),
    new THREE.MeshStandardMaterial({ color: 0x1e293b })
  );
  hawkLowerHook.rotation.x = Math.PI / 2;
  hawkLowerHook.position.set(0, 1.5, 0.95);
  hawkSpecGroup.add(hawkLowerHook);

  // Curved Raptor Talons (Clutching grip)
  const talonMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 });
  for (let t = 0; t < 3; t++) {
    const claw = new THREE.Mesh(
      new THREE.TorusGeometry(0.25, 0.06, 6, 12, Math.PI * 0.7),
      talonMat
    );
    claw.position.set(-0.35 + t * 0.35, -0.95, 0.2);
    claw.rotation.y = Math.PI / 2;
    hawkSpecGroup.add(claw);
  }

  const hawkLabel = textures.labelSprite('Red-Tailed Hawk', {
    subtext: 'Hooked Tearing Beak & Sharp Talons',
    border: '#ca8a04'
  });
  hawkLabel.position.set(3.2, 3.8, 0);
  station1Group.add(hawkLabel);

  // Target Food Specimens (Fish, Hard Seed, Small Mammal)
  const foodTargetsGroup = new THREE.Group();
  foodTargetsGroup.position.set(0, -0.2, 2.8);
  station1Group.add(foodTargetsGroup);

  const fishMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.32, 1.6, 8),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.1, metalness: 0.8 })
  );
  fishMesh.rotation.z = Math.PI / 2;
  fishMesh.position.set(-3.2, 0, 0);
  foodTargetsGroup.add(fishMesh);

  const seedMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 })
  );
  seedMesh.scale.set(0.8, 1.2, 0.8);
  seedMesh.position.set(0, 0, 0);
  foodTargetsGroup.add(seedMesh);

  const preyMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x71717a, roughness: 0.9 })
  );
  preyMesh.position.set(3.2, 0, 0);
  foodTargetsGroup.add(preyMesh);

  // =========================================================================
  // STATION 2: PLANT ROOT & LEAF SURVIVAL STRUCTURES
  // =========================================================================

  const station2Badge = textures.labelSprite('Station 2: Plant Roots & Leaves', {
    subtext: 'Desert Prickly Pear vs. Galveston Bald Cypress',
    border: '#16a34a',
    scale: 1.5
  });
  station2Badge.position.set(0, 5.2, -4.2);
  station2Group.add(station2Badge);

  // Soil Strata Cross-Section Base
  const plantSoilMat = new THREE.MeshStandardMaterial({
    map: textures.rockStrata(),
    roughness: 0.95
  });
  const plantSoil = new THREE.Mesh(new THREE.BoxGeometry(10.5, 3.2, 6.5), plantSoilMat);
  plantSoil.position.y = -1.6;
  station2Group.add(plantSoil);

  // SPECIMEN 1: Chihuahuan Desert Prickly Pear Cactus (Opuntia engelmannii)
  const cactusGroup = new THREE.Group();
  cactusGroup.position.set(-2.8, 0, 0);
  station2Group.add(cactusGroup);

  // Succulent Water-Storing Cladode Pads
  const cactusMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 });
  const cactusPads = [];
  const padConfigs = [
    [0, 1.1, 0, 1.1, 1.4],
    [-0.85, 2.3, 0.1, 0.9, 1.2],
    [0.75, 2.5, -0.1, 0.85, 1.1],
    [0, 3.5, 0, 0.7, 0.95]
  ];
  padConfigs.forEach(([x, y, z, rx, ry]) => {
    const pad = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), cactusMat);
    pad.scale.set(rx, ry, 0.22);
    pad.position.set(x, y, z);
    cactusGroup.add(pad);
    cactusPads.push(pad);

    // Protective Spines (Modified leaves that reduce water loss)
    const spineMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    for (let sp = 0; sp < 6; sp++) {
      const spine = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.45, 4), spineMat);
      spine.position.set(x + (sp % 2 === 0 ? 0.35 : -0.35), y + (sp % 3) * 0.3 - 0.3, z + 0.18);
      spine.rotation.x = Math.PI / 2;
      cactusGroup.add(spine);
    }
  });

  // Extensive Shallow Fibrous Root Network (Spreads wide just beneath surface)
  const cactusRootsGroup = new THREE.Group();
  cactusGroup.add(cactusRootsGroup);
  const rootMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.9 });

  for (let r = 0; r < 20; r++) {
    const angle = (r / 20) * Math.PI * 2;
    const len = 1.4 + (r % 4) * 0.65;
    const cRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, len, 6), rootMat);
    cRoot.rotation.z = Math.PI / 2.3;
    cRoot.rotation.y = angle;
    cRoot.position.set(Math.cos(angle) * (len * 0.45), -0.22, Math.sin(angle) * (len * 0.45));
    cactusRootsGroup.add(cRoot);
  }

  const cactusLabel = textures.labelSprite('Prickly Pear Cactus', {
    subtext: 'Shallow Fibrous Roots & Water Pads',
    border: '#ca8a04'
  });
  cactusLabel.position.set(-2.8, 4.4, 0);
  station2Group.add(cactusLabel);

  // SPECIMEN 2: Galveston Bay Bald Cypress (Taxodium distichum)
  const cypressGroup = new THREE.Group();
  cypressGroup.position.set(2.8, 0, 0);
  station2Group.add(cypressGroup);

  // Buttressed Fluted Trunk
  const cypressTrunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 1.15, 3.8, 12),
    new THREE.MeshStandardMaterial({ map: textures.wood('#451a03'), roughness: 0.95 })
  );
  cypressTrunk.position.y = 1.9;
  cypressGroup.add(cypressTrunk);

  // Feathery Flat Leaves (Maximize sunlight capture in humid climate)
  const cypressFoliageMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.75 });
  const cypressFoliage = new THREE.Mesh(new THREE.ConeGeometry(2.1, 3.6, 10), cypressFoliageMat);
  cypressFoliage.position.y = 3.6;
  cypressGroup.add(cypressFoliage);

  // Deep Taproot System & Cypress Knees (Pneumatophores for oxygen in waterlogged soil)
  const cypressRootsGroup = new THREE.Group();
  cypressGroup.add(cypressRootsGroup);

  // Deep Taproot (Plunges deep down into mud for wind anchoring)
  const deepTaproot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.1, 2.8, 8),
    rootMat
  );
  deepTaproot.position.y = -1.4;
  cypressRootsGroup.add(deepTaproot);

  // Cypress Knees (Pneumatophores protruding up)
  for (let k = 0; k < 5; k++) {
    const knee = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.65, 8),
      new THREE.MeshStandardMaterial({ map: textures.wood('#3e1f0e') })
    );
    knee.position.set(0.9 + (k % 3) * 0.45, 0.32, -0.6 + k * 0.4);
    cypressRootsGroup.add(knee);
  }

  const cypressLabel = textures.labelSprite('Galveston Bald Cypress', {
    subtext: 'Deep Taproot & Breathing Knees',
    border: '#15803d'
  });
  cypressLabel.position.set(2.8, 4.4, 0);
  station2Group.add(cypressLabel);

  // =========================================================================
  // STATION 3: INHERITED TRAITS VS. LEARNED/ACQUIRED BEHAVIORS
  // =========================================================================

  const station3Badge = textures.labelSprite('Station 3: Trait Customizer', {
    subtext: 'TEKS 4.13B: Inherited (DNA) vs Acquired / Learned',
    border: '#8b5cf6',
    scale: 1.5
  });
  station3Badge.position.set(0, 5.2, -4.2);
  station3Group.add(station3Badge);

  // Organism Display Pedestal (Texas Mockingbird - Northern Mockingbird)
  const displayPedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(3.2, 3.6, 0.8, 24),
    new THREE.MeshStandardMaterial({ map: textures.labGrid(), roughness: 0.3 })
  );
  displayPedestal.position.y = -0.4;
  station3Group.add(displayPedestal);

  const organismGroup = new THREE.Group();
  organismGroup.position.set(0, 0.8, 0);
  station3Group.add(organismGroup);

  // Customizable Feather Color Material
  const traitFeatherMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.75
  });
  const birdTorso = new THREE.Mesh(new THREE.SphereGeometry(0.9, 14, 12), traitFeatherMat);
  birdTorso.scale.set(0.95, 1.4, 0.95);
  organismGroup.add(birdTorso);

  const birdHead3 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), traitFeatherMat);
  birdHead3.position.set(0, 1.25, 0.45);
  organismGroup.add(birdHead3);

  // Customizable Eye Color
  const traitEyeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2 });
  [-0.32, 0.32].forEach((xSide) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), traitEyeMat);
    eye.position.set(xSide, 1.35, 0.82);
    organismGroup.add(eye);
  });

  // Customizable Beak Shape
  const traitBeakMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
  const traitBeak = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.1, 8), traitBeakMat);
  traitBeak.rotation.x = Math.PI / 2;
  traitBeak.position.set(0, 1.2, 1.25);
  organismGroup.add(traitBeak);

  // Wings (Left wing holds toggleable ACQUIRED PREDATOR SCAR)
  const leftWing = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 10), traitFeatherMat);
  leftWing.scale.set(0.25, 1.2, 0.85);
  leftWing.position.set(-0.85, 0.2, 0);
  organismGroup.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 10), traitFeatherMat);
  rightWing.scale.set(0.25, 1.2, 0.85);
  rightWing.position.set(0.85, 0.2, 0);
  organismGroup.add(rightWing);

  // Acquired Physical Trait: Healed Predator Escape Scar
  const scarMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const wingScarMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.18), scarMat);
  wingScarMesh.position.set(-0.95, 0.3, 0.15);
  wingScarMesh.rotation.z = 0.35;
  wingScarMesh.visible = false;
  organismGroup.add(wingScarMesh);

  // Floating 3D Trait Classification Badges
  const badgeInherited = textures.labelSprite('Inherited: Feather DNA', {
    subtext: 'Passed genetically from parents',
    border: '#22c55e',
    scale: 1.2
  });
  badgeInherited.position.set(-2.4, 2.2, 0);
  station3Group.add(badgeInherited);

  const badgeAcquired = textures.labelSprite('Acquired: Wing Scar', {
    subtext: 'Environmental injury (NOT in DNA)',
    border: '#ef4444',
    scale: 1.2
  });
  badgeAcquired.position.set(2.4, 2.2, 0);
  station3Group.add(badgeAcquired);

  interactables.push(heronSkull, cardinalSkull, hawkSkull, cactusPads[0], cypressTrunk, birdTorso);

  // =========================================================================
  // DYNAMIC TRAIT & TELEMETRY UPDATES
  // =========================================================================

  function updateStationVisibility() {
    station1Group.visible = (state.station === 'station1');
    station2Group.visible = (state.station === 'station2');
    station3Group.visible = (state.station === 'station3');
  }

  function applyTraitCustomizations() {
    // Station 3 Trait Updates
    // 1. Inherited Feather Color
    if (state.inheritedColor === 'albino') {
      traitFeatherMat.color.setHex(0xffffff);
    } else if (state.inheritedColor === 'melanistic') {
      traitFeatherMat.color.setHex(0x18181b);
    } else {
      traitFeatherMat.color.setHex(0x94a3b8); // Natural gray mockingbird
    }

    // 2. Inherited Eye Color
    if (state.inheritedEyes === 'dark_brown') {
      traitEyeMat.color.setHex(0x451a03);
    } else if (state.inheritedEyes === 'ruby') {
      traitEyeMat.color.setHex(0xb91c1c);
    } else {
      traitEyeMat.color.setHex(0xf59e0b); // Natural amber
    }

    // 3. Inherited Beak Structure
    if (state.inheritedBeak === 'stout') {
      traitBeak.scale.set(1.6, 0.8, 1.6);
    } else {
      traitBeak.scale.set(1.0, 1.0, 1.0);
    }

    // 4. Acquired Scar (Environmental)
    wingScarMesh.visible = state.acquiredScar;

    // 5. Acquired Wind-Bent Posture
    if (state.acquiredWindBend) {
      organismGroup.rotation.z = -0.22;
      organismGroup.rotation.x = 0.15;
    } else {
      organismGroup.rotation.z = 0;
      organismGroup.rotation.x = 0;
    }

    // Station 2 Moisture effects
    if (state.station === 'station2') {
      if (state.soilMoisture > 60) {
        // High wetland moisture: Cypress thrives, cactus at risk of rot
        cypressFoliageMat.color.setHex(0x16a34a);
        cactusMat.color.setHex(0x65a30d);
      } else if (state.soilMoisture < 30) {
        // Low desert moisture: Cactus thrives, cypress wilts
        cypressFoliageMat.color.setHex(0xca8a04);
        cactusMat.color.setHex(0x15803d);
      }
    }
  }

  function pushTelemetry() {
    if (state.station === 'station1') {
      const bird = state.birdSpecimen;
      const biteForce = bird === 'cardinal' ? '240 N (Crushing)' :
                        bird === 'hawk' ? '180 N (Tearing)' : '45 N (Piercing)';
      const footType = bird === 'cardinal' ? 'Perching Anisodactyl' :
                       bird === 'hawk' ? 'Gripping Sharp Talons' : 'Spreading Wading Webbed';
      const foodMatch = (bird === 'heron' && state.foodType === 'fish') ||
                        (bird === 'cardinal' && state.foodType === 'hard_seed') ||
                        (bird === 'hawk' && state.foodType === 'small_mammal');

      updateTelemetry([
        { label: 'Observed Specimen', value: bird.toUpperCase(), unit: '' },
        { label: 'Bite / Spear Force', value: biteForce, unit: '' },
        { label: 'Foot Architecture', value: footType, unit: '' },
        { label: 'Selected Diet', value: state.foodType.toUpperCase().replace('_', ' '), unit: '' },
        { label: 'Adaptation Efficiency', value: foodMatch ? '100% (MATCH)' : '25% (INCOMPATIBLE)', unit: '' }
      ]);
    } else if (state.station === 'station2') {
      const plant = state.plantSpecimen;
      const rootType = plant === 'cactus' ? 'Shallow Fibrous Net (5 cm)' : 'Deep Taproot + Knees (300 cm)';
      const waterStorage = plant === 'cactus' ? '92% (Succulent Cladode)' : '24% (Cellular)';
      const transRate = plant === 'cactus' ? '0.4 mL/h (Spines)' : '18.5 mL/h (Broad Leaves)';

      updateTelemetry([
        { label: 'Plant Adaptation', value: plant === 'cactus' ? 'PRICKLY PEAR' : 'BALD CYPRESS', unit: '' },
        { label: 'Soil Moisture', value: `${state.soilMoisture}%`, unit: 'saturation' },
        { label: 'Root Architecture', value: rootType, unit: '' },
        { label: 'Internal Water Store', value: waterStorage, unit: '' },
        { label: 'Transpiration Rate', value: transRate, unit: '' }
      ]);
    } else {
      // Station 3 Trait Telemetry
      updateTelemetry([
        { label: 'Organism', value: 'TEXAS MOCKINGBIRD', unit: '' },
        { label: 'Feather Color', value: state.inheritedColor.toUpperCase(), unit: 'INHERITED (DNA)' },
        { label: 'Eye Pigment', value: state.inheritedEyes.toUpperCase(), unit: 'INHERITED (DNA)' },
        { label: 'Wing Predator Scar', value: state.acquiredScar ? 'PRESENT' : 'NONE', unit: 'ACQUIRED (PHYSICAL)' },
        { label: 'Learned Vocalization', value: state.learnedSong.toUpperCase().replace('_', ' '), unit: 'LEARNED (BEHAVIOR)' }
      ]);
    }
  }

  updateStationVisibility();
  applyTraitCustomizations();
  pushTelemetry();

  return {
    interactables,
    controls: [
      {
        id: 'station',
        type: 'select',
        label: 'Adaptation Station',
        value: state.station,
        options: [
          { value: 'station1', label: 'Station 1: Bird Beak & Foot Mechanics' },
          { value: 'station2', label: 'Station 2: Plant Root & Leaf Survival' },
          { value: 'station3', label: 'Station 3: Inherited vs. Learned Traits' }
        ]
      },
      // Station 1 Controls
      {
        id: 'birdSpecimen',
        type: 'select',
        label: 'Bird Adaptation (Station 1)',
        value: state.birdSpecimen,
        options: [
          { value: 'heron', label: 'Great Blue Heron (Bayou Fish Spearing)' },
          { value: 'cardinal', label: 'Northern Cardinal (Seed Cracking)' },
          { value: 'hawk', label: 'Red-Tailed Hawk (Raptor Meat Tearing)' }
        ]
      },
      {
        id: 'foodType',
        type: 'select',
        label: 'Food Target Test (Station 1)',
        value: state.foodType,
        options: [
          { value: 'fish', label: 'Silvery Bayou Fish' },
          { value: 'hard_seed', label: 'Hard Acorn / Sunflower Seed' },
          { value: 'small_mammal', label: 'Prairie Rodent / Small Mammal' }
        ]
      },
      {
        id: 'testBeak',
        type: 'button',
        label: 'Test Beak Clamp Mechanics'
      },
      // Station 2 Controls
      {
        id: 'plantSpecimen',
        type: 'select',
        label: 'Plant Specimen (Station 2)',
        value: state.plantSpecimen,
        options: [
          { value: 'cactus', label: 'Desert Prickly Pear (Fibrous Shallow Roots)' },
          { value: 'cypress', label: 'Galveston Cypress (Deep Taproot + Knees)' }
        ]
      },
      {
        id: 'soilMoisture',
        type: 'slider',
        label: 'Soil Moisture % (Station 2)',
        min: 0,
        max: 100,
        step: 5,
        value: state.soilMoisture,
        unit: '%'
      },
      // Station 3 Controls
      {
        id: 'inheritedColor',
        type: 'select',
        label: 'Feather Color (Inherited Trait)',
        value: state.inheritedColor,
        options: [
          { value: 'gray_white', label: 'Natural Camouflage (Inherited)' },
          { value: 'albino', label: 'Albino Mutation (Inherited)' },
          { value: 'melanistic', label: 'Melanistic Dark (Inherited)' }
        ]
      },
      {
        id: 'acquiredScar',
        type: 'toggle',
        label: 'Predator Wing Scar (Acquired Trait)',
        value: state.acquiredScar
      },
      {
        id: 'acquiredWindBend',
        type: 'toggle',
        label: 'Wind-Bent Posture (Acquired Trait)',
        value: state.acquiredWindBend
      },
      {
        id: 'learnedSong',
        type: 'select',
        label: 'Vocalization (Learned Behavior)',
        value: state.learnedSong,
        options: [
          { value: 'natural_chirp', label: 'Innate Chirp' },
          { value: 'car_alarm', label: 'Learned Car Alarm Mimicry' },
          { value: 'hawk_mimic', label: 'Learned Hawk Call Mimicry' }
        ]
      }
    ],

    onControlChange(id, value) {
      if (id === 'station') {
        state.station = value;
        updateStationVisibility();
        audio.playSfx('whoosh');
      } else if (id === 'birdSpecimen') {
        state.birdSpecimen = value;
        audio.playSfx('click');
      } else if (id === 'foodType') {
        state.foodType = value;
        audio.playSfx('click');
      } else if (id === 'testBeak') {
        state.testActive = true;
        state.beakClamp = 1.0;
        audio.playSfx(state.birdSpecimen === 'cardinal' ? 'thud' : 'whoosh');
      } else if (id === 'plantSpecimen') {
        state.plantSpecimen = value;
        audio.playSfx('click');
      } else if (id === 'soilMoisture') {
        state.soilMoisture = Number(value);
        audio.playSfx('bubble');
      } else if (id === 'inheritedColor') {
        state.inheritedColor = value;
        audio.playSfx('spark');
      } else if (id === 'acquiredScar') {
        state.acquiredScar = Boolean(value);
        audio.playSfx('click');
      } else if (id === 'acquiredWindBend') {
        state.acquiredWindBend = Boolean(value);
        audio.playSfx('wind');
      } else if (id === 'learnedSong') {
        state.learnedSong = value;
        audio.playSfx('chime');
      }
      applyTraitCustomizations();
      pushTelemetry();
    },

    onObjectClick(mesh) {
      audio.playSfx('click');
      if (mesh === heronSkull) {
        station1Badge.updateText('Heron Adaptation', 'Spear beak pierces slippery fish in bayous', '#0284c7');
      } else if (mesh === cardinalSkull) {
        station1Badge.updateText('Cardinal Adaptation', 'Conical nutcracker jaw cracks hard seed shells', '#dc2626');
      } else if (mesh === hawkSkull) {
        station1Badge.updateText('Hawk Adaptation', 'Hooked beak & talons tear meat for energy', '#ca8a04');
      }
    },

    onObjectDrag() {},

    onStageChange(stage) {
      state.activeStage = stage;
      if (stage === 'elaborate') {
        state.station = 'station1';
        state.birdSpecimen = 'cardinal';
        state.foodType = 'fish'; // Start with a deliberate mismatch for student to solve
        updateStationVisibility();
        pushTelemetry();
        audio.playSfx('whoosh');
      }
    },

    runElaborateChallenge() {
      if (state.station === 'station1') {
        // Food matching challenge
        const isMatched = (state.birdSpecimen === 'heron' && state.foodType === 'fish') ||
                          (state.birdSpecimen === 'cardinal' && state.foodType === 'hard_seed') ||
                          (state.birdSpecimen === 'hawk' && state.foodType === 'small_mammal');
        if (isMatched) {
          audio.playSfx('success');
          return {
            passed: true,
            feedback: `Bio-Mechanical Mastery! The ${state.birdSpecimen.toUpperCase()} structure perfectly matches its diet (${state.foodType.replace('_', ' ')}), providing optimal mechanical advantage for survival!`,
            score: 100
          };
        } else {
          audio.playSfx('thud');
          return {
            passed: false,
            feedback: `Physical Incompatibility! The ${state.birdSpecimen.toUpperCase()} is not physically adapted to process ${state.foodType.replace('_', ' ')}. Match each bird with its specialized food source!`,
            score: 45
          };
        }
      } else if (state.station === 'station2') {
        // Plant survival zone
        const isPlantAdapted = (state.plantSpecimen === 'cactus' && state.soilMoisture <= 40) ||
                               (state.plantSpecimen === 'cypress' && state.soilMoisture >= 50);
        if (isPlantAdapted) {
          audio.playSfx('success');
          return {
            passed: true,
            feedback: `Botanical Survival Verified! The ${state.plantSpecimen.toUpperCase()} is utilizing its specialized root and stem structures to thrive in this moisture zone!`,
            score: 100
          };
        } else {
          audio.playSfx('thud');
          return {
            passed: false,
            feedback: `Plant Stress Detected! Desert cactus requires dry soil (<=40%), while wetland cypress requires moist saturated soil (>=50%).`,
            score: 50
          };
        }
      } else {
        // Station 3 Trait distinction
        audio.playSfx('success');
        return {
          passed: true,
          feedback: 'Genetics & Adaptation Mastered! You accurately differentiated inherited physical traits (feather color, beak structure) passed in DNA from acquired traits (scars, wind-bent posture) and learned behaviors (vocal mimicry)!',
          score: 100
        };
      }
    },

    update(dt, elapsed) {
      // 1. Station 1 Beak Clamping Animation
      if (state.beakClamp > 0) {
        state.beakClamp = Math.max(0, state.beakClamp - dt * 3.0);
      }
      const clampOffset = Math.sin(state.beakClamp * Math.PI) * 0.35;
      heronLowerJaw.rotation.x = (Math.PI / 2) + clampOffset * 0.4;
      cardinalLowerJaw.rotation.x = (Math.PI / 2) + clampOffset * 0.6;
      hawkLowerHook.rotation.x = (Math.PI / 2) + clampOffset * 0.5;

      // 2. Station 3 Organism Idle Bobbing
      if (station3Group.visible) {
        organismGroup.position.y = 0.8 + Math.sin(elapsed * 2.4) * 0.04;
      }

      // 3. Station 2 Root moisture hydration glow
      if (station2Group.visible) {
        const hydGlow = (Math.sin(elapsed * 3.0) * 0.5 + 0.5) * (state.soilMoisture / 100);
        cactusRootsGroup.children.forEach((cr, idx) => {
          if (cr.material) {
            cr.material.opacity = 0.6 + hydGlow * 0.4;
          }
        });
      }
    }
  };
}
