import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Smartphone } from 'lucide-react';
import trackGrowthImg from '../assets/skaptixss/skaptixss/trackgorwth.jpg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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
        {/* Diagonal Layout */}
        <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Content - Spans 7 columns */}
          <div className="col-span-12 lg:col-span-7 relative z-10">
            {/* Floating Badge */}
            

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
            </div>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl animate-slideInUp delay-800">
              Discover thousands of trusted fashion brands in one seamless platform. Verified sellers, unified shipping, and free, easy returns.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-slideInUp delay-1000">
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

            {/* Stats */}
            <div className="flex gap-12 mt-16 animate-slideInUp delay-1200" style={{ display: 'none' }}>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">2.5K+</div>
                <div className="text-[#A8B5DB] font-medium">Small Brands</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">850K+</div>
                <div className="text-[#A8B5DB] font-medium">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">99.2%</div>
                <div className="text-[#A8B5DB] font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Spans 5 columns */}
          <div className="col-span-12 lg:col-span-5 relative">
            {/* 3D Card Stack */}
            <div className="relative h-96 lg:h-[500px] flex justify-center">
              {/* Card 1 - Back */}
              <div 
                className="absolute w-[65%] h-full bg-gradient-to-br from-[#6e83f7]/90 to-[#A8B5DB]/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl transform rotate-6 scale-95"
                style={{
                  transform: `rotate(6deg) scale(0.95) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Brand Analytics</h3>
                    <p className="text-white/80 text-sm">Real-time insights into your brand performance</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/60 text-xs">
                      <span>Sales Growth</span>
                      <span>+247%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Middle */}
              <div 
                className="absolute w-[65%] h-full bg-gradient-to-br from-white/95 to-gray-100/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl transform rotate-3 scale-98"
                style={{
                  transform: `rotate(3deg) scale(0.98) translate(${mousePosition.x * -0.008}px, ${mousePosition.y * -0.008}px)`
                }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-full h-32 bg-gradient-to-br from-[#6e83f7] to-[#A8B5DB] rounded-2xl mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="text-xs opacity-80">Featured Collection</div>
                        <div className="font-semibold">Urban Essentials</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900">Premium Hoodie</div>
                        <div className="text-[#6e83f7] font-bold text-lg">$89</div>
                      </div>
                      <button className="bg-[#6e83f7] text-white p-2 rounded-xl hover:bg-[#5a6ff3] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Front */}
              <div 
                className="absolute w-[65%] h-full bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                style={{
                  transform: `rotate(-2deg) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
                }}
              >
                <div className="p-4 h-full">
                  <div className="h-[480px] w-[240px] rounded-3xl overflow-hidden bg-gray-100 mx-auto">
                    <img src={trackGrowthImg} alt="Track Your Growth" className="w-full h-full object-cover rounded-3xl" />
                  </div>
                </div>
              </div>

              {/* Floating badges removed per request */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;