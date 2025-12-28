'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    tag?: string;
    tagline?: string;
    isNew?: boolean;
    image?: string;
}

export default function ProductCard({ name, description, price, tag, tagline, isNew, image }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -12, scale: 1.02, rotateZ: 0.5 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-[0_30px_60px_rgba(0,102,204,0.15)] transition-all duration-500 group border border-blue-50/50"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden pt-8">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-6xl animate-bounce">🍰</span>
                        </div>
                    </div>
                )}

                {(tag || isNew) && (
                    <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-lg backdrop-blur-md ${isNew ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-pulse' : 'bg-white/90 text-blue-600'
                        }`}>
                        {isNew ? 'New Arrival' : tag}
                    </span>
                )}

                {tagline && (
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-blue-600 uppercase tracking-wider shadow-sm border border-blue-100">
                            {tagline}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-8">
                <div className="mb-4">
                    <h3 className="text-2xl font-black font-bricolage text-blue-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                        {tagline || "HighLaban Special"}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 line-through">₹{Math.round(price * 1.2)}</span>
                        <span className="text-3xl font-black font-bricolage text-blue-600">
                            ₹{price}
                        </span>
                    </div>
                    <motion.a
                        href={`https://wa.me/919745823864?text=I would like to order ${encodeURIComponent(name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,102,204,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-500 transition-all duration-300 shadow-blue-200 uppercase tracking-widest transform inline-block text-center"
                    >
                        Order
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
