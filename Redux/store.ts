import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import undoableCanvasPagesSlice from "../features/canvasPages/canvas-elements/canvasPageSlice";
import cachedImageReducer from "../features/cachedImage/cachedImageSlice";
import previewsReducer from "../features/previews/previewsSlice";

export const store = configureStore({
  reducer: {
    canvasPageElems: undoableCanvasPagesSlice,
    cachedImage: cachedImageReducer,
    previews: previewsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
