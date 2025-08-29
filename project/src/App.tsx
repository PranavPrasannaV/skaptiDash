import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveDemo from './components/InteractiveDemo';
// Removed TestimonialsSection and PricingSection per request
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <InteractiveDemo />
      {/* TestimonialsSection and PricingSection removed */}
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;