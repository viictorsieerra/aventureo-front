<template>
    <div>
      <textarea v-model="userMessage" placeholder="Escribe aquí..."></textarea>
      <button @click="enviarMensaje">Enviar</button>
  
      <div v-if="respuestaIA">
        <p><strong>Respuesta de la IA:</strong> {{ respuestaIA }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        userMessage: '', // <--- asegurarse de que está definido
        respuestaIA: null
      }
    },
    methods: {
      async enviarMensaje() {
        try {
            const response = await axios.post("http://localhost:5138/api/chat/mensaje", { message: this.userMessage })
          this.respuestaIA = response.data
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  </script>
  
  
  <style scoped>
  .chat {
    max-width: 500px;
    margin: 2rem auto;
  }
  </style>
  