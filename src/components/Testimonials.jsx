import './Testimonials.css';

const testimonials = [
  {
    name: 'Carla Rodríguez',
    role: 'CEO de CosmiBeauty',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    message: 'Aumentamos un 400% nuestras ventas con sus estrategias. Increíble equipo.',
  },
  {
    name: 'Andrés Torres',
    role: 'Dueño de GymTech',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    message: 'BoostMedia entendió nuestro nicho como nadie y lo convirtió en ROI.',
  },
  {
    name: 'Laura Méndez',
    role: 'CMO de NovaDigital',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    message: 'El equipo es rápido, analítico y muy profesional. Lo recomiendo totalmente.',
  },
];

const Testimonials = () => (
  <section className="testimonials-section" id="testimonials">
    <h2 className="testimonials-title">Historias de éxito</h2>
    <div className="testimonials-grid">
      {testimonials.map((t, index) => (
        <div key={index} className="testimonial-card">
          <img src={t.image} alt={t.name} className="testimonial-avatar" />
          <p className="testimonial-message">“{t.message}”</p>
          <p className="testimonial-name">{t.name}</p>
          <p className="testimonial-role">{t.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
