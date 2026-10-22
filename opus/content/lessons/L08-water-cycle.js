// Lesson 8 - The Water Cycle, Weather & Climate.
export default {
  id: 'L08', num: 8, unit: 3, unitTitle: 'Earth & Space',
  title: "Water's Never-Ending Trip",
  testTitle: 'The Water Cycle, Weather & Climate',
  teks: ['4.10A', '4.10C'],
  icon: '🌧️', color: '#60a5fa',
  bigQuestion: 'Could the rain on your head today have once been in Galveston Bay?',
  ladder: [
    'Water can be a liquid, a solid (ice), or a gas you cannot see (water vapor).',
    "The Sun's heat turns liquid water into vapor that rises. That is evaporation.",
    'High up, it cools and turns back into tiny drops that make clouds. That is condensation.',
    'When drops get heavy, they fall as rain, sleet, snow, or hail. That is precipitation.',
    'Water runs back to bays and oceans, and the trip starts again.',
    'Weather is what the air is doing today. Climate is the usual pattern over many years.',
  ],

  steps: [
    {
      id: 's1', phase: 'wonder', title: 'The Vanishing Puddle', shot: 'puddle',
      beats: [
        { cue: 'puddleReset' },
        { say: 'It is a hot August day in Dickinson.' },
        { say: 'After a storm, two puddles sit on the playground.', point: 'puddle' },
        { say: 'This one sits in bright sunshine.', point: 'sunPuddle' },
        { say: 'This one sits in the cool shade.', point: 'shadePuddle' },
        { predict: { q: 'Which puddle will dry up first?', options: [{ t: 'The sunny puddle', correct: true }, { t: 'The shady puddle' }, { t: 'Both dry at the same time' }] } },
        { say: 'Let us watch from morning to afternoon.' },
        { cue: 'puddleDry', wait: true },
        { verdict: { right: 'You called it! The sunny puddle dries first.', wrong: 'Surprise! The sunny puddle dries first. The shady one stays wet.' } },
        { say: 'The water did not soak in. It sits on hard blacktop.' },
        { say: 'So where did the puddle go? Let us follow the water.' },
      ],
    },
    {
      id: 's2', phase: 'why', title: 'Water in Disguise', shot: 'puddle',
      beats: [
        { cue: 'puddleReset' },
        { say: 'Water is a shape-changer. It comes in three forms.' },
        { say: 'Liquid is what you drink. Solid is ice. Brr!' },
        { say: 'The third form is a gas you cannot see.' },
        { say: 'That invisible gas is called water vapor.' },
        { say: 'The Sun warms the puddle. Tiny bits of water zoom off.', cue: 'puddleDry', point: 'sunPuddle' },
        { say: 'Real vapor is invisible. These white dots are just pretend.' },
        { say: 'Liquid water turning into vapor is called evaporation.' },
        { say: 'Does a puddle need to boil first? Nope!' },
        { say: 'A puddle never gets that hot. It still dries up.' },
        {
          check: {
            type: 'one', q: 'A puddle dries up on a warm day. It never boiled. What happened?',
            options: [
              { t: 'It evaporated slowly into water vapor', correct: true },
              { t: 'It had to boil to dry up', why: 'Water does not need to boil. It evaporates slowly from the top, even when it is cool.' },
              { t: 'The blacktop drank all of it', why: 'Hard blacktop does not soak up water. The water changed into vapor and rose up.' },
            ],
            explain: 'Water evaporates slowly, even without boiling. The puddle turned into vapor.',
          },
        },
      ],
    },
    {
      id: 's3', phase: 'why', title: 'The Cold Can Surprise', shot: 'can',
      beats: [
        { cue: 'puddleReset' },
        { cue: 'canReset' },
        { say: 'Picture a cold soda can on a hot Texas day.', point: 'can' },
        { say: 'The can is sealed tight. Nothing leaks out.' },
        { predict: { q: 'Soon the outside gets wet. Where do the drops come from?', options: [{ t: 'They leak from inside the can' }, { t: 'Water vapor in the air', correct: true }, { t: 'The can makes water by itself' }] } },
        { say: 'Let us watch the air around the can.' },
        { cue: 'canChill', wait: true },
        { verdict: { right: 'You called it! The drops come from the air.', wrong: 'Surprise! The drops come from the air, not from inside.' } },
        { say: 'Air always has some water vapor in it. You cannot see it.' },
        { say: 'The cold can cools the air touching it.' },
        { say: 'Cooled vapor turns back into tiny drops of liquid.' },
        { say: 'Vapor turning into liquid is called condensation.' },
        {
          check: {
            type: 'one', q: 'Which one is condensation?',
            options: [
              { t: 'Drops forming on a cold glass of lemonade', correct: true },
              { t: 'A puddle drying in the sun', why: 'That is evaporation. Liquid turns into vapor. Condensation goes the other way.' },
              { t: 'Ice melting into water', why: 'Melting is solid turning into liquid. Condensation is vapor turning into liquid.' },
            ],
            explain: 'Vapor touched the cold glass and turned back into liquid drops.',
          },
        },
      ],
    },
    {
      id: 's4', phase: 'play', title: 'Make a Cloud', shot: 'bay',
      beats: [
        { cue: 'canReset' },
        { cue: 'dioramaReset' },
        { say: 'Now let us build the whole trip in one model.' },
        { say: 'This is Galveston Bay, with Dickinson right beside it.', point: 'bay' },
        { say: 'Up in the sky shines the Sun.', point: 'sunSource' },
        { predict: { q: 'What gives the water cycle its power?', options: [{ t: 'The Sun', correct: true }, { t: 'The wind' }, { t: 'The Moon' }] } },
        { say: 'Slide the Sun power up and watch the bay.', cue: 'sunMode' },
        { task: { goal: 'Turn up the Sun and make a cloud.', event: 'cloudMade', hint: 'Drag the Sun power slider to the right.' } },
        { verdict: { right: 'You called it! The Sun powers everything.', wrong: 'Surprise! The Sun powers it all. Its heat lifts the water.' } },
        { say: 'Sun heat turned bay water into vapor. It rose up.', cue: 'cloudNote', point: 'cloud' },
        { say: 'High up, the air is cold. The vapor condenses.' },
        { say: 'It turns into tiny drops. Millions of drops make a cloud.' },
        { say: 'Careful! A cloud is not steam or vapor.' },
        { say: 'Vapor is invisible. Clouds are tiny drops of water, or bits of ice.' },
        {
          check: {
            type: 'one', q: 'What is a cloud made of?',
            options: [
              { t: 'Tiny drops of liquid water or bits of ice', correct: true },
              { t: 'Water vapor, the invisible gas', why: 'Vapor is invisible, but you can see clouds. Clouds are made of tiny drops.' },
              { t: 'Steam from the ocean', why: 'Steam is hot vapor. Clouds are tiny drops of water, not steam.' },
            ],
            explain: 'Clouds are tiny drops of liquid water or bits of ice, not vapor.',
          },
        },
      ],
    },
    {
      id: 's5', phase: 'play', title: 'Make It Rain', shot: 'sky',
      beats: [
        { cue: 'rainReset' },
        { say: 'This cloud is small. Let us help it grow.', point: 'cloud' },
        { say: 'Tiny drops bump together and get bigger.' },
        { say: 'Soon they are too heavy to float.' },
        { say: 'Turn the Sun back up. Keep going until it rains.', cue: 'rainMode' },
        { task: { goal: 'Keep the Sun on until it rains.', event: 'rained', hint: 'Tap Full sun and wait for the cloud to get dark.' } },
        { say: 'Rain! Water falling from clouds is precipitation.', cue: 'tag', args: { n: 3 } },
        { say: 'It can fall as rain, sleet, snow, or hail.' },
        { say: 'Now watch the blue stream on the hill.', shot: 'bay', point: 'stream' },
        { say: 'Rain runs downhill. That is called runoff.', cue: 'tag', args: { n: 4 } },
        { say: 'It runs back into Galveston Bay.', point: 'bay' },
        { say: 'Then the Sun lifts it up again!' },
        {
          check: {
            type: 'one', q: 'Which one is precipitation?',
            options: [
              { t: 'Snow falling from a cloud', correct: true },
              { t: 'Vapor rising from a puddle', why: 'That is evaporation. Precipitation is water falling from clouds.' },
              { t: 'Drops on a cold can', why: 'Those drops are condensation. Precipitation falls from clouds.' },
            ],
            explain: 'Rain, sleet, snow, and hail all fall from clouds. That is precipitation.',
          },
        },
      ],
    },
    {
      id: 's6', phase: 'play', title: 'Tap the Trip', shot: 'bay',
      beats: [
        { cue: 'dioramaReset' },
        { say: 'Let us see the whole trip from start to end.' },
        { say: 'Watch the four steps glow, one by one.' },
        { cue: 'cycleDemo', wait: true },
        { say: 'Now you try. Tap the glowing numbers in order.', cue: 'cycleMode' },
        { task: { goal: 'Tap each step in order, from 1 to 4.', event: 'cycleTapped', hint: 'Start with number 1 over the bay.' } },
        { say: 'Evaporation, condensation, precipitation, runoff.' },
        { say: 'Then the Sun starts it all over again.' },
        { say: 'That is why we call it a cycle. It goes around.' },
        { say: 'The same water goes around and around.' },
        { say: 'So yes, rain on your head could once have been bay water.' },
        {
          check: {
            type: 'one', q: 'Water vapor rises high and cools. What happens next?',
            options: [
              { t: 'It condenses into tiny drops that form clouds', correct: true },
              { t: 'It falls right away as rain', why: 'First it condenses into tiny drops. Drops must grow heavy before they fall.' },
              { t: 'It turns into ice on the ground', why: 'Vapor turns into drops up in the air. It does not become ice on the ground.' },
            ],
            explain: 'Cooled vapor condenses into tiny drops. Many drops make a cloud.',
          },
        },
      ],
    },
    {
      id: 's7', phase: 'play', title: 'Weather: Today', shot: 'weather',
      beats: [
        { cue: 'dioramaReset' },
        { cue: 'weatherReset' },
        { say: 'Look out the window. Hot? Rainy? Windy?' },
        { say: 'What the air is doing right now is called weather.' },
        { say: 'A thermometer tells us how hot it is.', point: 'therm' },
        { say: 'A rain gauge catches the rain.', point: 'gauge' },
        { say: 'Let us check the weather for three days.', cue: 'weatherMode' },
        { task: { goal: 'Tap Next day three times to check the weather.', event: 'weatherChecked', hint: 'Tap the Next day button in the tool tray.' } },
        { say: 'Monday was sunny. Tuesday was stormy.' },
        { say: 'Weather can change a lot from day to day.' },
        { say: 'Sometimes it changes in one afternoon!' },
        {
          check: {
            type: 'one', q: 'Which tool measures how hot the air is today?',
            options: [
              { t: 'A thermometer', correct: true },
              { t: 'A rain gauge', why: 'A rain gauge measures how much rain fell. A thermometer measures heat.' },
              { t: 'A ruler', why: 'A ruler measures length. A thermometer measures how hot it is.' },
            ],
            explain: 'A thermometer measures temperature. A rain gauge measures rain.',
          },
        },
      ],
    },
    {
      id: 's8', phase: 'play', title: 'Climate: The Long Pattern', shot: 'climate',
      beats: [
        { cue: 'weatherReset' },
        { cue: 'climateReset' },
        { say: 'Here is a puzzle. It rained today in Dickinson.', point: 'board' },
        { predict: { q: 'Does one rainy day tell us the climate?', options: [{ t: 'Yes, now we know the climate' }, { t: 'No, one day is just weather', correct: true }, { t: 'Yes, but only for summer' }] } },
        { say: 'To find the usual pattern, scientists count many years.' },
        { say: 'About 30 years of weather. Let us add up the years.', cue: 'climateMode' },
        { task: { goal: 'Tap Add 10 years three times.', event: 'climateBuilt', hint: 'Tap the Add 10 years button until it says 30.' } },
        { verdict: { right: 'Yes! One rainy day is weather, not climate.', wrong: 'Surprise! One rainy day is weather. Climate needs many years.' } },
        { say: 'Now we see the pattern. Summers are hot. Winters are mild.', point: 'board' },
        { say: 'It rains in every month here.' },
        { say: 'That long-term pattern is called climate.' },
        { say: 'Weather is today. Climate is the pattern over about 30 years.' },
        {
          check: {
            type: 'one', q: 'Which sentence is about climate?',
            options: [
              { t: 'Dickinson has hot, humid summers.', correct: true },
              { t: 'It is raining in Dickinson right now.', why: 'Right now is weather. Climate is the usual pattern over many years.' },
              { t: 'Tomorrow will be windy.', why: 'Tomorrow is a weather forecast. Climate is the long-term pattern.' },
            ],
            explain: 'Hot, humid summers happen year after year. That is climate.',
          },
        },
      ],
    },
    {
      id: 's9', phase: 'useit', title: 'Pack for Your Cousin', shot: 'climate',
      beats: [
        { cue: 'climateFull' },
        { say: 'Your cousin is moving to Dickinson from a cold place.' },
        { say: 'She asks what clothes to buy for the whole year.', point: 'board' },
        { say: 'Climate tells the usual pattern.' },
        { say: 'Summers are hot and humid. Winters are mild.' },
        {
          check: {
            type: 'one', q: 'Your cousin asks what clothes to buy for the whole year. What helps most?',
            options: [
              { t: 'The climate of Dickinson', correct: true },
              { t: "Today's weather only", why: 'One day of weather cannot plan a whole year. Climate shows the usual pattern.' },
              { t: 'The weather from one year ago', why: 'One old day is just weather. You need the pattern over many years.' },
            ],
            explain: 'Climate is the long-term pattern. It helps plan for the whole year.',
          },
        },
        { say: 'So she packs shorts, sunscreen, and one light jacket.' },
        { say: 'Now it is the day of her visit.' },
        {
          check: {
            type: 'one', q: 'On visit day, how can she tell if she needs an umbrella?',
            options: [
              { t: "Check that day's weather forecast", correct: true },
              { t: 'Look at the 30-year climate chart', why: 'The chart shows the usual pattern. It cannot tell you about one day.' },
              { t: 'Ask what the water cycle is', why: 'The water cycle is how water moves. A forecast tells what the air will do.' },
            ],
            explain: 'A forecast tells about one day. That is weather.',
          },
        },
        { say: 'Use climate for the big picture. Use weather for the day.' },
        { say: 'And all of it runs on the Sun and the water cycle!' },
      ],
    },
  ],

  vocab: [
    { word: 'Evaporation', emoji: '☀️', means: 'When the Sun warms liquid water and it floats away as vapor.', example: 'A wet puddle on a hot street slowly evaporates.', test: 'Evaporation is the change of liquid water into water vapor, a gas.' },
    { word: 'Condensation', emoji: '🥤', means: 'When water vapor cools and turns back into tiny drops of liquid.', example: 'Drops form on the outside of a cold glass of lemonade.', test: 'Condensation is the change of water vapor into liquid water.' },
    { word: 'Precipitation', emoji: '🌧️', means: 'Water that falls from clouds as rain, sleet, snow, or hail.', example: 'A thunderstorm rolling in from the Gulf brings precipitation.', test: 'Precipitation is water falling from clouds as rain, sleet, snow, or hail.' },
    { word: 'Water vapor', emoji: '💨', means: 'Water as a gas. You cannot see it.', example: 'Warm, wet air on a Dickinson summer day is full of water vapor.', test: 'Water vapor is the gas form of water. It is invisible.' },
    { word: 'Weather', emoji: '⛅', means: 'What the air is doing today, like hot, rainy, or windy.', example: 'Today is sunny and 94 degrees. That is weather.', test: 'Weather is the condition of the air in one place at one time.' },
    { word: 'Climate', emoji: '🌎', means: 'The usual weather pattern in a place over many years.', example: 'Dickinson has hot, humid summers and mild winters.', test: 'Climate is the pattern of weather in a region over about 30 years or more.' },
  ],

  quiz: [
    {
      type: 'one', staar: true, q: 'A puddle on a hot street gets smaller all afternoon. What is happening?',
      options: [
        { t: 'Evaporation', correct: true },
        { t: 'Condensation', why: 'Condensation makes drops from vapor. This puddle is losing water to the air.' },
        { t: 'Precipitation', why: 'Precipitation is water falling from clouds. Nothing is falling here.' },
        { t: 'Runoff', why: 'Runoff is water flowing downhill. This puddle is shrinking in place.' },
      ],
      explain: 'The Sun warms the puddle. Liquid water becomes vapor. That is evaporation.',
    },
    {
      type: 'one', q: 'What is water vapor?',
      options: [
        { t: 'Water as a gas that you cannot see', correct: true },
        { t: 'Tiny drops that make clouds', why: 'Those are liquid drops. Vapor is a gas, and it is invisible.' },
        { t: 'Water frozen into ice', why: 'Frozen water is a solid. Vapor is a gas.' },
        { t: 'Water running in a stream', why: 'That is liquid water. Vapor is the invisible gas form.' },
      ],
      explain: 'Water vapor is water as a gas. It is invisible.',
    },
    {
      type: 'one', staar: true, q: 'Drops of water form on the outside of a cold glass. What caused the drops?',
      options: [
        { t: 'Water vapor in the air cooled and condensed', correct: true },
        { t: 'Water leaked through the glass', why: 'Glass is solid, so nothing leaks through. The drops come from the air.' },
        { t: 'The glass made new water', why: 'A glass cannot make water. The vapor was already in the air.' },
        { t: 'The glass evaporated', why: 'Glass does not evaporate. Vapor in the air turned into drops.' },
      ],
      explain: 'Vapor in the air touched the cold glass. It cooled and condensed into drops.',
    },
    {
      type: 'one', q: 'What is a cloud made of?',
      options: [
        { t: 'Tiny drops of liquid water or ice', correct: true },
        { t: 'Water vapor', why: 'Vapor is invisible. We can see clouds because they are tiny drops.' },
        { t: 'Steam', why: 'Steam is hot vapor. Clouds are tiny drops, not steam.' },
        { t: 'Smoke and dust', why: 'Clouds are made of water, not smoke or dust.' },
      ],
      explain: 'Clouds are tiny drops of liquid water or bits of ice.',
    },
    {
      type: 'one', staar: true, q: 'Which one is an example of precipitation?',
      options: [
        { t: 'Hail falling during a storm', correct: true },
        { t: 'Fog hanging over a bay', why: 'Fog is a cloud near the ground. It floats and does not fall.' },
        { t: 'Steam above a pot', why: 'Steam is not falling from a cloud. Precipitation falls from clouds.' },
        { t: 'A river flowing to the sea', why: 'That is runoff. Precipitation falls from clouds.' },
      ],
      explain: 'Hail falls from clouds. Rain, sleet, snow, and hail are precipitation.',
    },
    {
      type: 'one', staar: true, q: 'What energy source drives the water cycle?',
      options: [
        { t: 'The Sun', correct: true },
        { t: 'The Moon', why: 'The Moon helps cause tides. The Sun heats the water and powers the cycle.' },
        { t: 'The wind', why: 'Wind moves clouds around. The Sun gives the energy that lifts the water.' },
        { t: 'The ocean floor', why: 'The ocean floor does not heat the water enough. The Sun does.' },
      ],
      explain: 'Heat from the Sun lifts water into the air and powers the cycle.',
    },
    {
      type: 'one', q: 'A puddle dries up without ever boiling. How is that possible?',
      options: [
        { t: 'Water can evaporate slowly when it is not boiling', correct: true },
        { t: 'The puddle soaked into the air like a sponge', why: 'Air is not a sponge. The water turned into vapor and floated away.' },
        { t: 'Water only evaporates at boiling', why: 'Water evaporates at any warm temperature. Boiling just makes it faster.' },
        { t: 'The water turned into rock', why: 'Water does not turn into rock. It became invisible vapor.' },
      ],
      explain: 'Water slowly evaporates even when it is cool. Boiling is not needed.',
    },
    {
      type: 'one', staar: true, q: 'Today in Dickinson is sunny and 96 degrees. What does this describe?',
      options: [
        { t: 'Weather', correct: true },
        { t: 'Climate', why: 'Climate is the pattern over many years. One hot day is weather.' },
        { t: 'Evaporation', why: 'Evaporation is a water cycle step. The sentence describes the air today.' },
        { t: 'Condensation', why: 'Condensation is vapor turning to liquid. The sentence is about today\'s air.' },
      ],
      explain: 'Today\'s air is weather. Climate is the usual pattern over many years.',
    },
    {
      type: 'one', staar: true, q: 'Which sentence describes the climate of Dickinson?',
      options: [
        { t: 'Summers are usually hot and humid', correct: true },
        { t: 'It rained hard last night', why: 'Last night is one event. That is weather.' },
        { t: 'Tomorrow will be cloudy', why: 'Tomorrow is a forecast. That is weather.' },
        { t: 'It is 90 degrees right now', why: 'Right now is weather. Climate needs a pattern over many years.' },
      ],
      explain: 'Climate is the usual pattern. Hot, humid summers happen year after year.',
    },
    {
      type: 'one', q: 'What is climate?',
      options: [
        { t: 'The usual weather in a place over many years', correct: true },
        { t: 'The weather in a place today', why: 'That is weather. Climate is the long-term pattern.' },
        { t: 'The weather in a place this week', why: 'A week is too short. Climate takes about 30 years.' },
        { t: 'The rain that fell yesterday', why: 'Yesterday is one day of weather. Climate is a long pattern.' },
      ],
      explain: 'Climate is the long-term pattern of weather. We use about 30 years.',
    },
    {
      type: 'one', staar: true, q: 'A student records the weather for one week. Can she say what the climate is?',
      options: [
        { t: 'No, climate needs about 30 years of weather', correct: true },
        { t: 'Yes, one week is enough', why: 'One week shows only a little weather. A pattern needs many years.' },
        { t: 'Yes, if it rained every day', why: 'A rainy week is still just weather. Climate is the long pattern.' },
        { t: 'No, climate is only about the Sun', why: 'Climate is the weather pattern over time. It is not only the Sun.' },
      ],
      explain: 'A week is too short. Climate is the pattern over about 30 years.',
    },
    {
      type: 'one', q: 'After rain runs downhill, where does the runoff usually end up?',
      options: [
        { t: 'In streams, bays, and oceans', correct: true },
        { t: 'Up in the clouds', why: 'Water goes up by evaporation. Runoff flows downhill.' },
        { t: 'Inside the Sun', why: 'Water never goes to the Sun. Runoff flows to low places.' },
        { t: 'It disappears forever', why: 'Water does not disappear. It flows to a bay or ocean and evaporates later.' },
      ],
      explain: 'Runoff flows downhill into streams, bays, and oceans. Then the Sun lifts it up again.',
    },
    {
      type: 'one', staar: true, q: 'In condensation, what change takes place?',
      options: [
        { t: 'Water vapor changes into liquid drops', correct: true },
        { t: 'Liquid water changes into vapor', why: 'That is evaporation, the opposite change.' },
        { t: 'Liquid water changes into ice', why: 'That is freezing. Condensation starts with vapor.' },
        { t: 'Ice changes into liquid water', why: 'That is melting. Condensation starts with vapor.' },
      ],
      explain: 'Condensation is vapor cooling into liquid drops.',
    },
    {
      type: 'one', q: 'Which tool catches and measures rain?',
      options: [
        { t: 'A rain gauge', correct: true },
        { t: 'A thermometer', why: 'A thermometer measures how hot the air is, not rain.' },
        { t: 'A magnet', why: 'A magnet pulls on iron. It cannot measure rain.' },
        { t: 'A scale', why: 'A scale measures mass. A rain gauge catches rain.' },
      ],
      explain: 'A rain gauge catches rain so we can measure how much fell.',
    },
    {
      type: 'one', staar: true, q: 'Two pans hold the same amount of water. One sits in sun, one in shade. After a day, what is true?',
      options: [
        { t: 'The sunny pan has less water left', correct: true },
        { t: 'Both pans have the same amount', why: 'Sun gives heat energy. The sunny pan evaporates faster.' },
        { t: 'The shady pan has less water left', why: 'The shade is cooler, so less water evaporates there.' },
        { t: 'The sunny pan has more water', why: 'Heat speeds up evaporation, so the sunny pan lost more.' },
      ],
      explain: 'Sun heat makes water evaporate faster. The sunny pan lost more water.',
    },
    {
      type: 'one', q: 'Kelenna says, "Evaporated water is gone forever." What is the best reply?',
      options: [
        { t: 'It cools, forms clouds, and falls as rain again', correct: true },
        { t: 'You are right, it is gone', why: 'Water never leaves the cycle. It turns into vapor and comes back.' },
        { t: 'It turns into the Sun', why: 'Water does not turn into the Sun. It rises, cools, and returns.' },
        { t: 'It sinks into the ground and stays', why: 'Evaporated water goes up into the air, not down into the ground.' },
      ],
      explain: 'Evaporated water comes back as precipitation. It is a cycle.',
    },
    {
      type: 'two', staar: true, q: 'Pick TWO kinds of precipitation.',
      options: [
        { t: 'Snow', correct: true },
        { t: 'Hail', correct: true },
        { t: 'Water vapor', why: 'Vapor is an invisible gas. It does not fall.' },
        { t: 'Dew on grass', why: 'Dew forms by condensation on cool grass. It does not fall from clouds.' },
      ],
      explain: 'Snow and hail both fall from clouds. Vapor and dew do not.',
    },
    {
      type: 'two', q: 'Pick TWO true things about clouds.',
      options: [
        { t: 'They are made of tiny drops or ice', correct: true },
        { t: 'They form when water vapor cools', correct: true },
        { t: 'They are made of invisible vapor', why: 'Vapor is invisible, but we can see clouds. Clouds are drops.' },
        { t: 'They are made of steam', why: 'Steam is hot vapor. Clouds are tiny drops of water.' },
      ],
      explain: 'Cooled vapor condenses into tiny drops or ice. Together they make clouds.',
    },
    {
      type: 'two', staar: true, q: 'Pick TWO statements that describe weather.',
      options: [
        { t: 'A thunderstorm hit Dickinson this afternoon', correct: true },
        { t: 'It is windy and 80 degrees today', correct: true },
        { t: 'Dickinson has hot summers every year', why: 'Every year is a pattern. That is climate.' },
        { t: 'Dickinson usually gets rain in every month', why: 'Usually means a long pattern. That is climate.' },
      ],
      explain: 'Weather is what the air does today. Usual patterns are climate.',
    },
    {
      type: 'sort', staar: true, q: 'Sort each statement: weather or climate?',
      groups: ['Weather', 'Climate'],
      items: [{ t: 'It is foggy this morning', g: 0 }, { t: 'A storm is coming tonight', g: 0 }, { t: 'It is 95 degrees today', g: 0 }, { t: 'Summers are usually hot and wet', g: 1 }, { t: 'Winters are mild most years', g: 1 }, { t: 'Texas gets about 50 inches of coastal rain a year', g: 1 }],
      explain: 'Weather is today or this week. Climate is the pattern over many years.',
    },
    {
      type: 'sort', q: 'Sort each example by water cycle step.',
      groups: ['Evaporation', 'Condensation', 'Precipitation'],
      items: [{ t: 'A puddle dries up', g: 0 }, { t: 'Wet towels dry on a line', g: 0 }, { t: 'Drops on a cold can', g: 1 }, { t: 'Fog forms on a cool night', g: 1 }, { t: 'Hail falls on a car', g: 2 }, { t: 'Snow falls on a mountain', g: 2 }],
      explain: 'Evaporation makes vapor. Condensation makes drops. Precipitation falls from clouds.',
    },
    {
      type: 'sort', staar: true, q: 'Sort them: water vapor or liquid drops?',
      groups: ['Water vapor (gas)', 'Liquid drops'],
      items: [{ t: 'The invisible gas above a puddle', g: 0 }, { t: 'Water that just evaporated', g: 0 }, { t: 'A white cloud', g: 1 }, { t: 'Dew on grass', g: 1 }, { t: 'Fog', g: 1 }],
      explain: 'Vapor is an invisible gas. Clouds, dew, and fog are tiny liquid drops.',
    },
    {
      type: 'order', staar: true, q: 'Put the water cycle in order, starting at the bay.',
      items: ['The Sun heats bay water and it evaporates', 'The vapor rises and cools', 'It condenses into tiny drops that make clouds', 'Heavy drops fall as precipitation', 'Runoff flows back to the bay'],
      explain: 'Water evaporates, condenses, falls, and runs back. Then it starts again.',
    },
    {
      type: 'order', q: 'Put these in order: a puddle disappears.',
      items: ['Rain fills a puddle', 'The Sun warms the puddle', 'The water evaporates into vapor', 'The puddle is gone'],
      explain: 'Rain makes the puddle. The Sun warms it. The water turns into vapor and rises.',
    },
    {
      type: 'order', staar: true, q: 'Put these in order: how rain forms.',
      items: ['Water vapor rises into the sky', 'The vapor cools and condenses', 'Tiny drops gather into a cloud', 'The drops grow heavy', 'Rain falls'],
      explain: 'Vapor cools into drops. Drops make clouds. Heavy drops fall as rain.',
    },
    {
      type: 'pick', staar: true, q: 'Tap the picture that shows condensation.',
      options: [
        { t: 'Drops on a cold can', emoji: '🥤', correct: true },
        { t: 'A puddle drying', emoji: '💧', why: 'A drying puddle is evaporation. Liquid is turning into vapor.' },
        { t: 'Snow falling', emoji: '❄️', why: 'Snow falling is precipitation. It falls from clouds.' },
        { t: 'A river flowing', emoji: '🏞️', why: 'A flowing river is runoff. It is liquid moving downhill.' },
      ],
      explain: 'Vapor cooled on the can and turned into liquid drops. That is condensation.',
    },
    {
      type: 'pick', q: 'Tap what powers the water cycle.',
      options: [
        { t: 'The Sun', emoji: '☀️', correct: true },
        { t: 'The Moon', emoji: '🌙', why: 'The Moon does not heat the water. The Sun does.' },
        { t: 'The wind', emoji: '💨', why: 'Wind moves clouds. It does not give the heat that lifts water.' },
        { t: 'A volcano', emoji: '🌋', why: 'Volcanoes do not run the water cycle. Sun heat does.' },
      ],
      explain: 'The Sun heats water and lifts it into the air.',
    },
    {
      type: 'pick', q: 'Tap the one that tells the climate of Dickinson.',
      options: [
        { t: 'Hot, humid summers most years', emoji: '🌡️', correct: true },
        { t: 'A storm this morning', emoji: '⛈️', why: 'A storm this morning is weather. Climate is the long pattern.' },
        { t: 'Windy this afternoon', emoji: '🌬️', why: 'This afternoon is weather. Climate is the usual pattern.' },
        { t: 'Rain tomorrow', emoji: '🌧️', why: 'Tomorrow is a forecast. That is weather.' },
      ],
      explain: 'Climate is the usual pattern over many years. Hot summers happen every year.',
    },
  ],

  teachBack: {
    prompt: 'Teach Vespa where the rain on your head came from. Tap the ideas in order.',
    pieces: [
      'The Sun heats Galveston Bay and some water evaporates into vapor.',
      'The vapor rises high and cools.',
      'It condenses into tiny drops that make a cloud.',
      'Heavy drops fall as rain, sleet, snow, or hail.',
      'Runoff flows back to the bay, and the trip starts again.',
    ],
    decoys: ['A cloud is made of invisible water vapor.', 'Weather is the usual pattern over 30 years.'],
  },
};
