import React, { Dispatch, SetStateAction, useState } from "react";

import { useSpring, animated, useTransition, SpringValue } from "react-spring";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "../../constants/general/Fade";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import * as gtag from "../../lib/gtag";
import { Box } from "@mui/material";
import { useModalStore } from "../../zustand/ModalBoxStore/store";
import Link from "next/link";

interface props {}

const MoreDropdown = ({}: props) => {
  const router = useRouter();
  const [changeModalText, changeModalType] = useModalStore((store) => [
    store.CHANGE_MODAL_TEXT,
    store.CHANGE_MODAL_TYPE,
  ]);

  const [user] = useAuthState(auth);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "#000000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  //this function deals with people clicking on a button which is a missing feature
  type EventName =
    | `request_custom_design_clicked`
    | `request_custom_website_clicked`
    | `request_custom_images_clicked`;
  const handleMissingFeatureClick = (
    event_name: EventName,
    title?: string,
    text?: string
  ) => {
    window.gtag(`event`, event_name, {
      userId: user ? user.uid : "not logged in",
    });
    changeModalText({ title, text });
    return changeModalType("missing-feature");
  };

  return (
    <animated.div className=" a z-50 mb-10 flex h-auto   w-auto  space-x-28  overflow-hidden rounded-sm p-1">
      <div className="flex w-auto flex-col items-center space-y-2 p-2  ">
        <p className="mb-6 text-xl text-orange-300 ">Edit Images</p>
        <Link
          href={`/image-editor`}
          className="text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Access Image Editor
        </Link>
        <Link
          href={`/image-enhancing/upscale`}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Increase Image Resolution
        </Link>
        <Link
          href={`/preview`}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Preview Image
        </Link>
        <Link
          href={`/image-enhancing/deblur`}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Deblur Image
        </Link>
      </div>
      <div className=" flex w-auto flex-col items-center space-y-2">
        <p className=" mb-6 text-xl text-orange-300 ">Professional Designers</p>
        <button
          onClick={() =>
            handleMissingFeatureClick(
              "request_custom_design_clicked",
              undefined,
              `We cannot currently offer custom graphic designs images at
                special request
                We are sorry for the inconvenience`
            )
          }
          className=" GA-request-custom-design font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Design
        </button>
        <button
          onClick={() => {
            handleMissingFeatureClick(
              `request_custom_website_clicked`,
              undefined,
              ` We cannot currently offer website design services at request.
                We are sorry for the inconvenience.`
            );
          }}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Website Design
        </button>
        <button
          onClick={() => {
            handleMissingFeatureClick(
              `request_custom_images_clicked`,
              undefined,
              `  We cannot currently offer custom images at request.
                We are sorry for the inconvenience.`
            );
          }}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Images
        </button>
      </div>
      <div className=" flex w-auto flex-col items-center space-y-2">
        <p className=" mb-6  text-xl text-orange-300 ">Information</p>
        <button
          onClick={() => router.push("/about-us")}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          About Us Page
        </button>
        <button
          onClick={() => router.push("/")}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Homepage{"/policies/privacy"}
        </button>

        <button className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300">
          Privacy Policy{" "}
        </button>
      </div>
    </animated.div>
  );
};

export default MoreDropdown;
