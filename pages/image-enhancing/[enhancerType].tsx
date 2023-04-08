import { ArrowLeft, ArrowRight, QuestionMark } from "@mui/icons-material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTransition, animated, useSpringRef } from "react-spring";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { fetchUserStatus } from "../../model/client-side/general/fetches";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/general/Loading";
import { auth } from "../../firebase";
import NextImage from "next/image";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  enhancerOptionFields,
  enhancerType,
  deblurModelTypes,
} from "../../constants/image-enhancing/enhancingTypes";
import { renderFields } from "../../model/client-side/image-enhancing/renderFields";
import {
  determineDefaultOptionFields,
  handleEnhanceAPIRequest,
} from "../../model/client-side/image-enhancing/enhancerFunctions";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface props {
  enhancerType: enhancerType;
}
let uploadedImg: File;

const Index: NextPage<props> = ({ enhancerType }) => {
  const router = useRouter();

  //state that manages the appearance of the modal box on the screen
  const [popover, setPopover] = useState(false);

  //making sure the user is of gold / silver status
  const [user, userLoading] = useAuthState(auth);

  //image sent by user

  //variables sent by replicate
  const [error, setError] = useState<null | string>(null);

  //toggles the before and after status
  const [imageToDisplay, setImageToDisplay] = useState<
    null | "Before" | "After"
  >(null);

  // state that tracks the other option fields that are meant to be sent depending on the model chosen
  const [optionFields, setOptionFields] = useState<enhancerOptionFields>(
    determineDefaultOptionFields(enhancerType)
  );

  //this variable detects if there's an uploaded image and saves <it></it>
  const [beforeImage, setBeforeImage] = useState<null | {
    src: string;
    name: string;
    width: number;
    height: number;
  }>(null);
  const isDropboxDisabled = beforeImage !== null;
  const [afterImage, setAfterImage] = useState<null | {
    src: string;
    width: number;
    height: number;
  }>(null);

  const { data: loginStatus, isLoading: loginStatusLoading } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );
  const transRef = useSpringRef();
  const transitions = useTransition(imageToDisplay, {
    keys: null,
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    transRef.start();
  }, [imageToDisplay]);

  const handleSubmit = () => {
    let reader = new FileReader();
    console.log(`uploadedImg`, uploadedImg);
    reader.readAsDataURL(uploadedImg);

    setImageToDisplay("Before");
    reader.onload = () => {
      setImageToDisplay("After");
      return handleEnhanceAPIRequest(
        enhancerType,
        reader.result,
        optionFields,
        setError,
        setAfterImage
      );
    };
  };
  const onDrop = async <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (acceptedFiles.length > 1) return alert("You can only upload 1 image");
    uploadedImg = acceptedFiles[0];

    const image = new Image();
    image.src = URL.createObjectURL(uploadedImg);
    image.onload = () => {
      setBeforeImage({
        src: image.src,
        name: acceptedFiles[0].name,
        width: image.width,
        height: image.height,
      });
      setImageToDisplay("Before");
    };
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: onDrop,
    disabled: beforeImage !== null,
  });

  return (
    <>
      <NextSeo
        title={`Image ${enhancerType} for Restaurants`}
        description={`An image ${enhancerType}r meant for different restaurant images`}
      />
      <ChooseEnhancerModal
        popover={popover}
        setPopover={setPopover}
        router={router}
      />
      <section className="flex h-screen w-screen items-center justify-center align-middle">
        <div className="relative flex h-[85%] w-[85%] overflow-hidden  rounded-3xl bg-[url('/frontend-used-images/image-enhancing/imageEnhancingBG.svg')] align-middle drop-shadow-xl ">
          {loginStatusLoading ? (
            <Loading />
          ) : loginStatus === "gold" ? (
            <>
              <section className="last: flex h-full w-1/4  flex-col bg-gray-900/20 align-middle ">
                <button
                  className="relative h-20 w-full rounded-sm  bg-yellow-800/60  p-2  font-Handwriting text-xl text-yellow-200  shadow-brown-500 drop-shadow-md  transition-all duration-300   ease-in-out hover:bg-yellow-800 active:shadow-none disabled:bg-yellow-200/80 "
                  onClick={() => setPopover(true)}
                  id={"category-popover"}
                >
                  <span className="text-red-200">Type of enhancement</span>{" "}
                  <br></br>
                  {enhancerType}
                </button>
                <div
                  className={`  h-32 w-full  border-2 border-dashed   transition-all duration-300 hover:bg-gray-400/20 ${
                    isDragActive ? `bg-red-500/20` : ` bg-gray-800/20`
                  }
                  ${
                    isDropboxDisabled
                      ? `border-gray-800/20 bg-gray-500/40`
                      : `cursor-pointer border-yellow-300/40 bg-yellow-500/20`
                  }
                  `}
                  {...getRootProps({})}
                >
                  <div className=" flex h-full flex-col items-center justify-center space-y-2 align-middle">
                    <UploadFileIcon
                      className="h-4 w-4 "
                      color={isDropboxDisabled ? `disabled` : `action`}
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {beforeImage === null ? `Upload Image` : beforeImage.name}
                    </p>
                  </div>
                  <input
                    {...getInputProps({
                      id: "dropzone-file",
                      type: "file",
                      className: "hidden",
                    })}
                  />
                </div>
                {renderFields(enhancerType, optionFields, setOptionFields)}
                <button
                  className="mt-auto h-20 w-full rounded-sm bg-yellow-800/60 p-2 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-600/60 "
                  onClick={handleSubmit}
                >
                  Submit{" "}
                </button>
              </section>
              <section className="relative flex h-full w-full items-center justify-center">
                {error ? (
                  <p className="text-4xl">{error}</p>
                ) : (
                  transitions((style, item) => {
                    const determineImageToDisplay = (
                      item: "Before" | "After" | null
                    ) => {
                      switch (item) {
                        case "Before":
                          return (
                            <ImageComponent
                              imageDataObj={beforeImage}
                              imageToDisplay={imageToDisplay}
                              setImageToDisplay={setImageToDisplay}
                            />
                          );
                        case "After":
                          return (
                            <ImageComponent
                              imageDataObj={afterImage}
                              imageToDisplay={imageToDisplay}
                              setImageToDisplay={setImageToDisplay}
                            />
                          );
                        default:
                          return <></>;
                      }
                    };
                    return (
                      <animated.section
                        className={`absolute top-0 left-0 h-full w-full `}
                        style={style}
                      >
                        {determineImageToDisplay(item)}
                      </animated.section>
                    );
                  })
                )}
              </section>
            </>
          ) : (
            <>
              <h1 className="text-center font-Handwriting text-2xl md:text-4xl">
                You require gold tier to access this page <br></br>
                <Link href={"/subscribe?tier=gold"} className={"buttons-3"}>
                  <a>
                    <p className="mt-4 underline decoration-yellow-600 transition-all duration-300 hover:decoration-yellow-300 md:mt-10">
                      {" "}
                      Unlock <span className="text-yellow-300">gold</span> tier
                    </p>
                  </a>
                </Link>
              </h1>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Index;

interface ImageComponentProps {
  imageToDisplay: null | "Before" | "After";
  setImageToDisplay: React.Dispatch<
    React.SetStateAction<"Before" | "After" | null>
  >;
  imageDataObj: null | { src: string; width: number; height: number };
}

const ImageComponent = ({
  imageToDisplay,
  setImageToDisplay,
  imageDataObj,
}: ImageComponentProps): JSX.Element => {
  return (
    <div className="relative flex h-full w-full  flex-col bg-white/5  ">
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
            onClick={() => setImageToDisplay("After")}
            className=" group  h-auto w-auto"
          >
            <ArrowRight
              color={"warning"}
              className="!h-8 !w-8 transform opacity-100 transition-opacity duration-300 group-hover:opacity-50 "
            />
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center  justify-center align-middle">
        {imageToDisplay === "After" && imageDataObj === null ? (
          <>
            <h2 className="w-full text-center">Please Wait</h2>
            <Loading />
          </>
        ) : (
          <NextImage
            src={imageDataObj.src}
            width={imageDataObj.width}
            height={imageDataObj.height}
            className="rounded-sm shadow-sm shadow-black"
            alt={`The ${imageToDisplay?.toLocaleLowerCase()} image of what the user uploaded for upscaling `}
          />
        )}
      </div>
      {imageDataObj !== null && (
        <div className="from absolute bottom-0 right-0 h-auto  w-auto rounded-sm bg-yellow-700 bg-gradient-to-r to-yellow-800 p-4 font-Handwriting">
          <p className="text-sm text-yellow-200 ">
            Width : {imageDataObj.width} | Height : {imageDataObj.height}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

interface enhancerModalProps {
  popover: boolean;
  setPopover: React.Dispatch<boolean>;
  router: NextRouter;
}

const ChooseEnhancerModal = ({
  popover,
  setPopover,
  router,
}: enhancerModalProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `50vw`,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={popover}
      onClose={() => setPopover(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="flex flex-col items-center justify-center space-y-2 rounded-md bg-black align-middle shadow-md shadow-gray-500  "
      >
        <h3 className="w- full my-5 text-center !font-Handwriting text-4xl text-yellow-300 ">
          What would you like to do to your image?
        </h3>
        <button
          className="block h-16 w-96  rounded-sm  bg-yellow-900 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-700  "
          onClick={() => router.push("/image-enhancing/upscale")}
        >
          Upscale
        </button>
        <button
          className="block h-16 w-96  rounded-sm  bg-yellow-900 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-700  "
          onClick={() => router.push("/image-enhancing/deblur")}
        >
          Deblur
        </button>
        <button
          className="block h-16 w-96  rounded-sm  bg-yellow-900 font-Handwriting text-xl transition-all duration-300 hover:bg-yellow-700  "
          onClick={() => router.push("/image-enhancing/stylize")}
        >
          Stylize
        </button>
      </Box>
    </Modal>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { enhancerType: "upscale" } },
      { params: { enhancerType: "deblur" } },
      { params: { enhancerType: "stylize" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const enhancerType = context.params.enhancerType;

  return {
    // Passed to the page component as props
    props: { enhancerType },
  };
};
