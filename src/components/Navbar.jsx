import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--floating' : ''}`}>
      <div className="navbar__container">
        <div className="logo">BoostMedia</div>

        <div
          className={`menu-toggle-icon ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        <ul className={`navbar__menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#services" onClick={handleLinkClick}>Servicios</a></li>
          <li><a href="#why" onClick={handleLinkClick}>¿Por qué nosotros?</a></li>
          <li><a href="#testimonials" onClick={handleLinkClick}>Clientes</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
