'use client';

import Section from './Section';
import { motion } from 'framer-motion';

const benefits = [
    {
        title: '100% Authentic',
        description: 'Traditional Egyptian recipes passed down through generations.',
    },
    {
        title: 'Fresh Ingredients',
        description: 'We use only the finest, freshest ingredients daily.',
    },
    {
        title: 'Made with Love',
        description: 'Every dessert is crafted with passion and care.',
    },
    {
        title: 'Sweet Joy',
        description: 'Guaranteed to bring a smile to your face.',
    },
];

export default function BenefitsSection() {
    return (
        <Section id="benefits" className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-blue-50 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow border border-blue-100"
                        >
                            <h3 className="text-xl font-bold font-[family-name:var(--font-primary)] text-[#0066cc] mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
