<template>
  <v-container>
    <SearchBar @search="onSearch" />

    <v-row>
      <!-- Columna izquierda: explicación + planes + botón -->
      <v-col cols="12" md="4">
        <v-card class="info-card mb-4">
          <v-card-title>Planifica tu aventura</v-card-title>
          <v-card-text>
            Aquí puedes buscar una ciudad para ver los planes que han creado otros viajeros.
            <br /><br />
            Si no encuentras ningún plan, puedes añadir el tuyo propio haciendo clic en el botón
            <v-icon color="primary" class="mx-1">mdi-plus</v-icon>.
            <br /><br />
            Los planes incluyen nombre, duración, precio estimado y valoración, además de un comentario.
          </v-card-text>
        </v-card>

        <div v-if="locationPlans.length > 0" class="location-plans">
          <h3>Planes en {{ selectedLocation?.name }}</h3>
          <v-list>
            <v-list-item
              v-for="plan in locationPlans"
              :key="plan.idPlan"
              @click="() => irADetalle(plan.idPlan)"
              style="cursor: pointer;"
            >
              <v-list-item-content>
                <v-list-item-title>{{ plan.nombre }}</v-list-item-title>
                <v-list-item-subtitle>
                  Duración: {{ plan.duracion }} días | Precio: {{ plan.precioEstimado }}€ | Valoración:
                  {{ plan.valoracion }}
                </v-list-item-subtitle>
                <p>{{ plan.comentario }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-row justify="center" class="mt-4">
          <v-col cols="auto">
            <v-btn
              color="primary"
              density="compact"
              class="add-plan-btn"
              @click="showAddPlanDialog = true"
              title="Añadir nuevo plan"
            >
              <v-icon left>mdi-plus</v-icon>
              Añade un plan
            </v-btn>
          </v-col>
        </v-row>

        <!-- Si no hay planes pero ya hay una ubicación seleccionada -->
        <div v-if="selectedLocation && locationPlans.length === 0" class="no-plans-message mt-3">
          No hay planes para {{ selectedLocation?.name }}. Pulsa el botón para crear uno.
        </div>
      </v-col>

      <!-- Columna derecha: Mapa -->
      <v-col cols="12" md="8">
        <Mapa
          :locations="mapLocations"
          :initialPosition="{ lat: 40.4168, lng: -3.7038 }"
          :initialZoom="5"
          @location-selected="onLocationSelected"
        />
      </v-col>
    </v-row>

    <!-- Snackbar -->
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
          <div class="valoracion-container">
            <v-label>Valoración</v-label>
            <v-rating
              v-model="newPlan.valoracion"
              length="5"
              color="amber"
              background-color="grey lighten-2"
              half-increments
              size="30"
            />
          </div>
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
import { usePlans} from "@/composables/usePlans"
import type { CreatePlanDTO } from '@/composables/usePlans'
import Mapa from "@/components/Mapa.vue"
import SearchBar from "@/components/SearchBar.vue"
import { useRouter } from 'vue-router'

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface Plan {
  idPlan: number
}


const router = useRouter()

const irADetalle = (id: any) => {
  console.log("Navegando al plan con id:", id)
  router.push(`/planes/${id}`)
}

const { getPlans, createPlan } = usePlans()

const selectedLocation = ref<Location | null>(null)
const locationPlans = ref()
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

const mapLocations = ref<Location[]>([])


const onSearch = async (location : any) => {
  selectedLocation.value = location
  const plans = await getPlans(location.name)
  locationPlans.value = plans
  mapLocations.value = [location]
}

const onLocationSelected = (location: any) => {
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
.info-card {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  margin-top: 9%;
  color: #183263; /* azul oscuro */
}

.location-plans {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
  color: #183263; /* azul oscuro */
}

.valoracion-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #fd6f01; /* naranja */
}

.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 12px 16px !important;
  font-size: 1.2rem !important;
  max-width: none !important;
  transition: background-color 0.3s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  min-width: 140px !important;
  user-select: none !important;
}

.v-btn.btn-primary {
  background-color: #0288d1 !important; /* azul claro */
  color: white !important;
}

.v-btn.btn-primary:hover {
  background-color: #0277bd !important; /* azul más oscuro */
}

/* Icono dentro del botón */
.v-btn .v-icon {
  color: white !important;
}

/* Snackbar */
.v-snackbar {
  border-radius: 8px !important;
  &.success {
    background-color: #018ef6 !important; /* azul claro */
    color: white !important;
  }
  &.error {
    background-color: #d9534f !important; /* rojo para error */
    color: white !important;
  }
}

</style>
