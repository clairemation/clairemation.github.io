//* GENERIC SPRITE COMPONENT

function SpriteComponent(subject, engine, sprite){
  this.subject = subject;
  this.sprite = sprite || document.createElement("canvas");
  this.sprite.width = this.subject.width;
  this.sprite.height = this.subject.height;
  this.drawingContext = this.sprite.getContext("2d");
  this.engine = engine;
  this.engine.registerComponent(this);
}

//* ANIMATED SPRITE COMPONENT =====================

// TO DO: optimize so frame only redraws upon a state change


function AnimatedSpriteComponent(subject, engine, args){ // < SpriteComponent
  if (!args){
    var args = {};
  }
  SpriteComponent.apply(this,[subject,engine]);
  this.frameSequence = args.frameSequence;
  this.currentAnimationFrameNumber = args.currentAnimationFrameNumber || 0;
  this.lastTime = undefined;
  this.plugins = args.plugins || [];
}

AnimatedSpriteComponent.prototype = Object.create(SpriteComponent.prototype);
AnimatedSpriteComponent.constructor = AnimatedSpriteComponent;

AnimatedSpriteComponent.prototype.update = function(timestamp){
  this.advanceFrame(timestamp);

}

AnimatedSpriteComponent.prototype.advanceFrame = function(timestamp){
  if (!this.lastTime){
    this.lastTime = timestamp;
  }
  var delta = timestamp - this.lastTime;
  var frameAdvance = Math.floor(delta / FRAMERATE);
  if (frameAdvance >= 1){
    this.currentAnimationFrameNumber = this.currentAnimationFrameNumber + frameAdvance;
    var advance = true;
    this.lastTime = timestamp;
  }
  if (this.currentAnimationFrameNumber >= this.frameSequence[this.subject.appearance][this.subject.facing].frames.length) {
    this.currentAnimationFrameNumber = this.frameSequence[this.subject.appearance][this.subject.facing].frames[0];
  }
  if (advance){
    this.sprite.width = this.sprite.width; // clear canvas, currently faster in most browsers than vvv
    // this.drawingContext.clearRect(0,0,this.subject.width, this.subject.height);
    this.drawingContext.drawImage(
      this.frameSequence[this.subject.appearance][this.subject.facing].spritesheet, //source image
      (this.currentAnimationFrameNumber * this.subject.width), //origin x
      0, //origin y
      this.subject.width,
      this.subject.height,
      0,0,
      this.subject.width, this.subject.height
    );

    if (this.plugins){
      for (var i = 0; i < this.plugins.length; i++){
        this.plugins[i].update();
      }
    }
  }
}

SpriteComponent.prototype.hurtEffect = function(){
  // color whole sprite solid white
  this.colorOver('white');
}

SpriteComponent.prototype.colorOver =
function(colorString){
  this.drawingContext.globalCompositeOperation = "source-in";
  this.drawingContext.fillStyle = colorString;
  this.drawingContext.fillRect(0,0,this.subject.width,this.subject.height);
  this.drawingContext.globalCompositeOperation = "source-over";
}