var drawSnow = (function(){

        var vertScriptUrl = "snow/particles.vert",
          fragScriptUrl = "snow/particles.frag",
          blurVertScriptUrl = "snow/blur.vert",
          blurFragScriptUrl = "snow/blur.frag",
          flameDir = "flame",
          canvas = document.getElementById("canvas"),
          renderSnowProgram = null,
          blurProgram = null,
          snowParticleInfoBuf = null,
          snowColorsBuf = null,
          blurVertsBuf = null,
          blurTexCoordsBuf = null,
          viewportWidthBuf = null,
          viewportHeightBuf = null,
          gl = null,
          fbo = null,
          rawParticlesTexture = null,
          delta = 0.0,
          loopID = null,
          numParticles = 1000,
          particles = [],
          colors = [],
          tmp = 0.0,
          gaussianBlurKernel = [
            1, 4, 7,4, 1,
            4,16, 26,16,4,
            7, 26, 41, 26, 7,
            4, 16,26,16,4,
            1,4,7,4,1
          ];

        // individual variations
        for (var i=0; i < (numParticles)*4; i+=4){
          particles[i] = Math.random(); // X noise
          particles[i+1] = Math.random(); // Y noise
          particles[i+2] = Math.random(); // angle noise
          particles[i+3] = Math.random(); // delta noise

          tmp = Math.random() * 0.4 + 0.45;
          colors[i] = tmp;
          colors[i+1] = tmp;
          colors[i+2] = tmp;
          colors[i+3] = 1.0;
        }

        new WebGLProgram(canvas, vertScriptUrl, fragScriptUrl).then(function(results){
          renderSnowProgram = results;
          gl = renderSnowProgram.gl;
          setup();
        });



        function setup(){

          // Set up snow program

          renderSnowProgram.use();

          snowParticleInfoBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, snowParticleInfoBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particles), gl.STATIC_DRAW);


          snowColorsBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, snowColorsBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
          var attLoc = renderSnowProgram.program.params.attributeLocations["aColors"];
          gl.enableVertexAttribArray(attLoc);
          gl.vertexAttribPointer(attLoc, 4, gl.FLOAT, false, 0, 0);
        }

        function setupAttribute(buffer, glProg, attributeName, stride){
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          var attLoc = glProg.program.params.attributeLocations[attributeName];
          gl.enableVertexAttribArray(attLoc);
          gl.vertexAttribPointer(attLoc, stride, gl.FLOAT, false, 0, 0);
        }

        function shutdownAttribute(prog, attributeName){
          var attLoc = prog.program.params.attributeLocations[attributeName];
          gl.disableVertexAttribArray(attLoc);
        }

        function draw(){
          renderSnowProgram.use();
          setupAttribute(snowParticleInfoBuf, renderSnowProgram, "aParticleInfo", 4);
          setupAttribute(snowColorsBuf, renderSnowProgram, "aColors", 4);
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
          drawSnow();

          loopID = requestAnimationFrame(draw);
        }

        function drawBlur(){
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        function drawSnow(){
          gl.clear(gl.COLOR_BUFFER_BIT);
          renderSnowProgram.setUniform("uDt", delta);
          gl.drawArrays(gl.POINTS, 0, numParticles);
          delta += 0.0025;
          if (delta >= 1.0) {delta = 0.0};
        }

        function start(){
          if (loopID){
            window.cancelAnimationFrame(loopID);
          }
          draw();
        }

        return start;
      })();