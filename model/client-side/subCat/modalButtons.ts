import { getDownloadURL, ref } from "firebase/storage";
import { NextRouter, Router } from "next/router";
import { DEFAULT_OPTIONS } from "../../../constants/image-editor/imageFilters";
import { cachedImageActions } from "../../../features/cachedImage/cachedImageSlice";
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice";
import { storage } from "../../../firebase";
import { AppDispatch } from "../../../Redux/store";
import { ImgDoc, tier_array } from "../../../typings/image-types/ImageTypes";
import { LoginStatus } from "../../../typings/typings";

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

export const handleSubCatEdit = (
  router: NextRouter,
  dispatch: AppDispatch,
  url: string,
  width: number,
  height: number
) => {
  const pageId = 0;
  const { ADD_IMAGE } = canvasPagesActions;
  dispatch(
    ADD_IMAGE({
      pageId,
      data: {
        imageSRC: url,
        width: width,
        height: height,
        scaleX: 1,
        scaleY: 1,
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
      },
    })
  );
  const { ADD_IMAGE_FILTER } = filtersActions;

  dispatch(
    ADD_IMAGE_FILTER({
      pageId,
      data: { type: "image", filter: DEFAULT_OPTIONS },
    })
  );
  return router.push("/image-editor");
};

/**
 * Checks if the user is logged in or has a high enough payment tier to perform this button action
 * @param loginStatus user's login status
 * @param imageStatus the image tier
 * @param setDialog sets the paid dialog box if the user does not have a high enough tier
 * @param router routes the user to /login in case he is not logged in
 * @returns true if he can perform that action, false if he cannot
 */
export const checkModalButtonClick = (
  loginStatus: LoginStatus,
  imageStatus: (typeof tier_array)[number],
  setDialog: React.Dispatch<React.SetStateAction<null | "free" | "paid">>,
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const isNotLoggedIn =
    loginStatus === "not logged in" || loginStatus === "unauthorized";
  if (isNotLoggedIn) {
    setLoginOpen(true);
    return false;
  } else if (
    (loginStatus === "bronze" && imageStatus === "silver") ||
    (loginStatus === "bronze" && imageStatus === "gold") ||
    (loginStatus === "silver" && imageStatus === "gold")
  ) {
    setDialog("paid");
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
