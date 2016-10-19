function LightingEngine(args){
  if (args){
    this.lights = args.lights || [];
    this.entities = args.entities || [];
  }
}

LightingEngine.prototype.registerComponent = function(component){
  this.entities.push(component);
}

function PointLight(args){
  this.position = args.position; //Vec3D
  this.color = args.color; //Vec3D
  this.falloff = args.falloff; //in pixels
  // TODO: instead of this variable, make falloff calculation be a whole callback function, so a light can have a non-linear falloff if we want
}

function LightingComponent(args){
  this.owner = args.owner;
  this.engine = args.engine;
  this.engine.registerComponent(this);
  var lightingMap = args.lightingMap;
  var geometry = this.engine.getGeometryFromImg(lightingMap);
  this.normals = geometry[0];
  this.depth = geometry[1];
}

LightingComponent.prototype.update = function(){
  for (var i = 0; i < this.engine.lights; i++){

    // DO NEXT: convert light's position from global space to 'sprite space' aka tangent space

    LightingEngine.lightCanvas(this.owner.sprite, this.owner.sprite.getContext('2d'), this.normals, this.depth, this.engine.lights[i].position, this.engine.lights[i].color);
  }
}

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
LightingEngine.lightPixel = function(baseColor, lightDirection, normal, lightColor, falloff, choke, cel){
  var fade = lightDirection.length() / falloff;
  if (fade != 0){
    var dot = Vec3D.dot(lightDirection.unit(), normal);
    var intensity = Math.pow(dot, (choke || 1));
    if (cel){
      intensity = threshold(intensity, .6, 0, .85);
    }
    intensity = clamp(intensity/fade, 0, .85);
    var color = Vec3D.interpolate(baseColor, lightColor, intensity);
    return color;
  }
  return baseColor;
}

LightingEngine.lightCanvas = function(canvas, ctx, normals, depth, lightPosition, lightColor){

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

      var litPixel = this.lightPixel(texturePixel, lightDirection, normal, lightColor, 400, 5, true);

      textureData[ti] = litPixel.x;
      textureData[ti+1] = litPixel.y;
      textureData[ti+2] = litPixel.z;

      ni ++;
      ti += 4;
    }
  }

  ctx.putImageData(texture, 0, 0);

}
