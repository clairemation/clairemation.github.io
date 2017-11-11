function LightingEngine(args){
  if (args){
    this.lights = args.lights || [];
    this.entities = args.entities || [];
  }
}


LightingEngine.prototype.registerComponent = function(component){
  this.entities.push(component);
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

  // Extract normals data from maps
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

}


LightingComponent.prototype.update = function(){
  var frameNum = this.owner.spriteHandler.currentAnimationFrameNumber;

  var normals = this.mapFrames[this.owner.appearance][this.owner.facing].normals[frameNum];

  for (var i = 0; i < this.engine.lights.length; i++){

    PointLight.lightCanvas({
      canvas: this.canvas,
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      ctx: this.ctx,
      normals: normals,
      lightPosition: this.engine.lights[i].position,
      lightColor: this.engine.lights[i].color,
      offset: [this.owner.x, this.owner.y, this.owner.z]
    });
  }

}