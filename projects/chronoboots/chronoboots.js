// environment variables-----------------------------------------
var totalCrystals = 3;
var message = "";
var running = true;

// map--------------------------------------------------

var map = {

  baseMap: [
    "#########################".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#########################".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#########################".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#########################".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
    "#  #  #  #  #  #  #  #  #".split(""),
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
    {y: 1, x: 3, visible: true},
    {y: 0, x: 24, visible: true},
    {y: 12, x:1, visible: true}
        ],
}


// functions---------------------------------------------------------------------

var instructions = function() { //pause, dim screen, and show instructions
  clearInterval(tick);
  clearField();
  document.getElementById("shade").style.display = "block";
  document.getElementById("instructions").style.display = "block";
}

var closeInstructions = function() {
  document.getElementById("shade").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  tick = setInterval(function() {advanceFrame();}, 200);
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

// var restart = function() {
//   ampersand.y = 12;
//   ampersand.x = 24;
//   for (var i in crystals.coords) {
//     crystals.coords[i].visible = true;
//   }
// document.getElementById("gameOverWindow").style.display = "block");
// running = true;
// var tick = setInterval(function() {advanceFrame();}, 200);
// }

// handlers-----------------------------------------

var gameOverHandler = function() {
  //stop running
  running = false;

  //remove controls
  document.getElementsByClassName("buttons")[0].style.display = "none";

  ampersand.image = "<div id='dead'>&#9729;</div>"; //'dead' sprite

  var ending = setTimeout(function(){
    clearInterval(tick); //stop everything else
    document.getElementById("shade").style.display = "block";
    document.getElementById("gameOverWindow").style.display = "block";
  }, 1200);
}

//------------------------------------------

var winHandler = function() {
  //stop running
  running = false;

  //remove controls
  document.getElementsByClassName("buttons")[0].style.display = "none";

  //win 'animation' -- Hero zaps out
  setTimeout(function(){ampersand.image = '&#10035;'}, 250);
  setTimeout(function(){ampersand.image = '&#9676;'}, 400);
  setTimeout(function(){ampersand.image = '&#8258;'}, 700);
  setTimeout(function(){ampersand.image = '&#8283;'}, 875);
  setTimeout(function(){ampersand.image = ''}, 1100);

  setTimeout(function(){
    clearInterval(tick);
    document.getElementById("shade").style.display = "block";
    document.getElementById("winWindow").style.display = "block";
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

// var tick = setInterval(function() {advanceFrame();}, 200);
// commented out -- don't start tick until instructions dismissed

//each tick:
var advanceFrame = function() {
  lava.currentFrame = [1,2,3,4,5,6,7,8,9,10,11,12,13,0][lava.currentFrame]; //cycles to next lava frame
  if (lava.frames[lava.currentFrame][ampersand.y][ampersand.x] == "#") {  //if hero's position is on lava tile...
    gameOverHandler();  //you lose
  }
  //otherwise, refresh the screen
  clearField();
  placeObjects();
  document.getElementById("message").innerHTML = "Collect " + totalCrystals + " crystals!";
}