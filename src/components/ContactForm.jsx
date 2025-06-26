import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { enviarFormularioContacto } from '../services/contactService';
import ModalTerminos from './ModalTerminos';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [aceptaAviso, setAceptaAviso] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const captchaRef = useRef();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus('Completa el reCAPTCHA antes de enviar.');
      return;
    }

    if (!aceptaAviso) {
      setStatus('Debes aceptar el aviso de privacidad.');
      return;
    }

    setLoading(true);
    try {
      await enviarFormularioContacto({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
        captcha: captchaToken, // 👈 Aquí el nombre correcto
      });

      setStatus('¡Gracias por contactarnos! Te responderemos pronto.');
      setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
      setAceptaAviso(false);
      setCaptchaToken(null);
      captchaRef.current.reset(); // ✅ Reset visual del captcha
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
          <input type="text" name="nombre" placeholder="Nombre completo" required onChange={handleChange} value={formData.nombre} />
          <input type="email" name="correo" placeholder="Correo electrónico" required onChange={handleChange} value={formData.correo} />
          <input type="tel" name="telefono" placeholder="Número de teléfono" required onChange={handleChange} value={formData.telefono} />
          <textarea name="mensaje" placeholder="Tu mensaje" required rows={5} onChange={handleChange} value={formData.mensaje} />

          <div className="checkbox-terminos">
            <input
              type="checkbox"
              checked={aceptaAviso}
              onChange={() => {
                if (!aceptaAviso) {
                  setModalVisible(true);
                } else {
                  setAceptaAviso(false);
                }
              }}
            />
            <span>
              He leído y acepto el{' '}
              <button
                type="button"
                onClick={() => setModalVisible(true)}
                style={{
                  textDecoration: 'underline',
                  color: 'blue',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                aviso de privacidad
              </button>
            </span>
          </div>

          <ReCAPTCHA
            sitekey="6LcI4m0rAAAAAIEWxo_cLFYDwPk3_RIknLcbEeTU"
            onChange={setCaptchaToken}
            ref={captchaRef}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>

      <ModalTerminos
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAccept={() => {
          setAceptaAviso(true);
          setModalVisible(false);
        }}
      />
    </section>
  );
};

export default ContactForm;
