attribute vec3 aVertexCoords;
attribute vec2 aTextureCoords;

varying highp vec2 vTextureCoords;
varying highp vec2 vPosition;

void main(void){
  gl_Position = vec4(aVertexCoords.xy, 0.0, 1.0);
  vTextureCoords = aTextureCoords;
  vPosition = aVertexCoords.xy;
}
