<template>
    <section class="alojamiento-section">
      <h2 class="section-title">Busca por tipo de alojamiento</h2>
      <div class="alojamiento-carousel">
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
    {
      nombre: 'Hostales',
      imagen: 'https://www.hostalaliste.net/fotos/habitaciones/303/IMG_20240725_113606.jpg',
    },
    {
      nombre: 'Cabañas',
      imagen: 'https://media.revistaad.es/photos/675333fcdcb35fca26b2c679/4:3/w_1600%2Cc_limit/5ebdf805-e717-4e3d-9c3a-fdba1234.png',
    },
    {
      nombre: 'Albergues',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYtk1DcG2Ggk0wWlA3xSh1vlenV7GIdQBygw&s',
    },
  ];
  </script>
  
  <style scoped>
  .alojamiento-section {
    padding: 32px 16px;
    background-color: #f5f5f5;
    text-align: center;
    margin-top: 64px;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
  
  .alojamiento-carousel {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding-bottom: 16px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  
  .alojamiento-card {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: 220px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .alojamiento-card:hover {
    transform: scale(1.03);
  }
  
  .alojamiento-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .alojamiento-nombre {
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
  }
  

  .alojamiento-carousel::-webkit-scrollbar {
    display: none;
  }
  .alojamiento-carousel {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  