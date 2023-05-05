<script lang="ts">
export default {
  name: 'HomeView'
}
</script>
<script setup lang="ts">
import ParticleView from '@/views/ParticleView/index.vue'
</script>

<template>
  <main>
    <ParticleView class="particle-wrapper"></ParticleView>
  </main>
</template>
<style>
.particle-wrapper {
  height: 600px;
}
</style>
