import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import { ref } from "vue"


export const useAI = () => {
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/AI'

    const chatWithAI = async (mensajes?: Mensaje[]) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mensajes)
            })

            const data = await response.json()
            console.log("SOLUCION", data.reply)
            return data.reply
        } catch (error) {
            console.error('Error al contactar con la IA', error)
            throw error
        }
    }

    return {chatWithAI}
}

export interface Mensaje {
    role: 'user' | 'assistant' | 'system',
    content: string
}