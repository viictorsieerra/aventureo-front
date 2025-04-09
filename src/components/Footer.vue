<template>
    <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#48a259">
      <div class="d-flex ga-3">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          density="comfortable"
          variant="text"
        ></v-btn>
      </div>
  
      <v-divider class="my-2" thickness="2" width="50"></v-divider>
  
      <div class="text-caption font-weight-regular opacity-60">
  <div class="footer-columns">
    <div class="footer-column">
      <h3>Sobre Nosotros</h3>
      <ul>
        <li><a href="#">Quiénes somos</a></li>
        <li><a href="#">Nuestro equipo</a></li>
        <li><a href="#">Carreras</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Ayuda</h3>
      <ul>
        <li><a href="#">Preguntas frecuentes</a></li>
        <li><a href="#">Soporte</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Síguenos</h3>
      <ul>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Instagram</a></li>
      </ul>
    </div>
  </div>
</div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </template>
  <script setup>
   
  </script>
  <style scoped lang="scss">
   .footer-columns {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 1.5rem;
  text-align: left;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); 
  }
}

.footer-column {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.8);
        transition: color 0.3s;

        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>