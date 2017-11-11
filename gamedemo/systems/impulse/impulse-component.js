// REDO

function ImpulseComponent(subject, accelRate){
  this.subject = subject;
  this.rateOfAcceleration = accelRate || 2 // default
}

ImpulseComponent.prototype.update = function(){
  // Apply impulse to entity's acceleration, clamp to max speed
  if (Math.abs(this.subject.acceleration[0]) < this.subject.maxSpeed){
    this.subject.acceleration[0] += this.rateOfAcceleration * this.subject.impulse.x
  }
  if (Math.abs(this.subject.acceleration[1]) < this.subject.maxSpeed){
    this.subject.acceleration[1] += this.rateOfAcceleration * this.subject.impulse.y;
  }
}