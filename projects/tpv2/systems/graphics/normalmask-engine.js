var light = {
  color: [255, 190, 150],
  falloff: 400
}

var lightOverlay = document.createElement('canvas');
lightOverlay.width = 400;
lightOverlay.height = 400;

var lctx = lightOverlay.getContext('2d');

function dynamicLighting(subject){

  imgData = normalmap.getImageData(0, 0, 400, 400);

  var lightx = 10;
  var lighty = 400;
  var lightz = 500;

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

      lx = lightx - subject.x;
      ly = lighty;
      lz = lightz - subject.y;

      nx = 255 - imgData.data[i];
      ny = 255 - imgData.data[i+1];
      nz = 255 - imgData.data[i+2];


      // took out normalization of both vectors - doesn't seem to make a difference and has a BIG performance hit

      dot = nx * lx + ny * ly + nz * lz;
      intensity = Math.floor(dot / 50); // divisor is amount of blur
      if (intensity > 220){ // max opacity
        intensity = 220;
      }

      imgData.data[i] = light.color[0];
      imgData.data[i + 1] = light.color[1];
      imgData.data[i + 2] = light.color[2];
      imgData.data[i + 3] = intensity;

      i += 4;

      // debugger;
    }
  }

  lctx.putImageData(imgData, 0, 0);

  subject.spriteHandler.paintIn(lightOverlay);

}