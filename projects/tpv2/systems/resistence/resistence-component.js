function InertiaComponent(subject, decelRate){
  this.subject = subject;
  this.rateOfDeceleration = decelRate || 1.5;
}

InertiaComponent.prototype.update = function(){

  // Always nudge acceleration back towards 0, clamp to 0

  if (this.subject.acceleration[0] > 0){
    this.subject.acceleration[0] -= this.rateOfDeceleration;
    if (this.subject.acceleration[0] < 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[0] < 0){
    this.subject.acceleration[0] += this.rateOfDeceleration;
    if (this.subject.acceleration[0] > 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[1] > 0){
    this.subject.acceleration[1] -= this.rateOfDeceleration;
    if (this.subject.acceleration[1] < 0){
      this.subject.acceleration[1] = 0;
    }
  }

  if (this.subject.acceleration[1] < 0){
    this.subject.acceleration[1] += this.rateOfDeceleration;
    if (this.subject.acceleration[1] > 0){
      this.subject.acceleration[1] = 0;
    }
  }

}