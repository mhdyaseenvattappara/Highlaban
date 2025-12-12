'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[75vh] bg-[--color-background] flex items-center justify-center overflow-hidden pt-20 pb-4">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-center lg:text-left z-20"
                    >
                        <h1 className="text-6xl md:text-8xl font-black font-[family-name:var(--font-primary)] text-[--color-primary] leading-none mb-6">
                            GET HIGH <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099ff] to-[#0044ff]">ON BITE</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-[family-name:var(--font-secondary)] font-medium mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Experience Egypt's Finest Creamy Desserts
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <div className="flex gap-4">
                                <Link
                                    href="#menu"
                                    className="px-8 py-3 bg-white text-[--color-primary] border-2 border-[--color-primary] rounded-full font-bold font-[family-name:var(--font-primary)] uppercase tracking-wider hover:bg-[--color-primary] hover:text-white hover:border-transparent transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Our Flavors
                                </Link>
                                <Link
                                    href="#about"
                                    className="px-8 py-3 bg-white text-[--color-foreground] border-2 border-[--color-foreground] rounded-full font-bold font-[family-name:var(--font-primary)] uppercase tracking-wider hover:bg-[--color-foreground] hover:text-white hover:border-transparent transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Our Story
                                </Link>
                            </div>

                            {/* Circular Play Video Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                className="relative w-20 h-20 rounded-full border-2 border-[--color-foreground] flex items-center justify-center group"
                            >
                                <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <defs>
                                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="11" fontWeight="bold" letterSpacing="2">
                                        <textPath xlinkHref="#circle" className="uppercase fill-[--color-foreground]">
                                            • Play Video • Play Video •
                                        </textPath>
                                    </text>
                                </svg>
                                <Play fill="currentColor" className="w-6 h-6 text-[--color-foreground]" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right: Angled Images */}
                    <div className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-[#00ccff]/20 to-[#0066cc]/10 rounded-full blur-3xl animate-pulse"></div>

                        {['img1.png', 'img2.png', 'img3.png'].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 100, rotate: 0 }}
                                animate={{ opacity: 1, y: 0, rotate: i === 0 ? -12 : i === 1 ? 5 : 15 }}
                                transition={{
                                    delay: 0.2 + (i * 0.2),
                                    duration: 0.8,
                                    type: "spring",
                                    bounce: 0.4
                                }}
                                className={`absolute w-48 md:w-64 drop-shadow-2xl hover:z-50 hover:scale-105 transition-all duration-300
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
                    </div>

                </div>
            </div>

            {/* Background Marquee Text slightly visible */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] overflow-hidden">
                <div className="whitespace-nowrap text-[20vw] font-black font-[family-name:var(--font-primary)] animate-marquee">
                    HIGHLABAN HIGHLABAN HIGHLABAN
                </div>
            </div>
        </section>
    );
}
