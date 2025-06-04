import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { PartePlan } from "@/models/PartePlan"
import type { Plan } from "@/models/Plan"

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

  const updatePartePlan = async (uptPartePlan: PartePlan) =>
  {
        return await fetch(baseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uptPartePlan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar la actividad")
      return res.json()
    })
  }

    const deletePartePlan = async (id?: number) => {
    await fetch(baseUrl + '/' + id, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok)
          throw new Error('ERROR EN EL BORRADO')
      })
      .catch(error => console.error(error))
  }

  return { getPartePlansByPlanId, createPartePlan, updatePartePlan, deletePartePlan }
}

export interface CreatePartePlanDTO {
  idPlan: number,
  nombre: string,
  ubicacion: string,
  precio: number,
  comentario: string
}
