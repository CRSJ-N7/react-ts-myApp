import { User } from "../types";
import { api, tokenStorage } from "./api";

type SignInResponse = {
  user: User;
  token: string;
};

const signIn = async (data: { email: string; password: string }) => {
  const response = await api.post<SignInResponse>("/auth/sign-in", data);

  tokenStorage.set(response.data.token);

  return response.data.user;
};

// Посмотреть что возвращает сервер на sign up
// Посмотрел, хочу на бэке поменять safeUser на user, а то херня какая-то
type SignUpResponse = {
  safeUser: User;
  token: string;
};
const signUp = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post<SignUpResponse>("/auth/sign-up", data);

  tokenStorage.set(response.data.token);

  return response.data.safeUser;
};

const getMe = async () => {
  const response = await api.get<User>("/auth/me");

  return response.data;
};
type UpdateProfileResponse = {
  updatedUser: User;
};
const updateProfile = async (data: {
  email?: string;
  username?: string;
}) => {
  const response = await api.patch<UpdateProfileResponse>("/auth/profile", data)

  return response.data.updatedUser;
}

type UpdatePasswordResponse = {
  user: User;
};

const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch<UpdatePasswordResponse>("/auth/password", data)
  
  return response.data.user;
}

const signOut = () => tokenStorage.remove()


export const authApi = {
  signIn,
  signUp,
  getMe,
  signOut,
  updateProfile,
  updatePassword,
};
