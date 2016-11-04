// Singleton! Modular!

// IIFE!
var ArrayVec3D = (function() {

  function assign(v1, v2){
    v1[0] = v2[0];
    v1[1] = v2[1];
    v1[2] = v2[2];
  }

  function addScalar(v, s){
    return [
      v[0] + s,
      v[1] + s,
      v[2] + s
      ];
  };

  function addVectors(a,b){
    return [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2]
      ];
  };

  function subtractVectors(a,b){
    return [
      a[0] - b[0],
      a[1] - b[1],
      a[2] - b[2]
      ];
  };

  function subtractScalar(v, s){
    return [
      v[0] - s,
      v[1] - s,
      v[2] - s
      ];
  };

  function multiplyVectors(a,b){
    return [
      a[0] * b[0],
      a[1] * b[1],
      a[2] * b[2]
      ];
  }

  function multiplyByScalar(v, s){
    return [
      v[0] * s,
      v[1] * s,
      v[2] * s
      ];
  };

  function divideVectors(a,b){
    return [
      a[0] / b[0],
      a[1] / b[1],
      a[2] / b[2]
      ];
  }

  function divideByScalar(v, s){
    return [
      v[0] / s,
      v[1] / s,
      v[2] / s
      ];
  };

  function dot(a,b){
    return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  }

  function interpolate(a,b,t){
    // if (t == undefined) {
    //   t = 0.5;
    // }
    return addVectors(multiplyByScalar(a, 1-t), multiplyByScalar(b, t));
  }

  function length(v){
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function squaredLength(v){
    return (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function distance(a,b) {
    return length(subtractVectors(a, b));
  }

  function unitVector(v) {
    return divideByScalar(v, length(v));
  }

  function directionTo(a,b){
    return unitVector(subtractVectors(b,a));
  };

  function projectedLength(a,b){
    return dot(a,b);
  };

  function convertCoords(v){
    // v = unitVector(v);
    // v[0] = v[0] * 2 - 1;
    // v[1] = v[1] * 2 - 1;
    // v[2] = v[2] * 2 - 1;
    // return unitVector(v);
    return v
  }

  return {
    addScalar: addScalar,
    addVectors: addVectors,
    assign: assign,
    subtractVectors: subtractVectors,
    subtractScalar: subtractScalar,
    multiplyVectors: multiplyVectors,
    multiplyByScalar: multiplyByScalar,
    divideVectors: divideVectors,
    divideByScalar: divideByScalar,
    dot: dot,
    interpolate: interpolate,
    length: length,
    squaredLength: squaredLength,
    distance: distance,
    unitVector: unitVector,
    directionTo: directionTo,
    projectedLength: projectedLength,
    convertCoords: convertCoords
  };

})();