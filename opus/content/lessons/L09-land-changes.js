// Lesson 9 - Weathering, Erosion & Deposition.
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

  steps: [
    {
      id: 's1', phase: 'wonder', title: 'The River That Cut a Canyon', shot: 'canyon',
      beats: [
        { cue: 'canyonReset' },
        { say: 'Picture the Grand Canyon. It is about a mile deep.' },
        { say: 'Texas has a canyon too. Santa Elena Canyon, in Big Bend.' },
        { say: 'Here is a model block of rock with a small river on top.', point: 'canyon' },
        { say: 'A river made those giant canyons? Really?', point: 'river' },
        { predict: { q: 'Can a small river carve a giant canyon?', options: [{ t: 'No, a river is too weak' }, { t: 'Yes, if it works for a very long time', correct: true }, { t: 'No, only an earthquake can' }] } },
        { say: 'Let us speed up time and watch.' },
        { cue: 'canyonTime', args: { to: 1, ms: 7000 }, wait: true },
        { verdict: { right: 'You called it! Time is the secret ingredient.', wrong: 'Surprise! A small river can do it with enough time.' } },
        { say: 'Look at the colored stripes. Each one is a layer of rock.' },
        { say: 'But how does a river cut rock? Let us find out.' },
      ],
    },
    {
      id: 's2', phase: 'play', title: 'Ice Cracks Rocks', shot: 'rock',
      beats: [
        { cue: 'canyonReset' },
        { cue: 'rockReset' },
        { say: 'Rock looks super strong. But it has tiny cracks.', point: 'rock' },
        { say: 'Rain fills a crack with water.', point: 'crack' },
        { say: 'Then comes a cold night. The water freezes.' },
        { predict: { q: 'Water freezes inside the crack. What happens to the crack?', options: [{ t: 'It gets wider', correct: true }, { t: 'It gets smaller' }, { t: 'Nothing changes' }] } },
        { say: 'Freeze it, then thaw it, again and again.', cue: 'rockMode' },
        { task: { goal: 'Freeze and thaw the crack until the rock breaks.', event: 'rockBroke', hint: 'Tap Freeze, then Thaw. Do it three times.' } },
        { verdict: { right: 'Yes! The ice pushed the crack wider.', wrong: 'Surprise! The ice pushed the crack wider, again and again.' } },
        { say: 'Ice takes up more room than water. It pushes!' },
        { say: 'Breaking rock into pieces is called weathering.', cue: 'wedShow', args: { n: 1 }, point: 'chunk' },
        { say: 'Roots, wind, and water can weather rock too.' },
        { say: 'The tiny broken pieces are called sediment.' },
        {
          check: {
            type: 'one', q: 'Water freezes in a rock crack. Why does the crack get wider?',
            options: [
              { t: 'Ice takes up more room than water', correct: true },
              { t: 'Ice is heavier than water', why: 'Ice floats, so it is packed looser than water. It takes up more room and pushes.' },
              { t: 'Cold air shrinks the water', why: 'Water does not shrink when it freezes. It swells and pushes the crack open.' },
            ],
            explain: 'Freezing water swells and pushes. After many freezes, the crack grows.',
          },
        },
      ],
    },
    {
      id: 's3', phase: 'play', title: 'Fast Water, Big Rocks', shot: 'flume',
      beats: [
        { cue: 'wedHide' },
        { cue: 'flumeReset' },
        { say: 'Now we have loose pieces. What moves them?' },
        { say: 'Here is a water track with three pieces.', point: 'flume' },
        { say: 'Sand, a pebble, and one big rock.', point: 'bigRock' },
        { predict: { q: 'Fast water or slow water: which carries bigger rocks?', options: [{ t: 'Fast water', correct: true }, { t: 'Slow water' }, { t: 'They carry the same size' }] } },
        { say: 'You control the water speed.', cue: 'flumeMode' },
        { task: { goal: 'Slide the water speed up until the big rock moves.', event: 'speedTested', hint: 'Drag the water speed slider almost all the way right.' } },
        { verdict: { right: 'Yes! Fast water rolled the big rock.', wrong: 'Surprise! Fast water carries bigger rocks than slow water.' } },
        { say: 'Slow water moves only sand. Fast water rolls big rocks.' },
        { say: 'Carrying pieces away is called erosion.', cue: 'wedShow', args: { n: 2 } },
        { say: 'Water does most of it. Wind and ice can too.' },
        { say: 'Weathering breaks. Erosion moves.' },
        {
          check: {
            type: 'one', q: 'Which one is erosion?',
            options: [
              { t: 'A river carrying sand downstream', correct: true },
              { t: 'Ice cracking a rock', why: 'That breaks rock, so it is weathering. Erosion is moving the pieces away.' },
              { t: 'Sand piling up on a beach', why: 'Piling up means the pieces were dropped. Erosion is the carrying part.' },
            ],
            explain: 'Erosion carries pieces away. A river carrying sand is erosion.',
          },
        },
      ],
    },
    {
      id: 's4', phase: 'play', title: 'Carving the Canyon', shot: 'canyon',
      beats: [
        { cue: 'wedHide' },
        { cue: 'canyonReset' },
        { say: 'Back to our canyon block.' },
        { say: 'Every day, the river carries away tiny pieces.', point: 'river' },
        { say: 'Water breaks up the rock, then carries the bits off.' },
        { say: 'The river channel gets a little deeper each year.' },
        { say: 'Slide time forward and watch it change.', cue: 'canyonMode' },
        { task: { goal: 'Slide the years forward to carve the canyon.', event: 'canyonCarved', hint: 'Drag the years slider to the far right.' } },
        { say: 'Look at the walls. Each color is a layer of rock.' },
        { say: 'The deepest layers are the oldest.' },
        { say: 'Real canyons took millions of years to form.' },
        {
          check: {
            type: 'one', q: 'What carved the canyon in our model?',
            options: [
              { t: 'A river carrying pieces away for a long time', correct: true },
              { t: 'One giant flood in a single day', why: 'Floods can move a lot, but a deep canyon takes a very long time.' },
              { t: 'Wind blowing sand from the sky', why: 'Wind changes land too, but in our model the river did the carving.' },
            ],
            explain: 'Tiny changes by the river, over a very long time, carved the canyon.',
          },
        },
      ],
    },
    {
      id: 's5', phase: 'play', title: 'The Drop Zone', shot: 'delta',
      beats: [
        { cue: 'canyonReset' },
        { cue: 'deltaReset' },
        { say: 'The pieces ride the river all the way to the Gulf.', point: 'mouth' },
        { say: 'The Brazos River does this on the Texas coast.' },
        { say: 'At the sea, the river slows way down.', point: 'gulf' },
        { predict: { q: 'The river slows down. What happens to the sand it carries?', options: [{ t: 'It drops to the bottom', correct: true }, { t: 'It floats along forever' }, { t: 'It turns into water' }] } },
        { say: 'Let the river flow and watch.', cue: 'deltaMode' },
        { task: { goal: 'Let the river flow until a delta forms.', event: 'deltaBuilt', hint: 'Tap Let the river flow, then wait.' } },
        { verdict: { right: 'You called it! Slow water drops its sand.', wrong: 'Surprise! Slow water cannot carry sand, so it drops it.' } },
        { say: 'Dropping pieces in a new place is called deposition.', cue: 'wedShow', args: { n: 3 }, point: 'delta' },
        { say: 'Piles of sand build a fan of new land.' },
        { say: 'That fan is called a delta.' },
        {
          check: {
            type: 'one', q: 'Why does a river drop its sand at the sea?',
            options: [
              { t: 'The water slows down', correct: true },
              { t: 'The sand gets too hot', why: 'Heat does not drop the sand. Slow water just cannot carry it.' },
              { t: 'The sea is salty', why: 'Salt does not drop the sand. Slower water cannot hold the pieces up.' },
            ],
            explain: 'Slow water cannot carry sand. The sand drops, and a delta grows.',
          },
        },
      ],
    },
    {
      id: 's6', phase: 'play', title: 'Wind Builds Dunes', shot: 'dune',
      beats: [
        { cue: 'deltaStop' },
        { cue: 'duneReset' },
        { say: 'Water is not the only land-changer.' },
        { say: 'Think of a windy day on a Galveston beach.', point: 'dune' },
        { say: 'Wind blows over the sand again and again.' },
        { predict: { q: 'Wind blows over sand for a long time. What does it build?', options: [{ t: 'Sand dunes', correct: true }, { t: 'Deep canyons' }, { t: 'Tall mountains' }] } },
        { say: 'Time for you to be the wind.', cue: 'duneMode' },
        { task: { goal: 'Blow the wind until a dune forms.', event: 'duneBuilt', hint: 'Tap Blow wind and wait.' } },
        { verdict: { right: 'Yes! Wind builds sand dunes.', wrong: 'Surprise! Wind piles sand into dunes.' } },
        { say: 'Wind lifts sand and carries it. That is erosion.' },
        { say: 'When the wind slows, it drops the sand. That is deposition.' },
        { say: 'Pile after pile makes a dune.' },
        {
          check: {
            type: 'one', q: 'Which one is built by wind?',
            options: [
              { t: 'A sand dune', correct: true },
              { t: 'A river delta', why: 'Deltas are built by rivers dropping sand where they reach the sea.' },
              { t: 'A canyon with layered walls', why: 'In our model, a river cut the canyon. Wind mostly builds dunes.' },
            ],
            explain: 'Wind carries sand and drops it in piles. The piles are dunes.',
          },
        },
      ],
    },
    {
      id: 's7', phase: 'why', title: 'Break, Move, Drop', shot: 'wide',
      beats: [
        { cue: 'duneReset' },
        { cue: 'wedHide' },
        { say: 'Let us put it all together.' },
        { say: 'First, weathering breaks rock into pieces.', shot: 'rock', cue: 'wedShow', args: { n: 1 } },
        { say: 'Next, erosion moves the pieces away.', shot: 'flume', cue: 'wedShow', args: { n: 2 } },
        { say: 'Last, deposition drops them in a new place.', shot: 'delta', cue: 'wedShow', args: { n: 3 } },
        { say: 'Water, wind, and ice can all do these jobs.', shot: 'wide' },
        { say: 'Break it, move it, drop it.' },
        {
          check: {
            type: 'one', q: 'Sand is dropped where a river meets the sea. What is this?',
            options: [
              { t: 'Deposition', correct: true },
              { t: 'Weathering', why: 'Weathering breaks rock into pieces. Here the pieces are being dropped.' },
              { t: 'Erosion', why: 'Erosion carries pieces away. Dropping them in a new place is deposition.' },
            ],
            explain: 'Dropping pieces in a new place is deposition.',
          },
        },
        {
          check: {
            type: 'sort', q: 'Sort each job: weathering, erosion, or deposition?',
            groups: ['Weathering', 'Erosion', 'Deposition'],
            items: [{ t: 'Ice cracks a boulder', g: 0 }, { t: 'A river carries sand', g: 1 }, { t: 'A dune grows', g: 2 }, { t: 'Roots split a rock', g: 0 }],
            explain: 'Weathering breaks. Erosion moves. Deposition drops.',
          },
        },
      ],
    },
    {
      id: 's8', phase: 'why', title: 'Slow, Slow, Slow', shot: 'canyon',
      beats: [
        { cue: 'wedHide' },
        { cue: 'canyonReset' },
        { say: 'Most of these changes are very slow.' },
        { say: 'A river may cut only a tiny bit each year.' },
        { cue: 'canyonTime', args: { to: 1, ms: 6000 }, wait: true },
        { say: 'Tiny changes, over a very long time, make huge shapes.' },
        { say: 'Sometimes it is fast. A big flood can move lots of mud in one day.' },
        { say: 'But a deep canyon still takes a very long time.' },
        {
          check: {
            type: 'one', q: 'Which change can happen the fastest?',
            options: [
              { t: 'A flood washing away soil', correct: true },
              { t: 'A river cutting a canyon', why: 'Canyons take a very long time, often millions of years.' },
              { t: 'A dune slowly growing', why: 'Dunes grow slowly over many seasons. A flood can move soil in hours.' },
            ],
            explain: 'A flood can move soil in hours. Canyons and dunes take much longer.',
          },
        },
      ],
    },
    {
      id: 's9', phase: 'useit', title: 'Save the Beach', shot: 'dune',
      beats: [
        { cue: 'canyonReset' },
        { say: 'Galveston Island has a problem. Waves wash sand away.', point: 'dune' },
        { say: 'That is erosion, right on the beach.' },
        { say: 'So workers pump new sand onto the beach.' },
        {
          check: {
            type: 'one', q: 'Why do workers pump new sand onto Galveston beaches?',
            options: [
              { t: 'Waves erode sand away, so they replace it', correct: true },
              { t: 'Sand grows back from the water', why: 'Sand does not grow. Waves carry it off, so workers bring more.' },
              { t: 'Sand melts in the hot sun', why: 'Sand does not melt in the sun. Waves wash it away.' },
            ],
            explain: 'Waves carry sand away. That is erosion, so workers replace it.',
          },
        },
        { say: 'Farmers have a puzzle too. Rain washes soil off slopes.' },
        { say: 'So they plant grass. The roots hold the soil.' },
        {
          check: {
            type: 'one', q: 'Why do farmers plant grass on a slope?',
            options: [
              { t: 'Roots hold the soil so rain cannot erode it', correct: true },
              { t: 'Grass makes the rain stop falling', why: 'Grass cannot stop rain. Its roots just hold the soil in place.' },
              { t: 'Grass turns soil into rock', why: 'Grass does not make rock. The roots keep the soil from washing away.' },
            ],
            explain: 'Roots grip the soil. That slows erosion.',
          },
        },
        { say: 'You now know how land is broken, moved, and dropped.' },
        { say: 'Weathering breaks. Erosion moves. Deposition drops.' },
      ],
    },
  ],

  vocab: [
    { word: 'Weathering', emoji: '🧊', means: 'Rock slowly breaking into smaller pieces.', example: 'Ice in a crack can split a big rock.', test: 'Weathering is the breaking down of rock into smaller pieces.' },
    { word: 'Erosion', emoji: '🌊', means: 'Carrying broken pieces away, by water, wind, or ice.', example: 'A river carries sand and mud downstream.', test: 'Erosion is the movement of weathered pieces by water, wind, or ice.' },
    { word: 'Deposition', emoji: '⛰️', means: 'Dropping the pieces in a new place.', example: 'A river drops sand where it reaches the Gulf.', test: 'Deposition is when eroded material is dropped in a new place.' },
    { word: 'Sediment', emoji: '🪨', means: 'Tiny pieces of broken rock, like sand and mud.', example: 'Mud at the bottom of a creek is sediment.', test: 'Sediment is small pieces of rock and soil moved by erosion.' },
    { word: 'Delta', emoji: '🏝️', means: 'A fan of new land built where a river drops its sand.', example: 'The Mississippi River has a huge delta in the Gulf.', test: 'A delta is land formed by deposition where a river meets a larger body of water.' },
    { word: 'Canyon', emoji: '🏜️', means: 'A deep valley with steep sides, cut by a river.', example: 'Santa Elena Canyon in Big Bend was cut by the Rio Grande.', test: 'A canyon is a deep valley carved by moving water over a very long time.' },
  ],

  quiz: [
    {
      type: 'one', staar: true, q: 'Water freezes in a crack in a rock. What will most likely happen?',
      options: [
        { t: 'The crack will get wider', correct: true },
        { t: 'The crack will close up', why: 'Freezing water swells and pushes. It opens the crack instead of closing it.' },
        { t: 'The rock will turn into sand right away', why: 'Weathering is slow. It takes many freezes to break rock.' },
        { t: 'Nothing will change', why: 'Ice takes up more room than water. It pushes the crack wider.' },
      ],
      explain: 'Ice takes up more room than water. Each freeze pushes the crack wider.',
    },
    {
      type: 'one', q: 'What is weathering?',
      options: [
        { t: 'Rock slowly breaking into smaller pieces', correct: true },
        { t: 'Pieces being carried away', why: 'That is erosion. Weathering is the breaking part.' },
        { t: 'Pieces being dropped in a new place', why: 'That is deposition. Weathering is the breaking part.' },
        { t: 'Rain falling from clouds', why: 'That is precipitation. Weathering breaks rock.' },
      ],
      explain: 'Weathering breaks rock into smaller pieces.',
    },
    {
      type: 'one', q: 'What is erosion?',
      options: [
        { t: 'Carrying pieces of rock away', correct: true },
        { t: 'Breaking rock into pieces', why: 'That is weathering. Erosion is the moving part.' },
        { t: 'Dropping pieces in a new place', why: 'That is deposition. Erosion is the carrying part.' },
        { t: 'Making new rock from lava', why: 'That is something else. Erosion moves pieces that are already broken.' },
      ],
      explain: 'Erosion carries pieces away by water, wind, or ice.',
    },
    {
      type: 'one', q: 'What is deposition?',
      options: [
        { t: 'Dropping pieces of rock in a new place', correct: true },
        { t: 'Breaking rock into pieces', why: 'That is weathering. Deposition is the dropping part.' },
        { t: 'Carrying pieces of rock away', why: 'That is erosion. Deposition is the dropping part.' },
        { t: 'Pushing rock up into mountains', why: 'That is something else. Deposition drops pieces that were carried.' },
      ],
      explain: 'Deposition drops pieces in a new place.',
    },
    {
      type: 'one', staar: true, q: 'A river slows down and sand sinks to the bottom. Which process is this?',
      options: [
        { t: 'Deposition', correct: true },
        { t: 'Weathering', why: 'Weathering breaks rock. Here, sand is being dropped.' },
        { t: 'Erosion', why: 'Erosion carries pieces away. Sinking and settling is deposition.' },
        { t: 'Evaporation', why: 'Evaporation turns liquid into vapor. It has nothing to do with sand settling.' },
      ],
      explain: 'The slow water dropped its sand. Dropping pieces is deposition.',
    },
    {
      type: 'one', staar: true, q: 'Which one is an example of weathering?',
      options: [
        { t: 'Ice cracks a rock into smaller pieces', correct: true },
        { t: 'A river carries mud downstream', why: 'That is erosion. It moves pieces, but does not break rock.' },
        { t: 'Wind piles sand into a dune', why: 'That is deposition. Weathering is breaking.' },
        { t: 'A delta grows at a river mouth', why: 'That is deposition. Weathering is breaking.' },
      ],
      explain: 'Ice breaks rock into pieces. Breaking rock is weathering.',
    },
    {
      type: 'one', staar: true, q: 'Which one is an example of erosion?',
      options: [
        { t: 'Rain washes soil down a hill', correct: true },
        { t: 'A root splits a rock', why: 'That breaks rock, so it is weathering.' },
        { t: 'Sand drops to the sea floor', why: 'Dropping pieces is deposition.' },
        { t: 'A rock cracks in the cold', why: 'Cracking is weathering. Erosion is moving.' },
      ],
      explain: 'Rain carries soil away. Carrying pieces away is erosion.',
    },
    {
      type: 'one', q: 'What happens to a river\'s sand when the river slows down?',
      options: [
        { t: 'The sand drops', correct: true },
        { t: 'The sand floats faster', why: 'Slow water has less push. It cannot carry sand as well.' },
        { t: 'The sand turns to water', why: 'Sand never turns to water. It just sinks.' },
        { t: 'The sand jumps uphill', why: 'Sand does not move uphill. Slow water drops it.' },
      ],
      explain: 'Slow water cannot carry sand, so the sand drops.',
    },
    {
      type: 'one', staar: true, q: 'Which landform is built by deposition?',
      options: [
        { t: 'A river delta', correct: true },
        { t: 'A canyon', why: 'A canyon is carved by erosion. It is not built by dropping pieces.' },
        { t: 'A crack in a rock', why: 'A crack comes from weathering. Deposition builds up land.' },
        { t: 'A cave in a cliff', why: 'A cave is made when rock is worn away, not when pieces are dropped.' },
      ],
      explain: 'A delta is built when a river drops its sand. That is deposition.',
    },
    {
      type: 'one', staar: true, q: 'Which landform was most likely carved by moving water over a very long time?',
      options: [
        { t: 'A canyon', correct: true },
        { t: 'A sand dune', why: 'Dunes are built by wind dropping sand. They are not carved by water.' },
        { t: 'A delta', why: 'A delta is built up by dropped sand. It is not carved out.' },
        { t: 'A pile of pebbles', why: 'A pile is made when pieces are dropped, not carved.' },
      ],
      explain: 'A river wore away the rock for a very long time and carved the canyon.',
    },
    {
      type: 'one', q: 'What can fast water carry that slow water cannot?',
      options: [
        { t: 'Bigger rocks', correct: true },
        { t: 'Nothing at all', why: 'Fast water can carry more. Fast water has more push.' },
        { t: 'Only tiny dust', why: 'Slow water can carry tiny bits. Fast water carries bigger rocks too.' },
        { t: 'Only things that float', why: 'Fast water can roll rocks along the bottom. They do not need to float.' },
      ],
      explain: 'Fast water has more push. It can carry bigger rocks.',
    },
    {
      type: 'one', staar: true, q: 'After a storm, a pile of sand sits at the bottom of a hill. What happened to the sand?',
      options: [
        { t: 'Water eroded it from the hill and dropped it below', correct: true },
        { t: 'The hill grew sand by itself', why: 'Hills do not grow sand. Water carried it down from above.' },
        { t: 'The sand weathered into rock', why: 'Weathering breaks rock. It does not make rock from sand.' },
        { t: 'The sand fell from the clouds', why: 'Sand does not fall from clouds. Rain washed it down the hill.' },
      ],
      explain: 'Rain carried sand down the hill. That is erosion. Then it was dropped. That is deposition.',
    },
    {
      type: 'one', staar: true, q: 'Which one most likely builds a sand dune?',
      options: [
        { t: 'Wind', correct: true },
        { t: 'A glacier', why: 'Glaciers move rock and ice. Dunes come from wind dropping sand.' },
        { t: 'A volcano', why: 'Volcanoes make new rock. Wind builds dunes from sand.' },
        { t: 'Earthquakes', why: 'Earthquakes shake the ground. They do not pile sand into dunes.' },
      ],
      explain: 'Wind carries sand and drops it in piles. The piles are dunes.',
    },
    {
      type: 'one', q: 'Why does it take so long for a river to carve a canyon?',
      options: [
        { t: 'Each change is tiny, so it adds up very slowly', correct: true },
        { t: 'Rivers only flow one day a year', why: 'Rivers flow all the time. The cutting is just very small each year.' },
        { t: 'Rock is soft like mud', why: 'Rock is hard. That is why wearing it away takes so long.' },
        { t: 'The Sun holds the river back', why: 'The Sun does not hold the river back. The cutting is just very slow.' },
      ],
      explain: 'Tiny changes over millions of years carve a deep canyon.',
    },
    {
      type: 'one', staar: true, q: 'Why do workers pump new sand onto Galveston beaches?',
      options: [
        { t: 'Waves erode the beach sand away', correct: true },
        { t: 'Sand shrinks in the sun', why: 'Sand does not shrink. Waves carry it away.' },
        { t: 'The sea makes the sand too heavy', why: 'The sea does not make sand heavy. Waves wash it off the beach.' },
        { t: 'The wind turns sand into rock', why: 'Wind does not make rock. Waves carry sand away from the beach.' },
      ],
      explain: 'Waves carry beach sand away. That is erosion, so workers add more sand.',
    },
    {
      type: 'one', q: 'Why do farmers plant grass on slopes?',
      options: [
        { t: 'The roots hold soil in place', correct: true },
        { t: 'Grass stops the rain', why: 'Grass cannot stop rain. Roots just hold the soil.' },
        { t: 'Grass breaks up the rocks', why: 'Grass does not break rocks. Its roots keep soil from washing away.' },
        { t: 'Grass makes the soil fast-moving', why: 'Grass does the opposite. It slows down erosion.' },
      ],
      explain: 'Roots hold soil together, so rain cannot wash it away so easily.',
    },
    {
      type: 'two', staar: true, q: 'Pick TWO examples of weathering.',
      options: [
        { t: 'Ice cracks a boulder', correct: true },
        { t: 'Plant roots split a rock', correct: true },
        { t: 'A river carries sand to the sea', why: 'Carrying pieces away is erosion, not weathering.' },
        { t: 'Wind drops sand into a dune', why: 'Dropping pieces is deposition, not weathering.' },
      ],
      explain: 'Ice and roots break rock into smaller pieces. That is weathering.',
    },
    {
      type: 'two', q: 'Pick TWO things that can carry pieces of rock away.',
      options: [
        { t: 'Running water', correct: true },
        { t: 'Strong wind', correct: true },
        { t: 'A rock sitting still', why: 'A rock that sits still is not carrying anything.' },
        { t: 'A shadow', why: 'A shadow has no push. It cannot carry anything.' },
      ],
      explain: 'Water and wind both push pieces along. That is erosion.',
    },
    {
      type: 'two', staar: true, q: 'Pick TWO true statements about deposition.',
      options: [
        { t: 'Pieces are dropped in a new place', correct: true },
        { t: 'It can build a delta or a dune', correct: true },
        { t: 'It breaks rock into pieces', why: 'That is weathering. Deposition drops pieces.' },
        { t: 'It carries pieces away', why: 'That is erosion. Deposition drops pieces.' },
      ],
      explain: 'Deposition drops pieces. It builds up deltas and dunes.',
    },
    {
      type: 'sort', staar: true, q: 'Sort each example: weathering, erosion, or deposition?',
      groups: ['Weathering', 'Erosion', 'Deposition'],
      items: [{ t: 'Ice splits a rock', g: 0 }, { t: 'Roots crack a boulder', g: 0 }, { t: 'A river carries sand', g: 1 }, { t: 'Wind blows sand away', g: 1 }, { t: 'A delta forms at a river mouth', g: 2 }, { t: 'Sand piles into a dune', g: 2 }],
      explain: 'Weathering breaks. Erosion moves. Deposition drops.',
    },
    {
      type: 'sort', q: 'Sort each landform by what made it.',
      groups: ['Water', 'Wind', 'Ice'],
      items: [{ t: 'Canyon', g: 0 }, { t: 'River delta', g: 0 }, { t: 'Sand dune', g: 1 }, { t: 'Rock worn smooth by blowing sand', g: 1 }, { t: 'Boulder split by a frozen crack', g: 2 }, { t: 'Rock scraped by a glacier', g: 2 }],
      explain: 'Water makes canyons and deltas. Wind makes dunes. Ice splits and scrapes rock.',
    },
    {
      type: 'sort', staar: true, q: 'Sort each change: slow or fast?',
      groups: ['Slow', 'Fast'],
      items: [{ t: 'A river carves a canyon', g: 0 }, { t: 'A dune creeps along a beach', g: 0 }, { t: 'A crack widens over many winters', g: 0 }, { t: 'A flood washes away soil', g: 1 }, { t: 'A landslide in a heavy storm', g: 1 }, { t: 'Storm waves wash away a beach', g: 1 }],
      explain: 'Most changes are slow. Floods, landslides, and storms can change land fast.',
    },
    {
      type: 'order', staar: true, q: 'Put the steps of canyon forming in order.',
      items: ['Water flows over rock', 'Water breaks off small pieces of rock', 'The river carries the pieces away', 'Over a very long time the channel gets deeper', 'A canyon forms'],
      explain: 'Tiny changes repeat for a very long time. That carves a canyon.',
    },
    {
      type: 'order', q: 'Put these in order: ice breaks a rock.',
      items: ['Rain fills a crack with water', 'A cold night freezes the water', 'The ice pushes the crack wider', 'The ice melts in the day', 'After many freezes, a piece breaks off'],
      explain: 'Freeze and thaw repeats. Each time, the crack grows a little.',
    },
    {
      type: 'order', staar: true, q: 'Put the sand\'s journey in order.',
      items: ['A rock is broken into sand', 'Rain washes the sand into a river', 'The river carries the sand to the sea', 'The river slows down', 'The sand drops and builds a delta'],
      explain: 'Weathering breaks. Erosion carries. Deposition drops the sand.',
    },
    {
      type: 'pick', staar: true, q: 'Tap the picture that shows deposition.',
      options: [
        { t: 'Sand piling up at a river mouth', emoji: '🏝️', correct: true },
        { t: 'Ice cracking a rock', emoji: '🧊', why: 'That is weathering. Deposition is dropping pieces in a new place.' },
        { t: 'A river carving a canyon', emoji: '🏞️', why: 'That is erosion at work. Deposition drops pieces.' },
        { t: 'Rain washing soil away', emoji: '🌧️', why: 'Washing soil away is erosion. Deposition drops the soil.' },
      ],
      explain: 'Sand piling up in a new place is deposition.',
    },
    {
      type: 'pick', q: 'Tap the picture that shows weathering.',
      options: [
        { t: 'Roots cracking a rock', emoji: '🌱', correct: true },
        { t: 'A river carrying mud', emoji: '🌊', why: 'Carrying mud is erosion. Weathering breaks rock.' },
        { t: 'A dune growing on a beach', emoji: '🏖️', why: 'A dune grows by deposition. Weathering breaks rock.' },
        { t: 'A delta in the Gulf', emoji: '🏝️', why: 'A delta is built by deposition. Weathering breaks rock.' },
      ],
      explain: 'Roots pushing into cracks break rock into pieces. That is weathering.',
    },
    {
      type: 'pick', q: 'Tap the picture that shows erosion.',
      options: [
        { t: 'A flooded river carrying mud', emoji: '🌊', correct: true },
        { t: 'A crack in a frozen rock', emoji: '🧊', why: 'That is weathering. Erosion carries pieces away.' },
        { t: 'A new sand dune', emoji: '🏖️', why: 'A new dune is deposition. Erosion carries pieces away.' },
        { t: 'A fan of new land at the sea', emoji: '🏝️', why: 'A delta is deposition. Erosion carries pieces away.' },
      ],
      explain: 'A flooded river carries mud away. Carrying pieces away is erosion.',
    },
  ],

  teachBack: {
    prompt: 'Teach Vespa how a river carves a canyon. Tap the ideas in order.',
    pieces: [
      'Water, ice, and roots break rock into small pieces. That is weathering.',
      'The river carries the pieces away. That is erosion.',
      'Fast water carries bigger pieces than slow water.',
      'When the river slows at the sea, it drops the pieces. That is deposition.',
      'Tiny changes over a very long time carve a huge canyon.',
    ],
    decoys: ['A canyon forms in one day when a river gets angry.', 'Erosion is when rock breaks into smaller pieces.'],
  },
};
