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
  PERSPECTIVE = $([0,0,-1]).unit().$,
  DISPLACEMENT_FACTOR = 2.5,
  {cos, sin} = Math,
  root = document.getElementById('root'),
  ball = document.getElementById('ball'),
  shadow = document.getElementById('shadow'),
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
  ballSpeed = 2;

var tick = inAir;
var loop = null;


image.onload = function(){
  processNormalsImage({image, normals, alphas: depths}).then(() => {
    ball.className = "showing";
    shadow.className = "showing";
    loader.className = "hidden";
    loaderText.className = "hidden";
    tick();
  })
};
image.src = 'hills4.png';

// TODO: Boundary class, specifies innie or outie, provides bins for optimization


// BOUNDARY CONSTANTS =======================================================

const BOUNDARY_POLYGON_POINTS = [
  // mountain
  // [
  //   [30,155.5],
  //   [224,163.5],
  //   [439,140.5],
  //   [512,140.505],
  //   [512.005,174.5],
  //   [271,189.5],
  //   [266,189.505],
  //   [262,413.5],
  //   [337,444.5],
  //   [512,417.5],
  //   [516,511.5],
  //   [0,511.505],
  //   [0.005,458.5],
  //   [132,493.5],
  //   [54,418.5],
  //   [0,341.5],
  //   [0.005,221.5],
  //   [59,176.5],
  //   [38,175.505],
  //   [30,155.5]
  // ],

  // hills
  [
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
  ]
];

const BOUNDARY_LINE_POINTS = [
  [
    [269,403],
    [206,403]
  ]
];

const BOUNDARIES = (function(){
  var boundaries = [];
  for (let i = 0; i < BOUNDARY_POLYGON_POINTS.length; i++){
    var polygon = BOUNDARY_POLYGON_POINTS[i]
    for (let j = 0; j < polygon.length - 1; j++){
      boundaries.push([...polygon[j], ...polygon[j+1]]);
    }
  }
  return boundaries;
}());

const BOUNDARY_VECTORS = (function(){
  var bVecs = [];
  for (let i = 0; i < BOUNDARIES.length; i++){
    bVecs.push($(BOUNDARIES[i]).coordPairToVector().$);
  }
  return bVecs;
}());

const BOUNDARY_NORMALS = (function(){
  var bNorms = [];
  for (let i = 0; i < BOUNDARY_VECTORS.length; i++){
    bNorms.push($(BOUNDARY_VECTORS[i]).leftNormal().$);
  }
  return bNorms;
}());

const BOUNDARY_BBOXES = (function(){
  var boxes = [];
  for (let i = 0; i < BOUNDARIES.length; i++){
    boxes.push(frontOfRayBBox(BOUNDARIES[i], DISTANCE_THRESHOLD));
  }
  return boxes;
}());


// NORMALS FUNCTIONS ============================================================

function readNormal(x, y){
  if (x >= 0 && x < WIN_WIDTH && y >= 0 && y < WIN_HEIGHT) {
    return { normal: normals[WIN_WIDTH * y + x], depth: depths[WIN_WIDTH * y + x] };
  }
  else return { normal: [0, 0, -1], depth: 0 }
}

// TODO: memoize results
function groundGravity(normal, gravity = [0, 1, 0]){
  var rollDirection = $(gravity).scalarProjection(normal).unit().$;
  var rollSpeed = (1 - $(gravity).dot(normal).$);
  var rollVector = $(rollDirection).times(rollSpeed).$;
  return rollVector
};


// BOUNDARY COLLISION FUNCTIONS ================================================================

function forceAwayFromVertex(point, vertex, distanceThreshold = DISTANCE_THRESHOLD){
  var dist = $(point).distanceTo(vertex).$;
  if (dist < distanceThreshold) {
    return $([...vertex, ...point]).coordPairToVector().unit().times(distanceThreshold - dist).$;
  }
  else return false;
}

function forceAwayFromVertices(point, vertices = BOUNDARY_POLYGON_POINTS, distanceThreshold = DISTANCE_THRESHOLD){
  var proximityVector = [0, 0];
  var vec = false;
  for (let i = 0; i < BOUNDARY_POLYGON_POINTS.length - 1; i++){
    vec = forceAwayFromVertex(point, BOUNDARY_POLYGON_POINTS[i], distanceThreshold);
    if (vec) proximityVector = $(proximityVector).plus(vec).$;
  }
  return proximityVector;
}

// Bounding box for a boundary's "active zone"
// aka a box parallel to the line whose width = size
function frontOfRayBBox(ray, size){
  var side1 = ray;
  var normal = $(ray).coordPairToVector().leftNormal().times(size).$;
  var side2 = [ray[2], ray[3], ...$([ray[2], ray[3]]).plus(normal).$];
  var side4 = [...$([ray[0], ray[1]]).plus(normal).$, ray[0], ray[1]];
  var side3 = [side2[2], side2[3], side4[0], side4[1]];
  return [side1, side2, side3, side4];
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

  // If crossings is odd, we're inside. If even, we're outside.
  return crossings % 2 != 0;
}

function forceAwayFromBoundaries(point, boundaries = BOUNDARIES, distanceThreshold = DISTANCE_THRESHOLD){
  // If we're too close to a vertex, add the counter-force to our vector
  var force = forceAwayFromVertices(point);

  // Now test against polygon sides
  for (let i = 0; i < boundaries.length; i++){
    var boundary = boundaries[i];

    (function boundaryProximityVector(){
      var boundaryVector = BOUNDARY_VECTORS[i];

      // If we're on the inside side of the boundary
      if (!($(point).isLeftOf(boundaryVector).$)){
        // If we're inside the boundary's active zone
        var bBox = BOUNDARY_BBOXES[i];
        if (insidePolygon(point, bBox)) {

          var boundaryNormal = BOUNDARY_NORMALS[i];

          // Test for intersection between distance ray and boundary ray
          var distanceTestVector = $(boundaryNormal).times(distanceThreshold).$;
          var distanceRay = [...point, ...$(point).minusVector(distanceTestVector).$];
          var intersection = intersects(...distanceRay, ...boundary);

          // If we're too close to the boundary
          if (intersection) {
            var dist = $([...point, ...intersection]).coordPairToVector().length().$;
            var vec = $([...intersection, ...point]).coordPairToVector().unit().times(distanceThreshold - dist).$;
            force = $(force).plus(vec).$;
          }
        }
      }
    })();

  }
  return force;
}


function jump(){
  window.cancelAnimationFrame(loop);
  tick = inAir;
  requestAnimationFrame(tick);
}

var groundPos = [0,0],
  airCurrentPos = [0,0],
  airNewPos = [0,0],
  init = true,
  gravity = 0;

function inAir(dt){
  loop = requestAnimationFrame(tick);
  airCurrentPos = [ballX, ballY];
  groundPos = [ballX, groundPos[1]];
  if (init) {
    groundPos[1] = ballY;
    gravity = -7;
    init = false;
  }
  var groundOldPos = groundPos;
  var x = parseInt(groundPos[0]),
    y = parseInt(groundPos[1]);
  var {normal, depth} = readNormal(x, y);
  var shadowRotation = $(normal).angle2d().$;

  var b = [...ballImpulse];

  var airVector = $(b).times(ballSpeed).$

  var currentPosition = [ballX, ballY];
  var groundNormalOffset = $(b).scalarProjection(normal).$;

  // Only offset the Y coordinate
  var groundVector = $(b).plus([0, groundNormalOffset[1], 0]).unit().$;
  // var groundSpeed = $([airVector[0], 0, 0]).scalarProjection(groundVector).$;
  groundVector = $(groundVector).times(ballSpeed).$;


  // var groundNormalOffset = $(b).scalarProjection(normal).$;
  // var groundDir = $(airVector).plus([0, groundNormalOffset[1] * DISPLACEMENT_FACTOR, 0]).$;
  // var groundVector = $(airVector).scalarProjection(groundDir).$;

  airVector = $(airVector).plus([0, gravity, 0]).$;
  groundPos = $(groundPos).plus(groundVector).$;
  airNewPos = $(airCurrentPos).plus(airVector).$;
  // airNewPos = [groundPos[0], airNewPos[1], groundPos[2]];

  // Fudge to avoid divide-by-zero
  if (groundPos[0] === groundOldPos[0]) groundPos[0] += 0.005;

  var wallForce2d = forceAwayFromBoundaries([groundPos[0], groundPos[1]], BOUNDARIES, DISTANCE_THRESHOLD);
  if (wallForce2d) {
    var wallForce = $([wallForce2d[0], wallForce2d[1], 0]).$;
    groundPos = $(groundPos).plus(wallForce).$;
    airNewPos = $(airNewPos).plus(wallForce).$;
  }

  // Only stops us when going from inside bounds to out--
  // So in case everything fails and we go out of bounds, at least we can get back in
  if (!insidePolygon([groundPos[0], groundPos[1]], BOUNDARIES) && insidePolygon([groundOldPos[0], groundOldPos[1]], BOUNDARIES)){
    // groundPos = groundOldPos;
    // airNewPos = [groundOldPos[0], airNewPos[1], groundOldPos[2]];
  }

  // If we're falling down and we hit or pass the ground projection, we land (stick to ground Y and switch to onGround state)
  if (gravity > 0 && airNewPos[1] >= groundPos[1]) {
    init = true;
    airNewPos[1] = groundPos[1];
    window.cancelAnimationFrame(loop);
    tick = onGround;
    loop = requestAnimationFrame(tick);
  }

  [ballX, ballY] = airNewPos;
  gravity += 0.4;

  ball.style.transform = `translate(${ballX-5}px, ${ballY - 10}px)`;
  var scale = 2/$(airNewPos).distanceTo(groundPos).$ + 0.8;
  shadow.style.transform = `translate(${groundPos[0] - 5}px, ${groundPos[1]}px) rotate(${shadowRotation}rad)`;
}

function onGround(dt){
  loop = requestAnimationFrame(tick);
  var x = parseInt(ballX),
    y = parseInt(ballY);
  var gravity = [0, 0, 0];

  var {normal, depth} = readNormal(x, y);
  // TODO: Memoize
  var shadowRotation = $([normal[0], normal[1]]).angle2d().$
  var currentPosition = [ballX, ballY];
  var b = [...ballImpulse];

  // Only offset the Y coordinate
  var vector = $(b).times(ballSpeed).plus($(groundGravity(normal)).times(ballSpeed).$).$;

  // vector = $(vector).plus(gravity).$;
  var newPosition = $(currentPosition).plus(vector).$;

  var currentPosition2d = [currentPosition[0], currentPosition[1]],
    newPosition2d = [newPosition[0], newPosition[1]],
    vector2d = [vector[0], vector[1]];
  // Minor fudge to avoid divide-by-zero situations:
  if (currentPosition2d[0] === newPosition2d[0]) newPosition2d[0] += 0.001;

  // Maintain distance from walls
  var wallForce2d = forceAwayFromBoundaries(newPosition2d, BOUNDARIES, DISTANCE_THRESHOLD);
  if (wallForce2d) {
    var wallForce = $([wallForce2d[0], wallForce2d[1], 0]).$;
    newPosition = $(newPosition).plus(wallForce).$;
  }

  if (!insidePolygon([newPosition[0], newPosition[1]], BOUNDARIES) && insidePolygon(currentPosition2d, BOUNDARIES)) {
    newPosition = currentPosition;
  }

  [ballX, ballY] = newPosition;

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
    ballImpulse[1] = direction[1]
  });

  root.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (e.target.id === 'jump-button') return;
    ballImpulse[0] = 0;
    ballImpulse[1] = 0;
    startVec = [0,0,0];
  })
};


module.exports = {$, jump};