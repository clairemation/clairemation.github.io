attribute vec4 aParticleInfo;
attribute vec4 aColors;

uniform float uDt;

varying lowp vec4 vColors;
varying lowp float vDelta;

vec2 rotate(vec2 point, float rads){
  mat4 rm = mat4(cos(rads), -sin(rads), 0.0, 0.0, sin(rads), cos(rads), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
  vec2 newPoint = (rm * vec4(point, 0.0, 1.0)).xy;
  return newPoint;
}

void main(void){

  float fudge = aParticleInfo.x;
  float fudge2 = aParticleInfo.y;
  float fudge3 = aParticleInfo.z;

  float delta = (uDt * 2.0 - 1.0) * 4.0 + 3.0;

  vec2 position;

  if (delta < 0.0) {
    position = vec2(fudge * 0.1, -delta);
  } else {
    position.x = delta * fudge;
    position.y = -abs(delta * fudge);
    position = rotate(position, fudge2);
    position.y -= pow(position.x, 2.0);
  }

  position.y += 0.5;

  vColors = aColors;

  gl_PointSize = pow((1.0 - uDt), 3.0) * 100.0 * fudge3;
  // gl_PointSize = 30.0;

  gl_Position = vec4(position, 0.0, 1.0);
  vDelta = uDt;
}