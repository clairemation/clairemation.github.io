function Actor(className){ // < PhysicalEntity
  PhysicalEntity.call(this, (className || 'Actor'));

  //* STATE ==================
  this.name = "hero";
  this.appearance = "standing";
  this.impulse = {x: 0, y:0};
  this.behavior = new NormalState(this);
  this.width = 400;
  this.height = 400;
  this.depth = 50;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.onGround = true;
  this.acceleration = [0,0];
  this.facing = "E";
  this.pushability = 1.7;
  this.maxSpeed = 12;

  this.spriteHandler = new AnimatedSpriteComponent(this, spriteEngine, {
    frameSequence: {
      "standing": {
        "N": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "NW": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "W": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "SW": {
          frames: [0],
          spritesheet: images.heroStandingLeft
        },
        "S": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "SE": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "E": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
        "NE": {
          frames: [0],
          spritesheet: images.heroStandingRight
        },
      },
      "running": {
        "N": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "NW": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "W": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "SW": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunLeft
        },
        "S": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "SE": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "E": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        },
        "NE": {
          frames: [0,1,2,3],
          spritesheet: images.heroRunRight
        }
      },
      "slashing": {
        "N": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "NW": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "W": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "SW": {
          frames: [0],
          spritesheet: images.heroSlashLeft
        },
        "S": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "SE": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "E": {
          frames: [0],
          spritesheet: images.heroSlashRight
        },
        "NE": {
          frames: [0],
          spritesheet: images.heroSlashRight
        }
      }
    }
  });

  this.impulseHandler = new ImpulseComponent(this);

  this.inertiaHandler = new InertiaComponent(this);

  // this.moveHandler = new moveComponent({
  //   owner: this;

  // }

  this.collisionHandler = new CollisionComponent({
    subject: this,
    engine: collisionEngine,
    subjectIsSolid: true,
    mass: 1,
    hitbox: [125*SCALE,30*SCALE,265*SCALE,380*SCALE],
    subjectCanCollideWith: ['Actor', 'Fireball', 'Crystal'],
    reactToCollisionWith: function(object){
      // if the object is solid, bounce back
      if (this.subjectIsSolid && object.subjectIsSolid){
        var direction = this.subject.directionToImpulse(this.subject.directionTo(object.subject));
        this.subject.message(object.subject, "push");
        this.subject.bounceBack(direction);
      }
    }
  });

  this.weapon = new Knife({
    owner: this
  });

  this.feetpoint = { // test pixels for ground checks
    "N": [200, 345],
    "NW": [120, 345],
    "W": [120, 390],
    "SW": [120, 410],
    "S": [200, 410],
    "SE": [280, 410],
    "E": [280,390],
    "NE": [280,345]
  };

  this.lightingHandler = new LightingComponent({
    owner: this,
    engine: lightingEngine,
    lightingMap: images.heronormalmap
  });

};

//* METHODS =================

//* INHERIT METHODS FROM BASE GAME ENTITY ===========
Actor.prototype = Object.create(PhysicalEntity.prototype);
Actor.prototype.constructor = Actor;

//* OWN METHODS ===============

Actor.prototype.receiver = function(message, sender){

  if (message == "damage"){

    // YES THIS IS MESSY
    // Testing vector math, will eventually integrate vectors programwide so we don't have to create them here.

    var actorPt = new Vec2D({
      x: this.x + this.width*SCALE / 2,
      y: this.y + this.height*SCALE / 2
    });

    var otherPt = new Vec2D({
      x: sender.x + sender.width*SCALE / 2,
      y: sender.y + sender.height*SCALE / 2
    });

    var direction = actorPt.directionTo(otherPt);
    this.acceleration[0] = direction.x * -10;
    this.acceleration[1] = direction.y * -10;

    // hurt effects
    this.behavior = new HurtState(this);

  }

  else if (message == "push"){
    this.acceleration[0] += sender.acceleration[0] * this.pushability;
    this.acceleration[1] += sender.acceleration[1] * this.pushability;
  }

}

Actor.prototype.update = function(timestamp){
  this.behavior.update(timestamp);
}