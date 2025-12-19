'use client';

import Section from './Section';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCardProps {
    targetValue: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatCard({ targetValue, suffix, label, delay }: StatCardProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, targetValue, {
                duration: 2,
                delay: delay,
                ease: "easeOut"
            });
            return controls.stop;
        }
    }, [isInView, count, targetValue, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.6 }}
            className="bg-blue-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow border border-blue-200/50"
        >
            <h3 className="text-6xl md:text-7xl font-black font-[family-name:var(--font-primary)] text-[#0066cc] mb-4">
                <motion.span>{rounded}</motion.span>{suffix}
            </h3>
            <p className="text-xl text-blue-800 font-medium tracking-wide">
                {label}
            </p>
        </motion.div>
    );
}

interface StatItem {
    targetValue: number;
    suffix: string;
    label: string;
}

interface StatsSectionProps {
    stats?: StatItem[];
}

export default function StatsSection({ stats: propStats }: StatsSectionProps) {
    const stats = propStats || [
        { targetValue: 50, suffix: '+', label: 'Locations' },
        { targetValue: 100, suffix: 'K+', label: 'Happy Customers' },
        { targetValue: 25, suffix: '+', label: 'Dessert Varieties' },
    ];

    return (
        <Section id="stats" className="py-8 md:py-12 bg-[#0066cc]/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            targetValue={stat.targetValue}
                            suffix={stat.suffix}
                            label={stat.label}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
