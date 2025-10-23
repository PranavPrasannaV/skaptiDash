import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Smartphone } from 'lucide-react';
import setupBrandImg from '../assets/skaptixss/skaptixss/setupbrand.jpg';
import uploadProductsImg from '../assets/skaptixss/skaptixss/uploadproducts.jpg';
import customerConnectImg from '../assets/skaptixss/skaptixss/customerconnect.jpg';
import trackGrowthImg from '../assets/skaptixss/skaptixss/trackgorwth.jpg';

const InteractiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [deviceView, setDeviceView] = useState('mobile');

  const demoSteps = [
    { title: "Create Your Brand Profile", description: "Set up your brand in minutes" },
    { title: "Upload Your Products", description: "Showcase your collections" },
    { title: "Connect with Customers", description: "Start selling globally" },
    { title: "Track Your Growth", description: "Monitor your success" }
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  return (
    <section id="demo" className="py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Subtle radial accents kept at low opacity for depth */}
      <style>{`
        @keyframes accentPulseDemo {
          0% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.01); }
          100% { opacity: 0.12; transform: scale(1); }
        }
      `}</style>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 40%, rgba(110,131,247,0.06) 0%, transparent 45%),
              radial-gradient(circle at 75% 15%, rgba(168,181,219,0.05) 0%, transparent 45%)
            `,
            transform: `translateY(0px)`,
            opacity: 0.18,
            animation: 'accentPulseDemo 10s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Demo Controls */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              <span className="block">SEE IT IN</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                ACTION
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Watch how easy it is to launch your brand and start selling to a global audience.
            </p>

            {/* Demo Controls */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Interactive Demo</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-[#6e83f7]/10 to-[#A8B5DB]/10 border-2 border-[#6e83f7]/30'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                        index === currentStep
                          ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

              {/* Device Selector */}
            <div className="flex gap-4">
              {[
                { id: 'mobile', icon: Smartphone, label: 'Mobile' }
              ].map((device) => (
                <button
                  key={device.id}
                  onClick={() => setDeviceView(device.id)}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                    deviceView === device.id
                      ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <device.icon className="w-4 h-4 mr-2" />
                  {device.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Demo Screen */}
            <div className="relative">
            <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl transition-all duration-500 max-w-[400px] mx-auto">
              {/* Screen Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">skaptix.com</div>
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </div>

              {/* Demo Content */}
        <div className="bg-white rounded-2xl h-[750px] relative overflow-hidden">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 relative">
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  currentStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}>
                  <div className="h-full w-full">
                    <img 
                      src={setupBrandImg} 
                      alt="Create Your Brand"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`absolute inset-0 transition-all duration-1000 ${
                  currentStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}>
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={uploadProductsImg} 
                      alt="Upload Products"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`absolute inset-0 transition-all duration-1000 ${
                  currentStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}>
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={customerConnectImg} 
                      alt="Connect with Customers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`absolute inset-0 transition-all duration-1000 ${
                  currentStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}>
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={trackGrowthImg} 
                      alt="Track Your Growth"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Floating Elements */}
            <div className="absolute -top-3 -right-2 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white p-4 rounded-2xl shadow-xl animate-bounce">
              <div className="font-bold">Live Demo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;