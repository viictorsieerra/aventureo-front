<script setup lang="ts">
import Header from './components/Header.vue';
import TipoAlojamiento from './components/TipoAlojamiento.vue';
import DestinosPopulares from './components/DestinosPopulares.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app">
   <Header/>
   
  </div>
  <TipoAlojamiento/>
  <DestinosPopulares/>
  <Footer/>
</template>

<style>
.app{
  position: relative;
  /* font-family: "Oswald, sans-serif"; */
}
body {
  margin: 0;
  
  /* font-family: Arial, sans-serif; */
}
.header {
 z-index: 1;
}
</style>