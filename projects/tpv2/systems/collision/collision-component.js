function CollisionComponent(subject,engine){
  this.subject = subject;
  this.className = subject.className;
  this.engine = engine;
  this.subjectIsSolid = false;
  this.subjectCanCollideWith = [];
  this.hitbox = [0,0,this.subject.width,this.subject.height];
  this.engine.registerComponent(this)
}

CollisionComponent.prototype.update = function(){
  for (var i = 0; i < this.subjectCanCollideWith.length; i++){
    this.engine.checkForCollisionsWithClass(this, this.subjectCanCollideWith[i]);
  }
}

CollisionComponent.prototype.reactToCollisionWith = function(object){
  // implement individually for each class
}