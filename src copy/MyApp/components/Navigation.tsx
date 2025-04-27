import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { customButton } from "../mui-styles/buttons";
import { useDispatch } from "react-redux";
import { logout } from '../store/authSlice';
import { useUser } from "../store/hooks";

const Navigation = () => {
  const dispatch = useDispatch()

  const handleSignOut = () => {

    dispatch(logout())
  }
  const user = useUser()

  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        justifyContent: 'flex-end',
      }}
    >
      {user && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to="/"
        >
          Home
        </Button>
      )}
      {!user && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/sign-up"}
        >
          Sign up
        </Button>
      )}
      {!user && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/login"}
        >
          Sign In
        </Button>
      )}
      {user && (
        <Button
          variant="outlined"
          sx={customButton.root}
          component={Link}
          to={"/profile"}
        >
          Profile
        </Button>
      )}
      {user && (
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
    </Box>
  );
};

export default Navigation;
