<template>
    <div>
      <SearchBar 
        @search="handleSearch"
        @error="showError"
      />
      <Mapa 
        :locations="mapLocations" 
        @location-selected="showLocationDetails"
        @plan-selected="showPlanDetails"
      />
      
      <v-snackbar v-model="showSnackbar" :color="snackbarColor">
        {{ snackbarMessage }}
      </v-snackbar>
    </div>
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
  </script>