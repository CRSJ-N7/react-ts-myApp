import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import mainThunks from "./mainThunks";

export const mainSlice = createSlice({
  name: 'main',
  initialState: () => ({
    user: null as User | null
  }),
  reducers: {
    setUser: (store, { payload }: PayloadAction<User | null>) => {
      store.user = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(mainThunks.getMe.fulfilled, (store, { payload }) => {
      store.user = payload
    })
  },
})

export const mainSliceActions = mainSlice.actions
