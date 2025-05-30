<template>
  <header class="header">
    <div class="header__container">
      <router-link to=""><h1 class="header__logo">Aventureo</h1></router-link>

      <button class="header__menu-toggle" @click="menuOpen = !menuOpen">
        <span v-if="!menuOpen">☰</span>
        <span v-else>×</span>
      </button>

      <nav v-if="menuOpen || isDesktop" class="header__nav">
        <router-link to="booking"><button class="header__nav-item">Booking</button></router-link>
        <router-link to="actividades"><button class="header__nav-item">Actividades</button></router-link>
        <router-link to="chat"><button class="header__nav-item">Ventu</button></router-link>
        <button class="header__nav-item">Trenes</button>
      </nav>

      <div v-if="menuOpen || isDesktop" class="header__actions">
        <template v-if="!user || !jwtStore.jwt">
          <router-link to="/login">
            <button class="header__login-button">Iniciar sesión</button>
          </router-link>
          <router-link to="/registro">
            <button class="header__signup-button">Registrarse</button>
          </router-link>
        </template>
        <template v-else>
          <v-menu open-on-click>
            <template v-slot:activator="{ props }">
              <v-btn color="white" v-bind="props" class="header__actions-avatar">
                <span style="color: #0288D1;">{{ user.nombre.charAt(0) }}</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title class="header__actions-avatar__item">
                   <router-link to="/planificador">Planificador de gastos</router-link>
                </ v-list-item-title>
                <v-list-item-title class="header__actions-avatar__item" @click="jwtStore.logOut">
                  Cerrar Sesión
                </ v-list-item-title>
              </v-list-item>
            </ v-list>
          </v-menu>
        </template>
      </div>
    </div>

    <div class="header__title">
      <h1 class="header__main-title">Piensa un lugar y disfruta del viaje!</h1>
    </div>
  </header>
</template>



<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useJWTStore } from '@/stores/JwtStore'
import { useUserStore } from '@/stores/UserStore';

const menuOpen = ref(false);
const isDesktop = ref(false);

const jwtStore = useJWTStore();
const userStore = useUserStore()

const user = computed(() => userStore.user)

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
.header {
  background-color: #0288D1;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  position: static;
  top: 0;
  left: 0;
  z-index: 50;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }

  &__menu-toggle {
    background: none;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffbf;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 24px;
      width: auto;
    }

    &-item {
      background: none;
      border: none;
      color: white;
      font-size: 1rem;
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
      width: 100%;
      text-align: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      @media (min-width: 768px) {
        width: auto;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;

    &-avatar {
        height: 64px;
        width: 64px;
        display: flex;
        place-items: center;
        justify-content: center;
        background-color: red;
        border-radius: 100%;
        color: black;

        &:hover {
          cursor: pointer;
        }
        
        &__item, &__item a {
        text-align: center;
        color: #aaa;
        text-decoration: none;

        &:hover {
          cursor: pointer;
        }
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
      width: auto;
      gap: 12px;
    }
  }

  &__login-button,
  &__signup-button {
    background-color: white;
    color: #003580;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #f7f7f7;
      transform: translateY(-2px);
    }

    @media (min-width: 768px) {
      width: auto;
    }
  }

  &__signup-button {
    background-color: #4DD0E1;
    color: black;

    &:hover {
      background-color: #4DD0E1;
    }
  }

  &__title {
    text-align: center;
    padding: 40px 16px;

    @media (min-width: 768px) {
      padding: 10px 24px;
    }
  }

  &__main-title {
    font-size: 1.5rem;
    margin-top: 140px;

    @media (min-width: 768px) {
      font-size: 2rem;
      margin-top: 5%;
    }
  }

  &__user-avatar {
    font-weight: bold;
    color: white;
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

  &:hover {
    color: #ffffbf;
  }
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

  &-content {
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
}

.close-btn {
  position: absolute;
  top: -11px;
  right: 3px;
  font-size: 2rem;
  cursor: pointer;
  color: #48a259;
  transition: color 0.3s ease;

  &:hover {
    color: #d78d00;
  }
}
</style>
