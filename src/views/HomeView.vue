<script lang="ts" setup>
import Header from '@/components/Header.vue';
import TipoAlojamiento from '@/components/TipoAlojamiento.vue';
import Informacion from '@/components/Informacion.vue';
import ChatSection from '@/components/ChatSection.vue';
import DestinosPopulares from '@/components/DestinosPopulares.vue';
import Footer from '@/components/Footer.vue';
import PlanificadorSection from '@/components/PlanificadorSection.vue';

</script>
<template>

    <TipoAlojamiento />
    <Informacion />
    <PlanificadorSection />
        <ChatSection />

    <DestinosPopulares />

</template>