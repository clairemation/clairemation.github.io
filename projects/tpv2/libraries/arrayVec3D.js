function ArrayVec3D(){
}

ArrayVec3D.prototype.addScalar = function(v, s){
  return [
    v[0] + s,
    v[1] + s,
    v[2] + s
    ];
};

ArrayVec3D.prototype.addVectors = function(a,b){
  return [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2]
    ];
};

ArrayVec3D.prototype.subtractVectors = function(a,b){
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2]
    ];
};

ArrayVec3D.prototype.subtractScalar = function(v, s){
  return [
    v[0] - s,
    v[1] - s,
    v[2] - s
    ];
};

ArrayVec3D.prototype.multiplyVectors = function(a,b){
  return [
    a[0] * b[0],
    a[1] * b[1],
    a[2] * b[2]
    ];
}

ArrayVec3D.prototype.multiplyByScalar = function(v, s){
  return [
    v[0] * s,
    v[1] * s,
    v[2] * s
    ];
};

ArrayVec3D.prototype.divideVectors = function(a,b){
  return [
    a[0] / b[0],
    a[1] / b[1],
    a[2] / b[2]
    ];
}

ArrayVec3D.prototype.divideByScalar = function(v, s){
  return [
    v[0] / s,
    v[1] / s,
    v[2] / s
    ];
};

ArrayVec3D.prototype.dot = function(a,b){
  return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
}

ArrayVec3D.prototype.interpolate = function(a,b,t){
  return this.addVectors(a.multiplyByScalar(1-t), b.multiplyByScalar(t));
}

ArrayVec3D.prototype.vectorLength = function(v){
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

ArrayVec3D.prototype.squaredVectorLength = function(v){
  return (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

ArrayVec3D.prototype.distance = function(a,b) {
  return this.vectorLength(this.subtractVectors(a, b));
}

ArrayVec3D.prototype.prototype.unitVector = function(v) {
  return v.divideByScalar(v.length());
}

ArrayVec3D.prototype.directionTo = function(a,b){
  return this.unitVector(this.subtractVectors(a, b));
};

ArrayVec3D.prototype.projectedLength = function(a,b){
  return this.dot(a,b);
};