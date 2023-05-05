<template>
  <div ref="wrapperRef" class="wrapper"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import ThreeHelper from '@/utils/ThreeHelper'
import ParticleEffect from './ParticleEffect'

// 设置加载器
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const wrapperRef = ref()
let helper: ThreeHelper
let particleEffect: ParticleEffect
let meshArray: Array<THREE.Mesh>
const colorArray = ['#0b58e7', '#6ee70b', '#e7510b', '#e70bc2', '#92ece8']
const init = () => {
  helper = new ThreeHelper(wrapperRef.value)

  setGui()
  addParticle()

  helper.animate(() => {
    if (parameter.progress < 1) {
      parameter.progress += 0.005
      particleEffect.setProgess(parameter.progress)
    } else {
      parameter.progress = 1
    }
  })
}

gltfLoader.load(
  '/models/particle.glb',
  (gltf) => {
    meshArray = gltf.scene.children as Array<THREE.Mesh>
  },
  () => {
    console.log('progress')
  },
  (e) => {
    console.log('error', e)
  }
)
const addParticle = () => {
  particleEffect = new ParticleEffect(100000)
  helper.scene.add(particleEffect.particle)
  particleEffect.to(new THREE.BoxGeometry(20, 20, 20, 30, 30, 30), [
    new THREE.Color('#f00'),
    new THREE.Color('#f0f')
  ])
}

let currentMeshIndex = 0
const parameter = {
  toggle: () => {
    parameter.progress = 0
    particleEffect.to(meshArray[currentMeshIndex].geometry, [
      new THREE.Color(colorArray[currentMeshIndex]),
      new THREE.Color(colorArray[colorArray.length - 1 - currentMeshIndex])
    ])
    currentMeshIndex++
    currentMeshIndex %= meshArray.length
  },
  progress: 0
}
const setGui = () => {
  helper.gui.add(parameter, 'toggle').name('切换'),
    helper.gui
      .add(parameter, 'progress', 0, 1)
      .name('进度')
      .onChange((v) => {
        particleEffect.setProgess(v)
      })
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less"></style>
