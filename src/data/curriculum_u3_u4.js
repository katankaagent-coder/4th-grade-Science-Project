/**
 * Dunbar Middle School (Dickinson ISD) - 4th Grade Science Curriculum
 * Units 3 & 4 Master Module Repository (7 Modules Total)
 * Aligned with 19 TAC §112.6 (Texas Essential Knowledge and Skills - TEKS 2024-2026)
 * 5E Instructional Model: Engage, Explore, Explain, Elaborate, Evaluate
 * Tailored for Kelenna - First-Principles 9-Year-Old Friendly Narration,
 * Rotating Section Mini-Quizzes, and 12-Question STAAR 2.0 Assessment Pools.
 */

export const CURRICULUM_U3_U4 = [
  {
    "id": "m3_1",
    "unitId": 3,
    "unitTitle": "Unit 3: Earth & Space Systems",
    "gradingPeriod": "3rd Nine Weeks (CBA 3)",
    "code": "TEKS 4.9A",
    "title": "Seasons, Daylight & Temperature Patterns",
    "subtitle": "Earth’s 23.5° Tilt, Solar Angle & Shadow Stick Tracking",
    "icon": "☀️",
    "accentColor": "#f59e0b",
    "iCanStatement": "I can collect and analyze data to identify sequences and predict patterns of change in seasons, daylight hours, and temperatures caused by Earth’s revolution and tilted axis.",
    "localAnchor": "Dunbar Middle School in Dickinson, TX (Latitude 29.46° N): Comparing solar noon shadow lengths on the Dunbar football field in December vs. June, and analyzing why Dickinson experiences 14 hours of sunlight in summer but only 10 hours in winter.",
    "engage": {
      "hookQuestion": "At solar noon on the Dunbar Middle School practice field, Kelenna noticed his shadow was very short in June, but long and stretched out in December. Why did his shadow length change?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Earth’s 23.5° tilted axis points the Northern Hemisphere toward the Sun in June (direct rays, high Sun) and away in December (slanted rays, low Sun).",
          "correct": true,
          "feedback": "Spot on, Kelenna! Earth’s constant tilt means we lean toward the Sun in June for direct high rays, and lean away in December for lower, slanted rays!"
        },
        {
          "id": "b",
          "text": "Earth moves much closer to the Sun during June and orbits far away during December.",
          "correct": false,
          "feedback": "Surprise! Earth is actually slightly farther from the Sun in July! Seasons happen because of Earth’s tilt and orbit, not how close we are."
        },
        {
          "id": "c",
          "text": "The Sun changes its brightness and energy output across different months of the year.",
          "correct": false,
          "feedback": "The Sun shines with steady brightness all year round. It is Earth’s tilt that changes how directly the sunlight strikes Texas!"
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            16
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Earth’s 23.5° Axial Tilt",
            "text": "Earth’s rotational axis remains tilted 23.5° toward Polaris as it revolves around the Sun.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Hey Kelenna! Check out our home planet Earth! See how it leans like a spinning top tilted sideways? Earth is tilted at an angle of 23.5 degrees, and that tilt never changes direction as we travel around the Sun!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            10,
            4,
            10
          ],
          "lookAt": [
            3,
            0,
            0
          ],
          "callout": {
            "title": "Summer Solstice (June)",
            "text": "Northern Hemisphere leans toward the Sun: direct solar rays and ~14 hours of daylight in Dickinson, TX.",
            "pos": [
              3,
              1,
              0
            ]
          },
          "narration": "Look at June! Dickinson, Texas is tilted right toward the Sun! It is like pointing a flashlight straight down at your hand—intense, direct heat with 14 hours of daylight and super short noon shadows!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -10,
            4,
            -10
          ],
          "lookAt": [
            -3,
            0,
            0
          ],
          "callout": {
            "title": "Winter Solstice (December)",
            "text": "Northern Hemisphere leans away: slanted rays spread over a wider area with only ~10 hours of daylight.",
            "pos": [
              -3,
              1,
              0
            ]
          },
          "narration": "Now fast forward six months to December! Earth has orbited halfway around, so Texas now tilts away from the Sun. Light hits us at a low slant, spreading warmth thin like butter on bread, casting long noon shadows!",
          "sfx": "wind"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            12,
            5
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Predictable Seasonal Patterns",
            "text": "Revolution and tilt create our repeating cycle of spring, summer, autumn, and winter.",
            "pos": [
              0,
              3,
              0
            ]
          },
          "narration": "Because Earth takes exactly 365 days to circle the Sun, this pattern repeats like clockwork every single year: spring, summer, autumn, and winter! Science lets us predict the seasons!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Use the Orbit Scrubber to revolve Earth around the Sun across all 12 months. Track the solar ray incidence angle on Dickinson, TX (29.5° N), observe the live shadow stick length on the Dunbar field, and analyze the daylight hours graph.",
      "labPrompts": [
        "Rotate Earth to June 21 and observe why the Sun reaches 84° elevation in Dickinson, creating the shortest shadow of the year.",
        "Orbit to December 21 and record the shadow stick length when solar noon altitude drops to just 37° above the southern horizon.",
        "Examine March 21 and September 23 equinoxes when day and night are nearly equal at 12 hours each."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            6,
            14
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Revolution vs. Rotation",
            "text": "Rotation (24 hrs) causes day and night; Revolution (365.25 days) creates seasons.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Here is the big secret: rotation and revolution are completely different! Think of spinning a basketball on your finger—that is rotation, and Earth does it every 24 hours for day and night. Walking in a big circle around a campfire is revolution—that takes 365 days and gives us our seasons!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            6,
            3,
            8
          ],
          "lookAt": [
            2,
            0,
            0
          ],
          "callout": {
            "title": "Solar Angle of Incidence",
            "text": "Direct rays concentrate thermal energy; slanted rays disperse energy over larger ground areas.",
            "pos": [
              2,
              1,
              0
            ]
          },
          "narration": "Ever test a flashlight? When you shine it straight down, the circle of light is small and blazing bright—that is direct sunlight in summer. When you tilt it at a slant, the light stretches out wide and faint—that is winter!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -6,
            3,
            -8
          ],
          "lookAt": [
            -2,
            0,
            0
          ],
          "callout": {
            "title": "Daylight Duration & Heating",
            "text": "Longer daylight hours in summer allow Earth’s surface to absorb more total thermal energy.",
            "pos": [
              -2,
              1,
              0
            ]
          },
          "narration": "More time in the sun means more heat! In summer, Dickinson gets 14 hours of direct daylight soaking into Galveston Bay. In winter, we only get 10 hours of slanted rays, so our bayou town stays cooler.",
          "sfx": "splash"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            8,
            8
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Shadow Stick Geometry",
            "text": "The higher the Sun in the sky, the shorter the shadow cast by a vertical stick.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Try this on the Dunbar practice field! Stick a ruler in the dirt at solar noon. In June, the Sun is almost directly overhead, making a tiny shadow. In December, the low Sun stretches your shadow out like a giant!",
          "sfx": "chime"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            10,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Opposite Hemispheres",
            "text": "When the Northern Hemisphere experiences summer, the Southern Hemisphere experiences winter.",
            "pos": [
              0,
              0,
              0
            ]
          },
          "narration": "Because Earth stays tilted in one direction, the Northern and Southern hemispheres are opposites! When Kelenna is swimming in Texas during July, kids in Australia are putting on winter coats and building snowmen!",
          "sfx": "whoosh"
        }
      ],
      "vocabulary": [
        {
          "id": "m3_1_v0",
          "term": "Revolution",
          "simpleMeaning": "Earth taking a full 365-day lap all the way around the Sun, like walking in a giant circle around a campfire!",
          "definition": "The complete orbital journey of Earth around the Sun, taking approximately 365.25 days (one year).",
          "example": "Earth’s revolution around the Sun creates our repeating cycle of four seasons.",
          "narration": "Revolution! Picture yourself walking all the way around a campfire. Earth takes a full 365 days—one whole year—to revolve around the Sun, bringing us the four seasons!"
        },
        {
          "id": "m3_1_v1",
          "term": "Axial Tilt",
          "simpleMeaning": "Earth leaning sideways at 23.5 degrees like a tilted toy top that never stands straight up!",
          "definition": "The constant 23.5-degree angle of Earth’s rotational axis relative to its orbital plane, always pointing toward Polaris.",
          "example": "Earth’s 23.5-degree axial tilt causes the Northern Hemisphere to lean toward the Sun in June.",
          "narration": "Axial Tilt! Earth doesn't stand straight up and down. It leans sideways at a 23.5-degree angle, pointing toward the North Star, which is the secret reason we have summer and winter!"
        },
        {
          "id": "m3_1_v2",
          "term": "Angle of Incidence",
          "simpleMeaning": "The angle sunlight hits the ground—shining straight down packs heat into a small spot, while slanted light spreads thin!",
          "definition": "The angle at which incoming solar radiation strikes Earth’s surface, determining the concentration of thermal energy.",
          "example": "A high angle near 90 degrees delivers concentrated heat to Dickinson in July.",
          "narration": "Angle of Incidence! Think of shining a flashlight at a wall. Straight on makes a tight, super bright circle. Tilted sideways makes a huge, faint oval. That angle controls how hot the ground gets!"
        },
        {
          "id": "m3_1_v3",
          "term": "Solar Noon",
          "simpleMeaning": "The exact moment in the middle of the day when the Sun climbs to its highest peak in the sky and shadows are shortest!",
          "definition": "The moment during the day when the Sun reaches its highest point in the sky, casting the shortest shadow of the day.",
          "example": "At solar noon on the Dunbar football field, Kelenna’s shadow points directly north.",
          "narration": "Solar Noon! That is the moment the Sun reaches the absolute highest peak of its daily journey across the sky, casting your shortest shadow of the day!"
        },
        {
          "id": "m3_1_v4",
          "term": "Solstice",
          "simpleMeaning": "The two special days of the year when Earth leans the most toward the Sun (summer solstice) or the most away (winter solstice)!",
          "definition": "The two points in Earth’s orbit (June and December) when one hemisphere experiences maximum tilt toward or away from the Sun.",
          "example": "The summer solstice in June brings the longest day and shortest noon shadow of the year to Texas.",
          "narration": "Solstice! In June, Texas leans as far toward the Sun as possible—our longest day! In December, we lean as far away as possible—our shortest day. Those are the solstices!"
        }
      ]
    },
    "elaborate": {
      "title": "Dunbar Middle School Solar Array Optimization Challenge",
      "scenario": "Dickinson ISD is installing a new rooftop solar photovoltaic array at Dunbar Middle School. Engineers must calibrate panel tilt angles to capture maximum solar energy during both summer and winter.",
      "goalDescription": "Adjust seasonal panel angle settings for winter (45°) and summer (15°) to maximize photovoltaic energy capture based on Dickinson’s 29.5° latitude.",
      "criteria": [
        "Calibrate winter panel angle to intercept low-angle sun rays at perpendicular 90° incidence.",
        "Set summer panel angle flatter to intercept direct high-altitude solar rays.",
        "Achieve >92% solar efficiency rating in both seasonal simulation trials."
      ],
      "successFeedback": "Mastery Achieved! Your dual-season tilt settings optimized Dunbar Middle School solar power generation across all 4 seasons!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Why was Kelenna’s shadow on the Dunbar field much shorter in June than in December?",
          "options": [
            "The Sun climbed higher in the sky in June due to Earth’s tilt toward the Sun",
            "Earth was millions of miles closer to the Sun in June",
            "The Sun turned up its nuclear brightness during summer",
            "The clouds in December pushed shadows down closer to the dirt"
          ],
          "answer": 0,
          "hint": "Think about where the Sun is in the sky: high overhead means tiny shadows right under your sneakers!"
        },
        {
          "q": "What is the exact tilt angle of Earth’s rotational axis in degrees?",
          "options": [
            "45.0 degrees",
            "23.5 degrees",
            "90.0 degrees",
            "0.0 degrees"
          ],
          "answer": 1,
          "hint": "Earth leans like a tilted top at just under 24 degrees—remember 23.5°!"
        },
        {
          "q": "When the Northern Hemisphere leans toward the Sun, what season does Dickinson, Texas experience?",
          "options": [
            "Winter",
            "Autumn",
            "Summer",
            "Spring"
          ],
          "answer": 2,
          "hint": "Leaning toward the heat source brings direct rays and long, sunny days!"
        }
      ],
      "explore": [
        {
          "q": "When using the orbit scrubber on June 21st, how many hours of daylight does Dickinson, TX receive?",
          "options": [
            "About 10 hours",
            "About 12 hours",
            "About 14 hours",
            "24 full hours"
          ],
          "answer": 2,
          "hint": "Summer days are long and bright in Texas—about 14 hours of sun!"
        },
        {
          "q": "On which two dates are daylight and nighttime nearly equal at 12 hours each?",
          "options": [
            "March 21 and September 23 (Equinoxes)",
            "June 21 and December 21 (Solstices)",
            "July 4 and January 1",
            "Halloween and Valentine’s Day"
          ],
          "answer": 0,
          "hint": "Equi-nox means equal night—around March 21 and September 23!"
        },
        {
          "q": "What happens to the shadow of a meter stick as solar noon approaches from morning?",
          "options": [
            "It grows longer and longer",
            "It becomes shorter and shorter until reaching its minimum length",
            "It spins in 360-degree circles",
            "It disappears completely at 9:00 AM"
          ],
          "answer": 1,
          "hint": "As the Sun climbs higher in the sky, shadows shrink until solar noon!"
        }
      ],
      "explain": [
        {
          "q": "What is the first-principles difference between rotation and revolution?",
          "options": [
            "Rotation is spinning on an axis (24 hrs); revolution is orbiting the Sun (365 days)",
            "Rotation causes seasons; revolution causes day and night",
            "Rotation takes 365 days; revolution takes 24 hours",
            "Both are exactly the same motion with different names"
          ],
          "answer": 0,
          "hint": "Basketball spinning on a finger (rotation) vs. walking around a campfire (revolution)!"
        },
        {
          "q": "Why does direct sunlight feel much hotter than slanted sunlight?",
          "options": [
            "Slanted sunlight has cooler colors",
            "Direct sunlight concentrates energy into a smaller area instead of spreading it out",
            "Slanted sunlight bounces off the Moon first",
            "Direct sunlight travels twice as fast"
          ],
          "answer": 1,
          "hint": "Think of a flashlight: straight down makes a tight, intense hotspot!"
        },
        {
          "q": "When Dickinson, Texas has summer, what season is Australia experiencing in the Southern Hemisphere?",
          "options": [
            "Summer",
            "Winter",
            "Spring",
            "Fall"
          ],
          "answer": 1,
          "hint": "Earth’s two halves lean in opposite directions relative to the Sun!"
        }
      ],
      "vocab": [
        {
          "q": "Which vocabulary word describes Earth traveling all the way around the Sun once every 365 days?",
          "options": [
            "Rotation",
            "Revolution",
            "Precipitation",
            "Condensation"
          ],
          "answer": 1,
          "hint": "One big lap around the central Sun!"
        },
        {
          "q": "What is the term for the 23.5-degree lean of Earth’s axis?",
          "options": [
            "Axial Tilt",
            "Solar Flare",
            "Equinox",
            "Orbit Track"
          ],
          "answer": 0,
          "hint": "It’s the tilt of Earth’s central axis!"
        },
        {
          "q": "What is \"Solar Noon\"?",
          "options": [
            "Midnight when the Sun is hidden on the other side of Earth",
            "The moment the Sun reaches its highest point in the sky for the day",
            "When an eclipse covers the Sun at lunchtime",
            "The sunrise moment when the Sun first peeks over Galveston Bay"
          ],
          "answer": 1,
          "hint": "The highest climb of the day, producing the shortest shadow!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A science student in Dickinson, Texas records the length of a flagpole’s shadow at solar noon on the 21st day of each month. In which month will the student record the shortest solar noon shadow?",
        "options": [
          {
            "id": "a",
            "text": "December, because Earth is closest to the Sun"
          },
          {
            "id": "b",
            "text": "June, because the Sun reaches its highest angle in the sky"
          },
          {
            "id": "c",
            "text": "March, because day and night are equal in length"
          },
          {
            "id": "d",
            "text": "September, because temperatures begin to cool down"
          }
        ],
        "answer": "b",
        "explanation": "In June (summer solstice), the Northern Hemisphere tilts directly toward the Sun, positioning the Sun at its highest altitude overhead and casting the shortest shadow of the year!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO factors work together to cause the cyclical changes in seasons and daylight hours on Earth? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "The constant 23.5° tilt of Earth’s axis"
          },
          {
            "id": "b",
            "text": "The changing distance between Earth and the Sun during orbit"
          },
          {
            "id": "c",
            "text": "Earth’s revolution around the Sun once every 365.25 days"
          },
          {
            "id": "d",
            "text": "The speed of Earth’s 24-hour daily rotation"
          },
          {
            "id": "e",
            "text": "The changing gravitational pull of the Moon"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Seasons are created by the teamwork of Earth’s fixed 23.5° axial tilt and its 365.25-day revolution around the Sun. Distance to the Sun does NOT cause seasons!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: During the month of December in Dickinson, Texas, how do solar ray angles and average daily daylight hours compare to June?",
        "optionsA": [
          {
            "id": "a",
            "text": "Solar rays are more direct, and daylight hours are longer."
          },
          {
            "id": "b",
            "text": "Solar rays strike at a lower slant, and daylight hours are shorter."
          },
          {
            "id": "c",
            "text": "Solar rays are identical, but nighttime lasts 24 hours."
          },
          {
            "id": "d",
            "text": "Solar rays strike at 90°, and daylight lasts 14 hours."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "The Southern Hemisphere tilts away from the Sun during December."
          },
          {
            "id": "b",
            "text": "Earth stops rotating on its axis during the winter solstice."
          },
          {
            "id": "c",
            "text": "The Northern Hemisphere tilts away from the Sun, causing sunlight to spread over a larger surface area."
          },
          {
            "id": "d",
            "text": "Cloud cover in Dickinson permanently blocks direct solar rays all winter."
          }
        ],
        "answerB": "c",
        "explanation": "In December, Earth’s Northern Hemisphere tilts away from the Sun. Sunlight strikes Texas at a low slant (spreading warmth thin) and daylight duration drops to about 10 hours."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding seasonal heating using the drop-down menus:",
        "segments": [
          {
            "text": "In Dickinson, Texas, summer temperatures are higher than winter temperatures primarily because the Northern Hemisphere is tilted "
          },
          {
            "blankId": "b1",
            "options": [
              "toward the Sun",
              "away from the Sun",
              "parallel to the Sun"
            ],
            "answer": "toward the Sun"
          },
          {
            "text": ", resulting in "
          },
          {
            "blankId": "b2",
            "options": [
              "more direct solar rays and longer daylight hours",
              "slanted solar rays and shorter daylight hours",
              "constant 12-hour days and cold nights"
            ],
            "answer": "more direct solar rays and longer daylight hours"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Summer heat is caused by Earth tilting toward the Sun, concentrating direct sunlight onto Texas and giving us more total hours of solar heating each day."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each characteristic into the correct season for Dickinson, Texas:",
        "categories": [
          {
            "id": "summer",
            "label": "Summer Solstice (June)"
          },
          {
            "id": "winter",
            "label": "Winter Solstice (December)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Shortest solar noon shadow of the entire year",
            "category": "summer"
          },
          {
            "id": "i2",
            "label": "Longest solar noon shadow of the entire year",
            "category": "winter"
          },
          {
            "id": "i3",
            "label": "Approximately 14 hours of daily daylight",
            "category": "summer"
          },
          {
            "id": "i4",
            "label": "Lowest solar path across the southern sky (~10 hrs daylight)",
            "category": "winter"
          }
        ],
        "explanation": "June features high direct solar rays, short noon shadows, and long daylight. December features low slanted rays, long shadows, and shorter daylight."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Why is Dickinson, Texas significantly warmer in July than in January?",
        "options": [
          {
            "id": "a",
            "text": "Earth is 5 million miles closer to the Sun in July."
          },
          {
            "id": "b",
            "text": "The Northern Hemisphere is tilted toward the Sun, receiving concentrated direct rays and more daylight hours."
          },
          {
            "id": "c",
            "text": "The Sun produces twice as much nuclear fire during July."
          },
          {
            "id": "d",
            "text": "Ocean currents stop flowing in January, freezing the Gulf of Mexico."
          }
        ],
        "answer": "b",
        "explanation": "Texas is warmer in July because Earth’s tilt angles Texas toward the Sun, delivering concentrated direct rays and about 14 hours of daily sunlight!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "A student holds a flashlight directly above a piece of grid paper and observes a bright, small circle of light. When the flashlight is tilted at a low 30° angle, what happens to the light on the paper?",
        "options": [
          {
            "id": "a",
            "text": "The light disappears completely."
          },
          {
            "id": "b",
            "text": "The light spreads over a larger area and appears dimmer, modeling winter sunlight."
          },
          {
            "id": "c",
            "text": "The light shrinks into a laser beam that burns the paper."
          },
          {
            "id": "d",
            "text": "The light changes color from white to green."
          }
        ],
        "answer": "b",
        "explanation": "Tilting the flashlight spreads the light energy across more grid squares, diluting its intensity. This directly models why slanted winter sunlight produces less heat!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO statements are accurate regarding daylight patterns in Dickinson, Texas? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Dickinson receives about 14 hours of sunlight in June and only about 10 hours in December."
          },
          {
            "id": "b",
            "text": "Dickinson has exactly 12 hours of daylight every single day of the year."
          },
          {
            "id": "c",
            "text": "Daylight hours are determined by Earth’s axial tilt as it revolves around the Sun."
          },
          {
            "id": "d",
            "text": "Daylight hours change because the Sun moves faster through space in winter."
          },
          {
            "id": "e",
            "text": "Dickinson has 24 hours of total darkness during December."
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Because of Earth’s tilt and revolution, daylight ranges from ~14 hours in summer down to ~10 hours in winter in Dickinson, TX."
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: When students at Dunbar Middle School in Texas are celebrating the Fourth of July in summer, what season is happening in Sydney, Australia?",
        "optionsA": [
          {
            "id": "a",
            "text": "Summer"
          },
          {
            "id": "b",
            "text": "Winter"
          },
          {
            "id": "c",
            "text": "Spring"
          },
          {
            "id": "d",
            "text": "Equinox"
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Why do Texas and Australia experience opposite seasons at the same time?",
        "optionsB": [
          {
            "id": "a",
            "text": "Australia is on the moon facing away from the Sun."
          },
          {
            "id": "b",
            "text": "When the Northern Hemisphere tilts toward the Sun, the Southern Hemisphere tilts away."
          },
          {
            "id": "c",
            "text": "Australia rotates clockwise while Texas rotates counterclockwise."
          },
          {
            "id": "d",
            "text": "The Sun only shines on one side of the globe each year."
          }
        ],
        "answerB": "b",
        "explanation": "Earth’s tilted axis points in a fixed direction in space. When the top half (Northern Hemisphere) leans toward the Sun, the bottom half (Southern Hemisphere) leans away!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the comparison between Earth’s two main motions using the drop-down menus:",
        "segments": [
          {
            "text": "Earth spinning on its axis once every 24 hours is called "
          },
          {
            "blankId": "b1",
            "options": [
              "rotation",
              "revolution",
              "transpiration"
            ],
            "answer": "rotation"
          },
          {
            "text": ", which causes day and night. Earth orbiting around the Sun once every 365.25 days is called "
          },
          {
            "blankId": "b2",
            "options": [
              "revolution",
              "rotation",
              "evaporation"
            ],
            "answer": "revolution"
          },
          {
            "text": ", which causes our repeating cycle of seasons."
          }
        ],
        "explanation": "Rotation (spinning in place for 24 hours) produces day and night. Revolution (orbiting the Sun for 365.25 days) combines with tilt to produce seasons."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Sort each description into whether it relates to Earth’s Rotation or Earth’s Revolution:",
        "categories": [
          {
            "id": "rot",
            "label": "Earth’s Rotation (24 Hours)"
          },
          {
            "id": "rev",
            "label": "Earth’s Revolution (365.25 Days)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Causes the daily cycle of sunrise, solar noon, and sunset",
            "category": "rot"
          },
          {
            "id": "i2",
            "label": "Takes one complete year to finish an elliptical orbit around the Sun",
            "category": "rev"
          },
          {
            "id": "i3",
            "label": "Spins on a central axis like a toy top at 23.5 degrees",
            "category": "rot"
          },
          {
            "id": "i4",
            "label": "Works with axial tilt to produce spring, summer, fall, and winter",
            "category": "rev"
          }
        ],
        "explanation": "Rotation is the daily 24-hour spin causing day/night. Revolution is the 365.25-day journey around the Sun creating seasons."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "Kelenna measures the shadow of a meter stick on the Dunbar practice field at solar noon once a week starting in January. As spring turns into May and June, what will happen to the shadow length?",
        "options": [
          {
            "id": "a",
            "text": "The shadow will get progressively shorter because the Sun climbs higher in the sky."
          },
          {
            "id": "b",
            "text": "The shadow will get progressively longer because the Sun is setting earlier."
          },
          {
            "id": "c",
            "text": "The shadow will remain exactly the same length all year."
          },
          {
            "id": "d",
            "text": "The shadow will point south instead of north."
          }
        ],
        "answer": "a",
        "explanation": "From January to June, Earth’s Northern Hemisphere tilts progressively more toward the Sun. The Sun climbs higher in the Texas sky each day, making the solar noon shadow shorter and shorter!"
      }
    ]
  },
  {
    "id": "m3_2",
    "unitId": 3,
    "unitTitle": "Unit 3: Earth & Space Systems",
    "gradingPeriod": "3rd Nine Weeks (CBA 3)",
    "code": "TEKS 4.9B",
    "title": "Lunar Phases & Orbital Mechanics",
    "subtitle": "29.5-Day Lunar Cycle & Dual Space/Earth Telescope Views",
    "icon": "🌙",
    "accentColor": "#6366f1",
    "iCanStatement": "I can collect and analyze data to identify sequences and predict patterns of change in the observable appearance of the Moon over its 29.5-day lunar cycle.",
    "localAnchor": "NASA Johnson Space Center (Houston / Webster, just 10 miles north of Dickinson): Mission controllers and Artemis astronomers tracking lunar phases and terminator shadows from the lunar south pole.",
    "engage": {
      "hookQuestion": "If half of the Moon is always illuminated by sunlight in space, why does its shape appear to change from a thin crescent to a full circle when viewed from Dickinson, Texas?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "As the Moon orbits Earth every 29.5 days, observers on Earth see varying amounts of the Moon’s illuminated half.",
          "correct": true,
          "feedback": "Outstanding, Kelenna! Half the Moon is always lit by the Sun, but our view of that lit half changes as the Moon circles around Earth!"
        },
        {
          "id": "b",
          "text": "Earth’s shadow falls across the Moon every night, gradually covering and uncovering it.",
          "correct": false,
          "feedback": "A common trick! Earth’s shadow ONLY falls on the Moon during a rare lunar eclipse. Normal monthly moon phases are just our changing viewing angle!"
        },
        {
          "id": "c",
          "text": "Clouds in Earth’s atmosphere block different portions of the Moon’s surface each week.",
          "correct": false,
          "feedback": "Atmospheric clouds might block our view on a stormy night, but they cannot create the predictable 29.5-day clockwork cycle of lunar phases!"
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            15,
            20
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Sun-Earth-Moon System",
            "text": "Sunlight always illuminates exactly 50% of the Moon in space at all times.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look at the Moon from outer space, Kelenna! Notice how the Sun is like a giant flashlight shining on a baseball. Exactly half of the Moon is ALWAYS bathed in bright sunlight, while the other half rests in dark shadow!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            12,
            6,
            8
          ],
          "lookAt": [
            4,
            0,
            0
          ],
          "callout": {
            "title": "Waxing Phases (Right Lit)",
            "text": "From New Moon to Full Moon, the illuminated portion visible from Earth grows from right to left.",
            "pos": [
              4,
              1,
              0
            ]
          },
          "narration": "As the Moon orbits Earth counterclockwise, our angle changes. We start seeing a sliver of that lit half from Earth! When the light is growing bigger on the right side, we call it waxing—remember: wax on, right side on!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            0,
            8,
            -15
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Full Moon Alignment",
            "text": "Earth is between the Sun and Moon, so observers see the entire illuminated disk.",
            "pos": [
              0,
              1,
              -5
            ]
          },
          "narration": "Two weeks in, around Day 14, Earth sits right between the Sun and Moon. Look up from Dunbar Middle School and boom—you are looking directly at the entire sunlit face of the Moon! That is a brilliant Full Moon!",
          "sfx": "splash"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            -12,
            6,
            8
          ],
          "lookAt": [
            -4,
            0,
            0
          ],
          "callout": {
            "title": "Waning Phases (Left Lit)",
            "text": "After Full Moon, the visible lit portion shrinks from right to left back toward New Moon.",
            "pos": [
              -4,
              1,
              0
            ]
          },
          "narration": "Now the Moon continues its orbit, and the light starts shrinking from right to left. That is waning! Only the left side stays lit until the Moon returns to New Moon, completing the whole 29.5-day cycle!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Drag the lunar orbit timeline scrubber across Days 1 to 29.5. Compare the top-down Space View (where half the Moon is always lit by the Sun) with the Earth Telescope View in Dickinson, TX.",
      "labPrompts": [
        "Locate Day 14 (Full Moon) and observe the relative positions of Sun, Earth, and Moon in space.",
        "Observe the waxing phases (crescent, first quarter, gibbous) when the lit portion visible from Earth grows from right to left.",
        "Examine the waning phases (gibbous, third quarter, crescent) when the illuminated portion shrinks toward the new moon."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            12,
            16
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "The 29.5-Day Synodic Month",
            "text": "The Moon takes about 29.5 days to progress through all eight primary lunar phases.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Think of the Moon as Earth’s giant natural night clock! It takes almost a full month—approximately 29.5 days—for the Moon to orbit all the way around Earth and show us all of its beautiful phases.",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            8,
            4,
            10
          ],
          "lookAt": [
            3,
            0,
            0
          ],
          "callout": {
            "title": "New Moon to First Quarter",
            "text": "Day 1 New Moon is invisible; by Day 7 (First Quarter), half of the Earth-facing disk is lit.",
            "pos": [
              3,
              1,
              0
            ]
          },
          "narration": "We start at New Moon: the sunlit half faces completely away from us, so the Moon looks dark. Over the next 7 days, a thin crescent grows wider until First Quarter, when exactly half of the disk is lit on the right!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            10,
            5,
            0
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Waxing Gibbous to Full Moon",
            "text": "Gibbous means more than half lit; at Day 14, the Full Moon rises at sunset.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Between First Quarter and Full Moon, the Moon looks swollen like a football—scientists call this Waxing Gibbous! Around Day 14, the entire Earth-facing side is bathed in light, rising right as the Sun sets!",
          "sfx": "chime"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            -8,
            4,
            10
          ],
          "lookAt": [
            -3,
            0,
            0
          ],
          "callout": {
            "title": "Waning Gibbous to Third Quarter",
            "text": "By Day 21 (Third Quarter), the left half is illuminated and visible in early morning skies.",
            "pos": [
              -3,
              1,
              0
            ]
          },
          "narration": "After Full Moon, the light begins to wane or shrink! At Day 21—Third Quarter—the right side goes dark and only the left half shines bright. You can spot it in the sky on your morning ride to Dunbar Middle School!",
          "sfx": "wind"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            14,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Predicting Future Phases",
            "text": "Knowing any phase allows exact prediction of lunar appearance 7, 14, or 21 days later.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Here is how NASA Artemis scientists use math: each quarter phase is about 7 days apart! If you see a New Moon tonight, you can guarantee a First Quarter in 7 days, a Full Moon in 14 days, and a New Moon again in 29.5 days!",
          "sfx": "whoosh"
        }
      ],
      "vocabulary": [
        {
          "id": "m3_2_v0",
          "term": "Lunar Cycle",
          "simpleMeaning": "The 29.5-day repeating journey of the Moon orbiting Earth, showing all 8 changing phases like a monthly cosmic clock!",
          "definition": "The 29.5-day repeating sequence of Moon phases as the Moon completes one revolution around Earth.",
          "example": "It takes approximately one month for the Moon to complete its full lunar cycle.",
          "narration": "Lunar Cycle! That is the complete 29.5-day trip the Moon takes around Earth, showing us every phase from New Moon to Full Moon and back again!"
        },
        {
          "id": "m3_2_v1",
          "term": "Waxing",
          "simpleMeaning": "The illuminated part of the Moon growing bigger each night, lit up on the right side!",
          "definition": "The phase period when the visible illuminated portion of the Moon is growing larger each night (lit on the right side).",
          "example": "During a waxing crescent, each evening shows a slightly wider sliver of light on the right.",
          "narration": "Waxing! When the Moon is waxing, the sunlight is growing bigger each night. Remember the trick: wax on, right side on!"
        },
        {
          "id": "m3_2_v2",
          "term": "Waning",
          "simpleMeaning": "The illuminated part of the Moon shrinking smaller each night, leaving only the left side lit!",
          "definition": "The phase period when the visible illuminated portion of the Moon is shrinking each night (lit on the left side).",
          "example": "A waning crescent moon shrinks into a thin sliver before disappearing into a New Moon.",
          "narration": "Waning! Waning means shrinking. After the Full Moon, the light begins fading from right to left, leaving just the left side glowing!"
        },
        {
          "id": "m3_2_v3",
          "term": "First Quarter",
          "simpleMeaning": "The phase about 7 days after New Moon when exactly the right half of the Moon looks lit up from Earth!",
          "definition": "The lunar phase occurring approximately 7 days after New Moon, when half of the Moon’s Earth-facing disk appears illuminated.",
          "example": "At First Quarter, observers in Dickinson see a lighted right half and a dark left half.",
          "narration": "First Quarter! Even though it looks like half a pie, it is called First Quarter because the Moon has finished one-fourth of its monthly orbit!"
        },
        {
          "id": "m3_2_v4",
          "term": "New Moon",
          "simpleMeaning": "When the Moon is between Earth and Sun, so its sunlit side faces away from us and the night sky is dark!",
          "definition": "The lunar phase when the Moon is positioned between the Sun and Earth, making its illuminated half face away from Earth.",
          "example": "During a New Moon, stargazers in Galveston County get the darkest skies for spotting shooting stars.",
          "narration": "New Moon! The Moon is directly between Earth and the Sun. Its sunny side faces outer space, so from our backyard, it looks completely dark!"
        }
      ]
    },
    "elaborate": {
      "title": "NASA JSC Artemis Mission Launch Window Challenge",
      "scenario": "NASA mission flight planners at Johnson Space Center in Houston require a Full Moon window to maximize lunar landing site illumination near the Shackleton Crater.",
      "goalDescription": "Given a First Quarter Moon observed over Dickinson Bayou on October 10th, calculate and select the exact launch date and predict the phase 14 days later.",
      "criteria": [
        "Predict the date of the next Full Moon (approx. 7 days after First Quarter).",
        "Predict the phase 14 days after First Quarter (Third/Last Quarter).",
        "Confirm orbit geometry aligns with NASA ground tracking radar requirements."
      ],
      "successFeedback": "Mission Go! Your lunar phase calculations provided the Artemis crew with optimal solar illumination for landing!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "How much of the Moon is always lit by sunlight in outer space?",
          "options": [
            "Exactly 50% (half of the Moon)",
            "Only 25%",
            "100% of the Moon",
            "0%—it makes its own light"
          ],
          "answer": 0,
          "hint": "Just like an orange held next to a flashlight, one half is always in the light!"
        },
        {
          "q": "Why does the Moon appear to change shape over the course of a month?",
          "options": [
            "Earth’s shadow blocks parts of the Moon every single night",
            "We see different amounts of the Moon’s sunlit half as it orbits Earth",
            "Space clouds roll across the Moon’s surface",
            "The Moon expands and shrinks like a balloon"
          ],
          "answer": 1,
          "hint": "The ball never changes shape—our viewing angle from Earth changes as it revolves!"
        },
        {
          "q": "When the Moon is \"waxing\", which side of the Moon is illuminated as seen from Texas?",
          "options": [
            "The left side",
            "The right side",
            "The top half only",
            "The bottom half only"
          ],
          "answer": 1,
          "hint": "Remember the memory rhyme: Wax on, right side on!"
        }
      ],
      "explore": [
        {
          "q": "Approximately how many days does it take to complete one full lunar cycle?",
          "options": [
            "7 days",
            "14 days",
            "29.5 days (about 1 month)",
            "365 days"
          ],
          "answer": 2,
          "hint": "Think of the word \"month\"—it comes from the Moon’s 29.5-day orbit!"
        },
        {
          "q": "On which day of the lunar cycle does the Full Moon appear?",
          "options": [
            "Day 1",
            "Day 7",
            "Day 14 (about halfway through)",
            "Day 29.5"
          ],
          "answer": 2,
          "hint": "Halfway through the 29.5-day cycle—around Day 14!"
        },
        {
          "q": "Where is Earth located during a Full Moon?",
          "options": [
            "Earth is between the Sun and the Moon",
            "The Moon is between Earth and the Sun",
            "The Sun is between Earth and the Moon",
            "Earth has orbited far out into deep space"
          ],
          "answer": 0,
          "hint": "Earth is in the middle, looking at the fully illuminated face of the Moon!"
        }
      ],
      "explain": [
        {
          "q": "If you see a First Quarter Moon tonight, what phase will be visible in about 7 days?",
          "options": [
            "New Moon",
            "Waxing Crescent",
            "Full Moon",
            "Third Quarter"
          ],
          "answer": 2,
          "hint": "Adding 7 days moves from First Quarter directly to the next major quarter phase!"
        },
        {
          "q": "What does the word \"gibbous\" mean when describing the Moon?",
          "options": [
            "Completely dark and invisible",
            "More than half illuminated, but not quite full",
            "A tiny sliver like a fingernail clipping",
            "Shining with green light"
          ],
          "answer": 1,
          "hint": "Gibbous means humpbacked—more than half lit like an oval football!"
        },
        {
          "q": "During which phase does the Moon rise at sunset and stay visible all night long?",
          "options": [
            "New Moon",
            "First Quarter",
            "Full Moon",
            "Third Quarter"
          ],
          "answer": 2,
          "hint": "The brilliant Full Moon shines opposite the Sun, rising right as dusk falls!"
        }
      ],
      "vocab": [
        {
          "q": "What is the phase called when the Moon is directly between the Earth and Sun, making it appear dark?",
          "options": [
            "Full Moon",
            "New Moon",
            "First Quarter",
            "Waning Crescent"
          ],
          "answer": 1,
          "hint": "It begins the brand new cycle: New Moon!"
        },
        {
          "q": "What term describes the Moon’s lit portion shrinking night after night?",
          "options": [
            "Waxing",
            "Waning",
            "Revolving",
            "Precipitating"
          ],
          "answer": 1,
          "hint": "Waning means shrinking, leaving light on the left side!"
        },
        {
          "q": "How long does the entire \"Lunar Cycle\" take from one New Moon to the next?",
          "options": [
            "24 hours",
            "7 days",
            "29.5 days",
            "365 days"
          ],
          "answer": 2,
          "hint": "Just under one month: 29.5 days!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A student observes a Full Moon over Dickinson Bayou on November 3rd. Approximately which date should the student expect to observe the next New Moon?",
        "options": [
          {
            "id": "a",
            "text": "November 10th (about 7 days later)"
          },
          {
            "id": "b",
            "text": "November 17th (about 14 to 15 days later)"
          },
          {
            "id": "c",
            "text": "November 24th (about 21 days later)"
          },
          {
            "id": "d",
            "text": "December 3rd (about 30 days later)"
          }
        ],
        "answer": "b",
        "explanation": "It takes approximately 14 to 15 days (about half of the 29.5-day cycle) to transition from Full Moon to New Moon!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO statements correctly describe the Moon as it orbits Earth? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Half of the Moon is always illuminated by sunlight in space."
          },
          {
            "id": "b",
            "text": "The Moon generates its own light through nuclear fire like the Sun."
          },
          {
            "id": "c",
            "text": "The apparent shape of the Moon changes because observers on Earth see different portions of its illuminated half."
          },
          {
            "id": "d",
            "text": "The complete lunar cycle takes exactly 365 days to finish."
          },
          {
            "id": "e",
            "text": "The Moon changes shape because Earth casts a daily shadow across it."
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "In space, half the Moon is constantly lit by sunlight (a). As it orbits Earth every 29.5 days, we see varying fractions of that lit hemisphere (c)!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: If a First Quarter Moon is observed over Dunbar Middle School tonight, which phase will be visible in approximately 7 days?",
        "optionsA": [
          {
            "id": "a",
            "text": "New Moon"
          },
          {
            "id": "b",
            "text": "Waxing Crescent"
          },
          {
            "id": "c",
            "text": "Full Moon"
          },
          {
            "id": "d",
            "text": "Third Quarter"
          }
        ],
        "answerA": "c",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "The Moon moves closer to the Sun every week."
          },
          {
            "id": "b",
            "text": "Each primary lunar phase transition occurs approximately 7.4 days apart in the 29.5-day cycle."
          },
          {
            "id": "c",
            "text": "Earth’s rotation flips the Moon upside down once every seven days."
          },
          {
            "id": "d",
            "text": "The Moon takes 7 days to complete one full revolution around the Sun."
          }
        ],
        "answerB": "b",
        "explanation": "The 29.5-day lunar cycle is divided into four main quarters about 7.4 days apart: New Moon -> First Quarter -> Full Moon -> Third Quarter -> New Moon!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding lunar phase progression using the drop-down menus:",
        "segments": [
          {
            "text": "When the visible lit portion of the Moon is growing larger from right to left, the Moon is described as "
          },
          {
            "blankId": "b1",
            "options": [
              "waxing",
              "waning",
              "eclipsing"
            ],
            "answer": "waxing"
          },
          {
            "text": "; when the lit portion is shrinking toward a New Moon, it is described as "
          },
          {
            "blankId": "b2",
            "options": [
              "waning",
              "waxing",
              "revolving"
            ],
            "answer": "waning"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Waxing means the illuminated portion is growing (lit on the right). Waning means the illuminated portion is shrinking (lit on the left)."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each lunar phase into the correct phase category based on whether the visible illuminated area is growing or shrinking:",
        "categories": [
          {
            "id": "waxing",
            "label": "Waxing Phases (Growing Light)"
          },
          {
            "id": "waning",
            "label": "Waning Phases (Shrinking Light)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Waxing Crescent (Right side sliver lit)",
            "category": "waxing"
          },
          {
            "id": "i2",
            "label": "Waning Gibbous (Left side mostly lit)",
            "category": "waning"
          },
          {
            "id": "i3",
            "label": "First Quarter (Right half lit)",
            "category": "waxing"
          },
          {
            "id": "i4",
            "label": "Waning Crescent (Left side sliver lit)",
            "category": "waning"
          }
        ],
        "explanation": "Waxing phases occur between New Moon and Full Moon (growing light on the right). Waning phases occur between Full Moon and New Moon (shrinking light on the left)."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Why is a New Moon completely invisible to observers in Dickinson, Texas on a clear night?",
        "options": [
          {
            "id": "a",
            "text": "The Moon moves behind the Sun and burns up."
          },
          {
            "id": "b",
            "text": "The illuminated side of the Moon faces directly toward the Sun, while the dark, shadowed side faces Earth."
          },
          {
            "id": "c",
            "text": "The Moon turns off its internal light bulb during New Moon."
          },
          {
            "id": "d",
            "text": "Earth’s oceans reflect dark shadows onto the lunar surface."
          }
        ],
        "answer": "b",
        "explanation": "During New Moon, the Moon sits between Earth and the Sun. Its sunlit half faces away into space, while the dark unlit side faces Earth, making it invisible against the dark sky!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "Kelenna looks out his window in Dickinson on Halloween night (October 31st) and spots a spectacular Full Moon. On approximately what date will the next Full Moon appear?",
        "options": [
          {
            "id": "a",
            "text": "November 7th"
          },
          {
            "id": "b",
            "text": "November 14th"
          },
          {
            "id": "c",
            "text": "November 29th or 30th"
          },
          {
            "id": "d",
            "text": "December 31st"
          }
        ],
        "answer": "c",
        "explanation": "Because a full lunar cycle requires approximately 29.5 days, the next Full Moon will appear about 29 to 30 days later, around November 29th or 30th!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO common myths about the Moon are scientifically FALSE? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Earth’s shadow causes the normal monthly cycle of moon phases."
          },
          {
            "id": "b",
            "text": "The Moon reflects sunlight rather than producing its own light."
          },
          {
            "id": "c",
            "text": "The Moon changes shape because clouds in Earth’s atmosphere block parts of it."
          },
          {
            "id": "d",
            "text": "The Moon takes about 29.5 days to complete its phase cycle."
          },
          {
            "id": "e",
            "text": "Half of the Moon is always lit by the Sun in space."
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Earth’s shadow only blocks the Moon during rare lunar eclipses (not monthly phases), and atmospheric clouds do not create moon phases! Both statements are false myths."
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: What phase is visible from Earth when exactly the right half of the Moon’s disk is illuminated?",
        "optionsA": [
          {
            "id": "a",
            "text": "Third Quarter"
          },
          {
            "id": "b",
            "text": "First Quarter"
          },
          {
            "id": "c",
            "text": "New Moon"
          },
          {
            "id": "d",
            "text": "Full Moon"
          }
        ],
        "answerA": "b",
        "promptB": "Part B: What phase will be visible approximately 3 to 4 days after the First Quarter?",
        "optionsB": [
          {
            "id": "a",
            "text": "Waxing Crescent"
          },
          {
            "id": "b",
            "text": "Waxing Gibbous"
          },
          {
            "id": "c",
            "text": "Waning Crescent"
          },
          {
            "id": "d",
            "text": "New Moon"
          }
        ],
        "answerB": "b",
        "explanation": "When the right half is lit, it is First Quarter. As the lit area continues growing toward Full Moon over the next 3 to 4 days, it becomes Waxing Gibbous!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding lunar cycle timing using the drop-down menus:",
        "segments": [
          {
            "text": "The transition from a New Moon to a Full Moon takes approximately "
          },
          {
            "blankId": "b1",
            "options": [
              "14 to 15 days",
              "7 days",
              "29.5 days"
            ],
            "answer": "14 to 15 days"
          },
          {
            "text": ", which represents "
          },
          {
            "blankId": "b2",
            "options": [
              "one-half of the complete lunar cycle",
              "the entire lunar cycle",
              "one-fourth of the lunar cycle"
            ],
            "answer": "one-half of the complete lunar cycle"
          },
          {
            "text": "."
          }
        ],
        "explanation": "New Moon to Full Moon is half of the orbit, taking 14 to 15 days (half of 29.5 days)."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Arrange the four primary lunar phases in correct chronological order starting from New Moon:",
        "categories": [
          {
            "id": "step1",
            "label": "Step 1 (Day 1)"
          },
          {
            "id": "step2",
            "label": "Step 2 (~Day 7)"
          },
          {
            "id": "step3",
            "label": "Step 3 (~Day 14)"
          },
          {
            "id": "step4",
            "label": "Step 4 (~Day 21)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "New Moon (Dark disk facing Earth)",
            "category": "step1"
          },
          {
            "id": "i2",
            "label": "First Quarter (Right half lit)",
            "category": "step2"
          },
          {
            "id": "i3",
            "label": "Full Moon (Entire disk illuminated)",
            "category": "step3"
          },
          {
            "id": "i4",
            "label": "Third Quarter (Left half lit)",
            "category": "step4"
          }
        ],
        "explanation": "The lunar cycle progresses predictably: New Moon (Day 1) -> First Quarter (~Day 7) -> Full Moon (~Day 14) -> Third Quarter (~Day 21) -> New Moon (~Day 29.5)!"
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "Why are flight controllers at NASA Johnson Space Center able to calculate the exact lighting conditions on the Moon years before an Artemis astronaut landing?",
        "options": [
          {
            "id": "a",
            "text": "Because lunar phases follow an unchanging, predictable 29.5-day cyclical pattern."
          },
          {
            "id": "b",
            "text": "Because astronauts use giant flashlights to illuminate the lunar surface."
          },
          {
            "id": "c",
            "text": "Because the Moon stops orbiting during NASA space missions."
          },
          {
            "id": "d",
            "text": "Because weather satellites can change the Moon’s orbital speed."
          }
        ],
        "answer": "a",
        "explanation": "The Moon’s revolution around Earth is governed by gravity and follows a strict, repeating 29.5-day cycle. This allows scientists to calculate exact lunar lighting years into the future!"
      }
    ]
  },
  {
    "id": "m3_3",
    "unitId": 3,
    "unitTitle": "Unit 3: Earth & Space Systems",
    "gradingPeriod": "3rd Nine Weeks (CBA 3)",
    "code": "TEKS 4.10A, 4.10C",
    "title": "The Water Cycle & Weather vs. Climate",
    "subtitle": "Galveston Bay Evaporation, Condensation & 30-Year Climate",
    "icon": "🌧️",
    "accentColor": "#0ea5e9",
    "iCanStatement": "I can describe and illustrate the continuous movement of water above and on the surface of Earth through the water cycle, and distinguish between day-to-day weather and long-term climate patterns.",
    "localAnchor": "Galveston Bay and Dickinson Bayou: How intense Gulf of Mexico solar heating drives high evaporation, sea-breeze afternoon thunderstorms, and why Dickinson’s humid subtropical climate differs from a single stormy afternoon.",
    "engage": {
      "hookQuestion": "A severe afternoon thunderstorm dumped 3 inches of rain on Dickinson Bayou on Tuesday, but Wednesday was sunny and dry. Does this sudden change represent weather or climate?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "It represents weather, because weather describes the day-to-day conditions of the atmosphere at a specific time and place.",
          "correct": true,
          "feedback": "Correct, Kelenna! Daily storms and sunshine describe weather! Climate is the long-term 30-year average pattern."
        },
        {
          "id": "b",
          "text": "It represents climate, because any thunderstorm in Texas permanently alters the climate record.",
          "correct": false,
          "feedback": "A single storm is just today’s weather snapshot. Climate takes decades of weather data to calculate!"
        },
        {
          "id": "c",
          "text": "It represents water table depletion, because rain immediately leaves the water cycle forever.",
          "correct": false,
          "feedback": "Rainwater never leaves the cycle! It runs into Dickinson Bayou, flows to Galveston Bay, and evaporates right back up into the air!"
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            14
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Solar Heating over Galveston Bay",
            "text": "The Sun provides the thermal energy driving water evaporation from Galveston Bay.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look at Galveston Bay, Kelenna! The Sun is like a giant heat lamp in the sky. When sunlight beats down on the water, liquid water molecules get energized and float up into the air as invisible water vapor—that is evaporation!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            4,
            5,
            8
          ],
          "lookAt": [
            1,
            3,
            0
          ],
          "callout": {
            "title": "Condensation & Cloud Formation",
            "text": "Rising vapor cools at higher altitudes, condensing into billions of cloud droplets.",
            "pos": [
              1,
              4,
              0
            ]
          },
          "narration": "As that warm vapor rises miles above Dickinson, the air gets freezing cold! The gas loses heat, slowing down and clumping together onto microscopic specks of dust to form clouds—just like fog appearing on your bathroom mirror!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -4,
            6,
            8
          ],
          "lookAt": [
            -1,
            2,
            0
          ],
          "callout": {
            "title": "Precipitation over Dickinson Bayou",
            "text": "When droplets become too heavy for updrafts, gravity pulls them down as precipitation.",
            "pos": [
              -1,
              3,
              0
            ]
          },
          "narration": "Inside that cloud, billions of tiny droplets bump and stick together. When they get too heavy for rising air to hold up, gravity takes over and pulls them crashing down to Earth as rain—precipitation!",
          "sfx": "splash"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            10,
            12
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Runoff & Collection",
            "text": "Runoff flows through wetlands and bayous back into Galveston Bay and the Gulf of Mexico.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Rainwater rushes off roofs, playgrounds, and grass into Dickinson Bayou. It flows right back into Galveston Bay, ready to be heated by the Sun again. Earth’s water is millions of years old, constantly recycling!",
          "sfx": "whoosh"
        }
      ]
    },
    "explore": {
      "instructions": "Heat the Galveston Bay waters with the Solar Radiation slider to initiate evaporation. Trace water molecules rising, cooling, condensing into cumulus clouds, precipitating over Dickinson Bayou, and collecting as runoff.",
      "labPrompts": [
        "Increase solar energy to observe vapor particle flux rising from Galveston Bay.",
        "Lower air altitude temperature to trigger condensation and droplet formation.",
        "Toggle the 30-Year Climate Data overlay to compare Dickinson’s average annual precipitation (53 inches) with daily storm spikes."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            6,
            12
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Evaporation & Transpiration",
            "text": "Liquid water absorbs heat to become vapor; plants also release vapor through transpiration.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Water has two main ways to leap into the sky: evaporation from bayous and oceans, and transpiration—which is plants \"breathing out\" extra water vapor through microscopic pores on their green leaves!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            3,
            4,
            6
          ],
          "lookAt": [
            0,
            3,
            0
          ],
          "callout": {
            "title": "Condensation Physics",
            "text": "Thermal energy is released as water vapor gas changes into liquid water droplets.",
            "pos": [
              0,
              3,
              0
            ]
          },
          "narration": "Condensation is a cooling process! When invisible water vapor gas chills out high above the ground, it turns back into liquid water droplets. Millions of these droplets huddle together to build fluffy clouds!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -3,
            4,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Precipitation Types",
            "text": "Rain, snow, sleet, or hail fall depending on atmospheric temperature profiles.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Precipitation comes in four main flavors: rain, snow, sleet, and hail! In Dickinson, Texas, our air is usually warm, so we get liquid rain, but strong storm updrafts can toss ice balls into the sky to make hail!",
          "sfx": "splash"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            8,
            10
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Weather: Short-Term Snapshot",
            "text": "Current temperature, humidity, wind speed, and precipitation measured hourly.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Weather is what is happening right now outside Dunbar Middle School. It tells you what to wear today: a rain poncho for an afternoon storm, or sunscreen and a t-shirt for PE on the field!",
          "sfx": "wind"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            12,
            14
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Climate: 30-Year Trend",
            "text": "Long-term statistical averages of temperature and rainfall defining a geographic region.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Climate is the big picture over 30 years or more! Think of weather as what you wear today, and climate as what is in your entire closet. Dickinson has a humid subtropical climate with hot summers and mild winters!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m3_3_v0",
          "term": "Evaporation",
          "simpleMeaning": "Liquid water soaking up heat energy from the Sun and turning into invisible floating water vapor gas!",
          "definition": "The physical change of state where liquid water absorbs thermal energy and turns into invisible water vapor gas.",
          "example": "Puddles on the Dunbar playground evaporate quickly under the hot Texas morning sun.",
          "narration": "Evaporation! Think of a pot of soup on the stove. Heat makes water turn into invisible steam that floats up into the air. That is evaporation happening all over Galveston Bay!"
        },
        {
          "id": "m3_3_v1",
          "term": "Condensation",
          "simpleMeaning": "Invisible water vapor cooling down high in the sky and turning back into tiny liquid water droplets that make clouds!",
          "definition": "The physical change of state where rising water vapor cools and transforms into tiny liquid water droplets forming clouds.",
          "example": "Water droplets forming on the outside of an ice-cold lemonade cup demonstrate condensation.",
          "narration": "Condensation! When warm water vapor hits cold air high above us, it chills out and clumps back into liquid water droplets. Billions of these droplets make a cloud!"
        },
        {
          "id": "m3_3_v2",
          "term": "Precipitation",
          "simpleMeaning": "Water falling from clouds down to Earth as rain, snow, sleet, or hail when the drops become too heavy!",
          "definition": "Water falling from clouds to Earth’s surface in the form of rain, snow, sleet, or hail when droplets become heavy.",
          "example": "Dickinson receives about 53 inches of rainfall precipitation every year.",
          "narration": "Precipitation! When cloud droplets get too heavy for rising air currents to hold, gravity pulls them down. In Texas, that usually means a splashy rainstorm!"
        },
        {
          "id": "m3_3_v3",
          "term": "Weather",
          "simpleMeaning": "What the air outside is doing right now—temperature, wind, clouds, and rain today!",
          "definition": "The short-term atmospheric conditions (temperature, humidity, precipitation, wind) at a specific time and location.",
          "example": "Today’s weather in Dickinson is 82°F with humid air and scattered afternoon rain.",
          "narration": "Weather! Weather is today’s snapshot. It answers the question: Should I pack an umbrella or wear a short-sleeve shirt to school today?"
        },
        {
          "id": "m3_3_v4",
          "term": "Climate",
          "simpleMeaning": "The average weather pattern of a city or region tracked over 30 or more years!",
          "definition": "The long-term average pattern of weather conditions observed over a region across a period of 30 years or more.",
          "example": "Galveston County has a warm, humid subtropical climate with mild winters and hot summers.",
          "narration": "Climate! Climate is the long-term champion. While weather changes day to day, climate is the 30-year average of what weather you expect in our corner of Texas!"
        }
      ]
    },
    "elaborate": {
      "title": "Galveston Bay Watershed Flood Mitigation Challenge",
      "scenario": "Dickinson Bayou drainage engineers need to model a 5-day Gulf tropical low-pressure system to predict floodwater runoff volume into Galveston Bay.",
      "goalDescription": "Balance retention ponds and wetland buffer absorption to prevent residential street flooding while maintaining bayou water quality.",
      "criteria": [
        "Divert storm runoff through natural cordgrass salt marsh filters.",
        "Limit peak bayou crest elevation to under 12 feet above mean sea level.",
        "Maintain dissolved oxygen balance in Galveston Bay during post-storm runoff."
      ],
      "successFeedback": "Engineering Success! Your wetland buffer design absorbed excess precipitation and prevented bayou overflowing!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "What provides the primary thermal energy that powers the entire water cycle on Earth?",
          "options": [
            "The Sun",
            "Earth’s magnetic core",
            "Ocean waves",
            "Windmills"
          ],
          "answer": 0,
          "hint": "The giant ball of solar fire warming our planet!"
        },
        {
          "q": "If it rains 2 inches on Monday in Dickinson, is that an example of weather or climate?",
          "options": [
            "Weather, because it describes atmospheric conditions on a single specific day",
            "Climate, because all rain in Texas counts as climate",
            "Neither, it is called geology",
            "Climate, because 2 inches permanently changes the continent"
          ],
          "answer": 0,
          "hint": "Day-to-day conditions are weather!"
        },
        {
          "q": "What happens to water after it rains into Dickinson Bayou?",
          "options": [
            "It is destroyed forever and vanishes from the universe",
            "It flows as runoff into Galveston Bay, ready to evaporate again",
            "It freezes solid permanently under the mud",
            "It turns into rock"
          ],
          "answer": 1,
          "hint": "Water is always recycled in an unbroken loop!"
        }
      ],
      "explore": [
        {
          "q": "When water heats up on the surface of Galveston Bay, what does it turn into?",
          "options": [
            "Solid ice crystals",
            "Invisible water vapor gas",
            "Salt rocks",
            "Liquid nitrogen"
          ],
          "answer": 1,
          "hint": "Liquid water absorbs heat and turns into a gas called water vapor!"
        },
        {
          "q": "Why do clouds form high up in the sky instead of right on the ground?",
          "options": [
            "High altitude air is much colder, which causes water vapor to condense",
            "There is no gravity high in the sky",
            "The Sun is closer to the ground than clouds",
            "Wind pushes water into outer space"
          ],
          "answer": 0,
          "hint": "Cold temperatures aloft make gas molecules slow down and condense!"
        },
        {
          "q": "What is Dickinson’s average annual precipitation over 30 years?",
          "options": [
            "About 5 inches",
            "About 53 inches",
            "Over 500 inches",
            "Zero inches"
          ],
          "answer": 1,
          "hint": "Our coastal county receives plenty of rain—around 53 inches per year!"
        }
      ],
      "explain": [
        {
          "q": "What is transpiration?",
          "options": [
            "Water evaporating directly from hot highway asphalt",
            "Plants releasing water vapor into the air through microscopic leaf pores",
            "Rain turning into hail inside a thundercloud",
            "River water soaking deep underground into caves"
          ],
          "answer": 1,
          "hint": "Plants \"sweating\" out water vapor through leaf stomata!"
        },
        {
          "q": "Which phase change occurs during condensation?",
          "options": [
            "Gas turns into liquid",
            "Liquid turns into gas",
            "Solid turns into gas",
            "Liquid freezes into solid"
          ],
          "answer": 0,
          "hint": "Vapor gas cools and transforms into liquid droplets!"
        },
        {
          "q": "What is the best everyday analogy for weather versus climate?",
          "options": [
            "Weather is what you wear today; climate is what is in your whole closet",
            "Weather is the ocean; climate is a swimming pool",
            "Weather takes 30 years; climate takes 1 hour",
            "Weather is inside a refrigerator; climate is inside an oven"
          ],
          "answer": 0,
          "hint": "Today’s outfit vs. your year-round wardrobe!"
        }
      ],
      "vocab": [
        {
          "q": "What is the physical process of liquid water becoming water vapor gas called?",
          "options": [
            "Condensation",
            "Evaporation",
            "Precipitation",
            "Deposition"
          ],
          "answer": 1,
          "hint": "E-vapor-ation turns water into vapor!"
        },
        {
          "q": "Rain, snow, sleet, and hail are all forms of what vocabulary term?",
          "options": [
            "Precipitation",
            "Transpiration",
            "Erosion",
            "Magnetism"
          ],
          "answer": 0,
          "hint": "Water falling from clouds to Earth!"
        },
        {
          "q": "What is the 30-year average pattern of atmospheric conditions in a region called?",
          "options": [
            "Weather",
            "Climate",
            "Solar Noon",
            "Runoff"
          ],
          "answer": 1,
          "hint": "Multi-decade long-term average!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "Which statement describes an example of climate rather than weather?",
        "options": [
          {
            "id": "a",
            "text": "It rained 2.5 inches in Dickinson on Tuesday afternoon."
          },
          {
            "id": "b",
            "text": "The temperature at Dunbar Middle School reached 94°F at 2:00 PM."
          },
          {
            "id": "c",
            "text": "Galveston County typically receives an average of 53 inches of rainfall each year over the past 30 years."
          },
          {
            "id": "d",
            "text": "A strong wind gust of 35 mph blew across Galveston Bay this morning."
          }
        ],
        "answer": "c",
        "explanation": "Climate describes long-term statistical averages over 30 or more years (like average annual rainfall), whereas specific daily measurements represent weather!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO processes in the water cycle require water molecules to absorb thermal heat energy from the Sun? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Evaporation of liquid water from Galveston Bay into vapor"
          },
          {
            "id": "b",
            "text": "Condensation of water vapor into cloud droplets"
          },
          {
            "id": "c",
            "text": "Transpiration of water vapor from plant leaves into the atmosphere"
          },
          {
            "id": "d",
            "text": "Precipitation falling as raindrops onto Dickinson Bayou"
          },
          {
            "id": "e",
            "text": "Percolation of groundwater through sand layers"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Both evaporation (from water bodies) and transpiration (from plant leaves) require liquid water to absorb thermal heat energy to transform into water vapor gas!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: What happens to water vapor as it rises higher into the colder atmosphere above Dickinson, Texas?",
        "optionsA": [
          {
            "id": "a",
            "text": "It heats up and escapes directly into outer space."
          },
          {
            "id": "b",
            "text": "It cools down and condenses into tiny liquid droplets that form clouds."
          },
          {
            "id": "c",
            "text": "It turns into solid iron minerals."
          },
          {
            "id": "d",
            "text": "It dissolves all air into pure oxygen."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "The Sun gets hotter the higher you travel into the sky."
          },
          {
            "id": "b",
            "text": "Atmospheric temperature decreases with altitude in the troposphere, causing water vapor to lose heat energy and condense."
          },
          {
            "id": "c",
            "text": "Gravity pulls all gas particles into the ocean."
          },
          {
            "id": "d",
            "text": "Wind speeds decrease to zero at high altitudes."
          }
        ],
        "answerB": "b",
        "explanation": "As warm, moist air rises, it enters colder temperatures at higher altitudes. The gas molecules lose thermal energy, slow down, and condense into cloud droplets!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding the water cycle using the drop-down menus:",
        "segments": [
          {
            "text": "In the water cycle, water moves from Earth’s surface up into the atmosphere through "
          },
          {
            "blankId": "b1",
            "options": [
              "evaporation and transpiration",
              "condensation and freezing",
              "precipitation and runoff"
            ],
            "answer": "evaporation and transpiration"
          },
          {
            "text": ", and returns back down to Earth’s surface through "
          },
          {
            "blankId": "b2",
            "options": [
              "precipitation",
              "condensation",
              "sublimation"
            ],
            "answer": "precipitation"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Water enters the atmosphere as gas through evaporation and plant transpiration, and returns to Earth as liquid or solid water through precipitation!"
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each atmospheric statement into the correct scientific category (Weather vs. Climate):",
        "categories": [
          {
            "id": "weather",
            "label": "Weather (Short-Term Conditions)"
          },
          {
            "id": "climate",
            "label": "Climate (30+ Year Average Pattern)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "The current humidity in Dickinson is 88% with afternoon drizzle.",
            "category": "weather"
          },
          {
            "id": "i2",
            "label": "July in Galveston County is historically the hottest month with 30-year average highs of 91°F.",
            "category": "climate"
          },
          {
            "id": "i3",
            "label": "A cold front dropped temperatures 20 degrees in two hours yesterday.",
            "category": "weather"
          },
          {
            "id": "i4",
            "label": "The Texas Gulf Coast region is classified as a humid subtropical climate.",
            "category": "climate"
          }
        ],
        "explanation": "Current daily measurements (drizzle, sudden cold fronts) describe weather. Decades of historical averages and regional classifications describe climate."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Kelenna pours cold iced tea into a glass on a humid Dickinson afternoon. Five minutes later, drops of liquid water appear on the outside of the glass. Where did this water come from?",
        "options": [
          {
            "id": "a",
            "text": "The tea leaked directly through microscopic holes in the glass."
          },
          {
            "id": "b",
            "text": "Water vapor in the warm surrounding air cooled upon touching the cold glass and condensed into liquid droplets."
          },
          {
            "id": "c",
            "text": "The ice cubes evaporated into solid ice on the table."
          },
          {
            "id": "d",
            "text": "The glass produced water through photosynthesis."
          }
        ],
        "answer": "b",
        "explanation": "Warm air contains invisible water vapor. When that warm gas contacts the freezing cold glass surface, it loses heat and condenses into liquid drops—a perfect model of cloud formation!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "Why doesn’t Earth ever run out of freshwater even though billions of people, animals, and plants use water every single day?",
        "options": [
          {
            "id": "a",
            "text": "Comets deliver millions of gallons of fresh water to Texas every night."
          },
          {
            "id": "b",
            "text": "Earth’s water is constantly recycled and purified through the continuous stages of the water cycle."
          },
          {
            "id": "c",
            "text": "Volcanoes create brand-new water from melted rock."
          },
          {
            "id": "d",
            "text": "Humans manufacture new water atoms in factories."
          }
        ],
        "answer": "b",
        "explanation": "The total amount of water on Earth stays nearly constant. The water cycle continuously evaporates, purifies, condenses, and returns water back to Earth in an endless loop!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO forms of precipitation fall to Earth as solid ice rather than liquid water? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Hail"
          },
          {
            "id": "b",
            "text": "Rain"
          },
          {
            "id": "c",
            "text": "Snow"
          },
          {
            "id": "d",
            "text": "Fog"
          },
          {
            "id": "e",
            "text": "Morning Dew"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Hail (layered ice balls formed in storm updrafts) and snow (crystalline ice formed in freezing clouds) are solid forms of precipitation. Rain is liquid, while fog and dew are surface condensation."
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: How do trees and coastal prairie grasses in Galveston County contribute to the water cycle?",
        "optionsA": [
          {
            "id": "a",
            "text": "They absorb water from soil through roots and release water vapor into the air through leaf transpiration."
          },
          {
            "id": "b",
            "text": "They permanently trap all water so it can never evaporate."
          },
          {
            "id": "c",
            "text": "They freeze bayou water into solid glaciers."
          },
          {
            "id": "d",
            "text": "They drink ocean water and turn it into crude oil."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: On a bright, sunny afternoon, what will happen to the rate of transpiration from plant leaves?",
        "optionsB": [
          {
            "id": "a",
            "text": "It will increase because solar heat opens leaf stomata to drive gas and water exchange."
          },
          {
            "id": "b",
            "text": "It will drop to absolute zero."
          },
          {
            "id": "c",
            "text": "Plants will begin sucking in rain clouds from the sky."
          },
          {
            "id": "d",
            "text": "Transpiration only happens when plants are dead."
          }
        ],
        "answerB": "a",
        "explanation": "Plants pull water from the soil and release it through leaf stomata as vapor (transpiration). Sunlight and heat increase the rate of transpiration!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the comparison between weather and climate using the drop-down menus:",
        "segments": [
          {
            "text": "A student recording the daily rainfall and wind speed for a science project is measuring "
          },
          {
            "blankId": "b1",
            "options": [
              "weather",
              "climate",
              "erosion"
            ],
            "answer": "weather"
          },
          {
            "text": ", while a meteorologist analyzing the 30-year average temperatures to determine when crops should be planted is studying "
          },
          {
            "blankId": "b2",
            "options": [
              "climate",
              "weather",
              "porosity"
            ],
            "answer": "climate"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Daily atmospheric observations describe weather; multi-decade historical trends and averages describe climate."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Sort each water cycle step based on whether water molecules are GAINING thermal energy or LOSING thermal energy:",
        "categories": [
          {
            "id": "gain",
            "label": "Gaining Thermal Heat Energy"
          },
          {
            "id": "lose",
            "label": "Losing Thermal Heat Energy (Cooling)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Evaporation of water from Galveston Bay into vapor gas",
            "category": "gain"
          },
          {
            "id": "i2",
            "label": "Condensation of rising water vapor into liquid cloud droplets",
            "category": "lose"
          },
          {
            "id": "i3",
            "label": "Transpiration of water from leaves into warm atmospheric air",
            "category": "gain"
          },
          {
            "id": "i4",
            "label": "Freezing of liquid raindrops into hail ice pellets in a cold cloud",
            "category": "lose"
          }
        ],
        "explanation": "Evaporation and transpiration absorb heat (gain energy to become gas). Condensation and freezing release heat (lose energy to become liquid or ice)."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A weather reporter on Houston TV Channel 11 states: \"Expect a high of 86°F with a 60% chance of thunderstorms this afternoon in Dickinson.\" This forecast is describing:",
        "options": [
          {
            "id": "a",
            "text": "The regional climate of Southeast Texas"
          },
          {
            "id": "b",
            "text": "The daily weather forecast for Dickinson"
          },
          {
            "id": "c",
            "text": "The 30-year rainfall average for Galveston County"
          },
          {
            "id": "d",
            "text": "The lunar cycle phase for tonight"
          }
        ],
        "answer": "b",
        "explanation": "Specific predictions of temperature and storm likelihood for a single afternoon describe day-to-day weather!"
      }
    ]
  },
  {
    "id": "m3_4",
    "unitId": 3,
    "unitTitle": "Unit 3: Earth & Space Systems",
    "gradingPeriod": "3rd Nine Weeks (CBA 3)",
    "code": "TEKS 4.10B",
    "title": "Slow Changes to Earth’s Surface (WED)",
    "subtitle": "Weathering, Erosion, Deposition: Canyons, Deltas & Dunes",
    "icon": "🏞️",
    "accentColor": "#d97706",
    "iCanStatement": "I can model and explain how the slow processes of weathering, erosion, and deposition by water, wind, and ice shape Earth’s landforms, including canyons, river deltas, and sand dunes.",
    "localAnchor": "Dickinson Bayou sedimentation and the Mississippi/Brazos River deltas along the Texas Gulf Coast, plus Galveston Island sand dunes formed by coastal wind.",
    "engage": {
      "hookQuestion": "Over thousands of years, Dickinson Bayou has carved a twisting channel through clay and deposited sandbars at its mouth in Galveston Bay. What sequence of Earth processes caused this?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Weathering broke down rock and soil, moving water eroded (carried) the sediment, and deposition dropped it in the bay.",
          "correct": true,
          "feedback": "Bingo, Kelenna! Remember the golden rhyme: Weathering BREAKS it, Erosion TAKES it, Deposition MAKES it!"
        },
        {
          "id": "b",
          "text": "Volcanic eruptions pushed the sandbars upward while earthquakes sliced the bayou channels.",
          "correct": false,
          "feedback": "No volcanoes here in Dickinson! Flowing bayou water slowly sculpted our Texas bayou channels over centuries."
        },
        {
          "id": "c",
          "text": "Deposition broke the rocks, erosion froze them, and weathering carried them away.",
          "correct": false,
          "feedback": "Careful with the order! Weathering must break the rock first, erosion moves it, and deposition drops it last!"
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            16
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Weathering Breaks Rock",
            "text": "Mechanical and chemical forces break solid rock into smaller sediment particles.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look at that giant rock, Kelenna! Weathering is nature’s demolition crew. Rainwater seeps into cracks, freezes during a winter freeze, and expands like an ice cube popping a bottle, shattering solid rock into gravel and sand!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            6,
            4,
            8
          ],
          "lookAt": [
            2,
            0,
            0
          ],
          "callout": {
            "title": "Erosion Carries Sediment",
            "text": "Moving water, wind, and glaciers transport sediment away from its source.",
            "pos": [
              2,
              1,
              0
            ]
          },
          "narration": "Now comes the moving truck: erosion! When heavy storm rain hits Dickinson, rushing bayou water grabs loose mud and sand, sweeping it downstream just like a garden hose washing dirt down your driveway!",
          "sfx": "splash"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -6,
            4,
            8
          ],
          "lookAt": [
            -2,
            0,
            0
          ],
          "callout": {
            "title": "Deposition Builds New Land",
            "text": "When moving water or wind slows down, it drops sediment, building deltas and dunes.",
            "pos": [
              -2,
              1,
              0
            ]
          },
          "narration": "Finally: deposition! When the swift bayou current enters the wide, calm waters of Galveston Bay, it suddenly slows down. It cannot carry heavy sand anymore, so it drops it—building fan-shaped deltas and sandbars!",
          "sfx": "chime"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            10,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "WED Shapes Landforms",
            "text": "Weathering breaks it, erosion takes it, and deposition makes it over millions of years.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "These three slow processes work together every single second! Over millions of years, weathering, erosion, and deposition have carved steep canyons, built coastal deltas, and piled up towering beach sand dunes!",
          "sfx": "wind"
        }
      ]
    },
    "explore": {
      "instructions": "Select an agent of change (Moving River Water, Coastal Wind, or Glacial Ice). Adjust flow rate and time scales to watch real-time terrain vertex displacement carve canyons, build river deltas, and shape sand dunes.",
      "labPrompts": [
        "Run water flow down the river valley to observe V-shaped canyon carving upstream and sediment accumulation downstream.",
        "Direct wind across coastal sand flats to observe dune migration and ripple deposition patterns.",
        "Compare the size of sediment particles (boulders vs. fine silt) carried by slow vs. fast water currents."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            6,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Weathering: The Rock Breaker",
            "text": "Ice wedging, acid rain, and tree roots break rock into gravel, sand, silt, and clay.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Weathering stays in place. When live oak tree roots push into sidewalk cracks or water freezes inside stone crevices, the rock breaks into smaller pieces called sediment. Nothing has moved yet—it is just broken!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            5,
            3,
            7
          ],
          "lookAt": [
            1,
            0,
            0
          ],
          "callout": {
            "title": "Erosion: The Sediment Mover",
            "text": "Gravity, running water, ocean waves, and howling winds transport weathered pieces.",
            "pos": [
              1,
              1,
              0
            ]
          },
          "narration": "Erosion is all about movement! Think of water, wind, ice, or gravity as conveyor belts carrying broken dirt away. During tropical storms along Dickinson Bayou, brown floodwaters carry tons of eroded soil!",
          "sfx": "splash"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -5,
            3,
            7
          ],
          "lookAt": [
            -1,
            0,
            0
          ],
          "callout": {
            "title": "Deposition: The Landform Builder",
            "text": "Sediment settles out in low-energy environments: lakes, bays, floodplains, and coasts.",
            "pos": [
              -1,
              1,
              0
            ]
          },
          "narration": "Deposition is where sediment gets dropped off. When moving water or wind runs out of energy, gravity wins and drops the dirt. That is how layers of nutrient-rich soil form across our Texas coastal floodplains!",
          "sfx": "chime"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            7,
            9
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Canyons vs. Deltas",
            "text": "Canyons are carved by erosive water cutting downward; deltas are built by deposition.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Here is the big STAAR contrast: canyons are carved OUT by rushing water erosion cutting down into rock. Deltas are built UP by deposition where slow water drops sediment at a river mouth!",
          "sfx": "whoosh"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            9,
            13
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Wind-Formed Sand Dunes",
            "text": "Wind blows dry sand into gentle windward slopes and steep slip faces on Galveston Island.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Take a trip to Galveston Island beach! Strong coastal breezes erode dry beach sand, blowing it inland until sea oat grasses trap the grains. Layer by layer, wind deposition builds tall, protective sand dunes!",
          "sfx": "wind"
        }
      ],
      "vocabulary": [
        {
          "id": "m3_4_v0",
          "term": "Weathering",
          "simpleMeaning": "The breaking down of rocks into smaller pieces like gravel, sand, and mud by water, wind, ice, or growing plant roots!",
          "definition": "The mechanical or chemical breaking down of rocks into smaller fragments called sediment by water, wind, ice, or roots.",
          "example": "Water freezing in a rock crack expands and causes mechanical weathering.",
          "narration": "Weathering! Weathering is nature’s hammer. It breaks big rocks into smaller bits right where they sit, using freezing ice, rushing wind, or tough tree roots!"
        },
        {
          "id": "m3_4_v1",
          "term": "Erosion",
          "simpleMeaning": "The moving and carrying away of broken rock and soil from one place to another by water, wind, ice, or gravity!",
          "definition": "The movement or transport of weathered sediment from one location to another by water, wind, ice, or gravity.",
          "example": "Rushing floodwaters eroded the muddy banks along Dickinson Bayou.",
          "narration": "Erosion! Once rock is broken into pieces, erosion carries it away! Think of moving water, howling wind, or sliding glaciers acting like nature’s moving van!"
        },
        {
          "id": "m3_4_v2",
          "term": "Deposition",
          "simpleMeaning": "The dropping off or laying down of sediment in a new spot when water or wind slows down and loses energy!",
          "definition": "The dropping off, settling, or laying down of eroded sediment in a new location when carrying energy decreases.",
          "example": "Sandbars in Galveston Bay are formed by the deposition of river sediment.",
          "narration": "Deposition! Deposition means \"depositing\" or dropping off. When river currents slow down, they drop their load of sand and mud, building brand-new land!"
        },
        {
          "id": "m3_4_v3",
          "term": "Delta",
          "simpleMeaning": "A fan-shaped or triangle-shaped piece of land built by deposited mud and sand at the mouth where a river enters the ocean!",
          "definition": "A fan-shaped landform formed at the mouth of a river where flowing water slows down and deposits sediment into a standing body of water.",
          "example": "The Brazos and Mississippi Rivers built massive deltas through continuous deposition.",
          "narration": "Delta! When a muddy river reaches the calm ocean, it slows down and drops its sand in a giant triangle shape that looks like a duck’s webbed foot—a delta!"
        },
        {
          "id": "m3_4_v4",
          "term": "Sand Dune",
          "simpleMeaning": "A giant hill or mound of loose sand piled up and shaped by the blowing wind along beaches or deserts!",
          "definition": "A hill or ridge of loose sand deposited and shaped by the action of wind along coastlines or in deserts.",
          "example": "Galveston Island features coastal sand dunes that protect homes from hurricane storm surges.",
          "narration": "Sand Dune! Wind acts like a giant broom sweeping beach sand into big rolling hills. Sand dunes on Galveston Island protect our coastal towns from ocean waves!"
        }
      ]
    },
    "elaborate": {
      "title": "Dickinson Bayou Bank Stabilization STEM Project",
      "scenario": "High boat wake energy and storm currents are eroding the soft earthen banks along Dickinson Bayou Park, threatening heritage live oak trees.",
      "goalDescription": "Design a tiered bio-retention shoreline using riprap limestone rocks, native cordgrass roots, and sediment catchment baffles to halt erosion.",
      "criteria": [
        "Reduce bank soil loss by at least 85% under high-flow flood conditions.",
        "Promote natural sediment deposition along bank toes rather than channel scouring.",
        "Preserve shoreline riparian habitat for bayou wildlife."
      ],
      "successFeedback": "Stabilization Verified! Native root systems anchored sediment and protected the Dickinson Bayou shoreline from rapid erosion!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "What is the correct 3-step sequence that changes Earth’s surface?",
          "options": [
            "Weathering breaks it, Erosion takes it, Deposition makes it",
            "Deposition breaks it, Weathering takes it, Erosion makes it",
            "Erosion breaks it, Deposition takes it, Weathering makes it",
            "Sediment breaks it, Water freezes it, Fire melts it"
          ],
          "answer": 0,
          "hint": "Remember the rhyme: BREAKS it (W), TAKES it (E), MAKES it (D)!"
        },
        {
          "q": "How did Dickinson Bayou form its twisting channel over centuries?",
          "options": [
            "Flowing water slowly weathered and eroded the soft clay banks",
            "A meteor hit Dickinson thousands of years ago",
            "Volcanoes pushed molten lava through Galveston County",
            "Giant dinosaurs dug the bayou with their claws"
          ],
          "answer": 0,
          "hint": "Running water is one of the most powerful carving forces on Earth!"
        },
        {
          "q": "What causes sand to drop to the bottom when Dickinson Bayou reaches Galveston Bay?",
          "options": [
            "The water speeds up to 100 miles per hour",
            "The water slows down, losing energy to carry heavy sediment",
            "The water freezes solid instantly",
            "Saltwater evaporates into thin air"
          ],
          "answer": 1,
          "hint": "When water slows down, gravity pulls sediment to the bottom!"
        }
      ],
      "explore": [
        {
          "q": "Which landform is carved out by fast river water cutting down into rock layers over millions of years?",
          "options": [
            "A deep V-shaped canyon",
            "A coastal sand dune",
            "A flat river delta",
            "A volcanic island"
          ],
          "answer": 0,
          "hint": "Think of the Grand Canyon carved by the Colorado River!"
        },
        {
          "q": "What agent of erosion builds sand dunes on Galveston Island?",
          "options": [
            "Glacial ice sheets",
            "Coastal wind",
            "Underground earthquakes",
            "Lava flows"
          ],
          "answer": 1,
          "hint": "Strong ocean breezes blow sand into mounds!"
        },
        {
          "q": "Which sediment settles to the bottom first when flowing water begins to slow down?",
          "options": [
            "Heavy gravel and larger pebbles",
            "Microscopic silt and clay",
            "Dissolved oxygen bubbles",
            "Floating wood bark"
          ],
          "answer": 0,
          "hint": "Heavier particles drop out first when water loses speed!"
        }
      ],
      "explain": [
        {
          "q": "How does ice wedging break rocks apart?",
          "options": [
            "Water seeps into cracks, freezes, expands, and splits the rock",
            "Ice melts and dissolves all stone into liquid",
            "Ice produces electrical sparks that explode rocks",
            "Ice makes rocks shrink until they disappear"
          ],
          "answer": 0,
          "hint": "Water expands when it freezes into ice, pushing rock cracks open!"
        },
        {
          "q": "What is the key scientific difference between weathering and erosion?",
          "options": [
            "Weathering breaks rock in place; erosion transports the broken sediment away",
            "Weathering moves rocks; erosion drops rocks",
            "Weathering takes 1 day; erosion takes 100 years",
            "There is no difference"
          ],
          "answer": 0,
          "hint": "Weathering breaks; erosion moves!"
        },
        {
          "q": "Why are sand dunes important for coastal communities like Galveston and Dickinson?",
          "options": [
            "They act as natural barriers that protect inland areas from storm surges and huge waves",
            "They produce crude oil",
            "They prevent the Sun from shining too brightly",
            "They stop all rain from falling"
          ],
          "answer": 0,
          "hint": "Sand dunes block hurricane storm surges from flooding inland towns!"
        }
      ],
      "vocab": [
        {
          "q": "What is the fan-shaped deposit of sediment formed at the mouth of a river called?",
          "options": [
            "Delta",
            "Canyon",
            "Glacier",
            "Crater"
          ],
          "answer": 0,
          "hint": "Named after the Greek triangle letter: Delta!"
        },
        {
          "q": "Which term describes the movement of sediment by wind, water, or ice?",
          "options": [
            "Weathering",
            "Erosion",
            "Deposition",
            "Porosity"
          ],
          "answer": 1,
          "hint": "Erosion takes it away!"
        },
        {
          "q": "What is a hill of loose sand deposited and shaped by wind called?",
          "options": [
            "Sand Dune",
            "Delta",
            "Aquifer",
            "Canyon"
          ],
          "answer": 0,
          "hint": "Wind blows sand into a coastal dune!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A river flows rapidly down a mountain for centuries and empties into a quiet ocean bay. Which landform is most likely formed by deposition at the river mouth?",
        "options": [
          {
            "id": "a",
            "text": "A deep V-shaped canyon"
          },
          {
            "id": "b",
            "text": "A fan-shaped river delta"
          },
          {
            "id": "c",
            "text": "A towering sea cliff"
          },
          {
            "id": "d",
            "text": "A jagged U-shaped glacial valley"
          }
        ],
        "answer": "b",
        "explanation": "When river water enters a quiet ocean bay, it slows down rapidly and drops its sediment load through deposition, forming a fan-shaped river delta!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO examples represent erosion occurring in nature? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Rushing floodwater carrying mud and sand down Dickinson Bayou"
          },
          {
            "id": "b",
            "text": "Plant roots cracking a concrete sidewalk into small chunks"
          },
          {
            "id": "c",
            "text": "Strong coastal winds blowing dry sand particles across Galveston Beach"
          },
          {
            "id": "d",
            "text": "Layers of silt settling to the bottom of a calm lake"
          },
          {
            "id": "e",
            "text": "Acidic rainwater dissolving limestone in a dark underground cavern"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Erosion specifically refers to the transport or movement of sediment by water, wind, or ice (options a and c). Cracking and dissolving are weathering; settling is deposition."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: How does a sand dune form along the Texas Gulf Coast?",
        "optionsA": [
          {
            "id": "a",
            "text": "Underground lava cools and pushes sand upward."
          },
          {
            "id": "b",
            "text": "Wind erodes loose sand from the beach and deposits it when the wind slows down."
          },
          {
            "id": "c",
            "text": "Earthquakes crack the seafloor and throw sand onto land."
          },
          {
            "id": "d",
            "text": "Ocean waves dissolve sand into liquid salt."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Sand dunes are volcanic rock formed by cooling magma."
          },
          {
            "id": "b",
            "text": "Wind carries sand grains through erosion and drops them through deposition behind obstacles like dune grasses."
          },
          {
            "id": "c",
            "text": "Glaciers currently cover all of Galveston Island."
          },
          {
            "id": "d",
            "text": "Water freezes solid on Galveston beaches every afternoon."
          }
        ],
        "answerB": "b",
        "explanation": "Sand dunes are classic wind-formed depositional features: blowing wind erodes dry beach sand and deposits it into hills where sea oats slow down the wind!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the comparison between geological landforms using the drop-down menus:",
        "segments": [
          {
            "text": "A canyon is formed primarily by "
          },
          {
            "blankId": "b1",
            "options": [
              "water erosion cutting downward",
              "wind deposition piling sand",
              "ice melting into groundwater"
            ],
            "answer": "water erosion cutting downward"
          },
          {
            "text": ", whereas a river delta is formed by "
          },
          {
            "blankId": "b2",
            "options": [
              "sediment deposition as water slows",
              "rock weathering from root growth",
              "earthquake faulting"
            ],
            "answer": "sediment deposition as water slows"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Canyons are carved out by water erosion cutting down into rock layers; deltas are built up by deposition as slowing water drops sediment."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each geological process into its correct WED category:",
        "categories": [
          {
            "id": "weathering",
            "label": "Weathering (Breaking Rock)"
          },
          {
            "id": "erosion",
            "label": "Erosion (Moving Sediment)"
          },
          {
            "id": "deposition",
            "label": "Deposition (Dropping Sediment)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Water freezing in rock crevices and cracking granite apart",
            "category": "weathering"
          },
          {
            "id": "i2",
            "label": "A swift bayou current sweeping silt downstream toward Galveston Bay",
            "category": "erosion"
          },
          {
            "id": "i3",
            "label": "Mud settling at the mouth of Dickinson Bayou into a sandbar",
            "category": "deposition"
          },
          {
            "id": "i4",
            "label": "Coastal wind blowing loose sand grains across highway 87",
            "category": "erosion"
          }
        ],
        "explanation": "Cracking rock in place is weathering; sweeping or blowing particles away is erosion; settling or dropping sediment is deposition!"
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Which agent of erosion was primarily responsible for carving the deep, steep walls of Palo Duro Canyon in the Texas Panhandle over millions of years?",
        "options": [
          {
            "id": "a",
            "text": "Flowing river water continuously eroding rock and carrying sediment away"
          },
          {
            "id": "b",
            "text": "Giant glaciers sliding across the desert"
          },
          {
            "id": "c",
            "text": "Gentle morning dew dissolving sandstone"
          },
          {
            "id": "d",
            "text": "Tree roots pushing the canyon walls outward"
          }
        ],
        "answer": "a",
        "explanation": "Flowing river water is a relentless carving force. Over millions of years, water erosion slices downward through rock layers to create deep canyons!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "How do the roots of large live oak trees along Dickinson Bayou cause mechanical weathering?",
        "options": [
          {
            "id": "a",
            "text": "Roots grow into rock and sidewalk crevices, expanding and prying the material apart."
          },
          {
            "id": "b",
            "text": "Roots heat rock up to 2,000 degrees until it turns to lava."
          },
          {
            "id": "c",
            "text": "Roots suck all minerals out of rocks, causing rocks to float."
          },
          {
            "id": "d",
            "text": "Roots freeze ground water into solid glaciers."
          }
        ],
        "answer": "a",
        "explanation": "As tree roots grow thicker, they exert tremendous outward physical force inside rock crevices, prying and splitting the rock apart in mechanical weathering."
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO engineering methods effectively reduce soil erosion along the banks of Dickinson Bayou? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Planting deep-rooted native cordgrasses along the shoreline"
          },
          {
            "id": "b",
            "text": "Placing heavy limestone boulders (riprap) along the water edge"
          },
          {
            "id": "c",
            "text": "Removing all trees and plants from the shoreline"
          },
          {
            "id": "d",
            "text": "Plowing the earthen banks with tractors before heavy rain"
          },
          {
            "id": "e",
            "text": "Spraying hot water onto the soil twice a day"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Plant roots anchor soil firmly in place (a), and heavy riprap rocks absorb wave and current impact (b), preventing rapid soil erosion!"
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: Where does sediment deposition occur in a river system?",
        "optionsA": [
          {
            "id": "a",
            "text": "At the fastest waterfall rapids where water moves at peak speed"
          },
          {
            "id": "b",
            "text": "In areas where the water slows down, such as inside river bends and river mouths"
          },
          {
            "id": "c",
            "text": "High in the clouds above the river"
          },
          {
            "id": "d",
            "text": "Inside underground magma chambers"
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Why does flowing water drop sediment when it slows down?",
        "optionsB": [
          {
            "id": "a",
            "text": "Slower water loses kinetic energy and can no longer keep heavy sediment suspended against gravity."
          },
          {
            "id": "b",
            "text": "Slow water turns into solid rock instantly."
          },
          {
            "id": "c",
            "text": "Fish push all the sediment to the bottom with their tails."
          },
          {
            "id": "d",
            "text": "Slow water contains no gravity."
          }
        ],
        "answerB": "a",
        "explanation": "Fast water carries heavy energy to transport rocks and sand. When water slows down, it loses kinetic energy, and gravity pulls the sediment down (deposition)!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding ice wedging using the drop-down menus:",
        "segments": [
          {
            "text": "Ice wedging is classified as a form of "
          },
          {
            "blankId": "b1",
            "options": [
              "mechanical weathering",
              "chemical deposition",
              "wind erosion"
            ],
            "answer": "mechanical weathering"
          },
          {
            "text": " because liquid water that freezes in rock cracks "
          },
          {
            "blankId": "b2",
            "options": [
              "expands and splits the rock apart",
              "shrinks and glues rocks together",
              "heats the rock to boiling point"
            ],
            "answer": "expands and splits the rock apart"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Ice wedging is mechanical weathering: water expands upon freezing, exerting pressure that shatters rock into smaller fragments without moving them away."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Classify each landform based on whether it is CARVED by erosion or BUILT by deposition:",
        "categories": [
          {
            "id": "eroded",
            "label": "Carved by Erosion (Material Removed)"
          },
          {
            "id": "deposited",
            "label": "Built by Deposition (Material Added)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Deep V-shaped river canyon",
            "category": "eroded"
          },
          {
            "id": "i2",
            "label": "Fan-shaped river delta at an ocean bay",
            "category": "deposited"
          },
          {
            "id": "i3",
            "label": "Towering coastal sand dune on a barrier island",
            "category": "deposited"
          },
          {
            "id": "i4",
            "label": "Sea arch carved into a rocky coastal cliff",
            "category": "eroded"
          }
        ],
        "explanation": "Canyons and sea arches are hollowed out by erosion removing rock. Deltas and dunes are built up by deposition adding sediment."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A science student examines pebbles from the bottom of Dickinson Bayou and notices they are very smooth and rounded, while rocks from a quarry nearby are sharp and jagged. What caused the bayou pebbles to become smooth?",
        "options": [
          {
            "id": "a",
            "text": "Moving bayou water rolled the pebbles against one another, breaking off rough edges through weathering and erosion."
          },
          {
            "id": "b",
            "text": "Bayou fish licked the rocks until they were smooth."
          },
          {
            "id": "c",
            "text": "The rocks were baked smooth in an underground oven."
          },
          {
            "id": "d",
            "text": "Chemical pollution melted the rocks into round marbles."
          }
        ],
        "answer": "a",
        "explanation": "As water carries sediment downstream, tumbling pebbles collide with one another and the riverbed. This abrasive weathering chips off sharp corners, leaving smooth, rounded river stones!"
      }
    ]
  },
  {
    "id": "m3_5",
    "unitId": 3,
    "unitTitle": "Unit 3: Earth & Space Systems",
    "gradingPeriod": "3rd Nine Weeks (CBA 3)",
    "code": "TEKS 4.11A, 4.11B, 4.11C",
    "title": "Natural Resources, Conservation & Subsurface Rocks",
    "subtitle": "Renewable vs. Nonrenewable Energy & Aquifer/Oil Storage",
    "icon": "🔋",
    "accentColor": "#10b981",
    "iCanStatement": "I can identify and classify renewable and nonrenewable resources, explain the role of conservation and recycling, and investigate how water and fossil fuels are stored in porous subsurface rock layers.",
    "localAnchor": "The Texas Gulf Coast energy corridor (offshore petroleum, coastal wind turbines, solar farms) and the Chicot/Evangeline aquifers that supply groundwater beneath Dickinson and Galveston County.",
    "engage": {
      "hookQuestion": "Texas produces more electricity from wind turbines and oil than any other state. Why is wind energy classified as renewable while crude oil trapped underground is nonrenewable?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Wind can be naturally replenished in a short time by atmospheric cycles, whereas oil takes millions of years of heat and pressure to form.",
          "correct": true,
          "feedback": "Spot on, Kelenna! The wind blows and the Sun shines every day, refilling naturally. But fossil fuels took millions of years to bake underground!"
        },
        {
          "id": "b",
          "text": "Oil is made of living bacteria that replenish overnight, while wind disappears once it spins a turbine.",
          "correct": false,
          "feedback": "Petroleum took hundreds of millions of years of heat and pressure to form from ancient marine organisms—it cannot replenish overnight!"
        },
        {
          "id": "c",
          "text": "Wind energy can be recycled into plastic bottles, but oil evaporates into the upper atmosphere.",
          "correct": false,
          "feedback": "Plastics are actually manufactured from petroleum oil, and wind is simply moving air driven by solar heating!"
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            14
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Renewable Energy: Wind & Solar",
            "text": "Replenished naturally by solar heating and atmospheric convection currents.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look at the giant wind turbines spinning along the Texas coast, Kelenna! Wind, sunlight, and flowing water are renewable resources. They are like an endless refillable water bottle—nature replenishes them constantly!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            8,
            4,
            8
          ],
          "lookAt": [
            2,
            0,
            0
          ],
          "callout": {
            "title": "Nonrenewable Fossil Fuels",
            "text": "Petroleum, coal, and natural gas formed from ancient organisms buried over millions of years.",
            "pos": [
              2,
              1,
              0
            ]
          },
          "narration": "Now look thousands of feet underground! Petroleum oil and natural gas formed from tiny ancient sea creatures buried under intense heat and pressure over millions of years. Once we burn them, they are gone forever!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -8,
            4,
            8
          ],
          "lookAt": [
            -2,
            0,
            0
          ],
          "callout": {
            "title": "Subsurface Porosity & Permeability",
            "text": "Porous sandstone rock holds groundwater and oil like a giant underground stone sponge.",
            "pos": [
              -2,
              1,
              0
            ]
          },
          "narration": "Here is a secret: underground water and oil do NOT sit in open swimming pools! Instead, they soak into millions of microscopic holes between sand grains inside sandstone rock, just like water soaked inside a kitchen sponge!",
          "sfx": "splash"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            10,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Conservation & Stewardship",
            "text": "Conserving resources through reducing, reusing, and recycling protects our Texas environment.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Because fossil fuels and clean water are precious, we practice conservation: Reduce what we use, Reuse what we can, and Recycle materials so our Texas home stays clean and green for future generations!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Explore the 3D Texas Subsurface Cutaway. Adjust rock porosity and permeability to observe how groundwater fills the sand aquifer and how crude oil and natural gas are trapped beneath impermeable shale caprocks.",
      "labPrompts": [
        "Inject water into porous sandstone to test aquifer recharge rates.",
        "Compare the replenishment rate of coastal wind vs. a deep fossil fuel reservoir.",
        "Simulate municipal recycling and conservation to measure extended landfill and resource lifespan."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            6,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Classifying Natural Resources",
            "text": "Renewable (solar, wind, water, trees) vs. Nonrenewable (coal, oil, natural gas, minerals).",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Natural resources come from Earth. We sort them into two big teams: Renewable resources, which nature replaces quickly (like sun, wind, water, and trees), and Nonrenewable resources, which take millions of years to form!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            4,
            3,
            6
          ],
          "lookAt": [
            1,
            0,
            0
          ],
          "callout": {
            "title": "Rock Porosity Explained",
            "text": "Porosity measures the percentage of open pore space between mineral grains.",
            "pos": [
              1,
              1,
              0
            ]
          },
          "narration": "Zoom into this underground sandstone rock! See those tiny spaces between the sand grains? Those are pores. High porosity means the rock has lots of tiny pockets to hold fluids like fresh water or crude petroleum!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -4,
            3,
            6
          ],
          "lookAt": [
            -1,
            0,
            0
          ],
          "callout": {
            "title": "Rock Permeability & Aquifers",
            "text": "Permeability is how easily interconnected pores allow fluids to flow through rock.",
            "pos": [
              -1,
              1,
              0
            ]
          },
          "narration": "When those tiny pores connect like little tunnels, the rock is permeable. Water flows right through the sand layers of our local Chicot Aquifer, supplying fresh drinking water to homes in Dickinson and Galveston County!",
          "sfx": "splash"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            7,
            9
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Impermeable Caprock Traps",
            "text": "Dense shale or clay prevents oil, gas, and water from escaping to the surface.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "What keeps the oil and gas from bubbling up to the surface? Dense, solid rock layers like shale have zero connected holes. They act like a tight stone lid, trapping oil safely beneath until wells tap it!",
          "sfx": "whoosh"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            9,
            13
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "The 3 R’s of Conservation",
            "text": "Reduce consumption, Reuse materials, and Recycle metals, plastics, and paper.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Conservation is being smart with Earth’s gifts! Turning off classroom lights at Dunbar Middle School reduces electricity waste. And recycling a single aluminum soda can saves 95% of the energy needed to make a new one!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m3_5_v0",
          "term": "Renewable Resource",
          "simpleMeaning": "A natural energy source that nature can refill quickly, like sunshine, blowing wind, and falling rain!",
          "definition": "A natural resource that can be replaced or replenished naturally by Earth’s systems at the same rate or faster than it is consumed.",
          "example": "Solar panels on the Dunbar Middle School roof capture renewable energy from the Sun.",
          "narration": "Renewable Resource! Renewable means it can be renewed or refilled naturally. Sunlight and wind keep coming every single day, so they will never run out!"
        },
        {
          "id": "m3_5_v1",
          "term": "Nonrenewable Resource",
          "simpleMeaning": "A resource that takes millions of years to form deep underground, so when it is used up, it cannot be replaced in our lifetime!",
          "definition": "A natural resource that exists in limited quantities and takes millions of years to form, meaning it cannot be replaced once depleted.",
          "example": "Crude petroleum oil, coal, and natural gas are nonrenewable fossil fuels.",
          "narration": "Nonrenewable Resource! Nonrenewable resources like coal, oil, and natural gas took millions of years of heat and pressure to form. Once we burn through them, they are gone!"
        },
        {
          "id": "m3_5_v2",
          "term": "Conservation",
          "simpleMeaning": "Protecting and using natural resources wisely by reducing waste, reusing items, and recycling materials!",
          "definition": "The wise and responsible management, protection, and preservation of natural resources to prevent waste and depletion.",
          "example": "Turning off the water faucet while brushing your teeth is a simple daily act of water conservation.",
          "narration": "Conservation! Conservation means being a superhero for the planet—protecting resources by using less, reusing what you have, and recycling!"
        },
        {
          "id": "m3_5_v3",
          "term": "Porosity",
          "simpleMeaning": "The tiny open holes or sponge-like spaces inside a rock that can hold liquids like water or oil!",
          "definition": "The percentage of tiny open spaces or pores inside a rock or sediment layer capable of holding fluids like water or petroleum.",
          "example": "Coarse sand has high porosity, allowing it to soak up rainwater like a sponge.",
          "narration": "Porosity! Think of a kitchen sponge. All those little holes that soak up water are pores. High porosity rocks are full of tiny pockets that store groundwater!"
        },
        {
          "id": "m3_5_v4",
          "term": "Aquifer",
          "simpleMeaning": "A giant underground layer of rock and sand that stores fresh groundwater and lets it flow to water wells!",
          "definition": "An underground geological layer of permeable rock, gravel, or sand that stores and yields usable groundwater to wells and springs.",
          "example": "The Chicot and Evangeline aquifers provide fresh groundwater to communities across Galveston County.",
          "narration": "Aquifer! An aquifer is like a giant underground water filter and sponge made of sand and rock, holding fresh drinking water beneath our feet!"
        }
      ]
    },
    "elaborate": {
      "title": "Dickinson ISD Clean Energy Microgrid Challenge",
      "scenario": "Dunbar Middle School plans to transition 60% of its campus electrical consumption to renewable energy while maintaining an emergency battery backup for coastal storm readiness.",
      "goalDescription": "Balance solar PV arrays, wind generation, and battery storage to power classroom lab benches and hurricane shelter equipment.",
      "criteria": [
        "Generate at least 150 kWh daily through solar and coastal wind generators.",
        "Maintain critical life-safety power reserves for 72 consecutive hours during grid outages.",
        "Reduce campus nonrenewable fossil fuel dependency by 60%."
      ],
      "successFeedback": "Microgrid Operational! Dunbar Middle School now runs on clean renewable power with robust storm resilience!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Which of the following is an example of a renewable natural resource?",
          "options": [
            "Crude petroleum oil",
            "Sunlight",
            "Coal",
            "Natural gas"
          ],
          "answer": 1,
          "hint": "Sunlight shines every day and never runs out!"
        },
        {
          "q": "Why are coal, oil, and natural gas called \"fossil fuels\"?",
          "options": [
            "They formed from the buried remains of ancient living organisms over millions of years",
            "They are made of dinosaur bones glued together with lava",
            "They only exist in museum displays",
            "They are made by digging up ancient stone tools"
          ],
          "answer": 0,
          "hint": "Fossil fuels come from ancient buried plants and microscopic sea creatures!"
        },
        {
          "q": "How is groundwater stored inside an underground aquifer?",
          "options": [
            "Inside microscopic pore spaces between rock and sand grains like a sponge",
            "In giant open underground swimming pools with diving boards",
            "Inside frozen ice cubes buried under grass",
            "Inside plastic pipes installed by nature"
          ],
          "answer": 0,
          "hint": "Rocks have tiny holes called pores that soak up water like a sponge!"
        }
      ],
      "explore": [
        {
          "q": "What does \"permeability\" measure in a rock layer?",
          "options": [
            "How easily interconnected pores allow water or fluids to flow through the rock",
            "How shiny the rock looks under flashlight beams",
            "How much the rock weighs in grams",
            "The magnetic pull of the rock"
          ],
          "answer": 0,
          "hint": "Permeable means fluids can flow through connected tunnels!"
        },
        {
          "q": "What kind of rock acts as a \"caprock\" trap to keep oil and gas from escaping?",
          "options": [
            "Dense, impermeable shale with zero connected pore spaces",
            "Loose beach sand that lets everything bubble up",
            "Volcanic pumice with giant holes",
            "Crushed gravel"
          ],
          "answer": 0,
          "hint": "Impermeable rocks act like a solid stone lid!"
        },
        {
          "q": "Which Texas energy source is clean, produces zero smoke, and never runs out?",
          "options": [
            "Coastal wind turbines",
            "Burning coal",
            "Gasoline engines",
            "Diesel generators"
          ],
          "answer": 0,
          "hint": "Wind is a 100% clean and renewable energy source!"
        }
      ],
      "explain": [
        {
          "q": "Why is recycling aluminum cans an important conservation practice?",
          "options": [
            "It saves 95% of the energy needed to mine and refine raw metal ore from Earth",
            "It turns aluminum into pure gold",
            "It creates new drinking water",
            "It stops the wind from blowing"
          ],
          "answer": 0,
          "hint": "Recycling saves massive amounts of electricity and protects Earth’s rocks!"
        },
        {
          "q": "What are the \"3 Rs\" of natural resource conservation?",
          "options": [
            "Reduce, Reuse, Recycle",
            "Rotate, Revolve, Radiate",
            "Rain, Runoff, Reservoir",
            "Rock, River, Reef"
          ],
          "answer": 0,
          "hint": "Reduce waste, Reuse items, Recycle materials!"
        },
        {
          "q": "What is the name of the freshwater aquifer providing groundwater beneath Galveston County?",
          "options": [
            "The Chicot Aquifer",
            "The Pacific Ocean",
            "The Amazon Basin",
            "The Sahara Aquifer"
          ],
          "answer": 0,
          "hint": "The Chicot and Evangeline aquifers beneath Southeast Texas!"
        }
      ],
      "vocab": [
        {
          "q": "Which term describes a resource that takes millions of years to form and cannot be quickly replaced?",
          "options": [
            "Nonrenewable Resource",
            "Renewable Resource",
            "Transpiration",
            "Precipitation"
          ],
          "answer": 0,
          "hint": "Non-renewable means it cannot be easily renewed!"
        },
        {
          "q": "What is an underground rock or sand layer that stores and yields fresh drinking water called?",
          "options": [
            "Aquifer",
            "Sand Dune",
            "Delta",
            "Glacier"
          ],
          "answer": 0,
          "hint": "Aqua means water: Aquifer!"
        },
        {
          "q": "What does \"Porosity\" mean?",
          "options": [
            "The percentage of tiny open spaces inside a rock that can hold liquids",
            "The speed of a river current",
            "The temperature of magma",
            "The brightness of the Moon"
          ],
          "answer": 0,
          "hint": "The little open pore spaces inside rock!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "Which natural resource is classified as renewable because it is replenished naturally in a short period of time by Earth’s systems?",
        "options": [
          {
            "id": "a",
            "text": "Crude petroleum oil"
          },
          {
            "id": "b",
            "text": "Wind energy"
          },
          {
            "id": "c",
            "text": "Anthracite coal"
          },
          {
            "id": "d",
            "text": "Natural gas"
          }
        ],
        "answer": "b",
        "explanation": "Wind energy is constantly generated by solar heating of Earth’s atmosphere, making it a renewable resource that will not run out!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO properties allow an underground rock layer to serve as an effective aquifer for storing and delivering groundwater? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "High porosity with numerous open pore spaces to hold water"
          },
          {
            "id": "b",
            "text": "Completely solid crystalline structure with zero spaces"
          },
          {
            "id": "c",
            "text": "High permeability allowing water to flow between interconnected pores"
          },
          {
            "id": "d",
            "text": "High concentration of magnetic iron minerals"
          },
          {
            "id": "e",
            "text": "Extreme volcanic heat that boils water into steam"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "An effective aquifer requires both porosity (sponge-like spaces to store water) and permeability (connected pathways so water can flow to water wells)!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: Why is recycling aluminum soda cans considered an effective resource conservation practice at Dunbar Middle School?",
        "optionsA": [
          {
            "id": "a",
            "text": "It creates new nonrenewable fossil fuels inside recycling bins."
          },
          {
            "id": "b",
            "text": "It saves energy and reduces the need to mine limited metal ores from Earth."
          },
          {
            "id": "c",
            "text": "It prevents the Sun from evaporating Galveston Bay."
          },
          {
            "id": "d",
            "text": "It permanently eliminates the need for fresh drinking water."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Recycling aluminum uses up to 95% less energy than mining and refining raw bauxite ore from Earth."
          },
          {
            "id": "b",
            "text": "Aluminum cans dissolve in water to produce renewable wind energy."
          },
          {
            "id": "c",
            "text": "All metals naturally turn into coal after five days in a landfill."
          },
          {
            "id": "d",
            "text": "Mining nonrenewable ores has no environmental impact on Earth’s surface."
          }
        ],
        "answerB": "a",
        "explanation": "Recycling conserves natural resources by reusing existing refined metals, slashing energy consumption by 95% compared to mining raw ore from Earth!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding energy classification using the drop-down menus:",
        "segments": [
          {
            "text": "Petroleum oil and coal are classified as "
          },
          {
            "blankId": "b1",
            "options": [
              "nonrenewable resources",
              "renewable resources",
              "inexhaustible resources"
            ],
            "answer": "nonrenewable resources"
          },
          {
            "text": " because they require "
          },
          {
            "blankId": "b2",
            "options": [
              "millions of years of heat and pressure to form",
              "only several days of sunlight to replenish",
              "human factories to synthesize from air"
            ],
            "answer": "millions of years of heat and pressure to form"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Fossil fuels take millions of years of geological heat and pressure to form, so they cannot be replaced once depleted."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each natural resource into its correct classification (Renewable vs. Nonrenewable):",
        "categories": [
          {
            "id": "renewable",
            "label": "Renewable Resources (Rapidly Replenished)"
          },
          {
            "id": "nonrenewable",
            "label": "Nonrenewable Resources (Finite Supply)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Solar radiation captured by rooftop solar panels",
            "category": "renewable"
          },
          {
            "id": "i2",
            "label": "Crude petroleum pumped from Gulf oil rigs",
            "category": "nonrenewable"
          },
          {
            "id": "i3",
            "label": "Coastal wind spinning energy turbines",
            "category": "renewable"
          },
          {
            "id": "i4",
            "label": "Natural gas trapped beneath dense shale rock",
            "category": "nonrenewable"
          }
        ],
        "explanation": "Sunlight and wind replenish naturally and continuously. Petroleum and natural gas are finite fossil fuels formed over millions of years."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "What is a practical action Kelenna can take at Dunbar Middle School to practice natural resource conservation?",
        "options": [
          {
            "id": "a",
            "text": "Turn off classroom computer monitors and lights when leaving the room"
          },
          {
            "id": "b",
            "text": "Leave the water faucet running in the science lab sink all day"
          },
          {
            "id": "c",
            "text": "Throw aluminum soda cans into the trash instead of the recycling bin"
          },
          {
            "id": "d",
            "text": "Use five fresh paper towels every time he washes his hands"
          }
        ],
        "answer": "a",
        "explanation": "Turning off lights and electronics saves electrical energy generated from power plants, directly conserving natural resources!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "Why are crude oil and natural gas located thousands of feet underground along the Texas coast rather than right on the surface?",
        "options": [
          {
            "id": "a",
            "text": "They formed from ancient marine plankton that died, sank, and were buried under thousands of feet of sediment over millions of years."
          },
          {
            "id": "b",
            "text": "Rainwater pushed all surface oil deep into Earth yesterday."
          },
          {
            "id": "c",
            "text": "Earthquakes deliberately hid the fuel from humans."
          },
          {
            "id": "d",
            "text": "Petroleum forms inside clouds and falls underground as rain."
          }
        ],
        "answer": "a",
        "explanation": "Fossil fuels formed from ancient microscopic sea organisms that were buried by layers of mud and sand over hundreds of millions of years, cooking under pressure!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO advantages explain why Dickinson ISD is installing solar panels on school rooftops? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Solar panels generate electricity without burning finite fossil fuels"
          },
          {
            "id": "b",
            "text": "Solar panels produce crude oil for school buses"
          },
          {
            "id": "c",
            "text": "Solar energy relies on an inexhaustible, renewable energy source (the Sun)"
          },
          {
            "id": "d",
            "text": "Solar panels eliminate the need for rainfall in Texas"
          },
          {
            "id": "e",
            "text": "Solar panels only generate electricity at midnight"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Solar panels generate clean electrical power without burning fossil fuels (a) and harness inexhaustible solar radiation that never runs out (c)!"
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: What happens if a growing city pumps groundwater out of the Chicot Aquifer faster than rainwater can naturally refill it?",
        "optionsA": [
          {
            "id": "a",
            "text": "The groundwater level drops, wells can run dry, and the ground surface may sink (subsidence)."
          },
          {
            "id": "b",
            "text": "The aquifer turns into pure crude oil."
          },
          {
            "id": "c",
            "text": "Earth stops revolving around the Sun."
          },
          {
            "id": "d",
            "text": "The underground rocks turn into diamond."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Which conservation strategy directly helps prevent aquifer depletion?",
        "optionsB": [
          {
            "id": "a",
            "text": "Fixing leaking municipal water pipes and using low-flow plumbing fixtures"
          },
          {
            "id": "b",
            "text": "Watering concrete driveways during the hottest hour of the afternoon"
          },
          {
            "id": "c",
            "text": "Dumping motor oil into storm drains"
          },
          {
            "id": "d",
            "text": "Pumping ocean saltwater directly into drinking water pipes"
          }
        ],
        "answerB": "a",
        "explanation": "Over-pumping groundwater depletes the aquifer and causes land subsidence. Fixing leaks and using water-saving fixtures conserves water so the aquifer can recharge naturally!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding rock characteristics using the drop-down menus:",
        "segments": [
          {
            "text": "A rock with high "
          },
          {
            "blankId": "b1",
            "options": [
              "porosity",
              "magnetism",
              "transpiration"
            ],
            "answer": "porosity"
          },
          {
            "text": " contains many tiny open spaces to store fluid, while high "
          },
          {
            "blankId": "b2",
            "options": [
              "permeability",
              "density",
              "reflection"
            ],
            "answer": "permeability"
          },
          {
            "text": " means those spaces are interconnected so fluids can flow through easily."
          }
        ],
        "explanation": "Porosity measures storage space; permeability measures how easily fluids can flow through interconnected pore channels."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Classify each conservation action into the correct \"3 Rs\" category (Reduce, Reuse, or Recycle):",
        "categories": [
          {
            "id": "reduce",
            "label": "Reduce (Use Less)"
          },
          {
            "id": "reuse",
            "label": "Reuse (Use Again)"
          },
          {
            "id": "recycle",
            "label": "Recycle (Reprocess into New Material)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Turning off the water faucet while brushing your teeth",
            "category": "reduce"
          },
          {
            "id": "i2",
            "label": "Using a washable stainless steel water bottle instead of disposable plastic bottles",
            "category": "reuse"
          },
          {
            "id": "i3",
            "label": "Placing empty aluminum soda cans into the blue recycling bin to be melted into new cans",
            "category": "recycle"
          },
          {
            "id": "i4",
            "label": "Turning off bedroom lights when leaving the house",
            "category": "reduce"
          }
        ],
        "explanation": "Reduce means using less energy or water. Reuse means using durable items repeatedly. Recycle means collecting materials to be remanufactured."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "Why cannot nonrenewable resources like petroleum oil and coal be replaced during a human lifetime?",
        "options": [
          {
            "id": "a",
            "text": "They require millions of years of intense geological heat and pressure beneath Earth’s crust to form."
          },
          {
            "id": "b",
            "text": "Scientists forgot the secret chemical recipe to make them."
          },
          {
            "id": "c",
            "text": "Plants stopped growing anywhere on Earth."
          },
          {
            "id": "d",
            "text": "The Sun no longer provides thermal energy."
          }
        ],
        "answer": "a",
        "explanation": "Fossil fuels take hundreds of millions of years of deep burial under intense geological heat and pressure. Because human lifetimes are short, once depleted, they are gone!"
      }
    ]
  },
  {
    "id": "m4_1",
    "unitId": 4,
    "unitTitle": "Unit 4: Organisms & Environments",
    "gradingPeriod": "2nd Nine Weeks (CBA 2)",
    "code": "TEKS 4.12A, 4.12B, 4.12C",
    "title": "Plant Cycling, Food Webs & Environmental Change",
    "subtitle": "Coastal Prairie Energy Flow, Decomposers & Leaf Stomata",
    "icon": "🌿",
    "accentColor": "#16a34a",
    "iCanStatement": "I can describe the flow of energy across producers, consumers, and decomposers in food webs, explain how plants cycle gases and water through leaves, and predict how environmental changes impact ecosystem balance.",
    "localAnchor": "Texas Coastal Prairie and Dickinson Bayou Salt Marsh: Sun provides energy to smooth cordgrass, eaten by marsh grasshoppers and Gulf killifish, eaten by roseate spoonbills, with fiddler crabs and bacteria returning nutrients to estuarine soil.",
    "engage": {
      "hookQuestion": "In the marsh grasses along Dickinson Bayou, if a fungal blight destroyed the marsh cordgrass, how would that single change affect the roseate spoonbill bird population?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Spoonbill populations would decline because cordgrass supports the small fish, shrimp, and insects that spoonbills depend on for food.",
          "correct": true,
          "feedback": "Spot on, Kelenna! Green plants are the foundation of the whole food web. If the plants disappear, every animal up the food chain runs out of meals!"
        },
        {
          "id": "b",
          "text": "Spoonbills would thrive because birds eat fungi directly and do not rely on plant-based food chains.",
          "correct": false,
          "feedback": "Roseate spoonbills eat small aquatic animals like shrimp and minnows, not tree fungi. Those minnows need marsh plants to survive!"
        },
        {
          "id": "c",
          "text": "The food web would stay identical because consumers produce their own energy without producers.",
          "correct": false,
          "feedback": "Consumers cannot make their own food! Only photosynthetic green plants can capture solar energy to produce food."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            14
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Solar Energy Drives Ecosystems",
            "text": "The Sun is the original source of energy for almost all life on Earth.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look out across the Dickinson Bayou salt marsh, Kelenna! The Sun is the ultimate powerhouse of life. Every single leaf, fish, bird, and alligator in our Texas wetland is powered by solar energy from 93 million miles away!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            4,
            4,
            6
          ],
          "lookAt": [
            1,
            1,
            0
          ],
          "callout": {
            "title": "Producers: Smooth Cordgrass",
            "text": "Plants use photosynthesis to convert water, carbon dioxide, and sunlight into glucose and oxygen.",
            "pos": [
              1,
              2,
              0
            ]
          },
          "narration": "Plants are the real superheroes—they are called producers! Green cordgrass acts like a tiny solar kitchen. It drinks water through its roots, catches sunlight, and breathes in carbon dioxide to bake sweet glucose food and release fresh oxygen!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -4,
            4,
            6
          ],
          "lookAt": [
            -1,
            1,
            0
          ],
          "callout": {
            "title": "Consumers & Trophic Energy",
            "text": "Herbivores eat plants, and carnivores consume other animals, transferring chemical energy.",
            "pos": [
              -1,
              2,
              0
            ]
          },
          "narration": "Animals are consumers—they have to eat! Marsh grasshoppers munch on cordgrass, killifish minnows eat grasshoppers, and roseate spoonbills swoop in to eat the minnows. In science diagrams, arrows point into the tummy of whoever gets the meal!",
          "sfx": "splash"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            9,
            11
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Decomposers Recycle Nutrients",
            "text": "Fiddler crabs, fungi, and bacteria break down dead matter, returning minerals to the soil.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Meet the marsh cleanup crew: decomposers! Fiddler crabs and soil bacteria break down dead leaves and animal waste, turning trash into rich organic soil food so new cordgrass can grow. In nature, nothing goes to waste!",
          "sfx": "wind"
        }
      ]
    },
    "explore": {
      "instructions": "Zoom into the 3D Texas Coastal Prairie diorama. Click the microscopic leaf zoom to inspect guard cells and stomata exchanging CO2, O2, and water vapor. Then manipulate food web populations to trigger trophic cascades.",
      "labPrompts": [
        "Zoom into the underside of a cordgrass leaf to observe stomata opening during daylight to intake carbon dioxide and release oxygen.",
        "Remove marsh decomposers (bacteria and fiddler crabs) and observe nutrient starvation in prairie soil.",
        "Simulate a drought to test ecosystem resilience when primary producer biomass drops by 50%."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            5,
            10
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Photosynthesis & Gas Cycling",
            "text": "Leaves absorb carbon dioxide and release oxygen through microscopic stomata.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look under a microscope at a cordgrass leaf! See those tiny mouth-like pores? Those are stomata. Guard cells open these microscopic windows so the plant can breathe in carbon dioxide and exhale fresh oxygen for us to breathe!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            3,
            3,
            5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Producers vs. Consumers",
            "text": "Producers make glucose; consumers must ingest other organisms for chemical energy.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Here is the first-principles rule: Producers make their own food through photosynthesis. Consumers cannot make food; herbivores eat plants, carnivores eat meat, and omnivores eat both to get their fuel!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -3,
            3,
            5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Food Chains vs. Food Webs",
            "text": "Food chains show a single energy path; food webs show complex interconnected feeding networks.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "A food chain shows a single straight line of who eats whom. But in our Dickinson Bayou marsh, animals eat many different meals! Connected together, all these overlapping food chains form a giant, sturdy food web!",
          "sfx": "chime"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            6,
            8
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Decomposer Role in Soil Health",
            "text": "Without decomposers, dead matter would accumulate and soil nutrients would be exhausted.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Imagine if nobody ever emptied the trash! Decomposers are the ultimate recyclers. Bacteria and fungi break down dead tissue into nitrogen and minerals, fertilizing the mud so the next generation of plants can sprout!",
          "sfx": "splash"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            8,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Environmental Change & Cascades",
            "text": "Drought, floods, pollution, or invasive species ripple through every trophic level.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Ecosystems are tightly connected teams. If a severe drought dries up Dickinson Bayou and kills the cordgrass, the grasshoppers starve, the minnows starve, and the birds have to fly away. Every piece matters!",
          "sfx": "wind"
        }
      ],
      "vocabulary": [
        {
          "id": "m4_1_v0",
          "term": "Producer",
          "simpleMeaning": "A green plant that makes its own food using sunlight, water, and air through photosynthesis!",
          "definition": "An autotrophic organism, such as a green plant or algae, that uses solar energy and photosynthesis to manufacture its own food.",
          "example": "Smooth cordgrass is the primary producer anchoring the Dickinson Bayou salt marsh.",
          "narration": "Producer! Plants produce! Using green chlorophyll, they capture solar rays, drink water from the soil, and produce sweet food for themselves and other living creatures!"
        },
        {
          "id": "m4_1_v1",
          "term": "Consumer",
          "simpleMeaning": "Any animal that must eat other living things (plants or other animals) to get energy to survive!",
          "definition": "An organism that cannot make its own food and must obtain energy by eating other organisms (herbivores, carnivores, omnivores).",
          "example": "The roseate spoonbill is a consumer that feeds on small fish and aquatic insects.",
          "narration": "Consumer! Consumers consume! Because animals cannot do photosynthesis, we have to eat plants or other animals to fuel our bodies!"
        },
        {
          "id": "m4_1_v2",
          "term": "Decomposer",
          "simpleMeaning": "Nature’s recycling crew—bacteria, fungi, and worms that break down dead stuff and recycle nutrients into soil!",
          "definition": "An organism (such as bacteria, fungi, or earthworms) that breaks down dead plant and animal matter, recycling nutrients back into soil.",
          "example": "Marsh mud bacteria act as decomposers, turning dead cordgrass into rich dark soil food.",
          "narration": "Decomposer! Decomposers decompose! They break down dead plants, leaves, and animals, recycling vital minerals back into the dirt so new life can grow!"
        },
        {
          "id": "m4_1_v3",
          "term": "Stomata",
          "simpleMeaning": "Microscopic little mouth-pores on the undersides of leaves that open and close to let plants breathe gases in and out!",
          "definition": "Microscopic pores on the surfaces of leaves bordered by guard cells that open and close to regulate gas exchange (CO2/O2) and transpiration.",
          "example": "Stomata on cordgrass leaves open in daylight to take in carbon dioxide for photosynthesis.",
          "narration": "Stomata! Stomata are tiny breathing windows under leaves. Guard cells open them wide so the plant can drink in carbon dioxide and release fresh oxygen!"
        },
        {
          "id": "m4_1_v4",
          "term": "Food Web",
          "simpleMeaning": "A connected network of many food chains showing how all living things in an ecosystem share energy!",
          "definition": "A complex, interconnected network of multiple food chains illustrating the flow of feeding relationships and energy through an ecosystem.",
          "example": "A coastal marsh food web demonstrates how redfish, blue crabs, cordgrass, and spoonbills are linked.",
          "narration": "Food Web! In real nature, animals have lots of different food choices. When you draw all the overlapping food chains together, you get a giant, beautiful food web!"
        }
      ]
    },
    "elaborate": {
      "title": "Dickinson Bayou Estuary Ecosystem Restoration",
      "scenario": "Runoff from upstream development has disrupted the natural salinity and producer density in Dickinson Bayou marshes.",
      "goalDescription": "Restore the trophic energy pyramid by replanting native smooth cordgrass, reintroducing fiddler crabs, and monitoring roseate spoonbill recovery.",
      "criteria": [
        "Achieve 10:1 biomass ratio balance between producers, primary consumers, and secondary consumers.",
        "Re-establish active nutrient cycling via benthic decomposers within 90 simulated days.",
        "Demonstrate net positive oxygen production through healthy stomatal gas exchange."
      ],
      "successFeedback": "Estuary Restored! Balanced energy flow now sustains vibrant wildlife across the Dickinson Bayou ecosystem!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Where does almost all energy in the Dickinson Bayou marsh ecosystem originate?",
          "options": [
            "The Sun",
            "Underground batteries",
            "The ocean tide",
            "Fertilizer bags"
          ],
          "answer": 0,
          "hint": "The Sun provides radiant light energy to start the food web!"
        },
        {
          "q": "Why are green plants like cordgrass called \"producers\"?",
          "options": [
            "They produce their own food through photosynthesis using sunlight",
            "They produce noise when the wind blows",
            "They hunt insects at night",
            "They eat mud for energy"
          ],
          "answer": 0,
          "hint": "Producers make their own food from sunlight, water, and air!"
        },
        {
          "q": "What do arrows in a food chain or food web diagram point toward?",
          "options": [
            "Into the organism that eats the food (showing the flow of energy)",
            "Toward the biggest animal in size",
            "Toward the Sun",
            "Toward the north pole"
          ],
          "answer": 0,
          "hint": "The arrow points to whoever gets the meal into their tummy!"
        }
      ],
      "explore": [
        {
          "q": "What gas do plant leaves absorb through their stomata to make food during photosynthesis?",
          "options": [
            "Carbon dioxide (CO2)",
            "Helium",
            "Pure nitrogen",
            "Methane gas"
          ],
          "answer": 0,
          "hint": "Plants breathe in carbon dioxide that animals breathe out!"
        },
        {
          "q": "What life-giving gas do plants release into the air for humans and animals to breathe?",
          "options": [
            "Oxygen (O2)",
            "Carbon dioxide",
            "Argon",
            "Chlorine"
          ],
          "answer": 0,
          "hint": "Fresh oxygen!"
        },
        {
          "q": "What would happen in a marsh if all decomposers (bacteria and fiddler crabs) were removed?",
          "options": [
            "Dead plants and animals would pile up and soil would run out of recycled nutrients",
            "Plants would grow ten times faster",
            "The Sun would get brighter",
            "Water would turn into soda"
          ],
          "answer": 0,
          "hint": "Without decomposers, dead matter never gets recycled!"
        }
      ],
      "explain": [
        {
          "q": "What is the difference between a herbivore and a carnivore?",
          "options": [
            "Herbivores eat plants; carnivores eat other animals",
            "Herbivores live in space; carnivores live in water",
            "Herbivores are always bigger than carnivores",
            "Carnivores do photosynthesis"
          ],
          "answer": 0,
          "hint": "Herb = plant eater; Carn = meat eater!"
        },
        {
          "q": "Why is a food web more resilient than a single food chain?",
          "options": [
            "Animals have multiple food options if one prey population drops",
            "Food webs do not need sunlight",
            "Food webs are made of metal wire",
            "Animals in a food web never get hungry"
          ],
          "answer": 0,
          "hint": "Having backup food choices keeps animals alive!"
        },
        {
          "q": "How does an extended drought affect animals that eat fish in Dickinson Bayou?",
          "options": [
            "Drying water shrinks fish populations, leaving predators with less food",
            "Fish learn to walk on land and feed the animals",
            "Drought has zero effect on living things",
            "Predator birds turn into plants"
          ],
          "answer": 0,
          "hint": "Losing water hurts producers and prey, starving predators!"
        }
      ],
      "vocab": [
        {
          "q": "Which term describes an organism that breaks down dead plant and animal matter?",
          "options": [
            "Decomposer",
            "Producer",
            "Herbivore",
            "Predator"
          ],
          "answer": 0,
          "hint": "De-composer breaks down composition!"
        },
        {
          "q": "What are the microscopic pores on leaves that allow gas exchange called?",
          "options": [
            "Stomata",
            "Pores of sponge",
            "Chlorophyll",
            "Tendrils"
          ],
          "answer": 0,
          "hint": "Leaf stomata bordered by guard cells!"
        },
        {
          "q": "What is an interconnected network of multiple food chains called?",
          "options": [
            "Food Web",
            "Food Chain",
            "Aquifer",
            "Solar Noon"
          ],
          "answer": 0,
          "hint": "A giant web of feeding links!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "In a Dickinson Bayou food web diagram, what do the arrows connecting one organism to another represent?",
        "options": [
          {
            "id": "a",
            "text": "Which animal is physically larger in size"
          },
          {
            "id": "b",
            "text": "The direction in which chemical energy flows from prey to consumer"
          },
          {
            "id": "c",
            "text": "The migration direction of birds in winter"
          },
          {
            "id": "d",
            "text": "Which organism provides sunlight to the other"
          }
        ],
        "answer": "b",
        "explanation": "In scientific food chain and food web diagrams, arrows point from the organism being eaten to the organism eating it, showing the flow of chemical energy!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO essential ecological roles are performed by decomposers such as marsh bacteria and fungi? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Breaking down dead organic plant and animal tissues"
          },
          {
            "id": "b",
            "text": "Capturing solar energy directly to manufacture glucose sugar"
          },
          {
            "id": "c",
            "text": "Recycling valuable minerals and chemical nutrients back into the soil"
          },
          {
            "id": "d",
            "text": "Hunting living primary consumers for predator energy"
          },
          {
            "id": "e",
            "text": "Pumping groundwater through plant stem xylem"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Decomposers break down dead tissues and organic wastes (a) and recycle chemical nutrients back into the soil or water (c), enabling new plant growth!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: What role do microscopic leaf stomata play in supporting plant survival and the surrounding ecosystem?",
        "optionsA": [
          {
            "id": "a",
            "text": "They absorb solid soil grains directly into the leaf."
          },
          {
            "id": "b",
            "text": "They allow carbon dioxide gas to enter for photosynthesis and release oxygen gas."
          },
          {
            "id": "c",
            "text": "They create sound waves to scare away insects."
          },
          {
            "id": "d",
            "text": "They store petroleum inside the plant stem."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Guard cells surrounding stomata open and close to regulate gas exchange and water vapor transpiration."
          },
          {
            "id": "b",
            "text": "Plants produce carbon dioxide during daylight to poison surrounding insects."
          },
          {
            "id": "c",
            "text": "Stomata only function during the middle of the night in freezing cold temperatures."
          },
          {
            "id": "d",
            "text": "Leaves do not require gases to manufacture glucose."
          }
        ],
        "answerB": "a",
        "explanation": "Stomata are microscopic pores regulated by guard cells that open to allow CO2 intake for photosynthesis and release byproduct oxygen!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding ecological roles using the drop-down menus:",
        "segments": [
          {
            "text": "In a Texas coastal prairie ecosystem, green cordgrass acts as a "
          },
          {
            "blankId": "b1",
            "options": [
              "producer",
              "consumer",
              "decomposer"
            ],
            "answer": "producer"
          },
          {
            "text": " because it converts sunlight into food, while a roseate spoonbill acts as a "
          },
          {
            "blankId": "b2",
            "options": [
              "consumer",
              "producer",
              "decomposer"
            ],
            "answer": "consumer"
          },
          {
            "text": " because it obtains energy by eating other organisms."
          }
        ],
        "explanation": "Cordgrass manufactures its own food through photosynthesis (producer); spoonbills obtain energy by consuming aquatic prey (consumer)."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each organism from the Dickinson Bayou ecosystem into its correct ecological role:",
        "categories": [
          {
            "id": "producer",
            "label": "Producer (Makes Own Food)"
          },
          {
            "id": "consumer",
            "label": "Consumer (Eats Organisms)"
          },
          {
            "id": "decomposer",
            "label": "Decomposer (Recycles Nutrients)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Smooth Cordgrass growing in marsh mud",
            "category": "producer"
          },
          {
            "id": "i2",
            "label": "Roseate Spoonbill hunting shrimp in bayou shallows",
            "category": "consumer"
          },
          {
            "id": "i3",
            "label": "Marsh Bacteria decomposing dead fish on the bank",
            "category": "decomposer"
          },
          {
            "id": "i4",
            "label": "Gulf Killifish eating mosquito larvae in marsh pools",
            "category": "consumer"
          }
        ],
        "explanation": "Cordgrass is an autotrophic producer; spoonbills and killifish are heterotrophic consumers; bacteria are saprophytic decomposers."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "What is the original source of almost all energy that flows through the plants and animals of the Dickinson Bayou salt marsh?",
        "options": [
          {
            "id": "a",
            "text": "The Sun"
          },
          {
            "id": "b",
            "text": "The Moon’s gravitational pull"
          },
          {
            "id": "c",
            "text": "Underground crude petroleum"
          },
          {
            "id": "d",
            "text": "Electricity from power lines"
          }
        ],
        "answer": "a",
        "explanation": "Radiant energy from the Sun is captured by green plants during photosynthesis, serving as the foundational energy source for the entire food web!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "If an invasive insect destroys 80% of the marsh grass along Dickinson Bayou, which animal population is most likely to decrease first?",
        "options": [
          {
            "id": "a",
            "text": "Herbivores that eat the marsh grass directly (like grasshoppers)"
          },
          {
            "id": "b",
            "text": "Top predators like alligators"
          },
          {
            "id": "c",
            "text": "Deep underground earthworms"
          },
          {
            "id": "d",
            "text": "Mushrooms growing on dead oak logs"
          }
        ],
        "answer": "a",
        "explanation": "Primary consumers (herbivores like grasshoppers) depend directly on the plants for food. If the plants disappear, herbivores experience an immediate food shortage!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO essential raw ingredients must a green plant take in from its environment to carry out photosynthesis? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Water absorbed through root hairs"
          },
          {
            "id": "b",
            "text": "Carbon dioxide gas absorbed through leaf stomata"
          },
          {
            "id": "c",
            "text": "Cooked meat from smaller insects"
          },
          {
            "id": "d",
            "text": "Petroleum fuel pumped from rock layers"
          },
          {
            "id": "e",
            "text": "Pure table salt from Galveston Bay"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Photosynthesis requires sunlight, water (absorbed by roots), and carbon dioxide (absorbed through leaf stomata) to manufacture glucose and oxygen!"
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: What would happen to an ecosystem if all decomposers (fungi and bacteria) suddenly disappeared?",
        "optionsA": [
          {
            "id": "a",
            "text": "Dead plants and animal wastes would pile up, and soil would run out of nutrients needed by plants."
          },
          {
            "id": "b",
            "text": "Plants would grow twenty feet taller in one week."
          },
          {
            "id": "c",
            "text": "All animals would turn into producers."
          },
          {
            "id": "d",
            "text": "Rain would stop falling completely."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Why are decomposers vital for continuous plant growth?",
        "optionsB": [
          {
            "id": "a",
            "text": "They recycle essential nitrogen, phosphorus, and minerals back into the soil from dead matter."
          },
          {
            "id": "b",
            "text": "They shine sunlight onto leaves at night."
          },
          {
            "id": "c",
            "text": "They dig tunnels that allow cars to drive through soil."
          },
          {
            "id": "d",
            "text": "They produce pure oxygen gas inside tree trunks."
          }
        ],
        "answerB": "a",
        "explanation": "Decomposers recycle dead organic matter into essential minerals and nitrogen compounds that enrich soil, allowing new producers to grow and thrive!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the scientific definitions of consumers using the drop-down menus:",
        "segments": [
          {
            "text": "An animal that eats only plants is called a "
          },
          {
            "blankId": "b1",
            "options": [
              "herbivore",
              "carnivore",
              "decomposer"
            ],
            "answer": "herbivore"
          },
          {
            "text": ", while an animal that eats both plants and other animals is called an "
          },
          {
            "blankId": "b2",
            "options": [
              "omnivore",
              "carnivore",
              "autotroph"
            ],
            "answer": "omnivore"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Herbivores eat only plants; carnivores eat only meat; omnivores eat both plant and animal matter."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Arrange these four organisms into a correct 4-step marsh food chain showing the flow of energy:",
        "categories": [
          {
            "id": "step1",
            "label": "Trophic Level 1 (Producer)"
          },
          {
            "id": "step2",
            "label": "Trophic Level 2 (Primary Consumer / Herbivore)"
          },
          {
            "id": "step3",
            "label": "Trophic Level 3 (Secondary Consumer / Carnivore)"
          },
          {
            "id": "step4",
            "label": "Trophic Level 4 (Tertiary Consumer / Apex Predator)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Smooth Cordgrass (captures sunlight to make food)",
            "category": "step1"
          },
          {
            "id": "i2",
            "label": "Marsh Grasshopper (eats cordgrass leaves)",
            "category": "step2"
          },
          {
            "id": "i3",
            "label": "Gulf Killifish (eats marsh grasshopper)",
            "category": "step3"
          },
          {
            "id": "i4",
            "label": "Roseate Spoonbill (eats killifish minnows)",
            "category": "step4"
          }
        ],
        "explanation": "Energy flows sequentially: Sun -> Cordgrass (Producer) -> Grasshopper (Primary) -> Killifish (Secondary) -> Roseate Spoonbill (Tertiary)!"
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "Why do healthy plant leaves appear green when illuminated by white sunlight?",
        "options": [
          {
            "id": "a",
            "text": "They contain chlorophyll, a green pigment that absorbs red and blue light for photosynthesis and reflects green light."
          },
          {
            "id": "b",
            "text": "They absorb green paint from contaminated bayou mud."
          },
          {
            "id": "c",
            "text": "They are made of green glass crystals."
          },
          {
            "id": "d",
            "text": "The Sun only shines green light onto Earth."
          }
        ],
        "answer": "a",
        "explanation": "Chlorophyll is the green light-trapping pigment inside plant chloroplasts. It absorbs red and blue wavelengths of sunlight to power photosynthesis and reflects green light back to our eyes!"
      }
    ]
  },
  {
    "id": "m4_2",
    "unitId": 4,
    "unitTitle": "Unit 4: Organisms & Environments",
    "gradingPeriod": "2nd Nine Weeks (CBA 2)",
    "code": "TEKS 4.13A, 4.13B",
    "title": "Structures & Inherited vs. Acquired Traits",
    "subtitle": "Plant/Animal Adaptations, Bird Beaks & Trait Observatory",
    "icon": "🦅",
    "accentColor": "#db2777",
    "iCanStatement": "I can explore and explain how internal and external structures of plants and animals function to support survival, growth, and reproduction, and differentiate between inherited traits and learned/acquired behaviors.",
    "localAnchor": "Galveston Bay and Dickinson coastal fauna: Roseate spoonbills using spoon-shaped beaks to strain water, Gulf oysters cementing shells to reefs, and distinguishing inherited webbed feet from acquired wing scars or learned foraging spots.",
    "engage": {
      "hookQuestion": "A roseate spoonbill wading in Dickinson Bayou has a flat, spoon-shaped bill, pink plumage, and a scar on its leg from an old fishing line. Which of these characteristics is an acquired physical trait rather than an inherited trait?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "The leg scar, because it was caused by an environmental interaction after birth and is not passed down through DNA.",
          "correct": true,
          "feedback": "Excellent reasoning, Kelenna! Scars, injuries, and learned tricks happen during an animal’s lifetime—they are acquired, not passed down in DNA!"
        },
        {
          "id": "b",
          "text": "The spoon-shaped bill, because spoonbills flatten their beaks by hitting oyster shells.",
          "correct": false,
          "feedback": "Beak shape is an inherited physical structure coded in the bird’s genetic DNA before it ever hatches!"
        },
        {
          "id": "c",
          "text": "The webbed toes, because wading in bayou water forces feet to grow extra skin.",
          "correct": false,
          "feedback": "Wading in water doesn’t grow webbed feet! Webbed feet are inherited adaptations passed down from parent birds."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            8,
            14
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Structures for Survival",
            "text": "Every organism possesses internal and external structures adapted to its habitat.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Look at the wildlife along Dickinson Bayou, Kelenna! Every living creature is equipped with incredible built-in body tools. From sharp claws to waterproof feathers, these physical structures help organisms survive, grow, and thrive in their Texas wetland homes!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            4,
            4,
            6
          ],
          "lookAt": [
            1,
            2,
            0
          ],
          "callout": {
            "title": "The Spoonbill’s Specialized Beak",
            "text": "Touch-sensitive nerve endings and filtering lamellae detect prey in murky water.",
            "pos": [
              1,
              2,
              0
            ]
          },
          "narration": "Bird beaks work just like kitchen tools! The roseate spoonbill’s bill is a specialized soup-strainer spoon. It sweeps its bill side to side in muddy water, and sensitive nerve endings snap it shut in milliseconds when it bumps into a tasty shrimp!",
          "sfx": "chime"
        },
        {
          "start": 22,
          "end": 34,
          "cameraPos": [
            -4,
            4,
            6
          ],
          "lookAt": [
            -1,
            1,
            0
          ],
          "callout": {
            "title": "Inherited Traits (DNA)",
            "text": "Physical features like bone geometry, eye color, and innate instincts are passed from parents.",
            "pos": [
              -1,
              2,
              0
            ]
          },
          "narration": "How did the spoonbill get that beak? It was born with it! Inherited traits are coded in DNA and passed from parents to offspring. Pink feathers, long wading legs, and the instinct to sweep for food come straight from parent genetics!",
          "sfx": "splash"
        },
        {
          "start": 34,
          "end": 45,
          "cameraPos": [
            0,
            9,
            11
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Acquired & Learned Traits",
            "text": "Scars, broken feathers, and knowing where fishing docks discard scraps are acquired after hatching.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Now look at a broken wing feather or a leg scar from tangled fishing line. Those are acquired traits! They happened during the bird’s life through environmental interactions. If this spoonbill has chicks, the chicks will NOT be born with scars!",
          "sfx": "wind"
        }
      ]
    },
    "explore": {
      "instructions": "Dissect and test 3D biological structures in the Trait Observatory. Compare bird beak mechanics (spoonbill spoon-bill vs. heron spear vs. sparrow seed cracker), examine plant taproots vs. fibrous roots, and classify organism characteristics as inherited or acquired.",
      "labPrompts": [
        "Test the spoonbill beak lever mechanism on simulated muddy bayou water to capture brine shrimp and small fish.",
        "Examine the deep taproot of a Texas coastal oak versus shallow fibrous marsh grass roots during a simulated tropical gale.",
        "Sort traits of Gulf Coast dolphins into inherited physical structures versus learned hunting techniques."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            5,
            10
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "External Structural Adaptations",
            "text": "Beaks, talons, thorns, camouflage, and fur colors perform vital life functions.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "External structures are body parts on the outside. A pelican has a giant dip-net throat pouch, a hawk has sharp meat-scissors talons, and a rose bush has sharp prickle thorns to protect itself from hungry plant-eaters!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            3,
            3,
            5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Internal Structural Adaptations",
            "text": "Lungs, hollow bird bones, vascular xylem tubes, and swim bladders support life inside.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Internal structures work inside the body! Coastal birds have hollow bones that look like Swiss cheese on the inside to keep them super lightweight for flying. And plant stems have microscopic xylem tubes that act like drinking straws to pull water up to leaves!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            -3,
            3,
            5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Inherited Physical Traits",
            "text": "Characteristics coded in DNA passed from parents to offspring before birth or hatching.",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Inherited traits are what you are born with. An alligator’s armored scales, a live oak tree’s leaf shape, and a dolphin’s blowhole are all determined by genetic DNA passed down from biological parents!",
          "sfx": "chime"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            6,
            8
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Acquired Physical Traits",
            "text": "Changes caused by environmental wear, injury, diet, or life interactions.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Acquired traits are changes that happen during life. A scar on your knee from learning to skateboard, a broken oyster shell, or a pine tree bent sideways by Hurricane Harvey are acquired traits that cannot be passed to babies!",
          "sfx": "splash"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            8,
            12
          ],
          "lookAt": [
            0,
            0,
            0
          ],
          "callout": {
            "title": "Learned Behaviors vs. Instincts",
            "text": "Instincts are born ready (spiders spinning webs); learned behaviors require experience.",
            "pos": [
              0,
              1,
              0
            ]
          },
          "narration": "Behaviors have rules too! Instincts are born ready: baby sea turtles crawling to the ocean at night or spiders weaving webs. Learned behaviors require practice: a dog sitting for a treat, or Kelenna mastering science challenges!",
          "sfx": "wind"
        }
      ],
      "vocabulary": [
        {
          "id": "m4_2_v0",
          "term": "Internal Structure",
          "simpleMeaning": "A special body part hidden inside an organism that keeps it alive, like hollow bird bones or plant water straws!",
          "definition": "An anatomical part located inside an organism’s body (such as lungs, hollow bones, or xylem vessels) performing vital functions.",
          "example": "Hollow bones are an internal structure that keeps coastal gulls and pelicans lightweight for flying.",
          "narration": "Internal Structure! Internal means inside! Organs like lungs, hollow bird bones, and plant xylem tubes are internal tools that help living things survive!"
        },
        {
          "id": "m4_2_v1",
          "term": "External Structure",
          "simpleMeaning": "A physical part visible on the outside of an organism, like a bird’s beak, webbed feet, or plant thorns!",
          "definition": "An observable physical part on the outside of an organism (such as claws, beaks, thorns, or petals) aiding in survival or protection.",
          "example": "The spoon-shaped bill of a roseate spoonbill is an external structure adapted for filter feeding.",
          "narration": "External Structure! External means outside! Claws, bird beaks, scales, and cactus thorns are external structures designed to do tough jobs in nature!"
        },
        {
          "id": "m4_2_v2",
          "term": "Inherited Trait",
          "simpleMeaning": "A physical feature or instinct you are born with, passed down from your parents through genetic DNA!",
          "definition": "A physical characteristic or instinct passed down from parent organisms to offspring through genetic information (DNA).",
          "example": "The pink feather coloration pattern of a roseate spoonbill is an inherited trait.",
          "narration": "Inherited Trait! Inherited means it came from your family! Traits like eye color, beak shape, and webbed feet are coded in DNA and passed from parents to offspring!"
        },
        {
          "id": "m4_2_v3",
          "term": "Acquired Trait",
          "simpleMeaning": "A change to your body caused by your life, an injury, or the environment—like a scar on your knee!",
          "definition": "A physical modification resulting from environmental factors, injury, or wear during an organism’s lifetime that is not passed genetically.",
          "example": "A scar on a dolphin’s fin from an oyster reef is an acquired trait.",
          "narration": "Acquired Trait! Acquired means you gained it during your life! Scars, broken branches, or pierced ears are acquired traits that cannot be passed to babies!"
        },
        {
          "id": "m4_2_v4",
          "term": "Learned Behavior",
          "simpleMeaning": "An action or skill that an animal or human learns through practice, experience, or watching others!",
          "definition": "A behavior or skill acquired through experience, training, practice, or observation rather than existing automatically from birth.",
          "example": "A pet dog learning to fetch a tennis ball or shake hands is a learned behavior.",
          "narration": "Learned Behavior! You aren’t born knowing how to ride a bicycle or play soccer—you have to learn it through practice! That is a learned behavior!"
        }
      ]
    },
    "elaborate": {
      "title": "Gulf Coast Bio-Mimicry Robotics Challenge",
      "scenario": "NASA JSC robotics engineers are designing an autonomous amphibious rover to sample soft, muddy sediment on Jupiter’s moon Europa, inspired by Texas wetland wildlife.",
      "goalDescription": "Select the optimal combination of bio-inspired structural adaptations (spoonbill beak scoop, cordgrass root stabilization, and duck foot paddles) for rover mobility and sample collection.",
      "criteria": [
        "Equip mechanical scoop with filter ridges modeled on spoonbill beak lamellae.",
        "Design rover footing inspired by broad webbed aquatic feet to prevent sinking into mud.",
        "Successfully extract core sediment samples without clogging mechanical joints."
      ],
      "successFeedback": "Engineering Triumph! Bio-mimicry of Galveston Bay fauna enabled the rover to traverse mudflats with zero mechanical failures!"
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Which of the following is an example of an acquired physical trait rather than an inherited trait?",
          "options": [
            "A scar on a marsh rabbit’s leg from escaping a hawk",
            "A roseate spoonbill’s spoon-shaped bill",
            "A duck’s webbed toes",
            "A dolphin’s blowhole"
          ],
          "answer": 0,
          "hint": "A scar happens after an injury—it is not coded in DNA!"
        },
        {
          "q": "Which kitchen tool functions most similarly to a roseate spoonbill’s bill in murky water?",
          "options": [
            "A slotted strainer spoon",
            "A meat cleaver",
            "A corkscrew",
            "A rolling pin"
          ],
          "answer": 0,
          "hint": "It filters water through side slits while trapping small shrimp and fish!"
        },
        {
          "q": "If a parent dog has its tail docked (shortened by a vet), what will its puppies’ tails look like at birth?",
          "options": [
            "Normal long tails, because a docked tail is an acquired trait that is not in DNA",
            "Short tails, because all physical changes pass to puppies",
            "Puppies will be born without any legs",
            "Puppies will have cat tails"
          ],
          "answer": 0,
          "hint": "Acquired physical changes never change genetic DNA!"
        }
      ],
      "explore": [
        {
          "q": "What bird beak structure is best adapted for cracking open hard seeds and acorns like a pair of heavy pliers?",
          "options": [
            "A short, thick, conical beak (like a cardinal or finch)",
            "A long spear beak (like a heron)",
            "A flat paddle beak (like a duck)",
            "A hooked sharp beak (like a hawk)"
          ],
          "answer": 0,
          "hint": "Thick, strong nutcracker beaks crack seeds!"
        },
        {
          "q": "How does a plant’s deep taproot help a Texas live oak survive strong hurricane winds?",
          "options": [
            "It anchors the tree deep into underground soil layers so it won’t tip over",
            "It produces wind to push clouds away",
            "It lets the tree walk to a safe location",
            "It turns leaves into feathers"
          ],
          "answer": 0,
          "hint": "A deep anchor root holds fast against gale force winds!"
        },
        {
          "q": "Which of the following is an inherited instinct in animals?",
          "options": [
            "A baby sea turtle instinctively crawling toward ocean waves after hatching",
            "A dog rolling over for a dog biscuit",
            "A parrot reciting human nursery rhymes",
            "A horse jumping over human hurdles in an arena"
          ],
          "answer": 0,
          "hint": "Instincts are born ready without needing lessons!"
        }
      ],
      "explain": [
        {
          "q": "Why do flying birds have hollow bones instead of dense solid bones like mammals?",
          "options": [
            "Hollow bones are lightweight internal structures that make flight energy-efficient",
            "Hollow bones store water for swimming",
            "Hollow bones are filled with hot air balloons",
            "Birds don’t have any bones at all"
          ],
          "answer": 0,
          "hint": "Lightweight bones keep birds light enough to fly!"
        },
        {
          "q": "What is the function of xylem tubes inside a plant stem?",
          "options": [
            "They act as internal straws transporting water and minerals from roots to leaves",
            "They digest meat like a stomach",
            "They produce flower petals",
            "They make seeds fall off"
          ],
          "answer": 0,
          "hint": "Internal water transport straws!"
        },
        {
          "q": "Which of the following is a learned behavior in humans?",
          "options": [
            "Speaking English and solving division math problems",
            "Blinking when dust blows toward your eye",
            "Having five toes on each foot",
            "Having dark brown eyes"
          ],
          "answer": 0,
          "hint": "Skills you study and practice in school!"
        }
      ],
      "vocab": [
        {
          "q": "What vocabulary term describes an observable physical body part on the outside of an organism?",
          "options": [
            "External Structure",
            "Internal Structure",
            "Learned Behavior",
            "Aquifer"
          ],
          "answer": 0,
          "hint": "External = Outside!"
        },
        {
          "q": "What do we call a behavior or skill acquired through experience and training?",
          "options": [
            "Learned Behavior",
            "Inherited Trait",
            "Axial Tilt",
            "Photosynthesis"
          ],
          "answer": 0,
          "hint": "Learned through practice and observation!"
        },
        {
          "q": "Which vocabulary term describes a physical feature passed down through genetic DNA from parents?",
          "options": [
            "Inherited Trait",
            "Acquired Trait",
            "Evaporation",
            "Weathering"
          ],
          "answer": 0,
          "hint": "Inherited from biological parents!"
        }
      ]
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A Gulf Coast marsh rabbit has brown fur, long upright ears, a notched tear in its left ear from an encounter with a hawk, and four legs. Which characteristic is an acquired trait rather than an inherited trait?",
        "options": [
          {
            "id": "a",
            "text": "Brown fur coloration"
          },
          {
            "id": "b",
            "text": "Long upright ears"
          },
          {
            "id": "c",
            "text": "Notched tear in the ear from an injury"
          },
          {
            "id": "d",
            "text": "Having four legs"
          }
        ],
        "answer": "c",
        "explanation": "The notched tear occurred during the rabbit’s lifetime as an injury from an environmental interaction; it is an acquired trait and cannot be passed to baby rabbits!"
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Which TWO characteristics are examples of inherited traits in organisms? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "The shape of a roseate spoonbill’s bill"
          },
          {
            "id": "b",
            "text": "A dolphin performing a synchronized flip after trainer coaching"
          },
          {
            "id": "c",
            "text": "A tree leaning permanently sideways after hurricane winds"
          },
          {
            "id": "d",
            "text": "The pattern of scales on a Texas diamondback terrapin shell"
          },
          {
            "id": "e",
            "text": "A human speaking Spanish fluently"
          }
        ],
        "answers": [
          "a",
          "d"
        ],
        "explanation": "Beak shape (a) and shell scale patterns (d) are physical traits coded in genetic DNA and passed from parents to offspring. The others are learned skills or environmental damage!"
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: How does the external structure of webbed feet help wading and swimming birds in Galveston Bay survive?",
        "optionsA": [
          {
            "id": "a",
            "text": "It allows them to drill holes through deep underground rock layers."
          },
          {
            "id": "b",
            "text": "It provides a larger surface area to propel through water and walk over soft bay mud without sinking."
          },
          {
            "id": "c",
            "text": "It produces electrical currents to shock prey minnows."
          },
          {
            "id": "d",
            "text": "It helps them fly into outer space."
          }
        ],
        "answerA": "b",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Wider surface area distributes bird body weight across muddy marsh sediments and acts as an efficient paddle in water."
          },
          {
            "id": "b",
            "text": "Webbed feet allow birds to absorb oxygen directly from mud without using lungs."
          },
          {
            "id": "c",
            "text": "Webbed feet are sharp knives used to cut large trees down."
          },
          {
            "id": "d",
            "text": "Birds only develop webbed feet if they swim in saltwater for ten hours."
          }
        ],
        "answerB": "a",
        "explanation": "Webbed feet act like natural snowshoes and paddles: their wide surface area prevents birds from sinking into gooey bay mud and provides propulsion while swimming!"
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding animal behaviors using the drop-down menus:",
        "segments": [
          {
            "text": "A baby duck swimming instinctively immediately after hatching is an "
          },
          {
            "blankId": "b1",
            "options": [
              "inherited behavior (instinct)",
              "acquired physical trait",
              "learned behavior"
            ],
            "answer": "inherited behavior (instinct)"
          },
          {
            "text": ", whereas a pet dog waiting patiently by the back door for a walk is a "
          },
          {
            "blankId": "b2",
            "options": [
              "learned behavior",
              "inherited trait",
              "cellular structure"
            ],
            "answer": "learned behavior"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Instinctive swimming at hatching is an inborn inherited behavior; learning household routines through experience is a learned behavior."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each organism trait into its correct scientific category (Inherited vs. Acquired/Learned):",
        "categories": [
          {
            "id": "inherited",
            "label": "Inherited Traits (Genetic DNA)"
          },
          {
            "id": "acquired",
            "label": "Acquired / Learned Traits (Experience or Injury)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "A pelican’s large throat pouch for catching fish",
            "category": "inherited"
          },
          {
            "id": "i2",
            "label": "A parrot repeating human spoken words",
            "category": "acquired"
          },
          {
            "id": "i3",
            "label": "A sea turtle bearing a propeller scar on its shell",
            "category": "acquired"
          },
          {
            "id": "i4",
            "label": "A live oak tree producing acorns with protective caps",
            "category": "inherited"
          }
        ],
        "explanation": "Throat pouch anatomy and acorn reproduction structures are genetically inherited. Mimicking words is learned, and a shell scar is an acquired injury!"
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Which bird beak structure is best adapted for cracking open hard seeds and nuts like a pair of heavy pliers?",
        "options": [
          {
            "id": "a",
            "text": "A short, thick, conical beak (like a cardinal or finch)"
          },
          {
            "id": "b",
            "text": "A long, needle-thin beak (like a hummingbird)"
          },
          {
            "id": "c",
            "text": "A flat, broad strainer bill (like a duck)"
          },
          {
            "id": "d",
            "text": "A long, spear-shaped bill (like a great blue heron)"
          }
        ],
        "answer": "a",
        "explanation": "Short, thick, conical beaks exert tremendous crushing pressure like a nutcracker, perfect for cracking hard seeds and nuts!"
      },
      {
        "id": "q7",
        "type": "single",
        "prompt": "Why do wading birds and coastal gulls have hollow bones rather than solid, dense bones like deer and humans?",
        "options": [
          {
            "id": "a",
            "text": "Hollow bones are lightweight internal structures that reduce body mass to make flight easier."
          },
          {
            "id": "b",
            "text": "Hollow bones are filled with seawater to keep birds cool."
          },
          {
            "id": "c",
            "text": "Hollow bones are used to store digested fish."
          },
          {
            "id": "d",
            "text": "Birds broke all their bones when they were chicks."
          }
        ],
        "answer": "a",
        "explanation": "Hollow, air-filled bones provide internal skeletal strength while drastically reducing body weight, an essential adaptation for flight!"
      },
      {
        "id": "q8",
        "type": "multiselect",
        "prompt": "Which TWO examples represent learned behaviors in animals? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "A dog rolling over onto its back to receive a treat from Kelenna"
          },
          {
            "id": "b",
            "text": "A raccoon figuring out how to unlatch a garbage can lid to find food"
          },
          {
            "id": "c",
            "text": "A spider spinning a complex silk web without any parent instruction"
          },
          {
            "id": "d",
            "text": "A newborn calf standing up and nursing minutes after birth"
          },
          {
            "id": "e",
            "text": "A bird possessing feathers with waterproof oil glands"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Rolling over for a treat (a) and figuring out a garbage latch (b) require problem-solving, training, or experience. Web spinning, nursing instincts, and feathers are inherited!"
      },
      {
        "id": "q9",
        "type": "multipart",
        "promptA": "Part A: What is an example of an internal plant structure that helps it survive in the Texas Coastal Prairie?",
        "optionsA": [
          {
            "id": "a",
            "text": "Xylem and phloem vascular tubes inside stems that transport water and sugars"
          },
          {
            "id": "b",
            "text": "Colorful flower petals that attract honeybees"
          },
          {
            "id": "c",
            "text": "Sharp external thorns on blackberry bushes"
          },
          {
            "id": "d",
            "text": "Green leaf blades that absorb sunlight"
          }
        ],
        "answerA": "a",
        "promptB": "Part B: How does this internal structure support plant survival?",
        "optionsB": [
          {
            "id": "a",
            "text": "It pumps water absorbed by roots up to leaves for photosynthesis and distributes glucose food."
          },
          {
            "id": "b",
            "text": "It frightens away grazing cows with loud humming sounds."
          },
          {
            "id": "c",
            "text": "It allows the plant to jump into a pond when hot."
          },
          {
            "id": "d",
            "text": "It turns underground rocks into gasoline."
          }
        ],
        "answerB": "a",
        "explanation": "Xylem and phloem are internal vascular transport tubes that function like veins, delivering water to leaves and distributing manufactured glucose throughout the plant!"
      },
      {
        "id": "q10",
        "type": "inlinechoice",
        "prompt": "Complete the classification of structural adaptations using the drop-down menus:",
        "segments": [
          {
            "text": "The sharp prickle thorns on a coastal dewberry bush are "
          },
          {
            "blankId": "b1",
            "options": [
              "external structures for defense",
              "internal structures for digestion",
              "learned behaviors"
            ],
            "answer": "external structures for defense"
          },
          {
            "text": ", while the chlorophyll-containing chloroplasts inside leaf cells are "
          },
          {
            "blankId": "b2",
            "options": [
              "internal structures for food production",
              "external traits for camouflage",
              "acquired injuries"
            ],
            "answer": "internal structures for food production"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Thorns are observable external structures that deter herbivores; chloroplasts are internal cellular structures that manufacture glucose during photosynthesis."
      },
      {
        "id": "q11",
        "type": "dragsort",
        "prompt": "Classify each animal characteristic into its exact biological category:",
        "categories": [
          {
            "id": "phys_inh",
            "label": "Inherited Physical Trait (Body Feature)"
          },
          {
            "id": "instinct",
            "label": "Inherited Instinct (Inborn Behavior)"
          },
          {
            "id": "phys_acq",
            "label": "Acquired Physical Trait (Environmental/Injury)"
          },
          {
            "id": "learned",
            "label": "Learned Behavior (Experience/Training)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Striped camouflage pattern on a Gulf flounder",
            "category": "phys_inh"
          },
          {
            "id": "i2",
            "label": "A sea turtle crawling toward the ocean immediately upon hatching",
            "category": "instinct"
          },
          {
            "id": "i3",
            "label": "A scar on a manatee’s back from a boat propeller",
            "category": "phys_acq"
          },
          {
            "id": "i4",
            "label": "A bear learning to catch jumping salmon at a specific waterfall bend",
            "category": "learned"
          }
        ],
        "explanation": "Body camouflage is an inherited physical trait; newborn sea turtle navigation is an inherited instinct; a propeller scar is an acquired physical injury; fishing technique is a learned behavior!"
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A science class in Dickinson observes that a mother cat has lost a portion of her tail in an accident. If the mother cat gives birth to a litter of kittens, what will the kittens’ tails look like?",
        "options": [
          {
            "id": "a",
            "text": "All kittens will be born with normal, full-length tails because losing a tail is an acquired trait that does not alter DNA."
          },
          {
            "id": "b",
            "text": "All kittens will be born with missing tails."
          },
          {
            "id": "c",
            "text": "Half of the kittens will have no tails, and half will have two tails."
          },
          {
            "id": "d",
            "text": "Kittens will grow tails only after they learn how to climb trees."
          }
        ],
        "answer": "a",
        "explanation": "Injuries, scars, and amputations are acquired traits caused by environmental interactions. They do NOT alter the genetic DNA passed to offspring, so all kittens are born with normal full-length tails!"
      }
    ]
  }
];
