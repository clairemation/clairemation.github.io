precision mediump float;
varying lowp vec4 vColors;
// varying lowp float vDelta;

void main(void){
  vColors;
  // draw a circle
  float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
  dist = pow(dist, 2.0) * 2.0;
  float alpha = 0.5 - dist;
  vec3 white = vec3(1.0);
  vec3 aqua = vec3(0.4, 0.8, 1.0);
  vec3 color = mix(white, aqua, (1.0-alpha)-0.5);
  gl_FragColor = vec4(white, alpha);
}