import { useEffect, useState } from 'react';
import './ModalTerminos.css';

const ModalTerminos = ({ visible, onClose, onAccept }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) setClosing(false); // Reiniciar estado al cerrar completamente
  }, [visible]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300); // tiempo igual a la animación
  };

  const handleAccept = () => {
    setClosing(true);
    setTimeout(() => {
      onAccept();
      setClosing(false);
    }, 300);
  };

  if (!visible && !closing) return null;

  return (
    <div className={`modal-overlay ${closing ? 'fadeOut' : 'fadeIn'}`}>
      <div className={`modal-box ${closing ? 'zoomOut' : 'zoomIn'}`}>
        <h2>Términos y condiciones</h2>
        <p>
          Al enviar este formulario, aceptas que tus datos serán tratados conforme a nuestro aviso de privacidad. No compartimos tu información con terceros.
        </p>
        <div className="modal-actions">
          <button onClick={handleAccept}>Aceptar</button>
          <button onClick={handleClose} className="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTerminos;
