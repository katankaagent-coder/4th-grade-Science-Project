// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L11', num: 11, unit: 4, unitTitle: 'Living Things',
  title: 'Who Eats Who?',
  testTitle: 'Producers, Food Webs & Cycling of Matter',
  teks: ['4.12A', '4.12B', '4.12C'],
  icon: '🦅', color: '#22c55e',
  bigQuestion: 'Where does the energy in your lunch really come from?',
  ladder: [
    'Every living thing needs energy, and almost all of it starts as sunlight.',
    'Plants are producers: they make their own food from sunlight, water, and air.',
    'Animals are consumers: they get energy by eating plants or other animals.',
    'Decomposers, like mushrooms and worms, break down dead things into soil.',
    'All the who-eats-who paths together make a food web.',
    'Change one part of the web, and the other parts change too.',
  ],
  stub: true,
  brief: {
    phenomenon: 'On the Texas coastal prairie near Galveston Bay: grass, a grasshopper, a frog, a snake, a hawk, and mushrooms on a fallen log. Kelenna\'s chicken sandwich: the chicken ate corn, and the corn grew in sunlight.',
    predictions: [
      'A plant in a dark closet vs a sunny window for two weeks: which grows? -> the sunny one; producers need light.',
      'Where does a hawk\'s energy start? -> the Sun (Sun -> grass -> grasshopper -> frog -> snake -> hawk).',
      'If all the frogs disappeared, what happens to grasshoppers? -> more grasshoppers (and snakes have less food).',
      'What happens to a dead log over years? -> decomposers break it down into soil that helps new plants.',
    ],
    scene: 'A coastal prairie diorama: tall grass, wildflowers, a pond, a fallen log with mushrooms. Low-poly animals built from primitives: grasshopper, frog, snake, hawk, rabbit, coyote, earthworm. Glowing energy arrows (pointing FROM food TO eater) animate from the Sun into the grass and up the chain. Tap an animal to remove it; population bars (readout) for the others rise or fall. Leaf close-up via "look inside": sunlight in, water from roots, air (carbon dioxide) in through tiny holes, oxygen out, sugar made. Keep words simple: "air goes in, oxygen comes out".',
    tasks: [
      'Tap the animals in order to build one food chain from the Sun to the hawk (event chainBuilt).',
      'Remove the frogs and watch what happens (event frogsRemoved).',
      'Tap the log to speed up time and watch decomposers work (event decomposed).',
    ],
    vocab: ['Producer', 'Consumer', 'Decomposer', 'Food chain', 'Food web', 'Photosynthesis'],
    misconceptions: [
      'Arrows mean "eats" (pointing from eater to food). (No - arrows show energy flowing from the food to the eater.)',
      'Plants get their food from the soil. (No - they make it from sunlight, water, and air; soil gives some nutrients.)',
      'Decomposers are not important. (They recycle matter back to the soil.)',
    ],
    useIt: 'A drought dries up the pond. Predict two changes in the food web.',
    staarStyles: 'Read a food web described in words, identify roles, follow the energy arrows, predict what happens if one population changes.',
    note: 'Reviewer: confirm the exact wording of TEKS 4.12C in 19 TAC 112.6 (2024) and adjust content if it covers something else.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
