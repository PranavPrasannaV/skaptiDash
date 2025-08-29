import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Globe, Users, Rocket, Star, Zap } from 'lucide-react';

const CallToAction = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Revolutionary CTA Section */}
      <section className="relative overflow-hidden bg-black py-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Animated Mesh Gradient */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(110, 131, 247, 0.3) 0%, transparent 50%),
                radial-gradient(circle at ${100 - mousePosition.x * 0.1}% ${100 - mousePosition.y * 0.1}%, rgba(168, 181, 219, 0.3) 0%, transparent 50%),
                linear-gradient(45deg, rgba(110, 131, 247, 0.1) 0%, rgba(168, 181, 219, 0.1) 100%)
              `
            }}
          />
          
          {/* Floating Geometric Shapes */}
          <div 
            className="absolute w-96 h-96 border-2 border-[#6e83f7]/20 rounded-full"
            style={{
              top: '10%',
              left: '10%',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotate(45deg)`
            }}
          />
          <div 
            className="absolute w-64 h-64 border-2 border-[#A8B5DB]/20 rounded-full"
            style={{
              bottom: '20%',
              right: '15%',
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotate(-45deg)`
            }}
          />
          <div 
            className="absolute w-32 h-32 bg-gradient-to-r from-[#6e83f7]/10 to-[#A8B5DB]/10 rounded-2xl"
            style={{
              top: '60%',
              left: '70%',
              transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px) rotate(30deg)`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          {/* Main CTA Content */}
          <div className="text-center mb-20">
            {/* Floating Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20 backdrop-blur-xl border border-[#6e83f7]/30 rounded-full px-6 py-3 mb-8 animate-slideInUp">
              <Rocket className="w-5 h-5 text-[#6e83f7] mr-3 animate-pulse" />
              <span className="text-[#6e83f7] font-semibold">Ready to Launch?</span>
            </div>

            <h2 className="text-5xl lg:text-8xl font-black text-white mb-8 leading-none">
              <span className="block">TRANSFORM YOUR</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                BRAND TODAY
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful brands who have made Skaptix their launchpad to global success. 
              Your journey to brand elevation starts here.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <button className="group bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-12 py-6 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Launch Your Brand
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A8B5DB] to-[#6e83f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button className="group border-2 border-[#6e83f7] text-[#6e83f7] px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#6e83f7] hover:text-white transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Explore Platform
                  <Globe className="ml-3 w-7 h-7 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </div>

            {/* Trust Indicators - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#6e83f7]/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#6e83f7] mr-3" />
                  <span className="text-3xl font-black text-white">2.5K+</span>
                </div>
                <p className="text-gray-300 font-semibold">Active Brands</p>
              </div>
              
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#A8B5DB]/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-[#A8B5DB] mr-3" />
                  <span className="text-3xl font-black text-white">85+</span>
                </div>
                <p className="text-gray-300 font-semibold">Countries</p>
              </div>
              
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#6e83f7]/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-[#6e83f7] mr-3" />
                  <span className="text-3xl font-black text-white">4.9</span>
                </div>
                <p className="text-gray-300 font-semibold">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Elements */}
        <div 
          className="absolute top-20 left-20 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white p-4 rounded-2xl shadow-2xl animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            animationDelay: '0.5s'
          }}
        >
          <Zap className="w-6 h-6" />
        </div>
        
        <div 
          className="absolute bottom-32 right-20 bg-white/10 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/20 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * -0.008}px)`,
            animationDelay: '1s'
          }}
        >
          <Star className="w-6 h-6 text-[#A8B5DB]" />
        </div>
      </section>

      {/* Contact Section - Minimalist Design */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
          <h3 className="text-4xl font-black text-gray-900 mb-8">
            Questions? We're Here to Help
          </h3>
          <p className="text-xl text-gray-600 mb-12">
            Ready to elevate your brand? Get in touch with our team.
          </p>
          
          <div className="group bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-md mx-auto hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] rounded-2xl flex items-center justify-center mr-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500 font-medium">Contact Us</div>
                <a href="mailto:Skaptixclo@gmail.com" className="text-[#6e83f7] font-bold text-lg hover:underline">
                  Skaptixclo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;