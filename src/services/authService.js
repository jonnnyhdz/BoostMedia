// src/services/authService.js

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

export const login = async (credentials) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  return data;
};

// Verifica si hay una sesión activa
export const verificarSesion = async () => {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: 'GET',
    credentials: 'include', // 👈 necesario para enviar la cookie
  });

  if (!res.ok) return null;
  return await res.json();
};

// Cierra sesión del usuario
export const logout = async () => {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error al cerrar sesión');
};
