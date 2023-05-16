import { create } from "zustand";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
export type imagetoEnhance = {
  src: string;
  name: string;
  width: number;
  height: number;
};
type State = {
  imageBeforeRedirect: ImgDoc | null;
  toEnhance: imagetoEnhance | imagetoEnhance[] | null;
};

type AddRedirectImageToCache = (imgDoc: ImgDoc) => void;
type ClearRedirectImageCache = () => void;
type AddEnhanceImageToCache = (
  toEnhance: imagetoEnhance[] | imagetoEnhance
) => void;
type ClearEnhanceImageCache = () => void;

type Actions = {
  ADD_REDIRECT_IMAGE__TO_CACHE: AddRedirectImageToCache;
  CLEAR_REDIRECT_IMAGE_CACHE: ClearRedirectImageCache;
  ADD_ENHANCE_IMAGE_TO_CACHE: AddEnhanceImageToCache;
  CLEAR_ENHANCE_IMAGE_CACHE: ClearEnhanceImageCache;
};
export const useCachedStore = create<State & Actions>((set) => ({
  imageBeforeRedirect: null,
  toEnhance: null,
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
  ADD_ENHANCE_IMAGE_TO_CACHE: (setToEnhance) =>
    set(
      produce((state: State) => {
        state.toEnhance = setToEnhance;
      })
    ),
  CLEAR_ENHANCE_IMAGE_CACHE: () =>
    set(
      produce((state: State) => {
        state.toEnhance = null;
      })
    ),
}));
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("CachedImageStore", useCachedStore);
}
