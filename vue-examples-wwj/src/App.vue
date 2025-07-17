<script setup lang="ts">
import NavbarView from '@/views/example01/NavbarView.vue'
import SidebarView from '@/views/example01/SidebarView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <SidebarView id="sidebar" />
  <RouterView id="main" />
  <NavbarView id="navbar" />
</template>
<style>
#app {
  display: flex;
  background-color: white;
  margin-top: 50px;
}
#sidebar {
  border: 1px solid blue;
  min-width: 200px;
}
#main {
  border: 1px solid blue;
  flex: 1;
}
</style>
