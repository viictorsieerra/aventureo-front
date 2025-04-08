<template>
    <div class="container mx-auto text-center p-8">
      <h2 class="title">Disfruta de tu plataforma favorita para tener el mejor viaje!</h2>
      
      <div class="steps-container">
        <div class="step"@click="scrollToSection('ofertas')">
            <div class="step-number">🌎</div>
            <p class="step-description">Compra y ahorra gracias a nuestras súper ofertas</p>
        </div>
        <div class="step"@click="scrollToSection('vuelos')">
          <div class="step-number">✈️🚆</div>
          <p class="step-description">Elige la forma que mas se ajuste a tus necesidades para viajar</p>
        </div>
        <div class="step">
          <div class="step-number">💰</div>
          <p class="step-description">Realiza el pago y listo! Disfruta del viaje!</p>
        </div>
        <h2 class="subtitle"> Tus vacaciones empiezan aquí</h2>
      </div>


      <div class="client-types">
      <div class="client-type">
        <div class="icon">💎</div>
        <p class="client-description">Te ofrecemos vacaciones por todo el mundo, mostrándote cada rincón y sus secretos</p>
      </div>
      <div class="client-type">
        <div class="icon">🏠</div>
        <p class="client-description">Promociones y ofertas seleccionadas para ti. ¡Tenemos los mejores chollos!</p>
      </div>
      <div class="client-type">
        <div class="icon">🌍</div>
        <p class="client-description">Reserva tu viaje de forma rápida y sencilla desde cualquier dispositivo</p>
      </div>
      <div class="client-type">
        <div class="icon">🌍</div>
        <p class="client-description">Asesores especializados te ayudarán a elegir y planificar tus vacaciones para tu disfrute</p>
      </div>
      <div class="client-type">
        <div class="icon">🌍</div>
        <p class="client-description">Viaja tranquilo: te ofrecemos gratis asistencia 24 horas en destino los 365 días del año</p>
      </div>
    </div>
    </div>
    
</template>
  
  <script>
  export default {
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
  
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles/_variables.scss';
  @import '@/assets/styles/_mixins.scss';
  
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    margin-bottom: 10%;
    margin-top: 10%;

    @media (min-width: 768px) {
      max-width: 1200px;
    }
  }
  
  .title {
    @include responsive-font-size(1.5rem);
    font-weight: bold;
    color: $secondary-color;
  }
  
  .steps-container {
    display: grid;
    justify-content: center;
    justify-items: center;
    margin-top: 1.5rem;
    gap: 1.5rem;
    @media (min-width: 768px) {
      display: flex;
    }
  }
  
  .step {
    text-align: center;
    padding: 1rem;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: $background-color;
    width: 80%;
  
    @media (min-width: 768px) {
      padding: 2rem;
      width: 35%;
    }
  }
  
  .step-number {
    @include responsive-font-size(1.25rem);
    font-weight: bold;
    color: $primary-color;
  }
  
  .step-description {
    margin-top: 0.5rem;
    color: $text-color;
  }
  
  .button-container {
    text-align: center;
    margin-top: 1.5rem;
  }
  
  .start-button {
    padding: 0.5rem 1.5rem;
    border: 1px solid $primary-color;
    color: $primary-color;
    border-radius: 0.5rem;
    transition: background-color 0.3s, color 0.3s;
  
    &:hover {
      background-color: $primary-color;
      color: $background-color;
    }
  }
  
  .subtitle {
    @include responsive-font-size(1.5rem);
    margin-top: 3rem;
    font-weight: bold;
    color: $secondary-color;
  }
  
  .client-types {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .client-type {
    text-align: center;
    padding: 1rem;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: $background-color;
  
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  
  .icon {
    font-size: 2rem;
  
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  .client-title {
    margin-top: 0.5rem;
    font-weight: bold;
    color: $secondary-color;
  }
  
  .client-description {
    margin-top: 0.5rem;
    color: $text-color;
  }
  </style>