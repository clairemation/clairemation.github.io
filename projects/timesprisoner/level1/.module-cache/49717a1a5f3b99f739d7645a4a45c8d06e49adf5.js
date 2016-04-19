function Level(args) {
  this.number = args.number;
  this.title = args.title;
  this.baseMap = args.baseMap;
  this.bg = args.bg;
  this.musicFiles = args.musicFiles;
}

function Env(args){
  this.totalCrystals = args.totalCrystals;
  this.message = "";
  this.running = false;
  this.beginning = true;
  this.currentTrack = args.musicFiles.intro;
  this.musicState = "autoplay"
}


function Sprite(args) {
  this.image = args.image;
  this.x = args.x;
  this.y = args.y;
  this.visible = args.visible;
}

var level1 = new Level({
  number: 1,
  title: "Precambrian Era",
  musicFiles: {
    intro: "music/On_the_Shore.mp3",
    stage: "music/Phantom_from_Space.mp3"
  },
  bg: "imgs/lava-flow-magma-wide-hd-wallpaper-free-desktop-free-for-desktop-background.jpg",
  totalCrystals: 3,
  baseMap: [
  // 0         1         2
  // 0123456789012345678901234
    "######################   ".split(""),
    "#  #  #  #  #  #  #  #   ".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "################  #######".split(""),
    "#  #     #  #  #  #  #  #".split(""),
    "#  #     #  #  #  #  ####".split(""),
    "####  #  ##########  #  #".split(""),
    "      #           #  #  #".split(""),
    "      #  #        #  #  #".split(""),
    "########## ########  #   ".split(""),
    "#  #       #   #  #  #   ".split(""),
    "#          #   #  #      ".split(""),
    "#########################".split(""),
  ]
});

// var env = new Env({
//   totalCrystals: 0,
//   message: "",
//   running: false,
//   beginning: true,
// });

var hero = new Sprite({
  image: '<div id="hero">&#9880;</div>',
  y: 12,
  x: 24,
  visible: true
});

var crystals = [
  new Sprite({
    image: '&#10053;',
    y: 9,
    x: 7,
    visible: true
  }),
  new Sprite({
    image: '&#10053;',
    y: 10,
    x: 21,
    visible: true
  }),
  new Sprite({
    image: '&#10053;',
    y: 0,
    x: 0,
    visible: true
  })
]

var lava = {
  image: '#',
  currentFrame: 0,
  frames: [ //# are lava tiles on the map. They shift in a 12-frame cycle
        [//frame0---------------------
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                       ##".split(""),
        "#                        ".split(""),
        "                         ".split(""),
        "   ##                    ".split(""),
        "    ##                   ".split(""),
        "     ##                  ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        ],

        [//frame1-------
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        " #                      #".split(""),
        "###                      ".split(""),
        " #                       ".split(""),
        "     ##                  ".split(""),
        "      ##                 ".split(""),
        "       ##                ".split(""),
        "                         ".split(""),
        ],

        [//frame2
        "   ##                    ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "    #                    ".split(""),
        "   ###                   ".split(""),
        "    #                    ".split(""),
        "       ##                ".split(""),
        "        ##               ".split(""),
        "         ##              ".split(""),
        ],

        [//frame3
        "     ##                  ".split(""),
        "     ##                  ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "      #                  ".split(""),
        "     ###                 ".split(""),
        "      #                  ".split(""),
        "        ##               ".split(""),
        "         ##              ".split(""),
        ],

        [//frame4
        "                         ".split(""),
        "       ##                ".split(""),
        "       ##                ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "        #                ".split(""),
        "       ###               ".split(""),
        "        #                ".split(""),
        "          ##             ".split(""),
        ],

        [//frame5
        "                         ".split(""),
        "                         ".split(""),
        "         ##              ".split(""),
        "         ##              ".split(""),
        "#                        ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "          #              ".split(""),
        "         ###             ".split(""),
        "          #              ".split(""),
        ],

        [//frame6
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "           ##            ".split(""),
        "           ##            ".split(""),
        " ##                      ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "            #            ".split(""),
        "           ###           ".split(""),
        ],

        [//frame7
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "             ##          ".split(""),
        "             ##          ".split(""),
        "   ##                    ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "             #           ".split(""),
        ],

        [//frame8
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "               ##        ".split(""),
        "               ##        ".split(""),
        "     ##                  ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        ],

        [//frame9
        "             ##          ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                 ##      ".split(""),
        "                 ##      ".split(""),
        "       ##                ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        ],

        [//frame10
        "                         ".split(""),
        "               ##        ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                   ##    ".split(""),
        "                   ##    ".split(""),
        "         ##              ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        ],

        [//frame11
        "                         ".split(""),
        "                         ".split(""),
        "                 ##      ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "#                        ".split(""),
        "                     ##  ".split(""),
        "                     ##  ".split(""),
        "           ##            ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        ],

        [//frame12
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                   ##    ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "#                        ".split(""),
        "##                       ".split(""),
        " ##                      ".split(""),
        "                       ##".split(""),
        "                       ##".split(""),
        "             ##          ".split(""),
        "                         ".split(""),
        ],

        [//frame13
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        "                     ##  ".split(""),
        "                         ".split(""),
        "                         ".split(""),
        " ##                      ".split(""),
        "  ##                     ".split(""),
        "   ##                    ".split(""),
        "                        #".split(""),
        "                        #".split(""),
        "               ##        ".split(""),
        ]
      ]
}; //end lava

