import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// ...existing code...
import { ArrowRight, CheckCircle2, Clock, Mail, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { addBuyerToWaitlist } from '../lib/firebase';

const WaitlistPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    shoppingHabits: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const topContentRef = useRef<HTMLDivElement | null>(null);

  const updateCardsHeight = useCallback(() => {
    // Height calculation removed as it's no longer needed
  }, []);

  useLayoutEffect(() => {
    updateCardsHeight();
    window.addEventListener('resize', updateCardsHeight);
    return () => window.removeEventListener('resize', updateCardsHeight);
  }, [updateCardsHeight]);

  useLayoutEffect(() => {
    updateCardsHeight();
  }, [status, formData.fullName, formData.email, formData.shoppingHabits, formData.website, isSubmitting, updateCardsHeight]);

  // Set page title
  useEffect(() => {
    document.title = 'Join Waitlist | Skaptix';
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') {
      setStatus('idle');
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.fullName || !formData.email) {
      setStatus('error');
      setErrorMessage('Please provide your name and email so we can reach out.');
      return;
    }
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        shoppingHabits: formData.shoppingHabits.trim(),
        website: formData.website.trim(),
      };
  await addBuyerToWaitlist(payload);
      setStatus('success');
      setFormData({ fullName: '', email: '', shoppingHabits: '', website: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong while saving your request. Please try again or email support@skaptix.com.');
    } finally {
      setIsSubmitting(false);
      updateCardsHeight();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero & Form */}
      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
              <div className="space-y-8" ref={topContentRef}>
                <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur">
                  <Sparkles className="w-4 h-4 text-[#A8B5DB] mr-2" />
                  <span className="text-sm font-medium text-white/70">Launching Q1 2026</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight animate-pulse-heading">
                  Show us Your Interest
                </h1>

                {/* Mobile-first: Waitlist form directly under the heading */}
                <div className="lg:hidden">
                  <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6e83f7]/10 via-transparent to-[#A8B5DB]/10 pointer-events-none" />
                    <div className="relative">
                      <h2 className="text-2xl font-black mb-2">Join the waitlist</h2>
                      
                      <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                            Full Name*
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Rufus Houndstooth"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                             Email*
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="rufus@randomstuff.com"
                              className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="brandName" className="text-sm font-semibold text-gray-700">
                            How do you usually shop online?
                          </label>
                          <input
                            id="shoppingHabits"
                            name="shoppingHabits"
                            type="text"
                            value={formData.shoppingHabits}
                            onChange={handleChange}
                            placeholder="Tiktok, Instragram, Brand Websites..."
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-2.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? 'Joining waitlist…' : 'Submit'}
                          {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                        </button>

                        {status === 'success' && (
                          <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                            You&apos;re on the list. We&apos;ll reach out when Skaptix is ready for you.
                          </p>
                        )}

                        {status === 'error' && (
                          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                            {errorMessage}
                          </p>
                        )}

                        <p className="text-xs text-gray-400 text-center">
                          By submitting this form you agree to receive waitlist updates and product news. You can opt out anytime.
                        </p>
                      </form>
                    </div>
                  </div>
                </div>


              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left items-start">
                {[
                  {
                    icon: CheckCircle2,
                    title: 'Early Access',
                    description: 'Gain priority entry to Skaptix before public launch.'
                  },
                  {
                    icon: Shield,
                    title: 'Exclusive Discounts',
                    description: 'On your first few purchases, enjoy 15-20% off your orders.'
                  },
                  {
                    icon: Clock,
                    title: 'Influence Skaptix',
                    description: 'Give us your feedback, invest in our growth.'
                  }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#6e83f7]/50 transition-all duration-300 flex flex-col justify-start animate-float-card"
                    style={{ animationDelay: `${idx * 0.25}s` }}
                  >
                    <item.icon className="w-6 h-6 text-[#6e83f7] mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                ))}
                <div className="mt-8 flex justify-start">
                  <Link to="/waitlist-seller">
                    <button
                      type="button"
                      className="px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-black font-semibold shadow-lg hover:opacity-95 transition text-base sm:text-lg whitespace-nowrap"
                      aria-label="Interested in Selling?"
                    >
                      Interested in Selling?
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div
              ref={formContainerRef}
              className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden h-full hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6e83f7]/10 via-transparent to-[#A8B5DB]/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl font-black mb-2">Join the waitlist</h2>
                

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full Name*
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Rufus Houndstooth"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                       Email*
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rufus@randomstuff.com"
                        className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="brandName" className="text-sm font-semibold text-gray-700">
                            How do you usually shop online?
                    </label>
                    <input
                            id="shoppingHabits"
                            name="shoppingHabits"
                      type="text"
                            value={formData.shoppingHabits}
                      onChange={handleChange}
                      placeholder="Tiktok, Instragram, Brand Websites..."
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>



                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-2.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Joining waitlist…' : 'Submit'}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </button>

                  {status === 'success' && (
                    <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                      You&apos;re on the list. We&apos;ll reach out when Skaptix is ready for you.
                    </p>
                  )}

                  {status === 'error' && (
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form you agree to receive waitlist updates and product news. You can opt out anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Additional sections intentionally removed per request */}
      </main>

      <Footer />
    </div>
  );
};

export default WaitlistPage;
