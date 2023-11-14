import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface roleListItem {
  id: string;
  name: string;
  description: string;
}

export interface roleListState {
  value: roleListItem[];
  selectedRowKeys: React.Key[];
  showItem: roleListItem | null;
}
const initialState: roleListState = {
  value: [],
  selectedRowKeys: [],
  showItem: null,
};

export const roleListSlice = createSlice({
  name: "roleList",
  initialState,
  reducers: {
    setShowItem: (state, action: PayloadAction<roleListItem | null>) => {
      state.showItem = action.payload;
    },
    setRoleData: (state, action: PayloadAction<roleListItem[]>) => {
      state.value = action.payload;
    },
    addRoleData: (state, action: PayloadAction<roleListItem>) => {
      state.value = state.value.concat(action.payload);
    },
    updateRoleData: (state, action: PayloadAction<roleListItem>) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else return item;
      });
    },
    setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
      state.selectedRowKeys = action.payload;
    },
  },
});

export const { setRoleData, setSelectedRowKeys, addRoleData, updateRoleData } =
  roleListSlice.actions;

export const roleListData = (state: RootState) => state.roleList.value;
export const roleListSelectedRowKeys = (state: RootState) =>
  state.roleList.selectedRowKeys;

export default roleListSlice.reducer;
