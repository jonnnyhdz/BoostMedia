import './Services.css';

const services = [
  {
    icon: '📈',
    title: 'Publicidad Digital',
    description: 'Campañas de Google Ads y Meta Ads que convierten clientes en resultados.',
  },
  {
    icon: '💡',
    title: 'Branding Estratégico',
    description: 'Creamos identidad visual potente, coherente y memorable.',
  },
  {
    icon: '🎯',
    title: 'Funnels Automatizados',
    description: 'Diseñamos embudos de venta que funcionan 24/7.',
  },
  {
    icon: '📬',
    title: 'Email Marketing con IA',
    description: 'Automatiza correos y mejora tasas de conversión con inteligencia artificial.',
  },
];

const Services = () => (
  <section className="services-section" id="services">
    <h2 className="services-title">Servicios de alto impacto</h2>
    <div className="services-grid">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <div className="service-icon">{service.icon}</div>
          <h3 className="service-name">{service.title}</h3>
          <p className="service-description">{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
