<template>
  <div class="planner-section">
    <div class="planner-card">
      <h2>Organiza tu viaje a medida!</h2>
      <p>
        ¿Quieres tener todo tu viaje controlado? Crea planes personalizados para cada escapada:
        asigna presupuesto, transporte, alojamiento y actividades. Gestiona tus gastos y lleva
        el control desde cualquier dispositivo.
        <br />
        Inicia sesión para empezar a planificar tu viaje ideal.
      </p>
      <router-link to="/Login">
        <button>Planificar ahora</button>
      </router-link>
    </div>

    <div class="planner-canvas-container">
      <div class="canvas-wrapper">
        <PlannerCanvas />
      </div>
    </div>
  </div>
</template>

<script setup>
import PlannerCanvas from '@/components/PlannerCanvas.vue'
</script>

<style scoped>
.planner-section {
  z-index: 100000;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  padding: 3rem 3rem 4rem;
  margin: 2rem auto;
  border-radius: 16px;
  background-image: url('/playa-grande.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.planner-card {
  flex: 1;
  background-color: #f7f7f7;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.planner-card h2 {
  font-size: 2rem;
  color: #183263;
  margin-bottom: 1rem;
}

.planner-card p {
  font-size: 1.125rem;
  color: #333333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.planner-card button {
  background-color: #fd6f01;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
}

.planner-card button:hover {
  background-color: #d95c00;
}

.planner-canvas-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.canvas-wrapper {
  width: 90%;
  max-width: 600px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .planner-section {
    flex-direction: column;
  }

  .planner-canvas-container {
    min-height: 400px;
  }

  .canvas-wrapper {
    width: 100%;
    height: 400px;
  }
}
</style>
