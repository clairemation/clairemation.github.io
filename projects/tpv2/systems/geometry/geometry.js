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

  for (var i = 0; i < normals.length; i+=4){
    unit = ArrayVec3D.unitVector([normals[i], normals[i+1], normals[i+2]]);
    normals[i] = unit[0];
    normals[i+1] = unit[1];
    normals[i+2] = unit[2];
  }

  return normals;
}