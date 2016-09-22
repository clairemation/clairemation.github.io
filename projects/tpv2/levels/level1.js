level = {

  number: 1;
  name: 'Hadean Era',

  background: [

    {image: x, parallax: .2},

    {image: y, parallax: 1}

  ],

  entities: [

    {
      name: 'hero',
      class: 'Player',

      sprite: {
        standing: {
          N: {
            frames: [0],
            spritesheet: images.heroStandingLeft
          },
          NW: {
            frames: [0],
            spritesheet: images.heroStandingLeft
          },
          W: {
            frames: [0],
            spritesheet: images.heroStandingLeft
          },
          SW: {
            frames: [0],
            spritesheet: images.heroStandingLeft
          },
          S: {
            frames: [0],
            spritesheet: images.heroStandingRight
          },
          SE: {
            frames: [0],
            spritesheet: images.heroStandingRight
          },
          E: {
            frames: [0],
            spritesheet: images.heroStandingRight
          },
          NE: {
            frames: [0],
            spritesheet: images.heroStandingRight
          },
        },
        running: {
          N: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunLeft
          },
          NW: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunLeft
          },
          W: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunLeft
          },
          SW: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunLeft
          },
          S: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunRight
          },
          SE: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunRight
          },
          E: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunRight
          },
          NE: {
            frames: [0,1,2,3],
            spritesheet: images.heroRunRight
          }
        },
        slashing: {
          N: {
            frames: [0],
            spritesheet: images.heroSlashLeft
          },
          NW: {
            frames: [0],
            spritesheet: images.heroSlashLeft
          },
          W: {
            frames: [0],
            spritesheet: images.heroSlashLeft
          },
          SW: {
            frames: [0],
            spritesheet: images.heroSlashLeft
          },
          S: {
            frames: [0],
            spritesheet: images.heroSlashRight
          },
          SE: {
            frames: [0],
            spritesheet: images.heroSlashRight
          },
          E: {
            frames: [0],
            spritesheet: images.heroSlashRight
          },
          NE: {
            frames: [0],
            spritesheet: images.heroSlashRight
          }
        }
      }

    }


  ]

}