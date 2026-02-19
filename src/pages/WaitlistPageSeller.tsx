
import { useEffect, useState, useRef } from 'react';
import { addSellerToWaitlist } from '../lib/firebase';
import { ChevronDown, ArrowRight, Mail } from 'lucide-react';
// Link not required on this page
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WaitlistPageSeller = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsFormVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // --- Logic for seller waitlist form ---
  const [form, setForm] = useState({
    fullName: '',
    brandName: '',
    email: '',
    website: '',
    numItems: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const payload = {
        fullName: form.fullName,
        brandName: form.brandName,
        email: form.email,
        website: form.website,
        numItems: form.numItems ? Number(form.numItems) : undefined
      };
  await addSellerToWaitlist(payload);
      setSuccess(true);
      setForm({ fullName: '', brandName: '', email: '', website: '', numItems: '' });
    } catch (err: any) {
      setError(err.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    document.title = 'Seller Waitlist | Skaptix';
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Floating Mobile Button */}
      <button
        onClick={scrollToForm}
        className={`fixed bottom-8 right-6 md:hidden z-40 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 animate-bounce ${
          isFormVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        Join Waitlist
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Content & Form */}
      <main className="pt-40 pb-24">
        <section className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Brief Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight animate-color-wave">
                  Sell on Skaptix
                </h1>
                <p className="text-lg text-white/70">Skaptix personalizes the marketplace itself. If someone loves streetwear, their entire feed, brands, and discovery experience becomes a streetwear marketplace. Same app — different experience per user.</p>
              </div>

              {/* Problem */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">The Problem</h3>
                <ul className="space-y-2">
                  {[
                    'Discovery is fragmented across platforms',
                    'Customer acquisition costs are skyrocketing',
                    'Marketplaces dilute brand identity',
                    'No fashion-only cross-brand shopping experience'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-white/70">
                      <span className="text-red-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">The Solution</h3>
                <ul className="space-y-2">
                  {[
                    'Fashion-only marketplace with AI discovery',
                    'Skaptix is one app, but every user gets their own niche marketplace',
                    'Higher-intent shoppers, zero selling fees',
                    'White-glove onboarding & 24/7 support',
                    'Full brand control & profile ownership'
                  ].map((item, idx) => (  
                    <li key={idx} className="flex gap-2 items-start text-sm text-white/70">
                      <span className="text-[#6e83f7]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#6e83f7] font-semibold text-sm pt-3 border-t border-white/10 mt-3">Our goal: Skaptix is the first place shoppers go for fashion.</p>
              </div>

              {/* Quick Benefits */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Why Join</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'No Risk', desc: 'Zero upfront cost' },
                    { label: 'Founding Badge', desc: 'Early recognition' },
                    { label: 'Zero Fees', desc: 'Pilot program' },
                    { label: 'Direct Support', desc: 'Dedicated team' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-[#6e83f7] font-semibold text-xs">{item.label}</p>
                      <p className="text-white/60 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div ref={formRef} className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden lg:sticky lg:top-32">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6e83f7]/10 via-transparent to-[#A8B5DB]/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl font-black mb-2">Join the Seller Waitlist</h2>
                <p className="text-gray-600 mb-6">Get early access and start selling on Skaptix</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name*</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Guy Broodney"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                      value={form.fullName}
                      onChange={handleChange}
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
                      value={form.brandName}
                      onChange={handleChange}
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
                        value={form.email}
                        onChange={handleChange}
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
                      value={form.website}
                      onChange={handleChange}
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
                      value={form.numItems}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-2.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:brightness-105"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  {success && (
                    <p className="text-green-600 text-sm text-center mt-2">Submitted! We'll be in touch soon.</p>
                  )}
                  {error && (
                    <p className="text-red-600 text-sm text-center mt-2">{error}</p>
                  )}

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
