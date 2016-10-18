function clamp(x, min, max){
  if (x < min) {return min;}
  if (x > max) {return max;}
  return x;
}

function threshold(x, threshold, min, max){
  if (x < threshold) return min;
  return max;
}