import React, { ReactComponentElement } from 'react'
import useAuth from '../../hooks/useAuth'
import Link from "next/link"


interface props {
  Icon: JSX.Element|  JSX.Element[]
  text: string
  href: `/${string}`
}
const ProfileDropdownRow = ({ Icon, text, href }: props) => {
  const { logout } = useAuth()

  if (text === 'Logout') {
    return (
      <div className='flex items-center space-x-2 hover:translate-x-1 transition-all duration-300'>
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
      <Link href={href} >

      <div className='flex items-center space-x-2 hover:translate-x-1 transition-all duration-300 group '>
        {Icon}
        <a
          className="cursor-pointer hover:text-purple-300 transition-all duration-300 ">
          {text}
        </a> 

      </div>
      </Link>

    )
  }

}

export default ProfileDropdownRow