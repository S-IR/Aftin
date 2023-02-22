import React, {
  ChangeEvent,
  ChangeEventHandler,
  DragEventHandler,
  useCallback,
  useEffect,
} from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { uploadImageToCanvas } from "../../model/client-side/image-editor/Upload";
import { canvasPagesCount } from "../../features/canvasPages/canvas-elements/canvasPageSlice";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
  showSidebar: boolean;
}

const DropzoneComp = ({ setActiveSidebar, showSidebar }: props) => {
  const dispatch = useAppDispatch();
  const pageId = useAppSelector(canvasPagesCount).present.pages.length - 1;

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (acceptedFiles: FileList | null) => {
      uploadImageToCanvas(dispatch, pageId, acceptedFiles);
      setActiveSidebar("Stylize");
    },
    []
  );
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      uploadImageToCanvas(dispatch, pageId, e.target.files);
      setActiveSidebar("Stylize");
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`${
        showSidebar ? `ml-[560px]` : "ml-[8vw]"
      } mt-4 flex h-full w-full items-center justify-center transition-all duration-300 `}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex h-[100vh] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-800 bg-opacity-40  hover:bg-gray-400 hover:opacity-50 ${
          isDragActive ? "bg-purple-500" : ""
        } duration-400 transition-all`}
      >
        <div
          {...getRootProps({
            className:
              "flex flex-col justify-center items-center pt-5 pb-6 h-full w-full",
          })}
        >
          <UploadFileIcon className="m-4  " />
          <p className="mb-2 flex flex-col text-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload an image</span>or
            drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPEG or JPG. Anything bigger than 1550 width or 1000 height
            will be scaled down{" "}
          </p>
        </div>
        <input
          {...getInputProps({
            id: "dropzone-file",
            type: "file",
            className: "hidden",
            onChange: onChange,
            onDrop: onDrop,
          })}
        />
      </label>
    </div>
  );
};

export default DropzoneComp;
