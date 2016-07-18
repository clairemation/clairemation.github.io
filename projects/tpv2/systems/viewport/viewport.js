function CameraMode(scene){
  this.scene = scene;
}


function StaticMode(scene){
  CameraMode.call(this, scene);
}

StaticMode.prototype.update = function(){}


function FollowMode(scene, target){
  CameraMode.call(this, scene);
  this.target = target;
  this.margin = {
    top: 200,
    left: 200,
    right: 200,
    bottom: 150
  };
}

FollowMode.prototype.update = function(){

  var scrollX = 0,
      scrollY = 0,

      targetTop = this.target.y,
      targetBottom = this.target.y + (this.target.height * SCALE),
      targetLeft = this.target.x,
      targetRight = this.target.x + (this.target.width * SCALE),

      topBoundary = this.scene.scrollY + this.margin.top,
      bottomBoundary = this.scene.scrollY + this.scene.height - this.margin.bottom;
      leftBoundary = this.scene.scrollX + this.margin.left,
      rightBoundary = this.scene.scrollX + this.scene.width - this.margin.right;

  if (targetTop < topBoundary){
    scrollY = targetTop - topBoundary;
  } else if (targetBottom > bottomBoundary){
    scrollY = targetBottom - bottomBoundary;
  }

  if (targetLeft < leftBoundary){
    scrollX = targetLeft - leftBoundary;
  } else if (targetRight > rightBoundary){
    scrollX = targetRight - rightBoundary;
  }

  this.scene.scrollBy(scrollX, scrollY);

}


function Scene(){
  this.layers = []; // layer order: bottom to top
  this.width = 1024;
  this.height = 768;
  this.scrollX = 0;
  this.scrollY = 0;
  this.cameraMode = new StaticMode({
    scene: this
  })
  this.htmlElement = document.getElementById("display");
};

Scene.prototype.addInFront = function(layer){
  this.layers.push(layer);
  this.htmlElement.appendChild(layer.html);
}

Scene.prototype.addBehind = function(layer){
  this.layers.unshift(layer);
  this.htmlElement.insertBefore(layer.html, this.htmlElement.childNodes[0]);
}

Scene.prototype.scrollBy = function(x, y){
  this.scrollX += x;
  this.scrollY += y;
  for (var i = 0; i < this.layers.length; i++){
    this.layers[i].scrollBy(x, y);
  }
}

// Scene.prototype.scrollTo = function(x, y){
//   this.scrollX = 0;
//   this.scrollY = 0;
// }

Scene.prototype.follow = function(target){
  this.cameraMode = new FollowMode(this, target);
}

Scene.prototype.unfollow = function(){
  this.cameraMode = new StaticMode(this);
}

Scene.prototype.update = function(){
  this.cameraMode.update();
}


function Layer(args){
  this.scene = args.scene;
  this.left = args.left || 0;
  this.top = args.top || 0;
  this.parallaxScale = args.parallaxScale || 1;
  this.html = document.createElement("div");
  this.html.width = args.width || 0;
  this.html.height = args.height || 0;
  this.html.setAttribute("class", "layer");
  this.html.style.left = this.left;
  this.html.style.top = this.top;
  this.scene.addInFront(this);
}

Layer.prototype.updatePosition = function(){
  this.html.style.left = this.left + "px";
  this.html.style.top = this.top + "px";
}

Layer.prototype.moveBy = function(x, y){
  this.left += x;
  this.top += y;
  this.updatePosition();
}

Layer.prototype.moveTo = function(x, y){
  this.left = x;
  this.top = y;
  this.updatePosition();
}


function ImageLayer(args){ // < DisplayLayer
  Layer.call(this, args);
  this.content = args.content;
  this.html.width = this.content.width;
  this.html.height = this.content.height;
  this.html.appendChild(this.content);
}

ImageLayer.prototype = Object.create(Layer.prototype);
ImageLayer.prototype.constructor = ImageLayer;

ImageLayer.prototype.scrollBy = function(x, y){
  this.moveBy(-x * this.parallaxScale, -y * this.parallaxScale);
}


function CanvasLayer(args){ // < DisplayLayer
  Layer.call(this, args);
  this.content = args.content || document.createElement("canvas");
  this.content.width = args.width || this.scene.width;
  this.content.height = args.height || this.scene.height;
  this.context = this.content.getContext("2d");
  this.html.appendChild(this.content);
}

CanvasLayer.prototype = Object.create(Layer.prototype);
CanvasLayer.prototype.constructor = CanvasLayer;

CanvasLayer.prototype.scrollBy = function(x, y){
  this.context.translate(-x * this.parallaxScale, -y * this.parallaxScale);
}