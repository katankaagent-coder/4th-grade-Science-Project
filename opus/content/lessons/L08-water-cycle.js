// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L08', num: 8, unit: 3, unitTitle: 'Earth & Space',
  title: 'Water\'s Never-Ending Trip',
  testTitle: 'The Water Cycle, Weather & Climate',
  teks: ['4.10A', '4.10C'],
  icon: '🌧️', color: '#60a5fa',
  bigQuestion: 'Could the rain on your head today have once been in Galveston Bay?',
  ladder: [
    'Water can be a liquid, a solid (ice), or a gas you cannot see (water vapor).',
    'The Sun\'s heat turns liquid water into vapor that rises. That is evaporation.',
    'High up, it cools and turns back into tiny drops that make clouds. That is condensation.',
    'When drops get heavy, they fall as rain, sleet, snow, or hail. That is precipitation.',
    'Water runs back to bays and oceans, and the trip starts again.',
    'Weather is what the air is doing today. Climate is the usual pattern over many years.',
  ],
  stub: true,
  brief: {
    phenomenon: 'On a hot August day, a puddle on the Dunbar playground disappears by afternoon, and by evening a thunderstorm rolls in from the Gulf. Where did the puddle go?',
    predictions: [
      'Puddle in the sun vs puddle in the shade: which dries first? -> the sunny one; the Sun\'s energy drives evaporation.',
      'Cold can of soda on a hot day: where do the drops on the outside come from? -> water vapor in the air condenses.',
      'What powers the whole water cycle? -> the Sun.',
      'It rained today in Dickinson. Does that tell you the climate? -> no, that is weather; climate is the pattern over about 30 years.',
    ],
    scene: 'A diorama of the Texas coast: Galveston Bay water plane, the shoreline, a small town (Dickinson houses), and land rising to a hill. A bright Sun. A "Sun power" slider speeds up evaporation: vapor particles rise from the bay, gather into a puffy cloud mesh that grows and darkens, then rain particles fall over the land, runoff flows in a stream back to the bay. Labels pop up for each step. Second part: a weather station with a thermometer and rain gauge (today) next to a big "30-year climate" bar chart of average monthly temperature and rain for Dickinson.',
    tasks: [
      'Turn up the Sun and make a cloud (event cloudMade).',
      'Keep going until it rains (event rained).',
      'Tap each step of the cycle in order: evaporation, condensation, precipitation, runoff (event cycleTapped).',
    ],
    vocab: ['Evaporation', 'Condensation', 'Precipitation', 'Water vapor', 'Weather', 'Climate'],
    misconceptions: [
      'Clouds are made of water vapor (gas). (No - clouds are tiny liquid drops or ice; vapor is invisible.)',
      'Evaporated water is gone forever. (No - it comes back as precipitation.)',
      'Weather and climate are the same. (No - day vs many years.)',
      'Water only evaporates when it boils. (No - puddles evaporate slowly in the sun.)',
    ],
    useIt: 'Your cousin moves to Dickinson and asks what to pack. Use climate (hot humid summers, mild winters). On the trip day, check the weather.',
    staarStyles: 'Diagram-in-words ordering of the cycle, role of the Sun, and weather vs climate sorting of statements.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
