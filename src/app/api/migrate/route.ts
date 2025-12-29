
import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';

// Load local data
// We use try/catch in case some files don't exist
const loadJSON = (filename: string) => {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', filename);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {
        console.error(`Error loading ${filename}:`, e);
    }
    return null;
};

// Helper to crawl object and collect/replace paths
function findImagePaths(obj: any, paths: Set<string>) {
    if (!obj) return;
    if (typeof obj === 'string') {
        if (obj.startsWith('/uploads/')) {
            paths.add(obj);
        }
        return;
    }
    if (Array.isArray(obj)) {
        obj.forEach(item => findImagePaths(item, paths));
        return;
    }
    if (typeof obj === 'object') {
        Object.values(obj).forEach(val => findImagePaths(val, paths));
    }
}

function replaceImagePaths(obj: any, map: Map<string, string>): any {
    if (!obj) return obj;
    if (typeof obj === 'string') {
        if (map.has(obj)) {
            return map.get(obj);
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => replaceImagePaths(item, map));
    }
    if (typeof obj === 'object') {
        const newObj: any = {};
        for (const [key, val] of Object.entries(obj)) {
            newObj[key] = replaceImagePaths(val, map);
        }
        return newObj;
    }
    return obj;
}

export async function GET() {
    try {
        // 1. Load Data
        const productsData = loadJSON('products.json') || { products: [] };
        const locationsData = loadJSON('locations.json') || [];
        const storyData = loadJSON('story.json') || {};
        const messagesData = loadJSON('messages.json') || [];
        const usersData = loadJSON('users.json') || [];
        const pageConfigData = loadJSON('page-config.json') || {}; // This might have hero images

        // 2. Identify Images
        const imagePaths = new Set<string>();
        findImagePaths(productsData, imagePaths);
        // findImagePaths(locationsData, imagePaths);
        findImagePaths(storyData, imagePaths);
        findImagePaths(usersData, imagePaths);
        findImagePaths(pageConfigData, imagePaths);

        console.log(`Found ${imagePaths.size} images to migrate.`);

        // 3. Upload Images to Firebase Storage
        const urlMap = new Map<string, string>();
        const uploadPromises = Array.from(imagePaths).map(async (localPath) => {
            try {
                const filename = localPath.replace('/uploads/', '');
                const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

                if (!fs.existsSync(filePath)) {
                    console.warn(`File not found: ${filePath}`);
                    return;
                }

                const fileBuffer = fs.readFileSync(filePath);
                const storageRef = ref(storage, `uploads/${filename}`);

                // Guess mime type roughly or let Firebase handle it (it usually auto-detects from bytes or we set default)
                // We'll just upload bytes.
                await uploadBytes(storageRef, fileBuffer);
                const publicUrl = await getDownloadURL(storageRef);

                urlMap.set(localPath, publicUrl);
                console.log(`Uploaded ${filename} -> ${publicUrl}`);
            } catch (error) {
                console.error(`Failed to upload ${localPath}:`, error);
            }
        });

        await Promise.all(uploadPromises);

        // 4. Update Data with new URLs
        const newProductsData = replaceImagePaths(productsData, urlMap);
        const newLocationsData = replaceImagePaths(locationsData, urlMap);
        const newStoryData = replaceImagePaths(storyData, urlMap);
        const newUsersData = replaceImagePaths(usersData, urlMap);
        const newPageConfigData = replaceImagePaths(pageConfigData, urlMap);

        // 5. Write to Firestore 'app_data' collection
        // Schema: collection 'app_data', docs have field 'data'
        const batch = writeBatch(db);

        batch.set(doc(db, 'app_data', 'products'), {
            data: newProductsData,
            updatedAt: new Date().toISOString()
        });

        batch.set(doc(db, 'app_data', 'locations'), {
            data: newLocationsData,
            updatedAt: new Date().toISOString()
        });

        batch.set(doc(db, 'app_data', 'story'), {
            data: newStoryData,
            updatedAt: new Date().toISOString()
        });

        batch.set(doc(db, 'app_data', 'users'), {
            data: newUsersData,
            updatedAt: new Date().toISOString()
        });

        batch.set(doc(db, 'app_data', 'messages'), {
            data: messagesData, // Usually no images
            updatedAt: new Date().toISOString()
        });

        batch.set(doc(db, 'app_data', 'page-config'), {
            data: newPageConfigData,
            updatedAt: new Date().toISOString()
        });

        await batch.commit();

        return NextResponse.json({
            success: true,
            message: `Migration complete. Uploaded ${urlMap.size} images.`,
            migratedImages: Object.fromEntries(urlMap)
        });

    } catch (error) {
        console.error("Migration fatal error:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
