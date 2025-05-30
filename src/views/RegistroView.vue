<template>
  <div class="registration-container">
    <h2>Registro</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          v-model="registerUser.nombre"
          required
          placeholder="Ingresa tu nombre"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          v-model="registerUser.apellidos"
          required
          placeholder="Ingresa tus apellidos"
        />
      </div>
      <div class="form-group">
        <label for="birthDate">Fecha de Nacimiento</label>
        <input
          type="date"
          id="birthDate"
          v-model="registerUser.fecNacimiento"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="registerUser.email"
          required
          placeholder="Ingresa tu correo"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="registerUser.contrasena"
          required
          placeholder="Ingresa tu contraseña"
          :class="{'input-error': passwordError}"
        />
        <small v-if="passwordError" class="error-message">La contraseña debe tener al menos 6 caracteres.</small>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="Confirma tu contraseña"
          :class="{'input-error': confirmPasswordError}"
        />
        <small v-if="confirmPasswordError" class="error-message">Las contraseñas no coinciden.</small>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isSubmitDisabled">Registrarse</button>
      </div>
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
const passwordError = computed(() => password.length> 0 && password.length < 6);
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
  margin: 80px auto 40px auto;
  box-shadow: 0 2px 20px rgba(24, 50, 99, 0.25); /* sombra azul oscuro */

  margin-left: 12px;
  margin-right: 12px;
  max-width: calc(100% - 24px);
  
  @media(min-width: 1024px) {
    max-width: 450px; /* ancho fijo en desktop */
    margin-left: auto;
    margin-right: auto;
  }
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #183263; /* azul oscuro */
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
  color: #183263; /* azul oscuro */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #018ef6; /* azul claro */
  border-radius: 4px;
  font-size: 1rem;
  color: #183263;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #fd6f01; /* naranja */
    outline: none;
  }
}

input.input-error {
  border-color: #fd6f01; /* naranja para error */
}

.error-message {
  color: #fd6f01; /* naranja */
  font-size: 0.9rem;
  margin-top: 5px;
}

button {
  background-color: #183263; /* azul oscuro */
  color: #fff;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(24, 50, 99, 0.4);

  &:hover:not(:disabled) {
    background-color: #018ef6; /* azul claro */
    box-shadow: 0 4px 12px rgba(1, 142, 246, 0.6);
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    box-shadow: none;
  }
}
</style>
