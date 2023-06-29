<template>
  <div ref="wrapperRef"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import * as THREE from 'three'
import ThreeHelper from '@/utils/ThreeHelper'
import vertexShader from './shader/vertex.glsl?raw'
import fragmentShader from './shader/fragment.glsl?raw'
const wrapperRef = ref()
let helper: ThreeHelper
let loader: ColladaLoader
let customMaterial: THREE.ShaderMaterial
let human: THREE.Mesh
const initLoader = () => {
  loader = new ColladaLoader()
}
const initCustomMatrial = () => {
  customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      p: { value: 3 },
      glowColor: { value: new THREE.Color(0x84ccff) }
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })
}
const init = () => {
  helper = new ThreeHelper(wrapperRef.value, {
    addAxes: false
  })
  initLoader()
  initCustomMatrial()
  loader.load('models/woman.dae', function (collada) {
    const dae = collada.scene

    dae.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = customMaterial
      }
    })

    dae.position.y = 0
    dae.scale.x = 0.5
    dae.scale.y = 0.5
    dae.scale.z = 0.5
    human = dae as unknown as THREE.Mesh
    helper.scene.add(human)
  })
  helper.gltfLoader.load('models/woman.glb', (gltf) => {
    const model = gltf.scene
    console.log(model)
    model.position.y = -20
    model.scale.x = 150
    model.scale.y = 150
    model.scale.z = 150
    model.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = customMaterial
      }
    })
    // helper.scene.add(model)
  })

  helper.animate(() => {
    if (human) human.rotateZ(0.01)
  })
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less"></style>
