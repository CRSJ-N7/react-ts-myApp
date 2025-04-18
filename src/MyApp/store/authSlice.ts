import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

type User = {
  username: string | null;
  id: string | null;
  email: string | null;
}

type InitState = {
  token: null | string;
  user: User;
}

const initialState: InitState = {
  token: null,
  user: {
    username: null,
    id: null,
    email: null,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    login(state, action) {
      state.token = action.payload.token;
      state.user = {
        username: action.payload.user.username,
        id: action.payload.user.id,
        email: action.payload.user.email,
      };
      localStorage.setItem('authToken', JSON.stringify(state.token))
    },
    logout(state) {
      state.token = null;
      state.user = initialState.user;
      localStorage.removeItem('authToken')
    }
  }
});

export const selectorAuth = (state: RootState) => !!state.auth.token;
const selectAuth = (state: RootState) => state.auth;
export const selectUserData = createSelector(
  [selectAuth],
  (auth) => auth.user,
);

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
