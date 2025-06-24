import './WhyUs.css';

const WhyUs = () => (
  <section className="why-section" id="why">
    <div className="why-container">
      <div className="why-text">
        <h2>¿Por qué elegir BoostMedia?</h2>
        <p>
          Porque no vendemos humo: combinamos <strong>data-driven marketing</strong> con <strong>creatividad estratégica</strong> para que tu marca crezca con propósito. 
          Nuestro equipo está formado por especialistas en performance, contenido, diseño e inteligencia artificial.
        </p>
        <ul>
          <li>📊 Estrategias personalizadas por segmento</li>
          <li>🤖 Uso de herramientas basadas en IA</li>
          <li>🔁 Optimización constante en tiempo real</li>
          <li>💬 Comunicación clara y humana</li>
        </ul>
      </div>
      <div className="why-image">
<img
  src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  alt="Equipo de marketing colaborando"
/>
      </div>
    </div>
  </section>
);

export default WhyUs;
