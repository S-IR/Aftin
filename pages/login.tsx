import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import loginBanner from '../public/frontend-used-images/loginBanner.png'
import aftinLogo from '../public/frontend-used-images/aftinLogoSvg.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import LoginDiv from '../components/login/LoginDiv'
import SignUpDiv from '../components/login/SignUpDiv'
import { CSSTransition } from 'react-transition-group'
import styles from '../styles/Login.module.css'
import Loading from '../components/general/Loading'

interface Inputs {
  email: string
  password: string
}





function Login() {
  const [login, setLogin] = useState(true)
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>()

  const { loading } = useAuth()


  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <title>login</title>
      </Head>
      <div className='relative flex flex-row  h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent py-10 items-center flex-wrap w-none sm:w-auto content-start'>
        <div className='absolute -z-10 '>
          <Image
            src={loginBanner}
            alt='login-artwork'
            layout='intrinsic'
            className='-z-10 bg-blend-hard-light !none sm:!inline'
          />
        </div>
        <div className=' flex flex-col-reverse sm:flex-col w-1/2 h-full  bg-gray-300 drop-shadow-xl rounded-md  '>
          <div className='flex row-span-2 justify-center relative w-full overflow-hidden my-2'>
            <button className='flex justify-center items-center bg-gradient-to-b from-gray-500 to-gray-700 rounded-sm w-48 h-10 filter-none  hover:filter brightness-90  transition-all duration-300  m-1' onClick={() => (setLogin(true))}>Sign In</button>
            <button className='flex justify-center items-center bg-gradient-to-b from-gray-500 to-gray-700 rounded-sm w-48 h-10 filter-none  hover:filter brightness-90  transition-all duration-300  m-1' onClick={() => setLogin(false)}>Sign Up</button>
          </div>
          <div className=' relative h-auto ' >
            {login? <LoginDiv /> : <SignUpDiv/>}

          </div>

          {loading ? <Loading /> : null}




        </div>


      </div>
    </div>
  )
}

export default Login