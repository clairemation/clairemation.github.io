function SpriteEngine(){
  this.entitiesByDepthOrder = [];
  this.canvas = document.getElementById("display");
  this.ctx = this.canvas.getContext('2d');
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
  this.ctx.clearRect(0, 0, 1200, 800);
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