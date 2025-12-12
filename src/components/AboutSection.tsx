'use client';

import Section from './Section';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <Section id="about" background="champagne">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="md:w-1/2 relative"
                >
                    <div className="bg-white/80 backdrop-blur-sm p-10 md:p-14 blob-shape shadow-[0_20px_60px_rgba(0,102,204,0.15)] relative z-10 border border-white/40">
                        <h2 className="text-4xl font-[family-name:var(--font-primary)] font-bold text-[--color-primary] mb-6">Our Story</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4 font-[family-name:var(--font-secondary)]">
                            Rooted in time-honored Egyptian recipes and crafted with only the finest ingredients, our signature desserts are rich, creamy and irresistibly delicious. HIGHLABAN brings you authentic Egyptian desserts that celebrate tradition while creating unforgettable flavor experiences.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-secondary)]">
                            Every bite is a journey through tradition and indulgence, made with love by our passionate, expertly trained team.
                        </p>
                    </div>
                    {/* Animated Blob Behind */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00ccff] to-[#0066cc] opacity-10 blob-shape -z-0 transform scale-110 rotate-6 animate-morph"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="md:w-1/2"
                >
                    <h3 className="text-4xl font-bold mb-6 text-gray-800 font-playfair">Where Tradition<br />Meets Innovation</h3>
                    <p className="text-gray-600 mb-8 text-xl">
                        We are proud to be India's first dedicated Egyptian dessert brand. From our signature Lou'a to the viral Pistachio Kunafa Bomb, we craft happiness in every droplet.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                        {[
                            "Authentic Recipes",
                            "Premium Ingredients",
                            "Freshly Made Daily",
                            "Zero Preservatives",
                            "Innovative Fusions",
                            "Pure Passion"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-bold p-3 bg-white rounded-xl shadow-sm border border-blue-50">
                                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[--color-primary] text-sm">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </Section>
    );
}
