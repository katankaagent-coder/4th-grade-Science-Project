// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L12', num: 12, unit: 4, unitTitle: 'Living Things',
  title: 'Built to Survive',
  testTitle: 'Plant Structures & Inherited vs. Acquired Traits',
  teks: ['4.13A', '4.13B'],
  icon: '🌵', color: '#84cc16',
  bigQuestion: 'Why does a cactus look so different from a water lily?',
  ladder: [
    'Every living thing has body parts, called structures.',
    'Each structure has a job that helps it survive where it lives.',
    'A desert plant has a waxy skin and deep or wide roots to save and find water.',
    'Some traits come from your parents, like eye color. They are inherited.',
    'Some you get during your life, like a scar or riding a bike. They are acquired.',
    'Acquired traits are not passed down to babies.',
  ],
  stub: true,
  brief: {
    phenomenon: 'On a trip from Dickinson to West Texas, Kelenna sees cactus and mesquite in the dry desert. At home, water lilies float in a pond and cattails grow in the marsh at the bay. Same Sun - very different plants!',
    predictions: [
      'Why does a cactus have a thick waxy skin? -> to keep water from escaping.',
      'Mesquite tree roots: shallow or very deep? -> very deep, to reach water far down.',
      'Water lily leaves: why are they big, flat, and floating? -> to catch sunlight on the water surface (air pockets help them float).',
      'Kelenna\'s dog learned to sit. Will her puppies know how to sit at birth? -> no, it was learned, not inherited.',
    ],
    scene: 'Split diorama: a desert side (sand, cactus with ribs and spines, mesquite tree, cutaway showing deep taproot and wide shallow roots) and a wetland side (pond with floating water lily pads, cattails, marsh grass). "Look inside" slider cuts the cactus open to show stored water and the waxy coat. Water drop particles escape quickly from a thin leaf but not from the waxy cactus when a "hot sun" button is pressed. A family portrait station: parent and child dogs (simple primitives) with trait cards to sort.',
    tasks: [
      'Press Hot Sun and see which plant loses water fastest (event sunTest).',
      'Slide the roots open to find the deepest roots (event rootsFound).',
      'Sort the dog traits into Inherited and Acquired (event traitsSorted).',
    ],
    vocab: ['Structure', 'Function (job)', 'Adaptation', 'Inherited trait', 'Acquired trait', 'Learned behavior'],
    misconceptions: [
      'Plants choose to grow spines because they want to. (No - plants with helpful traits survived and passed them on.)',
      'Acquired traits (a scar, big muscles from exercise) get passed to children. (No.)',
      'All plants need the same amount of water. (No - structures fit the environment.)',
    ],
    useIt: 'Design a plant for Galveston Island\'s salty, windy beach dunes. What roots and leaves would help? (Sea oats have long roots that hold sand.)',
    staarStyles: 'Match structure to function to environment; sort inherited vs acquired traits for people, animals, and plants.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
