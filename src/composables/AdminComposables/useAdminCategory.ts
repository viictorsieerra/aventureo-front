import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { Category } from "@/models/Category"

export const useAdminCategory = () => {
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Category'

    async function getCategorys() {
        return await fetch(baseUrl)
            .then(res => res.json())
            .catch(error => console.error('ERROR', error))
    }

    async function addCategory(addCategory: Category) {
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addCategory)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    async function updateCategory(uptCategory: Category) {
        await fetch(baseUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uptCategory)
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    async function deleteCategory(id: number) {
        await fetch(baseUrl + '/' + id, {
            method: 'DELETE'
        }).then(res => res.ok)
            .catch(error => console.error('ERROR ', error))
    }

    return { getCategorys, addCategory, updateCategory, deleteCategory }
}