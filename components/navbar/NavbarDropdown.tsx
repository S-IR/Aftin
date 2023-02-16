import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavbarImageLink } from "../../constants/imageCategories";
import GrDesignsDropdown from "./GrDesignsDropdown";
import NavbarImageCategory from "./NavbarImageCategory";
import MoreDropdown from "./MoreDropdown";
import AdvertImagesDropdown from "./AdvertImagesDropdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navLink } from "../../constants/NavLinks";
import { useSpring, animated, useTransition } from "react-spring";

interface props {
  setActiveSidebar: Dispatch<SetStateAction<navLink["DropdownState"]>>;
  activeSidebar: navLink["DropdownState"];
}
const NavbarDropdown = ({ activeSidebar, setActiveSidebar }: props) => {
  const transition = useTransition(activeSidebar, {
    from: { opacity: 0, translateY: -20 },
    enter: { opacity: 1, translateY: 0 },
    leave: { opacity: 0, translateY: 20 },
    config: { duration: 100 },
  });

  function NavbarHoverSwitch(target: typeof activeSidebar) {
    switch (target) {
      case "ImagesDropdown":
        return <AdvertImagesDropdown />;
      case "MoreDropdown":
        return <MoreDropdown />;
      case "GrDesignsDropdown":
        return <GrDesignsDropdown />;
      default:
        return;
    }
  }
  return (
    <>
      {transition((style, item) => {
        return (
          <animated.section
            style={style}
            className={`absolute top-[75px] flex  w-full justify-center overflow-hidden rounded-sm bg-gray-900  align-middle shadow-md shadow-gray-800  transition-all duration-300 ease-in-out`}
            onMouseLeave={() => setActiveSidebar(null)}
          >
            {NavbarHoverSwitch(item)}
          </animated.section>
        );
      })}
    </>
  );
};

export default NavbarDropdown;
