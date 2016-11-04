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
  if (accelerationDirection == ""){
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
  // Original speed = whichever acceleration factor wasn't 0
  if (obj.acceleration[0] == 0){
    var oldSpeed = Math.abs(obj.acceleration[1]);
  } else {
    var oldSpeed = Math.abs(obj.acceleration[0]);
  }
  // If new direction is ok, change to new direction and continue acceleration
  // TO DO: DRY this up
  // also check max speed first instead of clamping, to avoid inadvertantly neutralizing non-impulse-caused acceleration
  if (groundSpotCheck(obj, secondaryDirection) == true){
    var newVector = obj.directionToImpulse(secondaryDirection);
    var newSpeedX = oldSpeed + 1.25;
    if (newSpeedX > obj.maxSpeed){
      newSpeedX = obj.maxSpeed;
    }
    var newSpeedY = oldSpeed + 1.25;
    if (newSpeedY > obj.maxSpeed){
      newSpeedY = obj.maxSpeed;
    }
    obj.acceleration = [newSpeedX * newVector[0], newSpeedY * newVector[1]];
    return;
  };
  if (groundSpotCheck(obj, tertiaryDirection) == true){
    var newVector = obj.directionToImpulse(tertiaryDirection);
    var newSpeedX = oldSpeed + 1.25;
    if (newSpeedX > obj.maxSpeed){
      newSpeedX = obj.maxSpeed;
    }
    var newSpeedY = oldSpeed + 1.25;
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