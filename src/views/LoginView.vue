<template>
  <div class="login">
    <h2 class="login__title">Iniciar sesión</h2>
    <form class="login__form" @submit.prevent="submitForm">
      <div class="login__form-group">
        <label class="login__label" for="email">Correo electrónico</label>
        <input v-model="loginUser.email" type="email" id="email" class="login__input" required />
      </div>
      <div class="login__form-group">
        <label class="login__label" for="password">Contraseña</label>
        <input v-model="loginUser.contrasena" type="password" id="password" class="login__input" required />
      </div>
      <button type="submit" class="login__button">Iniciar sesión</button>
    </form>

    <div class="login__register-link">
      <p class="login__register-text">
        ¿No tienes cuenta?
        <router-link to="/registro" class="login__register-link-anchor">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useJWTStore } from '@/stores/JwtStore';
import Swal from 'sweetalert2';

const store = useJWTStore();
const loginUser = reactive({
  email: '',
  contrasena: ''
});

const submitForm = async () => {
  try {
    await store.loginUser(loginUser);

    Swal.fire({
      title: "Has iniciado sesión correctamente",
      text: "Bienvenido de nuevo",
      icon: "success",
      draggable: true,
      confirmButtonColor: '#fd6f01',
      color: '#183263',
    });

  } catch (error: any) {
    console.error(error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.',
      confirmButtonColor: '#fd6f01',
      color: '#183263',
    });
  }
};
</script>

<style scoped lang="scss">
.login {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90vw;
  margin: 50px auto;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  color: #183263;

  &__title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #183263;
  }

  &__form-group {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    margin-bottom: 6px;
    font-size: 1rem;
    font-weight: 600;
    color: #183263;
  }

  &__input {
    width: 100%;
    padding: 12px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
    color: #183263;

    &::placeholder {
      color: #018ef6;
    }
  }

  &__button {
    background-color: #183263;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    user-select: none;

    &:hover {
      background-color: #121f42;
    }
  }

  &__register-link {
    margin-top: 15px;
    text-align: center;
    font-size: 1rem;

    &-anchor {
      color: #018ef6;
      font-weight: 600;
      text-decoration: none;
      margin-left: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #fd6f01;
      }
    }

    &-text {
      color: #183263;
    }
  }
}

@media (min-width: 600px) {
  .login {
    max-width: 450px;
    margin: 80px auto;
    padding: 30px;

    &__title {
      font-size: 2rem;
    }

    &__input {
      font-size: 1.125rem;
      padding: 14px 12px;
    }

    &__button {
      font-size: 1.3rem;
    }
  }
}
</style>
