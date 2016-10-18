function getImageData(img){
  var tempCanvas = document.createElement('canvas');
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  var tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0);
  return tempCtx.getImageData(0, 0, img.width, img.height).data;
}

function getGeometryFromImg(img){
  var normalsData = getImageData(img);
  var normals = [];
  var depthData = [];
  for (var i = 0; i < normalsData.length; i += 4){
    var normal = new Vec3D({
      x: normalsData[i],
      y: normalsData[i+1],
      z: normalsData[i+2]
    });
    normals.push(normal.unit());
    depthData.push(normalsData[i+4] / 4);
  }
  return [normals, depthData];
}

// applies lighting to a pixel and returns the new color
function lightPixel(baseColor, lightDirection, normal, lightColor, chokeAmt, cel){
  var choke = chokeAmt || 1;
  var dot = Vec3D.dot(lightDirection.unit(), normal);
  var intensity = Math.pow(dot, choke);
  if (cel){
    intensity = threshold(intensity, .6, 0, .9);
  }
  var color = Vec3D.interpolate(baseColor, lightColor, intensity);
  return color;
}

function lightCanvas(canvas, ctx, normals, depth, lightPosition, lightColor){

  var texture = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var textureData = texture.data;

  var texturePixel = new Vec3D()
  var pixelPosition = new Vec3D();

  var ni = 0;
  var ti = 0;

  for (var x = 0; x < canvas.height; x++){
    for (var y = 0; y < canvas.width; y++){

      pixelPosition.assign(x, y, depth[ni]);

      var lightDirection = Vec3D.subtract(lightPosition, pixelPosition);

      var normal = normals[ni];

      texturePixel.assign(textureData[ti],textureData[ti+1], textureData[ti+2]);

      var litPixel = lightPixel(texturePixel, lightDirection, normal, lightColor, 5, true);

      textureData[ti] = litPixel.x;
      textureData[ti+1] = litPixel.y;
      textureData[ti+2] = litPixel.z;

      ni ++;
      ti += 4;
    }
  }

  ctx.putImageData(texture, 0, 0);

}
