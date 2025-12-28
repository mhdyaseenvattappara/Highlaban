'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, MessageCircle } from 'lucide-react';

export default function Navbar() {
    return (
        <>
            {/* Desktop/Tablet Top Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full z-50 px-6 py-4 hidden md:block"
            >
                <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-full px-8 py-3 border border-white/40 shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-md">

                    <div className="flex items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Link href="/" className="hover:scale-105 transition-transform">
                                <img src="/uploads/logo.png" alt="HighLaban Logo" className="h-12 w-auto" />
                            </Link>
                        </motion.div>
                        <div className="flex gap-8">
                            {[
                                { href: '/#about', label: 'Our Story' },
                                { href: '/#menu', label: 'Menu' },
                                { href: '/#locations', label: 'Franchise' }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                                >
                                    <Link href={item.href} className="text-sm font-bold font-[family-name:var(--font-primary)] uppercase tracking-widest hover:text-[--color-primary] transition-colors relative group">
                                        {item.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary] transition-all group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="/#contact" className="flex items-center gap-2 bg-[#0066cc] text-white px-6 py-3 rounded-full font-bold font-[family-name:var(--font-primary)] uppercase text-xs tracking-widest hover:bg-[#0052a3] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                            Enquire Now <MessageCircle size={14} />
                        </Link>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Bottom Navbar - Modern Dock */}
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-3 flex items-center gap-8 relative">


                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        <Link href="/" className="p-2.5 text-slate-700 hover:text-[--color-primary] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <Link href="/#menu" className="p-2.5 text-slate-700 hover:text-[--color-primary] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" x2="12" y1="8" y2="8" /><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line x1="10.88" x2="15.46" y1="21.94" y2="14" /></svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                    >
                        <Link href="/#contact" className="p-2.5 text-slate-700 hover:text-[--color-primary] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                    >
                        <Link href="/#about" className="p-2.5 text-slate-700 hover:text-[--color-primary] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                    >
                        <Link href="/#locations" className="p-2.5 text-slate-700 hover:text-[--color-primary] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.25M15.54 15.54l4.24 4.25M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" /></svg>
                        </Link>
                    </motion.div>

                    {/* Scroll to Top Button - In Dock */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm flex-shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                </div>
            </motion.nav>
        </>
    );
}
