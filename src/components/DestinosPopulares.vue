<template>
    <section class="destinos-section">
      <h2 class="section-title">Destinos Populares</h2>
      <div class="destinos-grid">
        <router-link
  v-for="destino in destinos"
  :key="destino.nombre"
  :to="destino.ruta"
  class="destino-card"
>
  <img :src="destino.imagen" :alt="destino.nombre" class="destino-img" />
  <h3 class="destino-nombre">{{ destino.nombre }}</h3>
</router-link>

      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  interface Destino {
  nombre: string;
  imagen: string;
  ruta: string; 
}

const destinos: Destino[] = [
  {
    nombre: 'París',
    imagen: 'https://www.eldigitaldecanarias.net/images/aaa-2018/June/16/Pedido_1159.jpg',
    ruta: '/destinos/paris',
  },
  {
    nombre: 'Tokio',
    imagen: 'https://www.cruceroclick.com/admin/archivos/Image/PAISAJES/JAPON/Tokio/TOKIO%20Santuario%20Yasukuni.jpg',
    ruta: '/destinos/tokio',
  },
  {
    nombre: 'Nueva York',
    imagen: 'https://pro-api.descapada.com/storage/escapades_imagenes/L5OKEkMAgGBZFmqZn7ulMd3cPUqrWQQ1ecGtyduu.jpg',
    ruta: '/destinos/nueva-york',
  },
  {
    nombre: 'Barcelona',
    imagen: 'https://static.independent.co.uk/2024/11/27/16/iStock-875273240.jpg',
    ruta: '/destinos/barcelona',
  },
];
  </script>
  
  <style scoped>
  .destinos-section {
    padding: 32px 16px;
    margin-top: 120px;
    background-color: #fff;
    text-align: center;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
  
  .destinos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .destino-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    text-decoration: none;
    color: inherit;
  }
  
  .destino-card:hover {
    transform: scale(1.02);
  }
  
  .destino-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .destino-nombre {
    padding: 12px;
    font-size: 1.1rem;
    font-weight: 600;
  }
  

  @media (min-width: 640px) {
    .destinos-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .destinos-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  </style>
  