import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/types';

type InitState = {
  user: User | null;
}

const initialState: InitState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = {
        username: action.payload.user.username,
        id: action.payload.user.id,
        email: action.payload.user.email,
      };
      localStorage.setItem('authToken', JSON.stringify(action.payload.token))
    },
    logout(state) {
      state.user = initialState.user;
      localStorage.removeItem('authToken')
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
