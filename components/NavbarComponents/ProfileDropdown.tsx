import React from 'react'
import { UserIcon, LogoutIcon, InformationCircleIcon } from '@heroicons/react/solid'
import useAuth from '../../hooks/useAuth'
import ProfileDropdownRow from './ProfileDropdownRow'


function ProfileDropdown() {
  const { logout } = useAuth()

  return (
    <>
      <div className='bg-gray-500 p-2 absolute top-[58px] right-0 translate-x-[-45%] overflow-hidden w-auto z-50 rounded-lg'>
        <div className='grid-rows-2 space-y-5'>
          <ProfileDropdownRow 
          Icon={<UserIcon  width={16} height={16}/>}
          text={'Profile'}
          href={'/profile'}
          />
          <ProfileDropdownRow 
          Icon={<LogoutIcon width={16} height={16} />}
          text={'Logout'}
          href={''}
          />
          <ProfileDropdownRow 
          Icon={<InformationCircleIcon onClick={logout} width={16} height={16} />}
          text={'About Us'}
          href={'/about-us'}
          />
        </div>
      </div>
    </>
  )
}

export default ProfileDropdown

