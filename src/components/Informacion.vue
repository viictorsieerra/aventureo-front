<template>
  <div class="container mx-auto text-center p-8">
    <h2 class="title">Disfruta de tu plataforma favorita para tener el mejor viaje!</h2>

    <div class="steps-container">
      <div class="step" @click="scrollToSection('ofertas')">
        <div class="step-number">🌎</div>
        <p class="step-description">Busca las mejores actividades por todo el mundo!</p>
      </div>
      <div class="step" @click="scrollToSection('vuelos')">
        <div class="step-number">✈️🚆</div>
        <p class="step-description">Chatea con nuestra IA Ventu y disfruta de todas sus sugerencias para tu viaje!</p>
      </div>
      <div class="step">
        <div class="step-number">💰</div>
        <p class="step-description">Ahorra tiempo y dinero con nuestro planificador de viajes!</p>
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
  font-size: 1.75rem;
  font-weight: bold;
  color: #183263;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
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
  border: 1px solid #dddddd;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  width: 80%;

  @media (min-width: 768px) {
    padding: 2rem;
    width: 35%;
  }
}

.step-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #183263;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
}

.step-description {
  margin-top: 0.5rem;
  color: #333333;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
}

.button-container {
  text-align: center;
  margin-top: 1.5rem;
}

.start-button {
  padding: 0.5rem 1.5rem;
  border: 1px solid #183263;
  color: #183263;
  border-radius: 0.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #183263;
    color: #ffffff;
  }
}

.subtitle {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: #018ef6;
  margin-top: 10%;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
}

.client-types {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.client-type {
  text-align: center;
  padding: 1rem;
  border: 1px solid #dddddd;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
}

.icon {
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
}

.client-title {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #018ef6;
}

.client-description {
  margin-top: 0.5rem;
  color: #333333;
  font-size: 1rem;
}
</style>
