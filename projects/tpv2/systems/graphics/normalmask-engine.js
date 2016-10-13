var light = {
  color: [255, 200, 100],
  falloff: 400
}

function dynamicLighting(subject){

  var map = images.normalmap;
  var imgData = normalmap.getImageData(0, 0, 400, 400);

  var lightx = 100;
  var lighty = 400;
  var lightz = 10;

  var i = 0;

  var length = 0;

  var nx = 0;
  var ny = 0;
  var nz = 0;

  var lx = 0;
  var ly = 0;
  var lz = 10;

  var dot = 0;
  var intensity = 0;

  //caulculate
  for (var x = 0; x < 400; x++){
    for (var y = 0; y < 400; y++){

      lx = 255 - subject.x + lightx;
      ly = 255 - lighty;
      lz = lightz;

      nx = imgData.data[i];
      ny = imgData.data[i+1];
      nz = imgData.data[i+2];

      // var length = Math.sqrt(nx * nx + ny * ny + nz * nz);

      // nx /= length;
      // ny /= length;
      // nz /= length;

      // length = Math.sqrt(lx * lx + ly * ly + lz * lz);

      // lx /= length;
      // ly /= length;
      // lz /= length;

      // normal.divideInPlace(normal.length());
      // lightDirection.divideInPlace(lightDirection.length());

      dot = nx * lx + ny * ly + nz * lz;
      intensity = Math.floor(dot / 20);
      if (intensity > 215){
        intensity = 215;
      }

      imgData.data[i] = light.color[0];
      imgData.data[i + 1] = light.color[1];
      imgData.data[i + 2] = light.color[2];
      imgData.data[i + 3] = intensity;

      i += 4;

      // debugger;
    }
  }

  var lightOverlay = document.createElement('canvas');
  lightOverlay.width = 400;
  lightOverlay.height = 400;
  lightOverlay.getContext('2d').putImageData(imgData, 0, 0);

  subject.spriteHandler.paintIn(lightOverlay);

}