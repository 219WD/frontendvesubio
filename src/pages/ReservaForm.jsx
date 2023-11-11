// ReservationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/reserva.css';
import { crearReserva } from '../helpers/reservaApi';

const ReservaForm = ({ onReserve, selectedReservation }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    fecha: '',
    hora: '',
    precio: 0,
    personas: 1,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtén el token desde el localStorage
    const token = JSON.parse(localStorage.getItem("token"));

    // Decodifica el token para obtener la información del usuario
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificación base64 manual
      setUser(decodedToken.usuario); // Ajusta la propiedad 'usuario' según la estructura de tu token
    }
  }, []);

  useEffect(() => {
    if (selectedReservation) {
      setFormData({
        nombre: selectedReservation.nombre,
        usuario: selectedReservation.usuario,
        categoria: selectedReservation.categoria,
        fecha: selectedReservation.fecha,
        hora: selectedReservation.hora,
        precio: selectedReservation.precio,
        personas: selectedReservation.personas,
      });
    }
  }, [selectedReservation]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {_id} = JSON.parse(window.localStorage.getItem("usuario"));
    const idUsuario = _id;
    console.log(_id);

    try {
      const { nombre, categoria, fecha, hora, precio, personas } = formData;

      const datosReserva = { nombre, categoria, fecha, hora, precio, personas, usuario: idUsuario };

      console.log(datosReserva);
      const resp = await crearReserva(datosReserva);
      console.log(resp);

      // if (!user) {
      //   console.error("Usuario no autenticado");
      //   return;
      // }

      // if (selectedReservation) {
      //   await axios.put(`https://backend-vesubio.onrender.com/api/reservas/${selectedReservation._id}`, formData);
      // } else {
      //   const response = await axios.post('https://backend-vesubio.onrender.com/api/reservas', formData);
      //   onReserve(response.data);
      // }

      setFormData({
        nombre: '',
        categoria: '',
        fecha: '',
        hora: '',
        precio: 0,
        personas: 1,
      });
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  const calcularPrecio = () => {
    // Lógica para calcular el precio total según tus necesidades
    return formData.personas * 100;
  };

  return (
    <section className="banner">
      <h2>{selectedReservation ? 'EDITAR RESERVA' : 'RESERVA TU MESA'}</h2>
      <div className="card-contenedor">
        <div className="card-img"></div>
        <div className="card-contenido">
          <h3>Reserva</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="mesa_individual">Mesa Individual</option>
                <option value="mesa_pareja">Mesa Pareja</option>
                <option value="mesa_familiar">Mesa Familiar</option>
                <option value="mesa_ejecutivo">Mesa Ejecutivo</option>
              </select>
              <input
                type="date"
                name="fecha"
                min={new Date().toISOString().split('T')[0]}
                value={formData.fecha}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="hora"
                min="20:00"
                max="24:00"
                value={formData.hora}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Personas por mesa"
                name="personas"
                min="1"
                max="10"
                value={formData.personas}
                onChange={handleInputChange}
                required
              />
              <div className='calcularPrecio'>
                <p>Precio por persona: $100</p>
                <p className='total'>Total: ${calcularPrecio()}</p>
              </div>
              <input type="submit" value={selectedReservation ? 'GUARDAR CAMBIOS' : 'RESERVAR MESA'} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReservaForm;
