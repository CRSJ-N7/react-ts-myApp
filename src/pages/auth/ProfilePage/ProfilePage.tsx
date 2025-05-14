import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useSafeUser } from "../../../store/main/hooks";
import c from "../styles/authStyles.module.css";

const ProfilePage: React.FC = () => {
  const user = useSafeUser(); // не до конца понимаю useUser или useSafeUser использовать. Хочу ещё раз обкашлять.
  const userProfileName = user.username[0].toUpperCase() + user.username.slice(1).toLowerCase();
  const [joke, setJoke] = useState("");
  const [loadingJoke, setLoadingJoke] = useState(false);

  const fetchJoke = async () => {
    setLoadingJoke(true);
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      setJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (error) {
      setJoke("Не удалось загрузить шутку");
      console.error("Ошибка при загрузке шутки:", error);
    } finally {
      setLoadingJoke(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <div>
      <Card
        elevation={24}
        sx={{ maxWidth: 400, height: 400, mx: "auto", mt: 5 }}
      >
        <CardContent>
          <div className={c.profileHeader}>
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
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                align="left"
                color="primary"
              >
                {userProfileName}
              </Typography>
          </div>
          <Divider
            aria-hidden="true"
            sx={{ m: "10px", bgcolor: "lightgray" }}
          />
          <Card elevation={8} sx={{ mt: "10px", p: "0 25px 0 25px" }}>
            <span className={c.cardContent}>id: {user.id}</span>
            <Divider
              aria-hidden="true"
              sx={{ mt: "15px", bgcolor: "lightgray" }}
            />
            <span className={c.cardContent}>email: {user.email}</span>
            <Divider
              aria-hidden="true"
              sx={{ mt: "15px", bgcolor: "lightgray" }}
            />
            <span className={c.cardContent}>Favorite {user.username}'s joke:</span>
            <br />
            <span className={`${c.cardContent} ${c.greenTheme}`}> {loadingJoke ? <i>"Loading..."</i> : <i>{joke}</i>} </span>
          </Card>
          <Divider
            aria-hidden="true"
            sx={{ mt: "15px", bgcolor: "lightgray" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
