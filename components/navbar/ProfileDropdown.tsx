import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  UserIcon,
  LogoutIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";
import ProfileDropdownRow from "./ProfileDropdownRow";
import { User } from "firebase/auth";
import Image from "next/legacy/image";
import { useSpring, useTransition, animated } from "react-spring";

interface props {
  user: User;
  activeSidebar:
    | null
    | "ProfileDropdown"
    | "ProductsDropdown"
    | "ImagesDropdown"
    | "GrDesignsDropdown";
}

function ProfileDropdown({ user, activeSidebar }: props) {
  const style = useSpring({
    from: { opacity: 0, rotateY: 10, translateX: 2 },
    to: {
      opacity: activeSidebar === "ProfileDropdown" ? 1 : 0,
      rotateY: activeSidebar === "ProfileDropdown" ? 0 : 10,
      translateX: activeSidebar === "ProfileDropdown" ? 0 : 2,
    },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={style}
      className="absolute top-[58px] right-16 z-50 w-auto overflow-hidden rounded-sm  bg-black p-5  "
    >
      <div className=" mb-10  flex h-auto flex-col items-center justify-center border-b-2 border-gray-200/40 p-8   align-middle shadow-gray-700 ">
        <div className="mt-2 mb-2 h-[75px] w-[75px]">
          {user.photoURL ? (
            <Image
              width={75}
              height={75}
              alt={"user profile picture"}
              src={user.photoURL}
              className={"rounded-full"}
            />
          ) : (
            <UserCircleIcon className="w-[75px h-[75px] rounded-full" />
          )}
        </div>

        <bdi className="text-lg text-gray-200">{user.email}</bdi>
        <bdi className="text-lg text-gray-200">{user.displayName}</bdi>
      </div>

      <div className="w-full grid-rows-2 space-y-5">
        <ProfileDropdownRow text={"Profile"} href={"/profile"} />
        <ProfileDropdownRow text={"Logout"} />
        <ProfileDropdownRow text={"About Us"} href={"/about-us"} />
      </div>
    </animated.div>
  );
}

export default ProfileDropdown;
