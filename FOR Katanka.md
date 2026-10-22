# FOR Katanka: Building Kelenna's 4th Grade 3D Science Lab (Dunbar Middle School)

## 1. The Big Picture

Imagine trying to learn how the Moon changes phases, why a 5,000-kilogram steel buoy floats in Galveston Bay while a tiny bolt sinks, or how Dickinson Bayou carves sediment into a coastal delta—just by staring at flat 2D textbook diagrams. Flat pictures force a 4th grader to mentally reconstruct 3D motion, forces, and time.

**Kelenna's 4th Grade Science 3D Master Suite** turns the entire **Dickinson ISD / Dunbar Middle School Grade 4 Science curriculum (`19 TAC §112.6`)** into an interactive, Pixar-meets-STEMscopes 3D laboratory that runs smoothly on both **Kelenna's Chromebook (in Chrome)** and his **iPhone 15 (in iOS Safari)**.

Think of the architecture like a **Universal Movie Studio Backlot**:
- Instead of building 12 separate theaters (which would crash an iPhone's memory), we built **one high-tech soundstage (`StageManager`)** with studio lighting, cameras on robotic tracks (`MasterTimeline`), and a sound booth (`AudioEngine`).
- Whenever Kelenna picks one of the 12 TEKS lessons, the stage crew wheels out the old 3D props, recycles the memory, and sets up the new 3D lab bench in milliseconds!

---

## 2. Technical Architecture

```
+-------------------------------------------------------------------------+
|                    DUAL-DEVICE ADAPTIVE UI SHELL                        |
|   • Chromebook (≥900px): Widescreen 3D + Docked Right Lab Panel         |
|   • iPhone 14/15 (<900px): 100dvh Safe-Area + Collapsible Bottom Sheet  |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                     CORE 3D & MEDIA ENGINE (`src/engine/`)              |
|  ┌────────────────────┐  ┌────────────────────┐  ┌───────────────────┐  |
|  │   StageManager     │  │   MasterTimeline   │  │    AudioEngine    │  |
|  │ • WebGL 2.0        │  │ • 45s Engage Movie │  │ • iOS Unlock      │  |
|  │ • TouchArbitrator  │  │ • 60s Explain Tour │  │ • SpeechSynthesis │  |
|  │ • Memory Disposal  │  │ • 3D Callout Pins  │  │ • Web Audio SFX   │  |
|  └────────────────────┘  └────────────────────┘  └───────────────────┘  |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|              12 TEKS 3D MODULES & 60 STAAR 2.0 QUESTIONS                |
|   • Unit 1 (4.6A–C): Matter Properties, Mixtures & Conservation         |
|   • Unit 2 (4.7A, 4.8A–C): Forces, Waves, Collisions & Circuits         |
|   • Unit 3 (4.9A–B, 4.10A–C, 4.11A–C): Space, Weather, WED & Resources  |
|   • Unit 4 (4.12A–C, 4.13A–B): Ecosystems, Stomata & Bio-Mechanics      |
+-------------------------------------------------------------------------+
```

### Why We Designed It This Way
1. **Modular Source + Single-File Bundler (`build-artifact.mjs`):**
   - Writing 12 complex 3D simulations inside one giant file makes maintenance a nightmare and forces AI generators to cut corners. By separating the project into clean ES6 modules and using `build-artifact.mjs` to compile `dist/kelenna-science-3d-suite.html` (512 KB), we get both clean engineering *and* a one-file portable artifact.
2. **Deterministic Timeline over Speech Events:**
   - On iOS Safari, `SpeechSynthesisUtterance` events often drop or pause if the hardware mute switch is flipped. By driving camera motion and 3D callouts from a 60 FPS `MasterTimeline` clock rather than waiting for speech callbacks, the 3D video never freezes.

---

## 3. Codebase Structure

- `index.html` & `manifest.json`: Responsive PWA entry point with iPhone 14/15 `viewport-fit=cover` safe-area support.
- `src/styles/lab-theme.css`: Clean Academic Lab stylesheet inspired by STEMscopes and McGraw-Hill Texas Science.
- `src/engine/ProceduralTextures.js`: Generates high-resolution HTML5 Canvas textures (wood grain, brushed metal, Earth continents with a Dickinson TX pin, lunar craters, sedimentary rock strata, and 3D floating label sprites) with zero external image dependencies.
- `src/engine/AudioEngine.js`: Manages single-tap iOS audio unlocking, natural voice selection, and procedural Web Audio sound effects (`chime`, `splash`, `magnet`, `spark`, `thud`, `whoosh`, `success`).
- `src/engine/MasterTimeline.js`: Interpolates 3D camera keyframes (`lerpVectors` + smoothstep easing), updates subtitles, and triggers 3D spotlight rings.
- `src/engine/StageManager.js`: Manages the Three.js `WebGLRenderer`, 3-point studio lighting, `TouchArbitrator` (locking camera orbit when dragging 3D objects), Chromebook `AdaptiveDPR` auto-scaling, and GPU memory cleanup.
- `src/data/curriculum_u1_u2.js` & `src/data/curriculum_u3_u4.js`: All 12 modules' 5E scripts, "I Can" mastery statements, local Dickinson TX phenomena, vocabulary flashcards, and 60 STAAR 2.0 questions.
- `src/modules/unit1_2_modules.js`, `src/modules/unit3_modules.js`, `src/modules/unit4_modules.js`: The 12 interactive Three.js 3D laboratories.
- `build-artifact.mjs`: Compiles the entire suite into `dist/kelenna-science-3d-suite.html`.

---

## 4. Technologies Used

- **Three.js (r128 WebGL 2.0):** Real-time 3D rendering, PBR materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`), soft shadow mapping, and raycasting.
- **HTML5 2D Canvas API:** Generates procedural PBR textures and dynamic 3D HUD sprites in memory so no external `.png` or `.jpg` files can ever fail to load.
- **Web Audio API & Web Speech API:** Synthesizes sound effects mathematically using oscillators/noise filters and narrates lessons aloud with zero `.mp3` bloat.
- **CSS Grid/Flexbox + Dynamic Viewport Units (`100dvh`):** Adapts seamlessly between a widescreen Chromebook and an iPhone 15.

---

## 5. The Journey (Bugs & Fixes)

### Bug 1: Node.js Test Harness UMD Scope vs. Browser Global for `three.min.js`
- **Symptom:** When running our automated 12-module execution test in Node.js (`Loaded THREE r...`), Node threw `ReferenceError: THREE is not defined`.
- **Root Cause:** `three.min.js` uses a UMD wrapper (`typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : ...`). Inside Node's environment, UMD detected `exports` and attached Three.js exports to the CommonJS `exports` object rather than `global.THREE`.
- **Diagnosis & Fix:** We passed an explicit `{ exports: {} }` receiver into the sandboxed `Function` constructor so `THREE` was captured deterministically, enabling automated verification of all 12 3D modules in Node.
- **Lesson Learned:** UMD bundles behave differently in Node vs. browser globals; always pass explicit module/exports containers when testing browser UMD scripts headlessly.

### Bug 2: Canvas `ctx.roundRect()` & `ctx.clip()` Compatibility
- **Symptom:** During headless verification of Module 3.2 (`TEKS 4.9B` Lunar Phases Telescope Viewport), `drawTelescopeMoon` invoked `moonCtx.clip()`, and `ProceduralTextures.js` invoked `ctx.roundRect()`.
- **Root Cause:** While modern iOS 17/18 and Chrome support `ctx.roundRect()`, older browsers or minimal canvas contexts may omit it.
- **Fix:** Added a `drawRoundRect` helper fallback (`typeof ctx.roundRect === 'function' ? ctx.roundRect(...) : ctx.rect(...)`) in `ProceduralTextures.js` and verified full 2D context methods across all procedural textures.

### Bug 3: Blurry 3D Label Sprites (`THREE.CanvasTexture` Mipmap Filtering)
- **Symptom:** In the first screenshot of the 3D scene (`Macro Beaker (1x Scale)` and `10,000x Molecular Magnifier`), the floating 3D labels looked soft and slightly blurry compared to native UI text.
- **Root Cause:** Three.js defaults `CanvasTexture.minFilter` to `THREE.LinearMipmapLinearFilter`. When WebGL generates power-of-two mipmap pyramids for a non-square text banner (`512×112`) viewed at an angle, trilinear interpolation blends adjacent mip levels and smears fine text edges.
- **Diagnosis & Fix:** In `ProceduralTextures.js` (`labelSprite()`), we doubled the canvas resolution to `1024×280` (2x Retina supersampling) and explicitly set `texture.generateMipmaps = false`, `texture.minFilter = THREE.LinearFilter`, and `texture.magFilter = THREE.LinearFilter`.
- **Lesson Learned:** Never use mipmapping on 2D/3D text sprites in WebGL; always pair 2x supersampled canvas dimensions with `THREE.LinearFilter` and `generateMipmaps = false` for razor-sharp text.

---

## 6. Lessons Learned

1. **Touch Arbitration Is Mandatory for Mobile 3D:** If you attach both `OrbitControls` and a 3D drag `Raycaster` to the same canvas on an iPhone, dragging a 3D magnet will spin the entire room around. Checking raycaster intersections *first* on `pointerdown` and suppressing orbit until `pointerup` makes touch manipulation feel natural.
2. **Dispose GPU Buffers Religiously:** Every `Geometry`, `Material`, and `Texture` in Three.js lives in unmanaged GPU memory until `.dispose()` is called. Our recursive `_disposeHierarchy()` method in `StageManager.js` ensures Kelenna can switch between all 12 modules indefinitely on his iPhone 15 without hitting WebKit's memory limit.
