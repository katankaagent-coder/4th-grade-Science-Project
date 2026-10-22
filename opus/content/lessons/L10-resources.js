// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L10', num: 10, unit: 3, unitTitle: 'Earth & Space',
  title: 'Earth\'s Treasure Chest',
  testTitle: 'Natural Resources & Conservation',
  teks: ['4.11A', '4.11B', '4.11C'],
  icon: '🛢️', color: '#10b981',
  bigQuestion: 'Will we ever run out of the stuff that powers our homes?',
  ladder: [
    'A natural resource is something from nature that people use.',
    'Some come back fast, like sunlight, wind, plants, and water. They are renewable.',
    'Some take millions of years to form, like oil, coal, and natural gas. They are nonrenewable.',
    'Oil, gas, and water can hide in the tiny spaces between grains of rock underground.',
    'Every resource has good sides and bad sides, so we choose and save carefully.',
  ],
  stub: true,
  brief: {
    phenomenon: 'Near Dickinson there are oil refineries and also new wind farms and solar panels across Texas. Kelenna\'s family pays for electricity, gas for the car, and water. Where does all of it come from?',
    predictions: [
      'If we use up all the oil in a well, will more grow back next year? -> no, it took millions of years.',
      'Pour water on sandstone vs on granite: which soaks it up? -> sandstone (spaces between grains).',
      'Is wind renewable? -> yes. Is coal? -> no.',
      'A wind farm: one good thing and one bad thing? -> clean and never runs out; only works when windy, takes space.',
    ],
    scene: 'A cutaway of the Texas Gulf Coast: surface with houses, a wind turbine (spinning), solar panels, a field of crops, and an oil pump jack. Below ground, layered rocks; the "look inside" slider zooms into a sandstone layer showing grains with spaces filled with water (blue) and oil (dark amber) droplets, capped by a tight shale layer. A pour test station: two rock samples, tap to pour water - sandstone soaks it up, granite does not. Sorting shelf for resource cards.',
    tasks: [
      'Zoom into the rock to find where the oil hides (event oilFound).',
      'Pour water on both rocks (event pourTested).',
      'Turn on the wind turbine and solar panels to light the town (event townPowered).',
    ],
    vocab: ['Natural resource', 'Renewable', 'Nonrenewable', 'Conservation', 'Fossil fuel'],
    misconceptions: [
      'Oil is in big underground lakes. (Mostly in tiny spaces in rock, like water in a sponge.)',
      'Renewable means unlimited and perfect. (It can still have downsides, like needing sun or wind.)',
      'Water is always renewable so it does not matter how we use it. (Clean water can still run short; conserve it.)',
    ],
    useIt: 'Make a family save-energy plan: turn off lights, shorter showers, recycle. Which resources does each one save?',
    staarStyles: 'Sort renewable/nonrenewable; advantages/disadvantages table; why energy resources matter for modern life (lights, cars, hospitals).',
    note: 'Reviewer: confirm the exact wording of TEKS 4.11B and 4.11C in 19 TAC 112.6 (2024).',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
