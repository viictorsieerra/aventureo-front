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
export default {
  data() {
    return {
      userMessage: '',
      respuestaIA: null
    }
  },
  methods: {
    async enviarMensaje() {
      try {
        const response = await fetch("https://localhost:7333/api/chat/mensaje", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ texto: this.userMessage })
        })

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        this.respuestaIA = data

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
  