import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, Box } from "@mui/material";
import Navigation from "./components/Navigation";
import MyAppRoutes from "./routes/MyAppRoutes";
import { login, logout } from "./store/authSlice";
import { api } from "./api/axios";

const MyApp = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = JSON.parse(String(localStorage.getItem('authToken')))
      if (!token) {
        return;
      }
      try {
        const response = await api.get('auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(login({
          token: token,
          user: {
            username: response.data.username,
            id: response.data.id,
            email: response.data.email
          }
        }));
      } catch (error) {
        console.error(error);
        dispatch(logout())
      } finally {
        setIsAuthChecked(true);
      }
    };


    checkAuth();
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          inset: 0,
        }}
      >
        <CircularProgress color="secondary" size={60} />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <MyAppRoutes />
    </>
  );
};

export default MyApp;