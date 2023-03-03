import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Url } from "url";
import { create } from "zustand";

type State = {
  images: { url: string | Blob | Url; w: number; h: number }[];
  currentlyPreviewed: number | null;
};
export type addImage = (url: string | Url, w: number, h: number) => void;
export type removeImage = (index: number) => void;
export type clearImages = () => void;
export type selectImage = (index: number) => void;
type Actions = {
  ADD_IMAGE: addImage;
  REMOVE_IMAGE: removeImage;
  CLEAR_IMAGES: clearImages;
  SELECT_IMAGE: selectImage;
};

export const usePreviewsStore = create<State & Actions>((set) => ({
  images: [],
  currentlyPreviewed: null,
  ADD_IMAGE: (url, w, h) =>
    set(
      produce((state: State) => {
        const index = state.images.push({ url, w, h });
        state.currentlyPreviewed = index - 1;
      })
    ),
  CLEAR_IMAGES: () => set(produce((state) => (state.images = []))),
  REMOVE_IMAGE: (index) =>
    set(produce((state) => (state.images = state.images.splice(index, 1)))),
  SELECT_IMAGE: (index) =>
    set(produce((state) => (state.currentlyPreviewed = index))),
}));
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("PreviewStore", usePreviewsStore);
}
