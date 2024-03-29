var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var END_TAG = '$';

var Stack = __webpack_require__(8),
    sin = Math.sin,
    cos = Math.cos,
    vectorInstance = new Vector(),
    values = new Stack(),
    sizeStack = new Stack();

sizeStack.push(0);
var size = 0;

function Vector() {};

var $ = function $(v) {
  values.push(v);
  // sizeStack.push(v.length);
  // size = sizeStack.peek();
  return vectorInstance;
};

Object.defineProperty(Vector.prototype, END_TAG, {
  get: function get() {
    // sizeStack.pop();
    // size = sizeStack.peek();
    return values.pop();
  }
});

// Functions

Vector.prototype.plus = function (x) {
  if (Array.isArray(x)) {
    return this.plusVector(x);
  } else {
    return this.plusScalar(x);
  }
};

Vector.prototype.plusScalar = function (s) {
  var v = values.pop();
  var size = v.length;

  // Selects appropriate version for vector/matrix size--no logic branching, no loops, lazily evaluated, for optimal(?) performance
  var functionVersion = {
    2: function _() {
      return [v[0] + s, v[1] + s];
    },
    3: function _() {
      return [v[0] + s, v[1] + s, v[2] + s];
    },
    4: function _() {
      return [v[0] + s, v[1] + s, v[2] + s, v[3] + s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.plusVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] + v[0], u[1] + v[1]];
    },
    3: function _() {
      return [u[0] + v[0], u[1] + v[1], u[2] + v[2]];
    },
    4: function _() {
      return [u[0] + v[0], u[1] + v[1], u[2] + v[2], u[3] + v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.minusVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] - v[0], u[1] - v[1]];
    },
    3: function _() {
      return [u[0] - v[0], u[1] - v[1], u[2] - v[2]];
    },
    4: function _() {
      return [u[0] - v[0], u[1] - v[1], u[2] - v[2], u[3] - v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesScalar = function (s) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function _() {
      return [v[0] * s, v[1] * s];
    },
    3: function _() {
      return [v[0] * s, v[1] * s, v[2] * s];
    },
    4: function _() {
      return [v[0] * s, v[1] * s, v[2] * s, v[3] * s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] * v[0], u[1] * v[1]];
    },
    3: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2]];
    },
    4: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2], u[3] * v[3]];
    }

  }[v.length];
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesMatrix = function (m) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    3: function _() {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
    },
    4: function _() {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3], m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3], m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3], m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];
    },
    16: function _() {
      return [m[0] * v[0] + m[1] * v[4] + m[2] * v[8] + m[3] * v[12], m[0] * v[1] + m[1] * v[5] + m[2] * v[9] + m[3] * v[13], m[0] * v[2] + m[1] * v[6] + m[2] * v[10] + m[3] * v[14], m[0] * v[3] + m[1] * v[7] + m[2] * v[11] + m[3] * v[15], m[4] * v[0] + m[5] * v[4] + m[6] * v[8] + m[7] * v[12], m[4] * v[1] + m[5] * v[5] + m[6] * v[9] + m[7] * v[13], m[4] * v[2] + m[5] * v[6] + m[6] * v[10] + m[7] * v[14], m[4] * v[3] + m[5] * v[7] + m[6] * v[11] + m[7] * v[15], m[8] * v[0] + m[9] * v[4] + m[10] * v[8] + m[11] * v[12], m[8] * v[1] + m[9] * v[5] + m[10] * v[9] + m[11] * v[13], m[8] * v[2] + m[9] * v[6] + m[10] * v[10] + m[11] * v[14], m[8] * v[3] + m[9] * v[7] + m[10] * v[11] + m[11] * v[15], m[12] * v[0] + m[13] * v[4] + m[14] * v[8] + m[15] * v[12], m[12] * v[1] + m[13] * v[5] + m[14] * v[9] + m[15] * v[13], m[12] * v[2] + m[13] * v[6] + m[14] * v[10] + m[15] * v[14], m[12] * v[3] + m[13] * v[7] + m[14] * v[11] + m[15] * v[15]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.times = function () {
  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }

  if (x.length === 1) {
    return this.timesScalar(x);
  } else if (x.length === 16) {
    return this.timesMatrix.apply(this, x);
  } else {
    return this.timesVector.apply(this, x);
  }
};

Vector.prototype.divideByScalar = function (s) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function _() {
      return [v[0] / s, v[1] / s];
    },
    3: function _() {
      return [v[0] / s, v[1] / s, v[2] / s];
    },
    4: function _() {
      return [v[0] / s, v[1] / s, v[2] / s, v[3] / s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.divideByVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] / v[0], u[1] / v[1]];
    },
    3: function _() {
      return [u[0] / v[0], u[1] / v[1], u[2] / v[2]];
    },
    4: function _() {
      return [u[0] / v[0], u[1] / v[1], u[2] / v[2], u[3] / v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.divideBy = function (x) {
  if (Array.isArray(x)) {
    return this.divideByVector(x);
  } else {
    return this.divideByScalar(x);
  }
};

Vector.prototype.dot = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return u[0] * v[0] + u[1] * v[1];
    },
    3: function _() {
      return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    },
    4: function _() {
      return u[0] * v[0] + u[1] * v[1] + u[2] * v[2] + u[3] * v[3];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.mix = function (v) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

  values.push(this.timesScalar(1 - t).plusVector($(v).timesScalar(t)[END_TAG])[END_TAG]);
  return this;
};

Vector.prototype.squaredLength = function () {
  values.push(this.dot(values.peek())[END_TAG]);
  return this;
};

Vector.prototype.length = function () {
  values.push(Math.sqrt(this.squaredLength()[END_TAG]));
  return this;
};

Vector.prototype.distanceTo = function (b) {
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).length().$);
  return this;
};

Vector.prototype.squaredDistanceTo = function (b) {
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).squaredLength().$);
  return this;
};

Vector.prototype.nearest = function (a, b) {
  var v = values.pop();
  var distA = $(v).squaredDistanceTo(a).$;
  var distB = $(v).squaredDistanceTo(b).$;
  values.push(distA < distB ? a : b);
  return this;
};

Vector.prototype.isLeftOf = function (r) {
  var v = values.pop();
  values.push((v[1] - r[1]) * (r[2] - r[0]) > (v[0] - r[0]) * (r[3] - r[2]));
  return this;
};

Vector.prototype.unit = function () {
  var value = values.peek();
  if (value[0] === 0 && value[1] === 0 && (value.length === 2 || value[2] === 0)) {
    values.pop();
    values.push([0, 0, 0].slice(-value.length));
  } else {
    values.push(this.divideByScalar($(values.peek()).length()[END_TAG])[END_TAG]);
  }
  return this;
};

Vector.prototype.turnLeft = function () {
  var v = values.pop();
  values.push([-v[1], v[0]]);
  return this;
};

Vector.prototype.turnRight = function () {
  var v = values.pop();
  values.push([v[1], -v[0]]);
  return this;
};

Vector.prototype.leftNormal = function () {
  var v = values.pop();
  values.push($(v).unit().turnLeft()[END_TAG]);
  return this;
};

Vector.prototype.rightNormal = function () {
  var v = values.pop();
  values.push($(v).unit().turnRight()[END_TAG]);
  return this;
};

Vector.prototype.rotate2d = function (angle) {
  var v = values.pop();
  var size = v.length;
  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
  values.push(v);
  return this;
};

Vector.prototype.angle2d = function () {
  var v = values.pop();
  var size = v.length;
  values.push(Math.atan2(v[1], v[0]));
  return this;
};

Vector.prototype.directionTo = function (v) {
  var u = values.pop();
  var size = u.length;
  values.push(this.minusVector(u).unit()[END_TAG]);
  return this;
};

Vector.prototype.projectedLength = function (v) {
  values.push(Math.sqrt(Math.abs(this.dot(v)[END_TAG])));
  return this;
};

Vector.prototype.scalarProjection = function (b) {
  var a = values.pop();
  var bLength = $(b).length().$;
  values.push(bLength === 0 ? [0, 0].slice(-a.length) : $(b).unit().times($(a).dot(b).$ / $(b).squaredLength().$).$);
  return this;
};

// Vector.prototype.rejection = function(b){
//   var a = values.pop();
//   values.push()
// }

// Todo: Add versions for other size matrices
Vector.prototype.transpose = function () {
  var v = values.pop();
  var size = v.length;
  values.push([v[0], v[4], v[8], v[12], v[1], v[5], v[9], v[13], v[2], v[6], v[10], v[14], v[3], v[7], v[11], v[15]]);
  return this;
};

Vector.prototype.rotate = function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];

  var v = values.pop();
  var size = v.length;
  if (size === 2) {
    values.push(this.rotate2d(x)[END_TAG]);
    return this;
  }
  var xRotation = [1, 0, 0, 0, 0, cos(x), -sin(x), 0, 0, sin(x), cos(x), 0, 0, 0, 0, 1],
      yRotation = [cos(y), 0, sin(y), 0, 0, 1, 0, 0, -sin(y), 0, cos(y), 0, 0, 0, 0, 1],
      zRotation = [cos(z), -sin(z), 0, 0, sin(z), cos(z), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  values.push($(v).timesMatrix(xRotation).timesMatrix(yRotation).timesMatrix(zRotation)[END_TAG]);
  return this;
};

Vector.prototype.cross = function (b) {
  var a = values.pop();
  var size = a.length;
  values.push([a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]);
  return this;
};

Vector.prototype.coordPairToVector = function () {
  var coords = values.pop();
  values.push($([coords[2], coords[3]]).minusVector([coords[0], coords[1]]).$);
  return this;
};

Vector.prototype.angleTo = function (b) {
  var a = values.pop();
  values.push(Math.acos($(a).dot(b).$));
  return this;
};

Vector.prototype.rotateToPlane = function (planeNormal) {
  var myAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1, 0];

  var v = values.pop();
  var rotationMatrix = [];
  if (planeNormal[0] != 0 || planeNormal[1] != 0 || planeNormal[2] != 0) {
    var angle = Math.acos($(myAxis).dot(planeNormal).$),
        axis = $(myAxis).cross(planeNormal).unit().$,
        c = cos(angle),
        t = 1 - c,
        s = sin(angle),
        _axis = _slicedToArray(axis, 3),
        x = _axis[0],
        y = _axis[1],
        z = _axis[2],
        tX = t * x,
        tY = t * y,
        tZ = t * z,
        tXY = tX * y,
        tYX = tXY,
        tXX = tX * x,
        tYZ = tY * z,
        tZY = tYZ,
        tYY = tY * y,
        tXZ = tX * z,
        tZX = tXZ,
        tZZ = tZ * z,
        xS = x * s,
        yS = y * s,
        zS = z * s,
        rotationMatrix = [tXX + c, tYX - zS, tZX + yS, tXY + zS, tYY + c, tZY - xS, tXZ + yS, tYZ + xS, tZZ + c];
  } else {
    rotationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  values.push($(v).timesMatrix(rotationMatrix).$);
  return this;
};

Vector.prototype.toHexString = function () {
  var v = values.pop();
  var r = ('00' + v[0].toString(16)).slice(-2),
      g = ('00' + v[1].toString(16)).slice(-2),
      b = ('00' + v[2].toString(16)).slice(-2);
  values.push(r + g + b);
  return this;
};

Vector.prototype.fromHexString = function () {
  var v = values.pop();
  var arr = [parseInt(v.slice(0, 1), 16), parseInt(v.slice(2, 3), 16), parseInt(v.slice(4, 5), 16)];
  values.push(arr);
  return this;
};

Vector.prototype.hexColor = function () {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var v = values.pop();
  if (min === -1) v = $(v).plus(1).divideBy(2).$;
  v = $(v).times(256).$;
  var r = ('00' + v[0].toString(16)).slice(-2),
      g = ('00' + v[1].toString(16)).slice(-2),
      b = ('00' + v[2].toString(16)).slice(-2);
  values.push(r + g + b);
  return this;
};

Vector.prototype.inverse = function () {
  var r = Vector.IDENTITY_MATRIX,
      m = values.pop();
  var size = m.length;

  r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
  r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
  r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
  r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];

  r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
  r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
  r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
  r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];

  r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
  r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
  r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
  r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];

  r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
  r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
  r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
  r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];

  // In case of divide by zero error, if det is 0 just leave unchanged
  var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12] || 1;
  for (var i = 0; i < 16; i++) {
    r[i] /= det;
  }values.push(r);
  return this;
};

module.exports = $;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function intersection(x1, y1, x2, y2, u1, v1, u2, v2) {

  // x and y are used for line 1, u and v for line 2
  // input x1,y1 input x2,y2 input u1,v1 input u2,v2


  var b1 = (y2 - y1) / (x2 - x1);
  var b2 = (v2 - v1) / (u2 - u1);

  var a1 = y1 - b1 * x1;
  var a2 = v1 - b2 * u1;

  var xi = -(a1 - a2) / (b1 - b2);
  var yi = a1 + b1 * xi;

  if ((x1 - xi) * (xi - x2) >= 0 && (u1 - xi) * (xi - u2) >= 0 && (y1 - yi) * (yi - y2) >= 0 && (v1 - yi) * (yi - v2) >= 0) {
    return [xi, yi];
  } else {
    return null;
  }
}

module.exports = intersection;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var $ = __webpack_require__(0),
    intersects = __webpack_require__(1);

var DISTANCE_THRESHOLD = 5;

// BOUNDARY COLLECTION OBJECT ==========================

function BoundaryCollection(points, distanceThreshold) {
  var _this = this;

  this.distanceThreshold = distanceThreshold;
  this.points = points;
  this.rays = function () {
    var boundaries = [];
    for (var i = 0; i < points.length; i++) {
      var polygon = points[i];
      for (var j = 0; j < polygon.length - 1; j++) {
        boundaries.push([].concat(_toConsumableArray(polygon[j]), _toConsumableArray(polygon[j + 1])));
      }
    }
    return boundaries;
  }();
  this.vectors = function () {
    var bVecs = [];
    for (var i = 0; i < _this.rays.length; i++) {
      bVecs.push($(_this.rays[i]).coordPairToVector().$);
    }
    return bVecs;
  }();
  this.normals = function () {
    var bNorms = [];
    for (var i = 0; i < _this.vectors.length; i++) {
      bNorms.push($(_this.vectors[i]).leftNormal().$);
    }
    return bNorms;
  }();
  this.bboxes = function () {
    var boxes = [];
    for (var i = 0; i < _this.rays.length; i++) {
      boxes.push(frontOfRayBBox(_this.rays[i], _this.distanceThreshold));
    }
    return boxes;
  }();
}

function forceAwayFromPoint(position, point, distanceThreshold) {
  var dist = $(position).distanceTo(point).$;
  if (dist < distanceThreshold) {
    return $([].concat(_toConsumableArray(point), _toConsumableArray(position))).coordPairToVector().unit().times(distanceThreshold - dist).$;
  } else return false;
}

function forceAwayFromPoints(position, points, distanceThreshold) {
  var proximityVector = [0, 0];
  var vec = false;
  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < points[i].length; j++) {
      vec = forceAwayFromPoint(position, points[i][j], distanceThreshold);
      if (vec) proximityVector = $(proximityVector).plus(vec).$;
    }
  }
  return proximityVector;
}

// Bounding box for a boundary's "active zone"
// aka a box parallel to the line whose width = size
function frontOfRayBBox(ray, size) {
  var side1 = ray;
  var normal = $(ray).coordPairToVector().leftNormal().times(size).$;
  var side2 = [ray[2], ray[3]].concat(_toConsumableArray($([ray[2], ray[3]]).plus(normal).$));
  var side4 = [].concat(_toConsumableArray($([ray[0], ray[1]]).plus(normal).$), [ray[0], ray[1]]);
  var side3 = [side2[2], side2[3], side4[0], side4[1]];
  return [side1, side2, side3, side4];
}

function insidePolygon(point, sides) {
  var horizontalRay = [0, point[1]].concat(_toConsumableArray(point));
  var crossings = 0;

  // make sure no boundary points are on our test ray
  var boundaries = [];
  for (var i = 0; i < sides.length; i++) {
    var boundary = sides[i];
    if (boundary[1] === point[1]) boundary[1] += 1;
    if (boundary[3] === point[1]) boundary[3] += 1;
    boundaries.push(boundary);
  }

  for (var _i = 0; _i < boundaries.length; _i++) {
    var _boundary = boundaries[_i];
    var intersection = intersects.apply(undefined, _toConsumableArray(horizontalRay).concat(_toConsumableArray(_boundary)));
    if (intersection) crossings++;
  }

  // If crossings is odd, we're inside. If even, we're outside.
  return crossings % 2 != 0;
}

BoundaryCollection.prototype.forceAway = function (position) {
  var _this2 = this;

  // If we're too close to a vertex, add the counter-force to our vector
  var force = forceAwayFromPoints(position, this.points, this.distanceThreshold);
  // Now test against polygon sides

  var _loop = function _loop(i) {
    boundary = _this2.rays[i];


    (function () {
      var boundaryVector = _this2.vectors[i];

      // If we're on the inside side of the boundary
      if (!$(position).isLeftOf(boundaryVector).$) {
        // If we're inside the boundary's active zone
        var bBox = _this2.bboxes[i];
        if (insidePolygon(position, bBox)) {

          var boundaryNormal = _this2.normals[i];

          // Test for intersection between distance ray and boundary ray
          var distanceTestVector = $(boundaryNormal).times(_this2.distanceThreshold).$;
          var distanceRay = [].concat(_toConsumableArray(position), _toConsumableArray($(position).minusVector(distanceTestVector).$));
          var intersection = intersects.apply(undefined, _toConsumableArray(distanceRay).concat(_toConsumableArray(boundary)));

          // If we're too close to the boundary
          if (intersection) {
            var dist = $([].concat(_toConsumableArray(position), _toConsumableArray(intersection))).coordPairToVector().length().$;
            var vec = $([].concat(_toConsumableArray(intersection), _toConsumableArray(position))).coordPairToVector().unit().times(_this2.distanceThreshold - dist).$;
            force = $(force).plus(vec).$;
          }
        }
      }
    })();
  };

  for (var i = 0; i < this.rays.length; i++) {
    var boundary;

    _loop(i);
  }
  return force;
};

module.exports = BoundaryCollection;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var getImageData = __webpack_require__(7);

function IndexedNormalMap(_ref) {
  var image = _ref.image,
      normals = _ref.normals,
      _ref$startx = _ref.startx,
      startx = _ref$startx === undefined ? 0 : _ref$startx,
      _ref$starty = _ref.starty,
      starty = _ref$starty === undefined ? 0 : _ref$starty,
      _ref$sourceWidth = _ref.sourceWidth,
      sourceWidth = _ref$sourceWidth === undefined ? 512 : _ref$sourceWidth,
      _ref$sourceHeight = _ref.sourceHeight,
      sourceHeight = _ref$sourceHeight === undefined ? 512 : _ref$sourceHeight;

  this.positionNormals = [];
  this.normals = {};
  this.width = sourceWidth;
  this.height = sourceHeight;
  var data = getImageData({ image: image, sourceWidth: sourceWidth, sourceHeight: sourceHeight });
  var normal = [0, 0, 0];
  var hex = 0;
  for (var i = 0; i < data.length; i += 4) {
    hex = parseInt($([data[i], data[i + 1], data[i + 2]]).toHexString().$, 16);
    if (normals[hex]) {
      this.positionNormals.push(hex);
    } else {
      normal = $([data[i], data[i + 1], data[i + 2]]).divideBy(256).times(2).plus(-1).unit().$;
      this.normals[hex] = normal;
      this.positionNormals.push(hex);
    }
  }
}

IndexedNormalMap.prototype.lookup = function (x, y) {
  var normalIndex = this.positionNormals[this.width * y + x];
  var normal = this.normals[normalIndex];
  return normal || [0, 0];
};

IndexedNormalMap.prototype.transform = function (func) {
  for (var n in this.normals) {
    this.normals[n] = func(this.normals[n]);
  }
};

module.exports = IndexedNormalMap;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min);
}

function threshold(x, threshold, min, max) {
  if (x < threshold) return min;
  return max;
}

module.exports = { clamp: clamp, threshold: threshold };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);

var downhillForce = function () {
  function slopeForceFunc(normal) {
    var gravity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1, 0];

    var rollDirection = $(gravity).scalarProjection(normal).unit().$;
    var rollSpeed = 1 - $(gravity).dot(normal).$;
    var rollVector = $(rollDirection).times(rollSpeed).$;
    return rollVector;
  };
  return slopeForceFunc;
}();

module.exports = downhillForce;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// mountain
var mountain = [[[30, 155.5], [224, 163.5], [439, 140.5], [512, 140.505], [512.005, 174.5], [271, 189.5], [266, 189.505], [262, 413.5], [337, 444.5], [512, 417.5], [516, 511.5], [0, 511.505], [0.005, 458.5], [132, 493.5], [54, 418.5], [0, 341.5], [0.005, 221.5], [59, 176.5], [38, 175.505], [30, 155.5]]];

// hills
var hills = [[[0.05, 191], [242, 192], [256, 196], [276, 210], [375, 216], [363, 256], [361, 287], [409, 308], [446, 309], [465, 337], [512, 342], [511, 512], [241, 511], [191, 431], [90, 453], [0.01, 420], [0.05, 191]]];

// ziggurat
var ziggurat = [[[569.588, 701.58], [518.59, 733.078], [424.095, 850.072], [359.598, 814.074], [359.6, 791.575], [329.6, 767.577], [290.602, 766.077], [290.602, 766.077], [329.6, 767.577], [359.6, 791.575], [359.598, 814.074], [424.095, 850.072], [518.59, 733.078], [569.588, 701.58]], [[134, 155], [186, 193], [265, 146]], [[898, 493], [669, 313], [620, 252], [522, 317], [384, 225], [194, 466]], [[1024, 530], [999, 553], [898, 680], [769, 775.826], [665, 775.826], [620, 800]], [[526, 918], [469, 962], [306, 845], [306, 828], [278, 807], [227, 804], [186, 775.826], [78, 771], [0, 724]]];

module.exports = { mountain: mountain, hills: hills, ziggurat: ziggurat };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getImageData(_ref) {
  var image = _ref.image,
      _ref$startx = _ref.startx,
      startx = _ref$startx === undefined ? 0 : _ref$startx,
      _ref$starty = _ref.starty,
      starty = _ref$starty === undefined ? 0 : _ref$starty,
      _ref$sourceWidth = _ref.sourceWidth,
      sourceWidth = _ref$sourceWidth === undefined ? 512 : _ref$sourceWidth,
      _ref$sourceHeight = _ref.sourceHeight,
      sourceHeight = _ref$sourceHeight === undefined ? 512 : _ref$sourceHeight;

  var tempCanvas = document.createElement('canvas');
  tempCanvas.width = sourceWidth;
  tempCanvas.height = sourceHeight;
  var tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(image, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
  return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
};

module.exports = getImageData;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function SimpleStack() {
  this.top = null;
}

SimpleStack.prototype.push = function (value) {
  this.top = { value: value, below: this.top };
};

SimpleStack.prototype.pop = function () {
  var node = this.top;
  this.top = this.top.below;
  return node.value;
};

SimpleStack.prototype.peek = function () {
  return this.top.value;
};

SimpleStack.prototype.fill = function (a) {
  for (var i = 0; i < a.length; i++) {
    this.push(a[i]);
  }
};

SimpleStack.prototype.fillWithValues = function (va) {
  for (var i = 0; i < a.length; i++) {
    this.pushValue(va[i]);
  }
};

SimpleStack.prototype.toArr = function () {
  var arr = [];
  var currentNode = this.top;
  while (currentNode != null) {
    arr.push(currentNode);
    currentNode = currentNode.below;
  }
  return arr;
};

module.exports = SimpleStack;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var IndexedNormalMap = __webpack_require__(3),
    $ = __webpack_require__(0),
    BoundaryCollection = __webpack_require__(2),
    intersects = __webpack_require__(1),
    _require = __webpack_require__(4),
    clamp = _require.clamp,
    downhillForce = __webpack_require__(5),
    DISTANCE_THRESHOLD = 5,
    SPACEBAR = 32,
    LEFT_KEY = 37,
    UP_KEY = 38,
    RIGHT_KEY = 39,
    DOWN_KEY = 40,
    WIN_WIDTH = 512,
    WIN_HEIGHT = 512,
    TILE_WIDTH = 32,
    TILE_HEIGHT = 32,
    cos = Math.cos,
    sin = Math.sin,
    root = document.getElementById('root'),
    ball = document.getElementById('ball'),
    shadow = document.getElementById('shadow'),
    wrapper = document.getElementById('wrapper'),
    loader = document.getElementById('loader-wrapper'),
    loaderText = document.getElementById('loader-text');


var image = new Image(WIN_WIDTH, WIN_HEIGHT),
    terrainMap = null,
    normals = [],
    depths = [],
    loop = null,
    ballImpulse = [0, 0],
    ballY = 256,
    ballX = 256,
    ballSpeed = 2,
    ballVelocity = [0, 0];

var tick = inAir;
var loop = null;

image.onload = function () {
  terrainMap = new IndexedNormalMap({ image: image, normals: normals, sourceWidth: WIN_WIDTH, sourceHeight: WIN_HEIGHT });
  // Make terrain map into a map of downhill forces
  terrainMap.transform(downhillForce);
  ball.className = "showing";
  shadow.className = "showing";
  loader.className = "hidden";
  loaderText.className = "hidden";
  tick();
};
image.src = 'hills4.png';

// BOUNDARY CONSTANTS =======================================================

var boundsFromFile = __webpack_require__(6).hills;
var boundaries = new BoundaryCollection(boundsFromFile, DISTANCE_THRESHOLD);

function jump() {
  window.cancelAnimationFrame(loop);
  tick = inAir;
  requestAnimationFrame(tick);
}

var groundPos = [0, 0],
    airPos = [0, 0],
    init = true,
    gravity = 0;

function inAir(dt) {
  loop = requestAnimationFrame(tick);
  if (init) {
    groundPos[1] = ballY;
    gravity = -7;
    init = false;
  }
  airPos = [ballX, ballY];
  groundPos = [ballX, groundPos[1]];
  var slope = terrainMap.lookup(parseInt(groundPos[0]), parseInt(groundPos[1]));
  var shadowRotation = $(slope).angle2d().$;

  var airVector = $(ballImpulse).plus([0, gravity]).$;

  var groundVector = $(ballImpulse).dot(slope).$ < 0 ? $(ballImpulse).minusVector(slope).$ : groundVector = $(ballImpulse).plus(slope).$;

  airPos = $(airPos).plus(airVector).$;
  groundPos = $(groundPos).plus(groundVector).$;

  var boundaryForce = boundaries.forceAway(groundPos);
  groundPos = $(groundPos).plus(boundaryForce).$;
  airPos = $(airPos).plus(boundaryForce).$;

  // If we're falling down and we hit or pass the ground projection, we land (stick to ground Y and switch to onGround state)
  if (gravity > 0 && airPos[1] >= groundPos[1]) {
    init = true;
    airPos[1] = groundPos[1];
    window.cancelAnimationFrame(loop);
    tick = onGround;
    loop = requestAnimationFrame(tick);
  }

  var _airPos = airPos;

  var _airPos2 = _slicedToArray(_airPos, 2);

  ballX = _airPos2[0];
  ballY = _airPos2[1];

  gravity += 0.4;

  ball.style.transform = 'translate(' + (ballX - 5) + 'px, ' + (ballY - 10) + 'px)';
  shadow.style.transform = 'translate(' + (groundPos[0] - 5) + 'px, ' + groundPos[1] + 'px) rotate(' + shadowRotation + 'rad)';
}

function onGround(dt) {
  loop = requestAnimationFrame(tick);
  var slope = terrainMap.lookup(parseInt(ballX), parseInt(ballY));
  var shadowRotation = $(slope).angle2d().$;
  var position = [ballX, ballY];
  position = $(position).plus(ballImpulse).$;
  position = $(position).plus($(slope).times(ballSpeed).$).$;
  position = $(position).plus(boundaries.forceAway(position)).$;
  var _position = position;

  var _position2 = _slicedToArray(_position, 2);

  ballX = _position2[0];
  ballY = _position2[1];

  ball.style.transform = 'translate(' + (ballX - 5) + 'px, ' + (ballY - 10) + 'px)';
  shadow.style.transform = 'translate(' + (ballX - 5) + 'px, ' + ballY + 'px) rotate(' + shadowRotation + 'rad)';
}

window.onload = function () {
  var spaceDown = false;

  window.addEventListener("keydown", function (e) {
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode) {
      case LEFT_KEY:
        ballImpulse[0] = -1;
        break;
      case RIGHT_KEY:
        ballImpulse[0] = 1;
        break;
      case UP_KEY:
        ballImpulse[1] = -1;
        break;
      case DOWN_KEY:
        ballImpulse[1] = 1;
        break;
      case SPACEBAR:
        if (!spaceDown && onGround) jump();
        spaceDown = true;
        break;
    }
    ballImpulse = $(ballImpulse).unit().times(ballSpeed).$;
  });

  window.addEventListener("keyup", function (e) {
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode) {
      case LEFT_KEY:
        ballImpulse[0] = 0;
        break;
      case UP_KEY:
        ballImpulse[1] = 0;
        break;
      case RIGHT_KEY:
        ballImpulse[0] = 0;
        break;
      case DOWN_KEY:
        ballImpulse[1] = 0;
        break;
      case SPACEBAR:
        spaceDown = false;
        break;
    }
    ballImpulse = $(ballImpulse).unit().times(ballSpeed).$;
  });

  var startVec = [0, 0];
  var button = document.getElementById('jump-button');

  root.addEventListener('touchstart', function (e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    if (e.target.id === 'jump-button') {
      jump();
      return;
    }
    startVec = [touch.clientX, touch.clientY];
  });

  root.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    if (e.target.id === 'jump-button') return;
    var newVec = [touch.clientX, touch.clientY];
    var direction = $(newVec).minusVector(startVec).unit().times(ballSpeed).$;
    ballImpulse[0] = direction[0];
    ballImpulse[1] = direction[1];
  });

  root.addEventListener('touchend', function (e) {
    e.preventDefault();
    if (e.target.id === 'jump-button') return;
    ballImpulse[0] = 0;
    ballImpulse[1] = 0;
    startVec = [0, 0];
  });
};

module.exports = { $: $, jump: jump };

/***/ })
/******/ ]);