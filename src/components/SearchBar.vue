<template>
  <div class="search-bar">
    <v-text-field v-model="searchQuery" density="compact" clearable hide-details variant="outlined"
      placeholder="Buscar destino" @keyup.enter="search" :loading="isLoading">
      <template #append-inner>
        <v-icon class="search-icon" @click="search" role="button" tabindex="0" @keydown.enter="search"
          aria-label="Buscar">mdi-magnify</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { EnvironmentVariablesEnum, getEnvironmentVariable } from '@/helpers/EnvironmentVariablesHelpers'
import { ref } from 'vue'

const emit = defineEmits(['search', 'error'])
const searchQuery = ref('')
const isLoading = ref(false)

const search = async () => {
  const url = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Map/'
  console.log('QUERY ', searchQuery.value)
  if (!searchQuery.value.trim()) return

  isLoading.value = true
  try {
    fetch(url + searchQuery.value)
      .then(res => res.json())
      .then(data => {
        const location = {
          name: data.name,
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lon)
        }
        emit('search', location)
      })
      .catch(error => emit('error', 'No se encontraron resultados'))
  } catch (error) {
    emit('error', 'Error al buscar la ubicación')
    console.error('Search error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.search-bar {
  padding: 16px;
  max-width: 500px;
  min-width: 300px;
  margin: 0 auto;
}

.search-icon {
  cursor: pointer;
  transition: color 0.3s ease;
}

.search-icon:hover,
.search-icon:focus {
  color: #0288d1;
  outline: none;
}
</style>
