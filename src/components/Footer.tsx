import { Heart, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-[#6e83f7] mb-4">skaptix</div>
            <p className="text-gray-400 leading-relaxed">
              A unified fashion marketplace connecting verified brands and shoppers through one seamless platform.
            </p>
          </div>

          {/* Quick Links - Horizontal */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <a
                href="/#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-white transition-colors"
              >
                FAQs
              </Link>
              <Link
                to="/support"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
              <Link
                to="/waitlist"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Waitlist
              </Link>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by the Skaptix Team
          </p>
          {/* Social follow */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://instagram.com/skaptix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Skaptix on Instagram"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://twitter.com/skaptixclo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Skaptix on Twitter"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 Skaptix Technologies LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;