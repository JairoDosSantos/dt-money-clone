import { getFirestore } from "firebase/firestore";

import { initializeApp, getApp, getApps } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBo5sJ3UgUA6T1KbEUIG5Cys9zC0RHgnh8",
    authDomain: "my-wallet-e218d.firebaseapp.com",
    projectId: "my-wallet-e218d",
    storageBucket: "my-wallet-e218d.appspot.com",
    messagingSenderId: "776284224187",
    appId: "1:776284224187:web:08b884762f47739b14879e"
};

export const app = !getApps.length
    ? initializeApp(firebaseConfig)
    : getApp();

export const db = getFirestore();