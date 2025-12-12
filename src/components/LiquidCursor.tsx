'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LiquidCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, select, .clickable');
        clickables.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[--color-primary] pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovered ? 2.5 : 1,
                }}
            />

            {/* Trailing Liquid Effect */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[--color-secondary] pointer-events-none z-[9998] opacity-50"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    transition: "transform 0.15s ease-out",
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                }}
            />
        </>
    );
}
