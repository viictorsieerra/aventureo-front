import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"

export const usePlans = () => {

  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Plan'

  // Obtener todos los planes
  const getPlans = async (destino: string) => {
  const res = await fetch(baseUrl)
  const data = await res.json()
  // Filtrar por destino
  return data.filter((plan: any) => plan.lugar.toLowerCase() === destino.toLowerCase())
}


  // Crear un nuevo plan
  const createPlan = (plan: CreatePlanDTO) => {
    return fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar el plan")
      return res.json()
    })
  }

  return { getPlans, createPlan }
}

// DTO Type para crear un plan
export interface CreatePlanDTO {
  idUsuario: number,
  lugar: string,
  nombre: string,
  duracion: number,
  precioEstimado: number,
  valoracion: number,
  comentario: string
}
