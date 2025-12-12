'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
    background?: 'white' | 'champagne' | 'orange' | 'pink' | 'umber';
    dark?: boolean;
}

export default function Section({ id, className = "", children, background = 'white', dark = false }: SectionProps) {
    const bgColors = {
        white: 'bg-white',
        champagne: 'bg-[--color-background]',
        orange: 'bg-[--color-primary]',
        pink: 'bg-[--color-secondary]',
        umber: 'bg-[--color-tertiary]',
    };

    // If dark prop is true, override background to umber (tertiary/dark blue) unless specific background is set
    const finalBackground = dark ? 'umber' : background;

    return (
        <section
            id={id}
            className={`relative py-12 overflow-hidden ${bgColors[finalBackground]} ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className="container mx-auto px-6 z-10 w-full"
            >
                {children}
            </motion.div>
        </section>
    );
}
