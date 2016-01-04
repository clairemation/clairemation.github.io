// environment variables-----------------------------------------
var totalCrystals = 3;
var message = "";

// map--------------------------------------------------

var map = {

  baseMap: [
    "                              ".split(""),
    "  •••••••••••••••••••••••••   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •••••••••••••••••••••••••   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •••••••••••••••••••••••••   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •••••••••••••••••••••••••   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •     •     •     •     •   ".split(""),
    "  •••••••••••••••••••••••••   ".split(""),
  ],

}


var createHtmlMap = function() {

 //make rows
  for (var i = 0; i < 15; i++) {
    var row = document.createElement("TR");
    document.getElementById("field").appendChild(row);

    //make cells inside each row
    for (var j = 0; j < 29; j++) {
      var cell = document.createElement("TD");
      document.getElementById("field").rows[i].appendChild(cell);
    }
  }

  //designate paths: rows
  for (i = 1; i < 14; i += 3) {
    for (j = 2; j < 27; j++) {
      document.getElementById("field").rows[i].cells[j].setAttribute ("class", "path");
    }
  }

  //designate paths: cols
  for (var col = 2; col < 27; col += 3) {
    for (var row = 2; row < 14; row++) {
      document.getElementById("field").rows[row].cells[col].setAttribute ("class", "path");
    }
  }

} //end createHtmlMap


// world objects----------------------------------------------

var ampersand = { //so called because she used to be a '&'
  image: '&#9880;', //ASCII 'sprite'
  y: 13,
  x: 2
}

var lava = {
  image: '#',
  currentFrame: 0,
  frames: [ //# are lava tiles on the map. They shift in a 3-frame cycle
    [ //frame0start
     "                              ".split(""),
     "        # #         # #       ".split(""),
     "        # #         # #   #   ".split(""),
     "    # #       # #             ".split(""),
     "      #       # #             ".split(""),
     "                              ".split(""),
     "    #   # # #           # #   ".split(""),
     "        # # #                 ".split(""),
     "        # # #     # #         ".split(""),
     "                  #           ".split(""),
     "                              ".split(""),
     "      #                 #     ".split(""),
     "            # # #       # #   ".split(""),
     "                          #   ".split(""),
     ],//frame0end

     [ //frame1start
     "                              ".split(""),
     "          # #       # #       ".split(""),
     "    # #   # #       # #   #   ".split(""),
     "      #     #   #             ".split(""),
     "              # # #           ".split(""),
     "    #         # #       # #   ".split(""),
     "  # #     #             # #   ".split(""),
     "        #       # #           ".split(""),
     "      # # #     # #           ".split(""),
     "      # #         #           ".split(""),
     "                              ".split(""),
     "      #                       ".split(""),
     "            # # # #       #   ".split(""),
     "                        # #   ".split(""),
     ],//frame1end

     [ //frame2start
     "                              ".split(""),
     "      #     # #     # #   #   ".split(""),
     "  # # #     # #     # #   #   ".split(""),
     "                #             ".split(""),
     "    #           # #       #   ".split(""),
     "    #     #   # #       # #   ".split(""),
     "    #     # #           #     ".split(""),
     "        #         # #         ".split(""),
     "        #         #           ".split(""),
     "      # #                     ".split(""),
     "      # #                     ".split(""),
     "      #                   #   ".split(""),
     "      #       # #       # #   ".split(""),
     "              # #       # #   ".split(""),
     ],//frame2end
  ],

  drawLava: function() {
    frameToDraw = this.frames[this.currentFrame];
    for (var y = 0; y < frameToDraw.length; y++) {
      for (var x = 0; x < frameToDraw[y].length; x++) {
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
    {y: 1, x: 17, visible: true},
    {y: 1, x: 23, visible: true},
    {y: 7, x: 4, visible: true}
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
  document.getElementById("field").rows[ampersand.y].cells[ampersand.x].innerHTML = ("<div id='hero'>" + ampersand.image + "</div>");

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
  ampersand.image = "&#9729;"; //'dead' sprite
  document.getElementsByClassName("buttons")[0].style.display = "none"; //remove controls
  document.getElementById("hero").style.color = "#000000";
  var ending = setTimeout(function(){
    clearInterval(tick); //stop everything else
    document.getElementById("shade").style.display = "block";
    document.getElementById("gameOverWindow").style.display = "block";
  }, 1200);
}

//------------------------------------------

var winHandler = function() {
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

//constantly shift lava and constantly refresh screen
var tick = setInterval(function() {advanceFrame();}, 200);

//each tick:
var advanceFrame = function() {
  lava.currentFrame = { 0: 1, 1: 2, 2: 0 }[lava.currentFrame]; //cycles to next lava frame
  if (lava.frames[lava.currentFrame][ampersand.y][ampersand.x] == "#") {  //if hero's position is on lava tile...
    gameOverHandler();  //you lose
  }
  //otherwise, refresh the screen
  clearField();
  placeObjects();
  document.getElementById("message").innerHTML = "Collect " + totalCrystals + " crystals!";
}