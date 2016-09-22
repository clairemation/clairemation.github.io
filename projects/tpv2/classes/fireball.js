function Fireball(className){ // < GameEntity
  GameEntity.call(this, (className || 'Fireball'));
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
  this.zIndex = 1150;
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

Fireball.prototype = Object.create(GameEntity.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.prototype.receiver = function(message, sender){
  if (message == "damage"){
    this.acceleration[0] *= -1;
  }
}

Fireball.prototype.update = function(){

  // Fall in an arc, reset upon hitting the ground

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