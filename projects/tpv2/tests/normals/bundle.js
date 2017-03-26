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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $ = __webpack_require__(1),
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
	  ballDirection = [0,0,0],
	  ballVector = [0,0,0],
	  ballY = 256,
	  ballX = 256,
	  ballZ = 0,
	  ballSpeed = 5,
	  tx = 0,
	  ty = 0;

	image.onload = function(){
	  processNormalsImage().then(() => {
	    loop = requestAnimationFrame(tick);
	  })
	};
	image.src = 'spherelight.png';


	// convert normalmap into normals data
	function processNormalsImage(){
	  return new Promise((resolve, reject) => {
	    var data = function getImageData(){
	      var tempCanvas = document.createElement('canvas');
	      tempCanvas.width = sourceWidth;
	      tempCanvas.height = sourceHeight;
	      var tempCtx = tempCanvas.getContext('2d');
	      tempCtx.drawImage(image, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
	      return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
	    }();
	    for (var i = 0; i < data.length; i+=4){
	      // Normalize and convert to -1 - 1 space
	      let color = [data[i], data[i+1], data[i+2]];
	      colors.push(color);
	      let normal = $([data[i], 255-data[i+1], 255-data[i+2]]).divideBy(256).times(2).plus(-1).unit().$;
	      normals.push(normal);
	    }
	    resolve();
	  });
	}

	function tick(dt){
	  loop = requestAnimationFrame(tick);
	  if (0 < ballX && ballX < 512 && 0 < ballY && ballY < 512){
	    tx = parseInt((ballX / winWidth) * 256);
	    ty = parseInt((ballY / winHeight) * 256);
	    var tNorm = normals[parseInt(256 * ty + tx)];
	    var penetrationVector = $(tNorm).times($(tNorm).dot(ballDirection).$).$;
	    var ballVector = $(ballDirection).minusVector(penetrationVector).unit().times(ballSpeed).$;
	  } else ballVector = $(ballDirection).times(ballSpeed).$;

	  var newBall = [ballX + ballVector[0], ballY + ballVector[1], ballZ + ballVector[2] / 256];;

	  // if new position is still onscreen
	  if (newBall[0] > -wrapper.offsetLeft && newBall[0] < wrapper.offsetLeft + wrapper.clientWidth
	    && newBall[1] > -wrapper.offsetTop && newBall[1] < wrapper.offsetTop + wrapper.clientHeight) {
	    [ballX, ballY, ballZ] = newBall;
	  }

	    var ballSize = 100 + ballZ * 100;
	  // }


	  ball.style.top = (ballY - ballSize/2).toString() + 'px';
	  ball.style.left = (ballX - ballSize/2).toString() + 'px';
	  ball.style.fontSize = (24 + ballSize * 1.5).toString() + 'px';
	}

	window.onload = function(){
	  window.addEventListener("keydown", function(e){
	    if (e.keycode < 37 || e.keycode > 40) return;
	    e.preventDefault();
	    switch(e.keyCode){
	      case LEFT_KEY:
	        ballDirection[0] = -1
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

	  window.addEventListener("keyup", function(e){
	    if (e.keycode < 37 || e.keycode > 40) return;
	    e.preventDefault();
	    switch (e.keyCode){
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

	  var startVec = [0,0];

	  window.addEventListener('touchstart', function(e){
	    e.preventDefault();
	    var touch = e.changedTouches[0];
	    startVec = [touch.clientX, touch.clientY];
	  });

	  window.addEventListener('touchmove', (e) => {
	    e.preventDefault();
	    var touch = e.changedTouches[0];
	    var newVec = [touch.clientX, touch.clientY];
	    var direction = $(newVec).minusVector(startVec).unit().$;
	    ballDirection[0] = direction[0];
	    ballDirection[1] = direction[1];
	    // startVec = newVec;
	  });

	  window.addEventListener('touchend', (e) => {
	    e.preventDefault();
	    ballDirection[0] = 0;
	    ballDirection[1] = 0;
	    startVec = [0,0,0];
	  })
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const END_TAG = '$';

	const Stack = __webpack_require__(2),
	  {sin, cos} = Math,
	  vectorInstance = new Vector(),
	  values = new Stack();
	var size = 0;

	function Vector(){};

	var $ = function(v){
	  values.push(v);
	  size = v.length;
	  return vectorInstance;
	};

	Object.defineProperty(Vector.prototype, END_TAG, {
	  get: function(){
	    return values.pop();
	  }
	});

	// Functions

	Vector.prototype.plus = function(x){
	  if (Array.isArray(x)){
	    return this.plusVector(x);
	  } else {
	    return this.plusScalar(x);
	  }
	}

	Vector.prototype.plusScalar = function(s){
	  var v = values.pop();

	  // Selects appropriate version for vector/matrix size--no logic branching, no loops, lazily evaluated, for optimal(?) performance
	  var functionVersion = {
	    2: function(){
	      return [v[0]+s, v[1]+s];
	    },
	    3: function(){
	      return [v[0]+s, v[1]+s, v[2]+s];
	    },
	    4: function(){
	      return [v[0]+s, v[1]+s, v[2]+s, v[3]+s];
	    }
	  }
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.plusVector = function(v){
	  var u = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [u[0]+v[0], u[1]+v[1]];
	    },
	    3: function(){
	      return [u[0]+v[0], u[1]+v[1], u[2]+v[2]];
	    },
	    4: function(){
	      return [u[0]+v[0], u[1]+v[1], u[2]+v[2], u[3]+v[3]];
	    }
	  };
	  values.push(functionVersion[size]());
	  return this;
	};

	Vector.prototype.minusVector = function(v){
	  var u = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [u[0]-v[0], u[1]-v[1]];
	    },
	    3: function(){
	      return [u[0]-v[0], u[1]-v[1], u[2]-v[2]];
	    },
	    4: function(){
	      return [u[0]-v[0], u[1]-v[1], u[2]-v[2], u[3]-v[3]];
	    }
	  };
	  values.push(functionVersion[size]());
	  return this;
	};

	Vector.prototype.timesScalar = function(s){
	  var v = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [v[0]*s, v[1]*s];
	    },
	    3: function(){
	      return [v[0]*s, v[1]*s, v[2]*s];
	    },
	    4: function(){
	      return [v[0]*s, v[1]*s, v[2]*s, v[3]*s];
	    }
	  }
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.timesVector = function(v){
	  var u = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [u[0]*v[0], u[1]*v[1]];
	    },
	    3: function(){
	      return [u[0]*v[0], u[1]*v[1], u[2]*v[2]];
	    },
	    4: function(){
	      return [u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3]];
	    },
	    16: {
	      4: function(){
	        return [
	          u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3],
	          u[4]*v[0], u[5]*v[1], u[6]*v[2], u[7]*v[3],
	          u[8]*v[0], u[9]*v[1], u[10]*v[2],u[11]*v[3],
	          u[12]*v[0],u[13]*v[1],u[14]*v[2],u[15]*v[3]
	        ];
	      },
	      16: function(){
	        return [
	          u[0]*v[0] + u[1]*v[4] + u[2]*v[8] + u[3]*v[12],
	          u[0]*v[1] + u[1]*v[5] + u[2]*v[9] + u[3]*v[13],
	          u[0]*v[2] + u[1]*v[6] + u[2]*v[10] + u[3]*v[14],
	          u[0]*v[3] + u[1]*v[7] + u[2]*v[11] + u[3]*v[15],

	          u[4]*v[0] + u[5]*v[4] + u[6]*v[8] + u[7]*v[12],
	          u[4]*v[1] + u[5]*v[5] + u[6]*v[9] + u[7]*v[13],
	          u[4]*v[2] + u[5]*v[6] + u[6]*v[10] + u[7]*v[14],
	          u[4]*v[3] + u[5]*v[7] + u[6]*v[11] + u[7]*v[15],

	          u[8]*v[0] + u[9]*v[4] + u[10]*v[8] + u[11]*v[12],
	          u[8]*v[1] + u[9]*v[5] + u[10]*v[9] + u[11]*v[13],
	          u[8]*v[2] + u[9]*v[6] + u[10]*v[10] + u[11]*v[14],
	          u[8]*v[3] + u[9]*v[7] + u[10]*v[11] + u[11]*v[15],

	          u[12]*v[0] + u[13]*v[4] + u[14]*v[8] + u[15]*v[12],
	          u[12]*v[1] + u[13]*v[5] + u[14]*v[9] + u[15]*v[13],
	          u[12]*v[2] + u[13]*v[6] + u[14]*v[10] + u[15]*v[14],
	          u[12]*v[3] + u[13]*v[7] + u[14]*v[11] + u[15]*v[15]
	        ];
	      }
	    }[v.length]
	  };
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.times = function(...x){
	  if (x.length === 1){
	    return this.timesScalar(x)
	  } else {
	    return this.timesVector(...x);
	  }
	};

	Vector.prototype.divideByScalar = function(s){
	  var v = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [v[0]/s, v[1]/s];
	    },
	    3: function(){
	      return [v[0]/s, v[1]/s, v[2]/s];
	    },
	    4: function(){
	      return [v[0]/s, v[1]/s, v[2]/s, v[3]/s];
	    }
	  }
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.divideByVector = function(v){
	  var u = values.pop();
	  var functionVersion = {
	    2: function(){
	      return [u[0]/v[0], u[1]/v[1]];
	    },
	    3: function(){
	      return [u[0]/v[0], u[1]/v[1], u[2]/v[2]];
	    },
	    4: function(){
	      return [u[0]/v[0], u[1]/v[1], u[2]/v[2], u[3]/v[3]];
	    }
	  };
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.divideBy = function(x){
	  if (Array.isArray(x)){
	    return this.divideByVector(x);
	  } else {
	    return this.divideByScalar(x);
	  }
	};

	Vector.prototype.dot = function(v){
	  var u = values.pop();
	  var functionVersion = {
	    2: function(){
	      return u[0]*v[0] + u[1]*v[1];
	    },
	    3: function(){
	      return u[0]*v[0] + u[1]*v[1] + u[2]*v[2];
	    },
	    4: function(){
	      return u[0]*v[0] + u[1]*v[1] + u[2]*v[2] + u[3]*v[3];
	    }
	  };
	  values.push(functionVersion[size]());
	  return this;
	}

	Vector.prototype.mix = function(v, t = 0.5){
	  values.push(
	    this.timesScalar(1-t).plusVector($(v).timesScalar(t)[END_TAG])[END_TAG]
	  );
	  return this;
	}

	Vector.prototype.squaredLength = function() {
	  values.push(this.dot(values.peek())[END_TAG]);
	  return this;
	}

	Vector.prototype.length = function(){
	  values.push(Math.sqrt(this.squaredLength()[END_TAG]));
	  return this;
	}

	Vector.prototype.squaredDistance = function(v){
	  values.push(this.minusVector(v).squaredLength()[END_TAG]);
	  return this;
	}

	Vector.prototype.distance = function(v){
	  values.push(Math.sqrt(this.squaredDistance(v)[END_TAG]));
	  return this;
	}

	Vector.prototype.unit = function(){
	  var value = values.peek();
	  if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
	    values.pop();
	    values.push([0,0,0]);
	  } else {
	    values.push(
	      this.divideByScalar($(values.peek()).length()[END_TAG])[END_TAG]
	    );
	  }
	  return this;
	}

	Vector.prototype.turnLeft = function(){
	  var v = values.pop();
	  values.push([-v[1], v[0]]);
	  return this;
	}

	Vector.prototype.turnRight = function(){
	  var v = values.pop();
	  values.push([v[1], -v[0]]);
	  return this;
	}

	Vector.prototype.leftNormal = function(){
	  return this.turnLeft().unit();
	}

	Vector.prototype.rightNormal = function(){
	  return this.turnRight().unit();
	}

	Vector.prototype.rotate2d = function(angle){
	  var v = values.pop()
	  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
	  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
	  values.push(v);
	  return this;
	}

	Vector.prototype.angle2d = function(){
	  var v = values.pop();
	  values.push(Math.atan2(v[1], v[0]));
	  return this;
	}

	Vector.prototype.directionTo = function(v){
	  var u = values.pop();
	  values.push(v);
	  values.push(this.minusVector(u).unit()[END_TAG]);
	  return this;
	}

	Vector.prototype.projectedLength = function(v){
	  values.push(this.dot(v)[END_TAG]);
	  return this;
	}

	// Todo: Add versions for other size matrices
	Vector.prototype.transpose = function(){
	  var v = values.pop();
	  values.push([
	    v[0], v[4], v[8], v[12],
	    v[1], v[5], v[9], v[13],
	    v[2], v[6], v[10], v[14],
	    v[3], v[7], v[11], v[15]
	  ]);
	  return this;
	}

	Vector.prototype.scale = function(x,y,z){
	  values.push(this.times([
	    x, 0, 0, 0,
	    0, y, 0, 0,
	    0, 0, z, 0,
	    0, 0, 0, 1
	  ])[END_TAG]);
	  return this;
	};

	Vector.prototype.rotate = function(x,y,z){
	  if (size === 2){
	    values.push(this.rotate2d(x)[END_TAG]);
	    return this;
	  }
	  var xRotation = [
	      1, 0, 0, 0,
	      0,cos(x), -sin(x), 0,
	      0, sin(x), cos(x), 0,
	      0, 0, 0, 1
	    ],
	      yRotation = [
	      cos(y), 0, sin(y), 0,
	      0, 1, 0, 0,
	      -sin(y), 0, cos(y), 0,
	      0, 0, 0, 1
	    ],
	    zRotation = [
	      cos(z), -sin(z), 0, 0,
	      sin(z), cos(z), 0, 0,
	      0, 0, 1, 0,
	      0, 0, 0, 1
	    ];

	  values.push(this.times(xRotation).times(yRotation).times(zRotation)[END_TAG]);
	  return this;
	}

	Vector.prototype.inverse = function(){
	  var r = Vector.IDENTITY_MATRIX,
	    m = values.pop();

	  r[0] = m[5]*m[10]*m[15] - m[5]*m[14]*m[11] - m[6]*m[9]*m[15] + m[6]*m[13]*m[11] + m[7]*m[9]*m[14] - m[7]*m[13]*m[10];
	  r[1] = -m[1]*m[10]*m[15] + m[1]*m[14]*m[11] + m[2]*m[9]*m[15] - m[2]*m[13]*m[11] - m[3]*m[9]*m[14] + m[3]*m[13]*m[10];
	  r[2] = m[1]*m[6]*m[15] - m[1]*m[14]*m[7] - m[2]*m[5]*m[15] + m[2]*m[13]*m[7] + m[3]*m[5]*m[14] - m[3]*m[13]*m[6];
	  r[3] = -m[1]*m[6]*m[11] + m[1]*m[10]*m[7] + m[2]*m[5]*m[11] - m[2]*m[9]*m[7] - m[3]*m[5]*m[10] + m[3]*m[9]*m[6];

	  r[4] = -m[4]*m[10]*m[15] + m[4]*m[14]*m[11] + m[6]*m[8]*m[15] - m[6]*m[12]*m[11] - m[7]*m[8]*m[14] + m[7]*m[12]*m[10];
	  r[5] = m[0]*m[10]*m[15] - m[0]*m[14]*m[11] - m[2]*m[8]*m[15] + m[2]*m[12]*m[11] + m[3]*m[8]*m[14] - m[3]*m[12]*m[10];
	  r[6] = -m[0]*m[6]*m[15] + m[0]*m[14]*m[7] + m[2]*m[4]*m[15] - m[2]*m[12]*m[7] - m[3]*m[4]*m[14] + m[3]*m[12]*m[6];
	  r[7] = m[0]*m[6]*m[11] - m[0]*m[10]*m[7] - m[2]*m[4]*m[11] + m[2]*m[8]*m[7] + m[3]*m[4]*m[10] - m[3]*m[8]*m[6];

	  r[8] = m[4]*m[9]*m[15] - m[4]*m[13]*m[11] - m[5]*m[8]*m[15] + m[5]*m[12]*m[11] + m[7]*m[8]*m[13] - m[7]*m[12]*m[9];
	  r[9] = -m[0]*m[9]*m[15] + m[0]*m[13]*m[11] + m[1]*m[8]*m[15] - m[1]*m[12]*m[11] - m[3]*m[8]*m[13] + m[3]*m[12]*m[9];
	  r[10] = m[0]*m[5]*m[15] - m[0]*m[13]*m[7] - m[1]*m[4]*m[15] + m[1]*m[12]*m[7] + m[3]*m[4]*m[13] - m[3]*m[12]*m[5];
	  r[11] = -m[0]*m[5]*m[11] + m[0]*m[9]*m[7] + m[1]*m[4]*m[11] - m[1]*m[8]*m[7] - m[3]*m[4]*m[9] + m[3]*m[8]*m[5];

	  r[12] = -m[4]*m[9]*m[14] + m[4]*m[13]*m[10] + m[5]*m[8]*m[14] - m[5]*m[12]*m[10] - m[6]*m[8]*m[13] + m[6]*m[12]*m[9];
	  r[13] = m[0]*m[9]*m[14] - m[0]*m[13]*m[10] - m[1]*m[8]*m[14] + m[1]*m[12]*m[10] + m[2]*m[8]*m[13] - m[2]*m[12]*m[9];
	  r[14] = -m[0]*m[5]*m[14] + m[0]*m[13]*m[6] + m[1]*m[4]*m[14] - m[1]*m[12]*m[6] - m[2]*m[4]*m[13] + m[2]*m[12]*m[5];
	  r[15] = m[0]*m[5]*m[10] - m[0]*m[9]*m[6] - m[1]*m[4]*m[10] + m[1]*m[8]*m[6] + m[2]*m[4]*m[9] - m[2]*m[8]*m[5];

	  // In case of divide by zero error, if det is 0 just leave unchanged
	  var det = (m[0]*r[0] + m[1]*r[4] + m[2]*r[8] + m[3]*r[12]) || 1;
	  for (var i = 0; i < 16; i++) r[i] /= det;
	  values.push(r);
	  return this;
	}

	module.exports = $;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function SimpleStack(){
	  this.top = null;
	}

	SimpleStack.prototype.push = function(value){
	  this.top = {value, below: this.top};
	}

	SimpleStack.prototype.pop = function(){
	  var node = this.top;
	  this.top = this.top.below;
	  return node.value;
	}

	SimpleStack.prototype.peek = function(){
	  return this.top.value;
	}

	SimpleStack.prototype.fill = function(a){
	  for (let i = 0; i < a.length; i++){
	    this.push(a[i]);
	  }
	}

	SimpleStack.prototype.fillWithValues = function(va){
	  for (let i = 0; i < a.length; i++){
	    this.pushValue(va[i]);
	  }
	}

	SimpleStack.prototype.toArr = function(){
	  var arr = [];
	  var currentNode = this.top;
	  while (currentNode != null){
	    arr.push(currentNode);
	    currentNode = currentNode.below;
	  }
	  return arr;
	}

	module.exports = SimpleStack;

/***/ }
/******/ ]);