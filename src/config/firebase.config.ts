import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin SDK
const serviceAccount = path.resolve(__dirname, './firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdmin = admin;