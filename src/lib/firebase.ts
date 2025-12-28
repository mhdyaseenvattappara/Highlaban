import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAlBn3RX5n4OXkruqM8eRPyRrCGn-1cDao",
    authDomain: "high-laban-cba7c.firebaseapp.com",
    projectId: "high-laban-cba7c",
    storageBucket: "high-laban-cba7c.firebasestorage.app",
    messagingSenderId: "225899927178",
    appId: "1:225899927178:web:2c43653c1d424345ad7f73",
    measurementId: "G-MEMPSCHKY1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { app, db, auth, analytics };
