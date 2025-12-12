'use client';

import { motion } from 'framer-motion';

const marqueeItems = [
    'A Touch of Egyptian Tradition',
    'Silky Smooth',
    'Luxuriously Creamy',
    'Bursting with Authentic Flavour',
    'Made with the Finest Ingredients',
    'A Touch of Egyptian Tradition',
    'Silky Smooth',
    'Luxuriously Creamy',
];

export default function Marquee() {
    return (
        <div className="relative w-full overflow-hidden bg-white py-4 border-y border-blue-100">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{
                    x: [0, -1920],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    },
                }}
            >
                {marqueeItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="text-base md:text-lg font-semibold font-[family-name:var(--font-primary)] text-gray-300">
                            {item}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
