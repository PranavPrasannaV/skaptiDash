import emailjs from '@emailjs/browser';

export type ContactForm = {
  name: string;
  email: string;
  subject?: string;
  website?: string;
  message: string;
};

/**
 * Send contact form via EmailJS. Requires these env vars set in Vite:
 * VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 */
export async function sendContactEmail(form: ContactForm) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS config missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY');
  }

  // Map the form fields to the template variable names used in EmailJS
  // Make sure your EmailJS template uses {{subject}}, {{name}}, {{email}}, {{time}}, {{message}}
  const templateParams = {
    subject: form.subject || '',
    name: form.name || 'Unknown',
    email: form.email,
    // provide a readable timestamp the template can display as {{time}}
    time: new Date().toLocaleString(),
    message: form.message,
    website: form.website || '',
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
}
