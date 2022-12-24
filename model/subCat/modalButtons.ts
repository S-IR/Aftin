
import { getDownloadURL, ref } from "firebase/storage";
import { NextRouter, Router } from "next/router";
import { DEFAULT_OPTIONS } from "../../constants/image-editor/imageFilters";
import { cachedImageActions } from "../../features/cachedImage/cachedImageSlice";
import { canvasPagesActions } from "../../features/canvasPages/canvas-elements/canvasPageSlice";
import { filtersActions } from "../../features/canvasPages/canvas-elements/filtersSlice";
import { storage } from "../../firebase";
import { AppDispatch } from "../../Redux/store";
import { LoginStatus } from "../../typings/typings";
/**
 * The download handler for the clicking of the download button on an image in any of the website's gallery
 * @param loginStatus the login status of the user
 * @param router NextRouter
 * @param url the image URL
 */
export const handleSubCatDownload = (
  loginStatus: LoginStatus, 
  router: NextRouter, 
  url: string, 
  w: number, 
  h: number, 
  dispatch: AppDispatch) => {
  if (loginStatus === 'not logged in') {
    const { CACHE_IMAGE} = cachedImageActions
    dispatch(CACHE_IMAGE({
      url,
      w,
      h
    }));
    router.push('/login')
  } else {
    let httpsReference = ref(storage, url)
    getDownloadURL(httpsReference)
      .then((url: string) => {
        // download image directly via url
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          var blob = xhr.response;
          //create a file from the returned blob
          var file = new File([blob], "image name", { type: blob.type });
          //grab the a tag
          const a = document.createElement('a')
          a.href = URL.createObjectURL(file)
          a.download = 'image.png'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        };
        xhr.open('GET', url);
        xhr.send();
      });
  }
}


export const handleSubCatEdit = (
  router: NextRouter, 
  dispatch: AppDispatch, 
  url: string, 
  width: number, 
  height: number) => {
  const pageId = 1
  const { ADD_IMAGE } = canvasPagesActions
  dispatch(ADD_IMAGE({pageId, 
  data: {
    imageSRC: url,
    width: width,
    height: height,
    scaleX: 1,
    scaleY: 1,
    borderWidth: 0,
    borderColor: '',
    x: 0,
    y: 0,
    rotate: 0,
    crop: false,
    cropRectangle: {
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    }
  }}))
  const { ADD_IMAGE_FILTER } = filtersActions

  dispatch(ADD_IMAGE_FILTER({pageId, data: { type: 'image', filter: DEFAULT_OPTIONS }}))
  router.push('/image-editor')


}