import React, {
  ChangeEvent,
  ChangeEventHandler,
  DragEventHandler,
  useCallback,
  useEffect,
} from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import { uploadImageToPreview } from "../../model/client-side/mockups/PreviewUpload";

interface props {}

const PreviewDropzoneComp = ({}: props) => {
  const [ADD_IMAGE] = useMockupsStore((state) => [state.ADD_IMAGE]);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (acceptedFiles: FileList | null) => {
      uploadImageToPreview(ADD_IMAGE, acceptedFiles);
    },
    []
  );
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      uploadImageToPreview(ADD_IMAGE, e.target.files);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={` flex h-full w-full items-center justify-center transition-all duration-300 `}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex h-[100vh] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-orange-300 bg-orange-900 bg-opacity-40  hover:bg-orange-600 hover:opacity-50 ${
          isDragActive ? "bg-purple-500" : ""
        } duration-400 transition-all`}
      >
        <div
          {...getRootProps({
            className:
              "flex flex-col justify-center items-center  h-full w-full",
          })}
        >
          <UploadFileIcon className="m-4  " />
          <p className="flex flex-col text-center text-xl text-orange-200 ">
            <span className="font-semibold">Click to upload an image</span>or
            drag and drop
          </p>
          <p className="text-lg text-orange-200 ">
            Drop an image in order to preview how it will look on some mock-ups
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

export default PreviewDropzoneComp;
