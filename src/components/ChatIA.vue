<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userInput = ref('')
const messages = ref([])

const sendMessage = async () => {
  if (!userInput.value) return

  messages.value.push({ role: 'Tú', content: userInput.value })

  try {
    const response = await axios.post('https://localhost:7333/api/chat', {
      message: userInput.value
    })

    messages.value.push({ role: 'IA', content: response.data.reply })
  } catch (error) {
    console.error('Error en la petición:', error)
    messages.value.push({
      role: 'Sistema',
      content: 'Hubo un error al contactar con la IA.'
    })
  }

  userInput.value = ''
}
</script>

<template>
  <div class="chat-container">
    <div class="messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'message',
          msg.role === 'Tú' ? 'user' : msg.role === 'IA' ? 'ia' : 'system'
        ]"
      >
        <strong>{{ msg.role }}:</strong> {{ msg.content }}
      </div>
    </div>

    <div class="chat-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Escribe tu mensaje..."
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>



  <style scoped>
/* Estilos para el contenedor del chat */
.chat-container {
  max-width: 600px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  background: #fefefe;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 6px 14px rgb(0 0 0 / 0.08);
  height: 600px;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.messages::-webkit-scrollbar {
  width: 10px;
}
.messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

.message {
  max-width: 80%;
  padding: 1rem 1.4rem;
  border-radius: 14px;
  font-size: 1.05rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.message.user {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.ia {
  align-self: flex-start;
  background-color: #f2f2f2;
  color: #222;
  border-bottom-left-radius: 4px;
}

.message.system {
  align-self: center;
  background-color: #eee;
  color: #555;
  font-style: italic;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  max-width: 90%;
}

.chat-input {
  display: flex;
  gap: 1rem;
}

input[type="text"] {
  flex-grow: 1;
  padding: 0.9rem 1.2rem;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 1.05rem;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007bff;
}

button {
  padding: 0.9rem 1.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}


</style>
  