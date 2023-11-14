import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountListReducer from '../features/account/accountListSlice';
import roleListReducer from '../features/role/roleListSlice';
import accountSearchReducer from '../features/account/accountSearchSlice';

export const store = configureStore({
  reducer: {
    accountList: accountListReducer,
    roleList: roleListReducer,
    accountSearch: accountSearchReducer,
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
