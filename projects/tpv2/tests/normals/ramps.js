const processNormalsImage = require('lib/extract-normals'),
  $ = require('lib/coolgebra'),
  intersects = require('lib/intersection'),
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
  PERSPECTIVE = $([0,1,-1]).unit().$,
  {cos, sin} = Math,
  root = document.getElementById('root'),
  ball = document.getElementById('ball'),
  wrapper = document.getElementById('wrapper'),
  loader = document.getElementById('loader-wrapper'),
  loaderText = document.getElementById('loader-text');


var image = new Image(WIN_WIDTH, WIN_HEIGHT),
  normals = [],
  depths = [],
  loop = null,
  ballImpulse = [0,0,0],
  ballY = 256,
  ballX = 256,
  ballZ = 0,
  ballSpeed = 2;

var tick = inAir;

image.onload = function(){
  processNormalsImage({image, normals, alphas: depths}).then(() => {
    ball.className = "showing";
    loader.className = "hidden";
    loaderText.className = "hidden";
    loop = requestAnimationFrame(tick);
  })
};
image.src = 'hills3.png';

// TODO: Boundary class, specifies innie or outie, provides bins for optimization

const BOUNDARY_POLYGON_POINTS = [
  [-1,191],
  [242,192],
  [256,196],
  [276,210],
  [375,216],
  [363,256],
  [361,287],
  [409,308],
  [446,309],
  [465,337],
  [512,342],
  [511,512],
  [241,511],
  [191,431],
  [90,453],
  [0,420],
  [-1,191]
];

const BOUNDARIES = [];

for (let i = 0; i < BOUNDARY_POLYGON_POINTS.length - 1; i++){
  BOUNDARIES.push([...BOUNDARY_POLYGON_POINTS[i], ...BOUNDARY_POLYGON_POINTS[i+1]]);
}

function forceToMaintainDistanceFromVertex(point, vertex, distanceThreshold){
  var dist = $(point).distanceTo(vertex).$;
  if (dist < distanceThreshold) {
    close = true;
    return $([...vertex, ...point]).coordPairToVector().unit().times(distanceThreshold - dist).$;
  }
  else return false;
}

function frontOfRayBBox(ray, size){
  var box = [];
  var side1 = ray;
  var normal = $(ray).coordPairToVector().leftNormal().times(size).$;
  var side2 = [ray[2], ray[3], ...$([ray[2], ray[3]]).plus(normal).$];
  var side4 = [...$([ray[0], ray[1]]).plus(normal).$, ray[0], ray[1]];
  var side3 = [side2[2], side2[3], side4[0], side4[1]];
  box.push(side1);
  box.push(side2);
  box.push(side3);
  box.push(side4);
  return box;
}

function insidePolygon(point, sides){
  var horizontalRay = [...point, WIN_WIDTH+10, point[1]];
  var crossings = 0;
  // make sure no boundary vertices are on our test ray
  var boundaries = [];
  for (let i = 0; i < sides.length; i++){
    let boundary = sides[i];
    if (boundary[1] === point[1]) boundary[1] += 1;
    if (boundary[3] === point[1]) boundary[3] += 1;
    boundaries.push(boundary);
  }
  for (let i = 0; i < boundaries.length; i++){
    let boundary = boundaries[i]
    var intersection = intersects(...horizontalRay, ...boundary);
    if (intersection) crossings ++;
  }
  // return true;
  return crossings % 2 != 0;
}

function boundaryForce2d(point, boundaries, distanceThreshold){
  var proximityVector = null;
  for (let i = 0; i < boundaries.length; i++){
    var boundary = boundaries[i],
      p1 = [boundary[0], boundary[1]],
      p2 = [boundary[2], boundary[3]],
      boundaryVector = $(boundary).coordPairToVector().$,
      boundaryNormal = $(boundaryVector).leftNormal().$;

    // If we're on the inside side of the boundary
    if (!($(point).isLeftOf(boundaryVector).$)){
      var bBox = frontOfRayBBox(boundary, distanceThreshold);
        // proximityVector = forceToMaintainDistanceFromVertex(point, p1, distanceThreshold) || forceToMaintainDistanceFromVertex(point, p2, distanceThreshold);
      // } else {
        // Check distance to line
      if (insidePolygon(point, bBox)) {
        var distanceTestVector = $(boundaryNormal).times(distanceThreshold).$;
        var distanceRay = [...point, ...$(point).minusVector(distanceTestVector).$];
        var intersection = intersects(...distanceRay, ...boundary);
        if (intersection) {
          var dist = $([...point, ...intersection]).coordPairToVector().length().$;
          var vec = $([...intersection, ...point]).coordPairToVector().unit().times(distanceThreshold - dist).$;
          if (proximityVector) proximityVector = $(proximityVector).plus(vec).$;
          else proximityVector = vec;
        }
      }
    }
  }
  return proximityVector || false;
}


function jump(){
  window.cancelAnimationFrame(loop);
  tick = inAir;
  requestAnimationFrame(tick);
}

var groundPos = [0,0,0],
  airCurrentPos = [0,0,0],
  airNewPos = [0,0,0],
  init = true,
  gravity = 0;

function inAir(dt){
  loop = requestAnimationFrame(tick);
  airCurrentPos = [ballX, ballY, ballZ];
  groundPos = [ballX, groundPos[1], ballZ];
  if (init) {
    groundPos = [ballX, ballY, ballZ];
    gravity = -7;
    init = false;
  }
  var groundOldPos = groundPos;
  var x = parseInt(groundPos[0]),
    y = parseInt(groundPos[1]),
    normal = [0,0,-1],
    depth = 0;
  if (x >= 0 && x < WIN_WIDTH && y >= 0 && y < WIN_HEIGHT) {
    normal = normals[WIN_WIDTH * y + x];
    depth = depths[WIN_WIDTH * y + x];
  }

  normal = [normal[0], normal[1], 0];
  var airVector = $(ballImpulse).times(ballSpeed).$
  var groundNormalOffset = $(airVector).rotateToPlane(normal).$;
  var groundDir = $(airVector).plus(groundNormalOffset).unit().$;
  var groundProjectionAmt = $(airVector).scalarProjection(groundDir).$;
  var groundVector = $(groundDir).times(groundProjectionAmt).rotateToPlane(PERSPECTIVE).$;
  groundPos = $(groundPos).plus(groundVector).$;
  airVector = $(airVector).plus([0, gravity, 0]).rotateToPlane(PERSPECTIVE).$;
  airNewPos = $(airCurrentPos).plus(airVector).$;

  // Fudge to avoid divide-by-zero
  if (groundPos[0] === groundOldPos[0]) groundPos[0] += 0.005;

  var wallForce2d = boundaryForce2d([groundPos[0], groundPos[1]], BOUNDARIES, DISTANCE_THRESHOLD);
  if (wallForce2d) {
    var wallForce = $([wallForce2d[0], wallForce2d[1], 0]).$;
    groundPos = $(groundPos).plus(wallForce).$;
  }

  if (!insidePolygon([groundPos[0], groundPos[1]], BOUNDARIES)){
    // var movementRay = [...groundOldPos, ...groundPos];
    // for (let i = 0; i < BOUNDARIES.length; i++){
    //   var boundary = BOUNDARIES[i];
    //   var intersection = intersects(...movementRay, ...boundary);
    //   if (intersection){
    //     var force = $([...groundPos, ...intersection]).coordPairToVector().unit().times(DISTANCE_THRESHOLD).$;
    //     groundPos = $(intersection).plus(force).$;
        // var boundaryForce = boundaryForce2d([])
    groundPos = groundOldPos;
      // }
    // }

    airNewPos = [groundPos[0], airNewPos[1], groundPos[2]];
  }



  if (gravity > 0 && airNewPos[1] >= groundPos[1]) {
    init = true;
    window.cancelAnimationFrame(loop);
    tick = onGround;
    requestAnimationFrame(tick);
  }

  [ballX, ballY, ballZ] = airNewPos;
  gravity += 0.4;

  ball.style.left = (ballX-5).toString() + 'px';
  ball.style.top = (ballY-10).toString() + 'px';



}

function onGround(dt){
  loop = requestAnimationFrame(tick);
  var x = parseInt(ballX),
    y = parseInt(ballY),
    normal = [0,0,-1],
    depth = 0;

  if (x >= 0 && x < WIN_WIDTH && y >= 0 && y < WIN_HEIGHT) {
    normal = normals[WIN_WIDTH * y + x];
    depth = depths[WIN_WIDTH * y + x];
  }
  var normalOffset = $(ballImpulse).rotateToPlane(normal).$;
  var vector = $(ballImpulse).plus(normalOffset).unit().times(ballSpeed).rotateToPlane(PERSPECTIVE).$;
  var currentPosition = [ballX, ballY, ballZ];
  var newPosition = $(currentPosition).plus(vector).$;

  var currentPosition2d = [currentPosition[0], currentPosition[1]],
    newPosition2d = [newPosition[0], newPosition[1]],
    vector2d = [vector[0], vector[1]];
  // Minor fudge to avoid divide-by-zero situations:
  if (currentPosition2d[0] === newPosition2d[0]) newPosition2d[0] += 0.001;

  // TODO: Refactor, cache normals during init
    // Maintain distance from walls
  var wallForce2d = boundaryForce2d(newPosition2d, BOUNDARIES, DISTANCE_THRESHOLD);
  if (wallForce2d) {
    var wallForce = $([wallForce2d[0], wallForce2d[1], 0]).$;
    newPosition = $(newPosition).plus(wallForce).$;
  }

  // Only apply changes if they're still inside the walkable polygon

  if (!insidePolygon(newPosition2d, BOUNDARIES)){
    newPosition = currentPosition;
  }

  [ballX, ballY, ballZ] = newPosition;
  // }
  ball.style.left = (ballX-5).toString() + 'px';
  ball.style.top = (ballY-10).toString() + 'px';
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
        ballImpulse[2] = -1;
        break;
      case DOWN_KEY:
        ballImpulse[2] = 1;
        break;
      case SPACEBAR:
        if (!spaceDown && onGround) jump();
        spaceDown = true;
        break;
    }
    ballImpulse = $(ballImpulse).unit().$;
  });

  window.addEventListener("keyup", function(e){
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode){
      case LEFT_KEY:
        ballImpulse[0] = 0;
        break;
      case UP_KEY:
        ballImpulse[2] = 0;
        break;
      case RIGHT_KEY:
        ballImpulse[0] = 0;
        break;
      case DOWN_KEY:
        ballImpulse[2] = 0;
        break;
      case SPACEBAR:
        spaceDown = false;
        break;
    }
    ballImpulse = $(ballImpulse).unit().$;
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
    var direction = $(newVec).minusVector(startVec).unit().$;
    ballImpulse[0] = direction[0]
    ballImpulse[2] = direction[1]
  });

  root.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (e.target.id === 'jump-button') return;
    ballImpulse[0] = 0;
    ballImpulse[2] = 0;
    startVec = [0,0,0];
  })
};


module.exports = {$, jump};