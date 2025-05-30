<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlaces, type QueryPlaces } from '@/composables/usePlaces';
import Mapa from '@/components/Mapa.vue';
import SearchBar from '@/components/SearchBar.vue';

const { GetPlacesByQuery } = usePlaces()



const alojamientos = ref();
const mapLocations = ref([])
const selectedLocation = ref(null)
const radiusSearch = ref(1)

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
    <v-col class="right-column d-flex justify-center">
        <div class="map-section" style="width: 100%;">

            <!-- SearchBar y Slider en una misma fila -->
            <v-row class="align-center mb-4" no-gutters>
                <v-col cols="7">
                    <SearchBar class="custom-searchbar" @search="handleSearch" @error="showError" />
                </v-col>

                <v-col cols="5">
                    <div class="booking__slider">
                        <div class="mb-2 font-weight-medium">RADIUS (KM)</div>
                        <v-slider v-model="radiusSearch" :max="10" :min="1" :step="1" color="#0288D1" thumb-label />
                    </div>
                </v-col>
            </v-row>

            <!-- Mapa debajo -->
            <Mapa :locations="mapLocations" @location-selected="showLocationDetails" />

        </div>
    </v-col>

    <v-col v-for="alojamiento in alojamientos" :key="alojamiento.place_id" cols="12" sm="6" md="4">

        <v-card class="mx-auto my-12" max-width="374">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" src="https://i.pinimg.com/736x/88/a9/8c/88a98ce61ce7f5e6b750c263453c78ec.jpg"
                cover></v-img>

            <v-card-item>
                <v-card-title>{{ alojamiento.name }}</v-card-title>

                <v-card-subtitle>
                    <span class="me-1">{{ alojamiento.vicinity }}</span>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :model-value="alojamiento.rating" color="amber" density="compact" size="small"
                        half-increments readonly></v-rating>

                    <div class="text-grey ms-4">{{ alojamiento.rating }} ({{ alojamiento.user_ratings_total }})</div>
                </v-row>

                <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

                <div>
                    Small plates, salads & sandwiches - an intimate setting with 12 indoor
                    seats plus patio seating.
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-title>Tonight's availability</v-card-title>
        </v-card>

    </v-col>
</template>

<style lang="scss">

</style>