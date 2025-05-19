<template>
  <div class="registration-container">
    <h2>Registro</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input type="text" id="firstName" v-model="registerUser.nombre" required placeholder="Ingresa tu nombre" />
      </div>
      <div class="form-group">
        <label for="lastName">Apellidos</label>
        <input type="text" id="lastName" v-model="registerUser.apellidos" required
          placeholder="Ingresa tus apellidos" />
      </div>
      <div class="form-group">
        <label for="birthDate">Fecha de Nacimiento</label>
        <input type="date" id="birthDate" v-model="registerUser.fecNacimiento" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="registerUser.email" required placeholder="Ingresa tu correo" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="registerUser.contrasena" required
          placeholder="Ingresa tu contraseña" :class="{ 'input-error': passwordError }" />
        <small v-if="passwordError" class="error-message">La contraseña debe tener al menos 6 caracteres.</small>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required
          placeholder="Confirma tu contraseña" :class="{ 'input-error': confirmPasswordError }" />
        <small v-if="confirmPasswordError" class="error-message">Las contraseñas no coinciden.</small>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isSubmitDisabled">Registrarse</button>
      </div>
      
      <p class="login-link">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import RegisterUser from '@/models/RegisterUser';
import { useJWTStore } from '@/stores/JwtStore';
import { ref, computed } from 'vue';

const registerUser = ref(new RegisterUser())
const confirmPassword = ref('')
const JwtStore = useJWTStore()
const password = computed(() => registerUser.value.contrasena)
const passwordError = computed(() => password.value && password.value.length > 0 && password.value.length < 6);
const confirmPasswordError = computed(() => registerUser.value.contrasena !== confirmPassword.value && confirmPassword.value.length > 0);

const isSubmitDisabled = computed(() => passwordError.value || confirmPasswordError.value);

const submitForm = () => {
  if (registerUser.value.contrasena !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }
  console.log('SE VA A ENVIAR ESTE USUARIO', registerUser.value)
  JwtStore.registerUser(registerUser.value)
  console.log("Formulario de registro enviado", registerUser.value);
};
</script>

<style scoped lang="scss">
.registration-container {
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

input.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

button {
  background-color: #4DD0E1;
  color: black;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #29b6b9;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 0.95rem;

  a {
    color: #4DD0E1;
    text-decoration: none;
    margin-left: 4px;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #29b6b9;
      text-decoration: underline;
    }
  }
}
</style>
