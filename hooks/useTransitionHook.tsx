import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

//Firebase
import { app, db } from '../firebase'
import { collectionGroup, query, where, getDocs, collection, orderBy, limit } from "firebase/firestore";
import { useSession } from 'next-auth/react';

interface TransitionContextProps {
    children: ReactNode;
}

interface TransitionContextParams {
    type: String;
    category: String;
    price: number;
    month: Number;
    name: String;
    id: String;
    year: Number
}

const TransitionContext = createContext<TransitionContextParams[]>([])

export function TransitionProvider({ children }: TransitionContextProps) {

    const [transitions, setTransitions] = useState<TransitionContextParams[]>([])
    const { data: session } = useSession()
    useEffect(() => {

        (async function getData() {
            const fullYear = (new Date().getFullYear()).toString().slice(-2);

            const q = query(collection(db, `wallets/${session?.user?.email}/${fullYear}`), orderBy('month', 'desc'),);

            const querySnapshot = await getDocs(q);
            let transition = { type: '', name: '', price: 0, category: '', month: 0, id: '', year: 0 };

            querySnapshot.forEach((doc) => {

                transition = {
                    type: String(doc.data().type),
                    name: String(doc.data().name),
                    price: Number(doc.data().price),
                    category: String(doc.data().category),
                    month: Number(doc.data().month),
                    id: String(doc.id),
                    year: Number(doc.data().year)
                }
                setTransitions(value => [...value, transition]);
            });
        })()

        setTransitions([])

    }, [])

    return (
        <TransitionContext.Provider value={transitions}>
            {children}
        </TransitionContext.Provider>
    )
}

export function useTransition() {
    const context = useContext(TransitionContext)
    return context;
}