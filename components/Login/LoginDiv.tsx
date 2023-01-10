import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import GoogleButton from 'react-google-button'
import useAuthThirdParty from "../../hooks/useAuthThirdParty"
import { useRouter } from 'next/router'



interface Inputs {
  email: string
  password: string
}

function LoginDiv() {
  const { signInWithGoogle } = useAuthThirdParty()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()


  
  const { signIn } = useAuth()


  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password)
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)} className='sm:w-auto z-50 bg-gray-200 to-blue-900  rounded-md space-y-8   md:px-14 flex-row row-span-1 justify-center items-center text-white p-4 mx-auto'>
      <div className='space-y-4 w-full'>
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
          <GoogleButton label='Login with Google' onClick={signInWithGoogle} />
        </div>
        <button type='button' className='w-full text-right  ml-auto text-blue-700' onClick={()=> router.push('/reset')}>Forgot Password?</button>
      </div>
      <div className='flex justify-center items-center'>
        <button type='submit' className='general-buttons !m-0' >Sign In
        </button>
      </div>
    </form>
  )
}

export default LoginDiv