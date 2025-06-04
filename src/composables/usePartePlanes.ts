import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { PartePlan } from "@/models/PartePlan"
import type { Plan } from "@/models/Plan"
import { useJWTStore } from "@/stores/JwtStore"

export const usePartePlanes = () => {
  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/PartePlan'
  const jwtStore = useJWTStore()

  const getPartePlansByPlanId = async (idPlan: number) => {
    const res = await fetch(`${baseUrl}/Plan/${idPlan}`)
    if (!res.ok) throw new Error("No se pudieron obtener las actividades del plan")
    return await res.json()
  }

  const createPartePlan = async (partePlan: CreatePartePlanDTO) => {
    return await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtStore.jwt}`
       },
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
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtStore.jwt}`
       },
      body: JSON.stringify(uptPartePlan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar la actividad")
      return res.json()
    })
  }

    const deletePartePlan = async (id?: number) => {
    await fetch(baseUrl + '/' + id, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${jwtStore.jwt}`}
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
