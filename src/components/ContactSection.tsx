'use client';

import Section from './Section';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
    return (
        <Section id="contact" className="min-h-screen py-20 bg-slate-50 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        Contact Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-bricolage text-slate-900 mb-2">
                        Get in Touch
                    </h2>
                    <p className="text-slate-500 font-medium max-w-lg mx-auto">
                        Have a question or want to collaborate? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column - Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Email Card */}
                        <InfoCard
                            icon={<Mail size={24} />}
                            label="Email Us"
                            value="hello@highlaban.com"
                            subvalue="We reply within 24 hours"
                        />
                        {/* Call Card */}
                        <InfoCard
                            icon={<Phone size={24} />}
                            label="Call Us"
                            value="+91 97458 23864"
                            subvalue="Mon-Sun, 9am - 10pm"
                        />
                        {/* Hours Card */}
                        <InfoCard
                            icon={<Clock size={24} />}
                            label="Working Hours"
                            value="11:00 AM - 11:00 PM"
                            subvalue="Open 7 Days a Week"
                        />

                        {/* Social Icons */}
                        <div className="pt-8 flex gap-4 justify-center md:justify-start">
                            <SocialIcon icon={<Instagram size={20} />} />
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </Section>
    );
}

function InfoCard({ icon, label, value, subvalue }: { icon: React.ReactNode, label: string, value: string, subvalue: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 transition-all hover:shadow-lg hover:border-blue-100 group"
        >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-lg mb-1">{label}</h4>
                <p className="font-semibold text-blue-600 mb-1">{value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subvalue}</p>
            </div>
        </motion.div>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all transform hover:-translate-y-2 shadow-sm hover:shadow-blue-200">
            {icon}
        </a>
    );
}

function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
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
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Name</label>
                    <input name="name" required type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-300" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input name="email" required type="email" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-300" placeholder="john@example.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <input
                        name="phone"
                        required
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        }}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-300"
                        placeholder="1234567890"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                    <select name="subject" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800">
                        <option>General Inquiry</option>
                        <option>Order Support</option>
                        <option>Franchise Opportunity</option>
                        <option>Feedback</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea name="message" required rows={5} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-300 resize-none leading-relaxed" placeholder="How can we help you today?"></textarea>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-5 text-white font-black rounded-2xl shadow-xl transition-all text-sm tracking-[0.2em] uppercase
                    ${status === 'success' ? 'bg-green-500 shadow-green-200' : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-200 hover:shadow-2xl'}`}
            >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent Successfully!' : 'Send Message'}
            </motion.button>
            {status === 'error' && <p className="text-red-500 text-center font-bold text-sm">Something went wrong. Please try again.</p>}
        </form>
    );
}
