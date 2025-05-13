import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography";

import { useSafeUser } from "../../../store/main/hooks";
import { clanMemberStorage, getClanMember } from "./ProfilePage.utils";
import c from "../styles/authStyles.module.css";

const ProfilePage: React.FC = () => {
  const user = useSafeUser(); // не до конца понимаю useUser или useSafeUser использовать. Хочу ещё раз обкашлять.

  const memberStorage = clanMemberStorage.get() || clanMemberStorage.set(getClanMember())
  
  if (!user) {
    return null;
  }
  return (
    <div>
      <Card elevation={24} sx={{ maxWidth: 400, height: 400, mx: "auto", mt: 5 }}>
        <CardContent>
          <div className={c.profileHeader}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              align="center"
              color="primary"
            >
              {user.username}'s
              <br /> profile
            </Typography>
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "deepskyblue",
                width: "56px",
                height: "56px",
                fontSize: "25px",
              }}
            >
              {user.username[0].toUpperCase()}
            </Avatar>
          </div>
          <Divider aria-hidden="true" sx={{ mb: "10px" }} />
          <Typography
            variant="body1"
            component="p"
            sx={{
              mb: 0.5,
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            Name: {user.username}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              mb: 0.5,
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            id: {user.id}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              mb: 0.5,
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            email: {user.email}
          </Typography>
           <Typography
            variant="body1"
            component="p"
            sx={{
              mb: 0.5,
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            member: {memberStorage}
          </Typography>
          <Divider aria-hidden="true" sx={{ mt: "210px" }} />

        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
