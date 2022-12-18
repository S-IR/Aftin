import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { RootState } from "../../Redux/store";

export type cachedImage = {
  url: string;
  w: number;
  h: number;
}

export type ImageBeforeLoginRedirect = {image: cachedImage | null} 
//this slice is meant to save the user's desired image when he clicks on one but is not logged in yet. After he is logged in he will have a popup asking him if he still wants to continue to edit/download/preview that image
const initialState: ImageBeforeLoginRedirect = {image: null}


const CACHE_IMAGE: CaseReducer<WritableDraft<ImageBeforeLoginRedirect>, PayloadAction<cachedImage>> = (state, action) => {
  state.image = action.payload
}


const CLEAR_CACHED_IMAGE: CaseReducer<WritableDraft<ImageBeforeLoginRedirect>, PayloadAction<void>> = (state, action) => {
  state.image = null
}
export const cachedImageSlice = createSlice({
  name: 'imageBeforeLoginRedirect',
  initialState,
  reducers: {
    CACHE_IMAGE,
    CLEAR_CACHED_IMAGE
  },
})
export const cachedImageCount = (state: RootState) => state.cachedImage
export const cachedImageActions = cachedImageSlice.actions;
export default cachedImageSlice.reducer;