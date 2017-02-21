attribute vec4 aParticleInfo;
attribute vec4 aColors;

uniform float uDt;

varying lowp vec4 vColors;
// varying lowp float vDelta;

vec2 rotate(vec2 point, float rads){
  mat4 rm = mat4(cos(rads), -sin(rads), 0.0, 0.0, sin(rads), cos(rads), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
  vec2 newPoint = (rm * vec4(point, 0.0, 1.0)).xy;
  return newPoint;
}

// area is bigger than our clipspace to ensure popping/weirdness along edges of the function happen out of frame
const float SPAN = 2.0;
const float SPAN_OFFSET = SPAN / 2.0;

const float FREQ = 20.0;
const float STRAIGHTNESS = 20.0;

void main(void){
  vColors = aColors;
  float displaceX = aParticleInfo.x;
  float displaceY = aParticleInfo.y;
  float displaceAngle = aParticleInfo.z;
  float displaceDelta = aParticleInfo.w;

  float delta = uDt;

  // loop from 1.0 back to 0.0
  delta = fract(delta);

  float wind = sin((delta+2.0)*FREQ)/STRAIGHTNESS;

  // convert to clipspace units
  // delta = delta * SPAN - SPAN_OFFSET;

  // behavior function
  vec2 point = vec2(1.0-(delta-wind), 1.0-delta);

  // point = vec2(point.x * SPAN - SPAN_OFFSET, point.y);
  // point = rotate(point, 0.78);
  point = rotate(point+1.0, displaceAngle/4.0) - 1.0;
  point = point + vec2(displaceX, displaceY);

  // add individual variation

  // ensure result is in clipspace
  point = point * SPAN - SPAN_OFFSET;

  gl_PointSize = 5.0;
  gl_Position = vec4((point), 0.0, 1.0);
}