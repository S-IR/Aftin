import React, { ReactComponentElement } from "react";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import { Url } from "url";
import Loading from "../general/Loading";

interface props {
  text: string;
  href?: string;
}
const ProfileDropdownRow = ({ text, href }: props) => {
  const [signUp, signIn, logout, loading] = useAuth();

  if (text === "Logout") {
    return (
      <div className="it my-2 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm  border-y-2 border-gray-400/20 p-2 transition-all duration-300 hover:bg-gray-900 hover:text-gray-300">
        <button
          onClick={logout}
          className="cursor-pointer font-sans text-xl transition-all duration-300  hover:text-gray-300"
        >
          {text}
        </button>
      </div>
    );
  } else {
    return (
      <Link href={href as string} legacyBehavior>
        <div className="it group my-2 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm  border-y-2 border-gray-400/20 p-2 transition-all duration-300 hover:bg-gray-900 hover:text-gray-300">
          <a className="cursor-pointer font-sans text-xl transition-all duration-300  hover:text-gray-300">
            {text}
          </a>
        </div>
      </Link>
    );
  }
};

export default ProfileDropdownRow;
