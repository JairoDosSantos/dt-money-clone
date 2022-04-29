import React, { useEffect, useState } from 'react';

import { NextPage, GetServerSideProps } from "next";

import Router, { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

//Firebase
import { app, db } from '../../firebase'
import { query as Query, deleteDoc, getDoc, doc, Transaction } from "firebase/firestore";

import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import EditTransactionModal from '../../components/editTrasaction';
import Head from 'next/head';



interface TransitionParams {
    type: String;
    category: String;
    price: number;
    month: Number;
    name: String;
    id: String;
    year: Number
}

const Transiction = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [transiction, setTransiction] = useState<TransitionParams>({} as TransitionParams);


    const { query } = useRouter();

    const { data: session } = useSession()

    const { id, year } = query;

    const years = year?.slice(-2);

    const Month = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Agosto",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]

    useEffect(() => {
        async function fetchTransition() {
            const walletsRef = doc(db, `wallets/${session?.user?.email}/${years}/${id}`);
            const docSnap = await getDoc(walletsRef);
            setTransiction(docSnap.data() as TransitionParams)

        }
        fetchTransition()

    }, [])


    async function handleDeleteTransaction() {

        if (confirm("Are you sure you want delete this transaction?")) {

            await deleteDoc(doc(db, "wallets", `${session?.user?.email}/${years}/${id}`));
            Router.push('/Dashboard');
        }
        else {

            alert('Operation was cancelled!')
        }
    }

    const price = transiction?.price;
    return (
        <div
            className='container mt-2 mx-auto max-h-min h-96 px-2 py-4 flex flex-col items-center bg-white rounded shadow-md'>
            <Head>
                <title>{`Info. about ${transiction?.name}`}</title>
            </Head>
            <EditTransactionModal transaction={transiction} setIsOpen={setIsOpen} isOpen={isOpen} />
            <h1 className='font-bold text-xl'>Transaction information</h1>
            <div className='flex flex-col justify-start gap-3 p-2 border-y mt-2 w-full'>
                <p><strong>Author's Name</strong>: <span className='text-gray-400'>{session?.user?.name}</span></p>
                <p><strong>Type of transiction</strong>: <span className='text-gray-400 first-letter:uppercase'>{transiction?.type}</span></p>
                <p><strong>Transiction's name</strong>:<span className='text-gray-400 first-letter:uppercase'> {transiction?.name}</span></p>
                <p><strong>Total amount</strong>:<span className='text-gray-400 first-letter:uppercase'> {price ? Number(price).toLocaleString('pt', { style: 'currency', currency: 'kwz' }) : ''}</span></p>
                <p><strong>Date of transiction</strong>:<span className='text-gray-400 first-letter:uppercase'> {`${Month[Number(transiction?.month) - 1]}/${transiction?.year}`}</span></p>
            </div>
            <div className='flex justify-end items-end gap-3 p-2 max-h-56 h-56  mt-2 w-full print:hidden'>
                <button onClick={handleDeleteTransaction} className='px-4 py-2 border rounded font-semibold bg-header text-white hover:brightness-75 hover:transform hover:transition-all flex items-center justify-around'>
                    <TrashIcon className='inline h-5 w-5 text-white my-auto cursor-pointer' />
                    Delete
                </button>

                <button onClick={() => setIsOpen(true)} className='px-4 py-2 border rounded font-semibold bg-total-card text-white hover:brightness-75 hover:transform hover:transition-all'>
                    <PencilIcon className='inline h-4 w-4 text-white my-auto cursor-pointer' />
                    Edit
                </button>
            </div>

        </div>
    )
}


export default Transiction;