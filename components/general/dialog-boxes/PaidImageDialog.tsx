import { Box, Dialog, DialogTitle, Modal } from "@mui/material";
import Image from "next/legacy/image";
import React, { FC } from "react";
import {
  PhotographIcon,
  CakeIcon,
  PencilIcon,
  DeviceMobileIcon,
  VariableIcon,
} from "@heroicons/react/solid";
import { AiFillEdit } from "react-icons/ai";
import { LoginStatus } from "../../../typings/typings";
import { isMobile } from "react-device-detect";
import {
  ImgDoc,
  SecondDegreeCategory,
} from "../../../typings/image-types/ImageTypes";
import { useRouter } from "next/router";
import { galleryImageDialog } from "../SiteGallery";

interface props {
  doc: ImgDoc;
  dialog: null | galleryImageDialog;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
  loginStatus: LoginStatus;
  secondDegCat?: SecondDegreeCategory;
}

const PaidImageDialog: FC<props> = ({
  doc,
  dialog,
  setDialog,
  loginStatus,
  secondDegCat,
}) => {
  const router = useRouter();
  if (secondDegCat === undefined)
    secondDegCat = router.query.secondDegCat as SecondDegreeCategory;

  return (
    <Dialog
      open={dialog !== null && dialog.name === "paid"}
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
          margin: 10,
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
          objectFit="scale-down"
          className={"brightness-75  filter"}
        />
      </div>

      <div className="z-20 mx-8 mb-10 flex h-full flex-col items-center justify-end space-y-4  align-bottom md:space-y-12">
        <h2 className="bold my-2 mx-2 text-center font-Handwriting text-5xl text-[#FFA841] shadow-md ">
          Unlock this image among others
        </h2>
        <div className="text-md flex w-full items-center justify-center space-x-20 align-middle text-white">
          {!isMobile && (
            <>
              <p className="w-48 text-center font-serif text-sm">
                Thousands of <br></br> professional photos
              </p>
              <p className="w-48 text-center font-serif text-sm">
                Hundreds of <br></br> templates
              </p>
              <p className=" w-48 font-serif text-sm">And more</p>
            </>
          )}
        </div>
        <button
          className="buttons-3 !md:mt-10 !m-0 h-min text-lg text-red-400"
          onClick={() => {
            window.gtag("event", "redirected_to_checkout_through_image", {
              secondDegCat,
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

export default PaidImageDialog;
