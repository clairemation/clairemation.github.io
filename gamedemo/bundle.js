function clamp(x, min, max){
  if (x < min) {return min;}
  if (x > max) {return max;}
  return x;
}

function threshold(x, threshold, min, max){
  if (x < threshold) return min;
  return max;
}
function Vec2D(args){
  this.x = args.x;
  this.y = args.y;
}

Vec2D.add = function(a, b) {
  return new Vec2D({x: a.x + b.x, y: a.y + b.y});
};

Vec2D.subtract = function(a, b) {
  return new Vec2D({x: a.x - b.x, y: a.y - b.y});
};

Vec2D.vectorMultiply = function(a,b) {
  return new Vec2D({x: a.x * b.x, y: a.y * b.y});
};

Vec2D.vectorDivide = function(a,b) {
  return new Vec2D({x: a.x / b.x, y: a.y / b.y});
};

Vec2D.dot = function(a,b) {
  return a.x * b.x + a.y * b.y;
};

Vec2D.interpolate = function(a, b, t) {
  if (t === undefined) {
    t = 0.5;
  }
  return this.add(a.multiply(1 - t), b.multiply(t));
};

Vec2D.distance = function(a,b) {
  return (this.subtract(a, b)).length();
};

Vec2D.prototype.multiply = function(s) {
  return new Vec2D({x: this.x * s, y: this.y * s});
};

Vec2D.prototype.divide = function(s) {
  return new Vec2D({x: (this.x / s), y: (this.y / s)});
};

Vec2D.prototype.length = function(s) {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2D.prototype.squaredLength = function(s) {
  return this.x * this.x + this.y * this.y;
};

Vec2D.prototype.unit = function(s) {
  return this.divide(this.length());
};

Vec2D.prototype.turnLeft = function() {
  return new Vec2D({x: -this.y, y: this.x});
};

Vec2D.prototype.turnRight = function() {
  return new Vec2D({x: this.y, y: -this.x});
};

Vec2D.prototype.normalLeft = function() {
  return this.turnLeft().unit();
};

Vec2D.prototype.normalRight = function() {
  return this.turnRight().unit();
};

Vec2D.prototype.rotate = function(angle) {
  return new Vec2D({
    x: this.x * Math.cos(angle) - this.y * Math.sin(angle),
    y: this.x * Math.sin(angle) + this.y * Math.cos(angle)
  });
};

Vec2D.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
};

Vec2D.prototype.directionTo = function(v) {
  return (Vec2D.subtract(v, this)).unit();
};

Vec2D.prototype.projectedLength = function(v) {
  return Vec2D.dot(this, v.unit());
};

Vec2D.prototype.project = function(v) {
  var direction = v.unit();
  return direction.multiply(this.projectedLength(direction));
};
function Vec3D(args){
  if (args === undefined){
    this.x=undefined;
    this.y=undefined;
    this.z=undefined;
  }
  else {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
  }
}

Vec3D.add = function(a, b) {
  return new Vec3D({x: a.x + b.x, y: a.y + b.y, z: a.z + b.z});
};

Vec3D.subtract = function(a, b) {
  return new Vec3D({x: a.x - b.x, y: a.y - b.y, z: a.z - b.z});
};

Vec3D.vectorMultiply = function(a,b) {
  return new Vec3D({x: a.x * b.x, y: a.y * b.y, z: a.z * b.z});
};

Vec3D.vectorDivide = function(a,b) {
  return new Vec3D({x: a.x / b.x, y: a.y / b.y, z: a.z / b.z});
};

Vec3D.dot = function(a,b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

Vec3D.interpolate = function(a, b, t) {
  if (t === undefined) {
    t = 0.5;
  }
  return this.add(a.multiply(1 - t), b.multiply(t));
};

Vec3D.distance = function(a,b) {
  return (this.subtract(a, b)).length();
};

Vec3D.prototype.assign = function(x, y, z){
  Vec3D.call(this, {x: x, y: y, z: z});
};

Vec3D.prototype.plusInPlace = function(s) {
  this.x = this.x + s;
  this.y = this.y + s;
  this.z = this.z + s;
};

Vec3D.prototype.minusInPlace = function(s) {
  this.x = this.x - s;
  this.y = this.y - s;
  this.z = this.z - s;
};

Vec3D.prototype.subtractVector = function(v){
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
};

Vec3D.prototype.assignDifference = function(a, b){
  this.x = a.x - b.x;
  this.y = a.y - b.y;
  this.z = a.z - b.z;
};

Vec3D.prototype.multiply = function(s) {
  return new Vec3D({x: this.x * s, y: this.y * s, z: this.z * s});
};

Vec3D.prototype.multiplyInPlace = function(s){
  this.x = (this.x * s);
  this.y = (this.y * s);
  this.z = (this.z * s);
};

Vec3D.prototype.divide = function(s) {
  return new Vec3D({x: (this.x / s), y: (this.y / s), z: (this.z / s)});
};

Vec3D.prototype.divideInPlace = function(s){
  this.x = (this.x / s);
  this.y = (this.y / s);
  this.z = (this.z / s);
};

Vec3D.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vec3D.prototype.squaredLength = function(s) {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};

Vec3D.prototype.unit = function(s) {
  return this.divide(this.length());
};

Vec3D.prototype.normalize = function(){
  this.divideInPlace(this.length());
};

Vec3D.prototype.directionTo = function(v) {
  return (Vec3D.subtract(v, this)).unit();
};

Vec3D.prototype.projectedLength = function(v) {
  return Vec3D.dot(this, v.unit());
};

Vec3D.prototype.project = function(v) {
  var direction = v.unit();
  return direction.multiply(this.projectedLength(direction));
};
// Singleton! Modular!

// IIFE!
var ArrayVec3D = (function() {

  function assign(v1, v2){
    v1[0] = v2[0];
    v1[1] = v2[1];
    v1[2] = v2[2];
  }

  function addScalar(v, s){
    return [
      v[0] + s,
      v[1] + s,
      v[2] + s
      ];
  }

  function addVectors(a,b){
    return [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2]
      ];
  }

  function subtractVectors(a,b){
    return [
      a[0] - b[0],
      a[1] - b[1],
      a[2] - b[2]
      ];
  }

  function subtractScalar(v, s){
    return [
      v[0] - s,
      v[1] - s,
      v[2] - s
      ];
  }

  function multiplyVectors(a,b){
    return [
      a[0] * b[0],
      a[1] * b[1],
      a[2] * b[2]
      ];
  }

  function multiplyByScalar(v, s){
    return [
      v[0] * s,
      v[1] * s,
      v[2] * s
      ];
  }

  function divideVectors(a,b){
    return [
      a[0] / b[0],
      a[1] / b[1],
      a[2] / b[2]
      ];
  }

  function divideByScalar(v, s){
    return [
      v[0] / s,
      v[1] / s,
      v[2] / s
      ];
  }

  function dot(a,b){
    return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  }

  function interpolate(a,b,t){
    // if (t == undefined) {
    //   t = 0.5;
    // }
    return addVectors(multiplyByScalar(a, 1-t), multiplyByScalar(b, t));
  }

  function length(v){
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function squaredLength(v){
    return (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function distance(a,b) {
    return length(subtractVectors(a, b));
  }

  function unitVector(v) {
    return divideByScalar(v, length(v));
  }

  function directionTo(a,b){
    return unitVector(subtractVectors(b,a));
  }

  function projectedLength(a,b){
    return dot(a,b);
  }

  function convertCoords(v){
    // v = unitVector(v);
    // v[0] = v[0] * 2 - 1;
    // v[1] = v[1] * 2 - 1;
    // v[2] = v[2] * 2 - 1;
    // return unitVector(v);
    return v;
  }

  return {
    addScalar: addScalar,
    addVectors: addVectors,
    assign: assign,
    subtractVectors: subtractVectors,
    subtractScalar: subtractScalar,
    multiplyVectors: multiplyVectors,
    multiplyByScalar: multiplyByScalar,
    divideVectors: divideVectors,
    divideByScalar: divideByScalar,
    dot: dot,
    interpolate: interpolate,
    length: length,
    squaredLength: squaredLength,
    distance: distance,
    unitVector: unitVector,
    directionTo: directionTo,
    projectedLength: projectedLength,
    convertCoords: convertCoords
  };

})();
function Geometry(){}

Geometry.getGeometryFromImg = function(img, startx, starty, sourceWidth, sourceHeight){

  function getImageData(){
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = sourceWidth;
    tempCanvas.height = sourceHeight;
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
    return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
  }

  var normals = getImageData();

  var unit = [0,0,0];
  var length = 0;

  for (var i = 0; i < normals.length; i+=4){
    // Normalize and convert to -1 - 1 space
    var processedNormal = ArrayVec3D.convertCoords([normals[i], normals[i+1], normals[1+2]]);

    // Write back into normals data
    normals[i] = processedNormal[0];
    normals[i+1] = processedNormal[1];
    normals[i+2] = processedNormal[2];
  }

  return normals;
}
function LightingEngine(args){
  if (args){
    this.lights = args.lights || [];
    this.entities = args.entities || [];
  }
}


LightingEngine.prototype.registerComponent = function(component){
  this.entities.push(component);
}


function LightingComponent(args){
  this.owner = args.owner;
  this.mapFrames = {
    standing: {
      N: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      NW: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      W: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      SW: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      S: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      SE: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      E: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      NE: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
    },
    running: {
      N: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      NW: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      W: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      SW: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      S: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      SE: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      E: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      NE: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      }
    },
    slashing: {
      N: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      NW: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      W: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      SW: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      S: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      SE: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      E: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      NE: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      }
    }
  };

  // Extract normals data from maps
  for (var sequence in this.mapFrames){
    for (var facing in this.mapFrames[sequence]){
      var sprite = this.mapFrames[sequence][facing];
      sprite.normals = [];
      var frameNum = 0;
      for (var i = 0; i < sprite.frameNumbers.length; i++){
        frameNumber = sprite.frameNumbers[i];
        var startX = frameNumber * this.owner.width;
        sprite.normals[i] = Geometry.getGeometryFromImg(sprite.spritesheet, startX, 0, this.owner.width, this.owner.height);
      }
    }
  }

  this.canvas = args.canvas;
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  this.engine = args.engine;
  this.engine.registerComponent(this);

}


LightingComponent.prototype.update = function(){
  var frameNum = this.owner.spriteHandler.currentAnimationFrameNumber;

  var normals = this.mapFrames[this.owner.appearance][this.owner.facing].normals[frameNum];

  for (var i = 0; i < this.engine.lights.length; i++){

    PointLight.lightCanvas({
      canvas: this.canvas,
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      ctx: this.ctx,
      normals: normals,
      lightPosition: this.engine.lights[i].position,
      lightColor: this.engine.lights[i].color,
      offset: [this.owner.x, this.owner.y, this.owner.z]
    });
  }

}
function PointLight(args){
  this.position = args.position; // array [x,y,z]
  this.color = args.color; // array [r,g,b]
  this.falloff = args.falloff; //in pixels

  // TODO: instead of a variable, make falloff a function, so a light can have a non-linear falloff if we want
}


// apply lighting to a single pixel and return the new color as [r,g,b]
PointLight.lightPixel = function(args){ // args: {normal, lightDirection, lightColor, baseColor, choke}

  // intensity = vertex perpendicular-ness to light
  var dot = ArrayVec3D.dot(args.lightDirection, args.normal);
  var intensity = Math.pow(dot, args.choke);
  intensity = clamp(intensity, 0, .65);

  // blend base color and light color based on intensity
  return ArrayVec3D.interpolate(args.baseColor, args.lightColor, intensity);
}

PointLight.lightCanvas = function(args){ // args: {canvas, ctx, offset, lightPosition, normals}

  var texture = args.ctx.getImageData(0, 0, args.canvasHeight, args.canvasWidth);
  var textureData = texture.data;

  var texturePixel = [0,0,0],
    pixelPosition = [0,0,0],
    lightDirection = [0,0,0],
    litPixel = [0,0,0];

  var i = 0;

  // Call lightPixel on each pixel
  for (var x = 0; x < args.canvasHeight; x++){
    for (var y = 0; y < args.canvasWidth; y++){

      // Calc pixel position in world space
      pixelPosition[0] = args.offset[0] + x*SCALE;
      pixelPosition[1] = args.offset[2] - args.offset[1] + y*SCALE; // z - screen y gives true y
      pixelPosition[2] = args.offset[2] + args.normals[i+3]*SCALE; // z value is stored in normalmap alpha channel

      // calculate direction from light to pixel
      lightDirection = ArrayVec3D.convertCoords(ArrayVec3D.subtractVectors(ArrayVec3D.convertCoords(args.lightPosition), ArrayVec3D.convertCoords(pixelPosition)));

      // get pixel color
      ArrayVec3D.assign(texturePixel, [textureData[i], textureData[i+1], textureData[i+2]]);

      // apply light to pixel
      litPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: false,
        choke: 5,
        falloff: 200,
        lightColor: args.lightColor,
        lightDirection: lightDirection,
        normal: [args.normals[i], args.normals[i+1], args.normals[i+2]],
        offset: args.offset
      });

      // write new pixel color back into texture data
      textureData[i] = litPixel[0];
      textureData[i+1] = litPixel[1];
      textureData[i+2] = litPixel[2];

      i += 4;
    }
  }

  // draw to canvas
  args.ctx.putImageData(texture, 0, 0);

}

var UP_PRESS = 0,
    LEFT_PRESS = 1,
    DOWN_PRESS = 2,
    RIGHT_PRESS = 3,
    UP_RELEASE = 4,
    LEFT_RELEASE = 5,
    DOWN_RELEASE = 6,
    RIGHT_RELEASE = 7,
    RUN_RIGHT = 8,
    RUN_LEFT = 9,
    RUN_UP = 10,
    RUN_DOWN = 11,
    STOP_X = 12,
    STOP_Y = 13,
    HIT = 14;
    SLASH = 15;
var FRAMERATE = 150; // milliseconds per frame
var SCALE = 0.5;
var WALKMASK_SCALE = 1;
function CollisionComponent(args){
  this.subject = args.subject;
  this.engine = args.engine;
  this.className = this.subject.className;
  this.subjectIsSolid = args.subjectIsSolid || false;
  this.mass = args.mass || 0;
  this.subjectCanCollideWith = args.subjectCanCollideWith || [];
  this.hitbox = args.hitbox || [0,0,this.subject.width,this.subject.height];
  this.reactToCollisionWith = args.reactToCollisionWith || undefined;
  this.engine.registerComponent(this);
}

CollisionComponent.prototype.update = function(){
  for (var i = 0; i < this.subjectCanCollideWith.length; i++){
    this.engine.checkForCollisionsWithClass(this, this.subjectCanCollideWith[i]);
  }
};

CollisionComponent.prototype.reactToCollisionWith = function(object){
  // implement individually for each subject class
}
// UGH
// Redo using vectors, force, acceleration, etc.
// If necessary, optimize with quadtree

function CollisionEngine(){
  this.entitiesByClass = {};
  // entitiesByClass = {
      // ClassA: [entity1, entity2, etc...],
      // ClassB: [etc]
  // }
}

CollisionEngine.prototype.registerComponent = function(component){
  if (this.entitiesByClass[component.className]){
    this.entitiesByClass[component.className].push(component);
  } else {
    this.entitiesByClass[component.className] = [component];
  }
};

CollisionEngine.prototype.deregisterComponent = function(component){
  var classArray = this.entitiesByClass[component.className];
  if (classArray){
    var index = classArray.indexOf(component);
    if (index){
      classArray.splice(index,1);
    }
  }
};

CollisionEngine.isThereACollision = function(subject, subjectHitbox, other, otherHitbox){

  // Collision is false if:

  // we are not standing at the same depth
  var zDiff = Math.abs((other.z) - (subject.z));
  var maxDepth = Math.max(other.depth, subject.depth) * SCALE;
  if (zDiff > maxDepth){
    return false;
  }

// it clears me on my left side
  if ((subject.x + subjectHitbox[0]) > (other.x  + otherHitbox[2])){
    return false;
  }

// it clears me on my right
  if ((subject.x + subjectHitbox[2]) < (other.x  + otherHitbox[0])){
    return false;
  }

// it clears me above
  if ((subject.y + subjectHitbox[1]) > (other.y  + otherHitbox[3])){
    return false;
  }

  // it clears me below
  if ((subject.y + subjectHitbox[3]) < (other.y +  otherHitbox[1])){
      return false;
  }

  // otherwise, collision is true
  return true;

}

CollisionEngine.prototype.checkForCollisionsWithClass = function(myComponent, className){

  var subject = myComponent.subject;
  if (subject.acceleration == [0,0]){
    return;
  }
  var entitiesInClass = this.entitiesByClass[className];
  if (!entitiesInClass){return;}
  for (var i = 0; i < entitiesInClass.length; i++){
    var otherComponent = entitiesInClass[i];
    var otherObject = otherComponent.subject;
    if (otherObject != subject) {

      if (CollisionEngine.isThereACollision(subject, myComponent.hitbox, otherObject, otherComponent.hitbox)){
        myComponent.reactToCollisionWith(otherComponent);
      }
    }
  }
};
// REDO

function ImpulseComponent(subject, accelRate){
  this.subject = subject;
  this.rateOfAcceleration = accelRate || 2 // default
}

ImpulseComponent.prototype.update = function(){
  // Apply impulse to entity's acceleration, clamp to max speed
  if (Math.abs(this.subject.acceleration[0]) < this.subject.maxSpeed){
    this.subject.acceleration[0] += this.rateOfAcceleration * this.subject.impulse.x
  }
  if (Math.abs(this.subject.acceleration[1]) < this.subject.maxSpeed){
    this.subject.acceleration[1] += this.rateOfAcceleration * this.subject.impulse.y;
  }
}
// REDO

function moveComponent(obj){
  if (obj.acceleration == [0,0]){
    return;
  }
  obj.x += Math.floor(obj.acceleration[0]);
  obj.y += Math.floor(obj.acceleration[1]);
  if (obj.onGround){
    obj.z = obj.y + obj.height*SCALE;
  }
}
// REDO

function MovementComponent(args) {
  this.speed = 0;
  this.impulse = 0;
  this.maxImpulse = 7;
  this.direction = new Vec2D({
    x: 1, y: 0
  });
  this.velocity = new Vec2D({
    x: 0, y: 0
  });
}
function InertiaComponent(subject, decelRate){
  this.subject = subject;
  this.rateOfDeceleration = decelRate || 1.5;
}

InertiaComponent.prototype.update = function(){

  // Always nudge acceleration back towards 0, clamp to 0

  // TODO: make a fucking clamp function

  if (this.subject.acceleration[0] > 0){
    this.subject.acceleration[0] -= this.rateOfDeceleration;
    if (this.subject.acceleration[0] < 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[0] < 0){
    this.subject.acceleration[0] += this.rateOfDeceleration;
    if (this.subject.acceleration[0] > 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[1] > 0){
    this.subject.acceleration[1] -= this.rateOfDeceleration;
    if (this.subject.acceleration[1] < 0){
      this.subject.acceleration[1] = 0;
    }
  }

  if (this.subject.acceleration[1] < 0){
    this.subject.acceleration[1] += this.rateOfDeceleration;
    if (this.subject.acceleration[1] > 0){
      this.subject.acceleration[1] = 0;
    }
  }

}
//* GENERIC SPRITE COMPONENT

function SpriteComponent(subject, engine, sprite){
  this.subject = subject;
  this.sprite = sprite || document.createElement("canvas");
  this.sprite.width = this.subject.width;
  this.sprite.height = this.subject.height;
  this.drawingContext = this.sprite.getContext("2d");
  this.engine = engine;
  this.engine.registerComponent(this);
}

//* ANIMATED SPRITE COMPONENT =====================

// TO DO: optimize so frame only redraws upon a state change


function AnimatedSpriteComponent(subject, engine, args){ // < SpriteComponent
  if (!args){
    args = {};
  }
  SpriteComponent.apply(this,[subject,engine]);
  this.frameSequence = args.frameSequence;
  this.currentAnimationFrameNumber = args.currentAnimationFrameNumber || 0;
  this.lastTime = undefined; // BAD
  this.plugins = args.plugins || [];
}

AnimatedSpriteComponent.prototype = Object.create(SpriteComponent.prototype);
AnimatedSpriteComponent.constructor = AnimatedSpriteComponent;

AnimatedSpriteComponent.prototype.update = function(timestamp){
  this.advanceFrame(timestamp);
}

AnimatedSpriteComponent.prototype.advanceFrame = function(timestamp){
  if (!this.lastTime){
    this.lastTime = timestamp;
  }
  var advance = false;
  var delta = timestamp - this.lastTime;
  var frameAdvance = Math.floor(delta / FRAMERATE);
  if (frameAdvance >= 1){
    this.currentAnimationFrameNumber = this.currentAnimationFrameNumber + frameAdvance;
    advance = true;
    this.lastTime = timestamp;
  }
  // Reset completed frame sequences to 0
  if (this.currentAnimationFrameNumber >= this.frameSequence[this.subject.appearance][this.subject.facing].frames.length) {
    this.currentAnimationFrameNumber = this.frameSequence[this.subject.appearance][this.subject.facing].frames[0];
  }
  if (advance){
    this.sprite.width = this.sprite.width; // clears canvas, currently faster in most browsers than vvv
    // this.drawingContext.clearRect(0,0,this.subject.width, this.subject.height);
    this.drawingContext.drawImage(
      this.frameSequence[this.subject.appearance][this.subject.facing].spritesheet, //source image
      (this.currentAnimationFrameNumber * this.subject.width), //origin x
      0, //origin y
      this.subject.width,
      this.subject.height,
      0,0,
      this.subject.width, this.subject.height
    );

    // Run all plugins
    // (currently just lighting)
    if (this.plugins){
      for (var i = 0; i < this.plugins.length; i++){
        this.plugins[i].update();
      }
    }
  }
}

SpriteComponent.prototype.hurtEffect = function(){
  this.colorIn('white');
}

SpriteComponent.prototype.colorIn =
function(colorString){
  this.drawingContext.globalCompositeOperation = "source-in";
  this.drawingContext.fillStyle = colorString;
  this.drawingContext.fillRect(0,0,this.subject.width,this.subject.height);

  // Set back to default
  this.drawingContext.globalCompositeOperation = "source-over";
}
function SpriteEngine(args){
  this.output = args.output;
  this.entitiesByDepthOrder = [];
  this.ctx = this.output.getContext('2d');
};

SpriteEngine.prototype.registerComponent = function(component){
  this.entitiesByDepthOrder.push(component);
};

SpriteEngine.prototype.deregisterComponent = function(component){
  var index = this.entitiesByDepthOrder.indexOf(component);
  if (index){
    this.entitiesByDepthOrder.splice(index,1);
  }
}

SpriteEngine.prototype.update = function(){
  // Sort entities by z position (depth)
  this.entitiesByDepthOrder.sort(function(a, b){
    return ((a.subject.z) - (b.subject.z));
  });

  // TODO: Optimize - keep track of this manually and spare the save & restore ops
  this.ctx.save();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.clearRect(0, 0, 1024, 768);
  this.ctx.restore();

  // Draw all entities from back to front
  for (var i = 0; i < this.entitiesByDepthOrder.length; i++){
          this.drawEntity(this.entitiesByDepthOrder[i]);
  }
};

SpriteEngine.prototype.drawEntity = function(entity){
  this.ctx.drawImage(
          entity.sprite, //image
          0, 0, //origin x, y
          entity.sprite.width, entity.sprite.height, //origin w & h
          entity.subject.x, entity.subject.y, //map position
          (entity.sprite.width * SCALE), //drawn width and height
          (entity.sprite.height * SCALE)
        );
};
// TODO
// Redo using a path for walkmask & simply direct character along the tangent upon collision

// Slide along a wall if hitting it at a tangent, otherwise bounce off
function groundIsWalkableComponent(obj){

  // Convert direction from numbers to cardinal directions e.g. NE, S, SW
  var accelerationDirection =
  ["N", "", "S"][Math.sign(obj.acceleration[1]) + 1]
  +
  ["W", "", "E"][Math.sign(obj.acceleration[0]) + 1];

  // check character's test pixel in given direction
  function groundSpotCheck(obj, direction){
    var sample = walkmask.getImageData(
          (Math.floor((obj.x + (obj.feetpoint[direction][0] * SCALE)) * WALKMASK_SCALE)),
          (Math.floor((obj.y + (obj.feetpoint[direction][1] * SCALE)) * WALKMASK_SCALE)),
          1,1
        );
    return (sample.data[0] == 255);
    // True (walkable) if white. Black and white image so we only need to check one channel
  }

  // this is some shit
  var directionNeighbors = {
    "N": ["NW", "NE"],
    "NW": ["N", "W"],
    "W": ["NW", "SW"],
    "SW": ["W", "SE"],
    "S": ["SW", "SE"],
    "SE": ["S", "E"],
    "E": ["SE", "NE"],
    "NE": ["N", "E"]
  };

  //if not moving, no need to check
  if (accelerationDirection === ""){
    return;
  }
  // if walkable, no intervention needed
  if (groundSpotCheck(obj, accelerationDirection)){
    return;
  }

  // Otherwise the space is not walkable.
  // Next test the diagonals for walkability
  // Note: this is terrible
  var secondaryDirection = directionNeighbors[accelerationDirection][0];
  var tertiaryDirection = directionNeighbors[accelerationDirection][1];
  var oldSpeed = null,
    newSpeedX = null,
    newSpeedY = null,
    newVector = null;
  // Original speed = whichever acceleration factor wasn't 0
  if (obj.acceleration[0] === 0){
    oldSpeed = Math.abs(obj.acceleration[1]);
  } else {
    oldSpeed = Math.abs(obj.acceleration[0]);
  }
  // If new direction is ok, change to new direction and continue acceleration
  // TO DO: DRY this up
  // also check max speed first instead of clamping, to avoid inadvertantly neutralizing non-impulse-caused acceleration
  if (groundSpotCheck(obj, secondaryDirection) === true){
    newVector = obj.directionToImpulse(secondaryDirection);
    newSpeedX = oldSpeed + 1.25;
    if (newSpeedX > obj.maxSpeed){
      newSpeedX = obj.maxSpeed;
    }
    newSpeedY = oldSpeed + 1.25;
    if (newSpeedY > obj.maxSpeed){
      newSpeedY = obj.maxSpeed;
    }
    obj.acceleration = [newSpeedX * newVector[0], newSpeedY * newVector[1]];
    return;
  };
  if (groundSpotCheck(obj, tertiaryDirection) === true){
    newVector = obj.directionToImpulse(tertiaryDirection);
    newSpeedX = oldSpeed + 1.25;
    if (newSpeedX > obj.maxSpeed){
      newSpeedX = obj.maxSpeed;
    }
    newSpeedY = oldSpeed + 1.25;
    if (newSpeedY > obj.maxSpeed){
      newSpeedY = obj.maxSpeed;
    }
    obj.acceleration = [newSpeedX * newVector[0], newSpeedY * newVector[1]];
    return;
  };
  // If all directions fail, bounce off
  obj.acceleration = [obj.acceleration[0] * -.75, obj.acceleration[1] * -.75];
  return;
};
function CameraMode(scene){
  this.scene = scene;
}


function StaticMode(scene){
  CameraMode.call(this, scene);
}

StaticMode.prototype.update = function(){}


function FollowMode(args){
  CameraMode.call(this, args.scene);
  this.target = args.target;
  this.margin = args.margin || {
    top: 200,
    left: 200,
    right: 200,
    bottom: 150
  };
}

FollowMode.prototype.update = function(){

  var scrollX = 0,
      scrollY = 0,

      targetTop = this.target.y,
      targetBottom = this.target.y + (this.target.height * SCALE),
      targetLeft = this.target.x,
      targetRight = this.target.x + (this.target.width * SCALE),

      topBoundary = this.scene.scrollY + this.margin.top,
      bottomBoundary = this.scene.scrollY + this.scene.height - this.margin.bottom,
      leftBoundary = this.scene.scrollX + this.margin.left,
      rightBoundary = this.scene.scrollX + this.scene.width - this.margin.right;

  if (targetTop < topBoundary){
    scrollY = targetTop - topBoundary;
  } else if (targetBottom > bottomBoundary){
    scrollY = targetBottom - bottomBoundary;
  }

  if (targetLeft < leftBoundary){
    scrollX = targetLeft - leftBoundary;
  } else if (targetRight > rightBoundary){
    scrollX = targetRight - rightBoundary;
  }

  this.scene.scrollBy(scrollX, scrollY);

}


function Scene(args){
  if (!args){
    args = {};
  }
  this.layers = args.layers || [];
  this.htmlElement = args.htmlElement || document.getElementById("display");
  if (args.width){
    this.width = args.width
  } else {
    var width = this.htmlElement.style.width;
    this.width = parseInt(width.substring(0, width.length - 2));
    var height = this.htmlElement.style.height;
    this.height = parseInt(height.substring(0, height.length - 2));
  };
  this.scrollX = args.scrollX || 0;
  this.scrollY = args.scrollY || 0;
  this.cameraMode = new StaticMode({
    scene: this
  })
};

Scene.prototype.addInFront = function(layer){
  this.layers.push(layer);
  this.htmlElement.appendChild(layer.html);
}

Scene.prototype.addBehind = function(layer){
  this.layers.unshift(layer);
  this.htmlElement.insertBefore(layer.html, this.htmlElement.childNodes[0]);
}

Scene.prototype.scrollBy = function(x, y){
  this.scrollX += x;
  this.scrollY += y;
  for (var i = 0; i < this.layers.length; i++){
    this.layers[i].scrollBy(x, y);
  }
}

Scene.prototype.follow = function(target){
  this.cameraMode = new FollowMode({
    scene: this,
    target: target
  });
}

Scene.prototype.unfollow = function(){
  this.cameraMode = new StaticMode(this);
}

Scene.prototype.update = function(){
  this.cameraMode.update();
}


function Layer(args){
  this.scene = args.scene;
  this.left = args.left || 0;
  this.top = args.top || 0;
  this.parallaxScale = args.parallaxScale || 1; // modifier to scroll faster or slower
  this.html = document.createElement("div");
  this.html.width = args.width || 0;
  this.html.height = args.height || 0;
  this.html.setAttribute("class", "layer");
  this.html.style.left = this.left;
  this.html.style.top = this.top;
  this.scene.addInFront(this);
}

Layer.prototype.updatePosition = function(){
  this.html.style.left = this.left + "px";
  this.html.style.top = this.top + "px";
}

Layer.prototype.moveBy = function(x, y){
  this.left += x;
  this.top += y;
  this.updatePosition();
}

Layer.prototype.moveTo = function(x, y){
  this.left = x;
  this.top = y;
  this.updatePosition();
}


function ImageLayer(args){ // < Layer
  Layer.call(this, args);
  this.content = args.content;
  this.html.width = this.content.width;
  this.html.height = this.content.height;
  this.html.appendChild(this.content);
}

ImageLayer.prototype = Object.create(Layer.prototype);
ImageLayer.prototype.constructor = ImageLayer;

ImageLayer.prototype.scrollBy = function(x, y){
  this.moveBy(-x * this.parallaxScale, -y * this.parallaxScale);
}


function SpriteLayer(args){ // < Layer
  Layer.call(this, args);
  this.content = args.content || document.createElement("canvas");
  this.content.width = args.width || this.scene.width;
  this.content.height = args.height || this.scene.height;
  this.context = this.content.getContext("2d");
  this.html.appendChild(this.content);
}

SpriteLayer.prototype = Object.create(Layer.prototype);
SpriteLayer.prototype.constructor = SpriteLayer;

SpriteLayer.prototype.scrollBy = function(x, y){
  this.context.translate(-x * this.parallaxScale, -y * this.parallaxScale);
}
function PhysicalEntity(className, args){
  this.className = (className || 'PhysicalEntity');
  this.width = args===undefined ? 0 : args.width || 0;
  this.height = args===undefined ? 0 : args. height || 0;
  this.centerPoint = new Vec2D({
    x: this.width / 2,
    y: this.height / 2
  });
  this.depth = args===undefined ? 0 : args.depth || 0;
  this.x = args===undefined ? 0 : args.x || 0;
  this.y = args===undefined ? 0 : args.y || 0;
  this.z = args===undefined ? 0 : args.z || 0;
  this.position = new Vec3D({
    x: this.x,
    y: this.z,
    z: this.z
  });
}

PhysicalEntity.prototype.changeAppearance = function(target){
  if (this.appearance != target){
    this.appearance = target;
  }
};

// TO DO: pass message in parameters
// Move hitMessage into collision component
PhysicalEntity.prototype.message = function(recipient, message){
  recipient.receiver(message, this);
};

PhysicalEntity.prototype.receiver = function(message, sender){};

PhysicalEntity.prototype.update = function(){};

PhysicalEntity.prototype.updateFacing = function(){
  if (this.impulse.x === 0 && this.impulse.y === 0){
    return;
  }
  this.facing =
    ["N", "", "S"][this.impulse.y + 1] + ["W", "", "E"][this.impulse.x + 1];
};

PhysicalEntity.prototype.directionTo = function(other){
  var y = null,
    x = null;
  if (this.z > other.z){
    y = -1;
  } else if (this.z === other.z) {
    y = 0;
  } else {
    y = 1;
  }
  if ((this.x + (this.width * SCALE)/2) > (other.x + (other.width * SCALE)/2)){
    x = -1;
  } else if ((this.x + this.width/2) == (other.x + other.width/2)) {
    x = 0;
  } else {
    x = 1;
  }
  return (
  ["N", "", "S"][y + 1]
  +
  ["W", "", "E"][x + 1]
  );
};

PhysicalEntity.prototype.directionToImpulse = function(direction){
  return {
    "N": [0,-1],
    "NW": [-1,-1],
    "W": [-1,0],
    "SW": [-1,1],
    "S": [0,1],
    "SE": [1,1],
    "E": [1,0],
    "NE": [1,-1]
  }[direction];
};

PhysicalEntity.prototype.bounceBack = function(direction){
  if (Math.sign(this.acceleration[0]) == direction[0]){
    this.acceleration[0] *= -0.85;
  }
  if (Math.sign(this.acceleration[1]) == direction[1]){
    this.acceleration[1] *= -0.85;
  }
};
function Actor(className){ // < PhysicalEntity
  PhysicalEntity.call(this, (className || 'Actor'), {
    width: 400,
    height: 400,
    depth: 50
  });

  //* STATE ==================
  this.name = "hero";
  this.impulse = {x: 0, y:0};
  this.facing = "E";
  this.appearance = "standing";

  this.onGround = true;

  this.speed = 0;
  this.velocity = new Vec3D({
    x: 0, y: 0, z: 0
  });
  this.acceleration = [0,0];
  this.pushability = 1.7;
  this.maxSpeed = 12;

  this.state = new NormalState(this);

  this.spriteHandler = new AnimatedSpriteComponent(this, spriteEngine, {
    frameSequence: {
      "standing": {
        "N": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "NW": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "W": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "SW": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "S": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "SE": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "E": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "NE": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
      },
      "running": {
        "N": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "NW": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "W": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "SW": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "S": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "SE": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "E": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "NE": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        }
      },
      "slashing": {
        "N": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "NW": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "W": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "SW": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "S": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "SE": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "E": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "NE": {
          frames: [0],
          spritesheet: images.heroSlashRight
        }
      }
    }
  });



  this.impulseHandler = new ImpulseComponent(this);

  this.inertiaHandler = new InertiaComponent(this);

  // this.moveHandler = new moveComponent({
  //   owner: this;

  // }

  this.collisionHandler = new CollisionComponent({
    subject: this,
    engine: collisionEngine,
    subjectIsSolid: true,
    mass: 1,
    hitbox: [125*SCALE,30*SCALE,265*SCALE,380*SCALE],
    subjectCanCollideWith: ['Actor', 'Fireball', 'Crystal'],
    reactToCollisionWith: function(object){
      // if the object is solid, bounce back
      if (this.subjectIsSolid && object.subjectIsSolid){
        var direction = this.subject.directionToImpulse(this.subject.directionTo(object.subject));
        this.subject.message(object.subject, "push");
        this.subject.bounceBack(direction);
      }
    }
  });

  this.weapon = new Knife({
    owner: this
  });

  this.feetpoint = { // test pixels for ground checks
    "N": [200, 345],
    "NW": [120, 345],
    "W": [120, 390],
    "SW": [120, 410],
    "S": [200, 410],
    "SE": [280, 410],
    "E": [280,390],
    "NE": [280,345]
  };

}

//* METHODS =================

//* INHERIT METHODS FROM BASE GAME ENTITY ===========
Actor.prototype = Object.create(PhysicalEntity.prototype);
Actor.prototype.constructor = Actor;

//* OWN METHODS ===============

Actor.prototype.receiver = function(message, sender){

  if (message == "damage"){

    // YES THIS IS MESSY
    // Testing vector math, will eventually integrate vectors programwide so we don't have to create them here.

    var actorPt = new Vec2D({
      x: this.x + this.width*SCALE / 2,
      y: this.y + this.height*SCALE / 2
    });

    var otherPt = new Vec2D({
      x: sender.x + sender.width*SCALE / 2,
      y: sender.y + sender.height*SCALE / 2
    });

    var direction = actorPt.directionTo(otherPt);
    this.acceleration[0] = direction.x * -10;
    this.acceleration[1] = direction.y * -10;

    // hurt effects
    this.state = new HurtState(this);

  }

  else if (message == "push"){
    this.acceleration[0] += sender.acceleration[0] * this.pushability;
    this.acceleration[1] += sender.acceleration[1] * this.pushability;
  }

};

Actor.prototype.update = function(timestamp){
  this.state.update(timestamp);
};
function Player(className){ // < Actor
  Actor.call(this, (className || 'Player'));
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

Player.prototype.command = function(input){
  switch (input){
    case (RUN_UP):
      this.impulse.y = -1;
      this.changeAppearance("running");
    break;
    case (RUN_LEFT):
      this.impulse.x = -1;
      this.changeAppearance("running");
    break;
    case(RUN_DOWN):
      this.impulse.y = 1;
      this.changeAppearance("running");
    break;
    case(RUN_RIGHT):
      this.impulse.x = 1;
      this.changeAppearance("running");
    break;
    case (STOP_X):
      this.impulse.x = 0;
      if (this.impulse.y === 0){
        this.changeAppearance("standing");
      }
    break;
    case (STOP_Y):
      this.impulse.y = 0;
      if (this.impulse.x === 0){
        this.changeAppearance("standing");
      }
    break;
    case (SLASH):
      this.changeAppearance("slashing");
      this.state = this.weapon.useState;
  }
  this.updateFacing();
}
function Fireball(className){ // < PhysicalEntity
  PhysicalEntity.call(this, (className || 'Fireball'));
  this.name = "fireball";
  this.facing = null;
  this.onGround = false;
  this.width = 400;
  this.height = 400;
  this.depth = 400;
  this.x = -400;
  this.y = -400;
  this.originalX = 2200;
  this.originalY = -50;
  this.z = 1150;
  this.acceleration = [-14, 2];
  this.originalAcceleration = [-14, 2];

  this.spriteHandler = new SpriteComponent(this, spriteEngine);
  // draw fireball
  this.spriteHandler.drawingContext.beginPath();
  this.spriteHandler.drawingContext.arc(200,200,200,0,2*Math.PI, this.false);
  var gradient = this.spriteHandler.drawingContext.createRadialGradient(200,200,0,310,100,180);
  gradient.addColorStop('0', 'hsl(350, 10%, 20%)');
  gradient.addColorStop('.4', 'hsl(350,10%,20%)');
  gradient.addColorStop('.4', 'hsla(50,100%,75%,1)');
  gradient.addColorStop('.8', 'hsla(0,100%,50%,.4)');
  gradient.addColorStop('1', 'hsla(0,100%,50%,0)');
  this.spriteHandler.drawingContext.fillStyle = gradient;
  this.spriteHandler.drawingContext.fill();

  this.collisionHandler = new CollisionComponent({
    subject: this,
    engine: collisionEngine,
    hitbox: [100*SCALE,100*SCALE,300*SCALE,300*SCALE],
    subjectIsSolid: false,
    subjectCanCollideWith: ['Player'],
    reactToCollisionWith: function(componentHit){
      this.subject.message(componentHit.subject, "damage");
    }
  });
}

Fireball.prototype = Object.create(PhysicalEntity.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.prototype.receiver = function(message, sender){
  if (message == "damage"){
    this.acceleration[0] *= -1;
  }
};

Fireball.prototype.update = function(){

  // Fall in an arc, reset upon hitting the ground

  this.collisionHandler.update();
  moveComponent(this);

  if (this.y >= (this.z - (this.height)*SCALE)){
    //restart
    this.x = this.originalX;
    this.y = this.originalY;
    this.acceleration = [this.originalAcceleration[0], this.originalAcceleration[1]];
  }

  this.acceleration[1] *= 1.06;
};
function Weapon(args){ // < PhysicalEntity
  PhysicalEntity.call(this, args.className || "Weapon");
  this.owner = args.owner;
  this.onGround = false;
  this.depth = args.depth;
  this.hitboxes = args.hitboxes;
  this.collisionHandler = new CollisionComponent({
    subject: this,
    engine: collisionEngine,
    hitbox: [],
    subjectIsSolid: false,
    subjectCanCollideWith: ['Actor', 'Fireball'],
    reactToCollisionWith: function(componentHit){
      this.message(componentHit.subject, "damage");
    }.bind(this)
  });
}

Weapon.prototype = Object.create(PhysicalEntity.prototype);
Weapon.prototype.constructor = Weapon;



function Knife(args){ // < Weapon < PhysicalEntity
  Weapon.call(this, {
    className: "Knife",
    owner: args.owner,
    depth: args.owner.depth * 2,
    strikeType: "damage",
    hitboxes: {
      W: [50*SCALE, 54*SCALE, 198*SCALE, 316*SCALE],
      E: [214*SCALE, 16*SCALE, 354*SCALE, 285*SCALE],
      N: [50*SCALE, 54*SCALE, 198*SCALE, 316*SCALE],
      S: [214*SCALE, 16*SCALE, 354*SCALE, 285*SCALE]
    }
  });
  this.useState = new SlashingState(this.owner);
}

Knife.prototype = Object.create(Weapon.prototype);
Knife.prototype.constructor = Knife;


Knife.prototype.update = function(){
  this.z = this.owner.z;
  this.collisionHandler.hitbox = [
    this.hitboxes[this.owner.facing][0] + this.owner.x,
    this.hitboxes[this.owner.facing][1] + this.owner.y,
    this.hitboxes[this.owner.facing][2] + this.owner.x,
    this.hitboxes[this.owner.facing][3] + this.owner.y,
    ];
  this.collisionHandler.update();
};


// SlashingState: state state for knife owner to use.
// We keep a single instance stored in the knife object, and keep resetting that one and reassigning it. This is because it may be swapped to very frequently, so we won't be allocating for a new object every time.

function SlashingState(subject){
  this.subject = subject;
  this.countdown = 5;
}

SlashingState.prototype.update = function(timestamp){
  this.subject.weapon.update();
  this.subject.inertiaHandler.update();
  groundIsWalkableComponent(this.subject);
  this.subject.collisionHandler.update();
  moveComponent(this.subject);
  this.subject.spriteHandler.update(timestamp);

  this.countdown --;
  if (this.countdown <= 0){
    this.countdown = 5;
    this.subject.state = new NormalState(this.subject);
  }
};
//* state STATES ======================

// TODO: Store an instance of NormalState in the subject, so as not to allocate & destroy it every time we return from e.g. SlashingState

function NormalState(subject){
  this.subject = subject;
  if (this.subject.impulse.x === 0 && this.subject.impulse.y === 0){
    this.subject.appearance = "standing";
  } else {
    this.subject.appearance = "running";
  }
}

NormalState.prototype.update = function(timestamp){
  // Hot-swappable -- but careful of the order!
  // Check for walls and obstacles AFTER all updates are made to impulse and inertia
  this.subject.impulseHandler.update(); // apply impulse to acceleration
  this.subject.inertiaHandler.update(); // gradual acceleration falloff
  groundIsWalkableComponent(this.subject); // walls stop you or nudge you along at a diagonal
  this.subject.collisionHandler.update(); // you react to obstacles
  moveComponent(this.subject); // finally apply all movement calculations to position
  this.subject.spriteHandler.update(timestamp); // update sprite
};


// Hurt state: remove control and add flashing-white sprite effect for 5 ticks

function HurtState(subject){
  this.subject = subject;
  this.countdown = 5;
}

HurtState.prototype.update = function(timestamp){
  this.subject.inertiaHandler.update();
  groundIsWalkableComponent(this.subject);
  this.subject.collisionHandler.update();
  moveComponent(this.subject);
  this.subject.spriteHandler.update(timestamp);

  this.subject.spriteHandler.hurtEffect();

  this.countdown --;
  if (this.countdown <= 0){
    this.subject.state = new NormalState(this.subject);
  }
};
var walkmaskCvs = document.createElement("canvas");
walkmaskCvs.width = 2048;
walkmaskCvs.height = 1700;
var walkmask = walkmaskCvs.getContext("2d");

var normalmaskCvs = document.createElement("canvas");
normalmaskCvs.width = 400;
normalmaskCvs.height = 400;
var normalmap = normalmaskCvs.getContext('2d');

var images = {}; // will contain all Image objects

var imagesToLoad = [
  // name, src, width, height
  ["background", "assets/lavabg5big.jpg", 2048, 1536],
  ["backgroundfront", "assets/lavabg-front.png", 2048, 1700],
  ["backgroundback", "assets/lavabg-back.jpg", 2048, 1700],
  ["heroStandingLeft", "assets/hero_standing_left.png", 400, 400],
  ["heroStandingRight", "assets/hero_standing_right.png", 400, 400],
  ["heroRunLeft", "assets/hero_run_left.png", 1600, 400],
  ["heroRunRight", "assets/hero_run_right.png", 1600, 400],
  ["heroSlashLeft", "assets/hero_slash_left.png", 400, 400],
  ["heroSlashRight", "assets/hero_slash_right.png", 400, 400],
  ["bgmask", "assets/lavabg7.svg", 2048, 1700],
  ["walkmask", walkmaskSrc, 2048, 1700], // walkmaskSrc is in ./globals.js
  ["heroStdLMap", "assets/hero_standing_left_map.png", 400, 400],
  ["heroStdRMap", "assets/hero_standing_right_map.png", 400, 400],
  ["heroRunLMap", "assets/hero_run_left_map.png", 1600, 400],
  ["heroRunRMap", "assets/hero_run_right_map.png", 1600, 400]
];

// Create the Image objects from the specs in imagesToLoad
for (var i = 0; i < imagesToLoad.length; i++){
  images[imagesToLoad[i][0]] = new Image(imagesToLoad[i][2], imagesToLoad[i][3]);
  // e.g. images['background'] = new Image(w, h)
  images[imagesToLoad[i][0]].src = imagesToLoad[i][1];
  // e.g. images['background'].src = 'backgroundimage.jpg'
}

// Wait until all images are loaded
// must check at intervals so it does not block loading and get stuck forever
loadCheckLoop = setInterval(function(){

  if (imagesToLoad.length <= 0){
    // If all images are loaded, stop loop, do stuff that had to wait for this, then start game loop

    clearInterval(loadCheckLoop);

    walkmask.drawImage(images.walkmask,0,0,2048,1700,0,0,2048,1700);

    beginGameLoop();
  }

  for (var i = 0; i < imagesToLoad.length; i++){
    if (images[imagesToLoad[i][0]].complete){
      imagesToLoad.splice(i,1);
    }
  }
}, 10);
window.addEventListener("keydown", function(e){
  switch (e.keyCode){
    case 37:
      e.preventDefault();
      keyHandler.register(LEFT_PRESS);
      break;
    case 38:
      e.preventDefault();
      keyHandler.register(UP_PRESS);
      break;
    case 39:
      e.preventDefault();
      keyHandler.register(RIGHT_PRESS);
      break;
    case 40:
      e.preventDefault();
      keyHandler.register(DOWN_PRESS);
      break;
    case 32:
      e.preventDefault();
      hero.command(SLASH);
      break;
  }
});

window.addEventListener("keyup", function(e){
  switch (e.keyCode){
    case 37:
      keyHandler.register(LEFT_RELEASE);
      break;
    case 38:
      keyHandler.register(UP_RELEASE);
      break;
    case 39:
      keyHandler.register(RIGHT_RELEASE);
      break;
    case 40:
      keyHandler.register(DOWN_RELEASE);
      break;
  }
});


//* GAME CONTROLLER ====================
function GameController(){

}
GameController.prototype.command = function(obj, input){
  obj.command(input);
};


//* BUTTON COMPONENTS ===================

// TO DO: put inside keyhandler class

// FSM for X and Y button states, to manage multiple-key inputs

var xNeutral = function(input){
  switch (input){
    case (LEFT_PRESS):
      hero.command(RUN_LEFT);
      keyHandler.xArrowKeyHandler = leftArrowPressed;
    break;
    case (RIGHT_PRESS):
      hero.command(RUN_RIGHT);
      keyHandler.xArrowKeyHandler = rightArrowPressed;
    break;
  }
};

var leftArrowPressed = function(input){
  switch (input){
    case (LEFT_RELEASE):
      hero.command(STOP_X);
      keyHandler.xArrowKeyHandler = xNeutral;
    break;
    case (RIGHT_PRESS):
      hero.command(RUN_RIGHT);
      keyHandler.xArrowKeyHandler = leftAndRightArrowsPressed;
    break;
  }
};

var rightArrowPressed = function(input){
  switch (input){
    case (RIGHT_RELEASE):
      hero.command(STOP_X);
      keyHandler.xArrowKeyHandler = xNeutral;
    break;
    case (LEFT_PRESS):
      hero.command(RUN_LEFT);
      keyHandler.xArrowKeyHandler = leftAndRightArrowsPressed;
      break;
  }
};

var leftAndRightArrowsPressed = function(input){
  switch (input){
    case (LEFT_RELEASE):
      hero.command(RUN_RIGHT);
      keyHandler.xArrowKeyHandler = rightArrowPressed;
    break;
    case (RIGHT_RELEASE):
      hero.command(RUN_LEFT);
      keyHandler.xArrowKeyHandler = leftArrowPressed;
    break;
  }
};

var yNeutral = function(input){
  switch (input){
    case (UP_PRESS):
      hero.command(RUN_UP);
      keyHandler.yArrowKeyHandler = upArrowPressed;
    break;
    case (DOWN_PRESS):
      hero.command(RUN_DOWN);
      keyHandler.yArrowKeyHandler = downArrowPressed;
    break;
  }
};

var upArrowPressed = function(input){
  switch (input){
    case (UP_RELEASE):
      hero.command(STOP_Y);
      keyHandler.yArrowKeyHandler = yNeutral;
    break;
    case (DOWN_PRESS):
      hero.command(RUN_DOWN);
      keyHandler.yArrowKeyHandler = upAndDownArrowsPressed;
    break;
  }
};

var downArrowPressed = function(input){
  switch (input){
    case (DOWN_RELEASE):
      hero.command(STOP_Y);
      keyHandler.yArrowKeyHandler = yNeutral;
    break;
    case (UP_PRESS):
      hero.command(RUN_UP);
      keyHandler.yArrowKeyHandler = upAndDownArrowsPressed;
      break;
  }
};

var upAndDownArrowsPressed = function(input){
  switch (input){
    case (UP_RELEASE):
      hero.command(RUN_DOWN);
      keyHandler.yArrowKeyHandler = downArrowPressed;
    break;
    case (DOWN_RELEASE):
      hero.command(RUN_UP);
      keyHandler.yArrowKeyHandler = upArrowPressed;
    break;
  }
};

function KeyHandlerClass(){
  this.xArrowKeyHandler = xNeutral;
  this.yArrowKeyHandler = yNeutral;
}
KeyHandlerClass.prototype.register = function(input){
  this.xArrowKeyHandler(input);
  this.yArrowKeyHandler(input);
};

var keyHandler = new KeyHandlerClass();
function radToDeg(x){
  return x * 180 / Math.PI;
}

var startVec = new Vec2D({x: 0, y: 0});

window.addEventListener('touchstart', function(e){
  e.preventDefault();
  var touch = e.changedTouches[0];

  startVec.x = touch.clientX;
  startVec.y = touch.clientY;
});

window.addEventListener('touchend', function(e){
  e.preventDefault();
    keyHandler.register(LEFT_RELEASE);
    keyHandler.register(RIGHT_RELEASE);
    keyHandler.register(UP_RELEASE);
    keyHandler.register(DOWN_RELEASE);
});

window.addEventListener('touchmove', function(e){
  e.preventDefault();
  var touch = e.changedTouches[0];
  var newVec = new Vec2D({x: touch.clientX, y: touch.clientY});
  newVec = Vec2D.subtract(newVec, startVec);
  var angle = newVec.angle();
  var degrees = radToDeg(angle);

  if (degrees < 0){
    // top half of circle;
    if (degrees > -25) {
      // right
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
    }
    else if (degrees > -65) {
      // right and up
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
    }
    else if (degrees > -115) {
      // up
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
    }
    else if (degrees > -155) {
      // left and up
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
    }
    else {
      // left
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
    }
  }
  else {
    // bottom half of circle
    if (degrees < 25) {
      // right
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
    }
    else if (degrees < 65) {
      // right and down
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
    }
    else if (degrees < 115) {
      // down
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
    }
    else if (degrees < 155) {
      // left and down
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
    }
    else {
      // left
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
    }
  }

});