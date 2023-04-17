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
import PremiumIcon from "./PremiumIcon";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../typings/typings";
import Loading from "./Loading";
import { checkImageGalleryClick } from "../../model/client-side/image-gallery/dialogButtons";
import { uploadImageToCanvas } from "../../model/client-side/image-editor/Upload";
import { useCanvasState } from "../../zustand/CanvasStore/store";
import { galleryImageDialog } from "./SiteGallery";
import {
  changeModalText,
  changeModalType,
} from "../../zustand/ModalBoxStore/store";

interface props {
  imgDoc: ImgDoc;
  isMobile: boolean;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
  changeModalType: changeModalType;
}

function SingleImage({ imgDoc, isMobile, setDialog, changeModalType }: props) {
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
          onClick={() => setDialog({ name: `free`, imgDoc })}
        >
          <NextImage
            src={imgDoc.url}
            alt={imgDoc.description}
            width={isMobile ? 256 : 380}
            height={isMobile ? imgDoc.height / 6 : imgDoc.height / 3}
            objectFit={`cover`}
            className="rounded-md   "
            onLoad={() => setLoading(false)}
          />
          {imgDoc.tier === `silver` ||
            (imgDoc.tier === "gold" && (
              <PremiumIcon premiumText={premiumText} />
            ))}
        </animated.div>
      </div>
    </>
  );
}

export default SingleImage;

interface imageEditorProps {
  imgDoc: ImgDoc;
  loginStatus: LoginStatus;
  isMobile: boolean;
  pageId: number;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
  changeModalType: changeModalType;
}

export const SingleEditorImage = ({
  imgDoc,
  loginStatus,
  isMobile,
  pageId,
  changeModalType,
  setDialog,
}: imageEditorProps) => {
  const [ADD_IMAGE] = useCanvasState((state) => [state.ADD_IMAGE]);

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
            const checked = checkImageGalleryClick(
              loginStatus,
              imgDoc,
              setDialog,
              changeModalType
            );
            if (checked)
              return uploadImageToCanvas(
                ADD_IMAGE,
                pageId,
                undefined,
                imgDoc.url
              );
          }}
        >
          <NextImage
            src={imgDoc.url}
            alt={imgDoc.description}
            width={256}
            height={imgDoc.height / 4}
            objectFit={`scale-down`}
            className="rounded-md   "
            onLoad={() => setLoading(false)}
          />
          {imgDoc.tier === `silver` ||
            (imgDoc.tier === "gold" && (
              <PremiumIcon premiumText={premiumText} />
            ))}
        </animated.div>
      </div>
    </>
  );
};
