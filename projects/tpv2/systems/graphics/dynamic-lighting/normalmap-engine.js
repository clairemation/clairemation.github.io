function getImageData(img){
  var tempCanvas = document.createElement('canvas');
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  var tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0);;
  return tempCtx.getImageData(0, 0, img.width, img.height).data;
}

function getNormalsFromImg(img){
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
    depthData.push(400 / normalsData[i+4]);
  }
  return [normals, depthData];
}

// applies lighting to a pixel and returns the new color
function lightPixel(baseColor, lightDirection, normal, lightColor){
  var dot = Vec3D.dot(lightDirection.unit(), normal);
  var intensity = dot;
  var color = Vec3D.interpolate(baseColor, lightColor, threshold(intensity, .6, 0, .85));
  return color;
}

function normalMap(canvas, ctx, normals, depth, lightPosition, lightColor){

  var texture = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var textureData = texture.data;

  var lightDirection = new Vec3D({
    x: lightPosition.x - x,
    y: lightPosition.y - y,
    z: lightPosition.z
  });

  var normal = new Vec3D({
    x: 0,
    y: 0,
    z: 0
  });

  var ni = 0;
  var ti = 0;

  for (var x = 0; x < canvas.height; x++){
    for (var y = 0; y < canvas.width; y++){

      // calc light direction
      lightDirection.x = lightPosition.x - x;
      lightDirection.y = lightPosition.y - y;
      lightDirection.z = lightPosition.z - depth[ni];

      // get normal
      var normal = normals[ni];

      // get texture pixel
      var texturePixel = new Vec3D({
        x: textureData[ti],
        y: textureData[ti+1],
        z: textureData[ti+2]
      });

      var litPixel = lightPixel(texturePixel, lightDirection, normal, lightColor);

      textureData[ti] = litPixel.x;
      textureData[ti+1] = litPixel.y;
      textureData[ti+2] = litPixel.z;

      ni ++;
      ti += 4;
    }
  }

  ctx.putImageData(texture, 0, 0);

}
