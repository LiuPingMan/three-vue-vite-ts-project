varying vec3 vColor;
varying vec3 vPos;

// 马氏分形纹理生成函数
float marbles(vec3 pos, float scale, float lacunarity, float gain, int octaves){
    float sum = 0.0;
    float amplitude = 1.0;

    for (int i = 0; i < octaves; i++) {
        sum += amplitude * abs(sin(pos.x * pow(scale, 2.0)));
        pos *= lacunarity;
        amplitude *= gain;
    }

    return sum;
}
void main(){
  float noiseValue = marbles(vPos, 6.0, 0.01, 0.1, 8);
  gl_FragColor = vec4(vec3(noiseValue),1.0);
}