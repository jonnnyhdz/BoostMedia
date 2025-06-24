import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import CTASection from '../components/CTASection';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <WhyUs />
    <Testimonials />
    <CTASection/>
    <ContactForm />
    <Footer />
  </>
);
export default Home;
