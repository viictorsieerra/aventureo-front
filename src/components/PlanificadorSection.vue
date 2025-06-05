<template>
  <div class="planner">
    <div class="planner__card">
      <h2 class="planner__title">Organiza tu viaje a medida!</h2>
      <p class="planner__description">
        ¿Quieres tener todo tu viaje controlado? Crea planes personalizados para cada escapada:
        asigna presupuesto, transporte, alojamiento y actividades. Gestiona tus gastos y lleva
        el control desde cualquier dispositivo.
        <br />
        Inicia sesión para empezar a planificar tu viaje ideal.
      </p>
      <router-link to="/Planificador">
        <button class="planner__button">Planificar ahora</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.planner {
  z-index: 100000;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  padding: 3rem 3rem 4rem;
  margin: 2rem auto;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.planner__card {
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

.planner__title {
  font-size: 2rem;
  color: #183263;
  margin-bottom: 1rem;
}

.planner__description {
  font-size: 1.125rem;
  color: #333333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.planner__button {
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

.planner__button:hover {
  background-color: #d95c00;
}

.planner__canvas-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.planner__canvas-wrapper {
  width: 90%;
  max-width: 600px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .planner {
    flex-direction: column;
  }

  .planner__canvas-container {
    min-height: 400px;
  }

  .planner__canvas-wrapper {
    width: 100%;
    height: 400px;
  }
}
</style>
