import React from 'react';

import Link from 'next/link'

import { useTransition } from '../hooks/useTransitionHook';

interface TransitionParams {
    type: String;
    category: String;
    price: number;
    month: Number;
    name: String;
    id: String;
    year: Number
}


const TransitionTable: React.FC = () => {

    //HOOK contains all transactions
    const transitons = useTransition();

    const MONTH = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "agosto",
        "outubro",
        "novembro",
        "dezembro"
    ]

    const TRANSACTIONS_MAX_LENGHT = 8;
    const transactions = new Array<TransitionParams>();
    let array_lenght = 0;

    transitons.forEach(transaction => {
        if (array_lenght < TRANSACTIONS_MAX_LENGHT) {
            transactions.push(transaction)
            array_lenght++;
        }
    })


    return (
        <div className=' max-w-[70rem] min-h-min  my-10 mx-auto  overflow-auto '>
            <table
                className='min-w-[70rem]  flex flex-col space-y-4 space-x-2  bg-body p-4'>
                <thead className='w-full '>
                    <tr className='text-table-tittle w-full flex justify-around'>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody className='text-center flex flex-col space-y-2 w-full'>
                    {transactions.map((transition, index) => {
                        return (
                            <tr className='table-item' key={index}>
                                <td className='table-td text-left cursor-pointer'>
                                    <Link href={`transition/${transition.id}?year=${transition.year}`}>
                                        <a >{transition.name}</a>
                                    </Link>
                                </td>
                                <td
                                    className={`table-td ${transition.type === 'expense'
                                        ? 'text-red-600'
                                        : 'text-green-600'}`}>
                                    {`${transition.type === 'expense'
                                        ? '-'
                                        : '+'} ${transition
                                            .price
                                            .toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'KWZ'
                                            })}`}</td>
                                <td className='table-td'>{transition.category}</td>
                                <td className='table-td first-letter:uppercase'>{`${MONTH[Number(transition.month) - 1]}/${transition.year}`}</td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>
        </div>
    );
}

export default TransitionTable;