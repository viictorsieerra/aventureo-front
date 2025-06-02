<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { HeaderTable } from '@/models/HeaderTable';

const props = defineProps<{
    itemsPerPage?: number,
    headers: HeaderTable[],
    serverItems: Array<object>,
    totalItems: number,
    loading?: boolean,
}>();

const emit = defineEmits<{
    (e: 'update:items-per-page', value: number): void;
}>();

const onItemsPerPageChange = (value: number) => {
    emit('update:items-per-page', value); // Emite el evento con el nuevo valor
};
</script>


<template>
  <div class="admin-table-wrapper">
    <div class="admin-table-scroll">
      <v-data-table-server
        v-bind:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="name"
        @update:items-per-page="onItemsPerPageChange"
        class="admin-table"
      >
        <!-- Permite pasar slots personalizados desde fuera -->
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>




<style lang="scss" scoped>
.admin-table-wrapper {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.admin-table-scroll {
  overflow-x: auto;
}

.admin-table {
  min-width: 800px; // Ajusta según el número de columnas
}
</style>

