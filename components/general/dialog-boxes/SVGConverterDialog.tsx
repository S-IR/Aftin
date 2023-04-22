import { Box, Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
import Image from "next/legacy/image";
import React, { FC, useEffect, useState } from "react";
import {
  PhotographIcon,
  CakeIcon,
  PencilIcon,
  DeviceMobileIcon,
  VariableIcon,
} from "@heroicons/react/solid";
import { AiFillEdit } from "react-icons/ai";
import { Base64Data, LoginStatus, UTF8Data } from "../../../typings/typings";
import { isMobile } from "react-device-detect";
import {
  ImgDoc,
  SecondDegreeCategory,
  paid_tier_array,
} from "../../../typings/image-types/ImageTypes";
import { useRouter } from "next/router";
import { galleryImageDialog } from "../SiteGallery";
import { canvasEditButtonDialog } from "../../image-editor/Canvas/CanvasEditButtons";
import {
  animated,
  useSpring,
  config,
  useTransition,
  useSpringRef,
} from "react-spring";
import { handleDownload } from "../../../model/client-side/image-gallery/dialogButtons";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Loading from "../Loading";
import NextImage from "next/legacy/image";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { User } from "firebase/auth";
import { downloadImage } from "../../../model/client-side/general/imagesFn";

interface props {
  dialog: null | canvasEditButtonDialog;
  setDialog: React.Dispatch<
    React.SetStateAction<null | canvasEditButtonDialog>
  >;
  beforeImageSrc: Base64Data<"png"> | undefined;
  width: number | undefined;
  height: number | undefined;
  user: User;
  loginStatus: LoginStatus;
}

const SVGConverterDialog: FC<props> = ({
  dialog,
  setDialog,
  beforeImageSrc,
  width,
  height,
  user,
  loginStatus,
}) => {
  //handles server error modal appearance

  //saves the image after it has been modified
  const [afterImage, setAfterImage] = useState<null | UTF8Data<"svg+xml">>(
    null
  );

  //toggles the before and after status
  const [imageToDisplay, setImageToDisplay] = useState<"Before" | "After">(
    "Before"
  );

  //react spring variables

  const transRef = useSpringRef();
  const transitions = useTransition(imageToDisplay, {
    keys: null,
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  //variable used in case of errors
  const [error, setError] = useState<string | null>(null);
  console.log(`loginStatus`, loginStatus, `user`, user);

  //used to display the  internal server error modal
  const changeModalType = useModalStore((store) => store.CHANGE_MODAL_TYPE);

  const downloadButtonStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: afterImage !== null ? 1 : 0 },
    config: config.gentle,
  });
  useEffect(() => {
    transRef.start();
  }, [imageToDisplay]);

  const errorDivStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: error !== null ? 1 : 0 },
    config: config.gentle,
  });

  const handleSubmit = async () => {
    // if the user is not logged in ask him to log in
    if (loginStatus === "not logged in" || loginStatus === "unauthorized") {
      console.log("placed the login first modal due to being unauthorized");

      return setDialog("login");
      //if the width and height is greater than 768 by 768 and the user is not premium
    }
    if (width * height > 589824 && !paid_tier_array.includes(loginStatus)) {
      console.log("setError on handleSubmit ran due to image being too big");
      return setError(
        "The image is too big for your current subscription tier. Increase your subscription level or modify another image in order to proceedc"
      );
    }
    setImageToDisplay("After");
    const userToken = await user.getIdToken();
    const res = await fetch("/api/image-transformation/toSVG", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ image: beforeImageSrc }),
    });
    if (res.status === 500) return changeModalType("server-error");
    if (res.status === 401) {
      const { message } = await res.json();
      return setError(message);
    }
    const svg = await res.text();
    const dataUrl = `data:image/svg+xml;utf8,${svg}` as const;
    setAfterImage(dataUrl);
  };
  if (
    beforeImageSrc === undefined ||
    width === undefined ||
    height === undefined
  )
    return <></>;

  const determineImageToDisplay = (item: "Before" | "After") => {
    switch (item) {
      case null:
        return <></>;
      case "Before":
        return (
          <ImageComponent
            imageSrc={beforeImageSrc}
            imageToDisplay={imageToDisplay}
            width={width}
            height={height}
          />
        );
      case "After":
        return (
          <ImageComponent
            imageSrc={afterImage}
            imageToDisplay={imageToDisplay}
            width={width}
            height={height}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <Dialog
      open={dialog === "svg-convert"}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return setDialog(null);
      }}
      maxWidth="xl"
      PaperProps={{
        className: `relative flex h-[85vh] w-[85vw] overflow-hidden  rounded-3xl bg-[url('/image-enhancing/imageEnhancingBG.svg')] align-middle drop-shadow-xl`,
      }}
    >
      <DialogTitle className="font-Handwriting text-2xl text-white  lg:text-4xl">
        Convert Image to a black and white SVG
      </DialogTitle>
      <DialogContent className="flex h-full w-full overflow-hidden">
        <section className=" flex h-full w-1/4  flex-col bg-gray-900/20 align-middle ">
          <div className="mb-auto mt-4 h-1/4 w-full">
            <button
              className="h-full w-full rounded-sm bg-yellow-800/60 p-2 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-600/60 lg:text-3xl "
              onClick={handleSubmit}
            >
              Start Conversion{" "}
            </button>
          </div>
          <div className="mt-auto flex h-auto w-full flex-col space-y-4">
            <animated.button
              style={downloadButtonStyle}
              onClick={() => downloadImage(afterImage as string)}
              className={` h-12 w-full  bg-yellow-800/60 p-2 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-600/60 ${
                afterImage !== null
                  ? `pointer-events-auto`
                  : `pointer-events-none`
              }`}
            >
              Download SVG
            </animated.button>

            <div className="relative  z-10 flex h-24 w-full flex-col items-center justify-center rounded-md  bg-yellow-900/20 align-middle transition-all duration-300 hover:bg-yellow-900/10">
              <h3 className="font-Handwriting text-4xl text-yellow-700 ">
                {imageToDisplay}
              </h3>
              <div className=" z-10 flex h-auto w-full items-center justify-center align-middle">
                <button
                  onClick={() => setImageToDisplay("Before")}
                  className=" group  h-auto w-auto duration-300"
                >
                  <ArrowLeft
                    color={"warning"}
                    className="!h-8 !w-8 transform opacity-100 transition-opacity duration-300 group-hover:opacity-50"
                  />
                </button>
                <button
                  disabled={imageToDisplay === "Before" && afterImage === null}
                  onClick={() => setImageToDisplay("After")}
                  className="group h-auto w-auto"
                >
                  <ArrowRight
                    color={
                      imageToDisplay === "Before" && afterImage === null
                        ? "disabled"
                        : "warning"
                    }
                    className="group-disabled:transition-none: !h-8 !w-8 transform opacity-100 transition-opacity duration-300 group-hover:opacity-50 "
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="relative h-full w-full  ">
          {error ? (
            <animated.div
              style={errorDivStyle}
              className="mx-6  flex h-full w-auto flex-col items-center justify-center space-y-6 align-middle  "
            >
              <p className="text-center text-4xl text-white">{error} </p>
              <button
                onClick={() => setError(null)}
                className={`h-12 w-36 rounded-sm bg-yellow-800/60 p-2  font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-600/60 md:w-48 md:text-2xl`}
              >
                Close error
              </button>
            </animated.div>
          ) : (
            transitions((style, item) => {
              return (
                <animated.div
                  className={`scrollbar absolute top-0 left-0 z-10 m-3 flex h-full w-full flex-col items-center justify-center overflow-scroll`}
                  style={style}
                >
                  {determineImageToDisplay(item)}
                </animated.div>
              );
            })
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default SVGConverterDialog;
interface ImageComponentProps {
  imageToDisplay: "Before" | "After";
  imageSrc: UTF8Data<"svg+xml"> | Base64Data<"png"> | null;
  width: number;
  height: number;
}

const ImageComponent = ({
  imageToDisplay,
  imageSrc,
  width,
  height,
}: ImageComponentProps): JSX.Element => {
  return (
    <div style={{ width, height }} className=" m-1 max-w-none">
      {imageToDisplay === "After" && imageSrc === null ? (
        <>
          <h2 className="mt-32 w-full text-center font-Handwriting text-2xl">
            Please Wait
          </h2>
          <Loading />
        </>
      ) : (
        imageSrc !== null && (
          <NextImage
            src={imageSrc}
            width={width}
            height={height}
            style={{ objectFit: "none" }}
            className="scrollbar z-10   h-auto w-auto overflow-visible rounded-sm shadow-sm shadow-black"
            alt={`The ${imageToDisplay?.toLocaleLowerCase()} image of what the user uploaded to be converted into SVG `}
          />
        )
      )}
    </div>
  );
};
