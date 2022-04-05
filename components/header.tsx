import React from 'react';
import Image from 'next/image';


import Logo from '../public/Logo.svg';

interface HeaderProps {
    setIsOpen: (value: boolean) => void
}

const Header = ({ setIsOpen }: HeaderProps) => {
    return (
        <header className='bg-header h-[212px] py-8 px-4 w-full sm:min-w-[800px]'>
            <div className='flex flex-col space-y-3  sm:flex-row sm:justify-between mx-auto max-w-5xl'>
                <Image src={Logo} className='h-3 w-5' />
                <button onClick={() => setIsOpen(true)} className=' text-white px-4 py-2 hover:brightness-100 hover:drop-shadow-md bg-button rounded font-semibold'>Nova Transação</button>
            </div>
        </header>
    );
}

export default Header;