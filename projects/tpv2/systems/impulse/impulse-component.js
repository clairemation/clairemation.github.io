function ImpulseComponent(subject){
  this.subject = subject;
  this.rateOfAcceleration = 1.25 // default
}

ImpulseComponent.prototype.update = function(){
  // Apply impulse to entity's acceleration, clamp to max speed
  if (Math.abs(this.subject.acceleration[0]) < this.subject.maxSpeed){
    this.subject.acceleration[0] += 1.25 * this.subject.impulse.x
  }
  if (Math.abs(this.subject.acceleration[1]) < this.subject.maxSpeed){
    this.subject.acceleration[1] += 1.25 * this.subject.impulse.y;
  }
}