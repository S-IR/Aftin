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
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { db } from "../../firebase";
import {
  determineInputs,
  uploadImageSchema,
  UploadImgInputs,
} from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/determineInput";
import {
  getImgFieldsFromTitle,
  getSizeField,
  getTagsFromTitle,
  uploadImageSetToStorage,
  uploadImageToStorage,
} from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/uploadImageToStorage";
import { makeID } from "../../model/GeneralFunctions";
import {
  gr_des_style_array,
  FirstDegreeCategory,
  SecondDegreeCategory,
  ImgDoc,
  tier_array,
} from "../../typings/image-types/ImageTypes";
import { AdvertImagesOptionsSchema } from "../../typings/image-types/imageZodSchemas";
import FirstDegreeInput from "../f302b492-a403-4ac8-9745-c4db741051c9/UploadImage/FirstDegreeInput";
import LoadingScreen from "./LoadingScreen";
import { addImageWatermark } from "../../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/addWatermark";

interface props {
  FirstDegreeCategory: FirstDegreeCategory;
  SecondDegreeCategory: SecondDegreeCategory;
}
export type UploadImageForm = {
  files: FileList;
  tier: (typeof tier_array)[number];
  real_files?: FileList;
  lim_edition_expiration_date?: Date;
};
const UploadImageComp = ({
  FirstDegreeCategory,
  SecondDegreeCategory,
}: props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const inputsArray = useMemo(
    () => determineInputs(FirstDegreeCategory, SecondDegreeCategory),
    [FirstDegreeCategory, SecondDegreeCategory]
  );

  const [limEditionChecked, setLimEditionChecked] = useState(false);
  const [isDesignSet, setIsDesignSet] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadImageForm>({
    resolver: zodResolver(uploadImageSchema),
  });
  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  const doc = collection(
    db,
    `${FirstDegreeCategory}/${SecondDegreeCategory}/Images`
  );

  // Based on the categories that are passed down , this array and switch statement will be our method of calculating what inputs need to appear on the screen
  const [disableUpload, setDisableUpload] = useState(false);
  const storageAddress = `product-images/${FirstDegreeCategory}/${SecondDegreeCategory}`;

  const onSubmit: SubmitHandler<UploadImageForm> = async ({
    files,
    real_files,
    ...imgFields
  }) => {
    setDisableUpload(true);
    try {
      console.log(`imgFields.tier`, imgFields.tier);

      let realImageChecked =
        imgFields.tier === "silver" || imgFields.tier === "gold";
      setDisableUpload(true);
      console.log(`realImageChecked`, realImageChecked);

      // if the image has a limited edition , convert it to a date format
      if (imgFields.lim_edition_expiration_date) {
        const string = imgFields.lim_edition_expiration_date;
        imgFields.lim_edition_expiration_date = new Date(string);
      }
      //Disable upload button while uploading
      // setDisableUpload(true);
      if (isDesignSet) {
        const uniqueImageFields = getImgFieldsFromTitle(
          files[0].name,
          SecondDegreeCategory,
          0
        );
        const tags = getTagsFromTitle(uniqueImageFields.description as string);

        imgFields = Object.assign(uniqueImageFields, imgFields);
        const sizeField = getSizeField(SecondDegreeCategory);

        const docFields = { tags, ...imgFields };
        if (realImageChecked) {
          let watermarkLinksArr: string[] | undefined;
          for (let i = 0; i < files.length; i++) {
            const watermarkedImg = await addImageWatermark(files[i]);
            watermarkLinksArr?.push(watermarkedImg);
          }
          uploadImageSetToStorage(
            storageAddress,
            files,
            doc,
            docFields,
            canvasRef,
            sizeField,
            watermarkLinksArr
          ).then(() => setDisableUpload(false));
        } else {
          uploadImageSetToStorage(
            storageAddress,
            files,
            doc,
            docFields,
            canvasRef,
            sizeField
          ).then(() => setDisableUpload(false));
        }
      } else {
        const forLoop = async () => {
          for (let i = 0; i < files.length; i++) {
            // Create a storage ref for the image

            // if there is a real image (meaning the previous reference was for the image with the watercolors), create a reference for that image also

            const uniqueImageFields = getImgFieldsFromTitle(
              files[i].name,
              SecondDegreeCategory,
              i
            );
            const tags = getTagsFromTitle(
              uniqueImageFields.description as string
            );

            imgFields = Object.assign(uniqueImageFields, imgFields);
            const sizeField = getSizeField(SecondDegreeCategory);

            const docFields = { tags, ...imgFields };

            // if the image needs to have a watermark added, then create a new image with the watermark
            if (realImageChecked) {
              const watermarkImg = await addImageWatermark(files[i]);
              console.log("watermarkImg", watermarkImg);
              uploadImageToStorage(
                storageAddress,
                files[i],
                doc,
                docFields,
                canvasRef,
                sizeField,
                watermarkImg
              );
            } else {
              uploadImageToStorage(
                storageAddress,
                files[i],
                doc,
                docFields,
                canvasRef,
                sizeField
              );
            }
          }
        };

        forLoop().then(() => setDisableUpload(false));
      }
    } catch (error) {
      setDisableUpload(false);
      throw error;
    }
  };
  useEffect(() => {
    console.log("disabledUpload", disableUpload);
  }, [disableUpload]);

  if (!inputsArray)
    return <div>somehow this appeared without any inputs to show</div>;

  return (
    <div className="w-full bg-gray-500">
      {disableUpload === true && <LoadingScreen isLoading={disableUpload} />}
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
            Object.keys(imgField)[0] !== `tier` &&
            Object.keys(imgField)[0] !== `thirdDegreeCategory`;

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

        {FirstDegreeCategory === "graphic-designs" && (
          <div>
            <label title="Toggle if the images that you're uploading are from a set">
              <span>Design set?</span>
              <input
                type={"checkbox"}
                checked={isDesignSet}
                onClick={(e) => setIsDesignSet(e.currentTarget.checked)}
              />
            </label>
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={disableUpload}
            className="general-buttons !m-0 disabled:bg-gray-500"
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
