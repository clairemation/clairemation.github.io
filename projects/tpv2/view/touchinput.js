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
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
      console.log('press right release Y');
    }
    else if (degrees > -65) {
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
      console.log('press right and up');
    }
    else if (degrees > -115) {
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
      console.log('press up release X');
    }
    else if (degrees > -155) {
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_PRESS);
      keyHandler.register(DOWN_RELEASE);
      console.log('press left and up');
    }
    else {
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
      console.log('press left');
    }
  }
  else {
    // bottom half of circle
    if (degrees < 25) {
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
      console.log('press right release Y');
    }
    else if (degrees < 65) {
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_PRESS);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
      console.log('press right and down');
    }
    else if (degrees < 115) {
      keyHandler.register(LEFT_RELEASE);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
      console.log('press down release X');
    }
    else if (degrees < 155) {
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_PRESS);
      console.log('press left and down');
    }
    else {
      keyHandler.register(LEFT_PRESS);
      keyHandler.register(RIGHT_RELEASE);
      keyHandler.register(UP_RELEASE);
      keyHandler.register(DOWN_RELEASE);
      console.log('press left');
    }
  }

});