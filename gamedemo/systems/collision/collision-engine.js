// UGH
// Redo using vectors, force, acceleration, etc.
// If necessary, optimize with quadtree

function CollisionEngine(){
  this.entitiesByClass = {};
  // entitiesByClass = {
      // ClassA: [entity1, entity2, etc...],
      // ClassB: [etc]
  // }
}

CollisionEngine.prototype.registerComponent = function(component){
  if (this.entitiesByClass[component.className]){
    this.entitiesByClass[component.className].push(component);
  } else {
    this.entitiesByClass[component.className] = [component];
  }
};

CollisionEngine.prototype.deregisterComponent = function(component){
  var classArray = this.entitiesByClass[component.className];
  if (classArray){
    var index = classArray.indexOf(component);
    if (index){
      classArray.splice(index,1);
    }
  }
};

CollisionEngine.isThereACollision = function(subject, subjectHitbox, other, otherHitbox){

  // Collision is false if:

  // we are not standing at the same depth
  var zDiff = Math.abs((other.z) - (subject.z));
  var maxDepth = Math.max(other.depth, subject.depth) * SCALE;
  if (zDiff > maxDepth){
    return false;
  }

// it clears me on my left side
  if ((subject.x + subjectHitbox[0]) > (other.x  + otherHitbox[2])){
    return false;
  }

// it clears me on my right
  if ((subject.x + subjectHitbox[2]) < (other.x  + otherHitbox[0])){
    return false;
  }

// it clears me above
  if ((subject.y + subjectHitbox[1]) > (other.y  + otherHitbox[3])){
    return false;
  }

  // it clears me below
  if ((subject.y + subjectHitbox[3]) < (other.y +  otherHitbox[1])){
      return false;
  }

  // otherwise, collision is true
  return true;

}

CollisionEngine.prototype.checkForCollisionsWithClass = function(myComponent, className){

  var subject = myComponent.subject;
  if (subject.acceleration == [0,0]){
    return;
  }
  var entitiesInClass = this.entitiesByClass[className];
  if (!entitiesInClass){return;}
  for (var i = 0; i < entitiesInClass.length; i++){
    var otherComponent = entitiesInClass[i];
    var otherObject = otherComponent.subject;
    if (otherObject != subject) {

      if (CollisionEngine.isThereACollision(subject, myComponent.hitbox, otherObject, otherComponent.hitbox)){
        myComponent.reactToCollisionWith(otherComponent);
      }
    }
  }
};