import React, { Fragment, useState } from 'react';

import { Dialog, Transition, Combobox } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { useTransition } from '../hooks/useTransitionHook';
import { useRouter } from 'next/router';

interface SearchModalTransitionsProps {
    searchOpenModal: boolean;
    setSearchOpenModal: (value: boolean) => void
}

interface TransitionParams {
    type: String;
    category: String;
    price: number;
    month: Number;
    name: String;
    id: String;
    year: Number
}

const SearchComponent = ({ searchOpenModal, setSearchOpenModal }: SearchModalTransitionsProps) => {

    const transictions = useTransition();

    const router = useRouter()

    const [query,
        setQuery] = useState('')

    const filteredTransictions = query
        ? transictions.filter((transition) => transition.name.toLowerCase().includes(query.toLowerCase()))
        : []

    function closeModal() {
        setQuery('')
        setSearchOpenModal(false)
    }

    function openModal() {
        setSearchOpenModal(true)
    }

    return (
        <>
            <Transition appear show={searchOpenModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div
                                className="relative inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl ring-1 ring-black/5 rounded-md">

                                <Combobox
                                    value=''
                                    as="div"
                                    onChange={(transiction: TransitionParams) => { router.push(`transition/${transiction.id}?year=${transiction.year}`) }}
                                    className='relative ring-0 focus:ring-0 divide-y divide-gray-100 overflow-hidden'>
                                    <div className='flex items-center px-2 w-96 border-1 border-red-500'>
                                        <SearchIcon className='h-6 w-6 space-x-1 text-gray-500/75' />
                                        <Combobox.Input
                                            className='w-full bg-transparent text-sm rounded-xl focus:ring-0 border-0 placeholder:text-gray-500/75 text-gray-800 font-bold'
                                            onChange={(event) => {
                                                setQuery(event.target.value)
                                            }}
                                            placeholder='Search...' />
                                    </div>
                                    {filteredTransictions.length > 0 && (
                                        <Combobox.Options static className='py-4 text-sm max-h-96 overflow-y-auto'>
                                            {filteredTransictions.map((transiction, index) => (

                                                <Combobox.Option key={index} value={transiction}>
                                                    {({ active }) => (
                                                        <div
                                                            className={`px-4 py-2 space-x-1 ${active
                                                                ? 'bg-header rounded-xl text-white'
                                                                : 'bg-white'}`}>
                                                            <span
                                                                className={`font-medium hover:cursor-pointer ${active
                                                                    ? 'text-white'
                                                                    : 'text-gray-900'}`}>{transiction.name}
                                                            </span>
                                                            <span
                                                                className={`${active
                                                                    ? 'text-white'
                                                                    : 'text-gray-400'}`}>{`in ${transiction.category}- ${transiction.month}/${transiction.year}`}</span>
                                                        </div>
                                                    )}
                                                </Combobox.Option>
                                            ))}

                                        </Combobox.Options>

                                    )}

                                    {
                                        query && filteredTransictions.length === 0 && <p className='p-4 text-sm text-gray-500'>No results found</p>
                                    }
                                </Combobox>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition >
        </>)

}

export default SearchComponent;