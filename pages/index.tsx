import type { NextPage }
  from 'next'
import { signIn, useSession } from 'next-auth/react';

import { useRouter } from 'next/router'
import { useEffect } from 'react';

import Head from 'next/head'
import Image from 'next/image';

//Logo APP
import Logo from '../public/Logo.svg';

const Home: NextPage = () => {

  const router = useRouter();
  const { data: session } = useSession()

  useEffect(() => {
    router.prefetch('/Dashboard')
    if (session) {
      router.push('/Dashboard')
    }
    router.push('/')

  }, [session])

  function handleLogin() {
    signIn();
  }
  return (
    <div className='h-screen flex flex-col  justify-center items-center bg-white'>
      <Head>
        <title>Login | CJmoney</title>
        <link rel="icon" href="/Logo1.svg" />
      </Head>
      <div
        className='text-center bg-gray-200 shadow-md shadow-black/60 w-80 sm:w-96 h-60 flex flex-col py-4 items-center rounded-md'>
        <div className='mt-5 mb-7 px-2'>
          <Image className='h-5 w-5 m-5' src={Logo} />
          <h2 className='mt-4'>Por favor, clique no botão para escolher o método de Login!</h2>
        </div>

        <div>
          <button
            onClick={handleLogin}
            className='px-4 py-2 bg-button rounded-md text-white mt-5 hover:brightness-75'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Home
