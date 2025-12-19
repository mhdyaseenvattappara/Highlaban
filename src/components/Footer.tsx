'use client';

import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CurvedDivider from './CurvedDivider';

export default function Footer() {
    return (
        <footer className="bg-[#0066cc] text-white pt-6 pb-4 overflow-hidden relative">
            {/* Animated Wave Background */}
            <div className="absolute inset-0 opacity-20">
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <motion.path
                        fill="#ffffff"
                        fillOpacity="0.3"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={{
                            d: [
                                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>

            {/* Animated Wave Top Border */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 bg-transparent -mt-1">
                <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#FFFFFF"></path>
                    <path d="M0,0V15.81C13,36.92,47.64,50.79,90.5,57.32c75.24,11.45,148.91-10.82,216.51-24.93,52.55-10.95,103.51-23.3,161.43-22.18,48.09.93,92.56,8.71,135,16.29,62.83,11.23,124.64,22.56,189.92,9.62,49.5-9.82,90.35-31.54,127.32-48.4C982.51,28.47,1053.3,4.06,1140,22.68,1166,28.26,1187.69,35.41,1199,40.48V0Z" opacity=".5" fill="#FFFFFF"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-10">

                    {/* Brand */}
                    <div className="text-center md:text-left md:w-1/3">
                        <div className="mb-6">
                            <Image
                                src="/High Laban logo 0.png"
                                alt="HighLaban Logo"
                                width={180}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-white/80 text-base leading-relaxed max-w-sm">
                            Crafting authentic Egyptian happiness, one droplet at a time. Experience the sweet revolution.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-12 md:gap-24">
                        <div>
                            <h4 className="font-bold text-lg mb-6 tracking-widest uppercase text-white">Explore</h4>
                            <ul className="space-y-4 text-white/70">
                                <li><Link href="#about" className="hover:text-white transition-colors">Our Story</Link></li>
                                <li><Link href="#menu" className="hover:text-white transition-colors">Menu</Link></li>
                                <li><Link href="#franchise" className="hover:text-white transition-colors">Franchise</Link></li>
                                <li><Link href="#locations" className="hover:text-white transition-colors">Locations</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 tracking-widest uppercase text-white">Connect</h4>
                            <div className="flex gap-4">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="md:w-1/3">
                        <h4 className="font-bold text-lg mb-4 tracking-widest uppercase text-white">Stay Sweet</h4>
                        <p className="text-white/70 mb-4 text-sm">Subscribe to get the latest drops and secret menu alerts.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-white placeholder-white/50 transition-all font-light"
                            />
                            <button className="px-5 py-3 bg-white text-[#0066cc] rounded-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-6 text-center text-white/60 text-sm">
                    <p>© 2024 HighLaban. All Rights Reserved. Made with ❤️ in Egypt</p>
                </div>
            </div>
        </footer>
    );
}
