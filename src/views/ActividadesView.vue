<template>
  <v-container fluid>
    <div class="actividades-container">
     
      <div class="info-section">
        <h2>Explora nuevas aventuras</h2>
        <p>
          En esta ventana, puedes buscar el lugar al que quieras viajar y descubrir las actividades o planes que otras
          personas han compartido. Encuentra experiencias únicas, lugares imperdibles y recomendaciones de otros
          viajeros.
        </p>

    
        <div class="popular-destinations">
          <h3>Destinos más populares</h3>
          <div class="destination-list">
            <v-card v-for="destino in destinos" :key="destino.name" class="destination-card">
              <v-img :src="destino.image" height="120px" cover></v-img>
              <v-card-title>{{ destino.name }}</v-card-title>
            </v-card>
          </div>
        </div>
      </div>

      
      <div class="map-section">
  <SearchBar 
    class="custom-searchbar"
    @search="handleSearch"
    @error="showError"
  />
  <Mapa 
    :locations="mapLocations" 
    @location-selected="showLocationDetails"
    @plan-selected="showPlanDetails"
  />
</div>

    </div>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import Mapa from '@/components/Mapa.vue'

const mapLocations = ref([])
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('error')

const handleSearch = (location) => {
  mapLocations.value = [location]

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
  console.log('Ubicación seleccionada:', location)
}

const showPlanDetails = (plan) => {
  console.log('Plan seleccionado:', plan)
}


const destinos = [
  { name: 'Madrid', image: 'https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/leqb8dgct7k0p6vyi6va?_a=BACADKGT' },
  { name: 'París', image: 'https://www.101viajes.com/sites/default/files/puesta-sol-paris.jpg' }

]
console.log('hola')
console.log('BASE URL:', import.meta.env.VITE_API_BASE_URL);
</script>

<style scoped>
.actividades-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.info-section {
  text-align: center;
  padding: 1rem;
  background: #c8ecff;
  border-radius: 12px;
}

.info-section h2 {
  margin-bottom: 0.5rem;
}

.info-section p {
  color: #555;
  font-size: 1rem;
}


.popular-destinations {
  margin-top: 2rem;
}

.popular-destinations h3 {
  margin-bottom: 1rem;
}

.destination-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.destination-card {
  overflow: hidden;
}


@media (min-width: 960px) {
  .actividades-container {
    flex-direction: row;
    gap: 2rem;
  }

  .info-section {
    flex: 1;
    text-align: left;
  }

  .map-section {
    flex: 2;
    display: flex;
    flex-direction: column;
     gap: 0px;
  }
  .custom-searchbar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

}
</style>
