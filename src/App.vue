<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <router-view v-slot="{ Component }">
    <keep-alive :include="['HomeView', 'AboutView']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
