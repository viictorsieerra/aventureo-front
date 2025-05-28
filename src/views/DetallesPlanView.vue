<template>
    <v-container>
      <v-card v-if="plan">
        <v-card-title>{{ plan.nombre }}</v-card-title>
        <v-card-subtitle>Lugar: {{ plan.lugar }}</v-card-subtitle>
  
        <v-card-text>
          <p><strong>Duración:</strong> {{ plan.duracion }} días</p>
          <p><strong>Precio estimado:</strong> {{ plan.precioEstimado }}€</p>
          <p><strong>Valoración:</strong> {{ plan.valoracion }}/5</p>
          <p><strong>Comentario:</strong> {{ plan.comentario }}</p>
        </v-card-text>
  
        <v-card-actions>
          <v-btn color="primary" @click="volver">Volver</v-btn>
        </v-card-actions>
      </v-card>
  
      <v-alert v-else type="info" text> Cargando plan... </v-alert>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/usePlans'
  
  const route = useRoute()
  const router = useRouter()
  const { getPlanById } = usePlans()
  
  const plan = ref(null)
  
  onMounted(async () => {
    const id = Number(route.params.id)
    plan.value = await getPlanById(id)
  })
  
  const volver = () => {
    router.back()
  }
  </script>
  