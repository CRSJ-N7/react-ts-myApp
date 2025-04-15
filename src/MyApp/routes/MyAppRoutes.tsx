import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import Home from "../components/Home";

const MyAppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );

}
export default MyAppRoutes;