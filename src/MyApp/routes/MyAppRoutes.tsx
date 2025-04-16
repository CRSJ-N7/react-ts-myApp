import { Routes, Route } from "react-router-dom"
import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage"
import HomePage from "../pages/HomePage";

const MyAppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );

}
export default MyAppRoutes;