import { useAppSelector } from "../store";

export const useUser = () => useAppSelector(({ main }) => main.user); // используем там, где мы сомневаемся в наличии user
export const useSafeUser = () => { // делаем везде, где знаем что user есть
  const user = useUser()
  if (!user) {
    throw new Error("No user in store");
  }

  return user
}