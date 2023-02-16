import { Dialog, DialogContent, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import {
  handleSubCatDownload,
  handleSubCatEdit,
} from "../../model/client-side/subCat/modalButtons";
import { useAppDispatch } from "../../Redux/hooks";
import { LoginStatus } from "../../typings/typings";

import Button from "./Button";
import Loading from "./Loading";

interface props {
  url: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  w: number;
  h: number;
  alt: string;
  loginStatus: LoginStatus;
}

const FreeImageModal: FC<props> = ({
  url,
  openDialog,
  setOpenDialog,
  w,
  h,
  alt,
  loginStatus,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      fullWidth
      maxWidth={"xl"}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "75vw",
          height: "75vh",
        },
      }}
    >
      <DialogContent
        className={
          "flex h-[75vh] w-[75vw] items-center justify-center   p-10 align-middle"
        }
      >
        <div className="flex h-full w-full grow-[3] flex-col items-center justify-center bg-white/80 align-middle ">
          <Image
            id="modal-modal-description"
            src={url}
            width={w}
            height={h}
            objectFit={`cover`}
            className="overflow-hidden rounded-sm "
            alt={alt}
          />
          <div className={"flex"}></div>
        </div>

        <div className="flex h-full  grow-[1] flex-col space-y-2 bg-black/80">
          <button
            className=" buttons-1 w-32 "
            onClick={() => handleSubCatEdit(router, dispatch, url, w, h)}
          >
            Edit Picture
          </button>
          <button
            className=" buttons-1 w-32 "
            onClick={() => setOpenDialog(false)}
          >
            Preview
          </button>
          <button
            className=" buttons-1 w-32 "
            onClick={() =>
              handleSubCatDownload(loginStatus, router, url, w, h, dispatch)
            }
          >
            Download
          </button>

          <button
            className="buttons-1 w-32   justify-center"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeImageModal;
