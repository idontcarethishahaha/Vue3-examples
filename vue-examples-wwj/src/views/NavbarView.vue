<script setup lang="ts"></script>
<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><a href="#" class="nav-list-link">Home</a></li>
      <li><a href="#" class="nav-list-link">News</a></li>
      <li><a href="#" class="nav-list-link">Contact</a></li>
      <li><a href="#" class="nav-list-link">About</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
}
.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-list-link {
  display: block;
  padding: 15px 25px;
  color: white;
  text-decoration: none;
}
.nav-list-link:hover {
  background-color: #111;
}
</style>
