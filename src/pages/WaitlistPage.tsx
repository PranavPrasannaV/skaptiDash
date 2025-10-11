import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { collection, doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { ArrowRight, CheckCircle2, Clock, Mail, Shield, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { db } from '../lib/firebase';

const WaitlistPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    brandName: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cardsContainerHeight, setCardsContainerHeight] = useState<number | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const topContentRef = useRef<HTMLDivElement | null>(null);

  const updateCardsHeight = useCallback(() => {
    if (typeof window === 'undefined') return;

    const formEl = formContainerRef.current;
    const topEl = topContentRef.current;

    if (window.innerWidth >= 1024 && formEl && topEl) {
      const GAP_BETWEEN_SECTIONS_PX = 32; // tailwind gap-8
      const formHeight = formEl.offsetHeight;
      const topHeight = topEl.offsetHeight;
      const availableHeight = formHeight - topHeight - GAP_BETWEEN_SECTIONS_PX;

      setCardsContainerHeight(availableHeight > 0 ? availableHeight : null);
    } else {
      setCardsContainerHeight(null);
    }
  }, []);

  useLayoutEffect(() => {
    updateCardsHeight();
    window.addEventListener('resize', updateCardsHeight);
    return () => window.removeEventListener('resize', updateCardsHeight);
  }, [updateCardsHeight]);

  useLayoutEffect(() => {
    updateCardsHeight();
  }, [status, formData.fullName, formData.email, formData.brandName, formData.website, isSubmitting, updateCardsHeight]);

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
      setErrorMessage('Please provide your name and business email so we can reach out.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
  setErrorMessage(null);

    try {
      const waitlistRef = collection(db, 'waitlistRequests');

      const normalizedFullName = formData.fullName.trim();
      const normalizedEmail = formData.email.trim().toLowerCase();
      const brandNameRaw = formData.brandName.trim();
      const normalizedBrandName = brandNameRaw ? brandNameRaw.toLowerCase() : null;
      const websiteRaw = formData.website.trim().replace(/\/$/, '');
      const normalizedWebsite = websiteRaw ? websiteRaw.toLowerCase() : null;

      const sanitizeKey = (value: string) =>
        value
          .replace(/^https?:\/\//, '')
          .replace(/[^a-z0-9.-]/gi, '_');

      const batch = writeBatch(db);

      const waitlistDocRef = doc(waitlistRef);
      batch.set(waitlistDocRef, {
        fullName: normalizedFullName,
        email: normalizedEmail,
        brandName: brandNameRaw || null,
        brandNameNormalized: normalizedBrandName,
        website: websiteRaw || null,
        websiteNormalized: normalizedWebsite,
        source: 'skaptix-site',
        submittedAt: serverTimestamp(),
      });

      const emailIndexRef = doc(db, 'waitlistEmailIndex', sanitizeKey(normalizedEmail));
      batch.set(emailIndexRef, {
        waitlistId: waitlistDocRef.id,
        createdAt: serverTimestamp(),
      });

      if (normalizedBrandName) {
        const brandIndexRef = doc(db, 'waitlistBrandIndex', sanitizeKey(normalizedBrandName));
        batch.set(brandIndexRef, {
          waitlistId: waitlistDocRef.id,
          brandName: brandNameRaw,
          createdAt: serverTimestamp(),
        });
      }

      if (normalizedWebsite) {
        const websiteIndexRef = doc(db, 'waitlistWebsiteIndex', sanitizeKey(normalizedWebsite));
        batch.set(websiteIndexRef, {
          waitlistId: waitlistDocRef.id,
          website: websiteRaw,
          createdAt: serverTimestamp(),
        });
      }

      await batch.commit();

      setStatus('success');
      setFormData({ fullName: '', email: '', brandName: '', website: '' });
    } catch (error) {
      console.error('Failed to submit waitlist request', error);
      setStatus('error');

      if (error instanceof FirebaseError) {
        if (error.code === 'permission-denied') {
          const keyFor = (value: string) =>
            value
              .trim()
              .replace(/^https?:\/\//, '')
              .replace(/[^a-z0-9.-]/gi, '_')
              .toLowerCase();

          const emailIndexRef = doc(db, 'waitlistEmailIndex', keyFor(formData.email));
          const brandIndexRef = formData.brandName.trim()
            ? doc(db, 'waitlistBrandIndex', keyFor(formData.brandName))
            : null;
          const websiteIndexRef = formData.website.trim()
            ? doc(db, 'waitlistWebsiteIndex', keyFor(formData.website.replace(/\/$/, '')))
            : null;

          try {
            const [emailIndexSnap, brandIndexSnap, websiteIndexSnap] = await Promise.all([
              getDoc(emailIndexRef),
              brandIndexRef ? getDoc(brandIndexRef) : Promise.resolve(null),
              websiteIndexRef ? getDoc(websiteIndexRef) : Promise.resolve(null)
            ]);

            if (emailIndexSnap.exists()) {
              setErrorMessage('This email is already on the waitlist. We’ll be in touch soon!');
              return;
            }

            if (brandIndexSnap && brandIndexSnap.exists()) {
              setErrorMessage('This brand name has already been submitted. If you need changes, reach out to support@skaptix.com.');
              return;
            }

            if (websiteIndexSnap && websiteIndexSnap.exists()) {
              setErrorMessage('This site is already on the waitlist. If this is unexpected, contact support@skaptix.com.');
              return;
            }
          } catch (lookupError) {
            console.error('Failed to inspect waitlist indices for duplicates', lookupError);
          }
        }

        switch (error.code) {
          case 'permission-denied':
            setErrorMessage('We could not save your request due to Firestore security rules. Please verify your Firebase rules allow creating waitlist entries.');
            break;
          case 'unavailable':
            setErrorMessage('Firestore is temporarily unavailable. Please retry in a minute.');
            break;
          case 'invalid-argument':
            setErrorMessage('The waitlist payload was rejected by Firestore. Double-check your Firebase project configuration.');
            break;
          case 'failed-precondition':
            setErrorMessage('Your Firestore database is not yet fully initialized. Complete the setup in the Firebase console and try again.');
            break;
          default:
            setErrorMessage(error.message || 'Something went wrong while saving your request. Please try again or email support@skaptix.com.');
        }
      } else {
        setErrorMessage('Something went wrong while saving your request. Please try again or email support@skaptix.com.');
      }
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
                  <span className="text-sm font-medium text-white/70">Early access • Launching Q1 2026</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  Elevate your brand with the Skaptix creator waitlist
                </h1>

                <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                  Get priority onboarding, hands-on guidance, and your own digital storefront before we go public. We partner with founders building the next generation of culture-defining fashion brands.
                </p>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left lg:h-full"
                style={cardsContainerHeight ? { height: cardsContainerHeight } : undefined}
              >
                {[
                  {
                    icon: CheckCircle2,
                    title: 'Concierge launch plan',
                    description: 'One-on-one playbook to ship your first 30 days on Skaptix.'
                  },
                  {
                    icon: Shield,
                    title: 'Founder-only community',
                    description: 'Private hub of global founders and growth experts.'
                  },
                  {
                    icon: Clock,
                    title: 'Priority features',
                    description: 'Access new drops, analytics, and integrations first.'
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#6e83f7]/50 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <item.icon className="w-6 h-6 text-[#6e83f7] mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={formContainerRef}
              className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6e83f7]/10 via-transparent to-[#A8B5DB]/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl font-black mb-2">Join the waitlist</h2>
                <p className="text-sm text-gray-500 mb-8">
                  We onboard new partners in curated cohorts to protect quality and growth for every brand.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full name*
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ava Thompson"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Business email*
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
                        placeholder="ava@brandstudio.com"
                        className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="brandName" className="text-sm font-semibold text-gray-700">
                      Brand name
                    </label>
                    <input
                      id="brandName"
                      name="brandName"
                      type="text"
                      value={formData.brandName}
                      onChange={handleChange}
                      placeholder="Skaptix Studios"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-semibold text-gray-700">
                      Website or lookbook
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base shadow focus:border-[#6e83f7] focus:outline-none focus:ring-2 focus:ring-[#6e83f7]/30 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-2.5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Joining waitlist…' : 'Request priority access'}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </button>

                  {status === 'success' && (
                    <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                      You&apos;re on the list. We&apos;ll reach out within 48 hours with your next steps.
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
