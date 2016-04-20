/** @jsx React.DOM */

var PopupWindow = React.createClass({displayName: "PopupWindow",
  getInitialState: function(){
    return {
      visible: false
    }
  },
  handleClick: function(){
    this.setState({visible:
                  (this.state.visible ? false : true)});
  },
  render: function(){
    return (
      React.createElement("div", {id: this.props.id, 
        onClick: this.handleClick, 
        className: this.state.visible ? 'closedWindow' : this.props.className}, 
        this.props.children
      )
    );
  }
});

//  CONTROLLER REACT CLASS=============================

var Game = React.createClass({displayName: "Game",

  getInitialState: function(){
    return {
      level: level1,
      env: new Env({
        totalCrystals: level1.totalCrystals,
        musicFiles: level1.musicFiles
      })
    };
  },

  render: function(){
    return (
      React.createElement("div", null, 
      React.createElement(Music, {playState: "autoplay"}, "music/On_the_Shore.mp3"), 
      React.createElement(PopupWindow, {id: "title", className: "openWindow"}, 
        React.createElement("h1", null, "Time's Prisoner"), 
        React.createElement("h2", null, "a little game demo by Claire Samuels"), 
        React.createElement("button", null, "Play")
      )
      )
    );
  }

})

// MUSIC REACT CLASS =================================

var Music = React.createClass({displayName: "Music",

  componentDidMount: function() {
    $("#music")[0].play();
    $("#music")[0].loop = true;
    $("#music")[0].paused = false;
  },

  render: function() {
    return (
      React.createElement("audio", {id: "music", src: this.props.children})
    );
  }
});

// FIELD REACT CLASS =================================

var Field = React.createClass({displayName: "Field",

  getInitialState: function(){
    return {
      baseMap: this.props.baseMap
    }

  },

  componentDidMount: function() {
    // assign class to path tiles
    for (var y in this.baseMap) {
      for (var x in this.baseMap[y]) {
        if (this.baseMap[y][x] == "#") {
          $(document.getElementById("field").rows[y].cells[x]).attr("class", "path");
        }
      }
    }
  },

  render: function(){
    //make table cells and rows
    var rowString = "<td></td>".repeat(this.map.baseMap[0].length);
    var tableString = "<table id='field'>" + ("<tr>" + rowString + "</tr>").repeat(this.map.baseMap.length) + "</table>";
    return (
      React.createElement("table", {id: "field"}, 
        
          ("<tr>" + rowString + "</tr>").repeat(this.map.baseMap.length)
        
      )
    );
  }

})

// RUNNER =================================

$(document).ready(function(){
  ReactDOM.render(
    React.createElement(Game, null),
    document.getElementById("root")
  );
});

//=====================================


// CONTROLLER=================================

// function Game(args) {
//   this.view = new View();
//   this.view.game = this;
//   this.env = args.env;
//   this.objects = args.objects;
// }

// Move some functionality to View
// Game.prototype.begin = function(){
//   $("#title").attr = ("id", "closingTitle");
//   setTimeout(function(){
//     $("#closingTitle").attr("id", "closedTitle");
//   }, 500);
// }


// VIEW ----------------------------------------

function View() {
  this.game = null;
}

View.prototype.createHtmlMap = function() {
  //make table cells and rows
  var rowString = "<td></td>".repeat(this.map.baseMap[0].length);
  var tableString = ("<tr>" + rowString + "</tr>").repeat(this.map.baseMap.length);
  $("#field").append(tableString);
  // assign class to path tiles
  for (var y in map.baseMap) {
    for (var x in map.baseMap[y]) {
      if (map.baseMap[y][x] == "#") {
        $(document.getElementById("field").rows[y].cells[x]).attr("class", "path");
      }
    }
  }
}; //end createHtmlMap


View.prototype.drawLava = function(lava) {
  frameToDraw = lava.frames[lava.currentFrame];
  for (var y in frameToDraw) {
    for (var x in frameToDraw[y]) {
      if (frameToDraw[y][x] == "#") {
        document.getElementById("field").rows[y].cells[x].innerHTML = "<div class='flame'> </div>";
      }
    }
  }
};

View.prototype.displayWindow = function(window) {
  $("footer").css("visibility", "hidden");
  clearInterval(tick);
  clearField();
  this.game.running = false;
  $("#shade").css("display", "block");
  $(window).css("display", "block");
};

View.prototype.closeWindow = function(window) {
  document.getElementsByTagName("footer")[0].style.visibility = "visible";
  document.getElementById("shade").style.display = "none";
  document.getElementById(window).style.display = "none";
  placeObjects();
  this.game.running = true;
  tick = setInterval(function() {advanceFrame();}, 200);
};

View.prototype.closeInstructions = function() {
  this.closeWindow('instructions');
  //if beginning, change music track from intro to stage music
  if (beginning) {
    document.getElementById("music").src="music/Phantom_from_Space.mp3";
    beginning = false;
  }
};

function toggleMusic() {
  musicPaused = !musicPaused;
  if (musicPaused) {document.getElementById("music").play();}
  else {document.getElementById("music").pause();}
  document.getElementById("musicToggle").style.opacity = {true: '0.75', false: '0.5'}[musicPaused];
  document.getElementById("musicToggle").style.textDecoration = {false: 'line-through', true: 'none'}[musicPaused];
}

var restart = function (option) {
  hero.y = 12;
  hero.x = 24;
  hero.image = '<div id="hero">&#9880;</div>';
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

  //place hero
  document.getElementById("field").rows[hero.y].cells[hero.x].innerHTML = (hero.image);

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

// HANDLERS-----------------------------------------

var gameOverHandler = function() {
  //stop running
  running = false;

  //remove controls
  document.getElementsByClassName("buttons")[0].style.display = "none";

  hero.image = "<div id='dead'>&#9729;</div>"; //'dead' sprite

  var ending = setTimeout(function(){
    displayWindow('gameOverWindow');
  }, 1200);
}

//------------------------------------------

var winHandler = function() {

  running = false;

  setTimeout(function(){hero.image = '&#10035;'}, 250);
  setTimeout(function(){hero.image = '&#9676;'}, 400);
  setTimeout(function(){hero.image = '&#8258;'}, 700);
  setTimeout(function(){hero.image = '&#8283;'}, 875);
  setTimeout(function(){hero.image = ''}, 1100);

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
    if (document.getElementById("field").rows[hero.y - 1].cells[hero.x].className == "path") {
      hero.y --;
    }
  }
  else if (direction == 'down') {
    if (document.getElementById("field").rows[hero.y + 1].cells[hero.x].className == "path") {
      hero.y ++;
    }
  }
  else if (direction == 'left') {
    if (document.getElementById("field").rows[hero.y].cells[hero.x - 1].className == "path") {
      hero.x --;
    }
  }
  else if (direction == 'right') {
    if (document.getElementById("field").rows[hero.y].cells[hero.x + 1].className == "path") {
      hero.x ++;
    }
  }
  } //end if running

  //If hero matches any visible crystal's position, take it off the field and play a visual effect
  for (var position in crystals.coords) {
    if (hero.x == crystals.coords[position].x && hero.y == crystals.coords[position].y && crystals.coords[position].visible) {
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
  if (running && lava.frames[lava.currentFrame][hero.y][hero.x] == "#") {  //if hero's position is on lava tile...
    gameOverHandler();  //you lose
  }
  //otherwise, refresh the screen

  document.getElementById("message").innerHTML = "Collect " + totalCrystals + " crystals to advance!";
}
