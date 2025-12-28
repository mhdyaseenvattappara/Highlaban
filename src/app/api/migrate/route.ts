import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Ensure this path is correct
import { collection, addDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import productsData from '@/data/products.json';
import locationsData from '@/data/locations.json';
import messagesData from '@/data/messages.json';
import pageConfigData from '@/data/page-config.json';
import usersData from '@/data/users.json';

export async function GET() {
    try {
        const batch = writeBatch(db);


        // Migrate Products
        const productsCollection = collection(db, 'products');
        // Basic check to see if we should migrate (simple way to avoid duplicates for this run)
        // In a real scenario, we'd check for existence.
        // productsData is { products: [] }
        for (const product of productsData.products) {
            const newDocRef = doc(productsCollection);
            batch.set(newDocRef, product);
        }

        // Migrate Locations
        // locationsData is [...] (array)
        const locationsCollection = collection(db, 'locations');
        if (Array.isArray(locationsData)) {
            for (const locItem of locationsData) {
                const locRef = doc(locationsCollection);
                batch.set(locRef, locItem);
            }
        }

        // Migrate Page Config
        // pageConfigData is object
        const configRef = doc(db, 'settings', 'pageConfig');
        batch.set(configRef, pageConfigData);

        // Migrate Messages
        // messagesData is array
        if (Array.isArray(messagesData) && messagesData.length > 0) {
            const messagesCollection = collection(db, 'messages');
            for (const msg of messagesData) {
                const msgRef = doc(messagesCollection);
                batch.set(msgRef, msg);
            }
        }

        await batch.commit();

        return NextResponse.json({ success: true, message: "Migration started/completed" });
    } catch (error) {
        console.error("Migration error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
