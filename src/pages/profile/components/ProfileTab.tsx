import { User } from "../../../types";
import c from "../ProfilePage.module.css";
import Divider from "@mui/material/Divider";

type ProfileTabProps = {
  user: User;
  loadingJoke: boolean;
  joke: string;
};

const ProfileTab = (props: ProfileTabProps) => {
  return (
    <div>
      <span className={c.cardContent}>id: {props.user.id}</span>
      <Divider aria-hidden="true" sx={{ mt: "15px", bgcolor: "lightgray" }} />
      <span className={c.cardContent}>email: {props.user.email}</span>
      <Divider aria-hidden="true" sx={{ mt: "15px", bgcolor: "lightgray" }} />
      <span className={c.cardContent}>
        Favorite {props.user.username}'s joke:
      </span>
      <br />
      <span className={`${c.cardContent} ${c.greenTheme}`}>
        {props.loadingJoke ? <i>"Loading..."</i> : <i>{props.joke}</i>}
      </span>
    </div>
  );
};

export default ProfileTab;
