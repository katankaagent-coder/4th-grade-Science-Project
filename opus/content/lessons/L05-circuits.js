// Lesson 5 - Make the Light Turn On. Circuits, conductors, and insulators.
export default {
  id: 'L05', num: 5, unit: 2, unitTitle: 'Force & Energy',
  title: 'Make the Light Turn On',
  testTitle: 'Circuits, Conductors & Insulators',
  teks: ['4.8B', '4.8C'],
  icon: '💡', color: '#fde047',
  bigQuestion: 'Why does a flashlight only shine when you push the switch?',
  ladder: [
    'Electricity is energy that can flow, like water in a pipe.',
    'It only flows in a complete loop, from the battery and back.',
    'No gaps means a closed circuit. A gap makes an open circuit.',
    'A switch opens or closes that gap.',
    'A bulb turns that energy into light and heat.',
    'Conductors let energy flow. Insulators block it.',
  ],

  steps: [
    {
      id: 's1', phase: 'wonder', title: 'The Storm Click', shot: 'flash',
      beats: [
        { say: 'A storm just knocked the power out in Dickinson.' },
        { say: 'The room is dark. You grab a flashlight.', point: 'flashlight' },
        { say: 'Click! The light pops on.', cue: 'flashOn' },
        { say: 'Click! Now it is dark again.', cue: 'flashOff' },
        { say: 'That switch is hiding a secret.' },
        { say: 'Here is a battery, a bulb, and one wire.', shot: 'board', point: 'battery' },
        { predict: { q: 'The bulb and battery are in holders. Will one wire light it?', options: [{ t: 'Yes, one wire is enough' }, { t: 'No, the path is not a full loop', correct: true }, { t: 'Only if the wire is extra thick' }] } },
        { say: 'Watch the bulb.', cue: 'oneWire', point: 'bulb' },
        { verdict: { right: 'You called it! One wire cannot light the bulb.', wrong: 'Surprise! One wire leaves the path open.' } },
        { say: 'Like water in a pipe, it must go out and come back.' },
        { say: 'One wire is only half the trip.' },
      ],
    },
    {
      id: 's2', phase: 'play', title: 'Close the Loop', shot: 'board',
      beats: [
        { cue: 'reset', wait: true },
        { say: 'Your turn. These wires can finish the loop.', point: 'wires' },
        { say: 'The other parts are already touching.' },
        { predict: { q: 'If you connect every wire, will the bulb light?', options: [{ t: 'Yes, the loop will be complete', correct: true }, { t: 'No, wires cannot light a bulb' }, { t: 'Only the first wire matters' }] } },
        { cue: 'wireMode' },
        { task: { goal: 'Drag each wire onto its yellow pad.', event: 'lit', hint: 'Drag a colored wire to the matching pad. Or tap Snap all wires.' } },
        { verdict: { right: 'Yes! The full loop lights the bulb.', wrong: 'Surprise! The full loop lights the bulb.' } },
        { say: 'See the glow? The path is a full loop.' },
        { say: 'A loop like that has a name. It is a circuit.' },
        { say: 'No gaps at all means a closed circuit.' },
        { say: 'The energy flowing around it is electrical energy.' },
      ],
    },
    {
      id: 's3', phase: 'why', title: 'Mind the Gap', shot: 'gap',
      beats: [
        { cue: 'openGap', wait: true },
        { say: 'The bridge lifted. The bulb went dark.', point: 'gap' },
        { predict: { q: 'We set the metal bridge back down. Will the bulb light?', options: [{ t: 'Yes', correct: true }, { t: 'No, the gap broke it forever' }, { t: 'Only if we add a second battery' }] } },
        { say: 'The bridge goes back down.', cue: 'closeGap' },
        { verdict: { right: 'You called it! The bridge closes the loop again.', wrong: 'Surprise! The bridge closes the loop again.' } },
        { say: 'A gap makes an open circuit.' },
        { say: 'The flow cannot get around.' },
        { say: 'Close the gap, and the flow starts again.' },
        {
          check: {
            type: 'one', q: 'A student leaves a gap before the bulb. The bulb stays dark. Why?',
            options: [
              { t: 'The circuit is open.', correct: true },
              { t: 'The wires are too short.', why: 'Length is not the problem. A gap means the loop is open.' },
              { t: 'The battery disappeared.', why: 'The battery is still there. The gap is what stops the flow.' },
            ],
            explain: 'A gap makes an open circuit. The energy cannot flow around.',
          },
        },
      ],
    },
    {
      id: 's4', phase: 'play', title: 'Flip the Switch', shot: 'switch',
      beats: [
        { say: 'A switch is a gap you can open and close.', point: 'switch' },
        { say: 'It does not make the energy. The battery does the pushing.' },
        { predict: { q: 'You flip the switch open. What happens to the bulb?', options: [{ t: 'It goes dark', correct: true }, { t: 'It shines brighter' }, { t: 'Nothing changes' }] } },
        { cue: 'switchMode', wait: true },
        { task: { goal: 'Flip the switch off, then back on.', event: 'switched', hint: 'Tap the orange lever, or tap Flip switch. Do it twice.' } },
        { verdict: { right: 'Yes! Open switch, dark. Closed switch, light.', wrong: 'Surprise! An open switch turns the bulb off.' } },
        { say: 'The switch only opens or closes the loop.' },
        { say: 'Open switch means a gap. Closed switch means no gap.' },
        { say: 'Your flashlight switch works the same way.' },
      ],
    },
    {
      id: 's5', phase: 'why', title: 'Light and Heat', shot: 'bulb',
      beats: [
        { say: 'The bulb is glowing. Light is not the only clue.', point: 'bulb' },
        { predict: { q: 'You leave the bulb on, then touch the glass. What do you feel?', options: [{ t: 'Warm', correct: true }, { t: 'Ice cold' }, { t: 'Nothing at all' }] } },
        { say: 'See the warm shimmer rising off the glass.', cue: 'warmBulb' },
        { verdict: { right: 'You called it! The bulb gets warm.', wrong: 'Surprise! The bulb gets warm, not cold.' } },
        { say: 'Electrical energy changes into light and heat.' },
        { say: 'The flow does not get used up along the wire.' },
        { say: 'It keeps going around the whole loop.' },
        { say: 'The bulb changes the energy. It does not eat it.' },
        {
          check: {
            type: 'one', q: 'A student says the bulb uses up the electricity. Which idea is right?',
            options: [
              { t: 'Energy becomes light and heat. The flow keeps going.', correct: true },
              { t: 'The flow stops inside the bulb.', why: 'The flow does not stop inside. It keeps going around the loop.' },
              { t: 'Less flow comes out than went in.', why: 'The flow stays the same all around. The bulb changes energy into light and heat.' },
            ],
            explain: 'The bulb changes energy into light and heat. The flow is not used up.',
          },
        },
      ],
    },
    {
      id: 's6', phase: 'play', title: 'Test the Gap', shot: 'gap',
      beats: [
        { say: 'Six things are waiting. Metal, wood, rubber, and plastic.', point: 'gap' },
        { predict: { q: 'A metal spoon goes in the gap. Will the bulb light?', options: [{ t: 'Yes, metal lets the flow through', correct: true }, { t: 'No, spoons always block it' }, { t: 'Only if the spoon is hot' }] } },
        { cue: 'testMode', wait: true },
        { task: { goal: 'Test all six things in the gap.', event: 'allTested', hint: 'Tap each thing, or use the buttons. Test every one.' } },
        { verdict: { right: 'Yes! The metal spoon lets the flow through.', wrong: 'Surprise! The metal spoon lets the flow through.' } },
        { say: 'The coin and the clip let the flow through too.' },
        { say: 'The eraser, the wood pencil, and the plastic spoon block it.' },
        { say: 'Stuff that lets the flow through is a conductor.' },
        { say: 'Stuff that blocks the flow is an insulator.' },
        { say: 'Shiny plastic still blocks. So does hard wood.' },
        { say: 'Glass blocks electricity too, like a window.' },
      ],
    },
    {
      id: 's7', phase: 'why', title: 'Inside a Wire', shot: 'inside',
      beats: [
        { say: 'Let us look inside a real wire.', cue: 'lookInside', point: 'inside' },
        { say: 'The middle is copper metal. Copper is a conductor.' },
        { say: 'The coat is plastic. Plastic is an insulator.' },
        { say: 'The plastic keeps the flow inside the wire.' },
        { say: 'It also keeps the energy off your fingers.' },
        { say: 'Safety rule. Wall outlets are never for experiments.' },
        { say: 'Outlet energy is way too strong. Use a battery only.' },
        {
          check: {
            type: 'one', q: 'What is safe to use in a circuit experiment?',
            options: [
              { t: 'A battery', correct: true },
              { t: 'A wall outlet', why: 'Wall outlets are never for experiments. That energy is much too strong.' },
              { t: 'A power line', why: 'Power lines are dangerous. Use a battery for experiments.' },
            ],
            explain: 'Use a battery only. Wall outlets are never for experiments.',
          },
        },
      ],
    },
    {
      id: 's8', phase: 'why', title: 'The Hot Pan', shot: 'stove',
      beats: [
        { say: 'Conductors and insulators work for heat too.', point: 'stove' },
        { say: 'A hot pan sits on the stove. Two spoons rest in it.' },
        { predict: { q: 'Which handle stays cooler on the hot pan?', options: [{ t: 'The wooden spoon', correct: true }, { t: 'The metal spoon' }, { t: 'They heat up the same' }] } },
        { say: 'Watch the heat creep up the metal spoon.', cue: 'heatSpoons' },
        { verdict: { right: 'You called it! Wood stays cooler than metal.', wrong: 'Surprise! The wood handle stays cooler.' } },
        { say: 'Metal lets heat flow. It is a thermal conductor.' },
        { say: 'Wood blocks heat. It is a thermal insulator.' },
        { say: 'That is why an oven mitt is thick cloth, not metal.' },
      ],
    },
    {
      id: 's9', phase: 'useit', title: 'Keep It Safe', shot: 'wide',
      beats: [
        { say: 'So why are wires covered in plastic?', cue: 'idle', point: 'inside' },
        { say: 'Plastic is an insulator. It keeps the flow in the wire.' },
        { say: 'And why does an oven mitt save your hand?' },
        { say: 'The mitt blocks heat. Your hand stays cooler.' },
        { say: 'Remember the safety rule for every experiment.' },
        { say: 'Never use a wall outlet. A battery is the safe choice.' },
        {
          check: {
            type: 'one', q: 'Which keeps your hand cooler on a hot pan?',
            options: [
              { t: 'An oven mitt', correct: true },
              { t: 'A metal spoon handle', why: 'Metal lets heat flow into your hand. A mitt blocks heat.' },
              { t: 'The bare pan', why: 'The pan is hot metal. It would hurt. A mitt blocks the heat.' },
            ],
            explain: 'An oven mitt is a thermal insulator. It blocks heat from the pan.',
          },
        },
        { say: 'You built a loop, opened it, and tested real stuff.' },
        { say: 'That is how your flashlight switch turns the light on.' },
      ],
    },
  ],

  vocab: [
    { word: 'Circuit', emoji: '🔁', means: 'A path that electrical energy can flow around.', example: 'A battery, wires, and a bulb can make a circuit.', test: 'A circuit is a path that electrical energy can flow through.' },
    { word: 'Closed circuit', emoji: '✅', means: 'A circuit with no gaps, so energy can flow all the way around.', example: 'Snap every wire on and the bulb lights.', test: 'A closed circuit is a complete loop. Electrical energy can flow through it.' },
    { word: 'Open circuit', emoji: '🚫', means: 'A circuit with a gap, so energy cannot flow around.', example: 'A loose wire leaves a gap. The bulb stays dark.', test: 'An open circuit has a break in the path. Electrical energy cannot flow.' },
    { word: 'Conductor', emoji: '🥄', means: 'Stuff that lets electrical energy or heat flow through.', example: 'A metal spoon, a coin, and copper wire are conductors.', test: 'A conductor lets electrical energy or thermal energy flow. Metals are conductors.' },
    { word: 'Insulator', emoji: '🧤', means: 'Stuff that blocks electrical energy or heat.', example: 'Plastic, rubber, wood, and glass are insulators.', test: 'An insulator does not let electrical energy or thermal energy flow easily. Plastic, rubber, wood, and glass are insulators.' },
    { word: 'Electrical energy', emoji: '⚡', means: 'Energy that flows around a closed circuit and can make light.', example: 'A battery sends electrical energy through a wire to a bulb.', test: 'Electrical energy is energy from electricity in a circuit. It can change into light or heat.' },
  ],

  quiz: [
    {
      type: 'one', staar: true, q: 'A student builds a circuit. A gap sits between the wire and the bulb. The bulb stays off. Why?',
      options: [
        { t: 'The circuit is open.', correct: true },
        { t: 'The battery is too strong.', why: 'A strong battery does not fix a gap. The gap stops the flow.' },
        { t: 'The wire is too shiny.', why: 'Shiny is not the problem. The gap breaks the loop.' },
        { t: 'The bulb ate the energy.', why: 'The flow never started. A gap means the loop is not closed.' },
      ],
      explain: 'A gap breaks the loop. That open circuit cannot light the bulb.',
    },
    {
      type: 'one', q: 'What is a circuit?',
      options: [
        { t: 'A path electrical energy can flow around', correct: true },
        { t: 'Only the battery', why: 'The battery pushes the energy. A circuit is the whole path.' },
        { t: 'Only the light bulb', why: 'The bulb uses the energy to make light. The circuit is the path.' },
        { t: 'A single wire with no loop', why: 'A single wire leaves a gap. A circuit must be a path that flows around.' },
      ],
      explain: 'A circuit is the path. Electrical energy flows around it when the loop is closed.',
    },
    {
      type: 'one', staar: true, q: 'A student closes a switch. The bulb lights. What did the switch do?',
      options: [
        { t: 'It closed a gap in the loop.', correct: true },
        { t: 'It made new electricity.', why: 'A switch does not make energy. The battery does the pushing.' },
        { t: 'It used up the battery.', why: 'Closing the switch lets energy flow. It does not use up the battery by itself.' },
        { t: 'It turned the bulb into a battery.', why: 'The bulb does not become a battery. The switch only closes the gap.' },
      ],
      explain: 'A switch opens or closes a gap. Closed switch, the loop is complete, and the bulb lights.',
    },
    {
      type: 'one', q: 'What pushes electrical energy around a circuit?',
      options: [
        { t: 'The battery', correct: true },
        { t: 'The switch', why: 'A switch only opens or closes a gap. It does not push the energy.' },
        { t: 'The plastic coat', why: 'Plastic blocks the flow. It does not push energy.' },
        { t: 'The glass of the bulb', why: 'Glass is an insulator. The battery pushes the energy.' },
      ],
      explain: 'The battery pushes electrical energy. The switch only opens or closes the path.',
    },
    {
      type: 'one', staar: true, q: 'A student leaves a bulb glowing in a closed circuit. What else happens?',
      options: [
        { t: 'The bulb gets warm.', correct: true },
        { t: 'The bulb gets icy.', why: 'A glowing bulb does not get icy. Energy changes into light and heat.' },
        { t: 'The flow stops forever.', why: 'The flow keeps going around the loop. It does not stop in the bulb.' },
        { t: 'The wire becomes wood.', why: 'The wire stays metal inside. The bulb just gets warm.' },
      ],
      explain: 'Electrical energy changes into light and heat. That is why the glass feels warm.',
    },
    {
      type: 'one', q: 'In a simple closed loop, how does the flow compare all the way around?',
      options: [
        { t: 'It stays the same all the way around.', correct: true },
        { t: 'It gets smaller after the bulb.', why: 'The flow does not get smaller. Energy changes into light and heat.' },
        { t: 'It stops inside the bulb.', why: 'The flow keeps going around the loop. It does not stop in the bulb.' },
        { t: 'It leaves and does not return.', why: 'The loop brings the flow back to the battery.' },
      ],
      explain: 'The flow is not used up. The bulb changes energy into light and heat.',
    },
    {
      type: 'one', staar: true, q: 'A student tests objects in a gap. The coin lights the bulb. The eraser does not. The clip lights it. The plastic spoon does not. Which one is a conductor?',
      options: [
        { t: 'The coin', correct: true },
        { t: 'The eraser', why: 'The eraser left the bulb off. Rubber blocks the flow.' },
        { t: 'The plastic spoon', why: 'The plastic spoon left the bulb off. Plastic is an insulator.' },
        { t: 'The eraser and the spoon', why: 'Those two left the bulb dark. They are insulators, not conductors.' },
      ],
      explain: 'The coin is metal. Metal lets electrical energy flow, so the bulb lights.',
    },
    {
      type: 'one', q: 'Which one is an electrical insulator?',
      options: [
        { t: 'A glass jar', correct: true },
        { t: 'A copper wire', why: 'Copper is metal. It lets electrical energy flow.' },
        { t: 'A steel paper clip', why: 'Steel is metal. It is a conductor, not an insulator.' },
        { t: 'An iron nail', why: 'Iron is metal. It lets electrical energy flow.' },
      ],
      explain: 'Glass blocks electrical energy. Plastic, rubber, and wood do too.',
    },
    {
      type: 'one', staar: true, q: 'A student puts a metal spoon and a wood spoon in hot soup. Which handle gets hot first?',
      options: [
        { t: 'The metal spoon', correct: true },
        { t: 'The wood spoon', why: 'Wood blocks heat. The metal handle gets hot first.' },
        { t: 'Neither one changes.', why: 'Heat does move. It flows up the metal spoon.' },
        { t: 'They get hot at the same time.', why: 'Metal lets heat through faster. Wood stays cooler.' },
      ],
      explain: 'Metal is a thermal conductor. Heat flows up the metal spoon first.',
    },
    {
      type: 'one', staar: true, q: 'A student asks why a wire has a plastic coat. What is the best answer?',
      options: [
        { t: 'It keeps the flow inside the wire.', correct: true },
        { t: 'It makes the battery stronger.', why: 'The coat does not make energy. The battery does the pushing.' },
        { t: 'It uses up extra electricity.', why: 'The coat does not use up energy. It keeps the flow inside.' },
        { t: 'It opens the circuit on purpose.', why: 'The coat does not open the loop. It keeps the flow in the wire.' },
      ],
      explain: 'Plastic is an insulator. It keeps electrical energy inside the wire.',
    },
    {
      type: 'one', q: 'After a storm in Dickinson, Kelenna clicks a flashlight. Why does the bulb light?',
      options: [
        { t: 'The switch closes the loop so energy flows.', correct: true },
        { t: 'The switch creates brand new electricity.', why: 'A switch does not make energy. It only closes the gap.' },
        { t: 'The plastic case carries the flow to the bulb.', why: 'Plastic is an insulator. It blocks the flow of electricity.' },
        { t: 'One wire is enough without returning to the battery.', why: 'Energy must travel in a complete loop from the battery and back.' },
      ],
      explain: 'The switch closes the circuit loop. Electrical energy can then flow to the bulb.',
    },
    {
      type: 'one', staar: true, q: 'A drawing shows a battery, a bulb, and only one wire. The bulb is off. What is missing?',
      options: [
        { t: 'A path back to the battery', correct: true },
        { t: 'A bigger battery', why: 'Size is not the problem. The loop has to come back.' },
        { t: 'A shinier wire', why: 'Shiny does not close a loop. The path back is missing.' },
        { t: 'A plastic coat on the bulb', why: 'Plastic would block the flow. You need a path back.' },
      ],
      explain: 'One wire cannot light the bulb. The loop must return to the battery.',
    },
    {
      type: 'two', staar: true, q: 'Which TWO are electrical conductors?',
      options: [
        { t: 'A coin', correct: true },
        { t: 'A steel paper clip', correct: true },
        { t: 'A rubber eraser', why: 'Rubber blocks electrical energy. It is an insulator.' },
        { t: 'A glass jar', why: 'Glass blocks electrical energy. It is an insulator.' },
      ],
      explain: 'Coins and steel clips are metal. Metal lets electrical energy flow.',
    },
    {
      type: 'two', q: 'Which TWO are electrical insulators?',
      options: [
        { t: 'A plastic spoon', correct: true },
        { t: 'A wood pencil', correct: true },
        { t: 'An iron nail', why: 'Iron is metal. It lets electrical energy flow.' },
        { t: 'Aluminum foil', why: 'Aluminum is metal. It lets electrical energy flow.' },
      ],
      explain: 'Plastic and wood block the flow. Shiny or hard does not make them conductors.',
    },
    {
      type: 'two', staar: true, q: 'Which TWO are true about a closed circuit?',
      options: [
        { t: 'It is a full loop.', correct: true },
        { t: 'Energy can flow all the way around.', correct: true },
        { t: 'One wire is enough.', why: 'One wire leaves the path open. The loop must come back.' },
        { t: 'The bulb uses up the flow.', why: 'The flow is not used up. Energy changes into light and heat.' },
      ],
      explain: 'A closed circuit has no gaps. Electrical energy can flow all the way around.',
    },
    {
      type: 'two', q: 'Which TWO block heat the best?',
      options: [
        { t: 'An oven mitt', correct: true },
        { t: 'A wood spoon', correct: true },
        { t: 'A metal spoon', why: 'Metal lets heat flow. That is why the handle gets hot.' },
        { t: 'A copper wire', why: 'Copper is metal. Heat flows through it.' },
      ],
      explain: 'Wood and a thick mitt block heat. Metal lets heat through.',
    },
    {
      type: 'sort', q: 'Sort them: electrical conductor or insulator?',
      groups: ['Conductor', 'Insulator'],
      items: [
        { t: 'Metal spoon', g: 0 }, { t: 'Coin', g: 0 }, { t: 'Paper clip', g: 0 },
        { t: 'Rubber eraser', g: 1 }, { t: 'Wood pencil', g: 1 }, { t: 'Glass jar', g: 1 }, { t: 'Plastic spoon', g: 1 },
      ],
      explain: 'Metals let electrical energy flow. Plastic, rubber, wood, and glass block it.',
    },
    {
      type: 'sort', staar: true, q: 'Sort them by heat: lets heat through, or blocks heat?',
      groups: ['Lets heat through', 'Blocks heat'],
      items: [
        { t: 'Metal spoon', g: 0 }, { t: 'Steel pan', g: 0 }, { t: 'Copper wire', g: 0 },
        { t: 'Wood spoon', g: 1 }, { t: 'Oven mitt', g: 1 }, { t: 'Plastic handle', g: 1 },
      ],
      explain: 'Metals let heat flow. Wood, cloth, and plastic slow it down.',
    },
    {
      type: 'sort', q: 'Sort them: closed circuit or open circuit?',
      groups: ['Closed circuit', 'Open circuit'],
      items: [
        { t: 'Full loop and the bulb is on', g: 0 },
        { t: 'Every wire snapped, no gaps', g: 0 },
        { t: 'A gap before the bulb', g: 1 },
        { t: 'Switch flipped open', g: 1 },
        { t: 'Only one wire hooked up', g: 1 },
        { t: 'Loose clip and the bulb is dark', g: 1 },
      ],
      explain: 'Closed means no gaps, so energy can flow. A gap or an open switch makes it open.',
    },
    {
      type: 'sort', staar: true, q: 'A student tests circuit setups. Sort each setup: closed loop or open loop.',
      groups: ['Closed loop', 'Open loop'],
      items: [
        { t: 'Wires connect battery to bulb with no gaps', g: 0 },
        { t: 'A metal clip bridges the gap', g: 0 },
        { t: 'The switch is closed and the bulb lights', g: 0 },
        { t: 'A wire is disconnected from the battery', g: 1 },
        { t: 'The switch is flipped open', g: 1 },
        { t: 'A rubber eraser sits in the gap', g: 1 },
      ],
      explain: 'A closed loop has a complete path. A gap, open switch, or insulator makes an open loop.',
    },
    {
      type: 'order', q: 'Put the steps in order to light a bulb.',
      items: ['Get a battery, a bulb, and wires', 'Connect them into a full loop', 'Close the switch', 'Watch the bulb light'],
      explain: 'Build the loop first. Then close the switch so energy can flow.',
    },
    {
      type: 'order', staar: true, q: 'A student closes the switch on a complete circuit. Put what happens in order.',
      items: ['The switch closes the gap', 'Electrical energy flows around the loop', 'The bulb makes light and heat'],
      explain: 'The switch finishes the loop. Then energy flows, and the bulb makes light and heat.',
    },
    {
      type: 'order', q: 'Put the energy ideas in order.',
      items: ['The battery pushes the flow', 'The flow travels around the closed loop', 'The bulb changes energy into light and heat'],
      explain: 'The battery pushes. The flow goes around. The bulb changes energy into light and heat.',
    },
    {
      type: 'pick', staar: true, q: 'Tap the electrical conductor.',
      options: [
        { t: 'Steel paper clip', emoji: '📎', correct: true },
        { t: 'Wood pencil', emoji: '✏️', why: 'Wood blocks electrical energy. It is an insulator.' },
        { t: 'Rubber eraser', emoji: '🧽', why: 'Rubber blocks electrical energy. It is an insulator.' },
        { t: 'Glass cup', emoji: '🥛', why: 'Glass blocks electrical energy. It is an insulator.' },
      ],
      explain: 'Steel is metal. Metal lets electrical energy flow.',
    },
    {
      type: 'pick', q: 'Tap the electrical insulator.',
      options: [
        { t: 'Plastic spoon', emoji: '🟣', correct: true },
        { t: 'Coin', emoji: '🪙', why: 'A coin is metal. Metal lets electrical energy flow.' },
        { t: 'Paper clip', emoji: '📎', why: 'A paper clip is steel. Steel lets electrical energy flow.' },
        { t: 'Copper wire', emoji: '🔶', why: 'Copper is metal. It lets electrical energy flow.' },
      ],
      explain: 'Plastic blocks electrical energy, even if it looks shiny.',
    },
    {
      type: 'pick', q: 'Tap what lights in a closed circuit.',
      options: [
        { t: 'Bulb', emoji: '💡', correct: true },
        { t: 'Plastic coat', emoji: '🔴', why: 'Plastic is an insulator. It does not glow.' },
        { t: 'Wood spoon', emoji: '🥄', why: 'A wood spoon is not a bulb. It does not light.' },
        { t: 'Eraser', emoji: '🧽', why: 'An eraser blocks the flow. It does not light.' },
      ],
      explain: 'In a closed circuit, the bulb turns electrical energy into light.',
    },
    {
      type: 'pick', staar: true, q: 'Tap the safe power for a circuit test.',
      options: [
        { t: 'Battery', emoji: '🔋', correct: true },
        { t: 'Wall outlet', emoji: '🔌', why: 'Wall outlets are never for experiments. The energy is too strong.' },
        { t: 'Power line', emoji: '⚠️', why: 'A power line is dangerous. Use a battery.' },
        { t: 'Lightning', emoji: '⛈️', why: 'Lightning is not a safe test. Use a battery.' },
      ],
      explain: 'Use a battery for circuit tests. Wall outlets are never for experiments.',
    },
    {
      type: 'pick', q: 'Tap the one that blocks heat best.',
      options: [
        { t: 'Oven mitt', emoji: '🧤', correct: true },
        { t: 'Metal spoon', emoji: '🥄', why: 'Metal lets heat flow. The handle gets hot.' },
        { t: 'Steel pan', emoji: '🍳', why: 'A steel pan lets heat through. It gets hot.' },
        { t: 'Copper wire', emoji: '🔶', why: 'Copper lets heat flow. It would get hot.' },
      ],
      explain: 'An oven mitt is a thermal insulator. It blocks heat from the pan.',
    },
  ],

  teachBack: {
    prompt: 'Teach Vespa why a flashlight lights only when the switch closes. Tap the ideas in order.',
    pieces: [
      'A battery pushes electrical energy.',
      'That energy flows only in a complete loop.',
      'A switch closes the loop to turn the light on.',
      'Open the switch and there is a gap.',
      'The bulb changes the energy into light and heat.',
      'The flow is not used up. It keeps going around.',
    ],
    decoys: [
      'One wire from the battery is enough.',
      'The bulb uses up the electricity.',
    ],
  },
};
