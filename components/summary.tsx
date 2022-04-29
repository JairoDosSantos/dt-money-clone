import React from 'react';

import Image from 'next/image';


//Imagens
import Income from '../public/Entradas.svg';
import OutCome from '../public/Saídas.svg';
import Total from '../public/Total.svg';
import { useTransition } from '../hooks/useTransitionHook';

const Summary: React.FC = () => {

    const transictions = useTransition();

    const summary = transictions.reduce((acc, transiction) => {

        if (transiction.type === 'income') {
            acc.deposits += transiction.price

        } else {
            acc.withdraws += transiction.price

        }
        acc.total = acc.deposits - acc.withdraws;
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <section className='flex flex-wrap gap-6 -mt-20 mx-auto justify-center container'>
            <div className='card-white-summary'>
                <div className='flex justify-between '>
                    <h4>Entradas</h4>
                    <Image src={Income} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>{summary.deposits.toLocaleString('pt', { style: 'currency', currency: 'KWZ' })}</h1>
            </div>
            <div className='card-white-summary'>
                <div className='flex justify-between '>
                    <h4>Saídas</h4>
                    <Image src={OutCome} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>-{summary.withdraws.toLocaleString('pt', { style: 'currency', currency: 'KWZ' })}</h1>
            </div>
            <div className={`${summary.total >= 0 ? 'bg-total-card' : 'bg-gradient-to-br from-red-500 to-red-300'} flex flex-col h-[8.5rem] w-[22rem] p-6 rounded text-white`}>
                <div className='flex justify-between '>
                    <h4>Total</h4>
                    <Image src={Total} className='h-5 w-5' />
                </div>
                <h1 className='text-3xl mt-2 font-semibold '>{summary.total.toLocaleString('pt', { style: 'currency', currency: 'KWZ' })}</h1>
            </div>
        </section>
    );
}

export default Summary;