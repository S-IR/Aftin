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
import Loading from "./Loading";
import { checkImageGalleryClick } from "../../model/client-side/image-gallery/dialogButtons";
import { uploadImageToCanvas } from "../../model/client-side/image-editor/Upload";
import { useCanvasState } from "../../zustand/CanvasStore/store";
import { galleryImageDialog } from "./SiteGallery";

interface props {
  doc: ImgDoc;
  loginStatus: LoginStatus;
  isMobile: boolean;
  dialog: null | galleryImageDialog;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
}

function SingleImage({ doc, loginStatus, isMobile, dialog, setDialog }: props) {
  // states that change based on mouse events

  const [premiumText, setPremiumText] = useState(false);

  const [loading, setLoading] = useState(true);

  // function to get the w and h of the image

  const target = useRef<null | HTMLDivElement>(null);

  //get the image width and height

  return (
    <>
      {loading && (
        <div className={`  ${loading ? "block" : "hidden"}`}>
          <Loading />
        </div>
      )}

      <div
        className={`relative flex h-fit w-fit justify-center rounded-md align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter ${
          loading ? "hidden" : "block"
        }`}
      >
        <animated.div
          ref={target}
          className="relative flex h-fit w-fit cursor-pointer  items-start  justify-start rounded-lg align-top filter-none transition duration-300 ease-in-out hover:filter "
          onMouseEnter={() => {
            setPremiumText(true);
          }}
          onMouseLeave={() => {
            setPremiumText(false);
          }}
          onClick={() => setDialog({ name: `free`, doc })}
        >
          <NextImage
            src={doc.url}
            alt={doc.description}
            width={isMobile ? 256 : 380}
            height={isMobile ? doc.height / 6 : doc.height / 3}
            objectFit={`cover`}
            className="rounded-md   "
            onLoad={() => setLoading(false)}
          />
          {doc.tier === `silver` ||
            (doc.tier === "gold" && <PremiumIcon premiumText={premiumText} />)}
        </animated.div>
      </div>
    </>
  );
}

export default SingleImage;

interface imageEditorProps {
  doc: ImgDoc;
  loginStatus: LoginStatus;
  isMobile: boolean;
  pageId: number;
}

export const SingleEditorImage = ({
  doc,
  loginStatus,
  isMobile,
  pageId,
}: imageEditorProps) => {
  const [ADD_IMAGE] = useCanvasState((state) => [state.ADD_IMAGE]);

  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false);
  const [dialog, setDialog] = useState<null | galleryImageDialog>(null);

  const [loading, setLoading] = useState(true);

  // function to get the w and h of the image

  const target = useRef<null | HTMLDivElement>(null);

  //get the image width and height

  return (
    <>
      {loading && (
        <div className={`  ${loading ? "block" : "hidden"}`}>
          <Loading />
        </div>
      )}

      <div
        className={`relative m-1 flex !h-min !w-min justify-center rounded-md align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter ${
          loading ? "hidden" : "block"
        }`}
      >
        <animated.div
          ref={target}
          className="relative h-min w-min cursor-pointer rounded-lg  filter-none  transition duration-300 ease-in-out hover:filter "
          onMouseEnter={() => {
            setPremiumText(true);
          }}
          onMouseLeave={() => {
            setPremiumText(false);
          }}
          onClick={() => {
            const checked = checkImageGalleryClick(loginStatus, doc, setDialog);
            if (checked)
              return uploadImageToCanvas(ADD_IMAGE, pageId, undefined, doc.url);
          }}
        >
          <NextImage
            src={doc.url}
            alt={doc.description}
            width={256}
            height={doc.height / 4}
            objectFit={`scale-down`}
            className="rounded-md   "
            onLoad={() => setLoading(false)}
          />
          {doc.tier === `silver` ||
            (doc.tier === "gold" && <PremiumIcon premiumText={premiumText} />)}
        </animated.div>
      </div>
    </>
  );
};
