//* BEHAVIOR STATES ======================

function NormalState(subject){
  this.subject = subject;
}

NormalState.prototype.update = function(timestamp){
  // Hot-swappable -- but careful of the order!
  // Check for walls and obstacles AFTER all updates are made to impulse and inertia
  this.subject.impulseHandler.update(); // apply impulse to acceleration
  this.subject.inertiaHandler.update(); // gradual falloff
  groundIsWalkableComponent(this.subject); // walls stop you or nudge you along at a diagonal
  this.subject.collisionHandler.update(); // you stop at obstacles and send them a message
  moveComponent(this.subject); // apply movement calculations to position
  this.subject.spriteHandler.update(timestamp);
};


function HurtState(subject){
  this.subject = subject;
  this.countdown = 5;
  this.subject.spriteHandler.stateDidChange = true;
};

HurtState.prototype.update = function(timestamp){
  this.subject.inertiaHandler.update();
  groundIsWalkableComponent(this.subject);
  this.subject.collisionHandler.update();
  moveComponent(this.subject);
  this.subject.spriteHandler.update(timestamp);
  this.subject.spriteHandler.hurtEffect();

  this.countdown --;
  if (this.countdown <= 0){
    this.subject.behavior = new NormalState(this.subject);
    this.subject.spriteHandler.stateDidChange = true;
  }
}

