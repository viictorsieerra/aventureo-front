<template>
    <div class="sobre-nosotros">
      <div class="sobre-nosotros__hero">
        <h1 class="sobre-nosotros__title">Sobre Nosotros</h1>
        <p class="sobre-nosotros__subtitle">La historia detrás de Aventureo</p>
      </div>
  
      <div class="sobre-nosotros__content">
        <div class="sobre-nosotros__image">
          <img src="/public/img/viajeAventureo.jpg" alt="Alfonso y Víctor de viaje" />
        </div>
  
        <div class="sobre-nosotros__text">
          <h2 class="sobre-nosotros__section-title">¿Cómo empezó todo?</h2>
          <p>
            Alfonso y Víctor se conocieron en 2022 durante un viaje improvisado al norte de España.
            Entre rutas mal planeadas, alojamientos sobre la marcha y problemas para controlar los gastos,
            surgió la idea de crear una plataforma que facilitase a cualquier viajero organizar su aventura sin complicaciones.
          </p>
  
          <p>
            Tras ese viaje, decidieron unir fuerzas y nació <strong>Aventureo</strong>, una página web pensada
            para ayudar a los viajeros a planificar sus rutas, gestionar sus alojamientos, controlar sus gastos
            y descubrir lugares únicos en cualquier destino.
          </p>
        </div>
      </div>
  
      <div class="sobre-nosotros__mision">
        <h2 class="sobre-nosotros__section-title">Nuestra misión</h2>
        <p>
          Queremos que organizar un viaje sea tan emocionante como vivirlo. Por eso,
          en Aventureo ofrecemos herramientas sencillas y útiles para que puedas
          planificar todo sin estrés, compartir tus experiencias y encontrar recomendaciones reales de otros viajeros.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped lang="scss">
  .sobre-nosotros {
    padding: 2rem 1.5rem;
    color: #183263;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .sobre-nosotros__hero {
    text-align: center;
    margin-bottom: 3rem;
  
    & h1 {
      font-size: 3rem;
      color: #183263;
      margin-bottom: 0.5rem;
    }
  
    & p {
      font-size: 1.3rem;
      color: #018ef6;
    }
  }
  
  .sobre-nosotros__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  .sobre-nosotros__image img {
    width: 100%;
    max-width: 500px;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
  
  .sobre-nosotros__text {
    flex: 1;
    font-size: 1.1rem;
    line-height: 1.8;
    padding: 0 0.5rem;
  
    p {
      margin-bottom: 1.2rem;
    }
  }
  
  .sobre-nosotros__section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #183263;
  }
  
  .sobre-nosotros__mision {
    margin-top: 3rem;
    background-color: #f5f9fd;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
  
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      max-width: 900px;
      margin: 0 auto;
    }
  }
  </style>
  