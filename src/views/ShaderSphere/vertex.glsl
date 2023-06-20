// varying vec3 vColor;
varying vec3 vPos;

// float noise(vec3 p){
//     return fract(sin(dot(p, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
// }



void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  // float mixFactor = noise(position);
  // mixFactor = step(0.5, mixFactor);
  // vec3 color1 = vec3(1.0, 0.0,0.0);
  // vec3 color2 = vec3(0.0,1.0,0.0);
  // vColor = mix(color1, color2, mixFactor);
  vPos = position;
  gl_Position = projectionMatrix * viewPosition;
}