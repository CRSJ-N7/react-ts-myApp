import { Routes, Route, Navigate } from "react-router-dom"
import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage"
import HomePage from "../pages/HomePage";
import { useUser } from "../store/hooks";


const MyAppRoutes = () => {
  const user = useUser();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" Component={SignInPage} />
        <Route path="/sign-up" Component={SignUpPage} />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    )
  }

  return (
    <Routes>

      <Route path="/profile" Component={ProfilePage} />

      <Route
        path="*"
        Component={HomePage}
      />
    </Routes>
  );

}
export default MyAppRoutes;