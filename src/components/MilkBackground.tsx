'use client';

import { useEffect, useState } from 'react';

export default function MilkBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    // Generate random positions only on client
    const splashes = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
            {/* Milk Splashes */}
            {splashes.map((splash) => (
                <div
                    key={splash.id}
                    className="absolute milk-splash"
                    style={{
                        left: `${splash.x}%`,
                        top: `${splash.y}%`,
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                        animationDelay: `${splash.delay}s`
                    }}
                />
            ))}

            {/* Milk Bubbles */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={`bubble-${i}`}
                    className="absolute milk-bubble"
                    style={{
                        left: `${(i * 8.33)}%`,
                        bottom: '-50px',
                        width: `${20 + Math.random() * 30}px`,
                        height: `${20 + Math.random() * 30}px`,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(8px)',
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: `${8 + Math.random() * 4}s`
                    }}
                />
            ))}

            {/* Milk Flow Streaks */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={`flow-${i}`}
                    className="absolute milk-flow"
                    style={{
                        left: `${i * 20}%`,
                        top: '-100px',
                        width: '2px',
                        height: '100px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                        filter: 'blur(2px)',
                        animationDelay: `${i * 3}s`
                    }}
                />
            ))}
        </div>
    );
}
