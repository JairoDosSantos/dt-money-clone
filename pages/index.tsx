import type { NextPage } from 'next'
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


  }, [session])

  function handleLogin() {
    signIn();
  }
  return (
    <div className='h-screen flex flex-col  justify-center items-center bg-white '>
      <Head>
        <title>Login | My wallet</title>
        <link rel="icon" href="/Logo1.svg" />
      </Head>
      <div
        className='text-center border w-80 sm:w-96 h-60 flex flex-col pb-4 items-center rounded-md  shadow-md'>
        <div className='mb-7  w-full h-full'>
          <div className='rounded  px-1 py-4 bg-body shadow-sm'>
            <Image className='h-5 w-5' src={Logo} />
          </div>
          <h1 className='mt-4 font-extrabold text-xl'>Sing-In!</h1>
          <h2>Please, click in the button to login.</h2>
        </div>

        <div className='mb-5'>
          <button
            onClick={handleLogin}
            className='px-4 py-2  rounded-md shadow-md border text-black bg-body  hover:brightness-75'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Home
