export interface CreateGasto {
  idViaje: number,
  idCategoria: number,
  nombre: string,
  cantidad: number
}

export interface UpdateGasto {
  idGasto: number,
  idCategoria: number,
  nombre: string,
  cantidad: number
}

export interface GastoPorCategoria {
  total: number;
  idCategoria: number;
  categoria: string;
  idViaje: number;
}