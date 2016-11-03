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
  this.position = args.position; // [x,y,z]
  this.color = args.color; // [r,g,b]
  this.falloff = args.falloff; //in pixels
  // TODO: instead of a variable, make falloff calculation be a whole callback function, so a light can have a non-linear falloff if we want
}

function LightingComponent(args){
  this.owner = args.owner;
  this.mapFrames = {
    standing: {
      N: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      NW: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      W: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      SW: {
        frameNumbers: [0],
        spritesheet: images.heroStdLMap
      },
      S: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      SE: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      E: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
      NE: {
        frameNumbers: [0],
        spritesheet: images.heroStdRMap
      },
    },
    running: {
      N: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      NW: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      W: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      SW: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunLMap
      },
      S: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      SE: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      E: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      },
      NE: {
        frameNumbers: [0,1,2,3],
        spritesheet: images.heroRunRMap
      }
    },
    slashing: {
      N: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      NW: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      W: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      SW: {
        frameNumbers: [0],
        spritesheet: images.heroSlashLeft
      },
      S: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      SE: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      E: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      },
      NE: {
        frameNumbers: [0],
        spritesheet: images.heroSlashRight
      }
    }
  };

  for (var sequence in this.mapFrames){
    for (var facing in this.mapFrames[sequence]){
      var sprite = this.mapFrames[sequence][facing];
      sprite.normals = [];
      var frameNum = 0;
      for (var i = 0; i < sprite.frameNumbers.length; i++){
        frameNumber = sprite.frameNumbers[i];
        var startX = frameNumber * this.owner.width;
        sprite.normals[i] = Geometry.getGeometryFromImg(sprite.spritesheet, startX, 0, this.owner.width, this.owner.height);
      }
    }
  }

  this.canvas = args.canvas;
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  this.engine = args.engine;
  this.engine.registerComponent(this);
  var lightingBufferCanvas = document.createElement('canvas');
}

LightingComponent.prototype.update = function(){

  var frameNum = this.owner.spriteHandler.currentAnimationFrameNumber;

  var normals = this.mapFrames[this.owner.appearance][this.owner.facing].normals[frameNum];


  // for (var i = 0; i < this.engine.lights.length; i++){
    var ownerPosition = [this.owner.x, this.owner.y, this.owner.z];
    var lightInLocalSpaceCoords = ArrayVec3D.subtractVectors(this.engine.lights[0].position, ownerPosition);

    PointLight.lightCanvas({
      canvas: this.canvas,
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      ctx: this.ctx,
      normals: normals,
      lightPosition: lightInLocalSpaceCoords,
      lightColor: this.engine.lights[0].color,
      offset: [this.owner.x, this.owner.y, this.owner.z]
    });
  // }
}

// applies lighting to a pixel and returns the new color
PointLight.lightPixel = function(args){
  // var baseColor = args.baseColor;
  // var lightDirection = args.lightDirection;
  // var normal = args.normal;
  var choke = args.choke ? args.choke : 1;

  var fade = ArrayVec3D.length(args.lightDirection) / args.falloff;
  if (fade == 0){
    return baseColor;
  }
  var dot = ArrayVec3D.dot(args.lightDirection, args.normal);
  var intensity = Math.pow(dot, choke);
  // if (args.redShift) {
    // lightColor = ArrayVec3D.interpolate(lightColor, [255,0,0], (1-dot));
  // }
  if (args.cel == true){
    // intensity = threshold(intensity/fade, .6, 0, .85);
  }
  intensity = clamp(intensity, 0, .85);
  return ArrayVec3D.interpolate(args.baseColor, args.lightColor, intensity);
}

PointLight.lightCanvas = function(args){

  var texture = args.ctx.getImageData(0, 0, args.canvasHeight, args.canvasWidth);
  var textureData = texture.data;

  var texturePixel = [0,0,0];
  var pixelPosition = [0,0,0];
  var lightDirection = [0,0,0];
  var litPixel = [0,0,0];

  // var ni = 0;
  var ti = 0;

  for (var x = 0; x < args.canvasHeight; x++){
    for (var y = 0; y < args.canvasWidth; y++){

      pixelPosition[0] = x;
      pixelPosition[1] = y;
      pixelPosition[2] = args.normals[ti+3];

      lightDirection = ArrayVec3D.subtractVectors(args.lightPosition, pixelPosition);

      // var redShift = (args.lightPosition[2] < 0);

      texturePixel[0] = textureData[ti],
      texturePixel[1] = textureData[ti+1],
      texturePixel[2] = textureData[ti+2];

      litPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: false,
        choke: 1,
        falloff: 200,
        lightColor: args.lightColor,
        lightDirection: lightDirection,
        // lowerRightHack: lowerRightHack,
        normal: [args.normals[ti], args.normals[ti+1], args.normals[ti+2]],
        // redShift: redShift
      });

      textureData[ti] = litPixel[0];
      textureData[ti+1] = litPixel[1];
      textureData[ti+2] = litPixel[2];

      // ni ++;
      ti += 4;
    }
  }

  args.ctx.putImageData(texture, 0, 0);

}
