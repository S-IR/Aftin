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
import { useAppDispatch } from "../../Redux/hooks";
import { checkImageGalleryClick } from "../../model/client-side/subCat/modalButtons";
import { uploadImageToCanvas } from "../../model/client-side/image-editor/Upload";
import ServerErrorDialog from "./dialog-boxes/ServerErrorDialog";
import { useCanvasState } from "../../zustand/CanvasStore/store";

interface props {
  doc: ImgDoc;
  loginStatus: LoginStatus;
  isMobile: boolean;
}

export type galleryImageDialog =
  | "free"
  | "paid"
  | "login"
  | "internalServerError";

function SingleImage({ doc, loginStatus, isMobile }: props) {
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
        className={`relative flex h-auto w-auto justify-center rounded-md align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter ${
          loading ? "hidden" : "block"
        }`}
      >
        <ServerErrorDialog dialog={dialog} setDialog={setDialog} />
        <FreeImageModal
          doc={doc}
          dialog={dialog}
          setDialog={setDialog}
          loginStatus={loginStatus}
          isMobile={isMobile}
        />
        <PaidImageModal
          doc={doc}
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
        className={`relative m-1 flex h-auto w-auto justify-center rounded-md align-middle brightness-[0.8] filter-none transition-all duration-300 hover:filter ${
          loading ? "hidden" : "block"
        }`}
      >
        <PaidImageModal
          doc={doc}
          dialog={dialog}
          setDialog={setDialog}
          loginStatus={loginStatus}
        />
        <ServerErrorDialog dialog={dialog} setDialog={setDialog} />

        <animated.div
          ref={target}
          className="relative h-auto w-auto cursor-pointer rounded-lg  filter-none  transition duration-300 ease-in-out hover:filter "
          onMouseEnter={() => {
            setPremiumText(true);
          }}
          onMouseLeave={() => {
            setPremiumText(false);
          }}
          onClick={() => {
            const checked = checkImageGalleryClick(
              loginStatus,
              doc.tier,
              setDialog
            );
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
