import { Restaurant } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { FirebaseError } from 'firebase-admin';
import { NextPage } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const Index: NextPage = () => {
  const [user, userLoading] = useAuthState(auth)
  const [loginStatus, setLoginStatus] = useState<null | 'not logged in' | 'unauthorized' | 'bronze' | 'silver' | 'gold'>(null)
  const router = useRouter()

  useEffect(() => {

    const fetchUserStatus = async () => {
      if (!user) return setLoginStatus('not logged in')
      const token = await user.getIdToken()
      console.log('user', user);

      const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`, { method: `POST`, body: token }).catch((err: FirebaseError) => console.log(err))
      if (fetchRes === undefined) return console.log('response on fetching user status void');
      const { status } = await fetchRes.json()
      setLoginStatus(status)
    }
    fetchUserStatus()
    }, [user])
   

  return (
    <div className=' flex h-[90vh]'>
      <section className='w-1/4 h-[90vh] bg-gradient-to-b bg-gray-700/40 flex items-center align justify-center'>
        <div className=' w-auto h-auto p-4 rounded-full border-2 border-white/20 '>
          {user && user.photoURL ? <Image
            src={user.photoURL}
            width={125}
            height={125}
            alt={'user profile picture'}
            className={'rounded-full '}

          />
            :
            <button className='w-[125px] h-[125px] rounded-full bg-black hover-bg-gray-600 transition-all duration-300  '>Upload a picture</button>
          }

        </div>


      </section>
      <section className='flex-grow flex flex-col  ml-2 shadow-lg space-y-4'>
        <p className='text-orange-400 font-serif text-4xl m-4'>User Profile</p>
        {/* USERNAME */}
        <div className=' flex flex-col  p-2 shadow-sm shadow-orange-800'>
          <p className='font-serif text-lg text-orange-800 last: '>Username</p>
          <div className='flex  p-2  '>
            <p className='text-orange-700 font-serif'>{user?.displayName}</p>
            <button className='ml-auto text-orange-700 font-serif hover:text-orange-500 transition-all duration-300 '>Modify Username</button>
          </div>
        </div>

        {/* EMAIL */}
        <div className=' flex flex-col  p-2 shadow-sm shadow-orange-800'>
          <p className='font-serif text-lg text-orange-800 last: '>Email</p>

          <div className='flex  p-2  '>

            <p className='text-orange-700 font-serif'>{user?.email}</p>
            <button className='ml-auto text-orange-700 font-serif hover:text-orange-500 transition-all duration-300 '>Modify Email</button>

          </div>
        </div>

        {/* PASSWORD */}
        <div className=' flex flex-col  p-2 shadow-sm shadow-orange-800'>
          <p className='font-serif text-lg text-orange-800 last: '>Password</p>
          <div className='flex  p-2  '>
            <button className=' text-orange-700 font-serif hover:text-orange-500 transition-all duration-300 '
            onClick={()=>router.push('/reset')}
            >
              Reset Password
            </button>

          </div>
        </div>

        {/* SUBSCRIPTION LEVEL  */}
        <div className=' flex flex-col  p-2 shadow-sm shadow-orange-800'>
          <p className='font-serif text-lg text-orange-800 last: '>Subscription Level</p>
          <div className='flex  p-2  '>
            <p className='text-orange-700 font-serif'>{loginStatus}</p>
            <button className='ml-auto text-orange-700 font-serif hover:text-orange-500 transition-all duration-300 '>{
              loginStatus !== 'gold' ?
                `Upgrade Account` :
                `Modify Subscription Level`
                }
            </button>

          </div>
        </div>

        <div className='mt-auto h-48 flex items-center justify-center align-middle  flex-col '>
          <Restaurant sx={{ width: 48, height: 48 }} color='action' />

          <Tooltip
            title='This survey will tell us more about yourself so that we can deliver images better suited for you'
            arrow
            placement='top-start'
          >
            <button className=' text-orange-700 font-serif hover:text-orange-500 transition-all duration-300 '>Help us improve your experience by completing this survey
            </button>

          </Tooltip>

        </div>


      </section>

    </div>



  )
}

export default Index