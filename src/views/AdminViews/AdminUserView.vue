<script setup lang="ts">
import ServerTable from '@/components/ServerTable.vue';
import { useAdminUser } from '@/composables/AdminComposables/useAdminUser';
import type { HeaderTable } from '@/models/HeaderTable';
import type { IUsuario } from '@/models/Usuario';
import { computed, onMounted, ref } from 'vue';

const { getUsers, addUser, updateUser, deleteUser } = useAdminUser();

const headers = ref<HeaderTable[]>([
  { title: 'Acciones', key: 'actions', align: 'center', sortable: false },
  { title: 'IdUsuario', key: 'idUsuario', align: 'start', sortable: true },
  { title: 'Nombre', key: 'nombre', align: 'start', sortable: true },
  { title: 'Apellidos', key: 'apellidos', align: 'start', sortable: true },
  { title: 'Fecha de Nacimiento', key: 'fecNacimiento', align: 'start', sortable: true },
  { title: 'Correo', key: 'email', align: 'start', sortable: true },
  { title: 'Rol', key: 'rolAdmin', align: 'center', sortable: true }
]);

const itemsList = ref<Array<object>>([]);
const itemsPerPage = ref(5);
const password = ref('')

onMounted(async () => {
  await loadUser();
});

const dialog = ref(false);
const isEditMode = ref(false);
const editedItem = ref<IUsuario>({
  idUsuario: 0,
  nombre: '',
  apellidos: '',
  fecNacimiento: new Date,
  email: '',
  contrasena: '',
  rolAdmin: false
});

const openEditDialog = (item: any) => {
  isEditMode.value = true;
  editedItem.value = {
    ...item,
    fecNacimiento: item.fecNacimiento.split('T')[0]
  };
  dialog.value = true;
};

const openCreateDialog = () => {
  isEditMode.value = false;
  editedItem.value = {
    idUsuario: 0,
    nombre: '',
    apellidos: '',
    fecNacimiento: new Date,
    email: '',
    rolAdmin: false
  };
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const saveItem = async () => {
  editedItem.value.contrasena = password.value
  if (isEditMode.value) {
    console.log('Actualizar usuario:', editedItem.value);
    await updateUser(editedItem.value);
  } else {
    console.log('Crear nuevo usuario:', editedItem.value);
    await addUser(editedItem.value);
  }
  dialog.value = false;
  password.value = '';
  await loadUser()
};

const deleteItem = async (item: any) => {
  if (confirm(`¿Seguro que quieres eliminar a ${item.nombre}?`)) {
    console.log('Eliminar usuario:', item)
    await deleteUser(item.idUsuario)
    await loadUser()
  }
}


async function loadUser() {
   itemsList.value = await getUsers()
  console.log('USER CARGADOS', itemsList.value)
}
const passwordRules = computed(() => {
  return isEditMode.value
    ? []
    : [(v: string) => !!v || 'La contraseña es obligatoria',
    (v: string) => v.length > 3 || 'Debe tener más de 3 caracteres']
})

</script>

<template>
  <div class="user-admin">
    <h1 class="user-admin__title">Administración de los usuarios</h1>

    <v-btn class="user-admin__btn user-admin__btn--add" color="#fd6f01" @click="openCreateDialog">
      <v-icon start>mdi-plus</v-icon> Añadir Usuario
    </v-btn>

    <ServerTable class="user-admin__table" :headers="headers" :serverItems="itemsList" :items-per-page="itemsPerPage"
      :totalItems="itemsList.length" @update:items-per-page="itemsPerPage = $event">
      <template #item.actions="{ item }">
        <v-btn class="user-admin__btn-icon" size="small" icon @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="user-admin__btn-icon user-admin__btn-icon--delete" icon size="small" @click="deleteItem(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #item.idUsuario="{ item }">
        <span class="user-admin__link">{{ item.idUsuario }}</span>
      </template>

      <template #item.fecNacimiento="{ item }">
        {{ item.fecNacimiento.split('T')[0] }}
      </template>

      <template #item.rolAdmin="{ item }">
        {{ item.rolAdmin ? 'Administrador' : 'Usuario' }}
      </template>
    </ServerTable>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="user-admin__dialog">
        <v-card-title>
          <span class="user-admin__dialog-title">
            {{ isEditMode ? 'Editar Usuario' : 'Crear Usuario' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nombre" label="Nombre" />
          <v-text-field v-model="editedItem.apellidos" label="Apellidos" />
          <v-text-field v-model="editedItem.fecNacimiento" label="Fecha de Nacimiento" type="date" />
          <v-text-field v-model="editedItem.email" label="Correo Electrónico" type="email" />
          <v-text-field v-model="password" :rules="passwordRules" label="Contraseña" />
          <v-checkbox v-model="editedItem.rolAdmin" label="¿Es administrador?" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="#fd6f01" @click="saveItem">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user-admin {
  padding: 1rem;

  &__title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    font-size: 0.95rem;

    &--add {
      background-color: #fd6f01;
      color: white;
      font-weight: bold;

      &:hover {
        background-color: darken(#fd6f01, 5%);
      }
    }
  }

  &__btn-icon {
    margin: 0 0.25rem;

    &--delete {
      color: #fd6f01;
    }
  }

  &__link {
    color: #fd6f01;
    cursor: pointer;
    font-weight: bold;
  }

  &__table {
    overflow-x: auto;
    margin-bottom: 2rem;

    .v-data-table {
      min-width: 600px;
    }
  }

  &__dialog {
    padding: 0.5rem;

    &-title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .v-card-text {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .v-card-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-top: 1rem;
    }

    .v-btn {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    padding: 2rem;

    &__title {
      font-size: 2rem;
    }

    &__btn {
      width: auto;
      display: inline-flex;
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    &__btn-icon {
      margin: 0 5px;
    }

    &__dialog-title {
      font-size: 1.5rem;
    }

    &__dialog {
      .v-card-actions {
        flex-direction: row;
        justify-content: flex-end;

        .v-btn {
          width: auto;
        }
      }
    }

    &__table {
      overflow-x: unset;

      .v-data-table {
        min-width: 800px;
      }
    }
  }
}
</style>
