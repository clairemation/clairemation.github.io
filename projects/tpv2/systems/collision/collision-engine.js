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

      // collision negative, continue to next entity, IF:

      // we are not standing at the same depth
        var zDiff = Math.abs((otherObject.zIndex) - (subject.zIndex));
        var maxDepth = Math.max(otherObject.depth, subject.depth) * SCALE;
        if (zDiff > maxDepth){
          continue;
        }

      // it clears me on my left side
        if ((subject.x + myComponent.hitbox[0]) > (otherObject.x  + otherComponent.hitbox[2])){
          continue;
        }

      // it clears me on my right
        if ((subject.x + myComponent.hitbox[2]) < (otherObject.x  + otherComponent.hitbox[0])){
          continue;
        }

      // it clears me above
        if ((subject.y + myComponent.hitbox[1]) > (otherObject.y  + otherComponent.hitbox[3])){
          continue;
        }

      // it clears me below
      if ((subject.y + myComponent.hitbox[3]) < (otherObject.y +  otherComponent.hitbox[1])){
        continue;
      }

      // Still here? That means there was a collision!

      myComponent.reactToCollisionWith(otherComponent);

    }
  }

};