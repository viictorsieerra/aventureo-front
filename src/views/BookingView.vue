<script setup lang="ts">
import { ref } from 'vue';
import { usePlaces, type Place, type QueryPlaces } from '@/composables/usePlaces';
import Mapa from '@/components/Mapa.vue';
import SearchBar from '@/components/SearchBar.vue';

const { GetPlacesByQuery, GetInfoPlace } = usePlaces()



const alojamientos = ref<(Place | null)[]>([])
const alojamientoSelected = ref<Place | null>(null)
const mapLocations = ref([])
const selectedLocation = ref(null)
const radiusSearch = ref(1)

const expandedCardId = ref<string | null>(null)

const showInfoPlace = async (placeId: string) => {
  expandedCardId.value = expandedCardId.value === placeId ? null : placeId

  const index = alojamientos.value.findIndex(p => p?.place_id === placeId)

  if (index !== -1) {
    const alojamiento = alojamientos.value[index]

    const faltaInfo =
      !alojamiento?.international_phone_number ||
      !alojamiento.website ||
      !alojamiento.url

    if (faltaInfo) {
      const infoCompleta = await GetInfoPlace(placeId)
      
      if (infoCompleta) {
        alojamientos.value[index] = { ...alojamiento, ...infoCompleta }
        alojamientoSelected.value = alojamientos.value[index]
      }
    } else {
      alojamientoSelected.value = alojamiento
    }
  }
  
  console.log('INFO DEL SITIO: ', alojamientoSelected.value)
}

const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('error')

const handleSearch = async (location) => {
  mapLocations.value = [location]
  selectedLocation.value = null

  if (mapLocations.value.length > 0) {
    snackbarMessage.value = `Mostrando resultados para ${location.name}`
    snackbarColor.value = 'success'
    showSnackbar.value = true
  }
  const query: QueryPlaces = {
    location: location.lat + ", " + location.lng,
    radius: radiusSearch.value * 1000
  }
  console.log('QUERY', query)
  alojamientos.value = await GetPlacesByQuery(query)
  console.log('ALOJAMIENTOS', alojamientos.value)

}

const showError = (message) => {
  snackbarMessage.value = message
  snackbarColor.value = 'error'
  showSnackbar.value = true
}

const showLocationDetails = (location) => {
  console.log("LOCATION ", location)
  selectedLocation.value = location
}

</script>

<template>
  <div class="booking">
    <v-col class="booking__map-column d-flex justify-center">
      <div class="booking__map-section">
        <v-row class="booking__controls align-center mb-4" no-gutters>
          <v-col cols="7">
            <SearchBar class="booking__searchbar" @search="handleSearch" @error="showError" />
          </v-col>
          <v-col cols="5">
            <div class="booking__slider">
              <div class="booking__slider-label">RADIUS {{ radiusSearch }} (KM)</div>
              <v-slider v-model="radiusSearch" :max="10" :min="1" :step="1" color="#0288D1" thumb-label width="330px" />
            </div>
          </v-col>
        </v-row>

        <Mapa :locations="mapLocations" @location-selected="showLocationDetails" />
      </div>
    </v-col>

    <v-row class="booking__cards">
      <v-col v-for="alojamiento in alojamientos" :key="alojamiento.place_id" cols="12" sm="6" md="4"
        class="booking__card-col">
        <v-card class="booking__card">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="#0288D1" height="4" indeterminate />
          </template>

          <v-card-item>
            <v-card-title>{{ alojamiento.name }}</v-card-title>
            <v-card-subtitle>
              <span class="booking__location">{{ alojamiento.vicinity }}</span>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :model-value="alojamiento.rating" color="amber" density="compact" size="small" half-increments
                readonly />
              <div class="booking__rating-text">
                {{ alojamiento.rating }} ({{ alojamiento.user_ratings_total }})
              </div>
            </v-row>
          </v-card-text>

          <v-divider />
          <v-card-actions>
            <v-btn color="#0288D1" text="Más detalle" block border @click="showInfoPlace(alojamiento.place_id)"></v-btn>
          </v-card-actions>

          <div v-if="expandedCardId === alojamiento.place_id">
            <v-divider></v-divider>
            <v-card-text>
              {{ alojamiento?.international_phone_number }}
              <a :href="alojamiento.url" target="_blank" rel="noopener" class="text-decoration-none"> {{ alojamiento?.url }} </a>
              {{ alojamiento?.website }}
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<style scoped lang="scss">
.booking {
  padding-inline: 1rem;

  &__map-section {
    width: 100%;
  }

  &__controls {
    margin: 20px;
  }

  &__slider {
    display: grid;
    justify-items: center;


    &-label {
      font-weight: 500;
    }
  }

  &__searchbar {
    width: 100%;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
    align-items: flex-start;
  }

  &__card-col {
    display: flex;
    justify-content: center;
    flex: 1 1 100%;
    max-width: 100%;
    padding: 0.5rem;
  }

  &__card {
    max-width: 374px;
    width: 100%;
    margin: 0 auto;
  }

  &__location {
    margin-right: 0.5rem;
  }

  &__rating-text {
    color: #757575;
    margin-left: 1rem;
  }

  &__category {
    margin: 1rem 0;
    font-weight: 500;
  }

  &__description {
    color: #555;
  }

  @media (min-width: 600px) {
    &__card-col {
      flex: 1 1 48%;
      max-width: 48%;
    }
  }

  @media (min-width: 900px) {
    &__card-col {
      flex: 1 1 30%;
      max-width: 30%;
    }
  }
}
</style>
