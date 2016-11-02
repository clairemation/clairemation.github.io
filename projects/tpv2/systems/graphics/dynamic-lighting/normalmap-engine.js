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
  this.position = args.position; //array3
  this.color = args.color; //array3
  this.falloff = args.falloff; //in pixels
  // TODO: instead of a variable, make falloff calculation be a whole callback function, so a light can have a non-linear falloff if we want
}

function LightingComponent(args){
  this.owner = args.owner;
  this.mapFrames = {
    standing: {
      N: {
        frames: [0],
        spritesheet: images.heroStdLMap
      },
      NW: {
        frames: [0],
        spritesheet: images.heroStdLMap
      },
      W: {
        frames: [0],
        spritesheet: images.heroStdLMap
      },
      SW: {
        frames: [0],
        spritesheet: images.heroStdLMap
      },
      S: {
        frames: [0],
        spritesheet: images.heroStdRMap
      },
      SE: {
        frames: [0],
        spritesheet: images.heroStdRMap
      },
      E: {
        frames: [0],
        spritesheet: images.heroStdRMap
      },
      NE: {
        frames: [0],
        spritesheet: images.heroStdRMap
      },
    },
    running: {
      N: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      NW: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      W: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      SW: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      S: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      SE: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      E: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      NE: {
        frames: [0,1,2,3],
        spritesheet: images.heroRunRMap
      }
    },
    slashing: {
      N: {
        frames: [0],
        spritesheet: images.heroSlashLeft
      },
      NW: {
        frames: [0],
        spritesheet: images.heroSlashLeft
      },
      W: {
        frames: [0],
        spritesheet: images.heroSlashLeft
      },
      SW: {
        frames: [0],
        spritesheet: images.heroSlashLeft
      },
      S: {
        frames: [0],
        spritesheet: images.heroSlashRight
      },
      SE: {
        frames: [0],
        spritesheet: images.heroSlashRight
      },
      E: {
        frames: [0],
        spritesheet: images.heroSlashRight
      },
      NE: {
        frames: [0],
        spritesheet: images.heroSlashRight
      }
    }
  };

  // var canvas = document.createElement('canvas');
  // canvas.width = this.canvasWidth;
  // canvas.height = this.canvasHeight;

  for (var sequence in this.mapFrames){
    for (var facing in this.mapFrames[sequence]){
      var sprite = this.mapFrames[sequence][facing];
      var frameNum = 0;
        for (var i = 0; i < sprite.frames.length; i++){
          (function(){
            frameNumber = sprite.frames[i];
            var startX = frameNumber * this.owner.width;
            var geometry = Geometry.getGeometryFromImg(sprite.spritesheet, startX, 0, this.owner.width, this.owner.height);
            // var normals = geometry[0];
            // var depth = geometry[1];
            sprite.frames[i] = {
              normals: (function(){
                return geometry[0]
              })(),
              depth: (function(){
                return geometry[1]
              })()
            };
            // console.log(sprite.frames);
          }).call(this);
        }
    }
  }

  // for (var sequence in this.mapFrames){
  //   for (var facing in this.mapFrames[sequence]){
  //     var sprite = this.mapFrames[sequence][facing];
  //     var src = sprite.spritesheet;
  //     sprite.normalData = [];
  //     sprite.depthData = [];
  //     for (var i = sprite.frames[0]; i < sprite.frames.length; i++){
  //       var frameStartX = sprite.frames[i] * this.owner.width;
  //       var geometry = Geometry.getGeometryFromImg(src, frameStartX, 0, this.owner.width, this.owner.height);
  //       sprite.normalData[i] = geometry[0];
  //       sprite.depthData[i] = geometry[1];
  //     }
  //   }
  // }

  this.canvas = args.canvas;
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  this.engine = args.engine;
  this.engine.registerComponent(this);
  this.lightingBufferCanvas = document.createElement('canvas');
  this.lightingBufferCanvas.width = this.canvasWidth;
  this.lightingBufferCanvas.height = this.canvasHeight;
  this.lightingBuffer = this.lightingBufferCanvas.getContext('2d');
  this.lightingTexture = this.lightingBuffer.createImageData(this.canvasWidth, this.canvasHeight);
}

LightingComponent.prototype.update = function(){

  var frameNum = this.owner.spriteHandler.currentAnimationFrameNumber;

  var normals = this.mapFrames[this.owner.appearance][this.owner.facing].frames[frameNum].normals;

  console.log(this.mapFrames[this.owner.appearance][this.owner.facing].frames);

  var depth = this.mapFrames[this.owner.appearance][this.owner.facing].frames[frameNum].depth;

  // for (var i = 0; i < this.engine.lights.length; i++){
    var ownerPosition = [this.owner.x, this.owner.y, this.owner.z];
    var lightInLocalSpaceCoords = ArrayVec3D.subtractVectors(this.engine.lights[0].position, ownerPosition);

    PointLight.lightCanvas({
      canvas: this.canvas,
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      ctx: this.ctx,
      normals: normals,
      depth: depth,
      lightPosition: lightInLocalSpaceCoords,
      lightColor: this.engine.lights[0].color
    });
  // }
}

// applies lighting to a pixel and returns the new color
PointLight.lightPixel = function(args){
  var baseColor = args.baseColor;
  var lightDirection = args.lightDirection;
  var normal = args.normal;
  var lightColor = args.lightColor;
  var falloff = args.falloff;
  var choke = args.choke || 1
  var cel = args.cel

  var fade = ArrayVec3D.length(lightDirection) / falloff;
  if (fade == 0){
    return baseColor;
  }
  var dot = ArrayVec3D.dot(ArrayVec3D.unitVector(lightDirection), args.normal);
  var intensity = Math.pow(dot, choke) + .5;
  if (cel){
    intensity = threshold(intensity, .6, 0, .85);
  }
  intensity = clamp(intensity/fade, 0, .85);
  return ArrayVec3D.interpolate(baseColor, lightColor, intensity);
}

PointLight.lightCanvas = function(args){

  var texture = args.ctx.getImageData(0, 0, args.canvasHeight, args.canvasWidth);
  var textureData = texture.data;

  var texturePixel = [0,0,0];
  var pixelPosition = [0,0,0];
  var lightDirection = [0,0,0];
  var targetPixel = [0,0,0];

  var ni = 0;
  var ti = 0;

  for (var x = 0; x < args.canvasHeight; x++){
    for (var y = 0; y < args.canvasWidth; y++){

      pixelPosition[0] = x;
      pixelPosition[1] = y;
      pixelPosition[2] = args.depth[ni];

      lightDirection = ArrayVec3D.subtractVectors(args.lightPosition, pixelPosition);

      texturePixel[0] = textureData[ti],
      texturePixel[1] = textureData[ti+1],
      texturePixel[2] = textureData[ti+2];

      targetPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: true,
        choke: 5,
        falloff: 600,
        lightColor: args.lightColor,
        lightDirection: lightDirection,
        normal: args.normals[ni],
      });

      textureData[ti] = targetPixel[0];
      textureData[ti+1] = targetPixel[1];
      textureData[ti+2] = targetPixel[2];

      ni ++;
      ti += 4;
    }
  }

  args.ctx.putImageData(texture, 0, 0);

}
