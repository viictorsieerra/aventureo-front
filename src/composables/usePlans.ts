import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"

export const usePlans = () => {

  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Plan'


  const getPlans = async (destino: string) => {
    const res = await fetch(baseUrl)
    const data = await res.json()
    return data.filter((plan: any) => plan.lugar.toLowerCase() === destino.toLowerCase())
  }

  const getPlanById = async (id: number) => {
    const res = await fetch(`${baseUrl}/${id}`)
    if (!res.ok) throw new Error("No se pudo obtener el plan")
    return await res.json()
  }

  const createPlan = async (plan: CreatePlanDTO) => {
    return await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar el plan")
      return res.json()
    })
  }

  return { getPlans, getPlanById, createPlan }
}

export interface CreatePlanDTO {
  idUsuario: number,
  lugar: string,
  nombre: string,
  duracion: number,
  precioEstimado: number,
  valoracion: number,
  comentario: string
}
