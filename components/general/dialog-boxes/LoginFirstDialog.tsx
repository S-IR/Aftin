import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import Fade from "../../../constants/general/Fade";
import useAuthThirdParty from "../../../hooks/useAuthThirdParty";
import { ImgDoc } from "../../../typings/image-types/ImageTypes";
import { galleryImageDialog } from "../SiteGallery";
import Cookies from "js-cookie";
import { useCachedStore } from "../../../zustand/CachedImageStore/store";
import { canvasEditButtonDialog } from "../../image-editor/Canvas/CanvasEditButtons";
import { useIsMobile } from "../../../hooks/useIsMobile";
import Image from "next/image";
import { FacebookButton, GoogleButton } from "../../Login";

interface props {
  dialogName: null | galleryImageDialog[`name`] | canvasEditButtonDialog;
  setDialog:
    | React.Dispatch<React.SetStateAction<canvasEditButtonDialog | null>>
    | React.Dispatch<React.SetStateAction<galleryImageDialog | null>>;
  // IF this login dialog box is coming from an action on a commercial image then you can put the imgDoc in order to add the image to a cache. That cache will help the user to return to this image after he has created an account / logged in
  imgDoc?: ImgDoc;
}

/**
 * This is a functional component that appears when a user tries to access an image or a feature like SVG conversion that requires him to be logged in
 * @param {Object} props
 * @returns {JSX.Element}
 */
const LoginFirstDialog = ({ dialogName, setDialog, imgDoc }: props) => {
  const router = useRouter();

  const [addImageToCache] = useCachedStore((store) => [
    store.ADD_REDIRECT_IMAGE__TO_CACHE,
  ]);
  const [authWithGoogle, authWithFacebook] = useAuthThirdParty();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 100000,
    p: 6,
  };
  const isMobile = useIsMobile();
  return (
    <Dialog
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={dialogName === "login"}
      maxWidth={"xl"}
      onClose={() => setDialog(null)}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          width: isMobile ? "70vw" : "50vw",
          height: isMobile ? "70vh" : "50vh",
        },
      }}
    >
      <Fade in={dialogName === "login"}>
        <Box
          sx={style}
          className={
            "flex h-full w-full  flex-col items-center justify-center rounded-md  border-2 border-dashed border-orange-700/60 bg-gray-900/60  align-middle md:flex-row "
          }
        >
          <div className="mx-2 w-auto ">
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              className="w-fit text-center  font-serif text-4xl text-orange-400  "
            >
              Log in or sign up
            </Typography>
            <Typography
              id="spring-modal-description"
              sx={{ mt: 2 }}
              className={"my-2 text-center font-serif text-xl text-orange-200"}
            >
              Create an account or quickly login
            </Typography>
          </div>
          <div className="flex-col space-y-6">
            <button
              className="buttons-1 flex h-10 w-full rounded-sm !text-left font-Handwriting"
              onClick={() => router.push("/login?form=signUp")}
            >
              Create an account
            </button>
            <GoogleButton
              text={` Continue with Google`}
              onClick={async () => {
                const res = await authWithGoogle();
                if (res.status === "success") {
                  if (imgDoc !== undefined) {
                    addImageToCache(imgDoc);
                  }
                  return router.push("/");
                }
              }}
              w={"lg"}
              h={"sm"}
            />

            <FacebookButton
              text={"Continue with Facebook"}
              onClick={async () => {
                const res = await authWithFacebook();
                if (res.status === "success") {
                  if (imgDoc !== undefined) {
                    addImageToCache(imgDoc);
                  }
                  return router.push("/");
                }
              }}
              w={"lg"}
              h={"sm"}
            />
          </div>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default LoginFirstDialog;
