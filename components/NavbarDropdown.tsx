import React from 'react'
import { UserIcon, LogoutIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { dropdownProfileLinks as elements } from "../constants/dropdownProfileLinks"
import Image from 'next/image'


function NavbarDropdown() {
  return (<>

    <div className='bg-gray-500 p-2 absolute top-[58px] right-0 translate-x-[-45%] overflow-hidden w-auto z-50 rounded-lg'>
      <div className='grid-rows-2 space-y-5'>
      {elements.map((element) => (
        <div key={element.text}  className='flex items-center  space-x-2 border-t-2 border-gray-500 '>
        {element.icon === 'UserIcon'? <UserIcon className='fr' width={16} height={16} />: <></>}
        {element.icon === 'LogoutIcon'? <LogoutIcon width={16} height={16} />: <></>}
        {element.icon === 'InformationCircleIcon'? <InformationCircleIcon width={16} height={16} />: <></>}
        <a
        href={element.link}
        className="cursor-pointer hover:text-purple-300 transition-all duration-300 "
        >
        {element.text}
        </a>
        </div>
          ))}
      </div>
    </div>
  </>
  )
}

export default NavbarDropdown

