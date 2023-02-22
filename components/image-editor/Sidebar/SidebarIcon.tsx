import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons/lib";
import styles from "../../../styles/image-editor/image-editor.module.css";

export type activeSidebarType =
  | "Layout"
  | "Images"
  | "Text"
  | "Stylize"
  | "Draw";

interface props {
  Icon: JSX.Element;
  Text: string;
  setActiveSidebar: Dispatch<React.SetStateAction<activeSidebarType>>;
  activeSidebar: activeSidebarType;
}

const SidebarIcon = ({
  Icon,
  Text,
  setActiveSidebar,
  activeSidebar,
}: props) => {
  return (
    <div
      className={`w-full grow border-l-2  px-6
    ${
      activeSidebar === Text
        ? "border-yellow-500 bg-yellow-700 shadow-lg"
        : "border-yellow-700 shadow-none"
    }
    flex items-center 
    justify-center  !transition-all !duration-700`}
    >
      <button
        className={`flex cursor-pointer flex-col  items-center justify-center pt-4 text-gray-100 opacity-60   transition-all duration-500  hover:opacity-100   focus:rounded-sm`}
        onClick={() => setActiveSidebar(Text as activeSidebarType)}
      >
        {Icon}
        <p className="font-serif text-[3vh] text-yellow-200 ">{Text}</p>
      </button>
    </div>
  );
};

export default SidebarIcon;
