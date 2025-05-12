import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Gasto {
  id: number
  concepto: string
  importe: number
  categoria: string
}

export const useGastosStore = defineStore('gastos', () => {
  const gastos = ref<Gasto[]>(JSON.parse(localStorage.getItem('gastos') || '[]'))

  const agregarGasto = (gasto: Omit<Gasto, 'id'>) => {
    gastos.value.push({ ...gasto, id: Date.now() })
  }

  const eliminarGasto = (id: number) => {
    gastos.value = gastos.value.filter(g => g.id !== id)
  }

  const total = computed(() => {
    return gastos.value.reduce((sum, g) => sum + g.importe, 0)
  })

  watch(gastos, (nuevoValor) => {
    localStorage.setItem('gastos', JSON.stringify(nuevoValor))
  }, { deep: true })

  return { gastos, agregarGasto, eliminarGasto, total }
})
