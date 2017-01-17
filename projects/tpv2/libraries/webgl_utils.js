// -- OPENGL BOILERPLATE --

function WebGLProgram(canvas, vertShaderId, fragShaderId){
  this.canvas = canvas;
  this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  this.program = this.gl.createProgram();
  this.attributeLocations = {};
  this.uniformLocations = {};

  this.init.call(this, vertShaderId, fragShaderId);
  this.projectionMatrix = WebGLProgram.makeOrthoMatrix(canvas.clientWidth, canvas.clientHeight, 1000);
  // this.projectionMatrix = WebGLProgram.makeProjectionMatrix(45, canvas.width/canvas.height, 0.1, 100);
  this.mvMatrix = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
    ];
}

WebGLProgram.prototype.init = function(vertShaderId, fragShaderId){

  var gl = this.gl;

  var getShader = (function(script, type){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, script);
    gl.compileShader(shader);
    return shader;
  }).bind(this);

  var getAttributeNames = (function(){
    var re = /attribute.*\W(\w*);/g;
      var match = re.exec(script);
    while (!!match){
        attributeNames[match[1]] = match[1];
        match = re.exec(script);
      }
    }).bind(this);

  var getUniformNames = (function(){
    var re = /uniform.*\W(\w*);/g;
      var match = re.exec(script);
    while (!!match){
        uniformNames[match[1]] = match[1];
        match = re.exec(script);
      }
    }).bind(this);

  var attributeNames = [];
  var uniformNames = [];

  var script = document.getElementById(vertShaderId).text;
  gl.attachShader(this.program, getShader(script, gl.VERTEX_SHADER));
  getAttributeNames();
  getUniformNames();

  script = document.getElementById(fragShaderId).text;
  gl.attachShader(this.program, getShader(script, gl.FRAGMENT_SHADER));
  getAttributeNames();
  getUniformNames();

  gl.linkProgram(this.program);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0,0, canvas.width, canvas.height);

  for (attribute in attributeNames){
    var att = attributeNames[attribute];
    this.attributeLocations[att] = gl.getAttribLocation(this.program, att);
    gl.enableVertexAttribArray(this.attributeLocations[attribute]);
  }

  for (uniform in uniformNames){
    var uni = uniformNames[uniform];
    this.uniformLocations[uni] = gl.getUniformLocation(this.program, uni);
  }
}

WebGLProgram.prototype.use = function(){
  this.gl.useProgram(this.program);
}

WebGLProgram.prototype.bindDataToAttribute = function(attribute, data, increment){
  var buffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
  this.gl.vertexAttribPointer(this.attributeLocations[attribute], increment, this.gl.FLOAT, false, 0, 0);
}

WebGLProgram.makeProjectionMatrix = function(fov, aspect, near, far){
  fov *= Math.PI / 180;
  var f = 1.0 / Math.tan(fov / 2);
  var rangeInverse = 1.0 / (near-far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near+far) * rangeInverse, -1,
    0, 0, near*far * rangeInverse * 2, 0
  ]);
}

WebGLProgram.makeOrthoMatrix = function(width, height, depth){
  return new Float32Array([
    2/width, 0, 0, 0,
    0, -2/height, 0, 0,
    0, 0, 2/depth, 0,
    -1, 1, 0, 1
  ]);
}

WebGLProgram.prototype.setMat4Uniform = function(name, data){
  var location = this.uniformLocations[name];
  this.gl.uniformMatrix4fv(location, false, data);
}

WebGLProgram.prototype.setIntUniform = function(name, data){
  var location = this.uniformLocations[name];
  this.gl.uniform1i(location, false, data);
}

WebGLProgram.prototype.setVec3Uniform = function(name, data){
  var location = this.uniformLocations[name];
  this.gl.uniform3f(location, data[0], data[1], data[2]);
}


//   // -- SET UP THE ATTRIBUTES --

//   // -- Fetch and save the locations of the shader's attributes for future use --
//   // ex: aVertexCoords = gl.getAttribLocation(shader, "aVertexCoords");

//   // -- Enable the shader's attributes --
//   // ex: gl.enableVertexAttribArray(aVertexCoords);

//   // -- Convert array of vertex values into a GL array buffer --
//   gl.bindBuffer(gl.ARRAY_BUFFER, bufVertexCoords);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//     // Single quad
//     -1.0, -1.0,  1.0,
//      1.0, -1.0,  1.0,
//      1.0,  1.0,  1.0,
//     -1.0,  1.0,  1.0,
//   ]), gl.STATIC_DRAW);

//   // -- Point the array buffer at the shader's vertices attribute --
//   // -- and tell it that it will be grabbing values 3 at a time --
//   gl.bindBuffer(gl.ARRAY_BUFFER, bufVertexCoords);
//   gl.vertexAttribPointer(aVertexCoords, 3, gl.FLOAT, false, 0, 0);

// // -- END BOILERPLATE --

// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


// function draw(){

//   // Convert "mouse-space" rotation to modelspace rotation
//   var rotMat = mvMatrix.timesMat4(Mat4.Rotation(-rotationX, rotationY, rotationZ));

//   // Neutralize translation in the rotation matrix
//   rotMat.elements[12] = 0.0;
//   rotMat.elements[13] = 0.0;
//   rotMat.elements[14] = 0.0;

//   // Reset model matrix
//   mvMatrix.makeIdentity();

//   // Apply transformations to model matrix
//   mvMatrix = mvMatrix.timesMat4(rotMat);
//   mvMatrix = mvMatrix.timesMat4(Mat4.Translation(translateX, translateY, translateZ));
//   gl.uniformMatrix4fv(uMVMatrix, false, mvMatrix.toArray());

//   // Draw
//   gl.clear(gl.COLOR_BUFFER_BIT);
//   gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

//   // Lower rotation value due to inertia
//   rotationX /= 1.01;
//   rotationY /= 1.01;
//   rotationZ /= 1.01;

//   function clampToZero(x){
//     if (x < 0.001 && x > -0.001) {
//       return 0;
//     }
//     return x;
//   }

//   rotationX = clampToZero(rotationX);
//   rotationY = clampToZero(rotationY);
//   rotationZ = clampToZero(rotationZ);

//   // Loop
//   requestAnimationFrame(draw);
// }

// canvas.onmousemove = function(e){
//   if (e.buttons == 0){return;}
//   if (lastMouseX){
//     rotationY += -(e.clientX - lastMouseX) / 3000;
//   }
//   if (lastMouseY){
//     rotationX += (e.clientY - lastMouseY) / 3000;
//   }
//   lastMouseX = e.clientX;
//   lastMouseY = e.clientY;
// }

// canvas.addEventListener("touchmove", function(e){
//   if (lastMouseX){
//     rotationY += -(e.touches[0].clientX - lastMouseX) / 3000;
//   }
//   if (lastMouseY){
//     rotationX += (e.touches[0].clientY - lastMouseY) / 3000;
//   }
//   lastMouseX = e.touches[0].clientX;
//   lastMouseY = e.touches[0].clientY;
// }, false);

// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufIndices);
// requestAnimationFrame(draw);