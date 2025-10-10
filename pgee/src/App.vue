<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', sans-serif;
  background: #f5f5f5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #409eff;
  outline: none;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background: #409eff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #337ecc;
}

.btn-primary:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.alert {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.alert-error {
  background: #fee;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.alert-success {
  background: #e7f7ed;
  border: 1px solid #c3e6cb;
  color: #155724;
}

/* 布局样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.page-description {
  color: #666;
  font-size: 14px;
}
</style>
