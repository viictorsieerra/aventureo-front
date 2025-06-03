<template>
  <v-container fluid class="pa-0">
    <v-carousel
      cycle
      height="500"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in images"
        :key="i"
      >
        <v-img
          :src="item.src"
          height="500"
          cover
        >
          <div class="text-overlay">
            <h1 class="headline text-white text-center">
              {{ item.text }}
            </h1>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
const images = [
  {
    src: 'https://nomolesten.com/blog/wp-content/uploads/2020/06/insta-5.jpg',
    text: 'Recarga las pilas y disfruta de unas vacaciones inolvidables'
  },
  {
    src: 'https://www.rocroi.com/wp-content/uploads/2022/07/MicrosoftTeams-image-13.jpg',
    text: 'Explora montañas y vive la aventura de tu vida'
  },
  {
    src: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/05131912/hoteles-lujo-marrakech-3.jpg',
    text: 'Relájate en hoteles de ensueño con vistas increíbles'
  },
  {
    src: 'https://www.sostenibilidad.com/media/512028/dia-mundial-medio-ambiente.jpg',
    text: 'Conecta con la naturaleza y disfruta de la tranquilidad'
  }
]
</script>

<style scoped>
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
}

.headline {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

@media (max-width: 768px) {
  .headline {
    font-size: 1.8rem;
  }
}
</style>
