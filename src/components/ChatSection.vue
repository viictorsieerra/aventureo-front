<template>
  <div class="chat-section">
    <div class="chat-section__card">
      <h2 class="chat-section__title">Planifica el viaje de tus sueños</h2>
      <p class="chat-section__text">
        ¿Alguna vez has querido viajar pero no has sabido por dónde empezar?
        Con nuestra IA, puedes planificar tu viaje ideal en minutos.
        Desde elegir el destino perfecto hasta encontrar las mejores actividades,
        ¡todo al alcance de un clic!
        Describe tu viaje ideal y deja a nuestra IA hacer el resto.
        ¡Comienza ahora y descubre un mundo de posibilidades!
      </p>
      <router-link to="/chat">
        <button class="chat-section__button">Empezar ahora</button>
      </router-link>
    </div>

    <div class="chat-section__canvas">
      <div class="chat-section__canvas-wrapper">
        <ChatCanvas />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatCanvas from '@/components/ChatCanvas.vue'
</script>


<style scoped lang="scss">
.chat-section {
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  border-radius: 16px;

  &__card {
    flex: 1;
    background: #f7f7f7;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__title {
    font-size: 1.75rem;
    color: #183263;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2rem;
    background-color: #fd6f01;
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(253, 111, 1, 0.35);
    white-space: nowrap;
    margin: 0 auto;

    &:hover {
      background-color: #e85e00;
      box-shadow: 0 6px 16px rgba(253, 111, 1, 0.5);
      transform: translateY(-1px);
    }

    &:active {
      background-color: #c74e00;
      box-shadow: 0 3px 10px rgba(253, 111, 1, 0.4);
      transform: scale(0.97);
    }

    &:disabled {
      background-color: #aaa;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  }

  &__canvas {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    margin-top: 1rem;
  }

  &__canvas-wrapper {
    width: 100%;
    max-width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;

    &__card {
      padding: 2rem;
    }

    &__title {
      font-size: 2rem;
    }

    &__text {
      font-size: 1.125rem;
      line-height: 1.6;
    }

    &__canvas {
      min-height: 500px;
      margin-top: 0;
    }

    &__canvas-wrapper {
      width: 90%;
      max-width: 600px;
      height: 500px;
    }
  }
}
</style>
