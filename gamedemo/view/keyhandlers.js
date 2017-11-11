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