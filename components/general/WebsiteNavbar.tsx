import Image from "next/image";
import { SearchIcon, BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { navLink, navLinks } from "../../constants/NavLinks";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { NavbarDropdown, ProfileDropdown } from "../navbar";
import styles from "../../styles/WebsiteNavbar.module.css";
import Link from "next/link";

let lastWidth = 0;

function WebsiteNavbar() {
  const [activeSidebar, setActiveSidebar] =
    useState<navLink["DropdownState"]>(null);
  const [user, userLoading] = useAuthState(auth);

  //this exit state is meant to stop the setting of the hover state if the navbar dropdown is animating out. It sets a value with the current dropdown state that's animating out. On hovering the text the code first checks if the navbar hovered is the same as the one that's animating out, and if it is it doesn't do anything

  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (lastWidth <= window.scrollY || lastWidth < 75) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      return (lastWidth = window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isPageThatNeedsTheBGBlack =
    router.pathname.includes("restaurant-advertisement-images/") ||
    router.pathname.includes("restaurant-graphic-designs/") ||
    router.pathname === "/";

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
        className={` z-5 sticky top-0 z-[120] flex h-[75px] w-screen items-center justify-center  
   transition-all duration-500 hover:bg-gray-900  ${
     isPageThatNeedsTheBGBlack
       ? `bg-black`
       : `bg-gradient-to-b from-black to-white/0`
   } ${isVisible ? `translate-y-0` : `-translate-y-48`} `}
        ref={navRef}
      >
        <ul className="grow-1 hidden h-max space-x-2 px-4  font-bold md:flex md:flex-1 md:space-x-6 md:px-8 ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`flex h-[50px]   flex-1  items-center space-x-1 
              `}
            >
              <>
                <p
                  className={`textUnderline cursor-pointer font-Handwriting  text-sm font-thin  `}
                  onClick={() => router.push(nav.url)}
                  onMouseEnter={() => setActiveSidebar(nav.DropdownState)}
                >
                  {nav.title}
                </p>
              </>
            </li>
          ))}
        </ul>
        <Link href={"/"}>
          <a>
            <button className="h-[60px] w-[60px]  rounded-full border-2 border-gray-700/40 transition-all duration-300 hover:border-gray-500/40">
              <Image
                src={"/frontend-used-images/croppedLogo.png"}
                width={60}
                height={60}
                className={"rounded-full"}
                objectFit={"scale-down"}
                alt={"Aftin Logo"}
              />
            </button>
          </a>
        </Link>

        <NavbarDropdown
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
        />
        <div className=" flex  w-[40vw]  flex-1  items-center justify-end  font-Handwriting ">
          {!user && !userLoading && (
            <button
              className="buttons-3 !h-8 !w-24 flex-1 text-lg"
              onClick={() => router.push("/login?form=login")}
            >
              Login
            </button>
          )}
          {!user && !userLoading && (
            <button
              className="buttons-3 !h-8 !w-24 flex-1 whitespace-nowrap text-lg"
              onClick={() => router.push("/login?form=signUp")}
            >
              Sign Up
            </button>
          )}
          <button
            className="z-10 mr-6 h-min w-min "
            onClick={() =>
              activeSidebar === "ProfileDropdown"
                ? setActiveSidebar(null)
                : setActiveSidebar("ProfileDropdown")
            }
          >
            <div className=" ml-auto mr-8 h-[35px] w-[35px] rounded-full border-2 border-dashed border-gray-500">
              {!userLoading && user && user.photoURL ? (
                <Image
                  src={user.photoURL}
                  width={25}
                  height={25}
                  alt={"user profile picture"}
                  className={`  mx-2 rounded-full  `}
                />
              ) : (
                <UserCircleIcon className="h-full w-full" />
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
