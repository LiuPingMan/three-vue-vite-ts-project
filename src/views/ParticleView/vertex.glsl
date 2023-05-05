attribute vec3 toPosition;
attribute float speed;
attribute vec3 color;
attribute vec3 toColor;

uniform float progress;

varying vec3 vColor;

void main() {
  float pointProgess = progress * speed < 1.0 ? progress * speed : 1.0;
  vec3 pos = (1.0 - pointProgess ) * position + pointProgess * toPosition;
  vColor = (1.0 - pointProgess ) * color + pointProgess * toColor;
  vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = 0.4;
  gl_PointSize *= 100.0 / -(modelViewMatrix * vec4(pos, 1.0)).z;
}