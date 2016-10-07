# Sprite Engine Demo

Very much a WIP, very messy, there is surely editing detritus all over the place. Not supported on Microsoft IE.

Works out of the box, or see it [live here] (https://clairemation.github.io/projects/tpv2/spritedemo.html).

Graphics (temp) by me. Uses no third-party frameworks, engines, or libraries. I may eventually use some libs like bezier.js to help with the math, though, since this is a learning exercise for me, I want to do as much as I can by myself.

## Features:

- Sprite animation
- Parallax scrolling
- Smooth, 8-directional movement
- Natural physics including inertia and collision
- Subtle UI touches like wall "sliding"

## Techniques:

- Compositional architecture
- Finite State Machines
- (Some) vector-based position calculation
- AABB-based collision detection
- Time-based animation
- Spritesheets

##TODO:

- Convert all motion physics to a simpler & more versatile vector-based model
- Use paths instead of bitmaps to describe terrain boundaries
- Implement touch-based controls
- Clean up file structure

## Someday:

- Dynamic lighting using normal maps
- Other spiffy graphical polishes