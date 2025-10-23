import { useEffect } from 'react';
import { Sparkles, Users2, Rocket } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import neilImage from '../assets/neil.jpg';
import balajiImage from '../assets/balaji.jpg';

const teamMembers = [
  {
    name: 'Neil Joshi',
    role: 'CEO & Founder',
    focus: 'Strategy & Development',
    bio: 'Visionary leader driving innovation and growth, scaling and building Skaptix into a market leader.',
    gradient: 'from-[#6e83f7] via-[#A8B5DB] to-[#6e83f7]',
    image: neilImage
  },
  {
    name: 'Balaji Prasanna Venkatesh',
    role: 'CTO & Co-Founder',
    focus: 'Technology & Architecture',
    bio: 'Technical architect building cutting-edge infrastructure',
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


const momentumHighlights = [
  {
    label: 'Prefer supporting smaller brands',
    value: '1-3 Shoppers'
  },
  {
    label: 'Control over 65% of total online sales',
    value: '100 Retailers'
  },
  {
    label: 'Skaptix connects every brand to its audience',
    value: '0 Barriers'
  },
  {
    label: 'Say they want to buy from smaller brands but struggle to find them',
    value: '40% of Shoppers'
  }
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'About | Skaptix';
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
                <span className="text-sm font-medium text-white/80">The future of online clothes shopping</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight animate-bounce-in">
                About <span className="bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] bg-clip-text text-transparent">Skaptix</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl animate-slide-up">
                Skaptix is a digital marketplace that connects verified fashion brands and shoppers in one seamless platform. We simplify online fashion by combining multiple stores into a single checkout experience, with standardized shipping, easy returns, and personalized AI style recommendations. From local boutiques to global labels, Skaptix helps brands grow while giving shoppers a trusted, effortless way to explore the world of fashion.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <Users2 className="w-8 h-8 text-[#6e83f7]" />
                  <h3 className="text-2xl font-bold"> De-Monopolization</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    If there’s an audience for your brand, they should be able to find it, and buy it, in one trusted place.                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <Rocket className="w-8 h-8 text-[#A8B5DB]" />
                  <h3 className="text-2xl font-bold">AI Personalization</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Our AI-driven recommendation system helps shoppers discover clothes that truly match them.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[38px] border border-white/10 bg-gradient-to-br from-[#6e83f7]/20 via-[#A8B5DB]/5 to-transparent p-8 backdrop-blur-xl">
                <h2 className="text-3xl font-black mb-4">By The Numbers</h2>
                <p className="text-white/70 leading-relaxed">
                  Online shopping is concentrated: Amazon alone accounts for ~37.6% of all US e-commerce, and the top 100 retailers control ~66% of the market. That leaves independent labels fighting for visibility. We’re building an open platform that helps great products get found, no matter a brand’s size                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {momentumHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-5">
                      <div className="text-3xl font-black text-white">{item.value}</div>
                      <p className="text-xs tracking-wide text-white/50 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
             
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#A8B5DB]/80 mb-3 animate-slide-up">Founders</p>
              <h2 className="text-3xl font-black bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] bg-clip-text text-transparent animate-bounce-in">Meet The Team</h2>
            </div>
           
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 flex flex-col gap-6 group animate-bounce-in-delayed hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: '0.4s' }}
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


      </main>


      <Footer />
    </div>
  );
};

export default AboutPage;
