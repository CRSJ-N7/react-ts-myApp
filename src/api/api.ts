import axios from "axios"
import { config } from "../config"
import LocalStorage from "../utils/LocalStorage"

export const tokenStorage = new LocalStorage<null | string>({ key: 'token', devaultValue: null })

const api = axios.create({
  baseURL: config.apiBaseUrl,
})

api.interceptors.request.use((request) => {
  const token = tokenStorage.get()
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    throw error
  }
)

export { api }
