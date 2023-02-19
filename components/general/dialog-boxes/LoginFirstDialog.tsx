import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import Fade from "../../../constants/general/Fade";
import useAuthThirdParty from "../../../hooks/useAuthThirdParty";
import { cacheImage } from "../../../model/client-side/subCat/modalButtons";
import { useAppDispatch } from "../../../Redux/hooks";
import { ImgDoc } from "../../../typings/image-types/ImageTypes";
import { FacebookButton, GoogleButton } from "../../login";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgDoc: ImgDoc;
}

const LoginFirstdialog = ({ open, setOpen, imgDoc }: props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { authWithGoogle, authWithFacebook } = useAuthThirdParty();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 6,
  };
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Fade in={open}>
        <Box
          sx={style}
          className={
            "flex  items-center justify-center rounded-md  bg-gray-700 align-middle "
          }
        >
          <div className="mx-2 w-auto ">
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              className="w-fit text-center  font-serif text-4xl text-orange-300  "
            >
              Log in or sign up
            </Typography>
            <Typography
              id="spring-modal-description"
              sx={{ mt: 2 }}
              className={"my-2 text-center font-serif text-xl"}
            >
              Create an account or quickly login
            </Typography>
          </div>
          <div className="flex-col space-y-6">
            <button
              className="buttons-1 h-10 w-full rounded-sm !text-left font-serif text-lg"
              onClick={() => router.push("/login?form=signUp")}
            >
              Create an account
            </button>
            <GoogleButton
              text={` Continue with Google`}
              onClick={async () => {
                const res = await authWithGoogle();
                if (res.status === "success") {
                  cacheImage(imgDoc, dispatch);
                  return router.push("/");
                }
              }}
              w={"lg"}
              h={"auto"}
            />

            <FacebookButton
              text={"Continue with Facebook"}
              onClick={async () => {
                const res = await authWithFacebook();
                if (res.status === "success") {
                  cacheImage(imgDoc, dispatch);
                  return router.push("/");
                }
              }}
              w={"lg"}
              h={"auto"}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginFirstdialog;
