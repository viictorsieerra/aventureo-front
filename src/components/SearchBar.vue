<template>
    <div class="search-bar">
        <v-text-field
            color="green"
            v-model="textSearched"
            :loading="props.loading"
            density="compact"
            clearable
            hide-details
            class="search-bar__field"
            variant="outlined"
            :placeholder="props.textSearched"
        ></v-text-field>
        <svg @click="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="24px"
            width="24px" class="search-bar__icon" >
            <circle cx="40" cy="40" r="25" stroke="black" stroke-width="5" fill="none" />
            <line x1="58" y1="58" x2="80" y2="80" stroke="black" stroke-width="7" stroke-linecap="round" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props para recibir el estado de loading desde el componente padre
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    textSearched : {
        type: String,
        default: "Buscar"
    }
});

// Emits para comunicar eventos al componente padre
const emit = defineEmits(['search']);

const textSearched = ref('');

const search = () => {
    if (textSearched.value.trim()) {
        emit('search', textSearched.value);
    }
};
</script>

<style scoped lang="scss">
.search-bar {
    display: flex;
    align-items: center;
    justify-content: center ;
    margin: 10px;
    
    &__field {
        margin: 10px;
        max-width: 70%;
    }
    &__icon{
        margin: 10px;
        cursor: pointer;
    }
}
</style>