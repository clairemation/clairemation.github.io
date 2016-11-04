# Sprite Engine Demo

11/3/16 -- Whoah, that just got REAL slow with lighting and everything else running at the same time

Very much a WIP. Not supported on Microsoft IE or iPhone. Works on iPad.

---

[Live here] (https://clairemation.github.io/projects/tpv2/spritedemo.html).

<!-- If you want to run it yourself, it needs to be served over HTTP; COR issues in the canvas will not allow it to run via the file:// protocol.

Use your favorite server, or in the Terminal, navigate to the root (tpv2) directory and type 'python -m SimpleHTTPServer'. Then in your browser go to localhost at the port # indicated (probably http://localhost:8000). Click spritedemo.html or the lighting test in the test folder. Go to Terminal and Control-C when done. -->


---

Graphics (temp) by me. Uses no third-party frameworks, engines, or libraries.

## Features:

- Sprite animation
- Dynamic cel-shaded lighting
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

## Immediate TODOs:

- Lighting needs to drop off over distance