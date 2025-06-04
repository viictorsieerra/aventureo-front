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

    <div class="register-link">
      <p>¿No tienes cuenta? 
        <router-link to="/registro">Regístrate</router-link>
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
.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90vw;
  margin: 50px auto;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  color: #183263;
  /* azul oscuro */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #183263;
  /* azul oscuro */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
  font-weight: 600;
  color: #183263;
  /* azul oscuro */
}

input {
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  color: #183263;
  /* azul oscuro */
}

input::placeholder {
  color: #018ef6;
  /* azul claro para placeholder */
}

button.login-button {
  background-color: #183263;
  /* azul oscuro */
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
}

button.login-button:hover {
  background-color: #121f42;
  /* azul más oscuro */
}
.register-link {
  margin-top: 15px;
  text-align: center;
  font-size: 1rem;

  p {
    color: #183263;

    a {
      color: #018ef6;
      font-weight: 600;
      text-decoration: none;
      margin-left: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #fd6f01;
      }
    }
  }
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

  button.login-button {
    font-size: 1.3rem;
  }
}
</style>
