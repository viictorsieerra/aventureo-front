<script setup lang="ts">
import { ref } from 'vue'
import { useAI } from '@/composables/useAI'

interface Message {
  role: 'Tú' | 'Ventu' | 'Sistema'
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
    messages.value.push({ role: 'Ventu', content: response })
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
messages.value.push({role: 'Ventu', content:'Hola soy Ventu, ¿En qué puedo ayudarte?'})
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
<button @click="sendMessage" class="btn-principal">Enviar</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat {
  max-width: 100%;
  margin: 2rem 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fefefe;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  height: 80vh;
  max-height: 600px;

  &__messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }
  }

  &__message {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 14px;
    font-size: 1rem;
    line-height: 1.4;
    word-wrap: break-word;

    &--tú {
      align-self: flex-end;
      background-color: #018ef6;
      color: white;
      border-bottom-right-radius: 4px;
    }

    &--ventu {
      align-self: flex-start;
      background-color: #e0e7ff;
      color: #183263;
      border-bottom-left-radius: 4px;
    }

    &--sistema {
      align-self: center;
      background-color: #eee;
      color: #555;
      font-style: italic;
      padding: 0.6rem 1rem;
      border-radius: 10px;
      max-width: 90%;
      font-size: 0.9rem;
    }
  }

  &__input {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    &-field {
      flex: 1 1 auto;
      padding: 0.75rem 1rem;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #018ef6;
      }
    }

    .btn-principal {
      flex: 1 1 auto;
      width: 100%;
      margin-top: 0.5rem;
    }
  }
}

/* BOTÓN PRINCIPAL — estilo Aventureo */
.btn-principal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background-color: #fd6f01;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(253, 111, 1, 0.35);
  white-space: nowrap;

  &:hover {
    background-color: #e85e00;
    box-shadow: 0 6px 16px rgba(253, 111, 1, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    background-color: #c74e00;
    box-shadow: 0 3px 10px rgba(253, 111, 1, 0.4);
    transform: scale(0.97);
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
}

/* RESPONSIVE */
@media (min-width: 600px) {
  .chat {
    max-width: 600px;
    margin: 3rem auto;
    height: 600px;

    &__messages {
      padding: 1rem;
      gap: 1rem;
    }

    &__message {
      max-width: 80%;
      padding: 1rem 1.4rem;
      font-size: 1.05rem;
      line-height: 1.5;
    }

    &__input {
      flex-wrap: nowrap;

      &-field {
        flex: 1 1 auto;
        padding: 0.9rem 1.2rem;
        font-size: 1.05rem;
      }

      .btn-principal {
        flex: 0 0 auto;
        width: auto;
        margin-top: 0;
      }
    }
  }
}

</style>
