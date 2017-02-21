precision mediump float;
varying lowp vec4 vColors;
// varying lowp float vDelta;

void main(void){
  vColors;
  // draw a circle
  float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
  float alpha = 1.0 - step(0.5, dist);
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}