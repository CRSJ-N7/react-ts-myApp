import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import MyAppRoutes from "./routes/MyAppRoutes";
import { login } from "./store/authSlice";

const MyApp = () => {
  const dispatch = useDispatch()
  const savedData = localStorage.getItem('authState');
  if (savedData) {
    dispatch(login(JSON.parse(savedData)))
  }
  return (
    <>
      <Navigation />
      <MyAppRoutes />
    </>
  );
};

export default MyApp;