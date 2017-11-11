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