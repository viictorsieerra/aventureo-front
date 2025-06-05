<script setup lang="ts">
import ServerTable from '@/components/ServerTable.vue';
import { useAdminCategory } from '@/composables/AdminComposables/useAdminCategory';
import type { Category } from '@/models/Category';
import type { HeaderTable } from '@/models/HeaderTable';
import { onMounted, ref } from 'vue';
import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';

const { getCategorys, addCategory, updateCategory, deleteCategory } = useAdminCategory()

const headers = ref<HeaderTable[]>([
  { title: 'Acciones', key: 'actions', align: 'center', sortable: false },
  { title: 'IdCategoria', key: 'idCategoria', align: 'center', sortable: true },
  { title: 'Nombre', key: 'nombre', align: 'start', sortable: true },
  { title: 'Descripción', key: 'descripcion', align: 'start', sortable: false }
]);

const itemsList = ref<Category[]>([]);
const itemsListView = ref<Category[]>([])
const itemsPerPage = ref(5);
const actualPage = ref(1);
const sortBy = ref<SortItem[]>([])

onMounted(async () => {
  await loadItems()
});

const loadItems = async () => {
  itemsList.value = await getCategorys();
  itemsPaginated()
}
const deleteItem = async (item: any) => {
  if (confirm(`¿Seguro que quieres eliminar a ${item.nombre}?`)) {
    console.log('Eliminar categoria:', item);
    await deleteCategory(item.idCategoria)
    await loadItems()
  }
};


const dialog = ref(false);
const isEditMode = ref(false);
const editedItem = ref<Category>({
  idCategoria: 0,
  nombre: '',
  descripcion: ''
});

const openEditDialog = (item: any) => {
  isEditMode.value = true;
  editedItem.value = { ...item };
  dialog.value = true;
};

const openCreateDialog = () => {
  isEditMode.value = false;
  editedItem.value = {
    idCategoria: 0,
    nombre: '',
    descripcion: ''
  };
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const saveItem = async () => {
  if (isEditMode.value) {
    console.log('Actualizar categoría:', editedItem.value);
    await updateCategory(editedItem.value)
  } else {
    console.log('Crear nueva categoría:', editedItem.value);
    await addCategory(editedItem.value);
  }
  dialog.value = false;
  await loadItems()
};

const itemsPaginated = async () => {
  const startIndex = (actualPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  itemsListView.value = itemsList.value.slice(startIndex, endIndex);
}

const sortItem = async () => {
  const sortByValue = sortBy.value[0];

  if (!sortByValue) return;

  switch (sortByValue.key) {
    case "idCategoria":
      itemsList.value.sort((a, b) => {
        let itemA = a.idCategoria ?? 0
        let itemB = b.idCategoria ?? 0
        return itemA - itemB
      });
      break;

    case "nombre":
      itemsList.value.sort((a, b) => {
        let itemA = a.nombre ?? ''
        let itemB = b.nombre ?? ''
        return itemA.localeCompare(itemB)
      }
      )
      break;

    default:
      return;
  }

  if (sortByValue.order === 'desc') {
    itemsList.value.reverse()
  }

  itemsListView.value = itemsList.value
  itemsPaginated()
}

</script>

<template>
  <div class="category-admin">
    <h1 class="category-admin__title">Administración de las categorías</h1>

    <v-btn class="category-admin__btn category-admin__btn--add" color="#fd6f01" @click="openCreateDialog">
      <v-icon start>mdi-plus</v-icon> Añadir Categoría
    </v-btn>

    <ServerTable class="category-admin__table" :headers="headers" :serverItems="itemsListView"
      :items-per-page="itemsPerPage" v-model:page="actualPage" v-model:sort-by="sortBy" @update:sort-by="sortItem"
      @update:page="itemsPaginated" :totalItems="itemsList.length" @update:items-per-page="itemsPaginated">
      <template #item.actions="{ item }">
        <v-btn class="category-admin__btn-icon" size="small" icon @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="category-admin__btn-icon category-admin__btn-icon--delete" icon size="small"
          @click="deleteItem(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #item.idCategoria="{ item }">
        <span class="category-admin__link">{{ item.idCategoria }}</span>
      </template>
    </ServerTable>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="category-admin__dialog">
        <v-card-title>
          <span class="category-admin__dialog-title">
            {{ isEditMode ? 'Editar Categoría' : 'Crear Categoría' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nombre" label="Nombre" />
          <v-textarea v-model="editedItem.descripcion" label="Descripción" />
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
.category-admin {
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
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
    margin: 5px;

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
    margin-bottom: 2rem;
    overflow-x: auto;
  }

  &__dialog {
    padding: 1rem;

    &-title {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  @media (min-width: 768px) {
    &__title {
      font-size: 2rem;
    }

    &__btn {
      width: auto;
      display: inline-flex;
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    &__btn--add {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }

    &__dialog-title {
      font-size: 1.5rem;
    }
  }
}
</style>
