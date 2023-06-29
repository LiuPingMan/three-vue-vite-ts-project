uniform float p;
varying float vIntensity;
void main()
{
  vec3 vNormal=normalize(normalMatrix*normal);
  vec4 pos=modelMatrix*vec4(position,1.);
  vIntensity=pow(1.-abs(dot(vNormal,vec3(0,0,1))),p);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}