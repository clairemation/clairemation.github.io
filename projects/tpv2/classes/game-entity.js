function GameEntity(className){
  this.className = (className || 'GameEntity');
  this.onGround = true;
  this.width = 0;
  this.height = 0;
  this.depth = 0;
  this.x = 0;
  this.y = 0;
  this.zIndex = 0;
  this.acceleration = [0,0];
};

GameEntity.prototype.changeState = function(targetState){
  if (this.state != targetState){
    this.state = targetState;
  }
}

// TO DO: pass message in parameters
// Move hitMessage into collision component
GameEntity.prototype.message = function(recipient, message){
  recipient.receiver(message, this);
};

GameEntity.prototype.receiver = function(message, sender){};

GameEntity.prototype.update = function(){};

GameEntity.prototype.updateFacing = function(){
  if (this.impulse.x == 0 && this.impulse.y == 0){
    return;
  }
  this.facing =
    ["N", "", "S"][this.impulse.y + 1]
    +
    ["W", "", "E"][this.impulse.x + 1];
}

GameEntity.prototype.directionTo = function(other){
  if (this.zIndex > other.zIndex){
    var y = -1;
  } else if (this.zIndex == other.zIndex) {
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

GameEntity.prototype.directionToImpulse = function(direction){
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

GameEntity.prototype.bounceBack = function(direction){
  if (Math.sign(this.acceleration[0]) == direction[0]){
    this.acceleration[0] *= -.85;
  }
  if (Math.sign(this.acceleration[1]) == direction[1]){
    this.acceleration[1] *= -.85;
  }
}