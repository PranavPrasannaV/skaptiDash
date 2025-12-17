import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'FAQs | Skaptix';
  }, []);

  const faqs: FAQItem[] = [
    {
      question: 'What is Skaptix?',
      answer: 'Skaptix is an AI-powered fashion marketplace that connects all fashion brands and shoppers in one unified platform. We pool products from thousands of brands, and our AI helps you discover exactly what you\'re looking for based on your style, preferences, and budget. Shop from multiple brands in a single checkout experience.',
    },
    {
      question: 'When will Skaptix launch?',
      answer: 'Skaptix is launching on both iOS and Android in January 2026. Join our waitlist to be the first to know when we go live and get early access to exclusive features.',
    },
    {
      question: 'How does shipping work?',
      answer: 'Each brand ships directly from their own location in their own packaging. When you order from multiple brands, you\'ll receive separate packages from each seller. Shipping costs are calculated individually per brand based on their location and shipping methods, giving you transparency and flexibility in your purchasing decisions.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer free, easy returns on all purchases. If you\'re not satisfied with your order, you can return items within 30 days for a full refund. Simply initiate a return through your Skaptix account, and we\'ll handle the coordination with the seller.',
    },
    {
      question: 'How do you verify brands on Skaptix?',
      answer: 'Every brand on Skaptix goes through a rigorous verification process. We review business credentials, product quality, customer service standards, and ethical practices to ensure only trusted brands join our marketplace.',
    },
    {
      question: 'How can I earn money as a buyer on Skaptix?',
      answer: 'Buyers can earn money through our affiliate program! When you post products on Skaptix, you can include affiliate tags. If other buyers click your link and make a purchase, you earn a commission percentage determined by the seller. It\'s a great way to share your favorite finds and get rewarded for it. Plus, our social media section lets you post your fashion, discover others\' styles, see what people are buying, and even order items you see in others\' posts.',
    },
    {
      question: 'Can I sell my brand on Skaptix?',
      answer: 'Yes! Any fashion brand can join Skaptix. We only charge a percentage when you make a sale - no monthly fees or upfront costs. You set your own commission rates for affiliate buyers, manage your inventory, and access powerful analytics to grow your business. We also offer surge pricing options: during holidays or when you want increased visibility, we simply adjust the selling percentage instead of charging separate campaign fees.',
    },
    {
      question: 'What are the fees for sellers?',
      answer: 'Skaptix operates on a simple, transparent model: we only charge a selling percentage when a purchase is made. There are no monthly fees or subscription costs to use the platform. Additionally, we offer surge pricing during high-demand periods (like holidays) or for increased product visibility - instead of paying separate advertising costs, the selling percentage adjusts when those products sell. You only pay when you earn.',
    },
    {
      question: 'What is the social media feature?',
      answer: 'Skaptix includes a built-in social media section where you can share your fashion style, post outfits, and discover what others are wearing. You can see other users\' purchases (if they choose to share), get inspired by their looks, and directly order items you see in their posts - all without leaving Skaptix. It\'s a community-driven way to discover new styles and connect with fellow fashion enthusiasts.',
    },
    {
      question: 'What makes Skaptix different from other marketplaces?',
      answer: 'Unlike other platforms, Skaptix is the first unified fashion only marketplace. We then use AI to pool products from all fashion brands and show you exactly what matches your style. We combine shopping with social discovery - see what others are wearing, earn money through affiliate links, and build a community around fashion. For sellers, we offer a no-monthly-fee model with flexible surge pricing instead of expensive ad campaigns. Everything you need to discover, share, and shop fashion is in one place.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="relative pt-32 pb-20 px-6 sm:px-8">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#6e83f7]/20 to-[#A8B5DB]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#A8B5DB]/20 to-[#6e83f7]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-bounce-in">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB]">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Skaptix. Can't find what you're looking for? 
              <a href="/contact" className="text-[#6e83f7] hover:text-[#A8B5DB] transition-colors ml-1">
                Contact us
              </a>
              .
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                >
                  <span className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#6e83f7] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-[#6e83f7]/10 to-[#A8B5DB]/10 border border-white/10 rounded-2xl p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-[#6e83f7]/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FaqPage;
