import { Box, Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
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
import { LoginStatus, paidFeature } from "../../../typings/typings";
import { isMobile } from "react-device-detect";
import {
  ImgDoc,
  SecondDegreeCategory,
} from "../../../typings/image-types/ImageTypes";
import { useRouter } from "next/router";
import { galleryImageDialog } from "../SiteGallery";
import { canvasEditButtonDialog } from "../../image-editor/Canvas/CanvasEditButtons";
import { getPaidFeatureMetas } from "../../../model/client-side/general/dialogFn";

interface props {
  dialog: null | canvasEditButtonDialog;
  setDialog: React.Dispatch<
    React.SetStateAction<null | canvasEditButtonDialog>
  >;
  feature: paidFeature;
}

const PaidFeatureDialog: FC<props> = ({ dialog, setDialog, feature }) => {
  const router = useRouter();
  const { displayName, tier } = getPaidFeatureMetas(feature);
  return (
    <Dialog
      open={dialog === "paid"}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return setDialog(null);
      }}
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
          src="/general/premium-popup-banner.png"
          alt="Paid dialogue box image popup "
          layout="fill"
          style={{ objectFit: "scale-down" }}
          className={"brightness-75   filter"}
        />
      </div>
      <DialogTitle>Unlock {displayName}</DialogTitle>
      <DialogContent className="z-20 mx-8 mb-10 flex h-full flex-col items-center justify-end space-y-4  align-bottom md:space-y-12">
        <h2 className="bold my-2 mx-2 text-center font-Handwriting text-3xl text-[#FFA841] shadow-md ">
          Unlock {displayName} feature among others
        </h2>

        <button
          className="buttons-3 !md:mt-10 !m-0 h-min text-lg text-red-400"
          onClick={() => {
            window.gtag("event", "redirected_to_checkout_through_feature", {
              paidFeatureName: feature,
            });
            return router.push(`/checkout?tier=${tier}&trial=true`);
          }}
        >
          Try it for free
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PaidFeatureDialog;
