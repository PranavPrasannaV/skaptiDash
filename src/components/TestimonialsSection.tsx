import { useState, useEffect } from 'react';
import qualityClothingImg from '../assets/skaptixss/skaptixss/qualityclothing.jpg';
import urbanThreadsImg from '../assets/skaptixss/skaptixss/IMG-20250828-WA0011.jpg';
import minimalCoImg from '../assets/skaptixss/skaptixss/personalizedshopping.jpg';
import techWearImg from '../assets/skaptixss/skaptixss/customerconnect.jpg';
import { Star, Quote, ArrowLeft, ArrowRight, Play } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Chen",
      brand: "Eco Luxe",
      role: "Founder",
      image: qualityClothingImg,
      rating: 5,
      text: "Skaptix transformed my small sustainable fashion brand into a global business. In just 6 months, we went from local sales to shipping worldwide. The platform's tools are incredible!",
      growth: "+340%",
      metric: "Revenue Growth"
    },
    {
      name: "Marcus Rodriguez",
      brand: "Urban Threads",
      role: "Creative Director",
      image: urbanThreadsImg,
      rating: 5,
      text: "The exposure we got through Skaptix was game-changing. Our streetwear brand reached customers we never could have found on our own. The analytics help us understand our audience perfectly.",
      growth: "+280%",
      metric: "Customer Base"
    },
    {
      name: "Emma Thompson",
      brand: "Minimal Co",
      role: "CEO",
      image: minimalCoImg,
      rating: 5,
      text: "As a minimalist brand, we needed a platform that understood our aesthetic. Skaptix not only showcased our products beautifully but connected us with customers who truly appreciate our vision.",
      growth: "+195%",
      metric: "Brand Recognition"
    },
    {
      name: "David Kim",
      brand: "Tech Wear Pro",
      role: "Founder",
      image: techWearImg,
      rating: 5,
      text: "The technical fashion market is niche, but Skaptix helped us find our exact target audience. The platform's smart recommendations brought us customers who were genuinely interested in our products.",
      growth: "+420%",
      metric: "Sales Volume"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #6e83f7 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #A8B5DB 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-[#6e83f7]/10 to-[#A8B5DB]/10 border border-[#6e83f7]/20 rounded-full px-6 py-3 mb-8">
            <Quote className="w-5 h-5 text-[#6e83f7] mr-3" />
            <span className="text-[#6e83f7] font-semibold">Success Stories</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
            <span className="block">BRANDS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
              LOVE US
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the brands that have transformed their business with Skaptix
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Testimonial Content */}
              <div className="p-12 lg:p-16">
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed mb-8">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-[#6e83f7] font-semibold">
                        {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].brand}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Metrics & Visual */}
              <div className="bg-gradient-to-br from-[#6e83f7] to-[#A8B5DB] p-12 lg:p-16 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
                      linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
                    `,
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-black mb-4">
                      {testimonials[currentTestimonial].growth}
                    </div>
                    <div className="text-xl font-semibold opacity-90">
                      {testimonials[currentTestimonial].metric}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Platform Rating</span>
                        <span className="text-2xl font-black">4.9★</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Success Rate</span>
                        <span className="text-2xl font-black">99.2%</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Global Reach</span>
                        <span className="text-2xl font-black">85+ Countries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 gap-6">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-[#6e83f7]" />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
            >
              <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-[#6e83f7]" />
            </button>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`w-14 h-14 rounded-full shadow-lg border flex items-center justify-center transition-all ${
                isAutoPlaying
                  ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Play className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { value: "2.5K+", label: "Happy Brands" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "99.2%", label: "Success Rate" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-black text-[#6e83f7] mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;