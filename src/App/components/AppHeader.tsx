import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
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
          <ButtonGroup variant='contained' size="large" aria-label="large button group">
          <Button
            className={c.navButton}
            size="medium"
            // variant="outlined"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            className={c.navButton}
            size="medium"
            // variant="outlined"
            component={Link}
            to="/profile"
          >
            Profile
          </Button>
          <Button
            className={c.navButton}
            size="medium"
            // variant="outlined"
            component={Link}
            onClick={handleSignOut}
            to="/"
          >
            Sign out
          </Button>
          </ButtonGroup>

      </nav>
    );
  }

  return (
    <>
      <nav className={c.header}>
        <ButtonGroup variant='contained' size="large" aria-label="large button group">
        <Button
          className={c.navButton}
          size="medium"
          // variant="outlined"
          component={Link}
          to="sign-up"
        >
          Sign up
        </Button>
        <Button
          className={c.navButton}
          size="medium"
          // variant="outlined"
          component={Link}
          to="login"
        >
          Sign in
        </Button>
        </ButtonGroup>
      </nav>
    </>
  );
};

export default AppHeader;
