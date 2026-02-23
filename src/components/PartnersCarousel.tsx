import React from 'react';
import p1 from '../assets/skaptixss/skaptixss/1.png';
import p2 from '../assets/skaptixss/skaptixss/2.png';
import p3 from '../assets/skaptixss/skaptixss/3.png';
import p4 from '../assets/skaptixss/skaptixss/4.png';
import p5 from '../assets/skaptixss/skaptixss/5.png';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const PartnersCarousel: React.FC = () => {
  // Five partners using your uploaded assets
  const partners: Partner[] = [
    { id: 1, name: 'Partner 1', logo: p1 },
    { id: 2, name: 'Partner 2', logo: p2 },
    { id: 3, name: 'Partner 3', logo: p3 },
    { id: 4, name: 'Partner 4', logo: p4 },
    { id: 5, name: 'Partner 5', logo: p5 },
  ];

  // Triple the set for seamless infinite scrolling without jumping
  const loop = [...partners, ...partners, ...partners];

  // Animation duration (seconds) — adjust this to speed up / slow down
  const durationSeconds = partners.length * 5; // 5 * 5 = 25s default

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
          <p className="text-gray-600">Trusted by leading brands and global partners</p>
        </div>

        <div className="overflow-hidden w-full hidden md:block">
          <div
            className="partners-track flex items-center gap-12"
            style={{
              animation: `scroll ${durationSeconds}s linear infinite`,
            }}
            aria-hidden={false}
          >
            {loop.map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex-shrink-0 w-[320px] h-[120px] flex items-center justify-center">
                <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Static grid view */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center justify-center w-full h-[80px]">
              <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>

        <style>{`
          .partners-track { 
            display: flex; 
            align-items: center; 
            will-change: transform;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            33.33% { transform: translateX(calc(-100% / 3)); }
            66.66% { transform: translateX(calc(-200% / 3)); }
            99.99% { transform: translateX(calc(-100%)); }
            100% { transform: translateX(0); }
          }
          .partners-track { animation: scroll ${durationSeconds}s linear infinite; }
          .partners-track:hover { animation-play-state: paused; }
          @media (max-width: 768px) {
            .partners-track { animation: scroll ${durationSeconds * 0.2}s linear infinite !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default PartnersCarousel;
