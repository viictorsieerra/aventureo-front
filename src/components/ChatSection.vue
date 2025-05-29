<template>
  <div class="chat-section">
    <!-- Columna Izquierda: Card con texto -->
    <div class="chat-card">
      <h2>Planifica el viaje de tus sueños</h2>
      <p>
        Alguna vez has querido viajar pero no has sabido por donde empezar?
        Con nuestra IA, puedes planificar tu viaje ideal en minutos.
        Desde elegir el destino perfecto hasta encontrar las mejores actividades,
        ¡todo al alcance de un clic!
        Describe tu viaje ideal y deja a nuestra IA hacer el resto.
        ¡Comienza ahora y descubre un mundo de posibilidades!
      </p>
      <button>Empezar ahora</button>
    </div>

    <!-- Columna Derecha: Canvas -->
    <div class="chat-canvas-container">
      <div class="canvas-wrapper">
        <ChatCanvas />
   
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatCanvas from '@/components/ChatCanvas.vue'

</script>

<style scoped>
.chat-section {
  z-index: 100000;
  display: flex;
  flex-direction: column; /* Mobile first: columnas apiladas */
  gap: 1.5rem;
  padding: 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  border-radius: 16px;
}

.chat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.chat-card h2 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.chat-card p {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.chat-card button {
  background-color: #4DD0E1;
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-card button:hover {
  background-color: #3493a0;
}

.chat-canvas-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  margin-top: 1rem;
}

.canvas-wrapper {
  width: 100%;
  max-width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Desktop y tablets grandes */
@media (min-width: 768px) {
  .chat-section {
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
  }

  .chat-card {
    flex: 1 1 350px;
    padding: 2rem;
  }

  .chat-card h2 {
    font-size: 2rem;
  }

  .chat-card p {
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .chat-canvas-container {
    flex: 1 1 500px;
    min-height: 500px;
    margin-top: 0;
  }

  .canvas-wrapper {
    width: 90%;
    max-width: 600px;
    height: 500px;
  }
}

</style>
