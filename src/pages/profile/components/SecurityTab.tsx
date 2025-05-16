import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from 'yup'

import c from "../ProfilePage.module.css";


const SecurityTab = () => {

const passwordChema = Yup.object({
  password: Yup.string()
    .min(8, "Tip: Password must be at least 8 characters long")
    .max(20, "Tip: Password length must not exceed 20 characters")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/,
      "Tip: The password must contain numbers, lowercase and uppercase letters."
    ),
});

const formik = useFormik({
  initialValues: {
    oldPassword: "",
    newPassword: "",
    passwordCheck: "",
  },
  validationSchema: passwordChema,
  onSubmit: async () => {},
})

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <div className={c.passwordForm}  style={{display: "flex", flexDirection: "column", marginRight: 100}}>
      <TextField
        name="oldPassword"
        id="oldPassword"
        label="old password"
        variant="standard"
        type="password"
      />
      <TextField
        name="newPassword"
        id="newPassword"
        label="new password"
        variant="standard"
        type="password"
      />
      <TextField
        name="passwordCheck"
        id="passwordCheck"
        label="repeat new password"
        variant="standard"
        type="password"
      />
      </div>
      <Button sx={{mt: 2, display: 'flex', justifyContent: 'center'}} variant="outlined" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SecurityTab;
