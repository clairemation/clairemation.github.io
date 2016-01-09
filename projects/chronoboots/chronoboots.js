// environment variables-----------------------------------------
var totalCrystals = 3;
var message = "";
var running = false;
var beginning = 1;
var musicPaused = true;

// map--------------------------------------------------

var map = {

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
  ],

}


var createHtmlMap = function() {

 //make rows
  for (var i = 0; i < map.baseMap.length; i++) {
    var row = document.createElement("TR");
    document.getElementById("field").appendChild(row);

    //make cells inside each row
    for (var j = 0; j < map.baseMap[0].length; j++) {
      var cell = document.createElement("TD");
      document.getElementById("field").rows[i].appendChild(cell);
    }
  }

  for (var y in map.baseMap) {
    for (var x in map.baseMap[y]) {
      if (map.baseMap[y][x] == "#") {
        document.getElementById("field").rows[y].cells[x].setAttribute("class", "path");
      }
    }
  }

} //end createHtmlMap


// world objects----------------------------------------------

var ampersand = { //so called because she used to be a '&'
  image: '<div id="hero">&#9880;</div>', //ASCII 'sprite'
  y: 12,
  x: 24
}

var lava = {
  image: '#',
  currentFrame: 0,
  frames: [ //# are lava tiles on the map. They shift in a 3-frame cycle
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
      ],

  drawLava: function() {
    frameToDraw = this.frames[this.currentFrame];
    for (var y in frameToDraw) {
      for (var x in frameToDraw[y]) {
        if (frameToDraw[y][x] == "#") {
          document.getElementById("field").rows[y].cells[x].innerHTML = "<div class='flame'> </div>";
        }
      }
    }
  },
} //end lava

var crystals = {
  image: '&#10053;',
  coords: [
    {y: 9, x: 7, visible: true},
    {y: 10, x: 21, visible: true},
    {y: 0, x:0, visible: true},
        ]
}


// functions---------------------------------------------------------------------

function begin() {
  document.getElementById("title").id = "closingTitle";
  setTimeout(function(){
    document.getElementById("closingTitle").id = "closedTitle";
  }, 500)

}

function displayWindow(window) {
  document.getElementsByTagName("footer")[0].style.visibility = "hidden";
  clearInterval(tick);
  clearField();
  running = false;
  document.getElementById("shade").style.display = "block";
  document.getElementById(window).style.display = "block";
}

function closeWindow(window) {
  document.getElementsByTagName("footer")[0].style.visibility = "visible";
  document.getElementById("shade").style.display = "none";
  document.getElementById(window).style.display = "none";
  placeObjects();
  running = true;
  tick = setInterval(function() {advanceFrame();}, 200);
}

var closeInstructions = function() {
  closeWindow('instructions');

  //if beginning, change music track from intro to stage music
  if (beginning) {
    document.getElementById("music").src="music/Phantom_from_Space.mp3";
    beginning = false;
  }
}

function toggleMusic() {
  musicPaused = !musicPaused;
  if (musicPaused) {document.getElementById("music").play();}
  else {document.getElementById("music").pause();}
  document.getElementById("musicToggle").style.opacity = {true: '0.75', false: '0.5'}[musicPaused];
  document.getElementById("musicToggle").style.textDecoration = {false: 'line-through', true: 'none'}[musicPaused];
}

var restart = function (option) {
  ampersand.y = 12;
  ampersand.x = 24;
  ampersand.image = '<div id="hero">&#9880;</div>';
  if (option) { //reset crystals if option = start over
    totalCrystals = 3;
    crystals.coords = [
      {y: 9, x: 7, visible: true},
      {y: 10, x: 21, visible: true},
      {y: 0, x:0, visible: true}
    ];
  }
  closeWindow('gameOverWindow');
}


var clearField = function() {
  var allCells = document.getElementsByTagName("TD");
    for (var i = 0; i < allCells.length; i++) {
      allCells[i].innerHTML = " ";
    }
}

var placeObjects = function() {

  //place ampersand
  document.getElementById("field").rows[ampersand.y].cells[ampersand.x].innerHTML = (ampersand.image);

  //place lava
  lava.drawLava();

  //place crystals
  for (var i in crystals.coords){
    if (crystals.coords[i].visible) {
      y = crystals.coords[i].y;
      x = crystals.coords[i].x;
      document.getElementById("field").rows[y].cells[x].innerHTML = "<div class = 'crystal'><span class='crystal'>" + crystals.image + "</span></div>";
    }
  }
}

// handlers-----------------------------------------

var gameOverHandler = function() {
  //stop running
  running = false;

  //remove controls
  document.getElementsByClassName("buttons")[0].style.display = "none";

  ampersand.image = "<div id='dead'>&#9729;</div>"; //'dead' sprite

  var ending = setTimeout(function(){
    displayWindow('gameOverWindow');
  }, 1200);
}

//------------------------------------------

var winHandler = function() {

  running = false;

  setTimeout(function(){ampersand.image = '&#10035;'}, 250);
  setTimeout(function(){ampersand.image = '&#9676;'}, 400);
  setTimeout(function(){ampersand.image = '&#8258;'}, 700);
  setTimeout(function(){ampersand.image = '&#8283;'}, 875);
  setTimeout(function(){ampersand.image = ''}, 1100);

  setTimeout(function(){
    displayWindow('winWindow');
  }, 2000);
}

//------------------------------------------

//button handlers

var press = function(direction) {

  if (running) {

  //if the tile in the asked-for direction is a path tile, move there

  if (direction == 'up') {
    if (document.getElementById("field").rows[ampersand.y - 1].cells[ampersand.x].className == "path") {
      ampersand.y --;
    }
  }
  else if (direction == 'down') {
    if (document.getElementById("field").rows[ampersand.y + 1].cells[ampersand.x].className == "path") {
      ampersand.y ++;
    }
  }
  else if (direction == 'left') {
    if (document.getElementById("field").rows[ampersand.y].cells[ampersand.x - 1].className == "path") {
      ampersand.x --;
    }
  }
  else if (direction == 'right') {
    if (document.getElementById("field").rows[ampersand.y].cells[ampersand.x + 1].className == "path") {
      ampersand.x ++;
    }
  }
  } //end if running

  //If hero matches any visible crystal's position, take it off the field and play a visual effect
  for (var position in crystals.coords) {
    if (ampersand.x == crystals.coords[position].x && ampersand.y == crystals.coords[position].y && crystals.coords[position].visible) {
      crystals.coords[position].visible = false;
      totalCrystals -= 1;

      //shiny visual effect: Crystal Get!
      var shiny = setInterval (function(){
        document.getElementById("hero").style.textShadow = "0px 0px 10px hsl(0, 0%, 100%)";
      }, 50);
      setTimeout(function(){
        clearInterval(shiny)
      }, 1200);

      if (totalCrystals <= 0) {winHandler()} //if that was the last crystal, you win
    }
  }

} //end function press


var unpress = function() {
  direction = null;
}

// key handlers--------------------------

function keyDownHandler(event) {
  press({37: 'left', 38: 'up', 39: 'right', 40: 'down'}[event.keyCode]);
}

function keyUpHandler(event) {}
//----------------------------------

//constantly shift lava and constantly refresh screen

//each tick:
var advanceFrame = function() {
  clearField();
  placeObjects();
  lava.currentFrame = [1,2,3,4,5,6,7,8,9,10,11,12,13,0][lava.currentFrame]; //cycles to next lava frame
  if (running && lava.frames[lava.currentFrame][ampersand.y][ampersand.x] == "#") {  //if hero's position is on lava tile...
    gameOverHandler();  //you lose
  }
  //otherwise, refresh the screen

  document.getElementById("message").innerHTML = "Collect " + totalCrystals + " crystals to advance!";
}