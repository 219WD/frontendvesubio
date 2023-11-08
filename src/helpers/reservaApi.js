// reservaApi.js
const url = "https://backend-vesubio.onrender.com/api/reservas";
const token = JSON.parse(localStorage.getItem("token"));

export const obtenerReservas = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.reservas;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

export const obtenerReservaPorId = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data.reserva;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${id}:`, error);
    throw error;
  }
};

export const crearReserva = async (datos) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-token": token,
      },
      body: JSON.stringify(datos),
    });
    const data = await response.json();
    return data.reserva;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
};

export const actualizarReserva = async (id, datos) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });
    const data = await response.json();
    return data.reserva;
  } catch (error) {
    console.error(`Error al actualizar la reserva con ID ${id}:`, error);
    throw error;
  }
};

export const borrarReserva = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.reservaEliminada;
  } catch (error) {
    console.error(`Error al borrar la reserva con ID ${id}:`, error);
    throw error;
  }
};