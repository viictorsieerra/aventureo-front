import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers"
import type { Plan } from "@/models/Plan";

export const usePlans = () => {

  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/Plan'


  const getPlans = async (destino: string): Promise<any> => {
    try {
      const res = await fetch(`${baseUrl}/Lugar/${destino}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Hubo un error con la solicitud');
      }

      const data = await res.json();
      return data;

    } catch (error: any) {
      console.error('ERROR:', error.message);
      throw error;
    }
  };


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

  const deletePlan = async (idPlan?: number) => {
    await fetch(baseUrl + '/' + idPlan, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok)
          throw new Error('ERROR EN EL BORRADO')
      })
      .catch(error => console.error(error))
  }

    const updatePlan = async (plan: Plan) => {
    return await fetch(baseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    }).then(res => {
      if (!res.ok) throw new Error("No se pudo guardar el plan")
      return res.json()
    })
  }

  return { getPlans, getPlanById, createPlan, deletePlan, updatePlan }
}

export interface CreatePlanDTO {
  idUsuario?: number,
  lugar: string,
  nombre: string,
  duracion: number,
  precioEstimado: number,
  valoracion: number,
  comentario: string
}
