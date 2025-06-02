<template>
    <div class="faq">
      <div class="faq__hero">
        <h1 class="faq__title">Preguntas Frecuentes</h1>
        <p class="faq__subtitle">Resolvemos tus dudas más habituales</p>
      </div>
  
      <div class="faq__content">
        <div class="faq__item" v-for="(pregunta, index) in preguntas" :key="index">
          <h2 class="faq__question">{{ pregunta.pregunta }}</h2>
          <p class="faq__answer">{{ pregunta.respuesta }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const preguntas = [
    {
      pregunta: "¿Qué es Aventureo?",
      respuesta: "Aventureo es una plataforma online que permite planificar, organizar y gestionar tus viajes, controlar tus gastos y descubrir recomendaciones reales de otros viajeros."
    },
    {
      pregunta: "¿Puedo usar Aventureo sin registrarme?",
      respuesta: "Puedes explorar destinos y ver información general, pero para guardar planes, controlar gastos o chatear con nuestra IA necesitas crear una cuenta gratuita."
    },
    {
      pregunta: "¿Cómo puedo añadir un plan de viaje?",
      respuesta: "Accede a la sección 'Planificador' desde el menú principal y haz clic en 'Crear nuevo plan'. Desde ahí podrás añadir rutas, alojamientos, actividades y gastos."
    },
    {
      pregunta: "¿Aventureo tiene app móvil?",
      respuesta: "Actualmente solo está disponible la versión web, pero estamos trabajando en lanzar una app para iOS y Android muy pronto."
    }
  ]
  </script>
  
  <style scoped lang="scss">
  .faq {
    padding: 2rem 1.5rem;
    color: #183263;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .faq__hero {
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
  
  .faq__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .faq__item {
    background-color: #f5f9fd;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .faq__question {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
    color: #183263;
  }
  
  .faq__answer {
    font-size: 1.1rem;
    line-height: 1.7;
  }
  </style>
  