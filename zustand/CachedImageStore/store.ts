import { create } from "zustand";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

type State = {
  imageBeforeRedirect: ImgDoc | null;
  imageToEnhance: {
    src: string;
    name: string;
    width: number;
    height: number;
  } | null;
};
type AddRedirectImageToCache = (imgDoc: ImgDoc) => void;
type ClearRedirectImageCache = () => void;
type AddEnhanceImageToCache = (imageToEnhance: {
  src: string;
  name: string;
  width: number;
  height: number;
}) => void;
type ClearEnhanceImageCache = () => void;

type Actions = {
  ADD_REDIRECT_IMAGE__TO_CACHE: AddRedirectImageToCache;
  CLEAR_REDIRECT_IMAGE_CACHE: ClearRedirectImageCache;
  ADD_ENHANCE_IMAGE_TO_CACHE: AddEnhanceImageToCache;
  CLEAR_ENHANCE_IMAGE_CACHE: ClearEnhanceImageCache;
};
export const useCachedStore = create<State & Actions>((set) => ({
  imageBeforeRedirect: null,
  imageToEnhance: null,
  ADD_REDIRECT_IMAGE__TO_CACHE: (imgDoc) =>
    set(
      produce((state: State) => {
        state.imageBeforeRedirect = imgDoc;
      })
    ),
  CLEAR_REDIRECT_IMAGE_CACHE: () =>
    set(
      produce((state: State) => {
        state.imageBeforeRedirect = null;
      })
    ),
  ADD_ENHANCE_IMAGE_TO_CACHE: (imageToEnhance) =>
    set(
      produce((state: State) => {
        state.imageToEnhance = imageToEnhance;
      })
    ),
  CLEAR_ENHANCE_IMAGE_CACHE: () =>
    set(
      produce((state: State) => {
        state.imageToEnhance = null;
      })
    ),
}));
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("CachedImageStore", useCachedStore);
}
