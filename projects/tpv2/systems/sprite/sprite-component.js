//* GENERIC SPRITE COMPONENT

function SpriteComponent(subject, engine){
  this.subject = subject;
  this.sprite = document.createElement("canvas");
  this.sprite.width = this.subject.width;
  this.sprite.height = this.subject.height;
  this.drawingContext = this.sprite.getContext("2d");
  this.engine = engine;
  engine.registerComponent(this);
}

//* ANIMATED SPRITE COMPONENT =====================

function AnimatedSpriteComponent(subject, engine){ // < SpriteComponent
  SpriteComponent.apply(this,[subject,engine]);
  this.currentAnimationFrameNumber = 0;
  this.lastTime = undefined;
  this.engine = engine;
  this.engine.registerComponent(this);
}

AnimatedSpriteComponent.prototype.update = function(timestamp){
  this.advanceFrame(timestamp);
  if (this.subject.behavior instanceof HurtState){

  }
}

AnimatedSpriteComponent.prototype.advanceFrame = function(timestamp){
  if (!this.lastTime){
    this.lastTime = timestamp;
  }
  var delta = timestamp - this.lastTime;
  var frameAdvance = Math.floor(delta / FRAMERATE);
  if (frameAdvance >= 1){
    this.currentAnimationFrameNumber = this.currentAnimationFrameNumber + frameAdvance;
    this.lastTime = timestamp;
  }
  if (this.currentAnimationFrameNumber >= this.frameSequence[this.subject.state][this.subject.facing].frames.length) {
    this.currentAnimationFrameNumber = this.frameSequence[this.subject.state][this.subject.facing].frames[0];
  }
  var c = this.sprite.getContext("2d");
  c.clearRect(0,0,this.subject.width, this.subject.height);
  c.drawImage(
    this.frameSequence[this.subject.state][this.subject.facing].spritesheet, //source image
    (this.currentAnimationFrameNumber * this.subject.width), //origin x
    0, //origin y
    this.subject.width,
    this.subject.height,
    0,0,
    this.subject.width, this.subject.height
  );
}

AnimatedSpriteComponent.prototype.hurtEffect = function(){
  // color whole sprite solid red
  this.drawingContext.globalCompositeOperation = "source-in";
  this.drawingContext.fillStyle = "white";
  this.drawingContext.fillRect(0,0,this.subject.width,this.subject.height);
  this.drawingContext.globalCompositeOperation = "source-over";
}