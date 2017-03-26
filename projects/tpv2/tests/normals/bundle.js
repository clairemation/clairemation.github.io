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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var END_TAG = '$';

var Stack = __webpack_require__(0),
    sin = Math.sin,
    cos = Math.cos,
    vectorInstance = new Vector(),
    values = new Stack();

var size = 0;

function Vector() {};

var $ = function $(v) {
  values.push(v);
  size = v.length;
  return vectorInstance;
};

Object.defineProperty(Vector.prototype, END_TAG, {
  get: function get() {
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
  var functionVersion = {
    2: function _() {
      return [u[0] * v[0], u[1] * v[1]];
    },
    3: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2]];
    },
    4: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2], u[3] * v[3]];
    },
    16: {
      4: function _() {
        return [u[0] * v[0], u[1] * v[1], u[2] * v[2], u[3] * v[3], u[4] * v[0], u[5] * v[1], u[6] * v[2], u[7] * v[3], u[8] * v[0], u[9] * v[1], u[10] * v[2], u[11] * v[3], u[12] * v[0], u[13] * v[1], u[14] * v[2], u[15] * v[3]];
      },
      16: function _() {
        return [u[0] * v[0] + u[1] * v[4] + u[2] * v[8] + u[3] * v[12], u[0] * v[1] + u[1] * v[5] + u[2] * v[9] + u[3] * v[13], u[0] * v[2] + u[1] * v[6] + u[2] * v[10] + u[3] * v[14], u[0] * v[3] + u[1] * v[7] + u[2] * v[11] + u[3] * v[15], u[4] * v[0] + u[5] * v[4] + u[6] * v[8] + u[7] * v[12], u[4] * v[1] + u[5] * v[5] + u[6] * v[9] + u[7] * v[13], u[4] * v[2] + u[5] * v[6] + u[6] * v[10] + u[7] * v[14], u[4] * v[3] + u[5] * v[7] + u[6] * v[11] + u[7] * v[15], u[8] * v[0] + u[9] * v[4] + u[10] * v[8] + u[11] * v[12], u[8] * v[1] + u[9] * v[5] + u[10] * v[9] + u[11] * v[13], u[8] * v[2] + u[9] * v[6] + u[10] * v[10] + u[11] * v[14], u[8] * v[3] + u[9] * v[7] + u[10] * v[11] + u[11] * v[15], u[12] * v[0] + u[13] * v[4] + u[14] * v[8] + u[15] * v[12], u[12] * v[1] + u[13] * v[5] + u[14] * v[9] + u[15] * v[13], u[12] * v[2] + u[13] * v[6] + u[14] * v[10] + u[15] * v[14], u[12] * v[3] + u[13] * v[7] + u[14] * v[11] + u[15] * v[15]];
      }
    }[v.length]
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
  } else {
    return this.timesVector.apply(this, x);
  }
};

Vector.prototype.divideByScalar = function (s) {
  var v = values.pop();
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

Vector.prototype.squaredDistance = function (v) {
  values.push(this.minusVector(v).squaredLength()[END_TAG]);
  return this;
};

Vector.prototype.distance = function (v) {
  values.push(Math.sqrt(this.squaredDistance(v)[END_TAG]));
  return this;
};

Vector.prototype.unit = function () {
  var value = values.peek();
  if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
    values.pop();
    values.push([0, 0, 0]);
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
  return this.turnLeft().unit();
};

Vector.prototype.rightNormal = function () {
  return this.turnRight().unit();
};

Vector.prototype.rotate2d = function (angle) {
  var v = values.pop();
  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
  values.push(v);
  return this;
};

Vector.prototype.angle2d = function () {
  var v = values.pop();
  values.push(Math.atan2(v[1], v[0]));
  return this;
};

Vector.prototype.directionTo = function (v) {
  var u = values.pop();
  values.push(v);
  values.push(this.minusVector(u).unit()[END_TAG]);
  return this;
};

Vector.prototype.projectedLength = function (v) {
  values.push(this.dot(v)[END_TAG]);
  return this;
};

// Todo: Add versions for other size matrices
Vector.prototype.transpose = function () {
  var v = values.pop();
  values.push([v[0], v[4], v[8], v[12], v[1], v[5], v[9], v[13], v[2], v[6], v[10], v[14], v[3], v[7], v[11], v[15]]);
  return this;
};

Vector.prototype.scale = function (x, y, z) {
  values.push(this.times([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1])[END_TAG]);
  return this;
};

Vector.prototype.rotate = function (x, y, z) {
  if (size === 2) {
    values.push(this.rotate2d(x)[END_TAG]);
    return this;
  }
  var xRotation = [1, 0, 0, 0, 0, cos(x), -sin(x), 0, 0, sin(x), cos(x), 0, 0, 0, 0, 1],
      yRotation = [cos(y), 0, sin(y), 0, 0, 1, 0, 0, -sin(y), 0, cos(y), 0, 0, 0, 0, 1],
      zRotation = [cos(z), -sin(z), 0, 0, sin(z), cos(z), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  values.push(this.times(xRotation).times(yRotation).times(zRotation)[END_TAG]);
  return this;
};

Vector.prototype.inverse = function () {
  var r = Vector.IDENTITY_MATRIX,
      m = values.pop();

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Engine = function Engine() {
  var index = [],
      registry = {};

  function Engine() {
    this.Component = function (args) {};
    this.update = function () {};
    Object.defineProperty(this, "components", {
      get: function get() {
        return registry;
      }
    });
  }

  Engine.prototype.createComponent = function (args) {
    var component = new this.Component(args);
    registry[args.id] = component;
    index.push(component);
    return component;
  };

  Engine.prototype.deleteComponent = function (id) {
    var component = registry[id];
    delete registry[id];
    index.splice(index.indexOf(registry[id]), 1);
  };

  return Engine;
}();

module.exports = Engine;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(0);

var ObjectPool = Stack;

module.exports = ObjectPool;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function WebGLDataObject(args) {
  var canvas = args.canvas,
      vertShaderUrl = args.vertShaderUrl,
      fragShaderUrl = args.fragShaderUrl;

  this.canvas = canvas;
  var gl = this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  this.projectionMatrix = WebGLDataObject.makeOrthoMatrix(canvas.clientWidth, canvas.clientHeight, 1000);
  this.mvMatrix = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
  this.program = {};
  return new Promise(function (resolve, reject) {
    GLUtil.buildGLProgramFromFiles(gl, this.program, vertShaderUrl, fragShaderUrl).then(function (result) {
      this.program = {
        program: result[0],
        params: result[1]
      };
      GLUtil.standardSettings(gl);
      resolve(this);
    }.bind(this));
  }.bind(this));
}

WebGLDataObject.prototype.use = function () {
  this.gl.useProgram(this.program.program);
};

WebGLDataObject.prototype.bindDataToAttribute = function (attribute, data, numComponents) {
  var buffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
  var attribLocation = this.program.params.attributeLocations[attribute];
  this.gl.enableVertexAttribArray(attribLocation);
  this.gl.vertexAttribPointer(this.program.params.attributeLocations[attribute], numComponents, this.gl.FLOAT, false, 0, 0);
};

WebGLDataObject.makeProjectionMatrix = function (fov, aspect, near, far, isInRadians) {
  if (!isInRadians) fov *= Math.PI / 180;
  var f = 1.0 / Math.tan(fov / 2);
  var rangeInverse = 1.0 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInverse, -1, 0, 0, near * far * rangeInverse * 2, 0]);
};

WebGLDataObject.makeOrthoMatrix = function (width, height, depth) {
  return new Float32Array([2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1]);
};

WebGLDataObject.prototype.setUniform = function (name, data) {
  var setter = this.program.params.uniformSetters[name];
  var location = this.program.params.uniformLocations[name];
  if (setter === "uniform3f") {
    this.gl[setter](location, data[0], data[1], data[2]);
  } else if (setter === "uniform1f") {
    this.gl[setter](location, data);
  } else {
    this.gl[setter](location, false, data);
  }
};

WebGLDataObject.prototype.attachTexture = function (img) {
  if (typeof img === "string") {
    return new Promise(function (resolve, reject) {
      WebGLDataObject.loadImage(img).then(function (result) {
        WebGLDataObject.attachTexture(this.gl, result, 0, "LINEAR", "LINEAR_MIPMAP_NEAREST");
        resolve();
      });
    });
  }
  return new Promise(function (resolve, reject) {
    WebGLDataObject.attachTexture(this.gl, img, 0, "LINEAR", "LINEAR_MIPMAP_NEAREST");
    resolve();
  });
};

WebGLDataObject.attachTexture = function (gl, texImage, index, magFilter, minFilter) {
  index = index || 0;
  magFilter = magFilter || "LINEAR";
  minFilter = minFilter || "LINEAR_MIPMAP_NEAREST";
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[magFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[minFilter]);
  if (magFilter.concat(minFilter).match(/MIPMAP/)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  gl.activeTexture(gl.TEXTURE0);
};

WebGLDataObject.loadImage = function (url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject();
    };
    img.src = url;
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Engine = __webpack_require__(2);

function PositionEngine() {
  Engine.call(this);
  this.name = 'PositionEngine';
}

PositionEngine.prototype = Object.create(Engine.prototype);
PositionEngine.prototype.constructor = PositionEngine;

module.exports = PositionEngine;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  coolgebra: __webpack_require__(1),
  limit: __webpack_require__(10),
  objectPool: __webpack_require__(3),
  stack: __webpack_require__(0),
  webgl: __webpack_require__(11)
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(1),
    LEFT_KEY = 37,
    UP_KEY = 38,
    RIGHT_KEY = 39,
    DOWN_KEY = 40,
    winWidth = 512,
    winHeight = 512;

var image = new Image(256, 256),
    colors = [],
    startx = 0,
    starty = 0,
    sourceWidth = 256,
    sourceHeight = 256,
    ball = document.getElementById('ball'),
    wrapper = document.getElementById('wrapper'),
    normals = [],
    loop = null,
    ballDirection = [0, 0, 0],
    ballVector = [0, 0, 0],
    ballY = 256,
    ballX = 256,
    ballZ = 0,
    ballSpeed = 5,
    tx = 0,
    ty = 0;

image.onload = function () {
  processNormalsImage().then(function () {
    loop = requestAnimationFrame(tick);
  });
};
image.src = 'spherelight.png';

// convert normalmap into normals data
function processNormalsImage() {
  return new Promise(function (resolve, reject) {
    var data = function getImageData() {
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = sourceWidth;
      tempCanvas.height = sourceHeight;
      var tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(image, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
      return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
    }();
    for (var i = 0; i < data.length; i += 4) {
      // Normalize and convert to -1 - 1 space
      var color = [data[i], data[i + 1], data[i + 2]];
      colors.push(color);
      var normal = $([data[i], 255 - data[i + 1], 255 - data[i + 2]]).divideBy(256).times(2).plus(-1).unit().$;
      normals.push(normal);
    }
    resolve();
  });
}

function tick(dt) {
  loop = requestAnimationFrame(tick);
  if (0 < ballX && ballX < 512 && 0 < ballY && ballY < 512) {
    tx = parseInt(ballX / winWidth * 256);
    ty = parseInt(ballY / winHeight * 256);
    var tNorm = normals[parseInt(256 * ty + tx)];
    var penetrationVector = $(tNorm).times($(tNorm).dot(ballDirection).$).$;
    var ballVector = $(ballDirection).minusVector(penetrationVector).unit().times(ballSpeed).$;
  } else ballVector = $(ballDirection).times(ballSpeed).$;

  var newBall = [ballX + ballVector[0], ballY + ballVector[1], ballZ + ballVector[2] / 256];;

  // if new position is still onscreen
  if (newBall[0] > -wrapper.offsetLeft && newBall[0] < wrapper.offsetLeft + wrapper.clientWidth && newBall[1] > -wrapper.offsetTop && newBall[1] < wrapper.offsetTop + wrapper.clientHeight) {
    ballX = newBall[0];
    ballY = newBall[1];
    ballZ = newBall[2];
  }

  var ballSize = 100 + ballZ * 100;
  // }


  ball.style.top = (ballY - ballSize / 2).toString() + 'px';
  ball.style.left = (ballX - ballSize / 2).toString() + 'px';
  ball.style.fontSize = (24 + ballSize * 1.5).toString() + 'px';
}

window.onload = function () {
  window.addEventListener("keydown", function (e) {
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode) {
      case LEFT_KEY:
        ballDirection[0] = -1;
        break;
      case RIGHT_KEY:
        ballDirection[0] = 1;
        break;
      case UP_KEY:
        ballDirection[1] = -1;
        break;
      case DOWN_KEY:
        ballDirection[1] = 1;
        break;
    }
    ballDirection = $(ballDirection).unit().$;
  });

  window.addEventListener("keyup", function (e) {
    if (e.keycode < 37 || e.keycode > 40) return;
    e.preventDefault();
    switch (e.keyCode) {
      case LEFT_KEY:
        ballDirection[0] = 0;
        break;
      case UP_KEY:
        ballDirection[1] = 0;
        break;
      case RIGHT_KEY:
        ballDirection[0] = 0;
        break;
      case DOWN_KEY:
        ballDirection[1] = 0;
        break;
    }
    ballDirection = $(ballDirection).unit().$;
  });

  var startVec = [0, 0];

  window.addEventListener('touchstart', function (e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    startVec = [touch.clientX, touch.clientY];
  });

  window.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var newVec = [touch.clientX, touch.clientY];
    var direction = $(newVec).minusVector(startVec).unit().$;
    ballDirection[0] = direction[0];
    ballDirection[1] = direction[1];
    // startVec = newVec;
  });

  window.addEventListener('touchend', function (e) {
    e.preventDefault();
    ballDirection[0] = 0;
    ballDirection[1] = 0;
    startVec = [0, 0, 0];
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function clamp(x, min, max) {
  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }
  return x;
}

function threshold(x, threshold, min, max) {
  if (x < threshold) return min;
  return max;
}

module.exports = { clamp: clamp, threshold: threshold };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const files = require('Lib/files');
var WebGLDataObj = __webpack_require__(4);

module.exports = {
  WebGLDataObj: __webpack_require__(4),
  ViewMatrix: __webpack_require__(12)
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function orthographicMatrix(width, height, depth) {
  return [2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1];
};

function projectionMatrix(_ref) {
  var fov = _ref.fov,
      aspect = _ref.aspect,
      near = _ref.near,
      far = _ref.far,
      isInRadians = _ref.isInRadians;

  if (!isInRadians) fov *= Math.PI / 180;
  var f = 1.0 / Math.tan(fov / 2);
  var rangeInverse = 1.0 / (near - far);
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInverse, -1, 0, 0, near * far * rangeInverse * 2, 0];
};

module.exports = { orthographicMatrix: orthographicMatrix, projectionMatrix: projectionMatrix };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = function () {
  return {
    $: __webpack_require__(1),
    Engine: __webpack_require__(2),
    // Entity: require('entities'),
    EventEmitter: __webpack_require__(9),
    Lib: __webpack_require__(6),
    ObjectPool: __webpack_require__(3),
    Position: __webpack_require__(5),
    Shell: __webpack_require__(7),
    Stack: __webpack_require__(0),
    Spheretest: __webpack_require__(8)
    // WebGLDataObject: require('lib/webgl/index')
  };
}();

module.exports = App;

Object.assign(window, module.exports);

/***/ })
/******/ ]);