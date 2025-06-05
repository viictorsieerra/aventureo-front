<template>
  <v-container class="plans">
    <SearchBar class="plans__search-bar" @search="onSearch" />

    <v-row class="plans__row">
      <v-col cols="12" md="4" class="plans__col-left">
        <v-card class="plans__info-card mb-4">
          <v-card-title class="plans__info-card-title">Planifica tu aventura</v-card-title>
          <v-card-text class="plans__info-card-text">
            Aquí puedes buscar una ciudad para ver los planes que han creado otros viajeros.
            <br /><br />
            Si no encuentras ningún plan, puedes añadir el tuyo propio haciendo clic en el botón
            <v-icon color="primary" class="plans__icon mx-1">mdi-plus</v-icon>.
            <br /><br />
            Los planes incluyen nombre, duración, precio estimado y valoración, además de un comentario.
          </v-card-text>
        </v-card>

        <div v-if="locationPlans.length > 0" class="plans__location-plans">
          <h3 class="plans__location-plans-title">Planes en {{ selectedLocation?.name }}</h3>
          <v-list class="plans__list">
            <v-list-item
              v-for="plan in locationPlans"
              :key="plan.idPlan"
              @click="() => irADetalle(plan.idPlan)"
              class="plans__list-item"
              style="cursor: pointer;"
            >
              <v-list-item-content>
                <v-list-item-title class="plans__list-item-title">{{ plan.nombre }}</v-list-item-title>
                <v-list-item-subtitle class="plans__list-item-subtitle">
                  Duración: {{ plan.duracion }} días | Precio: {{ plan.precioEstimado }}€ | Valoración:
                  {{ plan.valoracion }}
                </v-list-item-subtitle>
                <p class="plans__list-item-comment">{{ plan.comentario }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-row justify="center" class="plans__btn-row mt-4">
          <v-col cols="auto">
            <v-btn
              color="primary"
              density="compact"
              class="plans__add-plan-btn"
              @click="showAddPlanDialog = true"
              title="Añadir nuevo plan"
              v-if="selectedLocation?.name && userStore.user.idUsuario"
            >
              <v-icon left class="plans__btn-icon">mdi-plus</v-icon>
              Añade un plan
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="selectedLocation && locationPlans.length === 0" class="plans__no-plans-message mt-3">
          No hay planes para {{ selectedLocation?.name }}. Pulsa el botón para crear uno.
        </div>
      </v-col>

      <v-col cols="12" md="8" class="plans__col-right">
        <Mapa
          class="plans__map"
          :locations="mapLocations"
          :initialPosition="{ lat: 40.4168, lng: -3.7038 }"
          :initialZoom="5"
          @location-selected="onLocationSelected"
        />
      </v-col>
    </v-row>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" class="plans__snackbar">
      {{ snackbarMessage }}
    </v-snackbar>

    <v-dialog v-model="showAddPlanDialog" max-width="500" class="plans__dialog">
      <v-card>
        <v-card-title class="plans__dialog-title">Añadir Plan para {{ selectedLocation?.name }}</v-card-title>
        <v-form v-model="formValid" class="plans__form">
          <v-card-text>
            <v-text-field
              v-model="newPlan.nombre"
              label="Nombre"
              :rules="rulesRequired"
              class="plans__input"
            />
            <v-text-field
              :rules="rulesNumber"
              v-model="newPlan.duracion"
              label="Duración (horas)"
              type="number"
              class="plans__input"
            />
            <v-text-field
              :rules="rulesNumber"
              v-model="newPlan.precioEstimado"
              label="Precio estimado (€)"
              type="number"
              class="plans__input"
            />

            <div class="plans__rating-container">
              <v-label class="plans__rating-label">Valoración</v-label>
              <v-rating
                v-model="newPlan.valoracion"
                length="5"
                color="amber"
                background-color="grey lighten-2"
                half-increments
                size="30"
                class="plans__rating"
              />
            </div>

            <v-textarea
              v-model="newPlan.comentario"
              label="Comentario"
              class="plans__textarea"
            />
          </v-card-text>

          <v-card-actions class="plans__actions">
            <v-btn color="primary" :disabled="!formValid" @click="guardarPlan" class="plans__btn-save">
              Guardar
            </v-btn>
            <v-btn text @click="showAddPlanDialog = false" class="plans__btn-cancel">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlans } from "@/composables/usePlans"
import type { CreatePlanDTO } from '@/composables/usePlans'
import Mapa from "@/components/Mapa.vue"
import SearchBar from "@/components/SearchBar.vue"
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'
import type { Plan } from '@/models/Plan'

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const router = useRouter()

const irADetalle = (id: any) => {
  console.log("Navegando al plan con id:", id)
  router.push(`/planes/${id}`)
}

const { getPlans, createPlan } = usePlans()

const selectedLocation = ref<Location | null>(null)
const locationPlans = ref<Plan[]>([])
const showAddPlanDialog = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const userStore = useUserStore()
const formValid = ref(false)

const newPlan = ref({
  idUsuario: userStore.user.idUsuario,
  nombre: '',
  duracion: 1,
  precioEstimado: 1,
  valoracion: 1,
  comentario: ''
})

const rulesNumber = [
  (value: number) => {
    if (value > 0)
      return true
    return 'No puede ser negativo'
  }
]

const rulesRequired = [
  (value: string) => {
    if (value) return true
    return 'Este campo es obligatorio'
  },
  (value: string) => {
    if (value?.length >= 3) return true
    return 'Tiene que haber minimo 3 caracteres'
  }
]

const mapLocations = ref<Location[]>([])

const onSearch = async (location: any) => {
  selectedLocation.value = location
  locationPlans.value = []

  try {
    const plans = await getPlans(location.name);
    locationPlans.value = plans ?? []
  } catch (error) {
    console.error('Error al buscar planes:', error);
    locationPlans.value = []
    snackbarMessage.value = 'Error al cargar los planes'
    snackbarColor.value = 'error'
    showSnackbar.value = true;
  }

  mapLocations.value = [location];
};

const onLocationSelected = (location: any) => {
  selectedLocation.value = location
}

const guardarPlan = async () => {
  if (!selectedLocation.value) return

  const dto: CreatePlanDTO = {
    idUsuario: userStore.user.idUsuario,
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

  newPlan.value = {
    idUsuario: userStore.user.idUsuario,
    nombre: '',
    duracion: 1,
    precioEstimado: 1,
    valoracion: 1,
    comentario: ''
  }

  const plans = await getPlans(selectedLocation.value.name)
  locationPlans.value = plans
}
</script>

<style scoped lang="scss">
.plans {
  &__info-card {
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    margin-top: 9%;
    color: #183263; 
  }

  &__info-card-title {
    font-weight: 700;
  }

  &__info-card-text {
    font-size: 1rem;
  }

  &__location-plans {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    margin-top: 24px;
    color: #183263; 
  }

  &__location-plans-title {
    margin-bottom: 1rem;
  }

  &__list {
    padding: 0;
  }

  &__list-item {
    padding: 1rem 0;
    border-bottom: 1px solid #eaeaea;
  }

  &__list-item-title {
    font-weight: 600;
    color: #183263;
  }

  &__list-item-subtitle {
    font-size: 0.9rem;
    color: #555;
  }

  &__list-item-comment {
    margin-top: 0.5rem;
    font-style: italic;
    color: #666;
  }

  &__btn-row {
    margin-top: 1rem;
  }

  &__add-plan-btn {
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

  &__btn-icon {
    color: white !important;
  }

  &__no-plans-message {
    margin-top: 1rem;
    font-style: italic;
    color: #999;
  }

  &__rating-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    color: #fd6f01;
  }

  &__rating-label {
    font-weight: 600;
  }



  &__textarea {
    min-height: 100px;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__btn-save {
    border-radius: 8px;
  }

  &__btn-cancel {
    border-radius: 8px;
  }

  &__snackbar {
    border-radius: 8px !important;

    &.success {
      background-color: #018ef6 !important; 
      color: white !important;
    }

    &.error {
      background-color: #fd6f01 !important; 
      color: white !important;
    }
  }

  &__map {
    height: 600px;
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.12);
  }

  &__col-left {
    padding-right: 24px;
  }

  &__col-right {
    padding-left: 24px;
  }

  &__search-bar {
    margin-bottom: 1rem;
  }
}
</style>
