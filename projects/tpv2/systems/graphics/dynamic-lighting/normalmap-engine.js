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
  this.canvas = args.canvas;
  this.ctx = this.canvas.getContext('2d');
  this.engine = args.engine;
  this.engine.registerComponent(this);
  var geometry = Geometry.getGeometryFromImg(args.lightingMap);
  this.normals = geometry[0];
  this.depth = geometry[1];
}

LightingComponent.prototype.update = function(){
  // for (var i = 0; i < this.engine.lights.length; i++){
    // var offset = new Vec3D({
    //   x: this.owner.x,
    //   y: this.owner.y,
    //   z: this.owner.z
    // });

    // var offsetLight = Vec3D.subtract(this.engine.lights[i].position, offset);

    // if (offsetLight.length() >= this.engine.lights[i].falloff) return;

    PointLight.lightCanvas({
      canvas: this.canvas,
      ctx: this.ctx,
      normals: this.normals,
      depth: this.depth,
      lightPosition: this.engine.lights[0].position,
      lightColor: this.engine.lights[0].color
    });
  // }
}

// applies lighting to a pixel and returns the new color
PointLight.lightPixel = function(args){
  // var baseColor = args.baseColor;
  // var lightDirection = args.lightDirection;
  // var normal = args.normal;
  // var lightColor = args.lightColor;
  // var falloff = args.falloff;
  // var choke = args.choke || 1
  // var cel = args. cel

  // var fade = lightDirection.length() / falloff;
  // if (fade == 0){
  //   return baseColor;
  // }
  var dot = Vec3D.dot(args.lightDirection.unit(), args.normal);
  // var intensity = dot;
  // var intensity = Math.pow(dot, (choke || 1));
  // if (cel){
  //   intensity = threshold(intensity, .6, 0, .85);
  // }
  // intensity = clamp(intensity/fade, 0, .85);
  var color = Vec3D.interpolate(args.baseColor, args.lightColor, dot);
  return color;
}

PointLight.lightCanvas = function(args){

  var texture = args.ctx.getImageData(0, 0, args.canvas.width, args.canvas.height);
  var textureData = texture.data;

  var texturePixel = new Vec3D()
  var pixelPosition = new Vec3D();

  var ni = 0;
  var ti = 0;

  for (var x = 0; x < args.canvas.height; x++){
    for (var y = 0; y < args.canvas.width; y++){

      pixelPosition.assign(x, y, args.depth[ni]);

      var lightDirection = Vec3D.subtract(args.lightPosition, pixelPosition);

      var normal = args.normals[ni];

      texturePixel.assign(textureData[ti],textureData[ti+1], textureData[ti+2]);

      var litPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: true,
        choke: 5,
        falloff: 300,
        lightColor: args.lightColor,
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

  args.ctx.putImageData(texture, 0, 0);

}
