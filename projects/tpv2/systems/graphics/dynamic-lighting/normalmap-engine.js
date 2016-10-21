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
  // TODO: instead of a variable, make falloff calculation be a whole callback function, so a light can have a non-linear falloff if we want
}

function LightingComponent(args){
  this.owner = args.owner;
  this.engine = args.engine;
  this.engine.registerComponent(this);
  var geometry = Geometry.getGeometryFromImg(args.lightingMap);
  this.normals = geometry[0];
  this.depth = geometry[1];
}

LightingComponent.prototype.update = function(){
  for (var i = 0; i < this.engine.lights; i++){
    var offset = new Vec3D({
      x: this.owner.x,
      y: this.owner.y,
      z: this.owner.zIndex
    });

    var offsetLight = Vec3D.subtract(this.engine.lights[i].position, offset);

    if (offsetLight.length() >= this.engine.lights[i].falloff) return;

    PointLight.lightCanvas({
      canvas: this.owner.sprite,
      ctx: this.owner.sprite.getContext('2d'),
      normals: this.normals,
      depth: this.depth,
      lightPosition: this.engine.lights[i].position,
      lightColor: this.engine.lights[i].color
    });
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


// applies lighting to a pixel and returns the new color
PointLight.lightPixel = function(args){
  var baseColor = args.baseColor;
  var lightDirection = args.lightDirection;
  var normal = args.normal;
  var lightColor = args.lightColor;
  var falloff = args.falloff;
  var choke = args.choke || 1
  var cel = args. cel

  var fade = lightDirection.length() / falloff;
  if (fade == 0){
    return baseColor;
  }
  var dot = Vec3D.dot(lightDirection.unit(), normal);
  var intensity = Math.pow(dot, (choke || 1));
  if (cel){
    intensity = threshold(intensity, .6, 0, .85);
  }
  intensity = clamp(intensity/fade, 0, .85);
  var color = Vec3D.interpolate(baseColor, lightColor, intensity);
  return color;
}

PointLight.lightCanvas = function(args){
  var canvas = args.canvas;
  var ctx = args.ctx;
  var normals = args. normals;
  var depth = args.depth;
  var lightPosition = args.lightPosition;
  var lightColor = args.lightColor;

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

      var litPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: true,
        choke: 5,
        falloff: 300,
        lightColor: lightColor,
        lightDirection: lightDirection,
        normal: normal,
      });

      textureData[ti] = litPixel.x;
      textureData[ti+1] = litPixel.y;
      textureData[ti+2] = litPixel.z;

      ni ++;
      ti += 4;
    }
  }

  ctx.putImageData(texture, 0, 0);

}
