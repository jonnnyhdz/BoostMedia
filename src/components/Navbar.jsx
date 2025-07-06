import { useEffect, useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // 👈 agregado useNavigate
import { verificarSesion, logout } from "../services/authService";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 inicializa navegación

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const verificar = async () => {
      try {
        const user = await verificarSesion();
        setUsuario(user);
      } catch {
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };
    verificar();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUsuario(null);
      navigate("/"); // 👈 redirección sin recargar
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--floating" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="logo">
          BoostMedia
        </Link>

        <div
          className={`menu-toggle-icon ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        <div className={`navbar__right ${menuOpen ? "open" : ""}`}>
          <ul className={`navbar__menu ${menuOpen ? "open" : ""}`}>
            {!usuario && !loading && (
              <>
                <li>
                  <a href="#services" onClick={handleLinkClick}>Servicios</a>
                </li>
                <li>
                  <a href="#why" onClick={handleLinkClick}>¿Por qué nosotros?</a>
                </li>
                <li>
                  <a href="#testimonials" onClick={handleLinkClick}>Clientes</a>
                </li>
                <li>
                  <a href="#contact" onClick={handleLinkClick}>Contacto</a>
                </li>
              </>
            )}

            {!loading && (
              <li className="login-menu-item">
                {usuario ? (
                  <button className="login-icon" onClick={handleLogout}>
                    <FiLogOut size={20} color="red" />
                    <span style={{ marginLeft: "6px", color: "red" }}>Cerrar sesión</span>
                  </button>
                ) : (
                  <button
                    className="login-icon"
                    onClick={() => navigate("/login")} // 👈 navegación sin recargar
                  >
                    <FiUser size={20} />
                  </button>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
