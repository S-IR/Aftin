import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useGesture } from "@use-gesture/react";
import NextImage from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  useSpring,
  animated,
  config,
  to,
  AnimatedComponent,
} from "react-spring";
import FreeImageModal from "./FreeImageModal";
import PaidImageModal from "./PaidImageModal";
import PremiumIcon from "./PremiumIcon";
import { isMobile } from "react-device-detect";
import { ImgDoc } from "../../typings/image-types/ImageTypes";

interface props {
  doc: ImgDoc;
  loginStatus: "not logged in" | "unauthorized" | "bronze" | "silver" | "gold";
}

function SingleImage({ doc, loginStatus }: props) {
  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // function to get the w and h of the image
  const [w, setWidth] = useState(0);
  const [h, setHeight] = useState(0);

  const target = useRef<null | HTMLDivElement>(null);

  //get the image width and height

  return (
    <div className="relative flex h-max w-max justify-center rounded-md align-middle brightness-75 filter-none transition-all duration-300 hover:filter">
      {doc.paid === `silver` || doc.paid === "gold" ? (
        <PaidImageModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ) : (
        <FreeImageModal
          url={doc.url}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          w={w}
          h={h}
          alt={doc.description}
          loginStatus={loginStatus}
        />
      )}
      <animated.div
        ref={target}
        className="relative h-auto w-auto cursor-pointer rounded-lg  filter-none   transition duration-300 ease-in-out hover:filter "
        onMouseEnter={() => {
          setPremiumText(true);
        }}
        onMouseLeave={() => {
          setPremiumText(false);
        }}
        onClick={() => setOpenDialog(true)}
      >
        <NextImage
          src={doc.url}
          alt={doc.description}
          width={isMobile ? Math.min(doc.width, 256) : Math.min(doc.width, 512)}
          height={
            isMobile ? Math.min(doc.width, 256) : Math.min(doc.width, 512)
          }
          objectFit={`scale-down`}
          className="rounded-md   "
        />
        {doc.paid === `silver` ||
          (doc.paid === "gold" && <PremiumIcon premiumText={premiumText} />)}
      </animated.div>
    </div>
  );
}

export default SingleImage;
