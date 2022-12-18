import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoableCanvasElemSlice from '../features/canvas-elements/canvasElemSlice';
import filtersReducer from '../features/canvas-elements/filtersSlice';
import  cachedImageReducer  from '../features/cachedImage/cachedImageSlice';


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    canvasElems: undoableCanvasElemSlice,
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
