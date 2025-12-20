
'use client';

import Section from './Section';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
    title?: string;
    subtitle?: string;
    description1?: string;
    description2?: string;
    subdescription?: string;
    features?: string[];
}

export default function AboutSection({
    title = "Our Story",
    subtitle = "Where Tradition Meets Innovation",
    description1,
    description2,
    subdescription,
    features = []
}: AboutSectionProps) {
    return (
        <Section id="about" className="min-h-screen flex items-center justify-center bg-white py-20 px-4 md:px-8 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">

                {/* Left Side - Our Story Content (Blob/Shape Background) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-5/12 relative z-10"
                >
                    {/* Abstract Blue Blob Shape Background */}
                    <div className="absolute inset-0 bg-blue-50 rounded-[4rem] -rotate-3 scale-110 -z-10 shadow-inner translate-y-4 translate-x-4" />
                    <div className="bg-white/80 backdrop-blur-sm border border-blue-100 p-8 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden">

                        {/* Circle Element (Logo placeholder from reference) */}
                        <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center p-3 animate-spin-slow">
                            <img src="/uploads/logo.png" alt="HighLaban Logo" className="w-full h-full object-contain" />
                        </div>

                        <h2 className="text-4xl font-black font-bricolage text-slate-900 mb-8">{title}</h2>

                        <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                            <p>{description1}</p>
                            <p>{description2}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Innovation & Features */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-6/12 space-y-8"
                >
                    <div className="space-y-4">
                        <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm">About Us</h3>
                        <h2 className="text-4xl md:text-5xl font-black font-bricolage text-slate-900 leading-tight">
                            {subtitle}
                        </h2>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {subdescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={16} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 text-sm md:text-base">{feature}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-8 flex justify-end">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all hover:-translate-y-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                        </div>
                    </div>

                </motion.div>
            </div>
        </Section>
    );
}
