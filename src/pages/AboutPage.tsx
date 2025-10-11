import { useEffect } from 'react';
import { Sparkles, Users2, Target, Star, Rocket, HeartHandshake, Award, Lightbulb } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import neilImage from '../assets/neil.jpg';
import balajiImage from '../assets/balaji.jpg';

const teamMembers = [
  {
    name: 'Neil Joshi',
    role: 'CEO & Founder',
    focus: 'Vision & Strategy',
    bio: 'Visionary leader driving innovation and growth, scaling emerging fashion brands into global powerhouses.',
    gradient: 'from-[#6e83f7] via-[#A8B5DB] to-[#6e83f7]',
    image: neilImage
  },
  {
    name: 'Balaji Prasanna Venkatesh',
    role: 'CTO & Co-Founder',
    focus: 'Technology & Innovation',
    bio: 'Technical architect building cutting-edge infrastructure for seamless brand experiences and real-time analytics.',
    gradient: 'from-[#2A2F4F] via-[#6e83f7] to-[#A8B5DB]',
    image: balajiImage
  },
  {
    name: 'Ziliconcloud',
    role: 'Consultant',
    focus: 'Strategic Advisory',
    bio: 'Strategic partner providing expert guidance on scaling operations and driving business excellence.',
    gradient: 'from-[#A8B5DB] via-[#6e83f7] to-[#2A2F4F]',
    image: null
  }
];

const culturalValues = [
  {
    icon: Target,
    title: 'Purpose over vanity',
    description: 'Every feature starts with a founder need. If it doesn’t drive growth or delight, it ships later.'
  },
  {
    icon: HeartHandshake,
    title: 'Co-build with creators',
    description: 'We prototype with our brands daily, shipping updates in lockstep with their next drop.'
  },
  {
    icon: Lightbulb,
    title: 'Invent boldly',
    description: 'We explore emerging retail tech, from AI stylists to adaptive storefronts, to keep founders ahead.'
  },
  {
    icon: Award,
    title: 'Craft matters',
    description: 'Pixel, copy, and packaging go hand in hand. We sweat the details because our brands do.'
  }
];

const momentumHighlights = [
  {
    label: 'Cohort retention',
    value: '97%'
  },
  {
    label: 'Creator community',
    value: '5 continents'
  },
  {
    label: 'Avg. launch lift',
    value: '3.2x'
  },
  {
    label: 'Strategic partners',
    value: '18'
  }
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0c15] to-black text-white">
      <Navigation />

      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur">
                <Sparkles className="w-4 h-4 text-[#A8B5DB]" />
                <span className="text-sm font-medium text-white/80">We build the future of cultural commerce</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                About <span className="bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] bg-clip-text text-transparent">Skaptix</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                We&apos;re a collective of builders, strategists, and fashion obsessives helping founders scale their brands without losing their soul. From the first prototype to global drops, Skaptix is the backstage crew powering culture-defining labels.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <Users2 className="w-8 h-8 text-[#6e83f7]" />
                  <h3 className="text-2xl font-bold">Creator-first DNA</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Built with elite founders from New York, Lagos, Seoul, and London to design a platform that matches their ambition.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <Rocket className="w-8 h-8 text-[#A8B5DB]" />
                  <h3 className="text-2xl font-bold">Launch velocity</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Our waitlist brands see 3x faster go-to-market with personalized onboarding, growth crews, and data-rich workflows.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[38px] border border-white/10 bg-gradient-to-br from-[#6e83f7]/20 via-[#A8B5DB]/5 to-transparent p-8 backdrop-blur-xl">
                <h2 className="text-3xl font-black mb-4">Our story</h2>
                <p className="text-white/70 leading-relaxed">
                  Skaptix began as a pop-up tech studio embedded inside independent ateliers. We joined fittings, helped launch collections, and wrote code at midnight backstage. The result? A platform purpose-built for modern creator brands: modular, beautiful, and resilient.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {momentumHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-5">
                      <div className="text-3xl font-black text-white">{item.value}</div>
                      <p className="text-xs tracking-wide uppercase text-white/50 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[38px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <Star className="w-8 h-8 text-[#ffc876]" />
                  <div>
                    <p className="text-white/70 leading-relaxed text-sm">
                      “Skaptix has been like adding a seasoned operator to our founding team. They orchestrate narrative, data, and logistics so we can stay focused on creative direction.”
                    </p>
                    <p className="text-white font-semibold mt-3">Rae Collins · Founder, ARC Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#A8B5DB]/80 mb-3">Leadership crew</p>
              <h2 className="text-3xl font-black">Meet the humans behind the console</h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 border border-white/10 rounded-full px-5 py-2 hover:bg-white/5 transition">
              View open roles
              <ArrowIcon />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 flex flex-col gap-6 group"
              >
                <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${member.gradient}`} />
                <div className="relative z-10">
                  {member.image ? (
                    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                      {member.name[0]}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mt-6">{member.name}</h3>
                  <p className="text-[#A8B5DB] font-semibold">{member.role}</p>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{member.bio}</p>
                </div>
                <div className="relative z-10 mt-auto">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Focus</div>
                  <p className="text-sm text-white/80 mt-1">{member.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[#A8B5DB]/80">How we work</p>
              <h2 className="text-3xl font-black">Principles that guide every launch</h2>
              <p className="text-white/70 leading-relaxed">
                We rally behind founders who combine daring aesthetics with operational excellence. Our hybrid teams balance deep strategic thinking with hands-on execution, so your brand compounds momentum each month.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {culturalValues.map((value) => (
                  <div key={value.title} className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-4">
                    <value.icon className="w-6 h-6 text-[#6e83f7]" />
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[38px] border border-white/10 bg-white/10 p-10 space-y-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Star className="w-6 h-6 text-[#ffc876]" />
                Studio cadences
              </h3>
              <div className="space-y-5">
                {[
                  {
                    title: 'Launch labs',
                    description: 'Cross-functional squads rally around new collections, prototyping merch flow, lookbook drops, and experiential packaging.'
                  },
                  {
                    title: 'Growth retros',
                    description: 'Bi-weekly, metric-driven reviews where we analyze founder dashboards and evolve playbooks in real time.'
                  },
                  {
                    title: 'Creator intensives',
                    description: 'Immersive residencies in NYC, Lagos, and Paris to co-design with stylists, producers, and tech leads.'
                  }
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <div className="rounded-[38px] border border-[#6e83f7]/20 bg-gradient-to-br from-[#6e83f7]/15 via-[#A8B5DB]/10 to-transparent p-10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">Join the wave</p>
                <h2 className="text-3xl font-black mt-3">We partner with founders who want to set culture</h2>
                <p className="text-white/70 leading-relaxed mt-4 max-w-2xl">
                  Our next cohort kicks off soon. If you&apos;re building a bold fashion or retail concept and crave a crew of operators in your corner, we&apos;d love to meet you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="/waitlist"
                  className="text-center bg-white text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  Request invite
                </a>
                <a
                  href="mailto:team@skaptix.com"
                  className="text-center border border-white/30 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/10 transition"
                >
                  Message the team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 19L19 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5H19V15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AboutPage;
