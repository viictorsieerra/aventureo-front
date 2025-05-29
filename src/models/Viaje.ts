export interface CreateViaje {
    idUsuario?: number,
    nombre?: string,
    cantidadTotal?: number,
    personas?: number
}

export interface UpdateViaje {
    idViaje?: number,
    nombre?: string,
    cantidadTotal?: number,
    personas?: number
}