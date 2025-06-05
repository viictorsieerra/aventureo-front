<template>
  <v-container>
    <div class="map-container">
      <div id="map" ref="mapElement"></div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue'
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

const emit = defineEmits(['location-selected'])

const map = ref(null)
const mapElement = ref(null)
const markers = ref([])

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
      .bindPopup(`<b>${location.name}</b>`)
      .on('click', () => {
        emit('location-selected', location)
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

watch(() => props.locations, (newLocations) => {
  if (map.value && newLocations.length > 0) {
    addMarkers(newLocations)
  }
})
</script>



<style scoped lang="scss">
.map-container {
  position: relative;
  height: 500px;
  width: 100%;
  margin: 24px auto 16px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  width: 100%;
  max-width: 600px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .map-container {
    height: 300px;
    margin: 16px auto;
  }

  #map {
    max-width: 100%;
  }
}
</style>
