import { createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "../../api/authApi";

const getMe = createAsyncThunk("main/getMe", async () => {
  const user = await authApi.getMe();
  return user;
});

export default { getMe };
