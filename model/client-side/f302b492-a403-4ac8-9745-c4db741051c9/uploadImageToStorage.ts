import axios from "axios";
import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { MutableRefObject, RefObject } from "react";
import { ZodSchema } from "zod";
import { tagsArray } from "../../../constants/upload-image/Tags";
import { storage } from "../../../firebase";
import {
  banner_type_array,
  menu_size_array,
  SecondDegreeCategory,
  size_array,
  Valid_image_fields,
} from "../../../typings/image-types/ImageTypes";
import {
  cutlery_type_schema,
  shape_schema,
  surr_env_schema,
} from "../../../typings/image-types/imageZodSchemas";
import { makeID } from "../../GeneralFunctions";
import { buildRgb, ColorQuantization } from "./buildRGB";

const uploadToStorage = (storageRef: StorageReference, file: unknown) => {
  const uploadTask = uploadBytesResumable(storageRef, file);
  const url = uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    },
    (error) => {
      console.log(`error while uploading: `, error);
    }
  );
  return uploadTask;
};

/**
 * Uploads an image to the firebase storage. Throws potential errors
 * @param storageAddress The address in the firebase storage that you want the image to be uploaded in
 * @param file The file you are uploading
 * @param doc The document address in the firebase firestore database
 * @param docFields The document fields that you want to be put the previously mentioned firestore document
 * @param canvasRef A reference of a canvas that allows us to extract the colors of the image
 * @param sizeField Specify which typ  (if any) of size field you would like added based on the images width and height
 * @param real_file If you want to add watermarks to the previously uploaded image then this will be interpreted as the real image file whereas the previous one will be the one that has the watermark on it
 * @returns
 */
export const uploadImageToStorage = async (
  storageAddress: string,
  file: any,
  doc: CollectionReference<DocumentData>,
  docFields: { [key in Valid_image_fields]: any },
  canvasRef: RefObject<MutableRefObject<HTMLCanvasElement | null>>,
  sizeField?: "menu_size" | "size" | "banner_type",
  real_file?: any | undefined
) => {
  if (canvasRef.current === null) return;
  const storageRef = ref(storage, `${storageAddress}/${makeID(16)}.png`);

  const uploadTask = uploadToStorage(storageRef, file);

  if ((await uploadTask).state === "success") {
    const image = new Image();
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    const intermediateImgURL = URL.createObjectURL(file);
    image.src = intermediateImgURL;
    image.onload = () => {
      //ignore ts
      canvasRef.current.width = image.width;
      canvasRef.current.height = image.height;
      const width = image.width;
      const height = image.height;
      const ctx = canvasRef.current?.getContext(`2d`);
      ctx.drawImage(image, 0, 0);
      // Since we need to find the main colors of the image, we need to create a canvas and get the rgb data for each pixel. Then we do a median cut algorithm to find the colors that are most predominant. Now the value is hard coded at 3 (it's the second parameter of the ColorQuantization), which means it will return an array of 2. If it was 4 it would return 1, if it was 2 it would return 8 and so forth

      const imageData = ctx.getImageData(0, 0, width, height);
      const rgbArray = buildRgb(imageData.data);
      const MainColors = ColorQuantization(rgbArray, 3);
      if (sizeField === "size") {
        let size: (typeof size_array)[number];
        switch (true) {
          case width * height < 256 * 256:
            size = "<256x256";
            break;
          case width * height < 512 * 512:
            size = "256x256-512x512";
            break;
          case width * height < 1280 * 720:
            size = "512x512-1280x720";
            break;
          case width * height < 1920 * 1080:
            size = "1280x720-1920x1080";
            break;
          case width * height < 3840 * 2160:
            size = "1920x1080-4K";
            break;
          case width * height > 3840 * 2160:
            size = "4K+";
            break;
          default:
            size = undefined;
            throw new Error(
              `error at getting the size field value from the image resolution`
            );
        }
        docFields.size = size;
      }
      if (sizeField === "menu_size") {
        let menu_size: (typeof menu_size_array)[number];
        switch (true) {
          case 1940 <= width &&
            width <= 2540 &&
            2590 <= height &&
            height <= 2690:
            menu_size = "letter";
            break;
          case 1940 <= width &&
            width <= 2540 &&
            3310 <= height &&
            height <= 3410:
            menu_size = "legal";
            break;
          case 2590 <= width &&
            width <= 2690 &&
            4030 <= height &&
            height <= 4130:
            menu_size = "tabloid";
            break;
          case 970 <= width &&
            width <= 1070 &&
            2590 <= height &&
            height <= 2690:

          case width * height < 1020 * 2640:
            menu_size = "half-page";
            break;
          default:
            menu_size = "other-dimension";
        }
        docFields.menu_size = menu_size;
      }
      if (sizeField === "banner_type") {
        let banner_type: (typeof banner_type_array)[number];
        switch (true) {
          case 770 <= width && width <= 870 && 262 <= height && height <= 362:
            banner_type = "facebook-banner";
            break;
          case 1450 <= width && width <= 1550 && 450 <= height && height <= 550:
            banner_type = "twitter-banner";
            break;
          case 954 <= width && width <= 1054 && 718 <= height && height <= 818:
            banner_type = "website-banner";
            break;
          default:
            banner_type = "other-dimension";
        }
        docFields.menu_size = banner_type;
      }
      if (real_file === undefined) {
        addDoc(doc, {
          ...docFields,
          color: MainColors,
          url,
          width,
          height,
        });
      } else {
        const realStorageRef = ref(
          storage,
          `${storageAddress}/${makeID(16)}.png`
        );
        uploadString(realStorageRef, real_file, "data_url").then(async () => {
          getDownloadURL(realStorageRef).then((realImgUrl) => {
            addDoc(doc, {
              ...docFields,
              color: MainColors,
              url,
              realImgUrl,
              width,
              height,
            });
          });
        });
      }

      return console.log(`finished uploading the image`);
    };
  }
};

export const getTagsFromTitle = (
  title: string
): Array<(typeof tagsArray)[number]> => {
  const imageTags: (typeof tagsArray)[number][] = [];
  tagsArray.forEach((tag) => {
    const lowercaseTag = tag.toLowerCase();

    if (title.includes(lowercaseTag)) {
      imageTags.push(tag);
    }
  });
  return imageTags;
};

export const getImgFieldsFromTitle = (
  title: string,
  SecondDegreeCategory: SecondDegreeCategory,
  index: number
): { [key in Valid_image_fields]: string } => {
  const imgFields = new Map();
  const surr_env_regex = /surr_env=([A-Za-z0-9\-\_]*);/i;
  const cutlery_type_regex = /cutlery_type=([A-Za-z0-9\-\_]*);/i;
  const shape_regex = /shape=([A-Za-z0-9\-\_]*);/i;

  const insertImgField = (
    img_field: Valid_image_fields,
    img_field_regex: RegExp,
    schema: ZodSchema
  ) => {
    const img_field_match_arr = title.match(img_field_regex);
    if (img_field_match_arr === null) {
      throw new Error(
        `Could not find the required ${img_field} image field in the ${index}th image title`
      );
    } else {
      schema.parse(img_field_match_arr[1]);
      imgFields.set(img_field, img_field_match_arr[1]);
    }
  };

  switch (SecondDegreeCategory) {
    case "appetizers":
    case "banners":
    case "main-dishes":
    case "sweets-and-desserts":
    case "fast-foods":
    case "drinks":
    case "ingredients":
    case "tables":
      insertImgField(`surr_env`, surr_env_regex, surr_env_schema);
      break;
    case "cutleries-and-plates":
      insertImgField(`surr_env`, surr_env_regex, surr_env_schema);
      insertImgField("cutlery_type", cutlery_type_regex, cutlery_type_schema);
      break;
    case "flyers":
      insertImgField("shape", shape_regex, shape_schema);
      break;
    default:
      break;
  }
  return Object.fromEntries(imgFields);
};
