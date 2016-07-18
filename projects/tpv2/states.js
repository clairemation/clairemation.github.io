//* BEHAVIOR STATES ======================

function NormalState(subject){
  this.subject = subject;
}

NormalState.prototype.update = function(timestamp){
  // Hot-swappable -- but careful of the order!
  // Check for walls and obstacles AFTER all updates are made to impulse and inertia
  this.subject.impulseHandler.update(); // apply impulse to acceleration
  this.subject.inertiaHandler.update(); // gradual acceleration falloff
  groundIsWalkableComponent(this.subject); // walls stop you or nudge you along at a diagonal
  this.subject.collisionHandler.update(); // you react to obstacles
  moveComponent(this.subject); // finally apply all movement calculations to position
  this.subject.spriteHandler.update(timestamp); // update sprite
};


// Hurt state: remove control and add flashing-white sprite effect for 5 ticks

function HurtState(subject){
  this.subject = subject;
  this.countdown = 5;
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
  }
}

