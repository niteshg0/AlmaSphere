import { configureStore } from "@reduxjs/toolkit";
import  {apiSlice}  from "./Api/apiSlice.js";
import authReducer from "./features/authSlice.js"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
});

setupListeners(store.dispatch);