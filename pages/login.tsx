import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import loginBanner from '../public/frontend-used-images/loginBanner.png'
import aftinLogo from '../public/frontend-used-images/aftinLogoSvg.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import LoginDiv from '../components/Login/LoginDiv'
import SignUpDiv from '../components/Login/SignUpDiv'


interface Inputs {
  email: string
  password: string
}





function Login() {
  const [login, setLogin] = useState(true)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
 


  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <title>login</title>
      </Head>
      <div className='relative flex flex-row  h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent py-10 items-center flex-wrap w-none sm:w-auto'>
        <div className='absolute -z-10'>
          <Image
            src={loginBanner}
            alt='login-artwork'
            layout='intrinsic'
            className='-z-10 bg-blend-hard-light !none sm:!inline'
          />
        </div>
        <div className=' flex flex-col-reverse sm:flex-col'>
          <Image
            src={aftinLogo}
            alt='login-artwork'
            width={240}
            height={135}
            className='bg-blend-hard-light !hidden sm:!inline'
          />
          <div className='flex row-span-2 justify-center'>
            <button className='flex justify-center items-center w-full signIn' onClick={() => (setLogin(true))}>Sign In</button>
            <button className='flex justify-center items-center w-full signIn' onClick={() => setLogin(false)}>Sign Up</button>
          </div>
          {login? <LoginDiv></LoginDiv> : <SignUpDiv></SignUpDiv>}





        </div>


      </div>
    </div>
  )
}

export default Login