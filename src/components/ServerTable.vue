<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { HeaderTable } from '@/models/HeaderTable';
import type { Slots } from 'vue'

const slots = defineSlots()
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
    emit('update:items-per-page', value)
};
</script>


<template>
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
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-data-table-server>
</template>






<style lang="scss" scoped>
.admin-table {
  min-width: 100%;

  @media (min-width: 768px) {
    min-width: 800px;
  }
}


</style>