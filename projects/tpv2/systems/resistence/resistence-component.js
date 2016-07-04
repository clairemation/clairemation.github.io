function InertiaComponent(subject){
  this.subject = subject;
  this.rateOfDeceleration = 1; //default
}

InertiaComponent.prototype.update = function(){

  // Always nudge acceleration back towards 0, clamp to 0

  if (this.subject.acceleration[0] > 0){
    this.subject.acceleration[0] -= 1;
    if (this.subject.acceleration[0] < 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[0] < 0){
    this.subject.acceleration[0] += 1;
    if (this.subject.acceleration[0] > 0){
      this.subject.acceleration[0] = 0;
    }
  }

  if (this.subject.acceleration[1] > 0){
    this.subject.acceleration[1] -= 1;
    if (this.subject.acceleration[1] < 0){
      this.subject.acceleration[1] = 0;
    }
  }

  if (this.subject.acceleration[1] < 0){
    this.subject.acceleration[1] += 1;
    if (this.subject.acceleration[1] > 0){
      this.subject.acceleration[1] = 0;
    }
  }

}