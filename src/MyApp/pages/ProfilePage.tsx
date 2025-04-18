import { useSelector } from "react-redux";
import { Card, CardContent } from "@mui/material";
import { selectUserData } from "../store/authSlice";

const ProfilePage = () => {
  
  const selector = useSelector(selectUserData)

  return (
    <div>
      <Card elevation={24} sx={{ maxWidth: 300, mx: "auto", mt: 5 }}>
        <CardContent>
          <h2>{selector.username}'s profile</h2>
          <p>Username: {selector.username}</p>
          <p>id: {selector.id}</p>
          <p>email: {selector.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;