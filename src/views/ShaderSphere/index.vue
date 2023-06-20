<template>
  <div ref="wrapperRef" class="wrapper"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import ThreeHelper from '@/utils/ThreeHelper'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

const wrapperRef = ref()
let helper: ThreeHelper

const init = () => {
  helper = new ThreeHelper(wrapperRef.value)
  addSphere()
  helper.animate()
}

const addSphere = () => {
  const sphereGeometry = new THREE.IcosahedronGeometry(15, 20)
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide
  })
  const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial)
  helper.scene.add(sphere)
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="less"></style>
