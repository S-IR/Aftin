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
  function NavbarHoverSwitch(target: typeof activeSidebar) {
    switch (target) {
      case ('ImagesDropdown'):
        return (
          <CSSTransition
            in={activeSidebar === 'ImagesDropdown'}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <ImagesDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        )
      case ('ProductsDropdown'):
        return (
          <CSSTransition
            in={activeSidebar === 'ProductsDropdown'}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <ProductsDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        )
      case ('GrDesignsDropdown'):
        return (
          <CSSTransition
            in={activeSidebar === 'GrDesignsDropdown'}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <GrDesignsDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        )
    }
  }

  const router = useRouter()

  return (
    <>
      <nav className="w-full sticky top-0 z-[120] rounded-full h-[50px]"      >
        <div className={` flex items-center h-[50px] w-full navbar bg-gradient-to-r from-gray-900 via-fuchsia-900/30  to-gray-900 z-5 `}>
          <ul className="h-max md:flex flex-1 font-bold space-x-10 md:space-x-6 px-4 md:px-8 hidden ">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="flex flex-1 items-center space-x-1 h-[50px]"
                onMouseEnter={() => setActiveSidebar(nav.DropdownState)}
                onMouseLeave={() => setActiveSidebar(null)}
                ><>
                    {nav.title}
                    {NavbarHoverSwitch(nav.DropdownState)}
                  </>
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
            <Button className="mt-2" text={'Login'} handleOnClick={() => router.push('/login')} />
            <Button className="mt-2" text={'Sign Up'} handleOnClick={() => router.push('/login')} />
            <button
              onClick={() => activeSidebar === 'ProfileDropdown' ?
                setActiveSidebar(null) : setActiveSidebar('ProfileDropdown')}
            >
              {<UserCircleIcon className=" w-8 h-8 cursor-pointer hover:bg-gray-500 bg-opacity-30 hover:rounded-full transition-all duration-300" />}
            </button>
          </div>

        </div>
      </nav>
    </>
  )
}
export default Navbar