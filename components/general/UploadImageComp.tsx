import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { db } from "../../firebase";
import {
  determineInputs,
  uploadImageSchema,
  UploadImgInputs,
} from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/determineInput";
import {
  getTagsFromTitle,
  uploadImageToStorage,
} from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/uploadImageToStorage";
import { makeID } from "../../model/GeneralFunctions";
import {
  gr_des_style_array,
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
} from "../../typings/image-types/ImageTypes";
import FirstDegreeInput from "../f302b492-a403-4ac8-9745-c4db741051c9/UploadImage/FirstDegreeInput";
import watermark from "watermarkjs";

interface props {
  LARGE_CATEGORY_OF_IMG: LARGE_CATEGORY_OF_IMG;
  SMALL_CATEGORY_OF_IMG: SMALL_CATEGORY_OF_IMG;
}
const watermarkOptions = {
  init(img) {
    img.crossOrigin = "anonymous";
  },
};
const UploadImageComp = ({
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
}: props) => {
  const canvasRef = useRef<MutableRefObject<HTMLCanvasElement | null>>(null);

  const [inputsArray, setInputsArray] = useState<null | [string | object]>(
    null
  );

  const [limEditionChecked, setLimEditionChecked] = useState(false);
  const [realImageChecked, setRealImageChecked] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadImgInputs>({
    resolver: zodResolver(uploadImageSchema),
  });
  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

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

  // Based on the categories that are passed down , this array and switch statement will be our method of calculating what inputs need to appear on the screen
  const [disableUpload, setDisableUpload] = useState(false);

  const onSubmit: SubmitHandler<UploadImgInputs> = async ({
    files,
    real_files,
    ...imgFields
  }) => {
    // if the image has a limited edition , convert it to a date format
    if (imgFields.lim_edition_expiration_date) {
      const string = imgFields.lim_edition_expiration_date;
      imgFields.lim_edition_expiration_date = new Date(string);
    }
    //Disable upload button while uploading
    setDisableUpload(true);
    const storageAddress = `product-images/${LARGE_CATEGORY_OF_IMG}/${SMALL_CATEGORY_OF_IMG}`;
    for (let i = 0; i < files.length; i++) {
      // Create a storage ref for the image

      let description: string;

      // if there is a real image (meaning the previous reference was for the image with the watercolors), create a reference for that image also

      description = files[i].name
        .replace(".png", "")
        .replace("_", "")
        .replace("Wildhide", "");
      const tags = getTagsFromTitle(description);
      const docFields = { tags, description, ...imgFields };
      // if the image needs to have a watermark added, then create a new image with the watermark
      if (realImageChecked) {
        watermark(
          [
            files[i],
            "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o/product-images%2Faw09rpoj2qw4pijawij41295.png?alt=media&token=bfd24342-12eb-4e69-99eb-6bab8c7efb6a",
          ],
          watermarkOptions
        )
          .image(watermark.image.lowerRight(0.5))
          .then((watermarkedImg) => {
            return uploadImageToStorage(
              storageAddress,
              files[i],
              doc,
              docFields,
              canvasRef,
              watermarkedImg.src
            );
          });
      } else {
        return uploadImageToStorage(
          storageAddress,
          files[i],
          doc,
          docFields,
          canvasRef
        );
      }
    }

    setDisableUpload(false);
    alert("done");
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
            Object.keys(imgField)[0] !== `menu_size` &&
            Object.keys(imgField)[0] !== `surr_env` &&
            Object.keys(imgField)[0] !== `material_type` &&
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

        <div>
          <label title="Limited edition image?">
            <span>Limited edition image?</span>
            <input
              type={"checkbox"}
              checked={limEditionChecked}
              onClick={(e) => setLimEditionChecked(e.currentTarget.checked)}
            />
          </label>
          {limEditionChecked && (
            <label title="choose end date">
              <input
                type={"datetime-local"}
                className={"text-black"}
                {...register("lim_edition_expiration_date")}
              />
            </label>
          )}
        </div>

        <div>
          <label title="are the first images watermarked images? upload the real ones">
            <span>
              are the first images watermarked images? upload the real ones
            </span>
            <input
              type={"checkbox"}
              checked={realImageChecked}
              onClick={(e) => setRealImageChecked(e.currentTarget.checked)}
            />
          </label>
        </div>

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
