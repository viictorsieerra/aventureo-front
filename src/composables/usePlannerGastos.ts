import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers";
import type { CreateViaje } from "@/models/Viaje";
import { useJWTStore } from "@/stores/JwtStore";

export const usePlannerGastos = () => {
    const jwtStore = useJWTStore()
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL)

    async function getCategorys() {
        return fetch(baseUrl + '/Category')
            .then(res => res.json())
    }

    async function getViajes() {
        return fetch(baseUrl + '/Viaje', {
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

    return { getCategorys, createViaje, getViajes }
}



