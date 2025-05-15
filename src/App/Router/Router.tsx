import { Routes, Route, Navigate } from "react-router-dom"
import SignInPage from '../../pages/auth/SignInPage/SignInPage'
import SignUpPage from '../../pages/auth/SignUpPage/SignUpPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import HomePage from '../../pages/home/HomePage';
import { useUser } from "../../store/main/hooks"
import { useRouterLogger } from "./RouterLogger";


const Router = () => {
  const user = useUser();
  useRouterLogger();

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
export default Router;