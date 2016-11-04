function Geometry(){}

Geometry.getGeometryFromImg = function(img, startx, starty, sourceWidth, sourceHeight){

  function getImageData(){
    // startx = startx || 0;
    // starty = starty || 0;
    // sourceWidth = sourceWidth || img.width;
    // sourceHeight = sourceHeight || img.height
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = sourceWidth;
    tempCanvas.height = sourceHeight;
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, startx, starty, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
    return tempCtx.getImageData(0, 0, sourceWidth, sourceHeight).data;
  }

  var normals = getImageData();

  var unit = [0,0,0];
  var length = 0;

  for (var i = 0; i < normals.length; i+=4){
    var processedNormal = ArrayVec3D.convertCoords([normals[i], normals[i+1], normals[1+2]]);
    normals[i] = processedNormal[0];
    normals[i+1] = processedNormal[1];
    normals[i+2] = processedNormal[2];
  }

  return normals;
}