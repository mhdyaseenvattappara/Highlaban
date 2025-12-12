'use client';

import { motion } from 'framer-motion';
import { Twitter } from 'lucide-react';
import { useState } from 'react';

interface Review {
    name: string;
    username: string;
    avatar: string;
    content: string;
    verified?: boolean;
}

const reviews: Review[] = [
    {
        name: "Sarah Ahmed",
        username: "@sarahfoodie",
        avatar: "👩🏻",
        content: "Just tried HighLaban's Lou'a and I'm OBSESSED! 😍 The creamiest, most authentic Egyptian dessert I've had outside of Cairo. Already planning my next visit!",
        verified: true
    },
    {
        name: "Raj Malhotra",
        username: "@rajmalhotra",
        avatar: "👨🏽",
        content: "Finally found the perfect dessert spot! The Basbousa is incredible - not too sweet, perfectly moist. The whole family loved it. Highly recommend! 🍰✨",
        verified: true
    },
    {
        name: "Priya Sharma",
        username: "@priyaeats",
        avatar: "👩🏾",
        content: "HighLaban is a game changer! The Choco Crepe is divine and the staff is so friendly. This is my new go-to spot for desserts. 10/10 would recommend! 💙",
        verified: false
    },
    {
        name: "Mohammed Ali",
        username: "@mohammedali",
        avatar: "👨🏻",
        content: "As an Egyptian living in India, HighLaban brings back so many memories! The taste is authentic and the quality is top-notch. Thank you for bringing Egypt to us! 🇪🇬❤️",
        verified: true
    },
    {
        name: "Ananya Kapoor",
        username: "@ananyak",
        avatar: "👩🏽",
        content: "The Velour Mango Cream is AMAZING! Light, refreshing, and the perfect treat after a long day. HighLaban never disappoints! 🥭✨",
        verified: false
    }
];

export default function ReviewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-6 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-bold tracking-widest uppercase text-sm mb-4 text-center">
                        Reviews
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-primary)] text-[--color-primary] mb-4">
                        What People Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our happy customers!
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-2xl mx-auto">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                    >
                        {/* Tweet Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                                    {reviews[currentIndex].avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900">{reviews[currentIndex].name}</h3>
                                        {reviews[currentIndex].verified && (
                                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm">{reviews[currentIndex].username}</p>
                                </div>
                            </div>
                            <Twitter className="w-6 h-6 text-blue-400" />
                        </div>

                        {/* Tweet Content */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {reviews[currentIndex].content}
                        </p>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevReview}
                            className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-[--color-primary] hover:bg-[--color-primary] hover:text-white border-2 border-[--color-primary]"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextReview}
                            className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-[--color-primary] hover:bg-[--color-primary] hover:text-white border-2 border-[--color-primary]"
                        >
                            →
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[--color-primary] w-8' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
