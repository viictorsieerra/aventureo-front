<template>
  <v-container fluid>
    <v-row class="actividades-container" no-gutters>
      
      <!-- Columna izquierda -->
      <v-col cols="12" md="6" class="left-column">
        <div class="info-section">
          <h2>Explora nuevas aventuras</h2>
          <p>
            En esta ventana, puedes buscar el lugar al que quieras viajar y descubrir las actividades o planes que otras
            personas han compartido.
          </p>
        </div>

        <div class="popular-destinations">
          <h3>Destinos más populares</h3>
          <div class="destination-list">
            <v-card v-for="destino in destinos" :key="destino.name" class="destination-card">
              <v-img :src="destino.image" height="120px" cover></v-img>
              <v-card-title>{{ destino.name }}</v-card-title>
            </v-card>
          </div>
        </div>
      </v-col>

      <!-- Columna derecha -->
      <v-col cols="12" md="6" class="right-column">
        <div class="map-section">
          <SearchBar 
            class="custom-searchbar"
            @search="handleSearch"
            @error="showError"
          />

          <Mapa 
            :locations="mapLocations" 
            @location-selected="showLocationDetails"
          />

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
      </v-col>

    </v-row>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import Mapa from '@/components/Mapa.vue'

const mapLocations = ref([])
const selectedLocation = ref(null)
const locationPlans = ref([])

const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('error')

const handleSearch = (location) => {
    console.log("LOCATION : ", location)
  mapLocations.value = [location]
  selectedLocation.value = null
  locationPlans.value = []

  if (mapLocations.value.length > 0) {
    snackbarMessage.value = `Mostrando resultados para ${location.name}`
    snackbarColor.value = 'success'
    showSnackbar.value = true
    
  }

}

const showError = (message) => {
  snackbarMessage.value = message
  snackbarColor.value = 'error'
  showSnackbar.value = true
}

const showLocationDetails = (location) => {
  selectedLocation.value = location
  locationPlans.value = getSamplePlans(location.name)
}

const selectPlan = (plan) => {
  console.log('Plan seleccionado:', plan)
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

const destinos = [
  { name: 'Madrid', image: 'https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/leqb8dgct7k0p6vyi6va?_a=BACADKGT' },
  { name: 'París', image: 'https://www.101viajes.com/sites/default/files/puesta-sol-paris.jpg' }
]
</script>

<style scoped lang="scss">
.actividades-container {
  margin-top: 16px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.popular-destinations .destination-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.destination-card {
  width: 100%;
  max-width: 250px;
}

.map-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.location-plans {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}
</style>

