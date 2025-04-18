import Navigation from "./components/Navigation";
import MyAppRoutes from "./routes/MyAppRoutes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { api } from "./api/axios";
import { CircularProgress, Box } from "@mui/material";

const MyApp = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = JSON.parse(String(localStorage.getItem('authToken')))
      if (!token) {
        setIsAuthChecked(true)
        return;
      }
      try {
        const response = await api.get('auth/me', { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        });
        if (response.status === 200) {
          dispatch(login({
            token: token,
            user: {
              username: response.data.username,
              id: response.data.id,
              email: response.data.email
            }
          }));
        }
      } catch (error) {
        console.log(error);
        dispatch(logout())
      } 
    };

    setIsAuthChecked(true);
    
    checkAuth();
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
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