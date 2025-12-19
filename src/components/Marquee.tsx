'use client';

import { motion } from 'framer-motion';

const marqueeItems = [
    'A Touch of Egyptian Tradition',
    'Silky Smooth',
    'Luxuriously Creamy',
    'Bursting with Authentic Flavour',
    'Made with the Finest Ingredients',
];

export default function Marquee({ text = 'A Touch of Egyptian Tradition • Silky Smooth • Luxuriously Creamy • Bursting with Authentic Flavour • Made with the Finest Ingredients' }: { text?: string }) {
    const marqueeItems = text.split(' • ');
    // Duplicate the items multiple times for seamless loop
    const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

    return (
        <div className="relative w-full overflow-hidden bg-white py-4 border-y border-blue-100">
            <motion.div
                className="flex gap-4 whitespace-nowrap"
                animate={{
                    x: [0, -50 + '%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
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
