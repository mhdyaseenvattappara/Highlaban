'use client';

import Section from './Section';
import { motion } from 'framer-motion';

export default function FranchiseSection() {
    const benefits = [
        { title: "High ROI", desc: "Proven business model with excellent returns" },
        { title: "Full Support", desc: "Training, marketing, and operational guidance" },
        { title: "Unique Brand", desc: "First-mover advantage in the Egyptian dessert niche" },
        { title: "Low Investment", desc: "Competitive startup costs for premium setup" },
        { title: "Premium Menu", desc: "Access to our secret recipes and menu innovations" },
        { title: "Growing Market", desc: "Tap into the booming dessert industry in India" }
    ];

    return (
        <Section id="franchise" dark className="flex-col">
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl font-bold font-bricolage mb-4 text-[--color-primary]">Partner With Us</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Join the HighLaban family and bring the sweetest revolution to your city.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4 mb-20">
                {benefits.map((bg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white rounded-2xl shadow-lg border-b-4 border-[--color-primary] hover:shadow-xl transition-all hover:-translate-y-2 group"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{bg.title}</h3>
                        <p className="text-gray-600">{bg.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="bg-[--color-primary] p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Franchise Inquiry</h3>
                    <p className="opacity-90">Fill out the form below to get started.</p>
                </div>
                <div className="p-8 md:p-12">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all" placeholder="Enter your phone" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all" placeholder="Enter your email" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">City / Location</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all" placeholder="Preferred city" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                            <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all resize-none" placeholder="Tell us about your interest..."></textarea>
                        </div>
                        <div className="md:col-span-2 text-center mt-4">
                            <button className="px-10 py-4 bg-[--color-primary] text-white font-bold rounded-full shadow-lg hover:bg-[#0055aa] hover:shadow-xl transition-all w-full md:w-auto">
                                Submit Inquiry
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Section>
    );
}
