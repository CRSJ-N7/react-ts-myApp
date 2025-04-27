import { useAppSelector } from "./store";


export const useUser = () => useAppSelector(({ auth }) => auth.user);
export const useSafeUser = () => {
  const user = useAppSelector(({ auth }) => auth.user);
  if (!user) {
    throw new Error('No user in auth state');
  }
  return user
}