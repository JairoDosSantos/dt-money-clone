import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/header'
import NewTransitionModal from '../components/newTransitionModal'
import Summary from '../components/summary'
import TransitionTable from '../components/transitionTable'


const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
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

export default Home
