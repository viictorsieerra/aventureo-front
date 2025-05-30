<template>
  <v-container>
    <v-card v-if="plan">
      <v-card-title>{{ plan.nombre }}</v-card-title>
      <v-card-subtitle>Lugar: {{ plan.lugar }}</v-card-subtitle>

      <v-card-text>
        <p><strong>Duración:</strong> {{ plan.duracion }} días</p>
        <p><strong>Precio estimado:</strong> {{ plan.precioEstimado }}€</p>
        <p><v-rating :model-value="plan.valoracion" color="amber" density="compact" size="small" half-increments readonly /></p>
        <p><strong>Comentario:</strong> {{ plan.comentario }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" class="btn-primary" @click="volver">Volver</v-btn>
      </v-card-actions>
    </v-card>

    <v-alert v-else type="info" text> Cargando plan... </v-alert>

    <!-- Actividades -->
    <v-card class="mt-4" v-if="partePlans.length > 0">
      <v-card-title>Actividades del Plan</v-card-title>
      <v-list>
        <v-list-item v-for="parte in partePlans" :key="parte.idPartePlan">
          <v-list-item-title>{{ parte.nombre }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ parte.ubicacion }} | {{ parte.precio }}€ | {{ parte.comentario }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

    <v-alert v-else type="info" text class="mt-4"> Este plan aún no tiene actividades. </v-alert>

    <!-- Botón añadir actividad -->
    <v-btn color="primary" class="mt-4 btn-primary" @click="showAddDialog = true">Añadir Actividad</v-btn>

    <!-- Dialogo añadir actividad -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title>Añadir Actividad</v-card-title>
        <v-card-text>
          <v-text-field v-model="newParte.nombre" label="Nombre" />
          <v-text-field v-model="newParte.ubicacion" label="Ubicación" />
          <v-text-field v-model="newParte.precio" label="Precio (€)" type="number" />
          <v-textarea v-model="newParte.comentario" label="Comentario" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="btn-primary" @click="guardarPartePlan">Guardar</v-btn>
          <v-btn text @click="showAddDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlans } from '@/composables/usePlans'
import { usePartePlanes, CreatePartePlanDTO } from '@/composables/usePartePlanes'

const route = useRoute()
const router = useRouter()
const { getPlanById } = usePlans()
const { getPartePlansByPlanId, createPartePlan } = usePartePlanes()

const plan = ref(null)
const partePlans = ref([])

const showAddDialog = ref(false)
const newParte = ref({
  nombre: '',
  ubicacion: '',
  precio: 0,
  comentario: ''
})

const cargarDatos = async () => {
  const id = Number(route.params.id)
  plan.value = await getPlanById(id)
  partePlans.value = await getPartePlansByPlanId(id)
}

onMounted(cargarDatos)

const guardarPartePlan = async () => {
  const idPlan = Number(route.params.id)

  const dto: CreatePartePlanDTO = {
    idPlan,
    nombre: newParte.value.nombre,
    ubicacion: newParte.value.ubicacion,
    precio: newParte.value.precio,
    comentario: newParte.value.comentario
  }

  await createPartePlan(dto)
  showAddDialog.value = false
  newParte.value = { nombre: '', ubicacion: '', precio: 0, comentario: '' }
  partePlans.value = await getPartePlansByPlanId(idPlan)
}

const volver = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.v-btn.btn-primary {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  max-width: 200px;
  transition: background-color 0.3s ease;
  background-color: #183263 !important;
  color: white !important;

  &:hover {
    background-color: #121f42 !important;
  }
}
</style>
