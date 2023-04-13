import { getDownloadURL, ref } from "firebase/storage";
import { NextRouter, Router } from "next/router";
import { galleryImageDialog } from "../../../components/general/SiteGallery";
import { DEFAULT_OPTIONS } from "../../../constants/image-editor/imageFilters";
import { MockupType } from "../../../constants/mockups/previewCategories";
import { storage } from "../../../firebase";
import {
  ImgDoc,
  SecondDegreeCategory,
  tier_array,
} from "../../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../../typings/typings";
import { addImage } from "../../../zustand/CanvasStore/imageHandlers";
import { addImage as addMockupImage } from "../../../zustand/MockupsStore/store";
import { changeModalType } from "../../../zustand/ModalBoxStore/store";

/**
 * Download an image from the firebase database
 * @param url the image URL
 */
export const handleDownload = (url: string) => {
  let httpsReference = ref(storage, url);
  getDownloadURL(httpsReference).then((url: string) => {
    // download image directly via url
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
      //create a file from the returned blob
      var file = new File([blob], "image name", { type: blob.type });
      //grab the a tag
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = "image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    xhr.open("GET", url);
    xhr.send();
  });
};

export const handleWebsiteGalleryEdit = (
  router: NextRouter,
  ADD_IMAGE: addImage,
  url: string,
  width: number,
  height: number
) => {
  const pageId = 0;
  const data = {
    imageSRC: url,
    width: width,
    height: height,
    scaleX: 1,
    scaleY: 1,
    hasCrop: false,
    borderWidth: 0,
    borderColor: "",
    x: 0,
    y: 0,
    rotate: 0,
    crop: false,
    cropRectangle: {
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    },
  };

  ADD_IMAGE(pageId, data, DEFAULT_OPTIONS);
  return router.push("/image-editor");
};

/**
 * Checks if the user is logged in or has a high enough payment tier to perform this button action
 * @param loginStatus user's login status
 * @param doc the firebase image document
 * @param setDialog sets the paid dialog box if the user does not have a high enough tier
 * @param changeModalType if there is a server error this is used to make the server error modal appear
 * @returns true if he can perform that action, false if he cannot
 */
export const checkImageGalleryClick = (
  loginStatus: LoginStatus | undefined,
  doc: ImgDoc,
  setDialog: React.Dispatch<React.SetStateAction<null | galleryImageDialog>>,
  changeModalType: changeModalType
) => {
  const internalServerError = loginStatus === undefined;
  const isNotLoggedIn =
    loginStatus === "not logged in" || loginStatus === "unauthorized";
  if (isNotLoggedIn) {
    setDialog({ name: "login", doc });
    return false;
  } else if (internalServerError) {
    changeModalType("server-error");
    return false;
  } else if (
    (loginStatus === "bronze" && doc.tier === "silver") ||
    (loginStatus === "bronze" && doc.tier === "gold") ||
    (loginStatus === "silver" && doc.tier === "gold")
  ) {
    setDialog({ name: `paid`, doc });
    return false;
  } else {
    return true;
  }
};

/**
 * Caches an image that the user was browsing before being pushed to another route in order to ask him later if he still wants to browse this image
 * @param url the URL of the image
 * @param w the width of the image
 * @param h the height of the image
 * @param dispatch redux dispatch
 */
export const cacheImage = (imgDoc: ImgDoc, dispatch: AppDispatch) => {
  const { CACHE_IMAGE } = cachedImageActions;
  dispatch(CACHE_IMAGE(imgDoc));
};

export const handleWebsiteGalleryPreview = (
  router: NextRouter,
  imgDoc: ImgDoc,
  secondDegreeCategory: SecondDegreeCategory,
  ADD_IMAGE: addMockupImage
) => {
  const w = imgDoc.width;
  const h = imgDoc.height;
  const url = imgDoc.url;
  ADD_IMAGE(url, w, h);

  const mockupRoute = determinePreviewRoute(secondDegreeCategory);
  return router.push(`/restaurant-mockups/${mockupRoute}`);
};

const determinePreviewRoute = (
  secondDegreeCategory: SecondDegreeCategory
): MockupType => {
  switch (secondDegreeCategory) {
    case "appetizers":
    case "soups":
    case "main-dishes":
    case "sweets-and-desserts":
    case "fast-foods":
    case "drinks":
    case "cutleries-and-plates":
    case "ingredients":
      return "on-table-day-environment";
    case "tables":
    case "stickers-and-cliparts":
      return "website";
    case "menus":
    case "business-cards":
    case "flyers":
    case "brochures":
      return "in-hand-day-environment";
    case "banners":
      return "facebook-banner";
  }
};
