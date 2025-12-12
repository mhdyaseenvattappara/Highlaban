'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <>
            {/* Desktop/Tablet Top Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 hidden md:block">
                <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-full px-8 py-3 border border-white/40 shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-md">

                    <div className="flex items-center gap-12">
                        <Link href="/" className="hover:scale-105 transition-transform">
                            <img src="/High Laban logo 0.png" alt="HighLaban Logo" className="h-12 w-auto" />
                        </Link>
                        <div className="flex gap-8">
                            <Link href="#about" className="text-sm font-bold font-[family-name:var(--font-primary)] uppercase tracking-widest hover:text-[--color-primary] transition-colors relative group">
                                Our Story
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary] transition-all group-hover:w-full"></span>
                            </Link>
                            <Link href="#menu" className="text-sm font-bold font-[family-name:var(--font-primary)] uppercase tracking-widest hover:text-[--color-primary] transition-colors relative group">
                                Menu
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary] transition-all group-hover:w-full"></span>
                            </Link>
                            <Link href="#franchise" className="text-sm font-bold font-[family-name:var(--font-primary)] uppercase tracking-widest hover:text-[--color-primary] transition-colors relative group">
                                Franchise
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary] transition-all group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-[#0066cc] text-white px-6 py-3 rounded-full font-bold font-[family-name:var(--font-primary)] uppercase text-xs tracking-widest hover:bg-[#0052a3] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                            Shop Now <ShoppingBag size={14} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navbar */}
            <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex justify-around items-center">
                    <Link href="/" className="p-3 text-[--color-primary] flex flex-col items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        <span className="text-[10px] font-bold font-[family-name:var(--font-primary)] uppercase">Home</span>
                    </Link>
                    <Link href="#menu" className="p-3 text-gray-500 hover:text-[--color-primary] transition-colors flex flex-col items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" x2="12" y1="8" y2="8" /><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line x1="10.88" x2="15.46" y1="21.94" y2="14" /></svg>
                        <span className="text-[10px] font-bold font-[family-name:var(--font-primary)] uppercase">Menu</span>
                    </Link>
                    {/* Center Shop Button */}
                    <button className="bg-[#0066cc] text-white p-4 rounded-full -mt-8 shadow-xl hover:scale-110 transition-transform">
                        <ShoppingBag size={24} />
                    </button>
                    <Link href="#about" className="p-3 text-gray-500 hover:text-[--color-primary] transition-colors flex flex-col items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                        <span className="text-[10px] font-bold font-[family-name:var(--font-primary)] uppercase">Story</span>
                    </Link>
                    <Link href="#contact" className="p-3 text-gray-500 hover:text-[--color-primary] transition-colors flex flex-col items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span className="text-[10px] font-bold font-[family-name:var(--font-primary)] uppercase">Contact</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
