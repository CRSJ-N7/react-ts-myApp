import { combineReducers } from "@reduxjs/toolkit";

import { mainSlice } from "./main/mainSlice";

export const rootReducer = combineReducers({
  [mainSlice.name]: mainSlice.reducer,
})
