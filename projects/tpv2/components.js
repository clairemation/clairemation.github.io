function BaseGameObject(args, defaults){
  var assignments = defaults;
  // overwrite defaults with provided args
  for (var key in args){
    assignments[key] = args[key];
  }
  // assign args
  for (var key in assignments){
    this[key] = assignments[key];
  }
}