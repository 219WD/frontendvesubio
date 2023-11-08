import React, { useState } from 'react';
import { crearReserva } from '../helpers/reservaApi';
import '../css/reserva.css';

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    nombre: '',
    categoria: '',
    personas: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearReserva(formData);
      alert('Reserva realizada con éxito');
      setFormData({
        fecha: '',
        hora: '',
        nombre: '',
        categoria: '',
        personas: '',
      });
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Ocurrió un error al realizar la reserva');
    }
  };

  // Función para calcular el precio total
  const calcularPrecio = () => {
    const precioPorPersona = 100;
    const total = formData.personas * precioPorPersona;
    return total;
  };

  return (
    <section className="banner">
      <h2>RESERVA TU MESA</h2>
      <div className="card-contenedor">
        <div className="card-img"></div>
        <div className="card-contenido">
          <h3>Reserva</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
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
                type="text"
                placeholder="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
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
              <input type="submit" value="RESERVAR MESA" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReservaForm;