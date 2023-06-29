<script lang="ts">
export default {
  name: 'HomeView'
}
</script>
<script setup lang="ts">
import ParticleView from '@/views/ParticleView/index.vue'
import ShaderSphere from '@/views/ShaderSphere/index.vue'
import WaveSphere from '@/views/WaveSphere/index.vue'
import XrayHuman from '@/views/XrayHuman/index.vue'
</script>

<template>
  <main>
    <!-- <ParticleView class="particle-wrapper"></ParticleView> -->
    <!-- <ShaderSphere class="shader-sphere-warpper"></ShaderSphere> -->
    <!-- <WaveSphere class="wave-sphere-warpper"></WaveSphere> -->
    <XrayHuman class="xray-human-warpper"></XrayHuman>
  </main>
</template>
<style>
.particle-wrapper {
  height: 600px;
}
.shader-sphere-warpper {
  height: 600px;
}
.wave-sphere-warpper {
  height: 600px;
}
.xray-human-warpper {
  height: 600px;
}
</style>
