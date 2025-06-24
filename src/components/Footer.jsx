import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">BoostMedia</div>
      <ul className="footer-links">
        <li><a href="#services">Servicios</a></li>
        <li><a href="#why">¿Por qué nosotros?</a></li>
        <li><a href="#testimonials">Clientes</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} BoostMedia. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
