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
  ImgDoc,
  menu_size_array,
  SecondDegreeCategory,
  size_array,
  Valid_image_fields,
} from "../../../typings/image-types/ImageTypes";
import {
  AdvertImagesOptionsSchema,
  banner_type_schema,
  cutlery_type_schema,
  menu_size_schema,
  shape_schema,
  surr_env_schema,
} from "../../../typings/image-types/imageZodSchemas";
import { makeID } from "../../GeneralFunctions";
import { buildRgb, ColorQuantization } from "./buildRGB";
type sizeField = "size" | "menu_size" | "banner_type";

//represents the number that the image will have in the firebase storage
const imageNameLen = 16;
const imageType = `png`;

const uploadToStorage = (
  storageRef: StorageReference,
  file: FileList[number] | Blob
) => {
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

export const uploadImageSetToStorage = async (
  storageAddress: string,
  files: FileList,
  doc: CollectionReference<DocumentData>,
  docFields: Partial<ImgDoc>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sizeField?: sizeField,
  watermarked_images?: Blob[]
) => {
  const urlArr: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const storageRef = ref(
      storage,
      `${storageAddress}/${makeID(16)}.${imageType}`
    );
    const uploadTask = uploadToStorage(storageRef, files[i]);
    (await uploadTask).state === "success";
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    urlArr.push(url);
  }
  if (urlArr.length < files.length)
    throw new Error(
      "the urlArr length is smaller than the files length at uploadImageSetToStorage"
    );
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = urlArr[0];
  image.onload = async () => {
    if (canvasRef.current === null) throw new Error("The canvas ref is null");

    const MainColors = getColorsFromImg(canvasRef.current, image);
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    if (sizeField) {
      setSizeField(width, height, docFields, sizeField);
    }

    if (watermarked_images === undefined) {
      addDoc(doc, {
        ...docFields,
        color: MainColors,
        url: urlArr,
        width,
        height,
      });
    } else {
      let watermarkImgArr: string[] = [];
      for (let i = 0; i < watermarked_images.length; i++) {
        const watermarkStorage = ref(
          storage,
          `${storageAddress}/${makeID(imageNameLen)}.${imageType}`
        );
        const watermarkUploadTask = uploadToStorage(
          watermarkStorage,
          watermarked_images[i]
        );
        (await watermarkUploadTask).state === "success";

        const watermarkedImg = await getDownloadURL(watermarkStorage);
        // const encryptedUrl = await encryptURL(url);
        watermarkImgArr.push(watermarkedImg);
      }

      if (urlArr.length < watermarked_images.length)
        throw new Error(
          "the realImgUrl.length is smaller than the real_image_urls.length at uploadImageSetToStorage"
        );
      addDoc(doc, {
        ...docFields,
        color: MainColors,
        url: watermarkImgArr,
        real_url: urlArr,
        width,
        height,
      });
    }

    return console.log(`finished uploading the set`);
  };
};

/**
 * Uploads an image to the firebase storage. Throws potential errors
 * @param storageAddress The address in the firebase storage that you want the image to be uploaded in
 * @param file The file you are uploading
 * @param doc The document address in the firebase firestore database
 * @param docFields The document fields that you want to be put the previously mentioned firestore document
 * @param canvasRef A reference of a canvas that allows us to extract the colors of the image
 * @param sizeField Specify which type  (if any) of size field you would like added based on the images width and height
 * @param watermarkedImg If you want to add watermarks to the previously uploaded image then this should be a blob of the watermarked image
 * @returns
 */
export const uploadImageToStorage = async (
  storageAddress: string,
  file: FileList[number],
  doc: CollectionReference<DocumentData>,
  docFields: Partial<ImgDoc>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sizeField?: sizeField,
  watermarkedImg?: Blob
) => {
  const storageRef = ref(
    storage,
    `${storageAddress}/${makeID(16)}.${imageType}`
  );
  const uploadTask = uploadToStorage(storageRef, file);

  (await uploadTask).state === "success";
  const image = new Image();
  const url = await getDownloadURL(uploadTask.snapshot.ref);
  if (url === undefined)
    throw new Error("url undefined at uploadImageToStorage");
  image.crossOrigin = "Anonymous";

  image.src = url;
  image.onload = async () => {
    if (canvasRef.current === null) throw new Error("The canvas ref is null");

    const MainColors = getColorsFromImg(canvasRef.current, image);
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    if (sizeField) {
      setSizeField(width, height, docFields, sizeField);
    }

    if (watermarkedImg === undefined) {
      addDoc(doc, {
        ...docFields,
        color: MainColors,
        url,
        width,
        height,
      });
    } else {
      const watermarkStorageRef = ref(
        storage,
        `${storageAddress}/${makeID(imageNameLen)}.${imageType}`
      );
      const watermarkUploadTask = uploadToStorage(
        watermarkStorageRef,
        watermarkedImg
      );
      (await watermarkUploadTask).state === "success";

      const watermarkUrl = await getDownloadURL(watermarkStorageRef);
      console.log("watermarkUrl", watermarkUrl);

      addDoc(doc, {
        ...docFields,
        color: MainColors,
        url: watermarkUrl,
        real_url: url,
        width,
        height,
      });
    }

    return console.log(`finished uploading the image`);
  };
};

/**
 * Uploads the image to a canvas and then proceeds to get all of the preodminant colors in that image
 * @param canvas html canvass
 * @param image the image that you're trying to find the colors for
 * @returns check RGBValues type
 */
const getColorsFromImg = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
) => {
  canvas.width = image.width;
  canvas.height = image.height;
  const width = image.width;
  const height = image.height;
  const ctx = canvas.getContext(`2d`);
  if (ctx === null) throw new Error("context is null");
  ctx.drawImage(image, 0, 0);
  // Since we need to find the main colors of the image, we need to create a canvas and get the rgb data for each pixel. Then we do a median cut algorithm to find the colors that are most predominant. Now the value is hard coded at 3 (it's the second parameter of the ColorQuantization), which means it will return an array of 2. If it was 4 it would return 1, if it was 2 it would return 8 and so forth

  const imageData = ctx.getImageData(0, 0, width, height);
  const rgbArray = buildRgb(imageData.data);
  const MainColors = ColorQuantization(rgbArray, 3);
  return MainColors;
};
const setSizeField = (
  width: number,
  height: number,
  docFields: Partial<ImgDoc>,
  sizeField: sizeField
) => {
  if (sizeField === "size") {
    let size: (typeof size_array)[number];
    switch (true) {
      case width < 257 && height < 257:
        size = "<256x256";
        break;
      case width < 513 && height < 513:
        size = "256x256-512x512";
        break;
      case width < 1025 && height < 1025:
        size = "512x512-1024-1024";
        break;
      case width < 1921 && height < 1081:
        size = "2K";
        break;
      case width < 3840 && height < 2161:
        size = "2K-4K";
        break;
      case width > 3840 && height > 2160:
        size = "4K+";
        break;
      default:
        throw new Error(
          `error at getting the size field value from the image resolution`
        );
    }
    docFields.size = size;
  }
  if (sizeField === "menu_size") {
    let menu_size: (typeof menu_size_array)[number];
    switch (true) {
      case 1940 <= width && width <= 2540 && 2590 <= height && height <= 2690:
        menu_size = "letter";
        break;
      case 1940 <= width && width <= 2540 && 3310 <= height && height <= 3410:
        menu_size = "legal";
        break;
      case 2590 <= width && width <= 2690 && 4030 <= height && height <= 4130:
        menu_size = "tabloid";
        break;
      case 970 <= width && width <= 1070 && 2590 <= height && height <= 2690:

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
    docFields.banner_type = banner_type;
  }
};

const encryptURL = async (url: string): Promise<string> => {
  const encryptionRes = await fetch(
    `/api/products/images/encrypt?url=${encodeURIComponent(url)}`
  );
  const encodedUrlRes = await encryptionRes.json();
  return encodedUrlRes.imageUrl as string;
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
): Partial<ImgDoc> => {
  const imgFields = new Map();
  const surr_env_regex = /SURR_ENV=([A-Za-z0-9\-\_]*);/i;
  const cutlery_type_regex = /cutlery_type=([A-Za-z0-9\-\_]*);/i;
  const shape_regex = /shape=([A-Za-z0-9\-\_]*);/i;
  const menu_size_regex = /MENU_SIZE=([A-Za-z0-9\-\_]*);/i;
  const banner_type_regex = /BANNER_TYPE=([A-Za-z0-9\-\_]*);/i;
  const style_regex = /STYLE=([A-Za-z0-9\-\_]*);/i;

  let description = title.replace(".png", "").replace("Wildhide", "");

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
      schema.parse(img_field_match_arr[1].toLowerCase());
      imgFields.set(img_field, img_field_match_arr[1].toLowerCase());
      description = description
        .replace(img_field_match_arr[1], "")
        .replace(`${img_field}=`, "");
    }
  };

  switch (SecondDegreeCategory) {
    case "appetizers":
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
    case "brochures":
      insertImgField("shape", shape_regex, shape_schema);
      insertImgField("menu_size", menu_size_regex, menu_size_schema);
      break;
    case "menus":
      insertImgField("menu_size", menu_size_regex, menu_size_schema);
    case "banners":
      insertImgField("banner_type", banner_type_regex, banner_type_schema);
    default:
      break;
  }
  description = description
    .replaceAll(";", "")
    .replaceAll(/[0-9]/g, "")
    .replaceAll("_", "");

  imgFields.set("description", description);

  return Object.fromEntries(imgFields);
};
export function getSizeField(
  SecondDegreeCategory: SecondDegreeCategory
): "menu_size" | "size" | "banner_type" | undefined {
  if (AdvertImagesOptionsSchema.safeParse(SecondDegreeCategory).success)
    return "size";
  if (SecondDegreeCategory === "menus") return "menu_size";
  if (SecondDegreeCategory === "banners") return "banner_type";
}
