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
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../typings/typings";

interface props {
  doc: ImgDoc;
  loginStatus: LoginStatus;
  isMobile: boolean;
}

function SingleImage({ doc, loginStatus, isMobile }: props) {
  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false);
  const [dialog, setDialog] = useState<null | "free" | "paid">(null);

  // function to get the w and h of the image

  const target = useRef<null | HTMLDivElement>(null);

  //get the image width and height

  return (
    <div className="relative flex h-auto w-auto justify-center rounded-md align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter">
      <FreeImageModal
        doc={doc}
        dialog={dialog}
        setDialog={setDialog}
        loginStatus={loginStatus}
        isMobile={isMobile}
      />
      <PaidImageModal
        dialog={dialog}
        setDialog={setDialog}
        loginStatus={loginStatus}
      />

      <animated.div
        ref={target}
        className="relative h-auto w-auto cursor-pointer rounded-lg  filter-none  transition duration-300 ease-in-out hover:filter "
        onMouseEnter={() => {
          setPremiumText(true);
        }}
        onMouseLeave={() => {
          setPremiumText(false);
        }}
        onClick={() => setDialog("free")}
      >
        <NextImage
          src={doc.url}
          alt={doc.description}
          width={280}
          height={doc.height / 4}
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
