//* BASE ENTITY CLASS ====================

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

GameEntity.prototype.message = function(recipient, message){
  recipient.receiver(this.hitMessage, this);
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


//* GAME OBJECTS ====================

//* ACTOR ======================

function Actor(className){ // < GameEntity
  GameEntity.call(this, (className || 'Actor'));

  //* STATE ==================
  this.name = "hero";
  this.state = "standing";
  this.behavior = new NormalState(this);
  this.width = 400;
  this.height = 400;
  this.depth = 50;
  this.x = 0;
  this.y = 0;
  this.acceleration = [0,0];
  this.facing = "E";
  this.maxSpeed = 7;

  this.spriteHandler = new AnimatedSpriteComponent(this, spriteEngine);
  this.spriteHandler.frameSequence = {
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
      },
    }
  };

  this.impulseHandler = new ImpulseComponent(this);
  this.inertiaHandler = new InertiaComponent(this);

  this.collisionHandler = new CollisionComponent(this,collisionEngine);
  this.collisionHandler.subjectIsSolid = true;
  this.collisionHandler.subjectCanCollideWith = ['Actor', 'Fireball', 'Crystal'];
  this.collisionHandler.hitbox = [125*SCALE,30*SCALE,265*SCALE,380*SCALE];
  this.collisionHandler.reactToCollisionWith = function(object){
    var direction = this.subject.directionToImpulse(this.subject.directionTo(object.subject));
    // if the object is solid, bounce back
    if (this.subjectIsSolid && object.subjectIsSolid){
        this.subject.bounceBack(direction);
      }

  };

  this.impulse = {x: 0, y:0};
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
};

//* METHODS =================

//* INHERIT METHODS FROM BASE GAME ENTITY ===========
Actor.prototype = Object.create(GameEntity.prototype);
Actor.prototype.constructor = Actor;
//* OWN METHODS ===============
Actor.prototype.receiver = function(message, sender){
  if (message == "burn"){
    // recoil
    var direction = this.directionToImpulse(this.directionTo(sender));
    this.acceleration[0] = direction[0] * -6;
    this.acceleration[1] = direction[1] * -6;
    // sprite effect
    this.behavior = new HurtState(this);
  }
}

Actor.prototype.update = function(timestamp){
  this.behavior.update(timestamp);
}


//* PLAYER CLASS =====================

function Player(className){ // < Actor
  Actor.call(this, (className || 'Player'));
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

Player.prototype.command = function(input){
  switch (input){
    case (RUN_UP):
      this.impulse.y = -1;
      this.changeState("running");
    break;
    case (RUN_LEFT):
      this.impulse.x = -1;
      this.changeState("running");
    break;
    case(RUN_DOWN):
      this.impulse.y = 1;
      this.changeState("running");
    break;
    case(RUN_RIGHT):
      this.impulse.x = 1;
      this.changeState("running");
    break;
    case (STOP_X):
      this.impulse.x = 0;
      if (this.impulse.y == 0){
        this.changeState("standing");
      }
    break;
    case (STOP_Y):
      this.impulse.y = 0;
      if (this.impulse.x == 0){
        this.changeState("standing");
      }
    break;
  }
  this.updateFacing();
}

//* FIREBALLS ========================

function Fireball(className){ // < GameEntity
  GameEntity.call(this, (className || 'Fireball'));
  this.name = "fireball";
  this.facing = null;
  this.solid = false;
  this.canCollideWith = [Player];
  this.onGround = false;
  this.width = 200;
  this.height = 200;
  this.depth = 200;
  this.x = -200;
  this.y = -200;
  this.originalX = 1100;
  this.originalY = -100;
  this.zIndex = 500;
  this.acceleration = [-7, 1];
  this.originalAcceleration = [-7, 1];
  this.hitMessage = "burn";

  this.spriteHandler = new SpriteComponent(this, spriteEngine);
  this.spriteHandler.drawingContext.beginPath();
  this.spriteHandler.drawingContext.arc(100,100,100,0,2*Math.PI, this.false);
  var gradient = this.spriteHandler.drawingContext.createRadialGradient(100,100,0,160,50,90);
  gradient.addColorStop('0', 'hsl(350, 10%, 20%)');
  gradient.addColorStop('.4', 'hsl(350,10%,20%)');
  gradient.addColorStop('.4', 'hsla(50,100%,75%,1)');
  gradient.addColorStop('.8', 'hsla(0,100%,50%,.4)');
  gradient.addColorStop('1', 'hsla(0,100%,50%,0)');
  this.spriteHandler.drawingContext.fillStyle = gradient;
  this.spriteHandler.drawingContext.fill();

  this.collisionHandler = new CollisionComponent(this, collisionEngine);
  this.collisionHandler.hitbox = [50*SCALE,50*SCALE,150*SCALE,150*SCALE];
  this.collisionHandler.subjectIsSolid = false;
  this.collisionHandler.subjectCanCollideWith = ['Player'];
  this.collisionHandler.reactToCollisionWith = function(playerComponent){
    this.subject.message(playerComponent.subject, "burn");
  }
}

Fireball.prototype = Object.create(GameEntity.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.prototype.update = function(){
  this.collisionHandler.update();
  moveComponent(this);
  if (this.y >= (this.zIndex - (this.height)*SCALE)){
    //restart
    this.x = this.originalX;
    this.y = this.originalY;
    this.acceleration = [this.originalAcceleration[0], this.originalAcceleration[1]];
  }
  this.acceleration[1] *= 1.06;
}

//* CRYSTAL CLASS ===============================
function Crystal(){ // < GameEntity
  GameEntity.call(this);
  this.x = 550;
  this.y = 200;
  this.width = 100;
  this.height = 100;
  this.zIndex = this.y + (this.height * SCALE);
  this.depth = 10;
  this.hitbox = [0,0,this.width,this.height];
  this.solid = true;
  this.sprite = document.createElement("canvas");
  this.sprite.width = this.width;
  this.sprite.height = this.height;

  var ctx = this.sprite.getContext("2d");
  ctx.fillStyle = "aqua";
  ctx.fillRect(0,0,this.width,this.height);
}

Crystal.prototype = Object.create(GameEntity.prototype);
Crystal.prototype.constructor = Crystal;

Crystal.prototype.receiver = function(message,sender){
  alert("You win!");
}