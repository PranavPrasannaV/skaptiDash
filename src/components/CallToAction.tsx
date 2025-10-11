import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Globe,
  Users,
  Rocket,
  Star,
  Zap,
  Phone,
  MessageSquare,
  Building2,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const CallToAction = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    website: '',
    focus: 'Launch strategy',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const emailJsConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (contactStatus !== 'idle') {
      setContactStatus('idle');
    }

    if (contactError) {
      setContactError(null);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setContactStatus('error');
      setContactError('Please share your name, email, and a quick note so we can follow up.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setContactStatus('error');
      setContactError('Could you double-check that email address? It looks a little off.');
      return;
    }

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setContactStatus('error');
      setContactError('Email is unavailable right now. Please add EmailJS credentials or reach us at team@skaptix.com.');
      return;
    }

    setIsSubmittingContact(true);
    setContactStatus('idle');
    setContactError(null);

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          full_name: trimmedName,
          email: trimmedEmail,
          company: formData.company.trim() || 'Not provided',
          website: formData.website.trim() || 'Not provided',
          focus: formData.focus,
          message: trimmedMessage,
          submitted_at: new Date().toISOString()
        },
        emailJsConfig.publicKey
      );

      setContactStatus('success');
      setFormData({
        fullName: '',
        email: '',
        company: '',
        website: '',
        focus: 'Launch strategy',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission failed', error);
      setContactStatus('error');
      setContactError('Something went wrong while sending your note. Please try again or email team@skaptix.com.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

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
              <Link
                to="/waitlist"
                className="group bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-12 py-6 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Launch Your Brand
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A8B5DB] to-[#6e83f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              
              <button className="group border-2 border-[#6e83f7] text-[#6e83f7] px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#6e83f7] hover:text-white transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Explore Platform
                  <Globe className="ml-3 w-7 h-7 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </div>

            {/* Trust Indicators - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" style={{ display: 'none' }}>
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

      {/* Contact Section - Interactive Form */}
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-br from-[#05060f] via-[#10152c] to-[#05060f] text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-32 left-20 h-72 w-72 rounded-full bg-[#6e83f7]/40 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[#A8B5DB]/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,131,247,0.15),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[0.95fr,1.05fr] gap-12 items-start">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur">
                <Mail className="w-4 h-4 text-[#A8B5DB]" />
                <span className="text-sm font-medium text-white/80">Your backstage access to the Skaptix crew</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl sm:text-5xl font-black leading-tight">
                  Let's build your next confident launch together
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  Share what you&apos;re creating and we&apos;ll curate a response within 24 hours—with an operator, not a bot.
                  Whether you&apos;re scoping a drop, planning retail innovation, or inviting collaboration, our team is ready.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6e83f7]" />
                    <span className="text-sm uppercase tracking-[0.2em] text-white/60">Email</span>
                  </div>
                  <a href="mailto:team@skaptix.com" className="text-lg font-semibold text-white hover:text-[#A8B5DB] transition">
                    team@skaptix.com
                  </a>
                  <p className="text-sm text-white/60">Average reply time: 4 hours</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#A8B5DB]" />
                    <span className="text-sm uppercase tracking-[0.2em] text-white/60">Founder line</span>
                  </div>
                  <a href="tel:+16468885678" className="text-lg font-semibold text-white hover:text-[#6e83f7] transition">
                    +1 (646) 888-5678
                  </a>
                  <p className="text-sm text-white/60">Book a 20-minute strategy warm-up</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-white/70">
                    <Building2 className="w-5 h-5 text-[#6e83f7]" />
                    <span>Studios in NYC · Lagos · London</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-white/70">
                    <MessageSquare className="w-5 h-5 text-[#A8B5DB]" />
                    <span>Private Slack with our operator collective</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-[0.3em] text-white/50">What you can expect</h4>
                <ul className="space-y-2">
                  {[
                    'Curated onboarding playbooks tailored to your brand velocity',
                    'Launch simulations with insights from our analytics lab',
                    'Red-carpet access to drops, partnerships, and platform updates'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 w-4 h-4 text-[#6e83f7] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-br from-[#6e83f7]/60 via-[#A8B5DB]/40 to-transparent opacity-80 blur" />
              <div className="relative rounded-[32px] border border-white/10 bg-black/70 backdrop-blur-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/60">Start the conversation</p>
                    <h4 className="text-2xl font-bold mt-2">Tell us about your launch</h4>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6e83f7] to-[#A8B5DB] flex items-center justify-center text-white font-black">
                    AI
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleFormSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-semibold text-white/80">
                        Full name*
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          placeholder="Jamie Rivera"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-white/80">
                        Work email*
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="jamie@brand.co"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-semibold text-white/80">
                        Brand or collective
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={formData.company}
                          onChange={handleFormChange}
                          placeholder="Skaptix Studios"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="website" className="text-sm font-semibold text-white/80">
                        Website / portfolio
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleFormChange}
                          placeholder="https://"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="focus" className="text-sm font-semibold text-white/80">
                      What do you want to explore?
                    </label>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <select
                        id="focus"
                        name="focus"
                        value={formData.focus}
                        onChange={handleFormChange}
                        className="appearance-none w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-10 py-3 text-sm text-white focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                      >
                        {[
                          'Launch strategy',
                          'Platform deep-dive',
                          'Partnership opportunities',
                          'Press & speaking',
                          'Community or residency'
                        ].map((option) => (
                          <option key={option} value={option} className="bg-[#05060f]">
                            {option}
                          </option>
                        ))}
                      </select>
                      <ArrowRight className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-white/80">
                      Share your vision*
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/40" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your next drop, challenges, or ideas."
                        className="w-full rounded-3xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/40">
                    <p>
                      By submitting, you agree to hear from the Skaptix crew about platform updates and curated opportunities.
                    </p>
                    <p>Prefer direct access? Email <a href="mailto:team@skaptix.com" className="text-[#A8B5DB] hover:text-white transition">team@skaptix.com</a>.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:shadow-2xl hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmittingContact ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </button>

                  {contactStatus === 'success' && (
                    <div className="rounded-2xl border border-green-300/40 bg-green-500/10 px-4 py-3 text-sm text-green-200 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5" />
                      <span>
                        Got it! We&apos;ll pair you with the right operator and follow up within a day. Keep an eye on your inbox.
                      </span>
                    </div>
                  )}

                  {contactStatus === 'error' && contactError && (
                    <div className="rounded-2xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 mt-0.5" />
                      <span>{contactError}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;