import { Dialog, DialogContent, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { animated, useSpringRef, useTransition } from "react-spring";

import { BiDollar, BiDollarCircle } from "react-icons/bi";
import {
  checkImageGalleryClick,
  handleDownload,
  handleWebsiteGalleryEdit,
  handleWebsiteGalleryPreview,
} from "../../../model/client-side/image-gallery/dialogButtons";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";

import {
  ImgDoc,
  SecondDegreeCategory,
} from "../../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../../typings/typings";
import { useCanvasState } from "../../../zustand/CanvasStore/store";

import Button from "../Button";
import Loading from "../Loading";
import { galleryImageDialog } from "../SiteGallery";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";
import {
  imagetoEnhance,
  useCachedStore,
} from "../../../zustand/CachedImageStore/store";
import { triggerMissingMockupFeature } from "../../../model/client-side/general/missingFeatures";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface props {
  dialogName: null | galleryImageDialog["name"];
  doc: null | ImgDoc;
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>;
  loginStatus: LoginStatus;
  isMobile: boolean;
}

let sentPreviewEventToGTM: boolean = true;
const FreeImageDialog: FC<props> = ({
  dialogName,
  doc,
  setDialog,
  loginStatus,
  isMobile,
}) => {
  const router = useRouter();

  //used to determine if the user can click on a button
  const [user, userLoading] = useAuthState(auth);

  const imageCategory = router.query.imageCategory as string[];
  const secondDegCat = imageCategory[0] as SecondDegreeCategory;
  const [ADD_IMAGE, ADD_PAGE] = useCanvasState((state) => [
    state.ADD_IMAGE,
    state.ADD_PAGE,
  ]);
  const [changeModalText, changeModalType] = useModalStore((state) => [
    state.CHANGE_MODAL_TEXT,
    state.CHANGE_MODAL_TYPE,
  ]);

  // used when a person click on the 'upscale image' button
  const [addEnhanceImageToCache] = useCachedStore((store) => [
    store.ADD_ENHANCE_IMAGE_TO_CACHE,
  ]);

  if (doc === undefined || doc === null) return <></>;
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
              {Array.isArray(doc.url) && (
                <p className="text-center text-lg">
                  Set of {doc.url.length} images
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
                  switch (loginStatus) {
                    case "gold":
                      window.gtag(
                        "event",
                        "redirected_to_upscale_through_siteGallery",
                        {
                          secondDegCat,
                          imageRef: Array.isArray(doc.url)
                            ? doc.url[0].replace(
                                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                                ""
                              )
                            : doc.url.replace(
                                "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                                ""
                              ),
                        }
                      );
                      let toEnhance: imagetoEnhance | imagetoEnhance[];
                      if (
                        !Array.isArray(doc.url) &&
                        !Array.isArray(doc.real_url)
                      ) {
                        toEnhance = {
                          src: doc.tier === "bronze" ? doc.url : doc.real_url,
                          name: doc.tier === "bronze" ? doc.url : doc.real_url,
                          width: doc.width,
                          height: doc.height,
                        };
                      } else {
                        toEnhance = [];
                        for (let i = 0; i < doc.url.length; i++) {
                          toEnhance.push({
                            src:
                              doc.tier === "bronze"
                                ? doc.url[i]
                                : doc.real_url[i],
                            name:
                              doc.tier === "bronze"
                                ? doc.url[i]
                                : doc.real_url[i],
                            width: doc.width,
                            height: doc.height,
                          });
                        }
                      }

                      addEnhanceImageToCache(toEnhance);
                      return router.push("/image-enhancing/upscale");
                    case "not logged in":
                    case "unauthorized":
                      return setDialog({ name: "login", imgDoc: doc });
                    default:
                      return setDialog({ name: "paid", imgDoc: doc });
                  }
                }}
              >
                Upscale Image
              </button>
            </div>
            {Array.isArray(doc.url) ? (
              <DisplayDesignSet
                doc={doc as Omit<ImgDoc, "url"> & { url: string[] }}
                isMobile={isMobile}
              />
            ) : (
              <Image
                id="modal-modal-description"
                src={doc.url}
                width={
                  isMobile ? Math.min(doc.width, 256) : Math.min(doc.width, 512)
                }
                height={
                  isMobile
                    ? Math.min(doc.height, 256)
                    : Math.min(doc.height, 384)
                }
                style={{ objectFit: `scale-down` }}
                className="mx-auto overflow-hidden  rounded-sm lg:mx-0  "
                alt={doc.description}
              />
            )}
          </div>

          <div className="grid h-full w-full basis-1/5  grid-cols-2 flex-row items-center  justify-center gap-2 bg-brown-700    px-2  py-10  align-middle  md:flex md:flex-col md:space-x-0  md:space-y-16 md:px-0 ">
            <button
              className=" h-full w-full bg-yellow-700 text-yellow-200 drop-shadow-xl  transition-all duration-500  hover:bg-brown-500 hover:shadow-none md:h-12 md:w-36 "
              onClick={() => {
                const passedChecks = checkImageGalleryClick(
                  loginStatus,
                  doc,
                  setDialog,
                  changeModalType
                );
                if (passedChecks) {
                  window.gtag(
                    "event",
                    "redirected_to_edit_through_siteGallery",
                    {
                      imageRef: Array.isArray(doc.url)
                        ? doc.url[0].replace(
                            "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                            ""
                          )
                        : doc.url.replace(
                            "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                            ""
                          ),
                    }
                  );
                  return handleWebsiteGalleryEdit(
                    router,
                    ADD_IMAGE,
                    ADD_PAGE,
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
                //if the preview event has been fired once then it won't fire again
                if (sentPreviewEventToGTM) {
                  triggerMissingMockupFeature(
                    user ? user.uid : "not logged in",
                    changeModalText,
                    changeModalType
                  );
                } else {
                  changeModalText({
                    title: undefined,
                    text: "Previewing images on mockups is not yet available. We are sorry for the inconvenience",
                  });
                  changeModalType("missing-feature");
                }
                return (sentPreviewEventToGTM = false);
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
                  setDialog,
                  changeModalType
                );
                if (passedChecks) {
                  window.gtag("event", "downloaded_image_through_siteGallery", {
                    imageRef: Array.isArray(doc.url)
                      ? doc.url[0].replace(
                          "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o",
                          ""
                        )
                      : doc.url.replace(
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

export default FreeImageDialog;

interface DisplayDesignSetProps {
  doc: Omit<ImgDoc, "url"> & { url: string[] };
  isMobile: boolean;
}
const DisplayDesignSet = ({ doc, isMobile }: DisplayDesignSetProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const transRef = useSpringRef();
  const transitions = useTransition(carouselIndex, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate(-5%, 0)" },
    enter: { opacity: 1, transform: "translate(0, 0)" },
    leave: { opacity: 0, transform: "translate(5%, 0)" },
  });
  useEffect(() => {
    transRef.start();
  }, [carouselIndex]);
  return (
    <div className="relative flex w-full  justify-center align-middle">
      <div
        className="absolute top-0 flex h-8 translate-y-2 items-center justify-center  align-middle "
        style={{
          transform: `translateY(${isMobile ? 1536 / 8 : 1536 / 4})`,
          width: isMobile ? 1536 / 16 : 1536 / 8,
        }}
      >
        <button
          className=" z-10 mx-auto h-8 w-8 rounded-full bg-orange-500 transition-all duration-300 hover:bg-orange-700 disabled:bg-gray-500  "
          disabled={carouselIndex === 0}
          onClick={() => setCarouselIndex((v) => v - 1)}
        >
          <KeyboardArrowLeft />
        </button>
        <button
          className="z-10 mx-auto h-8 w-8 rounded-full bg-orange-500 transition-all duration-300 hover:bg-orange-700 disabled:bg-gray-500  "
          disabled={carouselIndex === doc.url.length - 1}
          onClick={() => setCarouselIndex((v) => v + 1)}
        >
          <KeyboardArrowRight />
        </button>
      </div>
      {transitions((style, i) => {
        const url = doc.url[i];
        return (
          <animated.div
            style={style}
            className=" absolute top-12 left-0 flex h-fit w-full    items-start  justify-start rounded-md align-top"
          >
            <Image
              id="modal-modal-description"
              src={url}
              style={{
                objectFit: `scale-down`,
                width: isMobile
                  ? Math.min(doc.width, 256)
                  : Math.min(doc.width, 512),
                height: isMobile
                  ? Math.min(doc.height, 256)
                  : Math.min(doc.height, 384),
              }}
              className="mx-auto overflow-hidden rounded-sm "
              alt={doc.description}
              width={
                isMobile ? Math.min(doc.width, 256) : Math.min(doc.width, 512)
              }
              height={
                isMobile ? Math.min(doc.height, 256) : Math.min(doc.height, 384)
              }
            />
          </animated.div>
        );
      })}
    </div>
  );
};
