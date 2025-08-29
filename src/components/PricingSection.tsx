import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for new brands getting started",
      monthlyPrice: 29,
      yearlyPrice: 290,
      color: "#6e83f7",
      features: [
        "Up to 50 products",
        "Basic analytics",
        "Standard support",
        "Mobile app access",
        "Payment processing"
      ],
      popular: false
    },
    {
      name: "Growth",
      icon: Rocket,
      description: "Ideal for scaling brands",
      monthlyPrice: 79,
      yearlyPrice: 790,
      color: "#A8B5DB",
      features: [
        "Up to 500 products",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Marketing tools",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For established brands",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      color: "#6e83f7",
      features: [
        "Unlimited products",
        "Full analytics suite",
        "24/7 dedicated support",
        "White-label solution",
        "Advanced integrations",
        "Custom features",
        "Account manager"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#A8B5DB]/20 to-[#6e83f7]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20 backdrop-blur-xl border border-[#6e83f7]/30 rounded-full px-6 py-3 mb-8">
            <Crown className="w-5 h-5 text-[#6e83f7] mr-3 animate-pulse" />
            <span className="text-[#6e83f7] font-semibold">Choose Your Plan</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-none">
            <span className="block">SIMPLE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
              PRICING
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-800 rounded-2xl p-2 border border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group transition-all duration-500 ${
                plan.popular ? 'lg:-translate-y-8' : ''
              } ${
                hoveredPlan === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-6 py-2 rounded-full text-sm font-bold z-10">
                  Most Popular
                </div>
              )}

              <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 ${
                plan.popular 
                  ? 'border-[#6e83f7]/50 shadow-2xl shadow-[#6e83f7]/20' 
                  : 'border-white/20 hover:border-[#A8B5DB]/50'
              }`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: plan.color }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black text-white">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                    </span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-400 mt-2">
                      Billed annually (${plan.yearlyPrice}/year)
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white hover:shadow-2xl hover:shadow-[#6e83f7]/25'
                    : 'border-2 border-[#6e83f7] text-[#6e83f7] hover:bg-[#6e83f7] hover:text-white'
                }`}>
                  <span className="flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">
            Need a custom solution? We've got you covered.
          </p>
          <button className="bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-300 transform hover:-translate-y-1">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;