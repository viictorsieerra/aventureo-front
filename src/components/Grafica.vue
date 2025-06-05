<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>


<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { computed } from 'vue'
import type { GastoPorCategoria } from '@/models/Gasto'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  datos: GastoPorCategoria[];
}>()

function generarColores(cantidad: number): string[] {
  const coloresBase = ['#183263', '#fd6f01', '#0288d1']
  const colores = [...coloresBase]

  for (let i = coloresBase.length; i < cantidad; i++) {
    colores.push(`hsl(${Math.random() * 360}, 70%, 60%)`)
  }

  return colores
}

const chartData = computed(() => {
  const labels = props.datos.map(d => d.categoria)
  const data = props.datos.map(d => d.total)
  const backgroundColor = generarColores(labels.length)

  return {
    labels,
    datasets: [
      {
        label: 'Gastos por categoría',
        data,
        backgroundColor,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gastos por categoría',
    },
  },
}
</script>
