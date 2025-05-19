import axios from "axios";

import { config } from "../config";
import LocalStorageItem from "../utils/LocalStorageItem";

export const tokenStorage = new LocalStorageItem<null | string>({
  key: "token",
  defaultValue: null,
});

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

api.interceptors.request.use((request) => {
  const token = tokenStorage.get();

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

// const themeNameStorage = new LocalStorageItem<'light' | 'dark'>({ key: 'theme', defaultValue: 'light'})
// themeNameStorage.set('light');

export { api };
