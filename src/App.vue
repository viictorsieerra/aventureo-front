<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


</script>

<template>
  <div class="app">
    <Header />
    <div class="app-body">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-body {
  flex: 1;
}

.header {
  z-index: 1;
}

</style>