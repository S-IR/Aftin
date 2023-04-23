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
import Cookies from "js-cookie";
import {
  checkImageGalleryClick,
  handleDownload,
  handleWebsiteGalleryEdit,
} from "../../../model/client-side/image-gallery/dialogButtons";
import { galleryImageDialog } from "../SiteGallery";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";
import LoginFirstDialog from "../dialog-boxes/LoginFirstDialog";
import PaidImageDialog from "../dialog-boxes/PaidImageDialog";
import { useRouter } from "next/router";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { handleWebsiteGalleryPreview } from "../../../model/client-side/image-gallery/dialogButtons";
import { useMockupsStore } from "../../../zustand/MockupsStore/store";
import { useCachedStore } from "../../../zustand/CachedImageStore/store";

interface props {
  cachedImage: ImgDoc;
}

const CachedImageSnackbar = ({ cachedImage }: props) => {
  const router = useRouter();
  const [dialog, setDialog] = useState<null | galleryImageDialog>(null);

  const ADD_IMAGE = useCanvasState((state) => state.ADD_IMAGE);
  const ADD_PREVIEW_IMAGE = useMockupsStore((store) => store.ADD_IMAGE);
  const changeModalType = useModalStore((store) => store.CHANGE_MODAL_TYPE);
  const removeCachePopup = useCachedStore(
    (store) => store.CLEAR_REDIRECT_IMAGE_CACHE
  );

  const [user] = useAuthState(auth);

  const { data: loginStatus } = useQuery("getUserStatus", () =>
    fetchUserStatus(user)
  );

  return (
    <>
      <Snackbar open={!!cachedImage}>
        <SnackbarContent
          message={
            <div className="relative flex flex-col items-center justify-center align-middle">
              <div className="flex items-center justify-center space-x-2 align-middle">
                <span className="my-4 text-center font-serif text-2xl  text-red-500  ">
                  Do you still want to use the image that you clicked on{" "}
                  <br></br>
                  before logging in?
                </span>
              </div>

              <div className="flex">
                <Tooltip
                  placement="top-start"
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
                  <button className="mx-2 h-12 w-28 bg-gradient-to-br from-yellow-800 to-yellow-600 font-Handwriting text-yellow-100 shadow-sm shadow-yellow-700 transition-all duration-300 hover:text-yellow-400 hover:shadow-none">
                    See image again
                  </button>
                </Tooltip>

                <>
                  <div className="flex items-center justify-center align-middle">
                    <button
                      onClick={() => {
                        const passedChecks = checkImageGalleryClick(
                          loginStatus,
                          cachedImage,
                          setDialog,
                          changeModalType
                        );
                        if (passedChecks) {
                          removeCachePopup();
                          return handleDownload(cachedImage.url);
                        }
                      }}
                      className=" mx-2 h-12 w-28 bg-gradient-to-br from-yellow-800 to-yellow-600 font-Handwriting text-yellow-100 shadow-sm shadow-yellow-700 transition-all duration-300 hover:text-yellow-400 hover:shadow-none"
                    >
                      Download Image
                    </button>
                    <button
                      onClick={() => {
                        const passedChecks = checkImageGalleryClick(
                          loginStatus,
                          cachedImage,
                          setDialog,
                          changeModalType
                        );
                        if (passedChecks) {
                          window.gtag(
                            "event",
                            "redirected_to_edit_through_siteGallery",
                            {
                              imageRef: cachedImage.url.replace(
                                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                                ""
                              ),
                            }
                          );
                          removeCachePopup();
                          return handleWebsiteGalleryEdit(
                            router,
                            ADD_IMAGE,
                            cachedImage.url,
                            cachedImage.width,
                            cachedImage.height
                          );
                        }
                      }}
                      className=" mx-2 h-12 w-28 bg-gradient-to-br from-yellow-800 to-yellow-600 font-Handwriting text-yellow-100 shadow-sm shadow-yellow-700 transition-all duration-300 hover:text-yellow-400 hover:shadow-none"
                    >
                      Edit Image
                    </button>
                    <button
                      onClick={() => {
                        const passedChecks = checkImageGalleryClick(
                          loginStatus,
                          cachedImage,
                          setDialog,
                          changeModalType
                        );
                        if (passedChecks) {
                          window.gtag(
                            "event",
                            "previewed_image_through_siteGallery",
                            {
                              imageRef: cachedImage.url.replace(
                                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                                ""
                              ),
                            }
                          );
                          removeCachePopup();
                          return handleWebsiteGalleryPreview(
                            router,
                            cachedImage,
                            "banners",
                            ADD_PREVIEW_IMAGE
                          );
                        }
                      }}
                      className=" mx-2 h-12 w-28 bg-gradient-to-br from-yellow-800 to-yellow-600 font-Handwriting text-yellow-100 shadow-sm shadow-yellow-700 transition-all duration-300 hover:text-yellow-400 hover:shadow-none"
                    >
                      Preview Image
                    </button>
                  </div>
                </>
              </div>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={removeCachePopup}
            >
              <XIcon color="red" width={32} height={32} />
            </IconButton>,
          ]}
        />
      </Snackbar>
      {dialog !== null && (
        <>
          <PaidImageDialog
            dialogName={dialog.name}
            doc={dialog.imgDoc}
            loginStatus={loginStatus}
            setDialog={setDialog}
          />
          <LoginFirstDialog
            dialogName={dialog.name}
            setDialog={setDialog}
            imgDoc={dialog.imgDoc as ImgDoc}
          />
        </>
      )}
    </>
  );
};

export default CachedImageSnackbar;
