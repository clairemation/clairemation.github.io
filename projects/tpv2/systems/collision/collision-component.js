function CollisionComponent(args){
  this.subject = args.subject;
  this.engine = args.engine;
  this.className = this.subject.className;
  this.subjectIsSolid = args.subjectIsSolid || false;
  this.mass = args.mass || 0;
  this.subjectCanCollideWith = args.subjectCanCollideWith || [];
  this.hitbox = args.hitbox || [0,0,this.subject.width,this.subject.height];
  this.reactToCollisionWith = args.reactToCollisionWith || undefined;
  this.engine.registerComponent(this)
}

CollisionComponent.prototype.update = function(){
  for (var i = 0; i < this.subjectCanCollideWith.length; i++){
    this.engine.checkForCollisionsWithClass(this, this.subjectCanCollideWith[i]);
  }
}

CollisionComponent.prototype.reactToCollisionWith = function(object){
  // implement individually for each subject class
}