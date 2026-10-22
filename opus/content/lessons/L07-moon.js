// STUB written by Opus. A worker turns this into a full lesson (see docs/SPEC.md, docs/STYLE.md, L01 as the example).
export default {
  id: 'L07', num: 7, unit: 3, unitTitle: 'Earth & Space',
  title: 'The Moon\'s Changing Face',
  testTitle: 'Patterns of Moon Phases',
  teks: ['4.9B'],
  icon: '🌙', color: '#c084fc',
  bigQuestion: 'Why does the Moon look like a different shape on different nights?',
  ladder: [
    'The Moon makes no light. It shines because sunlight bounces off it.',
    'The Sun always lights up half of the Moon.',
    'The Moon travels around Earth. One trip takes about a month.',
    'As it travels, we see different amounts of its sunlit half.',
    'That gives a pattern of shapes, called phases, that repeats every 29 and a half days.',
  ],
  stub: true,
  brief: {
    phenomenon: 'From his backyard in Dickinson, Kelenna sees a skinny crescent one night, and a week later a half Moon. Two weeks later it is round and bright. Is something covering it?',
    predictions: [
      'Shine a lamp on a ball. How much of the ball is lit? -> half, always.',
      'When the Moon is between Earth and Sun, what do we see? -> almost nothing (new Moon), because the lit half faces away.',
      'After a full Moon, will it get bigger or smaller next? -> smaller (waning).',
      'Full Moon on November 1: about when is the next full Moon? -> about 29 or 30 days later.',
    ],
    scene: 'Split view. Left: space view from above - Sun light coming from one side, Earth in the middle, Moon on an orbit ring; the sunlit half of the Moon always faces the Sun. Kelenna drags the Moon around its orbit. Right (inset panel or second camera via render-to-texture or simple 2D canvas sprite): "what you see from your backyard" phase disk updating live. A calendar strip of 30 days with phase icons fills in. Vespa holds a ball in front of a lamp in a mini-demo.',
    tasks: [
      'Drag the Moon to make a full Moon (event fullMoon).',
      'Drag the Moon to make a new Moon (event newMoon).',
      'Fill in the calendar by moving the Moon all the way around (event fullCycle).',
    ],
    vocab: ['Moon phase', 'Orbit', 'Reflect', 'Waxing (growing)', 'Waning (shrinking)', 'New Moon / Full Moon'],
    misconceptions: [
      'Earth\'s shadow makes the phases. (No - that is a lunar eclipse, a rare event.)',
      'Clouds cover parts of the Moon. (No.)',
      'The Moon makes its own light. (No - it reflects sunlight.)',
    ],
    useIt: 'Fishermen at Galveston watch the Moon. If it was a first quarter last Friday, what will it look like this Friday? (getting fuller - waxing gibbous).',
    staarStyles: 'Sequence questions (order four phases), predict the next phase, and calendar date math (about 7 days between main phases).',
  },
  steps: [], vocab: [], quiz: [], teachBack: null,
};
