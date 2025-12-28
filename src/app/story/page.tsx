'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StoryData {
    hero: {
        title: string;
        subtitle: string;
    };
    beginning: {
        title: string;
        paragraphs: string[];
    };
    mission: {
        title: string;
        content: string;
    };
    promise: {
        title: string;
        content: string;
    };
    image: string;
    imageCaption: string;
    gallery: Array<{
        url: string;
        caption: string;
    }>;
}

export default function StoryPage() {
    const [story, setStory] = useState<StoryData | null>(null);

    useEffect(() => {
        fetch('/api/admin/story')
            .then(res => res.json())
            .then(data => setStory(data))
            .catch(err => console.error('Failed to load story:', err));
    }, []);

    if (!story) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-400">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black font-bricolage text-slate-900 mb-6">
                            {story.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
                            {story.hero.subtitle}
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg md:prose-xl mx-auto text-slate-700 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl"
                        >
                            <h2 className="font-bricolage font-bold text-3xl mb-6 text-blue-600">{story.beginning.title}</h2>
                            {story.beginning.paragraphs.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid md:grid-cols-2 gap-8"
                        >
                            <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] shadow-xl">
                                <h3 className="font-bricolage font-bold text-2xl mb-4">{story.mission.title}</h3>
                                <p className="font-medium opacity-90 leading-relaxed">
                                    {story.mission.content}
                                </p>
                            </div>
                            <div className="bg-white text-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                                <h3 className="font-bricolage font-bold text-2xl mb-4 text-blue-600">{story.promise.title}</h3>
                                <p className="font-medium text-slate-600 leading-relaxed">
                                    {story.promise.content}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={story.image}
                                alt="HighLaban Kitchen"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                                <p className="text-white text-lg font-bold tracking-wide uppercase">{story.imageCaption}</p>
                            </div>
                        </motion.div>

                        {/* Photo Gallery */}
                        {story.gallery && story.gallery.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2 className="text-4xl md:text-5xl font-black font-bricolage text-slate-900 mb-4">
                                        Our Journey in Pictures
                                    </h2>
                                    <p className="text-lg text-slate-600 font-medium">
                                        A glimpse into our world
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...story.gallery].reverse().map((photo, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                                        >
                                            <img
                                                src={photo.url}
                                                alt={photo.caption}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                <p className="text-white font-bold text-lg">{photo.caption}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
