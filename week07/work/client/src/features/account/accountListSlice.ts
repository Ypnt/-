import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
export interface accountListItem {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  createtime: number;
  updatetime: number;
}

export interface accountListState {
  value: accountListItem[];
  pagination: {
    total: number;
    pageSize: number;
    current: number;
  };
  selectedRowKeys: React.Key[];
}
const initialState: accountListState = {
  value: [],
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
  },
  selectedRowKeys: [],
};

export const accountListSlice = createSlice({
  name: 'accountList',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<accountListItem>) => {
      if (state.value.length !== 10) {
        state.value = state.value.concat(action.payload);
      }
      state.pagination.total += 1;
    },
    setData: (state, action: PayloadAction<accountListItem[]>) => {
      state.value = action.payload;
    },
    updateData: (state, action: PayloadAction<accountListItem>) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else return item;
      });
    },
    setPagination: (
      state,
      action: PayloadAction<{
        total: number;
        pageSize: number;
        current: number;
      }>,
    ) => {
      state.pagination = action.payload;
    },
    setPaginationCurrent: (state, action: PayloadAction<number>) => {
      state.pagination.current = action.payload;
    },
    setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
      state.selectedRowKeys = action.payload;
    },
  },
});

export const {
  setData,
  setPagination,
  setPaginationCurrent,
  setSelectedRowKeys,
  updateData,
  addData,
} = accountListSlice.actions;

export const accountListData = (state: RootState) => state.accountList.value;
export const accountListPagination = (state: RootState) =>
  state.accountList.pagination;
export const accountListSelectedRowKeys = (state: RootState) =>
  state.accountList.selectedRowKeys;

export default accountListSlice.reducer;
