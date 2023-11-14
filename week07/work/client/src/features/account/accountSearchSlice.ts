import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface accountSearchItem {
  username: string;
  email: string;
  phone: string;
  role: string;
  createtimeS: number;
  createtimeD: number;
  updatetimeS: number;
  updatetimeD: number;
}

export interface accountSearchState {
  value: accountSearchItem;
  selectoptions: [];
}
const initialState: accountSearchState = {
  value: {
    username: "",
    email: "",
    phone: "",
    role: "",
    createtimeS: 0,
    updatetimeS: 0,
    createtimeD: 0,
    updatetimeD: 0,
  },
  selectoptions: [],
};

export const accountSearchSlice = createSlice({
  name: "accountSearch",
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<accountSearchItem>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchData } = accountSearchSlice.actions;

export const accountSearchData = (state: RootState) =>
  state.accountSearch.value;

export default accountSearchSlice.reducer;
