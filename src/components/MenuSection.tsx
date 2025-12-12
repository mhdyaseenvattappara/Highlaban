'use client';

import Section from './Section';
import ProductCard from './ProductCard';
import CurvedDivider from './CurvedDivider';
import { motion } from 'framer-motion';

const desserts = [
    { name: "Lou'a", price: 350, tag: "Bestseller", description: "Our signature masterpiece." },
    { name: "Basbousa", price: 220, tag: "Popular", description: "Traditional sweet semolina cake." },
    { name: "Kabsa", price: 360, tag: "Premium", description: "A royal treat for the senses." },
    { name: "Habba Cake", price: 320, tag: "Trending", description: "Fluffy, rich, and irresistible." },
    { name: "Ambalyh", price: 260, isNew: true, description: "New sensation in town." },
    { name: "Qashtuta", price: 260, tag: "Bestseller", description: "Creamy delight with a twist." },
    { name: "Choco Crepe", price: 290, tag: "Popular", description: "Decadent chocolate folded to perfection." },
    { name: "Velour Mango Cream", price: 190, isNew: true, description: "Smooth mango perfection." },
    { name: "Salankatia", price: 350, tag: "Premium", description: "Exotic and rich flavors." },
    { name: "Koushri", price: 350, tag: "Bestseller", description: "Sweet twist on a classic." },
    { name: "Crispy Ummali", price: 320, tag: "Popular", description: "Crunchy puff pastry pudding." },
    { name: "Laban Delight", price: 260, tag: "Bestseller", description: "The classic taste of Laban." },
    { name: "Lotus Delight", price: 260, tag: "Trending", description: "Infused with Lotus Biscoff goodness." },
    { name: "Pistachio Kunafa Bomb", price: 280, tag: "Viral Hit", description: "Exploding with pistachio cream." },
    { name: "Fatak Bomb", price: 220, isNew: true, description: "A flavor explosion." },
    { name: "Layali Nafkha", price: 260, tag: "Popular", description: "Nights of puffed pastry joy." },
    { name: "Cream Cheese Kunafa", price: 280, tag: "Premium", description: "Rich cream cheese filling." },
];

export default function MenuSection() {
    return (
        <section id="menu" className="relative bg-[#f0f9ff] py-8 md:py-12 z-10 selection:bg-blue-200">
            {/* Top Wave */}
            <div className="absolute top-0 left-0 w-full -translate-y-[99%]">
                <CurvedDivider position="top" fill="#f0f9ff" height="60px" />
            </div>

            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <div className="text-center mb-20">
                    <span className="inline-block px-6 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-bold tracking-widest uppercase text-sm mb-4 text-center">Our Menu</span>
                    <h2 className="text-5xl md:text-7xl font-black font-playfair mb-6 text-blue-900">
                        Crush the craving.
                    </h2>
                    <p className="text-xl text-blue-800/60 max-w-2xl mx-auto font-medium">
                        17 Drops of Heaven. Authentic Egyptian recipes with a modern twist.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {desserts.map((dessert, index) => (
                        <ProductCard
                            key={index}
                            name={dessert.name}
                            price={dessert.price}
                            tag={dessert.tag}
                            isNew={dessert.isNew}
                            description={dessert.description}
                            image={`https://picsum.photos/seed/${dessert.name}/400/300`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Wave - linking to next white section usually */}
            <div className="absolute bottom-0 left-0 w-full translate-y-[99%]">
                <CurvedDivider position="bottom" fill="#f0f9ff" height="60px" />
            </div>
        </section>
    );
}
