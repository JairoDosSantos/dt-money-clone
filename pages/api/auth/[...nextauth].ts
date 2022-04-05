import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { FirebaseAdapter } from '@next-auth/firebase-adapter'

import { db } from "../../../firebase"
import {
    getFirestore,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction
} from 'firebase/firestore'

export default NextAuth({

    adapter: FirebaseAdapter({
        db,
        collection,
        query,
        getDocs,
        where,
        limit,
        doc,
        getDoc,
        addDoc,
        updateDoc,
        deleteDoc,
        runTransaction
    }),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_ID),
            clientSecret: String(process.env.GOOGLE_SECRET),
        }),
        // ...add more providers here
    ]
})