<template>
  <v-footer class="footer text-center d-flex flex-column ga-2 py-4" color="#183263">
    <div class="footer__icons d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
        class="footer__icon-btn"
      />
    </div>

    <v-divider class="footer__divider my-2" thickness="2" width="50"></v-divider>

    <div class="footer__columns text-caption font-weight-regular opacity-60">
      <div class="footer__column">
        <h3 class="footer__title">Sobre Nosotros</h3>
        <ul class="footer__list">
          <li><router-link class="footer__link" to="/sobre-nosotros">Quiénes somos</router-link></li>
          <li><a class="footer__link" href="mailto:contacto@aventureo.com">📧 contacto@aventureo.com</a></li>
          <li><a class="footer__link" href="tel:+34600111222">📞 +34 600 111 222</a></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Ayuda</h3>
        <ul class="footer__list">
          <li><router-link class="footer__link" to="/preguntas-frecuentes">Preguntas frecuentes</router-link></li>
          <li><router-link class="footer__link" to="/soporte">Soporte</router-link></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Síguenos</h3>
        <ul class="footer__list">
          <li><a class="footer__link" href="https://www.facebook.com" target="_blank" rel="noopener">Facebook</a></li>
          <li><a class="footer__link" href="https://twitter.com" target="_blank" rel="noopener">Twitter</a></li>
          <li><a class="footer__link" href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
    </div>

    <v-divider class="footer__divider"></v-divider>

    <div class="footer__copy">
      {{ new Date().getFullYear() }} — <strong>Aventureo</strong>
    </div>
  </v-footer>
</template>


<script setup lang="ts">
</script>
<style scoped lang="scss">
.footer {
  &__icons {
    display: flex;
    gap: 1rem;
  }

  &__icon-btn {
    color: #ffffff;

    &:hover {
      color: #fd6f01;
    }
  }

  &__divider {
    background-color: #018ef6;
    opacity: 0.8;
  }

  &__columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: left;
    margin-top: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: #ffffff;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }

  &__link {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s;

    &:hover {
      color: #fd6f01;
    }
  }

  &__copy {
    color: rgba(255, 255, 255, 0.6);
    margin-top: 1rem;
    font-size: 0.85rem;

    strong {
      color: #ffffff;
    }
  }
}

</style>