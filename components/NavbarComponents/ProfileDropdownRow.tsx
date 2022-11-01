import React, { ReactComponentElement } from 'react'
import useAuth from '../../hooks/useAuth'

interface props {
  Icon: JSX.Element|  JSX.Element[]
  text: string
  href: `/${string}`
}
const ProfileDropdownRow = ({ Icon, text, href }: props) => {
  const { logout } = useAuth()

  if (text === 'Logout') {
    return (
      <div className='flex items-center space-x-2'>
        {Icon}
        <button
          onClick={logout}
          className="cursor-pointer hover:text-purple-300 transition-all duration-300 ">
          {text}
        </button>
      </div>
    )
  } else {
    return (
      <div className='flex items-center space-x-2'>
        {Icon}
        <a
          href={href}
          className="cursor-pointer hover:text-purple-300 transition-all duration-300 ">
          {text}
        </a>
      </div>
    )
  }

}

export default ProfileDropdownRow