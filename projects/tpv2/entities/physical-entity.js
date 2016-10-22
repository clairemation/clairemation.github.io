function PhysicalEntity(className, args){
  this.className = (className || 'PhysicalEntity');
  this.width = args==undefined ? 0 : args.width || 0;
  this.height = args==undefined ? 0 : args. height || 0;
  this.centerPoint = new Vec2D({
    x: this.width / 2,
    y: this.height / 2
  });
  this.depth = args==undefined ? 0 : args.depth || 0;
  this.x = args==undefined ? 0 : args.x || 0;
  this.y = args==undefined ? 0 : args.y || 0;
  this.z = args==undefined ? 0 : args.z || 0;
  this.position = new Vec3D({
    x: this.x,
    y: this.z,
    z: this.z
  });
};

PhysicalEntity.prototype.changeAppearance = function(target){
  if (this.appearance != target){
    this.appearance = target;
  }
}

// TO DO: pass message in parameters
// Move hitMessage into collision component
PhysicalEntity.prototype.message = function(recipient, message){
  recipient.receiver(message, this);
};

PhysicalEntity.prototype.receiver = function(message, sender){};

PhysicalEntity.prototype.update = function(){};

PhysicalEntity.prototype.updateFacing = function(){
  if (this.impulse.x == 0 && this.impulse.y == 0){
    return;
  }
  this.facing =
    ["N", "", "S"][this.impulse.y + 1]
    +
    ["W", "", "E"][this.impulse.x + 1];
}

PhysicalEntity.prototype.directionTo = function(other){
  if (this.z > other.z){
    var y = -1;
  } else if (this.z == other.z) {
    var y = 0;
  } else {
    var y = 1;
  }
  if ((this.x + (this.width * SCALE)/2) > (other.x + (other.width * SCALE)/2)){
    var x = -1;
  } else if ((this.x + this.width/2) == (other.x + other.width/2)) {
    var x = 0;
  } else {
    var x = 1;
  }
  return (
  ["N", "", "S"][y + 1]
  +
  ["W", "", "E"][x + 1]
  );
}

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
}

PhysicalEntity.prototype.bounceBack = function(direction){
  if (Math.sign(this.acceleration[0]) == direction[0]){
    this.acceleration[0] *= -.85;
  }
  if (Math.sign(this.acceleration[1]) == direction[1]){
    this.acceleration[1] *= -.85;
  }
}