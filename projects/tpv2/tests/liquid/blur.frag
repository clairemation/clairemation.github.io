precision mediump float;
uniform float uViewportWidth;
uniform float uViewportHeight;
uniform float uKernel[25];
uniform sampler2D uSampler;
varying highp vec2 vTextureCoords;

void main(void){
  // highp vec2 onePixel = vec2(1.0 / uViewportWidth, 1.0 / uViewportHeight);
  // vec4 pixelSum =
    // 3x3 kernel
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-1, -1)) * uKernel[6]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 0, -1)) * uKernel[7]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 1, -1)) * uKernel[8]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-1,  0)) * uKernel[11]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 0,  0)) * uKernel[12]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 1,  0)) * uKernel[13]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-1,  1)) * uKernel[16]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 0,  1)) * uKernel[17]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 1,  1)) * uKernel[18]  ;

    // add these for a 5x5 kernel
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-2, -2)) * uKernel[0]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-1, -2)) * uKernel[1]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 0, -2)) * uKernel[2]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 1, -2)) * uKernel[3]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 2, -2)) * uKernel[4]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-2, -1)) * uKernel[5]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 2, -1)) * uKernel[9]   +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-2,  0)) * uKernel[10]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 2,  0)) * uKernel[14]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-2,  1)) * uKernel[15]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 2,  1)) * uKernel[19]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-2,  2)) * uKernel[20]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2(-1,  2)) * uKernel[21]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 0,  2)) * uKernel[22]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 1,  2)) * uKernel[23]  +
    // texture2D(uSampler, vTextureCoords + onePixel * vec2( 2,  2)) * uKernel[24]  ;

  // lowp vec4 avg = pixelSum;
  // gl_FragColor = vec4(0.5, 0.9, 1.0, step(0.15, vec4(avg)));
  vec4 sample = texture2D(uSampler, vTextureCoords);
  float mixFactor = (vTextureCoords.x + 1.0) / 2.0;
  vec3 aqua = vec3(0.4, 0.8, 1.0);
  vec3 color = mix(aqua, sample.rgb, mixFactor);
  gl_FragColor = vec4(color, step(0.2, texture2D(uSampler, vTextureCoords).a));
  // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}