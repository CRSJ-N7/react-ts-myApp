import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSafeUser } from "../../store/main/hooks";
import c from "./ProfilePage.module.css";
import ProfileTab from "./components/ProfileTab";
import EditingTab from "./components/EditingTab";
import SecurityTab from "./components/SecurityTab";

const ProfilePage: React.FC = () => {
  const user = useSafeUser(); // не до конца понимаю useUser или useSafeUser использовать. Хочу ещё раз обкашлять.
  const userProfileName =
    user.username[0].toUpperCase() + user.username.slice(1).toLowerCase();
  const [joke, setJoke] = useState("");
  const [loadingJoke, setLoadingJoke] = useState(false);

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        sx={{ maxWidth: 500, height: 400, mx: "auto", mt: 5 }}
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
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Profile" value="1" />
                    <Tab label="Editing" value="2" />
                    <Tab label="Security" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ProfileTab
                    joke={joke}
                    loadingJoke={loadingJoke}
                    user={user}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <EditingTab user={user} />
                </TabPanel>
                <TabPanel value="3">
                  <SecurityTab />
                </TabPanel>
              </TabContext>
            </Box>
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
