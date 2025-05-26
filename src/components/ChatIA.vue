<script setup lang="ts">
import { ref } from 'vue'
import { useAI } from '@/composables/useAI'

interface Message {
  role: 'Tú' | 'IA' | 'Sistema'
  content: string
}

const userInput = ref<string>('')
const messages = ref<Message[]>([])
const { chatWithAI } = useAI()

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  // Agregar el mensaje del usuario
  messages.value.push({ role: 'Tú', content: userInput.value })

  try {
    // Esperar la respuesta de la IA
    const response = await chatWithAI(userInput.value)
    
    // Agregar la respuesta de la IA
    messages.value.push({ role: 'IA', content: response })
  } catch (error) {
    console.error('Error en la petición:', error)
    messages.value.push({
      role: 'Sistema',
      content: 'Hubo un error al contactar con la IA.'
    })
  }

  // Limpiar el campo de entrada
  userInput.value = ''
}
</script>

<template>
  <div class="chat">
    <div class="chat__messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'chat__message',
          `chat__message--${msg.role.toLowerCase()}`
        ]"
      >
        <strong>{{ msg.role }}:</strong> {{ msg.content }}
      </div>
    </div>

    <div class="chat__input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Escribe tu mensaje..."
        class="chat__input-field"
      />
      <button @click="sendMessage" class="chat__send-button">Enviar</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat {
  max-width: 600px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  background: #fefefe;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  height: 600px;

  &__messages {
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

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }
  }

  &__message {
    max-width: 80%;
    padding: 1rem 1.4rem;
    border-radius: 14px;
    font-size: 1.05rem;
    line-height: 1.5;
    word-wrap: break-word;

    &--tú {
      align-self: flex-end;
      background-color: #007bff;
      color: white;
      border-bottom-right-radius: 4px;
    }

    &--ia {
      align-self: flex-start;
      background-color: #f2f2f2;
      color: #222;
      border-bottom-left-radius: 4px;
    }

    &--sistema {
      align-self: center;
      background-color: #eee;
      color: #555;
      font-style: italic;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      max-width: 90%;
    }
  }

  &__input {
    display: flex;
    gap: 1rem;

    &-field {
      flex-grow: 1;
      padding: 0.9rem 1.2rem;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 1.05rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
      }
    }

    &-button {
      padding: 0.9rem 1.8rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-size: 1.05rem;
      font-weight: 600;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
