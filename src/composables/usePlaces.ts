import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"

export const usePlaces = () => {
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Places'


    async function GetPlacesByQuery(params: QueryPlaces) {
        return await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        })
            .then(res => res.json())
            .catch(error => {
                console.error('Error al recibir alojamientos:', error)
            })
    }

    async function GetInfoPlace(placeId?: string) {
        return await fetch(baseUrl + `?placeId=${placeId}`)
            .then(res => res.json())
            .catch(error => {
                console.error('Error al recibir información del sitio:', error)
            })
    }

    return { GetPlacesByQuery, GetInfoPlace }
}

export interface QueryPlaces {
    location?: string,
    radius?: number
}

export interface Place {
    name?: string,
    vicinity?: string,
    rating?: number,
    user_ratings_total?: number,
    place_id?: string,
    international_phone_number: string,
    url: string,
    website: string
}
