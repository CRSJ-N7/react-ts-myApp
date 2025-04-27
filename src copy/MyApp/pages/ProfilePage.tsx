import { useuser } from "react-redux";
import { Card, CardContent } from "@mui/material";
import { selectUserData } from "../store/authSlice";
import { useSafeUser, useUser } from "../store/hooks";

const ProfilePage = () => {
  const user = useSafeUser()

  return (
    <div>
      <Card elevation={24} sx={{ maxWidth: 300, mx: "auto", mt: 5 }}>
        <CardContent>
          <h2>{user.username}'s profile</h2>
          <p>Username: {user.username}</p>
          <p>id: {user.id}</p>
          <p>email: {user.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;