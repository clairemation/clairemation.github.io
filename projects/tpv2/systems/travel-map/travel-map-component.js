// TODO
// Change ALL this to simple vector math. Walkmask will be a path. On collision we simply nullify the normal vector.

function groundIsWalkableComponent(obj){
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
    // White means walkable. Black and white image so we only need to check one channel
  }
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

  if (accelerationDirection == ""){
    //if stopped, never mind
    return;
  }
  if (groundSpotCheck(obj, accelerationDirection)){
    // if walkable, go ahead
    return;
  }
  // Next test nearby diagonals
  var secondaryDirection = directionNeighbors[accelerationDirection][0];
  var tertiaryDirection = directionNeighbors[accelerationDirection][1];
  // Original speed = whichever acceleration factor wasn't 0
  if (obj.acceleration[0] == 0){
    var oldSpeed = Math.abs(obj.acceleration[1]);
  } else {
    var oldSpeed = Math.abs(obj.acceleration[0]);
  }
  // If new direction is ok, apply new direction while continuing to accelerate
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