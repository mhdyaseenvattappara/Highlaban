'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    tag?: string;
    isNew?: boolean;
    image?: string;
}

export default function ProductCard({ name, description, price, tag, isNew, image }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,102,204,0.15)" }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
        >
            {/* Image */}
            <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                            <span className="text-6xl">🍰</span>
                        </div>
                    </div>
                )}
                {(tag || isNew) && (
                    <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase ${isNew ? 'bg-gradient-to-r from-[#0099ff] to-[#0044ff] text-white animate-pulse' : 'bg-white/90 text-[--color-primary] backdrop-blur-sm'
                        }`}>
                        {isNew ? 'New' : tag}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-black font-[family-name:var(--font-primary)] text-[--color-primary] mb-2 group-hover:text-[#0099ff] transition-colors">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-[family-name:var(--font-primary)] text-[--color-primary]">
                        ₹{price}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-[--color-primary] text-white rounded-full font-bold text-sm hover:bg-[#0099ff] transition-colors shadow-lg"
                    >
                        Order
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
