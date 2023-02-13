import { FacebookOutlined } from "@mui/icons-material";
import React from "react";

interface props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  w?: "sm" | "md" | "lg" | "auto";
  h?: "sm" | "md" | "lg" | "auto";
}

const heightObj = {
  sm: "h-8",
  md: "h-16",
  lg: "h-32",
  auto: "h-auto",
};

const widthObj = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  auto: "w-auto",
};

const FacebookButton = ({ text, onClick, w, h }: props) => {
  return (
    <button
      onClick={onClick}
      className={`h-18 group flex  ${w ? widthObj[w] : `w-56`} ${
        h ? heightObj[h] : "h-18"
      } rounded-md bg-[#1877F2] p-2 font-['Helvetica'] `}
    >
      <FacebookOutlined width={16} height={16} className={"mr-2"} />
      <p className="transition-all duration-300 group-hover:text-black/60">
        {text}
      </p>
    </button>
  );
};

export default FacebookButton;
