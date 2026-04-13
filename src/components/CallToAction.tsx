// The contact block was intentionally removed from this shared component
// and moved to a dedicated Contact page. Keep this component minimal so
// that HomePage can import it without causing JSX/parse errors.
import AppleLogo from '../assets/skaptixss/skaptixss/apple.png';
import AndroidLogo from '../assets/skaptixss/skaptixss/android.png';
import * as constants from '../constants';

const CallToAction = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-black text-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Interested in Selling?</h2>
            <p className="mt-3 text-gray-300 max-w-xl">Download and list your brand now.</p>
          </div>

          <div className="flex flex-col gap-4 flex-shrink-0 w-full md:w-auto">
            <a href={constants.APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl transition">
              <img src={AppleLogo} alt="Apple" className="w-4 h-4" />
              Download on iOS
              <span aria-hidden>→</span>
            </a>
            <a href={constants.PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-[#6e83f7] px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl transition border border-white/10">
              <img src={AndroidLogo} alt="Android" className="w-4 h-4" />
              Download on Android
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;