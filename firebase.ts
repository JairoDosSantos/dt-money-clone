import { getFirestore } from "firebase/firestore";

import { initializeApp, getApp, getApps } from 'firebase/app'

const firebaseConfig = {

};

export const app = !getApps.length
    ? initializeApp(firebaseConfig)
    : getApp();

export const db = getFirestore();