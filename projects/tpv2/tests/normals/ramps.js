const IndexedNormalMap = require('lib/indexed-normal-map'),
  $ = require('lib/coolgebra'),
  BoundaryCollection = require('lib/boundaries'),
  intersects = require('lib/intersection'),
  {clamp} = require('lib/limit.js'),
  downhillForce = require('lib/terrain/downhill-force'),
  DISTANCE_THRESHOLD = 5,
  SPACEBAR = 32,
  LEFT_KEY = 37,
  UP_KEY = 38,
  RIGHT_KEY = 39,
  DOWN_KEY = 40,
  WIN_WIDTH = 512,
  WIN_HEIGHT = 512,
  TILE_WIDTH = 32,
  TILE_HEIGHT = 32,
  {cos, sin} = Math,
  root = document.getElementById('root'),
  ball = document.getElementById('ball'),
  shadow = document.getElementById('shadow'),
  wrapper = document.getElementById('wrapper'),
  loader = document.getElementById('loader-wrapper'),
  loaderText = document.getElementById('loader-text');


var image = new Image(WIN_WIDTH, WIN_HEIGHT),
  terrainMap = null,
  normals = [],
  depths = [],
  loop = null,
  ballImpulse = [0,0],
  ballY = 256,
  ballX = 256,
  ballSpeed = 2,
  ballVelocity = [0, 0];

var tick = inAir;
var loop = null;


image.onload = function(){
  terrainMap = new IndexedNormalMap({image, normals, sourceWidth: WIN_WIDTH, sourceHeight: WIN_HEIGHT});
  // Make terrain map into a map of downhill forces
  terrainMap.transform(downhillForce);
  ball.className = "showing";
  shadow.className = "showing";
  loader.className = "hidden";
  loaderText.className = "hidden";
  tick();
};
image.src = 'hills4.png';


// BOUNDARY CONSTANTS =======================================================

var boundsFromFile = require('./boundary-point-values').hills;
const boundaries = new BoundaryCollection(boundsFromFile, DISTANCE_THRESHOLD);

function jump(){
  window.cancelAnimationFrame(loop);
  tick = inAir;
  requestAnimationFrame(tick);
}

var groundPos = [0,0],
  airPos = [0,0],
  init = true,
  gravity = 0;

function inAir(dt){
  loop = requestAnimationFrame(tick);
  if (init) {
    groundPos[1] = ballY;
    gravity = -7;
    init = false;
  }
  airPos = [ballX, ballY];
  groundPos = [ballX, groundPos[1]];
  var slope = terrainMap.lookup(parseInt(groundPos[0]), parseInt(groundPos[1]));
  var shadowRotation = $(slope).angle2d().$;

  var airVector = $(ballImpulse).plus([0, gravity]).$;

  var groundVector = ($(ballImpulse).dot(slope).$ < 0) ? $(ballImpulse).minusVector(slope).$ : groundVector = $(ballImpulse).plus(slope).$

  airPos = $(airPos).plus(airVector).$;
  groundPos = $(groundPos).plus(groundVector).$;

  var boundaryForce = boundaries.forceAway(groundPos);
  groundPos = $(groundPos).plus(boundaryForce).$;
  airPos = $(airPos).plus(boundaryForce).$;

  // If we're falling down and we hit or pass the ground projection, we land (stick to ground Y and switch to onGround state)
  if (gravity > 0 && airPos[1] >= groundPos[1]) {
    init = true;
    airPos[1] = groundPos[1];
    window.cancelAnimationFrame(loop);
    tick = onGround;
    loop = requestAnimationFrame(tick);
  }

  [ballX, ballY] = airPos;
  gravity += 0.4;

  ball.style.transform = `translate(${ballX-5}px, ${ballY - 10}px)`;
  shadow.style.transform = `translate(${groundPos[0] - 5}px, ${groundPos[1]}px) rotate(${shadowRotation}rad)`;
}

function onGround(dt){
  loop = requestAnimationFrame(tick);
  var slope = terrainMap.lookup(parseInt(ballX), parseInt(ballY));
  var shadowRotation = $(slope).angle2d().$;
  var position = [ballX, ballY];
  position = $(position).plus(ballImpulse).$
  position = $(position).plus($(slope).times(ballSpeed).$).$;
  position = $(position).plus(boundaries.forceAway(position)).$;
  [ballX, ballY] = position;
  ball.style.transform = `translate(${ballX-5}px, ${ballY-10}px)`;
  shadow.style.transform = `translate(${ballX-5}px, ${ballY}px) rotate(${shadowRotation}rad)`;
}

window.onload = function(){
  var spaceDown = false;

  window.addEventListener("keydown", function(e){
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch(e.keyCode){
      case LEFT_KEY:
        ballImpulse[0] = -1
        break;
      case RIGHT_KEY:
        ballImpulse[0] = 1;
        break;
      case UP_KEY:
        ballImpulse[1] = -1;
        break;
      case DOWN_KEY:
        ballImpulse[1] = 1;
        break;
      case SPACEBAR:
        if (!spaceDown && onGround) jump();
        spaceDown = true;
        break;
    }
    ballImpulse = $(ballImpulse).unit().times(ballSpeed).$;
  });

  window.addEventListener("keyup", function(e){
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode){
      case LEFT_KEY:
        ballImpulse[0] = 0;
        break;
      case UP_KEY:
        ballImpulse[1] = 0;
        break;
      case RIGHT_KEY:
        ballImpulse[0] = 0;
        break;
      case DOWN_KEY:
        ballImpulse[1] = 0;
        break;
      case SPACEBAR:
        spaceDown = false;
        break;
    }
    ballImpulse = $(ballImpulse).unit().times(ballSpeed).$;
  });

  var startVec = [0,0];
  var button = document.getElementById('jump-button');

  root.addEventListener('touchstart', function(e){
    e.preventDefault();
    var touch = e.changedTouches[0];
    if (e.target.id === 'jump-button') {
      jump();
      return;
    }
    startVec = [touch.clientX, touch.clientY];
  });

  root.addEventListener('touchmove', (e) => {
    e.preventDefault();
    var touch = e.changedTouches[0];
    if (e.target.id === 'jump-button') return;
    var newVec = [touch.clientX, touch.clientY];
    var direction = $(newVec).minusVector(startVec).unit().times(ballSpeed).$;
    ballImpulse[0] = direction[0]
    ballImpulse[1] = direction[1]
  });

  root.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (e.target.id === 'jump-button') return;
    ballImpulse[0] = 0;
    ballImpulse[1] = 0;
    startVec = [0,0];
  })
};


module.exports = {$, jump};