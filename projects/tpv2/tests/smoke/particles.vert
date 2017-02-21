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

// area is bigger than our clipspace to ensure popping/weirdness along edges of the function happen out of frame
const float SPAN = 4.0;
const float SPAN_OFFSET = SPAN / 2.0;

const float FREQ = 4.0;
const float STRAIGHTNESS = 1.50;

void main(void){
  vColors = aColors;
  float displaceX = aParticleInfo.x;
  float displaceY = aParticleInfo.y;
  float displaceAngle = aParticleInfo.z;
  float displaceDelta = aParticleInfo.w;

  float delta = uDt + displaceDelta;

  // loop from 1.0 back to 0.0
  delta = fract(delta);

  vDelta = delta;

  float wind = cos(delta*FREQ)/STRAIGHTNESS;

  // delta = delta * SPAN;
  vec2 point = rotate(vec2(delta),wind*displaceAngle);
  point.y = point.y * SPAN - SPAN_OFFSET;
  point = point + vec2(-displaceX-0.25, -displaceY-0.25);

  gl_PointSize = 150.0 * (delta*delta) + 15.0;

  gl_Position = vec4((point), 0.0, 1.0);
}