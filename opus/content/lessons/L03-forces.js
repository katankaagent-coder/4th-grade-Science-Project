// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L03', num: 3, unit: 2, unitTitle: 'Force & Energy',
  title: 'Push, Pull, and Invisible Hands',
  testTitle: 'Contact & Non-Contact Forces',
  teks: ['4.7A'],
  icon: '🧲', color: '#f43f5e',
  bigQuestion: 'Why does a soccer ball stop rolling, even if nobody touches it?',
  ladder: [
    'Nothing starts, stops, or turns unless something pushes or pulls it.',
    'A push or a pull is called a force.',
    'Some forces need touching, like a kick or rubbing.',
    'Rubbing between surfaces is friction. Rough surfaces rub more.',
    'Some forces work without touching: gravity and magnets.',
    'Gravity always pulls things down toward Earth.',
  ],
  stub: true,
  brief: {
    phenomenon: 'At the Dickinson park, Kelenna kicks a soccer ball across grass. It slows down and stops. On the basketball court it rolls much farther. Why?',
    predictions: [
      'Same push on ice, wood, carpet, sandpaper: where does the box slide farthest? -> ice (least friction).',
      'A magnet held near a paper clip but not touching it: will the clip move? -> yes, magnets pull without touching.',
      'Drop a bowling ball and a tennis ball: does gravity only pull when things fall? -> no, gravity pulls even when things sit still (the floor pushes back).',
      'Will a magnet pull a plastic spoon? -> no; magnets pull some metals like iron and steel.',
    ],
    scene: 'A push-pull sandbox: a toy crate on a long track with 4 swappable surface strips (ice blue, wood, carpet, sandpaper). A "push power" slider and a big Push button. Force arrows: green push arrow, red friction arrow pointing backward, purple gravity arrow down, a small normal arrow up. Distance flag marks how far it slid. Side station: magnet and paper clips that jump across a gap; a plastic spoon that does not.',
    tasks: [
      'Pick a surface and push the crate; try all four surfaces (event allSurfaces).',
      'Drag the magnet close to the clips without touching (event magnetPull).',
      'Tap Drop on a ball and watch the gravity arrow (event dropped).',
    ],
    vocab: ['Force', 'Friction', 'Gravity', 'Magnetism', 'Contact force / non-contact force'],
    misconceptions: [
      'Things stop because they "run out of force". (No - friction pushes against the motion.)',
      'Gravity only acts on falling things. (No - it pulls on everything, all the time.)',
      'Magnets attract all metals. (No - mainly iron, steel, nickel; not aluminum foil or coins usually.)',
      'Heavier things fall faster. (Avoid this topic or state carefully: without air, they fall together.)',
    ],
    useIt: 'Why do we put sand on icy roads? Why do soccer cleats have studs? (more friction).',
    staarStyles: 'Include a data table in words: surface vs distance slid, and "which force" identification from a description.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
