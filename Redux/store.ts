import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoableCanvasPagesSlice from '../features/canvasPages/canvas-elements/canvasPageSlice';
import filtersReducer from '../features/canvasPages/canvas-elements/filtersSlice';
import  cachedImageReducer  from '../features/cachedImage/cachedImageSlice';


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    canvasPageElems: undoableCanvasPagesSlice,
    cachedImage : cachedImageReducer
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
