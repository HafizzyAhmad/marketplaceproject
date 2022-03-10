// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPMWqGhvu29yM5rszpjl4wKyr_HeEQzkA',
  authDomain: 'marketplace-9cf8f.firebaseapp.com',
  projectId: 'marketplace-9cf8f',
  storageBucket: 'marketplace-9cf8f.appspot.com',
  messagingSenderId: '90056638162',
  appId: '1:90056638162:web:7305594bd708e76705f70b',
  measurementId: 'G-BFCMQ5VWT7',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
