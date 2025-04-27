import { User } from "../types"
import { api, tokenStorage } from "./api"

type SignInResponse = {
  user: User,
  token: string
}
const signIn = async (data: { email: string, password: string }) => {
  const response = await api.post<SignInResponse>('/auth/sign-in', data)

  tokenStorage.set(response.data.token)

  return response.data.user
}

const signUp = () => null
const signOut = () => null
const getMe = async () => {
  const response = await api.get<User>('/auth/me')

  return response.data
}

export default {
  signIn,
  signUp,
  signOut,
  getMe,
}