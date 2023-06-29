uniform vec3 glowColor;
varying float vIntensity;
void main()
{
  vec3 glow=glowColor*vIntensity;
  gl_FragColor=vec4(glow,1.);
}