import React, {
  ChangeEvent,
  ChangeEventHandler,
  DragEventHandler,
  useCallback,
  useEffect,
} from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { uploadImageToCanvas } from "../../model/client-side/image-editor/Upload";
import { canvasPagesCount } from "../../features/canvasPages/canvas-elements/canvasPageSlice";
import { useCanvasState } from "../../zustand/CanvasStore/store";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
  showSidebar: boolean;
}

const DropzoneComp = ({ setActiveSidebar, showSidebar }: props) => {
  const [ADD_IMAGE, { page: pageId }] = useCanvasState((state) => [
    state.ADD_IMAGE,
    state.selected,
  ]);

  const onDrop = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ): void => {
    uploadImageToCanvas(ADD_IMAGE, pageId, acceptedFiles);
    return setActiveSidebar("Stylize");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: onDrop,
  });

  return (
    <div
      className={`${
        showSidebar ? `ml-[340px] md:ml-[560px]` : "ml-[16vw] md:ml-[8vw]"
      } z-0 mt-4 flex  h-[90vh]  w-3/4 items-center justify-center transition-all duration-300 md:h-[90vh] md:w-1/2 `}
    >
      <div
        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-800 bg-opacity-40 hover:bg-gray-400 hover:opacity-50  ${
          isDragActive ? "bg-purple-500" : ""
        } duration-400 transition-all`}
        {...getRootProps({})}
      >
        <div className="flex flex-col items-center justify-center align-middle">
          <UploadFileIcon className="m-4  " />
          <p className="mb-2 flex flex-col text-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload an image</span>or
            drag and drop
          </p>
          <p className="mx-4 text-xs text-gray-500 dark:text-gray-400">
            PNG, JPEG or JPG. Anything bigger than 1550 width or 1000 height
            will be scaled down{" "}
          </p>
        </div>
        <input
          {...getInputProps({
            id: "dropzone-file",
            type: "file",
            className: "hidden",
          })}
        />
      </div>
    </div>
  );
};

export default DropzoneComp;
