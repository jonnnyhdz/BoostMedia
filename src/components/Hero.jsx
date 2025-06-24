import './Hero.css';

const Hero = () => (
  <section className="hero">
    <div className="hero__overlay" />
    <div className="hero__content">
      <h1 className="hero__title">Haz que tu marca hable con resultados</h1>
      <p className="hero__subtitle">
        Marketing Digital, SEO, Social Ads, Funnels y más. Todo personalizado para ti.
      </p>
      <a href="#contact">
        <button className="hero__button">Solicita una asesoría</button>
      </a>
    </div>
  </section>
);

export default Hero;
