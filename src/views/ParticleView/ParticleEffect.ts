import type { BufferAttribute } from 'three'
import * as THREE from 'three'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

export default class ParticleEffect {
  pointNumber: number
  bufferGeometry: THREE.BufferGeometry
  position: Float32Array
  toPosition: Float32Array
  speed: Float32Array
  particle: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>
  material: THREE.ShaderMaterial
  color: Float32Array
  toColor: Float32Array
  constructor(pointNumber = 1000) {
    this.pointNumber = pointNumber
    this.bufferGeometry = new THREE.BufferGeometry()
    this.position = new Float32Array(pointNumber * 3)
    this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(this.position, 3))
    this.toPosition = new Float32Array(pointNumber * 3)
    this.bufferGeometry.setAttribute('toPosition', new THREE.BufferAttribute(this.toPosition, 3))
    this.speed = new Float32Array(pointNumber)
    this.bufferGeometry.setAttribute('speed', new THREE.BufferAttribute(this.speed, 1))
    this.color = new Float32Array(pointNumber * 3)
    this.bufferGeometry.setAttribute('color', new THREE.BufferAttribute(this.color, 3))
    this.toColor = new Float32Array(pointNumber * 3)
    this.bufferGeometry.setAttribute('toColor', new THREE.BufferAttribute(this.toColor, 3))
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        progress: {
          value: 0
        }
      },
      transparent: true,
      depthTest: false
      // blending: THREE.AdditiveBlending
    })
    this.particle = new THREE.Points(this.bufferGeometry, this.material)
    this.init()
  }

  init() {
    const { random } = Math
    let index3
    for (let index = 0; index < this.pointNumber; index++) {
      index3 = index * 3
      this.position[index3] = (random() - 0.5) * 500
      this.position[index3 + 1] = (random() - 0.5) * 500
      this.position[index3 + 2] = (random() - 0.5) * 500
      this.toPosition[index3] = this.position[index3]
      this.toPosition[index3 + 1] = this.position[index3 + 1]
      this.toPosition[index3 + 2] = this.position[index3 + 2]

      this.toColor[index3] = 1
      this.toColor[index3 + 1] = 1
      this.toColor[index3 + 2] = 1

      this.speed[index] = random() * 3 + 1
    }
    this.bufferGeometry.attributes.position.needsUpdate = true
    this.bufferGeometry.attributes.toPosition.needsUpdate = true
    this.bufferGeometry.attributes.speed.needsUpdate = true
    this.bufferGeometry.attributes.toColor.needsUpdate = true
  }

  to(geometry: THREE.BufferGeometry, colors: Array<THREE.Color>) {
    const { array, count } = geometry.getAttribute('position') as BufferAttribute
    let index3, targetIndex3
    !geometry.boundingBox && geometry.computeBoundingBox()
    const { min, max } = geometry.boundingBox!
    for (let index = 0, targetIndex = 0; index < this.pointNumber; index++, targetIndex++) {
      index3 = index * 3
      targetIndex %= count
      targetIndex3 = targetIndex * 3
      // 更新顶点坐标
      this.position[index3] = this.toPosition[index3]
      this.position[index3 + 1] = this.toPosition[index3 + 1]
      this.position[index3 + 2] = this.toPosition[index3 + 2]
      this.toPosition[index3] = array[targetIndex3]
      this.toPosition[index3 + 1] = array[targetIndex3 + 1]
      this.toPosition[index3 + 2] = array[targetIndex3 + 2]

      // 设置颜色渐变
      const percent = (array[targetIndex3] - min.x) / (max.x - min.x)
      this.color[index3] = this.toColor[index3]
      this.color[index3 + 1] = this.toColor[index3 + 1]
      this.color[index3 + 2] = this.toColor[index3 + 2]
      this.toColor[index3] = (1 - percent) * colors[0].r + percent * colors[1].r
      this.toColor[index3 + 1] = (1 - percent) * colors[0].g + percent * colors[1].g
      this.toColor[index3 + 2] = (1 - percent) * colors[0].b + percent * colors[1].b
    }
    this.setProgess(0)
    this.bufferGeometry.attributes.position.needsUpdate = true
    this.bufferGeometry.attributes.toPosition.needsUpdate = true
    this.bufferGeometry.attributes.color.needsUpdate = true
    this.bufferGeometry.attributes.toColor.needsUpdate = true
  }

  setProgess(progress: number) {
    this.material.uniforms.progress.value = progress
  }
}
