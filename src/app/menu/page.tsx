
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiquidCursor from '@/components/LiquidCursor';
import { storageService } from '@/lib/storage-service';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
    const data = await storageService.getData<any>('products') || {};
    const products = data.products || [];

    return (
        <main className="min-h-screen bg-[#f0f9ff] relative selection:bg-blue-200 selection:text-blue-900">
            <LiquidCursor />
            <Navbar />

            <div className="container mx-auto px-8 md:px-12 lg:px-16 py-32">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black font-bricolage mb-6 text-blue-900">
                        Our Menu
                    </h1>
                    <p className="text-xl text-blue-800/60 max-w-2xl mx-auto font-medium">
                        Explore our complete collection of 17 Drops of Heaven.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((dessert: any, index: number) => (
                        <div key={index}>
                            <ProductCard
                                name={dessert.name}
                                price={dessert.price}
                                tag={dessert.tag}
                                tagline={dessert.tagline}
                                isNew={dessert.isNew}
                                description={dessert.description}
                                image={dessert.image || `https://picsum.photos/seed/${dessert.name}/400/300`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
