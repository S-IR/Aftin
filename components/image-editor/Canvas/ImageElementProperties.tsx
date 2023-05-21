import React, { useCallback, useState } from "react";
import { BiCrop, BiFilter } from "react-icons/bi";
import { MdFindReplace, MdRotateRight, MdTune } from "react-icons/md";
import Button from "../../general/Button";
import { Crop, Delete } from "@mui/icons-material";
import { Filter } from "../Sidebar";

import styles from "../../../styles/image-editor/image-editor.module.css";
import { imageFilterProperties } from "../../../constants/image-editor/imageFilters";
import {
  canvasSelected,
  useCanvasState,
} from "../../../zustand/CanvasStore/store";
import { Alert } from "@mui/material";
import { auth } from "../../../firebase";
import { imageData } from "../../../zustand/CanvasStore/imageHandlers";
import { useAuthState } from "react-firebase-hooks/auth";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";
import { useIsMobile } from "../../../hooks/useIsMobile";
interface props {
  imageData: imageData;
  selected: canvasSelected;
  imageFilter: imageFilterProperties;
}

const ImageElementProperties = ({
  imageData,
  selected,
  imageFilter,
}: props) => {
  const { page: pageId, element: elementId } = selected;
  const [deleteWarningHappened, setDeleteWarningHappened] = useState(false);
  const [changeModalText, changeModalType] = useModalStore((store) => [
    store.CHANGE_MODAL_TEXT,
    store.CHANGE_MODAL_TYPE,
  ]);
  const [SET_CROP, SET_HAS_CROP, DELETE_ELEMENT, RESET_IMAGE_FILTER] =
    useCanvasState((state) => [
      state.SET_CROP,
      state.SET_HAS_CROP,
      state.DELETE_ELEMENT,
      state.RESET_IMAGE_FILTER,
    ]);

  const brightness = imageFilter?.brightness;
  const contrast = imageFilter?.contrast;
  const blur = imageFilter?.blur;

  const [user, userLoading] = useAuthState(auth);
  if (imageData.crop === true) {
    return (
      <div className="flex h-full w-full items-center justify-center align-middle">
        <button
          className=" group flex h-24 w-24 items-center justify-center rounded-sm bg-gradient-to-b from-yellow-700 to-yellow-800 p-2 font-serif  font-bold shadow-black drop-shadow-lg  transition-all duration-300 hover:bg-yellow-500 hover:drop-shadow-md active:drop-shadow-none"
          onClick={() => {
            SET_CROP(pageId as number, elementId as number);
            SET_HAS_CROP(pageId as number, elementId as number);
          }}
        >
          Save Crop
        </button>
      </div>
    );
  }
  if (pageId === null || elementId === null) {
    console.log("there is no selected image or page for the filter component");
    return <></>;
  }
  const isMobile = useIsMobile();
  return (
    <>
      <div className=" w-full border-b-4 border-gray-200 py-5">
        <Filter
          key={"brightness"}
          option={brightness}
          label={"brightness"}
          pageId={pageId}
          elementId={elementId}
        />
        <Filter
          key={"contrast"}
          option={contrast}
          label={"contrast"}
          pageId={pageId}
          elementId={elementId}
        />
        <Filter
          key={"blur"}
          option={blur}
          label={"blur"}
          pageId={pageId}
          elementId={elementId}
        />
        <div className="flex w-full items-center justify-center">
          <button
            className={` my-8  h-12 w-48 ${styles.generalButton} text-xl `}
            onClick={() => RESET_IMAGE_FILTER(pageId, elementId)}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Edit buttons div */}
      <div className="mt-4 flex w-full flex-col items-center justify-center space-y-6 align-middle">
        <button
          className="group flex h-12  w-56  items-center justify-start bg-yellow-900 bg-opacity-70 text-center align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500   "
          onClick={() => SET_CROP(pageId, elementId)}
        >
          <Crop className=" ml-6 h-8 w-8" />
          <p className=" transition-all duration-300 ">Crop Imagess</p>
        </button>
        <button
          className="group flex h-12  w-56  items-center justify-start bg-yellow-900 bg-opacity-70 text-center align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500   "
          onClick={() => {
            window.gtag(`event`, "image_editor_similar_images_clicked", {
              userId: user ? user.uid : "not logged in",
            });
            changeModalText({
              title: undefined,
              text: "Searching and importing similar images with your provided image is not yet available. We are sorry for the inconvenience",
            });
            return changeModalType("missing-feature");
          }}
        >
          <MdFindReplace className=" ml-6 h-8 w-8" />
          <p className=" transition-all duration-300 ">Similar Images</p>
        </button>
        <div className=" flex justify-center">
          <button
            className=" flex h-12  w-56 items-center justify-start bg-yellow-900 bg-opacity-70 align-middle  shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 "
            onClick={(e) => {
              if (pageId === 0 && elementId === 0 && !deleteWarningHappened) {
                return setDeleteWarningHappened(true);
              }
              setDeleteWarningHappened(false);
              DELETE_ELEMENT(pageId, elementId);
            }}
          >
            <Delete className=" ml-6 mb-0 h-8 w-8" />
            Delete Component
          </button>
        </div>
        {deleteWarningHappened === true ? (
          <Alert className="!max-w-full !rounded-none  " severity="error">
            If you delete this component all of your editing progress on the
            page will be lost. Click again on the delete button if you want to
            continue
          </Alert>
        ) : (
          <></>
        )}
      </div>
      {/* Crop button */}

      {deleteWarningHappened !== true && !isMobile && (
        <div className="absolute bottom-0 left-5  m-2 flex h-12 w-60 items-center justify-center rounded-full  bg-blue-800 bg-opacity-60 font-bold shadow-md shadow-gray-500">
          H :{" "}
          <p className="m-2 underline">
            {(imageData.height * imageData.scaleY).toFixed(0)}
          </p>
          W :{" "}
          <p className="m-2 underline">
            {(imageData.width * imageData.scaleX).toFixed(0)}
          </p>{" "}
          |
          <MdRotateRight className="m-2 h-5 w-5" />
          <p>{imageData.rotate}</p>
        </div>
      )}
    </>
  );
};

export default ImageElementProperties;
