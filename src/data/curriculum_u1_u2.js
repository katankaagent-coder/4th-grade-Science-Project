/**
 * Dunbar Middle School (Dickinson ISD) - 4th Grade Science 5E Curriculum
 * Units 1 & 2 Master Curriculum Data (5 Modules Total)
 * Aligned with 19 TAC §112.6 (Texas Essential Knowledge and Skills - TEKS 2024-2026)
 * Upgraded for Kelenna with First-Principles Vivid Narration, Rotating Quizzes & STAAR 2.0 Pool
 *
 * Unit 1: Matter & Physical Properties (TEKS 4.6A, 4.6B, 4.6C)
 * Unit 2: Force, Motion & Energy (TEKS 4.7A, 4.8A, 4.8B, 4.8C)
 */

export const CURRICULUM_U1_U2 = [
  {
    "id": "m1_1",
    "unitId": 1,
    "unitTitle": "Unit 1: Matter & Physical Properties",
    "gradingPeriod": "1st Nine Weeks (CBA 1)",
    "code": "TEKS 4.6A",
    "title": "Physical Properties of Matter",
    "subtitle": "Mass, Magnetism, Relative Density, Temperature & States",
    "icon": "⚖️",
    "accentColor": "#0284c7",
    "iCanStatement": "I can classify matter by measuring, testing, and recording physical properties including mass, magnetism, relative density (sinking and floating in water), temperature, and physical states of matter.",
    "localAnchor": "Investigating sediments, pine cones, iron dock bolts, and oyster shells collected along Dickinson Bayou and the Dickinson Festival of Lights park at Galveston County.",
    "engage": {
      "hookQuestion": "When sorting storm debris along Dickinson Bayou after a flood, how can we separate heavy iron nails, floating pine bark, and dense granite gravel without touching every piece?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Use a strong magnet to pull out iron nails, drop the rest in water so pine bark floats, and let granite gravel sink to the bottom.",
          "correct": true,
          "feedback": "Spot on! You used magnetism to separate iron, and relative density in water to separate floating pine bark from sinking granite."
        },
        {
          "id": "b",
          "text": "Heat the mixture until the granite melts into liquid and evaporates away.",
          "correct": false,
          "feedback": "Granite requires extreme temperatures over 1,200°C to melt; heating is not an effective way to separate these solid materials."
        },
        {
          "id": "c",
          "text": "Pour cold water over everything because all natural materials float equally.",
          "correct": false,
          "feedback": "Materials have different relative densities; iron and granite are denser than water and will sink."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            4,
            8
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Dickinson Bayou Debris",
            "text": "Mixed sediment and debris washed up near Dunbar Middle School",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Welcome to science lab, Kelenna! Imagine you're walking along Dickinson Bayou after a big storm. Look at all this washed-up debris: rusty iron dock nails, pine bark chips, and heavy river stones! How can we sort all these without picking up every piece one-by-one? By tapping into their secret physical superpowers—their physical properties!",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            -3,
            3,
            5
          ],
          "lookAt": [
            -1,
            1,
            0
          ],
          "callout": {
            "title": "Magnetic Testing",
            "text": "Neodymium magnet attracts ferrous iron fasteners",
            "pos": [
              -1.2,
              1.2,
              0
            ]
          },
          "narration": "Here is secret weapon number one: a strong magnet! Watch what happens when we hover it over the messy pile—CLACK! Only the iron dock nails fly straight up into the air. Why? Because iron atoms have a special magnetic pull, while pine bark and rocks don't care at all. We just sorted out the iron in two seconds flat using Magnetism!",
          "sfx": "magnet"
        },
        {
          "start": 22,
          "end": 33,
          "cameraPos": [
            3,
            2.5,
            4
          ],
          "lookAt": [
            1,
            0.8,
            0
          ],
          "callout": {
            "title": "Relative Density Tank",
            "text": "Pine bark floats while dense stones sink to the gravel bed",
            "pos": [
              1,
              1,
              0
            ]
          },
          "narration": "Next, we dump the leftover bark and stones into a tank of water. SPLASH! Just like you wearing a lifejacket in a swimming pool, the pine bark floats right at the top because it is less dense than water. But the heavy river stones sink like cannonballs to the bottom! Water acts as our referee for Relative Density.",
          "sfx": "splash"
        },
        {
          "start": 33,
          "end": 45,
          "cameraPos": [
            0,
            5,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Triple Beam Balance",
            "text": "Measuring mass in grams to catalog each physical property",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "Finally, we place our sorted treasures onto the triple beam balance pan. By sliding the counterweights, we measure exactly how many grams of 'stuff' or matter are packed inside each sample. By testing mass, magnetism, and sinking or floating, you can classify any mystery object in the universe!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Place test objects (iron bolt, wood cube, aluminum cylinder, plastic sphere) on the balance to measure mass, test magnetic pull, immerse in the water displacement tank, and read thermometer levels.",
      "labPrompts": [
        "Measure and compare the mass in grams (g) of the iron bolt versus the wooden block.",
        "Test each material with the bar magnet and record whether magnetic force attracts it.",
        "Submerge each object in the water tank to observe relative density: which objects sink (more dense than water) and which float (less dense than water)?"
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            3,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Mass & Gravitational Pull",
            "text": "Mass is the amount of matter in an object, measured in grams (g)",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Hey Kelenna, let's explore science from First Principles! Everything you can see, touch, or hold is made of Matter—tiny invisible building blocks like LEGO bricks. When we measure MASS on a balance scale, we are counting how many of those building blocks are packed inside. More blocks means more mass in grams!",
          "sfx": "chime"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            -2.5,
            2.5,
            4
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Magnetic Attraction",
            "text": "Non-contact magnetic force attracts ferromagnetic metals like iron, nickel, and cobalt",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "Now let's talk about MAGNETISM! A magnet doesn't need to touch an object to pull on it; it has an invisible magnetic field reaching through the air like a superhero tractor beam. It grabs onto specific metals containing iron, steel, nickel, or cobalt. Wood, plastic, and aluminum just ignore it completely!",
          "sfx": "magnet"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            2.5,
            2.5,
            4
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Relative Density in Water",
            "text": "Pure water has a density of 1.0 g/cm³. Objects more dense sink; less dense float",
            "pos": [
              0.5,
              1.2,
              0
            ]
          },
          "narration": "Next up: RELATIVE DENSITY! Think about a crowded school hallway packed shoulder-to-shoulder versus an empty hallway. Density is how tightly packed those building blocks are. If an object's tiny building blocks are packed more tightly than water molecules, it sinks down like a stone. If its blocks are spaced looser than water, it pops up and floats like pine bark!",
          "sfx": "splash"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            4,
            5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Thermal Energy & Temperature",
            "text": "Thermometers measure Celsius (°C) thermal energy of particles",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "What about TEMPERATURE? Matter is never totally still—its tiny particles are always jiggling! When things get hot, the particles dance around super fast with thermal energy. When things get cold, they slow down. A thermometer measures that dance in degrees Celsius (°C)!",
          "sfx": "whoosh"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            3,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Physical States of Matter",
            "text": "Solids have definite shape and volume; liquids have definite volume; gases fill containers",
            "pos": [
              0,
              1.3,
              0
            ]
          },
          "narration": "Finally, matter wears three different outfits called STATES OF MATTER! In a Solid, particles lock arms tightly and keep their own shape, like a wooden block. In a Liquid, particles slide around each other like friends in a swimming pool. And in a Gas, particles zoom everywhere like pinballs to fill the whole room!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m1_1_v0",
          "term": "Matter",
          "simpleMeaning": "Matter is simply the \"stuff\" everything in the universe is made of! If you can touch it, weigh it, or it takes up space—like you, your Chromebook, water, or even invisible air—it is matter.",
          "definition": "Anything that has mass and takes up space (volume).",
          "example": "A wooden desk at Dunbar Middle School, water in Dickinson Bayou, and oxygen inside a soccer ball are all matter.",
          "narration": "Matter! What does matter really mean? Imagine the universe is built out of tiny invisible LEGO blocks. Matter is any stuff that has weight and takes up space—like your desk, the water in Galveston Bay, and even the air you breathe!"
        },
        {
          "id": "m1_1_v1",
          "term": "Mass",
          "simpleMeaning": "Mass is the total amount of \"stuff\" packed inside an object. You measure mass by placing an object on a balance scale and reading the number of grams.",
          "definition": "The amount of matter in an object, measured in grams (g) using a balance or digital scale.",
          "example": "An iron dock bolt has a mass of 48 grams, while a dry pine cone has a mass of only 12 grams.",
          "narration": "Mass! Think of mass as counting how many tiny building blocks are packed inside your backpack. The more blocks inside, the more mass it has! In 4th grade science, we weigh mass in grams using balance scales."
        },
        {
          "id": "m1_1_v2",
          "term": "Relative Density",
          "simpleMeaning": "Relative density is a game of comparison with water: if an object is heavier for its size than water, it sinks to the bottom; if it is lighter for its size, it floats on top!",
          "definition": "The comparison of the density of an object to the density of water (sinking or floating in liquid).",
          "example": "Pine wood floats on Dickinson Bayou because it is less dense than water, while an iron anchor sinks because it is more dense.",
          "narration": "Relative Density! Imagine jumping into a swimming pool with a foam pool noodle. The foam floats high because its particles are spread out and less dense than water, while a dropped coin sinks fast because its particles are squished together tightly!"
        },
        {
          "id": "m1_1_v3",
          "term": "Magnetism",
          "simpleMeaning": "Magnetism is an invisible pulling superpower that attracts specific metals—especially iron, steel, nickel, and cobalt—without even touching them!",
          "definition": "A physical force of attraction or repulsion produced by magnetic fields, attracting ferrous metals like iron and steel.",
          "example": "A neodymium magnet pulls a steel paperclip across a table, but cannot pull a plastic ruler or wooden craft stick.",
          "narration": "Magnetism! A magnet is like a superhero with an invisible tractor beam. It can reach right through air, paper, and water to snatch up iron and steel nails without touching anything else!"
        },
        {
          "id": "m1_1_v4",
          "term": "State of Matter",
          "simpleMeaning": "The three forms matter can take: solid (holds its shape), liquid (flows and takes the shape of its container), and gas (spreads out in all directions).",
          "definition": "The physical form matter takes—solid, liquid, or gas—based on the kinetic energy and arrangement of its particles.",
          "example": "Water can exist as solid ice, liquid bayou water, or invisible water vapor in the humid Dickinson air.",
          "narration": "State of Matter! Matter comes in three team uniforms: Solid, Liquid, and Gas! In solids, particles lock hands tight. In liquids, they flow around like swimmers. In gases, they bounce everywhere like bouncy balls!"
        }
      ]
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "What happens when Kelenna waves a strong magnet over a mixture of iron nails, pine bark, and river stones?",
          "options": [
            "Only the iron nails are attracted and pull upward to the magnet.",
            "All three materials stick firmly to the magnet.",
            "The pine bark and stones stick, but the iron nails fall away.",
            "Nothing happens because magnets only work in outer space."
          ],
          "answer": 0,
          "hint": "Remember: magnets only pull on specific metals that contain iron!"
        },
        {
          "q": "Why does pine bark float on the surface of Dickinson Bayou while granite stones sink to the bottom?",
          "options": [
            "Pine bark is less dense than water, while granite stones are more dense than water.",
            "Pine bark has more mass in grams than granite stones.",
            "Pine bark is magnetic and is repelled by the muddy bayou water.",
            "Water only lets objects float if they are green in color."
          ],
          "answer": 0,
          "hint": "Think about relative density: less dense things float, and more dense things sink!"
        },
        {
          "q": "Which scientific tool should Kelenna use to accurately measure the mass of a bayou stone in grams?",
          "options": [
            "A glass graduated cylinder with water",
            "A triple beam balance or digital gram scale",
            "A Celsius thermometer",
            "A wooden meter stick"
          ],
          "answer": 1,
          "hint": "We measure mass in grams using a balance or digital scale!"
        }
      ],
      "explore": [
        {
          "q": "If Kelenna places a 50-gram block of pine wood and a 50-gram block of solid iron into a water tank, what will happen?",
          "options": [
            "The pine wood floats and the iron sinks because sinking depends on density, not just mass.",
            "Both blocks sink to the bottom because they have the exact same mass of 50 grams.",
            "Both blocks float on top because 50 grams is very light.",
            "The iron floats because metal repels liquid water molecules."
          ],
          "answer": 0,
          "hint": "Even if two objects have the same mass, density determines whether they sink or float!"
        },
        {
          "q": "Kelenna tests four metal objects: a copper penny, an aluminum foil strip, a steel washer, and a gold ring. Which one will stick to his bar magnet?",
          "options": [
            "The copper penny",
            "The aluminum foil strip",
            "The steel washer (which contains iron)",
            "The gold ring"
          ],
          "answer": 2,
          "hint": "Steel is made with iron, which makes it strongly magnetic!"
        },
        {
          "q": "When Kelenna places a thermometer into warm water from Dickinson Bayou, why does the red liquid inside rise higher?",
          "options": [
            "Thermal energy makes the liquid particles jiggle faster and expand upward.",
            "The water pushes down on the outside glass tube with air pressure.",
            "The thermometer is counting the total number of rocks in the bayou.",
            "Cold energy pulls the red liquid toward the top of the glass."
          ],
          "answer": 0,
          "hint": "Heat makes particles move faster and spread out, making the liquid expand!"
        }
      ],
      "explain": [
        {
          "q": "From first principles, what does the scientific word \"mass\" describe?",
          "options": [
            "How much space or volume an object takes up in a room",
            "The total amount of matter or \"building blocks\" packed inside an object",
            "How fast an object falls toward Earth when dropped",
            "The color, shine, and hardness of an object"
          ],
          "answer": 1,
          "hint": "Mass counts the actual amount of matter inside an object!"
        },
        {
          "q": "Why does solid ice float on top of a glass of liquid water?",
          "options": [
            "Solid ice is less dense than liquid water because water expands when it freezes.",
            "Ice contains magnetic charges that push away from liquid water.",
            "Liquid water has zero mass and cannot support anything.",
            "Ice has higher thermal energy than warm bayou water."
          ],
          "answer": 0,
          "hint": "When water freezes into ice, its particles spread out slightly, making ice less dense than liquid water!"
        },
        {
          "q": "Which state of matter has NO definite shape and NO definite volume, expanding to fill whatever container it enters?",
          "options": [
            "Solid",
            "Liquid",
            "Gas",
            "Mineral"
          ],
          "answer": 2,
          "hint": "Gas particles zoom freely in every direction until they fill the entire space!"
        }
      ],
      "vocab": [
        {
          "q": "Which scientific term means \"anything that has mass and takes up space\"?",
          "options": [
            "Energy",
            "Matter",
            "Magnetism",
            "Friction"
          ],
          "answer": 1,
          "hint": "Every physical thing in the universe—from air to rocks to you—is made of this!"
        },
        {
          "q": "If an object sinks straight to the bottom of a bucket of fresh water, its relative density is:",
          "options": [
            "Greater than the density of water (more dense)",
            "Less than the density of water (less dense)",
            "Equal to the density of air",
            "Zero grams per cubic centimeter"
          ],
          "answer": 0,
          "hint": "Things that are more dense than water sink down like a rock!"
        },
        {
          "q": "Which of the following is a physical property that can be tested WITHOUT destroying or changing the identity of a material?",
          "options": [
            "Testing whether it is attracted to a magnet",
            "Burning it completely into black ash with fire",
            "Allowing it to rust away over five years in salt water",
            "Digesting it inside an animal stomach"
          ],
          "answer": 0,
          "hint": "Testing with a magnet leaves the object completely unchanged!"
        }
      ]
    },
    "elaborate": {
      "title": "Dickinson Bayou Silt & Debris Separator Challenge",
      "scenario": "Following a heavy Gulf storm, Dickinson Public Works needs a mechanical sorting chute for Dunbar Middle School eco-volunteers to separate iron debris, buoyant pine mulch, and dense river stones.",
      "goalDescription": "Design a 3-stage separation device using physical properties (magnetism, relative density in water, and particle size screening) that purifies 100% of the bayou debris stream.",
      "criteria": [
        "Stage 1 must employ magnetic attraction to remove ferrous nails without consuming liquid resources.",
        "Stage 2 must utilize a water buoyancy basin to skim floating organic pine mulch from sinking mineral gravel.",
        "Stage 3 must measure and record the dry mass in grams of each recovered fraction."
      ],
      "successFeedback": "Outstanding engineering! Your separation system successfully sorted all three materials using their inherent physical properties without altering their chemical identity!"
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A student at Dunbar Middle School placed four unknown mineral samples into a beaker of freshwater (density = 1.0 g/cm³). Sample X sank immediately to the bottom, while Sample Y floated on the surface. What conclusion can the student make about Sample X?",
        "options": [
          {
            "id": "a",
            "text": "Sample X has less mass than Sample Y."
          },
          {
            "id": "b",
            "text": "Sample X is more dense than water."
          },
          {
            "id": "c",
            "text": "Sample X is a magnetic metal."
          },
          {
            "id": "d",
            "text": "Sample X has a higher temperature than water."
          }
        ],
        "answer": "b",
        "explanation": "Objects that sink in water have a relative density greater than water (density > 1.0 g/cm³), whereas objects that float are less dense than water."
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "A 4th grade science class is investigating the physical properties of a steel washer, a plastic button, and a wooden craft stick. Which TWO physical properties can be determined WITHOUT using water or a thermometer? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Mass measured in grams using a balance"
          },
          {
            "id": "b",
            "text": "Relative density compared to freshwater"
          },
          {
            "id": "c",
            "text": "Attraction to a bar magnet"
          },
          {
            "id": "d",
            "text": "Melting point temperature"
          },
          {
            "id": "e",
            "text": "Rate of dissolving in liquid"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Measuring mass with a balance scale and testing magnetism with a bar magnet require only dry testing tools, without needing water or heat."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: A student measures the mass of an ice cube as 28 grams. The ice cube is placed in a sealed plastic bag and allowed to melt completely into liquid water at room temperature (22°C). What is the mass of the liquid water inside the sealed bag?",
        "optionsA": [
          {
            "id": "a",
            "text": "28 grams"
          },
          {
            "id": "b",
            "text": "14 grams"
          },
          {
            "id": "c",
            "text": "35 grams"
          },
          {
            "id": "d",
            "text": "0 grams"
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Which statement best supports your answer in Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Water gains mass when it changes from solid to liquid."
          },
          {
            "id": "b",
            "text": "Matter cannot escape a closed system, so total mass is conserved during a physical change."
          },
          {
            "id": "c",
            "text": "Melting causes half of the water molecules to vanish."
          },
          {
            "id": "d",
            "text": "Liquid water is always heavier than solid ice."
          }
        ],
        "answerB": "b",
        "explanation": "During physical state changes (like melting), the arrangement of molecules changes but no matter is created or destroyed. In a sealed bag, mass remains exactly 28 grams."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific statement regarding physical properties using the drop-down menus:",
        "segments": [
          {
            "text": "An iron horseshoe sinks to the bottom of Dickinson Bayou because its relative density is "
          },
          {
            "blankId": "b1",
            "options": [
              "greater than that of water",
              "less than that of water",
              "equal to water vapor"
            ],
            "answer": "greater than that of water"
          },
          {
            "text": ", and if tested with a bar magnet, the iron horseshoe will "
          },
          {
            "blankId": "b2",
            "options": [
              "be attracted by magnetic force",
              "repel all magnetic fields",
              "dissolve immediately"
            ],
            "answer": "be attracted by magnetic force"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Iron is more dense than water (causing it to sink) and is a ferromagnetic metal that is strongly attracted to magnets."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Sort each object into the correct physical property category based on how it behaves in freshwater:",
        "categories": [
          {
            "id": "sink",
            "label": "More Dense than Water (Sinks)"
          },
          {
            "id": "float",
            "label": "Less Dense than Water (Floats)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Solid iron bolt",
            "category": "sink"
          },
          {
            "id": "i2",
            "label": "Pine wood block",
            "category": "float"
          },
          {
            "id": "i3",
            "label": "Granite river rock",
            "category": "sink"
          },
          {
            "id": "i4",
            "label": "Styrofoam foam bead",
            "category": "float"
          }
        ],
        "explanation": "Solid metals like iron and dense minerals like granite sink because their densities are greater than 1.0 g/cm³, while pine wood and styrofoam float because their densities are less than 1.0 g/cm³."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "Kelenna tests four solid cubes of identical size on a balance scale. Cube 1 has a mass of 15 grams, Cube 2 is 42 grams, Cube 3 is 95 grams, and Cube 4 is 8 grams. Which cube contains the greatest amount of matter?",
        "options": [
          {
            "id": "a",
            "text": "Cube 4 because smaller numbers mean tighter matter."
          },
          {
            "id": "b",
            "text": "Cube 3 because mass directly measures the amount of matter in an object."
          },
          {
            "id": "c",
            "text": "Cube 2 because it is closest to the average mass."
          },
          {
            "id": "d",
            "text": "All four cubes contain the exact same amount of matter because their sizes are identical."
          }
        ],
        "answer": "b",
        "explanation": "Mass is the measurement of the total amount of matter inside an object. The cube with 95 grams contains the most matter."
      },
      {
        "id": "q7",
        "type": "multiselect",
        "prompt": "A science teacher places five objects on a table. Which TWO objects will be attracted to a bar magnet? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Steel sewing needle"
          },
          {
            "id": "b",
            "text": "Solid copper penny"
          },
          {
            "id": "c",
            "text": "Iron fence nail"
          },
          {
            "id": "d",
            "text": "Wooden pencil"
          },
          {
            "id": "e",
            "text": "Plastic soda bottle cap"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Steel and iron are magnetic metals that contain iron atoms. Copper, wood, and plastic are non-magnetic materials."
      },
      {
        "id": "q8",
        "type": "multipart",
        "promptA": "Part A: A beaker containing 200 mL of water is placed on a hot plate and heated to 100°C. Vigorous bubbling occurs as steam rises. What physical state change is occurring?",
        "optionsA": [
          {
            "id": "a",
            "text": "Liquid changing into gas (boiling/vaporization)"
          },
          {
            "id": "b",
            "text": "Solid changing into liquid (melting)"
          },
          {
            "id": "c",
            "text": "Gas changing into liquid (condensation)"
          },
          {
            "id": "d",
            "text": "Liquid changing into solid (freezing)"
          }
        ],
        "answerA": "a",
        "promptB": "Part B: What is happening to the water particles during this state change?",
        "optionsB": [
          {
            "id": "a",
            "text": "Particles absorb thermal energy, move much faster, and break free to spread out as a gas."
          },
          {
            "id": "b",
            "text": "Particles lose all their energy and lock into fixed solid positions."
          },
          {
            "id": "c",
            "text": "Particles are destroyed by heat and disappear from existence."
          },
          {
            "id": "d",
            "text": "Particles become magnetic and cling tightly to the bottom of the beaker."
          }
        ],
        "answerB": "a",
        "explanation": "Adding thermal energy causes liquid water molecules to move rapidly and spread far apart, changing the state from liquid to gas at water’s boiling point (100°C)."
      },
      {
        "id": "q9",
        "type": "inlinechoice",
        "prompt": "Complete the sentences comparing metal containers using the drop-down menus:",
        "segments": [
          {
            "text": "An aluminum soda can placed near a bar magnet "
          },
          {
            "blankId": "b1",
            "options": [
              "will not be attracted to the magnet",
              "will stick firmly to the magnet",
              "will melt instantly"
            ],
            "answer": "will not be attracted to the magnet"
          },
          {
            "text": ", whereas a steel soup can "
          },
          {
            "blankId": "b2",
            "options": [
              "will be attracted because steel contains iron",
              "will float into the air",
              "will dissolve in water"
            ],
            "answer": "will be attracted because steel contains iron"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Aluminum is a non-magnetic metal, while steel is an alloy made with iron, making it magnetic."
      },
      {
        "id": "q10",
        "type": "dragsort",
        "prompt": "Classify each object into the correct category based on whether it is attracted to a magnet:",
        "categories": [
          {
            "id": "mag",
            "label": "Magnetic (Attracted to Magnet)"
          },
          {
            "id": "nonmag",
            "label": "Non-Magnetic (Not Attracted)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Steel paperclip",
            "category": "mag"
          },
          {
            "id": "i2",
            "label": "Wooden toothpick",
            "category": "nonmag"
          },
          {
            "id": "i3",
            "label": "Iron dock bolt",
            "category": "mag"
          },
          {
            "id": "i4",
            "label": "Plastic building block",
            "category": "nonmag"
          }
        ],
        "explanation": "Steel and iron are magnetic materials, while wood and plastic are non-magnetic."
      },
      {
        "id": "q11",
        "type": "single",
        "prompt": "Kelenna measures the temperature of bayou water at 28°C. He adds four ice cubes and stirs until the temperature drops to 12°C. What caused the temperature reading on the thermometer to drop?",
        "options": [
          {
            "id": "a",
            "text": "Thermal energy transferred from the warmer water into the melting ice."
          },
          {
            "id": "b",
            "text": "The thermometer ran out of grams."
          },
          {
            "id": "c",
            "text": "Coldness is a form of matter that entered the water molecules."
          },
          {
            "id": "d",
            "text": "The ice destroyed half the water particles in the cup."
          }
        ],
        "answer": "a",
        "explanation": "Heat (thermal energy) naturally flows from warmer substances to cooler substances. As heat moved into the ice to melt it, the water cooled down."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "An empty plastic 2-liter soda bottle with its cap tightly sealed floats high on top of Dickinson Bayou. Why does this bottle float so easily?",
        "options": [
          {
            "id": "a",
            "text": "The combined mass of the plastic bottle and trapped air has an overall density far less than water."
          },
          {
            "id": "b",
            "text": "Plastic is a magnetic material that is pushed upward by Earth’s poles."
          },
          {
            "id": "c",
            "text": "Only solid metal objects are allowed to sink in Texas waterways."
          },
          {
            "id": "d",
            "text": "The air inside the bottle has zero volume."
          }
        ],
        "answer": "a",
        "explanation": "The sealed bottle contains mostly air, making its average density much less than 1.0 g/cm³ (water density), causing it to float buoyant and high."
      }
    ]
  },
  {
    "id": "m1_2",
    "unitId": 1,
    "unitTitle": "Unit 1: Matter & Physical Properties",
    "gradingPeriod": "1st Nine Weeks (CBA 1)",
    "code": "TEKS 4.6B, 4.6C",
    "title": "Mixtures, Solutions & Conservation of Matter",
    "subtitle": "Separating Mixtures, Solutes, Solvents & Mass Conservation",
    "icon": "🧪",
    "accentColor": "#06b6d4",
    "iCanStatement": "I can demonstrate that matter is conserved when mixtures and solutions are formed or separated, and compare and contrast mixtures and special mixtures called solutions.",
    "localAnchor": "Testing Galveston Bay brine, sandbars, and oyster reef shell beds to recover pure water, salt crystals, and shell gravel after a high tide.",
    "engage": {
      "hookQuestion": "If you dissolve 15 grams of sea salt into 200 grams of pure water from Dickinson Bayou, why does the salt seem to disappear, and what will the final mass on the digital balance be?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "The salt particles break apart and spread evenly between water molecules, and the final mass is exactly 215 grams because matter is conserved.",
          "correct": true,
          "feedback": "Spot on! Dissolving breaks solute particles down until they are evenly distributed, and the Law of Conservation of Matter proves no mass is lost."
        },
        {
          "id": "b",
          "text": "The salt vanishes completely, leaving only 200 grams of liquid water.",
          "correct": false,
          "feedback": "Matter cannot vanish; the salt is still present in solution even when invisible to the naked eye."
        },
        {
          "id": "c",
          "text": "The mass increases to 250 grams because dissolving creates extra water.",
          "correct": false,
          "feedback": "Dissolving is a physical process; no new matter or mass is created."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            3.5,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Two Beakers",
            "text": "Beaker 1: Sand and water mixture; Beaker 2: Saltwater solution",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "Check out these two beakers of bayou water, Kelenna! In Beaker 1, we stir in bayou sand—it swirls around like a muddy snowglobe and settles right to the bottom. In Beaker 2, we stir in white sea salt—and SWOOSH, it looks like it completely disappeared! Did that salt magically vanish into thin air?",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            -2,
            2.5,
            4
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Particle Zoom",
            "text": "Salt crystal lattice dissolving into separate Na+ and Cl- ions among water molecules",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "Let's put on our super microscopic goggles! The salt didn't vanish at all! Its tiny building blocks broke apart into millions of invisible pieces and hid evenly between the water molecules. When ingredients spread out completely evenly like that, we call it a special kind of mixture: a Solution!",
          "sfx": "spark"
        },
        {
          "start": 22,
          "end": 33,
          "cameraPos": [
            2,
            2.8,
            4
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Funnel & Filter Paper",
            "text": "Mechanical filtration traps insoluble sand grains while letting dissolved salt pass",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "Now let's try to rescue our ingredients! For the sand mixture, we pour it through filter paper. The paper's microscopic pores trap the big sand grains while clear water drips through. Easy peasy! But when we pour the saltwater through, the salt particles are so tiny they slip right through the filter paper!",
          "sfx": "splash"
        },
        {
          "start": 33,
          "end": 45,
          "cameraPos": [
            0,
            4,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Evaporation Hot Plate",
            "text": "Water evaporates as steam, leaving behind solid salt crystals",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "So how do we catch the hidden salt? We turn on the heat! As the hot plate boils the water away into steam, the salt particles lock back together as shiny white crystals at the bottom. Not a single grain was lost—matter was protected and conserved the whole time!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Use the Mixture Separator Lab to combine iron filings, sand, salt, and water. Select the proper laboratory tools (magnet, sieve, filter funnel, hot plate) to separate each component and verify mass conservation.",
      "labPrompts": [
        "Weigh 10g iron filings, 15g sand, and 5g salt, then predict the total mass before and after mixing.",
        "Apply the bar magnet to separate the iron filings and confirm mass recovery on the digital scale.",
        "Filter the sand from the saltwater and heat the remaining filtrate to evaporate water and recover the salt crystals."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            3,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Mixture Definition",
            "text": "Two or more substances physically combined; each retains its original physical properties",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "First principles time, Kelenna! A Mixture is when two or more ingredients hang out together in the same bowl without chemically changing who they are. Think of trail mix with M&Ms, pretzels, and raisins: you can easily pick them apart because each piece keeps its own physical properties!",
          "sfx": "chime"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            -2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Special Mixtures: Solutions",
            "text": "A solution forms when a solute dissolves evenly throughout a solvent",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "A Solution is a sneaky, special type of mixture where one substance dissolves and spreads out completely evenly in another. Like stirring lemonade powder into water! It looks completely clear and smooth, and you can't separate it with a simple kitchen strainer.",
          "sfx": "spark"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Separation Tools",
            "text": "Magnets, filters, sieves, and water buoyancy separate mixtures based on physical properties",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "How do science detectives separate mixtures? We use physical properties as our secret tools! Use a magnet to pull out iron nails, use a mesh sieve to catch big gravel, use filter paper to trap fine sand, and use water so floating bark separates from sinking stones!",
          "sfx": "whoosh"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            4,
            5.5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Law of Conservation of Matter",
            "text": "Matter is neither created nor destroyed during physical changes; total mass is constant",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Here is the Golden Rule of the Universe: The Law of Conservation of Matter! Matter cannot be magically created or destroyed. If you mix 20 grams of sugar into 100 grams of water, the final sweet water weighs EXACTLY 120 grams! Every single building block is still there!",
          "sfx": "chime"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            3,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Evaporation & Recovery",
            "text": "Heating a solution drives liquid into vapor, recovering 100% of solid solute crystals",
            "pos": [
              0,
              1.3,
              0
            ]
          },
          "narration": "When water in a saltwater solution gets warm, it evaporates into invisible water vapor gas and floats up into the sky. But the solid salt is left behind at the bottom of the dish! Every single gram of salt is recovered, proving that dissolving never destroys matter!",
          "sfx": "splash"
        }
      ],
      "vocabulary": [
        {
          "id": "m1_2_v0",
          "term": "Mixture",
          "simpleMeaning": "A combination of two or more substances that are mixed together but do NOT turn into something new. Each ingredient keeps its own physical properties and can be separated!",
          "definition": "A combination of two or more substances where each substance retains its individual physical properties and can be physically separated.",
          "example": "A bowl of sand and seashells from Galveston beach, or a fruit salad with melon and grapes.",
          "narration": "Mixture! Imagine dumping pretzels, chocolate chips, and popcorn into a party bowl. That is a mixture! You can pick out every single pretzel because each ingredient keeps its own flavor, shape, and properties."
        },
        {
          "id": "m1_2_v1",
          "term": "Solution",
          "simpleMeaning": "A special, smooth mixture where one substance breaks down into tiny invisible pieces and spreads out completely evenly in a liquid.",
          "definition": "A special type of mixture in which one substance (solute) dissolves completely and evenly into another substance (solvent).",
          "example": "Saltwater from Galveston Bay, or hot chocolate powder stirred smoothly into warm milk.",
          "narration": "Solution! A solution is like the ultimate hide-and-seek game! When you stir drink mix into water, the powder breaks down so small that it hides between the water molecules, creating one smooth, clear liquid from top to bottom."
        },
        {
          "id": "m1_2_v2",
          "term": "Dissolve",
          "simpleMeaning": "To break apart into microscopic pieces that spread out evenly in a liquid until you can no longer see them with your eyes.",
          "definition": "The process where a solid solute breaks down into individual molecules or ions and disperses uniformly throughout a liquid solvent.",
          "example": "Sugar dissolving into iced tea at lunch until the tea tastes sweet all the way through.",
          "narration": "Dissolve! When you drop sugar into lemonade, the sugar doesn’t disappear into another dimension! The water molecules gently pull the sugar building blocks apart until they are floating invisibly all throughout the glass."
        },
        {
          "id": "m1_2_v3",
          "term": "Conservation of Matter",
          "simpleMeaning": "The fundamental law of nature: matter cannot be created out of nothing, and matter cannot be destroyed into nothing. The total mass stays the same!",
          "definition": "The scientific principle stating that matter is neither created nor destroyed during physical or chemical changes; total mass before equals total mass after.",
          "example": "Mixing 10g of salt with 100g of water creates a solution with a mass of exactly 110g.",
          "narration": "Conservation of Matter! Think of your LEGO collection. If you take apart a LEGO castle and build a spaceship, you still have the exact same number of bricks! Nature works the exact same way: you can never lose a single particle of matter."
        },
        {
          "id": "m1_2_v4",
          "term": "Evaporation",
          "simpleMeaning": "The process where a liquid warms up and turns into an invisible gas (vapor) that floats into the air, leaving any dissolved solids behind.",
          "definition": "The physical change of state from liquid to gas at temperatures below the boiling point, occurring at the surface of a liquid.",
          "example": "Puddles on the Dunbar Middle School playground drying up on a sunny afternoon.",
          "narration": "Evaporation! Ever wonder where puddles go after a rainstorm? Sun energy warms up the water particles on top, giving them wings to float into the sky as invisible water vapor. If there was salt in the puddle, the dry salt stays behind!"
        }
      ]
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "When Kelenna stirs 15 grams of sea salt into 200 grams of pure water, what will the digital balance show?",
          "options": [
            "Exactly 215 grams because all matter is conserved",
            "Only 200 grams because the salt dissolved into nothing",
            "250 grams because water multiplies the salt",
            "185 grams because salt destroys liquid water"
          ],
          "answer": 0,
          "hint": "The Law of Conservation of Matter says total mass before equals total mass after!"
        },
        {
          "q": "Why can sand be separated from water with paper filter, but dissolved salt cannot?",
          "options": [
            "Sand particles are too large to fit through the paper pores, while dissolved salt particles are microscopic and slip right through.",
            "Sand is magnetic, while salt is repelled by paper.",
            "Salt eats holes through the filter paper.",
            "Paper filters only work on green liquids."
          ],
          "answer": 0,
          "hint": "Dissolved salt breaks down into tiny molecules that are smaller than the filter pores!"
        },
        {
          "q": "How can Kelenna recover the dry salt crystals from a clear cup of saltwater?",
          "options": [
            "Gently heat the solution until the water evaporates into vapor, leaving dry salt behind.",
            "Wave a strong bar magnet over the water.",
            "Pour the saltwater through a wire kitchen strainer.",
            "Put the saltwater in a dark room until the salt freezes."
          ],
          "answer": 0,
          "hint": "When water evaporates as steam, dissolved solids stay in the dish!"
        }
      ],
      "explore": [
        {
          "q": "If Kelenna is given a mystery beaker containing iron filings, sand, and table salt, which tool should he use FIRST to easily remove one ingredient?",
          "options": [
            "A strong magnet to pull out the iron filings",
            "A hot plate to boil all three into gas",
            "A wooden spoon to mash them together",
            "A flashlight to shine through the beaker"
          ],
          "answer": 0,
          "hint": "Iron is magnetic, while sand and salt are not!"
        },
        {
          "q": "A student mixes 10 grams of lemon drink powder with 150 grams of cold water. What is the total mass of the resulting lemonade?",
          "options": [
            "160 grams",
            "150 grams",
            "140 grams",
            "10 grams"
          ],
          "answer": 0,
          "hint": "Add the two masses together: 10g + 150g = 160g!"
        },
        {
          "q": "Which of the following is an example of a special mixture called a solution?",
          "options": [
            "Sugar completely dissolved in warm tea",
            "Sand and gravel mixed in a bucket",
            "Iron bolts and wooden blocks in a toy chest",
            "Oil floating on top of vinegar"
          ],
          "answer": 0,
          "hint": "In a solution, the solute dissolves completely and spreads evenly throughout!"
        }
      ],
      "explain": [
        {
          "q": "What is the main difference between a regular mixture (like trail mix) and a solution (like saltwater)?",
          "options": [
            "In a solution, one substance dissolves and spreads completely evenly throughout another.",
            "Regular mixtures can never be separated by any tool.",
            "Solutions always contain metal screws and iron nails.",
            "Regular mixtures only exist in outer space."
          ],
          "answer": 0,
          "hint": "Solutions are uniform throughout because the solute dissolves completely!"
        },
        {
          "q": "What does the Law of Conservation of Matter prove happens during any physical change?",
          "options": [
            "No matter can be created or destroyed; total mass remains constant.",
            "Matter disappears whenever things dissolve.",
            "Heating water creates brand new hydrogen and oxygen from nothing.",
            "Solids always lose half their mass when placed in water."
          ],
          "answer": 0,
          "hint": "The total mass of the ingredients stays exactly the same!"
        },
        {
          "q": "When liquid water evaporates from a warm saltwater marsh along Galveston Bay, what happens to the water particles?",
          "options": [
            "They gain thermal energy, change into water vapor gas, and rise into the air.",
            "They are destroyed and cease to exist.",
            "They turn into solid grains of sand.",
            "They become magnetic and stick to oyster shells."
          ],
          "answer": 0,
          "hint": "Evaporation changes liquid into gas particles that drift into the air!"
        }
      ],
      "vocab": [
        {
          "q": "Which word describes a combination of two or more substances where each keeps its original physical properties?",
          "options": [
            "Mixture",
            "Atom",
            "Electron",
            "Gravity"
          ],
          "answer": 0,
          "hint": "Each ingredient in this combination can be separated physically!"
        },
        {
          "q": "When sugar breaks down into microscopic particles evenly dispersed in warm water, we say the sugar has:",
          "options": [
            "Dissolved",
            "Frozen",
            "Condensed",
            "Magnetized"
          ],
          "answer": 0,
          "hint": "The solute breaks down and spreads evenly in the solvent!"
        },
        {
          "q": "The process where a liquid slowly changes into a gas at its surface is called:",
          "options": [
            "Evaporation",
            "Freezing",
            "Friction",
            "Precipitation"
          ],
          "answer": 0,
          "hint": "This is how puddles dry up in the sunshine!"
        }
      ]
    },
    "elaborate": {
      "title": "Galveston Bay Desalination & Clean Water Emergency Rig",
      "scenario": "Following a Gulf hurricane, Dunbar Middle School emergency responders must extract clean drinking water and pure sea salt from salty, sediment-laden Galveston Bay water.",
      "goalDescription": "Construct a multi-stage separation rig (coarse filtration, fine filtration, and thermal distillation) that recovers drinkable fresh water and dry salt crystals while verifying mass conservation.",
      "criteria": [
        "Stage 1: Pass brackish water through gravel and sand filters to remove suspended sediment.",
        "Stage 2: Evaporate water using a solar condenser to collect fresh water vapor.",
        "Stage 3: Measure mass of recovered dry salt and recovered water to prove conservation of matter."
      ],
      "successFeedback": "Brilliant engineering! You provided safe drinking water and recovered pure salt, proving that matter is 100% conserved through every physical separation step!"
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A student dissolves 20 grams of sugar into 180 grams of warm water in a closed glass jar. The student places the jar on a digital scale. What will the digital scale read?",
        "options": [
          {
            "id": "a",
            "text": "180 grams because sugar vanishes when dissolved."
          },
          {
            "id": "b",
            "text": "200 grams because the total mass of matter is conserved."
          },
          {
            "id": "c",
            "text": "160 grams because dissolving consumes mass."
          },
          {
            "id": "d",
            "text": "220 grams because sugar expands in water."
          }
        ],
        "answer": "b",
        "explanation": "The Law of Conservation of Matter states that matter is neither created nor destroyed during physical changes. 20g sugar + 180g water = exactly 200g solution."
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "A science lab group has a dry mixture of iron filings, plastic beads, and table salt. Which TWO tools can be used to separate these three substances from one another? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "A bar magnet to extract the magnetic iron filings"
          },
          {
            "id": "b",
            "text": "Water to float the plastic beads and dissolve the salt"
          },
          {
            "id": "c",
            "text": "A thermometer to measure the air temperature"
          },
          {
            "id": "d",
            "text": "A microscope to burn the mixture"
          },
          {
            "id": "e",
            "text": "A wooden ruler to scrape off the color"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "A magnet extracts the magnetic iron. Adding water allows plastic beads to float (density separation) while salt dissolves (can be recovered later by evaporation)."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: A student is given a mixture of water, sand, and dissolved salt. Which procedure will successfully separate ALL THREE components into pure substances?",
        "optionsA": [
          {
            "id": "a",
            "text": "Pour through filter paper to trap sand, then heat the remaining liquid to evaporate water and collect salt crystals."
          },
          {
            "id": "b",
            "text": "Use a strong bar magnet to attract the salt and sand."
          },
          {
            "id": "c",
            "text": "Freeze the mixture until it turns into solid granite."
          },
          {
            "id": "d",
            "text": "Stir vigorously until the sand dissolves completely into gas."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Which statement explains why this procedure works?",
        "optionsB": [
          {
            "id": "a",
            "text": "Sand grains are insoluble and trapped by filter pores, while dissolved salt passes through and is left behind when water evaporates."
          },
          {
            "id": "b",
            "text": "Salt is more magnetic than sand and water."
          },
          {
            "id": "c",
            "text": "Water cannot change state when mixed with sand."
          },
          {
            "id": "d",
            "text": "Filter paper destroys salt molecules."
          }
        ],
        "answerB": "a",
        "explanation": "Filter paper traps insoluble sand particles. Evaporation removes liquid water as vapor, leaving solid dissolved salt crystals behind."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the comparison between mixtures and solutions using the drop-down menus:",
        "segments": [
          {
            "text": "A snack bowl of pretzels, peanuts, and raisins is a "
          },
          {
            "blankId": "b1",
            "options": [
              "mixture where ingredients keep their physical properties",
              "solution that dissolved completely",
              "chemical reaction producing new gases"
            ],
            "answer": "mixture where ingredients keep their physical properties"
          },
          {
            "text": ", while sugar stirred into hot tea is a "
          },
          {
            "blankId": "b2",
            "options": [
              "solution where the solute is evenly distributed",
              "solid mineral that cannot be separated",
              "gas that floats away immediately"
            ],
            "answer": "solution where the solute is evenly distributed"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Trail mix is a heterogeneous mixture where items retain their identities. Sweet tea is a solution (homogeneous mixture) where sugar dissolves uniformly."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Classify each example into the correct category:",
        "categories": [
          {
            "id": "mix",
            "label": "Regular Mixture (Not a Solution)"
          },
          {
            "id": "sol",
            "label": "Solution (Special Dissolved Mixture)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Sand and seashells on Galveston beach",
            "category": "mix"
          },
          {
            "id": "i2",
            "label": "Sea salt dissolved in clear water",
            "category": "sol"
          },
          {
            "id": "i3",
            "label": "Iron bolts mixed with gravel stones",
            "category": "mix"
          },
          {
            "id": "i4",
            "label": "Lemonade drink powder dissolved in water",
            "category": "sol"
          }
        ],
        "explanation": "Substances where one material dissolves evenly in a liquid are solutions. Combinations where separate solid parts are clearly visible are regular mixtures."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "A class evaporates 500 mL of ocean water from Galveston Bay in a shallow pan under the sun. After three days, only white crusty crystals remain in the pan. What are these crystals?",
        "options": [
          {
            "id": "a",
            "text": "Salt crystals that were dissolved in the water and left behind when water evaporated."
          },
          {
            "id": "b",
            "text": "New matter created by sunlight hitting the pan."
          },
          {
            "id": "c",
            "text": "Frozen ice cubes that formed during the heat of the day."
          },
          {
            "id": "d",
            "text": "Melted glass from the beaker."
          }
        ],
        "answer": "a",
        "explanation": "Liquid water evaporates into the atmosphere as water vapor gas, leaving behind solid mineral salts that were dissolved in the bay water."
      },
      {
        "id": "q7",
        "type": "multiselect",
        "prompt": "Which TWO statements are TRUE regarding the physical properties of substances in a mixture? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Iron filings retain their magnetic attraction even when mixed with sand."
          },
          {
            "id": "b",
            "text": "Water retains its ability to evaporate even when salt is dissolved in it."
          },
          {
            "id": "c",
            "text": "Sand turns into liquid water when stirred in a beaker."
          },
          {
            "id": "d",
            "text": "Mixing salt and water permanently destroys all salt mass."
          },
          {
            "id": "e",
            "text": "All mixtures can only be separated using fire."
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "In physical mixtures and solutions, substances maintain their core physical properties: iron remains magnetic, and water retains its ability to evaporate."
      },
      {
        "id": "q8",
        "type": "multipart",
        "promptA": "Part A: An effervescent antacid tablet with a mass of 8 grams is dropped into 100 grams of water in a tightly sealed flask. Vigorous bubbling occurs. What is the total mass of the sealed flask contents after the bubbling stops?",
        "optionsA": [
          {
            "id": "a",
            "text": "108 grams"
          },
          {
            "id": "b",
            "text": "100 grams"
          },
          {
            "id": "c",
            "text": "92 grams"
          },
          {
            "id": "d",
            "text": "116 grams"
          }
        ],
        "answerA": "a",
        "promptB": "Part B: What would happen to the measured mass if the same experiment were performed in an OPEN cup without a lid?",
        "optionsB": [
          {
            "id": "a",
            "text": "The measured mass would be less than 108 grams because gas bubbles escape into the surrounding air."
          },
          {
            "id": "b",
            "text": "The measured mass would increase to 120 grams as air enters."
          },
          {
            "id": "c",
            "text": "The mass would remain exactly 108 grams because gas has no mass."
          },
          {
            "id": "d",
            "text": "The liquid would completely disappear."
          }
        ],
        "answerB": "a",
        "explanation": "In a sealed system, gas cannot escape, so 8g tablet + 100g water = 108g. In an open cup, gas escapes into the room, reducing the remaining mass on the scale."
      },
      {
        "id": "q9",
        "type": "inlinechoice",
        "prompt": "Complete the laboratory explanation regarding filtration using the drop-down menus:",
        "segments": [
          {
            "text": "When pouring muddy saltwater through filter paper, the paper "
          },
          {
            "blankId": "b1",
            "options": [
              "traps insoluble mud particles",
              "traps all the dissolved salt",
              "destroys the liquid water"
            ],
            "answer": "traps insoluble mud particles"
          },
          {
            "text": ", while the dissolved salt "
          },
          {
            "blankId": "b2",
            "options": [
              "passes through the filter paper with the water",
              "turns into solid rock immediately",
              "evaporates instantly into smoke"
            ],
            "answer": "passes through the filter paper with the water"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Filter paper has pores that trap larger insoluble mud particles, but dissolved salt ions are microscopic and pass through with the water."
      },
      {
        "id": "q10",
        "type": "dragsort",
        "prompt": "Match each mixture component with the scientific tool best suited to separate it:",
        "categories": [
          {
            "id": "mag",
            "label": "Separated by Bar Magnet"
          },
          {
            "id": "filter",
            "label": "Separated by Filter Funnel"
          },
          {
            "id": "evap",
            "label": "Separated by Evaporation / Hot Plate"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Iron filings from dry sand",
            "category": "mag"
          },
          {
            "id": "i2",
            "label": "Coarse sand grains from water",
            "category": "filter"
          },
          {
            "id": "i3",
            "label": "Dissolved table salt from clear water",
            "category": "evap"
          },
          {
            "id": "i4",
            "label": "Steel staples from plastic confetti",
            "category": "mag"
          }
        ],
        "explanation": "Magnets pull magnetic metals like iron and steel. Filter funnels trap insoluble sand. Evaporation recovers dissolved solutes like salt."
      },
      {
        "id": "q11",
        "type": "single",
        "prompt": "Kelenna stirs red drink powder into water until the liquid is clear and bright red throughout. He leaves the cup on the counter for two days. No powder settles to the bottom. What did Kelenna create?",
        "options": [
          {
            "id": "a",
            "text": "A solution, because the solute dissolved completely and remained evenly distributed."
          },
          {
            "id": "b",
            "text": "A solid mineral that cannot be melted."
          },
          {
            "id": "c",
            "text": "An insoluble mixture that settled out."
          },
          {
            "id": "d",
            "text": "A magnetic liquid."
          }
        ],
        "answer": "a",
        "explanation": "In a true solution, the solute remains dissolved and uniformly distributed without settling to the bottom over time."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A science student weighs 50 grams of ice and places it into 150 grams of warm bayou water in an insulated thermos. After all the ice melts completely, what is the total mass of water in the thermos?",
        "options": [
          {
            "id": "a",
            "text": "200 grams, because melting is a physical change where mass is conserved."
          },
          {
            "id": "b",
            "text": "150 grams, because the ice melted away."
          },
          {
            "id": "c",
            "text": "100 grams, because cold water destroys warm water."
          },
          {
            "id": "d",
            "text": "250 grams, because ice doubles its mass when turning into liquid."
          }
        ],
        "answer": "a",
        "explanation": "Physical changes like melting conserve total matter: 50g ice + 150g liquid water = exactly 200g of liquid water."
      }
    ]
  },
  {
    "id": "m2_1",
    "unitId": 2,
    "unitTitle": "Unit 2: Force, Motion & Energy",
    "gradingPeriod": "2nd Nine Weeks (CBA 2)",
    "code": "TEKS 4.7A",
    "title": "Contact & Non-Contact Forces",
    "subtitle": "Friction, Gravity, Magnetism & Net Force on Motion",
    "icon": "⚡",
    "accentColor": "#8b5cf6",
    "iCanStatement": "I can plan and conduct investigations to demonstrate that forces, including contact forces (friction, normal) and non-contact forces (gravity, magnetism), cause changes in an object’s motion.",
    "localAnchor": "Dickinson Bayou public boat ramp: Launching Dunbar Gator fishing boats down slick wet ramps versus dry textured grooved concrete ramps.",
    "engage": {
      "hookQuestion": "Why can a boat trailer slip backwards down a mossy boat ramp into Dickinson Bayou, even when brakes are locked, while dry grooved concrete holds it safely?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Wet green algae lubricates the contact surface, reducing friction so downward gravitational force overcomes tire grip.",
          "correct": true,
          "feedback": "Exactly right! Gravitational force pulls downward continuously; when friction is reduced by algae lubrication, unbalanced forces cause sliding motion."
        },
        {
          "id": "b",
          "text": "Bayou water contains magnetic minerals that pull the rubber tires underwater.",
          "correct": false,
          "feedback": "Rubber tires are non-magnetic and bayou water does not produce magnetic attractive forces."
        },
        {
          "id": "c",
          "text": "The mass of the boat trailer doubles automatically whenever it gets close to water.",
          "correct": false,
          "feedback": "Mass is conserved and does not change based on proximity to water."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            4,
            9
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Dickinson Boat Ramp",
            "text": "20° inclined concrete ramp leading into Dickinson Bayou waterway",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Picture this, Kelenna! We're at the Dickinson Bayou boat ramp. A heavy fishing boat trailer sits parked on a steep slope. If that ramp is covered in slick green algae, the trailer slides backwards into the water even with its brakes locked! But on dry, grooved concrete, it stays parked safely. Why does the surface matter so much?",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            -3,
            3,
            5
          ],
          "lookAt": [
            -1,
            1,
            0
          ],
          "callout": {
            "title": "Gravity Pulls Downward",
            "text": "Non-contact gravitational force pulling boat mass toward Earth center (9.8 N/kg)",
            "pos": [
              -1,
              1.2,
              0
            ]
          },
          "narration": "First, Earth is constantly reaching out with an invisible hand called Gravity! It pulls down on every single gram of the boat and trailer, tugging it toward the center of the Earth and down the slope. Gravity doesn't need to touch the trailer—it's an invisible non-contact force!",
          "sfx": "whoosh"
        },
        {
          "start": 22,
          "end": 33,
          "cameraPos": [
            2.5,
            2,
            4
          ],
          "lookAt": [
            0.5,
            0.5,
            0
          ],
          "callout": {
            "title": "Friction at the Contact Point",
            "text": "Microscopic surface ridges interlocking between rubber tire tread and concrete",
            "pos": [
              0.5,
              0.8,
              0
            ]
          },
          "narration": "Now look where rubber meets the road! Microscopic bumps on the tire grab onto microscopic bumps on the concrete like hands gripping a rock climbing wall. That rubbing contact force is Friction! Friction fights against sliding. On slick wet algae, the bumps can't grip, friction drops to almost zero, and whoosh—down it slides!",
          "sfx": "spark"
        },
        {
          "start": 33,
          "end": 45,
          "cameraPos": [
            0,
            5,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Force Equilibrium",
            "text": "Balanced opposing forces produce zero net acceleration: F_gravity = F_friction",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "When the grip of friction perfectly matches the downward pull of gravity, the forces are in a balanced tug-of-war! Neither side wins, so the trailer rests completely motionless at 0 miles per hour. But make one force bigger, and motion changes immediately!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Adjust ramp incline angle, select tire surface materials (slick rubber, grooved tread, steel rim), apply water/algae lubricants, and test magnetic brake assists to observe velocity and acceleration.",
      "labPrompts": [
        "Set incline to 15° with dry grooved concrete and record whether the boat trailer remains stationary (balanced forces).",
        "Toggle the surface lubricant to \"Algae Slime\" and observe how reduced friction causes downward acceleration.",
        "Engage the magnetic safety clamp and note how non-contact magnetic force restores balance without mechanical touching."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            3,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "What is a Force?",
            "text": "A push or pull acting upon an object, measured in Newtons (N)",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "What is a Force from first principles? Simply put: a force is a Push or a Pull! Nothing in the entire universe can start moving, stop moving, speed up, or turn a corner unless an unbalanced push or pull acts on it. In 4th grade science, we measure forces in units called Newtons!",
          "sfx": "chime"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            -2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Contact Force: Friction",
            "text": "Resistance force created when two physical surfaces slide or press against each other",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "Contact forces require physical touch! Friction is the rubbing friend that slows down motion whenever two surfaces slide past each other. Think of your bicycle brake pads squeezing against your bike wheel—they rub hard to create friction and bring you to a safe, screeching halt!",
          "sfx": "spark"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Non-Contact Force: Gravity",
            "text": "Universal attractive force pulling masses toward one another without physical contact",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "Non-contact forces work like superpower forcefields without touching! Gravity is the invisible downward pull that all massive objects have. Earth's gravity pulls you, your basketball, and Dickinson Bayou water down toward the center of our planet!",
          "sfx": "whoosh"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            4,
            5.5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Non-Contact Force: Magnetism",
            "text": "Magnetic fields exert attractive or repulsive forces across empty space",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Magnetism is another awesome non-contact force! A magnet can push another magnet away or pull iron paperclips across an empty desk without ever having to touch them first. Its magnetic field reaches right through air, paper, and water!",
          "sfx": "magnet"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            3,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Balanced vs Unbalanced Forces",
            "text": "Balanced forces: Net force = 0 (constant motion/rest). Unbalanced forces: Net force > 0 (acceleration)",
            "pos": [
              0,
              1.3,
              0
            ]
          },
          "narration": "Think of a playground tug-of-war! If two equal teams pull with the exact same strength in opposite directions, the rope doesn't budge—forces are BALANCED. But if one side pulls harder, the forces become UNBALANCED, and the rope accelerates toward the winning team!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m2_1_v0",
          "term": "Force",
          "simpleMeaning": "A push or a pull on an object! Forces can make objects start moving, speed up, slow down, stop, or change direction.",
          "definition": "A push or pull exerted on an object that can cause a change in its motion, speed, or direction, measured in Newtons (N).",
          "example": "Pushing a grocery cart down the aisle, or pulling open your locker door at Dunbar Middle School.",
          "narration": "Force! Every time you kick a soccer ball, pull your backpack strap, or press an elevator button, you are applying a force! Forces are simply pushes and pulls that change how things move."
        },
        {
          "id": "m2_1_v1",
          "term": "Gravity",
          "simpleMeaning": "An invisible non-contact pull that draws all objects toward each other. On Earth, gravity pulls everything downward toward the center of the planet!",
          "definition": "A universal non-contact force of attraction between all objects with mass; Earth’s gravity pulls objects downward toward its center.",
          "example": "A dropped pencil falling straight to the classroom floor, or rain falling from storm clouds into Dickinson Bayou.",
          "narration": "Gravity! Why don’t people on the other side of Earth float off into deep space? Because Earth has massive gravity that acts like an invisible hug, pulling you, the oceans, and the atmosphere firmly toward the ground!"
        },
        {
          "id": "m2_1_v2",
          "term": "Friction",
          "simpleMeaning": "A contact rubbing force that happens when two surfaces touch and slide past each other. Friction always acts in the opposite direction of motion, slowing things down!",
          "definition": "A contact force that opposes the relative motion of two surfaces sliding or rolling against each other.",
          "example": "The rubber brake pads on your bicycle rubbing against the wheel rim to bring you to a stop.",
          "narration": "Friction! Rub your hands together fast—feel that warmth and resistance? That is friction! Friction is the rubbing force between two touching surfaces. Rough surfaces create lots of friction; slick icy surfaces create very little!"
        },
        {
          "id": "m2_1_v3",
          "term": "Normal Force",
          "simpleMeaning": "The supporting push that a solid surface (like a floor, desk, or boat ramp) pushes back with when an object presses against it, keeping things from falling through!",
          "definition": "The perpendicular contact support force exerted by a surface on an object resting on or pressing against it.",
          "example": "Your desk pushing up against your science textbook so the book doesn’t crash to the floor.",
          "narration": "Normal Force! When you sit on a chair, why don’t you fall right through the plastic to the center of the Earth? Because the chair pushes straight back up on you with a supporting normal force that balances gravity!"
        },
        {
          "id": "m2_1_v4",
          "term": "Motion",
          "simpleMeaning": "A change in an object’s position over time compared to a starting point or reference point.",
          "definition": "A change in the position of an object over time relative to a frame of reference or stationary point.",
          "example": "A Dunbar Gator school bus traveling down FM 517 toward Dickinson High School.",
          "narration": "Motion! Whenever anything changes position—whether it’s a sprinting cheetah, a rolling bowling ball, or a soaring rocket—it is in motion! Only an unbalanced force can start or stop that motion."
        }
      ]
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Why does a boat trailer slide down a boat ramp covered in slimy green algae even when its brakes are locked?",
          "options": [
            "The slippery algae drastically reduces friction between the rubber tires and the concrete ramp.",
            "Gravity turns off when plants touch water.",
            "Algae contains magnets that pull the trailer down.",
            "Water increases the mass of the trailer by five times."
          ],
          "answer": 0,
          "hint": "Slick algae eliminates friction, so gravity wins the tug-of-war!"
        },
        {
          "q": "What invisible non-contact force pulls the boat trailer down the ramp toward the bayou?",
          "options": [
            "Gravity",
            "Friction",
            "Normal force",
            "Air resistance"
          ],
          "answer": 0,
          "hint": "This force pulls all objects downward toward the center of Earth without touching them!"
        },
        {
          "q": "When a boat trailer is parked safely on dry grooved concrete and does NOT move, what is true about the forces acting on it?",
          "options": [
            "The forces are balanced in equilibrium, resulting in zero net motion.",
            "There are zero forces acting on the trailer anywhere in the universe.",
            "Gravity has stopped pulling on the trailer.",
            "Friction has pushed the trailer into the sky."
          ],
          "answer": 0,
          "hint": "When forces are equal and opposite, they are balanced and the object stays at rest!"
        }
      ],
      "explore": [
        {
          "q": "If Kelenna rolls the same toy truck with the exact same push across carpet, tile, sandpaper, and smooth plastic, on which surface will it travel the SHORTEST distance?",
          "options": [
            "Sandpaper, because its rough texture creates the most friction to slow the truck down",
            "Tile, because tile has no mass",
            "Smooth plastic, because plastic repels wheels",
            "Carpet, because carpet creates zero friction"
          ],
          "answer": 0,
          "hint": "Rough surfaces have high friction that rapidly slows rolling objects!"
        },
        {
          "q": "What type of force is friction classified as in science?",
          "options": [
            "A contact force that requires physical contact between surfaces",
            "A non-contact force that works from miles away",
            "A magnetic force produced only by iron magnets",
            "A chemical reaction that destroys tires"
          ],
          "answer": 0,
          "hint": "Friction only happens when two surfaces actually touch and rub together!"
        },
        {
          "q": "When Kelenna drops a heavy textbook and a light tennis ball from the same height in the classroom at the same time, why do they both fall toward the floor?",
          "options": [
            "Earth’s gravitational force pulls both objects downward toward the ground.",
            "Air pushes down on them with high speed.",
            "The floor is magnetic and attracts tennis balls.",
            "Objects fall because they want to rest."
          ],
          "answer": 0,
          "hint": "Gravity is the non-contact pull that accelerates falling objects downward!"
        }
      ],
      "explain": [
        {
          "q": "What is required to make a resting soccer ball start rolling across the Dunbar football field?",
          "options": [
            "An unbalanced force, such as a kick from Kelenna’s foot",
            "Balanced forces that cancel each other out",
            "Zero contact forces",
            "A change in the color of the grass"
          ],
          "answer": 0,
          "hint": "An object at rest stays at rest until an unbalanced force pushes or pulls it!"
        },
        {
          "q": "Which of the following is an example of a non-contact force?",
          "options": [
            "A bar magnet pulling a steel paperclip across a table without touching it",
            "Bicycle brake pads rubbing against a spinning tire",
            "Kicking a soccer ball into the net",
            "Pushing a heavy desk across the classroom"
          ],
          "answer": 0,
          "hint": "Non-contact forces act across empty space without physical contact!"
        },
        {
          "q": "When Kelenna sits quietly in a chair, gravity pulls downward with 350 Newtons. Why doesn’t he fall through the chair to the floor?",
          "options": [
            "The chair exerts an equal upward normal force of 350 Newtons to balance gravity.",
            "Gravity stops working when a person is sitting down.",
            "Air pressure lifts him two feet above the seat.",
            "His mass turns to zero when seated."
          ],
          "answer": 0,
          "hint": "The chair pushes straight back up with a supporting normal force!"
        }
      ],
      "vocab": [
        {
          "q": "What is the definition of a \"force\" in 4th grade science?",
          "options": [
            "A push or a pull that can change an object’s motion",
            "The amount of liquid in a graduated cylinder",
            "How hot or cold something is in degrees Celsius",
            "A state of matter that fills containers"
          ],
          "answer": 0,
          "hint": "A force is simply a push or a pull!"
        },
        {
          "q": "Which force always opposes motion whenever two touching surfaces slide past one another?",
          "options": [
            "Friction",
            "Gravity",
            "Magnetism",
            "Volume"
          ],
          "answer": 0,
          "hint": "This contact rubbing force slows moving things down!"
        },
        {
          "q": "The change in an object’s position over time relative to a starting reference point is called:",
          "options": [
            "Motion",
            "Mass",
            "Density",
            "Solution"
          ],
          "answer": 0,
          "hint": "When something moves from point A to point B, it is in motion!"
        }
      ]
    },
    "elaborate": {
      "title": "Dunbar Gators Boat Ramp High-Traction Surface Design",
      "scenario": "The Dickinson Parks Board has commissioned the Dunbar Middle School Young Engineers Society to design a new high-traction launch ramp surface along Dickinson Bayou to prevent vehicles from slipping during boat recovery.",
      "goalDescription": "Engineer a textured composite surface combining concrete chevron grooves and recycled rubber micro-ribs that provides sufficient friction to hold a 2,500 kg boat trailer motionless on a 25° incline even when coated in wet river algae.",
      "criteria": [
        "Criterion 1: Surface texture must generate at least 450 N of frictional contact force under wet conditions.",
        "Criterion 2: Ramp must feature an embedded electromagnetic safety latch (non-contact force) capable of locking steel trailer axles during emergencies.",
        "Criterion 3: Collect force telemetry data demonstrating balanced forces (net force = 0 N) on the trailer at 25° tilt."
      ],
      "successFeedback": "Mission accomplished! Your innovative grooved friction texture and electromagnetic safety latch provided total stability, keeping Dickinson boaters safe from trailer slips!"
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A student rolls a toy car across a smooth tile floor and then rolls the exact same car with the exact same push across a thick shag carpet. The car travels 6 meters on the tile floor, but only 1.5 meters on the carpet. Why did the car stop sooner on the carpet?",
        "options": [
          {
            "id": "a",
            "text": "The carpet exerted a greater frictional contact force against the wheels than the smooth tile floor."
          },
          {
            "id": "b",
            "text": "Gravity was twice as strong on the carpet as it was on the tile floor."
          },
          {
            "id": "c",
            "text": "The car lost all its mass when it touched the carpet fibers."
          },
          {
            "id": "d",
            "text": "The tile floor is a non-contact magnetic surface."
          }
        ],
        "answer": "a",
        "explanation": "Rougher surfaces like thick carpet create greater friction against rolling wheels than smooth tile, causing moving objects to slow down and stop over a shorter distance."
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "Scientists classify forces as either contact forces (requiring touch) or non-contact forces (acting at a distance). Which TWO forces listed below are NON-CONTACT forces? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Gravitational force pulling a dropped apple to the ground"
          },
          {
            "id": "b",
            "text": "Frictional force slowing down a sliding sled"
          },
          {
            "id": "c",
            "text": "Magnetic force pulling a paperclip toward a bar magnet"
          },
          {
            "id": "d",
            "text": "Normal force from a table supporting a computer"
          },
          {
            "id": "e",
            "text": "Tension force in a pulled tug-of-war rope"
          }
        ],
        "answers": [
          "a",
          "c"
        ],
        "explanation": "Gravity and magnetism are non-contact forces that exert pushes or pulls across space without requiring physical contact. Friction, normal force, and tension require touching."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: In a playground tug-of-war match, Team Blue pulls to the left with 80 Newtons of force, and Team Gold pulls to the right with 80 Newtons of force. What happens to the rope?",
        "optionsA": [
          {
            "id": "a",
            "text": "The rope does not accelerate in either direction because the forces are balanced."
          },
          {
            "id": "b",
            "text": "The rope snaps because forces cancel mass."
          },
          {
            "id": "c",
            "text": "The rope accelerates rapidly toward Team Gold."
          },
          {
            "id": "d",
            "text": "The rope floats straight up into the air."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: If an extra player joins Team Gold, increasing their pull to 120 Newtons while Team Blue stays at 80 Newtons, what will happen?",
        "optionsB": [
          {
            "id": "a",
            "text": "The forces become unbalanced (net force of 40 N to the right), accelerating the rope toward Team Gold."
          },
          {
            "id": "b",
            "text": "The forces remain balanced because tug-of-war ropes cannot move."
          },
          {
            "id": "c",
            "text": "Team Blue accelerates backward to the left."
          },
          {
            "id": "d",
            "text": "Gravity turns off on Team Gold’s side."
          }
        ],
        "answerB": "a",
        "explanation": "Equal opposing forces produce balanced equilibrium (net force = 0). Unequal opposing forces produce an unbalanced net force that causes acceleration in the direction of the larger force."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the scientific description comparing forces using the drop-down menus:",
        "segments": [
          {
            "text": "Friction is a "
          },
          {
            "blankId": "b1",
            "options": [
              "contact force that opposes sliding between touching surfaces",
              "non-contact force that repels light",
              "state of matter found in outer space"
            ],
            "answer": "contact force that opposes sliding between touching surfaces"
          },
          {
            "text": ", while Earth’s gravity is a "
          },
          {
            "blankId": "b2",
            "options": [
              "non-contact force pulling objects downward toward Earth’s center",
              "magnetic loop that attracts only wooden sticks",
              "balanced friction that pushes objects upward"
            ],
            "answer": "non-contact force pulling objects downward toward Earth’s center"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Friction requires direct physical contact and opposes motion, whereas gravity acts over distances without requiring physical contact."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Classify each force into the correct category based on whether it requires physical contact:",
        "categories": [
          {
            "id": "contact",
            "label": "Contact Force (Requires Physical Touch)"
          },
          {
            "id": "noncontact",
            "label": "Non-Contact Force (Acts at a Distance)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Friction between bicycle tires and road",
            "category": "contact"
          },
          {
            "id": "i2",
            "label": "Earth’s gravity pulling rain clouds down",
            "category": "noncontact"
          },
          {
            "id": "i3",
            "label": "Normal supporting force of a chair on a student",
            "category": "contact"
          },
          {
            "id": "i4",
            "label": "Magnetic attraction pulling iron filings to a magnet",
            "category": "noncontact"
          }
        ],
        "explanation": "Friction and normal force require physical contact between objects. Gravity and magnetism exert forces through fields across empty space."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "A worker pushes a heavy wooden crate across the Dunbar gym floor with 50 Newtons of force to the right. The floor friction opposes the crate with exactly 50 Newtons of force to the left. If the crate was already sliding at 1 meter per second, what will happen to its speed?",
        "options": [
          {
            "id": "a",
            "text": "The crate continues moving at a constant speed of 1 meter per second because forces are balanced."
          },
          {
            "id": "b",
            "text": "The crate speeds up rapidly to 10 meters per second."
          },
          {
            "id": "c",
            "text": "The crate stops dead in zero seconds."
          },
          {
            "id": "d",
            "text": "The crate reverses direction and slides backwards."
          }
        ],
        "answer": "a",
        "explanation": "When opposing forces are equal in strength (50 N right vs 50 N left), the net force is zero. An object in motion continues moving at constant velocity when forces are balanced."
      },
      {
        "id": "q7",
        "type": "multiselect",
        "prompt": "Which TWO design modifications would INCREASE the friction between a boat trailer’s tires and a slick concrete boat ramp? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Adding deep tread grooves and rough rubber siping to the tire surface"
          },
          {
            "id": "b",
            "text": "Carving chevron traction ridges into the concrete ramp"
          },
          {
            "id": "c",
            "text": "Pouring slippery dish soap and water all over the ramp"
          },
          {
            "id": "d",
            "text": "Polishing the concrete until it is as smooth as glass"
          },
          {
            "id": "e",
            "text": "Replacing rubber tires with smooth slick plastic wheels"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Deep tire treads and textured concrete ridges increase surface interlocking, which increases frictional resistance against sliding."
      },
      {
        "id": "q8",
        "type": "multipart",
        "promptA": "Part A: A skydiver jumps from an airplane. Why does opening a large parachute slow down the skydiver’s descent?",
        "optionsA": [
          {
            "id": "a",
            "text": "The wide canopy catches air, greatly increasing upward air resistance (friction) against downward gravity."
          },
          {
            "id": "b",
            "text": "The parachute turns off Earth’s gravitational field."
          },
          {
            "id": "c",
            "text": "The parachute makes the skydiver have zero mass in grams."
          },
          {
            "id": "d",
            "text": "The parachute attracts magnetic poles in the upper atmosphere."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: When the skydiver reaches a steady descent speed where upward air resistance equals downward gravity, the forces are:",
        "optionsB": [
          {
            "id": "a",
            "text": "Balanced, resulting in constant terminal velocity."
          },
          {
            "id": "b",
            "text": "Unbalanced, causing the skydiver to accelerate into space."
          },
          {
            "id": "c",
            "text": "Zero, because all forces vanish."
          },
          {
            "id": "d",
            "text": "Negative, causing the skydiver to freeze in midair."
          }
        ],
        "answerB": "a",
        "explanation": "The parachute increases surface area, increasing air resistance (a contact friction force). When upward air resistance equals downward gravity, forces are balanced and descent speed remains constant."
      },
      {
        "id": "q9",
        "type": "inlinechoice",
        "prompt": "Complete the statement regarding balanced and unbalanced forces using the drop-down menus:",
        "segments": [
          {
            "text": "When forces acting on a rolling soccer ball are balanced, the ball "
          },
          {
            "blankId": "b1",
            "options": [
              "maintains a constant speed and straight direction",
              "accelerates wildly in circles",
              "explodes into sound energy"
            ],
            "answer": "maintains a constant speed and straight direction"
          },
          {
            "text": ", but when an unbalanced force strikes the ball, it "
          },
          {
            "blankId": "b2",
            "options": [
              "changes its speed or direction of motion",
              "instantly loses all of its mass",
              "stops interacting with gravity"
            ],
            "answer": "changes its speed or direction of motion"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Balanced forces produce no change in motion (constant velocity or rest). Unbalanced forces produce acceleration (change in speed or direction)."
      },
      {
        "id": "q10",
        "type": "dragsort",
        "prompt": "Classify each scenario based on whether the forces acting on the object are balanced or unbalanced:",
        "categories": [
          {
            "id": "bal",
            "label": "Balanced Forces (Net Force = 0)"
          },
          {
            "id": "unbal",
            "label": "Unbalanced Forces (Net Force > 0)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "A science textbook resting motionless on a student desk",
            "category": "bal"
          },
          {
            "id": "i2",
            "label": "A skateboard accelerating down a steep ramp",
            "category": "unbal"
          },
          {
            "id": "i3",
            "label": "A boat cruising at a steady 5 mph in a straight line",
            "category": "bal"
          },
          {
            "id": "i4",
            "label": "A baseball struck by a bat flying into the outfield",
            "category": "unbal"
          }
        ],
        "explanation": "Motionless objects and objects moving at constant velocity in a straight line have balanced forces. Speeding up, slowing down, or turning indicates unbalanced forces."
      },
      {
        "id": "q11",
        "type": "single",
        "prompt": "A 4th grade student uses a spring scale to pull a wooden block across three different surfaces at constant speed: sandpaper (4.5 N), wax paper (1.2 N), and tabletop wood (2.8 N). What conclusion is best supported by these data?",
        "options": [
          {
            "id": "a",
            "text": "Sandpaper produced the greatest frictional contact force opposing the block’s motion."
          },
          {
            "id": "b",
            "text": "Wax paper had the strongest gravitational pull on the block."
          },
          {
            "id": "c",
            "text": "The block changed its mass on each surface."
          },
          {
            "id": "d",
            "text": "Tabletop wood is a magnetic insulator."
          }
        ],
        "answer": "a",
        "explanation": "Higher spring scale readings indicate that more force was required to overcome the higher frictional resistance of the rougher sandpaper surface."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "Apollo astronauts on the Moon dropped a steel hammer and a falcon feather simultaneously from the same height in the vacuum of space (where there is no air). What happened?",
        "options": [
          {
            "id": "a",
            "text": "Both the hammer and feather hit the lunar surface at the exact same instant because there was no air resistance friction."
          },
          {
            "id": "b",
            "text": "The feather floated away into deep space because feathers have zero mass."
          },
          {
            "id": "c",
            "text": "The hammer fell ten times faster because heavy things always fall faster in all conditions."
          },
          {
            "id": "d",
            "text": "Both objects hovered in midair because the Moon has zero gravity."
          }
        ],
        "answer": "a",
        "explanation": "In the absence of air resistance (contact friction), gravity accelerates all objects at the exact same rate regardless of their mass, as proven on the Moon during Apollo 15."
      }
    ]
  },
  {
    "id": "m2_2",
    "unitId": 2,
    "unitTitle": "Unit 2: Force, Motion & Energy",
    "gradingPeriod": "2nd Nine Weeks (CBA 2)",
    "code": "TEKS 4.8A",
    "title": "Energy Transfer: Motion, Waves & Collisions",
    "subtitle": "Kinetic Energy, Collision Dynamics, Sound & Water Waves",
    "icon": "🌊",
    "accentColor": "#10b981",
    "iCanStatement": "I can investigate and explain how energy is transferred from place to place by sound, light, heat, and electric currents, and in collisions between moving objects.",
    "localAnchor": "Galveston Bay shipping channel: Heavy tugboats generating wake waves that rock moored crab docks, and bumper collisions between barges.",
    "engage": {
      "hookQuestion": "When a heavy cargo barge passes down Galveston Bay, why do resting pelicans and moored docks rock up and down seconds later even though the barge never touched them?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "The moving barge transfers kinetic energy into the water, creating traveling wake waves that carry energy across the bay to lift the dock.",
          "correct": true,
          "feedback": "Spot on! Waves are traveling pulses of energy. The water molecules oscillate up and down, transferring kinetic energy from the vessel across the channel to the shoreline."
        },
        {
          "id": "b",
          "text": "The barge emits magnetic force fields that attract wooden docks.",
          "correct": false,
          "feedback": "Wooden docks and pelicans are non-magnetic; wave energy, not magnetism, causes the motion."
        },
        {
          "id": "c",
          "text": "The barge pulls all the water out of Galveston Bay, creating empty space.",
          "correct": false,
          "feedback": "Water is displaced and oscillates as a wave medium; it is not removed from the bay."
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
            1,
            0
          ],
          "callout": {
            "title": "Galveston Bay Channel",
            "text": "Deep-water shipping channel with passing commercial tug and barge",
            "pos": [
              0,
              2,
              0
            ]
          },
          "narration": "Imagine standing on a fishing pier over Galveston Bay, Kelenna! A massive cargo tugboat chugs past in the middle of the channel. Seconds later, your quiet wooden pier starts bobbing up and down, and resting pelicans flutter into the air! How did that boat push your pier from 200 feet away without ever touching it?",
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
            1,
            1,
            0
          ],
          "callout": {
            "title": "Transverse Wake Waves",
            "text": "Kinetic energy from the hull displacing water into oscillating wave crests and troughs",
            "pos": [
              1,
              1.5,
              0
            ]
          },
          "narration": "Look at the rolling ripples! As the boat bulldozes forward, its powerful engine shoves the bay water aside. That push travels across the bay as a moving wave! The water molecules don't travel all the way to shore—they just bob up and down in place like kids doing 'the wave' in a stadium!",
          "sfx": "splash"
        },
        {
          "start": 22,
          "end": 33,
          "cameraPos": [
            -6,
            3,
            6
          ],
          "lookAt": [
            -1,
            1,
            0
          ],
          "callout": {
            "title": "Dock Collision & Oscillation",
            "text": "Wave energy transferring mechanical work to wooden pilings and moored vessels",
            "pos": [
              -1,
              1.2,
              0
            ]
          },
          "narration": "When those rolling ripples reach your wooden dock—CRASH! The traveling energy transfers straight into the wooden pilings, lifting the heavy dock up into the air. Energy traveled all the way across the bay through the water without a single wire or rope!",
          "sfx": "splash"
        },
        {
          "start": 33,
          "end": 45,
          "cameraPos": [
            0,
            4,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Newton’s Cradle Collision Track",
            "text": "Elastic momentum transfer: ball 1 stops instantly while ball 5 absorbs kinetic energy",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Now watch this collision experiment with steel marbles. When marble 1 swings down and smacks marble 2, marble 1 stops dead in its tracks! The kinetic energy zips like lightning through the middle marbles and launches the last marble high into the air! Energy moves from object to object!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Launch water waves by adjusting boat speed and hull displacement in the bay simulator, or release colliding spheres on the collision track to measure kinetic energy transfer and wave amplitude.",
      "labPrompts": [
        "Increase tugboat velocity from 5 to 15 knots and record how wake wave height (amplitude) increases.",
        "Drop steel sphere 1 from 30° elevation and observe how sphere 5 swings outward to the exact same elevation.",
        "Replace the steel spheres with rubber foam bumpers and compare sound energy output and rebound height."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            3,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Kinetic Energy of Motion",
            "text": "Energy possessed by an object due to its motion: KE = ½ mv²",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "What is Kinetic Energy from first principles? In simple words: it is the energy of MOTION! Anything that is moving has kinetic energy. A rolling bowling ball, a flying soccer ball, or a speeding bicycle all carry kinetic energy. The faster it moves and the heavier it is, the more kinetic energy it packs!",
          "sfx": "whoosh"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            -2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Collision Energy Transfer",
            "text": "Direct contact causes mechanical kinetic energy to transfer between impacting bodies",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "What happens during a Collision? When two moving objects crash into each other, their kinetic energy doesn't disappear. It transfers! Just like bumper cars at the Galveston Pleasure Pier, car A slows down while car B gets kicked forward, and you hear a loud CLACK sound!",
          "sfx": "chime"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Mechanical Waves",
            "text": "Disturbances that propagate energy through a material medium without net matter transport",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "What is a Wave? A wave is energy on the move through a material called a medium! Think of a long jump rope: when you flick your wrist up and down, a wave travels all the way to your friend. The rope doesn't leave your hand; only the wave energy traveled through the rope!",
          "sfx": "splash"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            4,
            5.5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Wavelength & Amplitude",
            "text": "Amplitude = height of crest (energy level); Wavelength = distance between consecutive crests",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Waves have two big measurements: Amplitude and Wavelength! Amplitude is how tall the wave crest reaches—tall waves carry huge, powerful energy! Wavelength is the distance from one wave peak to the very next wave peak, like the spacing between train cars on a track!",
          "sfx": "whoosh"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            3,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Conservation of Energy",
            "text": "Total energy in a closed system is constant; energy transforms into sound, thermal, and motion",
            "pos": [
              0,
              1.3,
              0
            ]
          },
          "narration": "Energy has the same superpower as matter: it cannot be created or destroyed! When two soccer balls collide, some motion energy turns into sound waves you can hear and a tiny bit of heat friction you can feel. Total energy is always conserved and accounted for!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m2_2_v0",
          "term": "Energy",
          "simpleMeaning": "The ability to do work, cause motion, or create change! Energy is the fuel behind everything that happens in the universe, from moving waves to bright sunshine.",
          "definition": "The ability to do work or cause a change in matter, occurring in forms such as kinetic, thermal, sound, electrical, and light energy.",
          "example": "Electrical energy running a fan, or chemical energy stored inside the food you eat before gym class at Dunbar.",
          "narration": "Energy! Energy is the universe’s superpower to make things happen! Without energy, nothing could move, grow, make sound, or shine light. Energy can change into different forms, but it is never lost!"
        },
        {
          "id": "m2_2_v1",
          "term": "Kinetic Energy",
          "simpleMeaning": "The energy an object has because it is MOVING! The heavier an object is and the faster it rolls or flies, the more kinetic energy it carries.",
          "definition": "The energy of an object due to its motion, determined by the object’s mass and velocity.",
          "example": "A fast-pitch baseball zooming across home plate, or a bowling ball rolling down the lane.",
          "narration": "Kinetic Energy! Think of a rolling bowling ball heading straight for the pins. That ball is packed with kinetic energy! As soon as it hits the pins—BAM—that kinetic energy transfers into the pins, sending them flying!"
        },
        {
          "id": "m2_2_v2",
          "term": "Collision",
          "simpleMeaning": "When two or more moving objects bump or crash into each other, transferring kinetic energy, sound, and heat between them.",
          "definition": "An event in which two or more moving objects exert forces on each other over a short period, transferring energy and momentum.",
          "example": "Two bumper cars crashing together at the county fair, making a loud thud and bouncing apart.",
          "narration": "Collision! Have you ever played marbles or pool? When the white cue ball smacks into the solid 8-ball, that crash is a collision! The cue ball stops, and its motion energy gets passed right into the 8-ball!"
        },
        {
          "id": "m2_2_v3",
          "term": "Wave",
          "simpleMeaning": "A traveling disturbance or ripple that carries energy from one place to another through water, air, or other materials without moving the material permanently.",
          "definition": "A repeating disturbance or oscillation that travels through matter or space, transferring energy from one point to another without permanently moving matter.",
          "example": "Ripples spreading across Dickinson Bayou when a fish jumps, or sound waves traveling from a teacher’s voice to your ears.",
          "narration": "Wave! Picture people in a packed football stadium doing “The Wave.” Each person just stands up and sits down, but the ripple travels all the way around the stadium! That’s how waves work: energy travels, while matter bobs in place!"
        },
        {
          "id": "m2_2_v4",
          "term": "Vibration",
          "simpleMeaning": "A rapid back-and-forth or up-and-down shaking motion that creates sound waves and mechanical energy.",
          "definition": "A rapid back-and-forth or cyclic motion of particles or an object about an equilibrium position, producing sound or mechanical waves.",
          "example": "A plucked guitar string vibrating so fast it looks blurry, producing a clear musical tone.",
          "narration": "Vibration! Put your fingers gently on your throat and hum a low note—bzzzzz! Feel that buzzing against your fingertips? That is a vibration! Vibrations shake the air particles around them to create sound waves that reach your ears!"
        }
      ]
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "How does a passing cargo tugboat make a distant fishing dock rock up and down without touching it?",
          "options": [
            "The tugboat transfers kinetic energy into the water, producing traveling wake waves that carry energy to the dock.",
            "The tugboat pulls the dock with long invisible ropes.",
            "The boat emits magnetic rays that pull on wooden pilings.",
            "Pelicans carry the motion from the boat to the dock in their beaks."
          ],
          "answer": 0,
          "hint": "Waves transfer kinetic energy across bodies of water without touching shore directly!"
        },
        {
          "q": "When a water wave passes under a floating brown pelican resting on Galveston Bay, how does the pelican move?",
          "options": [
            "The pelican bobs up and down in place as the wave energy passes underneath.",
            "The pelican is pushed 5 miles out into the Gulf of Mexico instantly.",
            "The pelican sinks to the bottom of the sea floor permanently.",
            "The pelican spins in circles at 100 miles per hour."
          ],
          "answer": 0,
          "hint": "Waves move energy forward while matter oscillates up and down in place!"
        },
        {
          "q": "In a Newton’s Cradle apparatus, what happens when the first suspended steel sphere is pulled back and released?",
          "options": [
            "It collides with the middle spheres, and its kinetic energy transfers through the line to launch only the last sphere outward.",
            "All five spheres instantly stick together and never move again.",
            "The first sphere bounces backward without touching anything.",
            "The middle spheres heat up and turn into liquid water."
          ],
          "answer": 0,
          "hint": "Kinetic energy transfers cleanly through the resting balls to the end ball!"
        }
      ],
      "explore": [
        {
          "q": "If Kelenna rolls Marble A across a smooth table at 5 mph and rolls identical Marble B at 15 mph, which marble has more kinetic energy?",
          "options": [
            "Marble B, because faster-moving objects carry significantly more kinetic energy.",
            "Marble A, because slower objects are heavier.",
            "Both marbles have identical kinetic energy because they are made of glass.",
            "Neither marble has kinetic energy because kinetic energy only exists in batteries."
          ],
          "answer": 0,
          "hint": "Kinetic energy increases as speed increases!"
        },
        {
          "q": "When two rolling toy cars collide head-on on the classroom rug, which forms of energy are produced during the collision?",
          "options": [
            "Sound energy (the crashing noise) and a tiny amount of thermal energy (heat friction).",
            "Nuclear radiation and green plant sugar.",
            "Zero energy because energy is destroyed upon impact.",
            "Only magnetic gravity."
          ],
          "answer": 0,
          "hint": "You hear the crash (sound) and friction creates tiny amounts of warmth (thermal)!"
        },
        {
          "q": "If Kelenna strikes a bass drum gently with a mallet, and then strikes it with twice as much force, what changes about the sound wave produced?",
          "options": [
            "The wave amplitude is much taller, producing a louder sound with more energy.",
            "The sound travels backward into the drum.",
            "The pitch turns into a dog whistle that humans cannot hear.",
            "The drum head turns into a liquid."
          ],
          "answer": 0,
          "hint": "Striking harder creates larger vibrations and taller wave amplitude, making the sound louder!"
        }
      ],
      "explain": [
        {
          "q": "From first principles, what is the best scientific definition of kinetic energy?",
          "options": [
            "The energy an object has due to its motion",
            "Energy stored inside an unlit match",
            "The weight of an object in kilograms",
            "The temperature of ice cubes in winter"
          ],
          "answer": 0,
          "hint": "Kinetic means motion!"
        },
        {
          "q": "What actually travels through water when an ocean wave moves toward the Galveston seawall?",
          "options": [
            "Energy travels through the water, while the water particles mainly bob in circles and stay in place.",
            "A giant wall of solid stone traveling across the sea.",
            "Water molecules traveling 500 miles without stopping.",
            "Electricity generated by electric eels."
          ],
          "answer": 0,
          "hint": "The wave disturbance transfers energy, not long-distance water transport!"
        },
        {
          "q": "According to the Law of Conservation of Energy, what happens to total energy during any collision?",
          "options": [
            "Total energy is conserved: it simply transfers between objects or changes into sound and thermal energy.",
            "Half of all energy vanishes permanently from the universe.",
            "New energy is magically created from nothing.",
            "Energy only exists if an adult is watching."
          ],
          "answer": 0,
          "hint": "Energy is never created or destroyed; it only changes form!"
        }
      ],
      "vocab": [
        {
          "q": "Which word means \"the ability to do work or cause a change in matter\"?",
          "options": [
            "Energy",
            "Volume",
            "Density",
            "Mineral"
          ],
          "answer": 0,
          "hint": "This is the universal power that fuels all motion and change!"
        },
        {
          "q": "A rapid back-and-forth shaking motion that produces sound waves is called a:",
          "options": [
            "Vibration",
            "Solute",
            "Conductor",
            "Evaporation"
          ],
          "answer": 0,
          "hint": "Plucking a rubber band or guitar string produces this shaking motion!"
        },
        {
          "q": "When two or more moving objects strike each other forcefully and transfer energy, the event is called a:",
          "options": [
            "Collision",
            "Solution",
            "Sediment",
            "Precipitate"
          ],
          "answer": 0,
          "hint": "Think of bumper cars crashing together!"
        }
      ]
    },
    "elaborate": {
      "title": "Dickinson Bayou Wave Attenuator & Shoreline Protection Barrier",
      "scenario": "High-speed commercial boat wakes along Dickinson Bayou are eroding fragile marshland and damaging Dunbar Middle School wetland restoration plots.",
      "goalDescription": "Engineer a floating offshore wave attenuator barrier made of tethered baffles that absorbs and redirects 85% of incoming wave kinetic energy before waves reach the shoreline.",
      "criteria": [
        "Criterion 1: Attenuator must reduce incoming wave amplitude from 0.8 meters to under 0.15 meters.",
        "Criterion 2: Baffle joints must dissipate energy through controlled friction and hydraulic damping.",
        "Criterion 3: Record wave height and shoreline erosion telemetry before and after deploying the barrier."
      ],
      "successFeedback": "Brilliant engineering! Your wave barrier safely dissipated wake energy, protecting Dickinson Bayou wetlands and preserving young fish habitats from shoreline erosion!"
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A heavy bowling ball rolls down a wooden lane and smashes into ten motionless bowling pins. The pins fly backward in all directions with a loud CRACK. What happened to the energy in this system?",
        "options": [
          {
            "id": "a",
            "text": "Kinetic energy from the moving ball was transferred to the pins, and some energy transformed into sound and thermal energy."
          },
          {
            "id": "b",
            "text": "All kinetic energy was destroyed upon impact."
          },
          {
            "id": "c",
            "text": "The pins created their own energy from scratch."
          },
          {
            "id": "d",
            "text": "Gravity was temporarily disabled during the collision."
          }
        ],
        "answer": "a",
        "explanation": "During a collision, kinetic energy transfers from the moving object to the resting objects. Some kinetic energy also transforms into sound vibrations and friction heat, conserving total energy."
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "A science student investigates how moving vehicles carry kinetic energy. Which TWO factors directly determine how much kinetic energy a moving pickup truck possesses? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "The mass of the pickup truck"
          },
          {
            "id": "b",
            "text": "The speed (velocity) of the pickup truck"
          },
          {
            "id": "c",
            "text": "The color of the paint on the truck hood"
          },
          {
            "id": "d",
            "text": "The volume of music playing on the radio"
          },
          {
            "id": "e",
            "text": "The time of day the truck was manufactured"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Kinetic energy depends directly on the mass of the object and the speed at which it moves (KE = ½ mv²). Greater mass and higher speed mean greater kinetic energy."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: Toy Truck 1 (mass = 500 grams) rolls at 2 m/s and strikes stationary Toy Car 2 (mass = 100 grams). What will happen to Toy Car 2 upon impact?",
        "optionsA": [
          {
            "id": "a",
            "text": "Toy Car 2 accelerates forward rapidly because kinetic energy is transferred into its lighter mass."
          },
          {
            "id": "b",
            "text": "Toy Car 2 stays completely motionless."
          },
          {
            "id": "c",
            "text": "Toy Car 2 rolls backward into Toy Truck 1."
          },
          {
            "id": "d",
            "text": "Toy Car 2 loses all its mass."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: What happens to Toy Truck 1 during this collision?",
        "optionsB": [
          {
            "id": "a",
            "text": "Toy Truck 1 slows down because it transferred a portion of its kinetic energy to Toy Car 2."
          },
          {
            "id": "b",
            "text": "Toy Truck 1 speeds up to 100 m/s."
          },
          {
            "id": "c",
            "text": "Toy Truck 1 evaporates into air."
          },
          {
            "id": "d",
            "text": "Toy Truck 1 gains kinetic energy from nowhere."
          }
        ],
        "answerB": "a",
        "explanation": "In an impact collision, the moving heavier object transfers energy to the lighter resting object, causing the lighter object to shoot forward while the heavier object slows down."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the statement regarding wave motion using the drop-down menus:",
        "segments": [
          {
            "text": "A water wave rolling across Dickinson Bayou transfers "
          },
          {
            "blankId": "b1",
            "options": [
              "energy across long distances",
              "individual water molecules across the Atlantic Ocean",
              "solid granite rocks to the sky"
            ],
            "answer": "energy across long distances"
          },
          {
            "text": ", while the actual water particles "
          },
          {
            "blankId": "b2",
            "options": [
              "bob up and down in circular paths near their original position",
              "speed forward at 500 mph without stopping",
              "instantly turn into dry sand"
            ],
            "answer": "bob up and down in circular paths near their original position"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Mechanical waves propagate energy through a medium without permanently transporting the matter of the medium itself."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Classify each wave phenomenon into high-energy or low-energy based on its amplitude and vibration intensity:",
        "categories": [
          {
            "id": "high",
            "label": "High Energy Wave (Large Amplitude)"
          },
          {
            "id": "low",
            "label": "Low Energy Wave (Small Amplitude)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Huge hurricane storm surge wave crashing over a seawall",
            "category": "high"
          },
          {
            "id": "i2",
            "label": "Gentle pond ripple caused by a tiny water strider insect",
            "category": "low"
          },
          {
            "id": "i3",
            "label": "Deep booming thunderclap rattling classroom windows",
            "category": "high"
          },
          {
            "id": "i4",
            "label": "Faint whisper of a breeze through pine needles",
            "category": "low"
          }
        ],
        "explanation": "Wave energy is proportional to the square of its amplitude: tall storm waves and loud thunder carry high energy, while small ripples and quiet whispers carry low energy."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "A science teacher strikes a metal tuning fork against a rubber block and dips the vibrating tines into a shallow dish of water. Water droplets splash vigorously out of the dish. What does this demonstrate?",
        "options": [
          {
            "id": "a",
            "text": "Vibrating objects carry mechanical kinetic energy that can be transferred to surrounding matter."
          },
          {
            "id": "b",
            "text": "Water repels metal due to magnetic poles."
          },
          {
            "id": "c",
            "text": "The tuning fork melted the water into gas."
          },
          {
            "id": "d",
            "text": "Tuning forks have zero mass when struck."
          }
        ],
        "answer": "a",
        "explanation": "Sound is produced by rapid physical vibrations. When the vibrating tines contact water, their kinetic energy transfers into the water, splashing droplets into the air."
      },
      {
        "id": "q7",
        "type": "multiselect",
        "prompt": "When Kelenna claps two wooden blocks together forcefully in front of the classroom, which TWO forms of energy are immediately produced? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Sound energy traveling as sound waves through the air"
          },
          {
            "id": "b",
            "text": "Thermal energy (heat) at the contact points of the wood"
          },
          {
            "id": "c",
            "text": "Nuclear energy from split atoms"
          },
          {
            "id": "d",
            "text": "Electrical currents flowing into wall outlets"
          },
          {
            "id": "e",
            "text": "Magnetic attraction pulling iron from the chalkboard"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "The kinetic energy of the clapping blocks transforms primarily into sound waves that radiate through air and a small amount of thermal energy from friction on the wood surfaces."
      },
      {
        "id": "q8",
        "type": "multipart",
        "promptA": "Part A: A pendulum ball is pulled high to Position 1 and held motionless. What kind of energy does it have at Position 1?",
        "optionsA": [
          {
            "id": "a",
            "text": "Stored (potential) energy due to its height above the ground"
          },
          {
            "id": "b",
            "text": "Maximum kinetic energy of motion"
          },
          {
            "id": "c",
            "text": "Electrical energy from a battery"
          },
          {
            "id": "d",
            "text": "Zero total energy"
          }
        ],
        "answerA": "a",
        "promptB": "Part B: When the pendulum ball is released and zooms through the lowest point (Position 2), what happens to its energy?",
        "optionsB": [
          {
            "id": "a",
            "text": "Its stored energy transforms into maximum kinetic energy of motion."
          },
          {
            "id": "b",
            "text": "All energy disappears completely."
          },
          {
            "id": "c",
            "text": "It turns into solid ice."
          },
          {
            "id": "d",
            "text": "It loses its mass."
          }
        ],
        "answerB": "a",
        "explanation": "At the top of the swing, energy is stored as potential energy. As gravity pulls it downward, that potential energy transforms into kinetic energy, reaching maximum speed at the lowest point."
      },
      {
        "id": "q9",
        "type": "inlinechoice",
        "prompt": "Complete the sentence describing energy conservation during collisions using the drop-down menus:",
        "segments": [
          {
            "text": "In any collision between two objects, the total amount of energy before the collision "
          },
          {
            "blankId": "b1",
            "options": [
              "equals the total amount of energy after the collision",
              "is cut in half permanently",
              "multiplies by ten times"
            ],
            "answer": "equals the total amount of energy after the collision"
          },
          {
            "text": ", because energy can "
          },
          {
            "blankId": "b2",
            "options": [
              "change forms and transfer, but cannot be created or destroyed",
              "only exist in outer space",
              "vanish whenever things make sound"
            ],
            "answer": "change forms and transfer, but cannot be created or destroyed"
          },
          {
            "text": "."
          }
        ],
        "explanation": "The Law of Conservation of Energy mandates that energy is never created or destroyed; it merely transfers between objects or changes between motion, sound, and thermal forms."
      },
      {
        "id": "q10",
        "type": "dragsort",
        "prompt": "Classify each example based on whether it demonstrates kinetic energy (energy of motion) or stored potential energy:",
        "categories": [
          {
            "id": "ke",
            "label": "Kinetic Energy (In Motion)"
          },
          {
            "id": "pe",
            "label": "Stored Potential Energy (At Rest)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "A soccer ball flying toward the goal post",
            "category": "ke"
          },
          {
            "id": "i2",
            "label": "An archer holding a stretched bowstring ready to release",
            "category": "pe"
          },
          {
            "id": "i3",
            "label": "A rollercoaster cart zooming down a 70-foot drop",
            "category": "ke"
          },
          {
            "id": "i4",
            "label": "A heavy boulder perched high on the edge of a cliff",
            "category": "pe"
          }
        ],
        "explanation": "Objects in motion have kinetic energy. Objects at rest that possess stored energy due to position, tension, or height have potential energy."
      },
      {
        "id": "q11",
        "type": "single",
        "prompt": "Two identical ocean waves strike the Dickinson marsh shoreline. Wave X has a crest height of 0.2 meters. Wave Y has a crest height of 1.0 meter. What can Kelenna conclude about Wave Y compared to Wave X?",
        "options": [
          {
            "id": "a",
            "text": "Wave Y has greater amplitude and carries significantly more energy to the shore."
          },
          {
            "id": "b",
            "text": "Wave Y has less mass than Wave X."
          },
          {
            "id": "c",
            "text": "Wave Y carries zero energy because it is taller."
          },
          {
            "id": "d",
            "text": "Wave Y is colder than Wave X."
          }
        ],
        "answer": "a",
        "explanation": "Amplitude is measured from rest to crest. Taller waves (greater amplitude) carry much more kinetic energy and can cause greater coastal erosion."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A battery-powered remote-controlled toy boat zips across Dickinson Bayou. Which sequence correctly shows the energy transformations occurring in the toy boat?",
        "options": [
          {
            "id": "a",
            "text": "Chemical energy (battery) → Electrical energy (wires) → Mechanical kinetic energy (spinning propeller) + Sound & Heat"
          },
          {
            "id": "b",
            "text": "Sound energy → Solar energy → Gravity"
          },
          {
            "id": "c",
            "text": "Nuclear energy → Ice energy → Magnetic light"
          },
          {
            "id": "d",
            "text": "Kinetic energy → Nothing (energy disappears)"
          }
        ],
        "answer": "a",
        "explanation": "Stored chemical energy inside battery cells converts to electrical current, which spins an electric motor (kinetic motion) while producing minor sound and heat dissipation."
      }
    ]
  },
  {
    "id": "m2_3",
    "unitId": 2,
    "unitTitle": "Unit 2: Force, Motion & Energy",
    "gradingPeriod": "2nd Nine Weeks (CBA 2)",
    "code": "TEKS 4.8B, 4.8C",
    "title": "Electrical Circuits, Conductors & Insulators",
    "subtitle": "Closed Loops, Pathway Continuity, Thermal & Electrical Conductivity",
    "icon": "💡",
    "accentColor": "#eab308",
    "iCanStatement": "I can demonstrate that an electric circuit needs a complete path through which an electric current can pass, and investigate materials that are electrical and thermal conductors or insulators.",
    "localAnchor": "Dunbar Middle School hurricane emergency lighting lab: Wiring navigation warning beacons along Dickinson Bayou with marine-grade copper wire and protective rubber insulators.",
    "engage": {
      "hookQuestion": "Why must hurricane emergency marine radios and beacon lights along Dickinson Bayou use copper wires wrapped in thick rubber coating instead of bare steel cables?",
      "anchorOptions": [
        {
          "id": "a",
          "text": "Copper is an exceptional electrical conductor that carries current with minimal resistance, while rubber is an insulator that prevents dangerous electric shocks and short circuits.",
          "correct": true,
          "feedback": "Spot on! Copper freely conducts electric current along the closed circuit path, while rubber insulation confines the electrons inside the wire to ensure safety and prevent power loss."
        },
        {
          "id": "b",
          "text": "Rubber conducts electricity faster than metal when soaked in saltwater.",
          "correct": false,
          "feedback": "Rubber is an insulator and does not conduct electrical currents."
        },
        {
          "id": "c",
          "text": "Copper wires are magnetic and attract lightning away from boats.",
          "correct": false,
          "feedback": "Copper is a non-magnetic metal and does not attract lightning by magnetism."
        }
      ],
      "timeline": [
        {
          "start": 0,
          "end": 11,
          "cameraPos": [
            0,
            4,
            8
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Galveston Bay Channel Beacon",
            "text": "12V DC marine emergency warning beacon on a navigation piling",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "Imagine a dark, foggy night along Dickinson Bayou, Kelenna! Boats rely on a glowing warning beacon to steer safely away from the rocks. But suddenly, the beacon bulb flickers out! The battery is brand new and fully charged. What broke the pathway of power?",
          "sfx": "whoosh"
        },
        {
          "start": 11,
          "end": 22,
          "cameraPos": [
            -2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Closed Electrical Loop",
            "text": "Continuous conductive circuit: Battery (+) → Switch → Lamp filament → Battery (-)",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "Look closely at the wiring! Electricity is like a crowd of runners on a circular track. If there is even one tiny gap or cut in the wire, the runners stop instantly! For electricity to flow, the pathway must be a 100% closed, unbroken loop from the battery, through the bulb, and back again!",
          "sfx": "spark"
        },
        {
          "start": 22,
          "end": 33,
          "cameraPos": [
            2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Testing Conductors vs Insulators",
            "text": "Testing bridge gap: Copper wire & steel bolts conduct; rubber & wood insulate",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "Now let's test what materials can bridge the gap. If we touch an iron bolt or shiny copper wire across the gap—FLASH! The bulb glows bright because metals are Conductors with open highways for electrons. But if we try a wooden stick or rubber band, the bulb stays dark because they are Insulators that block electric current!",
          "sfx": "spark"
        },
        {
          "start": 33,
          "end": 45,
          "cameraPos": [
            0,
            5,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Light & Thermal Output",
            "text": "Tungsten filament transforms electrical energy into radiant light and thermal heat",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "When electrical current zooms through the super-thin metal filament inside the bulb, the particles squeeze and rub together furiously. That electric energy transforms into dazzling bright light energy AND warm thermal energy you can feel! One energy form turns into another!",
          "sfx": "chime"
        }
      ]
    },
    "explore": {
      "instructions": "Build circuit loops on the interactive breadboard by connecting batteries, toggle switches, and light bulbs. Insert mystery test materials into the test gap to classify them as electrical and thermal conductors or insulators.",
      "labPrompts": [
        "Connect the battery, wire, and bulb to form a closed circuit and confirm that current flows.",
        "Open the knife switch and explain why creating a physical air gap causes the bulb to turn off.",
        "Insert copper wire, aluminum foil, an iron nail, a plastic straw, and a glass rod into the circuit tester and record which materials complete the circuit."
      ]
    },
    "explain": {
      "timeline": [
        {
          "start": 0,
          "end": 12,
          "cameraPos": [
            0,
            3,
            6
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Closed Circuit (Complete Path)",
            "text": "An uninterrupted conductive pathway allowing electrons to flow from source back to return",
            "pos": [
              0,
              1.4,
              0
            ]
          },
          "narration": "First principles rule number one: Electricity demands a Closed Circuit! Think of a closed roller coaster track: the coaster cars can only loop around if all the rails are connected together. If the loop has a gap, it is an Open Circuit, and electric current stops moving immediately!",
          "sfx": "chime"
        },
        {
          "start": 12,
          "end": 24,
          "cameraPos": [
            -2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            -0.5,
            1,
            0
          ],
          "callout": {
            "title": "Switches Control Flow",
            "text": "A mechanical switch opens (interrupts) or closes (completes) the conductive path",
            "pos": [
              -0.5,
              1.2,
              0
            ]
          },
          "narration": "How do we control lights in your room? With a Switch! A switch is like a drawbridge over a castle moat. When the switch is closed (down), the bridge is complete and electric current crosses smoothly. When you flip the switch open (up), a gap appears and electric current is blocked!",
          "sfx": "spark"
        },
        {
          "start": 24,
          "end": 36,
          "cameraPos": [
            2.5,
            2.5,
            4.5
          ],
          "lookAt": [
            0.5,
            1,
            0
          ],
          "callout": {
            "title": "Electrical Conductors",
            "text": "Materials (principally metals) with low resistance that permit free flow of electric charge",
            "pos": [
              0.5,
              1.3,
              0
            ]
          },
          "narration": "What is an Electrical Conductor? It's a material with an open highway for electrons! Metals like copper, aluminum, iron, and steel let electric charges glide through them effortlessly. That's why electrical cords are always packed with shiny copper wires inside!",
          "sfx": "spark"
        },
        {
          "start": 36,
          "end": 48,
          "cameraPos": [
            0,
            4,
            5.5
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Electrical Insulators",
            "text": "Materials that tightly bind electrons, preventing electrical current and blocking heat transfer",
            "pos": [
              0,
              1.5,
              0
            ]
          },
          "narration": "What is an Electrical Insulator? It's a stubborn roadblock! Materials like rubber, plastic, dry wood, and glass hold onto their particles super tight and refuse to let electric current pass. That's why electricians wear thick rubber gloves—to block electric shocks and keep you safe!",
          "sfx": "whoosh"
        },
        {
          "start": 48,
          "end": 60,
          "cameraPos": [
            0,
            3,
            7
          ],
          "lookAt": [
            0,
            1,
            0
          ],
          "callout": {
            "title": "Energy Transformation",
            "text": "Electrical energy transforms into light, heat, sound, or mechanical work at the load",
            "pos": [
              0,
              1.3,
              0
            ]
          },
          "narration": "When electricity arrives at its destination, it transforms! In a light bulb, electrical energy becomes light and thermal heat. In a school bell, it turns into sound and kinetic vibrations. In a fan, it turns into mechanical motion! Energy changes costumes, but never disappears!",
          "sfx": "chime"
        }
      ],
      "vocabulary": [
        {
          "id": "m2_3_v0",
          "term": "Electrical Circuit",
          "simpleMeaning": "A complete circular pathway made of wires, a power source (like a battery), and an output (like a bulb) that lets electric current flow around and around.",
          "definition": "A complete path through which electric current can circulate, consisting of a voltage source, conductive wires, and an electrical load.",
          "example": "A flashlight containing two AA batteries, a slide switch, a copper circuit strip, and a bright LED bulb.",
          "narration": "Electrical Circuit! Think of an electric circuit as a closed race track. The battery gives the electric charges a push, the wires are the roadway, and the light bulb is the pit stop where energy gets used to shine light!"
        },
        {
          "id": "m2_3_v1",
          "term": "Conductor",
          "simpleMeaning": "A material that allows electric current or heat energy to flow through it easily and quickly—especially metals like copper, aluminum, and steel.",
          "definition": "A substance or material that allows the easy flow of electrical current or thermal energy due to freely moving electrons.",
          "example": "Copper wires inside an iPhone charging cable, or a cast iron skillet that gets hot quickly on a stove.",
          "narration": "Conductor! Imagine an open eight-lane highway with green lights all the way. That is what a conductor is for electricity! Metals like copper, silver, and iron give electricity a super-fast, smooth ride."
        },
        {
          "id": "m2_3_v2",
          "term": "Insulator",
          "simpleMeaning": "A material that blocks or slows down the flow of electricity and heat—such as rubber, plastic, wood, and glass—keeping you safe from shocks and burns!",
          "definition": "A material that strongly resists the flow of electrical current or thermal energy, used for safety and containment.",
          "example": "The colorful rubbery plastic coating wrapped around computer cords, or a wooden handle on a cooking pot.",
          "narration": "Insulator! An insulator is like a giant brick wall across the road! Electricity tries to pass through rubber or plastic, but the atoms say “NO WAY!” That’s why rubber keeps electricians safe from dangerous shocks."
        },
        {
          "id": "m2_3_v3",
          "term": "Thermal Energy",
          "simpleMeaning": "The energy of moving and jiggling particles inside matter that we feel as warmth or heat! The faster the particles jiggle, the higher the temperature.",
          "definition": "The internal kinetic energy of an object due to the random motion and vibration of its atoms and molecules, transferred as heat.",
          "example": "Warm sunlight heating up the hood of a car parked at Dunbar Middle School, or the heat felt near a glowing light bulb.",
          "narration": "Thermal Energy! Everything around you is made of tiny dancing atoms. When they dance super fast, they create thermal energy—heat! When electricity squeezes through a bulb filament, friction turns electrical energy into thermal heat and light!"
        },
        {
          "id": "m2_3_v4",
          "term": "Closed Circuit",
          "simpleMeaning": "A circuit with an unbroken, continuous loop with NO gaps, allowing electric current to flow all the way through and turn on the device.",
          "definition": "An uninterrupted electrical pathway with no openings or breaks, permitting continuous electric current flow from the power source through the load.",
          "example": "When you flip a light switch ON, closing the internal metal contact so the classroom lights turn on.",
          "narration": "Closed Circuit! Picture a drawbridge that has lowered completely so cars can drive smoothly across the river. A closed circuit has zero gaps, allowing electric current to complete its entire loop and power up lights, buzzers, and motors!"
        }
      ]
    },
    "sectionQuizzes": {
      "engage": [
        {
          "q": "Why must the emergency warning beacon on Dickinson Bayou be connected in an unbroken closed loop of wire?",
          "options": [
            "Electric current requires a complete, unbroken circuit path to flow from the battery and power the bulb.",
            "Open loops attract too many bayou fish.",
            "Electricity only flows through empty plastic tubes.",
            "Unbroken loops make the battery weigh zero grams."
          ],
          "answer": 0,
          "hint": "Electricity can only flow when the circuit loop is 100% closed!"
        },
        {
          "q": "What happens immediately if an electrician snips one wire in a simple lighting circuit with wire cutters?",
          "options": [
            "An open circuit is created, current stops flowing, and the light immediately turns off.",
            "The light bulb explodes with double the brightness.",
            "Electricity jumps through the air like lightning across the entire room.",
            "The battery turns into solid copper."
          ],
          "answer": 0,
          "hint": "Cutting a wire creates a gap (open circuit), which blocks electric current!"
        },
        {
          "q": "Why are marine electrical cables coated in thick rubber instead of left as bare copper wire?",
          "options": [
            "Rubber is an insulator that prevents electric shocks and protects against short circuits.",
            "Rubber conducts electricity five times faster than copper.",
            "Rubber makes the wires magnetic.",
            "Rubber makes the wires dissolve in saltwater."
          ],
          "answer": 0,
          "hint": "Rubber insulates the wire, keeping electricity contained safely inside!"
        }
      ],
      "explore": [
        {
          "q": "Kelenna connects four items into a circuit tester gap: an iron nail, a plastic straw, an aluminum foil strip, and a wooden craft stick. Which TWO items will make the test bulb glow?",
          "options": [
            "The iron nail and the aluminum foil strip (because metals are electrical conductors).",
            "The plastic straw and the wooden stick.",
            "Only the plastic straw.",
            "None of them, because only water conducts electricity."
          ],
          "answer": 0,
          "hint": "Metals like iron and aluminum are great electrical conductors!"
        },
        {
          "q": "When a metal spoon is left in a hot bowl of chicken noodle soup, why does the spoon handle become hot to the touch after several minutes?",
          "options": [
            "Metal is an excellent thermal conductor that transfers heat energy rapidly from the soup to the handle.",
            "The spoon creates brand new fire from inside the metal.",
            "The spoon is an electrical insulator that traps coldness.",
            "Soup turns metal into liquid."
          ],
          "answer": 0,
          "hint": "Metals conduct thermal heat energy quickly through their particles!"
        },
        {
          "q": "What is the primary function of a mechanical switch in an electrical circuit?",
          "options": [
            "To easily open (stop current) or close (allow current) the circuit pathway.",
            "To add more mass to the battery.",
            "To change the color of the copper wires.",
            "To turn electrical energy into nuclear energy."
          ],
          "answer": 0,
          "hint": "A switch acts like a drawbridge that opens and closes the loop!"
        }
      ],
      "explain": [
        {
          "q": "From first principles, what makes a material an electrical conductor?",
          "options": [
            "It has free electrons that permit electric charges to flow through it easily.",
            "It blocks all electric charges from moving.",
            "It is always made of green plastic.",
            "It only works when frozen in ice."
          ],
          "answer": 0,
          "hint": "Conductors allow electric charges to travel freely!"
        },
        {
          "q": "Why are cooking pots made of metals like aluminum and stainless steel, while the pot handles are wrapped in silicone or wood?",
          "options": [
            "Metal conducts thermal heat quickly to cook food, while silicone and wood insulate handles to protect hands from burns.",
            "Silicone handles conduct electricity to shock germs.",
            "Metal pots are insulators that keep food cold.",
            "Wood handles make the pots float in the air."
          ],
          "answer": 0,
          "hint": "Metal conducts heat to the food; wood and silicone insulate hands from burns!"
        },
        {
          "q": "Which energy transformations occur when a closed circuit powers an incandescent light bulb?",
          "options": [
            "Electrical energy transforms into radiant light energy and thermal (heat) energy.",
            "Light energy transforms into chemical battery acid.",
            "Sound energy turns into nuclear gravity.",
            "Zero energy transformation occurs."
          ],
          "answer": 0,
          "hint": "The glowing bulb produces both bright light and warm heat!"
        }
      ],
      "vocab": [
        {
          "q": "What is an uninterrupted, complete electrical pathway through which current can flow called?",
          "options": [
            "A closed circuit",
            "An open circuit",
            "A thermal insulator",
            "A friction balance"
          ],
          "answer": 0,
          "hint": "No gaps means current can complete its loop!"
        },
        {
          "q": "A material that strongly resists or blocks the flow of electric current and heat is called an:",
          "options": [
            "Insulator",
            "Conductor",
            "Electrolyte",
            "Atom"
          ],
          "answer": 0,
          "hint": "Rubber, plastic, and glass are examples of this!"
        },
        {
          "q": "The form of energy associated with the rapid motion of jiggling particles that we experience as heat is called:",
          "options": [
            "Thermal energy",
            "Magnetism",
            "Relative density",
            "Gravity"
          ],
          "answer": 0,
          "hint": "This heat energy is measured in degrees Celsius!"
        }
      ]
    },
    "elaborate": {
      "title": "Dunbar Middle School Bayou Weather Beacon Circuit",
      "scenario": "During severe coastal flooding, the Dickinson Emergency Management Center requires Dunbar science students to design an autonomous multi-stage weather beacon circuit for bayou navigation docks.",
      "goalDescription": "Design a closed circuit with an automatic float switch, solar-charged battery, high-efficiency LED beacon, and protective thermal insulation that operates reliably when submerged in brackish water.",
      "criteria": [
        "Criterion 1: Circuit must utilize marine-grade copper conductors (gauge 14) with silicone rubber waterproof insulation.",
        "Criterion 2: Float switch must close the circuit loop when water rises above 1.5 meters, activating both light and audible acoustic buzzer signals.",
        "Criterion 3: Include a thermal test verifying that insulated electronic housings do not exceed 45°C during continuous 24-hour operation."
      ],
      "successFeedback": "Outstanding engineering! Your autonomous bayou beacon closed the circuit reliably during high water, providing crystal-clear navigation light and acoustic warnings to keep Dickinson boaters safe!"
    },
    "evaluate": [
      {
        "id": "q1",
        "type": "single",
        "prompt": "A student builds a simple circuit with a D-cell battery, two copper wires, a light bulb, and a knife switch. When the knife switch is open (handle lifted up), the bulb does NOT light up. What causes the bulb to remain dark?",
        "options": [
          {
            "id": "a",
            "text": "The open switch creates a physical gap in the circuit, preventing electric current from completing the loop."
          },
          {
            "id": "b",
            "text": "The copper wires absorbed all the electricity and turned into glass."
          },
          {
            "id": "c",
            "text": "The battery ran out of chemical energy the instant the switch was opened."
          },
          {
            "id": "d",
            "text": "Light bulbs only produce light when placed inside water."
          }
        ],
        "answer": "a",
        "explanation": "Electricity requires an uninterrupted, continuous pathway (closed circuit). An open switch introduces a gap, blocking electric current flow."
      },
      {
        "id": "q2",
        "type": "multiselect",
        "prompt": "A science teacher provides a circuit tester with two exposed alligator clips. Which TWO materials will complete the circuit and make the tester light glow when clipped into the circuit? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "A clean copper penny"
          },
          {
            "id": "b",
            "text": "A steel paperclip"
          },
          {
            "id": "c",
            "text": "A plastic drinking straw"
          },
          {
            "id": "d",
            "text": "A wooden popsicle stick"
          },
          {
            "id": "e",
            "text": "A rubber pencil eraser"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "Copper and steel are metals, which are excellent electrical conductors. Plastic, wood, and rubber are electrical insulators that block current."
      },
      {
        "id": "q3",
        "type": "multipart",
        "promptA": "Part A: A student tests two mystery rods in a circuit tester. When Rod X is inserted, the test bulb glows brightly. When Rod Y is inserted, the bulb remains dark. What conclusion is best supported?",
        "optionsA": [
          {
            "id": "a",
            "text": "Rod X is an electrical conductor, and Rod Y is an electrical insulator."
          },
          {
            "id": "b",
            "text": "Rod X is an insulator, and Rod Y is a conductor."
          },
          {
            "id": "c",
            "text": "Both rods are insulators made of plastic."
          },
          {
            "id": "d",
            "text": "Both rods are conductors made of pure silver."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Which materials could Rod X and Rod Y be made of?",
        "optionsB": [
          {
            "id": "a",
            "text": "Rod X could be aluminum, and Rod Y could be wood."
          },
          {
            "id": "b",
            "text": "Rod X could be rubber, and Rod Y could be copper."
          },
          {
            "id": "c",
            "text": "Rod X could be glass, and Rod Y could be steel."
          },
          {
            "id": "d",
            "text": "Both rods must be made of sea salt."
          }
        ],
        "answerB": "a",
        "explanation": "Conductors (like aluminum metal) allow current to flow and light the bulb. Insulators (like wood) block current, keeping the bulb dark."
      },
      {
        "id": "q4",
        "type": "inlinechoice",
        "prompt": "Complete the statement regarding electrical wiring using the drop-down menus:",
        "segments": [
          {
            "text": "The metal core of a household electrical cord is made of copper because copper is an "
          },
          {
            "blankId": "b1",
            "options": [
              "electrical conductor that allows electric current to flow easily",
              "electrical insulator that stops current from moving",
              "organic substance that dissolves in water"
            ],
            "answer": "electrical conductor that allows electric current to flow easily"
          },
          {
            "text": ", while the outer jacket is made of flexible plastic or rubber because it is an "
          },
          {
            "blankId": "b2",
            "options": [
              "electrical insulator that prevents electric shocks and protects people",
              "electrical conductor that radiates high voltage",
              "optical prism that bends sunlight"
            ],
            "answer": "electrical insulator that prevents electric shocks and protects people"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Cords utilize metal conductors inside to transmit electrical energy efficiently, and rubber/plastic insulators outside to protect users from electric shock."
      },
      {
        "id": "q5",
        "type": "dragsort",
        "prompt": "Classify each material into electrical conductors or electrical insulators:",
        "categories": [
          {
            "id": "cond",
            "label": "Electrical Conductor (Allows Current)"
          },
          {
            "id": "insul",
            "label": "Electrical Insulator (Blocks Current)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Solid iron dock nail",
            "category": "cond"
          },
          {
            "id": "i2",
            "label": "Rubber bicycle inner tube",
            "category": "insul"
          },
          {
            "id": "i3",
            "label": "Aluminum foil baking sheet",
            "category": "cond"
          },
          {
            "id": "i4",
            "label": "Glass marble",
            "category": "insul"
          }
        ],
        "explanation": "Metals (iron, aluminum) are electrical conductors that facilitate current flow. Non-metals (rubber, glass) are electrical insulators that restrict current flow."
      },
      {
        "id": "q6",
        "type": "single",
        "prompt": "A student places three identical spoons—one made of solid silver (metal), one made of wood, and one made of plastic—into a mug of freshly boiled water (95°C). After three minutes, which spoon handle will feel the HOTTEST to the touch?",
        "options": [
          {
            "id": "a",
            "text": "The silver spoon, because metals are excellent thermal conductors that transfer heat rapidly."
          },
          {
            "id": "b",
            "text": "The wooden spoon, because wood is a thermal conductor."
          },
          {
            "id": "c",
            "text": "The plastic spoon, because plastic creates new heat energy."
          },
          {
            "id": "d",
            "text": "All three spoon handles will stay freezing cold."
          }
        ],
        "answer": "a",
        "explanation": "Metals like silver are exceptional thermal conductors. Heat from the hot water rapidly transfers through the metal spoon up to the handle via thermal conduction."
      },
      {
        "id": "q7",
        "type": "multiselect",
        "prompt": "When an electrical toaster is plugged into a wall outlet and pushed down to toast bread, which TWO forms of output energy are produced? (Select TWO correct answers.)",
        "options": [
          {
            "id": "a",
            "text": "Thermal energy (heat that toasts the bread)"
          },
          {
            "id": "b",
            "text": "Radiant light energy (glowing red heating coils)"
          },
          {
            "id": "c",
            "text": "Nuclear energy from atomic fission"
          },
          {
            "id": "d",
            "text": "Gravitational energy that pulls the room down"
          },
          {
            "id": "e",
            "text": "Chemical energy that turns metal into gold"
          }
        ],
        "answers": [
          "a",
          "b"
        ],
        "explanation": "An electric toaster transforms electrical energy into thermal energy (high heat that toasts bread) and radiant light energy (visible glowing orange-red coils)."
      },
      {
        "id": "q8",
        "type": "multipart",
        "promptA": "Part A: Two light bulbs are wired in a single continuous loop (series circuit) with a battery. What happens if one bulb is unscrewed from its socket?",
        "optionsA": [
          {
            "id": "a",
            "text": "The second bulb immediately turns off because the circuit pathway is broken (opened)."
          },
          {
            "id": "b",
            "text": "The second bulb becomes ten times brighter."
          },
          {
            "id": "c",
            "text": "The battery explodes with cold air."
          },
          {
            "id": "d",
            "text": "The unscrewed bulb continues floating and glowing."
          }
        ],
        "answerA": "a",
        "promptB": "Part B: Which statement best explains your answer to Part A?",
        "optionsB": [
          {
            "id": "a",
            "text": "Electricity in a series circuit has only one path to follow; unscrewing a bulb creates an air gap that halts current flow through the entire loop."
          },
          {
            "id": "b",
            "text": "Unscrewing a bulb destroys the battery’s mass."
          },
          {
            "id": "c",
            "text": "The wires turn into rubber insulators when touched."
          },
          {
            "id": "d",
            "text": "Electricity prefers only odd numbers of light bulbs."
          }
        ],
        "answerB": "a",
        "explanation": "In a single-loop series circuit, every component is part of the sole conductive path. Removing any component breaks the circuit, creating an open circuit that stops all current."
      },
      {
        "id": "q9",
        "type": "inlinechoice",
        "prompt": "Complete the statement regarding electrical switches using the drop-down menus:",
        "segments": [
          {
            "text": "When a wall light switch is flipped to the ON position, it "
          },
          {
            "blankId": "b1",
            "options": [
              "closes the circuit loop, allowing electric current to flow to the lights",
              "opens the circuit loop, creating an air gap",
              "destroys the electrical wires in the walls"
            ],
            "answer": "closes the circuit loop, allowing electric current to flow to the lights"
          },
          {
            "text": ", and when flipped to OFF, it "
          },
          {
            "blankId": "b2",
            "options": [
              "opens the circuit loop, stopping electric current from flowing",
              "multiplies the voltage by fifty times",
              "turns copper into aluminum"
            ],
            "answer": "opens the circuit loop, stopping electric current from flowing"
          },
          {
            "text": "."
          }
        ],
        "explanation": "Turning a switch ON closes the contact (unbroken loop), allowing current flow. Turning a switch OFF opens the contact (gap), interrupting current flow."
      },
      {
        "id": "q10",
        "type": "dragsort",
        "prompt": "Classify each everyday object into good thermal conductors or good thermal insulators:",
        "categories": [
          {
            "id": "cond",
            "label": "Good Thermal Conductor (Transfers Heat Quickly)"
          },
          {
            "id": "insul",
            "label": "Good Thermal Insulator (Slows Heat Transfer)"
          }
        ],
        "items": [
          {
            "id": "i1",
            "label": "Cast iron frying skillet",
            "category": "cond"
          },
          {
            "id": "i2",
            "label": "Thick foam winter coat insulation",
            "category": "insul"
          },
          {
            "id": "i3",
            "label": "Aluminum cookie baking sheet",
            "category": "cond"
          },
          {
            "id": "i4",
            "label": "Styrofoam coffee cup",
            "category": "insul"
          }
        ],
        "explanation": "Cast iron and aluminum are metals that conduct heat quickly. Foam and styrofoam contain trapped air pockets that insulate and drastically slow heat transfer."
      },
      {
        "id": "q11",
        "type": "single",
        "prompt": "Electric utility technicians repairing high-voltage electrical lines along Dickinson streets wear thick rubber boots and heavy rubber gloves. Why is rubber chosen for their protective safety gear?",
        "options": [
          {
            "id": "a",
            "text": "Rubber is an exceptional electrical insulator that prevents lethal electric current from flowing into their bodies."
          },
          {
            "id": "b",
            "text": "Rubber is magnetic and attracts electric wires."
          },
          {
            "id": "c",
            "text": "Rubber conducts current directly into the earth safely."
          },
          {
            "id": "d",
            "text": "Rubber makes technicians lighter so they don’t fall."
          }
        ],
        "answer": "a",
        "explanation": "Rubber has extremely high electrical resistance (insulator). It blocks electric current from passing through technician gear, protecting workers from electrocution."
      },
      {
        "id": "q12",
        "type": "single",
        "prompt": "A science student examines four diagrams of circuits containing a battery, a light bulb, and wires. Which diagram represents a circuit where the light bulb will GLOW?",
        "options": [
          {
            "id": "a",
            "text": "A continuous, unbroken wire loop connecting the positive terminal of the battery, through the bulb filament, back to the negative terminal."
          },
          {
            "id": "b",
            "text": "A circuit where the wire is cut in half with a 2-inch air gap between the battery and the bulb."
          },
          {
            "id": "c",
            "text": "A circuit where both wires are attached only to the positive terminal of the battery and none to the negative terminal."
          },
          {
            "id": "d",
            "text": "A circuit where the bulb is connected with dry cotton string instead of metal wire."
          }
        ],
        "answer": "a",
        "explanation": "A light bulb will only illuminate in a complete closed circuit where conductors connect from the positive power terminal, through the lamp load, and return to the negative terminal without gaps."
      }
    ]
  }
];
