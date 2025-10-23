
import { ArrowRight, CheckCircle2, Clock, Mail, Shield } from 'lucide-react';
// Link not required on this page
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WaitlistPageSeller = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero & Form */}
      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
              <div className="space-y-8">
                <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur">
                  <span className="text-sm font-medium text-white/70">Seller Waitlist</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight animate-color-wave">
                  Sell on Skaptix
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left items-start">
                {[
                  {
                    icon: CheckCircle2,
                    title: 'Early Seller Access',
                    description: 'Get priority onboarding as a Skaptix seller.'
                  },
                  {
                    icon: Shield,
                    title: 'Zero Selling Fees',
                    description: 'First 50 sellers can sell for free. No selling fees.'
                  },
                  {
                    icon: Clock,
                    title: 'Direct Brand Support',
                    description: 'Work with our team to optimize your launch.'
                  }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#6e83f7]/50 transition-all duration-300 flex flex-col justify-start animate-slide-in-left"
                    style={{ animationDelay: `${idx * 0.18 + 0.2}s` }}
                  >
                    <item.icon className="w-6 h-6 text-[#6e83f7] mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-start">
                <a
                  href="/waitlist"
                  className="px-8 py-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white font-semibold shadow-lg hover:opacity-95 transition"
                >
                  Buyer Waitlist
                </a>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6e83f7]/10 via-transparent to-[#A8B5DB]/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl font-black mb-2">Seller Waitlist Form</h2>
                <form className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name*</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Guy Broodney"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="brandName" className="text-sm font-semibold text-gray-700">
                      Brand Name*
                    </label>
                    <input
                      id="brandName"
                      name="brandName"
                      type="text"
                      required
                      placeholder="FashionCo LLC"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Business Email*
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="fashionco@email.com"
                        className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-semibold text-gray-700">
                      Website (optional)
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      placeholder="https://fashionco.com"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="numItems" className="text-sm font-semibold text-gray-700">How many items are you interested in selling on Skaptix?</label>
                    <input
                      id="numItems"
                      name="numItems"
                      type="number"
                      min="1"
                      placeholder="e.g. 10"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-2.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:brightness-105"
                  >
                    Submit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form you agree to receive seller waitlist updates and product news. You can opt out anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistPageSeller;
