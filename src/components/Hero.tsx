import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  
  const categories = ['Everything', 'Every Brand', 'All Fashion', 'Any Style', 'Every Trend'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categories.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(110, 131, 247, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(110, 131, 247, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-[#6e83f7]/30 to-[#A8B5DB]/30 rounded-full blur-3xl"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotate(${scrollY * 0.1}deg)`
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-[#A8B5DB]/40 to-[#6e83f7]/40 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '15%',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotate(${scrollY * -0.1}deg)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-[#6e83f7]/25 to-[#A8B5DB]/25 rounded-full blur-3xl"
          style={{
            top: '60%',
            left: '70%',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px) rotate(${scrollY * 0.15}deg)`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-20">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="relative z-10 text-center max-w-4xl">
            {/* Revolutionary Title */}
            <div className="mb-10">
              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-6">
                <span className="block text-white animate-slideInUp delay-200">
                  THE
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] animate-slideInUp delay-400">
                  ONLY
                </span>
                <span className="block text-white/80 text-4xl lg:text-6xl font-light animate-slideInUp delay-600">
                  MARKETPLACE
                </span>
              </h1>
              
              {/* Animated Category Carousel */}
              <div className="flex items-center justify-center gap-1 text-2xl lg:text-3xl font-bold mt-8">
                <span className="text-gray-400">FOR</span>
                <div className="relative h-12 lg:h-14 overflow-hidden w-48 lg:w-64">
                  {categories.map((category, index) => (
                    <div
                      key={category}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                        index === currentCategory
                          ? 'translate-y-0 opacity-100'
                          : index < currentCategory
                          ? '-translate-y-full opacity-0'
                          : 'translate-y-full opacity-0'
                      }`}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                        {category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed animate-slideInUp delay-800">
              Discover thousands of trusted fashion brands in one seamless platform. Verified sellers, unified shipping, and free, easy returns.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slideInUp delay-1000">
              <Link
                to="/waitlist"
                className="group bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden animate-gentle-bounce"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Join Waitlist
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A8B5DB] to-[#6e83f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* Consolidated Availability Badge */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm animate-gentle-bounce">
                <Smartphone className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-300">Releasing on iOS & Web – January 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;