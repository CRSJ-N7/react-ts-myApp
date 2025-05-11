import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import mainThunks from "./mainThunks";

type MainSlice = {
  user: User | null,
}

const initialState: MainSlice = {
  user: null
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (store, action: PayloadAction<User | null>) => {
      store.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(mainThunks.getMe.fulfilled, (store, action ) => {
      store.user = action.payload
    })
  },
})

export const mainSliceActions = mainSlice.actions

