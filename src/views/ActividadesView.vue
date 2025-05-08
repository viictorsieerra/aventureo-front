<script lang="ts" setup>
import Mapa from '@/components/Mapa.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';
const isLoading = ref(false)
</script>
<template>
    <SearchBar :loading="isLoading" />
    <Mapa />
</template>