import React from 'react';



const TransitionTable: React.FC = () => {
    return (
        <div className='flex  flex-wrap container my-10 mx-auto justify-center overflow-x-auto'>
            <table className='min-w-[70rem]  flex flex-col space-y-4 space-x-2  bg-body p-4'>
                <thead className='w-full '>
                    <tr className='text-table-tittle w-full flex justify-around'>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody className='text-center flex flex-col space-y-2 w-full'>
                    <tr className='table-item'>
                        <td className='p-2 w-1/4 text-left'>Aluguer do Apartamento</td>
                        <td className='p-2 w-1/4  text-red-600'>-R$1.200,00</td>
                        <td className='p-2 w-1/4'>Venda</td>
                        <td className='p-2 w-1/4'>12/02/2022</td>
                    </tr>
                    <tr className='table-item'>
                        <td className='p-2 w-1/4 text-left'>Hamburguer</td>
                        <td className='p-2 w-1/4 text-red-600 '>-R$59,00</td>
                        <td className='p-2 w-1/4'>Venda</td>
                        <td className='p-2 w-1/4'>12/02/2022</td>
                    </tr>
                    <tr className='table-item'>
                        <td className='p-2 w-1/4 text-left'>Desenvolvimento Web</td>
                        <td className='p-2 w-1/4 text-green-600'>R$12.000,00</td>
                        <td className='p-2 w-1/4'>Venda</td>
                        <td className='p-2 w-1/4'>12/02/2022</td>
                    </tr>
                    <tr className='table-item'>
                        <td className='p-2 w-1/4 text-left'>Computador</td>
                        <td className='p-2 w-1/4 text-green-600'>R$5.400,00</td>
                        <td className='p-2 w-1/4'>Venda</td>
                        <td className='p-2 w-1/4'>12/02/2022</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TransitionTable;