<template>
  <v-container>
    <SearchBar @search="onSearch" />
    <Mapa :locations="mapLocations" :initialPosition="{ lat: 40.4168, lng: -3.7038 }" :initialZoom="5"
      @location-selected="onLocationSelected" />

    <!-- Mostrar lista de planes si hay -->
    <div v-if="locationPlans.length > 0" class="location-plans">
      <h3>Planes en {{ selectedLocation?.name }}</h3>
      <v-list>
        <v-list-item v-for="plan in locationPlans" :key="plan.id">
          <v-list-item-content>
            <v-list-item-title>{{ plan.nombre }}</v-list-item-title>
            <v-list-item-subtitle>
              Duración: {{ plan.duracion }} días | Precio: {{ plan.precioEstimado }}€ | Valoración: {{ plan.valoracion }}
            </v-list-item-subtitle>
            <p>{{ plan.comentario }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Botón para añadir plan -->
      <v-row justify="center" class="mt-4">
        <v-col cols="auto">
          <v-btn
            color="primary"
            density="compact"
            icon="mdi-plus"
            @click="showAddPlanDialog = true"
            title="Añadir nuevo plan"
          ></v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Si no hay planes, mostrar mensaje y botón solo si hay ciudad buscada -->
    <div v-else-if="selectedLocation" style="margin-top: 16px; text-align: center;">
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            density="compact"
            icon="mdi-plus"
            @click="showAddPlanDialog = true"
            title="Añadir nuevo plan"
          ></v-btn>
        </v-col>
      </v-row>
      <div>No hay planes para {{ selectedLocation?.name }}. Pulsa + para crear uno.</div>
    </div>

    <!-- Snackbar de notificación -->
    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarMessage }}
    </v-snackbar>

    <!-- Diálogo para añadir plan -->
    <v-dialog v-model="showAddPlanDialog" max-width="500">
      <v-card>
        <v-card-title>Añadir Plan para {{ selectedLocation?.name }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="newPlan.nombre" label="Nombre" />
          <v-text-field v-model="newPlan.duracion" label="Duración (días)" type="number" />
          <v-text-field v-model="newPlan.precioEstimado" label="Precio estimado (€)" type="number" />
          <v-text-field v-model="newPlan.valoracion" label="Valoración (1-5)" type="number" />
          <v-textarea v-model="newPlan.comentario" label="Comentario" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="guardarPlan">Guardar</v-btn>
          <v-btn text @click="showAddPlanDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlans, CreatePlanDTO } from "@/composables/usePlans"
import Mapa from "@/components/Mapa.vue"
import SearchBar from "@/components/SearchBar.vue"

const { getPlans, createPlan } = usePlans()

const selectedLocation = ref(null)
const locationPlans = ref([])
const showAddPlanDialog = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const newPlan = ref({
  nombre: '',
  duracion: 1,
  precioEstimado: 0,
  valoracion: 1,
  comentario: ''
})

const mapLocations = ref([])

const onSearch = async (location) => {
  selectedLocation.value = location
  const plans = await getPlans(location.name)
  locationPlans.value = plans
  mapLocations.value = [location]
}

const onLocationSelected = (location) => {
  selectedLocation.value = location
}

const guardarPlan = async () => {
  if (!selectedLocation.value) return

  const dto: CreatePlanDTO = {
    idUsuario: 1,
    lugar: selectedLocation.value.name,
    nombre: newPlan.value.nombre,
    duracion: newPlan.value.duracion,
    precioEstimado: newPlan.value.precioEstimado,
    valoracion: newPlan.value.valoracion,
    comentario: newPlan.value.comentario
  }

  await createPlan(dto)
  showSnackbar.value = true
  snackbarMessage.value = 'Plan guardado correctamente'
  snackbarColor.value = 'success'
  showAddPlanDialog.value = false

  // Limpiar datos
  newPlan.value = {
    nombre: '',
    duracion: 1,
    precioEstimado: 0,
    valoracion: 1,
    comentario: ''
  }

  // Recargar planes de esa ciudad
  const plans = await getPlans(selectedLocation.value.name)
  locationPlans.value = plans
}
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

.v-btn {
  max-width: 200px;
}
</style>
