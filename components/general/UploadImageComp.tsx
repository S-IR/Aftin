import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../../firebase";
import { determineInputs } from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/determineInput";
import {
  getTagsFromTitle,
  uploadImageToStorage,
} from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/uploadImageToStorage";
import { makeID } from "../../model/GeneralFunctions";
import {
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
} from "../../typings/image-types/ImageTypes";
import FirstDegreeInput from "../f302b492-a403-4ac8-9745-c4db741051c9/UploadImage/FirstDegreeInput";

export type UploadImgInputs = {
  files: File[];
  inputName: string;
};

interface props {
  LARGE_CATEGORY_OF_IMG: LARGE_CATEGORY_OF_IMG;
  SMALL_CATEGORY_OF_IMG: SMALL_CATEGORY_OF_IMG;
}

const UploadImageComp = ({
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
}: props) => {
  const canvasRef = useRef<MutableRefObject<HTMLCanvasElement | null>>(null);

  const [inputsArray, setInputsArray] = useState<null | [string | object]>(
    null
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadImgInputs>();

  //whenever the choosen categories change this function will run to recalculate the what categories to show
  useEffect(() => {
    const Array = determineInputs(LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG);
    setInputsArray(Array);
  }, [LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG]);

  const doc = collection(
    db,
    `${LARGE_CATEGORY_OF_IMG}/${SMALL_CATEGORY_OF_IMG}/Images`
  );
  const storage = getStorage();

  const views = 0;

  // Based on the categories that are passed down , this array and switch statement will be our method of calculating what inputs need to appear on the screen
  const [disableUpload, setDisableUpload] = useState(false);

  const onSubmit: SubmitHandler<UploadImgInputs> = async ({
    files,
    ...imgFields
  }) => {
    Object.values(files).forEach((file, i) => {
      const storageRef = ref(
        storage,
        `product-images/${LARGE_CATEGORY_OF_IMG}/${SMALL_CATEGORY_OF_IMG}/${makeID(
          16
        )}.png`
      );
      setDisableUpload(true);
      const imgName = file.name.replace(".png", "");
      const description =
        `${LARGE_CATEGORY_OF_IMG} , ${SMALL_CATEGORY_OF_IMG}, ${imgName}`.replace(
          "_",
          " "
        );
      const tags = getTagsFromTitle(description);
      const docFields = { views, tags, description, ...imgFields };
      uploadImageToStorage(storageRef, file, doc, docFields, canvasRef).then(
        () => {
          setDisableUpload(false);
          alert(`finished uploading the ${i}th image`);
        }
      );
    });
  };

  if (!inputsArray)
    return <div>somehow this appeared without any inputs to show</div>;
  return (
    <div className="w-full bg-gray-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 row-span-1 mx-5 flex-row items-center justify-center  space-y-8 rounded-sm bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-4 text-white sm:w-auto  md:max-w-md md:px-14"
      >
        <label className="inline-block w-full">
          <input
            type="file"
            multiple
            placeholder="Upload Image"
            className="input"
            {...register("files", {
              required: true,
            })}
          />
          {errors.files && (
            <p className="p-1 text-[13px] text-orange-500">
              Please enter a valid image
            </p>
          )}
        </label>
        {inputsArray.map((imgField, i) => {
          // if the field is not description or color scheme, make it appear on screen to be modified
          if (
            Object.keys(imgField)[0] === `color_scheme` ||
            Object.keys(imgField)[0] === `description`
          )
            return;

          //
          const allowMultipleOptions =
            Object.keys(imgField)[0] !== `size` &&
            Object.keys(imgField)[0] !== `surr_env` &&
            Object.keys(imgField)[0] !== `tier`;
          return (
            <FirstDegreeInput
              key={i}
              allowMultipleOptions={allowMultipleOptions}
              imgField={imgField}
              register={register}
              errors={errors}
            />
          );
        })}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={disableUpload}
            className="general-buttons !m-0"
          >
            Upload
          </button>
        </div>
      </form>

      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default UploadImageComp;
