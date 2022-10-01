import Image from "next/image"
import { SearchIcon, BellIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from "next/link"
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg"
import { useEffect, useState } from "react"
import { navLinks } from "../constants/NavLinks"
import useAuth from "../hooks/useAuth"
import NavbarDropdown from "./navbarDropdown"

function Navbar() {

  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  const { logout } = useAuth()

  return (


    <nav className="w-full fixed z-[120] rounded-full">
      <div className={`h-18 flex items-center w-full navbar bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 z-50 `}>
        <ul className="md:flex flex-1 font-bold space-x-10 md:space-x-6 px-4 md:px-8 hidden ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="flex flex-1 items-center space-x-1"
            ><a
              href={nav.id}
              className="border-gray-700 rounded-lg hover:text-gray-400/50 transition ease-in-out duration-300 flex-shrink-0 font-poppins  "
            >{nav.title}
              </a>
              <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            </li>
          ))}
        </ul>

        <div className="px-4 md:px-6 overflow-auto z-50">
          <Image
            src={aftinLogo}
            width={75}
            height={75}
            alt="Aftin Logo"
          />
        </div>

        <div className="flex flex-1 space-x-4  items-center">
          <input type="text" placeholder="Search for an image" className="searchbox w-12 h-8 !ml-1"></input>
          <button className="general-buttons my-6">
            Login
          </button>
          <button className="general-buttons my-6">
            Sign up
          </button>
          <button
            onClick={() => setOpenUserDropdown(!openUserDropdown)}
          >
            {<UserCircleIcon className="w-8 h-8 cursor-pointer hover:bg-gray-500 bg-opacity-30 hover:rounded-full transition-all duration-300" />}
          </button>
          {openUserDropdown && <NavbarDropdown />}
        </div>
      </div>
    </nav>
  )
}
export default Navbar