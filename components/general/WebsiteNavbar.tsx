import Image from "next/image";
import { SearchIcon, BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg";
import { useEffect, useState } from "react";
import { navLink, navLinks } from "../../constants/NavLinks";
import Button from "./Button";
import { useRouter } from "next/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import {
  GrDesignsDropdown,
  NavbarDropdown,
  ProductsDropdown,
  ProfileDropdown,
  StockImagesDropdown,
} from "../navbar";
import styles from "../../styles/WebsiteNavbar.module.css";

function WebsiteNavbar() {
  const [activeSidebar, setActiveSidebar] = useState<
    | null
    | "ProfileDropdown"
    | "ProductsDropdown"
    | "ImagesDropdown"
    | "GrDesignsDropdown"
  >(null);
  const [user, userLoading] = useAuthState(auth);

  //this exit state is meant to stop the setting of the hover state if the navbar dropdown is animating out. It sets a value with the current dropdown state that's animating out. On hovering the text the code first checks if the navbar hovered is the same as the one that's animating out, and if it is it doesn't do anything
  const [exitedDropdown, setExitedDropdown] = useState<
    null | navLink["DropdownState"]
  >(null);

  const router = useRouter();

  return (
    <>
      <nav className="navbar z-5 sticky top-0 z-[120] flex h-[75px] w-full items-center bg-gray-900  shadow-lg shadow-black ">
        <ul className="grow-1 hidden h-max flex-1 space-x-10 px-4 font-bold md:flex md:space-x-6 md:px-8 ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`flex h-[50px]   flex-1  items-center space-x-1 
              `}
            >
              <>
                <p
                  className={`text-md font-serif font-thin italic md:text-lg ${styles.linkUnderline} cursor-pointer `}
                  onMouseOver={() => {
                    if (exitedDropdown !== nav.DropdownState)
                      return setActiveSidebar(nav.DropdownState);
                  }}
                  onMouseLeave={() => setActiveSidebar(null)}
                  onClick={() => router.push(nav.url)}
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
        <div className="mx-4 flex w-min flex-1  grow-0 items-center justify-center space-x-2">
          <button
            className="buttons-3 !h-8 !w-24 text-lg"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="buttons-3 !h-8 !w-24 whitespace-nowrap text-lg"
            onClick={() => router.push("/login")}
          >
            Sign Up
          </button>
          <button
            onClick={() =>
              activeSidebar === "ProfileDropdown"
                ? setActiveSidebar(null)
                : setActiveSidebar("ProfileDropdown")
            }
          >
            {user && user.photoURL ? (
              <Image
                src={user.photoURL}
                width={48}
                height={48}
                alt={"user profile picture"}
                className={"mx-2  rounded-full "}
              />
            ) : (
              <UserCircleIcon className="h-8 w-8" />
            )}
          </button>
          {activeSidebar === "ProfileDropdown" ? (
            <ProfileDropdown setActiveSidebar={setActiveSidebar} />
          ) : null}
        </div>
      </nav>
    </>
  );
}
export default WebsiteNavbar;
