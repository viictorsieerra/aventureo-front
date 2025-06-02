<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#183263">
    <div class="d-flex ga-3">
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" density="comfortable" variant="text"
        class="footer-icon-btn"></v-btn>
    </div>

    <v-divider class="my-2 footer-divider" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-60">
      <div class="footer-columns">
        <div class="footer-column">
          <h3>Sobre Nosotros</h3>
          <ul>
            <li><router-link to="/sobre-nosotros">Quiénes somos</router-link></li>
            <li><a href="mailto:contacto@aventureo.com">📧 contacto@aventureo.com</a></li>
            <li><a href="tel:+34600111222">📞 +34 600 111 222</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Ayuda</h3>
          <ul>
            <li><router-link to="/preguntas-frecuentes">Preguntas frecuentes</router-link></li>
            <li><router-link to="/soporte">Soporte</router-link></li>
          </ul>
        </div>


        <div class="footer-column">
          <h3>Síguenos</h3>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>

      </div>
    </div>

    <v-divider class="footer-divider"></v-divider>

    <div class="footer-copy">
      {{ new Date().getFullYear() }} — <strong>Aventureo</strong>
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
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-column {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: #ffffff;
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
          color: #fd6f01;
        }
      }
    }
  }
}

.footer-divider {
  background-color: #018ef6;
  opacity: 0.8;
}

.footer-copy {
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1rem;
  font-size: 0.85rem;

  strong {
    color: #ffffff;
  }
}

.footer-icon-btn {
  color: #ffffff;

  &:hover {
    color: #fd6f01;
  }
}
</style>