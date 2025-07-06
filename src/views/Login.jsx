import './Login.css';
import { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '../services/authService';

const Login = () => {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(form);
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      {[...Array(20)].map((_, i) => (
        <div key={i} className={`bg-circle circle${i + 1}`} />
      ))}

      <div className="login-card">
        <div className="login-left">
          <h1>Inicia sesión</h1>
          <p className="subtitle">Bienvenido de vuelta 👋</p>
          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FiUser />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="login-btn">
              Entrar
            </button>
          </form>
        </div>

        <div className="login-right">
          <img
            src="https://www.shutterstock.com/image-vector/digital-business-concept-3d-illustration-600nw-2152456179.jpg"
            alt="Marketing"
            className="login-illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
