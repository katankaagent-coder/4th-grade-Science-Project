// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L04', num: 4, unit: 2, unitTitle: 'Force & Energy',
  title: 'Energy on the Move',
  testTitle: 'Energy Transfer: Motion, Waves & Sound',
  teks: ['4.8A'],
  icon: '🌊', color: '#00f0ff',
  bigQuestion: 'How can a wave travel across Galveston Bay without carrying the water with it?',
  ladder: [
    'Energy is what makes things move, light up, heat up, or make sound.',
    'A moving thing has energy. Faster means more energy.',
    'When moving things bump, energy jumps from one to the other.',
    'A wave carries energy, but the water mostly bobs in place.',
    'Sound is a wave too. It shakes the air from your drum to your ear.',
  ],
  stub: true,
  brief: {
    phenomenon: 'On a fishing pier in Kemah, a boat goes by. Waves reach the pier, and a rubber duck floating nearby bobs up and down but does not ride to shore.',
    predictions: [
      'A rolling marble hits a resting marble. What happens? -> the first one stops (or slows), the second rolls on: energy moved.',
      'Roll the marble faster: will the hit marble go farther? -> yes, more energy.',
      'A wave passes the duck. Will the duck ride the wave to the shore? -> no, it bobs up and down in place.',
      'Tap a drum with rice on top. What will the rice do? -> jump; the drum shakes, that shaking (sound) travels to your ear.',
    ],
    scene: 'Three stations. (1) Marble track: a ramp with a height slider sends a steel marble into a row of marbles (Newton-cradle style) - energy glow passes along the row. (2) Wave tank: a wide strip of water made of a grid mesh with animated sine wave; a rubber duck that bobs in place; a "wave maker" paddle with a strength slider; a glowing energy pulse travels along. (3) Drum: tap it, rice grains jump, rings of sound spread through air dots to an ear.',
    tasks: [
      'Raise the ramp and release the marble (event marbleHit).',
      'Make a wave and watch the duck (event waveMade).',
      'Tap the drum (event drumTapped).',
    ],
    vocab: ['Energy', 'Transfer', 'Wave', 'Sound', 'Vibrate (shake back and forth)'],
    misconceptions: [
      'Waves carry the water to the shore. (No - the energy moves; the water mostly bobs.)',
      'Energy is used up in a collision. (Say: it moves to the other object, and some becomes sound and heat.)',
      'Sound can travel through empty space. (No - it needs stuff like air, water, or solids to shake.)',
    ],
    useIt: 'Why does a big storm far out in the Gulf make big waves on Galveston beach days later? (energy travels through the water).',
    staarStyles: 'Include a table: ramp height vs distance the hit marble rolled; and identify where energy goes after a collision.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
