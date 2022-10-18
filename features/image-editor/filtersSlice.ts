import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_OPTIONS, filter } from "../../constants/image-editor/filters"
import { RootState } from "../../Redux/store";

const initialState = DEFAULT_OPTIONS
interface newOption {
  property: string,
  value: number
}
 type state= Array<filter>

export const filtersSlice = createSlice({
  name:'filters',
  initialState,
  reducers: {
    changeFilter: (state, payload: PayloadAction<newOption>)=>{
      const newOption = payload.payload;
      state.map((option: filter)=> {
        if(option.property !== newOption.property) return
        option.value = newOption.value
      })
    },
    resetFilters:()=>{
      return DEFAULT_OPTIONS
    }
  }
})
export const { changeFilter, resetFilters } = filtersSlice.actions
export const filtersCount = (state: RootState) => state.filters;
export default filtersSlice.reducer;

