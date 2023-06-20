<template>
  <div class="wrapper" ref="wrapperRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import ThreeHelper from '@/utils/ThreeHelper'
import vertexPars from './shader/parsVertex.glsl?raw'
import vertexMain from './shader/mainVertex.glsl?raw'
import fragmentPars from './shader/parsFragment.glsl?raw'
import fragmentMain from './shader/mainFragment.glsl?raw'
let helper: ThreeHelper
let material: THREE.MeshStandardMaterial
const clock = new THREE.Clock()
const wrapperRef = ref()
const init = () => {
  helper = new ThreeHelper(wrapperRef.value)
  addLights()
  addSphere()
  helper.animate(() => {
    if (material.userData.shader)
      material.userData.shader.uniforms.uTime.value = clock.getElapsedTime()
  })
}
const addLights = () => {
  const pointLight = new THREE.DirectionalLight(0xffffff, 1)
  pointLight.position.set(10, 10, 10)
  helper.scene.add(pointLight)
  const envLight = new THREE.AmbientLight(0x404040, 1)
  helper.scene.add(envLight)
}
const addSphere = () => {
  const geometry = new THREE.IcosahedronGeometry(15, 300)
  material = new THREE.MeshStandardMaterial()
  material.onBeforeCompile = (shader) => {
    material.userData.shader = shader
    shader.uniforms.uTime = {
      value: 0
    }
    const parsVertexString = `#include <displacementmap_pars_vertex>`
    const mainVertexString = `#include <displacementmap_vertex>`
    shader.vertexShader = shader.vertexShader.replace(
      parsVertexString,
      parsVertexString + '\n' + vertexPars
    )
    shader.vertexShader = shader.vertexShader.replace(
      mainVertexString,
      mainVertexString + '\n' + vertexMain
    )
    const parsFragmentString = `#include <bumpmap_pars_fragment>`
    const mainFragmentString = `#include <normal_fragment_maps>`
    shader.fragmentShader = shader.fragmentShader.replace(
      parsFragmentString,
      parsFragmentString + '\n' + fragmentPars
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      mainFragmentString,
      mainFragmentString + '\n' + fragmentMain
    )
    console.log(material, shader.fragmentShader)
  }
  const sphere = new THREE.Mesh(geometry, material)
  helper.scene.add(sphere)
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less"></style>
