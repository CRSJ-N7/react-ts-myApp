import { User } from "../../../types";
import c from "../ProfilePage.module.css";
import Divider from "@mui/material/Divider";

type SecurityTabProps = {
  user: User;
};

const SecurityTab = (props: SecurityTabProps) => {
  return (
    <div>
      <span className={c.cardContent}>username: {props.user.username}</span>
      <Divider aria-hidden="true" sx={{ mt: "15px", bgcolor: "lightgray" }} />
      <span className={c.cardContent}>email: {props.user.email}</span>
      <Divider aria-hidden="true" sx={{ mt: "15px", bgcolor: "lightgray" }} />
    </div>
  );
};

export default SecurityTab;
