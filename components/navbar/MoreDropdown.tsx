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
import MissingFeatureDialog from "../general/dialog-boxes/MissingFeatureDialog";

interface props {}

const MoreDropdown = ({}: props) => {
  const router = useRouter();
  const [missingFeatureText, setMissingFeatureText] =
    useState<JSX.Element | null>(null);

  const [user, userLoading] = useAuthState(auth);

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

  return (
    <animated.div className=" a z-50 mb-10 flex h-auto   w-auto  space-x-28  overflow-hidden rounded-sm p-1">
      <div className="flex w-auto flex-col items-center space-y-2 p-2  ">
        <p className="mb-6 text-xl text-orange-300 ">Edit Images</p>
        <button
          onClick={() => router.push("/image-editor")}
          className="text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Access Image Editor
        </button>
        <button
          onClick={() => router.push("/image-scalar")}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Increase Image Resolution
        </button>
        <button
          onClick={() => router.push("/preview")}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Preview Image
        </button>
        <button
          onClick={() => router.push("/image-deblur")}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Deblur Image
        </button>
      </div>
      <div className=" flex w-auto flex-col items-center space-y-2">
        <p className=" mb-6 text-xl text-orange-300 ">Professional Designers</p>
        <button
          onClick={() => {
            window.gtag(`event`, `request_custom_design_clicked`, {
              userId: user ? user.uid : "not logged in",
              name: "not-known",
            });
            setMissingFeatureText(
              <p>
                We cannot currently offer custom graphic designs images at
                special request.<br></br>
                We are sorry for the inconvenience.
              </p>
            );
          }}
          className=" GA-request-custom-design font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Design
        </button>
        <button
          onClick={() => {
            window.gtag(`event`, `request_custom_website_clicked`, {
              userId: user ? user.uid : "not logged in",
            });
            setMissingFeatureText(
              <p>
                We cannot currently offer website design services at request.
                <br></br>
                We are sorry for the inconvenience.
              </p>
            );
          }}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Website Design
        </button>
        <button
          onClick={() => {
            window.gtag(`event`, `request_custom_images_clicked`, {
              userId: user ? user.uid : "not logged in",
            });
            setMissingFeatureText(
              <p>
                We cannot currently offer custom images at request.<br></br>
                We are sorry for the inconvenience.
              </p>
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

      <MissingFeatureDialog
        text={missingFeatureText}
        setModalText={setMissingFeatureText}
      />
    </animated.div>
  );
};

export default MoreDropdown;
