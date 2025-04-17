import { Routes, Route, Navigate } from "react-router-dom"
import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage"
import HomePage from "../pages/HomePage";
import { useSelector } from "react-redux";
import { selectorAuth } from "../store/authSlice";

const MyAppRoutes = () => {

  const isAuthenticated = useSelector(selectorAuth);
  
  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/sign-up" replace />
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/sign-up" replace />
        }
      />
    </Routes>
  );

}
export default MyAppRoutes;