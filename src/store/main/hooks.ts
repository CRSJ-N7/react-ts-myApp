import { useAppSelector } from "../store";

export const useUser = () => useAppSelector(({ main }) => main.user);
export const useSafeUser = () => {
  const user = useUser()
  if (!user) {
    throw new Error("No user in store");
  }

  return user
}