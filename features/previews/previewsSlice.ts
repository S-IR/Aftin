import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Redux/store";

export type cachedImage = {
  url: string;
  w: number;
  h: number;
}

export type previewImage = {image: [Blob] | null} 
//this slice is meant to save the user's desired image when he clicks on one but is not logged in yet. After he is logged in he will have a popup asking him if he still wants to continue to edit/download/preview that image
const initialState: previewImage = {image: null}


const SET_PREVIEW_IMAGE: CaseReducer<WritableDraft<previewImage>, PayloadAction<Blob | Blob[]>> = (state, action) => {
  state.image = action.payload
}


const CLEAR_PREVIEW_IMAGE: CaseReducer<WritableDraft<previewImage>, PayloadAction<void>> = (state, action) => {
  state.image = null
}
export const previewsSlice = createSlice({
  name: 'previews',
  initialState,
  reducers: {
    SET_PREVIEW_IMAGE,
    CLEAR_PREVIEW_IMAGE
  },
})
export const previewsCount = (state: RootState) => state.previews
export const previewActions = previewsSlice.actions;
export default previewsSlice.reducer;