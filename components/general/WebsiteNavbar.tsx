import Image from "next/legacy/image";
import { SearchIcon, BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { navLink, navLinks } from "../../constants/Navbar/NavLinks";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { NavbarDropdown, ProfileDropdown } from "../navbar";
import styles from "../../styles/WebsiteNavbar.module.css";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import { useUserTier } from "../../hooks/useUserTier";

let lastWidth = 0;

const WebsiteNavbar = (): JSX.Element => {
  const [activeSidebar, setActiveSidebar] =
    useState<navLink["DropdownState"]>(null);
  const [user, userLoading] = useAuthState(auth);

  const loginStatus = useUserTier(user, userLoading);
  useEffect(() => {
    console.log("userTier", loginStatus);
  }, [loginStatus]);

  //this exit state is meant to stop the setting of the hover state if the navbar dropdown is animating out. It sets a value with the current dropdown state that's animating out. On hovering the text the code first checks if the navbar hovered is the same as the one that's animating out, and if it is it doesn't do anything

  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 75) setIsVisible(true);
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
        className={`z-5 sticky top-0 z-[120] flex h-[75px] w-screen max-w-full items-center justify-center  
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
                  className={`textUnderline mx-auto  cursor-pointer text-center font-Handwriting text-white `}
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
          <button className="h-[60px] w-[60px]  rounded-full border-2 border-gray-700/40 transition-all duration-300 hover:border-gray-500/40">
            <Image
              src={"/croppedLogo.png"}
              width={60}
              height={60}
              className={"rounded-full"}
              style={{ objectFit: "scale-down" }}
              alt={"Aftin Logo"}
            />
          </button>
        </Link>

        <NavbarDropdown
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
        />
        <div className=" flex  w-[40vw]  flex-1  items-center justify-end  font-Handwriting ">
          {!user && !userLoading && (
            <button
              className="buttons-3 mx-auto !h-8 !w-12 text-lg"
              onClick={() => router.push("/login?form=login")}
            >
              Login
            </button>
          )}
          {!user && !userLoading && (
            <button
              className="buttons-3 mx-auto !h-8 !w-auto whitespace-nowrap text-lg"
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
            {
              //user profile icon component
              userLoading ? (
                <PuffLoader
                  size={20}
                  color="orange"
                  className="ml-auto  mr-8 rounded-full "
                />
              ) : (
                <div
                  className={` ml-auto mr-8 flex h-[35px] w-[35px] items-center justify-center rounded-full border-dotted border-gray-500 align-middle transition-all  duration-300 hover:border-red-500 `}
                >
                  {user && user.photoURL !== null && (
                    <Image
                      src={user.photoURL}
                      width={25}
                      height={25}
                      alt={"user profile picture"}
                      className={` rounded-full  `}
                    />
                  )}
                  {user && !user.photoURL && (
                    <UserCircleIcon width={25} height={25} />
                  )}
                </div>
              )
            }
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
};
export default WebsiteNavbar;
