import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { IUsuario } from "@/models/Usuario"
import { useJWTStore } from "@/stores/JwtStore"

export const useAdminUser = () => {
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/User'
    const jwtStore = useJWTStore()

    async function getUsers() {
        return await fetch(baseUrl, {
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}` }
        })
            .then(res => res.json())
            .catch(error => console.error('ERROR', error))
    }

    async function addUser(newUser: IUsuario) {
        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtStore.jwt}`
            },
            body: JSON.stringify(newUser)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR', error))
    }

    async function updateUser(uptUser: IUsuario) {
        await fetch(baseUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtStore.jwt}`
            },
            body: JSON.stringify(uptUser)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR', error))
    }

    async function deleteUser(id: number) {
        await fetch(baseUrl + '/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}` }
        }).then(res => res.ok)
            .catch(error => console.error('ERROR', error))
    }
    return { getUsers, addUser, updateUser, deleteUser }
}