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
  return (
    <section
      className="z-50 flex h-auto  w-max flex-col overflow-hidden rounded-sm bg-gray-900 p-2 shadow-md shadow-gray-800 "
      onMouseLeave={() => setActiveSidebar(null)}
    >
      <div className=" mx-1 flex w-72 flex-col items-center border-b-2 border-gray-800">
        <p className="m-2 font-serif text-lg ">Enhance your images</p>
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
              Fix images
            </p>
          </a>
        </Link>
      </div>
      {/* Hire a professional */}
      <div className=" mx-1 flex w-72 flex-col items-center drop-shadow-2xl">
        <p className="m-2 font-serif text-lg ">Hire a professional</p>
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
    </section>
  );
};

export default ProductsDropdown;
