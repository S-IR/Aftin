import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import GoogleButton from 'react-google-button'
import  useAuthThirdParty  from "../../hooks/useAuthThirdParty"



interface Inputs {
  email: string
  password: string
}

function LoginDiv() {
  const { signInWithGoogle } = useAuthThirdParty()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const { signIn, signUp } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password)
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)} className='sm:w-auto z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900  rounded-3xl space-y-8 md:max-w-md md:px-14 flex-row row-span-1 justify-center items-center text-white  p-4 mx-5'>
      <div className='space-y-4'>
        <label className='inline-block w-full'>
          <input type="email" placeholder='Email' className='input' {...register("email", {
            required: true
          })} />
          {errors.email && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid email</p>}
        </label>
        <label className='inline-block w-full'>
          <input type="password" placeholder='Password' className='input' {...register("password", {
            required: true
          })} />
          {errors.email && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid email</p>}
        </label>
        <div className='flex flex-col align-middle items-center text-center'>
          <GoogleButton  label='Login with Google' onClick={signInWithGoogle} />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button type='submit' className='general-buttons !m-0' >Sign In</button>
      </div>
    </form>
  )
}

export default LoginDiv