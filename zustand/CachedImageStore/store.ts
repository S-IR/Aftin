import { create } from "zustand";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

type State = {
  imgDoc: ImgDoc | null;
};
type addImageToCache = (imgDoc: ImgDoc) => void;
type clearImageCache = () => void;
type Actions = {
  ADD_IMAGE_TO_CACHE: addImageToCache;
  CLEAR_IMAGE_CACHE: clearImageCache;
};
export const useCachedStore = create<State & Actions>((set) => ({
  imgDoc: null,
  ADD_IMAGE_TO_CACHE: (imgDoc) =>
    set(
      produce((state: State) => {
        state.imgDoc = imgDoc;
      })
    ),
  CLEAR_IMAGE_CACHE: () =>
    set(
      produce((state: State) => {
        state.imgDoc = null;
      })
    ),
}));
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("PreviewStore", useCachedStore);
}
