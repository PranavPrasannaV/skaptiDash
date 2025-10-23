import { useEffect, useState } from 'react';
import { ShoppingBag, Heart, Users, RotateCcw, Zap, Globe, Share2, DollarSign } from 'lucide-react';
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
      title: "Countless Options",
      description: "Browse a diverse range of clothing from around the world. Modern suits and casual wear to traditional Japanese kimonos and Indian saris. Any & all styles together, in one place, making it easy to find pieces that fit your taste and culture.",
      gradient: "from-[#6e83f7] to-[#8B93FF]",
      delay: "0s"
    },
    {
      icon: Heart,
      title: "Tailored To You",
      description: "Skaptix learns your preferences as you shop and uses a personalized meter to show how well each item matches your style. As you browse more, Skaptix gets to know you, helping you discover pieces that truly feel like you.",
      gradient: "from-[#A8B5DB] to-[#B8C5E0]",
      delay: "0.2s"
    },
    {
      icon: Users,
      title: "Own a Brand?",
      description: "Reach new customers and grow your business with Skaptix. Create your brand profile, upload products, and manage your storefront. All from one simple dashboard. We handle checkout, logistics, and customer support, so you can focus on what matters most: designing and selling your products.",
      gradient: "from-[#6e83f7] to-[#A8B5DB]",
      delay: "0.4s"
    }
  ];

  const guarantees = [
    {
      icon: Share2,
      title: "Social Media",
      description: "Post on Skaptix, share your looks, connect with a community of fashion enthusiasts, and tag your favorite brands - all within our platform.",
      color: "#6e83f7"
    },
    {
      icon: RotateCcw,
      title: "Hassle-Free Returns",
      description: "Shop with peace of mind. Our 30-day free return policy ensures you can easily exchange or refund items that don't meet your expectations.",
      color: "#A8B5DB"
    },
    {
      icon: DollarSign,
      title: "Earn While You Shop",
      description: "Join our affiliate program to earn money by sharing products you love. Post on Skaptix, tag your brands, and get rewarded for every purchase made through your links.",
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
              <span className="text-[#6e83f7] font-semibold">The First Platform</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
              <span className="block">WHAT IS</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                SKAPTIX?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Online fashion is fragmented.
              Every brand has its own storefront, policies, and return process.
              We’re building the first platform that unifies everything: one checkout, consistent service, total trust.
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
                        {feature.title === 'Countless Options' ? (
                          <img src={qualityClothingImg} alt="Countless Options" className="w-full h-full object-contain block mx-auto" />
                        ) : feature.title === 'Tailored To You' ? (
                          <img src={personalizedShoppingImg} alt="Tailored To You" className="w-full h-full object-contain block mx-auto" />
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
  <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden text-white">
        {/* Animated radial accents to blend with the features section above */}
          <style>{`
            @keyframes accentPulse {
              0% { opacity: 0.45; transform: scale(1); }
              50% { opacity: 0.85; transform: scale(1.02); }
              100% { opacity: 0.45; transform: scale(1); }
            }
          `}</style>
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 40%, rgba(110,131,247,0.12) 0%, transparent 45%),
                  radial-gradient(circle at 70% 20%, rgba(168,181,219,0.10) 0%, transparent 45%),
                  radial-gradient(circle at 50% 85%, rgba(110,131,247,0.06) 0%, transparent 50%)
                `,
                transform: `translateY(${scrollY * 0.06}px)`,
                opacity: 0.6,
                animation: 'accentPulse 9s ease-in-out infinite'
              }}
            />
          </div>

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
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
              <span className="block">THERE'S</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                MORE
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We aren't just a marketplace trying to de-monopolize fashion.
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
                <div className="relative bg-[#02101a] rounded-3xl p-8 shadow-2xl border border-white/8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: guarantee.color }}
                  >
                    <guarantee.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 text-center group-hover:text-[#6e83f7] transition-colors">
                    {guarantee.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-center">
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