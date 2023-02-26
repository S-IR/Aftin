import Head from "next/head";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaAngleDoubleLeft, FaIcons } from "react-icons/fa";
import { BiText, BiPalette } from "react-icons/bi";
import { MdOutlineDoubleArrow, MdOutlineDraw } from "react-icons/md";
import {
  CSSTransitionComp,
  DrawButtons,
  ImagesButtons,
  ShowLess,
  ShowMore,
  TextButtons,
  SidebarIcon,
  StylizeButtons,
} from "../../components/image-editor/Sidebar";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../Redux/hooks";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NextPage } from "next";
import { Layers, Panorama } from "@mui/icons-material";
import { DropzoneComp } from "../../components/image-editor";
import { useSpring, animated, useTransition } from "react-spring";
import LayoutButtons from "../../components/image-editor/Sidebar/LayoutButtons";
import {
  canvasElement,
  canvasPagesCount,
} from "../../features/canvasPages/canvas-elements/canvasPageSlice";
import { Tooltip } from "@mui/material";
import { activeSidebarType } from "../../components/image-editor/Sidebar/SidebarIcon";
import { ButtonMenuSwitch } from "../../model/client-side/image-editor/ButtonMenus";
import { useCanvasState } from "../../zustand/CanvasStore/store";
const Canvas = dynamic(() => import("../../components/image-editor/Canvas"), {
  ssr: false,
});
// import Canvas from '../../components/image-editor/Canvas'

const Index: NextPage = () => {
  //canvas  related code
  const [pages] = useCanvasState((state) => [state.pages]);
  const firstImage = pages[0].find(
    (element: canvasElement) => element.elementType === "image"
  );

  //sidebar buttons code
  const [activeSidebar, setActiveSidebar] =
    useState<activeSidebarType>("Images");
  const [showSidebar, toggleSidebar] = useState(true);

  const transition = useTransition(activeSidebar, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  return (
    <>
      <Head>
        <title>Food Image Editor</title>
      </Head>
      <div className="flex w-full ">
        <div className="fixed flex">
          <animated.section
            className={`flex h-[90vh] w-[7vw]  flex-col items-center bg-yellow-900   `}
          >
            <SidebarIcon
              Icon={<Panorama className="h-[5vh] w-[5vw]" />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text="Images"
            />
            <SidebarIcon
              Icon={<Layers className="h-[5vh] w-[5vw]" />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text="Layout"
            />
            <SidebarIcon
              Icon={<BiText className="h-[5vh] w-[5vw]" />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text="Text"
            />

            <SidebarIcon
              Icon={<BiPalette className="h-[5vh] w-[5vw]" />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text="Stylize"
            />

            <SidebarIcon
              Icon={<MdOutlineDraw className="h-[5vh] w-[5vw]" />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text="Draw"
            />
          </animated.section>
          {showSidebar ? (
            <button
              className=" absolute top-3 -right-4 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out  "
              onClick={() => toggleSidebar((v) => !v)}
            >
              <FaAngleDoubleLeft
                direction={"right"}
                color={"black"}
                className={"h-6 w-6"}
              />
            </button>
          ) : (
            <Tooltip title="Toggle sidebar">
              <button
                className={` ${
                  showSidebar ? ` opacity-0` : ` opacity-1`
                } absolute top-3 -right-4 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out`}
                onClick={() => toggleSidebar((v) => !v)}
              >
                <MdOutlineDoubleArrow className="h-16 w-16 md:h-8 md:w-8 " />
              </button>
            </Tooltip>
          )}
          {showSidebar &&
            transition((style, item) => {
              return (
                <animated.section
                  style={style}
                  className={`h-[90vh] ${
                    showSidebar ? `` : `-left-52 w-[0px] opacity-0`
                  }w-auto absolute left-[7vw] `}
                >
                  {ButtonMenuSwitch(item, setActiveSidebar)}
                </animated.section>
              );
            })}
        </div>

        {firstImage ? (
          <Canvas showSidebar={showSidebar} />
        ) : (
          <DropzoneComp
            showSidebar={showSidebar}
            setActiveSidebar={setActiveSidebar}
          />
        )}
      </div>
    </>
  );
};

export default Index;
