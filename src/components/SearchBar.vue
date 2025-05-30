<template>
  <div class="search-bar">
    <v-text-field
      v-model="searchQuery"
      density="compact"
      clearable
      hide-details
      variant="outlined"
      placeholder="Buscar destino"
      @keyup.enter="search"
      :loading="isLoading"
    >
      <template #append-inner>
        <v-icon
          class="search-icon"
          @click="search"
          role="button"
          tabindex="0"
          @keydown.enter="search"
          aria-label="Buscar"
        >mdi-magnify</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'error'])
const searchQuery = ref('')
const isLoading = ref(false)

const search = async () => {
  if (!searchQuery.value.trim()) return

  isLoading.value = true

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery.value
      )}&format=json&addressdetails=1&limit=1`, {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    )

    const data = await response.json()

    if (data.length > 0) {
      const location = {
        name: data[0].display_name.split(',')[0],
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      }
      emit('search', location)
    } else {
      emit('error', 'No se encontraron resultados')
    }
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
