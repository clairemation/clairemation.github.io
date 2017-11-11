precision mediump float;
uniform sampler2D uSampler;
uniform vec3 uLightPosition;
varying highp vec2 vTextureCoords;
varying highp vec2 vPosition;

void main(void){
  lowp vec4 texColor = vec4(texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t)));
  if (texColor.a == 0.0){ discard; }
  lowp vec4 normalMapTexel = texture2D(uSampler, vec2(vTextureCoords.s + 0.5, vTextureCoords.t));
  highp vec3 position = vec3(vPosition * 2.0 - 1.0, -1.0);
  highp vec3 normal = normalMapTexel.rgb;
  highp vec3 lightDirection = vec3(uLightPosition.xyz - position);
  highp float distance = length(lightDirection);
  lowp vec3 lightColor = vec3(1.2, 0.8, 0.5);
  highp float light = dot(normalize(lightDirection), normalize(normal));
  distance = max(distance, 0.0);
  light = step(0.7, light) / (distance / 2.5);
  light = min(light, 0.8);
  lowp vec3 color = mix(lightColor, texColor.xyz, 1.0 - light);
  gl_FragColor = vec4(color, texColor.a);
}