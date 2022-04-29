
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { FormEvent, Fragment, useEffect, useState } from 'react';

import Image from 'next/image';
import Income from '../public/Entradas.svg';
import Expense from '../public/Saídas.svg';

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';


interface TransitionParams {
    type: String;
    category: String;
    price: number;
    month: Number;
    name: String;
    id: String;
    year: Number
}

interface ModalTransitionsProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    transaction: TransitionParams
}



const EditTransactionModal = ({ isOpen, setIsOpen, transaction }: ModalTransitionsProps) => {

    //Next route
    const { query } = useRouter();
    const { id, year } = query

    //Session
    const { data: session } = useSession()

    //Proprieties
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");


    //success state

    const [show, setShow] = useState('hidden')

    //This effect will work after open the modal
    useEffect(() => {


        setName(String(transaction.name));
        setPrice(transaction.price);
        setCategory(String(transaction.category));
        setType(String(transaction.type));


    }, [isOpen])


    async function handleEditSubmit(event: FormEvent) {

        event.preventDefault();
        const newYear = new Date().getFullYear().toString().slice(-2);
        const years = year?.toString().slice(-2) ?? newYear;
        const walletsRef = collection(db, `wallets/${String(session?.user?.email)}/${years}`);
        await setDoc(doc(walletsRef, String(id)), { name, price, category, type, month: transaction.month, year: year })
        setShow('')
    }

    function closeModal() {
        setIsOpen(false)
        router.back()
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="relative inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform transition-all  bg-[#F0F2F5] shadow-xl rounded-md">
                                <button onClick={closeModal} className='absolute right-6 top-2 text-[#d7d5d5] hover:brightness-75'>X</button>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 my-4"
                                >
                                    Editar Transação
                                    <div className={`my-1 p-2 text-[#12A454] border border-[#12A454] rounded text-center ${show} transform transition-all animate-bounce`}>Transaction changed successfully!</div>
                                </Dialog.Title>
                                <div className="mt-2">
                                    <input type='text' value={String(name)} onChange={(value) => setName(value.target.value)} placeholder='Nome' className='w-full rounded-md bg-[#D7D7D7] border-none' />
                                </div>
                                <div className="mt-2">
                                    <input type='number' value={price} onChange={(value) => setPrice(Number(value.target.value))} placeholder='Preço' className='w-full rounded-md bg-[#D7D7D7] border-none' />
                                </div>
                                <div className="mt-2 flex space-x-2">
                                    <button onClick={() => setType('income')} className={`btn-type ${type === 'income' ? 'bg-[#12A454] bg-opacity-[0.1]' : ''} `}>
                                        <Image height={16} width={16} className='h-2 w-2' src={Income} />
                                        <span> Entrada</span>
                                    </button>
                                    <button onClick={() => setType('expense')} className={`btn-type ${type !== 'income' ? 'bg-[#E52E4D] bg-opacity-[0.1]' : ''} `}>
                                        <Image height={16} width={16} className='h-2 w-2' src={Expense} />
                                        <span> Saida</span>
                                    </button>
                                </div>
                                <div className="mt-2">

                                    <select defaultValue={String(category)} onChange={(value) => setCategory(value.target.value)} className='w-full rounded-md bg-[#D7D7D7] border-none'>
                                        <option>Sale</option>
                                        <option>Shopping</option>
                                        <option>Rent</option>
                                        <option>Debt</option>
                                        <option>Business</option>
                                        <option>Food</option>
                                        <option>Salary</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="mt-4 mb-6">
                                    <button
                                        onClick={handleEditSubmit}
                                        type="button"
                                        className="w-full px-4 py-3 text-sm font-medium text-white bg-total-card border border-transparent rounded-md hover:brightness-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"

                                    >
                                        Alterar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition >
        </>
    )


}

export default EditTransactionModal;