import { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', mensaje: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/contacto', formData);
      setStatus('¡Gracias por contactarnos! Te responderemos pronto.');
      setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
    } catch (error) {
      setStatus('Hubo un error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2>Contáctanos</h2>
        <p>¿Listo para escalar tu marca? Llena el formulario y nos pondremos en contacto contigo.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            onChange={handleChange}
            value={formData.nombre}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            required
            onChange={handleChange}
            value={formData.correo}
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Número de teléfono"
            required
            onChange={handleChange}
            value={formData.telefono}
          />
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            required
            rows={5}
            onChange={handleChange}
            value={formData.mensaje}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
