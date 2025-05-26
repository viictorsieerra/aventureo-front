<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = canvas.value.offsetWidth
  canvas.value.height = canvas.value.offsetHeight

  ctx.font = '20px sans-serif'

  const messages = [
    { text: 'Hola, ¿en qué puedo ayudarte?', color: '#0288D1', align: 'left' },
    { text: 'Quiero organizar un viaje a Italia.', color: '#1f2937', align: 'right' },
    { text: 'Perfecto, ¿qué ciudades te gustaría visitar?', color: '#0288D1', align: 'left' },
    { text: 'Roma, Florencia y Venecia.', color: '#1f2937', align: 'right' }
  ]

  let yStart = 50
  let i = 0

  function drawMessage() {
    if (i < messages.length) {
      const msg = messages[i]
      const padding = 20
      const bubbleHeight = 40
      const textWidth = ctx.measureText(msg.text).width + padding * 2
      const maxWidth = canvas.value.width - 40

      // Calcula posición X según alineación
      const x = msg.align === 'left' ? 20 : maxWidth - textWidth

      // Dibuja burbuja
      ctx.fillStyle = msg.align === 'left' ? '#e0e7ff' : '#f3f4f6'
      ctx.fillRect(x, yStart - 25, textWidth, bubbleHeight)

      // Dibuja texto
      ctx.fillStyle = msg.color
      ctx.fillText(msg.text, x + padding, yStart)

      yStart += 70
      i++

      setTimeout(drawMessage, 1200)
    } else {
      // Reinicia después de unos segundos
      setTimeout(() => {
        clearChat()
        i = 0
        yStart = 50
        drawMessage()
      }, 3000)
    }
  }

  function clearChat() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }

  drawMessage()
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
