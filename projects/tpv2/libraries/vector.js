function Vec2D(args){
  this.x = args.x;
  this.y = args.y;
}

Vec2D.add = function(a, b) {
  return new Vec2D({x: a.x + b.x, y: a.y + b.y});
}

Vec2D.subtract = function(a, b) {
  return new Vec2D({x: a.x - b.x, y: a.y - b.y});
}

Vec2D.vectorMultiply = function(a,b) {
  return new Vec2D({x: a.x * b.x, y: a.y * b.y});
}

Vec2D.vectorDivide = function(a,b) {
  return new Vec2D({x: a.x / b.x, y: a.y / b.y});
}

Vec2D.dot = function(a,b) {
  return a.x * b.x + a.y * b.y;
}

Vec2D.interpolate = function(a, b, t) {
  if (t === undefined) {
    t = 0.5;
  }
  return this.add(a.multiply(1 - t), b.multiply(t));
}

Vec2D.distance = function(a,b) {
  return (this.subtract(a, b)).length();
}

Vec2D.prototype.multiply = function(s) {
  return new Vec2D({x: this.x * s, y: this.y * s});
}

Vec2D.prototype.divide = function(s) {
  return new Vec2D({x: (this.x / s), y: (this.y / s)});
}

Vec2D.prototype.length = function(s) {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vec2D.prototype.squaredLength = function(s) {
  return this.x * this.x + this.y * this.y;
}

Vec2D.prototype.unit = function(s) {
  return this.divide(this.length());
}

Vec2D.prototype.turnLeft = function() {
  return new Vec2D({x: -this.y, y: this.x});
}

Vec2D.prototype.turnRight = function() {
  return new Vec2D({x: this.y, y: -this.x});
}

Vec2D.prototype.normalLeft = function() {
  return this.turnLeft().unit();
}

Vec2D.prototype.normalRight = function() {
  return this.turnRight().unit();
}

Vec2D.prototype.rotate = function(angle) {
  return new Vec2D({
    x: this.x * Math.cos(angle) - this.y * Math.sin(angle),
    y: this.x * Math.sin(angle) + this.y * Math.cos(angle)
  });
}

Vec2D.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
}

Vec2D.prototype.directionTo = function(v) {
  return (Vec2D.subtract(v, this)).unit();
}

Vec2D.prototype.projectedLength = function(v) {
  return Vec2D.dot(this, v.unit());
}

Vec2D.prototype.project = function(v) {
  var direction = v.unit();
  return direction.multiply(this.projectedLength(direction));
}