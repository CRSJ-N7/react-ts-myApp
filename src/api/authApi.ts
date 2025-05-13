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

type SignUpResponse = {
  // Посмотреть что возвращает сервер на sign up
  // Посмотрел, хочу на бэке поменять safeUser на user, а то херня какая-то
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

const signOut = () => tokenStorage.remove();

export const authApi = {
  signIn,
  signUp,
  getMe,
  signOut,
};
