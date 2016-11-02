function Geometry(){}

Geometry.getGeometryFromImg = function(img){

  function getImageData(img, startx, starty, sourceWidth, sourceHeight){
    startx = startx || 0;
    starty = starty || 0;
    sourceWidth = sourceWidth || img.width;
    sourceHeight = sourceHeight || img.height
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = sourceWidth;
    tempCanvas.height = sourceHeight;
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
    return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
  }

  var normalsData = getImageData(img);
  var normals = [];
  var normal = [0,0,0];
  var depthData = [];
  for (var i = 0; i < normalsData.length; i += 4){
    (function(){
      normal[0] = normalsData[i];
      normal[1] = normalsData[i+1];
      normal[2] = normalsData[i+2];
      normals.push(ArrayVec3D.unitVector(normal));
      depthData.push(normalsData[i+4] / 4);
    })();
  }
  return [normals, depthData];
}