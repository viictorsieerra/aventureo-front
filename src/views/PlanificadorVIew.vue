<template>
  <div class="planificador">
    <h2>Planificador de Gastos</h2>

    
    <input
      v-model="viaje.nombre"
      placeholder="Nombre del viaje"
      required
    />

   
    <div
      v-for="(gasto, index) in viaje.gastos"
      :key="index"
      class="gasto-item"
    >
      <select v-model="gasto.categoria" required>
        <option disabled value="0">Categoría</option>
        <option :value="0">Vuelo</option>
        <option :value="1">Transporte</option>
        <option :value="2">Comida</option>
        <option :value="3">Alojamiento</option>
        <option :value="4">Ocio</option>
        <option :value="5">Otros</option>
      </select>

      <input
        v-model.number="gasto.cantidad"
        type="number"
        min="0"
        placeholder="Cantidad (€)"
        required
      />

      <button type="button" @click="eliminarGasto(index)">🗑</button>
    </div>

   
    <button type="button" class="add-button" @click="añadirGasto">
      + Añadir Gasto
    </button>

    
    <h3>Total: €{{ totalGastos }}</h3>

   
    <button class="save-button" @click="guardarViaje">Guardar Viaje</button>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { addGasto } from '@/services/GastoService';

export default defineComponent({
  name: 'PlanificadorView',
  data() {
    return {
      viaje: {
        nombre: '',
        gastos: [{ categoria: 0, cantidad: 0 }]
      },
      error: null as string | null
    };
  },
  computed: {
    totalGastos(): number {
      return this.viaje.gastos.reduce((acc, gasto) => acc + (gasto.cantidad || 0), 0);
    }
  },
  methods: {
    añadirGasto() {
      this.viaje.gastos.push({ categoria: 0, cantidad: 0 });
    },
    eliminarGasto(index: number) {
      this.viaje.gastos.splice(index, 1);
    },
    async guardarViaje() {
      try {
        for (const gasto of this.viaje.gastos) {
          await addGasto({
            nombre: `${this.viaje.nombre} - Categoría ${gasto.categoria}`,
            cantidad: gasto.cantidad,
            idCategoria: gasto.categoria,
            idViaje: 1 
          });
        }

        alert('Viaje y gastos guardados');
        this.viaje = { nombre: '', gastos: [{ categoria: 0, cantidad: 0 }] };
        this.error = null;
      } catch (err) {
        this.error = 'Error al guardar los gastos';
        console.error(err);
      }
    }
  }
});
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

.planificador input,
.planificador select {
  flex: 1 1 45%;
  padding: 12px 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.planificador input:focus,
.planificador select:focus {
  border-color: #007bff;
  outline: none;
}

.gasto-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.gasto-item button {
  background-color: transparent;
  border: none;
  color: #ff4c4c;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.gasto-item button:hover {
  color: #c20000;
}

.add-button,
.save-button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #48a259;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover,
.save-button:hover {
  background-color: #316e3c;
}

.planificador h3 {
  margin-top: 20px;
  font-size: 22px;
  color: #444;
  border-top: 2px solid #eee;
  padding-top: 10px;
  text-align: right;
}

.error {
  margin-top: 15px;
  color: red;
  text-align: center;
}
</style>
