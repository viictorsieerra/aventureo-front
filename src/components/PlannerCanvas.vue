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

  let gastos = []
  let total = 0
  let counter = 0

  const destinos = ['Salou', 'Madrid', 'Granada', 'Ibiza']
  const categorias = ['Comida', 'Transporte', 'Hotel', 'Excursión']
  const precios = [500, 120, 300, 75]

  function roundRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius }
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side]
      }
    }
    ctx.beginPath()
    ctx.moveTo(x + radius.tl, y)
    ctx.lineTo(x + width - radius.tr, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
    ctx.lineTo(x + width, y + height - radius.br)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
    ctx.lineTo(x + radius.bl, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
    ctx.lineTo(x, y + radius.tl)
    ctx.quadraticCurveTo(x, y, x + radius.tl, y)
    ctx.closePath()
  }

  function drawButton(x, y, width, height, text) {
    ctx.fillStyle = '#4DD0E1'
    ctx.strokeStyle = '#3BB5C9'
    ctx.lineWidth = 2
    roundRect(ctx, x, y, width, height, 10)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#fff'
    ctx.font = '18px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x + width / 2, y + height / 2)
    
    ctx.textAlign = 'start' // reset alignment
    ctx.textBaseline = 'alphabetic'
  }

  function drawUI() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // Card blanca
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 2
    roundRect(ctx, 20, 20, 560, 460, 20)
    ctx.fill()
    ctx.stroke()

    // Título
    ctx.fillStyle = '#333'
    ctx.font = '24px sans-serif'
    ctx.fillText('Planificador de Gastos', 180, 60)

    // Input de destino
    ctx.fillStyle = '#f9f9f9'
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1.5
    ctx.fillRect(40, 90, 200, 35)
    ctx.strokeRect(40, 90, 200, 35)

    ctx.fillStyle = '#888'
    ctx.font = '16px sans-serif'
    ctx.fillText(gastos[counter]?.destino || destinos[counter % destinos.length], 50, 115)

    // Input de categoría
    ctx.fillStyle = '#f9f9f9'
    ctx.fillRect(260, 90, 120, 35)
    ctx.strokeRect(260, 90, 120, 35)
    ctx.fillStyle = '#888'
    ctx.fillText(gastos[counter]?.categoria || categorias[counter % categorias.length], 270, 115)

    // Input de precio
    ctx.fillStyle = '#f9f9f9'
    ctx.fillRect(400, 90, 100, 35)
    ctx.strokeRect(400, 90, 100, 35)
    ctx.fillStyle = '#888'
    ctx.fillText(gastos[counter]?.precio || precios[counter % precios.length] + '€', 410, 115)

    // Botón añadir gasto (con bordes redondos y color nuevo)
    drawButton(40, 140, 460, 40, '+ Añadir Gasto')

    // Línea separadora
    ctx.strokeStyle = '#ccc'
    ctx.beginPath()
    ctx.moveTo(40, 200)
    ctx.lineTo(500, 200)
    ctx.stroke()

    // Gastos añadidos
    gastos.forEach((g, i) => {
      ctx.fillStyle = '#333'
      ctx.font = '16px sans-serif'
      ctx.fillText(`${g.categoria}: ${g.precio}€`, 50, 230 + i * 30)
    })

    // Total
    ctx.fillStyle = '#333'
    ctx.font = '18px sans-serif'
    ctx.fillText(`Total: €${total}`, 50, 420)

    // Botón guardar más centrado y separado de abajo
    drawButton(95, 440, 460 - 40, 30, 'Guardar Viaje')
  }

  function añadirGasto() {
    const nuevo = {
      destino: destinos[counter % destinos.length],
      categoria: categorias[counter % categorias.length],
      precio: precios[counter % precios.length]
    }
    gastos.push(nuevo)
    total += nuevo.precio
    counter++
    drawUI()

    if (gastos.length >= 5) {
      setTimeout(() => {
        gastos = []
        total = 0
        counter = 0
        drawUI()
        setTimeout(añadirGasto, 1000)
      }, 2000)
    } else {
      setTimeout(añadirGasto, 1000)
    }
  }

  drawUI()
  añadirGasto()
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  background-color: #e8f5f9;
  border-radius: 12px;
}
</style>
