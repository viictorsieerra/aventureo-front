<template>
  <header class="navbar">
    <div class="container">
      <h1 class="logo">Aventureo</h1>

      <!-- Botón hamburguesa móvil -->
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span v-if="!menuOpen">☰</span>
        <span v-else>×</span>
      </button>

      <!-- Navegación con transición -->
      <transition name="slide-fade">
        <nav v-if="menuOpen || isDesktop" class="nav">
          <button class="btn nav-item" @click="handleNavigation('/booking')">Booking</button>
          <button class="btn nav-item" @click="handleNavigation('/actividades')">Actividades</button>
          <button class="btn nav-item" @click="handleNavigation('/chat')">Chatea con la IA</button>
          <button class="btn nav-item" @click="handleNavigation('/trenes')">Trenes</button>
        </nav>
      </transition>

      <!-- Botones de acción -->
      <transition name="slide-fade">
        <div v-if="menuOpen || isDesktop" class="actions">
          <template v-if="!jwtStore.jwt">
            <router-link to="/login">
              <button class="btn login-button" @click="menuOpen = false">Iniciar sesión</button>
            </router-link>
            <router-link to="/registro">
              <button class="btn signup-button" @click="menuOpen = false">Registrarse</button>
            </router-link>
          </template>
          <template v-else>
            <span class="username">Bienvenido, {{ user.nombre }}</span>
            <button class="btn logout-button" @click="() => { jwtStore.logOut(); menuOpen = false }">
              Cerrar sesión
            </button>
          </template>
        </div>
      </transition>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useJWTStore } from '@/stores/JwtStore';
import { useUserStore } from '@/stores/UserStore';
import { Usuario } from '@/models/Usuario';

const menuOpen = ref(false);
const isDesktop = ref(false);

const jwtStore = useJWTStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const router = useRouter();

const checkViewport = () => {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) menuOpen.value = false;
};

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});

// Cerrar menú y navegar
const handleNavigation = (path: string) => {
  router.push(path);
  menuOpen.value = false;
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: #183263;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 35px;
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
  gap: 12px;
}

.logo {
  font-size: 1.7rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    color: #018ef6;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

/* Estilos base para todos los botones */
.btn {
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: center; // centrado en mobile
  gap: 12px;
  width: 100%;
}

.nav-item {
  background-color: transparent;
  color: white;

  &:hover {
    background-color: rgba(1, 142, 246, 0.2);
    color: white;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.login-button {
  background-color: #fd6f01;
  color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
}

.signup-button {
  background-color: #018ef6;
  color: white;

  &:hover {
    background-color: #0175cc;
  }
}

.logout-button {
  background-color: #fd6f01;
  color: white;

  &:hover {
    background-color: #e66000;
  }
}

.username {
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 8px;
}

.header-title {
  text-align: center;
  padding: 40px 16px;
}

.first-title {
  font-size: 1.5rem;
  margin-top: 140px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

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
    gap: 12px;
    width: auto;
    align-items: center;
  }

  .nav-item {
    width: auto;
    padding: 8px 16px;
  }

  .actions {
    flex-direction: row;
    gap: 12px;
    width: auto;
    align-items: center;
  }

  .username {
    margin: 0 12px 0 0;
    text-align: left;
  }

  .first-title {
    font-size: 2rem;
    margin-top: 5%;
  }

  .header-title {
    padding: 10px 24px;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
