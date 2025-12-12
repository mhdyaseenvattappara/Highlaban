'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const { scrollY } = useScroll();
    const blur = useTransform(scrollY, [0, 100], [0, 10]);

    useEffect(() => {
        // Animate progress from 0 to 100
        const duration = 2000; // 2 seconds
        const steps = 100;
        const stepDuration = duration / steps;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                // Hide loading screen after reaching 100%
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ backdropFilter: `blur(${blur}px)` }}
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-[#e8f4f8] via-white to-[#f0f8ff] flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-4">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <motion.img
                                src="/High Laban logo 0.png"
                                alt="HighLaban Logo"
                                className="h-20 w-auto"
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Animated Percentage Counter */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold font-[family-name:var(--font-primary)] text-[#0066cc]"
                        >
                            {progress}%
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
