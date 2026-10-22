// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L05', num: 5, unit: 2, unitTitle: 'Force & Energy',
  title: 'Make the Light Turn On',
  testTitle: 'Circuits, Conductors & Insulators',
  teks: ['4.8B', '4.8C'],
  icon: '💡', color: '#fde047',
  bigQuestion: 'Why does a flashlight only shine when you push the switch?',
  ladder: [
    'Electricity is energy that can flow, like water in a pipe.',
    'It only flows in a complete loop, from the battery and back again.',
    'A loop with no gaps is a closed circuit. A gap makes it open.',
    'A switch opens and closes the gap.',
    'When electricity flows through a bulb, it makes light and heat.',
    'Some stuff lets energy flow (conductors). Some stuff blocks it (insulators).',
  ],
  stub: true,
  brief: {
    phenomenon: 'During a storm in Dickinson, the power goes out. Kelenna grabs a flashlight. Click - light! Click - dark. What is the switch really doing?',
    predictions: [
      'Battery, bulb, and ONE wire connecting one side: will the bulb light? -> no, the loop is not complete.',
      'Close the loop with a second wire: light? -> yes.',
      'Put a metal spoon in the gap: light? -> yes (conductor). A rubber eraser? -> no (insulator).',
      'Leave the bulb on for a while and touch it: what do you feel? -> warm; electricity makes heat too.',
      'Which handle keeps your hand cool on a hot pan: metal or wood? -> wood (thermal insulator).',
    ],
    scene: 'A circuit board on a table: a big D battery, a light bulb on a stand, 3 wire pieces with clips that snap to posts (drag to connect), a switch lever, and a "test gap" where you drop objects: metal spoon, coin, paper clip (conductors), eraser, wooden pencil, plastic spoon (insulators). When the loop closes, glowing dots flow around the wire and the bulb glows warm with a heat shimmer. "Look inside" shows the wire: copper core inside plastic coating. Second mini station: a pot on a stove with a metal spoon and a wooden spoon; heat glow creeps up the metal one.',
    tasks: [
      'Drag wires to close the loop and light the bulb (event lit).',
      'Flip the switch off and on (event switched).',
      'Test all six objects in the gap (event allTested).',
    ],
    vocab: ['Circuit', 'Closed circuit / open circuit', 'Conductor', 'Insulator', 'Electrical energy'],
    misconceptions: [
      'One wire from the battery is enough. (No - it must be a full loop.)',
      'Electricity gets used up in the bulb. (Say: energy changes into light and heat; the flow goes around the loop.)',
      'All shiny or hard things conduct. (Test it: plastic and glass do not.)',
      'A switch makes electricity. (No - it just closes or opens the gap.)',
    ],
    useIt: 'Why are wires covered in plastic? Why does an oven mitt work? (insulators keep energy where we want it).',
    staarStyles: 'Include diagrams described in words ("a circuit with a gap between the wire and bulb"), and sort conductors/insulators of electrical AND thermal energy.',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
