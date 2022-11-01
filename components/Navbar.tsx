import Image from "next/image"
import { SearchIcon, BellIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from "next/link"
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg"
import { useEffect, useState } from "react"
import { navLinks } from "../constants/NavLinks"
import useAuth from "../hooks/useAuth"
import Button from "./Button"
import { useRouter } from "next/router"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { GrDesignsDropdown, ImagesDropdown, ProductsDropdown, ProfileDropdown } from "./NavbarComponents"


function Navbar() {

  const [activeSidebar, setActiveSidebar] = useState<null | 'ProfileDropdown' | 'ProductsDropdown' | 'ImagesDropdown' | 'GrDesignsDropdown'>(null)
  const [menuHeight, setMenuHeight] = useState<number | null>(null)

  function calcHeight(el: HTMLDivElement) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const router = useRouter()

  return (
    <>
      <nav className="w-full sticky top-0 z-[120] rounded-full ">
        <div className={`h-[55px] flex items-center w-full navbar bg-gradient-to-r from-gray-900 via-fuchsia-900/30  to-gray-900 z-50 `}>
          <ul className=" md:flex flex-1 font-bold space-x-10 md:space-x-6 px-4 md:px-8 hidden ">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="flex flex-1 items-center space-x-1"
              >
                <button
                  onClick={() =>
                    activeSidebar === nav.DropdownState ?
                      setActiveSidebar(null) : setActiveSidebar(nav.DropdownState)}
                >{nav.title}</button>
                <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </li>
            ))}
          </ul>

          <div className="px-4 md:px-6 overflow-auto z-50 pt-[20px]">
            <Image
              src={aftinLogo}
              width={65}
              height={65}
              alt="Aftin Logo"
            />
          </div>

          <div className=" flex flex-1 space-x-4  items-center justify-center">
            <input type="text" placeholder="Search for an image" className="hidden md:flex searchbox w-12 h-8 !ml-1"></input>
            <Button text={'Login'} handleOnClick={() => router.push('/login')} />
            <Button text={'Sign Up'} handleOnClick={() => router.push('/login')} />
            <button
              onClick={() => activeSidebar === 'ProfileDropdown' ?
                setActiveSidebar(null) : setActiveSidebar('ProfileDropdown')}
            >
              {<UserCircleIcon className=" w-8 h-8 cursor-pointer hover:bg-gray-500 bg-opacity-30 hover:rounded-full transition-all duration-300" />}
            </button>

            {/* Dropdowns */}
            <CSSTransition
              in={activeSidebar === 'ProfileDropdown'}
              unmountOnExit
              timeout={200}
              classNames={`navbarDropdown`}
            >
              <ProfileDropdown />
            </CSSTransition>
            <CSSTransition
              in={activeSidebar === 'ProductsDropdown'}
              unmountOnExit
              timeout={200}
              classNames={`navbarDropdown`}
            >
              <ProductsDropdown />
            </CSSTransition>

            <CSSTransition
              in={activeSidebar === 'ImagesDropdown'}
              unmountOnExit
              timeout={200}
              classNames={`navbarDropdown`}
            >
              <ImagesDropdown />
            </CSSTransition>

            <CSSTransition
              in={activeSidebar === 'GrDesignsDropdown'}
              unmountOnExit
              timeout={200}
              classNames={`navbarDropdown`}
            >
              <GrDesignsDropdown />
            </CSSTransition>

          </div>

        </div>
      </nav>
    </>
  )
}
export default Navbar