import { FacebookOutlined, Google } from "@mui/icons-material";
import React from "react";
import { FcGoogle } from "react-icons/fc";

interface props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  w?: "sm" | "md" | "lg" | "auto";
  h?: "sm" | "md" | "lg" | "auto";
}

const heightObj = {
  sm: "h-4  md:h-8",
  md: "h-12  md:h-16",
  lg: "h-20  md:h-32",
  auto: "h-auto",
};

const widthObj = {
  sm: "h-4  md:w-16",
  md: "h-12  md:w-32",
  lg: "h-32  md:w-64",
  auto: "w-auto",
};

const FacebookButton = ({ text, onClick, w, h }: props) => {
  return (
    <button
      onClick={onClick}
      className={` flex ${w ? widthObj[w] : `w-56`} ${
        h ? heightObj[h] : "h-18"
      }  rounded-md bg-white p-2 font-['Helvetica'] text-black/60 transition-all duration-300 hover:text-black   `}
    >
      <FcGoogle className="mr-2 h-6 w-6" />
      <p>{text}</p>
    </button>
  );
};

export default FacebookButton;
