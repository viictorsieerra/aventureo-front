<template>
  <v-container>
    <div id="map" style="height: 500px; margin-top: 16px;"></div>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
let map = null

onMounted(() => {
  map = L.map('map').setView([41.5280185, -1.3116027], 5)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
})
</script>

<style scoped>
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>
  