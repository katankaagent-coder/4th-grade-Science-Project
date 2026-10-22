// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L06', num: 6, unit: 3, unitTitle: 'Earth & Space',
  title: 'Why Summer Is Hot',
  testTitle: 'Seasons, Daylight & Temperature Patterns',
  teks: ['4.9A'],
  icon: '🌍', color: '#f59e0b',
  bigQuestion: 'Why is it hot in July and cooler in January in Dickinson?',
  ladder: [
    'Earth spins once a day. That spin makes day and night.',
    'Earth also travels around the Sun once a year.',
    'Earth is tilted, and the tilt always points the same way in space.',
    'In summer, our half leans toward the Sun: high Sun, long days.',
    'High sunlight is packed tight, so it heats more. Low sunlight spreads out.',
    'So seasons come from the tilt, not from being closer to the Sun.',
  ],
  stub: true,
  brief: {
    phenomenon: 'At recess in June, Kelenna\'s shadow is tiny at lunchtime. In December it is long. And summer days stay light past 8 pm. Is Earth closer to the Sun in summer?',
    predictions: [
      'Is Earth closer to the Sun in summer? -> no; it is actually a bit closer in early January. Tilt is the reason.',
      'Shine a flashlight straight down vs slanted on grid paper: which spot is brighter and smaller? -> straight down.',
      'Shadow stick at noon in June vs December: which shadow is longer? -> December.',
      'June in Dickinson: are days longer or shorter than nights? -> longer (about 14 hours of daylight).',
    ],
    scene: 'A solar system stage: a glowing Sun in the middle, Earth (with a Texas pin) on a visible orbit path, tilted axis rod (23.5 degrees) that keeps pointing the same way. A month slider moves Earth around the orbit. Inset station: flashlight over grid paper with a tilt slider showing the light spot spreading. Another station: a shadow stick on the Dunbar field whose noon shadow length changes with the month slider. A daylight-hours bar (readout) for Dickinson: about 14 h in June, about 10 h in December.',
    tasks: [
      'Move the month slider to June, then December (event seasonsVisited).',
      'Tilt the flashlight and watch the spot spread (event lightTilted).',
      'Find the month with the shortest noon shadow (event shortestShadow).',
    ],
    vocab: ['Rotation', 'Revolution', 'Axis', 'Tilt', 'Season', 'Daylight'],
    misconceptions: [
      'Summer is hot because Earth is closer to the Sun. (No - the tilt.)',
      'The Sun moves around Earth. (Earth spins, so the Sun only looks like it moves.)',
      'The tilt flips during the year. (No - it always points the same way.)',
    ],
    useIt: 'Plan a backyard garden: which months have the most daylight? Why does Australia have summer at Christmas?',
    staarStyles: 'Include data tables (month, noon shadow length, daylight hours) and pattern prediction questions.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
