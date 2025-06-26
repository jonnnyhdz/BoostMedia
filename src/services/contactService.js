import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // usa el puerto correcto

export const enviarFormularioContacto = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, {
      name: data.nombre,
      phone: data.telefono,
      gmail: data.correo,
      message: data.mensaje,
      captcha: data.captcha,
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error;
  }
};
