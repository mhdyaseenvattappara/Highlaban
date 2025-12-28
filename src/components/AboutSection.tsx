
'use client';

import Section from './Section';
import { motion, useMotionValue, useTransform, animate, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
    targetValue: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatCard({ targetValue, suffix, label, delay }: StatCardProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, targetValue, {
                duration: 2,
                delay: delay,
                ease: "easeOut"
            });
            return controls.stop;
        }
    }, [isInView, count, targetValue, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.6 }}
            className="text-center md:text-left space-y-1"
        >
            <h3 className="text-4xl lg:text-5xl font-black font-bricolage text-slate-900">
                <motion.span>{rounded}</motion.span>{suffix}
            </h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {label}
            </p>
        </motion.div>
    );
}

interface AboutSectionProps {
    title?: string;
    subtitle?: string;
    description1?: string;
    description2?: string;
    subdescription?: string;
    features?: string[];
    image?: string;
}

export default function AboutSection({
    title = "Our Story",
    subtitle = "Where Tradition Meets Innovation",
    description1,
    description2,
    subdescription,
    features = [],
    image
}: AboutSectionProps) {
    const stats = [
        { targetValue: 20.5, suffix: 'k', label: 'Successfully Trained' }, // Placeholder values from reference
        { targetValue: 450, suffix: '+', label: 'Students Community' },
        { targetValue: 20.5, suffix: 'k', label: 'Successfully Trained' },
    ];

    // Real stats for HighLaban context
    const realStats = [
        { targetValue: 1, suffix: '+', label: 'Locations' },
        { targetValue: 100, suffix: 'K+', label: 'Happy Customers' },
        { targetValue: 25, suffix: '+', label: 'Varieties' },
    ];

    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Lock body scroll when video is open (Optional but good UX)
    useEffect(() => {
        if (isVideoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isVideoOpen]);

    return (
        <Section id="about" className="min-h-screen flex items-center justify-center bg-white py-20 px-4 md:px-8 overflow-hidden">
            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-xl"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="HighLaban Story"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Column - Stats */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center items-center lg:items-start gap-8 lg:gap-16 order-2 lg:order-1">
                    {realStats.map((stat, idx) => (
                        <div key={idx} className="relative group w-full flex flex-col items-center lg:items-start">
                            <StatCard
                                targetValue={stat.targetValue}
                                suffix={stat.suffix}
                                label={stat.label}
                                delay={idx * 0.2}
                            />
                            {idx !== realStats.length - 1 && (
                                <div className="hidden lg:block w-12 h-[1px] bg-slate-200 mt-8" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Center Column - Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 relative order-1 lg:order-2"
                >
                    <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
                        <img
                            src={image || "/uploads/1766938844054-uploaded_image_2.png"}
                            alt="Our Story"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop'; // Fallback
                            }}
                        />

                        {/* Circular Text Badge */}
                        <div className="absolute top-4 left-4 w-28 h-28 flex items-center justify-center z-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                            {/* Rotating Text & Background */}
                            <div className="absolute inset-0 animate-spin-slow flex items-center justify-center">
                                <svg viewBox="0 0 100 100" width="100" height="100" className="opacity-90">
                                    <defs>
                                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="11" fontWeight="bold" letterSpacing="1.2">
                                        <textPath xlinkHref="#circle" className="uppercase fill-slate-900">
                                            • Our Story • Our Story •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            {/* Static Center Logo */}
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <img
                                    src="/about-badge-logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-4 space-y-8 order-3"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-blue-600 rotate-90" />
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">About Company</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black font-bricolage text-slate-900 leading-[1.1]">
                            {title}<br />
                            <span className="font-medium text-slate-400 text-3xl block mt-2">{subtitle}</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                        <p>{description1 || "Rooted in time-honored Egyptian recipes and crafted with only the finest ingredients, our signature desserts are rich, creamy and irresistibly delicious."}</p>
                        <p className="hidden md:block">{description2 || "HIGHLABAN brings you authentic Egyptian desserts that celebrate tradition while creating unforgettable flavor experiences."}</p>
                    </div>

                    <Link href="/story" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-blue-700 transition-all flex items-center gap-2 group shadow-lg shadow-blue-600/20 w-fit">
                        Read More
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>
        </Section>
    );
}
