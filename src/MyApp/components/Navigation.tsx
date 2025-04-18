import { Link } from "react-router-dom";
import c from "./Navigation.module.css";
import { Button } from "@mui/material";
import { customButton } from "../mui-styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectorAuth } from '../store/authSlice';

const Navigation = () => {
  const dispatch = useDispatch()

  const handleSignOut = () => {

    dispatch(logout())
  }
  const isAuthenticated = useSelector(selectorAuth);

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
          onClick={handleSignOut}
          component={Link}
          to={'/sign-up'}
        >
          Sign out
        </Button>
      )}
    </nav>
  );
};

export default Navigation;
