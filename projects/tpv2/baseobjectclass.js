function BaseGameObject(){
}

BaseGameObject.prototype.initValues = function(args, defaults){
  var assignments = defaults
  for (var key in args){
    assignments[key] = args[key];
  }
  // assign args
  for (var key in assignments){
    this[key] = assignments[key];
  }
}