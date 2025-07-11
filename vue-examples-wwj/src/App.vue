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
  background-color: #f4f4f4;
  margin-top: 50px;
}
#sidebar {
  border: 1px solid red;
  min-width: 200px;
}
#main {
  border: 1px solid blue;
  flex: 1;
}
</style>
