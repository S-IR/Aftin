import { LockClosedIcon, XIcon } from "@heroicons/react/solid";
import { IconButton, Snackbar, SnackbarContent, Tooltip } from "@mui/material";
import { User } from "firebase/auth";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineImage } from "react-icons/md";
import { useQuery } from "react-query";

import { auth } from "../../../firebase";
import { fetchUserStatus } from "../../../model/client-side/general/fetches";

import { ImgDoc } from "../../../typings/image-types/ImageTypes";
import Button from "../Button";
import Cookies from "js-cookie";
import {
  checkImageGalleryClick,
  handleDownload,
} from "../../../model/client-side/image-gallery/dialogButtons";
import { galleryImageDialog } from "../SiteGallery";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";
import LoginFirstDialog from "../dialog-boxes/LoginFirstDialog";
import PaidImageDialog from "../dialog-boxes/PaidImageDialog";

interface props {
  cachedImage: ImgDoc;
}

const CachedImageSnackbar = ({ cachedImage }: props) => {
  const [user, userLoading] = useAuthState(auth);

  const [dialog, setDialog] = useState<null | galleryImageDialog>(null);

  const changeModalType = useModalStore((store) => store.CHANGE_MODAL_TYPE);
  const { data: loginStatus } = useQuery("getUserStatus", () =>
    fetchUserStatus(user)
  );

  const onClose = () => {
    return Cookies.remove("cachedImage");
  };
  return (
    <>
      <Snackbar open={!!cachedImage}>
        <SnackbarContent
          message={
            <div className="relative flex flex-col items-center justify-center align-middle">
              <div className="flex items-center justify-center space-x-2 align-middle">
                <span className=" font-sans text-lg text-red-500 ">
                  Do you still want to use the image that you clicked on before
                  logging in?
                </span>
              </div>

              <div className="flex">
                <Tooltip
                  placement="top-end"
                  title={
                    <div className="h-auto w-auto">
                      <Image
                        src={cachedImage?.url as string}
                        width={cachedImage?.width}
                        height={cachedImage?.height}
                        alt={`preview of an image`}
                      />
                    </div>
                  }
                >
                  <>
                    <button className="h-8 w-32 rounded bg-gradient-to-br from-orange-400 via-red-300 to-orange-400">
                      See image again
                    </button>
                    <div className="flex items-center justify-center align-middle">
                      <button
                        onClick={() => {
                          const passedChecks = checkImageGalleryClick(
                            loginStatus,
                            cachedImage,
                            setDialog,
                            changeModalType
                          );
                          if (passedChecks)
                            return handleDownload(cachedImage.url);
                        }}
                        className="buttons-1"
                      >
                        Download Image
                      </button>
                      <button className="buttons-1">Edit Image</button>
                      <button className="buttons-1">Preview Image</button>
                    </div>
                  </>
                </Tooltip>
              </div>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}
            >
              <XIcon color="red" width={32} height={32} />
            </IconButton>,
          ]}
        />
      </Snackbar>
      <PaidImageDialog
        dialog={dialog}
        doc={cachedImage}
        loginStatus={loginStatus}
        setDialog={setDialog}
      />
      <LoginFirstDialog
        imgDoc={cachedImage}
        dialog={dialog}
        setDialog={setDialog}
      />
    </>
  );
};

export default CachedImageSnackbar;
