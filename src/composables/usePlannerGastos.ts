import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers";
import type { CreateGasto, UpdateGasto } from "@/models/Gasto";
import type { CreateViaje, UpdateViaje } from "@/models/Viaje";
import { useJWTStore } from "@/stores/JwtStore";
import { errorMessages } from "vue/compiler-sfc";

export const usePlannerGastos = () => {
    const jwtStore = useJWTStore()
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL)

    async function getCategorys() {
        return fetch(baseUrl + '/Category')
            .then(res => res.json())
    }

    async function getViajes() {
        return fetch(baseUrl + '/Viaje/Auth', {
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}` }
        })
            .then(res => res.json())

    }

    async function createViaje(newTravel?: CreateViaje) {
        return fetch(baseUrl + '/Viaje', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTravel)
        })
            .then(res => res.json)
            .catch(error => console.error('ERROR ', error))
    }

    async function createGasto(newGasto?: CreateGasto) {
        return fetch(baseUrl + '/Gasto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGasto)
        })
            .then(res => res.json())
            .catch(error => console.error('ERROR ', error))
    }

    async function getGastos(idViaje?: number) {
        return fetch(baseUrl + '/Gasto/Viaje/'+ idViaje)
        .then(res => res.json())
        .catch(error => console.error('ERROR ', error))
    }

    async function updateGasto(uptGasto?: UpdateGasto) {
        fetch(baseUrl + '/Gasto', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(uptGasto)
        }).then(res => res.json())
        .catch(error => console.log('ERROR ', error))
    }
        async function updateViaje(uptViaje?: UpdateViaje) {
        fetch(baseUrl + '/Viaje', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(uptViaje)
        }).then(res => res.json())
        .catch(error => console.log('ERROR ', error))
    }

    async function deleteViaje (idViaje: number) {
        fetch(baseUrl + '/Viaje/'+ idViaje, {
            method: 'DELETE'
        }).then(res => res.ok)
        .catch(error => console.log('ERROR ', error))
        
    }

    return { getCategorys, createViaje, getViajes, createGasto, getGastos, updateGasto, updateViaje, deleteViaje }
}



