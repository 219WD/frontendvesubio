import React, { useState, useEffect } from 'react';
import { obtenerReservas, borrarReserva } from '../helpers/reservaApi';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas();
        if (data && data.reservas) {
          setReservas(data.reservas);
        }
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const handleEliminarReserva = async (id) => {
    try {
      await borrarReserva(id);
      setReservas(reservas.filter(reserva => reserva._id !== id));
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.nombre} - {reserva.fecha} - {reserva.hora}
            <button onClick={() => handleEliminarReserva(reserva._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservasList;
