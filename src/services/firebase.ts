import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1PgttqrqlDBe66ohW9uW-SAcn9EFpks",
  authDomain: "cv-builder-79941.firebaseapp.com",
  projectId: "cv-builder-79941",
  storageBucket: "cv-builder-79941.firebasestorage.app",
  messagingSenderId: "491423870230",
  appId: "1:491423870230:web:6548b82c89f4aedce07437",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
