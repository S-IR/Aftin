import Image from "next/image"
import { SearchIcon, BellIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from "next/link"
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg"
import { useEffect, useState } from "react"
import { navLink, navLinks } from "../constants/NavLinks"
import useAuth from "../hooks/useAuth"
import Button from "./Button"
import { useRouter } from "next/router"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { GrDesignsDropdown, StockImagesDropdown, ProductsDropdown, ProfileDropdown } from "./NavbarComponents"


function Navbar() {

  const [activeSidebar, setActiveSidebar] = useState<null | 'ProfileDropdown' | 'ProductsDropdown' | 'ImagesDropdown' | 'GrDesignsDropdown'>(null)
  const [menuHeight, setMenuHeight] = useState<number | null>(null)


  function calcHeight(el: HTMLDivElement) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }
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
      <nav className="navbar-background w-full sticky top-0 z-[120] flex items-center h-[75px]  navbar  z-5 "      >

          <ul className="grow-1 h-max md:flex flex-1 font-bold space-x-10 md:space-x-6 px-4 md:px-8 hidden ">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="flex flex-1 items-center space-x-1 h-[50px] cursor-pointer"
                onMouseOver={() => { if (exitedDropdown !== nav.DropdownState) return setActiveSidebar(nav.DropdownState) }}
                onMouseLeave={() => setActiveSidebar(null)}
                onClick={() => router.push(nav.url)}
              ><>
              <p className="text-md md:text-lg font-serif" >
              {nav.title}

              </p>
                  {NavbarHoverSwitch(nav.DropdownState)}
                </>
              </li>
            ))}
          </ul>


          <div className="grow-0 flex flex-1 space-x-2  items-center justify-center w-min">

            <Button className="mt-1 !h-8" text={'Login'} handleOnClick={() => router.push('/login')} />
            <Button className="mt-1 !h-8" text={'Sign Up'} handleOnClick={() => router.push('/login')} />
            <button
              onClick={() => activeSidebar === 'ProfileDropdown' ?
                setActiveSidebar(null) : setActiveSidebar('ProfileDropdown')}
            >
              {<UserCircleIcon className=" w-8 h-8 cursor-pointer hover:bg-gray-500 bg-opacity-30 hover:rounded-full transition-all duration-300" />}
            </button>
            {activeSidebar === 'ProfileDropdown'? <ProfileDropdown setActiveSidebar={setActiveSidebar} />: null}
          </div>

      </nav>
    </>
  )
}
export default Navbar