<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input v-model="loginUser.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="loginUser.contrasena" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useJWTStore } from '@/stores/JwtStore';

const store = useJWTStore();
const loginUser = reactive({
  email: '',
  contrasena: ''
});

const submitForm = async () => {
  try {
    await store.loginUser(loginUser);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
/* Mobile-first: estilos básicos para móviles */
.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90vw;
  margin: 50px auto;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  background-color: #0288d1;
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #0277bd;
}

/* Tablets y pantallas más anchas */
@media (min-width: 600px) {
  .login-container {
    max-width: 450px;
    margin: 80px auto;
    padding: 30px;
  }

  h2 {
    font-size: 2rem;
  }

  input {
    font-size: 1.125rem;
    padding: 14px 12px;
  }

  button {
    font-size: 1.3rem;
  }
}
</style>
