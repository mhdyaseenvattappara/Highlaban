'use client';

import Section from './Section';
import ProductCard from './ProductCard';
import CurvedDivider from './CurvedDivider';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import Link from 'next/link';

export default function MenuSection({
    title = "Crush the craving.",
    subtitle = "17 Drops of Heaven. Authentic Egyptian recipes with a modern twist.",
    products = []
}: {
    title?: string,
    subtitle?: string,
    products?: any[]
}) {
    const desserts = products.length > 0 ? products : [];
    const [visibleCount, setVisibleCount] = useState(9);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            // Set initial visible count based on screen size
            setVisibleCount(window.innerWidth < 768 ? 3 : 9);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleViewMore = () => {
        if (isMobile) {
            setVisibleCount(prev => Math.min(prev + 3, desserts.length));
        } else {
            setVisibleCount(desserts.length);
        }
    };

    return (
        <section id="menu" className="relative bg-[#f0f9ff] py-8 md:py-12 z-10 selection:bg-blue-200">
            {/* Top Wave */}
            <div className="absolute top-0 left-0 w-full -translate-y-[99%]">
                <CurvedDivider position="top" fill="#f0f9ff" height="60px" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
                <div className="text-center mb-12 md:mb-20">
                    <span className="inline-block px-4 sm:px-6 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 text-center">Our Menu</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-bricolage mb-4 md:mb-6 text-blue-900 px-4">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-blue-800/60 max-w-2xl mx-auto font-medium px-4">
                        {subtitle}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {desserts.slice(0, visibleCount).map((dessert: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                            }}
                        >
                            <ProductCard
                                name={dessert.name}
                                price={dessert.price}
                                tag={dessert.tag}
                                tagline={dessert.tagline}
                                isNew={dessert.isNew}
                                description={dessert.description}
                                image={dessert.image || `https://picsum.photos/seed/${dessert.name}/400/300`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {visibleCount < desserts.length && (
                    <div className="mt-12 md:mt-16 text-center">
                        <Link
                            href="/menu"
                            className="px-6 sm:px-8 py-3 bg-white border-2 border-blue-100 text-blue-600 rounded-full font-bold hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm hover:shadow-md inline-block uppercase tracking-widest text-xs sm:text-sm"
                        >
                            View More ({desserts.length - visibleCount} more)
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
