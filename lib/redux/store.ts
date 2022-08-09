import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./reducers/auth";
import { msgSlice } from "./reducers/message";
import { navSlice } from "./reducers/nav";
import { largeSlice } from "./reducers/large";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    msg: msgSlice.reducer,
    nav: navSlice.reducer,
    large: largeSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

export const wrapper = createWrapper<typeof store>(() => store);
