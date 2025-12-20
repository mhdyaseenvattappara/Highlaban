'use client';

import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CurvedDivider from './CurvedDivider';

export default function Footer() {
    return (
        <footer className="bg-[#0066cc] text-white pt-16 pb-8 overflow-hidden relative border-t border-white/10">
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
