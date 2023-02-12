import React from "react";
import { NavbarMoreStyleType } from "./MoreDropdown";
import { animated } from "react-spring";
import { AspectRatio, Crop, Deblur, Preview } from "@mui/icons-material";

interface props {}

const NavbarEditImages = ({}: props) => {
  return (
    <animated.div className=" my-2 h-full w-full flex-col items-center justify-center space-y-6 pl-4 align-middle">
      <button className="flex space-x-4">
        <Crop width={16} height={16} color={"warning"} />
        <p className="text-orange-300">Deblur Images</p>
      </button>
      <button className="flex space-x-4">
        <AspectRatio width={16} height={16} color={"warning"} />
        <p className="text-orange-300">Increase Image Resolution</p>
      </button>
      <button className="flex space-x-4">
        <Deblur width={16} height={16} color={"warning"} />
        <p className="text-orange-300">Deblur Images</p>
      </button>
      <button className="flex space-x-4">
        <Preview width={16} height={16} color={"warning"} />
        <p className="text-orange-300">Preview Images</p>
      </button>
    </animated.div>
  );
};

export default NavbarEditImages;
