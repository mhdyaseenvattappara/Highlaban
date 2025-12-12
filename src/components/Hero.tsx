'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] bg-gradient-to-br from-[#e8f4f8] via-white to-[#f0f8ff] flex items-center justify-center overflow-hidden pt-20 pb-8">
            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-left z-20"
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-primary)] leading-[0.85] mb-4">
                            <span className="text-black block">GET HIGH</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099ff] to-[#0055ff] block">ON BITE</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 font-[family-name:var(--font-secondary)] mb-8 max-w-md">
                            Experience Egypt&apos;s Finest Creamy Desserts
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="#menu"
                                className="px-7 py-3 bg-black text-white rounded-full font-bold font-[family-name:var(--font-primary)] uppercase text-sm tracking-wide hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Our Flavors
                            </Link>
                            <Link
                                href="#about"
                                className="px-7 py-3 bg-white text-black border-2 border-black rounded-full font-bold font-[family-name:var(--font-primary)] uppercase text-sm tracking-wide hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Our Story
                            </Link>

                            {/* Circular Play Video Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center group overflow-hidden"
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
                                <Play fill="black" className="w-5 h-5 text-black relative z-10" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right: Angled Images */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full flex items-center justify-center"
                    >
                        {/* Subtle background glow */}
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>

                        {['img1.webp', 'img2.webp', 'img3.webp'].map((img, i) => (
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
                                className={`absolute w-40 md:w-52 drop-shadow-2xl hover:z-50 hover:scale-105 transition-all duration-300
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
