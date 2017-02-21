precision mediump float;
varying lowp vec4 vColors;
// varying lowp float vDelta;

void main(void){
  vColors;
  // draw a circle
  float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
  dist = pow(dist, 2.0) * 2.0;
  float alpha = 0.5 - dist;
  vec3 orange = vec3(1.0, 0.0, 0.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  float mixFactor = alpha*2.0;
  vec3 color = mix(orange, yellow, mixFactor);
  gl_FragColor = vec4(color.rgb, alpha);
}