import { Card, CardContent } from "@mui/material";

const ProfilePage = () => {

const user = localStorage.getItem('user')?.replace('"', '').replace('"','') || null;
const email = localStorage.getItem('email')?.replace('"', '').replace('"', '') || null;
const id = localStorage.getItem('id') || null;

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Username: {user} </h1>
          <h1>id: {id} </h1>
          <h1>email: {email}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;