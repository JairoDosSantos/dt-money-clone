import React from 'react';

import Image from 'next/image';


//Imagens
import Income from '../public/Entradas.svg';
import OutCome from '../public/Saídas.svg';
import Total from '../public/Total.svg';

const Summary: React.FC = () => {
    return (
        <section className='flex flex-wrap gap-6 -mt-20 mx-auto justify-center container'>
            <div className='card-white-summary'>
                <div className='flex justify-between '>
                    <h4>Entradas</h4>
                    <Image src={Income} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>R$ 17.400, 00</h1>
            </div>
            <div className='card-white-summary'>
                <div className='flex justify-between '>
                    <h4>Saídas</h4>
                    <Image src={OutCome} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>R$ 1.259, 00</h1>
            </div>
            <div className='flex flex-col h-[8.5rem] w-[22rem] p-6 bg-total-card rounded text-white'>
                <div className='flex justify-between '>
                    <h4>Total</h4>
                    <Image src={Total} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>R$ 16.141, 00</h1>
            </div>
        </section>
    );
}

export default Summary;