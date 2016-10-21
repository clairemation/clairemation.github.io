function Player(className){ // < Actor
  Actor.call(this, (className || 'Player'));
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

Player.prototype.command = function(input){
  switch (input){
    case (RUN_UP):
      this.impulse.y = -1;
      this.changeAppearance("running");
    break;
    case (RUN_LEFT):
      this.impulse.x = -1;
      this.changeAppearance("running");
    break;
    case(RUN_DOWN):
      this.impulse.y = 1;
      this.changeAppearance("running");
    break;
    case(RUN_RIGHT):
      this.impulse.x = 1;
      this.changeAppearance("running");
    break;
    case (STOP_X):
      this.impulse.x = 0;
      if (this.impulse.y == 0){
        this.changeAppearance("standing");
      }
    break;
    case (STOP_Y):
      this.impulse.y = 0;
      if (this.impulse.x == 0){
        this.changeAppearance("standing");
      }
    break;
    case (SLASH):
      this.changeAppearance("slashing");
      this.behavior = this.weapon.useState;
  }
  this.updateFacing();
}