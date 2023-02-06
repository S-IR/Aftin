import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons/lib";
import styles from "../../../styles/image-editor/image-editor.module.css";

export type activeSidebarType =
  | "Upload"
  | "Layout"
  | "Images"
  | "Text"
  | "Stylize"
  | "Filters"
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
      className={`w-full grow border-l-2 px-6
    ${activeSidebar === Text ? "border-gray-500 bg-yellow-800/40" : ""}
    flex items-center
    justify-center transition-all duration-700`}
    >
      <button
        className={`${styles.sidebarIcons}`}
        onClick={() => setActiveSidebar(Text as activeSidebarType)}
      >
        {Icon}
        <p className="font-serif text-[3vh]">{Text}</p>
      </button>
    </div>
  );
};

export default SidebarIcon;
