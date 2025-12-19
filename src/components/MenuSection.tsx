'use client';

import Section from './Section';
import ProductCard from './ProductCard';
import CurvedDivider from './CurvedDivider';
import { motion } from 'framer-motion';

import productsData from '@/data/products.json';

export default function MenuSection({ title = "Crush the craving.", subtitle = "17 Drops of Heaven. Authentic Egyptian recipes with a modern twist." }: { title?: string, subtitle?: string }) {
    const desserts = productsData.products;

    return (
        <section id="menu" className="relative bg-[#f0f9ff] py-8 md:py-12 z-10 selection:bg-blue-200">
            {/* Top Wave */}
            <div className="absolute top-0 left-0 w-full -translate-y-[99%]">
                <CurvedDivider position="top" fill="#f0f9ff" height="60px" />
            </div>

            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <div className="text-center mb-20">
                    <span className="inline-block px-6 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-bold tracking-widest uppercase text-sm mb-4 text-center">Our Menu</span>
                    <h2 className="text-5xl md:text-7xl font-black font-bricolage mb-6 text-blue-900">
                        {title}
                    </h2>
                    <p className="text-xl text-blue-800/60 max-w-2xl mx-auto font-medium">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {desserts.map((dessert: any, index: number) => (
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
            </div>

            {/* Bottom Wave - linking to next white section usually */}
            <div className="absolute bottom-0 left-0 w-full translate-y-[99%]">
                <CurvedDivider position="bottom" fill="#f0f9ff" height="60px" />
            </div>
        </section>
    );
}
