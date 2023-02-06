import { ShareIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { BiPalette } from "react-icons/bi";
import {
  MdBlurOff,
  MdDesignServices,
  MdHighQuality,
  MdWeb,
} from "react-icons/md";
import { useSpring, animated } from "react-spring";

interface props {
  setActiveSidebar: Dispatch<
    SetStateAction<
      | "ProfileDropdown"
      | "ProductsDropdown"
      | "ImagesDropdown"
      | "GrDesignsDropdown"
      | null
    >
  >;
}

const ProductsDropdown = ({ setActiveSidebar }: props) => {
  const style = useSpring({
    from: { opacity: 0, translateX: 0 },
    to: { opacity: 1, translateX: 20 },
    config: { duration: 300 },
  });
  return (
    <animated.div
      style={style}
      className="z-50 flex h-auto  w-max  overflow-hidden rounded-sm bg-gray-900 p-2  "
    >
      <div className=" 0 mx-1 flex w-72 flex-col items-center">
        <p className=" font-serif text-2xl">Enhance your images</p>
        {/* Edit images */}
        <Link href="/image-editor">
          <a className="group m-1 flex h-12 w-full cursor-pointer items-center rounded-lg bg-black/30 transition-all duration-300 hover:bg-black/50">
            <BiPalette className="h-[32px] w-[32px] transition-all duration-300 group-hover:h-[40px] group-hover:w-[40px]" />
            <p className="m-2 w-auto flex-nowrap font-serif font-bold text-gray-300   transition-all duration-300 group-hover:translate-x-1">
              {" "}
              Edit images
            </p>
          </a>
        </Link>
        {/* Increase image resolution */}
        <Link href="/image-scaler">
          <a className="group m-1 flex h-12 w-full cursor-pointer items-center rounded-lg bg-black/30 transition-all duration-300 hover:bg-black/50">
            <MdHighQuality className="h-[32px] w-[32px] transition-all duration-300 group-hover:h-[40px] group-hover:w-[40px]" />
            <p className="m-2 w-auto flex-nowrap font-serif font-bold text-gray-300   transition-all duration-300 group-hover:translate-x-1">
              {" "}
              Increase image resolution
            </p>
          </a>
        </Link>
        {/* AI based image enhancer */}
        <Link href="/image-enhancer">
          <a className="group m-1 flex h-12 w-full cursor-pointer items-center rounded-lg bg-black/30 transition-all duration-300 hover:bg-black/50">
            <MdBlurOff className="h-[32px] w-[32px] transition-all duration-300 group-hover:h-[40px] group-hover:w-[40px]" />
            <p className="m-2 w-auto flex-nowrap font-serif font-bold text-gray-300   transition-all duration-300 group-hover:translate-x-1">
              Unblur images
            </p>
          </a>
        </Link>
      </div>
      {/* Hire a professional */}
      <div className=" mx-1 flex w-72 flex-col items-center ">
        <p className=" font-serif text-2xl ">Hire a professional</p>
        {/* Request a graphic design */}
        <a className="group m-1 flex h-12 w-full cursor-pointer items-center rounded-lg bg-black/30 transition-all duration-300 hover:bg-black/50">
          <MdDesignServices className="h-[32px] w-[32px] transition-all duration-300 group-hover:h-[40px] group-hover:w-[40px]" />
          <p className="m-2 w-auto flex-nowrap font-serif font-bold text-gray-300   transition-all duration-300 group-hover:translate-x-1">
            {" "}
            Request a graphic design
          </p>
        </a>

        {/* Manage social media */}
        <a className="group m-1 flex h-12 w-full cursor-pointer items-center rounded-lg bg-black/30 transition-all duration-300 hover:bg-black/50">
          <ShareIcon className="h-[32px] w-[32px] transition-all duration-300 group-hover:h-[40px] group-hover:w-[40px]" />
          <p className="m-2 w-auto flex-nowrap font-serif font-bold text-gray-300  transition-all duration-300 group-hover:translate-x-1">
            {" "}
            Manage social media
          </p>
        </a>
      </div>
    </animated.div>
  );
};

export default ProductsDropdown;
