varying vec3 vColor;

void main(){
  vec3 color = vColor;
  float strength = distance(gl_PointCoord, vec2(0.5));
  float dis = length(gl_PointCoord.xy - 0.5);
  dis = smoothstep(0.5, 0.0, dis);
  strength = step(0.5, strength);
  strength = 1.0 - strength;
  if(strength == 0.0)
    discard;
  if(dis == 0.0)
    discard;
  gl_FragColor = vec4(color, strength * dis);
}