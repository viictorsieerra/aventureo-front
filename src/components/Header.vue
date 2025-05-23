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
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.nav-item {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  width: 100%;
  text-align: center;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.actions {
  display: flex;
  gap: 10px;
}

.username {
  font-weight: bold;
  color: #fff;
}

.logout-button {
  background-color: #ff5e57;
  border: none;
  padding: 8px 14px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e04b46;
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

.header-title {
  text-align: center;
  padding: 40px 16px;
}

.first-title {
  font-size: 1.5rem;
  margin-top: 140px;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: auto;
  transition: color 0.3s ease;
}

.menu-toggle:hover {
  color: #ffffbf;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

@media (min-width: 768px) {
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
  }

  .actions {
    flex-direction: row;
    width: auto;
    gap: 12px;
  }

  .nav-item {
    width: auto;
  }

  .login-button,
  .signup-button {
    width: auto;
  }

  .first-title {
    font-size: 2rem;
    margin-top: 5%;
  }

  .header-title {
    padding: 10px 24px;
  }
}


.help-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.help-icon:hover {
  color: #ffffbf;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay-content {
  position: relative;
  background-color: white;
  color: #003580;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  font-size: 1.1rem;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: -11px;
  right: 3px;
  font-size: 2rem;
  cursor: pointer;
  color: #48a259;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #d78d00;
}
</style>