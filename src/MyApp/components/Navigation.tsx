import { Link, useNavigate } from "react-router-dom";
import c from "./Navigation.module.css";


const Navigation = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    localStorage.setItem("auth", 'false')
    navigate('/')
    window.location.reload();
  }
  const handleSignOut = () => {
    signOut();
  }

  const isAuthenticated = localStorage.getItem("auth") === 'true';

  return (
    <nav className={c.navigation}>
      {isAuthenticated && <Link to="/">Home</Link>}
      {!isAuthenticated && <Link to="/login">Sign in</Link>}
      {isAuthenticated && <Link to="/profile">Profile</Link>}
      {isAuthenticated && (
        <Link to="/" onClick={handleSignOut}>
          Sign out
        </Link>
      )}
    </nav>
  );
};

export default Navigation;