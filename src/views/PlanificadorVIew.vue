<template>
    <div class="planificador">
      <h2>Planificador de Gastos</h2>
  
      <form @submit.prevent="agregarNuevoGasto">
        <input v-model="nuevoGasto.concepto" placeholder="Concepto" required />
        <input v-model.number="nuevoGasto.importe" type="number" placeholder="Importe (€)" required />
        <select v-model="nuevoGasto.categoria" required>
          <option disabled value="">Categoría</option>
          <option>Comida</option>
          <option>Transporte</option>
          <option>Alojamiento</option>
          <option>Ocio</option>
          <option>Otros</option>
        </select>
        <button type="submit">Añadir gasto</button>
      </form>
  
      <h3>Gastos registrados:</h3>
      <ul>
        <li v-for="gasto in store.gastos" :key="gasto.id">
          {{ gasto.concepto }} - {{ gasto.importe }}€ ({{ gasto.categoria }})
          <button @click="store.eliminarGasto(gasto.id)">❌</button>
        </li>
      </ul>
  
      <h3>Total: {{ store.total }}€</h3>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  import { useGastosStore, type Gasto } from '@/stores/gastos'
  
  const store = useGastosStore()
  
  type NuevoGasto = Omit<Gasto, 'id'>
  
  const nuevoGasto = reactive<NuevoGasto>({
    concepto: '',
    importe: 0,
    categoria: ''
  })
  
  const agregarNuevoGasto = () => {
    store.agregarGasto({ ...nuevoGasto })
    nuevoGasto.concepto = ''
    nuevoGasto.importe = 0
    nuevoGasto.categoria = ''
  }
  </script>
  
  <style scoped>
.planificador {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.planificador h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
  color: #333;
}

.planificador form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.planificador input,
.planificador select {
  flex: 1 1 200px;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.planificador input:focus,
.planificador select:focus {
  border-color: #007BFF;
  outline: none;
}

.planificador button {
  flex: 1 1 100%;
  padding: 12px;
  background-color:#48a259;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.planificador button:hover {
  background-color:#316e3c;
}

.planificador h3 {
  margin-top: 20px;
  font-size: 22px;
  color: #444;
  border-bottom: 2px solid #eee;
  padding-bottom: 6px;
}

.planificador ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.planificador li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F9F9F9;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.planificador li button {
  background-color: transparent;
  border: none;
  color: #FF4C4C;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.planificador li button:hover {
  color: #c20000;
}

.planificador h3:last-of-type {
  text-align: right;
  font-size: 24px;
  margin-top: 30px;
  color: #222;
}
</style>
