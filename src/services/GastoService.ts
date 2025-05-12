export function addGasto(gasto: { idViaje: number, idCategoria: number, nombre: string, cantidad: number }) {
    const gastoNuevo = {
      gasto: {  // Asegúrate de que esté envuelto en 'gasto'
        idCategoria: gasto.idCategoria,
        idViaje: gasto.idViaje,
        nombre: gasto.nombre,
        cantidad: gasto.cantidad
      }
    };
  
    return fetch('https://localhost:7333/api/Gasto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gastoNuevo)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Error al añadir el gasto: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error al añadir el gasto', error);
      throw error;
    });
  }
  