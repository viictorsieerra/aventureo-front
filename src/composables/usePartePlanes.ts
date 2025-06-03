import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"

export const usePartePlanes = () => {
  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/PartePlan'

  const getPartePlansByPlanId = async (idPlan: number) => {
    const res = await fetch(`${baseUrl}/Plan/${idPlan}`)
    if (!res.ok) throw new Error("No se pudieron obtener las actividades del plan")
    return await res.json()
  }

  const createPartePlan = async (partePlan: CreatePartePlanDTO) => {
    return await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partePlan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar la actividad")
      return res.json()
    })
  }

  return { getPartePlansByPlanId, createPartePlan }
}

export interface CreatePartePlanDTO {
  idPlan: number,
  nombre: string,
  ubicacion: string,
  precio: number,
  comentario: string
}
