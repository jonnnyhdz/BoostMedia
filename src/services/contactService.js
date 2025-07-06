import axios from 'axios';

// Leer la URL base desde .env
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

/**
 * Envía el formulario de contacto
 */
export const enviarFormularioContacto = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/api/contact`, {
      name: data.name,
      phone: data.phone,
      gmail: data.gmail,
      message: data.message,
      captcha: data.captcha,
      aceptaTerminos: data.aceptaTerminos
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error;
  }
};

/**
 * Obtiene todos los contactos (leads) desde el backend
 */
export const obtenerLeads = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/contacts`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    throw error;
  }
};

/**
 * Filtra los contactos según nombre o correo
 */
export const filtrarLeads = async (filtros) => {
  try {
    const params = new URLSearchParams({
      name: filtros.name || '',
      gmail: filtros.gmail || '',
    });

    const response = await axios.get(`${API_BASE}/api/contact/filter?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error al filtrar leads:', error);
    throw error;
  }
};


export const responderLead = async (correoDestino, mensaje, estado = 1) => {
  try {
    const res = await axios.post(`${API_BASE}/api/contact/responder`, {
      correoDestino,
      mensaje,
      estado,
    });
    return res.data;
  } catch (error) {
    console.error('Error al enviar la respuesta:', error);
    throw error;
  }
};
