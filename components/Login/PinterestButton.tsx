import { FacebookOutlined, Google, Pinterest } from "@mui/icons-material";
import React from "react";

interface props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  w?: "sm" | "md" | "lg" | "auto" | "full";
  h?: "sm" | "md" | "lg" | "auto";
}

const heightObj = {
  sm: "h-10",
  md: "h-20",
  lg: "h-32",
  auto: "h-auto",
};
const widthObj = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  auto: "w-auto",
  full: "w-full",
};

/**
 * A component styled after the Pinterest login button
 */
const PinterestButton = ({
  text = "Login with Pinterest",
  onClick,
  w,
  h,
}: props) => {
  return (
    <button
      onClick={onClick}
      className={` flex ${w ? widthObj[w] : `w-56`} ${
        h ? heightObj[h] : "h-18"
      }  rounded-md bg-[#E60023] p-2 font-['Helvetica'] text-white transition-all duration-300 hover:text-gray-200   `}
    >
      <Pinterest className="mr-2 h-6 w-6" />
      <p>{text}</p>
    </button>
  );
};

export default PinterestButton;
