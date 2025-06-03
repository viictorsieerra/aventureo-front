<template>
  <div class="chat-container">
    <div class="device-frame">
      <div class="device-notch"></div>
      <div class="chat-screen" ref="chatScreen"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const chatScreen = ref(null)

onMounted(() => {
  const messages = [
    { text: 'Ventu: Hola soy Ventu, ¿En qué puedo ayudarte?', color: '#0288D1', align: 'left' },
    { text: 'Quiero organizar un viaje a Italia.', color: '#1f2937', align: 'right' },
    { text: 'Perfecto, ¿qué ciudades te gustaría visitar?', color: '#0288D1', align: 'left' },
    { text: 'Roma, Florencia y Venecia.', color: '#1f2937', align: 'right' },
    { text: 'Genial, te puedo recomendar algunas rutas.', color: '#0288D1', align: 'left' },
    { text: 'Perfecto, gracias Ventu.', color: '#1f2937', align: 'right' }
  ]

  let i = 0

  function drawMessage() {
    if (i < messages.length) {
      const msg = messages[i]

      const messageBubble = document.createElement('div')
      messageBubble.classList.add('message', msg.align)
      messageBubble.textContent = msg.text
      messageBubble.style.color = msg.color

      chatScreen.value.appendChild(messageBubble)
      chatScreen.value.scrollTop = chatScreen.value.scrollHeight

      i++
      setTimeout(drawMessage, 1200)
    } else {
      setTimeout(() => {
        chatScreen.value.innerHTML = ''
        i = 0
        drawMessage()
      }, 3000)
    }
  }

  drawMessage()
})
</script>

<style scoped>
.chat-container {
  padding: 2rem 1rem;
  text-align: center;
  margin-top: 82%; /* mobile first */
}

.chat-title {
  font-size: 1.6rem;
  color: #183263;
  margin-bottom: 1.5rem;
}

.device-frame {
  width: 360px;
  height: 640px;
  background-color: #f7f7f7;
  border: 12px solid #333;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.device-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background-color: #333;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 2;
}

.chat-screen {
  flex: 1;
  overflow-y: auto;
  margin-top: 30px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f7f7f7;
  border-radius: 24px;
}

.message {
  padding: 12px 16px;
  max-width: 80%;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.4;
  word-break: break-word;
}

.message.left {
  background-color: #e0e7ff;
  align-self: flex-start;
}

.message.right {
  background-color: #f3f4f6;
  align-self: flex-end;
}

/* Desktop overrides */
@media (min-width: 900px) {
  .chat-container {
    margin-top: 0;
  }
  .device-frame {
    width: 360px;
    height: 640px;
  }
}
</style>
