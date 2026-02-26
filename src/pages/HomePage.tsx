import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import InteractiveDemo from '../components/InteractiveDemo';
import CallToAction from '../components/CallToAction';
import PartnersCarousel from '../components/PartnersCarousel';
import Footer from '../components/Footer';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;

    if (scrollTo) {
      requestAnimationFrame(() => {
        const element = document.getElementById(scrollTo);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Set page title
  useEffect(() => {
    document.title = 'Home | Skaptix';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <PartnersCarousel />
      <Features />
      <InteractiveDemo />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
