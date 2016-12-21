// function Mat3(a){
//   this.elements = [
//     a[0], a[1], a[2],
//     a[3], a[4], a[5],
//     a[6], a[7], a[8]
//   ]
// }

// Mat3.prototype.transpose = function(){
//   return [
//     this.elements[0], this.elements[3], this.elements[6],
//     this.elements[1], this.elements[4], this.elements[7],
//     this.elements[2], this.elements[5], this.elements[8]
//   ];
// }

// Mat3.prototype.timesScalar = function(s){
//   return [
//     this.elements[0]*s, this.elements[1]*s, this.elements[2]*s,
//     this.elements[3]*s, this.elements[4]*s, this.elements[5]*s,
//     this.elements[6]*s, this.elements[7]*s, this.elements[8]*s
//   ];
// }

// Mat3.prototype.timesVec3 = function(v){
//   return [
//     this.elements[0]*v[0] + this.elements[1]*v[1] + this.elements[2]*v[2],
//     this.elements[3]*v[0] + this.elements[4]*v[1] + this.elements[5]*v[2],
//     this.elements[6]*v[0] + this.elements[7]*v[1] + this.elements[8]*v[2]
//   ];
// }

// Mat3.prototype.timesMat3 = function(m){
//   return [
//     this.elements[0]*m.elements[0] + this.elements[1]*m.elements[3] + this.elements[2]*m.elements[6],    this.elements[0]*m.elements[1] + this.elements[1]*m.elements[4] + this.elements[2]*m.elements[7],    this.elements[0]*m.elements[2] + this.elements[1]*m.elements[5] + this.elements[2]*m.elements[8],
//     this.elements[3]*m.elements[0] + this.elements[4]*m.elements[3] + this.elements[5]*m.elements[6],    this.elements[3]*m.elements[1] + this.elements[5]*m.elements[4] + this.elements[5]*m.elements[7],    this.elements[3]*m.elements[2] + this.elements[4]*m.elements[5] + this.elements[5]*m.elements[8],
//     this.elements[6]*m.elements[0] + this.elements[7]*m.elements[3] + this.elements[8]*m.elements[6],    this.elements[6]*m.elements[1] + this.elements[7]*m.elements[4] + this.elements[8]*m.elements[7],    this.elements[6]*m.elements[2] + this.elements[7]*m.elements[5] + this.elements[8]*m.elements[8],
//   ];
// }

// Mat3.prototype.make4x4 = function(){
//   return new Mat4([
//     this.elements[0], this.elements[1], this.elements[2], 0,
//     this.elements[3], this.elements[4], this.elements[5], 0,
//     this.elements[6], this.elements[7], this.elements[8], 0,
//     0,              0,              0,              1
//   ]);
// }

function Mat4(a){
  this.elements = [
    a[0], a[1], a[2], a[3],
    a[4], a[5], a[6], a[7],
    a[8], a[9], a[10],a[11],
    a[12],a[13],a[14],a[15]
  ];
}

function $M4(array){
  return new Mat4(array);
}

Mat4.prototype.toArray = function(){
  return this.elements;
}

Mat4.prototype.transpose = function(){
  return $M4([
    this.elements[0], this.elements[4], this.elements[8], this.elements[12],
    this.elements[1], this.elements[5], this.elements[9], this.elements[13],
    this.elements[2], this.elements[6], this.elements[10], this.elements[14],
    this.elements[3], this.elements[7], this.elements[11], this.elements[15],
  ]);
}

Mat4.prototype.timesScalar = function(s){
  return $M4([
    this.elements[0]*s, this.elements[1]*s, this.elements[2]*s, this.elements[3]*s,
    this.elements[4]*s, this.elements[5]*s, this.elements[6]*s, this.elements[7]*s,
    this.elements[8]*s, this.elements[9]*s, this.elements[10]*s,this.elements[11]*s,
    this.elements[12]*s,this.elements[13]*s,this.elements[14]*s,this.elements[15]*s
  ]);
}

Mat4.prototype.timesVec4 = function(v){
  return [
    this.elements[0]*v[0], this.elements[1]*v[1], this.elements[2]*v[2], this.elements[3]*v[3],
    this.elements[4]*v[0], this.elements[5]*v[1], this.elements[6]*v[2], this.elements[7]*v[3],
    this.elements[8]*v[0], this.elements[9]*v[1], this.elements[10]*v[2],this.elements[11]*v[3],
    this.elements[12]*v[0],this.elements[13]*v[1],this.elements[14]*v[2],this.elements[15]*v[3]
  ];
}

Mat4.prototype.timesMat4 = function(m){
  return $M4([
    this.elements[0]*m.elements[0] + this.elements[1]*m.elements[4] + this.elements[2]*m.elements[8] + this.elements[3]*m.elements[12],
    this.elements[0]*m.elements[1] + this.elements[1]*m.elements[5] + this.elements[2]*m.elements[9] + this.elements[3]*m.elements[13],
    this.elements[0]*m.elements[2] + this.elements[1]*m.elements[6] + this.elements[2]*m.elements[10] + this.elements[3]*m.elements[14],
    this.elements[0]*m.elements[3] + this.elements[1]*m.elements[7] + this.elements[2]*m.elements[11] + this.elements[3]*m.elements[15],

    this.elements[4]*m.elements[0] + this.elements[5]*m.elements[4] + this.elements[6]*m.elements[8] + this.elements[7]*m.elements[12],
    this.elements[4]*m.elements[1] + this.elements[5]*m.elements[5] + this.elements[6]*m.elements[9] + this.elements[7]*m.elements[13],
    this.elements[4]*m.elements[2] + this.elements[5]*m.elements[6] + this.elements[6]*m.elements[10] + this.elements[7]*m.elements[14],
    this.elements[4]*m.elements[3] + this.elements[5]*m.elements[7] + this.elements[6]*m.elements[11] + this.elements[7]*m.elements[15],

    this.elements[8]*m.elements[0] + this.elements[9]*m.elements[4] + this.elements[10]*m.elements[8] + this.elements[11]*m.elements[12],
    this.elements[8]*m.elements[1] + this.elements[9]*m.elements[5] + this.elements[10]*m.elements[9] + this.elements[11]*m.elements[13],
    this.elements[8]*m.elements[2] + this.elements[9]*m.elements[6] + this.elements[10]*m.elements[10] + this.elements[11]*m.elements[14],
    this.elements[8]*m.elements[3] + this.elements[9]*m.elements[7] + this.elements[10]*m.elements[11] + this.elements[11]*m.elements[15],

    this.elements[12]*m.elements[0] + this.elements[13]*m.elements[4] + this.elements[14]*m.elements[8] + this.elements[15]*m.elements[12],
    this.elements[12]*m.elements[1] + this.elements[13]*m.elements[5] + this.elements[14]*m.elements[9] + this.elements[15]*m.elements[13],
    this.elements[12]*m.elements[2] + this.elements[13]*m.elements[6] + this.elements[14]*m.elements[10] + this.elements[15]*m.elements[14],
    this.elements[12]*m.elements[3] + this.elements[13]*m.elements[7] + this.elements[14]*m.elements[11] + this.elements[15]*m.elements[15]
  ]);
}

Mat4.Translation = function(x,y,z){
  return $M4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
    ]);
}

Mat4.Rotation = function(x,y,z){
  var cos = Math.cos;
  var sin = Math.sin;
  function rotateX(x){
    return $M4([
      1, 0, 0, 0,
      0,cos(x), -sin(x), 0,
      0, sin(x), cos(x), 0,
      0, 0, 0, 1
    ]);
  }
  function rotateY(y){
    return $M4([
      cos(y), 0, sin(y), 0,
      0, 1, 0, 0,
      -sin(y), 0, cos(y), 0,
      0, 0, 0, 1
    ]);
  }
  function rotateZ(z){
    return $M4([
      cos(z), -sin(z), 0, 0,
      sin(z), cos(z), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }
  return rotateX(x).timesMat4(rotateY(y).timesMat4(rotateZ(z)));
}

Mat4.prototype.makeIdentity = function(){
  this.elements[0] = 1.0;
  this.elements[1] = 0.0;
  this.elements[2] = 0.0;
  this.elements[3] = 0.0;

  this.elements[4] = 0.0;
  this.elements[5] = 1.0;
  this.elements[6] = 0.0;
  this.elements[7] = 0.0;

  this.elements[8] = 0.0;
  this.elements[9] = 0.0;
  this.elements[10] = 1.0;
  this.elements[11] = 0.0;

  this.elements[12] = 0.0;
  this.elements[13] = 0.0;
  this.elements[14] = 0.0;
  this.elements[15] = 1.0;
}