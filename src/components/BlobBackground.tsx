'use client';

import { motion } from 'framer-motion';

export default function BlobBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[--color-primary] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[--color-secondary] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
        </div>
    );
}
