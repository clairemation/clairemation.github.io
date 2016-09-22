function MovementComponent(args) {
  this.speed = 0;
  this.impulse = 0;
  this.maxImpulse = 7;
  this.direction = new Vec2D({
    x: 1, y: 0
  });
  this.velocity = new Vec2D({
    x: 0, y: 0
  });
}