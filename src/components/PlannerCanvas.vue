<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = 600
  canvas.value.height = 500

  const options = ['Transporte', 'Alojamiento', 'Actividades', 'Comidas', 'Excursiones']
  const selected = []
  let counter = 0

  function draw() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    ctx.fillStyle = '#4DD0E1'
    ctx.font = '24px sans-serif'
    ctx.fillText('Planificador', 20, 40)

    options.forEach((opt, i) => {
      ctx.fillStyle = selected.includes(opt) ? '#3493a0' : '#fff'
      ctx.strokeStyle = '#4DD0E1'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(20, 60 + i * 60, 200, 40, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = selected.includes(opt) ? '#fff' : '#333'
      ctx.font = '18px sans-serif'
      ctx.fillText(opt, 30, 90 + i * 60)
    })

    ctx.fillStyle = '#4DD0E1'
    ctx.font = '16px sans-serif'
    ctx.fillText('Total: ' + selected.length + ' seleccionados', 20, 420)
  }

  // Animación automática de selección
  function animate() {
    if (counter < options.length) {
      selected.push(options[counter])
      counter++
      draw()
      setTimeout(animate, 1000)
    } else {
      setTimeout(() => {
        selected.length = 0
        counter = 0
        draw()
        setTimeout(animate, 1000)
      }, 2000)
    }
  }

  draw()
  animate()
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 12px;
}
</style>
