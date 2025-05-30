<script lang="ts" setup>
import Header from '@/components/Header.vue';
import TipoAlojamiento from '@/components/TipoAlojamiento.vue';
import Informacion from '@/components/Informacion.vue';
import ChatSection from '@/components/ChatSection.vue';
import DestinosPopulares from '@/components/DestinosPopulares.vue';
import Footer from '@/components/Footer.vue';
import PlanificadorSection from '@/components/PlanificadorSection.vue';
import FondoCanvasHome from '@/components/FondoCanvasHome.vue';
import HomeCarrusell from '@/components/HomeCarrusell.vue';
</script>

<template>
  <div class="home-container">


    <div class="home-content">
      <HomeCarrusell />
      <PlanificadorSection />
      <Informacion />
      <ChatSection />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  overflow: hidden;
}

.background-video {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.6);
}

.home-content {
  position: relative;
  z-index: 1;
}
</style>
