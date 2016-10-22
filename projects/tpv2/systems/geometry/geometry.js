function Geometry(){}

Geometry.getGeometryFromImg = function(img){

  function getImageData(img){
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, 0, 0, img.width, img.height);
    return tempCtx.getImageData(0, 0, img.width, img.height).data;
  }

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