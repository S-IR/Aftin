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

/**
 * One single image in the commercial gallery section of the website

 */
function SingleImage({ imgDoc, isMobile, setDialog, changeModalType }: props) {
  // states that change based on mouse events

  const [premiumText, setPremiumText] = useState(false);

  const [loading, setLoading] = useState(false);

  // function to get the w and h of the image

  const target = useRef<null | HTMLDivElement>(null);

  const isPremiumImage = imgDoc.tier === "silver" || imgDoc.tier === "gold";
  return (
    <>
      {loading && (
        <div className={`  ${loading ? "block" : "hidden"}`}>
          <Loading />
        </div>
      )}
      <div
        onMouseEnter={() => {
          setPremiumText(true);
        }}
        onMouseLeave={() => {
          setPremiumText(false);
        }}
        onClick={() => setDialog({ name: `free`, imgDoc })}
        style={{
          // width: Array.isArray(imgDoc.url)
          //   ? isMobile
          //     ? 384
          //     : 512
          //   : "fit-content",
          height: Array.isArray(imgDoc.url)
            ? isMobile
              ? imgDoc.height / 6
              : imgDoc.height / 3
            : "fit-content",
        }}
        className={`relative flex h-full w-full justify-center overflow-clip rounded-md border-2 border-dashed  border-orange-500/20 p-2 align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter ${
          loading ? "hidden" : "block"
        }`}
      >
        {Array.isArray(imgDoc.url) ? (
          imgDoc.url.map((url, i) => {
            return (
              <div
                ref={target}
                style={{
                  transform: `rotate(${
                    -15 + (i / (imgDoc.url.length - 1)) * 30
                  }deg) translate(-50%, -50%)`,
                }}
                className=" h absolute top-1/2 left-1/2 flex  h-fit w-fit  origin-bottom  cursor-pointer  items-start justify-start rounded-lg  align-top ease-in-out "
              >
                <NextImage
                  src={url}
                  alt={imgDoc.description}
                  width={isMobile ? 124 : 124}
                  height={isMobile ? imgDoc.height / 12 : imgDoc.height / 6}
                  style={{ objectFit: "scale-down" }}
                  className="rounded-md"
                  onLoad={() => setLoading(true)}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            );
          })
        ) : (
          <animated.div
            ref={target}
            className="relative flex  cursor-pointer  items-start  justify-start rounded-lg align-top filter-none transition duration-300 ease-in-out hover:filter "
            style={{
              height: isMobile
                ? imgDoc.height / 3
                : Math.round(imgDoc.height / 6),
              width: isMobile ? imgDoc.height / 3 : 384,
            }}
            onMouseEnter={() => {
              setPremiumText(true);
            }}
            onMouseLeave={() => {
              setPremiumText(false);
            }}
          >
            <NextImage
              src={imgDoc.url}
              alt={imgDoc.description}
              height={
                isMobile ? imgDoc.height / 3 : Math.round(imgDoc.height / 6)
              }
              width={isMobile ? imgDoc.height / 3 : 384}
              style={{ objectFit: "scale-down" }}
              className="h-full w-full"
              onLoad={() => setLoading(true)}
              onLoadingComplete={() => setLoading(false)}
            />
            {isPremiumImage && (
              <PremiumIcon
                premiumText={premiumText}
                tier={imgDoc.tier as "silver" | "gold"}
              />
            )}
          </animated.div>
        )}
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

/**
 * One single image in the gallery in the image editor

 */
export const SingleEditorImage = ({
  imgDoc,
  loginStatus,
  isMobile,
  pageId,
  changeModalType,
  setDialog,
}: imageEditorProps) => {
  const [ADD_IMAGE, CHANGE_PAGE_SIZE, width, height] = useCanvasState(
    (state) => [state.ADD_IMAGE, state.CHANGE_PAGE_SIZE, state.w, state.h]
  );
  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false);

  const [loading, setLoading] = useState(false);

  // function to get the w and h of the image

  //get the image width and height
  const isPremiumImage = imgDoc.tier === "silver" || imgDoc.tier === "gold";

  return (
    <>
      {loading && (
        <div className={`  ${loading ? "block" : "hidden"}`}>
          <Loading />
        </div>
      )}

      <animated.div
        className="relative m-2 h-min w-min cursor-pointer  rounded-lg  filter-none transition duration-300 ease-in-out hover:filter "
        onMouseEnter={() => {
          setPremiumText(true);
        }}
        onMouseLeave={() => {
          setPremiumText(false);
        }}
        style={{
          width: 96,
          height: 96,
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
              CHANGE_PAGE_SIZE,
              width,
              height,
              pageId,
              undefined,
              imgDoc.url
            );
        }}
      >
        {Array.isArray(imgDoc.url) ? (
          imgDoc.url.map((url, i) => {
            return (
              <div
                style={{
                  transform: `rotate(${
                    -15 + (i / (imgDoc.url.length - 1)) * 30
                  }deg) translate(-50%, -50%)`,
                  width: isMobile ? 256 : 64,
                  height: isMobile ? 256 : 64,
                }}
                className=" h absolute top-1/2 left-1/2 flex  h-fit w-fit  origin-bottom  cursor-pointer  items-start justify-start rounded-lg  align-top ease-in-out "
              >
                <NextImage
                  src={url}
                  alt={imgDoc.description}
                  height={isMobile ? 64 : 128}
                  width={isMobile ? 64 : 128}
                  style={{ objectFit: "scale-down" }}
                  className="rounded-md"
                  onLoad={() => setLoading(true)}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            );
          })
        ) : (
          <NextImage
            src={imgDoc.url}
            alt={imgDoc.description}
            height={isMobile ? 64 : 128}
            width={isMobile ? 64 : 128}
            style={{ objectFit: `scale-down` }}
            className="rounded-md   "
            onLoad={() => setLoading(true)}
            onLoadingComplete={() => setLoading(false)}
          />
        )}

        {isPremiumImage && (
          <PremiumIcon
            premiumText={premiumText}
            tier={imgDoc.tier as "silver" | "gold"}
          />
        )}
      </animated.div>
    </>
  );
};

interface DisplayAsCardsProps {
  imgDoc: ImgDoc;
  setPremiumText: React.Dispatch<React.SetStateAction<boolean>>;
}
