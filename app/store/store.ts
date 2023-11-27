import {configureStore, Action, ThunkAction} from '@reduxjs/toolkit';

import authReducer from './authSlice';

export const store = configureStore({
  reducer: {auth: authReducer},
});

export const AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<String>
>;
