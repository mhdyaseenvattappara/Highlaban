'use client';

import Section from './Section';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import ShineBorder from './ui/shine-border';

export default function ContactSection() {
    return (
        <Section id="contact" dark className="flex-col">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row min-h-[600px]">

                {/* Info Side */}
                <div className="md:w-5/12 bg-[#0066cc] p-12 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <span className="opacity-70 uppercase tracking-widest text-sm font-bold mb-2 block">Contact Us</span>
                        <h2 className="text-4xl font-bold font-bricolage mb-8">Get in Touch</h2>
                        <p className="mb-12 text-white/90 text-lg leading-relaxed">
                            Have a question, feedback, or just want to say hello? We'd love to hear from you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 opacity-90">Whatsapp / Call</h4>
                                    <p className="text-white/90">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 opacity-90">Email</h4>
                                    <p className="text-white/90">hello@highlaban.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 opacity-90">Headquarters</h4>
                                    <p className="text-white/90">Mumbai, Maharashtra</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <h4 className="font-bold mb-4 opacity-90">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors transform hover:scale-110">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Background Decor */}
                    <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-[--color-secondary] opacity-20 rounded-full blur-3xl"></div>
                </div>

                {/* Form Side */}
                <div className="md:w-7/12 p-12 bg-gray-50 flex flex-col justify-center">
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
}

import { useState } from 'react';

function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                    <input name="name" required type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all font-medium shadow-sm" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input name="phone" required type="tel" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all font-medium shadow-sm" placeholder="+91..." />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select name="subject" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all font-medium shadow-sm text-gray-600">
                    <option>General Inquiry</option>
                    <option>Franchise Support</option>
                    <option>Feedback</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea name="message" required rows={5} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all font-medium shadow-sm resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-5 text-white font-bold rounded-xl shadow-xl transition-all text-lg tracking-wide uppercase
                    ${status === 'success' ? 'bg-green-500 hover:shadow-green-200' : 'bg-gradient-to-r from-[#0099ff] to-[#0044ff] shadow-blue-200 hover:shadow-2xl'}`}
            >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
            {status === 'error' && <p className="text-red-500 text-center font-bold">Something went wrong. Please try again.</p>}
        </form>
    );
}
