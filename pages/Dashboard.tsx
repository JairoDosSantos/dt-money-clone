import type { NextPage } from 'next'
import Head from 'next/head'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

//My Components
import Header from '../components/header'
import NewTransitionModal from '../components/newTransitionModal'
import Summary from '../components/summary'
import TransitionTable from '../components/transitionTable'
import { TransitionProvider } from '../hooks/useTransitionHook'
import SearchComponent from '../components/searchTransiction'


const DashBoard: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchModal, setSearchModal] = useState(false);
    const router = useRouter();
    const { data: session } = useSession()

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    }, [session])
    return (
        <div>
            <Head>
                <title>Dashboard | My Wallet</title>
                <link rel="icon" href="/Logo1.svg" />
            </Head>


            <TransitionProvider>

                <Header setIsOpen={setIsOpen} searchOpenModal={setSearchModal} />
                <Summary />
                <SearchComponent setSearchOpenModal={setSearchModal} searchOpenModal={searchModal} />
                <NewTransitionModal isOpen={isOpen} setIsOpen={setIsOpen} />
                <TransitionTable />

            </TransitionProvider>

        </div>
    )
}

export default DashBoard
