<script setup lang="ts">
import ServerTable from '@/components/ServerTable.vue';
import type { HeaderTable } from '@/models/HeaderTable';
import { ref } from 'vue';

const headers = ref<HeaderTable[]>([
    { title: 'Acciones', key: 'actions', align: 'center', sortable: false },
    { title: 'IdUsuario', key: 'idUsuario', align: 'start', sortable: false },
    { title: 'Nombre', key: 'nombre', align: 'start', sortable: false },
    { title: 'Apellidos', key: 'apellidos', align: 'start', sortable: false },
    { title: 'Fecha de Nacimiento', key: 'fecNacimiento', align: 'start', sortable: false },
    { title: 'Correo', key: 'email', align: 'start', sortable: false },
    { title: 'Rol', key: 'rolAdmin', align: 'start', sortable: false }
]);

const itemsList = ref<Array<object>>([]);
const itemsPerPage = ref(5);

const fetchData = async () => {
    try {
        const response = await fetch('https://localhost:7333/api/User');
        const data = await response.json();
        itemsList.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const editItem = (item: any) => {
    console.log('Editar usuario:', item);
    // Aquí puedes abrir un modal o navegar a una vista de edición
};

const deleteItem = (item: any) => {
    if (confirm(`¿Seguro que quieres eliminar a ${item.nombre}?`)) {
        console.log('Eliminar usuario:', item);
        // Aquí haces la llamada a la API para borrar
    }
};


fetchData();
</script>

<template>
    <RouterView />
</template>

<style lang="scss" scoped>
</style>
