import fs from 'fs';
import path from 'path';
import { db, storage } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const IS_DEV = process.env.NODE_ENV === 'development';
// Force "Production Mode" IF we are not in development. 
// Vercel sets NODE_ENV=production automatically.
// If you are locally seeing this error, it means NODE_ENV is "production" OR the fallback failed.
console.log(`[Storage] Environment: ${process.env.NODE_ENV}, IS_DEV: ${IS_DEV}`);

export const storageService = {
    // Generic Data Operations
    async getData<T>(key: string): Promise<T | null> {
        // In development, try to read from local file system first
        if (IS_DEV) {
            try {
                const filePath = path.join(process.cwd(), 'src', 'data', `${key}.json`);
                if (fs.existsSync(filePath)) {
                    console.log(`[Storage] Reading ${key} from local FS`);
                    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
                }
            } catch (e) {
                console.error(`[Storage] FS Read Error for ${key}:`, e);
            }
        }

        // Fallback to Firestore (or primary for production)
        try {
            // We store all app data in a collection named 'app_data'
            // Each file corresponds to a document ID (e.g., 'users', 'products')
            // The content is stored in a field named 'data'
            const docRef = doc(db, 'app_data', key);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data().data as T;
            }
        } catch (e) {
            console.error(`[Storage] Firestore Read Error for ${key}:`, e);
        }

        return null;
    },

    async saveData<T>(key: string, data: T): Promise<void> {
        // In development, save to local file system
        if (IS_DEV) {
            try {
                const filePath = path.join(process.cwd(), 'src', 'data', `${key}.json`);
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(`[Storage] Saved ${key} to local FS`);
                // We generally don't return here if we want to save to BOTH (optional sync)
                // But for strict "Dev=FS, Prod=DB", we return.
                return;
            } catch (e) {
                console.error(`[Storage] FS Write Error for ${key}:`, e);
                throw e;
            }
        }

        // In production, save to Firestore
        try {
            const docRef = doc(db, 'app_data', key);
            await setDoc(docRef, {
                data: data,
                updatedAt: new Date().toISOString()
            });
            console.log(`[Storage] Saved ${key} to Firestore`);
        } catch (e) {
            console.error(`[Storage] Firestore Write Error for ${key}:`, e);
            throw e;
        }
    },

    // File Upload Operations
    async uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
        // In development, save to public/uploads
        if (IS_DEV) {
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
                const uploadDir = path.join(process.cwd(), 'public', folder);

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const filePath = path.join(uploadDir, filename);
                fs.writeFileSync(filePath, buffer);
                console.log(`[Storage] Saved file ${filename} to local FS`);

                return `/${folder}/${filename}`;
            } catch (e) {
                console.error('[Storage] FS Upload Error:', e);
                throw e;
            }
        }

        // In production, upload to Firebase Storage
        try {
            const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
            // Use the initialized storage instance which already has the bucket config
            const storageRef = ref(storage, `${folder}/${filename}`);

            console.log(`[Storage] Uploading to bucket: ${storage.app.options.storageBucket}`);

            const bytes = await file.arrayBuffer();
            const metadata = {
                contentType: file.type,
            };

            const snapshot = await uploadBytes(storageRef, bytes, metadata);
            const url = await getDownloadURL(snapshot.ref);
            console.log(`[Storage] Uploaded file to Firebase Storage: ${url}`);
            return url;
        } catch (e) {
            console.error('[Storage] Firebase Upload Error:', e);
            throw e;
        }
    }
};
