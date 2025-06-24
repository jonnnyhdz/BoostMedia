import './CTASection.css';

const CTASection = () => (
  <section className="cta-section">
    <div className="cta-container">
      <div className="cta-text">
        <h2>Estamos listos para impulsar tu marca 🚀</h2>
        <p>Trabajamos con negocios como el tuyo que buscan crecer de forma inteligente.</p>
        <ul>
          <li>✅ Diagnóstico gratis de tu estrategia digital</li>
          <li>✅ Acompañamiento experto en cada paso</li>
          <li>✅ Resultados medibles desde el primer mes</li>
        </ul>
        <a href="#contact"><button className="cta-button">¡Quiero mejorar mi marketing!</button></a>
      </div>
      <div className="cta-image">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600"
          alt="Marketing strategy team"
        />
      </div>
    </div>
  </section>
);

export default CTASection;
