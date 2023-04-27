<template>
  <div ref="wrapperRef" class="wrapper"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import ThreeHelper from '@/utils/ThreeHelper'

const wrapperRef = ref()
let helper: ThreeHelper
let cube: THREE.Mesh

const init = () => {
  helper = new ThreeHelper(wrapperRef.value)
  console.log(helper.gui)

  setGui()
  addCube()
  helper.animate(() => {
    cube.rotation.y += parameter.rotateSpeed
  })
}
const addCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  helper.scene.add(cube)
}
const parameter = {
  rotateSpeed: 0.01,
  scale: 1
}
const setGui = () => {
  helper.gui.add(parameter, 'rotateSpeed', 0, 0.5).name('旋转速度')
  helper.gui
    .add(parameter, 'scale', 0.1, 10)
    .name('缩放')
    .onChange((v) => {
      cube.scale.set(v, v, v)
    })
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less"></style>
