import React from 'react';
import Image from 'next/image';

import { SearchIcon } from '@heroicons/react/outline'

import Logo from '../public/Logo.svg';
import Avatar from '../public/avatar.jpg'

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'

interface HeaderProps {
    setIsOpen: (value: boolean) => void;
    searchOpenModal: (value: boolean) => void
}

const Header = ({ setIsOpen, searchOpenModal }: HeaderProps) => {

    //Session
    const { data: session } = useSession()

    return (
        <header className='bg-header h-[212px] py-8 px-4 w-full sm:min-w-[800px] mb-2'>
            <div className='flex flex-col space-y-3  sm:flex-row sm:justify-between mx-auto max-w-5xl'>

                <button title='Click aquí para sair!' onClick={() => signOut()} className='flex items-end space-x-1 mx-auto sm:mx-0 text-white'>
                    <Image src={session?.user?.image ?? Avatar} width={50} height={50} className=' rounded-full' /><span>{session?.user?.name}</span>
                </button>

                <div className='flex justify-between sm:space-x-2 '>
                    <button onClick={() => setIsOpen(true)} className=' text-white px-4 py-2 hover:brightness-100 hover:drop-shadow-md bg-button rounded font-semibold'>Nova Transação</button>
                    <button onClick={() => searchOpenModal(true)}>
                        <SearchIcon className='h-5 w-5 text-white my-auto cursor-pointer' />
                    </button>
                </div>

            </div>
        </header>
    );
}

export default Header;