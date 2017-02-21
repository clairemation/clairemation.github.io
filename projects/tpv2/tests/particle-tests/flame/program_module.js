var drawFlame = (function(){

        var vertScriptUrl = "flame/particles.vert",
          fragScriptUrl = "flame/particles.frag",
          blurVertScriptUrl = "flame/blur.vert",
          blurFragScriptUrl = "flame/blur.frag",
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
            return Promise.resolve()
          }).then(function(){
            new WebGLProgram(canvas, blurVertScriptUrl, blurFragScriptUrl).then(function(results){
              blurProgram = results;
              setup();
            });
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


          fbo = gl.createFramebuffer();
          rawParticlesTexture = gl.createTexture();
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
          gl.bindTexture(gl.TEXTURE_2D, rawParticlesTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rawParticlesTexture, 0);
          gl.viewport(0,0,512,512);
          gl.clearColor(0.0, 0.0, 0.0, 0.0);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);

          blurProgram.use();

          blurVertsBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, blurVertsBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0,  0.0,
             1.0, -1.0,  0.0,
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0]), gl.STATIC_DRAW);

          blurTexCoordsBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, blurTexCoordsBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0,  1.0,
            1.0,  1.0,
            1.0,  0.0,
            0.0,  0.0]), gl.STATIC_DRAW);
          blurProgram.setUniform("uSampler", 0);
          blurProgram.setUniform("uViewportWidth", 512.0);
          blurProgram.setUniform("uViewportHeight", 512.0);

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

          blurProgram.use();
          setupAttribute(blurVertsBuf, blurProgram, "aVertexCoords", 3);
          setupAttribute(blurTexCoordsBuf, blurProgram, "aTextureCoords", 2);

          var u = gl.getUniformLocation(blurProgram.program.program, "uKernel");
          gl.uniform1fv(u, [
            0.003765,  0.015019,  0.023792,  0.015019,  0.003765,
            0.015019,  0.059912,  0.094907,  0.059912,  0.015019,
            0.023792,  0.094907,  0.150342,  0.094907,  0.023792,
            0.015019,  0.059912,  0.094907,  0.059912,  0.015019,
            0.003765,  0.015019,  0.023792,  0.015019,  0.003765
            ]);
          gl.bindTexture(gl.TEXTURE_2D, rawParticlesTexture);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          drawBlur();

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