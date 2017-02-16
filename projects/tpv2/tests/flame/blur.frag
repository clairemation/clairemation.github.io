precision mediump float;
uniform float uViewportWidth;
uniform float uViewportHeight;
uniform float uKernel[25];
uniform sampler2D uSampler;
varying highp vec2 vTextureCoords;

void main(void){
  vec4 pix = texture2D(uSampler, vTextureCoords);
  float alpha = step(0.3, pix.a);
  vec3 orange = vec3(1.0, 0.0, 0.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  float mixFactor = distance(vTextureCoords, vec2(0.5, 0.0));
  vec3 color = mix(orange, yellow, mixFactor);
  gl_FragColor = vec4(color, alpha);
}