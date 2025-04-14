import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

const isAuthenticated = false;
const MyAppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );

}
export default MyAppRoutes;