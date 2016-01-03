// environment variables------------------------------------------
var totalCrystals = 3;
var status = 'ok';
var moving = false;
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

  var ampersand = {
    image: '&#9880;',
    y: 13,
    x: 2
  }

  var lava = {
    image: '#',
    currentFrame: 0,
    frames: [
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
    image: '&#11042;',
    coords: [
      {y: 1, x: 17, visible: true},
      {y: 1, x: 23, visible: true},
      {y: 7, x: 4, visible: true}
          ],
  }


  // functions---------------------------------------------------------------------

var instructions = function() {
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
      document.getElementById("field").rows[y].cells[x].innerHTML = "<div class = 'crystal'>" + crystals.image + "</div>";
    }
  }
}

  //------------------------------------------

  var gameOverHandler = function() {
    ampersand.image = "&#9729;";
    document.getElementsByClassName("buttons")[0].style.display = "none";
    document.getElementById("hero").style.color = "#000000";
    var ending = setTimeout(function(){
      clearInterval(tick);
      document.getElementById("shade").style.display = "block";
      document.getElementById("gameOverWindow").style.display = "block";
    }, 1200);
  }

  //------------------------------------------

  var winHandler = function() {
    setTimeout(function(){
      clearInterval(tick);
      document.getElementById("shade").style.display = "block";
      document.getElementById("winWindow").style.display = "block";
    }, 2000);
  }

  //------------------------------------------

//button handlers

var press = function(direction) {

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

    for (var position in crystals.coords) {
      if (ampersand.x == crystals.coords[position].x && ampersand.y == crystals.coords[position].y) {
        crystals.coords[position].visible = false;
        totalCrystals -= 1;

        //shiny effect
        var shiny = setInterval (function(){
          document.getElementById("hero").style.textShadow = "0px 0px 10px hsl(0, 0%, 100%)";
          document.getElementById("message").style.textShadow = "0px 0px 10px hsl(0, 0%, 100%)";
        }, 50);
        setTimeout(function(){
          clearInterval(shiny)
        }, 1200);

        if (totalCrystals <= 0) {winHandler()}
      }
    }
    // placeObjects();

} //function main


var unpress = function() {
  direction = null;
}

//flow the lava and constantly refresh screen
var tick = setInterval(function() {advanceFrame();}, 200);

var advanceFrame = function() {
  lava.currentFrame = { 0: 1, 1: 2, 2: 0 }[lava.currentFrame];
  if (lava.frames[lava.currentFrame][ampersand.y][ampersand.x] == "#") {
    gameOverHandler();
  }
  clearField();
  placeObjects();
  document.getElementById("message").innerHTML = "Collect " + totalCrystals + " crystals!";
}