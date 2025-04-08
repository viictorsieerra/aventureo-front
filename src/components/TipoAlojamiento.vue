<template>
    <section class="alojamiento-section">
      <h2 class="section-title">Busca por tipo de alojamiento</h2>
      <div class="alojamiento-grid">
        <div 
          v-for="tipo in tiposAlojamiento" 
          :key="tipo.nombre" 
          class="alojamiento-card"
        >
          <img :src="tipo.imagen" :alt="tipo.nombre" class="alojamiento-img" />
          <h3 class="alojamiento-nombre">{{ tipo.nombre }}</h3>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  interface TipoAlojamiento {
    nombre: string;
    imagen: string;
  }
  
  const tiposAlojamiento: TipoAlojamiento[] = [
    {
      nombre: 'Resort',
      imagen: 'https://www.kayak.es/rimg/himg/e1/5b/f8/expediav2-42996-f561b3-210999.jpg?width=1366&height=768&crop=true',
    },
    {
      nombre: 'Villas',
      imagen: 'https://www.marbella-hills-homes.com/cms/wp-content/uploads/2018/05/mh2998_1_villa-and-pool.jpg',
    },
    {
      nombre: 'Apartamentos',
      imagen: 'https://sierrablancaestates.com/wp-content/uploads/2024/04/slider-12-1024x782.jpg',
    },
    {
      nombre: 'Chalets',
      imagen: 'https://propertynational.com/wp-content/uploads/2021/04/chalet.png',
    },
  ];
  </script>
  
  <style scoped>
  .alojamiento-section {
    padding: 32px 50px;
    background-color: #f5f5f5;
    text-align: center;
    margin-top: 10%;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
  
  .alojamiento-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .alojamiento-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .alojamiento-card:hover {
    transform: scale(1.02);
  }
  
  .alojamiento-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .alojamiento-nombre {
    padding: 12px;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  
  @media (min-width: 640px) {
    .alojamiento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .alojamiento-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  </style>
  