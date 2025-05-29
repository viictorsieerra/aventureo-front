<template>
  <header class="navbar">
    <div class="container">
      <h1 class="logo">Aventureo</h1>

      <!-- Botón hamburguesa móvil -->
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span v-if="!menuOpen">☰</span>
        <span v-else>×</span>
      </button>

      <!-- Navegación -->
      <nav v-if="menuOpen || isDesktop" class="nav">
        <router-link to="booking"><button class="nav-item">Booking</button></router-link>
        <router-link to="actividades"><button class="nav-item">Actividades</button></router-link>
        <router-link to="chat"><button class="nav-item">Chateta con la IA</button></router-link>
        <button class="nav-item">Trenes</button>
      </nav>

      <div v-if="menuOpen || isDesktop" class="actions">
        <template v-if="!jwtStore.jwt">
          <router-link to="/login">
            <button class="login-button">Iniciar sesión</button>
          </router-link>
          <router-link to="/registro">
            <button class="signup-button">Registrarse</button>
          </router-link>
        </template>
        <template v-else>
          <span class="username">Bienvenido, {{ user.nombre }}</span>
          <button class="logout-button" @click="jwtStore.logOut">Cerrar sesión</button>
        </template>
      </div>

    </div>

    <div class="header-title">
      <h1 class="first-title">Piensa un lugar y disfruta del viaje!</h1>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useJWTStore } from '@/stores/JwtStore'
import { useUserStore } from '@/stores/UserStore';
import { Usuario } from '@/models/Usuario';

const menuOpen = ref(false);
const isDesktop = ref(false);

const jwtStore = useJWTStore();
const userStore = useUserStore();

const user = ref(new Usuario())

user.value = computed(() => userStore.user)
const router = useRouter();

const checkViewport = () => {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) menuOpen.value = false;
};

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});
</script>

<style scoped lang="scss">
.navbar {
  background-color: #0288D1;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  position: static;
  top: 0;
  left: 0;
  z-index: 50;
}

.container {
  display: flex;
  flex-direction: column; /* Mobile first: columna apilada */
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  align-self: flex-end;
  transition: color 0.3s ease;
}

.menu-toggle:hover {
  color: #ffffbf;
}

/* Menú móvil: vertical, full width */
.nav {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
}

.nav-item {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 12px 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.login-button,
.signup-button {
  background-color: white;
  color: #003580;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
}

.signup-button {
  background-color: #4DD0E1;
  color: black;
}

.login-button:hover,
.signup-button:hover {
  background-color: #f7f7f7;
  transform: translateY(-2px);
}

.signup-button:hover {
  background-color: #4DD0E1;
}

.username {
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
}

.logout-button {
  background-color: #ff5e57;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #e04b46;
}

/* Desktop */
@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .nav {
    flex-direction: row;
    gap: 24px;
    width: auto;
    align-items: center;
  }

  .nav-item {
    width: auto;
    padding: 8px 12px;
    border-radius: 4px;
  }

  .actions {
    flex-direction: row;
    gap: 12px;
    width: auto;
    align-items: center;
  }

  .login-button,
  .signup-button,
  .logout-button {
    width: auto;
    padding: 8px 16px;
  }

  .username {
    margin: 0 12px 0 0;
    text-align: left;
  }
}

.header-title {
  text-align: center;
  padding: 40px 16px;
}

.first-title {
  font-size: 1.5rem;
  margin-top: 140px;
}

@media (min-width: 768px) {
  .first-title {
    font-size: 2rem;
    margin-top: 5%;
  }

  .header-title {
    padding: 10px 24px;
  }
}

</style>