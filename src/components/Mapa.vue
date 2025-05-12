
<template>
  <v-container>
    <div class="map-container">
      <div id="map" ref="mapElement"></div>
      
   
      <div v-if="selectedLocation" class="location-plans">
        <h3>Planes en {{ selectedLocation.name }}</h3>
        <v-list>
          <v-list-item 
            v-for="(plan, index) in locationPlans" 
            :key="index"
            @click="selectPlan(plan)"
          >
            <v-list-item-title>{{ plan.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ plan.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const props = defineProps({
  locations: {
    type: Array,
    default: () => []
  },
  initialPosition: {
    type: Object,
    default: () => ({ lat: 41.5280185, lng: -1.3116027 })
  },
  initialZoom: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['location-selected', 'plan-selected'])

const map = ref(null)
const mapElement = ref(null)
const markers = ref([])
const selectedLocation = ref(null)
const locationPlans = ref([])

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

onMounted(() => {
  initializeMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})

const initializeMap = () => {
  map.value = L.map(mapElement.value).setView(
    [props.initialPosition.lat, props.initialPosition.lng], 
    props.initialZoom
  )
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map.value)
  
 
  if (props.locations.length > 0) {
    addMarkers(props.locations)
  }
}

const addMarkers = (locations) => {
  clearMarkers()
  
  locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], { icon: defaultIcon })
      .addTo(map.value)
      .bindPopup(`<b>${location.name}</b><br>${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`)
      .on('click', () => {
        selectLocation(location)
      })
    
    markers.value.push(marker)
  })
  
  if (locations.length > 0) {
    map.value.flyTo([locations[0].lat, locations[0].lng], 13) 
  }
}

const clearMarkers = () => {
  markers.value.forEach(marker => {
    map.value.removeLayer(marker)
  })
  markers.value = []
}

const selectLocation = (location) => {
  selectedLocation.value = location
  locationPlans.value = getSamplePlans(location.name)
  emit('location-selected', location)
}

const selectPlan = (plan) => {
  emit('plan-selected', plan)
}

const getSamplePlans = (locationName) => {
  const samplePlans = {
    "Madrid": [
      { name: "Tour histórico", description: "Recorrido por los lugares emblemáticos", price: "25€" },
      { name: "Clase de cocina", description: "Aprende a hacer paella", price: "45€" }
    ],
    "Barcelona": [
      { name: "Visita Sagrada Familia", description: "Tour guiado por la obra de Gaudí", price: "35€" }
    ],
    "Valencia": [
      { name: "Tour de las Fallas", description: "Conoce la tradición fallera", price: "30€" },
      { name: "Visita Ciudad de las Artes", description: "Recorrido por el complejo arquitectónico", price: "28€" }
    ]
  }
  
  return samplePlans[locationName] || []
}

watch(() => props.locations, (newLocations) => {
  if (map.value && newLocations.length > 0) {
    addMarkers(newLocations)
  }
})
</script>

<style scoped>
.map-container {
  position: relative;
  height: 500px;
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
}

#map {
  height: 100%;
  width: 100%;
}

.location-plans {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2);
  max-width: 300px;
  max-height: 400px;
  overflow-y: auto;
}
</style>