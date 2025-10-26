import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sendContactEmail } from '../lib/email';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', website: '', message: '' });
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Contact | Skaptix';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setStatusError(false);

    // Basic validation
    if (!form.email || !form.message) {
      setStatusError(true);
      setStatusMessage('Please provide your email and a message.');
      return;
    }

    setSending(true);
    try {
      await sendContactEmail({
        name: form.name,
        email: form.email,
        subject: form.subject,
        website: form.website,
        message: form.message,
      });
      setStatusError(false);
      setStatusMessage("Message sent! We'll respond within 24 hours.");
  setForm({ name: '', email: '', subject: '', website: '', message: '' });
    } catch (err: any) {
      console.error('Contact send error', err);
      setStatusError(true);
      setStatusMessage(err?.message || 'Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-6 py-32">
        <div className="space-y-8 text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight animate-bounce-in bg-gradient-to-r from-[#6e83f7] via-[#A8B5DB] to-[#6e83f7] bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto animate-slide-up font-medium">
            Questions? Comments? Concerns?
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#05060f]/80 to-[#0b1020]/80 p-8 shadow-2xl border border-white/6 transform transition-all duration-500 hover:scale-[1.02] animate-bounce-in-delayed">
          {statusMessage && (
            <div className={`mb-4 w-full rounded-md p-3 text-sm ${statusError ? 'bg-red-800 text-red-200' : 'bg-emerald-900 text-emerald-100'}`}>
              {statusMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="group">
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Full name" 
                  className="w-full rounded-xl p-4 bg-transparent border border-white/10 transition-all duration-300 focus:border-[#6e83f7]/50 focus:ring-2 focus:ring-[#6e83f7]/20 hover:border-white/20 text-lg font-medium text-white/90 placeholder:text-white/40"
                />
              </div>
              <div className="group">
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="Email" 
                  className="w-full rounded-xl p-4 bg-transparent border border-white/10 transition-all duration-300 focus:border-[#6e83f7]/50 focus:ring-2 focus:ring-[#6e83f7]/20 hover:border-white/20 text-lg font-medium text-white/90 placeholder:text-white/40"
                />
              </div>
            </div>
            <div className="group">
              <input 
                name="subject" 
                value={form.subject} 
                onChange={handleChange} 
                placeholder="Subject" 
                className="w-full rounded-xl p-4 bg-transparent border border-white/10 transition-all duration-300 focus:border-[#6e83f7]/50 focus:ring-2 focus:ring-[#6e83f7]/20 hover:border-white/20 text-lg font-medium text-white/90 placeholder:text-white/40"
              />
            </div>
            
            <div className="group">
              <textarea 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                placeholder="Message" 
                className="w-full rounded-xl p-4 bg-transparent border border-white/10 transition-all duration-300 focus:border-[#6e83f7]/50 focus:ring-2 focus:ring-[#6e83f7]/20 hover:border-white/20 h-40 text-lg font-medium text-white/90 placeholder:text-white/40 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <p className="text-sm text-slate-400 order-2 sm:order-1">We'll respond within 24 hours</p>
              <div className="flex items-center gap-4 order-1 sm:order-2 w-full sm:w-auto">
                <button disabled={sending} type="submit" className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#6e83f7]/20 hover:scale-[1.02] disabled:opacity-60">
                  {sending ? 'Sending...' : 'Send message'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setForm({ name: '', email: '', subject: '', website: '', message: '' })} 
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5 transition-colors duration-300"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
