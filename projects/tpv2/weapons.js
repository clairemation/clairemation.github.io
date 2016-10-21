function Weapon(args){ // < PhysicalEntity
  PhysicalEntity.call(this, args.className || "Weapon");
  this.owner = args.owner;
  this.onGround = false;
  this.depth = args.depth;
  this.hitboxes = args.hitboxes;
  this.collisionHandler = new CollisionComponent({
    subject: this,
    engine: collisionEngine,
    hitbox: [],
    subjectIsSolid: false,
    subjectCanCollideWith: ['Actor', 'Fireball'],
    reactToCollisionWith: function(componentHit){
      this.message(componentHit.subject, "damage");
    }.bind(this)
  });
}

Weapon.prototype = Object.create(PhysicalEntity.prototype);
Weapon.prototype.constructor = Weapon;



function Knife(args){ // < Weapon < PhysicalEntity
  Weapon.call(this, {
    className: "Knife",
    owner: args.owner,
    depth: args.owner.depth * 2,
    strikeType: "damage",
    hitboxes: {
      W: [50*SCALE, 54*SCALE, 198*SCALE, 316*SCALE],
      E: [214*SCALE, 16*SCALE, 354*SCALE, 285*SCALE],
      N: [50*SCALE, 54*SCALE, 198*SCALE, 316*SCALE],
      S: [214*SCALE, 16*SCALE, 354*SCALE, 285*SCALE]
    }
  });
  this.useState = new SlashingState(this.owner);
}

Knife.prototype = Object.create(Weapon.prototype);
Knife.prototype.constructor = Knife;


Knife.prototype.update = function(){
  this.z = this.owner.z;
  this.collisionHandler.hitbox = [
    this.hitboxes[this.owner.facing][0] + this.owner.x,
    this.hitboxes[this.owner.facing][1] + this.owner.y,
    this.hitboxes[this.owner.facing][2] + this.owner.x,
    this.hitboxes[this.owner.facing][3] + this.owner.y,
    ];
  this.collisionHandler.update();
}


// SlashingState: Behavior state for knife owner to use.
// We keep a single instance stored in the knife object, and keep resetting that one and reassigning it. This is because it may be swapped to very frequently, so we won't be allocating for a new object every time.

function SlashingState(subject){
  this.subject = subject;
  this.countdown = 5;
}

SlashingState.prototype.update = function(timestamp){
  this.subject.weapon.update();
  this.subject.inertiaHandler.update();
  groundIsWalkableComponent(this.subject);
  this.subject.collisionHandler.update();
  moveComponent(this.subject);
  this.subject.spriteHandler.update(timestamp);

  this.countdown --;
  if (this.countdown <= 0){
    this.countdown = 5;
    this.subject.behavior = new NormalState(this.subject);
  }
};