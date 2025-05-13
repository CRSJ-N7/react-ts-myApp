import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useUser } from "../../store/main/hooks";
import { authApi } from "../../api/authApi";
import { useAppDispatch } from "../../store/store";
import { mainSliceActions } from "../../store/main/mainSlice";
import c from "../styles/AppHeader.module.css";

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    authApi.signOut();
    dispatch(mainSliceActions.setUser(null));
    navigate("/");
  };

  const user = useUser();

  if (user) {
    return (
      <nav className={c.header}>
        <Box>
          <Button
            className={c.navButton}
            size="large"
            variant="outlined"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            className={c.navButton}
            size="large"
            variant="outlined"
            component={Link}
            to="/profile"
          >
            Profile
          </Button>
          <Button
            className={c.navButton}
            size="large"
            variant="outlined"
            component={Link}
            onClick={handleSignOut}
            to="/"
          >
            Sign out
          </Button>
        </Box>
      </nav>
    );
  }

  return (
    <>
      <nav className={c.header}>
        <Button
          className={c.navButton}
          size="large"
          variant="outlined"
          component={Link}
          to="sign-up"
        >
          Sign up
        </Button>
        <Button
          className={c.navButton}
          size="large"
          variant="outlined"
          component={Link}
          to="login"
        >
          Sign in
        </Button>
      </nav>
    </>
  );
};

export default AppHeader;
