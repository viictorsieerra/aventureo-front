<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  location: String
})
</script>

<template>
  <h1>Planes en {{ location }}</h1>
  <!-- Aquí puedes mostrar los planes usando el mismo método getSamplePlans si lo compartes -->
</template>
