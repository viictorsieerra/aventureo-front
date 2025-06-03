import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers";
import type { CreateGasto, UpdateGasto } from "@/models/Gasto";
import type { CreateViaje, UpdateViaje } from "@/models/Viaje";
import { useJWTStore } from "@/stores/JwtStore";
import { errorMessages } from "vue/compiler-sfc";

export const usePlannerGastos = () => {
    const jwtStore = useJWTStore()
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL)

    async function getCategorys() {
        return await fetch(baseUrl + '/Category')
            .then(res => res.json())
    }

    async function getViajes() {
        return await fetch(baseUrl + '/Viaje/Auth', {
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}` }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(errorData => {
                            throw new Error(errorData.message || 'Hubo un error con la solicitud');
                        });
                }
                return res.json();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
            });

    }

    async function createViaje(newTravel?: CreateViaje) {
        return await fetch(baseUrl + '/Viaje', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTravel)
        })
            .then(res => res.json)
            .catch(error => console.error('ERROR ', error))
    }

    async function createGasto(newGasto?: CreateGasto) {
        return await fetch(baseUrl + '/Gasto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGasto)
        })
            .then(res => res.json())
            .catch(error => console.error('ERROR ', error))
    }

    async function getGastos(idViaje?: number) {
        return await fetch(baseUrl + '/Gasto/Viaje/' + idViaje)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(errorData => {
                            throw new Error(errorData.message || 'Hubo un error con la solicitud');
                        });
                }
                return res.json();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
            });
    }

    async function getGastoByCategoria(idViaje?: number) {
        return await fetch(baseUrl + '/Gasto/Resumen/' + idViaje)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(errorData => {
                            throw new Error(errorData.message || 'Hubo un error con la solicitud');
                        });
                }
                return res.json();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
            });
    }

    async function updateGasto(uptGasto?: UpdateGasto) {
        await fetch(baseUrl + '/Gasto', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uptGasto)
        }).then(res => res.json())
            .catch(error => console.log('ERROR ', error))
    }
    async function updateViaje(uptViaje?: UpdateViaje) {
        await fetch(baseUrl + '/Viaje', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uptViaje)
        }).then(res => res.json())
            .catch(error => console.log('ERROR ', error))
    }

    async function deleteViaje(idViaje: number) {
        await fetch(baseUrl + '/Viaje/' + idViaje, {
            method: 'DELETE'
        }).then(res => res.ok)
            .catch(error => console.log('ERROR ', error))

    }

    async function deleteGasto(idGasto: number) {
        await fetch(baseUrl + '/Gasto/' + idGasto, {
            method: 'DELETE'
        })
            .then(res => res.ok)
            .catch(error => console.log('ERROR ', error))
    }

    return { getCategorys, createViaje, getViajes, createGasto, getGastos, getGastoByCategoria, updateGasto, updateViaje, deleteViaje, deleteGasto }
}



