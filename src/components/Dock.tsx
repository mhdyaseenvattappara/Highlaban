'use client';

import { motion } from 'framer-motion';
import { Home, Info, ShoppingBag, MapPin, Users, Phone, MessageCircle, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

const dockItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: Info, label: 'Story' },
    { id: 'products', icon: ShoppingBag, label: 'Menu' },
    { id: 'locations', icon: MapPin, label: 'Stores' },
    { id: 'franchise', icon: Users, label: 'Franchise' },
];

export default function Dock() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = dockItems.map(item => document.getElementById(item.id));
            const scrollY = window.scrollY;

            sections.forEach(section => {
                if (section) {
                    const top = section.offsetTop - 300;
                    const height = section.offsetHeight;
                    if (scrollY >= top && scrollY < top + height) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
            <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/10">
                {dockItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`relative p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white group ${activeSection === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
                    >
                        <item.icon size={24} strokeWidth={2} />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                            />
                        )}
                    </button>
                ))}

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    className="p-3 text-green-500 hover:scale-110 transition-transform hover:bg-green-50 rounded-xl"
                >
                    <MessageCircle size={24} />
                </a>
                <a
                    href="https://instagram.com/highlaban"
                    target="_blank"
                    className="p-3 text-pink-500 hover:scale-110 transition-transform hover:bg-pink-50 rounded-xl"
                >
                    <Instagram size={24} />
                </a>
            </div>
        </motion.div>
    );
}
