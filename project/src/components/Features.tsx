import { useEffect, useState } from 'react';
import { ShoppingBag, Heart, Users, Star, RotateCcw, Shield, Zap, TrendingUp, Globe } from 'lucide-react';
import qualityClothingImg from '../assets/skaptixss/skaptixss/qualityclothing.jpg';
import personalizedShoppingImg from '../assets/skaptixss/skaptixss/personalizedshopping.jpg';
import uploadProductsImg from '../assets/skaptixss/skaptixss/uploadproducts.jpg';

const Features = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: ShoppingBag,
      title: "Quality Clothing",
      description: "Discover premium clothing from thousands of trusted brands. Whether you're looking for timeless classics or the latest trends, our collection is carefully curated to ensure quality, style, and comfort in every piece.",
      gradient: "from-[#6e83f7] to-[#8B93FF]",
      delay: "0s"
    },
    {
      icon: Heart,
      title: "Personalized Shopping",
      description: "Love shopping? Our smart system learns your style, favorite colors, and go-to brands to bring you tailored recommendations. Say goodbye to endless scrolling—find pieces you'll love faster than ever.",
      gradient: "from-[#A8B5DB] to-[#B8C5E0]",
      delay: "0.2s"
    },
    {
      icon: Users,
      title: "Own a Brand?",
      description: "Showcase your products to a global audience. Create your brand profile, upload your collections, and connect directly with shoppers who are ready to buy. Turn your vision into sales, all in one platform.",
      gradient: "from-[#6e83f7] to-[#A8B5DB]",
      delay: "0.4s"
    }
  ];

  const guarantees = [
    {
      icon: Star,
      title: "Guaranteed Quality",
      description: "Every product is carefully checked to meet our standards for durability, comfort, and design. We partner only with trusted brands to make sure what you buy is truly worth wearing.",
      color: "#6e83f7"
    },
    {
      icon: RotateCcw,
      title: "Hassle-Free Returns",
      description: "Shop with peace of mind. Our 30-day return policy ensures you can easily exchange or refund items that don't meet your expectations—no stress, no hidden steps.",
      color: "#A8B5DB"
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "From encrypted payments to verified sellers, we make sure every purchase is safe. You can focus on finding your perfect style while we take care of the rest.",
      color: "#6e83f7"
    }
  ];

  return (
    <>
      {/* Revolutionary Diagonal Features Section */}
      <section id="features" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(110, 131, 247, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(168, 181, 219, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(110, 131, 247, 0.05) 0%, transparent 50%)
              `,
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20 backdrop-blur-xl border border-[#6e83f7]/30 rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-[#6e83f7] mr-3 animate-pulse" />
              <span className="text-[#6e83f7] font-semibold">Revolutionary Features</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
              <span className="block">WHY CHOOSE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                SKAPTIX?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're not just another platform. We're revolutionizing how small brands connect with the world.
            </p>
          </div>

          {/* Diagonal Feature Cards */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid lg:grid-cols-12 gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
                style={{ animationDelay: feature.delay }}
              >
                {/* Content */}
                <div className={`lg:col-span-6 ${index % 2 === 0 ? '' : 'lg:col-start-7'}`}>
                  <div className="relative">
                    {/* Feature Icon - stationary on scroll */}
                    <div 
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8 transform hover:scale-110 transition-all duration-500 shadow-2xl`}
                      style={{
                        transform: 'scale(1.1)'
                      }}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      {feature.description}
                    </p>

                    <button className="group bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-500 transform hover:-translate-y-1">
                      <span className="flex items-center">
                        Learn More
                        <TrendingUp className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className={`lg:col-span-6 ${index % 2 === 0 ? 'lg:col-start-7' : 'lg:col-start-1'}`}>
                  <div className="relative">
                    {/* Only show mobile visual card, make it narrower so image fills horizontally */}
                    <div
                      className="bg-[#21242c] p-4 backdrop-blur-xl rounded-3xl border border-gray-600 shadow-2xl transform hover:rotate-1 transition-all duration-500 max-w-[400px] mx-auto overflow-hidden"
                      style={{
                        transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'}) translateY(${scrollY * (index % 2 === 0 ? -0.01 : 0.01)}px)`
                      }}
                    >
                      <div className={`h-[620px] w-[280px] rounded-3xl overflow-hidden mx-auto bg-[#16181d]`}>
                        {feature.title === 'Quality Clothing' ? (
                          <img src={qualityClothingImg} alt="Quality Clothing" className="w-full h-full object-contain block mx-auto" />
                        ) : feature.title === 'Personalized Shopping' ? (
                          <img src={personalizedShoppingImg} alt="Personalized Shopping" className="w-full h-full object-contain block mx-auto" />
                        ) : feature.title === 'Own a Brand?' ? (
                          <img src={uploadProductsImg} alt="Upload Products" className="w-full h-full object-contain block mx-auto" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#6e83f7]/20 to-[#A8B5DB]/20 relative rounded-3xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div 
                      className="absolute -top-3 right-2 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white p-3 rounded-2xl shadow-xl animate-bounce"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <Globe className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section - Hexagonal Layout */}
      <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)
              `,
              backgroundSize: '100px 100px',
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              <span className="block">OUR</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                PROMISE
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your success and security are our top priorities. Here's what we guarantee.
            </p>
          </div>

          {/* Hexagonal Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Hexagonal Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: guarantee.color }}
                  >
                    <guarantee.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-4 text-center group-hover:text-[#6e83f7] transition-colors">
                    {guarantee.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-center">
                    {guarantee.description}
                  </p>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6e83f7]/5 to-[#A8B5DB]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                </div>

                {/* Floating Number */}
                <div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg"
                  style={{ backgroundColor: guarantee.color }}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;