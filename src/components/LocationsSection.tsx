'use client';

import Section from './Section';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Location {
    city: string;
    address: string;
    status: string;
    statusColor: string;
    isComingSoon?: boolean;
}

interface LocationsSectionProps {
    title?: string;
    subtitle?: string;
    locations?: Location[];
}

export default function LocationsSection({
    title = "Our Locations",
    subtitle = "Find your nearest HighLaban and experience the taste of Egypt.",
    locations: propLocations
}: LocationsSectionProps) {
    const locations = propLocations || [
        {
            city: "Mumbai - Bandra",
            address: "123 Hill Road, Bandra West, Mumbai, Maharashtra 400050",
            status: "Open Now",
            statusColor: "text-green-600"
        },
        {
            city: "Pune - Koregaon Park",
            address: "Lane 7, Koregaon Park, Pune, Maharashtra 411001",
            status: "Open Now",
            statusColor: "text-green-600"
        },
        {
            city: "Bangalore - Indiranagar",
            address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
            status: "Open Now",
            statusColor: "text-green-600"
        },
        {
            city: "Delhi - HKV",
            address: "Hauz Khas Village, New Delhi",
            "status": "Coming Soon",
            "statusColor": "text-orange-500",
            isComingSoon: true
        }
    ];

    return (
        <Section id="locations" dark>
            <div className="text-center mb-16">
                <span className="text-[--color-primary] font-bold tracking-widest uppercase text-sm mb-2 block">Find Us</span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bricolage font-bold text-[--color-primary] mb-6"
                >
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-7xl px-4 mx-auto">
                {locations.map((loc, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] ${loc.isComingSoon ? 'opacity-80' : ''}`}
                    >
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[--color-primary] mb-4">
                            <MapPin size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{loc.city}</h3>
                        <p className="text-gray-500 mb-6 text-sm min-h-[40px]">{loc.address}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className={`text-sm font-bold ${loc.statusColor}`}>{loc.status}</span>
                            {!loc.isComingSoon && (
                                <button className="text-[--color-primary] text-sm font-bold hover:underline">
                                    Directions
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
