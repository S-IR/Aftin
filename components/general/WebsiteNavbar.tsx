import Image from "next/image"
import { SearchIcon, BellIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from "next/link"
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg"
import { useEffect, useState } from "react"
import { navLink, navLinks } from "../../constants/NavLinks"
import Button from "./Button"
import { useRouter } from "next/router"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"
import { GrDesignsDropdown, ProductsDropdown, ProfileDropdown, StockImagesDropdown } from "../navbar"


function WebsiteNavbar() {

  const [activeSidebar, setActiveSidebar] = useState<null | 'ProfileDropdown' | 'ProductsDropdown' | 'ImagesDropdown' | 'GrDesignsDropdown'>(null)
  const [user, userLoading] = useAuthState(auth)


  //this exit state is meant to stop the setting of the hover state if the navbar dropdown is animating out. It sets a value with the current dropdown state that's animating out. On hovering the text the code first checks if the navbar hovered is the same as the one that's animating out, and if it is it doesn't do anything
  const [exitedDropdown, setExitedDropdown] = useState<null | navLink["DropdownState"]>(null)

  function NavbarHoverSwitch(target: typeof activeSidebar) {
    switch (target) {
      case ('ImagesDropdown'):
        return (
          <CSSTransition
            in={activeSidebar === 'ImagesDropdown'}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
            onExit={() => setExitedDropdown(`ImagesDropdown`)}
            onExited={() => setExitedDropdown(null)}
          >
            <StockImagesDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        )
      case ('ProductsDropdown'):
        return (
          <CSSTransition
            in={activeSidebar === 'ProductsDropdown'}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
            onExit={() => setExitedDropdown(`ProductsDropdown`)}
            onExited={() => setExitedDropdown(null)}
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
            onExit={() => setExitedDropdown(`GrDesignsDropdown`)}
            onExited={() => setExitedDropdown(null)}
          >
            <GrDesignsDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        )
    }
  }

  const router = useRouter()

  return (
    <>
      <nav className="bg-gray-900 shadow-lg shadow-black w-full sticky top-0 z-[120] flex items-center h-[75px]  navbar z-5 "      >

        <ul className="grow-1 h-max md:flex flex-1 font-bold space-x-10 md:space-x-6 px-4 md:px-8 hidden ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="flex flex-1 items-center space-x-1 h-[50px] cursor-pointer relative "
              onMouseOver={() => { if (exitedDropdown !== nav.DropdownState) return setActiveSidebar(nav.DropdownState) }}
              onMouseLeave={() => setActiveSidebar(null)}
              onClick={() => router.push(nav.url)}
            >
              <>
                <p className="text-md md:text-lg font-serif " >
                  {nav.title}
                </p>
                {NavbarHoverSwitch(nav.DropdownState)}
              </>
            </li>
          ))}
        </ul>
        <div className="grow-0 flex flex-1 space-x-2  items-center justify-center w-min mx-4">

          <button className="mt-1 !h-8 general-buttons" onClick={() => router.push('/login')} >
            Login
          </button>
          <button className="mt-1 !h-8 general-buttons" onClick={() => router.push('/login')} >
            Sign Up
          </button>
          <button className=""
            onClick={() => activeSidebar === 'ProfileDropdown' ?
              setActiveSidebar(null) : setActiveSidebar('ProfileDropdown')}
          >
            {user && user.photoURL ? <Image
              src={user.photoURL}
              width={48}
              height={48}
              alt={'user profile picture'}
              className={'rounded-full  mx-2 '}

            /> :
              <UserCircleIcon className="w-8 h-8" />
            }
          </button>
          {activeSidebar === 'ProfileDropdown' ? <ProfileDropdown setActiveSidebar={setActiveSidebar} /> : null}
        </div>

      </nav>
    </>
  )
}
export default WebsiteNavbar