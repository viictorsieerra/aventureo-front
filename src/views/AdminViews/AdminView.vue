<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('/admin/category')
</script>

<template>
  <v-tabs
    v-model="tab"
    color="#fd6f01"
    align-tabs="start"
    fixed-tabs
  >
    <v-tab :value="'/admin/category'" to="/admin/category">
      <v-icon start>mdi-shape</v-icon>
      Categorías
    </v-tab>
    <v-tab :value="'/admin/user'" to="/admin/user">
      <v-icon start>mdi-account</v-icon>
      Usuarios
    </v-tab>
  </v-tabs>

  <RouterView />
</template>
