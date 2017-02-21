# Sprite Framework Demo

Very much a WIP. Not supported on Microsoft IE or older mobile browsers.

---

[See it live here] (https://clairemation.github.io/projects/tpv2/spritedemo.html).

Move around using the arrow keys or by sliding a finger on the touch screen in the desired direction. 

(If you want to download and run it yourself, it needs to be served over HTTP; COR issues in the canvas will not allow it to run via the file:// protocol.)

Or check out the [lighting test] (http://clairemation.github.io/projects/tpv2/tests/lightingtest.html).

---

Graphics (such as they are) by me. Uses no third-party frameworks, engines, or libraries.

## Features:

- Sprite animation
- Touch and keyboard controls for desktop and mobile
- Dynamic cel-shaded lighting on main character
- Parallax scrolling
- Smooth, 8-directional movement
- Natural physics including inertia and collision
- Subtle UI touches like wall "sliding"

## Techniques:

- Compositional architecture
- Finite State Machines
- Phong shading using normal maps
- Vector-based position calculation
- AABB-based collision detection
- Time-based animation
- Spritesheets

## TODO:

- Modular build pipeline using Browserify or gulp
- Rewrite view operations using WebGL
- Add sound
- Data & event scripting schema
- ...
