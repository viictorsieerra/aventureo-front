<template>
  <div class="soporte">
    <h1 class="soporte__title">📩 Contacta con nuestro soporte</h1>
    <p class="soporte__subtitle">Rellena el siguiente formulario y te responderemos lo antes posible.</p>

    <form class="soporte__form" @submit.prevent="enviarFormulario">
      <div class="soporte__form-group">
        <label for="nombre" class="soporte__label">Nombre</label>
        <input type="text" id="nombre" v-model="nombre" required class="soporte__input" />
      </div>

      <div class="soporte__form-group">
        <label for="email" class="soporte__label">Correo electrónico</label>
        <input type="email" id="email" v-model="email" required class="soporte__input" />
      </div>

      <div class="soporte__form-group">
        <label for="mensaje" class="soporte__label">Mensaje</label>
        <textarea id="mensaje" v-model="mensaje" required class="soporte__textarea"></textarea>
      </div>

      <button type="submit" class="soporte__button">Enviar</button>
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
  const serviceID = 'service_sslr93d'      // pon aquí tu Service ID de EmailJS
  const templateID = 'template_mzdrcgf'    // pon aquí tu Template ID de EmailJS
  const publicKey = 'FCJzqoAYWJEYNdcWb'    // pon aquí tu Public Key de EmailJS

  const templateParams = {
    from_name: nombre.value,
    from_email: email.value,
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
    })
    .catch((error) => {
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
.soporte {
  max-width: 100%;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  margin: 1rem auto;

  &__title {
    color: #183263;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__subtitle {
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form-group {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    color: #183263;
    font-weight: 600;
    font-size: 1rem;
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    resize: none;

    &:focus {
      outline: none;
      border-color: #018ef6;
      box-shadow: 0 0 5px #018ef6;
    }
  }

  &__textarea {
    min-height: 120px;
    resize: vertical;
  }

  &__button {
    background-color: #fd6f01;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    align-self: center;
    width: 100%;

    &:hover {
      background-color: #026bb5;
    }
  }

  // Desktop styles
  @media (min-width: 768px) {
    max-width: 600px;
    padding: 2rem;

    &__title {
      font-size: 2.4rem;
      text-align: left;
    }

    &__subtitle {
      font-size: 1.125rem;
      text-align: left;
      margin-bottom: 2rem;
    }

    &__form {
      flex-direction: column;
    }

    &__button {
      width: auto;
      align-self: flex-start;
      padding: 0.75rem 2rem;
      font-size: 1.125rem;
    }
  }
}
</style>
