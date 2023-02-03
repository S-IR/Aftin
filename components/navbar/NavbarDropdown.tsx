import React, { Dispatch, SetStateAction, useState } from "react";
import { NavbarImageLink } from "../../constants/imageCategories";
import GrDesignsDropdown from "./GrDesignsDropdown";
import NavbarImageCategory from "./NavbarImageCategory";
import ProductsDropdown from "./ProductsDropdown";
import StockImagesDropdown from "./StockImagesDropdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navLink } from "../../constants/NavLinks";

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
  activeSidebar:
    | null
    | "ProfileDropdown"
    | "ProductsDropdown"
    | "ImagesDropdown"
    | "GrDesignsDropdown";
}
const NavbarDropdown = ({ activeSidebar, setActiveSidebar }: props) => {
  function NavbarHoverSwitch(target: typeof activeSidebar) {
    switch (target) {
      case "ImagesDropdown":
        return (
          <CSSTransition
            in={activeSidebar === "ImagesDropdown"}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <StockImagesDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        );
      case "ProductsDropdown":
        return (
          <CSSTransition
            in={activeSidebar === "ProductsDropdown"}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <ProductsDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        );
      case "GrDesignsDropdown":
        return (
          <CSSTransition
            in={activeSidebar === "GrDesignsDropdown"}
            unmountOnExit
            timeout={700}
            classNames={`navbarDropdown`}
          >
            <GrDesignsDropdown setActiveSidebar={setActiveSidebar} />
          </CSSTransition>
        );
    }
  }

  return (
    <section
      className="absolute top-[75px] flex h-auto w-full justify-center overflow-hidden rounded-sm bg-gray-900 p-2 align-middle shadow-md shadow-gray-800 "
      onMouseLeave={() => setActiveSidebar(null)}
    >
      {NavbarHoverSwitch(activeSidebar)}
    </section>
  );
};

export default NavbarDropdown;
