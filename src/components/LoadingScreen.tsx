'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple timeout to hide loading screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-4">
                        {/* Animated Logo: Blur to Clear */}
                        <motion.div
                            initial={{
                                scale: 1.2,
                                opacity: 0,
                                filter: 'blur(20px)'
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                filter: 'blur(0px)'
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut"
                            }}
                        >
                            <img
                                src="/uploads/logo.png"
                                alt="HighLaban Logo"
                                className="h-24 w-auto"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
