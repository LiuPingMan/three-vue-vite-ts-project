<script lang="ts">
export default {
  name: 'HomeView'
}
</script>
<script setup lang="ts">
// import ParticleView from '@/views/ParticleView/index.vue'
import ShaderSphere from '@/views/ShaderSphere/index.vue'
</script>

<template>
  <main>
    <!-- <ParticleView class="particle-wrapper"></ParticleView> -->
    <ShaderSphere class="shader-sphere-warpper"></ShaderSphere>
  </main>
</template>
<style>
.particle-wrapper {
  height: 600px;
}
.shader-sphere-warpper {
  height: 600px;
}
</style>
