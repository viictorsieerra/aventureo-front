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

      <p class="register-link">
        ¿No tienes cuenta?
        <router-link to="/registro">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useJWTStore } from '@/stores/JwtStore';
import LoginUser from '@/models/LoginUser';
import { ref } from 'vue';

const store = useJWTStore();
const loginUser = ref(new LoginUser())

const submitForm = () => {
  console.log('DATOS ENVIADOS: ', loginUser)
  store.loginUser(loginUser.value)

  console.log("Formulario de inicio de sesión enviado", loginUser.value);
};
</script>

<style scoped lang="scss">
.login-container {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 450px;
  margin: 100px auto;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background-color: #0288D1;
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0277bd;
}
.register-link {
  text-align: center;
  margin-top: 16px;
  font-size: 0.95rem;

  a {
    color: #0288D1;
    text-decoration: none;
    margin-left: 4px;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #0277bd;
      text-decoration: underline;
    }
  }
}

</style>
