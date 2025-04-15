import { Link, useNavigate } from "react-router-dom";
import c from "./Navigation.module.css";
import { Button } from "@mui/material";
import { customButton } from "../styles/buttons";

const Navigation = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    localStorage.setItem("auth", "false");
    navigate("/");
    window.location.reload();
  };
  const handleSignOut = () => {
    signOut();
  };

  const isAuthenticated = localStorage.getItem("auth") === "true";

  return (
    <nav className={c.navigation}>
      {isAuthenticated && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/"}
        >
          Home
        </Button>
      )}
      {!isAuthenticated && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/sign-up"}
        >
          Sign up
        </Button>
      )}
      {!isAuthenticated && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/login"}
        >
          Sign In
        </Button>
      )}
      {isAuthenticated && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/profile"}
        >
          Profile
        </Button>
      )}
      {isAuthenticated && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/"}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      )}
    </nav>
  );
};

export default Navigation;
