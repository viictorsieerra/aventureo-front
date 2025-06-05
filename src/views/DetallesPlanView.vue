<template>
  <div class="detalles-plan">
    <v-container>
      <v-card v-if="plan">
        <v-card-title>{{ plan.nombre }}</v-card-title>
        <v-card-subtitle>Lugar: {{ plan.lugar }}</v-card-subtitle>

        <v-card-text>
          <p><strong>Duración:</strong> {{ plan.duracion }} horas</p>
          <p><strong>Precio estimado:</strong> {{ plan.precioEstimado }}€</p>
          <p>
            <v-rating
              :model-value="plan.valoracion"
              color="amber"
              density="compact"
              size="small"
              half-increments
              readonly
            />
          </p>
          <p><strong>Comentario:</strong> {{ plan.comentario }}</p>
        </v-card-text>

        <v-card-actions v-if="userStore.user.idUsuario == plan.idUsuario || userStore.user.rolAdmin">
          <v-btn color="primary" class="detalles-plan__btn-primary" @click="showEditPlanDialog = true">Editar</v-btn>
          <v-btn color="primary" class="detalles-plan__btn-primary" @click="deletePlanSelected()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>

      <v-alert v-else type="info"> Cargando plan... </v-alert>

      <v-card class="mt-4" v-if="partePlans.length > 0">
        <v-card-title>Actividades del Plan</v-card-title>
        <v-list>
          <v-list-item v-for="parte in partePlans" :key="parte.idPartePlan">
            <v-divider></v-divider>
            <v-list-item-title>{{ parte.nombre }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ parte.ubicacion }} | {{ parte.precio }}€ | {{ parte.comentario }}
            </v-list-item-subtitle>
            <v-card-actions v-if="userStore.user.idUsuario == plan.idUsuario || userStore.user.rolAdmin">
              <v-btn color="#183263" icon="mdi-pencil" size="small" @click="openEditDialog(parte)" />
              <v-btn color="#fd6f01" icon="mdi-delete" size="small" @click="deleteActivity(parte)" />
            </v-card-actions>
          </v-list-item>
        </v-list>
      </v-card>

      <v-alert v-else type="info" class="mt-4"> Este plan aún no tiene actividades. </v-alert>

      <v-card-actions>
        <v-btn color="primary" class="mt-4 detalles-plan__btn-primary" @click="volver">Volver</v-btn>
        <v-btn
          color="primary"
          v-if="userStore.user.idUsuario == plan.idUsuario || userStore.user.rolAdmin"
          class="mt-4 detalles-plan__btn-primary"
          @click="showAddDialog = true"
        >
          Añadir Actividad
        </v-btn>
      </v-card-actions>

      <v-dialog v-model="showAddDialog" max-width="500">
        <v-card>
          <v-card-title>Añadir Actividad</v-card-title>
          <v-card-text>
            <v-form v-model="formValidAddActivity">
              <v-text-field v-model="newParte.nombre" :rules="rulesRequired" label="Nombre" />
              <v-text-field v-model="newParte.ubicacion" :rules="rulesRequired" label="Ubicación" />
              <v-text-field v-model="newParte.precio" label="Precio (€)" :rules="rulesNumber" type="number" />
              <v-textarea v-model="newParte.comentario" label="Comentario" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="!formValidAddActivity" @click="guardarPartePlan">Guardar</v-btn>
            <v-btn text @click="showAddDialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Editar actividad -->
      <v-dialog v-model="showEditDialog" max-width="500">
        <v-card>
          <v-card-title>Editar Actividad</v-card-title>
          <v-card-text>
            <v-form v-model="formValidEditActivity">
              <v-text-field v-model="editParte.nombre" :rules="rulesRequired" label="Nombre" />
              <v-text-field v-model="editParte.ubicacion" :rules="rulesRequired" label="Ubicación" />
              <v-text-field v-model="editParte.precio" label="Precio (€)" :rules="rulesNumber" type="number" />
              <v-textarea v-model="editParte.comentario" label="Comentario" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="!formValidEditActivity" @click="editActivity">Guardar</v-btn>
            <v-btn text @click="showEditDialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEditPlanDialog" max-width="500">
        <v-card>
          <v-card-text>
            <v-form v-model="formValidPlan">
              <v-text-field v-model="plan.nombre" :rules="rulesRequired" label="Nombre" />
              <v-text-field v-model="plan.duracion" :rules="rulesNumber" label="Duración (horas)" type="number" />
              <v-text-field v-model="plan.precioEstimado" :rules="rulesNumber" label="Precio estimado (€)" type="number" />
              <div class="detalles-plan__valoracion-container">
                <v-label>Valoración</v-label>
                <v-rating
                  v-model="plan.valoracion"
                  length="5"
                  color="amber"
                  background-color="grey lighten-2"
                  half-increments
                  size="30"
                />
              </div>
              <v-textarea v-model="plan.comentario" label="Comentario" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!formValidPlan" color="primary" @click="guardarPlan">Guardar</v-btn>
            <v-btn text @click="showEditPlanDialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.detalles-plan {
  padding: 1.5rem;
  background-color: #f9fbfc;
  min-height: 55vh;
  position: relative;

  &__btn-primary {
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

  &__valoracion-container {
    margin-top: 1rem;
  }
}
</style>
