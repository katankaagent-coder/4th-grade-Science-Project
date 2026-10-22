// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L09', num: 9, unit: 3, unitTitle: 'Earth & Space',
  title: 'Break It, Move It, Drop It',
  testTitle: 'Weathering, Erosion & Deposition',
  teks: ['4.10B'],
  icon: '🏜️', color: '#d97706',
  bigQuestion: 'How did a river carve a canyon a mile deep?',
  ladder: [
    'Rock seems strong, but water, wind, and ice can slowly break it into small pieces.',
    'Breaking rock into smaller pieces is weathering.',
    'Carrying those pieces away is erosion.',
    'Dropping the pieces in a new place is deposition.',
    'These changes are slow. Tiny changes, over a very long time, make huge shapes.',
  ],
  stub: true,
  brief: {
    phenomenon: 'Kelenna sees photos of the Grand Canyon and of Big Bend\'s Santa Elena Canyon in Texas. A river did that? And at the coast, the Brazos River builds new land where it meets the Gulf.',
    predictions: [
      'Water freezes in a crack in a rock. What happens to the crack? -> it gets wider; ice takes up more room (ice weathering).',
      'Fast water vs slow water: which carries bigger rocks? -> fast water.',
      'When a river slows down at the ocean, what happens to the sand it carries? -> it drops it (deposition), building a delta.',
      'Wind blowing over a sandy beach for years: what shapes does it make? -> sand dunes.',
    ],
    scene: 'A time-lapse sandbox: a block of layered rock (colored strata) with a river channel. A "years" slider (0 to 1 million years) deepens the canyon by morphing the terrain mesh, while sediment particles flow downstream and pile up as a fan-shaped delta at the river mouth (Gulf water plane). A "water speed" slider controls how big the carried pieces are. Side station: a rock with a crack; tap Freeze/Thaw repeatedly to see the crack widen and a chunk fall off. Another station: wind arrows over a beach build a dune mesh.',
    tasks: [
      'Freeze and thaw the crack until the rock breaks (event rockBroke).',
      'Slide the years forward and carve the canyon (event canyonCarved).',
      'Watch the river drop sand and build the delta (event deltaBuilt).',
    ],
    vocab: ['Weathering', 'Erosion', 'Deposition', 'Sediment', 'Delta', 'Canyon'],
    misconceptions: [
      'Weathering and erosion are the same. (Weathering breaks; erosion moves.)',
      'These changes happen fast. (Most are slow; a flood can move a lot quickly, but canyons take a very long time.)',
      'Only water changes land. (Wind and ice do too.)',
    ],
    useIt: 'Why do beaches on Galveston Island need new sand pumped in? (waves erode the beach). Why do farmers plant grass on slopes? (roots hold soil).',
    staarStyles: 'Identify W/E/D from a picture description; sequence a canyon forming; match agent (water, wind, ice) to landform.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
