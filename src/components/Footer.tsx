'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="mx-4 mb-4 mt-20">
            <div className="bg-[#0066cc] text-white pt-16 pb-10 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                <div className="container mx-auto px-10 md:px-32 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-12">

                        {/* Column 1: Brand & Social */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Image
                                    src="/High Laban logo 0.png"
                                    alt="HighLaban Logo"
                                    width={140}
                                    height={50}
                                    className="object-contain" // Removed brightness-0 invert
                                />
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed max-w-sm font-medium">
                                Crafting authentic Egyptian happiness, one droplet at a time. Experience the sweet revolution with our signature desserts and beverages.
                            </p>
                            <div className="flex gap-4 pt-2">
                                {[
                                    { icon: Facebook, href: "https://facebook.com" },
                                    { icon: Twitter, href: "https://twitter.com" },
                                    { icon: Instagram, href: "https://instagram.com" },
                                    { icon: ShoppingBag, href: "#menu" }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                    >
                                        <item.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Useful Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-8 tracking-wide text-white">Useful Links</h4>
                            <ul className="space-y-4 text-blue-100 text-sm font-medium">
                                <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#menu" className="hover:text-white transition-colors">Our Menu</Link></li>
                                <li><Link href="#franchise" className="hover:text-white transition-colors">Franchise Opportunities</Link></li>
                                <li><Link href="#locations" className="hover:text-white transition-colors">Find a Location</Link></li>
                                <li><Link href="#contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Contact Information */}
                        <div>
                            <h4 className="font-bold text-lg mb-8 tracking-wide text-white">Contact Information</h4>
                            <div className="space-y-6 text-blue-100 text-sm font-medium">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 text-white/80"><MapPin size={18} /></div>
                                    <p className="leading-relaxed">
                                        HighLaban HQ, Cairo, Egypt<br />
                                        Expanding to India & Beyond
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-white/80"><Mail size={18} /></div>
                                    <a href="mailto:hello@highlaban.com" className="hover:text-white transition-colors">hello@highlaban.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-white/80"><Phone size={18} /></div>
                                    <a href="tel:+919745823864" className="hover:text-white transition-colors">+91 97458 23864</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-xs text-blue-200 font-medium">
                        <p>© 2024 HighLaban. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
