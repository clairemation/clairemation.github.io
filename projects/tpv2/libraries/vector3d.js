function Vec3D(args){
  this.x = args.x;
  this.y = args.y;
  this.z = args.z;
}

Vec3D.add = function(a, b) {
  return new Vec3D({x: a.x + b.x, y: a.y + b.y, z: a.z + b.z});
}

Vec3D.subtract = function(a, b) {
  return new Vec3D({x: a.x - b.x, y: a.y - b.y, z: a.z - b.z});
}

Vec3D.vectorMultiply = function(a,b) {
  return new Vec3D({x: a.x * b.x, y: a.y * b.y, z: a.z * b.z});
}

Vec3D.vectorDivide = function(a,b) {
  return new Vec3D({x: a.x / b.x, y: a.y / b.y, z: a.z / b.z});
}

Vec3D.dot = function(a,b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

Vec3D.interpolate = function(a, b, t) {
  if (t === undefined) {
    t = 0.5;
  }
  return this.add(a.multiply(1 - t), b.multiply(t));
}

Vec3D.distance = function(a,b) {
  return (this.subtract(a, b)).length();
}

Vec3D.prototype.multiply = function(s) {
  return new Vec3D({x: this.x * s, y: this.y * s, z: this.z * s});
}

Vec3D.prototype.divide = function(s) {
  return new Vec3D({x: (this.x / s), y: (this.y / s), z: (this.z / s)});
}

Vec3D.prototype.length = function(s) {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vec3D.prototype.squaredLength = function(s) {
  return this.x * this.x + this.y * this.y + this.z * this.z;
}

Vec3D.prototype.unit = function(s) {
  return this.divide(this.length());
}


Vec3D.prototype.directionTo = function(v) {
  return (Vec3D.subtract(v, this)).unit();
}

Vec3D.prototype.projectedLength = function(v) {
  return Vec3D.dot(this, v.unit());
}

Vec3D.prototype.project = function(v) {
  var direction = v.unit();
  return direction.multiply(this.projectedLength(direction));
}