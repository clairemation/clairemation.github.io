function dynamicLighting(args){
  var ctx = args.ctx;
  var normalsData = args.normalsData;
  var lx = args.lightx;
  var ly = args.lighty;
  var lz = args.lightz;


  // normalize
  var length = length = Math.sqrt(lx * lx + ly * ly + lz * lz);
  lx = lx / length;
  ly = ly / length;
  lz = lz / length;

  var nx = 0;
  var ny = 0;
  var nz = 0;

  var dot = 0;
  var intensity = 0;

  //caulculate

  var i = 0;

  for (var x = 0; x < 400; x++){
    for (var y = 0; y < 400; y++){

      nx = normalsData.data[i];
      ny = 255 - normalsData.data[i+1];
      nz = normalsData.data[i+2];

      // normalize
      length = Math.sqrt(nx * nx + ny * ny + nz* nz);
      nx = nx / length;
      ny = ny / length;
      nz = nz / length;

      dot = nx * lx + ny * ly + nz * lz;
      intensity = Math.floor(dot * 300); // divisor is amount of blur
      if (intensity > 250){ // max opacity
        intensity = 250;
      }
      if (intensity < 200){
        intensity = 0;
      }

      lightBuffer.data[i] = 255;
      lightBuffer.data[i + 1] = 255;
      lightBuffer.data[i + 2] = 255;
      lightBuffer.data[i + 3] = intensity;

      i += 4;

    }
  }

  ctx.putImageData(lightBuffer, 0, 0);

  // subject.spriteHandler.paintIn(lightOverlay);

}