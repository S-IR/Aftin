import React, { Dispatch, SetStateAction } from 'react'
import { UserIcon, LogoutIcon, InformationCircleIcon } from '@heroicons/react/solid'
import useAuth from '../../hooks/useAuth'
import ProfileDropdownRow from './ProfileDropdownRow'


interface props {
  setActiveSidebar: Dispatch<SetStateAction<"ProfileDropdown" | "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown" | null>>
}

function ProfileDropdown({ setActiveSidebar }: props) {
  const { logout } = useAuth()

  return (
    <>
      <div className="bg-general-gradient p-2 absolute top-[58px] right-10 overflow-hidden  z-50 rounded-lg w-40 shadow-md shadow-blue-200 "
      >

        <div className='grid-rows-2 space-y-5'>
          <ProfileDropdownRow
            Icon={<UserIcon width={16} height={16} className="group-hover:w-[20px] h-[20" />}
            text={'Profile'}
            href={'/profile'}
          />
          <ProfileDropdownRow
            Icon={<LogoutIcon width={16} height={16} className="group-hover:w-[20px] h-[20" />}
            text={'Logout'}
            href={''}
          />
          <ProfileDropdownRow
            Icon={<InformationCircleIcon onClick={logout} width={16} height={16} className="group-hover:w-[20px] h-[20" />}
            text={'About Us'}
            href={'/about-us'}
          />
        </div>
      </div>

    </>
  )
}

export default ProfileDropdown
