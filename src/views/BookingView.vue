<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlaces, type QueryPlaces } from '@/composables/usePlaces';

const { GetPlacesByQuery } = usePlaces()

const query: QueryPlaces = {
    location: 'ghsdg',
    radius: 5000
}

const alojamientos = ref(); // O tipa correctamente si tienes una interfaz

onMounted(async () => {
  alojamientos.value = await GetPlacesByQuery(query);
  console.log("ALOJAMIENTOS", alojamientos.value)
});


</script>

<template>
    <v-col v-for="alojamiento in alojamientos" :key="alojamiento.place_id" cols="12" sm="6" md="4">

        <v-card class="mx-auto my-12" max-width="374">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" src="https://i.pinimg.com/736x/88/a9/8c/88a98ce61ce7f5e6b750c263453c78ec.jpg"
                cover></v-img>

            <v-card-item>
                <v-card-title>{{ alojamiento.name }}</v-card-title>

                <v-card-subtitle>
                    <span class="me-1">{{ alojamiento.vicinity }}</span>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :model-value="alojamiento.rating" color="amber" density="compact" size="small" half-increments
                        readonly></v-rating>

                    <div class="text-grey ms-4">{{ alojamiento.rating }} ({{ alojamiento.user_ratings_total }})</div>
                </v-row>

                <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

                <div>
                    Small plates, salads & sandwiches - an intimate setting with 12 indoor
                    seats plus patio seating.
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-title>Tonight's availability</v-card-title>
        </v-card>

    </v-col>
</template>

<style lang="scss"></style>