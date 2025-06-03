<template>
  <header class="navbar">
    <div class="navbar__container">
      <LogoAventureo class="navbar__logo" @click="handleNavigation('/')" />

      <!-- Botón hamburguesa móvil -->
      <button class="navbar__menu-toggle" @click="menuOpen = !menuOpen">
        <span v-if="!menuOpen">☰</span>
        <span v-else>×</span>
      </button>

      <!-- Navegación con transición -->
      <transition name="slide-fade">
        <nav v-if="menuOpen || isDesktop" class="navbar__nav">
          <button class="navbar__btn navbar__nav-item" :class="{ 'navbar__nav-item--active': isActivePath('/booking') }"
            @click="handleNavigation('/booking')">Booking</button>
          <button class="navbar__btn navbar__nav-item"
            :class="{ 'navbar__nav-item--active': isActivePath('/actividades') }"
            @click="handleNavigation('/actividades')">Actividades</button>
          <button class="navbar__btn navbar__nav-item" :class="{ 'navbar__nav-item--active': isActivePath('/chat') }"
            @click="handleNavigation('/chat')">Ventu</button>
          <button class="navbar__btn navbar__nav-item"
            :class="{ 'navbar__nav-item--active': isActivePath('/planificador') }"
            @click="handleNavigation('/planificador')">Planificador de
            gastos</button>
        </nav>
      </transition>

      <!-- Botones de acción -->
      <transition name="slide-fade">
        <div v-if="menuOpen || isDesktop" class="navbar__actions">
          <template v-if="!jwtStore.jwt">
            <router-link to="/login">
              <button class="navbar__btn navbar__login-button" @click="menuOpen = false">Iniciar sesión</button>
            </router-link>
            <router-link to="/registro">
              <button class="navbar__btn navbar__signup-button" @click="menuOpen = false">Registrarse</button>
            </router-link>
          </template>
          <template v-else>
            <v-menu open-on-click>
              <template v-slot:activator="{ props }">
                <v-btn color="#fd6f01" v-bind="props" class="navbar__actions-avatar">
                  <span style="color: white;">{{ user.nombre?.charAt(0) }}</span>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="navbar__actions-avatar__item" v-if="user.rolAdmin">
                    <router-link to="/admin">Zona de administrador</router-link>
                  </v-list-item-title>
                  <v-list-item-title class="navbar__actions-avatar__item" @click="jwtStore.logOut">
                    Cerrar Sesión
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJWTStore } from '@/stores/JwtStore';
import { useUserStore } from '@/stores/UserStore';
import LogoAventureo from './LogoAventureo.vue';

const menuOpen = ref(false);
const isDesktop = ref(false);

const jwtStore = useJWTStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const router = useRouter();
const route = useRoute()

const checkViewport = () => {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) menuOpen.value = false;
};

const isActivePath = (path: string) => route.path === path;

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
$primary-color: #018ef6;
$secondary-color: #fd6f01;
$hover-bg-color: rgba(0, 142, 246, 0.2);

.navbar {
  background-color: #183263;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 35px;
  position: static;
  top: 0;
  left: 0;
  z-index: 50;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__logo {
    font-size: 1.7rem;
    font-weight: bold;
    cursor: pointer;
    color: white;
  }

  &__menu-toggle {
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
      color: $primary-color;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  &__btn {
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

  &__nav-item {
    background-color: transparent;
    color: white;

    &:hover {
      background-color: $hover-bg-color;
      color: white;
    }
    &--active {
      color: #fd6f01;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
  }

  &__login-button {
    background-color: $secondary-color;
    color: #ffffff;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  &__signup-button {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  &__actions-avatar {
    width: 50px !important;
    height: 50px !important;
    min-width: 40px !important;
    padding: 0 !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.2rem !important;
    font-weight: bold;
    color: white !important;
    user-select: none;
    cursor: pointer;

    &avatar__item {
      color: white;
      text-align: center;
    }

    &__item {
      color: #fd6f01;
      padding: 10px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
      border-radius: 8px;
      text-align: center;
      display: block;

      &:hover {
        background-color: rgba(253, 111, 1, 0.2); // color secundario con opacidad
        color: $secondary-color;
      }

      a {
        color: inherit;
        text-decoration: none;
        display: block;
        width: 100%;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (min-width: 768px) {
    &__menu-toggle {
      display: none;
    }

    &__container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    &__nav {
      flex-direction: row;
      gap: 12px;
      width: auto;
      align-items: center;
    }

    &__nav-item {
      width: auto;
      padding: 8px 16px;
      font-size: larger;
    }

    &__actions {
      flex-direction: row;
      gap: 12px;
      width: auto;
      align-items: center;
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
}
</style>
