'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero({
    title1 = "GET HIGH",
    title2 = "ON BITE",
    subtitle = "Experience Egypt's Finest Creamy Desserts",
    videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
}: { title1?: string, title2?: string, subtitle?: string, videoUrl?: string }) {
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
        <section className="relative min-h-[85vh] bg-gradient-to-br from-[#e8f4f8] via-white to-[#f0f8ff] flex items-start justify-center overflow-hidden pt-24 md:pt-48 pb-12 md:pb-16">

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
                                src={`${videoUrl}?autoplay=1`}
                                title="HighLaban Story"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                    {/* Mobile: Product Images at Top */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:hidden relative h-[280px] sm:h-[350px] w-full flex items-center justify-center order-1"
                    >
                        {/* Subtle background glow */}
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>

                        {['img1.webp', 'img2.webp', 'img3.webp'].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 100, rotate: 0 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -15, 0],
                                    rotate: i === 0 ? -12 : i === 1 ? 5 : 15,
                                    x: i === 1 ? [0, 10, 0] : [0, -5, 0]
                                }}
                                transition={{
                                    opacity: { delay: 0.2 + (i * 0.2), duration: 0.8 },
                                    y: {
                                        delay: 1,
                                        duration: 3 + (i * 0.5),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    x: {
                                        delay: 1.5,
                                        duration: 4 + (i * 0.3),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    rotate: { delay: 0.2 + (i * 0.2), duration: 0.8, type: "spring", bounce: 0.4 }
                                }}
                                className={`absolute w-28 sm:w-36 drop-shadow-2xl hover:z-50 hover:scale-105 transition-all duration-300
                                    ${i === 0 ? 'left-2 sm:left-4 top-8 sm:top-10 z-10' : i === 1 ? 'left-auto z-20' : 'right-2 sm:right-4 top-16 sm:top-20 z-10'}
                                `}
                            >
                                <img
                                    src={`/${img}`}
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-left z-20 order-2 lg:order-1"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-bricolage leading-[0.9] mb-4 tracking-tight">
                            <span className="text-black block">{title1}</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099ff] to-[#0055ff] block">{title2}</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-6 sm:mb-8 max-w-md leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <Link
                                href="#menu"
                                className="px-5 py-2.5 sm:px-7 sm:py-3 bg-black text-white rounded-full font-bold uppercase text-xs sm:text-sm tracking-wide hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Our Flavors
                            </Link>
                            <Link
                                href="#about"
                                className="px-5 py-2.5 sm:px-7 sm:py-3 bg-white text-black border-2 border-black rounded-full font-bold uppercase text-xs sm:text-sm tracking-wide hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Our Story
                            </Link>

                            {/* Circular Play Video Button */}
                            <motion.button
                                onClick={() => setIsVideoOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center group overflow-hidden cursor-pointer"
                            >
                                <motion.svg
                                    className="absolute w-full h-full"
                                    viewBox="0 0 100 100"
                                    initial={{ rotate: 0 }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                    <defs>
                                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="10" fontWeight="bold" letterSpacing="3">
                                        <textPath xlinkHref="#circle" className="uppercase fill-black">
                                            • PLAY VIDEO • PLAY VIDEO
                                        </textPath>
                                    </text>
                                </motion.svg>
                                <Play fill="black" className="w-3 h-3 sm:w-5 sm:h-5 text-black relative z-10" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Desktop: Product Images on Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hidden lg:flex lg:w-1/2 relative h-[500px] xl:h-[600px] w-full items-center justify-center order-3 lg:order-2"
                    >
                        {/* Subtle background glow */}
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>

                        {['img1.webp', 'img2.webp', 'img3.webp'].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 100, rotate: 0 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -20, 0],
                                    rotate: i === 0 ? -12 : i === 1 ? 5 : 15,
                                    x: i === 1 ? [0, 15, 0] : [0, -8, 0]
                                }}
                                transition={{
                                    opacity: { delay: 0.2 + (i * 0.2), duration: 0.8 },
                                    y: {
                                        delay: 1,
                                        duration: 3.5 + (i * 0.5),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    x: {
                                        delay: 1.5,
                                        duration: 4.5 + (i * 0.3),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    rotate: { delay: 0.2 + (i * 0.2), duration: 0.8, type: "spring", bounce: 0.4 }
                                }}
                                className={`absolute w-44 xl:w-52 drop-shadow-2xl hover:z-50 hover:scale-105 transition-all duration-300
                                    ${i === 0 ? 'left-0 top-10 z-10' : i === 1 ? 'left-auto z-20' : 'right-0 top-20 z-10'}
                                `}
                            >
                                <img
                                    src={`/${img}`}
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>

            {/* Decorative circle element */}
            <div className="absolute top-20 right-10 w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
        </section>
    );
}
