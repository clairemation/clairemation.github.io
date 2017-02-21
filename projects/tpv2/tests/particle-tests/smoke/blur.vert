attribute vec3 aVertexCoords;
attribute vec2 aTextureCoords;

varying highp vec2 vTextureCoords;

void main(void){
  gl_Position = vec4(aVertexCoords.x, -aVertexCoords.y, 0.0, 1.0);
  vTextureCoords = aTextureCoords;
}