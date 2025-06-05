<template>
  <div class="soporte-page">
    <h1>📩 Contacta con nuestro soporte</h1>
    <p>Rellena el siguiente formulario y te responderemos lo antes posible.</p>

    <form @submit.prevent="enviarFormulario">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="nombre" required />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="mensaje">Mensaje</label>
        <textarea id="mensaje" v-model="mensaje" required></textarea>
      </div>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

const nombre = ref('')
const email = ref('')
const mensaje = ref('')

function enviarFormulario() {
  const serviceID = 'service_sslr93d'      
  const templateID = 'template_bysfopq'
  const publicKey = 'FCJzqoAYWJEYNdcWb'      

  const templateParams = {
    name: nombre.value,
    email: email.value,
    message: mensaje.value,
  }

  emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Gracias por contactar con nosotros. Te responderemos pronto.',
        confirmButtonColor: '#018ef6'
      })
      
      nombre.value = ''
      email.value = ''
      mensaje.value = ''
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: 'Hubo un problema enviando el mensaje, inténtalo más tarde.',
        confirmButtonColor: '#fd6f01'
      })
      console.error('EmailJS error:', error)
    })
}

</script>

<style scoped lang="scss">
.soporte-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

  h1 {
    color: #183263;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #183263;
      font-weight: 600;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #018ef6;
      }
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }
  }

  button {
    background-color: #018ef6;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
      background-color: #026bb5;
    }
  }
}
</style>
