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
type Actions = {
  ADD_IMAGE: addImage;
  REMOVE_IMAGE: removeImage;
  CLEAR_IMAGES: clearImages;
};

export const usePreviewsStore = create<State & Actions>((set) => ({
  images: [],
  currentlyPreviewed: null,
  ADD_IMAGE: (url, w, h) =>
    set(
      produce((state: State) => {
        state.images.push({ url, w, h });
      })
    ),
  CLEAR_IMAGES: () => set(produce((state) => (state.images = []))),
  REMOVE_IMAGE: (index) =>
    set(produce((state) => (state.images = state.images.splice(index, 1)))),
}));
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("PreviewStore", usePreviewsStore);
}
