vec3 coords=normal;
coords.y+=uTime/10.;
vec3 noisePatternCoords=vec3(cnoise(coords));
float pattern=remap(.35,.6,0.,3.,smoothMod(noisePatternCoords.y*6.,1.,1.5));
vDisplacement=pattern;
transformed+=normalize(objectNormal)*pattern;