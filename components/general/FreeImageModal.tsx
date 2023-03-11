import { Dialog, DialogContent, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BiDollar, BiDollarCircle } from "react-icons/bi";
import {
  checkImageGalleryClick,
  handleDownload,
  handleWebsiteGalleryEdit,
  handleWebsiteGalleryPreview,
} from "../../model/client-side/image-gallery/modalButtons";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";

import { useAppDispatch } from "../../Redux/hooks";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../typings/typings";
import { useCanvasState } from "../../zustand/CanvasStore/store";
import { useMockupsStore } from "../../zustand/MockupsStore/store";

import Button from "./Button";
import LoginFirstDialog from "./dialog-boxes/LoginFirstDialog";
import Loading from "./Loading";
import { galleryImageDialog } from "./SiteGallery";

interface props {
  doc: ImgDoc;
  dialogName: galleryImageDialog["name"] | null;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
  loginStatus: LoginStatus;
  isMobile: boolean;
}

const FreeImageModal: FC<props> = ({
  doc,
  dialogName,
  setDialog,
  loginStatus,
  isMobile,
}) => {
  const router = useRouter();
  const secondDegCat = router.query.imageCategory[0] as SecondDegreeCategory;
  const [ADD_IMAGE] = useCanvasState((state) => [state.ADD_IMAGE]);
  const [ADD_PREVIEW_IMAGE] = useMockupsStore((state) => [state.ADD_IMAGE]);

  return (
    <>
      <Dialog
        open={dialogName === "free"}
        onClose={() => setDialog(null)}
        fullWidth
        maxWidth={"xl"}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            width: isMobile ? "85vw" : "75vw",
            height: isMobile ? "85vh" : "75vh",
          },
        }}
      >
        <DialogContent
          className={
            "flex h-full w-full flex-col items-center justify-center rounded-lg border-4 border-gray-500/40 !p-0 align-middle md:h-[75vh]  md:w-[75vw] md:flex-row"
          }
        >
          <div className=" flex h-full w-full basis-4/5 flex-col bg-gradient-to-r   from-brown-300 to-brown-600 py-4 align-middle shadow-lg shadow-gray-200 md:flex-row ">
            {doc.tier !== "bronze" && (
              <div className="absolute top-2 left-2 flex items-center justify-center align-middle text-gray-100">
                <BiDollarCircle className="h-8 w-8" color="#E5E7EBF" />
                Premium
              </div>
            )}
            <div
              className={
                " mx-10 my-8 flex flex-col space-y-2 p-2 shadow-inner  shadow-gray-300 md:space-y-10 "
              }
            >
              {!isMobile && (
                <p className="text-center text-lg">
                  <span className="text-gray-500">Resolution:</span> <br></br>
                  {`${doc.width} x ${doc.height}`}
                </p>
              )}
              <p className="text-center text-lg">
                <span className="text-gray-500">Tags:</span> <br></br>
                {doc.tags.length === 0 ? (
                  <p>No tags</p>
                ) : (
                  doc.tags.map((tag) => (
                    <Tooltip
                      key={tag}
                      title={
                        <figure className=" h[200px] w-[188px] overflow-hidden ">
                          <p>
                            Click here in order to search for images with a
                            similar tag
                          </p>
                        </figure>
                      }
                      arrow
                      placement="bottom-start"
                    >
                      <button
                        className="rounded-sm  bg-yellow-700 p-1 text-xs text-white transition-all duration-300 hover:bg-yellow-500"
                        onClick={() => {
                          handleOptionClick(tag.toLowerCase(), "tags", router);
                          window.gtag("event", "image_tag_clicked", {
                            image_tag_name: tag,
                            secondDegCat,
                          });
                          return setDialog(null);
                        }}
                      >
                        {tag}
                      </button>
                    </Tooltip>
                  ))
                )}
              </p>

              <button
                className="text-md  rounded-sm bg-yellow-700 p-2 text-yellow-200 drop-shadow-xl  transition-all duration-500 hover:bg-yellow-500 hover:shadow-none"
                onClick={() => {
                  window.gtag(
                    "event",
                    "redirected_to_upscale_through_siteGallery",
                    {
                      secondDegCat,
                      imageRef: doc.url.replace(
                        "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                        ""
                      ),
                    }
                  );
                }}
              >
                Upscale Image
              </button>
            </div>
            <Image
              id="modal-modal-description"
              src={doc.url}
              width={
                isMobile ? Math.min(doc.width, 280) : Math.min(doc.width, 512)
              }
              height={
                isMobile ? Math.min(doc.height, 280) : Math.min(doc.height, 384)
              }
              objectFit={`scale-down`}
              className=" overflow-hidden rounded-sm "
              alt={doc.description}
            />
          </div>

          <div className="grid h-full w-full basis-1/5  grid-cols-2 flex-row items-center  justify-center gap-2 bg-brown-700    px-2  py-10  align-middle  md:flex md:flex-col md:space-x-0  md:space-y-16 md:px-0 ">
            <button
              className=" h-full w-full bg-yellow-700 text-yellow-200 drop-shadow-xl  transition-all duration-500  hover:bg-brown-500 hover:shadow-none md:h-12 md:w-36 "
              onClick={() => {
                const passedChecks = checkImageGalleryClick(
                  loginStatus,
                  doc,
                  setDialog
                );
                if (passedChecks) {
                  console.log("passed the checks!");
                  window.gtag(
                    "event",
                    "redirected_to_edit_through_siteGallery",
                    {
                      imageRef: doc.url.replace(
                        "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                        ""
                      ),
                    }
                  );
                  return handleWebsiteGalleryEdit(
                    router,
                    ADD_IMAGE,
                    doc.url,
                    doc.width,
                    doc.height
                  );
                }
              }}
            >
              Edit Picture
            </button>
            <button
              className=" h-full w-full bg-yellow-700 text-yellow-200 drop-shadow-xl  transition-all duration-500   hover:bg-brown-500   hover:shadow-none md:h-12   md:w-36 "
              onClick={() => {
                const passedChecks = checkImageGalleryClick(
                  loginStatus,
                  doc,
                  setDialog
                );
                if (passedChecks) {
                  window.gtag("event", "previewed_image_through_siteGallery", {
                    imageRef: doc.url.replace(
                      "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                      ""
                    ),
                  });
                  return handleWebsiteGalleryPreview(
                    router,
                    doc,
                    secondDegCat,
                    ADD_PREVIEW_IMAGE
                  );
                }
              }}
            >
              Preview
            </button>
            <button
              className=" h-full w-full bg-yellow-700 text-yellow-200 drop-shadow-xl  transition-all duration-500   hover:bg-brown-500   hover:shadow-none md:h-12   md:w-36 "
              onClick={() => {
                const passedChecks = checkImageGalleryClick(
                  loginStatus,
                  doc,
                  setDialog
                );
                if (passedChecks) {
                  window.gtag("event", "downloaded_image_through_siteGallery", {
                    imageRef: doc.url.replace(
                      "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                      ""
                    ),
                  });
                  return handleDownload(doc.url);
                }
              }}
            >
              Download
            </button>

            <button
              className=" h-full w-full justify-center bg-yellow-700 text-yellow-200 drop-shadow-xl  transition-all duration-500   hover:bg-brown-500   hover:shadow-none md:h-12  md:w-36"
              onClick={() => setDialog(null)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FreeImageModal;
