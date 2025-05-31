<script setup lang="ts">
// IMPORTS
import { ref, onMounted } from 'vue';
import { usePlannerGastos } from '@/composables/usePlannerGastos';
import { useUserStore } from '@/stores/UserStore';

//IMPORT TYPE DE MODELS
import type { CreateViaje, UpdateViaje } from '@/models/Viaje';
import type { CreateGasto } from '@/models/Gasto';
import Grafica from '@/components/Grafica.vue';


const { getViajes, createViaje, getCategorys, createGasto, getGastos, updateGasto, updateViaje, deleteViaje, deleteGasto, getGastoByCategoria } = usePlannerGastos();
const userStore = useUserStore();

// VARIABLES Y CONSTANTES
const viajesList = ref([]);
const formValid = ref(false);
const categorias = ref<{ idCategoria: number, nombre: string }[]>([]);
const gastosPorViaje = ref<{ [key: number]: any[] }>({});
const gastoEditando = ref<any | null>(null);
const newViaje = ref<CreateViaje>({
  idUsuario: userStore.user.idUsuario,
  nombre: '',
  personas: 0,
  cantidadTotal: 0
});
const newGasto = ref<CreateGasto>({
  idViaje: 0,
  idCategoria: 0,
  nombre: '',
  cantidad: 0
});

const gastoCategoriasPorViaje = ref<{ [key: number]: any[] }>({});
const viajeSeleccionadoParaGrafica = ref<number | null>(null);


// REGLAS
const rulesNewViaje = {
  nombre: (value: string) => value.length > 3 || 'Debe haber más de 3 caracteres',
  personas: (value: number) => value >= 1 || 'Debe haber mínimo una persona',
  cantidadTotal: (value: number) => value >= 0 || 'No puede ser negativo'
};

const rulesNewGasto = {
  nombre: (value: string) => value.length > 2 || 'Nombre demasiado corto',
  cantidad: (value: number) => value >= 0 || 'Cantidad inválida'
};

onMounted(() => {
  cargarViajes();
  cargarCategorias();
});

// FUNCIONES
async function cargarViajes() {
  viajesList.value = await getViajes();
}

async function cargarCategorias() {
  categorias.value = await getCategorys();
}

async function sendNewViaje(isActive: { value: boolean }) {
  await createViaje(newViaje.value);
  await cargarViajes();
  newViaje.value = {
    idUsuario: userStore.user.idUsuario,
    nombre: '',
    personas: 0,
    cantidadTotal: 0
  };
  isActive.value = false;
}

async function toggleGastos(idViaje: number) {
  if (gastosPorViaje.value[idViaje]) {
    delete gastosPorViaje.value[idViaje];
  } else {
    gastosPorViaje.value[idViaje] = await getGastos(idViaje);
    console.log('GASTOS POR VIAJE', gastosPorViaje.value[idViaje])
  }
}

async function sendNewGasto(idViaje: number, isActive: { value: boolean }) {
  newGasto.value.idViaje = idViaje;
  await createGasto(newGasto.value);
  gastosPorViaje.value[idViaje] = await getGastos(idViaje);
  isActive.value = false;
  newGasto.value = {
    idViaje,
    idCategoria: 0,
    nombre: '',
    cantidad: 0
  };
}

async function verGraficaDeGastos(idViaje: number) {
  if (gastoCategoriasPorViaje.value[idViaje]) {
    delete gastoCategoriasPorViaje.value[idViaje];
  } else {
    gastoCategoriasPorViaje.value[idViaje] = await getGastoByCategoria(idViaje);
    console.log('GASTOS POR CATEGORIA', gastoCategoriasPorViaje.value[idViaje])
  }
}

</script>

<template>
  <div class="gastos">
    <h1 class="text-2xl font-bold mb-6">Mis Viajes</h1>

    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="viaje in viajesList" :key="viaje.idViaje">
          <v-card elevation="2" class="pa-4">
            <!-- Encabezado y acciones -->
            <v-dialog max-width="500">
              <template #activator="{ props }">
                <v-card-title class="d-flex justify-space-between align-center">
                  <span class="font-weight-medium">{{ viaje.nombre }}</span>
                  <v-btn icon size="small" @click="toggleGastos(viaje.idViaje!); verGraficaDeGastos(viaje.idViaje)">
                    <v-icon>{{ gastosPorViaje[viaje.idViaje!] ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                  </v-btn>
                  <v-btn v-bind="props" icon="mdi-pencil" size="small"></v-btn>
                  <v-btn icon="mdi-delete" size="small" @click="deleteViaje(viaje.idViaje).then(() =>cargarViajes())"></v-btn>
                </v-card-title>
                <v-card-subtitle>
                  Personas: {{ viaje.personas }}<br />
                  Presupuesto: {{ viaje.cantidadTotal }} €
                </v-card-subtitle>
              </template>

              <!-- Formulario de edición -->
              <template #default="{ isActive }">
                <v-card>
                  <v-card-title>Editar Viaje</v-card-title>
                  <v-card-text>
                    <v-form v-model="formValid">
                      <v-text-field v-model="viaje.nombre" label="Nombre" :rules="[rulesNewViaje.nombre]" />
                      <v-text-field v-model="viaje.personas" type="number" label="Personas"
                        :rules="[rulesNewViaje.personas]" />
                      <v-text-field v-model="viaje.cantidadTotal" type="number" label="Gasto estimado (€)"
                        :rules="[rulesNewViaje.cantidadTotal]" />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="#0288D1" :disabled="!formValid"
                      @click="updateViaje(viaje); isActive.value = false">Guardar</v-btn>
                    <v-btn @click="isActive.value = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <!-- Lista de gastos -->
            <v-expand-transition>
              <div v-if="gastosPorViaje[viaje.idViaje!]">
                <v-divider class="my-2" />
                <div class="gasto-item" v-for="gasto in gastosPorViaje[viaje.idViaje!]" :key="gasto.idGasto">
                  <v-card class="mb-2" outlined>
                    <v-card-text class="py-2 px-3">
                      <div class="d-flex justify-space-between align-center">
                        <div>
                          <strong>{{ gasto.nombre }}</strong><br />
                          <small class="text-grey">{{ gasto.categoria }}</small>
                        </div>
                        <div class="font-weight-bold">
                          {{ gasto.cantidad }} €
                          <v-btn icon size="x-small" @click="gastoEditando = { ...gasto }">
                            <v-icon size="16">mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon size="x-small" @click="deleteGasto(gasto.idGasto).then(() => toggleGastos(viaje.idViaje!))">
                            <v-icon size="16">mdi-delete</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-expand-transition>

            <!-- Añadir gasto -->
            <v-dialog max-width="500">
              <template #activator="{ props }">
                <v-btn class="mt-3" block color="#0288D1" variant="tonal" v-bind="props">Añadir gasto</v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card>
                  <v-card-title>Nuevo gasto</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field v-model="newGasto.nombre" label="Nombre del gasto"
                        :rules="[rulesNewGasto.nombre]" />
                      <v-text-field v-model="newGasto.cantidad" type="number" label="Cantidad (€)"
                        :rules="[rulesNewGasto.cantidad]" />
                      <v-select v-model="newGasto.idCategoria" :items="categorias" item-value="idCategoria"
                        item-title="nombre" label="Categoría" />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="#0288D1" @click="sendNewGasto(viaje.idViaje!, isActive)">Guardar</v-btn>
                    <v-btn @click="isActive.value = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <!-- EDITAR GASTO -->
            <v-dialog v-model="gastoEditando" max-width="500" persistent>
              <v-card v-if="gastoEditando">
                <v-card-title>Editar gasto</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="gastoEditando.nombre" label="Nombre del gasto"
                      :rules="[rulesNewGasto.nombre]" />
                    <v-text-field v-model="gastoEditando.cantidad" type="number" label="Cantidad (€)"
                      :rules="[rulesNewGasto.cantidad]" />
                    <v-select v-model="gastoEditando.idCategoria" :items="categorias" item-value="idCategoria"
                      item-title="nombre" label="Categoría" />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="#0288D1" @click="updateGasto(gastoEditando).then(() => toggleGastos(viaje.idViaje!)); gastoEditando = null">Guardar</v-btn>
                  <v-btn @click="gastoEditando = null">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-expand-transition>
              <div v-if="gastosPorViaje[viaje.idViaje!]">
                <Grafica :datos="gastoCategoriasPorViaje[viaje.idViaje] || []"   :key="viaje.idViaje" />
              </div>
            </v-expand-transition>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Botón de nuevo viaje -->
    <v-dialog max-width="500">
      <template #activator="{ props }">
        <v-btn icon="mdi-plus" class="gastos__btn-add" color="#0288D1" v-bind="props" />
      </template>
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Nuevo Viaje</v-card-title>
          <v-card-text>
            <v-form v-model="formValid">
              <v-text-field v-model="newViaje.nombre" label="Nombre" :rules="[rulesNewViaje.nombre]" />
              <v-text-field v-model="newViaje.personas" type="number" label="Personas"
                :rules="[rulesNewViaje.personas]" />
              <v-text-field v-model="newViaje.cantidadTotal" type="number" label="Gasto estimado (€)"
                :rules="[rulesNewViaje.cantidadTotal]" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="#0288D1" :disabled="!formValid" @click="sendNewViaje(isActive)">Guardar</v-btn>
            <v-btn @click="isActive.value = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.gastos {
  padding: 1.5rem;
  background-color: #f9fbfc;
  min-height: 100vh;

  &__btn-add {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
  }
}

.v-card {
  border-radius: 16px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

.v-card-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #444;
}

.v-card-subtitle {
  font-size: 0.9rem;
  color: #666;
}

.v-btn {
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 500;
}

.v-dialog .v-card {
  padding: 1rem 1.5rem;
}

.v-text-field,
.v-select {
  margin-bottom: 1rem;
}

.v-card-actions {
  padding-top: 0;
}

.gasto-item {
  font-size: 0.9rem;

  .v-card {
    background-color: #ffffff;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .v-card-text {
    padding: 0.75rem 1rem;
  }

  strong {
    font-size: 1rem;
    color: #222;
  }

  small.text-grey {
    font-size: 0.8rem;
    color: #888;
  }

  .font-weight-bold {
    font-weight: 600;
    color: #333;
  }

  .v-btn {
    margin-left: 4px;
    color: #0288D1;
  }
}
</style>
