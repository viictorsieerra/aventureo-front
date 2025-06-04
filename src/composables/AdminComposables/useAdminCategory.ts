import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { Category } from "@/models/Category"
import { useJWTStore } from "@/stores/JwtStore"

export const useAdminCategory = () => {
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Category'
    const jwtStore = useJWTStore()

    async function getCategorys() {
        return await fetch(baseUrl, {
            headers: {'Authorization': `Bearer ${jwtStore.jwt}`}
        })
            .then(res => res.json())
            .catch(error => console.error('ERROR', error))
    }

    async function addCategory(addCategory: Category) {
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtStore.jwt}`
             },
            body: JSON.stringify(addCategory)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    async function updateCategory(uptCategory: Category) {
        await fetch(baseUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtStore.jwt}`
             },
            body: JSON.stringify(uptCategory)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    async function deleteCategory(id: number) {
        await fetch(baseUrl + '/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}`}
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    return { getCategorys, addCategory, updateCategory, deleteCategory }
}