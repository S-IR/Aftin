import { Box, Dialog, DialogTitle, Modal } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import {
  PhotographIcon,
  CakeIcon,
  PencilIcon,
  DeviceMobileIcon,
  VariableIcon,
} from "@heroicons/react/solid";
import { AiFillEdit } from "react-icons/ai";
import { LoginStatus } from "../../typings/typings";
import { isMobile } from "react-device-detect";
import {
  ImgDoc,
  SMALL_CATEGORY_OF_IMG,
} from "../../typings/image-types/ImageTypes";
import { useRouter } from "next/router";

interface props {
  doc: ImgDoc;
  dialog: null | "free" | "paid";
  setDialog: React.Dispatch<React.SetStateAction<null | "free" | "paid">>;
  loginStatus: LoginStatus;
  subCat?: SMALL_CATEGORY_OF_IMG;
}

const PaidImageModal: FC<props> = ({
  doc,
  dialog,
  setDialog,
  loginStatus,
  subCat,
}) => {
  const router = useRouter();
  if (subCat === undefined)
    subCat = router.query.subCat as SMALL_CATEGORY_OF_IMG;

  return (
    <Dialog
      open={dialog === "paid"}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return setDialog(null);
      }}
      hideBackdrop
      maxWidth="lg"
      PaperProps={{
        elevation: 0,
        style: {
          backgroundColor: "transparent",
          height: isMobile ? 512 : 768,
          margin: 0,
          borderRadius: 25,
          position: "relative",
        },
      }}
    >
      <div className="absolute top-0 left-0 h-full w-full  ">
        <Image
          src="/frontend-used-images/general/premium-popup-banner.png"
          alt="Paid dialogue box image popup "
          layout="fill"
          className={"brightness-75  filter"}
        />
      </div>

      <div className="z-20 mx-8 mb-10 flex h-full flex-col items-center justify-end space-y-12 align-bottom">
        <h2 className="bold my-2 mx-2 text-center font-Handwriting text-5xl text-[#FFA841] shadow-md ">
          Unlock this image among others
        </h2>
        <div className="text-md flex w-full items-center justify-center space-x-20 align-middle text-white">
          <p className="w-48 text-center font-serif">
            Thousands of <br></br> professional photos
          </p>
          <p className="w-48 text-center font-serif">
            Hundreds of <br></br> templates
          </p>
          <p className=" w-48 font-serif">And more</p>
        </div>
        <button
          className="buttons-3 h-min text-lg text-red-400"
          onClick={() => {
            window.gtag("event", "redirected_to_checkout_through_image", {
              subCat,
              imageRef: doc.url.replace(
                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                ""
              ),
            });
            return router.push(
              `/checkout?tier=${doc.tier}&trial=true&ref=${doc.url.replace(
                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                ""
              )}`
            );
          }}
        >
          Try it for free
        </button>
      </div>
    </Dialog>
  );
};

export default PaidImageModal;
