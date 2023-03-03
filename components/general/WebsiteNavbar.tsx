import Image from "next/image";
import { SearchIcon, BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { navLink, navLinks } from "../../constants/NavLinks";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { NavbarDropdown, ProfileDropdown } from "../navbar";
import styles from "../../styles/WebsiteNavbar.module.css";

function WebsiteNavbar() {
  const [activeSidebar, setActiveSidebar] =
    useState<navLink["DropdownState"]>(null);
  const [user, userLoading] = useAuthState(auth);

  //this exit state is meant to stop the setting of the hover state if the navbar dropdown is animating out. It sets a value with the current dropdown state that's animating out. On hovering the text the code first checks if the navbar hovered is the same as the one that's animating out, and if it is it doesn't do anything

  const router = useRouter();

  const navRef = useRef<null | HTMLDivElement>(null);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveSidebar(null);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(navRef);

  return (
    <>
      <nav
        className=" z-5 sticky top-0 z-[120] flex h-[75px] w-full items-center  bg-gradient-to-b from-gray-900 to-white/0 transition-all duration-300 hover:bg-gray-900 "
        ref={navRef}
      >
        <ul className="grow-1 hidden h-max flex-1 space-x-10 px-4 font-bold md:flex md:space-x-6 md:px-8 ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`flex h-[50px]   flex-1  items-center space-x-1 
              `}
            >
              <>
                <p
                  className={`textUnderline cursor-pointer font-serif  text-sm font-thin  `}
                  onClick={() => router.push(nav.url)}
                  onMouseEnter={() => setActiveSidebar(nav.DropdownState)}
                >
                  {nav.title}
                </p>
              </>
            </li>
          ))}
        </ul>
        <NavbarDropdown
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
        />
        <div className="mx-4 flex w-min flex-1  grow-0 items-center justify-center space-x-2 align-middle last:ml-auto">
          {!user && !userLoading && (
            <button
              className="buttons-3 !h-8 !w-24 text-lg"
              onClick={() => router.push("/login?form=login")}
            >
              Login
            </button>
          )}
          {!user && !userLoading && (
            <button
              className="buttons-3 !h-8 !w-24 whitespace-nowrap text-lg"
              onClick={() => router.push("/login?form=signUp")}
            >
              Sign Up
            </button>
          )}
          <button
            className="h-min w-min"
            onClick={() =>
              activeSidebar === "ProfileDropdown"
                ? setActiveSidebar(null)
                : setActiveSidebar("ProfileDropdown")
            }
          >
            <div className="mx-5 h-min w-min">
              {user && user.photoURL ? (
                <Image
                  src={user.photoURL}
                  width={75}
                  height={75}
                  alt={"user profile picture"}
                  className={"mx-2  rounded-full "}
                />
              ) : (
                <UserCircleIcon className="h-8 w-8" />
              )}
            </div>
          </button>
          {activeSidebar === "ProfileDropdown" && user ? (
            <ProfileDropdown user={user} activeSidebar={activeSidebar} />
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
}
export default WebsiteNavbar;
