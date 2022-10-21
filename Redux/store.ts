import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoableCanvasElemSlice from '../features/canvas-elements/canvasElemSlice';
import counterReducer from '../features/counter/counterSlice';
import filtersReducer from '../features/image-editor/filtersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filters: filtersReducer,
    canvasElems: undoableCanvasElemSlice
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
