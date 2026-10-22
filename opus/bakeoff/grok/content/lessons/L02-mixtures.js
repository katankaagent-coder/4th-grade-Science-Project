// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L02', num: 2, unit: 1, unitTitle: 'Matter',
  title: 'Mix It, Split It',
  testTitle: 'Mixtures, Solutions & Conservation of Matter',
  teks: ['4.6B', '4.6C'],
  icon: '🧂', color: '#38bdf8',
  bigQuestion: 'When salt disappears in water, where does it go?',
  ladder: [
    'A mixture is two or more kinds of stuff put together.',
    'In most mixtures, each kind of stuff keeps its own properties.',
    'So we can split a mixture using those properties: size, magnets, floating.',
    'In a solution, one thing spreads out so evenly you cannot see it.',
    'The stuff is still there. Its tiny pieces are just spread out.',
    'Mixing never makes stuff vanish. The total mass stays the same.',
  ],
  stub: true,
  brief: {
    phenomenon: 'Kelenna stirs salt into a glass of water at a Galveston beach picnic. The salt seems to vanish. Did it?',
    predictions: [
      'Trail mix: if we pour it through a screen, what stays on top? -> the big pieces (raisins, nuts); small seeds fall through.',
      'Salt water: will the scale read MORE, LESS, or the SAME after the salt dissolves? -> the same.',
      'If we let the salt water sit in the sun for days, what is left in the dish? -> salt crystals.',
      'Oil and water: will they mix into one even liquid? -> no, oil floats on top in a layer.',
    ],
    scene: 'A mixing station: glass beaker on a digital scale (big readout), a jar of trail mix (raisins, nuts, seeds) with a screen sieve, a magnet wand over a sand + iron-filings dish, a salt shaker. "Look inside" slider zooms the beaker water into particles: salt particles (white) spread between water particles (blue). Evaporation cue: water particles drift up and leave a crust of salt crystals.',
    tasks: [
      'Drag the sieve under the trail mix and shake: big pieces stay, small fall through (event sieved).',
      'Sweep the magnet over the sand: iron bits jump up (event magnetSorted).',
      'Pour salt into water and stir; watch the scale stay the same (event dissolved).',
    ],
    vocab: ['Mixture', 'Solution', 'Dissolve', 'Evaporate', 'Conservation of matter (stuff never vanishes)'],
    misconceptions: [
      'Dissolved salt is gone. (No - it is spread into tiny pieces you cannot see.)',
      'A solution weighs less because the solid disappeared. (No - mass stays the same.)',
      'All mixtures are solutions. (No - trail mix and oil-and-water are mixtures, not solutions.)',
      'Liquids always mix. (Oil and water do not.)',
    ],
    useIt: 'Hurricane cleanup: muddy floodwater is a mixture. How would you get clean-ish water and the sand back? (settle, screen, filter).',
    staarStyles: 'Include liquid-in-liquid (food coloring in water, oil and water) and solid-in-liquid (sugar, salt, sand in water) examples, and a before/after mass table question.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
