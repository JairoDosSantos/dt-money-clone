import React from 'react';

import Link from 'next/link'

import { useTransition } from '../hooks/useTransitionHook';

const TransitionTable: React.FC = () => {

    const transitons = useTransition();
    const Month = [
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
                    {transitons.map((transition, index) => {
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
                                <td className='table-td first-letter:uppercase'>{`${Month[Number(transition.month) - 1]}/${transition.year}`}</td>
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