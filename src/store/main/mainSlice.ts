import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import mainThunks from "./mainThunks";
import { type User } from "../../types";

type MainSlice = {
  user: User | null;
};

const initialState: MainSlice = {
  user: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUser: (store, action: PayloadAction<User | null>) => {
      store.user = action.payload;
      console.log(store.user);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(mainThunks.getMe.fulfilled, (store, action) => {
      store.user = action.payload;
    });
  },
});

export const mainSliceActions = mainSlice.actions;
