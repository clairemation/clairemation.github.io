function SpriteEngine(args){
  this.output = args.output;
  this.entitiesByDepthOrder = [];
  this.ctx = this.output.getContext('2d');
};

SpriteEngine.prototype.registerComponent = function(component){
  this.entitiesByDepthOrder.push(component);
};

SpriteEngine.prototype.deregisterComponent = function(component){
  var index = this.entitiesByDepthOrder.indexOf(component);
  if (index){
    this.entitiesByDepthOrder.splice(index,1);
  }
}

SpriteEngine.prototype.update = function(){
  this.entitiesByDepthOrder.sort(function(a, b){
    return ((a.subject.zIndex) - (b.subject.zIndex));
  });
  // this.output.width = this.output.width;
  this.ctx.save();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.clearRect(0, 0, 1024, 768);
  this.ctx.restore();
  for (var i = 0; i < this.entitiesByDepthOrder.length; i++){
          this.drawEntity(this.entitiesByDepthOrder[i]);
  }
};

SpriteEngine.prototype.drawEntity = function(entity){
  this.ctx.drawImage(
          entity.sprite, //image
          0, 0, //origin x, y
          entity.sprite.width, entity.sprite.height, //origin w & h
          entity.subject.x, entity.subject.y, //map position
          (entity.sprite.width * SCALE), //drawn width and height
          (entity.sprite.height * SCALE)
        );
};