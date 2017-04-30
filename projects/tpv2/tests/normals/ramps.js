const NormalMap = require('lib/extract-normals'),
  $ = require('lib/coolgebra'),
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

var tick = onGround;
var loop = null;


image.onload = function(){
  terrainMap = new NormalMap({image, normals, alphas: depths, sourceWidth: WIN_WIDTH, sourceHeight: WIN_HEIGHT});
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

  // ziggurat layout
  // [
  //   [569.588, 701.58],
  //   [518.59, 733.078],
  //   [424.095, 850.072],
  //   [359.598, 814.074],
  //   [359.6, 791.575],
  //   [329.6, 767.577],
  //   [290.602, 766.077],

  //   [290.602, 766.077],
  //   [329.6, 767.577],
  //   [359.6, 791.575],
  //   [359.598, 814.074],
  //   [424.095, 850.072],
  //   [518.59, 733.078],
  //   [569.588, 701.58],
  // ],
  // [
  //   [134, 155],
  //   [186, 193],
  //   [265, 146]
  // ],
  // [
  //   [898, 493],
  //   [669, 313],
  //   [620, 252],
  //   [522, 317],
  //   [384, 225],
  //   [194, 466]
  // ],
  // [
  //   [1024, 530],
  //   [999, 553],
  //   [898, 680],
  //   [769, 775.826],
  //   [665, 775.826],
  //   [620, 800],
  // ],
  // [
  //   [526, 918],
  //   [469, 962],
  //   [306, 845],
  //   [306, 828],
  //   [278, 807],
  //   [227, 804],
  //   [186, 775.826],
  //   [78, 771],
  //   [0, 724]
  // ]
];


const BOUNDARIES = (function(){
  var boundaries = [];
  for (let i = 0; i < BOUNDARY_POLYGON_POINTS.length; i++){
    var polygon = BOUNDARY_POLYGON_POINTS[i]
    for (let j = 0; j < polygon.length-1; j++){
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

// TODO: Optimize memory by only indexing normals values, reducing redundancy
function readNormal(x, y){
  if (x >= 0 && x < WIN_WIDTH && y >= 0 && y < WIN_HEIGHT) {
    var normalIndex = normals.positionNormals[WIN_WIDTH * y + x];
    var normal = normals.normals[normalIndex];
    return { normal };
  }
  else return { normal: [0, 0, -1], depth: 0 }
}


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
  for (let i = 0; i < BOUNDARY_POLYGON_POINTS.length; i++){
    for (let j = 0; j < BOUNDARY_POLYGON_POINTS[i].length; j++){
      vec = forceAwayFromVertex(point, BOUNDARY_POLYGON_POINTS[i][j], distanceThreshold);
      if (vec) proximityVector = $(proximityVector).plus(vec).$;
    }
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

  var boundaryForce = forceAwayFromBoundaries(groundPos, BOUNDARIES, DISTANCE_THRESHOLD);
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
  position = $(position).plus(forceAwayFromBoundaries(position, BOUNDARIES, DISTANCE_THRESHOLD)).$;
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
    var direction = $(newVec).minusVector(startVec).unit().$;
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