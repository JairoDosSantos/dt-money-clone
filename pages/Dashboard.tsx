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


const DashBoard: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
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
                <title>Dashboard | CJmoney</title>
                <link rel="icon" href="/Logo1.svg" />
            </Head>



            <Header setIsOpen={setIsOpen} />
            <Summary />
            <NewTransitionModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <TransitionTable />
        </div>
    )
}

export default DashBoard
