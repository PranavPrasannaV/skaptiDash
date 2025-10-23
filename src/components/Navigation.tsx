import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AppLogo from '../assets/skaptixss/skaptixss/skaptixlogo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <nav className={`fixed top-1 w-full z-40 transition-all duration-700 ${
        isScrolled 
          ? 'translate-y-0' 
          : 'translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className={`transition-all duration-700 ${
            isScrolled 
              ? 'bg-black/80 backdrop-blur-2xl mt-6 rounded-3xl' 
              : 'bg-transparent mt-6'
          }`}>
            <div className="flex justify-between items-center py-4 px-6">
              {/* Logo */}
                <Link to="/" className="flex items-center space-x-3" onClick={handleMobileNavigate}>
                <img src={AppLogo} alt="App logo" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" />
                <div className="text-2xl font-black text-white tracking-tight leading-none">
                  skaptix
                </div>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-10 pr-6">
                <Link to="/" onClick={handleMobileNavigate} className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group px-2">
                  Home
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  to="/about"
                  onClick={handleMobileNavigate}
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group px-2"
                >
                  About
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  to="/faq"
                  onClick={handleMobileNavigate}
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group px-2"
                >
                  FAQ
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  to="/contact"
                  onClick={handleMobileNavigate}
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group px-2"
                >
                  Contact
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  to="/waitlist"
                  className="bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Join Waitlist
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white hover:text-[#6e83f7] transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-black/95 backdrop-blur-lg mt-3 p-4 rounded-3xl shadow-xl border border-white/6">
                <nav className="flex flex-col gap-1">
                  <Link to="/" className="block py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/2 transition-colors text-base" onClick={handleMobileNavigate}>
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="block py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/2 transition-colors text-base"
                    onClick={handleMobileNavigate}
                  >
                    About
                  </Link>
                  <Link
                    to="/faq"
                    className="block py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/2 transition-colors text-base"
                    onClick={handleMobileNavigate}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/2 transition-colors text-base"
                    onClick={handleMobileNavigate}
                  >
                    Contact
                  </Link>
                  <div className="pt-2">
                    <Link
                      to="/waitlist"
                      onClick={handleMobileNavigate}
                      className="block w-full bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white py-3 rounded-xl mt-2 font-bold hover:shadow-lg transition-all duration-300 text-center text-base"
                    >
                      Join Waitlist
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;