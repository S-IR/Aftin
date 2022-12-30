import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'


interface Inputs {
  email: string
}


const Index = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()


  return (
    <div className='w-screen h-screen flex justify-center '>
      <section className='w-1/2 h-64 rounded-md bg-gray-500/40 my-20 flex flex-col'>  
        <h1 className='mx-auto text-2xl my-4'>Forgot your password?</h1>
        <h2 className='text-gray-400 text-xl mx-auto'> Please enter your email address :</h2>
        <label className='inline-block w-full mt-10 0'>
          <input type="email" placeholder='Email' className='w-full active:border-gray-400 !transition-all !duration-300 p-2 drop-shadow-2xl shadow-white bg-gray-800 h-12 ' {...register("email", {
            required: true
          })} />
          {errors.email && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid email</p>}
        </label>
      </section>
    </div>
  )
}

export default Index