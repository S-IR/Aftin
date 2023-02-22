import { Dialog, DialogContent, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BiDollar, BiDollarCircle } from "react-icons/bi";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";
import {
  handleSubCatDownload,
  handleSubCatEdit,
  checkModalButtonClick,
} from "../../model/client-side/subCat/modalButtons";
import { useAppDispatch } from "../../Redux/hooks";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../typings/typings";

import Button from "./Button";
import LoginFirstDialog from "./dialog-boxes/LoginFirstDialog";
import Loading from "./Loading";

interface props {
  doc: ImgDoc;
  dialog: null | "free" | "paid";
  setDialog: React.Dispatch<React.SetStateAction<null | "free" | "paid">>;
  loginStatus: LoginStatus;
  isMobile: boolean;
}

const FreeImageModal: FC<props> = ({
  doc,
  dialog,
  setDialog,
  loginStatus,
  isMobile,
}) => {
  const router = useRouter();
  const subCat = router.query.subCat;
  const dispatch = useAppDispatch();
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <Dialog
        open={dialog === "free"}
        onClose={() => setDialog(null)}
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
            "flex h-[75vh] w-[75vw] items-center justify-center rounded-lg border-4 border-gray-500/40  !p-0 align-middle"
          }
        >
          <div className=" flex h-full w-full basis-4/5   bg-gradient-to-r from-brown-300 to-brown-600 py-4 align-middle shadow-lg shadow-gray-200 ">
            {doc.tier !== "bronze" && (
              <div className="absolute top-2 left-2 flex items-center justify-center align-middle text-gray-100">
                <BiDollarCircle className="h-8 w-8" color="#E5E7EBF" />
                Premium
              </div>
            )}
            <div
              className={
                " mx-10 my-8 flex flex-col space-y-10 p-2  shadow-inner shadow-gray-300 "
              }
            >
              <p className="text-center text-lg">
                <span className="text-gray-500">Resolution:</span> <br></br>
                {`${doc.width} x ${doc.height}`}
              </p>
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
                            subCat,
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

              <button className=" rounded-sm bg-yellow-700 p-2 text-yellow-200 drop-shadow-xl  transition-all duration-500 hover:bg-yellow-500 hover:shadow-none">
                Upscale Image
              </button>
            </div>
            <Image
              id="modal-modal-description"
              src={doc.url}
              width={
                isMobile ? Math.min(doc.width, 256) : Math.min(doc.width, 512)
              }
              height={
                isMobile ? Math.min(doc.height, 256) : Math.min(doc.height, 384)
              }
              objectFit={`scale-down`}
              className=" overflow-hidden rounded-sm "
              alt={doc.description}
            />
          </div>

          <div className="flex h-full basis-1/5  flex-col items-center justify-center space-y-16 bg-brown-700 py-10  align-middle ">
            <button
              className=" h-12 w-36 bg-yellow-700  text-yellow-200 drop-shadow-xl  transition-all duration-500 hover:bg-brown-500   hover:shadow-none "
              onClick={() => {
                const passedChecks = checkModalButtonClick(
                  loginStatus,
                  doc.tier,
                  setDialog,
                  setOpenLogin
                );
                if (passedChecks)
                  return handleSubCatEdit(
                    router,
                    dispatch,
                    doc.url,
                    doc.width,
                    doc.height
                  );
              }}
            >
              Edit Picture
            </button>
            <button
              className=" h-12 w-36 bg-yellow-700  text-yellow-200 drop-shadow-xl   transition-all   duration-500 hover:bg-brown-500   hover:shadow-none "
              onClick={() => setDialog(null)}
            >
              Preview
            </button>
            <button
              className=" h-12 w-36 bg-yellow-700  text-yellow-200 drop-shadow-xl   transition-all   duration-500 hover:bg-brown-500   hover:shadow-none "
              onClick={() => {
                const passedChecks = checkModalButtonClick(
                  loginStatus,
                  doc.tier,
                  setDialog,
                  setOpenLogin
                );
                if (passedChecks)
                  return handleSubCatDownload(
                    loginStatus,
                    router,
                    doc.url,
                    doc.width,
                    doc.height,
                    dispatch
                  );
              }}
            >
              Download
            </button>

            <button
              className=" h-12 w-36 justify-center bg-yellow-700  text-yellow-200 drop-shadow-xl   transition-all   duration-500 hover:bg-brown-500  hover:shadow-none"
              onClick={() => setDialog(null)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <LoginFirstDialog open={openLogin} setOpen={setOpenLogin} imgDoc={doc} />
    </>
  );
};

export default FreeImageModal;
