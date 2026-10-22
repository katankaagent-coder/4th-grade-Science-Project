// Placeholder scene. Replaced by the full scene for L07.
export default function createScene(kit) {
  const root = new kit.THREE.Group();
  const sign = kit.label('Coming soon', { size: 0.6 });
  sign.position.set(0, 1.5, 0);
  root.add(sign);
  return { root, shots: { wide: { pos: [0, 3, 8], look: [0, 1, 0] } }, points: {}, cues: {}, update() {} };
}

