import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { resetPassword } from '../../model/server-side/sendEmail'


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

  const [statusOfMail, setStatusOfMail] = useState<null | "If the email you've provided is of a real user account then a reset password mail with further instructions will be sent to your email address">(null)

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const res = await resetPassword(email)
    console.log('reset password res: ', res)
    
    if(res.status === 500) return alert('There was an internal server error, please try again later')
    setStatusOfMail('If the email you\'ve provided is of a real user account then a reset password mail with further instructions will be sent to your email address')
  }
  return (
    <div className='w-screen h-screen flex justify-center '>
      <section className='w-1/2 h-64 rounded-md bg-gray-500/40 my-20 flex flex-col'>
        <h1 className='mx-auto text-2xl my-4'>Forgot your password?</h1>
        <h2 className='text-gray-400 text-xl mx-auto'> Please enter your email address :</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='inline-block w-full mt-10 0'>
            <input type="email" placeholder='Email' className='w-full active:border-gray-400 !transition-all !duration-300 p-2 drop-shadow-2xl shadow-white bg-gray-800 h-12 ' {...register("email", {
              required: true
            })} />
            {errors.email && <p className='p-1 text-[13px] text-orange-500'>
              Please enter a valid email</p>}
          </label>
          <button type='submit' className='general-buttons !m-0' >Submit
          </button>
          {statusOfMail && 
          <p className='text-2xl'>{statusOfMail}</p>
          }
        </form>

      </section>
    </div>
  )
}

export default Index