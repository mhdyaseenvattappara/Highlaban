'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface DessertCardProps {
    name: string;
    price: number;
    tag?: string;
    tagline?: string;
    isNew?: boolean;
    description?: string;
}

export default function DessertCard({ name, price, tag, tagline, isNew, description = "Delicious Egyptian delicacy" }: DessertCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-64 h-64 m-8 group perspective-1000 clickable"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 shadow-2xl droplet-shape transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,102,204,0.3)] border border-blue-100 overflow-hidden">

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 droplet-content z-20">

                    {/* Tag / Badge */}
                    {(tag || isNew) && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider mb-2 ${isNew ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-100 text-blue-600'
                            }`}>
                            {isNew ? 'NEW' : tag}
                        </span>
                    )}

                    <h3 className="text-xl font-black text-blue-900 mb-1 font-bricolage">{name}</h3>
                    {tagline && <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{tagline}</p>}
                    <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{description}</p>

                    <div className="text-xl font-black text-blue-600">
                        ₹{price}
                    </div>

                    <motion.a
                        href={`https://wa.me/919745823864?text=I would like to order ${encodeURIComponent(name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-black shadow-lg shadow-blue-200 uppercase tracking-widest transition-all inline-block w-fit mx-auto"
                    >
                        Order
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
