import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"

export const usePlaces = () => {

    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Places'

    function GetPlacesByQuery(params: QueryPlaces) {
        return fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then(res => res.json());
    }

    return { GetPlacesByQuery }
}

export interface QueryPlaces {
    location?: string,
    radius?: number
}