import { ShareIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiPalette } from "react-icons/bi";
import {
  MdBlurOff,
  MdDesignServices,
  MdHighQuality,
  MdWeb,
} from "react-icons/md";
import { navLink } from "../../constants/NavLinks";
import { useSpring, animated, useTransition, SpringValue } from "react-spring";
import NavbarAboutUs from "./NavbarAboutUs";
import NavbarEditImages from "./NavbarEditImages";
import NavbarHireProfessional from "./NavbarHireProfessional";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Fade from "../../constants/general/Fade";
import * as gtag from "../../lib/gtag";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

interface props {}

const MoreDropdown = ({}: props) => {
  const router = useRouter();
  const [modalText, setModalText] = useState<null | JSX.Element>(null);

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
          id={"GTAG-request-custom-design"}
          onClick={() => {
            dataLayer.push({
              event: "request-custom-design-click",
              userId: user ? user.uid : "not logged in",
            });
            setModalText(
              <p>
                We are not currently available to allow the requesting of custom
                graphic designs.<br></br>
                We are sorry for the inconvenience
              </p>
            );
          }}
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Design
        </button>
        <button
          onClick={() =>
            setModalText(
              <p>
                We are not currently available to allow the requests for custom
                website designs.<br></br>
                We are sorry for the inconvenience
              </p>
            )
          }
          className="font-serif text-lg text-white transition-all duration-300 hover:text-gray-300"
        >
          Request Custom Website Design
        </button>
        <button
          onClick={() =>
            setModalText(
              <p>
                We are not currently available to give sell particular images at
                request.<br></br>
                We are sorry for the inconvenience
              </p>
            )
          }
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

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modalText !== null}
        onClose={() => setModalText(null)}
        closeAfterTransition
      >
        <Fade in={modalText !== null}>
          <Box
            // sx={...style}
            className={
              "flex flex-col items-center justify-center rounded-sm text-center align-top "
            }
          >
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              className="text-4xl text-orange-300"
            >
              Feature not yet available
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              {modalText}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </animated.div>
  );
};

export default MoreDropdown;
