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

interface props {
  dialog: null | "free" | "paid";
  setDialog: React.Dispatch<React.SetStateAction<null | "free" | "paid">>;
  loginStatus: LoginStatus;
}

const PaidImageModal: FC<props> = ({ dialog, setDialog }) => {
  return (
    <Dialog
      open={dialog === "paid"}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return setDialog(null);
      }}
      maxWidth="lg"
    >
      <div className="flex rounded-3xl p-4 ">
        <div className="flex w-[300px]  flex-col text-center">
          <h2 className="bold my-2 mx-2 text-3xl text-fuchsia-800">
            Try Aftin Premium for <span className="underline">Free</span>
          </h2>
          <p>
            Get this image alongside our exquisite collection of images,
            banners, logos and more
          </p>
          <p className="text-bold text-1xl mt-4">Here is what you will get :</p>
          <ul className="flex flex-col">
            <li className="flex items-center align-top">
              <PencilIcon className="h-32 w-32 " />
              <p>
                Hundreds of templates of banners, artworks, etc. that are made
                to stand out
              </p>
            </li>
            <li className="flex items-center align-top">
              <PhotographIcon className="h-32 w-32 " />
              <p>
                Thousands of stock images that are made to fit your marketing
                needs
              </p>
            </li>
            <li className="flex items-center align-top">
              <AiFillEdit className="h-32 w-32 font-serif" />
              <p>
                Thousands of stock images that are made to fit your marketing
                needs
              </p>
            </li>
          </ul>
        </div>

        <Image
          src="/frontend-used-images/general/premium-popup-banner.png"
          alt="Paid dialogue box image popup  "
          width={512}
          height={512}
          objectFit={"scale-down"}
        />
      </div>
    </Dialog>
  );
};

export default PaidImageModal;
